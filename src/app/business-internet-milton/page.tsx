import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc. o/a Orbitlink";
const PAGE_PATH = "/business-internet-milton";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const SERVICE_ID = `${PAGE_URL}#service`;
const FAQ_ID = `${PAGE_URL}#faq`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;
const MODULES_ID = `${PAGE_URL}#service-modules`;

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

const PAGE_TITLE = "Business Internet in Milton, ON";
const PAGE_DESCRIPTION =
  "Business internet in Milton for warehouses, logistics, and offices. Fibre, dedicated connectivity, and managed Wi-Fi. Check availability.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
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
        alt: "Business Internet in Milton, ON",
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
    q: "Do you provide business internet in Milton?",
    a: "Yes. Orbitlink supports business internet opportunities in Milton for industrial, warehouse, logistics, and office environments. Availability depends on building infrastructure and upstream serviceability, so it is confirmed by address before moving forward.",
  },
  {
    q: "What type of business internet is available in Milton?",
    a: "Depending on the site, Orbitlink may support business fibre internet, dedicated internet access, managed LAN and Wi-Fi, backup internet, cloud voice, and static IP routing.",
  },
  {
    q: "Do you support warehouse and industrial sites in Milton?",
    a: "Yes. Milton has a strong industrial and logistics footprint. Sites with scanners, cameras, cloud platforms, VPNs, voice systems, and operational devices often need more than generic broadband.",
  },
  {
    q: "What is the difference between business fibre and dedicated internet?",
    a: "Business fibre internet is often the right fit when a site needs strong performance, good value, and stable daily operations. Dedicated internet access is better for critical environments that need stronger uptime and more predictable performance.",
  },
  {
    q: "Can you manage LAN and Wi-Fi in Milton offices and warehouses?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi including segmentation, guest access, operational device separation, and cleaner coverage planning.",
  },
  {
    q: "Do you offer backup internet options?",
    a: "Yes. Orbitlink can support LTE and 5G backup options for uptime-sensitive business environments, subject to site fit and feasibility.",
  },
] as const;

const fitCards = [
  {
    title: "Warehouses and logistics",
    desc: "Stable connectivity for scanners, shipping systems, cameras, cloud tools, VPNs, and workflows that depend on uptime.",
  },
  {
    title: "Industrial facilities",
    desc: "Segmentation between office users, operational devices, guest access, and site systems for cleaner day-to-day operations.",
  },
  {
    title: "Business parks and offices",
    desc: "Business internet for collaboration, VoIP, cloud applications, and teams that depend on uptime.",
  },
  {
    title: "Performance-critical sites",
    desc: "Dedicated internet and backup design for organizations where internet access is tightly linked to operations.",
  },
] as const;

const modules = [
  {
    title: "Business Fibre Internet",
    desc: "Reliable primary internet for warehouses, offices, and growing business locations.",
    href: "/services/business-fibre-internet",
  },
  {
    title: "Dedicated Internet Access",
    desc: "Stronger uptime and more predictable performance for critical operations.",
    href: "/services/dedicated-internet-access",
  },
  {
    title: "Managed LAN and Wi-Fi",
    desc: "Segmentation, stability, coverage planning, and stronger internal network support.",
    href: "/services/managed-lan-wifi",
  },
  {
    title: "LTE / 5G Backup",
    desc: "Backup internet for sites that need continuity during access disruptions.",
    href: "/services/lte-5g-continuity",
  },
] as const;

const whySwitch = [
  "Current provider is too slow during business hours",
  "Scanners, cameras, or cloud systems are unreliable",
  "Warehouse or logistics operations need stable uptime",
  "Need better internal Wi-Fi and network segmentation",
  "Want backup internet and uptime protection",
  "Need structured business onboarding and support",
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
          name: "Milton, Ontario",
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
        name: "Business Internet in Milton",
        url: PAGE_URL,
        provider: {
          "@id": ORG_ID,
        },
        areaServed: {
          "@type": "City",
          name: "Milton",
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
          "Business internet in Milton for warehouse, industrial, logistics, and office environments.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: PAGE_TITLE, item: PAGE_URL },
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
        "@id": MODULES_ID,
        name: "Milton Business Internet Service Modules",
        itemListElement: modules.map((module, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: module.title,
          url: `${SITE_URL}${module.href}`,
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

export default function BusinessInternetMiltonPage() {
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
            Milton business internet landing page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business Internet in Milton, ON
              <span className="block text-white/60">
                Built for industrial and logistics operations
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Orbitlink supports business internet in Milton for industrial,
              warehouse, logistics, and office environments. Availability is checked
              by address so the right service setup can be matched to your location
              before moving forward.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68">
              Whether you need business fibre internet, dedicated internet access,
              managed Wi-Fi, or backup connectivity, the goal is a cleaner fit for
              uptime-sensitive daily operations.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Business Fibre Internet",
                "Dedicated Internet Access",
                "Managed Wi-Fi",
                "Backup Connectivity",
                "Industrial and warehouse fit",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 max-w-3xl text-sm leading-6 text-white/62">
              Explore{" "}
              <Link
                href="/services/business-fibre-internet"
                className="underline underline-offset-4 hover:text-white"
              >
                business fibre internet
              </Link>
              ,{" "}
              <Link
                href="/services/dedicated-internet-access"
                className="underline underline-offset-4 hover:text-white"
              >
                dedicated internet access
              </Link>
              ,{" "}
              <Link
                href="/services/managed-lan-wifi"
                className="underline underline-offset-4 hover:text-white"
              >
                managed LAN and Wi-Fi
              </Link>
              , and{" "}
              <Link
                href="/services/lte-5g-continuity"
                className="underline underline-offset-4 hover:text-white"
              >
                LTE / 5G backup
              </Link>
              .
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
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Trust and Compliance
              </Link>
            </div>

            <div className="mt-3 text-sm text-white/60">
              Availability varies by building. Submit your address to confirm options.
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Milton business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and service direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>WHY BUSINESSES SWITCH</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              A cleaner fit for real Milton operations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Businesses usually switch when internet instability starts affecting
              voice, cloud tools, internal systems, remote access, scanners, cameras,
              or multi-user workflows. The right Milton business internet setup needs
              to fit both the building and the way the site actually operates.
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
              <SectionEyebrow>BUSINESS INTERNET IN MILTON</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business internet for Milton industrial, warehouse, and commercial environments
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Business internet in Milton is not only about speed. It is about
                  supporting daily operations with stable connectivity for multiple users,
                  cloud platforms, scanners, cameras, voice systems, operational devices,
                  and customer-facing services.
                </p>

                <p>
                  Milton continues to grow as one of Ontario’s strongest logistics and
                  industrial markets, with warehouses, industrial facilities, business
                  parks, and office environments spread across major employment corridors.
                </p>

                <p>
                  Orbitlink checks what is available by address instead of making blanket
                  claims. That makes it easier to recommend the right combination of
                  business fibre internet, dedicated internet access, managed LAN and Wi-Fi,
                  backup connectivity, static IP routing, and voice support where needed.
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
                  to determine the right fit for warehouse, logistics, or office environments.
                </p>

                <p>
                  This makes Orbitlink a strong option for businesses looking for reliable
                  business internet in Milton with a clearer deployment path and more
                  structured support.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>WHO THIS PAGE IS FOR</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Milton business environments
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
              <SectionEyebrow>CHECK AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Check business internet availability for your location
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Availability depends on building infrastructure, upstream serviceability,
                  installation feasibility, and the type of business internet your site
                  actually needs. Orbitlink checks this by address before recommending the
                  next step.
                </p>

                <p>
                  This matters because Milton business environments can vary sharply
                  between warehouse sites, industrial units, office spaces, and mixed-use
                  commercial properties.
                </p>

                <p>
                  A quick availability request helps confirm what is realistic for the site
                  instead of relying on generic assumptions.
                </p>

                <BulletList
                  items={[
                    "What is available at your building",
                    "Whether business fibre or dedicated internet is the right fit",
                    "Installation feasibility and service path",
                    "Whether managed Wi-Fi, voice, or backup should be included",
                  ]}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE OPTIONS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Choose the right service for the site
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {modules.map((module) => (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{module.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {module.desc}
                    </div>
                    <div className="mt-3 text-xs text-white/60">Open service →</div>
                  </Link>
                ))}
              </div>

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business fibre vs dedicated internet in Milton
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Business fibre internet is often the right fit when you need strong
                performance, good value, and stable day-to-day operations. Dedicated
                internet access is better for critical environments where stronger uptime
                and more predictable performance matter.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>REQUEST AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                Check business internet availability
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
                    href="/locations/milton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Milton service area page
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">Helpful details to include</div>
                  <div className="text-white/85">
                    Service address, fibre vs dedicated internet needs, static IP
                    requirements, managed Wi-Fi, and backup internet requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an address-based availability check. If your environment is
                  warehouse-heavy, industrial, or uptime-sensitive, include those details
                  so the right setup can be recommended.
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
                RELATED MARKETS
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/oakville"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Oakville
                </Link>
                <Link
                  href="/locations/mississauga"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Mississauga
                </Link>
                <Link
                  href="/locations/brampton"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Brampton
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
            Milton business internet FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers for Milton business buyers, with availability checked by site
            before moving forward.
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
              href="/locations/milton"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Milton Service Area
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Trust and Compliance
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}