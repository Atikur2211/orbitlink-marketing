import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/lte-5g-continuity";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const metadata: Metadata = {
  title: "LTE / 5G Continuity Architecture Ontario | Orbitlink",
  description:
    "LTE and 5G backup connectivity for Ontario businesses. Reduce downtime with automatic failover and continuity support. Check availability by address.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "LTE / 5G Continuity Architecture Ontario | Orbitlink",
    description:
      "Business continuity using LTE/5G failover with structured recovery and resilience planning.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink LTE / 5G Continuity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LTE / 5G Continuity | Orbitlink",
    description:
      "Structured LTE/5G failover and continuity architecture for business resilience.",
    images: [TWITTER_IMAGE_URL],
  },
};

const DESIGN_SIGNALS = [
  {
    title: "Traffic prioritization",
    body: "Continuity works best when critical systems are identified first, so essential business functions remain reachable during an access event.",
  },
  {
    title: "Cutover behavior",
    body: "Recovery expectations should be defined before deployment: what fails over, how quickly, and what the user experience should look like.",
  },
  {
    title: "Carrier feasibility",
    body: "Signal quality, site conditions, building materials, and device placement all affect whether cellular continuity will perform as intended.",
  },
  {
    title: "Operational procedure",
    body: "A continuity service should come with a defined operating posture, not just hardware waiting for a bad day.",
  },
] as const;

const BUYER_FIT = [
  "Single-site businesses with uptime sensitivity",
  "Multi-site environments needing secondary-path design",
  "Retail, office, and commercial operations",
  "Voice, payments, and cloud app continuity",
  "Teams that need cleaner incident posture",
  "Businesses moving beyond unmanaged backup devices",
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Reduced outage exposure",
    body: "Continuity architecture lowers the risk that one circuit failure takes the entire business offline.",
  },
  {
    title: "Clearer operational priorities",
    body: "Buyers can decide which systems must stay reachable first instead of treating all traffic the same.",
  },
  {
    title: "More credible resilience posture",
    body: "The service is positioned as a business continuity model, not just a backup modem or hotspot.",
  },
  {
    title: "Stronger site design",
    body: "Continuity planning fits more cleanly with primary access, internal networking, voice, and future resilience upgrades.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews site needs, critical applications, traffic priorities, and cellular feasibility before proposing the continuity design.",
  },
  {
    title: "During solution fit",
    body: "Primary access, failover behavior, internal network considerations, and recovery expectations are clarified together.",
  },
  {
    title: "Before deployment",
    body: "Carrier behavior, cutover assumptions, recovery priorities, and support boundaries are aligned before go-live.",
  },
  {
    title: "After activation",
    body: "The customer has a cleaner understanding of what stays online, how failover behaves, and where future resilience improvements fit.",
  },
] as const;

const USE_CASES = [
  "Primary circuit failover for business-critical sites",
  "Payment, voice, and basic cloud continuity during access disruption",
  "Secondary-path design for retail, office, and multi-site operations",
  "Sites that need cleaner incident posture during internet outages",
  "Businesses that cannot rely on a single wired connection",
  "Organizations pairing continuity with Business Fibre, DIA, or managed networking",
] as const;

const FAQ = [
  {
    q: "What is LTE / 5G continuity architecture?",
    a: "It is a business continuity design that uses LTE or 5G as a secondary-path option when the primary internet service is disrupted. Orbitlink treats this as an operational resilience service, not just a backup device.",
  },
  {
    q: "Is this the same as a hotspot?",
    a: "No. A hotspot is typically an ad hoc backup tool. Continuity architecture is planned around failover behavior, traffic priorities, recovery expectations, and business operating needs.",
  },
  {
    q: "What should stay online during failover?",
    a: "That depends on the business. Common priorities include payments, voice, cloud applications, remote access, and essential communications. Orbitlink helps define what should remain reachable first.",
  },
  {
    q: "Will LTE or 5G continuity work in every building?",
    a: "Not always. Carrier performance depends on signal quality, site conditions, building materials, and device placement. Orbitlink reviews feasibility before recommending a continuity model.",
  },
  {
    q: "Can continuity be paired with Business Fibre or DIA?",
    a: "Yes. Continuity is most effective when paired with the primary access strategy, internal network posture, and any voice or static IP requirements that affect business operations.",
  },
  {
    q: "Do you offer this in Mississauga and Ontario?",
    a: "Yes. Orbitlink supports continuity planning for Mississauga and other Ontario business markets, subject to site scope, carrier feasibility, and service alignment.",
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

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "LTE / 5G Continuity Architecture Ontario | Orbitlink",
        description:
          "LTE and 5G continuity for Ontario businesses. Structured failover, traffic prioritization, and resilience planning. Check availability by address.",
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
        name: "LTE / 5G Continuity Architecture",
        serviceType: "Business Continuity Network Service",
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
          "Business continuity design using LTE and 5G failover with traffic prioritization and recovery planning.",
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
            name: "LTE / 5G Continuity",
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Continuity
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>BUSINESS RESILIENCE LAYER</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                LTE / 5G Continuity Architecture
                <span className="block text-white/62">
                  for businesses that cannot let one circuit define all uptime.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Continuity is not a backup gadget. It is an operating decision. Orbitlink designs
                LTE and 5G failover posture for businesses that need critical services to remain
                reachable when primary access is disrupted, with clearer prioritization, cleaner
                recovery expectations, and a more disciplined resilience model.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                The right continuity design depends on business priorities, site conditions, and
                carrier behavior. That is why Orbitlink positions this as a scoped continuity
                architecture rather than a one-size-fits-all backup device.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Failover posture",
                  "Critical traffic priority",
                  "Documented recovery expectations",
                  "Carrier feasibility review",
                  "Business resilience model",
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
                <CTAButton href="/contact#intake" primary>
                  Evaluate Continuity
                </CTAButton>
                <CTAButton href="/services/business-fibre-internet">
                  Pair with Primary Access
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-4">
              <SectionShell className="relative overflow-hidden p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <SectionEyebrow>BUYER FIT</SectionEyebrow>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Best for businesses that need cleaner outage posture
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    This service fits buyers who want a secondary-path strategy tied to real
                    business priorities instead of relying on unmanaged backup devices and improvised
                    outage behavior.
                  </p>

                  <div className="mt-5 grid gap-2">
                    {BUYER_FIT.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionShell>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="SERVICE TYPE" value="Secondary-path business continuity" />
            <MetricPill label="BEST FIT" value="Critical apps, voice, payments, core operations" />
            <MetricPill label="PAIRING" value="Business Fibre, DIA, managed network, voice" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>DESIGN PRINCIPLE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Resilience should be designed around operations, not assumed by hardware
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  A real continuity posture starts with business priorities: what traffic must stay
                  alive, what recovery behavior is acceptable, and what the site can realistically
                  support. That is what separates continuity design from a simple backup modem
                  approach.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
                <div className="mt-1 text-sm text-white/80">Resilience-first • Scope-led</div>
              </div>
            </div>
          </SectionShell>

          <div className="grid gap-4 md:grid-cols-2">
            {DESIGN_SIGNALS.map((item) => (
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
                  This page is designed to help buyers evaluate continuity as a business resilience
                  layer, not just a device or add-on circuit.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Resilience-focused" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {BUSINESS_OUTCOMES.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
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
                  A structured path from site review to operational readiness
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger providers often signal maturity through lifecycle clarity. This section
                  gives Orbitlink that same trust signal in simpler language buyers can understand
                  quickly.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner recovery" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {ASSURANCE_MODEL.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>WHAT WE DESIGN FOR</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Clean failover behavior for real business environments
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Continuity architecture should preserve the services that matter most to the site.
                  That may include cloud platforms, line-of-business systems, payments, voice
                  paths, remote access, or basic communications. The right design depends on the
                  business model, not just the access technology.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
                <div className="mt-1 text-sm text-white/80">Critical-first • Documented</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "Failover that preserves critical traffic first",
                "Defined cutover and recovery expectations",
                "Site-aware cellular feasibility review",
                "Documented continuity operating posture",
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
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUYING JOURNEY FIT</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Usually introduced after primary access is defined
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Continuity becomes more valuable when paired with the primary access strategy and
                  the rest of the site architecture. That includes broadband or DIA selection,
                  internal network posture, static addressing requirements, and operational
                  escalation expectations.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL SIGNAL</div>
                <div className="mt-1 text-sm text-white/80">Reduced outage exposure</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services/business-fibre-internet"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Business Fibre
              </Link>
              <Link
                href="/services/dedicated-internet-access"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Dedicated Internet Access
              </Link>
              <Link
                href="/services/managed-lan-wifi"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Managed LAN & Wi-Fi
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
                {USE_CASES.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell className="p-6 sm:p-8">
              <SectionEyebrow>NEXT STEP</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Define what must stay online before the outage happens
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                The strongest continuity outcomes come from a scoped review of site needs, critical
                applications, device profile, and feasible carrier behavior. Submit your business
                requirements to begin structured continuity planning.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact#intake" primary>
                  Evaluate Continuity
                </CTAButton>
                <CTAButton href="/trust">
                  Review Trust Posture
                </CTAButton>
              </div>
            </SectionShell>
          </div>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              LTE / 5G Continuity FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business resilience posture: scoped failover,
              clearer recovery expectations, and structured site qualification.
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
              <CTAButton href="/services">
                Explore Services
              </CTAButton>
              <CTAButton href="/contact#intake" primary>
                Evaluate Continuity
              </CTAButton>
            </div>
          </SectionShell>
        </div>
      </section>
    </main>
  );
}