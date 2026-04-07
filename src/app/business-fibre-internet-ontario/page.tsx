import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/business-fibre-internet-ontario";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: "TIRAV Technologies Inc. o/a Orbitlink",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
  email: "concierge@orbitlink.ca",
  address: {
    street: "30 Eglinton Ave W, Suite 400-A77",
    city: "Mississauga",
    region: "ON",
    postal: "L5R 3E7",
    country: "CA",
  },
} as const;

export const metadata: Metadata = {
  title: "Business Fibre Internet Ontario | Orbitlink",
  description:
    "Business fibre internet for Ontario offices, warehouses, clinics, and commercial sites. Check availability by address and find the right business internet setup.",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Business Fibre Internet Ontario | Orbitlink",
    description:
      "Reliable business fibre internet for Ontario businesses. Check address availability and find the right setup for offices, warehouses, clinics, and commercial sites.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet Ontario | Orbitlink",
    description:
      "Business fibre internet for Ontario offices, warehouses, clinics, and commercial sites.",
  },
};

const FAQ = [
  {
    q: "Do you provide business fibre internet across Ontario?",
    a: "Yes. Orbitlink supports business fibre opportunities across Ontario, subject to building infrastructure, upstream serviceability, and installation feasibility. Availability is confirmed by address before the next step is recommended.",
  },
  {
    q: "Who is Ontario business fibre best suited for?",
    a: "Business fibre is often a strong fit for offices, clinics, warehouses, logistics environments, agencies, and commercial operations that rely on stable day-to-day connectivity for multiple users and systems.",
  },
  {
    q: "Is business fibre the same as Dedicated Internet Access?",
    a: "No. Business fibre is often the right fit where strong performance and value matter most. Dedicated Internet Access is better for mission-critical environments that need stronger uptime, cleaner consistency, and more predictable performance.",
  },
  {
    q: "Can Orbitlink provide managed Wi-Fi and LAN with business fibre?",
    a: "Yes. Orbitlink can support managed LAN and Wi-Fi, including segmentation, guest access, internal device separation, and cleaner coverage planning for business environments.",
  },
  {
    q: "Do you offer backup connectivity options?",
    a: "Yes. Orbitlink can support LTE and 5G continuity options for environments where uptime matters, subject to site fit and feasibility.",
  },
  {
    q: "How do I check fibre availability at my building?",
    a: "Start with your service address, business use case, and any requirements such as static IPs, managed Wi-Fi, or backup internet. Orbitlink checks building fit and serviceability before recommending the next step.",
  },
] as const;

const fitCards = [
  {
    title: "Commercial offices",
    desc: "Stable business internet for cloud applications, VoIP, collaboration tools, VPN access, guest Wi-Fi, and multi-user daily operations.",
  },
  {
    title: "Warehouses & logistics",
    desc: "Reliable connectivity for scanners, tracking systems, cameras, cloud platforms, shipping workflows, and industrial operations.",
  },
  {
    title: "Clinics & professional services",
    desc: "Business fibre for booking systems, practice tools, voice systems, internal devices, and client-facing operations where consistency matters.",
  },
  {
    title: "Multi-site organizations",
    desc: "A more structured connectivity path for businesses operating across several Ontario locations with evolving network needs.",
  },
] as const;

const relatedPages = [
  {
    title: "Business Internet Mississauga",
    desc: "High-intent page for one of Ontario’s strongest office and commercial markets.",
    href: "/business-internet-mississauga",
  },
  {
    title: "Business Internet Toronto",
    desc: "Strong local search page for Toronto offices, commercial spaces, and multi-user environments.",
    href: "/business-internet-toronto",
  },
  {
    title: "Business Internet Brampton",
    desc: "Commercial and industrial-focused page for Brampton business and warehouse demand.",
    href: "/business-internet-brampton",
  },
  {
    title: "Business Internet Milton",
    desc: "Supports Milton industrial and warehouse-focused business demand and strengthens crawl flow.",
    href: "/business-internet-milton",
  },
  {
    title: "Ontario Coverage Hub",
    desc: "Province-wide service coverage page connecting Orbitlink’s Ontario market footprint.",
    href: "/locations/ontario",
  },
] as const;

const cityLinks = [
  { name: "Mississauga", href: "/locations/mississauga" },
  { name: "Toronto", href: "/locations/toronto" },
  { name: "Brampton", href: "/locations/brampton" },
  { name: "Milton", href: "/locations/milton" },
  { name: "Vaughan", href: "/locations/vaughan" },
  { name: "Markham", href: "/locations/markham" },
  { name: "Oakville", href: "/locations/oakville" },
  { name: "Ottawa", href: "/locations/ottawa" },
  { name: "Windsor", href: "/locations/windsor" },
  { name: "Burlington", href: "/locations/burlington" },
  { name: "Cambridge", href: "/locations/cambridge" },
  { name: "Peterborough", href: "/locations/peterborough" },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Business Fibre Internet Ontario",
        item: PAGE_URL,
      },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TelecomCompany"],
    "@id": `${PAGE_URL}#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postal,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Business Fibre Internet Ontario",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    serviceType: [
      "Business Fibre Internet",
      "Business Internet Ontario",
      "Managed LAN and Wi-Fi",
      "LTE and 5G Backup Connectivity",
      "VoIP and Cloud Voice",
      "Static IP Routing",
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

  return [breadcrumb, localBusiness, telecomService, faqPage];
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.24em] text-white/50">{children}</div>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BusinessFibreInternetOntarioPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_25%,transparent_75%,rgba(255,255,255,0.02))]" />
      </div>

      <TopNav />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
          <span className="text-sm tracking-wide text-white/65">
            Ontario business fibre landing page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business Fibre Internet for Ontario Businesses
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Reliable business fibre internet for Ontario offices, warehouses, clinics,
              logistics environments, and commercial sites. Orbitlink checks availability
              by address so the right business internet setup can be matched to your
              building before moving forward.
            </p>

            <div className="mt-3 text-sm text-white/68">
              Built for business operations that depend on stable connectivity, cleaner
              multi-user performance, and a clear next step.
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Business fibre internet Ontario",
                "Availability checked by address",
                "Commercial and industrial fit",
                "Supports VoIP, cloud, and internal systems",
                "Clear next step for business buyers",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Check Business Internet Availability
              </Link>
              <Link
                href="/services/business-fibre-internet"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                View Fibre Service
              </Link>
              <Link
                href="/locations/ontario"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Ontario Coverage Hub
              </Link>
            </div>

            <div className="mt-3 text-sm text-white/60">
              Availability varies by building. Check your address to confirm options.
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Ontario business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and service direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>WHY BUSINESSES SWITCH</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Cleaner performance for real business operations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Businesses usually switch when internet instability starts affecting voice,
              cloud tools, internal systems, remote access, or multi-user workflows.
              Business fibre gives Ontario businesses a stronger day-to-day operating base.
            </p>

            <div className="mt-6">
              <BulletList
                items={[
                  "Better fit for VoIP, cloud apps, and internal platforms",
                  "Stronger multi-user stability during business hours",
                  "Cleaner support for offices, clinics, and warehouse workflows",
                  "Better starting point for managed Wi-Fi and backup design",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>CHECK AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Check business fibre availability for your location
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Fibre availability depends on building infrastructure, upstream
                  serviceability, installation feasibility, and the type of internet your
                  site actually needs. Orbitlink checks this by address before
                  recommending the next step.
                </p>

                <p>
                  This matters because business internet in Ontario can vary widely
                  between office towers, smaller commercial buildings, industrial parks,
                  warehouses, and mixed-use properties.
                </p>

                <p>
                  A quick availability request helps confirm what is realistic for the
                  site instead of relying on generic assumptions.
                </p>

                <BulletList
                  items={[
                    "What is available at your building",
                    "Whether business fibre is the right fit",
                    "Installation feasibility and service path",
                    "Whether managed Wi-Fi, voice, or backup should be included",
                  ]}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>ONTARIO BUSINESS INTERNET</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Built for offices, warehouses, clinics, and commercial sites
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Business fibre internet in Ontario is not only about speed. It is about
                  supporting daily operations with a more stable, business-ready internet
                  foundation for multiple users, cloud platforms, voice, VPN, Wi-Fi,
                  internal systems, and customer-facing services.
                </p>

                <p>
                  Ontario businesses often depend on internet connectivity for SaaS tools,
                  collaboration platforms, VoIP calling, booking systems, cameras,
                  inventory systems, remote access, logistics software, payment flows,
                  and segmented internal networks.
                </p>

                <p>
                  Orbitlink focuses on matching the right business internet setup to the
                  building and operating environment, with support for managed LAN and
                  Wi-Fi, backup connectivity, static IP routing, and cloud voice where
                  needed.
                </p>

                <p>
                  Businesses operating across multiple locations may also want to review{" "}
                  <Link
                    href="/business-internet-milton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    business internet in Milton
                  </Link>{" "}
                  alongside broader Ontario planning, especially where warehouse,
                  industrial, and logistics expansion is part of the operating model.
                </p>

                <p>
                  For many organizations, this makes business fibre one of the strongest
                  business internet options in Ontario when stable daily performance and a
                  cleaner support path matter.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>TYPICAL FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Ontario business environments
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {fitCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="text-sm font-semibold text-white/90">{card.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {card.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>KEY ONTARIO MARKETS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Priority business markets across Ontario
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
                Orbitlink’s strongest commercial demand includes major office, industrial,
                and logistics markets across Ontario. Explore city-specific pages or move
                directly into an availability review.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {cityLinks.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/85 transition hover:bg-white/[0.06]"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  Strong commercial demand often comes from{" "}
                  <Link
                    href="/locations/mississauga"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Mississauga
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/toronto"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Toronto
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/brampton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Brampton
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/milton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Milton
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/vaughan"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Vaughan
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/markham"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Markham
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/windsor"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Windsor
                  </Link>
                  , and{" "}
                  <Link
                    href="/locations/burlington"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Burlington
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business fibre vs Dedicated Internet Access
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-sm font-semibold text-white/90">Business fibre</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Often the right fit where strong performance, good value, and stable
                    day-to-day operations matter most.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-sm font-semibold text-white/90">
                    Dedicated Internet Access
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Better suited to business-critical environments that need stronger
                    uptime, cleaner consistency, and more predictable performance.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Orbitlink helps determine which service model fits the site based on
                business use case, operational sensitivity, and building reality. Learn
                more about{" "}
                <Link
                  href="/services/dedicated-internet-access"
                  className="underline underline-offset-4 text-white/85 hover:text-white"
                >
                  dedicated internet access
                </Link>{" "}
                when higher-criticality delivery and uptime expectations are required.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>RELATED HIGH-INTENT PAGES</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Related business internet pages
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {relatedPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{page.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {page.desc}
                    </div>
                    <div className="mt-3 text-xs text-white/60">Open page →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>REQUEST AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                Check fibre availability for your business
              </h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div>
                  <div className="text-white/60">Phone</div>
                  <a
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                    href={`tel:${BUSINESS.phoneE164}`}
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>

                <div>
                  <div className="text-white/60">Related page</div>
                  <Link
                    href="/locations/ontario"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Ontario coverage hub
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">Service model</div>
                  <div className="text-white/85">
                    Business connectivity delivered through structured onboarding,
                    availability validation, and clearly defined next steps.
                  </div>
                </div>

                <div>
                  <div className="text-white/60">Helpful details to include</div>
                  <div className="text-white/85">
                    Service address, city, building type, business use case, managed
                    Wi-Fi needs, static IP needs, voice requirements, and backup internet
                    requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an address-based availability check. If your site is
                  office-heavy, warehouse-oriented, industrial, multi-user, or
                  uptime-sensitive, include those details so the right setup can be
                  recommended.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                  >
                    Check Business Internet Availability
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Trust & Compliance
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                TOP COMMERCIAL MARKETS
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/mississauga"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Mississauga
                </Link>
                <Link
                  href="/locations/toronto"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Toronto
                </Link>
                <Link
                  href="/locations/brampton"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Brampton
                </Link>
                <Link
                  href="/locations/milton"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Milton
                </Link>
                <Link
                  href="/locations/windsor"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Windsor
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Ontario business fibre internet FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers for business buyers researching fibre internet in Ontario,
            with availability confirmed by site before moving forward.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-base font-semibold tracking-tight">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Business Internet Availability
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              View Fibre Service
            </Link>
            <Link
              href="/locations/ontario"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Ontario Coverage Hub
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}