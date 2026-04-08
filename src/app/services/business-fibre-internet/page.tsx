import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/services/business-fibre-internet";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const metadata: Metadata = {
  title: "Business Fibre Internet Ontario | Orbitlink",
  description:
    "Business fibre internet for Ontario organizations. Reliable speeds for offices, clinics, warehouses, and commercial locations. Check availability.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Fibre Internet Ontario | Orbitlink",
    description:
      "Fast, reliable business fibre internet for Ontario offices, clinics, warehouses, and commercial locations. Check availability by address.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Business Fibre Internet Ontario | Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet Ontario | Orbitlink",
    description:
      "Business fibre internet for Ontario commercial locations with address-based availability and a clear path to pricing and installation.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const FAQ = [
  {
    q: "Do you offer business fibre internet in Ontario?",
    a: "Yes. Orbitlink supports business fibre internet across Ontario where building infrastructure and access feasibility support deployment. Availability is checked by address before service is confirmed.",
  },
  {
    q: "Do you offer business fibre internet in Mississauga, Toronto, Brampton, and other Ontario cities?",
    a: "Yes. Orbitlink focuses on Ontario commercial locations including Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Milton, Ottawa, and nearby business markets, subject to building and serviceability review.",
  },
  {
    q: "What businesses is this service best for?",
    a: "Business fibre internet is often a strong fit for offices, clinics, professional firms, retail operations, studios, warehouses, and growing teams that rely on cloud apps, video meetings, VoIP, and day-to-day operational connectivity.",
  },
  {
    q: "Is business fibre internet symmetrical?",
    a: "Where the access method supports it, symmetrical business fibre may be available. Final speeds and design depend on site feasibility and the access method available at the building.",
  },
  {
    q: "Can I get static IPs with business fibre internet?",
    a: "Static IP options may be available depending on the service design and access method. Orbitlink confirms this during availability and service fit review.",
  },
  {
    q: "What is the difference between business fibre internet and Dedicated Internet Access?",
    a: "Business fibre internet is usually a better fit for everyday business operations that need strong performance and good value. Dedicated Internet Access is better suited to higher-criticality environments that need stronger uptime expectations, committed bandwidth, and clearer handoff requirements.",
  },
  {
    q: "How do I check business fibre availability for my address?",
    a: "Use the Orbitlink contact form and include your business address, company name, target install timing, and any requirements such as voice, static IPs, managed Wi-Fi, or backup connectivity. Orbitlink reviews the address and confirms the next step.",
  },
  {
    q: "Do you help with Wi-Fi, voice, and backup internet too?",
    a: "Yes. Orbitlink can also review managed Wi-Fi, business voice, LTE/5G backup internet, and service upgrade paths around the primary connection.",
  },
  {
    q: "How fast is business fibre internet?",
    a: "Speeds depend on the building and access method, but business fibre is typically much faster and more stable than cable or DSL for business use.",
  },
  {
    q: "How long does installation take?",
    a: "Install timelines depend on the building, access method, and site conditions. Some locations move quickly while others may require more setup work.",
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
        name: "Business Fibre Internet Ontario | Orbitlink",
        description:
          "Business fibre internet for Ontario offices, clinics, warehouses, and commercial locations. Check availability by address and get pricing, install guidance, and upgrade options.",
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
            item: SITE_URL,
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
            name: "Business Fibre Internet",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Business Fibre Internet",
        url: PAGE_URL,
        provider: {
          "@id": ORG_ID,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        serviceType: "Business Fibre Internet",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact#intake`,
        },
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

const fitCards = [
  {
    title: "Professional offices",
    body: "Reliable internet for law firms, accounting firms, consultants, brokerages, and admin-heavy teams.",
  },
  {
    title: "Medical & clinic environments",
    body: "Connectivity for reception, cloud systems, booking platforms, payment terminals, and daily patient-facing workflows.",
  },
  {
    title: "Studios & creative teams",
    body: "A cleaner primary connection for design teams, agencies, media workflows, and collaborative cloud usage.",
  },
  {
    title: "Commercial & light industrial sites",
    body: "Business internet for operations, office staff, warehouse administration, and multi-user business activity.",
  },
] as const;

const keyBenefits = [
  "Check availability by address before expectations are set",
  "Built for business use, not residential-style selling",
  "Clear path to pricing, installation, and upgrade options",
  "Optional static IPs, managed Wi-Fi, voice, and backup internet",
  "Ontario-focused commercial service model",
  "Clearer buyer understanding before go-live",
] as const;

const useCases = [
  "Primary internet for offices and commercial suites",
  "Cloud applications, Microsoft 365, Google Workspace, and line-of-business systems",
  "Video conferencing, VPN, remote collaboration, and VoIP",
  "Replacing unstable cable or older copper-based connectivity",
  "Business sites that may later add managed Wi-Fi, static IPs, or backup internet",
  "Operational connectivity for growing teams that need a more professional service path",
] as const;

const whySwitch = [
  "More stable than cable or DSL for business use",
  "Better performance for cloud apps and business voice",
  "Handles multiple users and devices more cleanly",
  "Supports business growth and future upgrades",
  "Gives a stronger foundation for Wi-Fi, voice, and backup services",
] as const;

const comparison = [
  {
    label: "Best for",
    fibre: "Offices, clinics, studios, retail, SMB sites, and day-to-day business operations",
    dia: "Higher-criticality environments that need more formal service expectations",
  },
  {
    label: "Commercial model",
    fibre: "Strong business connectivity with structured onboarding",
    dia: "More formal delivery expectations and clearer handoff requirements",
  },
  {
    label: "Typical buyer",
    fibre: "Organizations upgrading from cable, DSL, or inconsistent business internet",
    dia: "Organizations with stricter uptime requirements and more business-critical use",
  },
  {
    label: "Upgrade path",
    fibre: "Managed Wi-Fi, voice, backup internet, static IPs, future scaling",
    dia: "Built for higher-criticality connectivity requirements from the start",
  },
] as const;

const cityLinks = [
  { href: "/locations/mississauga", label: "Mississauga" },
  { href: "/locations/toronto", label: "Toronto" },
  { href: "/locations/brampton", label: "Brampton" },
  { href: "/locations/oakville", label: "Oakville" },
  { href: "/locations/vaughan", label: "Vaughan" },
  { href: "/locations/markham", label: "Markham" },
  { href: "/locations/milton", label: "Milton" },
  { href: "/locations/ottawa", label: "Ottawa" },
] as const;

function SectionShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.035] ${className}`}>
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
              <span className="text-sm tracking-wide text-white/65">AUREX Internet</span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionEyebrow>ONTARIO BUSINESS INTERNET</SectionEyebrow>

                <h1 className="mt-4 text-[2.3rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.4rem] lg:leading-[0.98]">
                  Business Fibre Internet
                  <span className="block text-white/62">
                    for Ontario offices, clinics, warehouses, and commercial locations
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/72 sm:text-lg">
                  Fast, reliable business fibre internet for Ontario companies. Built for offices,
                  clinics, warehouses, and growing teams that depend on cloud apps, VoIP, video meetings,
                  and daily operations.
                </p>

                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/65">
                  Check availability at your address and get clear pricing, installation guidance,
                  and the right setup for your business.
                </p>

                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/65">
                  Business fibre internet is one of the strongest options for organizations moving
                  away from unstable cable, older copper access, or internet that no longer fits
                  a growing business environment.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "Check availability by address",
                    "Built for business use",
                    "Clear path to pricing and install guidance",
                    "Static IP, Wi-Fi, voice, and backup options",
                    "Ontario business-focused provider",
                  ].map((x) => (
                    <TrustPill key={x}>{x}</TrustPill>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAButton href="/contact#intake" primary>
                    Check Availability
                  </CTAButton>
                  <CTAButton href="/contact#intake">
                    Get Pricing
                  </CTAButton>
                  <CTAButton href="/services/dedicated-internet-access">
                    Compare Options
                  </CTAButton>
                </div>

                <div className="mt-3 text-sm text-white/58">
                  Availability varies by building. Submit your address to confirm service fit.
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <MetricPill label="BEST FOR" value="Reliable primary business internet" />
                  <MetricPill label="START WITH" value="Address, building, and business need" />
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
                      Best for businesses that need a strong primary connection
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/64">
                      Usually a strong fit for offices, clinics, studios, commercial suites,
                      and operational teams that rely on cloud apps, video meetings, VoIP,
                      and stable day-to-day internet.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <MetricPill label="STEP 1" value="Share your service address" />
                      <MetricPill label="STEP 2" value="Review building and service fit" />
                      <MetricPill label="STEP 3" value="Move to pricing and onboarding" />
                    </div>

                    <div className="mt-5">
                      <CTAButton href="/contact#intake" primary>
                        Start Availability Check
                      </CTAButton>
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
                    Business fibre should be sold with clarity around site fit, building feasibility,
                    and operational use. This page is structured to help commercial buyers understand
                    fit before installation.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:min-w-[540px]">
                  <TrustPill>Business-first service path</TrustPill>
                  <TrustPill>Availability checked per address</TrustPill>
                  <TrustPill>Operated by TIRAV Technologies Inc.</TrustPill>
                  <TrustPill>Ontario-focused commercial coverage</TrustPill>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
        <div className="space-y-4 sm:space-y-6">
          <SectionShell className="p-6 md:p-8">
            <SectionEyebrow>WHY BUSINESSES BUY THIS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Business internet built for real operating environments
            </h2>

            <div className="mt-4 space-y-4 text-white/70 leading-relaxed">
              <p>
                Business fibre internet is often the right fit for organizations that need
                reliable primary internet for staff, cloud applications, customer service
                workflows, business voice, and day-to-day operations.
              </p>

              <p>
                Instead of presenting this as a generic speed product, Orbitlink positions
                business fibre around address, feasibility, business use, and onboarding clarity.
                That reduces confusion and gives buyers a better understanding of what actually fits the site.
              </p>

              <p>
                It also creates a cleaner path for future upgrades into managed Wi-Fi, static IPs,
                voice, LTE/5G backup internet, or Dedicated Internet Access when requirements grow.
              </p>
            </div>
          </SectionShell>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {fitCards.map((item) => (
              <SectionShell key={item.title} className="p-6">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.body}</p>
              </SectionShell>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionShell className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Why businesses switch to fibre</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {whySwitch.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </SectionShell>

            <SectionShell className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Common business use cases</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {useCases.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </SectionShell>
          </div>

          <SectionShell className="p-6">
            <h2 className="text-lg font-semibold tracking-tight">Why this page helps buyers</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {keyBenefits.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-semibold tracking-tight">Not ideal for</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>• Residential use</li>
              <li>• Very low-budget temporary setups</li>
              <li>• Locations without fibre access</li>
            </ul>
          </SectionShell>

          <SectionShell className="p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow>FIBRE VS DIA</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Business Fibre Internet vs Dedicated Internet Access
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
                  Many buyers compare these two services at the same time. This section helps
                  you choose the right fit early.
                </p>
              </div>

              <MetricPill label="BUYER CLARITY" value="Choose the right service sooner" />
            </div>

            <div className="mt-7 overflow-hidden rounded-[26px] border border-white/10">
              <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.04] text-sm">
                <div className="px-4 py-3 text-white/55">Category</div>
                <div className="px-4 py-3 font-medium text-white">Business Fibre</div>
                <div className="px-4 py-3 font-medium text-white">Dedicated Internet Access</div>
              </div>

              {comparison.map((row) => (
                <div key={row.label} className="grid grid-cols-3 border-b border-white/10 last:border-b-0">
                  <div className="px-4 py-4 text-sm text-white/55">{row.label}</div>
                  <div className="px-4 py-4 text-sm text-white/74">{row.fibre}</div>
                  <div className="px-4 py-4 text-sm text-white/74">{row.dia}</div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <CTAButton href="/services/dedicated-internet-access">
                View Dedicated Internet Access
              </CTAButton>
            </div>
          </SectionShell>

          <SectionShell className="p-6 md:p-8">
            <SectionEyebrow>LEAD CAPTURE</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Ready to check business fibre availability?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Share your address and a few details about the site. Orbitlink reviews commercial fit,
              availability, and the next recommended path for pricing or installation.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricPill label="INCLUDE" value="Service address" />
              <MetricPill label="INCLUDE" value="Business name and use case" />
              <MetricPill label="INCLUDE" value="Install timing or upgrade need" />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact#intake" primary>
                Check Availability
              </CTAButton>
              <CTAButton href="/contact#intake">
                Get Pricing
              </CTAButton>
            </div>
          </SectionShell>

          <SectionShell className="p-6 md:p-8">
            <SectionEyebrow>ONTARIO LOCATION SIGNALS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Business fibre across Ontario commercial markets
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              This page should support both province-wide and city-level commercial SEO.
              Use it together with your main location pages.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cityLinks.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.08]"
                >
                  {city.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/locations">
                View Ontario Locations
              </CTAButton>
              <CTAButton href="/business-fibre-internet-ontario">
                Ontario Fibre Landing Page
              </CTAButton>
            </div>
          </SectionShell>

          <SectionShell className="p-6">
            <SectionEyebrow>RELATED SERVICES</SectionEyebrow>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              Build around the primary connection
            </h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Business fibre is often the first layer. Depending on site requirements, Orbitlink
              may also review managed Wi-Fi, business voice, static IPs, LTE/5G backup, and
              Dedicated Internet Access.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <CTAButton href="/services/managed-lan-wifi">Managed LAN & Wi-Fi</CTAButton>
              <CTAButton href="/services/voip-cloud-voice">VoIP & Cloud Voice</CTAButton>
              <CTAButton href="/services/lte-5g-continuity">LTE/5G Backup</CTAButton>
              <CTAButton href="/services/static-ip-routing">Static IP & Routing</CTAButton>
            </div>
          </SectionShell>

          <p className="text-xs text-white/55">
            Availability, install method, and optional features vary by building infrastructure,
            serviceability, and access design. Orbitlink confirms fit per address and avoids
            blanket overclaims.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-7 lg:px-10">
        <SectionShell className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Business Fibre Internet FAQs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            These answers are written to support both buyers and search visibility: clear fit,
            building-based feasibility, and a practical commercial service path.
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
            <CTAButton href="/services">
              Explore Services
            </CTAButton>
            <CTAButton href="/contact#intake" primary>
              Check Availability
            </CTAButton>
          </div>
        </SectionShell>
      </section>
    </main>
  );
}