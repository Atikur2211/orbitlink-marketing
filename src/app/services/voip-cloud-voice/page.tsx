// src/app/services/voip-cloud-voice/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/voip-cloud-voice";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "VoIP & Cloud Voice | Orbitlink™ Business Communications",
  description:
    "Orbitlink business VoIP and cloud voice services for modern organizations in Ontario. Structured onboarding, number porting support, enterprise call routing, and operator-grade delivery posture.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "VoIP & Cloud Voice | Orbitlink™",
    description:
      "Enterprise-ready cloud voice, number porting coordination, and business communications with disciplined onboarding and operator-grade delivery.",
    url: PAGE_URL,
    siteName: "Orbitlink",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink VoIP & Cloud Voice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoIP & Cloud Voice | Orbitlink™",
    description:
      "Business cloud voice and VoIP with structured onboarding and operator-grade delivery posture.",
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

const CAPABILITIES = [
  {
    title: "Hosted business voice",
    desc: "Cloud voice options for modern teams that need reliability, flexibility, and clean user onboarding.",
  },
  {
    title: "Number porting support",
    desc: "Porting readiness guidance, coordination posture, and expectation-setting before transition begins.",
  },
  {
    title: "Routing design",
    desc: "Call flow structure, business-hour logic, queue behavior, and escalation-aware delivery patterns.",
  },
  {
    title: "Endpoint readiness",
    desc: "Handset, softphone, and network-readiness guidance aligned to business operating environments.",
  },
] as const;

const ARCHITECTURE_MODULES = [
  {
    eyebrow: "MODULE 01",
    title: "Core voice deployment",
    copy:
      "A clean starting point for businesses moving from legacy telephony into cloud-managed voice with professional routing and support posture.",
  },
  {
    eyebrow: "MODULE 02",
    title: "Porting & transition posture",
    copy:
      "Designed to reduce disruption during changeover with better planning around numbers, users, timing, and activation sequence.",
  },
  {
    eyebrow: "MODULE 03",
    title: "Operational call flows",
    copy:
      "Business routing patterns for reception, hunt groups, queues, failover behavior, and after-hours call handling.",
  },
] as const;

const ASSURANCE_ITEMS = [
  "Structured onboarding",
  "Porting guidance",
  "Business call routing",
  "Operator-grade posture",
  "Ontario business focus",
] as const;

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Orbitlink",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        brand: { "@type": "Brand", name: "Orbitlink" },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "VoIP & Cloud Voice",
        serviceType: "Business VoIP and Cloud Communications",
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          { "@type": "City", name: "Mississauga" },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        url: PAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "VoIP & Cloud Voice",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Orbitlink support number porting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Orbitlink supports number porting guidance and onboarding coordination as part of business voice deployment planning.",
            },
          },
          {
            "@type": "Question",
            name: "Is this designed for business environments?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Orbitlink cloud voice is positioned for business communications, routing structure, and disciplined deployment posture.",
            },
          },
          {
            "@type": "Question",
            name: "Can voice be paired with other Orbitlink services?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Voice can align with business fibre, dedicated internet access, managed LAN and Wi-Fi, and continuity architecture where appropriate.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            AUREX Voice
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                VoIP & Cloud Voice
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Modern business voice is more than dial tone. Orbitlink supports
                cloud voice deployments with structured onboarding, number
                porting coordination, professional routing logic, and a calm
                operator-grade delivery posture for modern organizations.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {ASSURANCE_ITEMS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Request Voice Options
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Back to Services
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] tracking-[0.22em] text-white/55">
                  COMMUNICATIONS POSTURE
                </div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Business communications with operator discipline
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Voice deployments are introduced through structured scoping,
                  clean transition planning, and business-ready routing rather
                  than improvised setup.
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    1. Confirm scope and users
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    2. Review porting and routing
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    3. Enter structured onboarding
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/50">
                DEPLOYMENT MODEL
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Business-ready voice
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Structured communications for modern teams, offices, and
                operating environments.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/50">
                TRANSITION POSTURE
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Porting-aware onboarding
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Expectations are defined before activation to reduce disruption
                and improve cutover readiness.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/50">
                ENTERPRISE SIGNAL
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Routing with discipline
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Business-hour logic, queue posture, escalation paths, and
                cleaner communications design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">
                CAPABILITIES
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                Voice designed as part of a broader operating stack
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Orbitlink voice fits into a wider business communications and
                connectivity posture. The objective is not just activation, but
                a cleaner long-term operating model across access, routing, and
                support.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">
                MODE
              </div>
              <div className="mt-1 text-sm text-white/80">
                Clarity-first • Business-ready
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {CAPABILITIES.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-black/20 p-6"
              >
                <div className="text-lg font-semibold text-white">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] tracking-[0.28em] text-white/45">
                ARCHITECTURE MODULES
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                A cleaner communications buying path
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
                Start with business voice scope, confirm transition posture,
                then align routing logic and endpoint readiness. This reduces
                confusion and makes deployment cleaner for the client side.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">
                DELIVERY
              </div>
              <div className="mt-1 text-sm text-white/80">
                Structured intake • Predictable rollout
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ARCHITECTURE_MODULES.map((item) => (
              <div
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="text-[11px] tracking-[0.24em] text-white/45">
                  {item.eyebrow}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">
                NEXT STEP
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Add voice the right way
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                If you are evaluating Orbitlink voice, define user count,
                current provider, number porting needs, routing expectations,
                and whether voice will align with fibre, DIA, managed LAN, or
                continuity architecture.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                COMMERCIAL MODE
              </div>
              <div className="mt-1 text-sm text-white/80">
                Scope-led review • Clean transition
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Voice Options
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Business Fibre
            </Link>
            <Link
              href="/services/managed-lan-wifi"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Managed LAN/Wi-Fi
            </Link>
            <Link
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Trust & Delivery Posture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}