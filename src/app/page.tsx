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

function AvailabilityStripCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/64">{body}</p>
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

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-7 sm:pb-18 sm:pt-18 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] text-white/72 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                Business fibre • Dedicated internet • Managed Wi-Fi • Business voice
              </div>

              <h1 className="mt-6 max-w-5xl text-[2.35rem] font-semibold leading-[1.01] tracking-tight text-white sm:text-[3.6rem] lg:text-[5.3rem]">
                Business fibre internet
                <span className="block text-white/74">for Ontario businesses</span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-[1.15rem]">
                Check availability, compare the right service options, and move toward install with less friction.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66 sm:text-[1rem]">
                Orbitlink helps Ontario businesses source business fibre, dedicated internet, managed Wi-Fi,
                voice, and backup connectivity based on location, building fit, and operational need.
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
                Offices • Clinics • Warehouses • Commercial units • Multi-site business environments
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability & Request Pricing
                </a>

                <a
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Explore Services
                </a>

                <a
                  href="/locations"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                >
                  View Locations
                </a>
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
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <div className="text-[11px] tracking-[0.22em] text-white/50">STEP 1</div>
                      <div className="mt-2 text-sm text-white/82">Choose service</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <div className="text-[11px] tracking-[0.22em] text-white/50">STEP 2</div>
                      <div className="mt-2 text-sm text-white/82">Add address</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <div className="text-[11px] tracking-[0.22em] text-white/50">STEP 3</div>
                      <div className="mt-2 text-sm text-white/82">Review fit</div>
                    </div>
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
                    Ontario commercial availability starts with the site, not a generic claim
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Orbitlink reviews address, building fit, service type, and operational requirement
                    before confirming the next commercial path. That keeps expectations cleaner and helps
                    buyers move faster toward the right service model.
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
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                          <div className="text-[11px] tracking-[0.22em] text-white/50">TORONTO</div>
                          <div className="mt-2 text-sm text-white/82">Commercial review</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                          <div className="text-[11px] tracking-[0.22em] text-white/50">MISSISSAUGA</div>
                          <div className="mt-2 text-sm text-white/82">Active market</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                          <div className="text-[11px] tracking-[0.22em] text-white/50">VAUGHAN</div>
                          <div className="mt-2 text-sm text-white/82">Industrial fit</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                          <div className="text-[11px] tracking-[0.22em] text-white/50">BRAMPTON</div>
                          <div className="mt-2 text-sm text-white/82">Logistics fit</div>
                        </div>
                      </div>

                      <div className="mt-5 text-xs leading-5 text-white/52">
                        Coverage and fit depend on the building, access feasibility, landlord or site
                        conditions, and the service model being evaluated.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 gap-4">
                    <AvailabilityStripCard
                      title="Availability reviewed by building"
                      body="Serviceability is confirmed using the address, building conditions, access design, and service type instead of broad blanket claims."
                    />
                    <AvailabilityStripCard
                      title="Right service before wrong quote"
                      body="Orbitlink helps buyers separate Business Fibre, DIA, managed Wi-Fi, continuity, and voice before quoting goes in the wrong direction."
                    />
                    <AvailabilityStripCard
                      title="Faster commercial next step"
                      body="The goal is to move buyers toward practical pricing, qualification, and deployment planning with less friction."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/locations"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Browse Ontario Locations
                </a>
                <a
                  href="/locations/toronto"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                >
                  Toronto
                </a>
                <a
                  href="/locations/mississauga"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                >
                  Mississauga
                </a>
                <a
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Start Availability Review
                </a>
              </div>
            </div>
          </div>
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
