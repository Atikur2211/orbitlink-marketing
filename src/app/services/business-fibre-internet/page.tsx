import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Fibre Internet | Orbitlink™",
  description:
    "Operator-grade business fibre internet with structured onboarding, clear scoping, and documented acceptance. Availability confirmed per address across Ontario.",
  alternates: { canonical: "/services/business-fibre-internet" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">AUREX Internet</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business Fibre Internet
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          AUREX Business Fibre is designed for teams that need high-capacity connectivity with a disciplined delivery posture.
          Orbitlink confirms availability per address, scopes constraints before activation, and delivers with documented acceptance.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Fibre Availability
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">Typical fit</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {[
              "SMB offices, studios, clinics, and multi-tenant suites",
              "Cloud apps, VPN, VoIP, and day-to-day operations",
              "Teams upgrading from cable/DSL variance",
              "Sites that want clean onboarding with a path to DIA when needed",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.26em] text-white/55">NEED DIA?</div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              If you need deterministic posture, contractual performance expectations, or a clean handoff for critical operations,
              choose Dedicated Internet Access.
            </p>
            <Link
              href="/services/dedicated-internet-access"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              View DIA →
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/55">
            Availability and options vary by building infrastructure. Orbitlink confirms feasibility per address — no overclaims.
          </p>
        </div>
      </section>
    </main>
  );
}