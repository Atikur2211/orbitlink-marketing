// src/app/trust/page.tsx
import PageShell from "@/components/PageShell";
import {
  TRUST_ASSURANCE,
  TRUST_DISCLOSURES,
  TRUST_TILES,
  MODULE_SPECS,
} from "@/lib/siteStatus";

function StatusTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "inprogress" | "info";
}) {
  const toneClass =
    tone === "ok"
      ? "text-emerald-300"
      : tone === "inprogress"
      ? "text-[#FACC15]"
      : "text-blue-300";

  const tonePill =
    tone === "ok"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "inprogress"
      ? "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]"
      : "border-blue-400/20 bg-blue-500/10 text-blue-200";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            {label}
          </div>
          <div className={`mt-3 text-sm font-medium ${toneClass}`}>{value}</div>
        </div>

        <div
          className={[
            "shrink-0 rounded-full border px-3 py-1.5 text-[11px]",
            tonePill,
          ].join(" ")}
        >
          {tone === "ok"
            ? "OPERATIONAL"
            : tone === "inprogress"
            ? "IN PROCESS"
            : "DISCLOSURE"}
        </div>
      </div>

      <div className="mt-4 text-sm leading-6 text-white/65">
        Statements are conservative and updated only when milestones are verifiable.
      </div>
    </div>
  );
}

function EvidenceCard({
  heading,
  bullets,
  note,
}: {
  heading: string;
  bullets: string[];
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="text-[11px] tracking-[0.28em] text-white/55">{heading}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/65">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      {note ? (
        <p className="mt-4 text-xs leading-5 text-white/55">{note}</p>
      ) : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      {children}
    </span>
  );
}

export default function TrustPage() {
  const moduleOptions = MODULE_SPECS.map((m) => m.name);

  return (
    <PageShell
      eyebrow="TRUST & COMPLIANCE"
      title="Regulatory credibility by design"
      subtitle="A transparency-first posture for audit readiness, operational integrity, and controlled rollout."
    >
      {/* Status tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {TRUST_TILES.map((t) => (
          <StatusTile key={t.label} label={t.label} value={t.value} tone={t.tone} />
        ))}
      </div>

      {/* “Million-dollar move” credibility card + REAL request form */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
              VERIFICATION PACK (REQUEST-ONLY)
            </div>

            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
              Enterprise review material — without exposing operational internals
            </h2>

            <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/70">
              Request a scope-appropriate pack that clarifies what is live vs planned, how changes are
              controlled, and what evidence exists today — provided in a redacted format when needed.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Disclosure memo</Pill>
              <Pill>Change policy</Pill>
              <Pill>Evidence samples (where available)</Pill>
              <Pill>Auditor / regulator contact path</Pill>
            </div>

            <p className="mt-4 text-xs text-white/55">
              Sensitive operational details stay request-only. Contents vary by module and readiness.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-[#FACC15]/25 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">
              Controlled • Verifiable • Minimal exposure
            </div>
          </div>
        </div>

        {/* Request form (luxury: minimal fields, high signal) */}
        <form
          className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3"
          action="/api/waitlist"
          method="post"
        >
          {/* Funnel tags */}
          <input type="hidden" name="source" value="trust" />
          <input type="hidden" name="intent" value="verification-pack" />
          <input type="hidden" name="returnTo" value="/trust?ok=1" />

          {/* Honeypot */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          {/* Minimal, high-signal fields */}
          <input
            name="email"
            type="email"
            required
            placeholder="Work email"
            className="lg:col-span-4 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/45"
          />

          <input
            name="company"
            type="text"
            placeholder="Company (optional)"
            className="lg:col-span-3 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/45"
          />

          <select
            name="role"
            defaultValue=""
            className="lg:col-span-2 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/45"
          >
            <option value="" disabled>
              Role (optional)
            </option>
            <option value="enterprise">Enterprise buyer</option>
            <option value="isp">ISP / Operator</option>
            <option value="auditor">Auditor / Compliance</option>
            <option value="partner">Partner / Vendor</option>
            <option value="other">Other</option>
          </select>

          <select
            name="module"
            defaultValue=""
            className="lg:col-span-3 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/45"
          >
            <option value="" disabled>
              Module (optional)
            </option>
            {moduleOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* CTAs */}
          <div className="lg:col-span-12 mt-1 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Request verification pack
            </button>

            <a
              href="/coming-soon?intent=early-access"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Request early access
            </a>

            <div className="sm:ml-auto text-xs text-white/55 flex items-center">
              Or email: <span className="ml-1 text-white/80">concierge@orbitlink.ca</span>
            </div>
          </div>

          <div className="lg:col-span-12 text-xs text-white/55">
            You’ll receive a single response if your request matches an active review window.
          </div>
        </form>
      </div>

      {/* Main disclosure card */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              OPERATIONAL DISCLOSURE
            </div>
            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
              Built for enterprise expectations and regulator review
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
              Orbitlink is engineered as an infrastructure-grade platform. Our approach prioritizes
              clear accountability, disciplined operations, and evidence-friendly workflows.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">PRINCIPLE</div>
            <div className="mt-1 text-sm text-white/80">Controlled rollout • No overclaiming</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {TRUST_DISCLOSURES.map((d) => (
            <EvidenceCard key={d.heading} heading={d.heading} bullets={d.bullets} note={d.note} />
          ))}
        </div>
      </div>

      {/* Scope-locked commitments strip */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              SCOPE-LOCKED COMMITMENTS
            </div>
            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
              Enterprises don’t buy features — they buy clarity
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
              Commitments are defined per engagement: what will be measured, what will be reported,
              what is excluded, and how changes are handled. This reduces risk during audits and reviews.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">
              Faster review • Lower risk • Cleaner go-live
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <EvidenceCard
            heading="What we confirm"
            bullets={[
              "Live scope vs planned scope",
              "Measured posture (where applicable)",
              "Operational ownership & escalation path",
            ]}
          />
          <EvidenceCard
            heading="How changes happen"
            bullets={[
              "Staged windows and rollback posture",
              "Documentation-first releases",
              "No surprise claims or silent launches",
            ]}
          />
          <EvidenceCard
            heading="What stays private"
            bullets={[
              "Sensitive internals kept request-only",
              "Redacted samples when appropriate",
              "Disclosure policy for operational detail",
            ]}
          />
        </div>
      </div>

      {/* Assurance strip */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">ASSURANCE</div>
        <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
          {TRUST_ASSURANCE}
        </div>
      </div>

      {/* Corporate disclosure */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">CORPORATE DISCLOSURE</div>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/65">
          Orbitlink is a brand of TIRAV Technologies Inc. Services are provided in accordance with
          applicable Canadian regulations and operational policies.
        </p>
        <p className="mt-4 text-xs text-white/55">
          This page is maintained as a living disclosure. Statements update when milestones are complete.
        </p>
      </div>
    </PageShell>
  );
}
