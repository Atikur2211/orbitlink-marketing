import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Starlink (Agent / Reseller) | Orbitlink™",
  description:
    "Starlink access provided through an agent/reseller model for environments where terrestrial options are limited. Use-cases, constraints, and onboarding clarified.",
  alternates: { canonical: "/services/starlink-agent" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Agent Services</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Starlink (Agent / Reseller)
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Orbitlink can assist with Starlink procurement and onboarding via an agent/reseller
          model. This is not the same as operator-managed terrestrial fibre—so we clearly define
          use-cases, constraints, and expectations before deployment.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Discuss Feasibility
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">When it makes sense</h2>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            Remote sites, temporary deployments, and continuity scenarios where terrestrial build
            timelines are not viable. We’ll align on requirements before any recommendation.
          </p>
        </div>
      </section>
    </main>
  );
}