import Link from "next/link";
import type { Metadata } from "next";

import LeadSelectionToggle from "@/components/admin/LeadSelectionToggle";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  normalizeRecord,
  scoreRecord,
  formatShortDate,
  uniqSorted,
  inferReviewStatus,
  type WaitlistRecord,
} from "@/lib/waitlistOps";
import {
  bulkArchiveLeads,
  bulkMarkReviewed,
} from "@/app/admin/leads/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lead Intake Dashboard",
  description: "Internal lead review dashboard for Orbitlink intake submissions.",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = {
  q?: string;
  intent?: string;
  source?: string;
  module?: string;
  review?: string;
  minScore?: string;
  sla?: string;
};

type SlaState =
  | "fresh"
  | "needs_contact_today"
  | "stale"
  | "reviewed_waiting"
  | "contacted"
  | "archived"
  | "normal";

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[28px] border border-[#D4AF37]/15 bg-white/[0.03] shadow-[0_24px_62px_rgba(0,0,0,0.34)] ${className}`}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.26em] text-[#D4AF37]/80 sm:text-[11px]">
      {children}
    </div>
  );
}

function MetricCard({
  label,
  value,
  subtext,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  subtext?: string;
  tone?: "neutral" | "gold" | "success" | "danger" | "warn";
}) {
  const toneClass =
    tone === "gold"
      ? "border-[#D4AF37]/25 bg-[linear-gradient(135deg,rgba(212,175,55,0.16)_0%,rgba(255,255,255,0.05)_42%,rgba(255,255,255,0.02)_100%)]"
      : tone === "success"
        ? "border-[#D4AF37]/20 bg-[linear-gradient(135deg,rgba(212,175,55,0.12)_0%,rgba(255,248,220,0.04)_45%,rgba(255,255,255,0.02)_100%)]"
        : tone === "danger"
          ? "border-rose-400/20 bg-[linear-gradient(135deg,rgba(255,99,71,0.10)_0%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.02)_100%)]"
          : tone === "warn"
            ? "border-amber-300/20 bg-[linear-gradient(135deg,rgba(255,193,7,0.10)_0%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.02)_100%)]"
            : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)]";

  const valueClass =
    tone === "danger"
      ? "text-rose-100"
      : tone === "gold" || tone === "success"
        ? "text-[#FFF2C4]"
        : tone === "warn"
          ? "text-amber-100"
          : "text-white";

  return (
    <div
      className={`rounded-[22px] border p-4 shadow-[0_18px_42px_rgba(0,0,0,0.28)] ${toneClass}`}
    >
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${valueClass}`}>{value}</div>
      {subtext ? <div className="mt-1 text-sm text-white/55">{subtext}</div> : null}
    </div>
  );
}

function QueueCard({
  label,
  value,
  href,
  tone = "neutral",
}: {
  label: string;
  value: number;
  href: string;
  tone?: "neutral" | "gold" | "red";
}) {
  const toneClass =
    tone === "gold"
      ? "border-[#FACC15]/20 bg-[#FACC15]/10"
      : tone === "red"
        ? "border-rose-400/20 bg-rose-400/10"
        : "border-white/10 bg-white/5";

  const valueClass =
    tone === "gold"
      ? "text-[#FDE68A]"
      : tone === "red"
        ? "text-rose-100"
        : "text-white";

  return (
    <Link
      href={href}
      className={`rounded-[22px] border p-4 transition hover:bg-white/10 ${toneClass}`}
    >
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${valueClass}`}>{value}</div>
    </Link>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "green" | "blue" | "red" | "amber";
}) {
  const toneClass =
    tone === "gold"
      ? "border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FDE68A]"
      : tone === "green"
        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
        : tone === "blue"
          ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
          : tone === "red"
            ? "border-rose-400/20 bg-rose-400/10 text-rose-200"
            : tone === "amber"
              ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
              : "border-white/10 bg-white/5 text-white/72";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${toneClass}`}
    >
      {children}
    </span>
  );
}

function scoreTone(score: number): "green" | "gold" | "neutral" {
  if (score >= 80) return "green";
  if (score >= 55) return "gold";
  return "neutral";
}

function reviewTone(reviewStatus?: string): "green" | "neutral" | "red" {
  if (reviewStatus === "reviewed") return "green";
  if (reviewStatus === "archived") return "red";
  return "neutral";
}

function safeContains(haystack: string | undefined, needle: string) {
  return (haystack || "").toLowerCase().includes(needle.toLowerCase());
}

function hoursSince(ts?: string) {
  if (!ts) return Number.POSITIVE_INFINITY;
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY;
  return (Date.now() - d.getTime()) / (1000 * 60 * 60);
}

function deriveSlaState(record: WaitlistRecord, score: number): SlaState {
  const reviewStatus = inferReviewStatus(record);
  if (reviewStatus === "archived") return "archived";

  const createdHours = hoursSince(record.createdAt);
  const hasContact = Boolean(record.lastContactedAt);

  if (!hasContact && score >= 80 && createdHours >= 24) {
    return "needs_contact_today";
  }

  if (!hasContact && createdHours >= 48) {
    return "stale";
  }

  if (reviewStatus === "reviewed" && !hasContact) {
    return "reviewed_waiting";
  }

  if (hasContact) {
    return "contacted";
  }

  if (createdHours <= 12) {
    return "fresh";
  }

  return "normal";
}

function slaBadge(state: SlaState) {
  switch (state) {
    case "needs_contact_today":
      return <Badge tone="red">Needs Contact Today</Badge>;
    case "stale":
      return <Badge tone="amber">Stale Lead</Badge>;
    case "reviewed_waiting":
      return <Badge tone="gold">Reviewed / Waiting</Badge>;
    case "contacted":
      return <Badge tone="green">Contacted</Badge>;
    case "fresh":
      return <Badge tone="blue">Fresh Inbound</Badge>;
    case "archived":
      return <Badge tone="neutral">Archived</Badge>;
    default:
      return <Badge tone="neutral">Normal</Badge>;
  }
}

function matchesTab(
  reviewStatus: "new" | "reviewed" | "archived",
  slaState: SlaState,
  tab?: string
) {
  if (!tab || tab === "all") return true;
  if (tab === "new") return reviewStatus === "new";
  if (tab === "reviewed") return reviewStatus === "reviewed";
  if (tab === "archived") return reviewStatus === "archived";
  if (tab === "needs_contact_today") return slaState === "needs_contact_today";
  if (tab === "stale") return slaState === "stale";
  return true;
}

function matchesFilters(
  record: WaitlistRecord,
  filters: SearchParams,
  score: number,
  reviewStatus: "new" | "reviewed" | "archived",
  slaState: SlaState
) {
  const q = (filters.q || "").trim().toLowerCase();
  if (q) {
    const matched =
      safeContains(record.fullName, q) ||
      safeContains(record.email, q) ||
      safeContains(record.company, q) ||
      safeContains(record.location, q) ||
      safeContains(record.module, q) ||
      safeContains(record.notes, q);

    if (!matched) return false;
  }

  if (filters.intent && filters.intent !== "all" && record.intent !== filters.intent) {
    return false;
  }

  if (filters.source && filters.source !== "all" && record.source !== filters.source) {
    return false;
  }

  if (filters.module && filters.module !== "all" && record.module !== filters.module) {
    return false;
  }

  if (filters.review && filters.review !== "all" && filters.review !== reviewStatus) {
    return false;
  }

  if (!matchesTab(reviewStatus, slaState, filters.sla)) {
    return false;
  }

  const minScore = Number(filters.minScore || "0");
  if (Number.isFinite(minScore) && score < minScore) {
    return false;
  }

  return true;
}

async function getLeads(): Promise<WaitlistRecord[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("intake_submissions")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(500);

  if (error) {
    throw new Error(`Failed to load leads: ${error.message}`);
  }

  return (data || [])
    .map((row) => normalizeRecord(row))
    .filter((row): row is WaitlistRecord => Boolean(row));
}

function csvEscape(value: string | undefined) {
  const raw = value || "";
  return `"${raw.replaceAll('"', '""')}"`;
}

function buildCsv(rows: Array<{ lead: WaitlistRecord; score: number }>) {
  const header = [
    "full_name",
    "email",
    "company",
    "role",
    "location",
    "module",
    "intent",
    "source",
    "timeline",
    "sites",
    "score",
    "created_at",
    "updated_at",
    "notes",
  ].join(",");

  const body = rows.map(({ lead, score }) =>
    [
      csvEscape(lead.fullName),
      csvEscape(lead.email),
      csvEscape(lead.company),
      csvEscape(lead.role),
      csvEscape(lead.location),
      csvEscape(lead.module),
      csvEscape(lead.intent),
      csvEscape(lead.source),
      csvEscape(lead.timeline),
      csvEscape(lead.sites),
      csvEscape(String(score)),
      csvEscape(lead.createdAt),
      csvEscape(lead.updatedAt),
      csvEscape(lead.notes),
    ].join(",")
  );

  return [header, ...body].join("\n");
}

function buildTabHref(filters: SearchParams, sla: string) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.intent && filters.intent !== "all") params.set("intent", filters.intent);
  if (filters.source && filters.source !== "all") params.set("source", filters.source);
  if (filters.module && filters.module !== "all") params.set("module", filters.module);
  if (filters.review && filters.review !== "all") params.set("review", filters.review);
  if (filters.minScore && filters.minScore !== "0") params.set("minScore", filters.minScore);

  if (sla && sla !== "needs_contact_today") {
    params.set("sla", sla);
  }

  const query = params.toString();
  return query ? `/admin/leads?${query}` : "/admin/leads";
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const filters = (await searchParams) || {};
  const leads = await getLeads();

  const enriched = leads.map((lead) => {
    const score = scoreRecord(lead);
    const reviewStatus = inferReviewStatus(lead);
    const slaState = deriveSlaState(lead, score);
    return { lead, score, reviewStatus, slaState };
  });

  const filtered = enriched.filter(({ lead, score, reviewStatus, slaState }) =>
    matchesFilters(lead, filters, score, reviewStatus, slaState)
  );

  const total = enriched.length;
  const highPriority = enriched.filter((x) => x.score >= 80).length;
  const openLeads = enriched.filter((x) => x.reviewStatus === "new").length;
  const needsContactToday = enriched.filter((x) => x.slaState === "needs_contact_today").length;
  const staleLeads = enriched.filter((x) => x.slaState === "stale").length;
  const reviewedWaiting = enriched.filter((x) => x.slaState === "reviewed_waiting").length;
  const highPriorityUncontacted = enriched.filter(
    (x) =>
      x.score >= 80 &&
      !x.lead.lastContactedAt &&
      x.reviewStatus !== "archived"
  ).length;
  const archivedCount = enriched.filter((x) => x.reviewStatus === "archived").length;
  const avgScore =
    enriched.length > 0
      ? Math.round(enriched.reduce((sum, x) => sum + x.score, 0) / enriched.length)
      : 0;

  const intents = uniqSorted(leads.map((x) => x.intent));
  const sources = uniqSorted(leads.map((x) => x.source));
  const modules = uniqSorted(leads.map((x) => x.module));

  const csvContent = buildCsv(filtered);
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

  const activeTab = filters.sla || "needs_contact_today";

  const tabs = [
    { key: "all", label: "All", count: total },
    { key: "new", label: "New", count: openLeads },
    { key: "needs_contact_today", label: "Needs Contact Today", count: needsContactToday },
    { key: "stale", label: "Stale", count: staleLeads },
    {
      key: "reviewed",
      label: "Reviewed",
      count:
        reviewedWaiting +
        enriched.filter(
          (x) => x.reviewStatus === "reviewed" && x.slaState !== "reviewed_waiting"
        ).length,
    },
    { key: "archived", label: "Archived", count: archivedCount },
  ];

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.13) 0%, rgba(212,175,55,0.04) 12%, rgba(8,8,8,1) 34%), linear-gradient(180deg, #060606 0%, #0d0d0d 46%, #141414 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
        <section
          className="relative mb-7 overflow-hidden rounded-[30px] border border-[#D4AF37]/20 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.42)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(255,255,255,0.05) 36%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(212,175,55,0.05)_32%,rgba(212,175,55,0)_70%)] blur-md" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_100%)]" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-[#E2C15C]">
              Orbitlink OS · Lead Command Surface
            </div>

            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-[#FFF7DB] sm:text-4xl">
              Lead Intake Dashboard
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/72 sm:text-[15px]">
              Premium internal review surface for new leads, service-fit qualification,
              pricing direction, and higher-priority commercial follow-up.
            </p>

            <div className="mt-4 inline-flex items-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-rose-100">
              Default queue: Needs Contact Today
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
          <MetricCard label="TOTAL LEADS" value={total} subtext="Supabase intake records" tone="gold" />
          <MetricCard label="HIGH PRIORITY" value={highPriority} subtext="Score 80+" tone="success" />
          <MetricCard label="OPEN REVIEW" value={openLeads} subtext="Needs human follow-up" tone="warn" />
          <MetricCard label="NEEDS CONTACT" value={needsContactToday} subtext="Action today" tone="danger" />
          <MetricCard label="STALE LEADS" value={staleLeads} subtext="48h+ no contact" tone="danger" />
          <MetricCard label="REVIEWED / WAITING" value={reviewedWaiting} subtext="Reviewed, not contacted" tone="neutral" />
          <MetricCard label="AVERAGE SCORE" value={avgScore} subtext="Overall lead quality" tone="neutral" />
        </div>

        <Section className="mt-5 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>MY QUEUE TODAY</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Priority work for today
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/64">
                Start with the highest-value uncontacted leads, then move through reviewed waiting items.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <QueueCard
              label="NEEDS CONTACT TODAY"
              value={needsContactToday}
              href="/admin/leads"
              tone="red"
            />
            <QueueCard
              label="HIGH PRIORITY UNCONTACTED"
              value={highPriorityUncontacted}
              href="/admin/leads?minScore=80"
              tone="gold"
            />
            <QueueCard
              label="REVIEWED / WAITING"
              value={reviewedWaiting}
              href="/admin/leads?sla=reviewed"
              tone="neutral"
            />
          </div>
        </Section>

        <Section className="mt-5 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>STATUS TABS</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Priority views
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/64">
                Switch the queue by operational urgency and review state.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <Link
                    key={tab.key}
                    href={buildTabHref(filters, tab.key)}
                    className={
                      active
                        ? "inline-flex items-center gap-2 rounded-2xl border border-[#FACC15]/25 bg-[#FACC15]/10 px-4 py-2.5 text-sm text-[#FDE68A]"
                        : "inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/72 transition hover:bg-white/10"
                    }
                  >
                    <span>{tab.label}</span>
                    <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                      {tab.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Section>

        <Section className="mt-5 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>FILTERS</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Narrow the queue
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/64">
                Search by company, email, location, service, or notes. Filter by intent,
                source, service, review state, and lead score.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={csvHref}
                download="orbitlink-leads.csv"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                Export CSV
              </a>
              <Link
                href="/admin/leads?sla=needs_contact_today"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                Reset filters
              </Link>
            </div>
          </div>

          <form className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-6" method="get">
            {activeTab !== "needs_contact_today" ? (
              <input type="hidden" name="sla" value={activeTab} />
            ) : null}

            <input
              type="text"
              name="q"
              defaultValue={filters.q || ""}
              placeholder="Search company, email, address..."
              className="xl:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
            />

            <select
              name="intent"
              defaultValue={filters.intent || "all"}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
            >
              <option value="all">All intents</option>
              {intents.map((intent) => (
                <option key={intent} value={intent}>
                  {intent}
                </option>
              ))}
            </select>

            <select
              name="source"
              defaultValue={filters.source || "all"}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
            >
              <option value="all">All sources</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>

            <select
              name="module"
              defaultValue={filters.module || "all"}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
            >
              <option value="all">All services</option>
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>

            <select
              name="review"
              defaultValue={filters.review || "all"}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
            >
              <option value="all">All review states</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="archived">Archived</option>
            </select>

            <div className="flex gap-3 md:col-span-2 xl:col-span-6">
              <select
                name="minScore"
                defaultValue={filters.minScore || "0"}
                className="w-full max-w-[220px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
              >
                <option value="0">Any score</option>
                <option value="40">40+</option>
                <option value="55">55+</option>
                <option value="70">70+</option>
                <option value="80">80+</option>
              </select>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Apply filters
              </button>
            </div>
          </form>
        </Section>

        <Section className="mt-5 p-5 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>QUEUE</Eyebrow>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Lead review queue
              </h2>
            </div>

            <div className="text-sm text-white/58">
              Showing <span className="text-white">{filtered.length}</span> of{" "}
              <span className="text-white">{total}</span> leads
            </div>
          </div>

          <div className="mt-6">
            <form className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  formAction={bulkMarkReviewed}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Bulk Mark Reviewed
                </button>

                <button
                  formAction={bulkArchiveLeads}
                  className="inline-flex items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-200 transition hover:bg-rose-400/15"
                >
                  Bulk Archive
                </button>

                <input
                  type="text"
                  name="reviewedBy"
                  defaultValue="Orbitlink Ops"
                  placeholder="Reviewed by"
                  className="min-w-[180px] rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#FACC15]/40"
                />

                <input
                  type="text"
                  name="reviewNote"
                  placeholder="Optional bulk note"
                  className="min-w-[240px] flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
                />
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[1280px] overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                  <div className="grid grid-cols-[54px_1.05fr_1.2fr_1fr_1fr_110px_170px_120px] border-b border-white/10 px-4 py-3 text-[11px] tracking-[0.2em] text-white/45">
                    <div>
                      <LeadSelectionToggle />
                    </div>
                    <div>LEAD</div>
                    <div>LOCATION / SERVICE</div>
                    <div>INTENT</div>
                    <div>COMPANY</div>
                    <div>SCORE</div>
                    <div>SLA</div>
                    <div>UPDATED</div>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="px-4 py-10 text-sm text-white/55">
                      No matching leads found.
                    </div>
                  ) : (
                    filtered.map(({ lead, score, reviewStatus, slaState }) => (
                      <div
                        key={`${lead.id || lead.email}-${lead.module || "general"}-${lead.createdAt || ""}`}
                        className="grid grid-cols-[54px_1.05fr_1.2fr_1fr_1fr_110px_170px_120px] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0"
                      >
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            name="ids"
                            value={lead.id || ""}
                            className="h-4 w-4 rounded border-white/20 bg-black/20"
                          />
                        </div>

                        <div>
                          <div className="text-sm font-medium text-white">
                            <Link
                              href={`/admin/leads/${lead.id}`}
                              className="transition hover:text-[#FDE68A]"
                            >
                              {lead.fullName || "Unnamed lead"}
                            </Link>
                          </div>
                          <div className="mt-1 text-sm text-white/62">{lead.email}</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {lead.role ? <Badge>{lead.role}</Badge> : null}
                            <Badge tone={reviewTone(reviewStatus)}>{reviewStatus}</Badge>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-white/82">
                            {lead.location || "No address"}
                          </div>
                          <div className="mt-1 text-sm text-white/58">
                            {lead.module || "No service selected"}
                          </div>
                          {lead.notes ? (
                            <div className="mt-2 line-clamp-3 text-xs leading-5 text-white/48">
                              {lead.notes}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Badge tone="blue">{lead.intent || "general"}</Badge>
                          <Badge>{lead.source || "unknown"}</Badge>
                          {lead.timeline ? <Badge>{lead.timeline}</Badge> : null}
                        </div>

                        <div>
                          <div className="text-sm text-white/82">
                            {lead.company || "No company"}
                          </div>
                          {lead.sites ? (
                            <div className="mt-2 text-xs text-white/52">{lead.sites}</div>
                          ) : null}
                        </div>

                        <div className="flex items-start">
                          <Badge tone={scoreTone(score)}>{score}</Badge>
                        </div>

                        <div className="flex items-start">{slaBadge(slaState)}</div>

                        <div className="text-sm text-white/62">
                          {formatShortDate(lead.updatedAt || lead.createdAt)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="mt-4 text-xs text-white/48">
            Select the leads you want to update, then apply a bulk action.
          </div>
        </Section>
      </div>
    </main>
  );
}