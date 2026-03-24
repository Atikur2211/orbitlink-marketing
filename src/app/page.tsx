import type { Metadata } from "next";
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
  "Business fibre internet, dedicated internet access, and managed connectivity solutions for Ontario businesses. Availability reviewed by address and infrastructure fit.";

const OG_TITLE =
  "Business Fibre & Dedicated Internet for Ontario Businesses | Orbitlink";

const OG_DESC =
  "Business fibre internet, dedicated internet access, and managed connectivity solutions for Ontario businesses. Availability reviewed by address and infrastructure fit.";

const TWITTER_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and continuity solutions for Ontario business environments.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: OG_TITLE,
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
        alt: "Orbitlink business fibre and dedicated internet for Ontario businesses",
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

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
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
    <div className="h-full rounded-[24px] border border-white/10 bg-black/20 p-5">
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
      className="block h-full rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="text-[11px] tracking-[0.22em] text-white/50">
        {city.toUpperCase()}
      </div>
      <div className="mt-2 text-sm font-medium text-white/90">{note}</div>
      <div className="mt-4 text-xs text-white/55">Open location →</div>
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
    <div className="h-full rounded-[24px] border border-white/10 bg-black/20 p-5">
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
          text: "Submit your business address and service requirements through the Orbitlink contact intake. Availability is reviewed based on address, building fit, and service type.",
        },
      },
      {
        "@type": "Question",
        name: "Does Orbitlink offer business fibre and dedicated internet access?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Orbitlink supports business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and continuity solutions for Ontario businesses.",
        },
      },
      {
        "@type": "Question",
        name: "What types of businesses is Orbitlink designed for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orbitlink is designed for offices, clinics, warehouses, commercial units, and multi-site business environments across Ontario.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after I submit a request?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orbitlink reviews the address, service type, infrastructure fit, and business requirement, then responds with the next practical commercial step.",
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

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#05070B]" />
          <div className="absolute -left-28 top-[-120px] h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-[-100px] top-[8%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-[-150px] left-1/2 h-[24rem] w-[64rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:58px_58px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_34%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.28)_0%,rgba(5,7,11,0.54)_38%,rgba(5,7,11,0.86)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-7 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="min-w-0 lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] text-white/72 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                Fibre • Dedicated internet • Managed network • Business voice
              </div>

              <h1 className="mt-6 text-[1.85rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-[2.9rem] lg:text-[3.6rem] xl:text-[4rem]">
                <span className="block">Business Fibre & Network Infrastructure</span>
                <span className="block text-white/74">
                  Engineered for Reliability. Delivered with Accountability.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-[1.08rem]">
                Fibre internet, dedicated access, and managed connectivity designed
                based on your building, operational requirements, and service risk.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66 sm:text-[1rem]">
                We evaluate availability, validate service paths, and define the
                correct commercial approach before any recommendation is made.
              </p>

              <div className="mt-5 text-xs tracking-wide text-white/52 sm:text-sm">
                Built for offices, clinics, warehouses, and multi-site environments
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Address-based availability validation",
                  "Fibre vs dedicated service path analysis",
                  "Risk visibility (backup, limitations, fit)",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/70 sm:text-xs"
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
                    Check Availability & Service Fit
                  </Link>
                  <div className="text-center text-xs text-white/50 sm:text-left">
                    Business-only review • No obligation • Structured response
                  </div>
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Explore Services
                </Link>

                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Compare Options
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] tracking-[0.24em] text-white/50">
                        CONNECTIVITY REVIEW
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        Structured connectivity review for your business
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.10] px-3 py-1 text-[11px] text-emerald-200">
                      ACTIVE
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <StatCard label="STEP 1" value="Validate address" />
                    <StatCard label="STEP 2" value="Review service fit" />
                    <StatCard label="STEP 3" value="Define next step" />
                    <StatCard label="FOR" value="Ontario businesses" />
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/10 bg-black/25 p-5">
                    <div className="text-[11px] tracking-[0.22em] text-white/50">
                      WHAT WE REVIEW
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                        Building-level fibre availability
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                        Dedicated access versus shared business fibre
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                        Continuity requirements and backup paths
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                        Managed Wi-Fi, voice, and network fit
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-xs leading-5 text-white/52">
                    Every location is evaluated based on infrastructure, carrier
                    reach, and service compatibility.
                  </div>

                  <div className="mt-4 text-[11px] text-white/45">
                    No generic quotes • No assumptions • Clear next step
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="text-[11px] tracking-[0.28em] text-white/50">
                    NETWORK AVAILABILITY
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-[30px]">
                    Availability starts with the site, not a generic claim
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Availability is determined by building infrastructure, carrier
                    presence, and service compatibility — not generalized coverage claims.
                  </p>
                </div>

                <StatCard
                  label="QUALIFICATION"
                  value="Address • Building • Service fit"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[11px] tracking-[0.22em] text-white/50">
                          COMMERCIAL FOOTPRINT SIGNAL
                        </div>
                        <div className="text-[11px] text-white/45">ONTARIO</div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <StatCard label="TORONTO" value="Commercial review" />
                        <StatCard label="MISSISSAUGA" value="Active market" />
                        <StatCard label="VAUGHAN" value="Industrial fit" />
                        <StatCard label="BRAMPTON" value="Logistics fit" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 gap-4">
                    <StatCard label="AVAILABILITY" value="Reviewed by building" />
                    <StatCard
                      label="SERVICE MATCHING"
                      value="Right service before wrong quote"
                    />
                    <StatCard
                      label="BUYER OUTCOME"
                      value="Faster commercial next step"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Browse Ontario Locations
                </Link>
                <Link
                  href="/locations/toronto"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                >
                  Toronto
                </Link>
                <Link
                  href="/locations/mississauga"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                >
                  Mississauga
                </Link>
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability & Service Fit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                CONNECTIVITY REALITIES
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Common limitations in business connectivity environments
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Many business environments operate on connectivity that was never
                aligned to workload demand, redundancy requirements, or operational risk.
              </p>
            </div>

            <StatCard
              label="FOCUS"
              value="Performance • Continuity • Fit • Accountability"
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Shared connections that degrade under peak demand",
              "No secondary path when continuity matters",
              "Commercial terms that do not match the actual site requirement",
              "Limited visibility into upgrade paths, support, or constraints",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/82"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-white/64 sm:text-[15px]">
            Connectivity should be matched to the environment, not chosen from a
            generic package.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability & Service Fit
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <BentoServices />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                HOW IT WORKS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A structured path from enquiry to next step
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Submit your address, business requirement, and timeline. We review
                the site, service fit, and commercial path, then respond with the
                correct next step.
              </p>
            </div>

            <StatCard
              label="PROCESS"
              value="Commercial, address-based, and practical"
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Submit your business address"
              desc="Share the service location, business environment, and what the connection needs to support."
            />
            <StepCard
              step="2"
              title="We review service fit"
              desc="We assess infrastructure, carrier paths, continuity requirements, and whether a higher-assurance option is appropriate."
            />
            <StepCard
              step="3"
              title="Receive the next practical step"
              desc="You receive qualification guidance, pricing direction, or the most suitable commercial route for the site."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                TRUST & BUYER CLARITY
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Built for buyers who need clarity before commitment
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink operates with a disclosure-first approach. Service
                qualification, availability constraints, and commercial structure are
                clarified before commitment.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                Operated by TIRAV Technologies Inc. • CRTC-registered
                telecommunications reseller • BITS licence active (2026)
              </p>
            </div>

            <StatCard label="OPERATED BY" value="TIRAV Technologies Inc." />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <TrustPill text="Operated by TIRAV Technologies Inc." />
            <TrustPill text="Disclosure-first qualification" />
            <TrustPill text="Ontario commercial coverage" />
            <TrustPill text="Availability reviewed by address" />
            <TrustPill text="Structured commercial path" />
            <TrustPill text="Clear next-step guidance" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              label="BUYER TYPE"
              value="Offices, clinics, warehouses, multi-site businesses"
            />
            <StatCard
              label="REVIEW METHOD"
              value="Address • Building • Service fit"
            />
            <StatCard
              label="OUTCOME"
              value="Cleaner qualification and faster response"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                ONTARIO LOCATIONS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Explore location-based business connectivity pages
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is building location pages across Ontario to help buyers
                evaluate service fit, commercial context, and local availability signals.
              </p>
            </div>

            <StatCard
              label="LOCAL DISCOVERY"
              value="Location pages support local search intent"
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CoverageCard
              city="Toronto"
              note="Business internet and commercial review"
              href="/locations/toronto"
            />
            <CoverageCard
              city="Mississauga"
              note="Priority commercial market"
              href="/locations/mississauga"
            />
            <CoverageCard
              city="Vaughan"
              note="Industrial and business-site fit"
              href="/locations/vaughan"
            />
            <CoverageCard
              city="Brampton"
              note="Warehousing and logistics fit"
              href="/locations/brampton"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/locations"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Browse All Locations
            </Link>
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability & Service Fit
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              REAL-WORLD CONTEXT
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Connectivity should reflect actual operational demand
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              A business performing large-scale device deployment experienced
              throughput limitations on standard business internet. After
              evaluating infrastructure and service paths, a higher-capacity
              solution aligned to workload requirements was recommended.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Questions buyers commonly ask before submitting
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                These answers help buyers understand the process and support
                service relevance for search.
              </p>
            </div>

            <StatCard
              label="SEO + CLARITY"
              value="Useful answers for buyers and search"
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FAQCard
              question="How do I check if Orbitlink can serve my business location?"
              answer="Submit your business address and service requirements through the Orbitlink contact intake. Availability is reviewed based on address, building fit, and service type."
            />
            <FAQCard
              question="Does Orbitlink offer business fibre and dedicated internet access?"
              answer="Yes. Orbitlink supports business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and continuity solutions for Ontario businesses."
            />
            <FAQCard
              question="What types of businesses is Orbitlink designed for?"
              answer="Orbitlink is designed for offices, clinics, warehouses, commercial units, and multi-site business environments across Ontario."
            />
            <FAQCard
              question="What happens after I submit a request?"
              answer="Orbitlink reviews the address, service type, infrastructure fit, and business requirement, then responds with the next practical commercial step."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
                READY TO REVIEW YOUR OPTIONS?
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Move forward with a clear understanding of your connectivity options.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                We review your building, validate service paths, and provide the
                most appropriate next step for fit, availability, and commercial direction.
              </p>
            </div>

            <StatCard label="NEXT STEP" value="Availability • Fit • Direction" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="CHECK" value="Serviceability by building and address" />
            <StatCard label="CONFIRM" value="Right service path for the site" />
            <StatCard
              label="RECEIVE"
              value="Commercial guidance or pricing direction"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:flex-wrap">
            <div className="flex flex-col gap-2">
              <Link
                href="/contact#intake"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability & Service Fit
              </Link>
              <div className="text-xs text-white/55 sm:text-sm">
                Business-only review • No obligation • Structured response
              </div>
            </div>

            <Link
              href="/compare"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Compare Provider Models
            </Link>
            <Link
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Review Trust Posture
            </Link>
          </div>

          <div className="mt-5 text-xs text-white/55 sm:text-sm">
            Best results come from submitting the exact service address, required
            timeline, and any technical requirements such as managed Wi-Fi, voice,
            static IPs, or continuity needs.
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}