import PageShell from "@/components/PageShell";

function Card({
  label,
  title,
  desc,
  children,
}: {
  label: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
      <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">
        {title}
      </div>
      <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
        {desc}
      </p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

export default function PortalPage() {
  return (
    <PageShell
      eyebrow="CLIENT PORTAL"
      title="Orbitlink Portal"
      subtitle="A controlled access surface for customer onboarding, tickets, service artifacts, and operational communications."
    >
      {/* Top: posture strip */}
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              ACCESS POSTURE
            </div>
            <div className="mt-2 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
              Portal access is provisioned during active onboarding windows. If your organization is approved,
              you will receive credentials or an access link via the contact you submit.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>Controlled intake</Pill>
              <Pill>Operations-first</Pill>
              <Pill>Compliance-ready posture</Pill>
              <Pill>Canada-first</Pill>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/coming-soon"
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Request Portal Access
            </a>
            <a
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Trust & Compliance
            </a>
          </div>
        </div>
      </div>

      {/* Core modules grid */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <Card
          label="MODULE"
          title="Onboarding"
          desc="Provisioning, access controls, and implementation checkpoints. Built to be calm, traceable, and operator-friendly."
        >
          <ul className="mt-1 list-disc pl-5 space-y-2 text-sm text-white/65">
            <li>Identity + account provisioning</li>
            <li>Service activation steps (as applicable)</li>
            <li>Implementation milestones</li>
          </ul>
        </Card>

        <Card
          label="MODULE"
          title="Tickets & Escalations"
          desc="A clean interface for issues, changes, and service requests — with disciplined updates."
        >
          <ul className="mt-1 list-disc pl-5 space-y-2 text-sm text-white/65">
            <li>Incident + request intake</li>
            <li>Status updates with timestamps</li>
            <li>Escalation paths (when enabled)</li>
          </ul>
        </Card>

        <Card
          label="MODULE"
          title="Service Artifacts"
          desc="Access to documents and service artifacts appropriate for your plan and onboarding stage."
        >
          <ul className="mt-1 list-disc pl-5 space-y-2 text-sm text-white/65">
            <li>Service summaries</li>
            <li>Operational notes & change logs</li>
            <li>Compliance-facing artifacts (when applicable)</li>
          </ul>
        </Card>
      </div>

      {/* “Login” is present but gated + safe */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            SIGN-IN
          </div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">
            Sign-in will appear here
          </div>
          <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
            We enable sign-in only after your organization is approved and provisioned. This prevents noise,
            reduces abuse, and keeps operations disciplined.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href="/coming-soon"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Request Access
            </a>
            <a
              href="/legal"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Legal & Policies
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            WHAT TO EXPECT
          </div>
          <div className="mt-2 text-sm sm:text-[15px] leading-6 text-white/70">
            After you request access, Ops reviews the submission and responds when an onboarding window is active.
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3">
            {[
              ["Step 1", "Request access through controlled intake"],
              ["Step 2", "Ops review + prioritization (signal-based)"],
              ["Step 3", "Provisioning + onboarding instructions (if approved)"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <div className="text-xs text-white/55">{a}</div>
                <div className="mt-1 text-sm text-white/80">{b}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-xs text-white/45 leading-5">
            Orbitlink is a brand of <span className="text-white/70">TIRAV Technologies Inc.</span> Availability and
            onboarding are subject to operational and regulatory milestones.
          </div>
        </div>
      </div>

      {/* Optional: link to status preview */}
      <div className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">
          OPTIONAL
        </div>
        <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">
          Status Preview
        </div>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
          A public preview page for posture and high-level status (not customer-specific data).
        </p>

        <div className="mt-5">
          <a
            href="/portal/status"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition"
          >
            View Status Preview
          </a>
        </div>
      </div>
    </PageShell>
  );
}
