// src/app/services/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/services`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

type ServiceGroup =
  | "Connectivity"
  | "Managed Network"
  | "Continuity"
  | "Voice"
  | "Infrastructure";

type ServiceItem = {
  title: string;
  subtitle: string;
  href: string;
  bullets: readonly string[];
  tag: string;
  group: ServiceGroup;
  journey: string;
};

type GroupItem = {
  title: ServiceGroup;
  description: string;
  eyebrow: string;
};

export const metadata: Metadata = {
  title: "Services | Orbitlink™ — Business Fibre, DIA, Managed Network",
  description:
    "Operator-grade connectivity and managed infrastructure: business fibre, dedicated internet access, managed LAN & Wi-Fi, continuity architecture, voice, IoT uplinks, colocation, and static IP routing.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Services | Orbitlink™",
    description:
      "Business Fibre, DIA, Managed LAN & Wi-Fi, continuity, voice, IoT, colocation, and static IP routing for modern enterprises in Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Orbitlink™",
    description:
      "Enterprise connectivity and infrastructure services with a disciplined delivery posture.",
    images: [TWITTER_IMAGE_URL],
  },
};

const SERVICES: readonly ServiceItem[] = [
  {
    title: "Business Fibre Internet",
    subtitle: "Symmetrical bandwidth. Controlled onboarding. Operator posture.",
    href: "/services/business-fibre-internet",
    bullets: ["AUREX 150 / 500 / GIG+", "On-net where available", "Structured activation"],
    tag: "AUREX Internet",
    group: "Connectivity",
    journey: "Ideal starting point for business sites moving into premium primary access.",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    subtitle: "Deterministic performance for critical sites and workloads.",
    href: "/services/dedicated-internet-access",
    bullets: ["Committed bandwidth options", "SLA-driven delivery", "Ideal for HQ + multi-site"],
    tag: "AUREX Internet",
    group: "Connectivity",
    journey:
      "Built for buyers who need committed performance, clean SLA posture, and predictable escalation.",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    subtitle: "Clean, managed networking that stays out of your way.",
    href: "/services/managed-lan-wifi",
    bullets: [
      "Business Wi-Fi architecture",
      "Segmentation + guest networks",
      "Operator-grade support",
    ],
    tag: "Managed Network",
    group: "Managed Network",
    journey:
      "Adds the operational layer after access is defined, reducing vendor sprawl at the site edge.",
  },
  {
    title: "LTE / 5G Continuity Architecture",
    subtitle: "Keep operations online during access disruptions.",
    href: "/services/lte-5g-continuity",
    bullets: [
      "Failover design patterns",
      "Primary/secondary pathways",
      "Business continuity posture",
    ],
    tag: "Continuity",
    group: "Continuity",
    journey:
      "For businesses that want resilience designed into the commercial conversation from day one.",
  },
  {
    title: "Starlink (Agent / Reseller)",
    subtitle: "Satellite connectivity where terrestrial options are limited.",
    href: "/services/starlink-agent",
    bullets: [
      "Agent/reseller model",
      "Use-cases + constraints explained",
      "Add-on continuity option",
    ],
    tag: "Agent Services",
    group: "Continuity",
    journey:
      "Useful in edge cases where terrestrial access is constrained and continuity still matters.",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle: "Place critical gear closer to the network edge.",
    href: "/services/colocation-infrastructure",
    bullets: [
      "Cross-connect guidance",
      "Rack/space coordination",
      "Infrastructure-grade approach",
    ],
    tag: "Infrastructure",
    group: "Infrastructure",
    journey:
      "Supports buyers planning for interconnectivity, edge infrastructure, or future network expansion.",
  },
  {
    title: "IoT Connectivity & Secure Uplinks",
    subtitle: "Purpose-built uplinks for sensors, gateways, and managed devices.",
    href: "/services/iot-connectivity",
    bullets: [
      "AUREX Smart positioning",
      "Secure uplink patterns",
      "Operational monitoring-ready",
    ],
    tag: "AUREX Smart",
    group: "Infrastructure",
    journey:
      "Designed for operational environments where device uptime, segmentation, and visibility matter.",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle: "Modern voice services for teams that need reliability and clarity.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice options", "Numbering + porting support", "Business-ready routing"],
    tag: "AUREX Voice",
    group: "Voice",
    journey:
      "Extends the customer stack beyond access into a branded communications layer.",
  },
  {
    title: "Static IP Routing",
    subtitle: "Addressing options for VPNs, servers, and fixed endpoints.",
    href: "/services/static-ip-routing",
    bullets: [
      "Static IP options (where available)",
      "Routing posture explained",
      "Best practices included",
    ],
    tag: "Operator Layer",
    group: "Infrastructure",
    journey:
      "A clean fit for businesses that need fixed endpoints, remote access, VPN coordination, or policy-based routing.",
  },
];

const GROUPS: readonly GroupItem[] = [
  {
    title: "Connectivity",
    eyebrow: "PRIMARY ACCESS",
    description:
      "Primary access services for business sites that need clean delivery, measured performance, and structured onboarding.",
  },
  {
    title: "Managed Network",
    eyebrow: "SITE LAYER",
    description:
      "Managed LAN and Wi-Fi layers designed to feel invisible in operation and dependable in practice.",
  },
  {
    title: "Continuity",
    eyebrow: "RESILIENCE",
    description:
      "Secondary-path and failover options for clients who want operational resilience without unnecessary complexity.",
  },
  {
    title: "Voice",
    eyebrow: "COMMUNICATIONS",
    description:
      "Professional cloud voice services aligned to a modern business operating posture and premium client experience.",
  },
  {
    title: "Infrastructure",
    eyebrow: "OPERATOR LAYER",
    description:
      "Operator-layer building blocks for routing, edge placement, IoT uplinks, and infrastructure coordination.",
  },
];

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

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href={service.href}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.055]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-36 w-36 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.24em] text-white/50">{service.tag}</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/66">{service.subtitle}</p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/68 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
            View
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {service.bullets.map((b) => (
            <span
              key={b}
              className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/64"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-5">
          <div className="text-[11px] tracking-[0.22em] text-white/42">BUYING JOURNEY FIT</div>
          <p className="mt-2 text-sm leading-6 text-white/60">{service.journey}</p>
        </div>
      </div>
    </Link>
  );
}

function GroupBlock({
  title,
  eyebrow,
  description,
  services,
}: {
  title: string;
  eyebrow: string;
  description: string;
  services: readonly ServiceItem[];
}) {
  return (
    <section className="mt-16 first:mt-0">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/40">{eyebrow}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/62 sm:text-[15px]">
            {description}
          </p>
        </div>

        <MetricPill label="MODULE COUNT" value={`${services.length} service modules`} />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.href} service={service} />
        ))}
      </div>
    </section>
  );
}

export default function ServicesIndexPage() {
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
        "@type": "ItemList",
        name: "Orbitlink Services",
        itemListElement: SERVICES.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: `${SITE_URL}${service.href}`,
        })),
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
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
          <div className="absolute inset-x-0 top-[28%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-0 right-0 top-[28%] h-[3px] w-52 bg-white/10 blur-md animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute left-[-10%] top-[34%] h-px w-[120%] bg-gradient-to-r from-transparent via-[#38FDFE]/25 to-transparent opacity-80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-7 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Tier-1 service surface
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="max-w-4xl">
                <div className="text-[11px] tracking-[0.30em] text-white/42">CONNECTIVITY • NETWORK • INFRASTRUCTURE</div>

                <h1 className="mt-4 text-[2.6rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.2rem] lg:leading-[0.98]">
                  Connectivity &
                  <span className="block text-white/62">Infrastructure Services</span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                  Orbitlink delivers business connectivity with disciplined commercial structure,
                  operator-grade delivery posture, and a premium onboarding model designed for
                  enterprises that value clarity, resilience, and clean execution.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "On-net where available",
                    "Structured onboarding",
                    "Documented delivery",
                    "Enterprise support posture",
                    "Controlled rollout",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/66"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                  >
                    Check Availability / Request Access
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    Review Trust & Delivery Posture
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <div className="text-[11px] tracking-[0.24em] text-white/50">BUYING POSTURE</div>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Enterprise buyers need clarity before speed
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    The services surface is designed to help buyers map modules to business
                    requirements first, then move into qualification, feasibility, and structured
                    onboarding.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <MetricPill label="STEP 1" value="Select service module" />
                    <MetricPill label="STEP 2" value="Confirm location and scope" />
                    <MetricPill label="STEP 3" value="Enter structured onboarding" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill
              label="COMMERCIAL MODEL"
              value="Scope-first qualification"
            />
            <MetricPill
              label="DELIVERY POSTURE"
              value="Documented, not improvised"
            />
            <MetricPill
              label="ENTERPRISE SIGNAL"
              value="Built for operational buyers"
            />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative rounded-[34px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.30em] text-white/42">BUYING JOURNEY</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                A service catalog designed to move buyers toward a clean decision
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                Start with primary access, add managed layers where needed, define resilience and
                voice posture, then align infrastructure requirements to the site. The result is a
                cleaner buying motion and a better implementation path.
              </p>
            </div>

            <MetricPill label="MODE" value="Clarity-first • Premium intake" />
          </div>
        </div>

        {GROUPS.map((group) => (
          <GroupBlock
            key={group.title}
            title={group.title}
            eyebrow={group.eyebrow}
            description={group.description}
            services={SERVICES.filter((s) => s.group === group.title)}
          />
        ))}

        <div className="mt-16 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035]">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-emerald-500/8 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.30em] text-white/42">NEXT STEP</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  Build the buying path the right way
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  If you are evaluating a site, start with your city or building context, then map
                  the service stack to operational requirements such as broadband vs DIA, managed
                  LAN, continuity posture, static IP needs, and escalation expectations.
                </p>
              </div>

              <MetricPill
                label="COMMERCIAL MODE"
                value="Structured qualification • Clean go-live"
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/locations/mississauga"
                className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
              >
                Ontario Coverage
              </Link>
              <Link
                href="/solutions"
                className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
              >
                Solutions Modules
              </Link>
              <Link
                href="/network"
                className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
              >
                Network
              </Link>
              <Link
                href="/contact#intake"
                className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}