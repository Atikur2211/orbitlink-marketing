import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/colocation-infrastructure";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const ORG_ID = `${SITE_URL}/#org`;

export const metadata: Metadata = {
  title: "Colocation & Infrastructure Services | Orbitlink™",
  description:
    "Colocation and infrastructure services for Ontario businesses. Operator-grade coordination for rack space, cross-connects, handoff planning, edge equipment placement, and a cleaner structured deployment posture.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Colocation & Infrastructure Services | Orbitlink™",
    description:
      "Infrastructure coordination for colocation, cross-connects, handoff planning, and business-critical network environments with a cleaner delivery posture.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Colocation & Infrastructure Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colocation & Infrastructure Services | Orbitlink™",
    description:
      "Colocation guidance, cross-connect coordination, and infrastructure-grade delivery posture for business environments.",
    images: [TWITTER_IMAGE_URL],
  },
};

const INFRASTRUCTURE_BLOCKS = [
  {
    title: "Colocation guidance",
    body: "Support for evaluating rack space, power posture, equipment footprint, access expectations, and deployment readiness for business-critical networking.",
  },
  {
    title: "Cross-connect coordination",
    body: "Clear guidance on handoff expectations, interconnect pathways, carrier touchpoints, and provisioning alignment for cleaner execution.",
  },
  {
    title: "Structured delivery posture",
    body: "Infrastructure work is scoped with documented checkpoints, clearer acceptance criteria, and a safer business deployment rhythm.",
  },
  {
    title: "Feasibility by environment",
    body: "Availability depends on facility constraints, carrier pathways, access process, site design, and the technical role of the deployment.",
  },
] as const;

const USE_CASES = [
  "Edge equipment placement",
  "Business-critical routing environments",
  "Cross-connect preparation",
  "Rack and handoff planning",
  "Interconnect-oriented deployments",
  "Infrastructure expansion paths",
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Cleaner deployment planning",
    body: "Buyers can define rack, handoff, and facility requirements before hardware arrives, reducing avoidable deployment friction.",
  },
  {
    title: "Better infrastructure matching",
    body: "The page helps separate standard internet buying from colocation, interconnect, and edge placement requirements.",
  },
  {
    title: "More credible operator posture",
    body: "The service is framed as infrastructure coordination, not generic hosting language or vague technical support.",
  },
  {
    title: "Stronger long-term fit",
    body: "Infrastructure planning can support future routing growth, cross-connect needs, and more advanced network expansion paths.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews facility type, equipment role, access requirements, and handoff intent before proposing the infrastructure path.",
  },
  {
    title: "During service fit",
    body: "Rack posture, cross-connect needs, carrier touchpoints, and operational constraints are clarified before rollout planning begins.",
  },
  {
    title: "Before deployment",
    body: "Feasibility, facility expectations, handoff assumptions, and implementation boundaries are aligned before execution.",
  },
  {
    title: "After deployment",
    body: "The customer has a cleaner understanding of the infrastructure posture, handoff model, and how the environment supports future growth.",
  },
] as const;

const FAQ = [
  {
    q: "What are colocation and infrastructure services in this context?",
    a: "These services support businesses that need help planning rack placement, cross-connect pathways, handoff expectations, and network infrastructure coordination in environments where simple access delivery is not enough.",
  },
  {
    q: "Who should consider this service?",
    a: "Organizations planning edge equipment placement, business-critical routing environments, interconnect-oriented deployments, or future infrastructure expansion should usually consider it.",
  },
  {
    q: "Does Orbitlink provide cross-connect coordination?",
    a: "Yes. Orbitlink can help clarify handoff expectations, carrier touchpoints, and pathway coordination where colocation or infrastructure environments require it.",
  },
  {
    q: "Is this the same as ordering standard internet service?",
    a: "No. This service is typically relevant when connectivity planning extends into facility coordination, rack placement, interconnect pathways, and broader network infrastructure intent.",
  },
  {
    q: "Can this align with DIA or static IP routing?",
    a: "Yes. Colocation and infrastructure planning can align with Dedicated Internet Access, static IP routing, and other operator-layer requirements where appropriate.",
  },
  {
    q: "Does availability depend on the facility and environment?",
    a: "Yes. Infrastructure feasibility depends on building constraints, access process, carrier pathways, facility rules, equipment role, and the wider deployment scope.",
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

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Orbitlink",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Colocation & Infrastructure Services",
        serviceType: "Network Infrastructure Service",
        provider: {
          "@id": ORG_ID,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          { "@type": "City", name: "Mississauga" },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        url: PAGE_URL,
        description:
          "Colocation and infrastructure coordination for rack space, cross-connect pathways, edge equipment, and structured deployment posture.",
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
            name: "Colocation & Infrastructure Services",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
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
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Infrastructure
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>EDGE & INTERCONNECT</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Colocation & Infrastructure Services
                <span className="block text-white/62">
                  for businesses planning beyond standard access delivery.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Orbitlink supports infrastructure-aligned deployments for businesses that need
                cleaner network placement, handoff coordination, and operator-grade delivery
                posture. This includes colocation-oriented planning, cross-connect guidance, and
                structured execution for environments where equipment placement and network access
                must be handled with discipline.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                The goal is not just to place hardware. It is to align facility constraints,
                carrier touchpoints, rack posture, and handoff assumptions so the deployment path
                is clearer before implementation begins.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Colocation guidance",
                  "Cross-connect coordination",
                  "Edge equipment planning",
                  "Structured deployment posture",
                  "Business-safe infrastructure design",
                ].map((item) => (
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
                  Discuss Requirements
                </Link>
                <Link
                  href="/services/dedicated-internet-access"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Pair with Dedicated Internet
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <SectionShell className="relative overflow-hidden p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <SectionEyebrow>BEST FIT</SectionEyebrow>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Built for buyers planning handoff, edge placement, or future interconnect paths
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    This service is most relevant when business connectivity extends beyond simple
                    internet access and moves into infrastructure placement, carrier coordination,
                    and facility-aware deployment planning.
                  </p>

                  <div className="mt-5 grid gap-2">
                    {USE_CASES.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionShell>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="SERVICE TYPE" value="Infrastructure and handoff coordination" />
            <MetricPill label="BEST FIT" value="Rack, cross-connect, edge, interconnect planning" />
            <MetricPill label="POSITIONING" value="Planning beyond standard access" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>INFRASTRUCTURE POSTURE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Infrastructure work should feel controlled, documented, and commercially clear
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Colocation and infrastructure coordination involve more moving parts than standard
                  access delivery. That is why the work must be handled through a disciplined
                  posture: clear scope, clearer responsibilities, realistic feasibility, and a
                  documented path from planning to deployment.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
                <div className="mt-1 text-sm text-white/80">Scope-led • Infrastructure-grade</div>
              </div>
            </div>
          </SectionShell>

          <div className="grid gap-4 md:grid-cols-2">
            {INFRASTRUCTURE_BLOCKS.map((item) => (
              <SectionShell key={item.title} className="p-6">
                <h2 className="text-lg font-semibold tracking-tight text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.body}</p>
              </SectionShell>
            ))}
          </div>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  What this service structure means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is designed to help buyers evaluate colocation and infrastructure work
                  as a deployment planning discipline, not just as an add-on request after purchase.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Planning-focused" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {BUSINESS_OUTCOMES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>WHAT THIS SUPPORTS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Practical coordination for environments where network placement matters
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Good infrastructure planning reduces friction before hardware arrives. It
                  clarifies where equipment lives, how handoff occurs, how interconnect pathways
                  are handled, and what the operational expectations are once the environment goes
                  live.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
                <div className="mt-1 text-sm text-white/80">Cleaner handoff • Lower friction</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "Rack space and equipment placement planning",
                "Cross-connect expectations and interconnect coordination",
                "Documented handoff posture for business environments",
                "Feasibility aligned to facility and upstream constraints",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE ASSURANCE MODEL</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  A structured path from infrastructure intent to deployment posture
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger providers often signal maturity through service lifecycle clarity. This
                  section gives Orbitlink that same trust signal in simpler language buyers can
                  understand quickly.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner coordination" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {ASSURANCE_MODEL.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>BUYING JOURNEY FIT</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Usually introduced when connectivity planning expands into edge, routing, or future
              network scale
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              This service typically fits after business access requirements are already clear. It
              supports buyers who are also thinking about cross-connect pathways, infrastructure
              placement, routing posture, or longer-term expansion into a more operator-like model.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services/dedicated-internet-access"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Dedicated Internet Access
              </Link>
              <Link
                href="/services/static-ip-routing"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Static IP Routing
              </Link>
              <Link
                href="/services/business-fibre-internet"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Business Fibre
              </Link>
              <Link
                href="/network"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Network
              </Link>
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
                Start with your facility constraints, handoff needs, and infrastructure intent
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Share the site context, facility type, equipment role, and any cross-connect or
                routing requirements. Orbitlink can then help define the most appropriate
                infrastructure posture and next-step path.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Discuss Requirements
                </Link>
                <Link
                  href="/trust"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Review Trust Posture
                </Link>
              </div>
            </SectionShell>
          </div>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Colocation & Infrastructure FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business delivery posture: clearer infrastructure
              intent, cleaner handoff planning, and structured service qualification.
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
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Explore Services
              </Link>
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FDE047]"
              >
                Discuss Requirements
              </Link>
            </div>
          </SectionShell>
        </div>
      </section>
    </main>
  );
}