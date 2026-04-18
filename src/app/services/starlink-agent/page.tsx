import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/starlink-agent";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE = `${SITE_URL}/twitter-image`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_PHONE_DISPLAY = "1-888-867-2480";
const BUSINESS_PHONE_E164 = "+18888672480";

export const metadata: Metadata = {
  title: "Starlink Access Coordination in Ontario",
  description:
    "Starlink internet coordination for Ontario businesses in remote or limited areas. Review feasibility and deployment options.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Starlink Access Coordination in Ontario | Orbitlink",
    description:
      "Satellite connectivity coordination for Ontario business sites where terrestrial connectivity is constrained, delayed, or impractical.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Orbitlink Starlink Access Coordination in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starlink Access Coordination in Ontario | Orbitlink",
    description:
      "Satellite connectivity coordination for Ontario business sites where terrestrial options are limited, delayed, or impractical.",
    images: [TWITTER_IMAGE],
  },
};

const USE_CASES = [
  {
    title: "Remote locations",
    desc: "Sites outside fibre or cable coverage where terrestrial connectivity cannot be provisioned within a reasonable timeframe.",
  },
  {
    title: "Temporary operations",
    desc: "Construction sites, temporary offices, and field environments that require rapid internet availability.",
  },
  {
    title: "Continuity scenarios",
    desc: "Secondary-path connectivity where terrestrial links remain the primary operating service.",
  },
  {
    title: "Edge deployments",
    desc: "Operational environments such as monitoring locations, remote sensors, and infrastructure control points.",
  },
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Cleaner satellite qualification",
    body: "Buyers can evaluate whether satellite is genuinely appropriate before treating it like a default internet service.",
  },
  {
    title: "Better expectation setting",
    body: "The service is framed around real constraints, site conditions, and operating fit rather than broad assumptions.",
  },
  {
    title: "More credible resilience posture",
    body: "Starlink can be positioned properly as a remote-access option, temporary path, or continuity layer instead of a universal replacement for terrestrial service.",
  },
  {
    title: "Stronger decision quality",
    body: "Organizations gain a clearer view of where satellite fits within access, continuity, and broader site architecture.",
  },
] as const;

const ASSURANCE_MODEL = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews location type, terrestrial limitations, deployment urgency, and business requirements before recommending satellite.",
  },
  {
    title: "During service fit",
    body: "Use cases, constraints, recovery expectations, and operational differences from terrestrial service are clarified early.",
  },
  {
    title: "Before deployment",
    body: "Site practicality, installation assumptions, and business expectations are aligned before onboarding proceeds.",
  },
  {
    title: "After activation",
    body: "The customer has a cleaner understanding of what satellite can support, where it fits, and when terrestrial access may still be the stronger long-term model.",
  },
] as const;

const FAQ = [
  {
    q: "Is this a direct Orbitlink terrestrial internet service?",
    a: "No. This page describes Starlink coordination through an agent or reseller model. It is not positioned the same way as Orbitlink terrestrial services such as Business Fibre or Dedicated Internet Access.",
  },
  {
    q: "When does Starlink make sense for a business?",
    a: "It is usually most relevant when terrestrial access is unavailable, delayed, impractical for the timeline, or when a secondary path is needed for continuity purposes.",
  },
  {
    q: "Can Starlink replace fibre or DIA?",
    a: "In some situations it may serve as the only viable option, but it is generally not positioned as a direct equivalent to fibre or dedicated terrestrial access. Orbitlink helps clarify when satellite is appropriate and when terrestrial service remains the better fit.",
  },
  {
    q: "Can Starlink be used for continuity?",
    a: "Yes. In some business environments it can serve as a secondary-path or continuity layer where terrestrial access remains the main service.",
  },
  {
    q: "Does Orbitlink review feasibility before recommending it?",
    a: "Yes. Orbitlink focuses on clarifying site conditions, business requirements, terrestrial constraints, and operating expectations before recommending Starlink coordination.",
  },
  {
    q: "Can Starlink be paired with other Orbitlink services?",
    a: "Yes. Depending on the use case, it may align with continuity planning, managed network design, or other business connectivity discussions where appropriate.",
  },
  {
    q: "Is Starlink best treated as a default business internet service?",
    a: "Usually no. It is generally best treated as a constrained-location option, temporary path, remote-access solution, or continuity-oriented service rather than the default answer where strong terrestrial access is available.",
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
          ? "inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FDE047]"
          : "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
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
      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
    >
      {children}
    </a>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Starlink Access Coordination in Ontario",
        description:
          "Starlink internet coordination for Ontario businesses where fibre is unavailable, delayed, or impractical.",
        isPartOf: {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          url: SITE_URL,
          name: SITE_NAME,
        },
        about: {
          "@type": "Thing",
          name: "Starlink internet for business",
        },
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
            name: "Starlink Access Coordination",
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
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Orbitlink Agent Services
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionEyebrow>SATELLITE ACCESS COORDINATION</SectionEyebrow>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Starlink Access Coordination in Ontario
                <span className="block text-white/62">
                  For sites where terrestrial connectivity is limited, delayed, or impractical
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
                Orbitlink can assist Ontario organizations with Starlink procurement and onboarding
                through an agent or reseller model. This is generally used where terrestrial
                infrastructure such as fibre or dedicated internet access cannot be deployed within
                the required timeline, or where satellite is being evaluated as a continuity-oriented option.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                The goal is not to present satellite as a universal replacement for terrestrial
                service. It is to clarify where Starlink genuinely fits, where it does not, and how
                it should be introduced within a cleaner business connectivity strategy.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                This service is commonly used by Ontario businesses that need a realistic option
                for remote sites, temporary operations, constrained deployment scenarios, or a
                continuity-oriented secondary path where terrestrial service remains primary.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Satellite connectivity coordination",
                  "Feasibility review",
                  "Clear deployment expectations",
                  "Continuity scenarios",
                  "Business fit first",
                ].map((item) => (
                  <TrustPill key={item}>{item}</TrustPill>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact#intake" primary>
                  Discuss Feasibility
                </CTAButton>
                <PhoneCTA>Call Now</PhoneCTA>
                <CTAButton href="/services/business-fibre-internet">
                  Review Terrestrial Options
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
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <div className="relative">
                  <SectionEyebrow>BUYER FIT</SectionEyebrow>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Best for sites where one terrestrial answer does not exist
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    This service fits buyers who need a realistic satellite option for remote,
                    temporary, constrained, or continuity-oriented environments and want that
                    decision framed with clearer business context.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      1. Confirm location, use case, and constraints
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      2. Review terrestrial vs satellite fit
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      3. Move into structured coordination
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <CTAButton href="/contact#intake" primary>
                      Discuss Feasibility
                    </CTAButton>
                    <PhoneCTA>Call Now</PhoneCTA>
                  </div>
                </div>
              </SectionShell>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="SERVICE TYPE" value="Satellite access coordination" />
            <MetricPill label="BEST FIT" value="Remote, temporary, constrained, or continuity sites" />
            <MetricPill label="POSITIONING" value="Business use case first, not hype-first" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-8">
            <SectionEyebrow>WHEN THIS MAKES SENSE</SectionEyebrow>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Satellite connectivity in specific business scenarios
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
              Satellite connectivity should usually be considered in situations where terrestrial
              access is unavailable, delayed, impractical, or best treated as secondary to a wider
              resilience plan. Orbitlink focuses on clarifying operational requirements before
              recommending this path.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {USE_CASES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-6"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-7">
            <SectionEyebrow>POSITIONING NOTE</SectionEyebrow>

            <h3 className="mt-3 text-xl font-semibold">
              Not the same as terrestrial operator service
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
              Starlink connectivity differs significantly from terrestrial infrastructure such as
              fibre or dedicated internet access. Orbitlink clarifies deployment constraints,
              operating expectations, and performance tradeoffs before recommending this model.
            </p>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                  What this service structure means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is designed to help buyers evaluate satellite access as a business use
                  case decision, not as a generic replacement for terrestrial connectivity.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Use-case focused" />
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
                  A structured path from site constraint to deployment decision
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger providers often signal maturity through service lifecycle clarity. This
                  section gives Orbitlink that same trust signal in language buyers can understand quickly.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner fit" />
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
            <SectionEyebrow>BUYING JOURNEY FIT</SectionEyebrow>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Usually introduced when terrestrial access is not the immediate answer
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Starlink becomes relevant when fibre, cable, or dedicated internet access cannot be
              delivered within the needed timeline, or when satellite is being reviewed as part of
              a broader continuity strategy. The strongest decisions happen when satellite is
              compared honestly against terrestrial options.
            </p>

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
                href="/services/managed-lan-wifi"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
              >
                Managed LAN & Wi-Fi
              </Link>
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Starlink Access FAQs
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              These answers reflect a practical business delivery posture: clearer use cases,
              cleaner expectation setting, and structured qualification before recommendation.
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
                Discuss Feasibility
              </CTAButton>
              <PhoneCTA>Call Now</PhoneCTA>
              <CTAButton href="/services/business-fibre-internet">
                Review Terrestrial Options
              </CTAButton>
            </div>
          </SectionShell>
        </div>
      </section>
    </div>
  );
}