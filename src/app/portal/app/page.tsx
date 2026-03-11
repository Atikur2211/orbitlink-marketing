import PageShell from "@/components/PageShell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { touchSession, verifySessionCookieValue } from "@/lib/portalAuth";

function Pill({
  tone = "neutral",
  children,
}: {
  tone?: "gold" | "emerald" | "blue" | "neutral" | "red";
  children: React.ReactNode;
}) {
  const cls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "blue"
      ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
      : tone === "gold"
      ? "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]"
      : tone === "red"
      ? "border-red-400/20 bg-red-500/10 text-red-200"
      : "border-white/12 bg-white/5 text-white/70";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px]",
        cls,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note: string;
  tone?: "gold" | "emerald" | "blue" | "neutral" | "red";
}) {
  const ring =
    tone === "gold"
      ? "hover:border-[#FACC15]/25"
      : tone === "emerald"
      ? "hover:border-emerald-400/25"
      : tone === "blue"
      ? "hover:border-blue-400/25"
      : tone === "red"
      ? "hover:border-red-400/25"
      : "hover:border-white/15";

  return (
    <div
      className={[
        "rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 transition hover:bg-white/[0.06]",
        ring,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
        <Pill tone={tone}>
          {tone === "emerald"
            ? "OK"
            : tone === "red"
            ? "ALERT"
            : tone === "blue"
            ? "INFO"
            : tone === "gold"
            ? "PRIORITY"
            : "READY"}
        </Pill>
      </div>

      <div className="mt-3 text-[18px] sm:text-[20px] font-semibold text-white/90">
        {value}
      </div>
      <div className="mt-2 text-sm text-white/60 leading-6">{note}</div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mt-4 text-xs text-white/45">Telemetry-aligned disclosure</div>
    </div>
  );
}

function Action({
  title,
  desc,
  href,
  tone = "neutral",
}: {
  title: string;
  desc: string;
  href: string;
  tone?: "gold" | "emerald" | "blue" | "neutral";
}) {
  const btn =
    tone === "gold"
      ? "bg-[#FACC15] text-black hover:bg-[#FDE047]"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";

  return (
    <a
      href={href}
      className="group block rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7 hover:border-white/15 hover:bg-black/30 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm sm:text-[15px] font-semibold text-white/90">
            {title}
          </div>
          <div className="mt-2 text-sm text-white/65 leading-6 max-w-[52ch]">
            {desc}
          </div>
        </div>

        <div
          className={[
            "shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition text-center",
            btn,
          ].join(" ")}
        >
          Open →
        </div>
      </div>
    </a>
  );
}

function Row({
  k,
  v,
}: {
  k: string;
  v: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-white/10 py-3">
      <div className="text-xs text-white/50">{k}</div>
      <div className="text-xs text-white/75 text-right">{v}</div>
    </div>
  );
}

function QueueCard({
  label,
  title,
  items,
  href,
  tone = "neutral",
}: {
  label: string;
  title: string;
  items: { a: string; b: string; c?: string }[];
  href: string;
  tone?: "gold" | "emerald" | "blue" | "neutral";
}) {
  const badge =
    tone === "gold"
      ? "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]"
      : tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "blue"
      ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
      : "border-white/12 bg-white/5 text-white/70";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">
            {title}
          </div>
        </div>
        <span className={["rounded-full border px-3 py-1 text-[11px]", badge].join(" ")}>
          {items.length} items
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((x, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/25 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-white/85">{x.a}</div>
              <div className="text-xs text-white/45">{x.b}</div>
            </div>
            {x.c ? <div className="mt-1 text-xs text-white/55">{x.c}</div> : null}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a
          href={href}
          className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition"
        >
          Open queue →
        </a>
      </div>
    </div>
  );
}

export default async function PortalAppV2() {
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };

  if (!verified.ok) redirect("/portal/login");
  await touchSession(verified.sessionId).catch(() => {});

  // “v2” mock posture (replace with real data later)
  const org = "Orbitlink Client";
  const env = process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEV";
  const sessionTtl = verified.expiresAt;

  return (
    <PageShell
      eyebrow="PORTAL"
      title="Client Console"
      subtitle="Operator-grade surface — calm queues, disciplined communication, staged artifacts."
    >
      {/* Command header */}
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="gold">CONTROLLED PORTAL</Pill>
              <Pill tone="blue">ENV: {env}</Pill>
              <Pill tone="emerald">SESSION ACTIVE</Pill>
            </div>

            <div className="mt-4 text-lg sm:text-xl font-semibold text-white/90 truncate">
              {org}
            </div>

            <div className="mt-2 text-xs text-white/55">
              Signed in as <span className="text-white/75">{verified.email}</span>
              <span className="mx-2">•</span>
              Session expires <span className="text-white/75">{sessionTtl}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>Canada-first</Pill>
              <Pill>Operations-first</Pill>
              <Pill>Audit-ready posture</Pill>
              <Pill>Noise-resistant intake</Pill>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Trust & Compliance
            </a>
            <a
              href="/portal/logout"
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>

      {/* Live ops strip */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5">
        <Stat
          label="INCIDENT POSTURE"
          value="Stable"
          note="No active incidents impacting your scope."
          tone="emerald"
        />
        <Stat
          label="SLA STATUS"
          value="Within Target"
          note="Response discipline maintained. Escalations controlled."
          tone="blue"
        />
        <Stat
          label="INTAKE WINDOW"
          value="Controlled"
          note="Requests acknowledged during active ops windows."
          tone="gold"
        />
        <Stat
          label="COMPLIANCE STATE"
          value="Audit-Ready"
          note="Artifacts are staged, versioned, and scoped."
          tone="emerald"
        />
      </div>

      {/* Action center */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <Action
          title="Open a Ticket"
          desc="Incident or request intake with timestamps and clean escalation paths."
          href="/portal/app/tickets"
          tone="neutral"
        />
        <Action
          title="Request Artifacts"
          desc="Get service artifacts aligned to your provisioning stage and scope."
          href="/portal/app/artifacts"
          tone="gold"
        />
        <Action
          title="Onboarding Console"
          desc="Provisioning checkpoints, scope confirmation, and implementation milestones."
          href="/portal/app/onboarding"
          tone="neutral"
        />
      </div>

      {/* Queues */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <QueueCard
          label="QUEUE"
          title="Tickets"
          tone="blue"
          href="/portal/app/tickets"
          items={[
            { a: "Access request follow-up", b: "Queued", c: "Awaiting intake window confirmation" },
            { a: "Routing clarity request", b: "Draft", c: "Add scope + desired outcome" },
            { a: "SLA details inquiry", b: "Answered", c: "Response posted (telemetry-aligned)" },
          ]}
        />
        <QueueCard
          label="QUEUE"
          title="Requests"
          tone="gold"
          href="/portal/app/tickets"
          items={[
            { a: "Artifact bundle request", b: "Review", c: "Staged artifacts ready for scope match" },
            { a: "Implementation scheduling", b: "Pending", c: "Ops window not yet active" },
          ]}
        />
        <QueueCard
          label="QUEUE"
          title="Artifacts"
          tone="emerald"
          href="/portal/app/artifacts"
          items={[
            { a: "Service Summary (v1)", b: "Available", c: "Scoped to onboarding stage" },
            { a: "Operational Notes", b: "Available", c: "Conservative disclosure" },
            { a: "Compliance Pack", b: "Staged", c: "Enabled after provisioning confirmation" },
          ]}
        />
      </div>

      {/* Security + audit posture */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">SECURITY & SESSION</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">Access Posture</div>
          <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
            This portal is strict by design: short-lived sessions, controlled intake, and staged visibility.
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-5">
            <Row k="Auth method" v="Magic link (single-use token) → session cookie" />
            <Row k="Cookie policy" v="HttpOnly • SameSite=Lax • Secure in production" />
            <Row k="Exposure" v="Customer-specific data gated by provisioning stage" />
            <Row k="Ops posture" v="High-signal comms • No marketing noise" />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">AUDIT POSTURE</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">Traceability</div>
          <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
            Artifacts are staged, versioned, and scoped. Audit-facing items are exposed only when appropriate.
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-xs text-white/55">EVIDENCE</div>
              <div className="mt-1 text-sm text-white/80">
                Versioned artifacts with conservative disclosure posture
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-xs text-white/55">CHANGE LOG</div>
              <div className="mt-1 text-sm text-white/80">
                Updates remain timestamped and operator-reviewed
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-xs text-white/55">SCOPE</div>
              <div className="mt-1 text-sm text-white/80">
                Visibility expands only after provisioning confirmation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise note */}
      <div className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">ENTERPRISE NOTE</div>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
          Portal v2 is intentionally conservative: calm queues, staged modules, and disciplined communication.
          This is how you protect operations while scaling.
        </p>
      </div>
    </PageShell>
  );
}
