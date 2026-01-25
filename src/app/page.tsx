// src/app/page.tsx
import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import StatusBandClient from "@/components/StatusBandClient";
import BentoServices from "@/components/BentoServices";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <TopNav />
      <StickyStatusStrip />

      {/* ✅ Client-safe (no SSR hydration mismatch, no dynamic) */}
      <StatusBandClient />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute top-12 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 h-80 w-[56rem] rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-7 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Infrastructure-grade operations • Compliance-ready delivery
          </div>

          <h1 className="mt-6 text-[2.1rem] leading-[1.05] sm:text-5xl sm:leading-[1.05] lg:text-6xl lg:leading-[1.02] font-semibold tracking-tight">
            Audit-Ready Connectivity
            <span className="block text-white/70">for Modern Operators</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-6 sm:text-lg sm:leading-7 text-white/70">
            Precision network services engineered for reliability, clean operations,
            and compliance-first delivery — built for modern businesses in Mississauga.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/coming-soon"
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Request Access
            </a>
            <a
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              View Network
            </a>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">RELIABILITY</div>
              <div className="mt-2 text-sm text-white/90">SLA-first delivery</div>
              <div className="mt-2 text-sm text-white/65">
                Designed for uptime, predictable routing, and disciplined escalation.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">OPERATIONS</div>
              <div className="mt-2 text-sm text-white/90">Network-grade visibility</div>
              <div className="mt-2 text-sm text-white/65">
                Telemetry that feels like a control plane — not marketing.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMPLIANCE</div>
              <div className="mt-2 text-sm text-white/90">Audit-ready by default</div>
              <div className="mt-2 text-sm text-white/65">
                Evidence-friendly workflows designed for regulators and auditors.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <BentoServices />
      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}
