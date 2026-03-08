// src/app/services/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/services`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

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

const SERVICES = [
  {
    title: "Business Fibre Internet",
    subtitle: "Symmetrical bandwidth. Controlled onboarding. Operator posture.",
    href: "/services/business-fibre-internet",
    bullets: ["AUREX 150 / 500 / GIG+", "On-net where available", "Structured activation"],
    tag: "AUREX Internet",
    group: "Connectivity",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    subtitle: "Deterministic performance for critical sites and workloads.",
    href: "/services/dedicated-internet-access",
    bullets: ["Committed bandwidth options", "SLA-driven delivery", "Ideal for HQ + multi-site"],
    tag: "AUREX Internet",
    group: "Connectivity",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    subtitle: "Clean, managed networking that stays out of your way.",
    href: "/services/managed-lan-wifi",
    bullets: ["Business Wi-Fi architecture", "Segmentation + guest networks", "Operator-grade support"],
    tag: "Managed Network",
    group: "Managed Network",
  },
  {
    title: "LTE / 5G Continuity Architecture",
    subtitle: "Keep operations online during access disruptions.",
    href: "/services/lte-5g-continuity",
    bullets: ["Failover design patterns", "Primary/secondary pathways", "Business continuity posture"],
    tag: "Continuity",
    group: "Continuity",
  },
  {
    title: "Starlink (Agent / Reseller)",
    subtitle: "Satellite connectivity where terrestrial options are limited.",
    href: "/services/starlink-agent",
    bullets: ["Agent/reseller model", "Use-cases + constraints explained", "Add-on continuity option"],
    tag: "Agent Services",
    group: "Continuity",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle: "Place critical gear closer to the network edge.",
    href: "/services/colocation-infrastructure",
    bullets: ["Cross-connect guidance", "Rack/space coordination", "Infrastructure-grade approach"],
    tag: "Infrastructure",
    group: "Infrastructure",
  },
  {
    title: "IoT Connectivity & Secure Uplinks",
    subtitle: "Purpose-built uplinks for sensors, gateways, and managed devices.",
    href: "/services/iot-connectivity",
    bullets: ["AUREX Smart positioning", "Secure uplink patterns", "Operational monitoring-ready"],
    tag: "AUREX Smart",
    group: "Infrastructure",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle: "Modern voice services for teams that need reliability and clarity.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice options", "Numbering + porting support", "Business-ready routing"],
    tag: "AUREX Voice",
    group: "Voice",
  },
  {
    title: "Static IP Routing",
    subtitle: "Addressing options for VPNs, servers, and fixed endpoints.",
    href: "/services/static-ip-routing",
    bullets: ["Static IP options (where available)", "Routing posture explained", "Best practices included"],
    tag: "Operator Layer",
    group: "Infrastructure",
  },
] as const;

const GROUPS = [
  {
    title: "Connectivity",
    description:
      "Primary access services for business sites that need clean delivery, measured performance, and structured onboarding.",
  },
  {
    title: "Managed Network",
    description:
      "Managed LAN and Wi-Fi layers designed to feel invisible in operation and dependable in practice.",
  },
  {
    title: "Continuity",
    description:
      "Secondary-path and failover options for clients who want operational resilience without noise.",
  },
  {
    title: "Voice",
    description:
      "Professional cloud voice services that align with a modern business operating posture.",
  },
  {
    title: "Infrastructure",
    description:
      "Operator-layer building blocks for routing, edge placement, IoT uplinks, and infrastructure coordination.",
  },
] as const;

function ServiceCard({
  title,
  subtitle,
  href,
  bullets,
  tag,
}: {
  title: string;
  subtitle: string;
  href: string;
  bullets: readonly string[];
  tag: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.22em] text-white/55">{tag}</div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white transition group-hover:text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/68">{subtitle}</p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/70">
          View
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <ul className="mt-5 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-white/70">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}

function GroupBlock({
  title,
  description,
  services,
}: {
  title: string;
  description: string;
  services: typeof SERVICES;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/45">{title.toUpperCase()}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((s) => (
          <ServiceCard
            key={s.href}
            title={s.title}
            subtitle={s.subtitle}
            href={s.href}
            bullets={s.bullets}
            tag={s.tag}
          />
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

        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pb-14 sm:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
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
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] tracking-[0.22em] text-white/55">BUYING POSTURE</div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Enterprise buyers need clarity before speed
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  The services catalog is designed to help buyers map service modules to business
                  needs first, then move into qualification, location review, and onboarding.
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        {GROUPS.map((group) => (
          <GroupBlock
            key={group.title}
            title={group.title}
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
    </main>
  );
}