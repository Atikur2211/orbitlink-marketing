import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc. o/a Orbitlink";
const PAGE_URL = `${SITE_URL}/about`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ABOUTPAGE_ID = `${PAGE_URL}#aboutpage`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;

const PAGE_TITLE = "About Orbitlink";
const PAGE_DESCRIPTION =
  "About Orbitlink, a business connectivity brand for Ontario organizations. Fibre, dedicated internet, managed networking, and structured delivery.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Orbitlink is a business connectivity brand built for Ontario organizations that value clarity, structured delivery, and long-term trust.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "About Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "A business connectivity brand built for clarity, structured delivery, and long-term trust.",
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

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[32px] border border-white/10 bg-white/[0.045] ${className}`}
    >
      {children}
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>;
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

function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
        },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "30 Eglinton Ave W, Suite 400-A77",
          addressLocality: "Mississauga",
          addressRegion: "ON",
          postalCode: "L5R 3E7",
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario, Canada",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@orbitlink.ca",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@orbitlink.ca",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: {
          "@id": ORG_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "AboutPage",
        "@id": ABOUTPAGE_ID,
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
            name: "About",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="ABOUT"
      title="Built for businesses that expect better connectivity decisions"
      subtitle="Orbitlink helps Ontario businesses get the right internet, with clear communication and structured delivery from day one."
      pills={["Business-only focus", "Ontario coverage", "Clear process"]}
      actions={[
        {
          label: "Get Availability & Pricing",
          href: "/contact#intake",
          variant: "primary",
        },
        {
          label: "Call 1-888-867-2480",
          href: "tel:+18888672480",
          variant: "secondary",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />

      <SectionShell className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <SectionEyebrow>WHY ORBITLINK</SectionEyebrow>
          <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
            Business internet should be simple to understand
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
            Many businesses still face unclear pricing, generic plans, and poor communication.
            Orbitlink exists to make connectivity decisions clearer, faster, and more reliable.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="FOCUS" value="Business connectivity" />
            <MetricPill label="STYLE" value="Clear and structured" />
            <MetricPill label="MARKET" value="Ontario businesses" />
          </div>
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:p-8 lg:p-10">
        <SectionEyebrow>WHAT WE DO</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          We match the right service to your location
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
          Orbitlink helps businesses choose the right internet and network setup based on
          real site requirements.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <InfoCard
            title="Business fibre"
            body="Fast, stable connectivity for offices, clinics, and commercial spaces."
          />
          <InfoCard
            title="Dedicated internet"
            body="Higher-assurance connectivity for critical operations and uptime-sensitive environments."
          />
          <InfoCard
            title="Managed and backup services"
            body="Wi-Fi, voice, continuity, and support for more complete business connectivity."
          />
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:p-8 lg:p-10">
        <SectionEyebrow>HOW WE WORK</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          A simpler, clearer process
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
          We keep the path straightforward from first enquiry to next step.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <InfoCard
            title="1. We review your address"
            body="We check what is actually available for the building."
          />
          <InfoCard
            title="2. We match the right setup"
            body="Not every business needs the same solution."
          />
          <InfoCard
            title="3. You get a clear answer"
            body="Pricing, options, and the best next step."
          />
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:p-8 lg:p-10">
        <SectionEyebrow>POSITIONING</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Built for Ontario businesses
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
          Orbitlink focuses on offices, clinics, warehouses, and multi-site organizations
          across Ontario. The goal is simple: better service decisions and a more reliable
          provider experience.
        </p>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:p-8 lg:p-10">
        <SectionEyebrow>TRUST</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Built with long-term trust in mind
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
          Orbitlink is designed to feel calm, clear, and dependable from the start.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          <InfoCard
            title="Clear communication"
            body="No overpromises or confusing terms."
          />
          <InfoCard
            title="Structured delivery"
            body="From request to onboarding and follow-through."
          />
          <InfoCard
            title="Business-first approach"
            body="Built for real operations, not generic mass-market messaging."
          />
          <InfoCard
            title="Long-term mindset"
            body="Made to earn trust over time, not just attention in the moment."
          />
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:p-8 lg:p-10 text-center border-[#FACC15]/20 bg-[#FACC15]/[0.05]">
        <SectionEyebrow>FINAL STEP</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Get the right internet for your business
        </h2>
        <p className="mt-3 mx-auto max-w-3xl text-sm leading-6 text-white/72 sm:text-[15px]">
          Tell us your address. We’ll show what’s available and what to do next.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Get Availability & Pricing
          </Link>

          <a
            href="tel:+18888672480"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Call Now
          </a>
        </div>
      </SectionShell>
    </PageShell>
  );
}