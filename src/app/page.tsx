// src/app/page.tsx
import type { Metadata } from "next";

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
  "Orbitlink helps Ontario businesses source business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and backup connectivity based on building fit, location, and business requirements. Check availability and request pricing.";

const OG_TITLE =
  "Business Fibre Internet, Dedicated Internet & Managed Network Services | Orbitlink";
const OG_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and continuity services for Ontario businesses.";
const TWITTER_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and continuity services for Ontario offices, clinics, warehouses, and multi-site businesses.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title:
    "Business Fibre Internet, Dedicated Internet & Managed Network Services | Orbitlink",
  description: SITE_DESC,
  keywords: [
    "Business Fibre Internet Ontario",
    "Dedicated Internet Access Ontario",
    "Business Internet Mississauga",
    "Managed Wi-Fi Ontario",
    "Managed Network Services Ontario",
    "Business VoIP Ontario",
    "Business Fibre Mississauga",
    "Enterprise Internet Ontario",
    "Ontario Business Connectivity",
    "Network Infrastructure Services Ontario",
    "Commercial Internet Provider Ontario",
    "Business Internet Toronto",
    "LTE Failover Business Internet",
    "Business Wi-Fi Solutions Ontario",
    "Dedicated Internet Mississauga",
    "Ontario Business Fibre Provider",
    "Commercial Connectivity Ontario",
    "Business Internet Serviceability Ontario",
    "Managed Business Network Ontario",
    "Business Fibre for Offices Ontario",
    "Business Internet for Warehouses Ontario",
    "Business Internet for Clinics Ontario",
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
        alt: "Orbitlink business fibre internet, dedicated internet, and managed network services",
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

function HeroLine() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 hidden lg:block">
      <div className="relative mx-auto h-24 max-w-6xl overflow-hidden">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
        <div className="absolute left-[8%] top-1/2 h-[3px] w-40 -translate-y-1/2 rounded-full bg-cyan-300/25 blur-md animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute left-[28%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-200/70 shadow-[0_0_24px_rgba(56,253,254,0.45)]" />
        <div className="absolute left-[58%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-200/70 shadow-[0_0_24px_rgba(16,185,129,0.40)]" />
        <div className="absolute left-[82%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-yellow-200/70 shadow-[0_0_24px_rgba(250,204,21,0.40)]" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function SignalCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{eyebrow}</div>
      <div className="mt-2 text-sm font-medium text-white/92">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/66">{body}</div>
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

function UseCaseCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/66">{body}</p>
    </div>
  );
}

function PathCard({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/66">{body}</p>
      <div className="mt-4 text-xs text-white/55">Open path →</div>
    </a>
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
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

function OutcomeCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/66">{body}</p>
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <h3 className="text-sm font-medium text-white/92">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-white/66">{answer}</p>
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
    name: "Orbitlink Business Fibre Internet & Managed Network Services",
    provider: {
      "@id": `${SITE_URL}/#org`,
    },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed Wi-Fi",
      "Business VoIP",
      "Network Infrastructure Services",
      "LTE and 5G Continuity",
    ],
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Ontario, Canada",
      },
      {
        "@type": "City",
        name: "Mississauga",
      },
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
          text: "Submit your business address and service requirements through the Orbitlink contact intake. Availability is reviewed based on location, building fit, and service type.",
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
        name: "What types of businesses is Orbitlink designed for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orbitlink is designed for commercial buyers including offices, clinics, warehouses, commercial units, and multi-site business environments across Ontario.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after I submit a request?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orbitlink reviews the address, service type, and business requirement, then responds with the next commercial step such as availability direction, pricing guidance, or qualification follow-up.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
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

      <section className="relative overflow-hidden border-b border-white/6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.16]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-7 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/72 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business fibre • Dedicated internet • Managed Wi-Fi • Business voice
            </div>

            <h1 className="mt-6 max-w-4xl text-[2.15rem] font-semibold leading-[1.04] tracking-tight sm:text-[3.35rem] sm:leading-[1.03] lg:text-[4rem]">
              Business fibre internet
              <span className="block">for Ontario businesses</span>
              <span className="mt-2 block text-white/74">
                Check availability, compare the right service options, and move toward install with less friction.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-[15px] leading-6 text-white/70 sm:text-lg sm:leading-7">
              Orbitlink helps Ontario businesses source business fibre, dedicated internet,
              managed Wi-Fi, voice, and backup connectivity based on location, building fit,
              and operational need.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-white/55 sm:text-xs">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Business-only service intake
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Ontario commercial coverage
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Operated by TIRAV Technologies Inc.
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Availability reviewed by address
              </span>
            </div>

            <div className="mt-6 text-xs tracking-wide text-white/50 sm:text-sm">
              Offices • Clinics • Warehouses • Commercial units • Multi-site business environments
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="/contact#intake"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability & Request Pricing
              </a>
              <a
                href="/services"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </a>
              <a
                href="/locations"
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-center text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
              >
                View Locations
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3 lg:gap-6">
            <SignalCard
              eyebrow="SERVICES"
              title="Choose the right connectivity path"
              body="Business fibre, dedicated internet, managed Wi-Fi, voice, and continuity options for commercial sites across Ontario."
            />
            <SignalCard
              eyebrow="SITE FIT"
              title="Reviewed by building, address, and requirement"
              body="Availability depends on location, infrastructure, service type, and timeline—not generic website assumptions."
            />
            <SignalCard
              eyebrow="NEXT STEP"
              title="Get a practical commercial response"
              body="Submit your address and requirements to receive the right next step for pricing, qualification, or deployment planning."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="FOCUS" value="Commercial internet and managed network services" />
            <StatCard label="SERVICE TYPES" value="Fibre, DIA, Wi-Fi, voice, continuity" />
            <StatCard label="BUYER ACTION" value="Submit address and request pricing" />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.28em] text-white/55">COMMERCIAL TRUST SIGNALS</div>
                <p className="mt-2 text-sm leading-6 text-white/66">
                  Orbitlink is structured for commercial enquiries, location-based service review,
                  and a more direct path to pricing and qualification.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:min-w-[520px]">
                <TrustPill text="Business-only contact path" />
                <TrustPill text="Ontario-focused commercial service" />
                <TrustPill text="Clear legal operating entity" />
                <TrustPill text="Address-first qualification approach" />
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.28em] text-white/55">WHO THIS IS FOR</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Built for businesses that need reliable connectivity and clearer buying decisions
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Orbitlink is designed for commercial buyers that need better internet options,
                  more direct communication, and service guidance based on the realities of the site.
                </p>
              </div>

              <StatCard label="BUYER TYPE" value="Commercial sites and business decision-makers" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <UseCaseCard
                title="Professional offices"
                body="Business internet, managed Wi-Fi, and voice for daily operations, staff connectivity, and client-facing environments."
              />
              <UseCaseCard
                title="Clinics and service businesses"
                body="Reliable connectivity for appointment systems, front-desk operations, staff workflows, and guest access."
              />
              <UseCaseCard
                title="Warehouses and industrial sites"
                body="Practical connectivity for inventory systems, handheld devices, operations teams, and industrial business locations."
              />
              <UseCaseCard
                title="Multi-site businesses"
                body="Commercial connectivity planning for organizations managing multiple offices, branches, or operating sites."
              />
            </div>
          </div>

          <div className="mx-auto mt-12 h-px max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <HeroLine />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">START HERE</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Start with the service you need
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Start with the service you need, submit your address, and receive the most relevant
                next step based on site fit, availability, and business requirements.
              </p>
            </div>

            <StatCard label="OUTCOME" value="Faster qualification and better-fit quoting" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <PathCard
              title="Need business fibre internet"
              body="For offices, commercial units, and general business connectivity."
              href="/services/business-fibre-internet"
            />
            <PathCard
              title="Need dedicated internet access"
              body="For critical sites that need stronger performance and service expectations."
              href="/services/dedicated-internet-access"
            />
            <PathCard
              title="Need managed Wi-Fi and LAN"
              body="For internal coverage, segmentation, guest access, and cleaner network operations."
              href="/services/managed-lan-wifi"
            />
            <PathCard
              title="Need backup connectivity"
              body="For LTE or 5G continuity planning when the site needs resilience."
              href="/services/lte-5g-continuity"
            />
            <PathCard
              title="Need business voice"
              body="For number porting, cloud calling, routing, and front-desk communications."
              href="/services/voip-cloud-voice"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">HOW IT WORKS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A simple path from enquiry to quote
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Submit your service address, business requirement, and timeline. Orbitlink reviews
                the request and responds with the next commercial step.
              </p>
            </div>

            <StatCard label="PROCESS" value="Commercial, address-based, and practical" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Choose your service"
              desc="Select the service that best matches your business need—fibre, dedicated internet, managed Wi-Fi, voice, or continuity."
            />
            <StepCard
              step="2"
              title="Submit your address"
              desc="Share the service address, expected usage, and any timing requirements for the site."
            />
            <StepCard
              step="3"
              title="Receive your next step"
              desc="Receive availability direction, service-fit guidance, or a recommended path toward pricing and install."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">AFTER YOU SUBMIT</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                What to expect next
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Once your request is submitted, Orbitlink reviews the site and returns the next
                practical commercial step.
              </p>
            </div>

            <StatCard label="EXPECTATION" value="Address review, response, and qualification" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <OutcomeCard
              title="Address review"
              body="We review the building, service type, and timing details provided with the enquiry."
            />
            <OutcomeCard
              title="Commercial response"
              body="You receive availability direction, pricing guidance, or a recommended next step based on fit."
            />
            <OutcomeCard
              title="Qualified follow-up"
              body="If the opportunity is a fit, the enquiry can move into pricing, commercial review, or deployment planning."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                COMMON BUYING TRIGGERS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Businesses usually come to Orbitlink when they need one of these outcomes
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Most enquiries start with a site change, service issue, growth requirement, or a
                need for a better commercial option.
              </p>
            </div>

            <StatCard label="WHY BUYERS REACH OUT" value="Urgency, fit, reliability, or change" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="The current provider is no longer a good fit"
              body="Pricing, speed, responsiveness, or commercial support no longer matches the business need."
            />
            <OutcomeCard
              title="A new site needs internet planning"
              body="A new office, clinic, warehouse, or commercial unit needs the right service path before move-in or activation."
            />
            <OutcomeCard
              title="The business needs stronger reliability"
              body="The site now requires dedicated internet, better Wi-Fi, backup connectivity, or more stable business performance."
            />
            <OutcomeCard
              title="The buyer wants a clearer commercial process"
              body="The business wants less confusion, faster qualification, and more direct communication around next steps."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">COMPANY CLARITY</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A visible business identity behind the service
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is operated by TIRAV Technologies Inc. and is positioned specifically for
                commercial connectivity, managed networks, and site-qualified service enquiries in Ontario.
              </p>
            </div>

            <StatCard label="OPERATED BY" value="TIRAV Technologies Inc." />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Operated by TIRAV Technologies Inc."
              body="A clear legal operating entity helps buyers understand who they are engaging with."
            />
            <OutcomeCard
              title="Built for commercial enquiries"
              body="The Orbitlink intake path is designed for businesses, not residential promotion traffic."
            />
            <OutcomeCard
              title="Service requests reviewed by site"
              body="Availability, fit, and next steps are reviewed based on the building, location, and requirement."
            />
            <OutcomeCard
              title="Structured commercial contact path"
              body="Buyers can move from enquiry to pricing direction through a cleaner and more professional process."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Questions buyers commonly ask before submitting
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                These answers help clarify how Orbitlink handles business connectivity enquiries and service qualification.
              </p>
            </div>

            <StatCard label="SEO + CLARITY" value="Useful answers for buyers and search" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FAQCard
              question="How do I check if Orbitlink can serve my business location?"
              answer="Submit your business address and service requirements through the Orbitlink contact intake. Availability is reviewed based on location, building fit, and service type."
            />
            <FAQCard
              question="Does Orbitlink offer business fibre and dedicated internet access?"
              answer="Yes. Orbitlink supports business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and backup connectivity for Ontario businesses."
            />
            <FAQCard
              question="What types of businesses is Orbitlink designed for?"
              answer="Orbitlink is designed for commercial buyers including offices, clinics, warehouses, commercial units, and multi-site business environments across Ontario."
            />
            <FAQCard
              question="What happens after I submit a request?"
              answer="Orbitlink reviews the address, service type, and business requirement, then responds with the next commercial step such as availability direction, pricing guidance, or qualification follow-up."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
                READY TO CHECK AVAILABILITY?
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Ready to check availability?
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Submit your service address and business requirements to receive the right next step
                for availability, fit, and pricing direction.
              </p>
            </div>

            <StatCard label="NEXT STEP" value="Availability • Fit • Pricing" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Check serviceability"
              body="Find out whether the building and address align with the service path you need."
            />
            <OutcomeCard
              title="Confirm the right service"
              body="Identify whether fibre, dedicated internet, Wi-Fi, voice, or continuity is the better fit."
            />
            <OutcomeCard
              title="Receive pricing direction"
              body="Get a more useful commercial response based on your location and requirement."
            />
            <OutcomeCard
              title="Move toward the next step"
              body="Qualified opportunities can move forward into quoting, commercial review, or deployment planning."
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability & Request Pricing
            </a>
            <a
              href="/contact"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Contact Orbitlink
            </a>
          </div>

          <div className="mt-5 text-xs text-white/55 sm:text-sm">
            Best results come from submitting the exact service address, your business need, and any timing requirement.
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <BentoServices />
      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}