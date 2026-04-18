import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/dedicated-internet-access";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_PHONE_DISPLAY = "1-888-867-2480";
const BUSINESS_PHONE_E164 = "+18888672480";

export const metadata: Metadata = {
  title: "Dedicated Internet Access in Ontario",
  description:
    "Dedicated Internet Access for Ontario businesses that need stronger uptime, more predictable performance, and a more formal service model. Check availability and pricing for your address.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Dedicated Internet Access in Ontario | Orbitlink",
    description:
      "Dedicated business internet for Ontario offices, healthcare, logistics, warehouses, and multi-site operations. Check availability and pricing.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Dedicated Internet Access in Ontario | Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedicated Internet Access in Ontario | Orbitlink",
    description:
      "Dedicated business internet for Ontario organizations that need stronger uptime, predictable performance, and a more formal service model.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const FAQ = [
  {
    q: "What is Dedicated Internet Access (DIA)?",
    a: "Dedicated Internet Access is a dedicated business internet service for organizations that need stronger uptime expectations, more predictable performance, and a more formal service model than standard business broadband.",
  },
  {
    q: "How is DIA different from Business Fibre?",
    a: "Business Fibre is often the better fit for everyday office and commercial use when strong performance and good value matter most. DIA is better for sites where internet access is more critical to operations and cleaner service expectations are required.",
  },
  {
    q: "Do you offer dedicated internet in Ontario?",
    a: "Yes. Orbitlink supports Dedicated Internet Access opportunities across Ontario, including Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Milton, and other commercial markets, subject to building and serviceability review.",
  },
  {
    q: "Do you offer dedicated internet in Mississauga?",
    a: "Yes. Mississauga is one of Orbitlink’s priority commercial markets. DIA availability depends on the building, access path, and upstream design at the address.",
  },
  {
    q: "Do you offer static IPs with DIA?",
    a: "Static IP options may be available depending on the access design, routing model, and site requirements. Orbitlink confirms this during service review.",
  },
  {
    q: "How long does DIA installation take?",
    a: "Install timelines depend on the building, landlord access, construction requirements, and upstream coordination. Some locations are ready faster than others.",
  },
  {
    q: "When should a business choose dedicated internet instead of business fibre?",
    a: "Choose DIA when downtime has a bigger business impact, when cloud, voice, VPN, or multi-site operations depend on a stronger service model, or when standard business broadband is not enough for the environment.",
  },
  {
    q: "What types of businesses usually buy DIA?",
    a: "DIA is often a fit for head offices, healthcare environments, logistics operations, warehouses, multi-site organizations, and other business-critical sites that need stronger internet reliability.",
  },
  {
    q: "Is DIA better than standard business broadband for critical operations?",
    a: "For sites where uptime and service expectations matter more, DIA is often the stronger fit because it is positioned for more critical business use than standard business broadband.",
  },
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Dedicated Internet Access in Ontario",
        description:
          "Dedicated Internet Access for Ontario businesses that need stronger uptime, more predictable performance, static IP options, and a more formal service model. Check availability by address.",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
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
            name: "Dedicated Internet Access",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Dedicated Internet Access",
        url: PAGE_URL,
        provider: {
          "@id": ORG_ID,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        serviceType: "Dedicated Internet Access",
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
        termsOfService: `${SITE_URL}/legal/terms`,
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

const fitItems = [
  "Head offices, healthcare, logistics, and multi-site operations",
  "Voice, cloud, VPN, and other business-critical workflows",
  "Sites that need stronger uptime and clearer service expectations",
  "Environments where standard broadband variance is not acceptable",
] as const;

const whyDia = [
  {
    title: "Stronger uptime model",
    desc: "Better suited to environments where internet reliability directly affects operations.",
  },
  {
    title: "More predictable performance",
    desc: "Built for organizations that need a more formal dedicated business internet model.",
  },
  {
    title: "Clearer service expectations",
    desc: "A better fit when the business needs stronger alignment around install, delivery, and support.",
  },
  {
    title: "Better fit for critical sites",
    desc: "Useful for locations where voice, cloud, VPN, and multi-site operations depend on stable access.",
  },
] as const;

const useCases = [
  "Primary internet for business-critical applications",
  "Cloud, voice, VPN, and multi-site connectivity",
  "Healthcare, office, warehouse, and logistics operations",
  "Core sites where downtime creates operational risk",
  "Organizations that need dedicated business internet instead of generic broadband",
  "Sites that may also require static IPs, backup internet, or managed network support",
] as const;

const businessOutcomes = [
  {
    title: "Stronger service matching",
    body: "Buyers can separate Business Fibre from DIA based on business impact, not only speed language.",
  },
  {
    title: "Cleaner buying decision",
    body: "The page helps define when dedicated business internet is the right step up from standard business broadband.",
  },
  {
    title: "More credible enterprise signal",
    body: "DIA is presented as a real business access model for critical environments, not just a premium upsell.",
  },
  {
    title: "Better long-term fit",
    body: "The service can support broader decisions around voice, backup, static IPs, routing, and multi-site growth.",
  },
] as const;

const assuranceModel = [
  {
    title: "Before review",
    body: "Orbitlink reviews the address, building context, and business impact before presenting DIA as the right fit.",
  },
  {
    title: "During solution fit",
    body: "DIA is positioned clearly against Business Fibre so the buyer understands the operational difference.",
  },
  {
    title: "Before installation",
    body: "Building readiness, access assumptions, static IP needs, and service expectations are clarified before go-live.",
  },
  {
    title: "After deployment",
    body: "The client has a clearer understanding of what was delivered, how the connection fits the site, and what upgrade options may come next.",
  },
] as const;

function SectionShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.04] ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
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

function TrustPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/68">
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
  children: ReactNode;
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

function PhoneCTA({ children }: { children: ReactNode }) {
  return (
    <a
      href={`tel:${BUSINESS_PHONE_E164}`}
      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-7 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
              <span className="text-sm tracking-wide text-white/65">
                Orbitlink Dedicated Internet
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionEyebrow>BUSINESS-CRITICAL INTERNET</SectionEyebrow>

                <h1 className="mt-4 text-[2.3rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.4rem] lg:leading-[0.98]">
                  Dedicated Internet Access in Ontario
                  <span className="block text-white/62">
                    For businesses that need a stronger internet service model
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
                  Dedicated Internet Access in Ontario is for businesses that need stronger uptime,
                  more predictable performance, and a more formal dedicated business internet model
                  for critical operations.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-7 text-white/65">
                  This is often the right fit for head offices, healthcare, logistics, warehouses,
                  multi-site operations, voice-heavy environments, and other sites where downtime
                  carries a bigger business impact.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-7 text-white/65">
                  If your business depends on internet for operations, downtime is not just an
                  inconvenience. It becomes a business risk. Dedicated Internet Access is designed
                  for environments where that risk needs to be reduced.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-7 text-white/65">
                  This service is commonly used as the primary dedicated business internet connection
                  for Ontario organizations that need stronger service expectations around reliability,
                  performance, and operational continuity.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Availability checked by address",
                    "Dedicated business internet (not standard broadband)",
                    "Built for critical operations",
                    "Static IP and routing options",
                    "Ontario business-focused provider",
                  ].map((x) => (
                    <TrustPill key={x}>{x}</TrustPill>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAButton href="/contact#intake" primary>
                    Check DIA Availability
                  </CTAButton>
                  <PhoneCTA>Call Now</PhoneCTA>
                  <CTAButton href="/services/business-fibre-internet">
                    Compare DIA vs Business Fibre
                  </CTAButton>
                </div>

                <div className="mt-3 text-xs text-[#FDE68A]">
                  Priority response for Ontario business requests this week
                </div>

                <div className="mt-2 text-xs text-white/55">
                  No obligation • Address-based review • Clear next step provided
                </div>

                <div className="mt-2 text-sm text-white/58">
                  Availability depends on building infrastructure and upstream access. Submit your
                  address to confirm feasibility.
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <MetricPill label="BEST FOR" value="Critical business internet needs" />
                  <MetricPill label="START WITH" value="Address, building, and operational need" />
                  <MetricPill label="NEXT STEP" value="Pricing, install path, and service fit" />
                </div>
              </div>

              <div className="lg:col-span-4">
                <SectionShell className="relative overflow-hidden p-6">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>

                  <div className="relative">
                    <SectionEyebrow>FAST BUYER SUMMARY</SectionEyebrow>
                    <div className="mt-3 text-lg font-semibold text-white">
                      Better for organizations where downtime matters more
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/64">
                      Usually the stronger fit for healthcare, head offices, logistics, warehouses,
                      cloud-heavy sites, voice-dependent teams, and multi-site business environments.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <MetricPill label="STEP 1" value="Share your service address" />
                      <MetricPill label="STEP 2" value="Review DIA vs Business Fibre fit" />
                      <MetricPill label="STEP 3" value="Move to pricing and installation" />
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <CTAButton href="/contact#intake" primary>
                        Check DIA Availability
                      </CTAButton>
                      <PhoneCTA>Call Now</PhoneCTA>
                    </div>
                  </div>
                </SectionShell>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <div className="text-[11px] tracking-[0.28em] text-white/45">
                    COMMERCIAL TRUST SIGNALS
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/66">
                    Dedicated internet should be evaluated with clarity around business impact,
                    building fit, and operational need. This page is structured to help serious
                    buyers understand when DIA is the right answer.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:min-w-[520px]">
                  <TrustPill>Business-only service path</TrustPill>
                  <TrustPill>Availability checked per address</TrustPill>
                  <TrustPill>Ontario commercial focus</TrustPill>
                  <TrustPill>Operated by TIRAV Technologies Inc.</TrustPill>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricPill label="SERVICE TYPE" value="Dedicated business internet access" />
              <MetricPill label="SERVICE MODEL" value="Formal, structured, business-critical" />
              <MetricPill label="BEST FIT" value="Voice, cloud, logistics, healthcare, multi-site" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-7">
            <SectionEyebrow>WHY BUSINESSES BUY DIA</SectionEyebrow>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Built for business-critical environments
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              DIA is for sites where internet access is tied closely to business operations.
              Instead of treating the connection like a generic broadband product, this service is
              positioned around business impact, stronger uptime needs, and a more formal access model.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {whyDia.map((x) => (
                <div key={x.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold text-white/90">{x.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-white/55">
              Availability, routing model, static IP options, handoff assumptions, and install
              timelines vary by address and building conditions. Orbitlink confirms what is practical
              before commitment.
            </div>
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-6 sm:p-7">
              <h2 className="text-lg font-semibold tracking-tight">Typical fit</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {fitItems.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </SectionShell>

            <SectionShell className="p-6 sm:p-7">
              <h2 className="text-lg font-semibold tracking-tight">Common business use cases</h2>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {useCases.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </SectionShell>
          </div>

          <SectionShell className="p-6 sm:p-7 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  What this service means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page helps buyers evaluate dedicated internet as a real business access model,
                  not just a premium label.
                </p>
              </div>

              <MetricPill label="MODE" value="Enterprise-readable • Clarity-first" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {businessOutcomes.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-7 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE ASSURANCE MODEL</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  A structured path from review to operational use
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This section gives Orbitlink a stronger enterprise signal in simpler,
                  buyer-readable language.
                </p>
              </div>

              <MetricPill label="ENTERPRISE SIGNAL" value="Defined sequence • Cleaner delivery" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {assuranceModel.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 sm:p-7 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>DIA VS BUSINESS FIBRE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Dedicated Internet Access vs Business Fibre
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This comparison helps Ontario businesses understand when Dedicated Internet Access
                  is the stronger fit and when Business Fibre is the better starting point.
                </p>
              </div>

              <MetricPill label="BUYER CLARITY" value="Choose the right service sooner" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-medium text-white/90">Choose DIA when</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>• Downtime has a bigger business impact</li>
                  <li>• Voice, cloud, VPN, or multi-site operations depend on stable access</li>
                  <li>• Stronger service expectations are required</li>
                  <li>• Standard business broadband is not enough for the environment</li>
                </ul>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-medium text-white/90">Choose Business Fibre when</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>• The site needs strong everyday business internet</li>
                  <li>• Offices and commercial suites need reliability and good value</li>
                  <li>• The environment does not require the more formal DIA model</li>
                  <li>• The business wants a strong primary connection with upgrade flexibility</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/services/business-fibre-internet">
                View Business Fibre
              </CTAButton>
              <CTAButton href="/contact#intake" primary>
                Check DIA Availability
              </CTAButton>
            </div>
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-5 sm:p-6">
              <SectionEyebrow>LOCAL RELEVANCE</SectionEyebrow>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Orbitlink evaluates Dedicated Internet Access opportunities across Ontario,
                including Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Milton,
                and other business-dense markets where the building and access path support DIA.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/locations/mississauga"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Mississauga Service Area
                </Link>
                <Link
                  href="/locations/toronto"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Toronto Service Area
                </Link>
              </div>
            </SectionShell>

            <SectionShell className="p-6 sm:p-7">
              <SectionEyebrow>NEXT STEP</SectionEyebrow>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Request a DIA assessment and include your address, target install timing,
                uptime expectations, voice or network requirements, and whether static IPs
                or managed services are needed.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <CTAButton href="/contact#intake" primary>
                  Check DIA Availability
                </CTAButton>
                <PhoneCTA>Call {BUSINESS_PHONE_DISPLAY}</PhoneCTA>
              </div>
            </SectionShell>
          </div>
        </div>

        <SectionShell className="mt-6 p-6 sm:p-7 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            Dedicated Internet Access FAQs
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="text-sm font-semibold text-white/90">{f.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/contact#intake" primary>
              Check DIA Availability
            </CTAButton>
            <PhoneCTA>Call Now</PhoneCTA>
            <CTAButton href="/services/business-fibre-internet">
              Compare DIA vs Business Fibre
            </CTAButton>
          </div>
        </SectionShell>
      </section>
    </main>
  );
}