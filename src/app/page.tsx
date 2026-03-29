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
const CANONICAL_URL = `${SITE_URL}/`;

const SITE_DESC =
  "Business fibre internet, dedicated internet access (DIA), managed Wi-Fi, voice, and backup connectivity for Ontario businesses. Serving Mississauga, Toronto, Brampton, Vaughan, and across Ontario.";

const OG_TITLE =
  "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink";

const OG_DESC =
  "Business fibre internet, dedicated internet access (DIA), managed Wi-Fi, voice, and backup connectivity for Ontario businesses. Serving Mississauga, Toronto, Brampton, Vaughan, and across Ontario.";

const TWITTER_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and backup connectivity for Ontario businesses.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: OG_TITLE,
  description: SITE_DESC,
  keywords: [
    "business fibre internet ontario",
    "dedicated internet access ontario",
    "business internet mississauga",
    "business internet toronto",
    "business internet brampton",
    "business internet vaughan",
    "managed wi-fi ontario",
    "managed network services ontario",
    "business voip ontario",
    "backup internet for business",
    "lte failover business internet",
    "commercial internet provider ontario",
    "business fibre mississauga",
    "dedicated internet mississauga",
    "business internet for offices ontario",
    "business internet for warehouses ontario",
    "business internet for clinics ontario",
    "business connectivity ontario",
    "business internet availability ontario",
    "enterprise internet ontario",
    "commercial connectivity ontario",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: CANONICAL_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business fibre internet and dedicated internet access for Ontario businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: TWITTER_DESC,
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

function MiniMetaCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/15 px-3 py-2.5">
      <div className="text-[10px] tracking-[0.18em] text-white/42">{title}</div>
      <div className="mt-1 text-[13px] leading-5 text-white/84">{value}</div>
    </div>
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
    <div className="h-full rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/30 hover:bg-white/[0.05] sm:p-6">
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

function TrustPill({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-white/70 sm:text-xs">
      {text}
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
      className="group block h-full rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/30 hover:bg-white/[0.05]"
    >
      <div className="text-[11px] tracking-[0.22em] text-white/50">
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

function FAQCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="h-full rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
      <h3 className="text-sm font-medium text-white/92">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-white/66">{answer}</p>
    </div>
  );
}

function SolutionCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/25 hover:bg-white/[0.06]">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/66">{desc}</p>
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/66">{body}</p>
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/66">{body}</p>
    </div>
  );
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: CANONICAL_URL,
    logo: `${SITE_URL}/icon.png`,
    image: OG_IMAGE_URL,
    telephone: "+18888672480",
    email: "concierge@orbitlink.ca",
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
    parentOrganization: {
      "@type": "Organization",
      name: LEGAL_NAME,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+18888672480",
        email: "sales@orbitlink.ca",
        availableLanguage: ["en"],
        areaServed: "CA-ON",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+18888672480",
        email: "concierge@orbitlink.ca",
        availableLanguage: ["en"],
        areaServed: "CA-ON",
      },
    ],
  };

  const telecomSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#telecom`,
    name: "Orbitlink Business Internet & Managed Network Services",
    provider: {
      "@id": `${SITE_URL}/#org`,
    },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed Wi-Fi",
      "Business VoIP",
      "Network Infrastructure Services",
      "LTE and 5G Backup Connectivity",
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario, Canada" },
      { "@type": "City", name: "Mississauga" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Brampton" },
      { "@type": "City", name: "Vaughan" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Business",
    },
    termsOfService: `${SITE_URL}/legal/terms`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: CANONICAL_URL,
    publisher: {
      "@id": `${SITE_URL}/#org`,
    },
    inLanguage: "en-CA",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
  };

  return (
    <main className="min-h-screen bg-[#07090D] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(telecomSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TopNav />
      <StickyStatusStrip />

      <section className="relative isolate min-h-[100dvh] overflow-hidden border-b border-white/10 lg:min-h-[92vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-business-ontario.jpg"
            alt="Ontario business team in a modern office environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[74%_center] sm:object-[68%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.28)_0%,rgba(4,7,12,0.52)_34%,rgba(4,7,12,0.84)_70%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.93)_0%,rgba(4,7,12,0.62)_34%,rgba(4,7,12,0.14)_66%,rgba(4,7,12,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(250,204,21,0.09),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.09),transparent_24%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:58px_58px]" />
        </div>

        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center justify-center px-5 pb-12 pt-28 sm:px-7 sm:pt-24 lg:min-h-[92vh] lg:px-10 lg:pb-16 lg:pt-20">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/78 backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business Fibre • Dedicated Internet • Managed Wi-Fi • Backup Connectivity
            </div>

            <h1 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1] tracking-tight text-white sm:text-[3rem] lg:text-[4.25rem] xl:text-[5rem]">
              Connectivity engineered
              <span className="block text-white/62">for real business operations</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/87 sm:text-[1.08rem]">
              Orbitlink helps Ontario businesses choose the right internet, Wi-Fi,
              voice, and backup connectivity for their location. We review building
              infrastructure, provider options, and operational requirements before
              recommending a clear path forward.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Address-qualified review",
                "Ontario business-only",
                "Structured commercial path",
                "Clear next step",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/72 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
              <div className="flex flex-col gap-2">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability for Your Location
                </Link>
                <div className="text-center text-xs text-white/55 sm:text-left">
                  Business-only review • No obligation • Clear response
                </div>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>

              <Link
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Review Trust Posture
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/48 sm:text-xs">
              <span>Operated by TIRAV Technologies Inc.</span>
              <span className="hidden sm:inline">•</span>
              <span>CRTC-registered provider</span>
              <span className="hidden sm:inline">•</span>
              <span>Ontario commercial review</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              START HERE
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Choose the path that fits the business
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Start with the real operating requirement. That usually makes the right
              connectivity path much clearer.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FitCard
              title="Offices & Clinics"
              body="Stable day-to-day connectivity, managed Wi-Fi, and a cleaner commercial buying path."
            />
            <FitCard
              title="Critical Operations"
              body="Dedicated internet, stronger uptime posture, and continuity planning for higher-dependency environments."
            />
            <FitCard
              title="Internal Network Problems"
              body="Coverage, segmentation, and LAN / Wi-Fi issues that affect user experience and operations."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/22 p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#FACC15]/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%)]" />
          </div>

          <div className="relative">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                BUSINESS INTERNET SOLUTIONS IN ONTARIO
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Connectivity designed for real business environments
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink supports Ontario businesses with service options matched
                to building infrastructure, operational needs, and continuity requirements.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              <SolutionCard
                title="Business fibre internet"
                desc="Business-grade fibre for offices, clinics, warehouses, and commercial sites."
              />
              <SolutionCard
                title="Dedicated internet access"
                desc="Higher-assurance internet for uptime-sensitive and performance-critical environments."
              />
              <SolutionCard
                title="Managed Wi-Fi and network support"
                desc="Improved internal coverage, device performance, and day-to-day wireless reliability."
              />
              <SolutionCard
                title="LTE / 5G backup connectivity"
                desc="Continuity planning and secondary connectivity when the primary link matters."
              />
              <SolutionCard
                title="Business VoIP and voice solutions"
                desc="Voice services aligned to business operations, support flow, and growth requirements."
              />
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm leading-6 text-white/82">
                Every solution is reviewed based on your address, building infrastructure,
                provider reach, and business requirements.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                WHY SERIOUS BUYERS REACH OUT
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Problems businesses run into with the wrong service model
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Many business locations rely on internet service that was never matched
                to actual workload, continuity risk, or long-term operational needs.
              </p>
            </div>
            <MiniMetaCard
              title="FOCUS"
              value="Performance • Reliability • Backup • Accountability"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Shared connections that slow down under peak demand",
              "No backup path when continuity matters",
              "Packages that do not match the real site requirement",
              "Limited visibility into upgrades, support, or constraints",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-6 text-white/82"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <BentoServices />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14">
        <div className="rounded-[32px] border border-white/10 bg-black/22 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                HOW IT WORKS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A clear path from enquiry to recommendation
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Submit your address, business requirements, and timeline. Orbitlink reviews the site,
                available service paths, and the most suitable next step.
              </p>
            </div>
            <MiniMetaCard title="PROCESS" value="Address-based and practical" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Submit your business address"
              desc="Share the service location, business environment, and what the connection needs to support."
            />
            <StepCard
              step="2"
              title="We review available options"
              desc="We assess infrastructure, provider reach, backup requirements, and whether a higher-assurance option is appropriate."
            />
            <StepCard
              step="3"
              title="Receive the right next step"
              desc="You receive a clear recommendation, pricing direction, or the most suitable route for the site."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
                WHY BUYERS CHOOSE ORBITLINK
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Structured for business fit, not generic package selling
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Orbitlink is built around commercial review, address-qualified direction,
                and clearer next-step guidance for Ontario organizations.
              </p>
            </div>
            <MiniMetaCard title="BUYER SIGNAL" value="Fit • Confidence • Action" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ProofCard
              title="Address-qualified review"
              body="Availability and service direction are reviewed based on the actual location, infrastructure, and operating requirement."
            />
            <ProofCard
              title="Cleaner commercial path"
              body="The process is designed to help serious buyers move from interest into a practical decision without unnecessary friction."
            />
            <ProofCard
              title="Disclosure-first posture"
              body="The buying experience is framed around clarity, fit, and realistic service expectations before commitment."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                COMMERCIAL REVIEW
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Reviewed directly by Orbitlink
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Every request is reviewed based on the business location, service fit,
                building context, and operating requirements. This is not a generic sales loop.
                It is a structured commercial review designed for serious buyers.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Operated by TIRAV Technologies Inc. • CRTC-registered telecommunications reseller •
                Ontario commercial review posture
              </p>
            </div>
            <MiniMetaCard title="OPERATED BY" value="TIRAV Technologies Inc." />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <TrustPill text="Operated by TIRAV Technologies Inc." />
            <TrustPill text="CRTC-registered provider" />
            <TrustPill text="Business-only review" />
            <TrustPill text="Availability reviewed by address" />
            <TrustPill text="Ontario business coverage" />
            <TrustPill text="Clear next-step guidance" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-white/10 bg-black/22 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                ONTARIO LOCATIONS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Explore location-based business internet pages
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is building location pages across Ontario to help businesses evaluate
                service options, local availability, and market fit.
              </p>
            </div>
            <MiniMetaCard title="LOCAL DISCOVERY" value="Location pages support local search intent" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CoverageCard city="Toronto" note="Business internet and commercial connectivity" href="/locations/toronto" />
            <CoverageCard city="Mississauga" note="Priority business market" href="/locations/mississauga" />
            <CoverageCard city="Vaughan" note="Industrial and office environments" href="/locations/vaughan" />
            <CoverageCard city="Brampton" note="Warehouse and logistics environments" href="/locations/brampton" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Questions businesses ask before submitting a request
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                These answers help buyers understand the process and improve search relevance.
              </p>
            </div>
            <MiniMetaCard title="SEO + CLARITY" value="Useful answers for buyers and search" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
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

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-7 sm:pb-20">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
                READY TO REVIEW YOUR OPTIONS?
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Move from browsing to a real service decision.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                We review your building, available providers, and infrastructure to recommend the most
                reliable and scalable option for your business.
              </p>
            </div>
            <MiniMetaCard title="NEXT STEP" value="Availability • Recommendation • Direction" />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:flex-wrap">
            <div className="flex flex-col gap-2">
              <Link
                href="/contact#intake"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability for Your Location
              </Link>
              <div className="text-xs text-white/55 sm:text-sm">
                Business-only review • No obligation • Clear response
              </div>
            </div>

            <Link
              href="/services"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Explore Services
            </Link>

            <Link
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Review Trust & Compliance
            </Link>
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}