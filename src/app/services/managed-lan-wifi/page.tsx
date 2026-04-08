import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/managed-lan-wifi";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const metadata: Metadata = {
  title: "Managed LAN & Enterprise Wi-Fi | Orbitlink",
  description:
    "Managed LAN and enterprise Wi-Fi for Ontario business environments. Segmentation, guest access, coverage planning, cleaner internal networking, and structured support for offices, commercial suites, and multi-tenant sites.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Managed LAN & Enterprise Wi-Fi | Orbitlink",
    description:
      "Managed LAN and enterprise Wi-Fi with segmentation, coverage planning, guest networking, and structured business support.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Managed LAN & Enterprise Wi-Fi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed LAN & Enterprise Wi-Fi | Orbitlink",
    description:
      "Managed LAN and enterprise Wi-Fi for business sites that need cleaner internal network performance and support clarity.",
    images: [TWITTER_IMAGE_URL],
  },
};

const CAPABILITIES = [
  {
    title: "Network segmentation",
    body: "Separate staff, guest, voice, IoT, and sensitive systems with clearer internal boundaries and reduced operational risk.",
  },
  {
    title: "Coverage planning",
    body: "Design Wi-Fi for real business use with practical attention to layout, density, interference, and roaming behavior.",
  },
  {
    title: "Cleaner support model",
    body: "Replace unmanaged retail gear and unclear responsibility with a more professional internal network posture.",
  },
  {
    title: "Growth-ready design",
    body: "Build a LAN and Wi-Fi layer that can expand as users, floors, devices, and service needs increase.",
  },
] as const;

const BUYER_SIGNALS = [
  "Multi-floor office environments",
  "Professional services firms",
  "Commercial suites and tenant spaces",
  "Guest + staff network separation",
  "Voice and device density planning",
  "Managed operational support posture",
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Cleaner user experience",
    body: "A stronger internal network reduces the feeling that every issue is “the internet” when the problem is actually local Wi-Fi or switching.",
  },
  {
    title: "Better service separation",
    body: "Buyers can separate internet access from the internal network layer and understand why both matter.",
  },
  {
    title: "More credible support posture",
    body: "Managed LAN and Wi-Fi makes the site feel more professionally designed and easier to operate.",
  },
  {
    title: "Stronger long-term fit",
    body: "The network layer becomes a foundation for voice, continuity, IoT, segmentation, and future site growth.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews site context, user profile, device count, floor layout, and network objectives before proposing the design.",
  },
  {
    title: "During solution fit",
    body: "LAN, Wi-Fi, segmentation, guest access, and related needs are clarified against the business environment rather than guessed later.",
  },
  {
    title: "Before deployment",
    body: "Coverage assumptions, support boundaries, and design expectations are aligned before go-live.",
  },
  {
    title: "After activation",
    body: "The customer has a cleaner understanding of the internal network posture, support model, and future upgrade path.",
  },
] as const;

const USE_CASES = [
  "Office Wi-Fi for staff, guests, and meeting rooms",
  "Multi-suite or multi-floor business environments",
  "Professional firms with secure internal segmentation needs",
  "Sites supporting VoIP, video meetings, and cloud applications",
  "Operational environments with device density or roaming needs",
  "Businesses replacing unmanaged routers and inconsistent Wi-Fi",
] as const;

const FAQ = [
  {
    q: "What is managed LAN and enterprise Wi-Fi?",
    a: "It is a professionally designed internal network layer for business sites, including switching, Wi-Fi design, segmentation, guest networking, and clearer support expectations. Orbitlink positions this as the internal network foundation that sits behind your internet access service.",
  },
  {
    q: "How is managed Wi-Fi different from standard business internet?",
    a: "Business internet provides external connectivity to the site. Managed LAN and Wi-Fi focuses on how that connectivity is distributed inside the business environment through switching, wireless coverage, segmentation, and internal device behavior.",
  },
  {
    q: "Who should consider managed LAN and enterprise Wi-Fi?",
    a: "Organizations with multiple users, guest access needs, device density, voice requirements, security segmentation needs, or unreliable internal Wi-Fi should usually consider it.",
  },
  {
    q: "Can this be paired with Business Fibre or DIA?",
    a: "Yes. Managed LAN and enterprise Wi-Fi is often paired with Business Fibre, Dedicated Internet Access, continuity services, voice, and static IP requirements to create a cleaner site-wide operating model.",
  },
  {
    q: "Do you support guest Wi-Fi and segmentation?",
    a: "Yes. Orbitlink can design staff, guest, voice, IoT, and other segmented network layers depending on site requirements and business fit.",
  },
  {
    q: "Do you offer this in Mississauga and Ontario?",
    a: "Yes. Orbitlink supports managed LAN and enterprise Wi-Fi discussions in Mississauga and other Ontario business markets, subject to site scope and service alignment.",
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
        name: "Managed LAN & Enterprise Wi-Fi | Orbitlink",
        description:
          "Managed LAN and enterprise Wi-Fi for Ontario business environments. Segmentation, guest access, coverage planning, cleaner internal networking, and structured support for offices, commercial suites, and multi-tenant sites.",
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
        name: "Managed LAN & Enterprise Wi-Fi",
        serviceType: "Managed Network Services",
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
          "Managed LAN and enterprise Wi-Fi for business environments, including segmentation, guest networking, coverage planning, and structured support posture.",
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
            name: "Managed LAN & Enterprise Wi-Fi",
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
            Managed Network
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>INTERNAL NETWORK LAYER</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Managed LAN & Enterprise Wi-Fi
                <span className="block text-white/62">
                  for businesses that need cleaner internal network performance.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                This service is built for business environments that need more than consumer-grade
                routers and inconsistent Wi-Fi. Orbitlink designs the internal network layer for
                offices, commercial suites, multi-tenant floors, and operational environments where
                segmentation, coverage quality, device behavior, and support clarity matter.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                Buyers often start with internet access, but internal LAN and Wi-Fi quality is what
                employees, guests, and devices actually experience. A stronger internal network
                turns connectivity into something cleaner, more stable, and easier to support.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Segmentation-ready",
                  "Guest + staff separation",
                  "Coverage planning",
                  "Cleaner support model",
                  "Business-grade internal networking",
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
                  Request Network Design
                </CTAButton>
                <CTAButton href="/services/business-fibre-internet">
                  Pair with Business Fibre
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
                    Best for businesses moving beyond unmanaged internal networking
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    This is usually the right layer for teams dealing with weak Wi-Fi, flat
                    networks, retail-grade routers, unclear support ownership, or growing internal
                    device requirements.
                  </p>

                  <div className="mt-5 grid gap-2">
                    {BUYER_SIGNALS.map((item) => (
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
            <MetricPill label="SERVICE TYPE" value="Managed internal network layer" />
            <MetricPill label="BEST FIT" value="Offices, suites, guest access, device density" />
            <MetricPill label="PAIRING" value="Business Fibre, DIA, continuity, voice" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>OPERATIONAL VALUE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  Stable internal networking is part of the customer experience
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Buyers often focus first on internet access, but internal LAN and Wi-Fi quality
                  determines how teams actually experience that service. A stronger internal network
                  reduces instability, support noise, and the “bad internet” feeling caused by poor
                  local design.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
                <div className="mt-1 text-sm text-white/80">
                  Structured design • Cleaner handoff
                </div>
              </div>
            </div>
          </SectionShell>

          <div className="grid gap-4 md:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <SectionShell key={c.title} className="p-6">
                <h2 className="text-lg font-semibold tracking-tight text-white">{c.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/68">{c.body}</p>
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
                  This page is designed to help buyers evaluate managed LAN and Wi-Fi as a business
                  operations layer, not just an accessory to internet service.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Operations-focused" />
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
                  A structured path from site review to operational use
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger providers often signal maturity through service lifecycle clarity. This
                  section gives Orbitlink that same trust signal in simpler language buyers can
                  understand quickly.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner support" />
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
                <SectionEyebrow>BUYING JOURNEY FIT</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Usually paired with primary access and continuity planning
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                  Managed LAN and Wi-Fi becomes most valuable when aligned with the broader service
                  stack: primary connectivity, resilience posture, static addressing, and voice.
                  This creates a cleaner operating environment and a more premium site experience.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL SIGNAL</div>
                <div className="mt-1 text-sm text-white/80">Higher-value site architecture</div>
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
            <SectionShell className="p-6 sm:p-7">
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
                Scope the site before devices become the problem
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                The strongest outcomes happen when access, LAN, Wi-Fi, and support posture are
                aligned early. Submit your site details, device profile, floor layout, and any
                guest, voice, or segmentation needs to begin structured qualification.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact#intake" primary>
                  Request Network Design
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
              Managed LAN & Enterprise Wi-Fi FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business delivery posture: cleaner internal network
              design, clearer support expectations, and structured site qualification.
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
                Request Network Design
              </CTAButton>
            </div>
          </SectionShell>
        </div>
      </section>
    </main>
  );
}