import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/locations/ontario";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: "TIRAV Technologies Inc. o/a Orbitlink",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
  email: "concierge@orbitlink.ca",
  address: {
    street: "30 Eglinton Ave W, Suite 400-A77",
    city: "Mississauga",
    region: "ON",
    postal: "L5R 3E7",
    country: "CA",
  },
} as const;

export const metadata: Metadata = {
  title: "Ontario Business Internet Coverage",
  description:
    "Business internet coverage across Ontario for fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity. Availability is checked by address.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Ontario Business Internet Coverage | Orbitlink",
    description:
      "Business internet coverage across Ontario with fibre, dedicated internet, managed networking, and address-based availability.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Ontario business internet coverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontario Business Internet Coverage | Orbitlink",
    description:
      "Explore Orbitlink business internet coverage across Ontario for fibre, dedicated internet, managed Wi-Fi, and backup connectivity.",
    images: [TWITTER_IMAGE_URL],
  },
};

type CityTier = "Priority" | "Expansion" | "Ontario";

type City = {
  name: string;
  href: string;
  subtitle: string;
  tier: CityTier;
  tags: readonly string[];
  signal: string;
};

const CITIES: readonly City[] = [
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle:
      "Strong business market for fibre, managed networking, and business internet.",
    tier: "Priority",
    tags: ["Priority market", "Offices", "High intent"],
    signal: "Primary market",
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle:
      "Dense office and commercial demand where uptime, support, and service fit matter.",
    tier: "Priority",
    tags: ["Enterprise fit", "Office density", "Dedicated internet"],
    signal: "Enterprise market",
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle:
      "Industrial, warehouse, and business demand with strong address-based buying intent.",
    tier: "Priority",
    tags: ["Industrial", "Warehouse", "Growth market"],
    signal: "Growth market",
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle:
      "B2B office and technology environments with strong managed network fit.",
    tier: "Priority",
    tags: ["B2B", "Managed Wi-Fi", "Static IP"],
    signal: "Technology market",
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle:
      "Commercial and industrial environments with multi-site and backup demand.",
    tier: "Priority",
    tags: ["Commercial", "Multi-site", "Backup"],
    signal: "Multi-site market",
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle:
      "Professional services and office environments with strong business-grade service expectations.",
    tier: "Priority",
    tags: ["Professional", "Premium market", "Business-grade"],
    signal: "Premium market",
  },
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle:
      "Industrial growth market where warehouses, logistics, and business expansion continue to grow.",
    tier: "Expansion",
    tags: ["Industrial growth", "Expansion", "Address-based review"],
    signal: "Expansion market",
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle:
      "Commercial and light industrial demand with strong local business intent.",
    tier: "Expansion",
    tags: ["Commercial", "Light industrial", "Managed network"],
    signal: "Commercial market",
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle:
      "Broad SMB and commercial demand with strong local discovery potential.",
    tier: "Expansion",
    tags: ["SMB", "Commercial", "Local demand"],
    signal: "Discovery market",
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle:
      "Regional business and industrial demand with a strong need for stable connectivity.",
    tier: "Expansion",
    tags: ["Regional market", "Industrial demand", "Business internet"],
    signal: "Regional market",
  },
  {
    name: "Windsor",
    href: "/locations/windsor",
    subtitle:
      "Industrial, logistics, and cross-border business environments with strong operational connectivity needs.",
    tier: "Ontario",
    tags: ["Industrial", "Logistics", "Operational fit"],
    signal: "Ontario market",
  },
  {
    name: "Peterborough",
    href: "/locations/peterborough",
    subtitle:
      "Regional commercial environments where stable business internet supports day-to-day operations.",
    tier: "Ontario",
    tags: ["Regional", "Commercial", "Business internet"],
    signal: "Ontario market",
  },
  {
    name: "Niagara / St. Catharines",
    href: "/locations/niagara-st-catharines",
    subtitle:
      "Commercial, retail, hospitality, and professional business demand across the Niagara region.",
    tier: "Ontario",
    tags: ["Commercial", "Retail", "Regional demand"],
    signal: "Ontario market",
  },
  {
    name: "Sudbury",
    href: "/locations/sudbury",
    subtitle:
      "Industrial and regional business demand where reliable connectivity and structured service matter.",
    tier: "Ontario",
    tags: ["Industrial", "Regional", "Business-grade"],
    signal: "Ontario market",
  },
  {
    name: "Cambridge",
    href: "/locations/cambridge",
    subtitle:
      "Manufacturing, industrial, and commercial business demand with strong operational fit.",
    tier: "Ontario",
    tags: ["Manufacturing", "Industrial", "Commercial"],
    signal: "Ontario market",
  },
  {
    name: "Thunder Bay",
    href: "/locations/thunder-bay",
    subtitle:
      "Northern Ontario business and operational environments that benefit from structured connectivity review.",
    tier: "Ontario",
    tags: ["Northern Ontario", "Operations", "Regional"],
    signal: "Ontario market",
  },
  {
    name: "Burlington",
    href: "/locations/burlington",
    subtitle:
      "Office, commercial, and professional service demand with strong business connectivity expectations.",
    tier: "Ontario",
    tags: ["Office", "Commercial", "Professional"],
    signal: "Ontario market",
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle:
      "Professional and uptime-sensitive demand with strong service expectations.",
    tier: "Ontario",
    tags: ["Professional services", "Dedicated internet", "Strategic market"],
    signal: "Strategic market",
  },
  {
    name: "Barrie",
    href: "/locations/barrie",
    subtitle:
      "Growing commercial demand with strong local-intent business connectivity needs.",
    tier: "Ontario",
    tags: ["Growth", "Local intent", "Business fibre"],
    signal: "Ontario market",
  },
  {
    name: "North York",
    href: "/locations/north-york",
    subtitle:
      "Office, clinic, and multi-tenant business demand with strong uptime and support expectations.",
    tier: "Ontario",
    tags: ["Office", "Professional", "Business-grade"],
    signal: "Ontario market",
  },
  {
    name: "Newmarket",
    href: "/locations/newmarket",
    subtitle:
      "SMB and office demand where business fibre and managed Wi-Fi are often a strong fit.",
    tier: "Ontario",
    tags: ["SMB", "Office", "Managed Wi-Fi"],
    signal: "Ontario market",
  },
  {
    name: "Kingston",
    href: "/locations/kingston",
    subtitle:
      "Regional business demand with professional, education-adjacent, and operational use cases.",
    tier: "Ontario",
    tags: ["Regional", "Professional", "Operations"],
    signal: "Ontario market",
  },
] as const;

const FAQ = [
  {
    q: "Is Orbitlink available everywhere in Ontario?",
    a: "No. Availability depends on the building, access feasibility, and upstream serviceability. Coverage is confirmed by address before moving forward.",
  },
  {
    q: "What does availability confirmed by address mean?",
    a: "It means Orbitlink reviews serviceability, access type, site constraints, and service fit before moving forward.",
  },
  {
    q: "Which service should I choose: business fibre or dedicated internet?",
    a: "Business fibre is often the right fit for strong value and stable business connectivity. Dedicated internet is better for critical environments that need stronger uptime and more predictable performance.",
  },
  {
    q: "Do you support managed networking in Ontario?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi, including segmentation, guest networking, and coverage planning.",
  },
] as const;

const PROOF_POINTS = [
  {
    title: "Availability checked by address",
    body: "Coverage is reviewed per building and address, not assumed across a city.",
  },
  {
    title: "Clear service fit",
    body: "Fibre, dedicated internet, managed networking, and backup are matched to the site.",
  },
  {
    title: "Clear next step",
    body: "City discovery leads into availability, pricing direction, and the right next move.",
  },
  {
    title: "Built for businesses",
    body: "Support and escalation are designed for real business environments.",
  },
] as const;

const SERVICE_MODULES = [
  {
    title: "Business Fibre Internet",
    href: "/services/business-fibre-internet",
    body: "Primary internet for offices, commercial sites, and growing businesses.",
  },
  {
    title: "Dedicated Internet Access",
    href: "/services/dedicated-internet-access",
    body: "Stronger uptime and more predictable performance for critical environments.",
  },
  {
    title: "Managed LAN & Wi-Fi",
    href: "/services/managed-lan-wifi",
    body: "Internal network support, segmentation, and better Wi-Fi coverage.",
  },
  {
    title: "LTE / 5G Backup",
    href: "/services/lte-5g-continuity",
    body: "Backup planning for outages and continuity-sensitive business operations.",
  },
  {
    title: "Colocation & Infrastructure Services",
    href: "/services/colocation-infrastructure",
    body: "Rack planning, cross-connect coordination, and infrastructure-aligned delivery posture.",
  },
  {
    title: "Starlink Access Coordination",
    href: "/services/starlink-agent",
    body: "Satellite coordination for remote, delayed, temporary, or continuity-oriented business sites.",
  },
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Ontario Business Internet Coverage",
        description:
          "Business internet coverage across Ontario for fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity. Availability is checked by address.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
          { "@type": "ListItem", position: 3, name: "Ontario", item: PAGE_URL },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#locations`,
        name: "Orbitlink Ontario service areas",
        itemListElement: CITIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}${c.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.30em] text-white/42">{children}</div>;
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
      <div className="text-[11px] tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={city.href}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.055]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -left-14 top-0 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.22em] text-white/42">
              {city.signal.toUpperCase()}
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{city.name}</h3>
            <p className="mt-3 text-sm leading-6 text-white/66">{city.subtitle}</p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/70 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
            Open
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {city.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/64"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
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
    <div className={["rounded-[32px] border border-white/10 bg-white/[0.03]", className].join(" ")}>
      {children}
    </div>
  );
}

export default function OntarioHubPage() {
  const priorityMarkets = CITIES.filter((c) => c.tier === "Priority");
  const expansionMarkets = CITIES.filter((c) => c.tier === "Expansion");
  const ontarioMarkets = CITIES.filter((c) => c.tier === "Ontario");

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-7 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Ontario coverage hub
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="text-[11px] tracking-[0.30em] text-white/40">
                BUSINESS FIBRE • DEDICATED INTERNET • MANAGED NETWORK • BACKUP CONNECTIVITY
              </div>

              <h1 className="mt-4 text-[2.5rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[5rem] lg:leading-[0.98]">
                Ontario business
                <span className="block text-white/62">internet coverage</span>
              </h1>

              <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                Browse the right city, choose the right service, and move into address-based
                availability for your business location.
              </p>

              <div className="mt-3 text-sm text-white/70">
                Built for Ontario offices, clinics, warehouses, industrial sites, and growing businesses.
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Availability checked by address",
                  "Business-first service model",
                  "Ontario city pages",
                  "Clear next step",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/66"
                  >
                    {item}
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
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Explore Services
                </Link>
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  All Locations
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricPill label="BEST FOR" value="Ontario business sites" />
                <MetricPill label="CHECKED BY" value="Address and building fit" />
                <MetricPill label="NEXT STEP" value="Availability and pricing direction" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <Surface className="bg-white/[0.04] p-6">
                <SectionEyebrow>BUYING FLOW</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  Province-wide discovery with a simple next step
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  Start with the city. Then choose the service and move into address-based review.
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    { step: "01", title: "Choose the city", body: "Start with the market that matches your site or expansion target." },
                    { step: "02", title: "Choose the service", body: "Match the need to fibre, dedicated internet, managed networking, or backup." },
                    { step: "03", title: "Check availability", body: "Orbitlink reviews serviceability, building conditions, and fit." },
                    { step: "04", title: "Get the next step", body: "Qualified requests move into availability, pricing, and the best path forward." },
                  ].map((item) => (
                    <div key={item.step} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
                          {item.step}
                        </div>
                        <div className="text-sm font-medium text-white/90">{item.title}</div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                    </div>
                  ))}
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="relative space-y-6">
          <Surface className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>WHY THIS HUB HELPS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Coverage that feels clear and credible
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Better discovery, cleaner service matching, and fewer surprises before the next step.
                </p>
              </div>

              <MetricPill label="MODE" value="Discovery • Match • Availability" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {PROOF_POINTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>QUICK LINKS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Important Ontario pages
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Direct links to important city, service, and commercial pages across Orbitlink.
                </p>
              </div>

              <MetricPill label="PURPOSE" value="Stronger discovery and easier navigation" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/locations/barrie" className="underline hover:text-white">Business internet in Barrie</Link>
              <Link href="/locations/north-york" className="underline hover:text-white">Business internet in North York</Link>
              <Link href="/locations/niagara-st-catharines" className="underline hover:text-white">Business internet in Niagara / St. Catharines</Link>
              <Link href="/locations/newmarket" className="underline hover:text-white">Business internet in Newmarket</Link>
              <Link href="/locations/sudbury" className="underline hover:text-white">Business internet in Sudbury</Link>
              <Link href="/locations/kingston" className="underline hover:text-white">Business internet in Kingston</Link>
              <Link href="/locations/thunder-bay" className="underline hover:text-white">Business internet in Thunder Bay</Link>
              <Link href="/services/colocation-infrastructure" className="underline hover:text-white">Colocation & infrastructure services</Link>
              <Link href="/services/starlink-agent" className="underline hover:text-white">Starlink access coordination</Link>
              <Link href="/why-orbitlink" className="underline hover:text-white">Why Orbitlink</Link>
              <Link href="/internet-near-me" className="underline hover:text-white">Business internet near me</Link>
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>PRIORITY MARKETS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Core Ontario markets
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Start with the strongest markets for Orbitlink’s business-first service model.
                </p>
              </div>

              <MetricPill label="FOCUS" value="High-intent commercial demand" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {priorityMarkets.map((city) => (
                <CityCard key={city.href} city={city} />
              ))}
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>EXPANDED COVERAGE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Additional Ontario markets
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Broader Ontario discovery for buyers outside the main commercial corridor.
                </p>
              </div>

              <MetricPill label="RANGE" value="Expansion and regional demand" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {expansionMarkets.map((city) => (
                <CityCard key={city.href} city={city} />
              ))}
              {ontarioMarkets.map((city) => (
                <CityCard key={city.href} city={city} />
              ))}
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE MATCHING</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Choose the right service path
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  City pages create discovery. Service pages turn that intent into a real next step.
                </p>
              </div>

              <MetricPill label="FLOW" value="Location • Service • Request" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {SERVICE_MODULES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                  <div className="mt-3 text-xs text-white/55">Open service →</div>
                </Link>
              ))}
            </div>
          </Surface>

          <Surface className="bg-black/20 p-6 sm:p-8">
            <SectionEyebrow>ONTARIO BUSINESS PRESENCE</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Local anchor, province-wide coverage discovery
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">
              Orbitlink’s business presence is anchored in Mississauga and focused on Ontario business internet, managed networking, voice, and backup connectivity.
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
                Availability: checked by address
              </div>
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Ontario FAQs</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">
              Clear answers that help serious buyers move toward availability review faster.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {FAQ.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <h3 className="text-base font-semibold tracking-tight text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.a}</p>
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
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Trust & Compliance
              </Link>
              <Link
                href="/why-orbitlink"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Why Orbitlink
              </Link>
            </div>
          </Surface>
        </div>
      </section>
    </div>
  );
}