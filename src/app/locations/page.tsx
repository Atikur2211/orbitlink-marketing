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
  title: "Business Internet Service Areas in Ontario | Orbitlink Locations",
  description:
    "Browse Orbitlink business internet service areas across Ontario. Explore city pages for business fibre internet, dedicated internet access, managed Wi-Fi, and address-qualified availability.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Internet Service Areas in Ontario | Orbitlink Locations",
    description:
      "Explore Orbitlink service areas across Ontario. Browse city pages, review availability by address, and request business internet service.",
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
    title: "Business Internet Service Areas in Ontario | Orbitlink Locations",
    description:
      "Browse Orbitlink service areas across Ontario for business fibre internet, dedicated internet, managed Wi-Fi, and network services.",
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
    subtitle:
      "Business fibre internet and managed network service in select commercial buildings and corridors.",
    tags: ["Business fibre", "Commercial buildings", "Priority market"],
    posture: "Primary market",
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle:
      "Business internet and network service for industrial, logistics, and SMB environments.",
    tags: ["Industrial sites", "SMB demand", "Address review"],
    posture: "Growth market",
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle:
      "Business connectivity for office, commercial, and uptime-sensitive environments.",
    tags: ["Office market", "DIA-ready", "Enterprise fit"],
    posture: "Enterprise market",
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle:
      "Business internet and managed networking for office and technology-led environments.",
    tags: ["Managed Wi-Fi", "Office sites", "Static IP options"],
    posture: "Technology market",
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle:
      "Connectivity for commercial and industrial sites with multi-location and continuity needs.",
    tags: ["Commercial", "Multi-site", "Backup options"],
    posture: "Multi-site market",
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle:
      "Business internet and managed network service for premium SMB and professional-service environments.",
    tags: ["Premium SMB", "Professional services", "Business-grade"],
    posture: "Premium market",
  },
];

const GTA_EXTENDED: readonly LocationCard[] = [
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle:
      "Business internet for growing industrial and commercial sites, reviewed by address.",
    tags: ["Industrial growth", "Address review", "Expansion"],
    posture: "Expansion market",
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle:
      "Business connectivity for office and light industrial environments with building-based availability review.",
    tags: ["Commercial", "Managed networking", "Building review"],
    posture: "Commercial market",
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle:
      "Business internet and managed connectivity for broad SMB demand across local commercial areas.",
    tags: ["SMB", "Local demand", "Address review"],
    posture: "Discovery market",
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle:
      "Regional business demand supported by structured service review and documented delivery.",
    tags: ["Regional market", "Business demand", "Structured onboarding"],
    posture: "Regional market",
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle:
      "Business connectivity for professional and uptime-sensitive environments with enterprise expectations.",
    tags: ["Professional services", "Enterprise fit", "DIA-ready"],
    posture: "Strategic market",
  },
];

const FAQ = [
  {
    q: "Do you service every address in these cities?",
    a: "No. Orbitlink confirms availability per building and address. Service depends on infrastructure, access feasibility, and upstream availability.",
  },
  {
    q: "What should I include in an availability request?",
    a: "Include your service address, the service you need, your timeline, and any requirements such as static IPs, managed Wi-Fi, voice, or backup connectivity.",
  },
  {
    q: "Do you offer residential internet?",
    a: "Orbitlink is focused mainly on business internet and managed network services. If you have a mixed-use requirement, submit your details for review.",
  },
  {
    q: "How long does installation take?",
    a: "Installation timing depends on building readiness, access type, landlord coordination, and serviceability. Availability and expectations are reviewed before activation.",
  },
] as const;

const serviceModules = [
  {
    t: "Business Fibre Internet",
    d: "Primary internet for business sites that want high-quality connectivity and a cleaner buying experience.",
    href: "/services/business-fibre-internet",
  },
  {
    t: "Dedicated Internet Access",
    d: "Dedicated connectivity for critical sites that need stronger performance expectations and cleaner escalation.",
    href: "/services/dedicated-internet-access",
  },
  {
    t: "Managed Wi-Fi & LAN",
    d: "Managed internal network support for businesses that need better Wi-Fi, segmentation, and easier day-to-day operations.",
    href: "/services/managed-lan-wifi",
  },
  {
    t: "LTE / 5G Backup Connectivity",
    d: "Backup connectivity for businesses that want stronger resilience during outages or primary access disruption.",
    href: "/services/lte-5g-continuity",
  },
] as const;

const premiumSignals = [
  {
    t: "Address-qualified availability",
    d: "Service is reviewed per building and address instead of assumed across an entire city.",
  },
  {
    t: "Business-first service model",
    d: "The buying path is designed for business internet, managed networking, and operational requirements.",
  },
  {
    t: "Clear service matching",
    d: "Business fibre, dedicated internet, managed Wi-Fi, and backup are matched to real site needs.",
  },
  {
    t: "Ontario-focused execution",
    d: "City pages support local discovery and move buyers into qualified availability review.",
  },
] as const;

const buyerJourney = [
  {
    step: "1",
    title: "Choose your city",
    desc: "Start with the city that matches your building, location, or expansion target.",
  },
  {
    step: "2",
    title: "Choose the service",
    desc: "Select fibre, dedicated internet, managed Wi-Fi, or backup based on site needs.",
  },
  {
    step: "3",
    title: "Check availability",
    desc: "Orbitlink reviews serviceability by address and building before moving forward.",
  },
  {
    step: "4",
    title: "Move into intake",
    desc: "Qualified requests move into a clear onboarding path.",
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
    <div className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20 hover:bg-white/[0.05] sm:p-6">
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
          View city
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

      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-7 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <span className="text-sm tracking-wide text-white/65">
              Ontario business internet locations
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Business internet locations across Ontario
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Browse Orbitlink city pages for business fibre internet, dedicated internet access,
                managed Wi-Fi, and backup connectivity. Start with your city, then move into
                address-qualified availability and service review.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Address-qualified availability",
                  "Business-first service model",
                  "Ontario city pages",
                  "Check availability",
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
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Explore Services
                </Link>
                <Link
                  href="/locations/ontario"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Ontario Coverage
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricPill label="BEST FOR" value="Ontario business locations" />
                <MetricPill label="QUALIFICATION" value="Address and building based" />
                <MetricPill label="NEXT STEP" value="Check availability and pricing" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  Start local, then submit your request
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This page is designed to move buyers from city discovery into address-based
                  availability review and a clearer service conversation.
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

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>WHY BUSINESSES START HERE</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Built for local discovery and faster qualification
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                City pages support local search. Service pages explain the offer. The contact path
                turns interest into a real availability and pricing review.
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
              <SectionEyebrow>PRIORITY CITIES</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Core Ontario markets</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                Start with the main markets where Orbitlink is focused on commercial demand,
                address-based service review, and structured onboarding.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-sm text-white/60 md:flex">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                Business-first
              </span>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                Address-qualified
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
          <SectionEyebrow>EXPANDED COVERAGE</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Additional Ontario markets</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            These city pages support broader Ontario demand and expansion conversations, with
            serviceability reviewed by address and building.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GTA_EXTENDED.map((item) => (
              <LocationCardView key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>SERVICE MATCHING</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Choose the service that matches the site
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                Once you know the city, the next step is to match the location to the right service
                path based on uptime, site needs, and operating requirements.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/45">COMMERCIAL MODE</div>
              <div className="mt-1 text-sm text-white/80">
                Location • Service match • Qualification
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
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="rounded-[30px] border border-white/10 bg-black/20 p-6 md:p-8">
          <SectionEyebrow>ONTARIO BUSINESS PRESENCE</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">Orbitlink Ontario presence</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink’s business presence is anchored in Mississauga and focused on Ontario
            business internet, dedicated connectivity, managed networking, and structured
            onboarding.
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
        </div>
      </section>
    </main>
  );
}