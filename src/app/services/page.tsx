// src/app/services/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Orbitlink™ — Business Fibre, DIA, Managed Network",
  description:
    "Operator-grade connectivity and managed infrastructure: business fibre, dedicated internet access (DIA), managed LAN & Wi-Fi, continuity, voice, IoT uplinks, colocation, and static IP routing.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Orbitlink™",
    description:
      "Business Fibre, DIA, Managed LAN & Wi-Fi, Continuity Architecture, Voice, IoT, Colocation, and Static IP Routing.",
    url: "/services",
    type: "website",
  },
};

const SERVICES = [
  {
    title: "Business Fibre Internet",
    subtitle: "Symmetrical bandwidth. Controlled onboarding. Operator posture.",
    href: "/services/business-fibre-internet",
    bullets: ["AUREX 150 / 500 / GIG+", "On-net where available", "Structured activation"],
    tag: "AUREX Internet",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    subtitle: "Deterministic performance for critical sites and workloads.",
    href: "/services/dedicated-internet-access",
    bullets: ["Committed bandwidth options", "SLA-driven delivery", "Ideal for HQ + multi-site"],
    tag: "AUREX Internet",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    subtitle: "Clean, managed networking that stays out of your way.",
    href: "/services/managed-lan-wifi",
    bullets: ["Business Wi-Fi architecture", "Segmentation + guest networks", "Operator-grade support"],
    tag: "Managed Network",
  },
  {
    title: "LTE / 5G Continuity Architecture",
    subtitle: "Keep operations online during access disruptions.",
    href: "/services/lte-5g-continuity",
    bullets: ["Failover design patterns", "Primary/secondary pathways", "Business continuity posture"],
    tag: "Continuity",
  },
  {
    title: "Starlink (Agent / Reseller)",
    subtitle: "Satellite connectivity where terrestrial options are limited.",
    href: "/services/starlink-agent",
    bullets: ["Agent/reseller model", "Use-cases + constraints explained", "Add-on continuity option"],
    tag: "Agent Services",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle: "Place critical gear closer to the network edge.",
    href: "/services/colocation-infrastructure",
    bullets: ["Cross-connect guidance", "Rack/space coordination", "Infrastructure-grade approach"],
    tag: "Infrastructure",
  },
  {
    title: "IoT Connectivity & Secure Uplinks",
    subtitle: "Purpose-built uplinks for sensors, gateways, and managed devices.",
    href: "/services/iot-connectivity",
    bullets: ["AUREX Smart positioning", "Secure uplink patterns", "Operational monitoring-ready"],
    tag: "AUREX Smart",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle: "Modern voice services for teams that need reliability and clarity.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice options", "Numbering + porting support", "Business-ready routing"],
    tag: "AUREX Voice",
  },
  {
    title: "Static IP Routing",
    subtitle: "Addressing options for VPNs, servers, and fixed endpoints.",
    href: "/services/static-ip-routing",
    bullets: ["Static IP options (where available)", "Routing posture explained", "Best practices included"],
    tag: "Operator Layer",
  },
] as const;

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* Top band */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            <span className="text-sm tracking-wide text-white/60">
              Operator-Grade Service Modules
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Connectivity & Infrastructure Services
          </h1>

          <p className="max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
            Orbitlink delivers business connectivity with a disciplined delivery posture —
            controlled onboarding, documented acceptance, and enterprise-minded support.
            Services are available on-net where possible, with clear scoping when additional
            build work is required.
          </p>

          {/* Proof chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "On-net where available",
              "Structured onboarding",
              "Documented delivery",
              "Enterprise support posture",
            ].map((x) => (
              <span
                key={x}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
              >
                {x}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Check Availability / Request Access
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Review Trust & Delivery Posture
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] hover:border-white/20 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60 tracking-wide">{s.tag}</div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-white transition">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    {s.subtitle}
                  </p>
                </div>

                <span className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  View
                </span>
              </div>

              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="text-sm text-white/70 flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        {/* Bottom internal links */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-lg font-semibold tracking-tight">Next steps</h3>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            If you’re evaluating a site, we recommend starting with the location page for your city
            and then mapping services to your operational requirements (broadband vs DIA, managed LAN,
            continuity posture, and static IP needs).
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/locations/mississauga"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              Ontario Coverage
            </Link>
            <Link
              href="/solutions"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              Solutions Modules
            </Link>
            <Link
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              Network
            </Link>
            <Link
              href="/contact#intake"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              Request Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}