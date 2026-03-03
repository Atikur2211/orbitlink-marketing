import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colocation & Infrastructure Services | Orbitlink™",
  description:
    "Infrastructure coordination for critical networking: colocation guidance, cross-connect support, and operator-grade delivery posture for business environments.",
  alternates: { canonical: "/services/colocation-infrastructure" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Infrastructure</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Colocation & Infrastructure Services
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Orbitlink provides infrastructure-aligned guidance and coordination for colocating
          critical network equipment—built with a disciplined delivery posture, clear scope,
          and clean documentation. Services are delivered based on feasibility and site-specific
          constraints.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Discuss Requirements
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Colocation guidance",
              body: "Support for evaluating space, power, and connectivity considerations for small deployments.",
            },
            {
              title: "Cross-connect coordination",
              body: "Practical guidance on handoff expectations, interconnect pathways, and provisioning readiness.",
            },
            {
              title: "Structured delivery posture",
              body: "Clear scope, acceptance checkpoints, and documentation suitable for business environments.",
            },
            {
              title: "Site-specific feasibility",
              body: "Availability depends on location constraints and upstream infrastructure options.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight">{c.title}</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}