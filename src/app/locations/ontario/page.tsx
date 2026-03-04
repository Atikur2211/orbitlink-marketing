import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/ontario";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: "TIRAV Technologies Inc. o/a Orbitlink",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
  address: {
    street: "30 Eglinton Ave W, Suite 400-A77",
    city: "Mississauga",
    region: "ON",
    postal: "L5R 3E7",
    country: "CA",
  },
  hours: [
    { day: "Monday", opens: "09:00", closes: "18:00" },
    { day: "Tuesday", opens: "09:00", closes: "18:00" },
    { day: "Wednesday", opens: "09:00", closes: "18:00" },
    { day: "Thursday", opens: "09:00", closes: "18:00" },
    { day: "Friday", opens: "09:00", closes: "18:00" },
  ],
};

export const metadata: Metadata = {
  title: "Ontario Business Internet & Fibre | Orbitlink™ Coverage Hub",
  description:
    "Orbitlink Ontario coverage hub for business fibre, DIA, managed LAN & Wi-Fi, voice, and continuity architecture. Availability confirmed per building. Request access.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Ontario Business Internet & Fibre | Orbitlink™ Coverage Hub",
    description:
      "Operator-grade business connectivity across Ontario: structured onboarding, documented delivery, and enterprise support posture. Check availability by building.",
    url: PAGE_PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontario Business Internet & Fibre | Orbitlink™ Coverage Hub",
    description:
      "Explore Orbitlink coverage across Ontario. Availability confirmed per building. Request access.",
  },
};

type City = {
  name: string;
  href: string;
  subtitle: string;
  tier: "GTA Core" | "GTA Extended" | "Ontario";
  tags: string[];
};

const CITIES: City[] = [
  // GTA Core
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle: "High concentration of SMB + offices. Strong fibre demand.",
    tier: "GTA Core",
    tags: ["High ROI", "SMB + offices", "On-net where available"],
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle: "Industrial + SMB with strong local “near me” intent.",
    tier: "GTA Core",
    tags: ["Highest ROI", "Industrial corridors", "Feasibility-first"],
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle: "Dense office market—delivery posture matters.",
    tier: "GTA Core",
    tags: ["Office density", "DIA-ready", "Enterprise posture"],
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle: "B2B offices with high uptime expectations.",
    tier: "GTA Core",
    tags: ["B2B", "Managed LAN/Wi-Fi", "Static IP options"],
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle: "Commercial + industrial mix with multi-site needs.",
    tier: "GTA Core",
    tags: ["Commercial", "Multi-site", "Continuity options"],
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle: "Premium SMB and professional services footprint.",
    tier: "GTA Core",
    tags: ["Premium", "Professional services", "Operator-grade"],
  },

  // GTA Extended
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle: "Industrial growth; infrastructure varies by site.",
    tier: "GTA Extended",
    tags: ["Industrial growth", "Feasibility-first", "Structured onboarding"],
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle: "Offices + light industrial with strong local intent.",
    tier: "GTA Extended",
    tags: ["Local intent", "Managed networking", "Availability by building"],
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle: "Broad SMB footprint with strong “near me” searches.",
    tier: "GTA Extended",
    tags: ["Near me", "SMB", "Feasibility-first"],
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle: "Large area intent—clear scoping and disciplined delivery.",
    tier: "GTA Extended",
    tags: ["Big volume", "Broad intent", "Documented delivery"],
  },

  // Ontario (outside GTA core)
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle: "Professional-services demand with uptime expectations.",
    tier: "Ontario",
    tags: ["Professional services", "DIA-ready", "Support posture"],
  },
];

const FAQ = [
  {
    q: "Is Orbitlink available everywhere in Ontario?",
    a: "No. Orbitlink is available on-net where feasible and varies by building infrastructure and upstream serviceability. We confirm feasibility per address before activation—no overclaims.",
  },
  {
    q: "What does “availability confirmed per building” mean?",
    a: "It means Orbitlink validates serviceability and constraints at your service address (building readiness, access type, upstream feasibility) before you activate.",
  },
  {
    q: "Which service should I choose: Business Fibre or DIA?",
    a: "Business Fibre is ideal for strong value with disciplined delivery posture. DIA is best when you require deterministic performance and a formal delivery posture for critical operations.",
  },
  {
    q: "Do you support managed networking in Ontario?",
    a: "Yes. Orbitlink provides Managed LAN & Enterprise Wi-Fi with segmentation posture, guest networks, and coverage planning—aligned to an operator-grade support posture.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Ontario", item: PAGE_URL },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TelecomCompany"],
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postal,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: [{ "@type": "AdministrativeArea", name: "Ontario" }],
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    })),
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Orbitlink Ontario service areas",
    itemListElement: CITIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE_URL}${c.href}`,
    })),
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Internet & Fibre in Ontario",
    provider: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access (DIA)",
      "Managed LAN & Enterprise Wi-Fi",
      "VoIP & Cloud Voice",
      "LTE / 5G Continuity Architecture",
      "Static IP Routing",
    ],
    availableChannel: { "@type": "ServiceChannel", serviceUrl: PAGE_URL },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return [breadcrumb, localBusiness, itemList, telecomService, faqPage];
}

function CityCard({ c }: { c: City }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-white/60">{c.tier}</div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">{c.name}</h3>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">{c.subtitle}</p>
        </div>
        <Link
          href={c.href}
          className="shrink-0 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
        >
          View
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <span key={t} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function OntarioHubPage() {
  const gtaCore = CITIES.filter((c) => c.tier === "GTA Core");
  const gtaExt = CITIES.filter((c) => c.tier === "GTA Extended");
  const ont = CITIES.filter((c) => c.tier === "Ontario");

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Ontario Coverage Hub</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Ontario business internet & fibre coverage
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink serves Ontario with an operator-grade posture: structured onboarding, documented acceptance, and
          enterprise support posture. Coverage is{" "}
          <span className="text-white/85 font-medium">on-net where available</span>—we confirm feasibility per address.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Availability / Request Access
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            All Locations
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Service Modules
          </Link>
        </div>
      </section>

      {/* Coverage posture */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Coverage posture</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            This is how Orbitlink avoids overclaiming and delivers a premium operator experience.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                t: "Feasibility-first",
                d: "We confirm serviceability per address before activation.",
              },
              {
                t: "Module clarity",
                d: "Business Fibre vs DIA selected based on operational needs.",
              },
              {
                t: "Documented delivery",
                d: "Clear checkpoints for install + acceptance posture.",
              },
              {
                t: "Support posture",
                d: "Enterprise escalation patterns and structured ticketing.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold tracking-tight">Choose your module</h3>
            <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
              Ontario coverage gets attention. Your service module closes the deal.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { t: "Business Fibre Internet", href: "/services/business-fibre-internet", d: "Strong value + disciplined onboarding." },
                { t: "Dedicated Internet Access (DIA)", href: "/services/dedicated-internet-access", d: "Deterministic posture for critical sites." },
                { t: "Managed LAN & Enterprise Wi-Fi", href: "/services/managed-lan-wifi", d: "Segmentation posture + stability." },
                { t: "LTE / 5G Continuity", href: "/services/lte-5g-continuity", d: "Uptime patterns for disruption events." },
              ].map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 hover:bg-white/[0.06] transition"
                >
                  <div className="text-sm font-semibold text-white/90">{x.t}</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</div>
                  <div className="mt-3 text-xs text-white/60">Open module →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Top Ontario markets</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Start with these hubs. Each page includes SEO structure, FAQs, and schema aligned to “near me” and city-intent searches.
          </p>

          <h3 className="mt-7 text-lg font-semibold tracking-tight text-white">GTA core</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gtaCore.map((c) => (
              <CityCard key={c.href} c={c} />
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold tracking-tight text-white">GTA extended</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gtaExt.map((c) => (
              <CityCard key={c.href} c={c} />
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold tracking-tight text-white">Outside GTA</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ont.map((c) => (
              <CityCard key={c.href} c={c} />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Check Availability
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Trust & Delivery Posture
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Browse Locations
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Ontario FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Short, operational answers that reduce friction and increase conversions.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}