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
  bestFit: string;
};

type GroupItem = {
  title: ServiceGroup;
  description: string;
  eyebrow: string;
};

export const metadata: Metadata = {
  title:
    "Business Fibre Internet, Dedicated Internet & Managed Network Services | Orbitlink",
  description:
    "Explore Orbitlink business fibre internet, dedicated internet access, managed LAN and Wi-Fi, backup connectivity, cloud voice, static IP routing, IoT connectivity, and infrastructure services across Ontario.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Business Fibre Internet, Dedicated Internet & Managed Network Services | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed networking, backup connectivity, voice, and infrastructure services for Ontario businesses.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet and network services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Business Fibre Internet, Dedicated Internet & Managed Network Services | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed networking, backup connectivity, voice, and infrastructure services across Ontario.",
    images: [TWITTER_IMAGE_URL],
  },
};

const SERVICES: readonly ServiceItem[] = [
  {
    title: "Business Fibre Internet",
    subtitle:
      "Primary internet for offices, clinics, commercial units, and business sites that need reliable connectivity and a cleaner buying process.",
    href: "/services/business-fibre-internet",
    bullets: ["Business fibre", "Address review", "Commercial onboarding"],
    tag: "PRIMARY INTERNET",
    group: "Connectivity",
    bestFit:
      "Best for business locations that want strong primary internet, better commercial clarity, and a more professional service path.",
  },
  {
    title: "Dedicated Internet Access",
    subtitle:
      "Dedicated connectivity for critical sites that require stronger performance posture, clearer escalation, and higher service expectations.",
    href: "/services/dedicated-internet-access",
    bullets: ["Dedicated access", "Committed performance", "Critical environments"],
    tag: "DEDICATED CONNECTIVITY",
    group: "Connectivity",
    bestFit:
      "Best for organizations that need deterministic connectivity, stronger support posture, and cleaner commercial escalation.",
  },
  {
    title: "Managed LAN & Wi-Fi",
    subtitle:
      "Managed internal networking for businesses that need stronger wireless coverage, segmentation, and better day-to-day operational stability.",
    href: "/services/managed-lan-wifi",
    bullets: ["Managed Wi-Fi", "LAN support", "Segmentation"],
    tag: "MANAGED NETWORK",
    group: "Managed Network",
    bestFit:
      "Best for sites where internal network quality, guest access, and managed support matter as much as the internet circuit itself.",
  },
  {
    title: "LTE / 5G Backup Connectivity",
    subtitle:
      "Backup connectivity for organizations that want continuity planning, failover readiness, and stronger resilience during primary service disruption.",
    href: "/services/lte-5g-continuity",
    bullets: ["Backup path", "Failover", "Continuity planning"],
    tag: "RESILIENCE",
    group: "Continuity",
    bestFit:
      "Best for businesses that want uptime planning built into the service design from the start.",
  },
  {
    title: "Starlink",
    subtitle:
      "Satellite connectivity for remote, constrained, or edge environments where terrestrial options are limited or continuity requires an alternative path.",
    href: "/services/starlink-agent",
    bullets: ["Satellite option", "Remote sites", "Continuity support"],
    tag: "SATELLITE",
    group: "Continuity",
    bestFit:
      "Best for sites where standard terrestrial availability is limited and operations still require a viable business connection path.",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle:
      "Business voice service for teams that need number porting, call routing, professional communications handling, and better control.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice", "Number porting", "Call routing"],
    tag: "VOICE",
    group: "Voice",
    bestFit:
      "Best for organizations that want voice aligned with the rest of their business communications and network stack.",
  },
  {
    title: "IoT Connectivity",
    subtitle:
      "Secure uplinks for gateways, sensors, field devices, and connected systems operating inside managed business environments.",
    href: "/services/iot-connectivity",
    bullets: ["IoT uplinks", "Segmentation", "Monitoring-ready"],
    tag: "CONNECTED SYSTEMS",
    group: "Infrastructure",
    bestFit:
      "Best for environments where devices, operational systems, and gateways need segmented and more controlled connectivity.",
  },
  {
    title: "Static IP Routing",
    subtitle:
      "Fixed addressing options for VPNs, firewalls, remote access, hosted systems, and stable business endpoints.",
    href: "/services/static-ip-routing",
    bullets: ["Static IPs", "Routing options", "Stable endpoints"],
    tag: "ROUTING",
    group: "Infrastructure",
    bestFit:
      "Best for businesses that need fixed endpoints for VPNs, firewall policy, hosted services, or stable remote access.",
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
      "Best for buyers planning beyond standard connectivity into infrastructure, interconnection, or future network presence.",
  },
];

const GROUPS: readonly GroupItem[] = [
  {
    title: "Connectivity",
    eyebrow: "PRIMARY ACCESS",
    description:
      "Internet services for business environments that need strong primary connectivity and a cleaner commercial starting point.",
  },
  {
    title: "Managed Network",
    eyebrow: "INTERNAL NETWORK",
    description:
      "Managed LAN and Wi-Fi services for businesses that need better internal stability, cleaner segmentation, and easier support.",
  },
  {
    title: "Continuity",
    eyebrow: "BACKUP & RESILIENCE",
    description:
      "Backup and continuity services for organizations that want stronger uptime planning and outage resilience.",
  },
  {
    title: "Voice",
    eyebrow: "COMMUNICATIONS",
    description:
      "Business voice services for teams that need professional calling, routing, and better communications control.",
  },
  {
    title: "Infrastructure",
    eyebrow: "ADVANCED SERVICES",
    description:
      "Routing, IoT, and infrastructure services for more technical, future-ready, and policy-driven business environments.",
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
        "rounded-[34px] border border-white/10 bg-white/[0.035] backdrop-blur-sm",
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
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.055] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute right-0 top-8 h-36 w-36 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.24em] text-white/48">{service.tag}</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
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
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/62"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-5">
          <div className="text-[11px] tracking-[0.22em] text-white/40">BEST FOR</div>
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
          <p className="mt-3 text-sm leading-6 text-white/62 sm:text-[15px]">{description}</p>
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

function QuickStartStrip() {
  const steps = [
    {
      label: "STEP 1",
      title: "Choose the business need",
      body: "Start with primary internet, dedicated connectivity, managed networking, backup, voice, or infrastructure.",
    },
    {
      label: "STEP 2",
      title: "Add site details",
      body: "Share the address, timeline, and the operational requirements that matter to the business.",
    },
    {
      label: "STEP 3",
      title: "Move into qualification",
      body: "Get a clearer next step for serviceability, service fit, and pricing direction.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">HOW TO BUY</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            A cleaner path from browsing to commercial review
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Buyers do not need a maze. They need the right service, the right qualification path,
            and a clear next step.
          </p>
        </div>

        <MetricPill label="MODE" value="Clear • Practical • Business-ready" />
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

function ValueStrip() {
  const items = [
    {
      title: "Business-first qualification",
      body: "Orbitlink is positioned around commercial fit, not generic consumer intake.",
    },
    {
      title: "Stronger service matching",
      body: "Fibre, DIA, managed networking, backup, and voice are mapped to real operating needs.",
    },
    {
      title: "Cleaner commercial process",
      body: "The buying experience is designed to feel structured, accountable, and easier to understand.",
    },
    {
      title: "Better next-step clarity",
      body: "Businesses move faster when the path from service interest to qualification is obvious.",
    },
  ];

  return (
    <Surface className="border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-[#FDE68A]">
            WHY THIS PAGE CONVERTS SERIOUS BUYERS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            More than a list of services
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
            Serious buyers need to understand the value of doing business with Orbitlink:
            stronger service matching, cleaner qualification, and a more useful commercial path.
          </p>
        </div>

        <MetricPill label="BUYER OUTCOME" value="Fit • Confidence • Action" />
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

function FAQStrip() {
  const items = [
    {
      q: "How do I choose between business fibre and dedicated internet access?",
      a: "Business fibre is often the right fit for general business connectivity, while dedicated internet access is better for environments that need stronger performance posture, cleaner escalation, and higher service expectations.",
    },
    {
      q: "Can I use this page to start a pricing request?",
      a: "Yes. Start with the service category that best matches the business need, then move into contact and qualification using the service address, timing, and requirements.",
    },
    {
      q: "Is this page for residential internet?",
      a: "No. Orbitlink’s services page is designed for commercial buyers, business locations, and Ontario operational environments.",
    },
    {
      q: "What happens after I pick a service?",
      a: "The next step is to submit the business location and service requirements so Orbitlink can review availability, fit, and the best commercial path forward.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Questions buyers often ask on the services page
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            These answers help buyers understand how Orbitlink’s service categories work before moving into qualification.
          </p>
        </div>

        <MetricPill label="SEO + CLARITY" value="Useful for buyers and search" />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.q} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <h3 className="text-sm font-medium text-white/90">{item.q}</h3>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.a}</p>
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
        "@type": "WebPage",
        name: "Orbitlink Services",
        url: PAGE_URL,
        description:
          "Business fibre internet, dedicated internet access, managed networking, backup connectivity, voice, and infrastructure services for Ontario businesses.",
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
              text: "Yes. Start with the service category that best matches the business need, then move into contact and qualification using the service address, timing, and requirements.",
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
              text: "The next step is to submit the business location and service requirements so Orbitlink can review availability, fit, and the best commercial path forward.",
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
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-7 sm:pb-18 sm:pt-18 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business internet, managed networking, backup, voice, and infrastructure
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="max-w-4xl">
                <div className="text-[11px] tracking-[0.30em] text-white/42">
                  ONTARIO BUSINESS CONNECTIVITY
                </div>

                <h1 className="mt-4 text-[2.5rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[5rem] lg:leading-[0.97]">
                  Business internet and
                  <span className="block text-white/60">network services</span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                  Explore Orbitlink business fibre internet, dedicated internet access, managed LAN
                  and Wi-Fi, backup connectivity, voice, and infrastructure services for Ontario
                  businesses. Start with the service that matches the site, then move into availability,
                  fit, and pricing review.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Business fibre internet",
                    "Dedicated internet access",
                    "Managed LAN & Wi-Fi",
                    "Backup, voice, and infrastructure",
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
                    Check Availability
                  </Link>
                  <Link
                    href="/locations"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    View Locations
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    Trust & Compliance
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
                  <div className="text-[11px] tracking-[0.24em] text-white/50">COMMERCIAL START</div>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Pick the service that matches the business objective
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    Start with internet, managed networking, backup, voice, or infrastructure.
                    Then move into a clearer request with address, timing, and service scope.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <MetricPill label="STEP 1" value="Choose the service" />
                    <MetricPill label="STEP 2" value="Add site details" />
                    <MetricPill label="STEP 3" value="Request review and pricing" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[11px] tracking-[0.28em] text-white/45">
                  COMMERCIAL TRUST SIGNALS
                </div>
                <p className="mt-2 text-sm leading-6 text-white/66">
                  This page is structured for business buyers that need service clarity, location-based
                  qualification, and a more direct path toward pricing and next-step review.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:min-w-[520px]">
                <TrustPill text="Business-only service categories" />
                <TrustPill text="Ontario commercial focus" />
                <TrustPill text="Availability reviewed by address" />
                <TrustPill text="Operated by TIRAV Technologies Inc." />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="BEST FOR" value="Ontario business sites and multi-location teams" />
            <MetricPill label="BUYER MODE" value="Clear, serious, business-ready" />
            <MetricPill label="NEXT STEP" value="Availability • Fit • Pricing" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative space-y-6">
          <QuickStartStrip />

          {GROUPS.map((group) => (
            <GroupBlock
              key={group.title}
              title={group.title}
              eyebrow={group.eyebrow}
              description={group.description}
              services={SERVICES.filter((s) => s.group === group.title)}
            />
          ))}

          <ValueStrip />
          <FAQStrip />

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
                    Move from browsing to a qualified service conversation
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Start with the address, operating requirements, and the service priority.
                    Orbitlink can then review fit, availability, and the clearest next commercial
                    step.
                  </p>
                </div>

                <MetricPill label="COMMERCIAL MODE" value="Availability • Fit • Pricing" />
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
        </div>
      </section>
    </div>
  );
}