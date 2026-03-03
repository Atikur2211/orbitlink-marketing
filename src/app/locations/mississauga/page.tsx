import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Fibre Internet in Mississauga | Orbitlink™",
  description:
    "Operator-grade business fibre internet in Mississauga with structured onboarding, enterprise support posture, and documented delivery.",
  alternates: { canonical: "/locations/mississauga" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">

        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">
            Service Area
          </span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business Fibre Internet in Mississauga
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Orbitlink provides business connectivity solutions in Mississauga,
          designed for organizations that require reliable network infrastructure,
          structured onboarding, and enterprise support posture.
        </p>

        <p className="mt-4 text-white/70 text-base leading-relaxed">
          Services are available in select commercial buildings across
          Mississauga, including business districts near Airport Corporate Centre,
          Eglinton Avenue, and Meadowvale.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Availability
          </Link>

          <Link
            href="/services/business-fibre-internet"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            View Fibre Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Services available in Mississauga
          </h2>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Business Fibre Internet</li>
            <li>Dedicated Internet Access (DIA)</li>
            <li>Managed LAN & Enterprise Wi-Fi</li>
            <li>VoIP & Cloud Voice</li>
            <li>LTE / 5G Continuity</li>
          </ul>
        </div>

      </section>
    </main>
  );
}