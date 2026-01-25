// src/components/ConciergeBlock.tsx
export default function ConciergeBlock() {
  return (
    <section className="border-t border-white/10 bg-black/35">
      <div className="mx-auto max-w-6xl px-5 sm:px-7 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                CONCIERGE DESK
              </div>

              <div className="mt-3 text-lg sm:text-xl font-semibold text-white">
                Enterprise Client Care
              </div>

              <p className="mt-3 max-w-2xl text-sm sm:text-[15px] leading-6 text-white/65">
                White-glove onboarding and regulated delivery posture. For sales, provisioning,
                and operational coordination.
              </p>
            </div>

            <div className="shrink-0 grid gap-2">
              <a
                href="mailto:concierge@orbitlink.ca"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10 transition text-center"
              >
                concierge@orbitlink.ca
              </a>

              <a
                href="mailto:sales@orbitlink.ca"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10 transition text-center"
              >
                sales@orbitlink.ca
              </a>

              <a
                href="tel:+18888672480"
                className="rounded-2xl bg-[#FACC15] text-black px-4 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
              >
                1-888-8-ORBIT-0
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-5">
            <div className="text-sm text-white/65">
              Available <span className="text-white/85">Mon–Fri</span>,{" "}
              <span className="text-white/85">9AM–6PM ET</span>
            </div>

            <div className="text-xs text-white/55">
              Controlled rollout • Enterprise onboarding • Compliance-aware operations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
