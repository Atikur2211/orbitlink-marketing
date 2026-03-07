import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/milton";
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
  hours: [
    { day: "Monday", opens: "09:00", closes: "18:00" },
    { day: "Tuesday", opens: "09:00", closes: "18:00" },
    { day: "Wednesday", opens: "09:00", closes: "18:00" },
    { day: "Thursday", opens: "09:00", closes: "18:00" },
    { day: "Friday", opens: "09:00", closes: "18:00" },
  ],
};

export const metadata: Metadata = {
  title: "Business Internet & Fibre in Milton, ON | Orbitlink™",
  description:
    "Business internet and fibre in Milton for industrial, warehouse, logistics, and office environments. Structured onboarding, documented delivery, and availability confirmed per building.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Internet & Fibre in Milton, ON | Orbitlink™",
    description:
      "Operator-grade business connectivity in Milton including fibre internet, DIA, managed LAN & Wi-Fi, continuity architecture, and voice.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet & Fibre in Milton, ON | Orbitlink™",
    description:
      "Business connectivity in Milton for industrial and office environments with structured onboarding and enterprise support posture.",
  },
};

const FAQ = [
  {
    q: "Do you service my address in Milton?",
    a: "Coverage depends on building infrastructure and upstream feasibility. Orbitlink is available on-net where possible, with clear scoping when additional build work is required. Submit an availability request and Orbitlink will confirm feasibility.",
  },
  {
    q: "Do you support industrial and logistics sites in Milton?",
    a: "Yes. Milton includes major employment areas and industrial corridors where uptime and stability matter. Orbitlink confirms feasibility per site and recommends broadband fibre or Dedicated Internet Access based on your operational requirements.",
  },
  {
    q: "Do you offer Dedicated Internet Access (DIA) in Milton?",
    a: "Yes. Dedicated Internet Access is available for performance-critical environments requiring more deterministic throughput, cleaner delivery posture, and structured onboarding, subject to feasibility.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on the underlying access type and location. Orbitlink confirms options during onboarding.",
  },
  {
    q: "Can you manage LAN and enterprise Wi-Fi across office and floor devices?",
    a: "Yes. Orbitlink provides managed LAN and enterprise Wi-Fi including segmentation posture, guest access, and coverage planning aligned with an operator-grade support posture.",
  },
  {
    q: "How long does installation take in Milton?",
    a: "Timelines vary by building readiness, access type, and upstream coordination. Orbitlink uses structured onboarding and documented acceptance so expectations are clear before activation.",
  },
  {
    q: "Do you offer continuity and failover options?",
    a: "Yes. Orbitlink designs LTE and 5G continuity patterns for sites that require operational uptime during access disruptions. Feasibility depends on site constraints and continuity design.",
  },
  {
    q: "Do you provide business internet for warehouses in Milton?",
    a: "Yes. Orbitlink frequently evaluates warehouse, logistics, and industrial environments in Milton where voice systems, cloud platforms, cameras, scanners, VPNs, and line-of-business applications rely on stable internet service.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Milton", item: PAGE_URL },
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
      { "@type": "City", name: "Milton" },
      { "@type": "AdministrativeArea", name: "Ontario" },
    ],
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    })),
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet & Fibre in Milton",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Milton" },
    serviceType: [
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
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return [breadcrumb, localBusiness, telecomService, faqPage];
}

const serviceModules = [
  { t: "Business Fibre Internet", href: "/services/business-fibre-internet" },
  { t: "Dedicated Internet Access (DIA)", href: "/services/dedicated-internet-access" },
  { t: "Managed LAN & Enterprise Wi-Fi", href: "/services/managed-lan-wifi" },
  { t: "LTE / 5G Continuity Architecture", href: "/services/lte-5g-continuity" },
  { t: "VoIP & Cloud Voice", href: "/services/voip-cloud-voice" },
  { t: "Static IP Routing", href: "/services/static-ip-routing" },
] as const;

export default function MiltonLocationPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Area</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business Internet & Fibre in Milton, ON
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink provides operator-grade business connectivity in Milton with a disciplined delivery
          posture: structured onboarding, documented acceptance, and enterprise support posture.
          Availability is <span className="text-white/85 font-medium">confirmed per building</span>,
          with clear feasibility scoping when additional build work is required.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability by building",
            "Structured onboarding",
            "Documented delivery",
            "Enterprise support posture",
            "Industrial and warehouse fit",
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
            Check Availability / Request Access
          </Link>
          <Link
            href="/services/business-fibre-internet"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Business Fibre Service Module
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Milton connectivity for industrial growth and uptime-sensitive operations
            </h2>

            <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
              <p>
                Milton continues to expand as a major employment and industrial market, with logistics,
                warehousing, transportation, and mixed office-and-floor environments that depend on
                stable business internet. In these environments, the difference between a good outcome
                and a weak one is delivery posture: feasibility confirmation, scope clarity, and
                documented activation.
              </p>

              <p>
                Many Milton sites operate across mixed environments — office teams, scanners, cameras,
                IoT endpoints, voice systems, cloud applications, and operational platforms. That often
                means the real requirement is not just internet access, but the right combination of
                broadband fibre, DIA, managed LAN and Wi-Fi, segmentation, and continuity design.
              </p>

              <p>
                Established employment zones such as the Milton 401 Business Park and Derry Green
                Corporate Business Park often vary by building infrastructure and last-mile feasibility.
                Orbitlink confirms service availability per address and scopes constraints before
                activation, without blanket coverage claims.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Milton business connectivity environments
              </h3>
              <p>
                Warehouse, industrial, and logistics environments often need stable support for voice,
                cameras, VPNs, handheld devices, scanning systems, cloud platforms, and internal network
                segmentation. Orbitlink evaluates site feasibility and delivery posture before activation
                so the right model is selected from the start.
              </p>

              <p>
                Orbitlink also supports nearby business markets including{" "}
                <Link
                  href="/locations/oakville"
                  className="text-white/85 hover:text-white underline underline-offset-4"
                >
                  Oakville
                </Link>
                ,{" "}
                <Link
                  href="/locations/mississauga"
                  className="text-white/85 hover:text-white underline underline-offset-4"
                >
                  Mississauga
                </Link>
                , and{" "}
                <Link
                  href="/locations/brampton"
                  className="text-white/85 hover:text-white underline underline-offset-4"
                >
                  Brampton
                </Link>
                .
              </p>

              <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">
                Service modules commonly deployed in Milton
              </h3>

              <ul className="mt-2 space-y-2">
                {serviceModules.map((x) => (
                  <li key={x.t} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>
                      <Link
                        href={x.href}
                        className="text-white/85 hover:text-white underline underline-offset-4"
                      >
                        {x.t}
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Broadband fibre vs DIA
              </h3>
              <p>
                Broadband fibre is often ideal when you want strong value with a professional delivery
                posture. Dedicated Internet Access is the better fit when deterministic performance,
                cleaner enterprise handoff, or more formal delivery requirements are needed for
                critical systems and uptime-sensitive operations.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Managed network posture
              </h3>
              <p>
                For industrial and mixed office-floor environments, managed LAN and Wi-Fi can reduce
                day-to-day issues through segmentation between office, operations, guest, and IoT
                traffic, plus better coverage planning and a more disciplined support model.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Continuity architecture
              </h3>
              <p>
                If uptime matters, Orbitlink can design LTE and 5G continuity patterns aligned to your
                critical traffic and operational priorities. Constraints and feasibility are scoped
                before activation so there are no surprises.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
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
                <div className="text-white/60">Ontario coverage hub</div>
                <Link
                  href="/locations/ontario"
                  className="text-white/85 hover:text-white underline underline-offset-4"
                >
                  View province coverage
                </Link>
              </div>

              <div>
                <div className="text-white/60">What to include</div>
                <div className="text-white/85">
                  Address + required posture (broadband vs DIA, static IP, managed LAN/Wi-Fi, continuity).
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-sm font-semibold tracking-tight">Recommended starting point</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Start with feasibility confirmation. If performance is critical, request a DIA
                assessment and continuity review.
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

            <div className="mt-6 text-sm text-white/60">
              Nearby:{" "}
              <Link
                href="/locations/oakville"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                Oakville
              </Link>
              {", "}
              <Link
                href="/locations/mississauga"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                Mississauga
              </Link>
              {", "}
              <Link
                href="/locations/brampton"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                Brampton
              </Link>
              .
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Milton FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Clear, operational answers — coverage confirmed per site, with scope and feasibility defined before activation.
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
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Explore Services
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Browse Locations
            </Link>
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}