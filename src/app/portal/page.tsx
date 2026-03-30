import PageShell from "@/components/PageShell";
import Link from "next/link";

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
    <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
        {label}
      </div>

      <div className="mt-4 text-lg font-semibold text-white/90 sm:text-xl">
        {title}
      </div>

      <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
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

function ToolCard({
  href,
  label,
  title,
  desc,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[28px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
          <div className="mt-2 text-base font-semibold text-white/90 sm:text-lg">
            {title}
          </div>
          <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60 transition group-hover:text-white/80">
          Open
        </div>
      </div>
    </Link>
  );
}

function MetricCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "gold" | "emerald" | "blue";
}) {
  const toneClass =
    tone === "gold"
      ? "border-[#FACC15]/20 bg-[#FACC15]/[0.06] text-[#FDE68A]"
      : tone === "emerald"
        ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
        : tone === "blue"
          ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-200"
          : "border-white/10 bg-black/20 text-white/90";

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div className={`mt-3 rounded-2xl border px-4 py-3 text-lg font-semibold ${toneClass}`}>
        {value}
      </div>
    </div>
  );
}

function StepCard({
  step,
  text,
}: {
  step: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-xs text-white/55">{step}</div>
      <div className="mt-1 text-sm text-white/80">{text}</div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <PageShell
      eyebrow="CLIENT PORTAL"
      title="Orbitlink Portal"
      subtitle="A controlled access surface for customer onboarding, service coordination, operational communications, and internal lead review."
    >
      {/* Hero / posture */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              ACCESS POSTURE
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Controlled portal access with a business-first operating posture
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/70 sm:text-[15px]">
              Portal access is provisioned during active onboarding windows. If your organization
              is approved, Orbitlink provides access through the designated business contact.
              This helps reduce noise, limit abuse, and keep service operations more disciplined.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Controlled intake</Pill>
              <Pill>Operations-first</Pill>
              <Pill>Compliance-ready posture</Pill>
              <Pill>Canada-first</Pill>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="/coming-soon"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Portal Access
            </a>
            <a
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Trust & Compliance
            </a>
          </div>
        </div>
      </div>

      {/* Portal metrics */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 md:grid-cols-3">
        <MetricCard label="ACCESS MODEL" value="Provisioned by approval" tone="gold" />
        <MetricCard label="OPERATING STYLE" value="Calm, controlled, traceable" tone="blue" />
        <MetricCard label="INTERNAL SUPPORT" value="Lead review + status tools" tone="emerald" />
      </div>

      {/* Core modules */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-3">
        <Card
          label="MODULE"
          title="Onboarding"
          desc="Provisioning, access controls, and implementation checkpoints. Built to be calm, traceable, and operator-friendly."
        >
          <ul className="mt-1 list-disc space-y-2 pl-5 text-sm text-white/65">
            <li>Identity + account provisioning</li>
            <li>Service activation steps (as applicable)</li>
            <li>Implementation milestones</li>
          </ul>
        </Card>

        <Card
          label="MODULE"
          title="Tickets & Escalations"
          desc="A clean interface for incidents, changes, and service requests, with disciplined update handling."
        >
          <ul className="mt-1 list-disc space-y-2 pl-5 text-sm text-white/65">
            <li>Incident + request intake</li>
            <li>Status updates with timestamps</li>
            <li>Escalation paths when enabled</li>
          </ul>
        </Card>

        <Card
          label="MODULE"
          title="Service Artifacts"
          desc="Access to documents and service artifacts appropriate for your plan, deployment stage, and operating context."
        >
          <ul className="mt-1 list-disc space-y-2 pl-5 text-sm text-white/65">
            <li>Service summaries</li>
            <li>Operational notes & change logs</li>
            <li>Compliance-facing artifacts when applicable</li>
          </ul>
        </Card>
      </div>

      {/* Sign-in + expectations */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:col-span-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">SIGN-IN</div>
          <div className="mt-2 text-lg font-semibold text-white/90 sm:text-xl">
            Sign-in will appear here
          </div>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink enables sign-in only after the organization is reviewed and provisioned.
            This reduces noise, limits misuse, and keeps the operating posture disciplined.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="/coming-soon"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Request Access
            </a>
            <a
              href="/legal"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Legal & Policies
            </a>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-7 lg:col-span-5">
          <div className="text-[11px] tracking-[0.28em] text-white/55">WHAT TO EXPECT</div>
          <div className="mt-2 text-sm leading-6 text-white/70 sm:text-[15px]">
            After access is requested, Ops reviews the submission and responds when an onboarding
            window is active.
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3">
            <StepCard step="Step 1" text="Request access through controlled intake" />
            <StepCard step="Step 2" text="Ops review and prioritization based on signal quality" />
            <StepCard step="Step 3" text="Provisioning and onboarding instructions if approved" />
          </div>

          <div className="mt-5 text-xs leading-5 text-white/45">
            Orbitlink is a brand of <span className="text-white/70">TIRAV Technologies Inc.</span>.
            Availability and onboarding remain subject to operational and regulatory milestones.
          </div>
        </div>
      </div>

      {/* Internal admin / lead tools */}
      <div className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">INTERNAL TOOLS</div>
            <div className="mt-2 text-lg font-semibold text-white/90 sm:text-xl">
              Lead review and internal operating surfaces
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              Internal tools for reviewing inbound chat leads, updating status, setting follow-up
              dates, and managing early-stage commercial workflows inside a controlled portal surface.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
            Internal only
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ToolCard
            href="/portal/chat-leads"
            label="SALES"
            title="Chat Leads"
            desc="Review live-agent requests, transcripts, contact details, and chat-driven inbound opportunities."
          />

          <ToolCard
            href="/portal/chat-leads"
            label="STATUS"
            title="Lead Status Dashboard"
            desc="Update lead status, add internal notes, set follow-up dates, archive records, and manage next actions."
          />
        </div>
      </div>

      {/* Public status preview */}
      <div className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">STATUS PREVIEW</div>
            <div className="mt-2 text-lg font-semibold text-white/90 sm:text-xl">
              Public posture and high-level status
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              Use the status preview page for public-facing posture and high-level operating
              visibility, without exposing customer-specific service data or internal notes.
            </p>
          </div>

          <div className="mt-1">
            <a
              href="/portal/status"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              View Status Preview
            </a>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-4 rounded-[28px] border border-white/10 bg-black/25 p-5 sm:mt-5 sm:p-6">
        <div className="text-[11px] tracking-[0.22em] text-white/55">PORTAL NOTICE</div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
          This portal surface is designed to support controlled onboarding, operational clarity,
          and internal lead review. Access, workflows, and visible modules may evolve as Orbitlink’s
          operating model expands.
        </p>
      </div>
    </PageShell>
  );
}