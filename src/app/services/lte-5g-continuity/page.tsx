import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LTE / 5G Continuity Architecture | Orbitlink™",
  description:
    "Continuity architecture using LTE/5G failover patterns to reduce downtime and maintain operations when primary access is disrupted.",
  alternates: { canonical: "/services/lte-5g-continuity" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Continuity</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          LTE / 5G Continuity Architecture
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          A continuity posture isn’t a “backup modem.” It’s an architecture decision. Orbitlink
          designs failover patterns that keep key services online when primary access is disrupted,
          with clear prioritization and documented operating procedures.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Evaluate Continuity
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">What we design for</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {[
              "Failover that preserves critical traffic first",
              "Clean cutover behavior and recovery expectations",
              "Site constraints and carrier feasibility",
              "Documented operating posture for business environments",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}