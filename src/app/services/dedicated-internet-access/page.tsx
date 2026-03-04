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
    <PageShell
      eyebrow="AUREX INTERNET"
      title="Dedicated Internet Access (DIA)"
      subtitle="Deterministic performance posture for business-critical environments — with clear scope, structured onboarding, and documented acceptance."
    >
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

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <h2 className="text-lg font-semibold tracking-tight text-white">Typical fit</h2>
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

        <div className="mt-5 text-xs text-white/55">
          Availability and delivery posture vary by address. Orbitlink confirms feasibility per building before activation — no overclaims.
        </div>
      </div>
    </PageShell>
  );
}