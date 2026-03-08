import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/lte-5g-continuity";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "LTE / 5G Continuity Architecture | Orbitlink™",
  description:
    "LTE and 5G continuity architecture for Ontario businesses. Reduce downtime with structured failover design, traffic prioritization, documented recovery posture, and operator-grade continuity planning.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "LTE / 5G Continuity Architecture | Orbitlink™",
    description:
      "Continuity architecture for business operations: structured failover, traffic prioritization, recovery posture, and operator-grade resilience planning.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink LTE / 5G Continuity Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LTE / 5G Continuity Architecture | Orbitlink™",
    description:
      "Business continuity architecture using LTE and 5G failover patterns for cleaner operational resilience.",
    images: [TWITTER_IMAGE_URL],
  },
};

const DESIGN_SIGNALS = [
  {
    title: "Traffic prioritization",
    body: "Continuity is strongest when critical systems are identified first, so essential business functions stay reachable during an access event.",
  },
  {
    title: "Cutover behavior",
    body: "Recovery expectations should be defined before deployment: what fails over, how quickly, and what the user experience should look like.",
  },
  {
    title: "Carrier feasibility",
    body: "Signal quality, site conditions, building materials, and device placement all affect whether cellular continuity will perform as intended.",
  },
  {
    title: "Operational procedure",
    body: "A continuity service should come with a documented operating posture, not just hardware on a shelf waiting for a bad day.",
  },
];

const BUYER_FIT = [
  "Single-site businesses with uptime sensitivity",
  "Multi-site environments needing secondary-path design",
  "Retail, office, and commercial operations",
  "Voice, payments, and cloud app continuity",
  "Teams that need clean incident posture",
  "Businesses moving beyond unmanaged backup devices",
];

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "LTE / 5G Continuity Architecture",
        serviceType: "Business Continuity Network Service",
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
          "LTE and 5G continuity architecture for business environments, including failover design, prioritization posture, and documented operating procedures.",
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
            name: "LTE / 5G Continuity Architecture",
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
            Continuity
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                LTE / 5G Continuity Architecture
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Continuity is not a backup gadget. It is an operating decision. Orbitlink designs
                LTE and 5G failover posture for businesses that need critical services to remain
                reachable when primary access is disrupted, with clearer prioritization, cleaner
                recovery expectations, and a more disciplined resilience model.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Failover posture",
                  "Critical traffic priority",
                  "Documented recovery expectations",
                  "Carrier feasibility review",
                  "Operator-grade resilience",
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
                  Evaluate Continuity
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
                <div className="text-[11px] tracking-[0.22em] text-white/55">BUYER FIT</div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Best for businesses that cannot let one circuit define all uptime
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This service fits buyers who want cleaner outage posture, more resilient site
                  design, and a secondary-path strategy that reflects actual business priorities.
                </p>

                <div className="mt-5 grid gap-2">
                  {BUYER_FIT.map((item) => (
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
              <div className="text-[11px] tracking-[0.28em] text-white/45">DESIGN PRINCIPLE</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                Resilience should be designed around operations, not assumed by hardware
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                A real continuity posture starts with business priorities: what traffic must stay
                alive, what recovery behavior is acceptable, and what the site can realistically
                support. That is what separates enterprise continuity design from a simple backup
                modem approach.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
              <div className="mt-1 text-sm text-white/80">Resilience-first • Scope-led</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DESIGN_SIGNALS.map((item) => (
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
              <div className="text-[11px] tracking-[0.28em] text-white/45">WHAT WE DESIGN FOR</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Clean failover behavior for real business environments
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Continuity architecture should preserve the services that matter most to the site.
                That may include cloud platforms, line-of-business systems, payments, voice paths,
                remote access, or basic communications. The right design depends on the business
                model, not just the access technology.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
              <div className="mt-1 text-sm text-white/80">Critical-first • Documented</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Failover that preserves critical traffic first",
              "Defined cutover and recovery expectations",
              "Site-aware cellular feasibility review",
              "Documented continuity operating posture",
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
                Usually introduced after primary access is defined
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Continuity becomes more valuable when paired with the primary access strategy and
                the rest of the site architecture. That includes broadband or DIA selection,
                internal network posture, static addressing requirements, and operational escalation
                expectations.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL SIGNAL</div>
              <div className="mt-1 text-sm text-white/80">Reduced outage exposure</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/business-fibre-internet"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Business Fibre
            </Link>
            <Link
              href="/services/dedicated-internet-access"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Dedicated Internet Access
            </Link>
            <Link
              href="/services/managed-lan-wifi"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Managed LAN & Wi-Fi
            </Link>
            <Link
              href="/services/static-ip-routing"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Static IP Routing
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-[30px] border border-white/10 bg-black/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">NEXT STEP</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Define what must stay online before the outage happens
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                The strongest continuity outcomes come from a scoped review of site needs, critical
                applications, device profile, and feasible carrier behavior. Submit your business
                requirements to begin structured continuity planning.
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