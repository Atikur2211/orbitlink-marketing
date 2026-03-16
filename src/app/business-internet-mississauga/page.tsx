import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/business-internet-mississauga";
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
};

export const metadata: Metadata = {
  title: "Business Internet in Mississauga, ON | Fibre, DIA & Managed Network | Orbitlink™",
  description:
    "Business internet in Mississauga for offices, warehouses, clinics, logistics sites, and commercial buildings. Fibre, Dedicated Internet Access, managed LAN & Wi-Fi, and continuity design with availability confirmed per building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Internet in Mississauga, ON | Orbitlink™",
    description:
      "Operator-grade business internet in Mississauga including fibre, DIA, managed network infrastructure, and continuity architecture. Availability confirmed per address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet in Mississauga, ON | Orbitlink™",
    description:
      "Business internet in Mississauga for offices, warehouses, logistics, and uptime-sensitive commercial environments.",
  },
};

const FAQ = [
  {
    q: "Do you provide business internet in Mississauga?",
    a: "Yes. Orbitlink evaluates business internet opportunities across Mississauga for offices, warehouses, logistics environments, clinics, studios, and commercial buildings. Availability depends on building infrastructure and upstream feasibility, and is confirmed per address before activation.",
  },
  {
    q: "What type of business internet is available in Mississauga?",
    a: "Depending on site feasibility, Orbitlink may provide Business Fibre Internet, Dedicated Internet Access, managed LAN and enterprise Wi-Fi, continuity architecture, VoIP and cloud voice, and static IP routing.",
  },
  {
    q: "Do you support commercial buildings and office environments in Mississauga?",
    a: "Yes. Mississauga includes major office corridors, industrial parks, and mixed-use commercial environments where delivery posture, building access, and serviceability vary by site. Orbitlink confirms feasibility per building and scopes constraints before activation.",
  },
  {
    q: "What is the difference between Business Fibre and DIA?",
    a: "Business Fibre is often the right fit when a site needs strong performance, disciplined onboarding, and good value. Dedicated Internet Access is better suited to performance-critical environments where more deterministic delivery posture and cleaner enterprise handoff expectations are required.",
  },
  {
    q: "Can you manage LAN and Wi-Fi in Mississauga offices and commercial spaces?",
    a: "Yes. Orbitlink supports managed LAN and enterprise Wi-Fi including segmentation posture, guest access, device separation, and coverage planning for business environments.",
  },
  {
    q: "Do you offer failover and continuity options?",
    a: "Yes. Orbitlink designs LTE and 5G continuity patterns for uptime-sensitive business environments, subject to feasibility and site constraints.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Business Internet Mississauga", item: PAGE_URL },
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
    areaServed: [
      { "@type": "City", name: "Mississauga" },
      { "@type": "AdministrativeArea", name: "Ontario" },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet in Mississauga",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Mississauga" },
    serviceType: [
      "Business Internet",
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed LAN and Enterprise Wi-Fi",
      "LTE and 5G Continuity",
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
    title: "Office towers & commercial suites",
    desc: "Connectivity for professional services, finance teams, agencies, clinics, and office environments in multi-tenant buildings.",
  },
  {
    title: "Warehouses & logistics",
    desc: "Stable internet for scanners, shipping systems, cameras, cloud tools, VPNs, and operations that depend on uptime.",
  },
  {
    title: "Industrial parks",
    desc: "Business internet designed for mixed device environments, managed Wi-Fi, segmentation, and predictable support posture.",
  },
  {
    title: "Performance-critical sites",
    desc: "DIA and continuity design for organizations where internet access is tightly linked to operations and client service.",
  },
] as const;

const modules = [
  {
    title: "Business Fibre Internet",
    desc: "Strong value with disciplined onboarding and business-grade delivery posture.",
    href: "/services/business-fibre-internet",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    desc: "Deterministic posture for critical operations and cleaner enterprise handoff expectations.",
    href: "/services/dedicated-internet-access",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    desc: "Segmentation, stability, coverage planning, and structured support for business environments.",
    href: "/services/managed-lan-wifi",
  },
  {
    title: "LTE / 5G Continuity",
    desc: "Continuity architecture for sites that need uptime during access disruptions.",
    href: "/services/lte-5g-continuity",
  },
] as const;

export default function BusinessInternetMississaugaPage() {
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

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
          <span className="text-sm tracking-wide text-white/65">
            Commercial Search Landing Page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business internet in Mississauga, ON
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Orbitlink provides business internet in Mississauga for offices,
              warehouses, logistics environments, clinics, studios, and commercial
              buildings. Availability is confirmed per building and delivery is
              approached with structured onboarding, documented acceptance, and an
              enterprise support posture.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Business internet",
                "Fibre & DIA",
                "Office and warehouse fit",
                "Availability by building",
                "Structured onboarding",
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
                href="/locations/mississauga"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Mississauga Service Area
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              FLAGSHIP COMMERCIAL MARKET
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Designed for Mississauga’s office, logistics, and commercial corridors
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Mississauga is one of Orbitlink’s strongest commercial markets. This
              page is positioned for organizations that need more than a generic ISP
              experience, including multi-tenant office environments, industrial
              sites, logistics operations, and uptime-sensitive commercial workflows.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {[
                "Availability confirmed per address",
                "Office and industrial fit",
                "Managed LAN and Wi-Fi support",
                "Continuity and failover design",
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
              <h2 className="text-xl font-semibold tracking-tight">
                Business internet for Mississauga’s office, industrial, and commercial environments
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Mississauga is one of Ontario’s strongest commercial markets, with
                  office towers, industrial parks, logistics corridors, mixed-use
                  business environments, and major professional-service clusters.
                  Business internet in this market is not just about speed. It is
                  about stable operations, clean activation, the right service model,
                  and support posture that fits daily business workflows.
                </p>

                <p>
                  Sites around Eglinton, Airport Corporate Centre, Meadowvale, Dixie,
                  and other employment zones may have very different building
                  infrastructure and serviceability. Orbitlink confirms feasibility
                  per address and scopes constraints before activation instead of
                  making blanket availability claims.
                </p>

                <p>
                  For many organizations, the right solution is not only internet
                  access. It may include Business Fibre Internet, Dedicated Internet
                  Access, managed LAN and Wi-Fi, continuity architecture, static IP
                  requirements, or voice support aligned to daily operations.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business internet usually needs to support in Mississauga
                </h3>

                <p>
                  Mississauga business environments often depend on cloud
                  applications, VoIP, VPNs, cameras, guest Wi-Fi, booking and
                  payment systems, collaboration platforms, logistics software, and
                  internal operational networks all running together. That makes
                  access design, segmentation, and uptime posture more important than
                  a simple speed claim.
                </p>

                <p>
                  Orbitlink also supports nearby commercial markets including{" "}
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
                    href="/locations/oakville"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Oakville
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Typical Mississauga fit
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
              <h2 className="text-xl font-semibold tracking-tight">
                Choose the right service posture
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {modules.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                    <div className="mt-3 text-xs text-white/60">Open module →</div>
                  </Link>
                ))}
              </div>

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business Fibre vs DIA in Mississauga
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Business Fibre is often the right fit when you need strong
                performance, clean onboarding, and stable day-to-day operations.
                Dedicated Internet Access is better suited to performance-critical
                environments where more deterministic delivery posture and cleaner
                enterprise handoff expectations matter.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-lg font-semibold tracking-tight">Request availability</h2>

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
                    href="/locations/mississauga"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Mississauga service area page
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">What to include</div>
                  <div className="text-white/85">
                    Service address, broadband vs DIA, static IP needs, managed
                    LAN/Wi-Fi, and continuity requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an availability request. If your environment is
                  office-heavy, logistics-based, or uptime-sensitive, include
                  operational details so Orbitlink can scope the right delivery
                  posture.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                  >
                    Request Access
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Trust & Delivery Posture
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                RELATED MARKETS
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
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
                  href="/locations/oakville"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Oakville
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Mississauga business internet FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers for commercial search intent, with availability confirmed
            per site before activation.
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
              href="/locations/mississauga"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Mississauga Service Area
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}