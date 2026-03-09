// src/app/page.tsx
import type { Metadata } from "next";

import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import StatusBandClient from "@/components/StatusBandClient";
import BentoServices from "@/components/BentoServices";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc.";
const CANONICAL_URL = `${SITE_URL}/`;

const SITE_DESC =
  "Orbitlink provides business fibre internet, dedicated internet access, managed Wi-Fi, voice, and network infrastructure services for Ontario businesses.";

const OG_TITLE = "Orbitlink | Business Fibre Internet & Network Infrastructure";
const OG_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and network infrastructure services for Ontario businesses.";
const TWITTER_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and network infrastructure services across Ontario.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Orbitlink | Business Fibre Internet & Network Infrastructure",
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
        alt: "Orbitlink business fibre internet and network infrastructure",
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
    "@type": "TelecomService",
    "@id": `${SITE_URL}/#telecom`,
    name: "Orbitlink Business Fibre Internet & Network Infrastructure",
    provider: {
      "@id": `${SITE_URL}/#org`,
    },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed Wi-Fi",
      "Business VoIP",
      "Network Infrastructure Services",
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

      <TopNav />
      <StickyStatusStrip />
      <StatusBandClient />

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
              Business fibre internet • Dedicated internet • Managed network services
            </div>

            <h1 className="mt-6 text-[2.45rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl sm:leading-[1.03] lg:max-w-5xl lg:text-6xl">
              Business fibre internet and network infrastructure
              <span className="mt-2 block text-white/74">
                for Ontario organizations that need a better provider experience.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-[15px] leading-6 text-white/70 sm:text-lg sm:leading-7">
              Orbitlink helps businesses buy connectivity more clearly. From business fibre and
              dedicated internet access to managed Wi-Fi, voice, and continuity, the goal is
              simple: make service selection, onboarding, and next steps easier to understand.
            </p>

            <div className="mt-6 text-xs tracking-wide text-white/50 sm:text-sm">
              Ontario business internet • Check availability • Request pricing
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
              eyebrow="BUSINESS INTERNET"
              title="Services buyers actually look for"
              body="Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and continuity services for commercial environments."
            />
            <SignalCard
              eyebrow="CLEARER BUYING PATH"
              title="Less guessing, less back-and-forth"
              body="The site is built to help buyers understand service fit, next steps, and how to start a serious request."
            />
            <SignalCard
              eyebrow="TRUST"
              title="A more professional first impression"
              body="Clearer language, cleaner process, and a calmer presentation create more confidence from first visit onward."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="BEST FOR" value="Business sites and multi-location teams" />
            <StatCard label="SERVICES" value="Internet, Wi-Fi, voice, continuity" />
            <StatCard label="NEXT STEP" value="Check availability and request pricing" />
          </div>

          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.28em] text-white/55">WHO THIS IS FOR</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Built for businesses that want more than generic internet
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Orbitlink is a better fit for organizations that want clean installs, clearer
                  communication, business-ready support, and a more structured service experience.
                </p>
              </div>

              <StatCard label="BUYER TYPE" value="Decision-ready business teams" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <UseCaseCard
                title="Professional offices"
                body="Reliable business internet, cleaner onboarding, and a more polished support experience."
              />
              <UseCaseCard
                title="Clinics and service businesses"
                body="Connectivity, guest Wi-Fi, voice, and day-to-day reliability for customer-facing environments."
              />
              <UseCaseCard
                title="Warehouses and industrial sites"
                body="Internet, managed network support, continuity planning, and multi-site service coordination."
              />
              <UseCaseCard
                title="Growing multi-site businesses"
                body="A provider experience designed to feel more organized, more responsive, and easier to scale."
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
                Choose the path that matches the business need
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                The fastest way to buy through Orbitlink is to start with the site need. Pick the
                service that best matches what the business needs today.
              </p>
            </div>

            <StatCard label="OUTCOME" value="Faster selection and better fit" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <PathCard
              title="Need business fibre internet"
              body="Best for offices, commercial spaces, and general business connectivity."
              href="/services/business-fibre-internet"
            />
            <PathCard
              title="Need dedicated internet access"
              body="Best for critical sites that need stronger performance and delivery expectations."
              href="/services/dedicated-internet-access"
            />
            <PathCard
              title="Need managed Wi-Fi and LAN"
              body="Best for coverage, segmentation, internal network support, and cleaner operations."
              href="/services/managed-lan-wifi"
            />
            <PathCard
              title="Need backup connectivity"
              body="Best for LTE or 5G continuity planning and resilience during outages."
              href="/services/lte-5g-continuity"
            />
            <PathCard
              title="Need business voice"
              body="Best for porting, front-desk routing, business calling, and cloud voice."
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
                A simpler buying path than most telecom websites
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is built to help buyers move from interest to next step without the usual
                confusion. The goal is to make service fit, address review, and intake easier to
                understand.
              </p>
            </div>

            <StatCard label="MODE" value="Human-readable and business-first" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Choose a service"
              desc="Start with business fibre, dedicated internet, managed Wi-Fi, voice, or continuity."
            />
            <StepCard
              step="2"
              title="Share your address and needs"
              desc="Tell Orbitlink where the site is located and what matters for the business."
            />
            <StepCard
              step="3"
              title="Receive a clear next step"
              desc="Get a cleaner response path for availability, pricing, fit, or follow-up."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">WHY IT CONVERTS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Built to reduce friction for real buyers
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                A premium homepage should do more than look good. It should make the service easier
                to understand, the provider easier to trust, and the next step easier to take.
              </p>
            </div>

            <StatCard label="FIRST IMPRESSION" value="Clear, premium, and credible" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Clearer service selection"
              body="Visitors can quickly understand whether they need fibre, DIA, managed Wi-Fi, voice, or continuity."
            />
            <OutcomeCard
              title="Stronger trust"
              body="Cleaner language and cleaner structure create a more credible business impression."
            />
            <OutcomeCard
              title="Better lead quality"
              body="People arrive at the intake form with a better understanding of what they actually need."
            />
            <OutcomeCard
              title="Less wasted time"
              body="A clearer homepage reduces confusion, weak clicks, and vague contact requests."
            />
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