import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Locations | Orbitlink™ — Ontario Business Connectivity",
  description:
    "Orbitlink provides operator-grade business connectivity across Ontario. Browse service locations including the GTA, Mississauga, Toronto, Brampton, Ottawa, and more.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Service Locations | Orbitlink™",
    description:
      "Operator-grade business connectivity across Ontario. Explore Orbitlink service locations and request availability.",
    url: "/locations",
    type: "website",
  },
};

const LOCATIONS = [
  { name: "Ontario (Coverage Hub)", href: "/locations/ontario", tag: "Province" },
  { name: "Toronto", href: "/locations/toronto", tag: "GTA" },
  { name: "Mississauga", href: "/locations/mississauga", tag: "GTA" },
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

const SERVICE_LINKS = [
  { name: "Business Fibre Internet", href: "/services/business-fibre-internet" },
  { name: "Dedicated Internet Access (DIA)", href: "/services/dedicated-internet-access" },
  { name: "Managed LAN & Enterprise Wi-Fi", href: "/services/managed-lan-wifi" },
  { name: "LTE / 5G Continuity", href: "/services/lte-5g-continuity" },
  { name: "VoIP & Cloud Voice", href: "/services/voip-cloud-voice" },
  { name: "Static IP Routing", href: "/services/static-ip-routing" },
] as const;

export default function LocationsHubPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Coverage</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Orbitlink Service Locations
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink provides operator-grade business connectivity across Ontario. Availability
          is <span className="text-white/85 font-medium">on-net where available</span>, with clear scoping when
          additional build work is required. Start with your city to review coverage posture and
          request availability.
        </p>

        {/* Proof chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["On-net where available", "Structured onboarding", "Documented delivery", "Enterprise support posture"].map(
            (x) => (
              <span
                key={x}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
              >
                {x}
              </span>
            )
          )}
        </div>

        {/* CTAs */}
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
      </section>

      {/* Locations grid */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-xl font-semibold tracking-tight">Browse by location</h2>
          <p className="text-sm text-white/60 max-w-lg">
            For multi-site environments, start with the Ontario hub and map services to each site.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {LOCATIONS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] hover:border-white/20 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60 tracking-wide">{l.tag}</div>
                  <div className="mt-2 text-xl font-semibold tracking-tight group-hover:text-white transition">
                    {l.name}
                  </div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Business connectivity services, availability by building and feasibility.
                  </p>
                </div>

                <span className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  View
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Fibre", "DIA", "Managed LAN/Wi-Fi", "Continuity"].map((x) => (
                  <span
                    key={x}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services quick links */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Common service modules</h3>
              <p className="mt-2 text-sm text-white/70 max-w-2xl leading-relaxed">
                Pair a location with a service module to align scope and onboarding. For critical operations,
                we recommend reviewing broadband vs DIA and continuity posture.
              </p>
            </div>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Trust & Delivery Posture
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}