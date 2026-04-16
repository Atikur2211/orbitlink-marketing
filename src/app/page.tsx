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

// Keep this WITHOUT "| Orbitlink" because your layout template already adds branding.
const META_TITLE = "Business Fibre Internet in Ontario";
const META_DESCRIPTION =
  "Business fibre internet, dedicated internet access, managed Wi-Fi and backup connectivity for Ontario businesses. Get availability and pricing for your address.";

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
    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/25 hover:bg-white/[0.05] sm:rounded-[24px] sm:p-6">
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

function ActionButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047] sm:rounded-2xl"
          : "inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-black/15 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10 sm:rounded-2xl"
      }
    >
      {children}
    </Link>
  );
}

function PhoneButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-black/15 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10 sm:rounded-2xl"
    >
      {children}
    </a>
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
          "Business fibre internet, dedicated internet access, managed connectivity solutions, and backup connectivity for Ontario businesses.",
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

        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl items-center px-4 pb-10 pt-20 sm:min-h-[76svh] sm:px-7 sm:pb-14 sm:pt-24 lg:min-h-[82vh] lg:px-10 lg:pb-16 lg:pt-20">
          <div className="w-full max-w-4xl">
            <div className="w-full max-w-[390px] truncate rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] text-white/78 backdrop-blur sm:max-w-max sm:text-xs">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Ontario Business Connectivity • Fibre • Dedicated • Managed Infrastructure
            </div>

            <h1 className="mt-5 max-w-[11ch] text-[2.15rem] font-semibold leading-[0.94] tracking-tight text-white sm:max-w-[12.5ch] sm:text-[3.2rem] lg:max-w-5xl lg:text-[4.4rem] xl:text-[5.1rem]">
              Business Internet
              <span className="block text-white/70">Engineered for Reliability</span>
            </h1>

            <p className="mt-4 max-w-[48rem] text-[15px] leading-6 text-white/86 sm:text-[1.04rem] sm:leading-7">
              Fibre, dedicated internet access, managed Wi-Fi, and backup connectivity
              for offices, clinics, warehouses, and multi-site operations across Ontario —
              reviewed by address, designed properly, and coordinated end-to-end.
            </p>

            <div className="mt-3 max-w-[44rem] text-[13px] leading-5 text-white/72 sm:text-sm">
              Get availability, pricing direction, and the right next step for your building.
              Most businesses receive next-step guidance within 1 business day.
            </div>

            <div className="mt-3 text-sm text-white/82">
              Speak to a Network Advisor:{" "}
              <a
                href={`tel:${BRAND_PHONE_E164}`}
                className="font-medium text-[#FACC15] transition hover:text-[#FDE68A]"
              >
                {BRAND_PHONE_DISPLAY}
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Business-only service",
                "Ontario coverage",
                "Reviewed by address",
                "Carrier-aware design",
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
                <ActionButton href="/contact#intake" primary>
                  Get Availability & Pricing for Your Address
                </ActionButton>
                <div className="text-center text-[11px] text-white/55 sm:text-left sm:text-xs">
                  Takes 60 seconds • No obligation • Clear next step
                </div>
                <div className="text-center text-[11px] text-white/48 sm:text-left sm:text-xs">
                  We will tell you if switching actually improves your setup — not just sell you a plan.
                </div>
              </div>

              <PhoneButton href={`tel:${BRAND_PHONE_E164}`}>
                Speak to a Network Advisor
              </PhoneButton>

              <ActionButton href="/locations/ontario">
                Ontario Coverage Hub
              </ActionButton>
            </div>

            <div className="mt-4 text-[11px] text-[#FDE68A] sm:text-xs">
              Limited onboarding capacity this month for Ontario business sites
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

          <div className="mt-10 text-center">
            <h3 className="text-xl font-medium text-white">
              Get availability and pricing for your business location
            </h3>
            <div className="mt-4">
              <ActionButton href="/contact#intake" primary>
                Get Quote in 60 Seconds
              </ActionButton>
            </div>
            <div className="mt-2 text-xs text-white/60">
              Fast response • Business-only • No obligation
            </div>
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

            <div className="mt-10 text-center">
              <h3 className="text-xl font-medium text-white">
                Get availability and pricing for your business location
              </h3>
              <div className="mt-4">
                <ActionButton href="/contact#intake" primary>
                  Get Quote in 60 Seconds
                </ActionButton>
              </div>
              <div className="mt-2 text-xs text-white/60">
                Fast response • Business-only • No obligation
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
              <SectionEyebrow>PROVEN IN ONTARIO</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Real connectivity work across Ontario businesses
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Active project work across office environments, redundancy design,
                and multi-site connectivity planning.
              </p>
            </div>
            <MiniMetaCard title="STATUS" value="Active • In Progress • Expanding" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 sm:mt-8 sm:gap-4">
            <ProofCard
              title="Office Connectivity Review — Mississauga"
              body="Address review, carrier comparison, and upgrade-path planning for a business environment requiring a clearer route to better day-to-day performance."
            />
            <ProofCard
              title="Backup Connectivity Design — Ontario"
              body="Separate-path secondary connectivity planning for environments where cleaner failover and reduced dependency on a single access path matter."
            />
            <ProofCard
              title="Multi-Site Planning — GTA"
              body="Standardized connectivity approach for organizations seeking more consistent sourcing, deployment, and site-by-site decision-making."
            />
          </div>

          <div className="mt-5 text-xs text-white/50">
            Client names, logos, and detailed case studies are published only with approval.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[26px] border border-white/10 bg-black/22 p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>HOW DELIVERY WORKS</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A structured path from review to live service
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink provides a clearer client-facing process from initial site review
                to carrier validation, onboarding coordination, and ongoing service oversight.
              </p>
            </div>
            <MiniMetaCard title="PROCESS" value="Review • Validate • Coordinate • Support" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 sm:mt-8 sm:gap-4">
            <StepCard
              step="1"
              title="Review the requirement"
              desc="We assess your address, operating profile, and the level of resilience the site actually needs."
            />
            <StepCard
              step="2"
              title="Validate service options"
              desc="Available carriers, infrastructure paths, and deployment practicality are reviewed against the location."
            />
            <StepCard
              step="3"
              title="Coordinate onboarding"
              desc="Ordering, installation readiness, and client-facing coordination are handled through a structured process."
            />
            <StepCard
              step="4"
              title="Support the live service"
              desc="Orbitlink remains the structured point of contact for service oversight and escalation guidance."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[26px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-5 sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>WHY BUSINESSES MOVE TO ORBITLINK</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A clearer alternative to traditional telecom buying
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Many Ontario businesses are not looking for more options. They are
                looking for a better process, clearer guidance, and cleaner execution.
              </p>
            </div>
            <MiniMetaCard title="BUYER SIGNAL" value="Confidence • Clarity • Control" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 sm:mt-8 sm:gap-4">
            <ProofCard
              title="Better coordination"
              body="Orbitlink manages review, sourcing, and onboarding instead of leaving businesses to navigate multiple provider handoffs alone."
            />
            <ProofCard
              title="Redundancy by design"
              body="Backup connectivity is planned with attention to path separation and operational fit, not added casually after the fact."
            />
            <ProofCard
              title="Clearer guidance"
              body="Recommendations are based on real site conditions and business requirements, not generic package-led selling."
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
          <div className="max-w-3xl">
            <SectionEyebrow>COMMERCIAL CLARITY</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Structured for real business requirements
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Pricing depends on building infrastructure, service class, and deployment requirements.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-6 text-white/72 sm:text-[15px]">
            <div>• Business fibre internet is typically scoped based on location and service profile.</div>
            <div>• Dedicated internet and higher-assurance connectivity are reviewed per project.</div>
            <div>• Backup connectivity is sized according to continuity requirements, not just speed.</div>
          </div>

          <div className="mt-5 text-xs text-white/50">
            Exact pricing is provided after serviceability and deployment review.
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
        <div className="rounded-[26px] border border-[#FACC15]/20 bg-[#FACC15]/[0.05] p-5 sm:rounded-[32px] sm:p-8 lg:p-10 text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-[34px]">
            Ready to see what’s available at your location?
          </h2>

          <p className="mt-3 text-white/70 max-w-3xl mx-auto">
            Tell us your address and requirements. We’ll review your site and provide the
            best next step based on real availability.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <ActionButton href="/contact#intake" primary>
              Get Availability & Pricing
            </ActionButton>

            <PhoneButton href={`tel:${BRAND_PHONE_E164}`}>
              Call Now
            </PhoneButton>
          </div>

          <div className="mt-3 text-xs text-white/60">
            Priority response for new Ontario business requests this week
          </div>
        </div>
      </section>

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}