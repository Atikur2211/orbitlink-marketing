import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IoT Connectivity & Secure Uplinks | Orbitlink™",
  description:
    "IoT connectivity and secure uplink patterns for sensors, gateways, and managed devices—positioned under AUREX Smart with an operator-grade posture.",
  alternates: { canonical: "/services/iot-connectivity" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">AUREX Smart</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          IoT Connectivity & Secure Uplinks
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Connectivity posture for sensors and gateways should be secure by design. Orbitlink
          supports IoT uplink patterns that align with operational monitoring, segmentation, and
          business environment constraints.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Discuss Your IoT Use Case
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">Operator posture</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {[
              "Segmentation between IoT and corporate networks",
              "Secure uplink patterns and clean handoff",
              "Monitoring-ready design choices",
              "Scope aligned to site constraints and feasibility",
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