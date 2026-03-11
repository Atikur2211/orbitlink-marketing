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
} as const;

export const metadata: Metadata = {
  title: "Ontario Business Internet Locations | Orbitlink™",
  description:
    "Browse Orbitlink Ontario locations for business fibre internet, dedicated internet access, managed Wi-Fi, backup connectivity, and address-qualified availability.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Ontario Business Internet Locations | Orbitlink™",
    description:
      "Explore Orbitlink city pages across Ontario for business fibre, dedicated internet, managed network services, and address-qualified availability.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Ontario business internet locations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontario Business Internet Locations | Orbitlink™",
    description:
      "Orbitlink city pages across Ontario for business fibre internet, DIA, managed Wi-Fi, and continuity services.",
    images: [TWITTER_IMAGE_URL],
  },
};

type LocationCard = {
  name: string;
  href: string;
  subtitle: string;
  tags: readonly string[];
  posture: string;
};

const GTA_CORE: readonly LocationCard[] = [
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle: "Priority commercial market for business fibre, managed networking, and structured onboarding.",
    tags: ["Priority", "Commercial", "Business fibre"],
    posture: "Primary market",
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle: "Industrial, warehouse, and SMB business internet with address-qualified delivery review.",
    tags: ["Industrial", "SMB", "Warehouse"],
    posture: "Growth market",
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle: "Business connectivity for office, commercial, and uptime-sensitive environments.",
    tags: ["Office", "Enterprise", "DIA-ready"],
    posture: "Enterprise market",
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle: "Business internet and managed networking for office, B2B, and technology-led sites.",
    tags: ["B2B", "Managed Wi-Fi", "Static IP"],
    posture: "Technology market",
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle: "Commercial and industrial connectivity for multi-site operations and continuity-driven buyers.",
    tags: ["Commercial", "Multi-site", "Continuity"],
    posture: "Multi-site market",
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle: "Premium business internet and managed network service for professional-service environments.",
    tags: ["Premium", "Professional", "Business-grade"],
    posture: "Premium market",
  },
  {
    name: "Oshawa",
    href: "/locations/oshawa",
    subtitle: "Strong market for industrial, logistics, and growth-oriented business connectivity.",
    tags: ["Industrial", "Logistics", "Growth"],
    posture: "Strategic market",
  },
];

const EXPANDED_MARKETS: readonly LocationCard[] = [
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle: "Industrial growth corridor with business internet reviewed by building and service fit.",
    tags: ["Industrial growth", "Address review", "Expansion"],
    posture: "Expansion market",
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle: "Commercial and light industrial business connectivity with building-based qualification.",
    tags: ["Commercial", "Light industrial", "Managed network"],
    posture: "Commercial market",
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle: "Broad SMB and commercial demand supported by address-qualified service review.",
    tags: ["SMB", "Commercial", "Address review"],
    posture: "Discovery market",
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle: "Regional industrial and commercial market with structured onboarding and delivery posture.",
    tags: ["Regional", "Industrial", "Structured onboarding"],
    posture: "Regional market",
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle: "Professional and uptime-sensitive environments with stronger enterprise delivery expectations.",
    tags: ["Professional", "Enterprise", "DIA-ready"],
    posture: "Strategic market",
  },
  {
    name: "Whitby",
    href: "/locations/whitby",
    subtitle: "Durham-region business demand with strong local intent and clean service qualification.",
    tags: ["Durham", "Local intent", "Business fibre"],
    posture: "Emerging market",
  },
  {
    name: "Newmarket",
    href: "/locations/newmarket",
    subtitle: "High-intent SMB and office demand with a strong fit for managed networking and fibre.",
    tags: ["SMB", "Office", "Managed Wi-Fi"],
    posture: "Emerging market",
  },
  {
    name: "Aurora",
    href: "/locations/aurora",
    subtitle: "Business-grade connectivity for professional environments and high-uptime office operations.",
    tags: ["Professional", "Office", "Uptime"],
    posture: "Emerging market",
  },
  {
    name: "Richmond Hill",
    href: "/locations/richmond-hill",
    subtitle: "B2B and office demand supported by clean onboarding and address-based service matching.",
    tags: ["B2B", "Office", "Business-grade"],
    posture: "Emerging market",
  },
  {
    name: "Kitchener-Waterloo",
    href: "/locations/kitchener-waterloo",
    subtitle: "Modern office and tech-led market with strong fit for fibre and managed network posture.",
    tags: ["Tech", "Office", "Managed LAN"],
    posture: "Regional market",
  },
  {
    name: "London",
    href: "/locations/london",
    subtitle: "Broad commercial demand and high local search intent with structured business qualification.",
    tags: ["Commercial", "Regional", "High intent"],
    posture: "Regional market",
  },
  {
    name: "Barrie",
    href: "/locations/barrie",
    subtitle: "Growth-market business internet with strong local discovery intent and address review.",
    tags: ["Growth", "Local intent", "Business fibre"],
    posture: "Regional market",
  },
];

const serviceModules = [
  {
    t: "Business Fibre Internet",
    d: "Primary internet for business sites that want clean onboarding and better-quality connectivity.",
    href: "/services/business-fibre-internet",
  },
  {
    t: "Dedicated Internet Access",
    d: "Dedicated connectivity for critical sites that need stronger performance expectations.",
    href: "/services/dedicated-internet-access",
  },
  {
    t: "Managed LAN & Wi-Fi",
    d: "Managed internal networking for better Wi-Fi, segmentation, and day-to-day stability.",
    href: "/services/managed-lan-wifi",
  },
  {
    t: "LTE / 5G Backup",
    d: "Continuity architecture for sites that need resilience during primary access disruption.",
    href: "/services/lte-5g-continuity",
  },
] as const;

const premiumSignals = [
  {
    t: "Address-qualified",
    d: "Availability is reviewed per building and service address.",
  },
  {
    t: "Business-first",
    d: "Built for business internet, managed networking, and operational requirements.",
  },
  {
    t: "Service-matched",
    d: "Fibre, DIA, managed Wi-Fi, and continuity aligned to real site needs.",
  },
  {
    t: "Ontario-focused",
    d: "Local city discovery with a cleaner commercial path to qualification.",
  },
] as const;

const buyerJourney = [
  {
    step: "01",
    title: "Choose your city",
    desc: "Start with the market that matches your site, building, or expansion target.",
  },
  {
    step: "02",
    title: "Choose the service",
    desc: "Match the requirement to fibre, DIA, managed networking, or continuity.",
  },
  {
    step: "03",
    title: "Check availability",
    desc: "Orbitlink reviews address-level serviceability and building fit.",
  },
  {
    step: "04",
    title: "Move into intake",
    desc: "Qualified requests move into a clean onboarding path.",
  },
] as const;

const FAQ = [
  {
    q: "Do you service every address in these cities?",
    a: "No. Orbitlink confirms availability per building and address. Service depends on infrastructure, access feasibility, and upstream availability.",
  },
  {
    q: "What should I include in an availability request?",
    a: "Include your address, target timeline, service type, and any requirements such as static IPs, managed Wi-Fi, voice, or backup connectivity.",
  },
  {
    q: "Do you offer residential internet?",
    a: "Orbitlink is focused mainly on business internet and managed network services. Mixed-use requirements can still be submitted for review.",
  },
  {
    q: "How long does installation take?",
    a: "Installation timing depends on building readiness, access type, landlord coordination, and serviceability. Expectations are reviewed before activation.",
  },
] as const;

function jsonLd() {
  const all = [...GTA_CORE, ...EXPANDED_MARKETS];

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

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#locations`,
    name: "Orbitlink Ontario business internet locations",
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
  return <div className="text-[11px] tracking-[0.28em] text-white/42">{children}</div>;
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/46">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["rounded-[30px] border border-white/10 bg-white/[0.03]", className].join(" ")}>
      {children}
    </div>
  );
}

function LocationCardView({ item }: { item: LocationCard }) {
  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.055] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-32 w-32 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.22em] text-white/42">
              {item.posture.toUpperCase()}
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.name}</h3>
            <p className="mt-3 text-sm leading-6 text-white/68">{item.subtitle}</p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/70 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
            View
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/66"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
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
      <p className="mt-3 text-sm leading-6 text-white/64">{desc}</p>
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

      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-16 sm:px-7 sm:pb-18 sm:pt-20 lg:px-10 lg:pb-22">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <span className="text-sm tracking-wide text-white/65">Ontario city hub</span>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-9 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="max-w-4xl">
                <div className="text-[11px] tracking-[0.30em] text-white/40">
                  BUSINESS FIBRE • DIA • MANAGED NETWORK • BACKUP CONNECTIVITY
                </div>

                <h1 className="mt-4 text-[2.6rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[5rem] lg:leading-[0.98]">
                  Ontario business
                  <span className="block text-white/62">internet locations</span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                  Start with your city. Then move into address-qualified availability, cleaner
                  service matching, and a more structured commercial path.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Address-qualified",
                    "Business-first",
                    "Ontario-focused",
                    "Conversion-ready",
                  ].map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/66"
                    >
                      {x}
                    </span>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                  >
                    Check Availability
                  </Link>
                  <Link
                    href="/locations/ontario"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    Ontario Coverage
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    Explore Services
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <MetricPill label="BUYER FIT" value="Ontario business sites" />
                  <MetricPill label="QUALIFICATION" value="Address and building based" />
                  <MetricPill label="NEXT STEP" value="Availability and pricing" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <SectionEyebrow>BUYING PATH</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  Local discovery to qualified intake
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  This page is designed to shorten the path from city search to service review.
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

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-7 sm:py-12 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>PREMIUM SIGNALS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Built for trust, clarity, and conversion
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                City discovery should feel premium, readable, and commercially clear.
              </p>
            </div>

            <MetricPill label="MODE" value="Discovery • Match • Qualification" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {premiumSignals.map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{x.d}</div>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>CORE MARKETS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Priority Ontario cities</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                Start with the strongest commercial markets for Orbitlink’s business-first service model.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-white/60">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                High intent
              </span>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                Address-qualified
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {GTA_CORE.map((item) => (
              <LocationCardView key={item.href} item={item} />
            ))}
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <SectionEyebrow>EXPANDED MARKETS</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Additional Ontario cities</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Broader discovery coverage for business buyers across Ontario.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {EXPANDED_MARKETS.map((item) => (
              <LocationCardView key={item.href} item={item} />
            ))}
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>SERVICE MATCHING</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Choose the right service path
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                Once the city is clear, match the site to the right commercial and technical posture.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/45">COMMERCIAL MODE</div>
              <div className="mt-1 text-sm text-white/80">
                Location • Service match • Qualification
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
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
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <div className="rounded-[30px] border border-white/10 bg-black/20 p-6 md:p-8">
          <SectionEyebrow>ONTARIO BUSINESS PRESENCE</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">Orbitlink Ontario presence</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Anchored in Mississauga. Focused on Ontario business internet, managed networking,
            dedicated connectivity, and structured onboarding.
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

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Locations FAQs</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Quick answers for buyers checking business internet availability across Ontario.
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
              View Trust & Compliance
            </Link>
            <Link
              href="/network"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              View Network
            </Link>
          </div>
        </Surface>
      </section>
    </main>
  );
}