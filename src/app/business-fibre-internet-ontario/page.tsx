import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc. o/a Orbitlink";
const PAGE_PATH = "/business-fibre-internet-ontario";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const SERVICE_ID = `${PAGE_URL}#service`;
const FAQ_ID = `${PAGE_URL}#faq`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;
const BUSINESS_PAGES_ID = `${PAGE_URL}#business-pages`;
const SERVICE_PAGES_ID = `${PAGE_URL}#service-pages`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: LEGAL_NAME,
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

const PAGE_TITLE = "Business Fibre Internet in Ontario";
const PAGE_DESCRIPTION =
  "Business fibre internet in Ontario for offices, warehouses, and clinics. Reliable connectivity with expert setup. Check availability.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Business Fibre Internet in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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

const FAQ = [
  {
    q: "Do you provide business fibre internet across Ontario?",
    a: "Yes. Orbitlink supports business fibre opportunities across Ontario, subject to building infrastructure, upstream serviceability, and installation feasibility. Availability is confirmed by address before the next step is recommended.",
  },
  {
    q: "Who is Ontario business fibre best suited for?",
    a: "Business fibre is often a strong fit for offices, clinics, warehouses, logistics environments, agencies, and commercial operations that rely on stable day-to-day connectivity for multiple users and systems.",
  },
  {
    q: "Is business fibre the same as Dedicated Internet Access?",
    a: "No. Business fibre is often the right fit where strong performance and value matter most. Dedicated Internet Access is better for mission-critical environments that need stronger uptime, cleaner consistency, and more predictable performance.",
  },
  {
    q: "Can Orbitlink provide managed Wi-Fi and LAN with business fibre?",
    a: "Yes. Orbitlink can support managed LAN and Wi-Fi, including segmentation, guest access, internal device separation, and cleaner coverage planning for business environments.",
  },
  {
    q: "Do you offer backup connectivity options?",
    a: "Yes. Orbitlink can support LTE and 5G continuity options for environments where uptime matters, subject to site fit and feasibility.",
  },
  {
    q: "How do I check fibre availability at my building?",
    a: "Start with your service address, business use case, and any requirements such as static IPs, managed Wi-Fi, or backup internet. Orbitlink checks building fit and serviceability before recommending the next step.",
  },
] as const;

const fitCards = [
  {
    title: "Commercial offices",
    desc: "Stable business internet for cloud applications, VoIP, collaboration tools, VPN access, guest Wi-Fi, and multi-user daily operations.",
  },
  {
    title: "Warehouses and logistics",
    desc: "Reliable connectivity for scanners, tracking systems, cameras, cloud platforms, shipping workflows, and industrial operations.",
  },
  {
    title: "Clinics and professional services",
    desc: "Business fibre for booking systems, practice tools, voice systems, internal devices, and client-facing operations where consistency matters.",
  },
  {
    title: "Multi-site organizations",
    desc: "A more structured connectivity path for businesses operating across several Ontario locations with evolving network needs.",
  },
] as const;

const businessPages = [
  {
    title: "Business Internet Mississauga",
    desc: "High-intent business landing page for one of Ontario’s strongest office and commercial markets.",
    href: "/business-internet-mississauga",
  },
  {
    title: "Business Internet Toronto",
    desc: "High-intent business landing page for Toronto offices, commercial spaces, and multi-user environments.",
    href: "/business-internet-toronto",
  },
  {
    title: "Business Internet Brampton",
    desc: "Commercial and industrial-focused business landing page for Brampton demand.",
    href: "/business-internet-brampton",
  },
  {
    title: "Business Internet Milton",
    desc: "Business landing page for Milton warehouse, industrial, and logistics demand.",
    href: "/business-internet-milton",
  },
] as const;

const servicePages = [
  {
    title: "Business Fibre Internet",
    desc: "Primary internet for offices, warehouses, clinics, and commercial environments.",
    href: "/services/business-fibre-internet",
  },
  {
    title: "Dedicated Internet Access",
    desc: "Higher-assurance internet for uptime-sensitive and performance-critical sites.",
    href: "/services/dedicated-internet-access",
  },
  {
    title: "Managed LAN and Wi-Fi",
    desc: "Managed internal network support, segmentation, coverage, and stability.",
    href: "/services/managed-lan-wifi",
  },
  {
    title: "LTE / 5G Continuity",
    desc: "Backup internet and continuity planning for business resilience.",
    href: "/services/lte-5g-continuity",
  },
  {
    title: "VoIP and Cloud Voice",
    desc: "Business voice with routing, porting, and professional call handling.",
    href: "/services/voip-cloud-voice",
  },
  {
    title: "Static IP Routing",
    desc: "Fixed addressing for VPNs, firewalls, remote access, and hosted systems.",
    href: "/services/static-ip-routing",
  },
  {
    title: "IoT Connectivity",
    desc: "Segmented connectivity for sensors, gateways, field devices, and connected systems.",
    href: "/services/iot-connectivity",
  },
  {
    title: "Starlink",
    desc: "Satellite connectivity for remote sites, constrained buildings, and alternative path needs.",
    href: "/services/starlink-agent",
  },
  {
    title: "Colocation and Infrastructure",
    desc: "Rack presence, cross-connects, and future infrastructure planning.",
    href: "/services/colocation-infrastructure",
  },
] as const;

const allCityLinks = [
  { name: "Aurora", href: "/locations/aurora" },
  { name: "Barrie", href: "/locations/barrie" },
  { name: "Brampton", href: "/locations/brampton" },
  { name: "Burlington", href: "/locations/burlington" },
  { name: "Cambridge", href: "/locations/cambridge" },
  { name: "Etobicoke", href: "/locations/etobicoke" },
  { name: "Guelph", href: "/locations/guelph" },
  { name: "Hamilton", href: "/locations/hamilton" },
  { name: "Kingston", href: "/locations/kingston" },
  { name: "Kitchener-Waterloo", href: "/locations/kitchener-waterloo" },
  { name: "London", href: "/locations/london" },
  { name: "Markham", href: "/locations/markham" },
  { name: "Milton", href: "/locations/milton" },
  { name: "Mississauga", href: "/locations/mississauga" },
  { name: "Newmarket", href: "/locations/newmarket" },
  { name: "Niagara / St. Catharines", href: "/locations/niagara-st-catharines" },
  { name: "North York", href: "/locations/north-york" },
  { name: "Oakville", href: "/locations/oakville" },
  { name: "Ontario", href: "/locations/ontario" },
  { name: "Oshawa", href: "/locations/oshawa" },
  { name: "Ottawa", href: "/locations/ottawa" },
  { name: "Peterborough", href: "/locations/peterborough" },
  { name: "Richmond Hill", href: "/locations/richmond-hill" },
  { name: "Scarborough", href: "/locations/scarborough" },
  { name: "Sudbury", href: "/locations/sudbury" },
  { name: "Thunder Bay", href: "/locations/thunder-bay" },
  { name: "Toronto", href: "/locations/toronto" },
  { name: "Vaughan", href: "/locations/vaughan" },
  { name: "Whitby", href: "/locations/whitby" },
  { name: "Windsor", href: "/locations/windsor" },
] as const;

const whySwitch = [
  "Current provider is too slow during business hours",
  "VoIP, cloud apps, or internal systems are unreliable",
  "Warehouse or office operations need stable uptime",
  "Need better internal Wi-Fi and network segmentation",
  "Want backup internet and uptime protection",
  "Need structured onboarding and business-grade support",
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        email: BUSINESS.email,
        telephone: BUSINESS.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.address.street,
          addressLocality: BUSINESS.address.city,
          addressRegion: BUSINESS.address.region,
          postalCode: BUSINESS.address.postal,
          addressCountry: BUSINESS.address.country,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: BUSINESS.phoneE164,
            email: BUSINESS.email,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: `${SITE_URL}/contact`,
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: BUSINESS.phoneE164,
            email: "support@orbitlink.ca",
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: `${SITE_URL}/contact`,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": ORG_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        breadcrumb: {
          "@id": BREADCRUMB_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Business Fibre Internet in Ontario",
        url: PAGE_URL,
        provider: {
          "@id": ORG_ID,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        serviceType: [
          "Business Fibre Internet",
          "Dedicated Internet Access",
          "Managed Wi-Fi",
          "Backup Connectivity",
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
        termsOfService: `${SITE_URL}/legal/terms`,
        description:
          "Business fibre internet in Ontario for offices, warehouses, clinics, and commercial sites.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: PAGE_TITLE,
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": BUSINESS_PAGES_ID,
        name: "Ontario Business Internet Pages",
        itemListElement: businessPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}${page.href}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": SERVICE_PAGES_ID,
        name: "Orbitlink Service Pages",
        itemListElement: servicePages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}${page.href}`,
        })),
      },
    ],
  };
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.24em] text-white/50">{children}</div>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BusinessFibreInternetOntarioPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_25%,transparent_75%,rgba(255,255,255,0.02))]" />
      </div>

      <TopNav />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
          <span className="text-sm tracking-wide text-white/65">
            Ontario business fibre landing page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business Fibre Internet in Ontario
              <span className="block text-white/60">
                Built for real operations across offices, warehouses, and commercial sites
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Reliable business fibre internet for Ontario offices, warehouses, clinics,
              logistics environments, and commercial sites. Orbitlink checks availability
              by address so the right business internet setup can be matched to your
              building before moving forward.
            </p>

            <div className="mt-3 max-w-3xl text-sm leading-6 text-white/68">
              Built for business operations that depend on stable connectivity, cleaner
              multi-user performance, and a clear next step.
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Business Fibre Internet",
                "Dedicated Internet Access",
                "Managed Wi-Fi",
                "Backup Connectivity",
                "Ontario-wide coverage",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Check Business Internet Availability
              </Link>
              <Link
                href={`tel:${BUSINESS.phoneE164}`}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Call {BUSINESS.phoneDisplay}
              </Link>
              <Link
                href="/locations/ontario"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Ontario Coverage Hub
              </Link>
            </div>

            <div className="mt-3 text-sm text-white/60">
              Availability varies by building. Check your address to confirm options.
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Ontario business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and service direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>WHY BUSINESSES SWITCH</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Cleaner performance for real business operations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Businesses usually switch when internet instability starts affecting voice,
              cloud tools, internal systems, remote access, or multi-user workflows.
              Business fibre gives Ontario businesses a stronger day-to-day operating base.
            </p>

            <div className="mt-6">
              <BulletList items={whySwitch} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>CHECK AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Check business fibre availability for your location
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Fibre availability depends on building infrastructure, upstream
                  serviceability, installation feasibility, and the type of internet your
                  site actually needs. Orbitlink checks this by address before
                  recommending the next step.
                </p>

                <p>
                  This matters because business internet in Ontario can vary widely
                  between office towers, smaller commercial buildings, industrial parks,
                  warehouses, and mixed-use properties.
                </p>

                <p>
                  A quick availability request helps confirm what is realistic for the
                  site instead of relying on generic assumptions.
                </p>

                <BulletList
                  items={[
                    "What is available at your building",
                    "Whether business fibre is the right fit",
                    "Installation feasibility and service path",
                    "Whether managed Wi-Fi, voice, or backup should be included",
                  ]}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>ONTARIO BUSINESS INTERNET</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Built for offices, warehouses, clinics, and commercial sites
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Business fibre internet in Ontario is not only about speed. It is about
                  supporting daily operations with a more stable, business-ready internet
                  foundation for multiple users, cloud platforms, voice, VPN, Wi-Fi,
                  internal systems, and customer-facing services.
                </p>

                <p>
                  Ontario businesses often depend on internet connectivity for SaaS tools,
                  collaboration platforms, VoIP calling, booking systems, cameras,
                  inventory systems, remote access, logistics software, payment flows,
                  and segmented internal networks.
                </p>

                <p>
                  Orbitlink focuses on matching the right business internet setup to the
                  building and operating environment, with support for managed LAN and
                  Wi-Fi, backup connectivity, static IP routing, and cloud voice where
                  needed.
                </p>

                <p>
                  Businesses comparing options often review{" "}
                  <Link
                    href="/services/business-fibre-internet"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    business fibre internet
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/services/dedicated-internet-access"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    dedicated internet access
                  </Link>{" "}
                  to determine the right fit for their operations.
                </p>

                <p>
                  For many organizations, this makes business fibre one of the strongest
                  business internet options in Ontario when stable daily performance and a
                  cleaner support path matter.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>WHO THIS PAGE IS FOR</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Ontario business environments
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {fitCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="text-sm font-semibold text-white/90">{card.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {card.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>HIGH-INTENT BUSINESS PAGES</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Stronger Ontario money pages
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {businessPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{page.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {page.desc}
                    </div>
                    <div className="mt-3 text-xs text-white/60">Open page →</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>CORE SERVICES</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Explore Orbitlink service pages
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {servicePages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{page.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {page.desc}
                    </div>
                    <div className="mt-3 text-xs text-white/60">Open service →</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>ALL ONTARIO CITIES</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Browse all Ontario service areas
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
                Explore Orbitlink city pages across Ontario for local availability context,
                business fit, and service direction.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {allCityLinks.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/85 transition hover:bg-white/[0.06]"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business fibre vs Dedicated Internet Access
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-sm font-semibold text-white/90">Business fibre</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Often the right fit where strong performance, good value, and stable
                    day-to-day operations matter most.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-sm font-semibold text-white/90">
                    Dedicated Internet Access
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Better suited to business-critical environments that need stronger
                    uptime, cleaner consistency, and more predictable performance.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Orbitlink helps determine which service model fits the site based on
                business use case, operational sensitivity, and building reality. Learn
                more about{" "}
                <Link
                  href="/services/dedicated-internet-access"
                  className="underline underline-offset-4 text-white/85 hover:text-white"
                >
                  dedicated internet access
                </Link>{" "}
                when higher-criticality delivery and uptime expectations are required.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>REQUEST AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                Check fibre availability for your business
              </h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div>
                  <div className="text-white/60">Phone</div>
                  <a
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                    href={`tel:${BUSINESS.phoneE164}`}
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>

                <div>
                  <div className="text-white/60">Related page</div>
                  <Link
                    href="/locations/ontario"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Ontario coverage hub
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">Service model</div>
                  <div className="text-white/85">
                    Business connectivity delivered through structured onboarding,
                    availability validation, and clearly defined next steps.
                  </div>
                </div>

                <div>
                  <div className="text-white/60">Helpful details to include</div>
                  <div className="text-white/85">
                    Service address, city, building type, business use case, managed
                    Wi-Fi needs, static IP needs, voice requirements, and backup internet
                    requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an address-based availability check. If your site is
                  office-heavy, warehouse-oriented, industrial, multi-user, or
                  uptime-sensitive, include those details so the right setup can be
                  recommended.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                  >
                    Check Business Internet Availability
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                TOP COMMERCIAL MARKETS
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/business-internet-mississauga"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Mississauga
                </Link>
                <Link
                  href="/business-internet-toronto"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Toronto
                </Link>
                <Link
                  href="/business-internet-brampton"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Brampton
                </Link>
                <Link
                  href="/business-internet-milton"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Milton
                </Link>
                <Link
                  href="/locations/windsor"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Windsor
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Ontario business fibre internet FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers for business buyers researching fibre internet in Ontario,
            with availability confirmed by site before moving forward.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-base font-semibold tracking-tight">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Business Internet Availability
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              View Fibre Service
            </Link>
            <Link
              href="/locations/ontario"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Ontario Coverage Hub
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}