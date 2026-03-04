import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations";
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
  title: "Service Areas | Orbitlink™ Locations",
  description:
    "Explore Orbitlink service areas across Ontario. Operator-grade business connectivity with structured onboarding, documented delivery, and enterprise support posture.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Service Areas | Orbitlink™ Locations",
    description:
      "Operator-grade business connectivity across Ontario. Check availability by building and request access with a disciplined onboarding posture.",
    url: PAGE_PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Orbitlink™ Locations",
    description:
      "Explore Orbitlink service areas across Ontario. Check availability and request access.",
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
    subtitle: "Business fibre + managed networking in select buildings.",
    tags: ["High ROI", "SMB + offices", "On-net where available"],
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle: "Industrial + SMB demand with strong local intent.",
    tags: ["Highest ROI", "Industrial corridors", "Availability by site"],
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle: "Dense office market where delivery posture matters.",
    tags: ["Office density", "DIA-ready", "Enterprise posture"],
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle: "B2B offices and high uptime expectations.",
    tags: ["B2B", "Managed LAN/Wi-Fi", "Static IP options"],
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle: "Commercial + industrial mix with multi-site demand.",
    tags: ["Commercial", "Multi-site", "Continuity options"],
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle: "Premium SMB and professional services footprint.",
    tags: ["Premium", "Professional services", "Operator-grade"],
  },
];

const GTA_EXTENDED: LocationCard[] = [
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle: "Industrial growth with variability by site infrastructure.",
    tags: ["Industrial growth", "Feasibility-first", "Structured onboarding"],
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle: "Business connectivity for offices and light industrial.",
    tags: ["Local intent", "Managed networking", "Availability by building"],
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle: "Broad SMB footprint with strong “near me” intent.",
    tags: ["Near me", "SMB", "Feasibility-first"],
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle: "Large area intent—clear scoping and disciplined delivery.",
    tags: ["Big volume", "Broad intent", "Documented delivery"],
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle: "Professional-services demand with uptime expectations.",
    tags: ["Professional services", "DIA-ready", "Support posture"],
  },
];

const FAQ = [
  {
    q: "Do you service every address in these cities?",
    a: "No. Orbitlink availability is on-net where feasible and varies by building infrastructure and upstream serviceability. We confirm feasibility per address before activation.",
  },
  {
    q: "What should I submit for an availability check?",
    a: "Your service address, required module (Business Fibre vs DIA), any static IP needs, and whether you want managed LAN/Wi-Fi or continuity (LTE/5G).",
  },
  {
    q: "Do you offer residential internet?",
    a: "Orbitlink is focused on business connectivity and managed network posture. If you have a mixed-use requirement, submit details and we’ll advise what’s feasible.",
  },
  {
    q: "How fast can you install?",
    a: "Timelines depend on building readiness, access type, and upstream coordination. Orbitlink uses structured onboarding and documented acceptance so expectations are defined before activation.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: PAGE_URL },
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

  const all = [...GTA_CORE, ...GTA_EXTENDED];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
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
          <span key={t} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Areas</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Orbitlink locations across Ontario
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Find your city and request availability. Orbitlink delivers business connectivity with a disciplined posture:
          structured onboarding, documented acceptance, and enterprise support posture. Coverage is{" "}
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

      {/* GTA Core */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">GTA core markets</h2>
              <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
                High-ROI regions where business fibre, DIA, and managed network posture convert fastest. Each location page
                includes FAQs + schema + internal links.
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

      {/* GTA Extended + Key Ontario */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Expanded markets</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Strong “near me” intent and growth corridors. Orbitlink confirms serviceability per address and scopes constraints
            before activation—no overclaims.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GTA_EXTENDED.map((item) => (
              <Card key={item.href} item={item} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold tracking-tight">Choose your service module</h3>
            <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
              Location gets attention. Service modules close deals. Pick the posture that matches your operational needs.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  t: "Business Fibre Internet",
                  d: "Strong value + disciplined onboarding.",
                  href: "/services/business-fibre-internet",
                },
                {
                  t: "Dedicated Internet Access (DIA)",
                  d: "Deterministic posture for critical sites.",
                  href: "/services/dedicated-internet-access",
                },
                {
                  t: "Managed LAN & Enterprise Wi-Fi",
                  d: "Segmentation posture + stability.",
                  href: "/services/managed-lan-wifi",
                },
                {
                  t: "LTE / 5G Continuity",
                  d: "Uptime patterns for disruption events.",
                  href: "/services/lte-5g-continuity",
                },
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

      {/* FAQs */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Locations FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Quick answers so buyers can move from “search” to “request access” without confusion.
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