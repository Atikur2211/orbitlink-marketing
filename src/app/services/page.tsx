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
    journey: "Built for buyers who need committed performance, clean SLA posture, and predictable escalation.",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    subtitle: "Clean, managed networking that stays out of your way.",
    href: "/services/managed-lan-wifi",
    bullets: ["Business Wi-Fi architecture", "Segmentation + guest networks", "Operator-grade support"],
    tag: "Managed Network",
    group: "Managed Network",
    journey: "Adds the operational layer after access is defined, reducing vendor sprawl at the site edge.",
  },
  {
    title: "LTE / 5G Continuity Architecture",
    subtitle: "Keep operations online during access disruptions.",
    href: "/services/lte-5g-continuity",
    bullets: ["Failover design patterns", "Primary/secondary pathways", "Business continuity posture"],
    tag: "Continuity",
    group: "Continuity",
    journey: "For businesses that want resilience designed into the commercial conversation from day one.",
  },
  {
    title: "Starlink (Agent / Reseller)",
    subtitle: "Satellite connectivity where terrestrial options are limited.",
    href: "/services/starlink-agent",
    bullets: ["Agent/reseller model", "Use-cases + constraints explained", "Add-on continuity option"],
    tag: "Agent Services",
    group: "Continuity",
    journey: "Useful in edge cases where terrestrial access is constrained and continuity still matters.",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle: "Place critical gear closer to the network edge.",
    href: "/services/colocation-infrastructure",
    bullets: ["Cross-connect guidance", "Rack/space coordination", "Infrastructure-grade approach"],
    tag: "Infrastructure",
    group: "Infrastructure",
    journey: "Supports buyers planning for interconnectivity, edge infrastructure, or future network expansion.",
  },
  {
    title: "IoT Connectivity & Secure Uplinks",
    subtitle: "Purpose-built uplinks for sensors, gateways, and managed devices.",
    href: "/services/iot-connectivity",
    bullets: ["AUREX Smart positioning", "Secure uplink patterns", "Operational monitoring-ready"],
    tag: "AUREX Smart",
    group: "Infrastructure",
    journey: "Designed for operational environments where device uptime, segmentation, and visibility matter.",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle: "Modern voice services for teams that need reliability and clarity.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice options", "Numbering + porting support", "Business-ready routing"],
    tag: "AUREX Voice",
    group: "Voice",
    journey: "Extends the customer stack beyond access into a branded communications layer.",
  },
  {
    title: "Static IP Routing",
    subtitle: "Addressing options for VPNs, servers, and fixed endpoints.",
    href: "/services/static-ip-routing",
    bullets: ["Static IP options (where available)", "Routing posture explained", "Best practices included"],
    tag: "Operator Layer",
    group: "Infrastructure",
    journey: "A clean fit for businesses that need fixed endpoints, remote access, VPN coordination, or policy-based routing.",
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

function StatCard({
  eyebrow,
  value,
  note,
}: {
  eyebrow: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
      <div className="text-[11px] tracking-[0.24em] text-white/50">{eyebrow}</div>
      <div className="mt-3 text-lg font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{note}</p>
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href={service.href}
      className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.22em] text-white/55">{service.tag}</div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/68">{service.subtitle}</p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/70 transition group-hover:border-white/20 group-hover:bg-white/10">
          View
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {service.bullets.map((b) => (
          <span
            key={b}
            className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/68"
          >
            {b}
          </span>
        ))}
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-5">
        <div className="text-[11px] tracking-[0.22em] text-white/45">BUYING JOURNEY FIT</div>
        <p className="mt-2 text-sm leading-6 text-white/63">{service.journey}</p>
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
    <section className="mt-12 first:mt-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/45">{eyebrow}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/50">MODULE COUNT</div>
          <div className="mt-1 text-sm text-white/80">{services.length} service modules</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Operator-grade service modules
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Connectivity & Infrastructure Services
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Orbitlink delivers business connectivity with a disciplined commercial and operational
                posture — structured onboarding, documented delivery, enterprise-minded support, and
                conservative public claims aligned to real deployment scope.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "On-net where available",
                  "Structured onboarding",
                  "Documented delivery",
                  "Enterprise support posture",
                  "Controlled rollout",
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
                  Check Availability / Request Access
                </Link>
                <Link
                  href="/trust"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Review Trust & Delivery Posture
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] tracking-[0.22em] text-white/55">BUYING POSTURE</div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Enterprise buyers need clarity before speed
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  The services catalog is designed to help buyers map service modules to business
                  requirements first, then move into qualification, location review, and structured
                  onboarding.
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    1. Select service module
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    2. Confirm location and scope
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    3. Enter structured onboarding
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              eyebrow="COMMERCIAL MODEL"
              value="Scope-first qualification"
              note="The buying process is built to reduce ambiguity before deployment begins."
            />
            <StatCard
              eyebrow="DELIVERY POSTURE"
              value="Documented, not improvised"
              note="Modules are introduced through structured scoping, acceptance, and rollout discipline."
            />
            <StatCard
              eyebrow="ENTERPRISE SIGNAL"
              value="Built for operational buyers"
              note="Designed for IT leaders, operations teams, property stakeholders, and procurement review."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">BUYING JOURNEY</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                A service catalog designed to move buyers toward a clean decision
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Start with primary access, add managed layers where needed, define resilience and
                voice posture, then align infrastructure requirements to the site. The result is a
                cleaner buying motion and a better implementation path.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
              <div className="mt-1 text-sm text-white/80">Clarity-first • Premium intake</div>
            </div>
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

        <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">NEXT STEP</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Build the buying path the right way
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                If you are evaluating a site, start with your city or building context, then map the
                service stack to operational requirements such as broadband vs DIA, managed LAN,
                continuity posture, static IP needs, and escalation expectations.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL MODE</div>
              <div className="mt-1 text-sm text-white/80">
                Structured qualification • Clean go-live
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/locations/mississauga"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Ontario Coverage
            </Link>
            <Link
              href="/solutions"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Solutions Modules
            </Link>
            <Link
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
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
      </section>
    </div>
  );
}