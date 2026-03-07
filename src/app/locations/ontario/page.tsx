import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/ontario";
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
  title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
  description:
    "Business internet coverage across Ontario for fibre, dedicated internet access, managed network infrastructure, voice, and continuity architecture. Availability confirmed per building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
    description:
      "Operator-grade business connectivity across Ontario with structured onboarding, documented delivery, and availability confirmed per address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
    description:
      "Explore Orbitlink business internet coverage across Ontario for fibre, DIA, and managed network service modules.",
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
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle: "High concentration of SMB and office demand with strong fibre intent.",
    tier: "GTA Core",
    tags: ["High ROI", "SMB + offices", "On-net where available"],
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle: "Industrial and SMB demand with strong local commercial search behavior.",
    tier: "GTA Core",
    tags: ["High ROI", "Industrial corridors", "Feasibility-first"],
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle: "Dense office market where delivery posture and support quality matter.",
    tier: "GTA Core",
    tags: ["Office density", "DIA-ready", "Enterprise posture"],
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle: "B2B office demand with high uptime expectations and managed network fit.",
    tier: "GTA Core",
    tags: ["B2B", "Managed LAN/Wi-Fi", "Static IP options"],
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle: "Commercial and industrial mix with multi-site business demand.",
    tier: "GTA Core",
    tags: ["Commercial", "Multi-site", "Continuity options"],
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle: "Premium SMB and professional-services footprint with quality expectations.",
    tier: "GTA Core",
    tags: ["Premium", "Professional services", "Operator-grade"],
  },
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle: "Industrial growth market where infrastructure varies by site.",
    tier: "GTA Extended",
    tags: ["Industrial growth", "Feasibility-first", "Structured onboarding"],
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle: "Office and light industrial demand with strong local intent.",
    tier: "GTA Extended",
    tags: ["Local intent", "Managed networking", "Availability by building"],
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle: "Broad SMB footprint with strong ‘internet near me’ search demand.",
    tier: "GTA Extended",
    tags: ["Near me", "SMB", "Feasibility-first"],
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle: "Broad regional demand with strong need for clear scoping and delivery posture.",
    tier: "GTA Extended",
    tags: ["Big volume", "Broad intent", "Documented delivery"],
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle: "Professional-services and business-critical demand with uptime expectations.",
    tier: "Ontario",
    tags: ["Professional services", "DIA-ready", "Support posture"],
  },
];

const FAQ = [
  {
    q: "Is Orbitlink available everywhere in Ontario?",
    a: "No. Orbitlink availability depends on building infrastructure, access feasibility, and upstream serviceability. Coverage is confirmed per address before activation rather than assumed across an entire city or region.",
  },
  {
    q: "What does availability confirmed per building mean?",
    a: "It means Orbitlink validates serviceability, constraints, access method, and delivery posture at your service address before activation. This reduces surprises during install and improves go-live clarity.",
  },
  {
    q: "Which service should I choose: Business Fibre or DIA?",
    a: "Business Fibre is usually the right fit for strong value, stable business connectivity, and disciplined onboarding. Dedicated Internet Access is better suited to critical environments requiring a more deterministic delivery posture.",
  },
  {
    q: "Do you support managed networking in Ontario?",
    a: "Yes. Orbitlink supports managed LAN and enterprise Wi-Fi, including segmentation posture, guest networking, and coverage planning aligned to a business-grade support model.",
  },
] as const;

const coveragePosture = [
  {
    t: "Feasibility-first",
    d: "Orbitlink confirms serviceability per address before activation.",
  },
  {
    t: "Module clarity",
    d: "Business Fibre vs DIA is selected based on operational need, not guesswork.",
  },
  {
    t: "Documented delivery",
    d: "Clear checkpoints improve install posture and acceptance readiness.",
  },
  {
    t: "Support posture",
    d: "Enterprise-style escalation patterns align with business expectations.",
  },
] as const;

const serviceModules = [
  {
    t: "Business Fibre Internet",
    href: "/services/business-fibre-internet",
    d: "Strong value with disciplined onboarding.",
  },
  {
    t: "Dedicated Internet Access (DIA)",
    href: "/services/dedicated-internet-access",
    d: "Deterministic posture for critical sites.",
  },
  {
    t: "Managed LAN & Enterprise Wi-Fi",
    href: "/services",
    d: "Segmentation posture, stability, and internal network support.",
  },
  {
    t: "LTE / 5G Continuity",
    href: "/services/lte-5g-continuity",
    d: "Uptime patterns for disruption events.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Ontario", item: PAGE_URL },
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

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#locations`,
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
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet & Fibre in Ontario",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed LAN and Enterprise Wi-Fi",
      "VoIP and Cloud Voice",
      "LTE and 5G Continuity",
      "Static IP Routing",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: PAGE_URL,
    },
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

export default function OntarioHubPage() {
  const gtaCore = CITIES.filter((c) => c.tier === "GTA Core");
  const gtaExt = CITIES.filter((c) => c.tier === "GTA Extended");
  const ont = CITIES.filter((c) => c.tier === "Ontario");

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
          <span className="text-sm tracking-wide text-white/60">Ontario Coverage Hub</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Ontario business internet & fibre coverage
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink supports Ontario businesses with operator-grade onboarding, documented delivery,
          and premium support posture. Coverage is confirmed per address and building feasibility,
          not assumed generically. Use this hub to navigate priority city pages and the right
          service modules for your environment.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Ontario coverage hub",
            "Availability by building",
            "Business-first posture",
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
            This is how Orbitlink maintains a premium operator experience across Ontario without
            overclaiming coverage or timelines.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {coveragePosture.map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold tracking-tight">Choose the right service module</h3>
            <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
              Ontario coverage creates discoverability. Service modules capture the real buying
              intent. Choose the delivery posture that matches your operational environment.
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

      {/* Cities */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Top Ontario markets</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Start with these city hubs. Each page supports local search intent, internal linking,
            FAQs, and service discovery for business internet buyers.
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

      {/* Local authority strip */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Ontario authority posture</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/70 leading-relaxed">
            Orbitlink’s business presence is anchored in Mississauga and focused on Ontario business
            connectivity. The most effective next step is to submit your address and requirements so
            feasibility can be confirmed before activation.
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

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Ontario FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Operational answers that reduce ambiguity and help buyers move to an availability request faster.
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
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Service Modules
            </Link>
            <Link
              href="/internet-near-me"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Internet Near Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}