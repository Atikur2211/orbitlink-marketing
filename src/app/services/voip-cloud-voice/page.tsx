// src/app/services/voip-cloud-voice/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/voip-cloud-voice";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const metadata: Metadata = {
  title: "VoIP & Cloud Voice Ontario | Orbitlink",
  description:
    "Business VoIP and cloud voice for Ontario organizations. Reliable calling, number porting, and call routing. Check availability by address.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "VoIP & Cloud Voice Ontario | Orbitlink",
    description:
      "Business cloud voice, number porting coordination, and call routing with structured onboarding and cleaner delivery.",
    url: PAGE_URL,
    siteName: SITE_NAME,
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
    title: "VoIP & Cloud Voice Ontario | Orbitlink",
    description:
      "Business cloud voice and VoIP with structured onboarding, number porting support, and cleaner delivery posture.",
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
    desc: "Cloud voice options for modern teams that need reliability, flexibility, and cleaner user onboarding.",
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
      "A clean starting point for businesses moving from legacy telephony into cloud-managed voice with professional routing and a more disciplined support posture.",
  },
  {
    eyebrow: "MODULE 02",
    title: "Porting and transition planning",
    copy:
      "Designed to reduce disruption during changeover through better planning around numbers, users, timing, and activation sequence.",
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

const BUSINESS_OUTCOMES = [
  {
    title: "Cleaner communications rollout",
    body: "Voice is introduced through a more structured transition path, reducing confusion around users, numbers, routing, and timing.",
  },
  {
    title: "Better business fit",
    body: "Buyers can treat voice as part of the operating stack instead of as a disconnected add-on.",
  },
  {
    title: "More credible support posture",
    body: "The service is framed around call routing, transition planning, and deployment clarity rather than generic VoIP claims.",
  },
  {
    title: "Stronger long-term alignment",
    body: "Cloud voice fits more cleanly with internet access, managed networking, continuity planning, and future communications growth.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews user count, current provider, number needs, routing expectations, and site context before presenting the voice model.",
  },
  {
    title: "During service fit",
    body: "Porting, call flow structure, endpoint needs, and related network requirements are clarified before rollout planning begins.",
  },
  {
    title: "Before activation",
    body: "Transition expectations, routing behavior, cutover assumptions, and support boundaries are aligned before go-live.",
  },
  {
    title: "After activation",
    body: "The customer has a cleaner understanding of the call routing model, user setup, and how voice fits the wider business communications environment.",
  },
] as const;

const USE_CASES = [
  "Office phone systems for modern business teams",
  "Cloud voice for reception, departments, and hunt groups",
  "Number porting from legacy or incumbent providers",
  "Voice environments with business-hour and after-hours logic",
  "Organizations pairing voice with Business Fibre or DIA",
  "Businesses that want cleaner communications operations and support",
] as const;

const FAQ = [
  {
    q: "Does Orbitlink support number porting?",
    a: "Yes. Orbitlink supports number porting guidance and onboarding coordination as part of business voice deployment planning.",
  },
  {
    q: "Is this designed for business environments?",
    a: "Yes. Orbitlink cloud voice is positioned for business communications, call routing structure, and a more disciplined deployment posture.",
  },
  {
    q: "Can voice be paired with other Orbitlink services?",
    a: "Yes. Voice can align with Business Fibre, Dedicated Internet Access, managed LAN and Wi-Fi, and continuity architecture where appropriate.",
  },
  {
    q: "What kinds of call flows can be supported?",
    a: "Business call flows may include reception routing, business-hour logic, hunt groups, queue behavior, failover handling, and after-hours call treatment depending on the deployment scope.",
  },
  {
    q: "Do I need special internet service for cloud voice?",
    a: "Voice works best when it is aligned with a suitable access and network environment. Orbitlink reviews voice alongside internet, LAN, Wi-Fi, and continuity posture when needed.",
  },
  {
    q: "Who should consider business cloud voice?",
    a: "Organizations with multiple users, call routing needs, porting requirements, remote or hybrid teams, or businesses replacing legacy telephony should usually consider it.",
  },
] as const;

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.04] ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/48">{children}</div>;
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
      <div className="text-[11px] tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          : "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
      }
    >
      {children}
    </Link>
  );
}

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "VoIP & Cloud Voice Ontario | Orbitlink",
        description:
          "Business VoIP and cloud voice for Ontario organizations. Structured onboarding, number porting support, call routing, endpoint readiness, and a cleaner delivery posture.",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
        },
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "VoIP & Cloud Voice",
        serviceType: "Business VoIP and Cloud Communications",
        provider: {
          "@id": ORG_ID,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
        url: PAGE_URL,
        description:
          "Business VoIP and cloud voice with structured onboarding, number porting support, business call routing, and cleaner delivery posture.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            AUREX Voice
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>BUSINESS COMMUNICATIONS</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                VoIP & Cloud Voice
                <span className="block text-white/62">
                  for businesses that need cleaner communications and transition control.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Modern business voice is more than dial tone. Orbitlink supports cloud voice
                deployments with structured onboarding, number porting coordination, professional
                routing logic, and a calm operator-grade delivery posture for modern organizations.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                The goal is not just to turn on service. It is to align users, numbers, call
                routing, endpoint readiness, and business operations so communications feel stable,
                predictable, and easier to manage.
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
                <CTAButton href="/contact#intake" primary>
                  Request Voice Options
                </CTAButton>
                <CTAButton href="/services/business-fibre-internet">
                  Pair with Business Fibre
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-4">
              <SectionShell className="relative overflow-hidden p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <SectionEyebrow>COMMUNICATIONS POSTURE</SectionEyebrow>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Business communications with cleaner deployment discipline
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Voice deployments are introduced through structured scoping, transition
                    planning, and business-ready call routing rather than improvised setup.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      1. Confirm users, scope, and current provider
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      2. Review porting and call routing needs
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      3. Move into structured onboarding
                    </div>
                  </div>
                </div>
              </SectionShell>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="DEPLOYMENT MODEL" value="Business-ready cloud voice" />
            <MetricPill label="TRANSITION POSTURE" value="Porting-aware onboarding" />
            <MetricPill label="ENTERPRISE SIGNAL" value="Routing with cleaner expectations" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>CAPABILITIES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Voice designed as part of a broader operating stack
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Orbitlink voice fits into a wider business communications and connectivity
                  posture. The objective is not just activation, but a cleaner long-term operating
                  model across access, routing, endpoints, and support.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
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
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  What this service structure means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is designed to help buyers evaluate voice as a business communications
                  layer rather than just a phone replacement.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Communications-focused" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {BUSINESS_OUTCOMES.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <section>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionEyebrow>ARCHITECTURE MODULES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  A cleaner communications buying path
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
                  Start with business voice scope, confirm transition posture, then align routing
                  logic and endpoint readiness. This reduces confusion and makes deployment cleaner
                  on the client side.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">DELIVERY</div>
                <div className="mt-1 text-sm text-white/80">
                  Structured intake • Predictable rollout
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {ARCHITECTURE_MODULES.map((item) => (
                <SectionShell key={item.title} className="p-6">
                  <div className="text-[11px] tracking-[0.24em] text-white/45">{item.eyebrow}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{item.copy}</p>
                </SectionShell>
              ))}
            </div>
          </section>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE ASSURANCE MODEL</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  A structured path from qualification to operational use
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger providers often signal maturity through service lifecycle clarity. This
                  section gives Orbitlink that same trust signal in simpler language buyers can
                  understand quickly.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner transition" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {ASSURANCE_MODEL.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Common business use cases
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {USE_CASES.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell className="p-6 sm:p-8">
              <SectionEyebrow>NEXT STEP</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Add voice the right way
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                If you are evaluating Orbitlink voice, define user count, current provider, number
                porting needs, routing expectations, and whether voice will align with fibre, DIA,
                managed LAN, or continuity architecture.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href="/contact#intake" primary>
                  Request Voice Options
                </CTAButton>
                <CTAButton href="/services/business-fibre-internet">
                  Business Fibre
                </CTAButton>
                <CTAButton href="/services/managed-lan-wifi">
                  Managed LAN/Wi-Fi
                </CTAButton>
                <CTAButton href="/trust">
                  Trust & Delivery Posture
                </CTAButton>
              </div>
            </SectionShell>
          </div>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              VoIP & Cloud Voice FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business delivery posture: cleaner porting,
              clearer routing expectations, and structured service qualification.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {FAQ.map((f) => (
                <div key={f.q} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <div className="text-sm font-semibold text-white/90">{f.q}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/services">
                Explore Services
              </CTAButton>
              <CTAButton href="/contact#intake" primary>
                Request Voice Options
              </CTAButton>
            </div>
          </SectionShell>
        </div>
      </section>
    </main>
  );
}