import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc. o/a Orbitlink";
const PAGE_PATH = "/contact/thank-you";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";
const GENERAL_EMAIL = "concierge@orbitlink.ca";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const SERVICE_ID = `${PAGE_URL}#confirmation`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;

export const metadata: Metadata = {
  title: "Request Received",
  description:
    "Your business request has been received. Orbitlink is reviewing your location and service requirements.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Request Received",
    description: "Your request has been received and is now being reviewed.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink request received confirmation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Received",
    description: "Your request has been received and is being reviewed.",
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: false,
    follow: false,
  },
};

function Surface({
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
      <div className="text-[10px] tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={
          primary
            ? "inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            : "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
        }
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          : "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
      }
    >
      {children}
    </Link>
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
        telephone: PHONE_E164,
        email: GENERAL_EMAIL,
        logo: `${SITE_URL}/icon.png`,
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
        name: "Request Received",
        description: "Confirmation page for submitted business connectivity requests.",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
        },
        breadcrumb: {
          "@id": BREADCRUMB_ID,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Business Request Confirmation",
        provider: {
          "@id": ORG_ID,
        },
        url: PAGE_URL,
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        description:
          "Confirmation page for submitted business connectivity enquiries.",
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
            name: "Contact",
            item: `${SITE_URL}/contact`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Request Received",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };
}

export default function ContactThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />

      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-5 py-10 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
        <Surface className="relative w-full overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute right-0 top-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-[11px] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Request received
            </div>

            <SectionEyebrow>THANK YOU</SectionEyebrow>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              We’ve received your request.
            </h1>

            <p className="mt-4 mx-auto max-w-2xl text-sm leading-6 text-white/70 sm:text-[15px]">
              We’re reviewing your address and service requirements now.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MetricPill label="STATUS" value="Submitted" />
              <MetricPill label="REVIEW" value="In progress" />
              <MetricPill label="RESPONSE" value="~1 business day" />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <CTAButton href="/" primary>
                Back to Home
              </CTAButton>

              <CTAButton href={`tel:${PHONE_E164}`}>
                Call {PHONE_DISPLAY}
              </CTAButton>
            </div>

            <div className="mt-4 text-sm text-white/55">
              Need help now?{" "}
              <a
                href={`mailto:${GENERAL_EMAIL}`}
                className="text-white/80 transition hover:text-white"
              >
                {GENERAL_EMAIL}
              </a>
            </div>
          </div>
        </Surface>
      </div>
    </main>
  );
}