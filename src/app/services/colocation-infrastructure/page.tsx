import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/colocation-infrastructure";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Colocation & Infrastructure Services | Orbitlink™",
  description:
    "Colocation and infrastructure services for Ontario businesses. Operator-grade coordination for rack space, cross-connects, handoff planning, edge equipment placement, and structured deployment posture.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Colocation & Infrastructure Services | Orbitlink™",
    description:
      "Operator-grade infrastructure coordination for colocation, cross-connects, handoff planning, and business-critical network environments.",
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
    body: "Support for evaluating rack space, power posture, equipment footprint, access expectations, and practical deployment readiness for business-critical networking.",
  },
  {
    title: "Cross-connect coordination",
    body: "Clear guidance on handoff expectations, interconnect pathways, carrier touchpoints, and provisioning alignment for cleaner deployment execution.",
  },
  {
    title: "Structured delivery posture",
    body: "Infrastructure work is scoped with documented checkpoints, cleaner acceptance criteria, and a business-safe deployment rhythm.",
  },
  {
    title: "Feasibility by environment",
    body: "Availability depends on building, carrier pathways, facility constraints, access process, and the technical role of the deployment.",
  },
];

const USE_CASES = [
  "Edge equipment placement",
  "Business-critical routing environments",
  "Cross-connect preparation",
  "Rack and handoff planning",
  "Interconnect-oriented deployments",
  "Infrastructure expansion paths",
];

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Colocation & Infrastructure Services",
        serviceType: "Network Infrastructure Service",
        provider: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#org`,
          name: "Orbitlink",
          url: SITE_URL,
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
          "Operator-grade colocation and infrastructure coordination for rack space, cross-connect pathways, edge equipment, and structured deployment posture.",
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
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Infrastructure
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Colocation & Infrastructure Services
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Orbitlink supports infrastructure-aligned deployments for businesses that need
                cleaner network placement, handoff coordination, and operator-grade delivery
                posture. This includes colocation-oriented planning, cross-connect guidance, and
                structured execution for environments where equipment placement and network access
                must be handled with discipline.
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
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Back to Services
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] tracking-[0.22em] text-white/55">BEST FIT</div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Built for buyers planning network edge placement, handoff coordination, or future
                  interconnect paths
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This service is most relevant when business connectivity extends beyond simple
                  access and moves into infrastructure design, physical placement, and cleaner
                  coordination between facilities, carriers, and network operations.
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
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">INFRASTRUCTURE POSTURE</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                Infrastructure work should feel controlled, documented, and commercially clear
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Colocation and infrastructure coordination involve more moving parts than standard
                access delivery. That is why the work must be handled through a disciplined posture:
                clear scope, clearer responsibilities, realistic feasibility, and a documented path
                from planning to deployment.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
              <div className="mt-1 text-sm text-white/80">Scope-led • Infrastructure-grade</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {INFRASTRUCTURE_BLOCKS.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/68">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">WHAT THIS SUPPORTS</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Practical coordination for environments where network placement matters
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Good infrastructure planning reduces friction before hardware arrives. It clarifies
                where equipment lives, how handoff occurs, how interconnect pathways are handled,
                and what the operational expectations are once the environment goes live.
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
              "Feasibility aligned to site, facility, and upstream constraints",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">BUYING JOURNEY FIT</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Usually introduced when connectivity planning expands into edge, routing, or future
                network scale
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                This service typically fits after business access requirements are already clear.
                It supports buyers who are also thinking about cross-connect pathways, infrastructure
                placement, routing posture, or longer-term expansion into a more operator-like model.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL SIGNAL</div>
              <div className="mt-1 text-sm text-white/80">Planning beyond standard access</div>
            </div>
          </div>

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
        </div>

        <div className="mt-12 rounded-[30px] border border-white/10 bg-black/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">NEXT STEP</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Start with your facility constraints, handoff needs, and infrastructure intent
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Share the site context, facility type, equipment role, and any cross-connect or
                routing requirements. Orbitlink can then help define the most appropriate
                infrastructure posture and next-step path.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Request Access
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Review Trust Posture
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}