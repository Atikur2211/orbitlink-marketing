import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Business Fibre Internet | Orbitlink™",
  description:
    "Operator-grade business fibre internet with structured onboarding, clear scoping, and documented acceptance. Availability confirmed per address across Ontario.",
  alternates: { canonical: "/services/business-fibre-internet" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow="AUREX INTERNET"
      title="Business Fibre Internet"
      subtitle="High-capacity business connectivity with disciplined onboarding, scoped delivery, and an enterprise support posture. Availability confirmed per building."
    >
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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-white">What you’re actually buying</h2>
          <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
            AUREX Business Fibre is built for teams that need stable throughput and clean onboarding without the overhead of
            a DIA-only posture. Orbitlink confirms serviceability per address, scopes constraints before activation, and
            delivers with documented acceptance.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: "Scope clarity", d: "We confirm feasibility and constraints before activation." },
              { t: "Structured onboarding", d: "Clear checkpoints for install and acceptance." },
              { t: "Upgrade path", d: "Move to DIA when operations require deterministic posture." },
              { t: "Enterprise support posture", d: "Escalation patterns aligned to business expectations." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/55">
            Note: Speeds and options vary by building infrastructure and upstream feasibility. Orbitlink confirms availability per address — no overclaims.
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.26em] text-white/55">TYPICAL FIT</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[
              "SMB offices, studios, clinics, and multi-tenant suites",
              "Cloud apps, VPN, VoIP, cameras, and day-to-day operations",
              "Teams upgrading from cable/DSL variance",
              "Sites that want clean delivery posture and a clear path to DIA",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">NEED DIA?</div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              If your site requires deterministic posture, contractual performance expectations, or clean handoff for critical
              operations, choose DIA.
            </p>
            <Link
              href="/services/dedicated-internet-access"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              View DIA →
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}