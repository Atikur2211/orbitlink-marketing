// src/components/ConciergeBlock.tsx
import Link from "next/link";

const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";

export default function ConciergeBlock() {
  return (
    <section className="border-t border-white/8 bg-black/30">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.22em] text-white/58">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                CONCIERGE DESK
              </div>

              <h2 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Structured support for serious business buyers
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66 sm:text-[15px]">
                Contact Orbitlink for business sales, service qualification,
                onboarding coordination, and commercial next-step guidance across Ontario.
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58 sm:text-[15px]">
                Built for organizations that value clarity, responsiveness, and a more
                deliberate service experience.
              </p>
            </div>

            <div className="grid shrink-0 gap-3 sm:min-w-[280px]">
              <a
                href="mailto:concierge@orbitlink.ca"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/86 transition hover:bg-white/10"
              >
                concierge@orbitlink.ca
              </a>

              <a
                href="mailto:sales@orbitlink.ca"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/86 transition hover:bg-white/10"
              >
                sales@orbitlink.ca
              </a>

              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Call {PHONE_DISPLAY}
              </a>

              <Link
                href="/contact#intake"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm text-white transition hover:bg-white/5"
              >
                Start Business Request
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/64">
              Available <span className="text-white/86">Mon–Fri</span>,{" "}
              <span className="text-white/86">9AM–6PM ET</span>
            </div>

            <div className="text-xs tracking-[0.18em] text-white/48">
              CONTROLLED DELIVERY • STRUCTURED ONBOARDING • BUSINESS SUPPORT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}