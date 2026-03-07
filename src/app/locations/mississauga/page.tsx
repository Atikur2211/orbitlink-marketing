import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/mississauga";
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
  title: "Business Fibre Internet in Mississauga, ON | Orbitlink™",
  description:
    "Business fibre internet in Mississauga with operator-grade onboarding, dedicated internet access, managed LAN/Wi-Fi, continuity options, and structured enterprise support.",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Business Fibre Internet in Mississauga, ON | Orbitlink™",
    description:
      "Business internet in Mississauga: fibre, DIA, managed LAN/Wi-Fi, continuity, and voice with a disciplined operator posture.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet in Mississauga, ON | Orbitlink™",
    description:
      "Business internet in Mississauga with fibre, DIA, managed LAN/Wi-Fi, continuity, and structured onboarding.",
  },
};

const FAQ = [
  {
    q: "Do you service my address in Mississauga?",
    a: "Coverage depends on building infrastructure, access feasibility, and upstream serviceability. Orbitlink is available on-net where possible, with clear scoping when additional build work is required. Request availability and we’ll confirm feasibility for your address.",
  },
  {
    q: "Do you offer business fibre internet in Mississauga?",
    a: "Yes. Orbitlink offers business fibre internet in Mississauga where building and network feasibility support deployment. Fibre tiers are positioned under AUREX Internet with structured onboarding and documented delivery.",
  },
  {
    q: "Is Orbitlink fibre symmetrical?",
    a: "Where fibre service is available, symmetrical speed tiers may be offered under AUREX Internet (AUREX 150 / 500 / GIG+), subject to feasibility and service design for the site.",
  },
  {
    q: "Do you offer Dedicated Internet Access (DIA) in Mississauga?",
    a: "Yes. Dedicated Internet Access is available for business-critical environments where deterministic performance, clearer delivery posture, and business-grade support are required, subject to building and upstream feasibility.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on the access type, service design, and site location. Orbitlink confirms availability during onboarding.",
  },
  {
    q: "How long does installation take?",
    a: "Install timelines vary by building readiness, access type, landlord access, and upstream coordination. Orbitlink uses structured onboarding and documented acceptance so expectations are clear before activation.",
  },
  {
    q: "Can you manage my office network and Wi-Fi?",
    a: "Yes. Orbitlink provides managed LAN and enterprise Wi-Fi for business environments, including segmentation posture, coverage planning, and network support aligned with operational needs.",
  },
  {
    q: "Do you offer failover or continuity options?",
    a: "Yes. Orbitlink can design LTE/5G continuity patterns for sites that require operational uptime during access disruptions. Feasibility depends on site constraints and continuity design goals.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Mississauga", item: PAGE_URL },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TelecomCompany"],
    "@id": `${PAGE_URL}#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: PAGE_URL,
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
    name: "Business Fibre Internet in Mississauga",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: "Mississauga",
    },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed LAN and Enterprise Wi-Fi",
      "Static IP Routing",
      "VoIP and Cloud Voice",
      "LTE and 5G Continuity",
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

const serviceModules = [
  { title: "Business Fibre Internet", href: "/services/business-fibre-internet" },
  { title: "Dedicated Internet Access (DIA)", href: "/services/dedicated-internet-access" },
  { title: "Managed LAN & Enterprise Wi-Fi", href: "/services" },
  { title: "LTE / 5G Continuity", href: "/services/lte-5g-continuity" },
  { title: "VoIP & Cloud Voice", href: "/services/voip-cloud-voice" },
  { title: "Static IP Routing", href: "/services/static-ip-routing" },
] as const;

const buildingTypes = [
  "Multi-tenant office buildings",
  "Industrial and logistics facilities",
  "Medical and professional offices",
  "Retail and service businesses",
  "Hybrid office / warehouse environments",
] as const;

export default function MississaugaLocationPage() {
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
          <span className="text-sm tracking-wide text-white/60">Mississauga Service Area</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business Fibre Internet in Mississauga, ON
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink delivers business internet in Mississauga with an operator-grade posture:
          structured onboarding, documented acceptance, and support designed for real business
          operations. Availability is confirmed per building, with clear feasibility scoping where
          additional work is required.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Business fibre internet",
            "Dedicated Internet Access",
            "Managed LAN & Wi-Fi",
            "Continuity architecture",
            "Availability by building",
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
            Explore Fibre Service
          </Link>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left main */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Mississauga business internet, designed for operational reliability
              </h2>

              <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
                <p>
                  Mississauga is one of Ontario’s most important commercial markets, with dense
                  office clusters, industrial corridors, logistics facilities, and professional
                  service environments. Connectivity requirements vary by building type, traffic
                  profile, uptime expectations, and internal network design.
                </p>

                <p>
                  Orbitlink approaches business internet in Mississauga with a disciplined sequence:
                  confirm serviceability, define the right access model, align any managed network
                  scope, then execute delivery with documented acceptance. This avoids ambiguous
                  installs and supports a cleaner activation experience.
                </p>

                <p>
                  We commonly assess opportunities across the Eglinton corridor, Airport Corporate
                  Centre, Meadowvale, and major multi-tenant office environments across the city.
                  Where a building is not already serviceable in the preferred way, we explain the
                  feasibility posture clearly and avoid overclaiming.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Service modules available in Mississauga
              </h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceModules.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.07] transition"
                  >
                    <div className="text-sm font-medium text-white/90">{item.title}</div>
                    <div className="mt-2 text-sm text-white/60">
                      View service module →
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
                <p>
                  Fibre access is positioned under AUREX Internet, with tiering such as AUREX 150,
                  500, and GIG+ where feasible. For sites that require more deterministic delivery
                  posture, Orbitlink can scope Dedicated Internet Access. Managed LAN, enterprise
                  Wi-Fi, continuity design, and cloud voice can be layered where appropriate.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Building types we commonly evaluate
              </h2>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {buildingTypes.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-white/70 leading-relaxed">
                Serviceability depends on the specific property, landlord access, building cabling,
                upstream reach, and service design. Orbitlink confirms feasibility before committing
                to delivery posture.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Why businesses choose Orbitlink</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Structured onboarding, not vague promises",
                  "Clear distinction between broadband and DIA posture",
                  "Managed network options for office environments",
                  "Continuity design for uptime-sensitive businesses",
                  "Documented delivery and acceptance checkpoints",
                  "Customer-facing operator experience with premium support posture",
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-lg font-semibold tracking-tight">Local business details</h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div>
                  <div className="text-white/60">Business</div>
                  <div className="text-white/85 font-medium">{BUSINESS.name}</div>
                </div>

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
                  <div className="text-white/60">Address</div>
                  <div className="text-white/85">
                    {BUSINESS.address.street}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postal}
                  </div>
                </div>

                <div>
                  <div className="text-white/60">Hours</div>
                  <div className="text-white/85">Mon–Fri 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-sm font-semibold tracking-tight">Best first step</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                If you are evaluating business internet in Mississauga, request availability and
                include your address, business type, expected go-live date, and whether you need DIA,
                static IPs, managed Wi-Fi, or continuity.
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

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-sm font-semibold tracking-tight">Related local pages</h3>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Browse locations
                </Link>
                <Link
                  href="/locations/ontario"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Ontario coverage hub
                </Link>
                <Link
                  href="/internet-near-me"
                  className="text-white/80 hover:text-white underline underline-offset-4"
                >
                  Internet near me
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Mississauga FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            These answers reflect a real operational posture: clear scope, no overclaims, and
            feasibility confirmed per building and service design.
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