import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { HTMLAttributes, ReactNode } from "react";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc.";
const BRAND_PHONE_E164 = "+18888672480";
const PAGE_URL = `${SITE_URL}/services`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const SERVICE_ID = `${PAGE_URL}#service`;
const ITEMLIST_ID = `${PAGE_URL}#itemlist`;
const FAQ_ID = `${PAGE_URL}#faq`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;

const PAGE_TITLE = "Business Connectivity Services in Ontario";
const PAGE_DESCRIPTION =
  "Business internet, dedicated fibre, managed Wi-Fi, voice, and backup connectivity for Ontario companies. Explore services and check availability.";

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
  typicalFit: string;
};

type GroupItem = {
  title: ServiceGroup;
  description: string;
  eyebrow: string;
  id: string;
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
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
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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
      "Fast, reliable primary internet for offices, clinics, warehouses, and commercial locations.",
    href: "/services/business-fibre-internet",
    bullets: ["Primary internet", "Business locations", "Fast onboarding"],
    tag: "PRIMARY INTERNET",
    group: "Connectivity",
    bestFit:
      "Best for daily business use, stable connectivity, and straightforward service needs.",
    typicalFit: "Office • Clinic • Commercial unit • Daily operations",
  },
  {
    title: "Dedicated Internet Access",
    subtitle:
      "Higher-assurance internet for sites that need stronger uptime and more predictable performance.",
    href: "/services/dedicated-internet-access",
    bullets: ["Dedicated circuit", "Predictable performance", "Critical sites"],
    tag: "HIGHER ASSURANCE",
    group: "Connectivity",
    bestFit:
      "Best for businesses that need stronger uptime, cleaner escalation, and more controlled service.",
    typicalFit: "Critical site • Multi-site operations • High-dependency workloads",
  },
  {
    title: "Managed LAN and Wi-Fi",
    subtitle:
      "Managed internal networking for better Wi-Fi coverage, segmentation, and day-to-day performance.",
    href: "/services/managed-lan-wifi",
    bullets: ["Managed Wi-Fi", "LAN support", "Segmentation"],
    tag: "MANAGED NETWORK",
    group: "Managed Network",
    bestFit:
      "Best for businesses where internal Wi-Fi and network quality affect staff, devices, and operations.",
    typicalFit: "Office floor • Clinic • Warehouse • Multi-room spaces",
  },
  {
    title: "LTE / 5G Backup Connectivity",
    subtitle:
      "Backup internet for businesses that want failover protection and better continuity.",
    href: "/services/lte-5g-continuity",
    bullets: ["Backup path", "Failover", "Business continuity"],
    tag: "BACKUP",
    group: "Continuity",
    bestFit:
      "Best for businesses that want a second path ready when the primary connection goes down.",
    typicalFit: "Critical access • Backup path • Continuity-focused sites",
  },
  {
    title: "Starlink",
    subtitle:
      "Satellite connectivity for remote sites, constrained locations, or alternative path needs.",
    href: "/services/starlink-agent",
    bullets: ["Satellite service", "Remote sites", "Alternative path"],
    tag: "SATELLITE",
    group: "Continuity",
    bestFit:
      "Best for sites where standard terrestrial service is limited but connectivity is still required.",
    typicalFit: "Remote site • Edge location • Limited terrestrial availability",
  },
  {
    title: "VoIP and Cloud Voice",
    subtitle:
      "Business voice services with number porting, call routing, and professional call handling.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice", "Number porting", "Call routing"],
    tag: "VOICE",
    group: "Voice",
    bestFit:
      "Best for teams that want business voice aligned with how they work and answer calls.",
    typicalFit: "Front desk • Office teams • Multi-user business calling",
  },
  {
    title: "IoT Connectivity",
    subtitle:
      "Controlled connectivity for sensors, gateways, field devices, and connected systems.",
    href: "/services/iot-connectivity",
    bullets: ["IoT uplinks", "Segmentation", "Connected systems"],
    tag: "CONNECTED SYSTEMS",
    group: "Infrastructure",
    bestFit:
      "Best for environments where connected devices need stable, segmented, and managed service.",
    typicalFit: "Sensors • Gateways • Field devices • Segmented environments",
  },
  {
    title: "Static IP Routing",
    subtitle:
      "Fixed addressing for VPNs, firewalls, remote access, and hosted business systems.",
    href: "/services/static-ip-routing",
    bullets: ["Static IPs", "Routing", "Stable endpoints"],
    tag: "ROUTING",
    group: "Infrastructure",
    bestFit:
      "Best for businesses that need fixed endpoints for security, remote access, and hosted applications.",
    typicalFit: "VPN • Firewall • Remote access • Hosted applications",
  },
  {
    title: "Colocation and Infrastructure Services",
    subtitle:
      "Infrastructure support for rack space, cross-connects, interconnection, and future network planning.",
    href: "/services/colocation-infrastructure",
    bullets: ["Cross-connects", "Rack support", "Infrastructure planning"],
    tag: "INFRASTRUCTURE",
    group: "Infrastructure",
    bestFit:
      "Best for buyers planning beyond internet service into interconnection and infrastructure growth.",
    typicalFit: "Rack presence • Interconnection • Advanced planning",
  },
];

const GROUPS: readonly GroupItem[] = [
  {
    title: "Connectivity",
    eyebrow: "PRIMARY ACCESS",
    description:
      "Internet services for businesses that need strong primary connectivity and a clear starting point.",
    id: "connectivity",
  },
  {
    title: "Managed Network",
    eyebrow: "INTERNAL NETWORK",
    description:
      "Managed LAN and Wi-Fi services for businesses that need better internal stability and support.",
    id: "managed-network",
  },
  {
    title: "Continuity",
    eyebrow: "BACKUP AND RESILIENCE",
    description:
      "Backup and continuity services for businesses that want better uptime planning.",
    id: "continuity",
  },
  {
    title: "Voice",
    eyebrow: "COMMUNICATIONS",
    description:
      "Business voice services for teams that need professional call handling and flexible routing.",
    id: "voice",
  },
  {
    title: "Infrastructure",
    eyebrow: "ADVANCED SERVICES",
    description:
      "Routing, IoT, and infrastructure services for technical and future-ready business environments.",
    id: "infrastructure",
  },
];

const FAQ_ITEMS = [
  {
    q: "How do I choose between business fibre and dedicated internet access?",
    a: "Business fibre is often the right fit for general business internet, while dedicated internet is better for environments that need stronger uptime, cleaner escalation, and more predictable performance.",
  },
  {
    q: "Can I use this page to request pricing?",
    a: "Yes. Start with the service that best matches your business need, then move into availability and pricing with your address and timeline.",
  },
  {
    q: "Is this page for residential internet?",
    a: "No. Orbitlink’s services page is designed for business locations and commercial environments in Ontario.",
  },
  {
    q: "What happens after I pick a service?",
    a: "The next step is to submit your business location and service need so Orbitlink can review availability and the best path forward.",
  },
] as const;

function MetricPill({ label, value }: { label: string; value: string }) {
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
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/35 hover:bg-white/[0.06] sm:rounded-[28px] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-[#FACC15]/10 blur-3xl" />
        <div className="absolute right-0 top-8 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
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
            <p className="mt-3 text-sm leading-6 text-white/64">
              {service.subtitle}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/66 transition group-hover:border-[#FACC15]/30 group-hover:bg-white/10 group-hover:text-white">
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
          <div className="mt-3 text-[11px] text-white/40">{service.typicalFit}</div>
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
            Go to the service type that matches your business need.
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

function StartHereStrip() {
  const items = [
    {
      title: "Offices and clinics",
      body: "Reliable internet and stable day-to-day business operations.",
    },
    {
      title: "Critical operations",
      body: "Dedicated internet and stronger uptime for higher-dependency sites.",
    },
    {
      title: "Internal network issues",
      body: "Wi-Fi, LAN, segmentation, and performance issues inside the business.",
    },
  ];

  return (
    <Surface className="p-5 sm:p-8">
      <div className="max-w-3xl">
        <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
          START HERE
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
          Choose the right internet setup for your business
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
          Start with your business type. That makes the right service much clearer.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.06] sm:rounded-[26px]"
          >
            <div className="text-sm font-medium text-white/90">{item.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
          </div>
        ))}
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
          Built for Ontario businesses
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
          This page is for businesses reviewing internet, managed networking, backup,
          voice, and infrastructure services in Ontario.
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
      title: "Choose what you need",
      body: "Start with primary internet, dedicated connectivity, managed networking, backup, voice, or infrastructure.",
    },
    {
      label: "STEP 2",
      title: "Add your address",
      body: "Share the business address and any timing or technical details that matter.",
    },
    {
      label: "STEP 3",
      title: "Get the next step",
      body: "We help you move toward availability, pricing, and the right service path.",
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
            How to choose the right service
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Pick the service that matches your business need, then check availability and pricing.
          </p>
        </div>

        <MetricPill label="MODE" value="Simple • Clear • Business-ready" />
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
      fibre: "General business internet",
      dia: "Critical business sites",
      wifi: "Internal coverage and stability",
      backup: "Continuity and failover",
    },
    {
      label: "When it makes sense",
      fibre: "Primary internet for most business locations",
      dia: "When uptime and predictability matter more",
      wifi: "When Wi-Fi issues affect staff or operations",
      backup: "When downtime creates business risk",
    },
    {
      label: "Main benefit",
      fibre: "Strong primary access",
      dia: "More predictable performance",
      wifi: "Better user experience",
      backup: "Second path protection",
    },
    {
      label: "Typical concern",
      fibre: "Building fit and availability",
      dia: "Service model and escalation",
      wifi: "Coverage and segmentation",
      backup: "Failover readiness",
    },
  ];

  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            QUICK COMPARISON
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Compare the main service types quickly
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            This gives you a quick way to see which service fits your business best.
          </p>
        </div>

        <MetricPill label="BUYER TOOL" value="Fast comparison" />
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

function BuyerMistakesStrip() {
  const items = [
    "Choosing a service before checking building fit",
    "No backup path for continuity-sensitive operations",
    "Treating Wi-Fi as separate from business performance",
    "Using the wrong service model for the real workload",
  ];

  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            COMMON PROBLEMS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Common problems with business internet
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Most problems start when the business picks a package before checking the site, workload, and real requirements.
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
            Get availability and pricing for your business
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Start with your address and business need. We can help narrow the right path.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Get Availability & Pricing
          </Link>
          <Link
            href="/contact#intake"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Get Availability & Pricing
          </Link>
        </div>
      </div>
    </Surface>
  );
}

function BuyerValueStrip() {
  const items = [
    {
      title: "Business-first service review",
      body:
        "Orbitlink is designed around site fit, business needs, and practical service choices instead of generic consumer-style intake.",
    },
    {
      title: "Clear next step",
      body:
        "This page helps buyers move from interest into availability, pricing, and the right service path.",
    },
  ];

  return (
    <Surface className="border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-[#FDE68A] sm:text-[11px]">
            WHY THIS PAGE HELPS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            More than a list of services
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
            Businesses need more than a catalog. They need help understanding fit and the next step.
          </p>
        </div>

        <MetricPill label="BUYER SIGNAL" value="Fit • Confidence • Action" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
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

function HumanAnchor() {
  return (
    <Surface className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            REVIEWED BY ORBITLINK
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Every request is reviewed by Orbitlink
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Every request is reviewed based on the business location, service fit, and business requirements.
            The goal is to help you move toward the right next step.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <TrustPill text="Business-only review" />
            <TrustPill text="Reviewed by address" />
            <TrustPill text={`Operated by ${LEGAL_NAME}`} />
          </div>
        </div>

        <MetricPill label="REVIEW MODE" value="Fit • Availability • Direction" />
      </div>
    </Surface>
  );
}

function FAQStrip() {
  return (
    <Surface id="faq" className="scroll-mt-28 p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Questions buyers commonly ask
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            These answers help business buyers understand the service types before moving forward.
          </p>
        </div>

        <MetricPill label="SEO + CLARITY" value="Useful for buyers and search" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
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
          <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-cyan-400/8 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[10px] tracking-[0.30em] text-white/42 sm:text-[11px]">
              NEXT STEP
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Check availability for your business location
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Start with your address, timing, and service need. Orbitlink can then review fit, availability, and the best next step.
            </p>
          </div>

          <MetricPill label="NEXT STEP" value="Availability • Pricing • Direction" />
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Get Availability & Pricing
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
          Best results come from choosing the main service first, then submitting the exact business address and timeline.
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
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        telephone: BRAND_PHONE_E164,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: BRAND_PHONE_E164,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: `${SITE_URL}/contact`,
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: BRAND_PHONE_E164,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: `${SITE_URL}/contact`,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": ORG_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        name: PAGE_TITLE,
        url: PAGE_URL,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        breadcrumb: { "@id": BREADCRUMB_ID },
        inLanguage: "en-CA",
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Orbitlink Business Connectivity Services",
        url: PAGE_URL,
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
        serviceType: [
          "Business Fibre Internet",
          "Dedicated Internet Access",
          "Managed LAN and Wi-Fi",
          "LTE / 5G Backup Connectivity",
          "Starlink",
          "VoIP and Cloud Voice",
          "IoT Connectivity",
          "Static IP Routing",
          "Colocation and Infrastructure Services",
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
        termsOfService: `${SITE_URL}/legal/terms`,
        description:
          "Business internet, dedicated fibre, managed Wi-Fi, voice, backup, and infrastructure services for Ontario businesses.",
      },
      {
        "@type": "ItemList",
        "@id": ITEMLIST_ID,
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
        "@id": FAQ_ID,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.46)_0%,rgba(4,7,12,0.66)_36%,rgba(4,7,12,0.90)_78%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.95)_0%,rgba(4,7,12,0.62)_34%,rgba(4,7,12,0.18)_66%,rgba(4,7,12,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(250,204,21,0.07),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.09),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-center px-5 pb-10 pt-24 sm:min-h-[58svh] sm:pb-12 sm:pt-22 lg:min-h-[56svh] lg:px-10 lg:pb-14 lg:pt-20">
          <div className="w-full max-w-[46rem]">
            <Breadcrumbs />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/76 backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Ontario Business Connectivity Services
            </div>

            <h1 className="mt-5 max-w-4xl text-[2rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              Business fibre internet, dedicated internet, and managed network services
              <span className="block text-white/62">for Ontario businesses</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/80 sm:text-[15px]">
              Explore business fibre, dedicated internet, managed Wi-Fi, backup connectivity,
              voice, routing, and infrastructure services. Start with what your business needs,
              then check availability and pricing.
            </p>

            <div className="mt-3 text-sm text-white/70">
              Used by Ontario offices, clinics, warehouses, and growing businesses.
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Office and clinic environments",
                "Warehouse and industrial",
                "Multi-site operations",
                "Critical connectivity",
                "Business-only review",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/68 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Get Availability & Pricing
              </Link>

              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Request Pricing
              </Link>

              <Link
                href="/business-fibre-internet-ontario"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Ontario Fibre Hub
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Business-only • Reviewed by address • Clear next step
            </div>

            <div className="mt-2 text-xs text-white/55">
              Most businesses receive direction within 1 business day.
            </div>

            <div className="mt-2 text-xs text-white/60">
              Takes 60 seconds • No obligation • Business-only
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative space-y-5 sm:space-y-6">
          <StartHereStrip />
          <JumpNav />
          <AudienceStrip />
          <QuickStartStrip />
          <ComparisonBlock />
          <BuyerMistakesStrip />

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
          <BuyerValueStrip />
          <HumanAnchor />
          <FAQStrip />
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}