import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/iot-connectivity";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_PHONE_DISPLAY = "1-888-867-2480";
const BUSINESS_PHONE_E164 = "+18888672480";

export const metadata: Metadata = {
  title: "IoT Connectivity & Secure Uplinks in Ontario",
  description:
    "IoT connectivity for Ontario businesses. Secure uplinks for sensors, gateways, and devices with segmentation, monitoring-ready design, and cleaner operational control. Check availability and discuss your use case.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "IoT Connectivity & Secure Uplinks in Ontario | Orbitlink",
    description:
      "IoT connectivity for sensors, gateways, and managed devices with secure uplinks, segmentation posture, and monitoring-ready deployment for Ontario businesses.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink IoT Connectivity & Secure Uplinks in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IoT Connectivity & Secure Uplinks in Ontario | Orbitlink",
    description:
      "Secure uplink design for sensors, gateways, and managed devices with an operator-grade business posture in Ontario.",
    images: [TWITTER_IMAGE_URL],
  },
};

const DESIGN_PILLARS = [
  {
    title: "Segmentation posture",
    body: "IoT devices should not share the same trust boundary as staff systems, core applications, or sensitive corporate traffic.",
  },
  {
    title: "Secure uplink design",
    body: "Connectivity should be built around predictable handoff, clean routing posture, and lower operational friction for remote devices.",
  },
  {
    title: "Monitoring readiness",
    body: "IoT connectivity becomes more valuable when the design supports observability, alerting logic, and cleaner operational review.",
  },
  {
    title: "Site-aware feasibility",
    body: "The right uplink pattern depends on location, power conditions, device density, indoor constraints, and the operational role of the system.",
  },
] as const;

const USE_CASES = [
  "Sensors and environmental monitoring",
  "Gateways and edge-control devices",
  "Retail, office, and industrial telemetry",
  "Remote access paths for managed equipment",
  "Business environments with segmented device fleets",
  "Projects needing cleaner device-network boundaries",
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Cleaner device boundaries",
    body: "IoT traffic can be separated from corporate users and core applications, reducing operational risk and support confusion.",
  },
  {
    title: "Better service matching",
    body: "Buyers can evaluate IoT connectivity as a distinct network layer instead of forcing devices onto a general-purpose office network.",
  },
  {
    title: "More credible operating posture",
    body: "The service is framed around security, segmentation, and monitoring rather than generic device connectivity claims.",
  },
  {
    title: "Stronger long-term fit",
    body: "IoT uplinks can align more cleanly with managed LAN, Business Fibre, continuity planning, and future operational scale.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews the device role, site type, network boundaries, and monitoring needs before proposing the uplink model.",
  },
  {
    title: "During service fit",
    body: "Segmentation, uplink behavior, security boundaries, and operational requirements are clarified before deployment planning begins.",
  },
  {
    title: "Before activation",
    body: "Site feasibility, connectivity assumptions, and operating expectations are aligned before rollout.",
  },
  {
    title: "After activation",
    body: "The customer has a cleaner understanding of how device traffic is separated, how uplinks behave, and where the service fits within the wider environment.",
  },
] as const;

const FAQ = [
  {
    q: "What is IoT connectivity and secure uplink design?",
    a: "It is a business connectivity model for sensors, gateways, remote devices, and other operational equipment that requires cleaner network boundaries, more predictable uplink behavior, and better monitoring readiness.",
  },
  {
    q: "Why should IoT devices be segmented from the main business network?",
    a: "Segmentation helps reduce risk and operational confusion by keeping device traffic separate from staff systems, core applications, and more sensitive business data paths.",
  },
  {
    q: "Who should consider this service?",
    a: "Organizations managing device fleets, sensors, gateways, telemetry systems, remote equipment, or operational technology environments should usually consider it.",
  },
  {
    q: "Can this be paired with other Orbitlink services?",
    a: "Yes. IoT uplinks can align with Business Fibre, managed LAN and Wi-Fi, continuity architecture, and static IP routing where appropriate.",
  },
  {
    q: "Is this only for industrial environments?",
    a: "No. It may also fit retail, office, commercial, monitoring, and mixed-use environments where devices need cleaner boundaries and more predictable network behavior.",
  },
  {
    q: "Does Orbitlink review site feasibility before recommending an uplink pattern?",
    a: "Yes. Orbitlink considers location, device role, density, power conditions, physical layout, and operational requirements before recommending the design approach.",
  },
  {
    q: "Is secure IoT uplink design better than placing devices on a shared office network?",
    a: "For many business environments, yes. A dedicated IoT posture usually provides cleaner segmentation, better control, and lower operational risk than leaving device fleets mixed into the main office network.",
  },
] as const;

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.04] ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/48">{children}</div>;
}

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

function TrustPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      {children}
    </span>
  );
}

function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          : "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
      }
    >
      {children}
    </Link>
  );
}

function PhoneCTA({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={`tel:${BUSINESS_PHONE_E164}`}
      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "IoT Connectivity & Secure Uplinks in Ontario",
        description:
          "IoT connectivity and secure uplinks for Ontario businesses. Segmentation, monitoring-ready design, secure device boundaries, and cleaner deployment posture.",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
        },
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "IoT Connectivity & Secure Uplinks",
        serviceType: "IoT Network Connectivity Service",
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
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
        url: PAGE_URL,
        description:
          "IoT connectivity and secure uplink design for sensors, gateways, remote devices, and monitoring-oriented business environments.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
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
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Orbitlink IoT
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>DEVICE CONNECTIVITY LAYER</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                IoT Connectivity & Secure Uplinks in Ontario
                <span className="block text-white/62">
                  For businesses that need cleaner device boundaries and safer network behavior
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                IoT connectivity in Ontario should be secure by design, not improvised after deployment.
                Orbitlink supports uplink patterns for sensors, gateways, and managed devices with
                an operator-grade posture built around segmentation, clean handoff, monitoring readiness,
                and business-safe implementation.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                The goal is not just to connect devices. It is to place them in the right network
                context so they can operate without weakening the rest of the business environment.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                This service is commonly used by Ontario businesses that need cleaner boundaries
                for sensors, gateways, telemetry systems, remote equipment, and other connected
                devices that should not sit on the same trust boundary as general office traffic.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Secure uplink design",
                  "IoT segmentation posture",
                  "Monitoring-ready deployment",
                  "Gateway and sensor support",
                  "Business-safe connectivity",
                ].map((item) => (
                  <TrustPill key={item}>{item}</TrustPill>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact#intake" primary>
                  Discuss Your IoT Use Case
                </CTAButton>
                <PhoneCTA>Call Now</PhoneCTA>
                <CTAButton href="/services/managed-lan-wifi">
                  Pair with Managed LAN & Wi-Fi
                </CTAButton>
              </div>

              <div className="mt-3 text-xs text-[#FDE68A]">
                Priority response for Ontario business requests this week
              </div>

              <div className="mt-2 text-xs text-white/55">
                No obligation • Site-based review • Clear next step provided
              </div>
            </div>

            <div className="lg:col-span-4">
              <SectionShell className="relative overflow-hidden p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <SectionEyebrow>BEST FIT</SectionEyebrow>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Built for businesses managing device fleets, edge hardware, or telemetry
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    This service fits environments where device traffic needs clearer boundaries,
                    better monitoring posture, and more operational control than generic shared
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

                  <div className="mt-5 flex flex-col gap-3">
                    <CTAButton href="/contact#intake" primary>
                      Discuss Your IoT Use Case
                    </CTAButton>
                    <PhoneCTA>Call Now</PhoneCTA>
                  </div>
                </div>
              </SectionShell>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="SERVICE TYPE" value="Secure device connectivity layer" />
            <MetricPill label="BEST FIT" value="Sensors, gateways, telemetry, segmented fleets" />
            <MetricPill label="PAIRING" value="Managed LAN, Business Fibre, continuity, static IP" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>OPERATOR POSTURE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Device connectivity should be treated like infrastructure, not an afterthought
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  As device fleets grow, so does operational risk. The network design must consider
                  isolation, uplink resilience, monitoring signals, and clean management boundaries
                  so devices can operate without weakening the rest of the environment.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
                <div className="mt-1 text-sm text-white/80">Secure-first • Scope-led</div>
              </div>
            </div>
          </SectionShell>

          <div className="grid gap-4 md:grid-cols-2">
            {DESIGN_PILLARS.map((item) => (
              <SectionShell key={item.title} className="p-6">
                <h2 className="text-lg font-semibold tracking-tight text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.body}</p>
              </SectionShell>
            ))}
          </div>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  What this service structure means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is designed to help buyers evaluate IoT connectivity as a separate
                  operating layer, not just as extra traffic on the office network.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Security-focused" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {BUSINESS_OUTCOMES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE ASSURANCE MODEL</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  A structured path from device role to deployment posture
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger providers often signal maturity through service lifecycle clarity. This
                  section gives Orbitlink that same trust signal in simpler language buyers can
                  understand quickly.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner control" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {ASSURANCE_MODEL.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>WHAT THIS SUPPORTS</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Secure connectivity patterns for real operational environments
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  The right design depends on what the devices do, how critical they are, where
                  they live, and what systems they interact with. Good IoT posture reduces
                  ambiguity and gives operations teams a cleaner model to support over time.
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
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>BUYING JOURNEY FIT</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Usually introduced after site connectivity and internal network posture are defined
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              IoT uplinks become more effective when the wider service stack is already clear. That
              may include Business Fibre, managed LAN and Wi-Fi, continuity posture, static
              addressing, and support expectations for the environment.
            </p>

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
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Common business use cases
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {USE_CASES.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell className="p-6 sm:p-8">
              <SectionEyebrow>NEXT STEP</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Start with the device role, then design the uplink around the environment
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Share your IoT use case, device profile, site type, and any segmentation or
                monitoring requirements. Orbitlink can then scope the right connectivity posture
                for a cleaner deployment path.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact#intake" primary>
                  Discuss Your IoT Use Case
                </CTAButton>
                <PhoneCTA>Call Now</PhoneCTA>
              </div>
            </SectionShell>
          </div>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              IoT Connectivity & Secure Uplinks FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business delivery posture: clearer device
              boundaries, cleaner uplink design, and structured service qualification.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {FAQ.map((f) => (
                <div key={f.q} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <div className="text-sm font-semibold text-white/90">{f.q}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact#intake" primary>
                Discuss Your IoT Use Case
              </CTAButton>
              <PhoneCTA>Call Now</PhoneCTA>
              <CTAButton href="/services/managed-lan-wifi">
                Pair with Managed LAN & Wi-Fi
              </CTAButton>
            </div>
          </SectionShell>
        </div>
      </section>
    </main>
  );
}