import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/brampton";
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
  title: "Business Fibre Internet in Brampton, ON | Orbitlink™",
  description:
    "Business fibre internet in Brampton with structured onboarding, enterprise support posture, and availability confirmed per building. Fibre, DIA, managed networking, and continuity options.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet in Brampton, ON | Orbitlink™",
    description:
      "Operator-grade business connectivity in Brampton including fibre internet, DIA, managed LAN & Wi-Fi, continuity architecture, and voice.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet in Brampton, ON | Orbitlink™",
    description:
      "Operator-grade business connectivity in Brampton with structured onboarding, documented delivery, and enterprise support posture.",
  },
};

const FAQ = [
  {
    q: "Do you service my address in Brampton?",
    a: "Coverage depends on building infrastructure and upstream feasibility. Orbitlink is available on-net where possible, with clear scoping when additional build work is required. Submit an availability request and Orbitlink will confirm feasibility.",
  },
  {
    q: "Do you support industrial and logistics sites in Brampton?",
    a: "Yes. Brampton includes many industrial, warehouse, and logistics environments where connectivity stability is essential. Orbitlink confirms feasibility per site and recommends broadband fibre or Dedicated Internet Access based on operational requirements.",
  },
  {
    q: "Do you offer Dedicated Internet Access (DIA) in Brampton?",
    a: "Yes. Dedicated Internet Access is available for business-critical environments where deterministic performance and a more formal delivery posture are required, subject to feasibility.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on the underlying access type, site design, and location. Orbitlink confirms options during onboarding.",
  },
  {
    q: "How long does installation take in Brampton?",
    a: "Timelines vary by building readiness, access type, landlord coordination, and upstream feasibility. Orbitlink uses structured onboarding and documented acceptance so expectations are clear before activation.",
  },
  {
    q: "Can you manage my LAN and Wi-Fi across office and warehouse environments?",
    a: "Yes. Orbitlink provides managed LAN and enterprise Wi-Fi, including segmentation posture and coverage planning suited to business environments, aligned with an operator-grade support posture.",
  },
  {
    q: "Do you offer failover and continuity options?",
    a: "Yes. Orbitlink designs LTE and 5G continuity patterns for sites that require operational uptime during access disruptions. Feasibility depends on site constraints and continuity design.",
  },
  {
    q: "Are you a reseller?",
    a: "Orbitlink is the customer-facing operator responsible for onboarding posture, documentation, and support experience. Certain access products may be delivered via agent or reseller models and are clearly labeled as such.",
  },
  {
    q: "Do you provide business internet for warehouses in Brampton?",
    a: "Yes. Orbitlink frequently evaluates warehouse and logistics environments across Brampton where voice, cloud platforms, cameras, VPNs, and line-of-business systems rely on stable internet service. Availability depends on building infrastructure and upstream feasibility.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Brampton", item: PAGE_URL },
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
      { "@type": "City", name: "Brampton" },
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
    name: "Business Fibre Internet in Brampton",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Brampton" },
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

export default function BramptonLocationPage() {
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
          Business Fibre Internet in Brampton, ON
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink provides operator-grade business connectivity in Brampton with a disciplined
          delivery posture: structured onboarding, documented acceptance, and enterprise support
          posture. Availability is <span className="text-white/85 font-medium">on-net where available</span>,
          with clear feasibility scoping when additional build work is required.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "On-net where available",
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
              Brampton connectivity for operations-heavy environments
            </h2>

            <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
              <p>
                Brampton is one of Ontario’s strongest industrial and logistics markets, with major
                warehouse, manufacturing, transportation, and multi-site business environments. In
                this type of market, connectivity is not just about price — it is about stable
                operations, clear delivery posture, and serviceability confirmed before activation.
              </p>

              <p>
                Orbitlink uses a controlled onboarding model: confirm building feasibility, align
                service requirements, choose the correct access posture, and coordinate delivery
                with documented acceptance checkpoints. This reduces install friction and helps avoid
                surprise scope after activation.
              </p>

              <p>
                Commercial areas around Airport Road, Steeles Avenue, Queen Street corridors, and
                major industrial and logistics zones often require more than generic broadband.
                Business fibre, DIA, managed LAN, segmentation, and continuity planning can all
                matter depending on the site’s operational profile.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Brampton business connectivity environments
              </h3>
              <p>
                Brampton has a high concentration of industrial parks, warehouse footprints, and
                logistics-heavy operations where line-of-business applications, voice systems, cloud
                platforms, VPNs, cameras, and IoT endpoints need dependable internet access. Orbitlink
                evaluates site feasibility and delivery posture before activation so the correct model
                is selected from the start.
              </p>

              <p>
                Orbitlink also supports nearby business markets including{" "}
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
                , and{" "}
                <Link
                  href="/locations/vaughan"
                  className="text-white/85 hover:text-white underline underline-offset-4"
                >
                  Vaughan
                </Link>
                .
              </p>

              <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">
                Service modules commonly deployed in Brampton
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
                When DIA is the right fit
              </h3>
              <p>
                Dedicated Internet Access is a strong fit when performance and delivery posture must
                be more deterministic — critical systems, regulated environments, multi-site routing,
                high-priority voice, or warehouse and logistics operations where broadband variance is
                operationally unacceptable.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Continuity posture
              </h3>
              <p>
                For Brampton operations, uptime planning matters. Orbitlink can design LTE and 5G
                continuity patterns to reduce downtime during access disruptions, aligned with your
                critical applications, business workflows, and operational priorities.
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
                Start with feasibility confirmation. If your site is performance-critical, request a
                DIA assessment and continuity posture review.
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
                href="/locations/mississauga"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                Mississauga
              </Link>
              {", "}
              <Link
                href="/locations/vaughan"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                Vaughan
              </Link>
              {", "}
              <Link
                href="/locations/toronto"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                Toronto
              </Link>
              .
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Brampton FAQs</h2>
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