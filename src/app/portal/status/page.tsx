import PageShell from "@/components/PageShell";

function Tile({
  label,
  value,
  note,
  tone = "default",
}: {
  label: string;
  value: string;
  note?: string;
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
    <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
      <div className={`mt-3 rounded-2xl border px-4 py-4 text-2xl font-semibold ${toneClass}`}>
        {value}
      </div>
      {note ? (
        <div className="mt-3 text-sm leading-6 text-white/65">{note}</div>
      ) : null}
    </div>
  );
}

function Step({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-sm font-medium text-white/85">{title}</div>
      <div className="mt-1 text-sm leading-6 text-white/65">{text}</div>
    </div>
  );
}

export default function PortalStatusPage() {
  return (
    <PageShell
      eyebrow="PORTAL"
      title="Status Preview"
      subtitle="A high-level view of current operating posture. No customer-specific service data is displayed on this page."
    >
      {/* Hero */}
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
              PUBLIC STATUS SURFACE
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Conservative by design, visible enough for trust
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/70 sm:text-[15px]">
              This page provides a high-level preview of Orbitlink’s operational posture without
              exposing customer-specific information, internal notes, or environment-specific
              service detail. It is designed for clarity, not volume.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
            Public view only
          </div>
        </div>
      </div>

      {/* Status tiles */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 lg:grid-cols-3">
        <Tile
          label="POSTURE"
          value="OPERATIONAL"
          tone="emerald"
          note="Public posture only. Customer-specific status appears inside the portal after provisioning."
        />
        <Tile
          label="INTAKE"
          value="CONTROLLED"
          tone="gold"
          note="Requests are reviewed during onboarding windows. Response timing may vary by operating conditions."
        />
        <Tile
          label="DISCLOSURE"
          value="MINIMAL"
          tone="blue"
          note="Orbitlink publishes only what is necessary for trust, operational clarity, and disciplined communication."
        />
      </div>

      {/* Explanation strip */}
      <div className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              WHAT THIS PAGE IS FOR
            </div>
            <div className="mt-2 text-lg font-semibold text-white/90 sm:text-xl">
              A restrained operating signal for buyers and approved clients
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              This preview is intentionally conservative. It exists to provide a visible trust layer
              without exposing sensitive operational details or customer-specific service records.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
            No customer-specific data
          </div>
        </div>
      </div>

      {/* How details are shared */}
      <div className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-5 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">
          HOW DETAIL IS SHARED
        </div>
        <div className="mt-2 text-lg font-semibold text-white/90 sm:text-xl">
          Visibility increases only after access is provisioned
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
          Operational details are shared through direct communications and approved portal access
          when appropriate. This keeps public disclosure disciplined while still supporting buyer
          confidence and customer clarity.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Step
            title="Public preview"
            text="High-level posture and trust-facing status only."
          />
          <Step
            title="Approved access"
            text="Provisioned clients receive more specific operating visibility."
          />
          <Step
            title="Direct communications"
            text="Important updates are shared through the proper business contact path."
          />
        </div>
      </div>

      {/* CTA strip */}
      <div className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-5 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">NEXT STEP</div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
          If your organization is approved, more detailed operational visibility will be shared
          through portal access and direct communications. For trust review, onboarding posture, or
          access requests, use the options below.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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
    </PageShell>
  );
}