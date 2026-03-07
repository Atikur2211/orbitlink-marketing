import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

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
  title: "Service Areas in Ontario | Business Internet Locations | Orbitlink™",
  description:
    "Explore Orbitlink service areas across Ontario for business fibre internet, dedicated internet access, managed network infrastructure, and availability by building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Service Areas in Ontario | Orbitlink™ Locations",
    description:
      "Operator-grade business internet across Ontario. Browse city pages, check availability by building, and request access with a structured onboarding posture.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas in Ontario | Orbitlink™ Locations",
    description:
      "Explore Orbitlink service areas across Ontario for business fibre, DIA, and managed network delivery.",
  },
};

type LocationCard = {
  name: string;
  href: string;
  subtitle: string;
  tags: string[];
};

const GTA_CORE: LocationCard[] = [
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle: "Business fibre and managed networking in select buildings.",
    tags: ["High ROI", "SMB + offices", "On-net where available"],
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle: "Industrial and SMB demand with strong local commercial intent.",
    tags: ["High ROI", "Industrial corridors", "Availability by site"],
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle: "Dense office market where delivery posture and uptime matter.",
    tags: ["Office density", "DIA-ready", "Enterprise posture"],
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle: "B2B office demand with uptime-sensitive business environments.",
    tags: ["B2B", "Managed LAN/Wi-Fi", "Static IP options"],
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle: "Commercial and industrial mix with multi-site connectivity needs.",
    tags: ["Commercial", "Multi-site", "Continuity options"],
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle: "Premium SMB and professional-services footprint.",
    tags: ["Premium", "Professional services", "Operator-grade"],
  },
];

const GTA_EXTENDED: LocationCard[] = [
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle: "Industrial growth with feasibility determined by site infrastructure.",
    tags: ["Industrial growth", "Feasibility-first", "Structured onboarding"],
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle: "Business connectivity for office and light industrial environments.",
    tags: ["Local intent", "Managed networking", "Availability by building"],
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle: "Broad SMB footprint with strong 'near me' search behavior.",
    tags: ["Near me", "SMB", "Feasibility-first"],
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle: "Broad regional demand with strong need for clear service scoping.",
    tags: ["Big volume", "Broad intent", "Documented delivery"],
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle: "Professional-services and business-critical demand with uptime expectations.",
    tags: ["Professional services", "DIA-ready", "Support posture"],
  },
];

const FAQ = [
  {
    q: "Do you service every address in these cities?",
    a: "No. Orbitlink availability is confirmed per building and depends on infrastructure, access feasibility, and upstream serviceability. Coverage is not assumed universally across a city.",
  },
  {
    q: "What should I submit for an availability check?",
    a: "Submit your service address, preferred module such as Business Fibre or DIA, any static IP needs, and whether you need managed LAN/Wi-Fi or LTE/5G continuity.",
  },
  {
    q: "Do you offer residential internet?",
    a: "Orbitlink is focused primarily on business connectivity and managed network posture. If you have a mixed-use requirement, submit your details and Orbitlink will advise what is feasible.",
  },
  {
    q: "How fast can you install?",
    a: "Timelines depend on building readiness, access type, landlord coordination, and upstream serviceability. Orbitlink uses structured onboarding and documented acceptance so expectations are defined before activation.",
  },
] as const;

const serviceModules = [
  {
    t: "Business Fibre Internet",
    d: "Strong value with disciplined onboarding.",
    href: "/services/business-fibre-internet",
  },
  {
    t: "Dedicated Internet Access (DIA)",
    d: "Deterministic posture for critical sites.",
    href: "/services/dedicated-internet-access",
  },
  {
    t: "Managed LAN & Enterprise Wi-Fi",
    d: "Segmentation posture, stability, and support.",
    href: "/services",
  },
  {
    t: "LTE / 5G Continuity",
    d: "Uptime patterns for disruption events.",
    href: "/services/lte-5g-continuity",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: PAGE_URL },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TelecomCompany"],
    "@id": `${PAGE_URL}#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    email: "concierge@orbitlink.ca",
    parentOrganization: { "@id": ORG_ID },
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

  const all = [...GTA_CORE, ...GTA_EXTENDED];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#locations`,
    name: "Orbitlink service areas",
    itemListElement: all.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.name,
      url: `${SITE_URL}${l.href}`,
    })),
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

  return [breadcrumb, localBusiness, itemList, faqPage];
}

function Card({ item }: { item: LocationCard }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.subtitle}</p>
        </div>
        <Link
          href={item.href}
          className="shrink-0 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
        >
          View
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span
            key={t}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LocationsHubPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Areas</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Orbitlink locations across Ontario
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Browse city pages and request availability for business internet across Ontario.
          Orbitlink delivers business fibre, DIA, and network service modules with structured
          onboarding, documented acceptance, and a premium support posture. Coverage is confirmed
          per building and serviceability, not assumed generically.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Ontario service footprint",
            "Business-first posture",
            "Availability by building",
            "Structured onboarding",
            "Documented delivery",
          ].map((x) => (
            <span
              key={x}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
            >
              {x}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Availability
          </Link>
          <Link
            href="/locations/ontario"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Ontario Coverage Hub
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* Core markets */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">GTA core markets</h2>
              <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
                These are high-priority commercial markets where business fibre, DIA, and managed
                network posture convert fastest. Each location page is designed to support local
                search intent and direct availability checks.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-white/60">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1">Feasibility-first</span>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1">Operator-grade</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GTA_CORE.map((item) => (
              <Card key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Expanded markets */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Expanded markets</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            These pages support broader “internet near me” demand, commercial expansion, and
            regional service discovery. Orbitlink confirms serviceability per address and avoids
            blanket coverage claims.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GTA_EXTENDED.map((item) => (
              <Card key={item.href} item={item} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold tracking-tight">Choose the right service module</h3>
            <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
              Location pages create local relevance. Service modules capture the actual buyer intent.
              Choose the delivery posture that matches your operational needs.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {serviceModules.map((x) => (
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

      {/* Local authority strip */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Local authority signals</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/70 leading-relaxed">
            Orbitlink’s business presence is anchored in Mississauga and focused on Ontario business
            connectivity. The best next step is always to submit your address and service needs so
            serviceability can be confirmed clearly before activation.
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
              Address: {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.region}{" "}
              {BUSINESS.address.postal}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
              Phone: {BUSINESS.phoneDisplay}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
              Availability: confirmed per address
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Locations FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Quick answers to move from “search” to “request access” without ambiguity.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.a}</p>
              </div>
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
              href="/network"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Network
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}