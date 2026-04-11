import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import BentoServices from "@/components/BentoServices";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc.";
const BRAND_PHONE_DISPLAY = "1-888-867-2480";
const BRAND_PHONE_E164 = "+18888672480";
const CANONICAL_URL = `${SITE_URL}/`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${CANONICAL_URL}#webpage`;
const SERVICE_ID = `${CANONICAL_URL}#service`;
const FAQ_ID = `${CANONICAL_URL}#faq`;
const BREADCRUMB_ID = `${CANONICAL_URL}#breadcrumb`;

const META_TITLE = "Business Fibre Internet in Ontario";
const META_DESCRIPTION =
  "Business fibre internet in Ontario for offices, warehouses, and clinics. Fast, reliable connectivity with expert setup. Check availability.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    "business fibre internet ontario",
    "business internet ontario",
    "dedicated internet access ontario",
    "business internet mississauga",
    "business internet toronto",
    "managed wi-fi ontario",
    "backup connectivity ontario",
    "commercial internet provider ontario",
    "business connectivity ontario",
    "network infrastructure ontario",
    "business internet for offices ontario",
    "business internet for clinics ontario",
    "business internet for warehouses ontario",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business fibre internet and dedicated connectivity for Ontario businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/52 sm:text-[11px] sm:tracking-[0.24em]">
      {children}
    </div>
  );
}

function MiniMetaCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-3.5 py-3 backdrop-blur-sm sm:px-4 sm:py-3.5">
      <div className="text-[10px] font-medium tracking-[0.16em] text-white/42">
        {title}
      </div>
      <div className="mt-1.5 text-[13px] leading-5 text-white/84 sm:text-sm">
        {value}
      </div>
    </div>
  );
}

function FitCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/25 hover:bg-white/[0.05] sm:rounded-[24px] sm:p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2.5 text-sm leading-6 text-white/66">{body}</p>
    </div>
  );
}

function SolutionCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/25 hover:bg-white/[0.06] sm:rounded-[24px] sm:p-5"
    >
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2.5 text-sm leading-6 text-white/66">{desc}</p>
      <div className="mt-3 text-xs text-white/58">Open service →</div>
    </Link>
  );
}

function StepCard({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="h-full rounded-[20px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/30 hover:bg-white/[0.05] sm:rounded-[24px] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/92">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/66">{desc}</p>
    </div>
  );
}

function ProofCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:rounded-[24px] sm:p-6">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2.5 text-sm leading-6 text-white/66">{body}</p>
    </div>
  );
}

function FAQCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="h-full rounded-[20px] border border-white/10 bg-black/20 p-4 sm:rounded-[24px] sm:p-6">
      <h3 className="text-sm font-medium text-white/92">{question}</h3>
      <p className="mt-2.5 text-sm leading-6 text-white/66">{answer}</p>
    </div>
  );
}

function CoverageCard({
  city,
  note,
  href,
}: {
  city: string;
  note: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-[20px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/30 hover:bg-white/[0.05] sm:rounded-[24px] sm:p-5"
    >
      <div className="text-[10px] tracking-[0.2em] text-white/50 sm:text-[11px]">
        {city.toUpperCase()}
      </div>
      <div className="mt-2 text-sm font-medium leading-6 text-white/90">
        {note}
      </div>
      <div className="mt-4 text-xs text-white/55 transition group-hover:text-white/75">
        Open location →
      </div>
    </Link>
  );
}

function TrustPill({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-white/72 sm:text-xs">
      {text}
    </div>
  );
}

export default function Home() {
  const schemaGraph = {
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
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: BRAND_PHONE_E164,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: `${SITE_URL}/contact`,
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: BRAND_PHONE_E164,
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
        url: CANONICAL_URL,
        name: META_TITLE,
        description: META_DESCRIPTION,
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
        name: "Orbitlink Business Internet & Managed Network Services",
        url: CANONICAL_URL,
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
          "Business VoIP",
          "LTE / 5G Backup Connectivity",
          "Network Infrastructure Services",
        ],
        termsOfService: `${SITE_URL}/legal/terms`,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
        description:
          "Business fibre internet, dedicated internet access, and managed connectivity solutions for Ontario businesses.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I check if Orbitlink can serve my business location?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Submit your business address and service requirements through the Orbitlink contact intake. Availability is reviewed based on address, building infrastructure, and service type.",
            },
          },
          {
            "@type": "Question",
            name: "Does Orbitlink offer business fibre and dedicated internet access?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Orbitlink supports business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and backup connectivity for Ontario businesses.",
            },
          },
          {
            "@type": "Question",
            name: "What types of businesses does Orbitlink support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Orbitlink supports offices, clinics, warehouses, commercial units, logistics environments, and multi-site business locations across Ontario.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I submit a request?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Orbitlink reviews the address, service requirements, building infrastructure, and available service paths, then responds with the most practical next step.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#07090D] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <TopNav />
      <StickyStatusStrip />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-business-ontario.jpg"
            alt="Ontario business team in a modern office environment"
            fill
            priority
            quality={72}
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.54)_0%,rgba(4,7,12,0.74)_30%,rgba(4,7,12,0.92)_74%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.95)_0%,rgba(4,7,12,0.76)_36%,rgba(4,7,12,0.22)_68%,rgba(4,7,12,0.90)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(250,204,21,0.10),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(6,182,212,0.08),transparent_24%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl items-center px-4 pb-10 pt-20 sm:min-h-[76svh] sm:px-7 sm:pb-14 sm:pt-24 lg:min-h-[80vh] lg:px-10 lg:pb-16 lg:pt-20">
          <div className="w-full max-w-4xl">
            <div className="w-full max-w-[355px] truncate rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] text-white/78 backdrop-blur sm:max-w-max sm:text-xs">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business Fibre • Dedicated Internet • Managed Network Infrastructure
            </div>

            <h1 className="mt-5 max-w-[11ch] text-[2.15rem] font-semibold leading-[0.94] tracking-tight text-white sm:max-w-[12.5ch] sm:text-[3.2rem] lg:max-w-5xl lg:text-[4.4rem] xl:text-[5.1rem]">
              Business Internet
              <span className="block text-white/70">Engineered Properly</span>
            </h1>

            <p className="mt-4 max-w-[42rem] text-[15px] leading-6 text-white/86 sm:text-[1.04rem] sm:leading-7">
              Fibre, dedicated internet access, managed Wi-Fi, and backup
              connectivity designed for offices, clinics, warehouses, and
              multi-site operations across Ontario.
            </p>

            <div className="mt-3 text-[13px] leading-5 text-white/64 sm:text-sm">
              Address-qualified review. Clear commercial direction. Operator-grade support path.
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Business-only service",
                "Ontario coverage",
                "Reviewed by address",
                "Clear next step",
                "Structured onboarding",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/72 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-start">
              <div className="flex flex-col gap-2">
                <Link
                  href="/contact#intake"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047] sm:rounded-2xl"
                >
                  Check Business Internet Availability
                </Link>
                <div className="text-center text-[11px] text-white/55 sm:text-left sm:text-xs">
                  Business-only review • No obligation • Clear next step
                </div>
              </div>

              <Link
                href="/contact#intake"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10 sm:rounded-2xl"
              >
                Request Pricing
              </Link>

              <Link
                href="/locations/ontario"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10 sm:rounded-2xl"
              >
                Ontario Coverage Hub
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/46 sm:text-xs">
              <span>CRTC-registered</span>
              <span className="hidden sm:inline">•</span>
              <span>Ontario business coverage</span>
              <span className="hidden sm:inline">•</span>
              <span>Direct support path</span>
              <span className="hidden sm:inline">•</span>
              <span>{BRAND_PHONE_DISPLAY}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <SectionEyebrow>START HERE</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Choose the right setup for your business
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Start with how your site operates. That makes the right internet,
              backup, and internal network path much clearer.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 sm:mt-8 sm:gap-4">
            <FitCard
              title="Offices and clinics"
              body="Stable connectivity, managed Wi-Fi, and a cleaner fit for professional business environments."
            />
            <FitCard
              title="Critical operations"
              body="Dedicated internet access and continuity planning for uptime-sensitive environments."
            />
            <FitCard
              title="Internal network issues"
              body="Coverage, LAN, and Wi-Fi problems that affect staff, devices, and day-to-day operations."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-7 sm:pb-12">
        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/22 p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#FACC15]/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%)]" />
          </div>

          <div className="relative">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS CONNECTIVITY SOLUTIONS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Connectivity designed for Ontario organizations
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Choose the service that fits your location, then move into availability,
                  fit, and commercial review.
                </p>
              </div>
              <MiniMetaCard
                title="FOCUS"
                value="Fibre • Dedicated • Managed Wi-Fi • Backup"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5 sm:mt-8 sm:gap-4">
              <SolutionCard
                title="Business fibre internet"
                desc="Business-grade fibre for offices, clinics, warehouses, and commercial sites."
                href="/services/business-fibre-internet"
              />
              <SolutionCard
                title="Dedicated internet access"
                desc="Higher-assurance internet for uptime-sensitive and performance-critical environments."
                href="/services/dedicated-internet-access"
              />
              <SolutionCard
                title="Managed Wi-Fi"
                desc="Improved wireless coverage, device performance, and day-to-day reliability."
                href="/services/managed-lan-wifi"
              />
              <SolutionCard
                title="LTE / 5G backup"
                desc="Secondary connectivity for continuity when the primary link matters."
                href="/services/lte-5g-continuity"
              />
              <SolutionCard
                title="Business voice"
                desc="Voice services aligned to support flow, growth, and business operations."
                href="/services/voip-cloud-voice"
              />
            </div>

            <div className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.04] p-4 sm:mt-6 sm:rounded-[24px] sm:p-5">
              <div className="text-sm leading-6 text-white/82">
                Every solution is reviewed against your address, building infrastructure,
                provider reach, and operating requirements.
              </div>
            </div>
          </div>
        </div>
      </section>

      <BentoServices />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[26px] border border-white/10 bg-black/22 p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A clear path from enquiry to recommendation
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Submit your address, business requirements, and timeline. Orbitlink
                reviews the site, available service paths, and the most suitable next step.
              </p>
            </div>
            <MiniMetaCard title="PROCESS" value="Simple • Practical • Clear" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 sm:mt-8 sm:gap-4">
            <StepCard
              step="1"
              title="Submit your business address"
              desc="Share the location, environment, and what the service needs to support."
            />
            <StepCard
              step="2"
              title="We review available options"
              desc="We assess infrastructure, provider reach, backup requirements, and service fit."
            />
            <StepCard
              step="3"
              title="Receive the right next step"
              desc="You get clear direction, pricing guidance, or the best route for the site."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[26px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>WHY BUSINESSES CHOOSE ORBITLINK</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Built for real business needs, not generic packages
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Orbitlink helps Ontario organizations choose the right service for
                the site, the workload, and the next stage of growth.
              </p>
            </div>
            <MiniMetaCard title="BUYER SIGNAL" value="Fit • Confidence • Action" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 sm:mt-8 sm:gap-4">
            <ProofCard
              title="Reviewed by address"
              body="Availability and service direction are assessed against the real site, infrastructure, and operating requirement."
            />
            <ProofCard
              title="Cleaner buying path"
              body="Serious buyers move from interest to decision without unnecessary friction or confusion."
            />
            <ProofCard
              title="Clear expectations first"
              body="We focus on fit, realistic next steps, and practical guidance before commitment."
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            <TrustPill text={`Operated by ${LEGAL_NAME}`} />
            <TrustPill text="CRTC-registered provider" />
            <TrustPill text="Business-only review" />
            <TrustPill text="Address-based qualification" />
            <TrustPill text="Ontario coverage" />
            <TrustPill text="Clear next-step guidance" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>ONTARIO LOCATIONS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Explore location-based business internet pages
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Browse Ontario location pages to review local fit, availability,
                and commercial relevance.
              </p>
            </div>
            <MiniMetaCard title="LOCAL SEO" value="Built for local search intent" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 sm:mt-8 sm:gap-4">
            <CoverageCard
              city="Toronto"
              note="Business internet and commercial connectivity"
              href="/business-internet-toronto"
            />
            <CoverageCard
              city="Mississauga"
              note="Priority business market"
              href="/business-internet-mississauga"
            />
            <CoverageCard
              city="Vaughan"
              note="Industrial and office environments"
              href="/locations/vaughan"
            />
            <CoverageCard
              city="Brampton"
              note="Warehouse and logistics environments"
              href="/business-internet-brampton"
            />
          </div>

          <div className="mt-5 text-sm leading-6 text-white/64">
            You can also review the{" "}
            <Link
              href="/business-fibre-internet-ontario"
              className="text-white/84 underline underline-offset-4 hover:text-white"
            >
              Ontario business fibre hub
            </Link>{" "}
            for province-wide business connectivity planning.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>FREQUENTLY ASKED QUESTIONS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Questions buyers ask before submitting a request
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Clear answers for businesses comparing internet and managed network options.
              </p>
            </div>
            <MiniMetaCard title="CLARITY" value="Useful answers for buyers" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 sm:mt-8 sm:gap-4">
            <FAQCard
              question="How do I check if Orbitlink can serve my business location?"
              answer="Submit your business address and service requirements through the Orbitlink contact intake. Availability is reviewed based on address, building infrastructure, and service type."
            />
            <FAQCard
              question="Does Orbitlink offer business fibre and dedicated internet access?"
              answer="Yes. Orbitlink supports business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and backup connectivity for Ontario businesses."
            />
            <FAQCard
              question="What types of businesses does Orbitlink support?"
              answer="Orbitlink supports offices, clinics, warehouses, commercial units, logistics environments, and multi-site business locations across Ontario."
            />
            <FAQCard
              question="What happens after I submit a request?"
              answer="Orbitlink reviews the address, service requirements, building infrastructure, and available service paths, then responds with the most practical next step."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-7 sm:pb-20">
        <div className="rounded-[26px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>READY TO CHECK YOUR OPTIONS?</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Check availability for your business location
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Get availability, pricing direction, and the right next step for your site.
              </p>
            </div>
            <MiniMetaCard title="NEXT STEP" value="Availability • Pricing • Direction" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <div className="flex flex-col gap-2">
              <Link
                href="/contact#intake"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047] sm:rounded-2xl"
              >
                Check Business Internet Availability
              </Link>
              <div className="text-center text-[11px] text-white/55 sm:text-left sm:text-xs">
                Business-only review • No obligation • Clear next step
              </div>
            </div>

            <Link
              href="/contact#intake"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10 sm:rounded-2xl"
            >
              Request Pricing
            </Link>

            <Link
              href="/services"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10 sm:rounded-2xl"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}