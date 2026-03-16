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
  "Orbitlink helps Ontario businesses find business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and backup connectivity based on address, building fit, and business requirements.";

const OG_TITLE =
  "Business Fibre Internet, Dedicated Internet & Managed Network Services | Orbitlink";
const OG_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, business voice, and continuity services for Ontario businesses.";
const TWITTER_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and continuity services for Ontario offices, clinics, warehouses, and multi-site businesses.";

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
      <div className="text-[11px] tracking-[0.22em] text-white/50">{city.toUpperCase()}</div>
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

function InfoCard({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{text}</div>
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
          text: "Orbitlink is designed for offices, clinics, warehouses, commercial units, and multi-site business environments across Ontario.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after I submit a request?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orbitlink reviews the address, service type, and business requirement, then responds with the next step such as availability direction, pricing guidance, or qualification follow-up.",
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
          <div className="absolute left-[5%] top-[22%] h-px w-[34%] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent blur-[1px]" />
          <div className="absolute left-[16%] top-[31%] h-px w-[48%] bg-gradient-to-r from-transparent via-white/14 to-transparent" />
          <div className="absolute left-[38%] top-[18%] h-px w-[24%] bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent blur-[1px]" />
          <div className="absolute left-[12%] top-[60%] h-px w-[56%] bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent" />
          <div className="absolute right-[7%] top-[42%] h-px w-[22%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="absolute left-[17%] top-[31%] h-2.5 w-2.5 rounded-full bg-cyan-200/80 shadow-[0_0_24px_rgba(56,253,254,0.45)]" />
          <div className="absolute left-[51%] top-[18%] h-2.5 w-2.5 rounded-full bg-emerald-200/80 shadow-[0_0_24px_rgba(16,185,129,0.45)]" />
          <div className="absolute left-[66%] top-[60%] h-2.5 w-2.5 rounded-full bg-yellow-200/80 shadow-[0_0_24px_rgba(250,204,21,0.45)]" />
          <div className="absolute right-[18%] top-[42%] h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.25)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-7 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] text-white/72 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                Business fibre • Dedicated internet • Managed Wi-Fi • Business voice
              </div>

              <h1 className="mt-6 max-w-5xl text-[2.35rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-[3.6rem] lg:text-[5.2rem]">
                Business fibre internet
                <span className="block text-white/74">for Ontario businesses</span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-[1.15rem]">
                Check availability, choose the right service, and move toward install with less friction.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66 sm:text-[1rem]">
                Orbitlink helps Ontario businesses find business fibre, dedicated internet,
                managed Wi-Fi, voice, and backup connectivity based on address, building fit,
                and business need.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Business-only service intake",
                  "Ontario commercial coverage",
                  "Operated by TIRAV Technologies Inc.",
                  "Availability reviewed by address",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/70 sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 text-xs tracking-wide text-white/52 sm:text-sm">
                Offices • Clinics • Warehouses • Commercial units • Multi-site businesses
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability & Request Pricing
                </Link>

                <Link
                  href="/why-orbitlink"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Why Orbitlink
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Explore Services
                </Link>

                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                >
                  View Locations
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                  label="COMPARE"
                  text="See how Orbitlink differs from big telcos and typical small ISPs."
                />
                <InfoCard
                  label="TRUST"
                  text="Review trust posture, delivery visibility, and operating discipline."
                />
                <InfoCard
                  label="SERVICE FIT"
                  text="Match the right service to the site before the wrong quote."
                />
                <InfoCard
                  label="INTAKE"
                  text="Submit address, scope, and timing for a cleaner next step."
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Compare Provider Models
                </Link>

                <Link
                  href="/trust"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Review Trust Posture
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] tracking-[0.24em] text-white/50">OPERATOR SURFACE</div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        Commercial qualification panel
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.10] px-3 py-1 text-[11px] text-emerald-200">
                      ACTIVE
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <StatCard label="INTAKE" value="Business-only" />
                    <StatCard label="COVERAGE" value="Ontario commercial" />
                    <StatCard label="REVIEW MODEL" value="Address-first" />
                    <StatCard label="SERVICE PATHS" value="Fibre • DIA • Wi-Fi • Voice" />
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/10 bg-black/25 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[11px] tracking-[0.22em] text-white/50">SERVICE DECISION MODEL</div>
                      <div className="text-[11px] text-white/45">LIVE</div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div className="text-sm text-white/82">Business Fibre</div>
                        <div className="text-xs text-white/55">Primary office connectivity</div>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div className="text-sm text-white/82">Dedicated Internet Access</div>
                        <div className="text-xs text-white/55">Critical business sites</div>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div className="text-sm text-white/82">Managed LAN & Wi-Fi</div>
                        <div className="text-xs text-white/55">Internal network performance</div>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div className="text-sm text-white/82">Continuity & Voice</div>
                        <div className="text-xs text-white/55">Backup and communications</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <StatCard label="STEP 1" value="Choose service" />
                    <StatCard label="STEP 2" value="Add address" />
                    <StatCard label="STEP 3" value="Review fit" />
                  </div>

                  <div className="mt-5 text-xs leading-5 text-white/52">
                    Built for serious commercial enquiries, building-based qualification, and a clearer path
                    to pricing, assessment, and deployment planning.
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
                    NETWORK MAP / AVAILABILITY STRIP
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-[30px]">
                    Availability starts with the site, not a generic claim
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Orbitlink reviews address, building fit, service type, and operating requirement
                    before confirming the next commercial path.
                  </p>
                </div>

                <StatCard label="QUALIFICATION MODE" value="Address • Building • Service fit" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />
                      <div className="absolute left-[12%] top-[28%] h-px w-[34%] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
                      <div className="absolute left-[34%] top-[46%] h-px w-[22%] bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />
                      <div className="absolute left-[56%] top-[30%] h-px w-[24%] bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                      <div className="absolute left-[20%] top-[64%] h-px w-[42%] bg-gradient-to-r from-transparent via-cyan-300/16 to-transparent" />
                      <div className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-cyan-200/80 shadow-[0_0_24px_rgba(56,253,254,0.35)]" />
                      <div className="absolute left-[42%] top-[46%] h-3 w-3 rounded-full bg-emerald-200/80 shadow-[0_0_24px_rgba(16,185,129,0.35)]" />
                      <div className="absolute left-[64%] top-[30%] h-3 w-3 rounded-full bg-yellow-200/80 shadow-[0_0_24px_rgba(250,204,21,0.35)]" />
                      <div className="absolute left-[52%] top-[64%] h-3 w-3 rounded-full bg-white/75 shadow-[0_0_24px_rgba(255,255,255,0.22)]" />
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
                    <StatCard label="SERVICE MATCHING" value="Right service before wrong quote" />
                    <StatCard label="BUYER OUTCOME" value="Faster commercial next step" />
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
                  Start Availability Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BentoServices />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">HOW IT WORKS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A simple path from enquiry to next step
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Submit your service address, business requirement, and timeline. Orbitlink reviews
                the request and replies with the right next step.
              </p>
            </div>

            <StatCard label="PROCESS" value="Commercial, address-based, and practical" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Choose your service"
              desc="Select fibre, dedicated internet, managed Wi-Fi, voice, or continuity based on the site need."
            />
            <StepCard
              step="2"
              title="Submit your address"
              desc="Share the service address, business need, and any timing details that affect the location."
            />
            <StepCard
              step="3"
              title="Receive your next step"
              desc="Get availability direction, service-fit guidance, or a practical path toward pricing and install."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">WHY BUYERS KEEP READING</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Orbitlink gives buyers more than a service list
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Many provider websites focus on speed claims first. Orbitlink is built to help buyers
                understand service fit, building review, trust posture, and next steps before they commit.
              </p>
            </div>

            <StatCard label="BUYER OUTCOME" value="More clarity before contact" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Understand the fit"
              desc="Learn which service model fits the location, the environment, and the business requirement."
            />
            <StepCard
              step="2"
              title="Review provider differences"
              desc="Compare Orbitlink with larger telecom providers and smaller ISPs in a calmer, more business-readable way."
            />
            <StepCard
              step="3"
              title="Move with confidence"
              desc="Submit a stronger request with better clarity around address, scope, and next steps."
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Compare Provider Models
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Review Trust Posture
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">WHY BUYERS TRUST ORBITLINK</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A clearer and more reviewable business provider experience
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is built for buyers who want more than generic telecom marketing.
                The business identity, intake path, trust posture, and delivery logic are made
                visible earlier so decisions feel easier and more confident.
              </p>
            </div>

            <StatCard label="OPERATED BY" value="TIRAV Technologies Inc." />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <TrustPill text="Operated by TIRAV Technologies Inc." />
            <TrustPill text="Business-only service intake" />
            <TrustPill text="Ontario commercial coverage" />
            <TrustPill text="Availability reviewed by address" />
            <TrustPill text="Structured commercial path" />
            <TrustPill text="Site-qualified next steps" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="BUYER TYPE" value="Offices, clinics, warehouses, multi-site businesses" />
            <StatCard label="REVIEW METHOD" value="Address • Building • Service fit" />
            <StatCard label="OUTCOME" value="Cleaner qualification and faster response" />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Compare Provider Models
            </Link>

            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Review Trust Posture
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">ONTARIO LOCATIONS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Explore location-based service coverage
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Orbitlink is building location pages across Ontario to help buyers evaluate service
                fit, commercial context, and local availability signals.
              </p>
            </div>

            <StatCard label="SEO + COVERAGE" value="Location pages support local discovery" />
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
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 sm:pb-12">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/55">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                Questions buyers commonly ask before submitting
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                These answers support clarity for buyers and help reinforce service relevance for search.
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
              answer="Orbitlink is designed for offices, clinics, warehouses, commercial units, and multi-site business environments across Ontario."
            />
            <FAQCard
              question="What happens after I submit a request?"
              answer="Orbitlink reviews the address, service type, and business requirement, then responds with the next step such as availability direction, pricing guidance, or qualification follow-up."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 sm:pb-14">
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

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="CHECK" value="Serviceability by building and address" />
            <StatCard label="CONFIRM" value="Right service path for the site" />
            <StatCard label="RECEIVE" value="Pricing direction or commercial follow-up" />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:flex-wrap">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability & Request Pricing
            </Link>
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
            Best results come from submitting the exact service address, your business need, timing,
            and any technical requirements such as managed Wi-Fi, voice, static IPs, or backup connectivity.
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}