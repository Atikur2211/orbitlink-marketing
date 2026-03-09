import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/dedicated-internet-access";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

export const metadata: Metadata = {
  title: "Dedicated Internet Access (DIA) | Orbitlink™",
  description:
    "Dedicated Internet Access for Ontario organizations that require committed business connectivity, clearer handoff expectations, structured onboarding, and a more formal enterprise delivery posture.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Dedicated Internet Access (DIA) | Orbitlink™",
    description:
      "Dedicated Internet Access with structured onboarding, address-qualified feasibility, and a cleaner enterprise delivery posture across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedicated Internet Access (DIA) | Orbitlink™",
    description:
      "Dedicated Internet Access with structured onboarding, clearer business expectations, and enterprise-grade delivery posture.",
  },
};

const FAQ = [
  {
    q: "What is Dedicated Internet Access (DIA)?",
    a: "Dedicated Internet Access is a business internet service designed for organizations that need a more formal access model, clearer handoff expectations, and a service posture aligned to critical operations. Orbitlink reviews DIA per address and confirms feasibility before activation.",
  },
  {
    q: "How is DIA different from Business Fibre?",
    a: "Business Fibre is often the right fit for offices and day-to-day operations that need strong capacity and stable business connectivity. DIA is better suited to organizations that require more formal service expectations, committed delivery posture, clearer enterprise handoff, or a cleaner model for business-critical internet access.",
  },
  {
    q: "Do you offer DIA in Mississauga?",
    a: "Yes. Orbitlink can evaluate Dedicated Internet Access opportunities in Mississauga and other Ontario markets, subject to building readiness, access feasibility, and upstream design.",
  },
  {
    q: "Do you offer static IPs on DIA?",
    a: "Static IP options may be available depending on the access design, routing model, and location. Orbitlink confirms addressing and related technical options during qualification and onboarding.",
  },
  {
    q: "How long does DIA installation take?",
    a: "Installation timelines vary by building readiness, landlord access, construction needs, and upstream coordination. Orbitlink uses structured onboarding with clearer checkpoints and documented acceptance before go-live.",
  },
  {
    q: "When should a business choose DIA?",
    a: "DIA is appropriate when generic broadband variance is not acceptable, when uptime posture matters to operations, or when the organization needs a cleaner enterprise-grade access model for voice, cloud, secure connectivity, or multi-site business operations.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dedicated Internet Access (DIA)",
        item: PAGE_URL,
      },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Dedicated Internet Access (DIA)",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario" },
      { "@type": "City", name: "Mississauga" },
    ],
    serviceType: [
      "Dedicated Internet Access",
      "Enterprise Internet Service",
      "Business-Critical Connectivity",
      "Structured Onboarding",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Business",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: PAGE_URL,
    },
    termsOfService: `${SITE_URL}/legal/terms`,
  };

  const faq = {
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

  return [breadcrumb, telecomService, faq];
}

const fitItems = [
  "Head offices, healthcare, logistics, and multi-site operations",
  "Voice, cloud, VPN, and other business-critical workflows",
  "Sites that need clearer handoff expectations and more formal support posture",
  "Environments where broadband variance is operationally unacceptable",
] as const;

const postureItems = [
  {
    title: "Address-qualified feasibility",
    desc: "Orbitlink confirms what is practical for the building before expectations are set.",
  },
  {
    title: "Structured onboarding",
    desc: "Defined checkpoints help keep installation, activation, and acceptance clearer.",
  },
  {
    title: "Enterprise delivery posture",
    desc: "Service discussions align more closely to business impact, escalation, and operational fit.",
  },
  {
    title: "Conservative disclosure",
    desc: "Orbitlink confirms serviceability, timelines, and constraints per site rather than making blanket promises.",
  },
] as const;

const useCases = [
  "Primary internet for business-critical applications",
  "Enterprise handoff for sensitive or higher-value environments",
  "Cloud, voice, VPN, and multi-site business connectivity",
  "Operational environments where downtime posture matters",
  "Core sites requiring disciplined onboarding and cleaner expectations",
  "Organizations designing premium network architecture around primary internet access",
] as const;

const businessOutcomes = [
  {
    title: "Stronger service matching",
    body: "Buyers can separate business fibre from DIA based on operational need, not just speed language.",
  },
  {
    title: "Cleaner qualification",
    body: "The page helps frame address, business impact, and handoff requirements before activation is discussed.",
  },
  {
    title: "More credible enterprise signal",
    body: "DIA is presented as a formal business access model rather than a vague premium upsell.",
  },
  {
    title: "Better long-term fit",
    body: "The service can support broader architecture decisions around voice, continuity, static IPs, and multi-site operations.",
  },
] as const;

const assuranceModel = [
  {
    title: "Before qualification",
    body: "Orbitlink reviews address, building context, and business-critical requirements before presenting DIA as the right fit.",
  },
  {
    title: "During service fit",
    body: "DIA is positioned clearly against Business Fibre so the buyer understands the operational difference.",
  },
  {
    title: "Before activation",
    body: "Feasibility, handoff assumptions, optional static IP needs, and service expectations are clarified before go-live.",
  },
  {
    title: "After deployment",
    body: "The client has a cleaner understanding of what was delivered, how the access model fits the site, and what future upgrades may look like.",
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

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-7 sm:pb-16 lg:px-10 lg:pb-20">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
                <span className="text-sm tracking-wide text-white/65">AUREX Internet</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/55">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Enterprise delivery posture
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Structured qualification
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionEyebrow>BUSINESS-CRITICAL CONNECTIVITY</SectionEyebrow>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.6rem] lg:leading-[0.98]">
                  Dedicated Internet Access
                  <span className="block text-white/62">
                    for organizations that need clearer business expectations.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">
                  DIA is designed for organizations that require a more formal access model,
                  clearer handoff expectations, and an internet service posture better aligned to
                  business-critical environments. Orbitlink approaches DIA with structured
                  qualification, measured delivery, and cleaner go-live expectations.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-7 text-white/62">
                  This is the right fit when internet access is not just about speed, but about
                  business impact, operational clarity, and a service model that supports core
                  applications, voice, cloud, and higher-value environments.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Address-qualified feasibility",
                    "Structured onboarding",
                    "Clearer enterprise fit",
                    "Formal delivery posture",
                    "Ontario business focus",
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
                    Request DIA Assessment
                  </Link>

                  <Link
                    href="/services/business-fibre-internet"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Compare with Business Fibre
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
                      Better for buyers who need formal fit, not generic broadband
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/64">
                      This page is designed to help organizations understand when DIA is the better
                      choice, what should be qualified before activation, and how the service fits
                      higher-value operational environments.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <MetricPill label="STEP 1" value="Confirm site and business impact" />
                      <MetricPill label="STEP 2" value="Determine DIA vs Business Fibre fit" />
                      <MetricPill label="STEP 3" value="Move into structured qualification" />
                    </div>
                  </div>
                </SectionShell>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricPill label="SERVICE TYPE" value="Business-critical internet access" />
              <MetricPill label="DELIVERY POSTURE" value="Formal, structured, enterprise-oriented" />
              <MetricPill label="BEST FIT" value="Core sites, voice, cloud, multi-site operations" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 sm:p-7">
            <SectionEyebrow>DELIVERY POSTURE</SectionEyebrow>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Built for business-critical environments
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              DIA engagements are scoped with more clarity than standard business internet.
              Feasibility checks, building conditions, access path assumptions, and installation
              sequence are addressed before activation. Orbitlink keeps the process structured so
              there is less ambiguity during delivery and cleaner alignment before go-live.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {postureItems.map((x) => (
                <div key={x.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold text-white/90">{x.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-white/55">
              Availability, handoff assumptions, addressing options, routing posture, and delivery
              timelines vary by address and upstream feasibility. Orbitlink confirms what is
              practical for the site before commitment.
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
                  What this service structure means for buyers
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  This page is designed to help buyers evaluate DIA as a formal business access
                  model rather than a vague premium internet label.
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
                  A structured path from qualification to operational use
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Larger telecom providers often signal maturity through service lifecycle clarity.
                  This section gives Orbitlink that same enterprise trust signal in simpler,
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

          <SectionShell className="p-6 sm:p-7">
            <SectionEyebrow>BUSINESS FIBRE VS DIA</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold tracking-tight">
              When to choose Business Fibre instead
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              If your organization needs strong capacity, stable business internet, and a premium
              onboarding posture without the more formal requirements of DIA, Business Fibre is
              often the right starting point. Orbitlink keeps that path clear and leaves room for
              future upgrades where requirements evolve.
            </p>
            <Link
              href="/services/business-fibre-internet"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 sm:w-auto"
            >
              View Business Fibre →
            </Link>
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-5 sm:p-6">
              <SectionEyebrow>LOCAL RELEVANCE</SectionEyebrow>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Orbitlink evaluates DIA opportunities across Ontario, including Mississauga and
                other business-dense commercial markets where serviceability and enterprise delivery
                posture support the site.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/locations/mississauga"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Mississauga DIA Context
                </Link>
                <Link
                  href="/internet-near-me"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Internet Near Me
                </Link>
              </div>
            </SectionShell>

            <SectionShell className="p-6 sm:p-7">
              <SectionEyebrow>NEXT STEP</SectionEyebrow>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Request a DIA assessment and include your address, go-live target, uptime posture,
                voice or network requirements, and whether static IPs or managed services are
                needed.
              </p>
              <Link
                href="/contact#intake"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#FDE047]"
              >
                Request DIA Assessment
              </Link>
            </SectionShell>
          </div>
        </div>

        <SectionShell className="mt-6 p-6 sm:p-7">
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
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FDE047]"
            >
              Request DIA Assessment
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Browse Locations
            </Link>
          </div>
        </SectionShell>
      </section>
    </main>
  );
}