import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/iot-connectivity";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "IoT Connectivity & Secure Uplinks | Orbitlink™",
  description:
    "IoT connectivity and secure uplinks for Ontario businesses. Operator-grade design for sensors, gateways, remote devices, segmentation, monitoring readiness, and business-safe deployment posture.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "IoT Connectivity & Secure Uplinks | Orbitlink™",
    description:
      "Operator-grade IoT connectivity for sensors, gateways, and managed devices with secure uplinks, segmentation posture, and monitoring-ready deployment.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink IoT Connectivity & Secure Uplinks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IoT Connectivity & Secure Uplinks | Orbitlink™",
    description:
      "Secure uplink design for sensors, gateways, and managed devices with an operator-grade posture.",
    images: [TWITTER_IMAGE_URL],
  },
};

const DESIGN_PILLARS = [
  {
    title: "Segmentation posture",
    body: "IoT devices should not live on the same trust boundary as staff systems, production applications, or sensitive corporate traffic.",
  },
  {
    title: "Secure uplink design",
    body: "Connectivity should be designed around predictable handoff, clean routing posture, and lower operational friction for remote devices.",
  },
  {
    title: "Monitoring readiness",
    body: "IoT connectivity becomes more valuable when the design supports observability, alerting logic, and cleaner operational review.",
  },
  {
    title: "Site-aware feasibility",
    body: "The right uplink pattern depends on location, power conditions, device density, indoor constraints, and the operational role of the system.",
  },
];

const USE_CASES = [
  "Sensors and environmental monitoring",
  "Gateways and edge-control devices",
  "Retail, office, and industrial telemetry",
  "Remote access paths for managed equipment",
  "Business environments with segmented device fleets",
  "Projects needing cleaner device-network boundaries",
];

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "IoT Connectivity & Secure Uplinks",
        serviceType: "IoT Network Connectivity Service",
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
          "Operator-grade IoT connectivity and secure uplink design for sensors, gateways, remote devices, and monitoring-oriented business environments.",
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
            name: "IoT Connectivity & Secure Uplinks",
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
            AUREX Smart
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                IoT Connectivity & Secure Uplinks
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                IoT connectivity should be secure by design, not improvised after deployment.
                Orbitlink supports uplink patterns for sensors, gateways, and managed devices with
                an operator-grade posture built around segmentation, clean handoff, monitoring
                readiness, and business-safe implementation.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Secure uplink design",
                  "IoT segmentation posture",
                  "Monitoring-ready deployment",
                  "Gateway and sensor support",
                  "Business-safe connectivity",
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
                  Discuss Your IoT Use Case
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
                  Built for businesses managing device fleets, edge hardware, or operational
                  telemetry
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This service fits environments where device traffic needs clearer boundaries,
                  better monitoring posture, and cleaner operational control than generic shared
                  network designs usually provide.
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
              <div className="text-[11px] tracking-[0.28em] text-white/45">OPERATOR POSTURE</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                Device connectivity should be treated like infrastructure, not an afterthought
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                As device fleets grow, so does operational risk. The network design must consider
                isolation, uplink resilience, monitoring signals, and clean management boundaries so
                devices can operate without weakening the rest of the business environment.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
              <div className="mt-1 text-sm text-white/80">Secure-first • Scope-led</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DESIGN_PILLARS.map((item) => (
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
                Secure connectivity patterns for real operational environments
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                The right design depends on what the devices do, how critical they are, where they
                live, and what systems they interact with. Good IoT posture reduces ambiguity and
                gives operations teams a cleaner model to support over time.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
              <div className="mt-1 text-sm text-white/80">Cleaner boundaries • Better control</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Segmentation between IoT and corporate networks",
              "Secure uplink patterns and cleaner handoff",
              "Monitoring-oriented design choices",
              "Deployment scope aligned to site feasibility",
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
                Usually introduced after site connectivity and internal network posture are defined
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                IoT uplinks become more effective when the wider service stack is already clear.
                That may include business fibre, managed LAN and Wi-Fi, continuity posture, static
                addressing, and support expectations for the environment.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL SIGNAL</div>
              <div className="mt-1 text-sm text-white/80">Operational clarity at scale</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/managed-lan-wifi"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Managed LAN & Wi-Fi
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Business Fibre
            </Link>
            <Link
              href="/services/lte-5g-continuity"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              LTE / 5G Continuity
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
                Start with the device role, then design the uplink around the environment
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Share your IoT use case, device profile, site type, and any segmentation or
                monitoring requirements. Orbitlink can then scope the right connectivity posture for
                a cleaner deployment path.
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