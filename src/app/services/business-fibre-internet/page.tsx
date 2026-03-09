import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/business-fibre-internet";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

export const metadata: Metadata = {
  title: "Business Fibre Internet | Orbitlink™",
  description:
    "Business fibre internet for Ontario organizations with address-qualified availability, structured onboarding, disciplined delivery, and a premium business support posture.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet | Orbitlink™",
    description:
      "Business fibre internet with structured onboarding, address-qualified availability, and a cleaner delivery posture for organizations across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet | Orbitlink™",
    description:
      "Business fibre internet with structured onboarding, disciplined delivery, and availability confirmed per address.",
  },
};

const FAQ = [
  {
    q: "Do you offer business fibre internet in Ontario?",
    a: "Yes. Orbitlink offers business fibre internet across Ontario where building conditions, access feasibility, and upstream service design support deployment. Availability is confirmed per address rather than assumed universally.",
  },
  {
    q: "Do you offer business fibre internet in Mississauga?",
    a: "Yes. Mississauga is a priority commercial market for Orbitlink. Fibre availability depends on building infrastructure, access feasibility, and service design, and is confirmed during qualification.",
  },
  {
    q: "Is Orbitlink fibre symmetrical?",
    a: "Where the access method supports it, Orbitlink may offer symmetrical business fibre tiers under AUREX Internet, subject to site feasibility and service design.",
  },
  {
    q: "What is the difference between business fibre internet and Dedicated Internet Access?",
    a: "Business fibre internet is typically the right fit for offices, clinics, studios, and SMB environments that need strong day-to-day capacity and a clean business support experience. Dedicated Internet Access is better suited to business-critical environments that require more formal service expectations, committed delivery posture, and clearer handoff requirements.",
  },
  {
    q: "How do I check fibre availability?",
    a: "Use the Orbitlink intake path and include your address, business type, expected go-live date, and any requirements such as static IPs, voice, managed Wi-Fi, or continuity. Orbitlink will review feasibility and confirm next steps.",
  },
  {
    q: "Do you offer static IPs with business fibre internet?",
    a: "Static IP options may be available depending on service design, access method, and site feasibility. Orbitlink confirms availability during qualification and onboarding.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Business Fibre Internet", item: PAGE_URL },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Fibre Internet",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario" },
      { "@type": "City", name: "Mississauga" },
    ],
    serviceType: [
      "Business Fibre Internet",
      "Structured Onboarding",
      "Business Connectivity",
      "Managed Delivery Posture",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: PAGE_URL,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return [breadcrumb, telecomService, faqPage];
}

const typicalFit = [
  "SMB offices, clinics, studios, and professional suites",
  "Organizations using cloud apps, collaboration platforms, VoIP, and VPNs every day",
  "Businesses upgrading from cable or DSL inconsistency",
  "Sites that want a strong primary connection with room to upgrade later",
] as const;

const advantages = [
  "Availability reviewed per address before expectations are set",
  "Structured onboarding instead of generic plan-first selling",
  "Cleaner delivery and acceptance posture",
  "Premium business support orientation",
  "A practical upgrade path toward DIA, managed networking, continuity, or static IP requirements",
] as const;

const useCases = [
  "Primary office internet for day-to-day business operations",
  "Connectivity for cloud applications, video meetings, and VoIP",
  "Upgrade path from unstable cable or DSL environments",
  "Foundation layer before moving into DIA or managed network architecture",
  "Business internet for professional environments that need cleaner support expectations",
  "Core connectivity for sites that may later add managed Wi-Fi, voice, or continuity",
] as const;

const buyingOutcomes = [
  {
    title: "Cleaner qualification",
    body: "The service is positioned around address, scope, and real business fit before activation discussions move forward.",
  },
  {
    title: "Better service matching",
    body: "Buyers can distinguish standard business fibre from DIA before overbuying or underbuying connectivity.",
  },
  {
    title: "More predictable onboarding",
    body: "Structured intake reduces confusion around feasibility, features, and next steps.",
  },
  {
    title: "Stronger long-term fit",
    body: "The service can become the foundation for managed network layers, voice, continuity, or future infrastructure growth.",
  },
] as const;

const assuranceModel = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews address, building context, and operating requirements before presenting the service as a fit.",
  },
  {
    title: "During solution fit",
    body: "Business fibre is positioned clearly against other options such as DIA, managed networking, and continuity services.",
  },
  {
    title: "Before activation",
    body: "Availability, site conditions, and optional features such as static IPs are confirmed before expectations are finalized.",
  },
  {
    title: "After deployment",
    body: "The customer has a cleaner understanding of what was delivered, how the service should be used, and where upgrades fit later.",
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
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.035] ${className}`}>
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

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:px-7 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
              <span className="text-sm tracking-wide text-white/65">AUREX Internet</span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionEyebrow>BUSINESS CONNECTIVITY</SectionEyebrow>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.6rem] lg:leading-[0.98]">
                  Business Fibre Internet
                  <span className="block text-white/62">for organizations that need cleaner delivery.</span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/68 sm:text-lg">
                  AUREX Business Fibre is designed for organizations that need high-capacity
                  connectivity with structured onboarding, clearer qualification, and a premium
                  business support posture. Orbitlink confirms availability per address, reviews
                  building constraints before activation, and keeps service expectations cleaner
                  from the start.
                </p>

                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">
                  This service is built for Ontario businesses that want a stronger internet
                  experience without vague blanket claims. Where fibre feasibility exists,
                  Orbitlink aligns the right access method, onboarding sequence, and upgrade path
                  for the site.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Availability confirmed per address",
                    "Structured onboarding",
                    "Cleaner activation path",
                    "Business-grade support posture",
                    "Ontario commercial focus",
                  ].map((x) => (
                    <span
                      key={x}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/68"
                    >
                      {x}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FDE047]"
                  >
                    Check Fibre Availability
                  </Link>
                  <Link
                    href="/services/dedicated-internet-access"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Compare with DIA
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <SectionShell className="relative overflow-hidden p-6">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>

                  <div className="relative">
                    <SectionEyebrow>BUYING POSTURE</SectionEyebrow>
                    <div className="mt-3 text-lg font-semibold text-white">
                      Better for buyers who want fit before activation
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/64">
                      This page is designed to help buyers understand where business fibre fits,
                      when DIA may be the better option, and what should be qualified before a
                      go-live conversation begins.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <MetricPill label="STEP 1" value="Confirm address and business scope" />
                      <MetricPill label="STEP 2" value="Check fit for standard fibre vs DIA" />
                      <MetricPill label="STEP 3" value="Move into structured qualification" />
                    </div>
                  </div>
                </SectionShell>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricPill label="SERVICE TYPE" value="Primary business connectivity" />
              <MetricPill label="DELIVERY POSTURE" value="Structured, not improvised" />
              <MetricPill label="UPGRADE PATH" value="DIA, managed network, voice, continuity" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 md:p-8">
            <SectionEyebrow>BUSINESS FIT</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Built for real business operations
            </h2>

            <div className="mt-4 space-y-4 text-white/70 leading-relaxed">
              <p>
                Business fibre internet is often the right fit for modern offices, professional
                services firms, medical environments, creative teams, and growing organizations
                that rely on cloud platforms, collaboration tools, VoIP, and business applications
                throughout the day.
              </p>

              <p>
                Orbitlink does not position this service as “generic gigabit everywhere.” The goal
                is to confirm serviceability, match the access design to the site, and keep the
                onboarding path structured so customers understand what is feasible, what is
                included, and what the next step looks like.
              </p>

              <p>
                That creates a cleaner activation experience and gives organizations a better path
                to future upgrades if requirements expand toward DIA, managed LAN, enterprise
                Wi-Fi, continuity design, voice, or static IP needs.
              </p>
            </div>
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Typical fit</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {typicalFit.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </SectionShell>

            <SectionShell className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Why Orbitlink posture matters</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {advantages.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </SectionShell>
          </div>

          <SectionShell className="p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  What this service structure means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is designed to help organizations evaluate business fibre as a real
                  operating service, not just a speed label.
                </p>
              </div>

              <MetricPill label="MODE" value="Buyer-readable • Clarity-first" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {buyingOutcomes.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>SERVICE ASSURANCE MODEL</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  A structured path from qualification to operational use
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger telecom providers often signal maturity through service lifecycle clarity.
                  This section gives Orbitlink that same enterprise trust signal in simple language.
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

          <SectionShell className="p-6">
            <h2 className="text-lg font-semibold tracking-tight">Common business use cases</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {useCases.map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                >
                  {x}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell className="p-6">
            <SectionEyebrow>WHEN DIA IS BETTER</SectionEyebrow>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              When to choose Dedicated Internet Access instead
            </h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              If your environment requires more formal service expectations, committed delivery
              posture, clearer handoff requirements, or a more business-critical internet model,
              Dedicated Internet Access may be the better fit.
            </p>
            <Link
              href="/services/dedicated-internet-access"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 sm:w-auto"
            >
              View Dedicated Internet Access →
            </Link>
          </SectionShell>

          <SectionShell className="p-6 md:p-8">
            <SectionEyebrow>LOCAL RELEVANCE</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold tracking-tight">Ontario business focus</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Orbitlink prioritizes Ontario business connectivity with structured onboarding and
              clearer serviceability confirmation. For local commercial demand, start with our{" "}
              <Link
                href="/locations/mississauga"
                className="text-white/85 underline underline-offset-4 hover:text-white"
              >
                Mississauga business fibre page
              </Link>{" "}
              or request availability directly.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/locations/mississauga"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Mississauga Location Page
              </Link>
              <Link
                href="/internet-near-me"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Internet Near Me
              </Link>
            </div>
          </SectionShell>

          <p className="text-xs text-white/55">
            Availability, architecture, and optional features vary by building infrastructure and
            site serviceability. Orbitlink confirms feasibility per address and avoids blanket
            overclaims.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-7 lg:px-10">
        <SectionShell className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Business Fibre Internet FAQs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            These answers reflect a practical delivery posture: clear qualification, building-based
            feasibility, and a premium business service experience.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Explore Services
            </Link>
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FDE047]"
            >
              Check Fibre Availability
            </Link>
          </div>
        </SectionShell>
      </section>
    </main>
  );
}