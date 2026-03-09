import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

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
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Service Areas in Ontario | Orbitlink™ Locations",
    description:
      "Business internet across Ontario. Browse city pages, check availability by building, and request service through a structured onboarding process.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Ontario Service Areas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas in Ontario | Orbitlink™ Locations",
    description:
      "Explore Orbitlink service areas across Ontario for business fibre, dedicated internet, and managed network delivery.",
    images: [TWITTER_IMAGE_URL],
  },
};

type LocationCard = {
  name: string;
  href: string;
  subtitle: string;
  tags: string[];
  posture: string;
};

const GTA_CORE: readonly LocationCard[] = [
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle: "Business fibre and managed networking in select buildings and commercial corridors.",
    tags: ["High ROI", "SMB + offices", "On-net where available"],
    posture: "Primary commercial launch market",
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle: "Industrial and SMB demand with strong local commercial intent and structured qualification.",
    tags: ["High ROI", "Industrial corridors", "Availability by site"],
    posture: "Industrial and logistics-fit market",
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle: "Dense office market where delivery posture, uptime expectations, and escalation clarity matter.",
    tags: ["Office density", "DIA-ready", "Enterprise posture"],
    posture: "Enterprise-led market",
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle: "B2B office demand with uptime-sensitive business environments and managed network needs.",
    tags: ["B2B", "Managed LAN/Wi-Fi", "Static IP options"],
    posture: "Technology and office-fit market",
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle: "Commercial and industrial mix with multi-site connectivity requirements and continuity demand.",
    tags: ["Commercial", "Multi-site", "Continuity options"],
    posture: "Multi-site buyer market",
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle: "Premium SMB and professional-services footprint with service-quality expectations.",
    tags: ["Premium", "Professional services", "Operator-grade"],
    posture: "Premium commercial market",
  },
];

const GTA_EXTENDED: readonly LocationCard[] = [
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle: "Industrial growth with feasibility determined by building infrastructure and service path.",
    tags: ["Industrial growth", "Feasibility-first", "Structured onboarding"],
    posture: "Expansion market",
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle: "Business connectivity for office and light industrial environments with address-based qualification.",
    tags: ["Local intent", "Managed networking", "Availability by building"],
    posture: "Commercial expansion market",
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle: "Broad SMB footprint with strong local discovery behavior and building-by-building review.",
    tags: ["Near me", "SMB", "Feasibility-first"],
    posture: "Discovery-led market",
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle: "Broad regional demand with clear need for service scoping and documented delivery expectations.",
    tags: ["Big volume", "Broad intent", "Documented delivery"],
    posture: "Regional demand market",
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle: "Professional-services and business-critical demand with uptime expectations and enterprise evaluation.",
    tags: ["Professional services", "DIA-ready", "Support posture"],
    posture: "Strategic expansion market",
  },
];

const FAQ = [
  {
    q: "Do you service every address in these cities?",
    a: "No. Orbitlink availability is confirmed per building and depends on infrastructure, access feasibility, and upstream serviceability. Coverage is not assumed universally across a city.",
  },
  {
    q: "What should I submit for an availability check?",
    a: "Submit your service address, preferred service such as Business Fibre or DIA, any static IP needs, and whether you need managed LAN/Wi-Fi or LTE/5G continuity.",
  },
  {
    q: "Do you offer residential internet?",
    a: "Orbitlink is focused primarily on business connectivity and managed network delivery. If you have a mixed-use requirement, submit your details and Orbitlink will advise what is feasible.",
  },
  {
    q: "How fast can you install?",
    a: "Timelines depend on building readiness, access type, landlord coordination, and upstream serviceability. Orbitlink uses structured onboarding and documented acceptance so expectations are defined before activation.",
  },
] as const;

const serviceModules = [
  {
    t: "Business Fibre Internet",
    d: "Strong commercial value with disciplined onboarding and clean service activation.",
    href: "/services/business-fibre-internet",
  },
  {
    t: "Dedicated Internet Access (DIA)",
    d: "Deterministic performance posture for critical sites and uptime-sensitive operations.",
    href: "/services/dedicated-internet-access",
  },
  {
    t: "Managed LAN & Enterprise Wi-Fi",
    d: "Segmentation, visibility, and support aligned to modern business environments.",
    href: "/services/managed-lan-wifi",
  },
  {
    t: "LTE / 5G Continuity",
    d: "Continuity architecture for sites that require resilience during access disruption.",
    href: "/services/lte-5g-continuity",
  },
] as const;

const premiumSignals = [
  {
    t: "Availability by building",
    d: "Feasibility is confirmed per address before activation, not assumed by city name alone.",
  },
  {
    t: "Business-first posture",
    d: "Structured onboarding and documented delivery designed for commercial environments.",
  },
  {
    t: "Service clarity",
    d: "Business Fibre, DIA, managed networking, and continuity are aligned to operational need.",
  },
  {
    t: "Ontario-focused execution",
    d: "Priority city hubs designed for local discovery, service matching, and conversion.",
  },
] as const;

const buyerJourney = [
  {
    step: "01",
    title: "Choose the market",
    desc: "Start with the city that matches your building, expansion target, or local buying intent.",
  },
  {
    step: "02",
    title: "Choose the service",
    desc: "Match the requirement to business fibre, dedicated internet, managed networking, or continuity.",
  },
  {
    step: "03",
    title: "Confirm feasibility",
    desc: "Orbitlink reviews address-level serviceability, building conditions, and commercial fit before commitment.",
  },
  {
    step: "04",
    title: "Move into onboarding",
    desc: "Qualified requests move into a structured intake path with clear expectations and documented delivery.",
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
    image: OG_IMAGE_URL,
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/45">{children}</div>;
}

function MetricPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

function LocationCardView({ item }: { item: LocationCard }) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20 hover:bg-white/[0.05] sm:p-6 md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.22em] text-white/45">
            {item.posture.toUpperCase()}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.name}</h3>
          <p className="mt-3 text-sm leading-6 text-white/70">{item.subtitle}</p>
        </div>

        <Link
          href={item.href}
          className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
        >
          View
        </Link>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span
            key={t}
            className="rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function JourneyCard({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
    </div>
  );
}

export default function LocationsHubPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#09090B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-7 sm:pb-14 sm:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <span className="text-sm tracking-wide text-white/65">
              Ontario business service areas • address-qualified delivery
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Orbitlink locations across Ontario
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Browse city pages and move from local discovery to real qualification. Orbitlink
                aligns business fibre, dedicated internet access, managed network infrastructure,
                and continuity options to commercial requirements, with availability confirmed per
                building instead of assumed across an entire city.
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
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                  >
                    {x}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability
                </Link>
                <Link
                  href="/locations/ontario"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Ontario Coverage Hub
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Explore Services
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricPill label="BUYER FIT" value="Ontario business locations" />
                <MetricPill label="SERVICE MODEL" value="Address-first qualification" />
                <MetricPill label="DELIVERY STYLE" value="Clear and structured" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <SectionEyebrow>BUYING JOURNEY</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  Local discovery, then clean onboarding
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This hub is designed to shorten the path from city-level search intent to a
                  serviceability-led business conversation.
                </p>

                <div className="mt-5 grid gap-3">
                  {buyerJourney.map((item) => (
                    <JourneyCard
                      key={item.step}
                      step={item.step}
                      title={item.title}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>DISCOVERY POSTURE</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Built as the authority layer for city discovery
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                This page acts as the premium directory layer for Ontario city pages, province-level
                discovery, and conversion into availability review. City pages handle local intent.
                Service pages handle buying intent. Intake handles real qualification.
              </p>
            </div>

            <MetricPill label="MODE" value="Discovery • Match • Qualification" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {premiumSignals.map((x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>PRIORITY MARKETS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">GTA core markets</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                These are high-priority commercial markets where business fibre, dedicated internet,
                and managed network posture convert fastest. Each page is positioned to support
                local search, address-level inquiry, and structured onboarding.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-sm text-white/60 md:flex">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                Feasibility-first
              </span>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                Operator-grade
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GTA_CORE.map((item) => (
              <LocationCardView key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <SectionEyebrow>EXPANDED MARKETS</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Extended Ontario discovery</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            These pages support broader commercial demand, regional service discovery, and
            expansion conversations. Orbitlink confirms serviceability per address and avoids
            blanket coverage claims.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GTA_EXTENDED.map((item) => (
              <LocationCardView key={item.href} item={item} />
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE MATCHING</SectionEyebrow>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  Choose the right service path
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                  Location pages create local relevance. Service pages capture actual buying
                  intent. Choose the delivery model that matches the site, uptime requirement, and
                  operational expectation.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/45">COMMERCIAL MODE</div>
                <div className="mt-1 text-sm text-white/80">
                  Market discovery • Service match • Qualification
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {serviceModules.map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-semibold text-white/90">{x.t}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">{x.d}</div>
                  <div className="mt-4 text-xs text-white/55">Open service →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-black/20 p-6 md:p-8">
          <SectionEyebrow>AUTHORITY SIGNALS</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            Hub authority and trust posture
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink’s business presence is anchored in Mississauga and focused on Ontario
            business connectivity. This page acts as the city-directory authority layer, while
            province and city pages strengthen local relevance and capture real commercial demand.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
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

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Locations FAQs</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Quick answers that help move from search to availability review without confusion.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight text-white">{f.q}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Trust & Delivery Posture
            </Link>
            <Link
              href="/network"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Network
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}