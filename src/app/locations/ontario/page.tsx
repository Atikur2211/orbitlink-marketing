import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
  description:
    "Operator-grade business connectivity across Ontario: business fibre, DIA, managed LAN & Wi-Fi, continuity, and voice. Availability is on-net where available.",
  alternates: { canonical: "/locations/ontario" },
  openGraph: {
    title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
    description:
      "Explore Orbitlink coverage across Ontario and request service availability for your business location.",
    url: "/locations/ontario",
    type: "website",
  },
};

const CITIES = [
  { name: "Mississauga", href: "/locations/mississauga", tag: "GTA" },
  { name: "Toronto", href: "/locations/toronto", tag: "GTA" },
  { name: "Brampton", href: "/locations/brampton", tag: "GTA" },
  { name: "Vaughan", href: "/locations/vaughan", tag: "GTA" },
  { name: "Markham", href: "/locations/markham", tag: "GTA" },
  { name: "Oakville", href: "/locations/oakville", tag: "GTA" },
  { name: "Milton", href: "/locations/milton", tag: "GTA" },
  { name: "Etobicoke", href: "/locations/etobicoke", tag: "Toronto" },
  { name: "Scarborough", href: "/locations/scarborough", tag: "Toronto" },
  { name: "Hamilton", href: "/locations/hamilton", tag: "Ontario" },
  { name: "Ottawa", href: "/locations/ottawa", tag: "Ontario" },
] as const;

const SERVICES = [
  {
    name: "Business Fibre Internet",
    href: "/services/business-fibre-internet",
    note: "Symmetrical tiers, structured onboarding, on-net where available.",
  },
  {
    name: "Dedicated Internet Access (DIA)",
    href: "/services/dedicated-internet-access",
    note: "Deterministic performance posture for critical environments.",
  },
  {
    name: "Managed LAN & Enterprise Wi-Fi",
    href: "/services/managed-lan-wifi",
    note: "Clean segmentation, coverage planning, operator support posture.",
  },
  {
    name: "LTE / 5G Continuity Architecture",
    href: "/services/lte-5g-continuity",
    note: "Failover patterns designed for operations continuity.",
  },
  {
    name: "VoIP & Cloud Voice",
    href: "/services/voip-cloud-voice",
    note: "Modern voice posture with business-ready onboarding.",
  },
  {
    name: "Static IP Routing",
    href: "/services/static-ip-routing",
    note: "Static IP options where feasible by access type and location.",
  },
] as const;

export default function OntarioHubPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Province Coverage</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Ontario Business Connectivity Coverage
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink delivers operator-grade business connectivity across Ontario using a disciplined
          delivery posture—structured onboarding, documented acceptance, and enterprise support posture.
          Availability is <span className="text-white/85 font-medium">on-net where available</span>, with clear
          feasibility scoping when additional build work is required.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Availability / Request Access
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Explore Services
          </Link>
        </div>

        {/* Proof chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "On-net where available",
            "Structured onboarding",
            "Documented delivery",
            "Enterprise support posture",
            "Scope clarity (no overclaims)",
          ].map((x) => (
            <span
              key={x}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
            >
              {x}
            </span>
          ))}
        </div>
      </section>

      {/* How coverage works */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              t: "1) Building feasibility",
              b: "Coverage varies by building infrastructure, carrier footprint, and handoff feasibility.",
            },
            {
              t: "2) Service selection",
              b: "Select broadband vs DIA based on operational needs, then align managed LAN/Wi-Fi and continuity posture.",
            },
            {
              t: "3) Structured delivery",
              b: "We coordinate delivery with clear scope, acceptance checkpoints, and documented activation.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight">{c.t}</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* City directory */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-xl font-semibold tracking-tight">Ontario locations</h2>
          <Link
            href="/locations"
            className="text-sm text-white/70 hover:text-white transition"
          >
            View all locations →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CITIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] hover:border-white/20 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60 tracking-wide">{c.tag}</div>
                  <div className="mt-2 text-xl font-semibold tracking-tight group-hover:text-white transition">
                    {c.name}
                  </div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Business connectivity availability by building and feasibility.
                  </p>
                </div>
                <span className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  View
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Service modules */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Common service modules</h2>
              <p className="mt-2 text-sm text-white/70 max-w-2xl leading-relaxed">
                Start with a city page, then choose a service module aligned to your operational needs.
                For critical environments, review DIA posture and continuity architecture.
              </p>
            </div>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Trust & Delivery Posture
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] hover:border-white/20 transition"
              >
                <div className="text-lg font-semibold tracking-tight">{s.name}</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.note}</p>
                <div className="mt-4 text-sm text-white/70">View service →</div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Request Access
            </Link>
            <Link
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Network
            </Link>
            <Link
              href="/solutions"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Solutions Modules
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}