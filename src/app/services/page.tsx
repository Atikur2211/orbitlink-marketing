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
    "Business fibre, dedicated internet access, managed LAN and Wi-Fi, continuity architecture, voice, IoT uplinks, colocation, and static IP routing for organizations across Ontario.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Services | Orbitlink™",
    description:
      "Business Fibre, Dedicated Internet Access, Managed LAN & Wi-Fi, continuity, voice, IoT, colocation, and routing services for organizations across Ontario.",
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
      "Business connectivity and infrastructure services with structured onboarding and measured delivery.",
    images: [TWITTER_IMAGE_URL],
  },
};

const SERVICES: readonly ServiceItem[] = [
  {
    title: "Business Fibre Internet",
    subtitle: "Primary business connectivity with symmetrical speed options and structured onboarding.",
    href: "/services/business-fibre-internet",
    bullets: ["AUREX 150 / 500 / GIG+", "On-net where available", "Address-qualified intake"],
    tag: "AUREX Internet",
    group: "Connectivity",
    journey: "A strong primary access option for business sites that want premium connectivity without mass-market handling.",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    subtitle: "Committed connectivity for critical environments, core offices, and multi-site operations.",
    href: "/services/dedicated-internet-access",
    bullets: ["Committed bandwidth options", "SLA-oriented delivery", "Built for critical sites"],
    tag: "AUREX Internet",
    group: "Connectivity",
    journey: "Best for organizations that need clearer performance expectations, cleaner escalation, and a more controlled service posture.",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    subtitle: "Managed internal networking designed for stability, segmentation, and cleaner site operations.",
    href: "/services/managed-lan-wifi",
    bullets: [
      "Business Wi-Fi design",
      "Segmentation + guest access",
      "Managed support posture",
    ],
    tag: "Managed Network",
    group: "Managed Network",
    journey: "Adds the site-side network layer after access is defined, reducing operational friction and vendor sprawl.",
  },
  {
    title: "LTE / 5G Continuity Architecture",
    subtitle: "Secondary-path design to help keep operations online during primary access disruption.",
    href: "/services/lte-5g-continuity",
    bullets: [
      "Failover design patterns",
      "Primary / secondary path planning",
      "Business continuity fit",
    ],
    tag: "Continuity",
    group: "Continuity",
    journey: "A strong fit for buyers who want resilience included in the commercial conversation from the start.",
  },
  {
    title: "Starlink (Agent / Reseller)",
    subtitle: "Satellite connectivity for sites where terrestrial options are limited or continuity still matters.",
    href: "/services/starlink-agent",
    bullets: [
      "Agent / reseller model",
      "Use-cases + constraints",
      "Continuity-oriented option",
    ],
    tag: "Agent Services",
    group: "Continuity",
    journey: "Useful in edge cases where terrestrial access is constrained and business operations still need a viable path.",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle: "Infrastructure support for buyers planning edge presence, cross-connects, or future interconnection.",
    href: "/services/colocation-infrastructure",
    bullets: [
      "Cross-connect guidance",
      "Rack / space coordination",
      "Infrastructure-led planning",
    ],
    tag: "Infrastructure",
    group: "Infrastructure",
    journey: "Built for organizations that are planning beyond simple internet access and need cleaner infrastructure coordination.",
  },
  {
    title: "IoT Connectivity & Secure Uplinks",
    subtitle: "Purpose-built uplinks for devices, gateways, sensors, and managed operational environments.",
    href: "/services/iot-connectivity",
    bullets: [
      "AUREX Smart positioning",
      "Secure uplink patterns",
      "Monitoring-ready posture",
    ],
    tag: "AUREX Smart",
    group: "Infrastructure",
    journey: "Designed for environments where uptime, segmentation, device visibility, and controlled uplinks matter.",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle: "Professional voice services for organizations that need clean routing and reliable communications.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice options", "Numbering + porting support", "Business-ready routing"],
    tag: "AUREX Voice",
    group: "Voice",
    journey: "Extends the service stack into a business communications layer that feels aligned with the rest of the Orbitlink operating model.",
  },
  {
    title: "Static IP Routing",
    subtitle: "Fixed addressing options for VPNs, firewalls, remote access, servers, and stable endpoints.",
    href: "/services/static-ip-routing",
    bullets: [
      "Static IP options where available",
      "Routing posture explained",
      "Best-practice guidance",
    ],
    tag: "Operator Layer",
    group: "Infrastructure",
    journey: "A clean fit for businesses that require fixed endpoints, VPN coordination, remote access, or policy-based routing.",
  },
];

const GROUPS: readonly GroupItem[] = [
  {
    title: "Connectivity",
    eyebrow: "PRIMARY ACCESS",
    description:
      "Primary access services for business sites that need clearer qualification, cleaner activation, and more disciplined delivery.",
  },
  {
    title: "Managed Network",
    eyebrow: "SITE NETWORK",
    description:
      "Managed LAN and Wi-Fi layers designed to reduce internal complexity and support cleaner day-to-day operations.",
  },
  {
    title: "Continuity",
    eyebrow: "RESILIENCE",
    description:
      "Secondary-path and failover options for organizations that want resilience built into the service design from the beginning.",
  },
  {
    title: "Voice",
    eyebrow: "COMMUNICATIONS",
    description:
      "Professional voice services aligned to a premium business operating posture and modern communications expectations.",
  },
  {
    title: "Infrastructure",
    eyebrow: "OPERATOR LAYER",
    description:
      "Operator-layer services for routing, edge infrastructure, IoT uplinks, and interconnect-oriented planning.",
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

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[32px] border border-white/10 bg-white/[0.035]",
        className,
      ].join(" ")}
    >
      {children}
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
          <div className="text-[11px] tracking-[0.22em] text-white/42">BEST FIT</div>
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

function BuyerOutcomesStrip() {
  const items = [
    {
      title: "Clearer service selection",
      body: "Buyers can quickly separate primary access, managed network layers, continuity, voice, and infrastructure needs.",
    },
    {
      title: "Better qualification before go-live",
      body: "The page encourages address, scope, and operational requirements to be identified before activation discussions move forward.",
    },
    {
      title: "Cleaner implementation path",
      body: "A more structured service map helps reduce confusion between internet access, site networking, resilience, and communications.",
    },
    {
      title: "More enterprise confidence",
      body: "The service catalog reads like a provider with operating discipline, not a generic plan list or reseller menu.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">BUSINESS OUTCOMES</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            What this service structure means for buyers
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Orbitlink’s services page is designed to help organizations understand what they
            actually need before procurement, implementation, and escalation expectations are set.
          </p>
        </div>

        <MetricPill label="MODE" value="Clarity-first • Buyer-readable" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function ServiceAssuranceModel() {
  const items = [
    {
      title: "Before qualification",
      body: "Service discussions begin with business address, site context, and the actual operating requirement rather than generic package pushing.",
    },
    {
      title: "During solution design",
      body: "Primary access, internal network layers, continuity, and communications can be separated and then combined intentionally.",
    },
    {
      title: "Before activation",
      body: "Availability, scope, and support posture are confirmed before implementation expectations are set.",
    },
    {
      title: "After deployment",
      body: "The client has a cleaner understanding of what was delivered, what is managed, and how escalation should work.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">SERVICE ASSURANCE MODEL</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            A structured path from service selection to operational use
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Mature telecom providers do not only sell services. They help buyers move from scope
            definition to cleaner implementation. This layer makes Orbitlink feel larger, more
            structured, and more accountable.
          </p>
        </div>

        <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner delivery" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function EnterpriseReadinessStrip() {
  const items = [
    "Address-qualified service discussions",
    "Primary access and DIA clearly separated",
    "Managed LAN and Wi-Fi shown as a distinct site layer",
    "Continuity options positioned as resilience, not upsell clutter",
    "Voice positioned as part of the operating stack",
    "Infrastructure services included for future-ready buyers",
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">ENTERPRISE READINESS</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Designed for buyers who need more than generic internet plans
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Orbitlink is positioned for organizations that want qualified service discussions,
            cleaner implementation logic, and a more disciplined commercial experience.
          </p>
        </div>

        <MetricPill label="FIT" value="Business-first • Infrastructure-minded" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/72"
          >
            {item}
          </div>
        ))}
      </div>
    </Surface>
  );
}

function BuyingPathStrip() {
  const steps = [
    {
      label: "STEP 1",
      title: "Choose the service layer",
      body: "Start with the service category that matches the business requirement: primary access, internal network, continuity, voice, or infrastructure.",
    },
    {
      label: "STEP 2",
      title: "Confirm site and operating scope",
      body: "Define the service address, user count, building context, and any technical requirements such as static IP, managed Wi-Fi, or failover.",
    },
    {
      label: "STEP 3",
      title: "Move into qualification and onboarding",
      body: "Once fit and availability are clearer, the conversation moves into structured intake, feasibility review, and cleaner delivery planning.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">BUYING PATH</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            A cleaner path from browsing to qualification
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            The page is designed to help buyers understand what to request, what to clarify, and
            how to move toward a more accurate go-live conversation.
          </p>
        </div>

        <MetricPill label="COMMERCIAL MODE" value="Structured qualification" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.label} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/45">{step.label}</div>
            <div className="mt-3 text-sm font-medium text-white/90">{step.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{step.body}</p>
          </div>
        ))}
      </div>
    </Surface>
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
              Structured business services
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="max-w-4xl">
                <div className="text-[11px] tracking-[0.30em] text-white/42">
                  CONNECTIVITY • NETWORK • CONTINUITY • VOICE • INFRASTRUCTURE
                </div>

                <h1 className="mt-4 text-[2.6rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.2rem] lg:leading-[0.98]">
                  Business Connectivity &
                  <span className="block text-white/62">Infrastructure Services</span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                  Orbitlink organizes services the way serious business buyers evaluate them:
                  primary access first, managed network layers where needed, continuity where
                  resilience matters, voice where communications matter, and infrastructure where
                  long-term network planning matters.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Address-qualified intake",
                    "Structured onboarding",
                    "Primary access and DIA separated clearly",
                    "Managed network layers explained simply",
                    "Resilience positioned intentionally",
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
                    Request Availability
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
                    Buyers need service clarity before they compare providers
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    This page is designed to help organizations understand what they actually need,
                    how those service layers fit together, and what should be qualified before
                    activation discussions begin.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <MetricPill label="STEP 1" value="Choose the service layer" />
                    <MetricPill label="STEP 2" value="Confirm address and scope" />
                    <MetricPill label="STEP 3" value="Move into structured qualification" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="COMMERCIAL MODEL" value="Scope-first qualification" />
            <MetricPill label="DELIVERY POSTURE" value="Documented, not improvised" />
            <MetricPill label="ENTERPRISE SIGNAL" value="Built for operational buyers" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative space-y-6">
          <BuyerOutcomesStrip />
          <BuyingPathStrip />
          <ServiceAssuranceModel />
          <EnterpriseReadinessStrip />

          <Surface className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.30em] text-white/42">SERVICE STRUCTURE</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
                  A service catalog designed to move buyers toward a cleaner decision
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Start with primary access, add managed network layers where needed, define
                  resilience and voice requirements, then align infrastructure needs to the site.
                  The result is a clearer buying motion and a stronger implementation path.
                </p>
              </div>

              <MetricPill label="MODE" value="Clarity-first • Premium intake" />
            </div>
          </Surface>

          {GROUPS.map((group) => (
            <GroupBlock
              key={group.title}
              title={group.title}
              eyebrow={group.eyebrow}
              description={group.description}
              services={SERVICES.filter((s) => s.group === group.title)}
            />
          ))}

          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035]">
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
                    Move from service browsing to a qualified conversation
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Start with your address or building context, then define the service stack
                    against actual requirements such as broadband vs DIA, managed LAN, continuity,
                    static IP needs, and escalation expectations.
                  </p>
                </div>

                <MetricPill
                  label="COMMERCIAL MODE"
                  value="Structured qualification • Cleaner go-live"
                />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/locations/mississauga"
                  className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
                >
                  Ontario Availability
                </Link>
                <Link
                  href="/solutions"
                  className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
                >
                  Solutions
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
                  Request Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}