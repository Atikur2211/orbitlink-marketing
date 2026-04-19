import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc.";
const PAGE_PATH = "/business-internet-ontario";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const BRAND_PHONE_E164 = "+18888672480";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;
const FAQ_ID = `${PAGE_URL}#faq`;

const PAGE_TITLE = "Business Internet in Ontario | Fibre, Dedicated & Backup";
const PAGE_DESCRIPTION =
  "Business internet in Ontario for offices, clinics, warehouses, and commercial sites. Compare fibre, dedicated internet, and backup options.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Business Internet in Ontario | ${SITE_NAME}`,
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
        alt: "Business Internet in Ontario | Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Business Internet in Ontario | ${SITE_NAME}`,
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

const FAQ_ITEMS = [
  {
    q: "What is the best business internet option in Ontario?",
    a: "The best option depends on the business environment, risk tolerance, and operational dependency on connectivity. Business fibre internet is often the best fit for standard office, clinic, warehouse, and commercial use, while dedicated internet access is better for sites that need stronger uptime expectations and a more controlled service model.",
  },
  {
    q: "What is the difference between business fibre internet and dedicated internet access?",
    a: "Business fibre internet is generally the right choice for most day-to-day business operations. Dedicated internet access is more appropriate for locations where downtime has greater operational impact and stronger assurance matters more.",
  },
  {
    q: "Can I get business internet for an office, clinic, or warehouse in Ontario?",
    a: "Yes. Many Ontario business locations such as offices, clinics, warehouses, industrial spaces, retail units, and commercial suites can be reviewed for business fibre internet, dedicated internet access, backup connectivity, managed Wi-Fi, and related network services.",
  },
  {
    q: "Do Ontario businesses need backup internet?",
    a: "Not every business needs a secondary circuit, but continuity-focused businesses often add LTE or 5G backup connectivity when downtime would affect payments, cloud tools, phones, customer response, or internal operations.",
  },
  {
    q: "How do I check business internet availability in Ontario?",
    a: "The fastest starting point is the business address and the service need. Orbitlink can review building fit, likely service options, and the best next step based on the business environment and service model.",
  },
  {
    q: "Should I start with a general business internet page or a service page?",
    a: "If you are still deciding between fibre, dedicated internet, and continuity options, start with a broader guide like this page. If you already know the service type you need, you can move directly into the most relevant service page.",
  },
] as const;

const SERVICE_OPTIONS = [
  {
    title: "Business Fibre Internet",
    body: "Best for most Ontario businesses that need strong primary internet for everyday operations across offices, clinics, warehouses, and commercial environments.",
    href: "/services/business-fibre-internet",
    cta: "View Business Fibre",
    tag: "MOST COMMON FIT",
  },
  {
    title: "Dedicated Internet Access",
    body: "Best for sites where downtime matters more and the business needs a higher-assurance, more controlled internet service model.",
    href: "/services/dedicated-internet-access",
    cta: "View Dedicated Internet",
    tag: "HIGHER ASSURANCE",
  },
  {
    title: "LTE / 5G Backup Connectivity",
    body: "Best for businesses that want continuity support and a second path ready when the primary connection goes down.",
    href: "/services/lte-5g-continuity",
    cta: "View Backup Connectivity",
    tag: "CONTINUITY",
  },
] as const;

const BUYER_FIT = [
  "Professional offices",
  "Medical and clinic environments",
  "Warehouses and industrial spaces",
  "Commercial suites and retail units",
  "Multi-site operations",
] as const;

const CHOOSING_GUIDE = [
  {
    title: "Choose business fibre when",
    bullets: [
      "You need strong primary internet for day-to-day business use",
      "The site is an office, clinic, warehouse, or commercial location",
      "You want a clear business-grade internet starting point",
    ],
  },
  {
    title: "Choose dedicated internet when",
    bullets: [
      "Downtime creates higher business impact",
      "The business needs stronger uptime expectations",
      "You want a more controlled and higher-assurance service model",
    ],
  },
  {
    title: "Add backup when",
    bullets: [
      "The business cannot rely on one path only",
      "Payments, phones, or cloud tools must stay available",
      "Continuity matters during primary circuit outages",
    ],
  },
] as const;

const LOCATION_LINKS = [
  { href: "/business-internet-toronto", label: "Toronto" },
  { href: "/business-internet-mississauga", label: "Mississauga" },
  { href: "/business-internet-brampton", label: "Brampton" },
  { href: "/business-internet-milton", label: "Milton" },
  { href: "/internet-near-me", label: "Internet Near Me" },
  { href: "/business-fibre-internet-ontario", label: "Business Fibre Internet in Ontario" },
] as const;

const SUPPORTING_LINKS = [
  {
    title: "Business Fibre Internet in Ontario",
    body: "A fibre-focused support page for businesses that are already leaning toward fibre as the likely primary service fit.",
    href: "/business-fibre-internet-ontario",
    cta: "View Fibre-Focused Ontario Page",
  },
  {
    title: "Business Internet in Toronto",
    body: "For Toronto businesses looking for a more location-specific business internet path.",
    href: "/business-internet-toronto",
    cta: "View Toronto Page",
  },
  {
    title: "Business Internet in Mississauga",
    body: "For Mississauga businesses that want a more local entry point before requesting pricing.",
    href: "/business-internet-mississauga",
    cta: "View Mississauga Page",
  },
] as const;

function Surface({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      {...props}
      className={`rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_24px_62px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/42">{label}</div>
      <div className="mt-1 text-sm leading-5 text-white/82">{value}</div>
    </div>
  );
}

function TrustPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/72 sm:text-xs">
      {text}
    </span>
  );
}

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <div className="flex flex-wrap items-center gap-2 text-sm text-white/52">
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        <span>/</span>
        <span className="text-white/76">Business Internet in Ontario</span>
      </div>
    </nav>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
      {children}
    </div>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        telephone: BRAND_PHONE_E164,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        name: PAGE_TITLE,
        url: PAGE_URL,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        breadcrumb: { "@id": BREADCRUMB_ID },
        inLanguage: "en-CA",
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
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
            name: "Business Internet in Ontario",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };
}

export default function BusinessInternetOntarioPage() {
  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/services-hero-business-connectivity.jpg"
            alt="Ontario business environment with enterprise connectivity backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.46)_0%,rgba(4,7,12,0.66)_36%,rgba(4,7,12,0.90)_78%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.95)_0%,rgba(4,7,12,0.62)_34%,rgba(4,7,12,0.18)_66%,rgba(4,7,12,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(250,204,21,0.07),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.09),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-center px-5 pb-10 pt-24 sm:min-h-[58svh] sm:pb-12 sm:pt-22 lg:min-h-[56svh] lg:px-10 lg:pb-14 lg:pt-20">
          <div className="w-full max-w-[50rem]">
            <Breadcrumbs />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/76 backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Ontario Business Internet Guide
            </div>

            <h1 className="mt-5 max-w-4xl text-[2rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              Business Internet in Ontario
              <span className="block text-white/62">
                for offices, clinics, warehouses, and commercial locations
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/80 sm:text-[15px]">
              Compare{" "}
              <Link
                href="/services/business-fibre-internet"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                business fibre internet
              </Link>
              ,{" "}
              <Link
                href="/services/dedicated-internet-access"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                dedicated internet access
              </Link>
              , and{" "}
              <Link
                href="/services/lte-5g-continuity"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                backup connectivity
              </Link>{" "}
              for Ontario businesses. Start with your business need, then move into availability and pricing.
            </p>

            <div className="mt-3 text-sm text-white/70">
              Built for Ontario offices, clinics, warehouses, multi-site environments, and growing business operations.
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {BUYER_FIT.map((item) => (
                <TrustPill key={item} text={item} />
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Get Availability & Pricing
              </Link>

              <a
                href="tel:+18888672480"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Speak to a Network Advisor
              </a>

              <Link
                href="/services/business-fibre-internet"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                View Business Fibre
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Business-only • Reviewed by address • Clear next step
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative space-y-5 sm:space-y-6">
          <Surface className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>START HERE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Most Ontario businesses start with one of these 3 service paths
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is built as a broad Ontario traffic page. Its role is to help buyers understand the main service paths clearly before moving deeper into the most relevant money page.
                </p>
              </div>

              <MetricPill label="BUYER MODE" value="Simple • Clear • Business-ready" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {SERVICE_OPTIONS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.06] sm:rounded-[26px]"
                >
                  <div className="text-[10px] tracking-[0.24em] text-white/45 sm:text-[11px]">
                    {item.tag}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
                  >
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-5 sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <SectionEyebrow>HOW TO CHOOSE</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Choose the right business internet service
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                The right answer depends on whether the site needs strong primary internet, higher assurance, or continuity protection.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {CHOOSING_GUIDE.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-white/63">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]">
              <p className="text-sm leading-7 text-white/72">
                Not sure if fibre is the right fit?{" "}
                <Link
                  href="/business-fibre-internet-ontario"
                  className="underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  Explore business fibre internet in Ontario
                </Link>{" "}
                for a more fibre-focused view, or move directly into{" "}
                <Link
                  href="/services/business-fibre-internet"
                  className="underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  business fibre services
                </Link>
                .
              </p>
            </div>
          </Surface>

          <Surface className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>WHY THIS PAGE HELPS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Business internet is easier to buy when the service model is clear
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Many businesses lose time comparing the wrong categories. This page helps separate standard business internet, higher-assurance dedicated service, and continuity support before pricing discussions begin.
                </p>
              </div>

              <MetricPill label="VALUE" value="Better fit • Less rework" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                "Choose the right primary internet model earlier",
                "Separate fibre from dedicated internet more clearly",
                "Understand when backup connectivity matters",
                "Move faster into pricing and availability",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
                >
                  <div className="text-sm font-medium text-white/88">{item}</div>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SUPPORTING PAGES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Supporting Ontario and city-level pages
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  These pages strengthen topical coverage and help distribute internal authority across Ontario and city-specific business internet searches.
                </p>
              </div>

              <MetricPill label="INTERNAL SEO" value="Clustered • Crawlable • Non-orphan" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {SUPPORTING_LINKS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
                >
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
                  >
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>ONTARIO LOCATIONS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Business internet across Ontario markets
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Explore city-specific pages if you want a more local business internet path before moving into availability and pricing.
                </p>
              </div>

              <MetricPill label="LOCATION SIGNAL" value="Ontario-wide business focus" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {LOCATION_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Surface>

          <Surface className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>NEXT STEP</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Get availability and pricing for your business
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Start with the business address and service need. Orbitlink can help narrow the right service path and move the opportunity toward availability, fit, and pricing.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact#intake"
                  className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Get Availability & Pricing
                </Link>
                <Link
                  href="/services/business-fibre-internet"
                  className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  View Business Fibre
                </Link>
                <Link
                  href="/services/dedicated-internet-access"
                  className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  View Dedicated Internet
                </Link>
              </div>
            </div>
          </Surface>

          <Surface id="faq" className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>FREQUENTLY ASKED QUESTIONS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Common business internet questions
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  These answers help Ontario business buyers understand service categories before moving into pricing discussions.
                </p>
              </div>

              <MetricPill label="SEO + CLARITY" value="Useful for buyers and search" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
                >
                  <h3 className="text-sm font-medium text-white/90">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.a}</p>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </section>
    </div>
  );
}