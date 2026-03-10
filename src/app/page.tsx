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
  "Orbitlink provides business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and continuity services for Ontario businesses. Check availability and request pricing for your location.";

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

            <h1 className="mt-6 max-w-4xl text-[2.15rem] font-semibold leading-[1.04] tracking-tight sm:text-[3.35rem] sm:leading-[1.03] lg:text-[4rem]">
              Business fibre internet,
              <span className="block">dedicated internet, and managed network services</span>
              <span className="mt-2 block text-white/74">
                for Ontario businesses that need reliable connectivity, clearer quoting, and a
                provider that feels easier to work with.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-[15px] leading-6 text-white/70 sm:text-lg sm:leading-7">
              Orbitlink helps Ontario businesses buy connectivity with less friction. From business
              fibre and dedicated internet access to managed Wi-Fi, voice, and continuity, the path
              starts with your address, your requirements, and the right next step for the site.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-white/55 sm:text-xs">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Ontario business-focused
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Address-based availability review
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Commercial quoting path
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Operated by TIRAV Technologies Inc.
              </span>
            </div>

            <div className="mt-6 text-xs tracking-wide text-white/50 sm:text-sm">
              Offices • Clinics • Warehouses • Commercial spaces • Multi-site businesses
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
              title="Internet, DIA, Wi-Fi, voice, and continuity"
              body="Commercial connectivity and network services for professional offices, customer-facing sites, industrial environments, and growing multi-location teams."
            />
            <SignalCard
              eyebrow="COMMERCIAL PATH"
              title="Built around the site, not generic promo traffic"
              body="Requests start with the building address, service type, and business need so qualification and next steps are clearer from the beginning."
            />
            <SignalCard
              eyebrow="BUYER EXPERIENCE"
              title="A more accountable provider experience"
              body="Orbitlink is designed to feel clearer, more responsive, and easier to work with than the usual business telecom buying process."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="BEST FOR" value="Business sites and multi-location teams" />
            <StatCard label="SERVICES" value="Internet, Wi-Fi, voice, continuity" />
            <StatCard label="NEXT STEP" value="Submit address and service requirements" />
          </div>

          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.28em] text-white/55">WHO THIS IS FOR</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Built for businesses that need reliable connectivity and a cleaner buying process
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Orbitlink is a strong fit for organizations that want dependable connectivity,
                  more transparent commercial conversations, and a more organized path from enquiry
                  to installation.
                </p>
              </div>

              <StatCard label="BUYER TYPE" value="Decision-ready business teams" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <UseCaseCard
                title="Professional offices"
                body="Business internet, Wi-Fi, and voice for day-to-day operations with clearer quoting and cleaner deployment planning."
              />
              <UseCaseCard
                title="Clinics and service businesses"
                body="Reliable connectivity, guest Wi-Fi, and business voice for teams that depend on uptime and smoother customer-facing operations."
              />
              <UseCaseCard
                title="Warehouses and industrial sites"
                body="Internet, managed network support, and continuity options for practical operational environments."
              />
              <UseCaseCard
                title="Growing multi-site businesses"
                body="A commercial path that is easier to manage across multiple locations, timelines, and site requirements."
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
                Choose the service that matches the business need
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Start with the service requirement, then request availability and pricing for the
                location. This helps Orbitlink respond with a more accurate next step from the
                beginning.
              </p>
            </div>

            <StatCard label="OUTCOME" value="Faster selection and cleaner qualification" />
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
                A simpler path from enquiry to next step
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is designed to help serious business buyers move quickly: choose the
                service, share the address and requirements, and receive a clearer response based
                on site fit and commercial context.
              </p>
            </div>

            <StatCard label="MODE" value="Business-first and human-readable" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Choose a service"
              desc="Start with business fibre, dedicated internet, managed Wi-Fi, voice, or continuity."
            />
            <StepCard
              step="2"
              title="Share your address and requirements"
              desc="Tell Orbitlink where the site is, what the business needs, and what matters operationally."
            />
            <StepCard
              step="3"
              title="Receive the right next step"
              desc="Get availability direction, pricing guidance, or a recommended follow-up based on the request."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                WHY BUSINESSES CHOOSE ORBITLINK
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Built to reduce friction for serious buyers
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is designed to make the commercial process easier to understand and
                easier to move forward with, without the usual confusion of generic telecom
                websites.
              </p>
            </div>

            <StatCard label="FIRST IMPRESSION" value="Clear, premium, and credible" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Clearer service selection"
              body="Visitors can quickly identify whether they need business fibre, dedicated internet, managed Wi-Fi, voice, or continuity."
            />
            <OutcomeCard
              title="Better-fit quoting"
              body="Requests begin with the site address and business requirement so the response is more commercially useful."
            />
            <OutcomeCard
              title="Stronger buyer confidence"
              body="Clear language, visible structure, and a defined business focus create a more credible first impression."
            />
            <OutcomeCard
              title="Less wasted time"
              body="The homepage helps filter weak clicks and move real opportunities toward a better next step."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">TRUST SIGNALS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Trust starts with clarity, structure, and visible business identity
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink presents clear service categories, a commercial intake path, address-based
                review, and a visible operating company through TIRAV Technologies Inc.
              </p>
            </div>

            <StatCard label="OPERATED BY" value="TIRAV Technologies Inc." />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Business-only positioning"
              body="Designed for commercial buyers rather than consumer promo traffic or mass-market bundling."
            />
            <OutcomeCard
              title="Address-qualified review"
              body="Availability starts with the actual site, not generic citywide assumptions."
            />
            <OutcomeCard
              title="Defined intake path"
              body="Buyers are guided toward a practical next step instead of vague contact language."
            />
            <OutcomeCard
              title="Clear legal identity"
              body="A visible operating company helps increase confidence from the first visit."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
                WHAT BUYERS USUALLY WANT TO KNOW
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Clear answers before the sales conversation starts
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Most business buyers want to know whether the building can be serviced, whether the
                service is the right fit, and what happens after they enquire. The homepage is
                designed to answer those questions early.
              </p>
            </div>

            <StatCard label="BUYER GOAL" value="Availability • Fit • Pricing" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OutcomeCard
              title="Can you service my building?"
              body="Availability is reviewed by building and address, not assumed across an entire city."
            />
            <OutcomeCard
              title="Is this the right service fit?"
              body="The site helps buyers choose between business fibre, DIA, managed Wi-Fi, voice, and continuity."
            />
            <OutcomeCard
              title="What happens after I enquire?"
              body="Qualified requests move into a clear review path based on address, timeline, and requirements."
            />
            <OutcomeCard
              title="Who am I dealing with?"
              body="Orbitlink shows a visible business identity and a more structured commercial posture from the start."
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