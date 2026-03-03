import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Static IP Routing | Orbitlink™",
  description:
    "Static IP options and routing posture for VPNs, servers, and fixed endpoints—availability varies by access type and location.",
  alternates: { canonical: "/services/static-ip-routing" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Operator Layer</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Static IP Routing
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Static addressing supports site-to-site VPNs, hosted services, fixed endpoints, and
          predictable access policies. Orbitlink provides static IP options where feasible, with
          clear documentation and delivery posture.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Request Static IP Options
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">Notes</h2>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            Static IP availability and formats (e.g., single IP or small blocks) depend on the
            underlying access service and location feasibility.
          </p>
        </div>
      </section>
    </main>
  );
}