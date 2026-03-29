// src/app/services/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { HTMLAttributes, ReactNode } from "react";

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
  bestFit: string;
};

type GroupItem = {
  title: ServiceGroup;
  description: string;
  eyebrow: string;
  id: string;
};

export const metadata: Metadata = {
  title: "Business Connectivity Services for Ontario Organizations | Orbitlink",
  description:
    "Explore Orbitlink business fibre internet, dedicated internet access, managed LAN and Wi-Fi, continuity services, cloud voice, static IP routing, IoT connectivity, and infrastructure services for Ontario business environments.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Connectivity Services for Ontario Organizations | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed networking, continuity services, cloud voice, and infrastructure services for Ontario business environments.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business connectivity services for Ontario organizations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Connectivity Services for Ontario Organizations | Orbitlink",
    description:
      "Business fibre, dedicated internet, managed networking, continuity, voice, and infrastructure services for Ontario businesses.",
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

const SERVICES: readonly ServiceItem[] = [
  {
    title: "Business Fibre Internet",
    subtitle:
      "Primary connectivity for offices, clinics, commercial units, and business sites that need dependable internet with a cleaner commercial path.",
    href: "/services/business-fibre-internet",
    bullets: ["Primary internet", "Address-qualified review", "Commercial onboarding"],
    tag: "PRIMARY CONNECTIVITY",
    group: "Connectivity",
    bestFit:
      "Best for business sites that need strong primary connectivity, clear qualification, and a more structured buying experience.",
  },
  {
    title: "Dedicated Internet Access",
    subtitle:
      "Higher-assurance connectivity for critical sites that require stronger performance expectations, cleaner escalation, and a more controlled service model.",
    href: "/services/dedicated-internet-access",
    bullets: ["Dedicated circuit", "Committed performance", "Critical environments"],
    tag: "HIGHER ASSURANCE",
    group: "Connectivity",
    bestFit:
      "Best for organizations that need more deterministic connectivity, clearer escalation handling, and stronger uptime expectations.",
  },
  {
    title: "Managed LAN & Wi-Fi",
    subtitle:
      "Managed internal networking for organizations that need better wireless coverage, segmentation, and more stable day-to-day operations across the site.",
    href: "/services/managed-lan-wifi",
    bullets: ["Managed Wi-Fi", "LAN support", "Segmentation"],
    tag: "MANAGED NETWORK",
    group: "Managed Network",
    bestFit:
      "Best for sites where internal network quality matters as much as the internet circuit itself.",
  },
  {
    title: "LTE / 5G Backup Connectivity",
    subtitle:
      "Continuity services for organizations that want failover readiness, secondary path planning, and stronger resilience when primary connectivity is disrupted.",
    href: "/services/lte-5g-continuity",
    bullets: ["Backup path", "Failover posture", "Continuity planning"],
    tag: "RESILIENCE",
    group: "Continuity",
    bestFit:
      "Best for businesses that want continuity planning built into the service model from the start.",
  },
  {
    title: "Starlink",
    subtitle:
      "Satellite connectivity for remote, constrained, or edge environments where terrestrial service is limited or continuity requires an alternative path.",
    href: "/services/starlink-agent",
    bullets: ["Satellite path", "Remote sites", "Alternative connectivity"],
    tag: "SATELLITE",
    group: "Continuity",
    bestFit:
      "Best for sites where standard terrestrial availability is constrained and business operations still require a viable connection path.",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle:
      "Business voice services for teams that need number porting, call routing, professional call handling, and stronger control over business communications.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice", "Number porting", "Call routing"],
    tag: "VOICE",
    group: "Voice",
    bestFit:
      "Best for organizations that want voice aligned with the rest of their business communications and network environment.",
  },
  {
    title: "IoT Connectivity",
    subtitle:
      "Controlled uplinks for gateways, sensors, field devices, and connected operational systems inside managed business environments.",
    href: "/services/iot-connectivity",
    bullets: ["IoT uplinks", "Segmentation", "Monitoring-ready"],
    tag: "CONNECTED SYSTEMS",
    group: "Infrastructure",
    bestFit:
      "Best for environments where connected systems need segmented and controlled service handling.",
  },
  {
    title: "Static IP Routing",
    subtitle:
      "Fixed addressing and routing options for VPNs, firewalls, hosted services, remote access, and stable business endpoints.",
    href: "/services/static-ip-routing",
    bullets: ["Static IPs", "Routing options", "Stable endpoints"],
    tag: "ROUTING",
    group: "Infrastructure",
    bestFit:
      "Best for businesses that need fixed endpoints for VPNs, firewall policy, remote access, or hosted business systems.",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle:
      "Infrastructure coordination for organizations planning rack presence, cross-connects, interconnection, or longer-term network architecture.",
    href: "/services/colocation-infrastructure",
    bullets: ["Cross-connects", "Rack coordination", "Infrastructure planning"],
    tag: "INFRASTRUCTURE",
    group: "Infrastructure",
    bestFit:
      "Best for buyers planning beyond standard connectivity into interconnection, infrastructure coordination, or future network presence.",
  },
];

const GROUPS: readonly GroupItem[] = [
  {
    title: "Connectivity",
    eyebrow: "PRIMARY ACCESS",
    description:
      "Internet services for organizations that need strong primary connectivity and a cleaner commercial starting point.",
    id: "connectivity",
  },
  {
    title: "Managed Network",
    eyebrow: "INTERNAL NETWORK",
    description:
      "Managed LAN and Wi-Fi services for businesses that need better internal stability, cleaner segmentation, and easier support.",
    id: "managed-network",
  },
  {
    title: "Continuity",
    eyebrow: "BACKUP & RESILIENCE",
    description:
      "Continuity services for organizations that want stronger uptime planning and alternative path resilience.",
    id: "continuity",
  },
  {
    title: "Voice",
    eyebrow: "COMMUNICATIONS",
    description:
      "Business voice services for teams that need professional call handling, routing flexibility, and cleaner communications control.",
    id: "voice",
  },
  {
    title: "Infrastructure",
    eyebrow: "ADVANCED SERVICES",
    description:
      "Routing, IoT, and infrastructure services for more technical and future-ready business environments.",
    id: "infrastructure",
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
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/42">{label}</div>
      <div className="mt-1 text-sm leading-5 text-white/82">{value}</div>
    </div>
  );
}

function Surface({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      {...props}
      className={[
        "rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-sm sm:rounded-[34px]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function TrustPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/72 sm:text-xs">
      {text}
    </span>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href={service.href}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.055] sm:rounded-[28px] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute right-0 top-8 h-36 w-36 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.24em] text-white/48 sm:text-[11px]">
              {service.tag}
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/64">{service.subtitle}</p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/66 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
            Open
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {service.bullets.map((b) => (
            <span
              key={b}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/62 sm:text-xs"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-5">
          <div className="text-[10px] tracking-[0.22em] text-white/40 sm:text-[11px]">
            BEST FOR
          </div>
          <p className="mt-2 text-sm leading-6 text-white/60">{service.bestFit}</p>
        </div>
      </div>
    </Link>
  );
}

function GroupBlock({
  title,
  eyebrow,
  description,
  id,
  services,
}: {
  title: string;
  eyebrow: string;
  description: string;
  id: string;
  services: readonly ServiceItem[];
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-28 first:mt-0 sm:mt-16">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/40 sm:text-[11px]">
            {eyebrow}
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/62 sm:text-[15px]">
            {description}
          </p>
        </div>

        <MetricPill label="SERVICES" value={`${services.length}`} />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.href} service={service} />
        ))}
      </div>
    </section>
  );
}

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <div className="flex flex-wrap items-center gap-2 text-sm text-white/52">
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        <span>/</span>
        <span className="text-white/76">Services</span>
      </div>
    </nav>
  );
}

function JumpNav() {
  return (
    <Surface className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            JUMP TO
          </div>
          <div className="mt-2 text-sm text-white/72">
            Go directly to the service family that matches the business need.
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/72 transition hover:bg-white/10 sm:text-xs"
            >
              {group.title}
            </a>
          ))}
          <a
            href="#faq"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/72 transition hover:bg-white/10 sm:text-xs"
          >
            FAQ
          </a>
        </div>
      </div>
    </Surface>
  );
}

function AudienceStrip() {
  const items = [
    "Professional offices",
    "Clinics",
    "Warehouses",
    "Commercial buildings",
    "Multi-site organizations",
  ];

  return (
    <Surface className="p-5 sm:p-8">
      <div className="max-w-3xl">
        <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
          WHO THIS PAGE IS FOR
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
          Built for serious commercial buyers
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
          This page is designed for organizations reviewing business connectivity,
          managed networking, continuity, voice, and infrastructure services in Ontario.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => (
          <TrustPill key={item} text={item} />
        ))}
      </div>
    </Surface>
  );
}

function QuickStartStrip() {
  const steps = [
    {
      label: "STEP 1",
      title: "Choose the business need",
      body: "Start with the real requirement: primary internet, dedicated connectivity, managed networking, continuity, voice, or infrastructure.",
    },
    {
      label: "STEP 2",
      title: "Add site and operating context",
      body: "Share the address, timeline, and the technical or operational requirements that matter to the organization.",
    },
    {
      label: "STEP 3",
      title: "Move into qualification",
      body: "Receive a clearer next step for serviceability, service fit, and commercial direction.",
    },
  ];

  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            HOW TO BUY
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            A cleaner path from service interest to commercial review
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Buyers do not need a maze of telecom pages. They need the right service,
            the right qualification path, and a clear next step.
          </p>
        </div>

        <MetricPill label="MODE" value="Clear • Practical • Business-ready" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.label}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
          >
            <div className="text-[10px] tracking-[0.22em] text-white/45 sm:text-[11px]">
              {step.label}
            </div>
            <div className="mt-3 text-sm font-medium text-white/90">{step.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{step.body}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function ComparisonBlock() {
  const rows = [
    {
      label: "Best for",
      fibre: "General business connectivity",
      dia: "Critical environments",
      wifi: "Internal coverage and stability",
      backup: "Continuity and failover",
    },
    {
      label: "When it makes sense",
      fibre: "Primary internet for business sites",
      dia: "Higher-assurance service expectations",
      wifi: "Wireless performance is limiting operations",
      backup: "Downtime creates operational risk",
    },
    {
      label: "Main benefit",
      fibre: "Strong primary access",
      dia: "More predictable performance",
      wifi: "Better day-to-day user experience",
      backup: "Secondary path resilience",
    },
    {
      label: "Typical concern",
      fibre: "Building and service fit",
      dia: "Commercial model and escalation",
      wifi: "Coverage and segmentation",
      backup: "Failover readiness",
    },
  ];

  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            HOW TO CHOOSE
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Compare the main service paths quickly
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            This is the fastest way to understand which category fits the business objective before moving deeper into review.
          </p>
        </div>

        <MetricPill label="BUYER TOOL" value="Fast self-qualification" />
      </div>

      <div className="mt-7 overflow-x-auto">
        <div className="min-w-[760px] rounded-[24px] border border-white/10 bg-black/20 sm:rounded-[26px]">
          <div className="grid grid-cols-5 border-b border-white/10">
            <div className="p-4 text-[10px] tracking-[0.22em] text-white/40 sm:text-[11px]">
              COMPARE
            </div>
            <div className="p-4 text-sm font-medium text-white/90">Business Fibre</div>
            <div className="p-4 text-sm font-medium text-white/90">Dedicated Internet</div>
            <div className="p-4 text-sm font-medium text-white/90">Managed Wi-Fi</div>
            <div className="p-4 text-sm font-medium text-white/90">Backup Connectivity</div>
          </div>

          {rows.map((row, idx) => (
            <div
              key={row.label}
              className={[
                "grid grid-cols-5",
                idx !== rows.length - 1 ? "border-b border-white/10" : "",
              ].join(" ")}
            >
              <div className="p-4 text-sm text-white/82">{row.label}</div>
              <div className="p-4 text-sm text-white/62">{row.fibre}</div>
              <div className="p-4 text-sm text-white/62">{row.dia}</div>
              <div className="p-4 text-sm text-white/62">{row.wifi}</div>
              <div className="p-4 text-sm text-white/62">{row.backup}</div>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}

function BuyerIntentStrip() {
  const items = [
    "Service selected without building fit",
    "No backup path for continuity needs",
    "Internal Wi-Fi treated as an afterthought",
    "Wrong access model for the actual workload",
  ];

  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            COMMON BUYER MISTAKES
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Why businesses end up on the wrong service
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Most mismatches happen because the decision starts with a package instead of the site, the workload, and the operational context.
          </p>
        </div>

        <MetricPill label="VALUE" value="Better fit • Less rework" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
          >
            <div className="text-sm font-medium text-white/88">{item}</div>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function MidPageCTA() {
  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            NEED HELP CHOOSING?
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Not sure which service fits?
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Start with a service review. Orbitlink can help narrow the right path based on the address, business need, and operating requirements.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Request a Service Review
          </Link>
          <Link
            href="/contact#intake"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Request Pricing
          </Link>
        </div>
      </div>
    </Surface>
  );
}

function DecisionStrip() {
  const items = [
    {
      title: "Start with service fit",
      body:
        "The right buying path starts with the environment, not with generic package language.",
    },
    {
      title: "Qualify by address and scope",
      body:
        "Availability and delivery posture become clearer when requests include site and operating context early.",
    },
    {
      title: "Reduce mismatch risk",
      body:
        "Structured service selection helps avoid choosing the wrong access model for the real business need.",
    },
    {
      title: "Move faster with clarity",
      body:
        "Commercial discussions improve when the service path is already aligned to the site and the workload.",
    },
  ];

  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            DECISION SUPPORT
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            This page is built to help buyers choose correctly
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            The goal is not only to show what Orbitlink offers. It is to help serious buyers identify the right service model before moving into pricing and qualification.
          </p>
        </div>

        <MetricPill label="BUYER OUTCOME" value="Better fit • Less friction" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
          >
            <div className="text-sm font-medium text-white/90">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function ValueStrip() {
  const items = [
    {
      title: "Business-first qualification",
      body:
        "Orbitlink is positioned around commercial fit, site conditions, and operational relevance instead of generic consumer-style intake.",
    },
    {
      title: "Stronger service matching",
      body:
        "Fibre, dedicated access, managed networking, continuity, voice, and infrastructure are mapped to real business requirements.",
    },
    {
      title: "Cleaner commercial process",
      body:
        "The buying experience is designed to feel structured, accountable, and easier to understand for serious buyers.",
    },
    {
      title: "Better next-step clarity",
      body:
        "Organizations move faster when the path from service interest to qualification is obvious and business-readable.",
    },
  ];

  return (
    <Surface className="border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-[#FDE68A] sm:text-[11px]">
            WHY THIS PAGE WORKS FOR SERIOUS BUYERS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            More than a service catalog
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
            Serious buyers need more than a list. They need a service structure that helps them understand fit, move into qualification, and trust the next step.
          </p>
        </div>

        <MetricPill label="BUYER SIGNAL" value="Fit • Confidence • Action" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
          >
            <div className="text-sm font-medium text-white/90">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function FAQStrip() {
  const items = [
    {
      q: "How do I choose between business fibre and dedicated internet access?",
      a: "Business fibre is often the right fit for general business connectivity, while dedicated internet access is better for environments that need stronger performance posture, cleaner escalation, and higher service expectations.",
    },
    {
      q: "Can I use this page to start a pricing request?",
      a: "Yes. Start with the service category that best matches the business need, then move into qualification using the address, timing, and operational requirements.",
    },
    {
      q: "Is this page for residential internet?",
      a: "No. Orbitlink’s services page is designed for commercial buyers, business locations, and Ontario operational environments.",
    },
    {
      q: "What happens after I pick a service?",
      a: "The next step is to submit the business location and service requirements so Orbitlink can review availability, fit, and the clearest commercial path forward.",
    },
  ];

  return (
    <Surface id="faq" className="scroll-mt-28 p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Questions buyers commonly ask on the services page
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            These answers help business buyers understand the service categories before moving into qualification.
          </p>
        </div>

        <MetricPill label="SEO + CLARITY" value="Useful for buyers and search" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[26px]"
          >
            <h3 className="text-sm font-medium text-white/90">{item.q}</h3>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.a}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function FinalCTA() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] sm:rounded-[34px]">
      <div className="relative p-5 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
              NEXT STEP
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Move from service browsing to a qualified commercial conversation
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Start with the address, operating requirements, and the service priority. Orbitlink can then review fit, availability, and the clearest next step.
            </p>
          </div>

          <MetricPill label="COMMERCIAL MODE" value="Availability • Fit • Direction" />
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability
          </Link>
          <Link
            href="/locations"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
          >
            View Locations
          </Link>
          <Link
            href="/solutions"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
          >
            View Solutions
          </Link>
          <Link
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/10"
          >
            View Network
          </Link>
        </div>

        <div className="mt-5 text-xs text-white/55 sm:text-sm">
          Best results come from choosing the primary service first, then submitting the exact business address and timing requirement.
        </div>
      </div>
    </div>
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
        "@type": "WebPage",
        name: "Orbitlink Services",
        url: PAGE_URL,
        description:
          "Business fibre internet, dedicated internet access, managed networking, continuity services, cloud voice, and infrastructure services for Ontario organizations.",
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
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I choose between business fibre and dedicated internet access?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Business fibre is often the right fit for general business connectivity, while dedicated internet access is better for environments that need stronger performance posture, cleaner escalation, and higher service expectations.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use this page to start a pricing request?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Start with the service category that best matches the business need, then move into qualification using the address, timing, and operational requirements.",
            },
          },
          {
            "@type": "Question",
            name: "Is this page for residential internet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Orbitlink’s services page is designed for commercial buyers, business locations, and Ontario operational environments.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I pick a service?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The next step is to submit the business location and service requirements so Orbitlink can review availability, fit, and the clearest commercial path forward.",
            },
          },
        ],
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
        <div className="absolute inset-0">
          <Image
            src="/images/services-hero-business-connectivity.jpg"
            alt="Modern business environment with subtle enterprise network infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.46)_0%,rgba(4,7,12,0.66)_36%,rgba(4,7,12,0.90)_78%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.94)_0%,rgba(4,7,12,0.60)_34%,rgba(4,7,12,0.16)_66%,rgba(4,7,12,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(250,204,21,0.07),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.09),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-center px-5 pb-10 pt-24 sm:px-7 sm:min-h-[58svh] sm:pb-12 sm:pt-22 lg:min-h-[56svh] lg:px-10 lg:pb-14 lg:pt-20">
          <div className="w-full max-w-[46rem]">
            <Breadcrumbs />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/76 backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Ontario Business Connectivity Services
            </div>

            <h1 className="mt-5 max-w-4xl text-[2rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              Connectivity engineered
              <span className="block text-white/62">for real business operations</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/80 sm:text-[15px]">
              Explore business fibre internet, dedicated internet access, managed LAN and Wi-Fi, backup connectivity, voice, and infrastructure services for Ontario organizations. Start with the service that fits the site, then move into availability, fit, and commercial review..
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Business fibre", "Dedicated internet", "Managed Wi-Fi", "Backup"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/68 sm:text-xs"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability
              </Link>

              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Request Pricing
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Business-only review • Address-based qualification
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative space-y-5 sm:space-y-6">
          <JumpNav />
          <AudienceStrip />
          <QuickStartStrip />
          <ComparisonBlock />
          <BuyerIntentStrip />

          {GROUPS.map((group) => (
            <GroupBlock
              key={group.title}
              id={group.id}
              title={group.title}
              eyebrow={group.eyebrow}
              description={group.description}
              services={SERVICES.filter((s) => s.group === group.title)}
            />
          ))}

          <MidPageCTA />
          <DecisionStrip />
          <ValueStrip />
          <FAQStrip />
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}