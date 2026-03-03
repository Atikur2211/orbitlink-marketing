import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dedicated Internet Access (DIA) | Orbitlink™",
  description:
    "Dedicated Internet Access for business-critical environments with deterministic performance, structured delivery, and enterprise support posture.",
  alternates: { canonical: "/services/dedicated-internet-access" },
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
          Dedicated Internet Access (DIA)
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          DIA is designed for organizations that require consistent throughput, predictable latency,
          and a delivery posture aligned with critical operations. Orbitlink approaches DIA with
          clear scoping, structured onboarding, and documented acceptance.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Request DIA Assessment
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
              "Head offices, healthcare, logistics, and multi-site operations",
              "VoIP/contact centers and cloud-first environments",
              "Sites requiring contractual performance posture and clean handoff",
              "Environments where broadband variance is unacceptable",
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