import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
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
  title: "Ontario Business Internet Locations",
  description:
    "Business internet in Ontario cities. Fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity. Check availability by address.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Ontario Business Internet Locations | Orbitlink",
    description:
      "Explore Orbitlink city pages across Ontario for business fibre internet, dedicated internet, managed networking, and address-based availability.",
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
    title: "Ontario Business Internet Locations | Orbitlink",
    description:
      "City pages across Ontario for business fibre internet, dedicated internet, managed Wi-Fi, and backup connectivity.",
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

type LocationCard = {
  name: string;
  href: string;
  subtitle: string;
  tags: readonly string[];
  posture: string;
};

const PRIORITY_MARKETS: readonly LocationCard[] = [
  {
    name: "Mississauga",
    href: "/locations/mississauga",
    subtitle:
      "Business fibre, dedicated internet, and managed Wi-Fi for offices, clinics, and commercial buildings.",
    tags: ["Priority", "Commercial", "Business fibre"],
    posture: "Primary market",
  },
  {
    name: "Toronto",
    href: "/locations/toronto",
    subtitle:
      "Business internet for office buildings, commercial sites, and uptime-sensitive environments.",
    tags: ["Office", "Enterprise", "Dedicated internet"],
    posture: "Enterprise market",
  },
  {
    name: "Brampton",
    href: "/locations/brampton",
    subtitle:
      "Business connectivity for warehouses, industrial sites, and growing local businesses.",
    tags: ["Industrial", "Warehouse", "SMB"],
    posture: "Growth market",
  },
  {
    name: "Markham",
    href: "/locations/markham",
    subtitle:
      "Business internet and managed networking for office, tech, and multi-tenant environments.",
    tags: ["B2B", "Managed Wi-Fi", "Static IP"],
    posture: "Technology market",
  },
  {
    name: "Vaughan",
    href: "/locations/vaughan",
    subtitle:
      "Business internet for commercial, industrial, and multi-site business environments.",
    tags: ["Commercial", "Multi-site", "Backup"],
    posture: "Multi-site market",
  },
  {
    name: "Oakville",
    href: "/locations/oakville",
    subtitle:
      "Business-grade internet and managed networking for offices and professional service locations.",
    tags: ["Premium", "Professional", "Business-grade"],
    posture: "Premium market",
  },
  {
    name: "Oshawa",
    href: "/locations/oshawa",
    subtitle:
      "Business connectivity for industrial, logistics, and growth-focused business locations.",
    tags: ["Industrial", "Logistics", "Growth"],
    posture: "Strategic market",
  },
  {
    name: "Whitby",
    href: "/locations/whitby",
    subtitle:
      "Business fibre and managed networking for offices, commercial spaces, and expanding businesses.",
    tags: ["Durham", "Business fibre", "Office"],
    posture: "Emerging market",
  },
];

const EXTENDED_MARKETS: readonly LocationCard[] = [
  {
    name: "Milton",
    href: "/locations/milton",
    subtitle:
      "Business internet for industrial growth areas, new sites, and expanding commercial locations.",
    tags: ["Industrial growth", "Expansion", "Address review"],
    posture: "Expansion market",
  },
  {
    name: "Etobicoke",
    href: "/locations/etobicoke",
    subtitle:
      "Business connectivity for commercial and light industrial properties.",
    tags: ["Commercial", "Light industrial", "Managed network"],
    posture: "Commercial market",
  },
  {
    name: "Scarborough",
    href: "/locations/scarborough",
    subtitle:
      "Business internet for commercial and SMB sites across a large Toronto market.",
    tags: ["SMB", "Commercial", "Address review"],
    posture: "Discovery market",
  },
  {
    name: "Hamilton",
    href: "/locations/hamilton",
    subtitle:
      "Business connectivity for industrial, regional, and commercial business environments.",
    tags: ["Regional", "Industrial", "Business internet"],
    posture: "Regional market",
  },
  {
    name: "Ottawa",
    href: "/locations/ottawa",
    subtitle:
      "Business internet for office, professional, and business-critical environments.",
    tags: ["Professional", "Enterprise", "Dedicated internet"],
    posture: "Strategic market",
  },
  {
    name: "Newmarket",
    href: "/locations/newmarket",
    subtitle:
      "Business fibre and managed Wi-Fi for office and SMB business locations.",
    tags: ["SMB", "Office", "Managed Wi-Fi"],
    posture: "Emerging market",
  },
  {
    name: "Aurora",
    href: "/locations/aurora",
    subtitle:
      "Business-grade connectivity for offices and uptime-sensitive business environments.",
    tags: ["Professional", "Office", "Uptime"],
    posture: "Emerging market",
  },
  {
    name: "Richmond Hill",
    href: "/locations/richmond-hill",
    subtitle:
      "Business internet for office and B2B environments with address-based availability.",
    tags: ["B2B", "Office", "Business-grade"],
    posture: "Emerging market",
  },
  {
    name: "Kitchener-Waterloo",
    href: "/locations/kitchener-waterloo",
    subtitle:
      "Business fibre and managed networking for modern offices and tech-led environments.",
    tags: ["Tech", "Office", "Managed LAN"],
    posture: "Regional market",
  },
  {
    name: "London",
    href: "/locations/london",
    subtitle:
      "Business internet for commercial locations across a strong regional market.",
    tags: ["Commercial", "Regional", "High intent"],
    posture: "Regional market",
  },
  {
    name: "Barrie",
    href: "/locations/barrie",
    subtitle:
      "Business fibre and connectivity for growing commercial sites and local businesses.",
    tags: ["Growth", "Local intent", "Business fibre"],
    posture: "Regional market",
  },
];

const SERVICE_MODULES = [
  {
    t: "Business Fibre Internet",
    d: "Primary internet for businesses that want reliable day-to-day connectivity.",
    href: "/services/business-fibre-internet",
  },
  {
    t: "Dedicated Internet Access",
    d: "Dedicated connectivity for critical sites that need stronger uptime and performance.",
    href: "/services/dedicated-internet-access",
  },
  {
    t: "Managed LAN & Wi-Fi",
    d: "Managed internal networking for better Wi-Fi coverage, segmentation, and stability.",
    href: "/services/managed-lan-wifi",
  },
  {
    t: "LTE / 5G Backup",
    d: "Backup connectivity for businesses that want failover protection and resilience.",
    href: "/services/lte-5g-continuity",
  },
] as const;

const PREMIUM_SIGNALS = [
  {
    t: "Checked by address",
    d: "Availability is reviewed per building and service address.",
  },
  {
    t: "Built for business",
    d: "Focused on business internet, managed networking, voice, and backup connectivity.",
  },
  {
    t: "Matched to the site",
    d: "Fibre, dedicated internet, managed Wi-Fi, and backup are aligned to real business needs.",
  },
  {
    t: "Clear next step",
    d: "City discovery leads into availability, pricing direction, and the next step.",
  },
] as const;

const BUYER_JOURNEY = [
  {
    step: "01",
    title: "Choose your city",
    desc: "Start with the Ontario market that matches your business location or target building.",
  },
  {
    step: "02",
    title: "Choose the service",
    desc: "Match the business need to fibre, dedicated internet, managed Wi-Fi, or backup.",
  },
  {
    step: "03",
    title: "Check availability",
    desc: "Orbitlink reviews serviceability by address, building, and service fit.",
  },
  {
    step: "04",
    title: "Get the next step",
    desc: "Qualified requests move toward pricing, availability, and service direction.",
  },
] as const;

const FAQ = [
  {
    q: "Do you service every address in these cities?",
    a: "No. Orbitlink confirms availability per building and address. Service depends on infrastructure, feasibility, and upstream availability.",
  },
  {
    q: "What should I include in an availability request?",
    a: "Include your address, timeline, service type, and any needs such as static IPs, managed Wi-Fi, voice, or backup connectivity.",
  },
  {
    q: "Do you offer residential internet?",
    a: "Orbitlink is mainly focused on business internet and managed network services. Mixed-use requests can still be submitted for review.",
  },
  {
    q: "How long does installation take?",
    a: "Installation timing depends on building readiness, access type, landlord coordination, and serviceability.",
  },
] as const;

function jsonLd() {
  const all = [...PRIORITY_MARKETS, ...EXTENDED_MARKETS];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Ontario Business Internet Locations",
        description:
          "Business internet in Ontario cities. Fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity. Check availability by address.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "Orbitlink",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Locations",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#locations`,
        name: "Orbitlink Ontario business internet locations",
        itemListElement: all.map((l, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: l.name,
          url: `${SITE_URL}${l.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };
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
    <div
      className={[
        "rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-sm sm:rounded-[32px]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function LocationCardView({ item }: { item: LocationCard }) {
  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.055] sm:rounded-[28px] sm:p-6"
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
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              {item.name}
            </h3>
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
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[24px]">
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

function SignalCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[24px]">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/70">{text}</div>
    </div>
  );
}

export default function LocationsHubPage() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/locations-hero-ontario-map.jpg"
            alt="Futuristic Ontario map showing Orbitlink business connectivity coverage across Ontario cities"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-[64%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,14,0.42)_0%,rgba(5,8,14,0.64)_34%,rgba(5,8,14,0.88)_76%,rgba(5,8,14,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,8,14,0.94)_0%,rgba(5,8,14,0.62)_36%,rgba(5,8,14,0.16)_68%,rgba(5,8,14,0.80)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(250,204,21,0.08),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.10),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto flex min-h-[92dvh] max-w-7xl items-center px-6 pb-14 pt-16 sm:min-h-[84dvh] sm:px-7 sm:pb-18 sm:pt-20 lg:min-h-[78vh] lg:px-10 lg:pb-24">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
              <span className="text-sm tracking-wide text-white/65">
                Ontario business location hub
              </span>
            </div>

            <div className="mt-6 text-[11px] tracking-[0.30em] text-white/40">
              BUSINESS FIBRE • DEDICATED INTERNET • MANAGED WI-FI • BACKUP CONNECTIVITY
            </div>

            <h1 className="mt-4 text-[2.35rem] font-semibold tracking-tight text-white sm:text-[3.4rem] lg:text-[5rem] lg:leading-[0.98]">
              Ontario business
              <span className="block text-white/62">internet locations</span>
            </h1>

            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
              Start with your city, then check availability by address for business fibre,
              dedicated internet, managed Wi-Fi, and backup connectivity.
            </p>

            <div className="mt-3 text-sm text-white/70">
              Built for Ontario offices, clinics, warehouses, and growing businesses.
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Ontario-wide city pages",
                "Availability checked by address",
                "Business-first service review",
                "Clear next step",
              ].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/66"
                >
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              <MetricPill label="BEST FOR" value="Ontario business locations" />
              <MetricPill label="CHECKED BY" value="Address and building fit" />
              <MetricPill label="NEXT STEP" value="Availability and pricing direction" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-7 lg:px-10">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:rounded-[28px]">
          <h2 className="text-lg font-semibold text-white">
            Business Internet in Ontario Cities
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/68">
            Explore Ontario location pages, service pages, and commercial guidance pages that help
            buyers compare city fit, service options, and next-step availability review.
          </p>

          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link href="/locations/barrie" className="underline hover:text-white">
                Business internet in Barrie
              </Link>
            </li>
            <li>
              <Link href="/locations/north-york" className="underline hover:text-white">
                Business internet in North York
              </Link>
            </li>
            <li>
              <Link href="/locations/niagara-st-catharines" className="underline hover:text-white">
                Business internet in Niagara / St. Catharines
              </Link>
            </li>
            <li>
              <Link href="/locations/newmarket" className="underline hover:text-white">
                Business internet in Newmarket
              </Link>
            </li>
            <li>
              <Link href="/locations/sudbury" className="underline hover:text-white">
                Business internet in Sudbury
              </Link>
            </li>
            <li>
              <Link href="/locations/kingston" className="underline hover:text-white">
                Business internet in Kingston
              </Link>
            </li>
            <li>
              <Link href="/locations/thunder-bay" className="underline hover:text-white">
                Business internet in Thunder Bay
              </Link>
            </li>
            <li>
              <Link href="/services/colocation-infrastructure" className="underline hover:text-white">
                Colocation & infrastructure services
              </Link>
            </li>
            <li>
              <Link href="/services/starlink-agent" className="underline hover:text-white">
                Starlink access coordination
              </Link>
            </li>
            <li>
              <Link href="/why-orbitlink" className="underline hover:text-white">
                Why Orbitlink
              </Link>
            </li>
            <li>
              <Link href="/internet-near-me" className="underline hover:text-white">
                Business internet near me
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-7 sm:py-12 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>WHY THIS PAGE HELPS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Built for trust, clarity, and local discovery
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                City pages should feel easy to understand, useful for real buyers, and ready to convert.
              </p>
            </div>

            <MetricPill label="MODE" value="Discovery • Match • Availability" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {PREMIUM_SIGNALS.map((x) => (
              <SignalCard key={x.t} title={x.t} text={x.d} />
            ))}
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>PRIORITY MARKETS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Core Ontario city pages
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                Start with the strongest business markets for Orbitlink’s service model.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-sm text-white/60 md:flex">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                High intent
              </span>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                Reviewed by address
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PRIORITY_MARKETS.map((item) => (
              <LocationCardView key={item.href} item={item} />
            ))}
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>ADDITIONAL MARKETS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                More Ontario city pages
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                Broader discovery coverage for business buyers across Ontario.
              </p>
            </div>

            <Link
              href="/locations/ontario"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
            >
              View Ontario coverage
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {EXTENDED_MARKETS.map((item) => (
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
                Choose the right service
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                Once the city is clear, choose the service that fits your site.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/45">
                NEXT STEP
              </div>
              <div className="mt-1 text-sm text-white/80">
                Location • Service • Availability
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {SERVICE_MODULES.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5 transition hover:bg-white/[0.06] sm:rounded-3xl"
              >
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{x.d}</div>
                <div className="mt-4 text-xs text-white/55">Open service →</div>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link
              href="/services/colocation-infrastructure"
              className="rounded-[22px] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06] sm:rounded-3xl"
            >
              <div className="text-sm font-semibold text-white/90">
                Colocation & Infrastructure Services
              </div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                Support for rack planning, cross-connect coordination, and infrastructure-aligned deployment.
              </div>
              <div className="mt-4 text-xs text-white/55">Open infrastructure service →</div>
            </Link>

            <Link
              href="/services/starlink-agent"
              className="rounded-[22px] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06] sm:rounded-3xl"
            >
              <div className="text-sm font-semibold text-white/90">
                Starlink Access Coordination
              </div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                Satellite coordination for remote, delayed, temporary, or continuity-oriented business environments.
              </div>
              <div className="mt-4 text-xs text-white/55">Open satellite service →</div>
            </Link>
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <Surface className="p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                A simple path from city page to service request
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
                Start with the city, choose the service, then check availability for your address.
              </p>
            </div>

            <MetricPill label="FLOW" value="City • Service • Request" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BUYER_JOURNEY.map((item) => (
              <JourneyCard
                key={item.step}
                step={item.step}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </Surface>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 sm:px-7 lg:px-10">
        <div className="rounded-[26px] border border-white/10 bg-black/20 p-6 sm:rounded-[30px] md:p-8">
          <SectionEyebrow>ONTARIO BUSINESS PRESENCE</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            Orbitlink Ontario presence
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Based in Mississauga and focused on Ontario business internet, managed networking,
            dedicated connectivity, and backup services.
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
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Location questions buyers commonly ask
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Quick answers for buyers checking business internet availability across Ontario.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6 sm:rounded-3xl"
              >
                <h3 className="text-base font-semibold tracking-tight text-white">{f.q}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <Link
              href="/why-orbitlink"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Why Orbitlink
            </Link>
          </div>
        </Surface>
      </section>
    </div>
  );
}