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
  "Business fibre internet, dedicated internet access (DIA), managed Wi-Fi, and backup connectivity for Ontario businesses. Serving Mississauga, Toronto, Brampton, Vaughan, and across Ontario.";

const OG_TITLE =
  "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink";

const OG_DESC =
  "Business fibre internet, dedicated internet access (DIA), managed Wi-Fi, and backup connectivity for Ontario businesses. Serving Mississauga, Toronto, Brampton, Vaughan, and across Ontario.";

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
      "LTE and 5G Backup Connectivity",
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
      {
        "@type": "City",
        name: "Toronto",
      },
      {
        "@type": "City",
        name: "Brampton",
      },
      {
        "@type": "City",
        name: "Vaughan",
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
                Fibre • Dedicated Internet • Managed Wi-Fi • Backup Connectivity
              </div>

              <h1 className="mt-6 text-[1.9rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[2.8rem] lg:text-[3.4rem] xl:text-[3.8rem]">
                <span className="block">
                  Business Fibre Internet & Dedicated Internet Access in Ontario
                </span>
                <span className="block text-white/74">
                  Reliable, Scalable Connectivity for Offices, Clinics & Businesses
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-[1.05rem]">
                Orbitlink provides business fibre internet, dedicated internet
                access (DIA), managed Wi-Fi, and backup connectivity for Ontario
                businesses. We help offices, clinics, warehouses, and commercial
                sites get reliable internet based on their location,
                infrastructure, and operational needs.
              </p>

              <p className="mt-4 text-sm text-white/66">
                Serving businesses across Mississauga, Toronto, Brampton,
                Vaughan, and Ontario-wide.
              </p>

              <div className="mt-5 text-xs tracking-wide text-white/52 sm:text-sm">
                Built for offices, clinics, warehouses, logistics environments,
                and multi-site business locations
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Business fibre & dedicated internet options",
                  "Managed Wi-Fi & network setup",
                  "Backup internet & failover solutions",
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
                    Check Business Internet Availability
                  </Link>
                  <div className="text-center text-xs text-white/50 sm:text-left">
                    Business-only review • No obligation • Clear response
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
                        Clear business internet review for your location
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.10] px-3 py-1 text-[11px] text-emerald-200">
                      ACTIVE
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <StatCard label="STEP 1" value="Check address" />
                    <StatCard label="STEP 2" value="Review options" />
                    <StatCard label="STEP 3" value="Recommend next step" />
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
                        Dedicated internet versus shared business fibre
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                        Backup internet and continuity requirements
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                        Managed Wi-Fi, voice, and network requirements
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-xs leading-5 text-white/52">
                    Every location is reviewed based on infrastructure, provider
                    reach, and service compatibility.
                  </div>

                  <div className="mt-4 text-[11px] text-white/45">
                    No generic quotes • No assumptions • Clear recommendation
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8">
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-white">
                  Business Internet Solutions in Ontario
                </h2>

                <p className="mt-3 text-sm text-white/70">
                  Orbitlink supports Ontario businesses with:
                </p>

                <ul className="mt-4 space-y-2 text-sm text-white/82">
                  <li>• Business fibre internet</li>
                  <li>• Dedicated internet access (DIA)</li>
                  <li>• Managed Wi-Fi and network support</li>
                  <li>• LTE / 5G backup connectivity</li>
                  <li>• Business VoIP and voice solutions</li>
                </ul>

                <p className="mt-4 text-sm text-white/60">
                  Every solution is reviewed based on your address, building
                  infrastructure, and business requirements.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-8">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="text-[11px] tracking-[0.28em] text-white/50">
                    NETWORK AVAILABILITY
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-[30px]">
                    Availability starts with the building, not a generic claim
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Business internet availability depends on building
                    infrastructure, provider presence, and service compatibility
                    — not broad coverage claims.
                  </p>
                </div>

                <StatCard
                  label="REVIEW"
                  value="Address • Building • Requirements"
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
                          ONTARIO FOOTPRINT
                        </div>
                        <div className="text-[11px] text-white/45">ACTIVE</div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <StatCard label="TORONTO" value="Office & commercial demand" />
                        <StatCard label="MISSISSAUGA" value="Priority business market" />
                        <StatCard label="VAUGHAN" value="Industrial & office fit" />
                        <StatCard label="BRAMPTON" value="Warehouse & logistics fit" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 gap-4">
                    <StatCard label="AVAILABILITY" value="Reviewed by building" />
                    <StatCard
                      label="SERVICE MATCH"
                      value="Right solution before wrong quote"
                    />
                    <StatCard
                      label="BUYER OUTCOME"
                      value="Faster, clearer next step"
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
                  Check Business Internet Availability
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
                COMMON BUSINESS INTERNET ISSUES
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Problems businesses run into with the wrong internet setup
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Many business locations rely on internet service that was never
                matched to actual workload, downtime risk, or long-term growth.
              </p>
            </div>

            <StatCard
              label="FOCUS"
              value="Performance • Reliability • Backup • Accountability"
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Shared connections that slow down under peak demand",
              "No backup path when continuity matters",
              "Packages that do not match the real site requirement",
              "Limited visibility into upgrades, support, or constraints",
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
            Business connectivity should be matched to the environment, not
            chosen from a generic package.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Business Internet Availability
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
                A clear path from enquiry to recommendation
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Submit your address, business requirements, and timeline. We
                review the site, available service paths, and the most suitable
                next step.
              </p>
            </div>

            <StatCard label="PROCESS" value="Address-based and practical" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
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

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">
                TRUST & BUYER CLARITY
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Built for buyers who want clarity before commitment
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is operated by TIRAV Technologies Inc., a
                CRTC-registered telecommunications reseller. We provide clear,
                evidence-based recommendations so businesses understand
                availability, limitations, and service options before making a
                decision.
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
            <TrustPill text="CRTC-registered reseller" />
            <TrustPill text="Disclosure-first recommendations" />
            <TrustPill text="Availability reviewed by address" />
            <TrustPill text="Ontario business coverage" />
            <TrustPill text="Clear next-step guidance" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              label="BUYER TYPE"
              value="Offices, clinics, warehouses, multi-site businesses"
            />
            <StatCard
              label="REVIEW METHOD"
              value="Address • Building • Business requirements"
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
                Explore location-based business internet pages
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is building location pages across Ontario to help
                businesses evaluate service options, local availability, and
                market fit.
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
              note="Business internet and commercial connectivity"
              href="/locations/toronto"
            />
            <CoverageCard
              city="Mississauga"
              note="Priority business market"
              href="/locations/mississauga"
            />
            <CoverageCard
              city="Vaughan"
              note="Industrial and office environments"
              href="/locations/vaughan"
            />
            <CoverageCard
              city="Brampton"
              note="Warehouse and logistics environments"
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
              Check Business Internet Availability
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
              Business internet should reflect real operational demand
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              When a business location outgrows standard internet, the right
              answer is not guesswork. It starts with reviewing infrastructure,
              workload, risk, and the most suitable service path for the site.
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
                Questions businesses ask before submitting a request
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                These answers help buyers understand the process and improve
                search relevance.
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

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
                READY TO REVIEW YOUR OPTIONS?
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Choose the right business internet solution for your location.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
                We review your building, available providers, and
                infrastructure to recommend the most reliable and scalable
                option for your business.
              </p>
            </div>

            <StatCard
              label="NEXT STEP"
              value="Availability • Recommendation • Direction"
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="CHECK" value="Availability by building and address" />
            <StatCard label="CONFIRM" value="Best option for the site" />
            <StatCard
              label="RECEIVE"
              value="Recommendation, pricing direction, or next step"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:flex-wrap">
            <div className="flex flex-col gap-2">
              <Link
                href="/contact#intake"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Business Internet Availability
              </Link>
              <div className="text-xs text-white/55 sm:text-sm">
                Business-only review • No obligation • Clear response
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
              Review Trust & Compliance
            </Link>
          </div>

          <div className="mt-5 text-xs text-white/55 sm:text-sm">
            Best results come from submitting the exact service address,
            timeline, and any technical needs such as managed Wi-Fi, voice,
            static IPs, or backup connectivity.
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}