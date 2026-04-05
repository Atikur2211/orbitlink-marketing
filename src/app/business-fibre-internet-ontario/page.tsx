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
  address: {
    street: "30 Eglinton Ave W, Suite 400-A77",
    city: "Mississauga",
    region: "ON",
    postal: "L5R 3E7",
    country: "CA",
  },
} as const;

export const metadata: Metadata = {
  title: "Business Fibre Internet in Ontario | Check Availability | Orbitlink",
  description:
    "Business fibre internet in Ontario for offices, warehouses, clinics, logistics sites, and commercial buildings. Check availability by address and find the right business setup.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet in Ontario | Check Availability | Orbitlink",
    description:
      "Business fibre internet across Ontario for offices, warehouses, clinics, and commercial sites. Availability is checked by address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet in Ontario | Orbitlink",
    description:
      "Business fibre internet in Ontario for commercial and industrial business environments.",
  },
};

const FAQ = [
  {
    q: "Do you provide business fibre internet across Ontario?",
    a: "Yes. Orbitlink supports business fibre opportunities across Ontario. Availability depends on building infrastructure, access feasibility, and upstream serviceability, so it is checked by address before moving forward.",
  },
  {
    q: "What types of businesses is Ontario business fibre best suited for?",
    a: "Business fibre is often a strong fit for offices, warehouses, clinics, agencies, logistics environments, and commercial buildings that need stable day-to-day connectivity.",
  },
  {
    q: "Is business fibre the same as Dedicated Internet Access?",
    a: "No. Business fibre is often the right fit when strong performance and good value matter most. Dedicated Internet Access is better for business-critical environments that need stronger uptime and more predictable performance.",
  },
  {
    q: "Do you provide managed LAN and Wi-Fi with business fibre?",
    a: "Yes. Orbitlink can support managed LAN and business Wi-Fi, including segmentation, guest access, internal device separation, and coverage planning.",
  },
  {
    q: "Do you offer backup internet options?",
    a: "Yes. Orbitlink can design LTE and 5G backup options for business environments where uptime matters, subject to feasibility and site constraints.",
  },
  {
    q: "How do I check fibre availability at my building?",
    a: "Submit your service address and requirements through the intake form. Orbitlink checks what is available for the building before the next step is confirmed.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Business Fibre Internet Ontario", item: PAGE_URL },
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
    email: "concierge@orbitlink.ca",
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
    name: "Business Fibre Internet in Ontario",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    serviceType: [
      "Business Fibre Internet",
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

const fitCards = [
  {
    title: "Commercial offices",
    desc: "Stable business fibre for collaboration, VoIP, cloud platforms, VPNs, guest Wi-Fi, and day-to-day workflows.",
  },
  {
    title: "Warehouses & logistics",
    desc: "Connectivity for scanners, cameras, cloud tools, shipping systems, and operations that depend on stable internet.",
  },
  {
    title: "Clinics & professional services",
    desc: "Business fibre for booking systems, voice, internal devices, practice applications, and client-facing reliability.",
  },
  {
    title: "Multi-site organizations",
    desc: "A cleaner onboarding and support path for businesses operating across several Ontario locations.",
  },
] as const;

const relatedPages = [
  {
    title: "Business Internet in Mississauga",
    desc: "High-intent landing page for one of Ontario’s strongest business markets.",
    href: "/business-internet-mississauga",
  },
  {
    title: "Business Internet in Toronto",
    desc: "Ontario’s biggest office and commercial market with strong business internet demand.",
    href: "/business-internet-toronto",
  },
  {
    title: "Business Internet in Brampton",
    desc: "Industrial and warehouse-oriented page for Brampton’s logistics-heavy market.",
    href: "/business-internet-brampton",
  },
  {
    title: "Ontario Coverage Hub",
    desc: "Province-wide entry point into Orbitlink’s core and expanded service markets.",
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
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.24em] text-white/50">{children}</div>;
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
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
            Ontario-wide business fibre page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business fibre internet in Ontario
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Orbitlink provides business fibre internet in Ontario for offices,
              warehouses, clinics, logistics environments, and commercial buildings.
              Availability is checked by address so the right service path can be
              matched to the site before moving forward.
            </p>

            <div className="mt-3 text-sm text-white/68">
              Serving offices, warehouses, clinics, and multi-site businesses across Ontario.
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Business fibre internet",
                "Ontario-wide business demand",
                "Availability checked by address",
                "Commercial and industrial fit",
                "Clear next step",
              ].map((x) => (
                <span
                  key={x}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                >
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Check Availability
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

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Ontario business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and pricing direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>WHY THIS PAGE MATTERS</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Built for real business buying intent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              This page is for business buyers who want to know if their building
              can be served, what setup fits best, and what the next step looks like.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {[
                "Availability checked per address",
                "Built for commercial and industrial sites",
                "Managed LAN and Wi-Fi support available",
                "Backup internet options available",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>ONTARIO BUSINESS FIBRE</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business fibre for commercial, industrial, and uptime-sensitive environments
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Ontario includes some of Canada’s most competitive commercial
                  internet markets, from dense office corridors to industrial parks,
                  warehouse clusters, and mixed-use business environments.
                </p>

                <p>
                  Business fibre is not only about speed. It is about stable
                  operations, clean installation, the right service model, and support
                  that fits business workflows.
                </p>

                <p>
                  Building infrastructure, last-mile feasibility, and serviceability
                  can vary significantly from one location to another. Orbitlink checks
                  what is available per address instead of making blanket availability
                  claims across an entire city or region.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business fibre usually supports
                </h3>

                <p>
                  Ontario business environments often depend on cloud platforms,
                  VoIP, VPNs, cameras, internal systems, guest Wi-Fi, collaboration
                  tools, booking or payment systems, logistics software, and segmented
                  internal networks.
                </p>

                <p>
                  Orbitlink’s strongest business fibre markets include{" "}
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
                  , and{" "}
                  <Link
                    href="/locations/milton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Milton
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>TYPICAL FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Ontario business environments
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {fitCards.map((x) => (
                  <div
                    key={x.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>PRIORITY ONTARIO MARKETS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Key Ontario cities
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {cityLinks.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/85 transition hover:bg-white/[0.06]"
                  >
                    {x.name}
                  </Link>
                ))}
              </div>

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business fibre vs Dedicated Internet Access
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Business fibre is often the right fit when you need strong
                performance, value, and stable day-to-day operations. Dedicated
                internet is better for critical environments where stronger uptime
                and more predictable performance matter.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>RELATED PAGES</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Related high-intent pages
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {relatedPages.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
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
                Check fibre availability
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
                  <div className="text-white/60">Helpful details</div>
                  <div className="text-white/85">
                    Service address, city, building type, business use case,
                    static IP needs, managed LAN/Wi-Fi, and backup internet needs.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an availability request. If your site is office-heavy,
                  industrial, multi-user, or uptime-sensitive, include operational
                  details so Orbitlink can guide the right setup.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                  >
                    Check Availability
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
            Clear answers for province-wide business search intent, with availability
            checked per site before moving forward.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Availability
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