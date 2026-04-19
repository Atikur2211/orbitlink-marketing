import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase";
import {
  normalizeRecord,
  scoreRecord,
  formatShortDate,
  makeMailtoSubject,
  makeReplyTemplate,
  type WaitlistRecord,
} from "@/lib/waitlistOps";
import {
  archiveLead,
  markLeadContacted,
  markLeadReviewed,
  updateLeadInternalNote,
} from "@/app/admin/leads/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lead Detail",
  description: "Internal lead detail view for Orbitlink ops.",
  robots: {
    index: false,
    follow: false,
  },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[28px] border border-[#D4AF37]/15 bg-white/[0.03] p-5 shadow-[0_24px_62px_rgba(0,0,0,0.34)] sm:rounded-[32px] sm:p-8 ${className}`}
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
        ? "border-emerald-400/20 bg-emerald-400/10"
        : tone === "danger"
          ? "border-rose-400/20 bg-rose-400/10"
          : tone === "warn"
            ? "border-amber-300/20 bg-amber-300/10"
            : "border-white/10 bg-black/20";

  const valueClass =
    tone === "danger"
      ? "text-rose-100"
      : tone === "gold"
        ? "text-[#FFF2C4]"
        : tone === "success"
          ? "text-emerald-100"
          : tone === "warn"
            ? "text-amber-100"
            : "text-white";

  return (
    <div className={`rounded-[22px] border p-4 ${toneClass}`}>
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${valueClass}`}>{value}</div>
      {subtext ? <div className="mt-1 text-sm text-white/55">{subtext}</div> : null}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-b border-white/10 py-3 last:border-b-0 md:grid-cols-[180px_1fr]">
      <div className="text-sm text-white/46">{label}</div>
      <div className="text-sm text-white/84">{value || "—"}</div>
    </div>
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
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${toneClass}`}>
      {children}
    </span>
  );
}

function scoreTone(score: number): "green" | "gold" | "neutral" {
  if (score >= 80) return "green";
  if (score >= 55) return "gold";
  return "neutral";
}

function reviewTone(record: WaitlistRecord): "green" | "neutral" | "red" {
  if (record.reviewStatus === "archived") return "red";
  if (record.reviewedAt || record.reviewNote) return "green";
  return "neutral";
}

function prettyTimeline(value?: string) {
  switch (value) {
    case "asap":
      return "As soon as possible";
    case "within_30_days":
      return "Within 30 days";
    case "within_60_90_days":
      return "Within 60–90 days";
    case "planning_stage":
      return "Planning stage";
    case "not_sure":
      return "Not sure yet";
    default:
      return value || "—";
  }
}

function prettySites(value?: string) {
  switch (value) {
    case "1":
      return "1 site";
    case "2_5":
      return "2–5 sites";
    case "6_20":
      return "6–20 sites";
    case "20_plus":
      return "20+ sites";
    default:
      return value || "—";
  }
}

function buildMailto(record: WaitlistRecord) {
  const subject = encodeURIComponent(makeMailtoSubject(record));
  const body = encodeURIComponent(makeReplyTemplate(record));
  return `mailto:${encodeURIComponent(record.email)}?subject=${subject}&body=${body}`;
}

function hoursSince(ts?: string) {
  if (!ts) return Number.POSITIVE_INFINITY;
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY;
  return (Date.now() - d.getTime()) / (1000 * 60 * 60);
}

function deriveSla(record: WaitlistRecord, score: number) {
  const created = hoursSince(record.createdAt);
  const hasContact = Boolean(record.lastContactedAt);

  if (record.reviewStatus === "archived") {
    return { label: "Archived", tone: "neutral" as const };
  }

  if (!hasContact && score >= 80 && created >= 24) {
    return { label: "Needs Contact Today", tone: "red" as const };
  }

  if (!hasContact && created >= 48) {
    return { label: "Stale Lead", tone: "amber" as const };
  }

  if (record.reviewedAt && !hasContact) {
    return { label: "Reviewed / Waiting", tone: "gold" as const };
  }

  if (hasContact) {
    return { label: "Contacted", tone: "green" as const };
  }

  return { label: "Fresh", tone: "blue" as const };
}

async function getLead(id: string): Promise<WaitlistRecord | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("intake_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load lead: ${error.message}`);
  }

  if (!data) return null;

  return normalizeRecord(data);
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLead(id);

  if (!lead) {
    notFound();
  }

  const score = scoreRecord(lead);
  const sla = deriveSla(lead, score);
  const mailtoHref = buildMailto(lead);
  const reviewed = Boolean(lead.reviewedAt || lead.reviewNote);
  const archived = lead.reviewStatus === "archived";
  const createdAgoHours = Math.floor(hoursSince(lead.createdAt));
  const updatedAgoHours = Math.floor(hoursSince(lead.updatedAt || lead.createdAt));
  const contactedAgoHours = Math.floor(hoursSince(lead.lastContactedAt));

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
          className="relative mb-6 overflow-hidden rounded-[30px] border border-[#D4AF37]/20 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.42)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(255,255,255,0.05) 36%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(212,175,55,0.05)_32%,rgba(212,175,55,0)_70%)] blur-md" />
          <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Eyebrow>INTERNAL LEAD DETAIL</Eyebrow>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#FFF7DB] sm:text-4xl">
                {lead.fullName || lead.company || lead.email}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone={scoreTone(score)}>Score {score}</Badge>
                <Badge tone="blue">{lead.intent || "general"}</Badge>
                <Badge>{lead.source || "unknown"}</Badge>
                <Badge tone={reviewTone(lead)}>
                  {archived ? "archived" : reviewed ? "reviewed" : "new"}
                </Badge>
                <Badge tone={sla.tone}>{sla.label}</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/leads"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                Back to Dashboard
              </Link>
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Reply to Lead
              </a>
            </div>
          </div>
        </section>

        <Section className="mb-5">
          <Eyebrow>DECISION</Eyebrow>
          <h2 className="mt-3 text-xl font-semibold text-[#FFF2C4]">
            What should be done now
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4">
              <div className="text-xs text-white/60">URGENCY</div>
              <div className="mt-1 text-lg font-medium text-rose-100">
                {sla.label}
              </div>
            </div>

            <div className="rounded-xl border border-[#FACC15]/20 bg-[#FACC15]/10 p-4">
              <div className="text-xs text-white/60">LEAD QUALITY</div>
              <div className="mt-1 text-lg font-medium text-[#FDE68A]">
                {score >= 80 ? "High Value" : score >= 55 ? "Qualified" : "Standard"}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">RECOMMENDED</div>
              <div className="mt-1 text-lg font-medium text-white">
                {score >= 80
                  ? "Reply Immediately"
                  : score >= 55
                    ? "Review + Respond"
                    : "Review First"}
              </div>
            </div>
          </div>
        </Section>

        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-5">
            <Section>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <Eyebrow>LEAD PROFILE</Eyebrow>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                    Submission details
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {lead.module ? <Badge tone="gold">{lead.module}</Badge> : null}
                  {lead.timeline ? <Badge>{prettyTimeline(lead.timeline)}</Badge> : null}
                  {lead.sites ? <Badge>{prettySites(lead.sites)}</Badge> : null}
                </div>
              </div>

              <div className="mt-6">
                <InfoRow label="Full name" value={lead.fullName} />
                <InfoRow
                  label="Work email"
                  value={
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-white transition hover:text-[#FDE68A]"
                    >
                      {lead.email}
                    </a>
                  }
                />
                <InfoRow label="Company" value={lead.company} />
                <InfoRow label="Role" value={lead.role} />
                <InfoRow label="Address" value={lead.location} />
                <InfoRow label="Service needed" value={lead.module} />
                <InfoRow label="Timeline" value={prettyTimeline(lead.timeline)} />
                <InfoRow label="Sites" value={prettySites(lead.sites)} />
                <InfoRow label="Intent" value={lead.intent} />
                <InfoRow label="Source" value={lead.source} />
              </div>
            </Section>

            <Section>
              <Eyebrow>PROJECT DETAILS</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Notes from the lead
              </h2>

              <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 p-5">
                <div className="whitespace-pre-wrap text-sm leading-7 text-white/74">
                  {lead.notes || "No project details provided."}
                </div>
              </div>
            </Section>

            <Section>
              <Eyebrow>REPLY DRAFT</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Suggested first response
              </h2>

              <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 p-5">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-white/72">
                  {makeReplyTemplate(lead)}
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Open Email Reply
                </a>
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
                >
                  Email Without Template
                </a>
              </div>
            </Section>
          </div>

          <div className="space-y-5">
            <Section>
              <Eyebrow>PRIORITY</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Lead quality
              </h2>

              <div className="mt-6 grid gap-4">
                <MetricCard
                  label="SCORE"
                  value={score}
                  tone={score >= 80 ? "success" : score >= 55 ? "gold" : "neutral"}
                  subtext={
                    score >= 80 ? "High-priority lead" : score >= 55 ? "Qualified lead" : "Standard review"
                  }
                />
                <MetricCard
                  label="CREATED"
                  value={`${formatShortDate(lead.createdAt)} (${Number.isFinite(createdAgoHours) ? `${createdAgoHours}h ago` : "—"})`}
                />
                <MetricCard
                  label="UPDATED"
                  value={`${formatShortDate(lead.updatedAt || lead.createdAt)} (${Number.isFinite(updatedAgoHours) ? `${updatedAgoHours}h ago` : "—"})`}
                />
              </div>
            </Section>

            <Section>
              <Eyebrow>OPS STATUS</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Internal handling
              </h2>

              <div className="mt-6 space-y-3">
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-medium text-white/90">Review status</div>
                  <div className="mt-2">
                    <Badge tone={reviewTone(lead)}>
                      {archived ? "archived" : reviewed ? "reviewed" : "new"}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-medium text-white/90">Reviewed at</div>
                  <div className="mt-2 text-sm text-white/68">
                    {formatShortDate(lead.reviewedAt)}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-medium text-white/90">Reviewed by</div>
                  <div className="mt-2 text-sm text-white/68">
                    {lead.reviewedBy || "—"}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-medium text-white/90">Last contacted</div>
                  <div className="mt-2 text-sm text-white/68">
                    {lead.lastContactedAt
                      ? `${formatShortDate(lead.lastContactedAt)} (${Number.isFinite(contactedAgoHours) ? `${contactedAgoHours}h ago` : "—"})`
                      : "—"}
                  </div>
                </div>
              </div>
            </Section>

            <Section>
              <Eyebrow>OPS ACTIONS</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Update this lead
              </h2>

              <div className="mt-6 space-y-4">
                <form action={markLeadReviewed} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" value={lead.id || ""} />

                  <label className="block text-sm font-medium text-white/84">
                    Reviewed by
                  </label>
                  <input
                    name="reviewedBy"
                    defaultValue={lead.reviewedBy || "Orbitlink Ops"}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40"
                  />

                  <label className="mt-4 block text-sm font-medium text-white/84">
                    Review note
                  </label>
                  <textarea
                    name="reviewNote"
                    rows={4}
                    defaultValue={lead.reviewNote || ""}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-[#FACC15]/40"
                    placeholder="Add the review decision, pricing direction, or next action."
                  />

                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                  >
                    Mark Reviewed
                  </button>
                </form>

                <form action={updateLeadInternalNote} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" value={lead.id || ""} />

                  <label className="block text-sm font-medium text-white/84">
                    Internal note
                  </label>
                  <textarea
                    name="reviewNote"
                    rows={4}
                    defaultValue={lead.reviewNote || ""}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-[#FACC15]/40"
                    placeholder="Update internal context without changing review status."
                  />

                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
                  >
                    Save Internal Note
                  </button>
                </form>

                <form action={markLeadContacted} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" value={lead.id || ""} />
                  <input type="hidden" name="reviewNote" value={lead.reviewNote || ""} />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-200 transition hover:bg-emerald-400/15"
                  >
                    Mark Last Contacted = Now
                  </button>
                </form>

                <form action={markLeadContacted} className="rounded-[22px] border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <input type="hidden" name="id" value={lead.id || ""} />
                  <input type="hidden" name="reviewNote" value={lead.reviewNote || ""} />

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-400"
                  >
                    Reply Sent → Mark Contacted
                  </button>
                </form>

                <form action={archiveLead} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" value={lead.id || ""} />
                  <input type="hidden" name="reviewNote" value={lead.reviewNote || ""} />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-200 transition hover:bg-rose-400/15"
                  >
                    Archive Lead
                  </button>
                </form>
              </div>
            </Section>

            <Section>
              <Eyebrow>NEXT ACTION</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FFF2C4]">
                Recommended move
              </h2>

              <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm leading-7 text-white/72">
                  {score >= 80
                    ? "High-priority lead. Reply quickly with availability direction and pricing guidance."
                    : score >= 55
                      ? "Qualified lead. Review service fit and send the clearest next step."
                      : "Standard lead. Review address and details, then respond with follow-up questions if needed."}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Reply Now
                </a>
                <Link
                  href="/admin/leads"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
                >
                  Return to Queue
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}