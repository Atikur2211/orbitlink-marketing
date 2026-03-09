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
  title: "Business Fibre Internet, Dedicated Internet & Network Services | Orbitlink",
  description:
    "Explore Orbitlink business fibre internet, dedicated internet access, managed Wi-Fi and LAN, business voice, backup connectivity, IoT uplinks, static IP routing, and infrastructure services across Ontario.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Fibre Internet, Dedicated Internet & Network Services | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed Wi-Fi, continuity, voice, IoT, static IP routing, and infrastructure services for Ontario businesses.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business fibre internet, dedicated internet, and network services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet, Dedicated Internet & Network Services | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed Wi-Fi, continuity, voice, and infrastructure services across Ontario.",
    images: [TWITTER_IMAGE_URL],
  },
};

const SERVICES: readonly ServiceItem[] = [
  {
    title: "Business Fibre Internet",
    subtitle:
      "Primary business internet for offices, commercial spaces, and growing organizations that need reliable connectivity and a cleaner commercial path.",
    href: "/services/business-fibre-internet",
    bullets: ["Business fibre", "Symmetrical options", "Address-based review"],
    tag: "INTERNET",
    group: "Connectivity",
    bestFit:
      "Best for businesses that want high-quality primary internet with clearer qualification, cleaner onboarding, and a more accountable provider experience.",
  },
  {
    title: "Dedicated Internet Access",
    subtitle:
      "Dedicated connectivity for critical business sites that need stronger performance expectations and more predictable service delivery.",
    href: "/services/dedicated-internet-access",
    bullets: ["Dedicated access", "Committed service", "Critical sites"],
    tag: "DEDICATED CONNECTIVITY",
    group: "Connectivity",
    bestFit:
      "Best for organizations that need stronger performance expectations, cleaner escalation, and more predictable delivery for important business operations.",
  },
  {
    title: "Managed LAN & Wi-Fi",
    subtitle:
      "Managed internal networking for businesses that need better Wi-Fi coverage, cleaner segmentation, and easier day-to-day support.",
    href: "/services/managed-lan-wifi",
    bullets: ["Managed Wi-Fi", "LAN support", "Segmentation"],
    tag: "MANAGED NETWORK",
    group: "Managed Network",
    bestFit:
      "Best for sites where internal network performance, guest access, coverage quality, and ongoing support matter.",
  },
  {
    title: "LTE / 5G Backup Connectivity",
    subtitle:
      "Backup connectivity for businesses that want failover, resilience, and better continuity during outages.",
    href: "/services/lte-5g-continuity",
    bullets: ["Backup path", "Failover", "Business continuity"],
    tag: "CONTINUITY",
    group: "Continuity",
    bestFit:
      "Best for organizations that want internet resilience built into the service plan from the start.",
  },
  {
    title: "Starlink",
    subtitle:
      "Satellite connectivity for sites with limited terrestrial options or special continuity requirements.",
    href: "/services/starlink-agent",
    bullets: ["Satellite option", "Remote sites", "Continuity use cases"],
    tag: "SATELLITE",
    group: "Continuity",
    bestFit:
      "Best for edge cases where terrestrial access is limited and business operations still need a viable connection path.",
  },
  {
    title: "VoIP & Cloud Voice",
    subtitle:
      "Business voice service for teams that need number porting, call routing, and more professional communications handling.",
    href: "/services/voip-cloud-voice",
    bullets: ["Cloud voice", "Number porting", "Call routing"],
    tag: "VOICE",
    group: "Voice",
    bestFit:
      "Best for businesses that want business-ready calling aligned with the rest of their communications and service stack.",
  },
  {
    title: "IoT Connectivity",
    subtitle:
      "Secure uplinks for gateways, sensors, and connected devices in managed business environments.",
    href: "/services/iot-connectivity",
    bullets: ["IoT uplinks", "Segmentation", "Monitoring-ready"],
    tag: "CONNECTED DEVICES",
    group: "Infrastructure",
    bestFit:
      "Best for environments where devices, gateways, and operational systems need secure, segmented, and controlled connectivity.",
  },
  {
    title: "Static IP Routing",
    subtitle:
      "Fixed addressing options for VPNs, firewalls, remote access, and stable business endpoints.",
    href: "/services/static-ip-routing",
    bullets: ["Static IPs", "Routing options", "Stable endpoints"],
    tag: "ROUTING",
    group: "Infrastructure",
    bestFit:
      "Best for businesses that need fixed endpoints for VPNs, remote access, firewall policy, or hosted systems.",
  },
  {
    title: "Colocation & Infrastructure Services",
    subtitle:
      "Infrastructure coordination for buyers planning edge presence, cross-connects, or future interconnection.",
    href: "/services/colocation-infrastructure",
    bullets: ["Cross-connects", "Rack coordination", "Infrastructure planning"],
    tag: "INFRASTRUCTURE",
    group: "Infrastructure",
    bestFit:
      "Best for businesses planning beyond standard internet access and into infrastructure, edge presence, or interconnection needs.",
  },
];

const GROUPS: readonly GroupItem[] = [
  {
    title: "Connectivity",
    eyebrow: "PRIMARY ACCESS",
    description:
      "Internet services for business sites that need reliable primary connectivity, clearer qualification, and a stronger commercial starting point.",
  },
  {
    title: "Managed Network",
    eyebrow: "INTERNAL NETWORK",
    description:
      "Managed Wi-Fi and LAN services for businesses that need better site networking, cleaner segmentation, and day-to-day support.",
  },
  {
    title: "Continuity",
    eyebrow: "BACKUP & RESILIENCE",
    description:
      "Backup connectivity options for organizations that want stronger uptime planning and outage resilience.",
  },
  {
    title: "Voice",
    eyebrow: "COMMUNICATIONS",
    description:
      "Business voice services for teams that need professional calling, routing, and cleaner communications setup.",
  },
  {
    title: "Infrastructure",
    eyebrow: "ADVANCED SERVICES",
    description:
      "Routing, IoT, and infrastructure services for more technical, operational, or future-ready business environments.",
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
      className={["rounded-[32px] border border-white/10 bg-white/[0.035]", className].join(" ")}
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
          <div className="text-[11px] tracking-[0.22em] text-white/42">BEST FOR</div>
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
    <section className="mt-14 first:mt-0">
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
      title: "Choose a service",
      body: "Start with internet, dedicated internet, managed Wi-Fi, voice, backup, or infrastructure.",
    },
    {
      label: "STEP 2",
      title: "Share your site details",
      body: "Add your address, timeline, and the technical or operational requirements that matter to the business.",
    },
    {
      label: "STEP 3",
      title: "Request review and pricing",
      body: "Move into a clearer next step for serviceability, fit, or commercial discussion.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">HOW TO START</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            A simpler path from browsing to qualification
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Choose the service that best matches the business need, then move into a clear request
            with your address, timing, and requirements.
          </p>
        </div>

        <MetricPill label="MODE" value="Simple • Clear • Business-ready" />
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

function WhyBusinessesChooseOrbitlink() {
  const items = [
    {
      title: "Clearer service selection",
      body: "Buyers can quickly tell the difference between primary internet, managed networking, backup, voice, and infrastructure.",
    },
    {
      title: "Better lead quality",
      body: "Visitors arrive at contact with a better understanding of what they actually need.",
    },
    {
      title: "Less buyer friction",
      body: "A clearer service structure reduces confusion and shortens the path to a serious conversation.",
    },
    {
      title: "Stronger business trust",
      body: "The page feels more structured and more credible than a generic internet plan list.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-white/42">
            WHY BUSINESSES START HERE
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Built to help buyers make a better decision
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            A strong services page should make it easier to understand the offer, easier to compare
            options, and easier to move toward the right next step.
          </p>
        </div>

        <MetricPill label="BUYER SIGNAL" value="Clear, premium, and credible" />
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

function BuyerQuestionsStrip() {
  const items = [
    {
      title: "Which service is right for my site?",
      body: "The page helps buyers separate business fibre, dedicated internet, managed Wi-Fi, backup connectivity, voice, and infrastructure needs.",
    },
    {
      title: "Do you review by address?",
      body: "Yes. The commercial path starts with site details, service fit, and operating requirements rather than broad assumptions.",
    },
    {
      title: "Can I compare options quickly?",
      body: "Each service card is grouped by business need so buyers can scan faster and move toward the right conversation.",
    },
    {
      title: "What happens after I enquire?",
      body: "Qualified requests move into availability review, service-fit discussion, pricing direction, or the next commercial step.",
    },
  ];

  return (
    <Surface className="border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.30em] text-[#FDE68A]">
            COMMON BUYER QUESTIONS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Clear answers before the service conversation starts
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
            Serious buyers usually want the same things first: the right service fit, a clearer
            understanding of how review works, and confidence that the next step will be practical.
            This page is designed to answer those questions earlier.
          </p>
        </div>

        <MetricPill label="BUYER GOAL" value="Fit • Review • Pricing" />
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
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-7 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business internet and network services
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="max-w-4xl">
                <div className="text-[11px] tracking-[0.30em] text-white/42">
                  INTERNET • MANAGED NETWORK • BACKUP • VOICE • INFRASTRUCTURE
                </div>

                <h1 className="mt-4 text-[2.6rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.1rem] lg:leading-[0.98]">
                  Business internet and
                  <span className="block text-white/62">network services</span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                  Explore business fibre internet, dedicated internet access, managed Wi-Fi and LAN,
                  backup connectivity, business voice, and infrastructure services for Ontario
                  businesses. Orbitlink organizes services the way commercial buyers usually evaluate
                  them: primary internet first, managed network support where needed, backup where
                  resilience matters, voice where communications matter, and infrastructure for more
                  advanced environments.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Business fibre internet",
                    "Dedicated internet access",
                    "Managed Wi-Fi and LAN",
                    "Backup connectivity",
                    "Business voice",
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
                    Check Availability & Request Pricing
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    View Trust & Compliance
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
                  <div className="text-[11px] tracking-[0.24em] text-white/50">START HERE</div>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Pick the service that matches the main business need
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    Start with internet, managed Wi-Fi, backup, voice, or infrastructure. Then move
                    into a clearer request with your address, timing, and technical requirements.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <MetricPill label="STEP 1" value="Choose the service" />
                    <MetricPill label="STEP 2" value="Add address and scope" />
                    <MetricPill label="STEP 3" value="Request review and pricing" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="BEST FOR" value="Ontario business sites and multi-location teams" />
            <MetricPill label="BUYER MODE" value="Simple, clear, and business-ready" />
            <MetricPill label="NEXT STEP" value="Check availability and request pricing" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:88px_88px]" />

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

          <WhyBusinessesChooseOrbitlink />
          <BuyerQuestionsStrip />

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
                    Move from browsing to a qualified conversation
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                    Start with your address, business needs, and service priority. Orbitlink can
                    then review fit, availability, and the clearest next step.
                  </p>
                </div>

                <MetricPill label="COMMERCIAL MODE" value="Availability • Fit • Pricing" />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
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
                <Link
                  href="/contact#intake"
                  className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability & Request Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}