// src/app/services/static-ip-routing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/static-ip-routing";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const metadata: Metadata = {
  title: "Static IP Routing Ontario | Orbitlink",
  description:
    "Static IP routing for Ontario businesses. Support VPNs, servers, and secure access with predictable connectivity. Check availability by address.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Static IP Routing Ontario | Orbitlink",
    description:
      "Business static IP routing for VPNs, fixed endpoints, hosted services, and cleaner policy control.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Static IP Routing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Static IP Routing Ontario | Orbitlink",
    description:
      "Business static IP options for VPNs, hosted services, and predictable routing posture.",
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
    title: "Fixed endpoint support",
    desc: "Supports business use cases that require stable addressing for remote access, policy control, security rules, and predictable reachability.",
  },
  {
    title: "VPN-ready posture",
    desc: "A cleaner fit for site-to-site VPN coordination, firewall policy alignment, and operational access requirements.",
  },
  {
    title: "Hosted service alignment",
    desc: "Useful when business systems, applications, gateways, or externally reachable services depend on stable address assignment.",
  },
  {
    title: "Structured delivery",
    desc: "Addressing is introduced with clearer scoping, feasibility review, and service-aligned expectation setting before deployment.",
  },
] as const;

const ROUTING_MODULES = [
  {
    eyebrow: "MODULE 01",
    title: "Review the addressing need",
    copy:
      "Start by confirming whether the business needs a single static IP, a small assignment posture, or a routing design aligned to firewall policy, VPN access, or hosted service requirements.",
  },
  {
    eyebrow: "MODULE 02",
    title: "Confirm service and site feasibility",
    copy:
      "Static IP posture depends on the underlying access service, site design, delivery scope, and technical fit. It is reviewed as part of the wider commercial and technical qualification.",
  },
  {
    eyebrow: "MODULE 03",
    title: "Document routing and handoff",
    copy:
      "Once confirmed, routing expectations, endpoint requirements, and handoff assumptions are documented so implementation stays cleaner and easier to manage.",
  },
] as const;

const ASSURANCE_ITEMS = [
  "VPN-ready posture",
  "Feasibility-led assignment",
  "Fixed endpoint support",
  "Structured delivery",
  "Ontario business focus",
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Cleaner security planning",
    body: "Static addressing helps businesses align firewall rules, remote access, VPN policy, and hosted services with more predictable behavior.",
  },
  {
    title: "Better service matching",
    body: "Buyers can evaluate static IP needs as part of the business access model instead of treating them as an afterthought.",
  },
  {
    title: "More credible enterprise posture",
    body: "The service is presented as part of the operating stack, not just a technical add-on with unclear expectations.",
  },
  {
    title: "Stronger long-term fit",
    body: "Static routing can support future requirements around DIA, managed networks, continuity, hosted systems, and multi-site connectivity.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews the intended use case, access service, security requirements, and endpoint needs before presenting static routing as the right fit.",
  },
  {
    title: "During service fit",
    body: "Routing requirements are clarified against VPN, firewall, hosted service, and operational access needs rather than guessed later.",
  },
  {
    title: "Before deployment",
    body: "Feasibility, addressing assumptions, and handoff expectations are aligned before activation and service delivery.",
  },
  {
    title: "After activation",
    body: "The customer has a cleaner understanding of the routing posture, address assignment, and how the service fits the wider network model.",
  },
] as const;

const USE_CASES = [
  "Site-to-site VPN connectivity",
  "Firewall policy and remote access control",
  "Hosted services and externally reachable endpoints",
  "Stable addressing for operational systems and gateways",
  "Business sites that need cleaner routing assumptions",
  "Organizations pairing static routing with Business Fibre, DIA, or managed networking",
] as const;

const FAQ = [
  {
    q: "Does Orbitlink offer static IP options?",
    a: "Yes, where feasible. Static IP availability depends on the underlying access service, site requirements, and delivery scope.",
  },
  {
    q: "Who is this service for?",
    a: "It is designed for business use cases such as VPN connectivity, hosted services, fixed endpoints, remote access policy, and predictable routing requirements.",
  },
  {
    q: "Can static IP routing be paired with other Orbitlink services?",
    a: "Yes. Static IP requirements can be aligned with Business Fibre, Dedicated Internet Access, managed network services, and continuity architecture where appropriate.",
  },
  {
    q: "Is static IP routing available on every site?",
    a: "Not always. Availability depends on the access service, site design, technical feasibility, and delivery scope. Orbitlink confirms what is practical before commitment.",
  },
  {
    q: "Why would a business need a static IP?",
    a: "Businesses often need static IPs for VPNs, firewall rules, hosted applications, remote access, stable gateway behavior, and environments where predictable addressing matters.",
  },
  {
    q: "Do static IPs matter more with DIA or managed network services?",
    a: "They can. Static routing often becomes more valuable when paired with DIA, managed LAN and Wi-Fi, voice, continuity planning, or broader network policy requirements.",
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
        name: "Static IP Routing Ontario | Orbitlink",
        description:
          "Business static IP routing for Ontario organizations. Support VPNs, fixed endpoints, hosted services, and policy-based access with structured onboarding and feasibility-led delivery.",
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
        name: "Static IP Routing",
        serviceType: "Business Static IP and Routing Services",
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
          "Business static IP routing for VPNs, hosted services, fixed endpoints, and predictable access policy with structured onboarding and feasibility-led delivery.",
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
            name: "Static IP Routing",
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
            Operator Layer
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>ROUTING & ADDRESSING</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Static IP Routing
                <span className="block text-white/62">
                  for businesses that need predictable addressing and cleaner policy control.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Static addressing supports site-to-site VPNs, hosted services, fixed endpoints,
                remote access controls, and more predictable policy-based network operations.
                Orbitlink provides static IP options where feasible through a disciplined,
                service-aligned delivery posture.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                The goal is not just to assign an address. It is to align addressing with the
                business use case, the access service, and the wider network model so deployment
                stays cleaner and easier to manage.
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
                  Request Static IP Options
                </CTAButton>
                <CTAButton href="/services/dedicated-internet-access">
                  Pair with DIA
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
                  <SectionEyebrow>ROUTING POSTURE</SectionEyebrow>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Stable addressing for business operations
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Static IP assignment is handled as part of a broader access and routing review,
                    which helps reduce ambiguity before implementation and handoff.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      1. Confirm use case and routing scope
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      2. Review service and site feasibility
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      3. Move into structured delivery
                    </div>
                  </div>
                </div>
              </SectionShell>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="USE CASE" value="Fixed addressing and policy control" />
            <MetricPill label="DELIVERY POSTURE" value="Feasibility before assignment" />
            <MetricPill label="ENTERPRISE SIGNAL" value="Cleaner routing expectations" />
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
                  Addressing designed for business infrastructure needs
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Static IP routing should fit cleanly into the wider operating model. The
                  objective is better alignment between business access, security policy, hosted
                  services, and long-term manageability.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
                <div className="mt-1 text-sm text-white/80">
                  Clarity-first • Feasibility-led
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
                  This page is designed to help buyers evaluate static IP routing as a business
                  operations layer rather than a technical afterthought.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Policy-focused" />
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
                <SectionEyebrow>ROUTING MODULES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  A cleaner path to static addressing
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
                  Begin with the operational use case, confirm delivery feasibility, then document
                  the routing posture for a cleaner implementation path.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">DELIVERY</div>
                <div className="mt-1 text-sm text-white/80">
                  Structured review • Predictable handoff
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {ROUTING_MODULES.map((item) => (
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

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner handoff" />
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
                Add static routing the right way
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                If you are evaluating static IP options, define the access service, intended use
                case, firewall or VPN requirements, hosted service expectations, and whether the
                site also needs managed LAN, DIA, or continuity architecture.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href="/contact#intake" primary>
                  Request Static IP Options
                </CTAButton>
                <CTAButton href="/services/dedicated-internet-access">
                  Dedicated Internet
                </CTAButton>
                <CTAButton href="/services/business-fibre-internet">
                  Business Fibre
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
              Static IP Routing FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business delivery posture: clearer addressing
              requirements, feasibility-led assignment, and structured service qualification.
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
                Request Static IP Options
              </CTAButton>
            </div>
          </SectionShell>
        </div>
      </section>
    </main>
  );
}