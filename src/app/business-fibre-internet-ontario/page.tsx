import type { Metadata } from "next";
import Link from "next/link";

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
};

export const metadata: Metadata = {
  title: "Business Fibre Internet in Ontario | Orbitlink™",
  description:
    "Business fibre internet in Ontario for offices, warehouses, clinics, logistics sites, and commercial buildings. Structured onboarding, documented delivery, and availability confirmed per building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet in Ontario | Orbitlink™",
    description:
      "Operator-grade business fibre internet across Ontario with structured onboarding, documented acceptance, and enterprise support posture.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet in Ontario | Orbitlink™",
    description:
      "Ontario business fibre internet for commercial, industrial, and uptime-sensitive business environments.",
  },
};

const FAQ = [
  {
    q: "Do you provide business fibre internet across Ontario?",
    a: "Orbitlink evaluates business fibre internet opportunities across Ontario. Availability depends on building infrastructure, local access feasibility, and upstream serviceability, and is confirmed per address before activation.",
  },
  {
    q: "What types of businesses is Ontario business fibre best suited for?",
    a: "Business fibre internet is often a strong fit for offices, warehouses, clinics, agencies, logistics environments, and commercial buildings that need stable day-to-day connectivity with structured onboarding and professional support posture.",
  },
  {
    q: "Is business fibre the same as Dedicated Internet Access?",
    a: "No. Business fibre is typically the right fit when strong performance and good value are the priorities. Dedicated Internet Access is better suited to environments requiring more deterministic delivery posture and cleaner enterprise handoff expectations.",
  },
  {
    q: "Do you provide managed LAN and Wi-Fi with business fibre?",
    a: "Yes. Orbitlink can support managed LAN and enterprise Wi-Fi, including segmentation posture, guest access, internal device separation, and coverage planning for business environments.",
  },
  {
    q: "Do you offer failover and continuity options?",
    a: "Yes. Orbitlink designs LTE and 5G continuity patterns for business environments where uptime matters, subject to feasibility and site constraints.",
  },
  {
    q: "How do I check fibre availability at my building?",
    a: "Submit your service address and requirements through the intake form. Orbitlink confirms feasibility per building and scopes constraints before activation.",
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
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Fibre Internet in Ontario",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    serviceType: [
      "Business Fibre Internet",
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
    title: "Commercial offices",
    desc: "Stable business fibre for collaboration, VoIP, cloud platforms, VPNs, guest Wi-Fi, and day-to-day business workflows.",
  },
  {
    title: "Warehouses & logistics",
    desc: "Connectivity for scanners, cameras, cloud tools, shipping systems, and operations that depend on uptime.",
  },
  {
    title: "Clinics & professional services",
    desc: "Business fibre for booking systems, voice, internal devices, practice applications, and client-facing reliability.",
  },
  {
    title: "Multi-site organizations",
    desc: "Clean onboarding and structured support posture for businesses operating across several Ontario locations.",
  },
] as const;

const relatedPages = [
  {
    title: "Business Internet in Mississauga",
    desc: "Commercial-intent landing page for one of Ontario’s strongest business markets.",
    href: "/business-internet-mississauga",
  },
  {
    title: "Business Internet in Toronto",
    desc: "High-intent Toronto landing page for offices and uptime-sensitive commercial environments.",
    href: "/business-internet-toronto",
  },
  {
    title: "Business Internet in Brampton",
    desc: "Industrial and warehouse-oriented landing page for Brampton’s logistics-heavy market.",
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

export default function BusinessFibreInternetOntarioPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Province-Wide Commercial Landing Page</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business fibre internet in Ontario
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink provides business fibre internet in Ontario for offices, warehouses, clinics,
          logistics environments, and commercial buildings. Availability is confirmed per building,
          and delivery is approached with structured onboarding, documented acceptance, and an
          enterprise support posture.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Business fibre internet",
            "Ontario-wide demand capture",
            "Availability by building",
            "Structured onboarding",
            "Commercial and industrial fit",
          ].map((x) => (
            <span
              key={x}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
            >
              {x}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Availability
          </Link>
          <Link
            href="/services/business-fibre-internet"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Business Fibre Service Module
          </Link>
          <Link
            href="/locations/ontario"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Ontario Coverage Hub
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Ontario business fibre for commercial, industrial, and uptime-sensitive environments
              </h2>

              <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
                <p>
                  Ontario contains some of Canada’s most competitive commercial internet markets,
                  from dense office corridors to industrial parks, warehouse clusters, and mixed-use
                  business environments. Business fibre internet in this market is not just about
                  raw speed. It is about stable operations, clean activation, the right service
                  model, and a support posture that fits business workflows.
                </p>

                <p>
                  Building infrastructure, last-mile feasibility, and serviceability can vary
                  significantly from one location to another. Orbitlink confirms feasibility per
                  address and scopes constraints before activation, rather than making blanket
                  availability claims across an entire city or region.
                </p>

                <p>
                  For many organizations, the right answer is not only fibre access. It may also
                  include managed LAN and Wi-Fi, continuity architecture, static IP needs, voice
                  support, or a clear upgrade path into Dedicated Internet Access when operations
                  become more performance-sensitive.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business fibre usually needs to support in Ontario
                </h3>
                <p>
                  Ontario business environments often depend on cloud platforms, VoIP, VPNs,
                  cameras, internal operational systems, guest Wi-Fi, collaboration tools,
                  booking or payment systems, logistics software, and internal segmented networks.
                  That makes access design, stability, and onboarding posture more important than
                  a simple speed claim.
                </p>

                <p>
                  Orbitlink’s strongest business fibre markets include{" "}
                  <Link
                    href="/locations/mississauga"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    Mississauga
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/toronto"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    Toronto
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/brampton"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    Brampton
                  </Link>
                  , and{" "}
                  <Link
                    href="/locations/milton"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    Milton
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Typical Ontario fit</h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {fitCards.map((x) => (
                  <div key={x.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Priority Ontario markets</h2>

              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                {cityLinks.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06] transition text-center"
                  >
                    {x.name}
                  </Link>
                ))}
              </div>

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business Fibre vs DIA in Ontario
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Business Fibre is often the right fit when you need strong performance, clean
                onboarding, and stable day-to-day operations. Dedicated Internet Access is better
                suited to performance-critical environments where more deterministic delivery posture
                and cleaner enterprise handoff expectations matter.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Related high-intent pages</h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {relatedPages.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.desc}</div>
                    <div className="mt-3 text-xs text-white/60">Open page →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-lg font-semibold tracking-tight">Request availability</h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div>
                  <div className="text-white/60">Phone</div>
                  <a
                    className="text-white/85 hover:text-white underline underline-offset-4"
                    href={`tel:${BUSINESS.phoneE164}`}
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>

                <div>
                  <div className="text-white/60">Related page</div>
                  <Link
                    href="/locations/ontario"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    View Ontario coverage hub
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">What to include</div>
                  <div className="text-white/85">
                    Service address, city, building type, business use case, static IP needs,
                    managed LAN/Wi-Fi, and continuity requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Start with an availability request. If your site is multi-user, office-heavy,
                  industrial, or uptime-sensitive, include operational details so Orbitlink can
                  scope the right delivery posture.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Request Access
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
                  >
                    Trust & Delivery Posture
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">TOP COMMERCIAL MARKETS</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/mississauga"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Mississauga
                </Link>
                <Link
                  href="/locations/toronto"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Toronto
                </Link>
                <Link
                  href="/locations/brampton"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Brampton
                </Link>
                <Link
                  href="/locations/milton"
                  className="text-white/80 hover:text-white underline underline-offset-4"
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
          <h2 className="text-2xl font-semibold tracking-tight">Ontario business fibre internet FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Clear answers for province-wide commercial search intent, with availability confirmed per site before activation.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Check Availability
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Fibre Service Module
            </Link>
            <Link
              href="/locations/ontario"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Ontario Coverage Hub
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}