import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/ontario";
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
  title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
  description:
    "Business internet coverage across Ontario for fibre, dedicated internet access, managed network infrastructure, voice, and continuity architecture. Availability confirmed per building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
    description:
      "Business connectivity across Ontario with structured onboarding, documented delivery, and availability confirmed per address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Ontario Business Internet & Fibre Coverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontario Business Internet & Fibre Coverage | Orbitlink™",
    description:
      "Explore Orbitlink business internet coverage across Ontario for fibre, DIA, and managed network services.",
    images: [TWITTER_IMAGE_URL],
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
    subtitle: "Broad SMB footprint with strong local discovery behavior.",
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
    t: "Service clarity",
    d: "Business Fibre versus DIA is selected based on operational need, not guesswork.",
  },
  {
    t: "Documented delivery",
    d: "Clear checkpoints improve installation posture and acceptance readiness.",
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
    href: "/services/managed-lan-wifi",
    d: "Segmentation posture, stability, and internal network support.",
  },
  {
    t: "LTE / 5G Continuity",
    href: "/services/lte-5g-continuity",
    d: "Continuity design for disruption events.",
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

function CityCard({ c }: { c: City }) {
  return (
    <div className="group rounded-[30px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20 hover:bg-white/[0.05] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.22em] text-white/45">{c.tier.toUpperCase()}</div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{c.name}</h3>
          <p className="mt-3 text-sm leading-6 text-white/70">{c.subtitle}</p>
        </div>
        <Link
          href={c.href}
          className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
        >
          View
        </Link>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-5 flex flex-wrap gap-2">
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

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pb-14 sm:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <span className="text-sm tracking-wide text-white/60">Ontario Coverage Hub</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Ontario business internet & fibre coverage
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
                Orbitlink supports Ontario businesses with operator-grade business internet,
                business fibre, Dedicated Internet Access, documented delivery, and premium support
                posture. Availability is confirmed per address and building feasibility rather than
                assumed generically. Use this hub to navigate priority city pages and the right
                service paths for your environment.
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

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                >
                  Check Availability
                </Link>
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  All Locations
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Service Modules
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricPill label="BUYER FIT" value="Ontario business sites" />
                <MetricPill label="SERVICE MODEL" value="Address-first qualification" />
                <MetricPill label="DELIVERY STYLE" value="Clear and structured" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <SectionEyebrow>BUYING JOURNEY</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  Province-wide discovery, then clean onboarding
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This hub is designed to shorten the path from Ontario-level search intent to a
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

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>COVERAGE POSTURE</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                How Orbitlink maintains a premium delivery posture across Ontario
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                The goal is not to overstate coverage. The goal is to make service discovery
                easier, qualification cleaner, and activation more predictable for business buyers.
              </p>
            </div>

            <MetricPill label="MODE" value="Discovery • Validation • Delivery" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {coveragePosture.map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE MATCHING</SectionEyebrow>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  Choose the right service module
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                  Ontario coverage creates discoverability. Service modules capture real buying
                  intent. Choose the delivery posture that matches your operational environment.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/45">COMMERCIAL MODE</div>
                <div className="mt-1 text-sm text-white/80">
                  Discovery • Service match • Qualification
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
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{x.d}</div>
                  <div className="mt-3 text-xs text-white/60">Open module →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <SectionEyebrow>TOP ONTARIO MARKETS</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Start with the city hub that matches the buyer
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            These city pages support local search intent, internal linking, local FAQs, and
            service discovery for business internet buyers across Ontario.
          </p>

          <h3 className="mt-7 text-lg font-semibold tracking-tight text-white">GTA core</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gtaCore.map((c) => (
              <CityCard key={c.href} c={c} />
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold tracking-tight text-white">GTA extended</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gtaExt.map((c) => (
              <CityCard key={c.href} c={c} />
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold tracking-tight text-white">Outside GTA</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ont.map((c) => (
              <CityCard key={c.href} c={c} />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Availability
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Trust & Delivery Posture
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Browse Locations
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <SectionEyebrow>POPULAR ONTARIO PATHS</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            Common business connectivity entry points
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
            Buyers often start with a city, a service type, or a broad “internet near me” search.
            These are the clearest next steps into Orbitlink’s Ontario delivery footprint.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/internet-near-me"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85 transition hover:bg-white/[0.06]"
            >
              Internet Near Me
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85 transition hover:bg-white/[0.06]"
            >
              Business Fibre Internet
            </Link>
            <Link
              href="/services/dedicated-internet-access"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85 transition hover:bg-white/[0.06]"
            >
              Dedicated Internet Access
            </Link>
            <Link
              href="/locations/mississauga"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85 transition hover:bg-white/[0.06]"
            >
              Mississauga
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:p-8">
          <SectionEyebrow>ONTARIO AUTHORITY POSTURE</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            Local business presence with province-wide discovery intent
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
            Orbitlink’s business presence is anchored in Mississauga and focused on Ontario
            business connectivity. The strongest next step is to submit the address and
            requirements so feasibility can be confirmed before activation.
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

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Ontario FAQs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers that reduce ambiguity and help buyers move to an availability request
            faster.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Availability
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Service Modules
            </Link>
            <Link
              href="/internet-near-me"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Internet Near Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}