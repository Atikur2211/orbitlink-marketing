import PageShell from "@/components/PageShell";

export default function OnboardingModule() {
  return (
    <PageShell
      eyebrow="PORTAL • MODULE"
      title="Onboarding"
      subtitle="Provisioning steps and scope confirmation — staged by access level."
    >
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">STATUS</div>
        <div className="mt-2 text-lg font-semibold text-white/90">Provisioning gated</div>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
          This module activates after scope confirmation. Your Ops contact will enable access during an onboarding window.
        </p>

        <div className="mt-5 flex gap-3 flex-col sm:flex-row">
          <a className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center" href="/coming-soon">
            Request onboarding window
          </a>
          <a className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center" href="/portal/app">
            Back to console
          </a>
        </div>
      </div>
    </PageShell>
  );
}
