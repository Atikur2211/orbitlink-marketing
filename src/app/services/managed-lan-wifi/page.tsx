import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Managed LAN & Enterprise Wi-Fi | Orbitlink™",
  description:
    "Managed LAN and enterprise Wi-Fi designed for business environments: segmentation, guest networks, and operator-grade support posture.",
  alternates: { canonical: "/services/managed-lan-wifi" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Managed Network</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Managed LAN & Enterprise Wi-Fi
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          A clean, managed network layer that stays stable day-to-day. Orbitlink designs and
          maintains LAN and Wi-Fi posture suitable for offices, multi-tenant floors, and
          operational environments—without the “DIY router” feel.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Request Network Design
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
            { t: "Segmentation posture", b: "Separate staff, guest, IoT, and sensitive systems with clear boundaries." },
            { t: "Coverage planning", b: "Predictable Wi-Fi performance through proper placement and capacity planning." },
            { t: "Business-ready handoff", b: "Documented configurations and support posture aligned with operations." },
            { t: "Growth-ready", b: "Designed to scale as teams, devices, and sites expand." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <h2 className="text-lg font-semibold tracking-tight">{c.t}</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}