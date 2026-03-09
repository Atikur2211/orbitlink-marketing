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
  "Business fibre internet, dedicated internet access, managed network infrastructure, and structured connectivity services for Ontario organizations.";

const OG_TITLE = "Orbitlink — Business Fibre & Network Infrastructure";
const OG_DESC =
  "Business connectivity for Ontario organizations: fibre internet, dedicated internet access, managed networks, and infrastructure-grade delivery.";
const TWITTER_DESC =
  "Business fibre, dedicated internet, managed networks, and infrastructure-grade delivery across Ontario.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Orbitlink — Business Fibre & Network Infrastructure",
  description: SITE_DESC,
  keywords: [
    "Business Fibre Internet",
    "Business Internet Ontario",
    "Enterprise Internet Mississauga",
    "Managed Network Infrastructure",
    "Dedicated Internet Access Ontario",
    "Business Fibre Mississauga",
    "Enterprise Connectivity Canada",
    "Telecom Services Ontario",
    "Business Network Infrastructure",
    "Ontario Business Connectivity",
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
        alt: "Orbitlink — Business Fibre & Network Infrastructure",
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

function HeroFibreLine() {
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

function HeroSignalCard({
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
      <div className="mt-2 text-sm font-medium text-white/90">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/65">{body}</div>
    </div>
  );
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

function BuyerStep({
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
        <div className="text-sm font-medium text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
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
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
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
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function StartingPointCard({
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
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
      <div className="mt-4 text-xs text-white/55">Open path →</div>
    </a>
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
        areaServed: "CA",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+18888672480",
        email: "concierge@orbitlink.ca",
        availableLanguage: ["en"],
        areaServed: "CA",
      },
    ],
  };

  const telecomSchema = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${SITE_URL}/#telecom`,
    name: "Orbitlink Business Fibre & Network Infrastructure",
    provider: {
      "@id": `${SITE_URL}/#org`,
    },
    serviceType: [
      "Business Internet",
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed Network Infrastructure",
      "Enterprise Connectivity",
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

      <section
        id="business-fibre-ontario"
        className="relative overflow-hidden border-b border-white/6"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.16]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-7 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business fibre • Dedicated internet • Managed network infrastructure
            </div>

            <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl sm:leading-[1.03] lg:max-w-5xl lg:text-6xl">
              Business connectivity,
              <span className="mt-2 block text-white/72">
                built with more clarity, more structure, and more trust.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-[15px] leading-6 text-white/70 sm:text-lg sm:leading-7">
              Orbitlink delivers business fibre internet, dedicated internet access, managed
              network infrastructure, voice, continuity, and operator-grade service coordination
              for organizations across Ontario. The experience is designed to feel clear,
              professional, and easier to trust from first contact onward.
            </p>

            <div className="mt-6 text-xs tracking-wide text-white/50 sm:text-sm">
              Ontario business connectivity • Structured onboarding • Commercially disciplined
              delivery
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="/contact#intake"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability
              </a>
              <a
                href="/services"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </a>
              <a
                href="/trust"
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-center text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
              >
                Trust & Compliance
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3 lg:gap-6">
            <HeroSignalCard
              eyebrow="SERVICE FIT"
              title="Built for business environments"
              body="Fibre, dedicated internet, managed networks, voice, continuity, and infrastructure support aligned to real operating needs."
            />
            <HeroSignalCard
              eyebrow="DELIVERY"
              title="Structured from the beginning"
              body="Clear qualification, cleaner onboarding, and scope-led delivery instead of vague promises and reactive process."
            />
            <HeroSignalCard
              eyebrow="TRUST"
              title="Designed for serious review"
              body="Measured public posture, evidence-friendly operations, and a cleaner business trust surface for buyers and reviewers."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill
              label="BEST FOR"
              value="Ontario business sites and multi-site environments"
            />
            <MetricPill
              label="OPERATING STYLE"
              value="Clear, structured, and commercially disciplined"
            />
            <MetricPill
              label="BUYER SIGNAL"
              value="More premium than a generic telecom experience"
            />
          </div>

          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.28em] text-white/55">WHO THIS IS FOR</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  A better fit for organizations that need more than generic internet
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Orbitlink is designed for businesses that want cleaner installs, better service
                  coordination, clearer escalation, and a more professional provider experience
                  from the start.
                </p>
              </div>

              <MetricPill label="BUYER TYPE" value="Operational and decision-ready" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <FitCard
                title="Professional offices"
                body="Good fit for firms that need stable internet, clean onboarding, and a business-ready support experience."
              />
              <FitCard
                title="Clinics and service businesses"
                body="Good fit where uptime, voice, guest Wi-Fi, and better coordination matter to daily operations."
              />
              <FitCard
                title="Warehouses and industrial sites"
                body="Good fit for connectivity, managed networking, continuity design, and multi-location operations."
              />
              <FitCard
                title="Growing multi-site teams"
                body="Good fit for businesses that need a provider with clearer process, stronger structure, and room to scale."
              />
            </div>
          </div>

          <div className="mx-auto mt-12 h-px max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <HeroFibreLine />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                WHY BUYERS STAY LONGER HERE
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A cleaner buying path than most telecom websites
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Most provider websites make buyers hunt for relevance. Orbitlink is built to do the
                opposite: clarify the service, explain fit, show next steps, and reduce friction
                before the first conversation even begins.
              </p>
            </div>

            <MetricPill label="MODE" value="Buyer-readable • Business-first" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <BuyerStep
              step="1"
              title="Choose the service path"
              desc="Start with business fibre, dedicated internet, managed network, voice, continuity, or infrastructure depending on the site need."
            />
            <BuyerStep
              step="2"
              title="Confirm fit and scope"
              desc="Match the request to the address, building context, timeline, and technical requirements that matter operationally."
            />
            <BuyerStep
              step="3"
              title="Move into structured intake"
              desc="Submit one clear request and receive a cleaner next step instead of a fragmented or generic sales response."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                MOST BUYERS START HERE
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Pick the path that matches the business need
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                The fastest way to buy through the site is to start with the operational priority,
                not the brand story. Choose the service that best matches what the site actually
                needs today.
              </p>
            </div>

            <MetricPill label="OUTCOME" value="Faster selection • Better fit" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StartingPointCard
              title="Need strong business internet"
              body="Start with Business Fibre for offices, service businesses, and general commercial sites."
              href="/services/business-fibre-internet"
            />
            <StartingPointCard
              title="Need critical-site reliability"
              body="Start with Dedicated Internet Access for more deterministic delivery posture."
              href="/services/dedicated-internet-access"
            />
            <StartingPointCard
              title="Need better Wi-Fi and LAN"
              body="Start with Managed LAN & Enterprise Wi-Fi for segmentation, coverage, and cleaner support."
              href="/services/managed-lan-wifi"
            />
            <StartingPointCard
              title="Need backup and continuity"
              body="Start with LTE / 5G Continuity for disruption planning and resilience."
              href="/services/lte-5g-continuity"
            />
            <StartingPointCard
              title="Need calling and front desk flow"
              body="Start with VoIP & Cloud Voice for business routing, porting, and call handling."
              href="/services/voip-cloud-voice"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">BUSINESS OUTCOMES</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                What Orbitlink is designed to improve for buyers
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                The site should not only look premium. It should help buyers understand how
                Orbitlink reduces operational friction, improves clarity, and creates a more
                professional path from inquiry to go-live.
              </p>
            </div>

            <MetricPill label="FIRST IMPRESSION" value="Clear, premium, and commercially credible" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Cleaner installs"
              body="Address-aware qualification and better service matching reduce surprises before activation."
            />
            <OutcomeCard
              title="Better escalation"
              body="The buying surface signals clearer ownership, more structured updates, and a better support posture."
            />
            <OutcomeCard
              title="Less provider friction"
              body="The site is built to reduce confusion around fit, scope, onboarding, and next step."
            />
            <OutcomeCard
              title="Stronger trust from day one"
              body="Trust, compliance, disclosure, and review posture are visible early, which increases buyer confidence."
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