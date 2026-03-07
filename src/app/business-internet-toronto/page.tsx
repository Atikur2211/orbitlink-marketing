import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/business-internet-toronto";
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
  title: "Business Internet in Toronto, ON | Fibre, DIA & Managed Network | Orbitlink™",
  description:
    "Business internet in Toronto for offices, commercial buildings, clinics, studios, multi-site teams, and uptime-sensitive environments. Fibre, Dedicated Internet Access, managed LAN & Wi-Fi, and continuity design with availability confirmed per building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Internet in Toronto, ON | Orbitlink™",
    description:
      "Operator-grade business internet in Toronto including fibre, DIA, managed network infrastructure, and continuity architecture. Availability confirmed per address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet in Toronto, ON | Orbitlink™",
    description:
      "Business internet in Toronto for offices, multi-tenant buildings, and performance-critical business environments.",
  },
};

const FAQ = [
  {
    q: "Do you provide business internet in Toronto?",
    a: "Yes. Orbitlink evaluates business internet opportunities across Toronto for offices, clinics, studios, professional firms, and performance-sensitive environments. Availability depends on building infrastructure and upstream feasibility, and is confirmed per address before activation.",
  },
  {
    q: "What type of business internet is available in Toronto?",
    a: "Depending on site feasibility, Orbitlink may provide Business Fibre Internet, Dedicated Internet Access, managed LAN and enterprise Wi-Fi, continuity architecture, VoIP and cloud voice, and static IP routing.",
  },
  {
    q: "Do you support downtown Toronto office buildings?",
    a: "Yes. Toronto includes dense commercial and multi-tenant office environments where delivery posture, building access, and serviceability vary significantly. Orbitlink confirms feasibility per building and scopes constraints before activation.",
  },
  {
    q: "What is the difference between Business Fibre and DIA?",
    a: "Business Fibre is often the right fit when a site needs strong performance, disciplined onboarding, and good value. Dedicated Internet Access is better suited to performance-critical environments where more deterministic delivery posture and cleaner enterprise handoff expectations are required.",
  },
  {
    q: "Can you manage LAN and Wi-Fi in Toronto offices and mixed-use environments?",
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
      { "@type": "ListItem", position: 2, name: "Business Internet Toronto", item: PAGE_URL },
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
      { "@type": "City", name: "Toronto" },
      { "@type": "AdministrativeArea", name: "Ontario" },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet in Toronto",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Toronto" },
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
    title: "Downtown office towers",
    desc: "Connectivity for law firms, finance teams, agencies, and professional services in multi-tenant office environments.",
  },
  {
    title: "Clinics & studios",
    desc: "Stable internet for voice, booking systems, cloud apps, cameras, and uptime-sensitive daily workflows.",
  },
  {
    title: "Commercial buildings",
    desc: "Business internet designed for mixed-device teams, guest access, managed Wi-Fi, and predictable support posture.",
  },
  {
    title: "Performance-critical sites",
    desc: "DIA and continuity design for organizations where downtime directly affects operations and client service.",
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

export default function BusinessInternetTorontoPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Commercial Search Landing Page</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business internet in Toronto, ON
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink provides business internet in Toronto for offices, commercial buildings, clinics,
          studios, professional firms, and uptime-sensitive environments. Availability is confirmed
          per building and delivery is approached with structured onboarding, documented acceptance,
          and an enterprise support posture.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Business internet",
            "Fibre & DIA",
            "Office and commercial fit",
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

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Availability
          </Link>
          <Link
            href="/locations/toronto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Toronto Service Area
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Explore Services
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Business internet for Toronto’s office and commercial environments
              </h2>

              <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
                <p>
                  Toronto is one of the most competitive commercial internet markets in Canada.
                  Business internet in this environment is not just about speed. It is about stable
                  operations, clean activation, the right service model, and support posture that
                  fits office towers, clinics, studios, agencies, retail offices, and multi-tenant
                  business environments.
                </p>

                <p>
                  Sites across downtown, midtown, financial districts, professional corridors, and
                  mixed commercial areas may have very different building infrastructure and
                  serviceability. Orbitlink confirms feasibility per address and scopes constraints
                  before activation instead of making blanket availability claims.
                </p>

                <p>
                  For many organizations, the right solution is not only internet access. It may
                  include Business Fibre Internet, Dedicated Internet Access, managed LAN and Wi-Fi,
                  continuity architecture, static IP requirements, or voice support aligned to
                  daily operations.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business internet usually needs to support in Toronto
                </h3>
                <p>
                  Toronto business environments often depend on cloud applications, VoIP, VPNs,
                  cameras, guest Wi-Fi, payment systems, collaboration platforms, booking systems,
                  and operational networks all running together. That makes access design,
                  segmentation, and uptime posture more important than a simple speed claim.
                </p>

                <p>
                  Orbitlink also supports nearby commercial markets including{" "}
                  <Link
                    href="/locations/etobicoke"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    Etobicoke
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/scarborough"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    Scarborough
                  </Link>
                  , and{" "}
                  <Link
                    href="/locations/north-york"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    North York
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Typical Toronto fit</h2>

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
              <h2 className="text-xl font-semibold tracking-tight">Choose the right service posture</h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {modules.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.desc}</div>
                    <div className="mt-3 text-xs text-white/60">Open module →</div>
                  </Link>
                ))}
              </div>

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business Fibre vs DIA in Toronto
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Business Fibre is often the right fit when you need strong performance, clean
                onboarding, and stable day-to-day operations. Dedicated Internet Access is better
                suited to performance-critical environments where more deterministic delivery posture
                and cleaner enterprise handoff expectations matter.
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
                    className="text-white/85 hover:text-white underline underline-offset-4"
                    href={`tel:${BUSINESS.phoneE164}`}
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>

                <div>
                  <div className="text-white/60">Related page</div>
                  <Link
                    href="/locations/toronto"
                    className="text-white/85 hover:text-white underline underline-offset-4"
                  >
                    View Toronto service area page
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">What to include</div>
                  <div className="text-white/85">
                    Service address, broadband vs DIA, static IP needs, managed LAN/Wi-Fi, and continuity requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Start with an availability request. If your environment is performance-sensitive
                  or multi-tenant, include operational details so Orbitlink can scope the right
                  delivery posture.
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
              <div className="text-[11px] tracking-[0.22em] text-white/55">RELATED MARKETS</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/etobicoke"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Etobicoke
                </Link>
                <Link
                  href="/locations/scarborough"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Scarborough
                </Link>
                <Link
                  href="/locations/north-york"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  North York
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Toronto business internet FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Clear answers for commercial search intent, with availability confirmed per site before activation.
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
              href="/locations/toronto"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Toronto Service Area
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}