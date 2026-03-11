import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/newmarket";
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
} as const;

export const metadata: Metadata = {
  title: "Business Fibre Internet in Newmarket, ON | Orbitlink™",
  description:
    "Operator-grade business fibre internet in Newmarket with structured onboarding, documented delivery, and enterprise support posture. Fibre, DIA, managed LAN & Wi-Fi, continuity, and voice.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet in Newmarket, ON | Orbitlink™",
    description:
      "Business connectivity in Newmarket: fibre, DIA, managed LAN & Wi-Fi, continuity architecture, and voice. Availability by building.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet in Newmarket, ON | Orbitlink™",
    description:
      "Operator-grade business connectivity in Newmarket delivered with structured onboarding, documented acceptance, and enterprise support posture.",
  },
};

const FAQ = [
  {
    q: "Do you service my address in Newmarket?",
    a: "Coverage depends on building infrastructure and upstream feasibility. Orbitlink is available on-net where possible, with clear scoping when additional build work is required. Submit an availability request and we’ll confirm feasibility.",
  },
  {
    q: "Is Newmarket a strong market for business fibre internet?",
    a: "Yes. Newmarket is a strong business market with office, professional services, health sciences, business services, and growth-oriented commercial demand. Orbitlink confirms feasibility per site and aligns the correct service module to operational requirements.",
  },
  {
    q: "Do you offer Dedicated Internet Access (DIA) in Newmarket?",
    a: "Yes—DIA is available for performance-critical environments requiring deterministic throughput, cleaner enterprise handoff, and a more formal delivery posture, subject to feasibility.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on the underlying access type and location. We’ll confirm options during onboarding.",
  },
  {
    q: "Can you manage LAN and enterprise Wi-Fi?",
    a: "Yes—Orbitlink provides Managed LAN & Enterprise Wi-Fi including segmentation posture, guest access, and coverage planning aligned with an operator-grade support posture.",
  },
  {
    q: "Do you offer continuity and failover options?",
    a: "Yes—Orbitlink designs LTE/5G continuity patterns for sites that require uptime during access disruptions. Feasibility depends on site constraints and design.",
  },
  {
    q: "How long does installation take in Newmarket?",
    a: "Timelines vary by building readiness, access type, landlord coordination, and upstream delivery conditions. Orbitlink uses structured onboarding and documented acceptance so expectations are clear before activation.",
  },
  {
    q: "Are you a reseller?",
    a: "Orbitlink is the customer-facing operator responsible for onboarding posture, documentation, and support experience. Certain access products may be delivered via agent or reseller models and are clearly labeled as such.",
  },
] as const;

const serviceModules = [
  { t: "Business Fibre Internet", href: "/services/business-fibre-internet" },
  { t: "Dedicated Internet Access (DIA)", href: "/services/dedicated-internet-access" },
  { t: "Managed LAN & Enterprise Wi-Fi", href: "/services/managed-lan-wifi" },
  { t: "LTE / 5G Continuity Architecture", href: "/services/lte-5g-continuity" },
  { t: "VoIP & Cloud Voice", href: "/services/voip-cloud-voice" },
  { t: "Static IP Routing", href: "/services/static-ip-routing" },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Newmarket", item: PAGE_URL },
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
      { "@type": "City", name: "Newmarket" },
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
    name: "Business Fibre Internet in Newmarket",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Newmarket" },
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

export default function NewmarketLocationPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Area</span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
          Business Fibre Internet in Newmarket, ON
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          Orbitlink delivers operator-grade business connectivity in Newmarket with a disciplined
          delivery posture: structured onboarding, documented acceptance, and enterprise support
          posture. Availability is{" "}
          <span className="font-medium text-white/85">confirmed per building</span>, with clear
          feasibility scoping when additional build work is required.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability by building",
            "Structured onboarding",
            "Documented delivery",
            "Enterprise support posture",
            "Office and business-services fit",
          ].map((x) => (
            <span
              key={x}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
            >
              {x}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Check Availability / Request Access
          </Link>
          <Link
            href="/services/business-fibre-internet"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            Business Fibre Service Module
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8 lg:col-span-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Newmarket connectivity for business services, offices, and growth-oriented environments
            </h2>

            <div className="mt-3 space-y-4 leading-relaxed text-white/70">
              <p>
                Newmarket is a strong business location because it actively supports business growth,
                partnerships, and expansion, with economic-development emphasis around business
                services, health sciences, manufacturing, and retail.
              </p>

              <p>
                Orbitlink’s posture is operator-grade: confirm feasibility first, align the correct
                service module, and deliver with documented acceptance checkpoints. That matters in
                markets like Newmarket where office environments, professional services, clinics,
                and modern multi-tenant buildings depend on stable access and clean support posture.
              </p>

              <p>
                Many Newmarket businesses rely on cloud workloads, voice, VPN access, internal
                Wi-Fi, cameras, and distributed workflows. In those environments, stable outcomes
                depend not just on access, but on correct service selection between business fibre
                and DIA, plus managed LAN/Wi-Fi posture and continuity design where uptime matters.
              </p>

              <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">
                Service modules commonly deployed in Newmarket
              </h3>

              <ul className="mt-2 space-y-2">
                {serviceModules.map((x) => (
                  <li key={x.t} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>
                      <Link
                        href={x.href}
                        className="text-white/85 underline underline-offset-4 hover:text-white"
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
                Business fibre is ideal when you want strong value with disciplined onboarding and a
                professional delivery posture. DIA is the better fit when deterministic performance,
                cleaner enterprise handoff, or more formal delivery requirements are needed for
                critical systems, regulated environments, or uptime-sensitive operations.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Managed network posture
              </h3>
              <p>
                Managed LAN/Wi-Fi helps Newmarket offices and professional environments stay stable:
                segmentation posture, guest access, coverage planning, and a support experience that
                feels operator-grade rather than consumer-grade.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Continuity architecture
              </h3>
              <p>
                If uptime matters, Orbitlink can design LTE/5G continuity patterns aligned to your
                critical traffic and operational priorities. Constraints and feasibility are scoped
                before activation so expectations remain clear.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h2 className="text-lg font-semibold tracking-tight">Request availability</h2>

            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div>
                <div className="text-white/60">Phone</div>
                <a
                  className="text-white/85 underline underline-offset-4 hover:text-white"
                  href={`tel:${BUSINESS.phoneE164}`}
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </div>

              <div>
                <div className="text-white/60">Ontario coverage hub</div>
                <Link
                  href="/locations/ontario"
                  className="text-white/85 underline underline-offset-4 hover:text-white"
                >
                  View province coverage
                </Link>
              </div>

              <div>
                <div className="text-white/60">What to include</div>
                <div className="text-white/85">
                  Address + posture (broadband vs DIA, static IP, managed LAN/Wi-Fi, continuity).
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-sm font-semibold tracking-tight">Recommended starting point</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Start with feasibility confirmation. If performance is critical, request a DIA
                assessment and continuity posture review.
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

            <div className="mt-6 text-sm text-white/60">
              Nearby:{" "}
              <Link
                href="/locations/aurora"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Aurora
              </Link>
              {", "}
              <Link
                href="/locations/richmond-hill"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Richmond Hill
              </Link>
              {", "}
              <Link
                href="/locations/markham"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Markham
              </Link>
              .
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Newmarket FAQs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear, operational answers—coverage confirmed per site, with scope and feasibility
            defined before activation.
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
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Explore Services
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Browse Locations
            </Link>
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}