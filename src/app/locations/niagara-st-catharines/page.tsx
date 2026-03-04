import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/niagara-st-catharines";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

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
  title: "Business Fibre Internet in Niagara (St. Catharines), ON | Orbitlink™",
  description:
    "Operator-grade business fibre internet in Niagara (St. Catharines). Structured onboarding, documented delivery, and enterprise support posture. Check availability.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet in Niagara (St. Catharines), ON | Orbitlink™",
    description:
      "Business connectivity in Niagara: fibre, DIA, managed LAN & Wi-Fi, continuity architecture, and voice. Availability by building.",
    url: PAGE_PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet in Niagara (St. Catharines), ON | Orbitlink™",
    description:
      "Operator-grade business connectivity in Niagara delivered with structured onboarding, documented acceptance, and enterprise support posture.",
  },
};

const FAQ = [
  {
    q: "Do you service my address in Niagara (St. Catharines)?",
    a: "Coverage depends on building infrastructure and upstream feasibility. Orbitlink is available on-net where possible, with clear scoping when additional build work is required. Submit an availability request and we’ll confirm feasibility.",
  },
  {
    q: "Is Niagara a good fit for business fibre and managed networking?",
    a: "Yes—Niagara has strong SMB demand across multiple districts. Orbitlink focuses on feasibility confirmation and disciplined delivery posture rather than overclaiming coverage.",
  },
  {
    q: "Do you offer Dedicated Internet Access (DIA) in Niagara?",
    a: "Yes—DIA is available for performance-critical environments requiring deterministic throughput/latency and a formal delivery posture, subject to feasibility.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on the underlying access type and location. We’ll confirm options during onboarding.",
  },
  {
    q: "Can you manage LAN and enterprise Wi-Fi?",
    a: "Yes—Orbitlink provides Managed LAN & Enterprise Wi-Fi including segmentation posture, guest networks, and coverage planning aligned with an operator-grade support posture.",
  },
  {
    q: "Do you offer continuity/failover options?",
    a: "Yes—Orbitlink designs LTE/5G continuity patterns for sites that require uptime during access disruptions. Feasibility depends on site constraints and design.",
  },
  {
    q: "How long does installation take in Niagara?",
    a: "Timelines vary by building readiness, access type, and upstream coordination. Orbitlink uses structured onboarding and documented acceptance so expectations are clear before activation.",
  },
  {
    q: "Are you a reseller?",
    a: "Orbitlink is the customer-facing operator responsible for onboarding posture, documentation, and support experience. Certain access products (e.g., Starlink) may be delivered via an agent/reseller model and are clearly labeled as such.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Niagara (St. Catharines)", item: PAGE_URL },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TelecomCompany"],
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postal,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: [
      { "@type": "Place", name: "Niagara (St. Catharines), Ontario" },
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
    "@type": "Service",
    name: "Business Fibre Internet in Niagara (St. Catharines)",
    provider: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
    areaServed: { "@type": "Place", name: "Niagara (St. Catharines), Ontario" },
    serviceType: ["Business Fibre Internet", "Dedicated Internet Access (DIA)", "Managed LAN & Enterprise Wi-Fi"],
    availableChannel: { "@type": "ServiceChannel", serviceUrl: PAGE_URL },
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

export default function NiagaraStCatharinesLocationPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Area</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business Fibre Internet in Niagara (St. Catharines), ON
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          Orbitlink provides operator-grade business connectivity in Niagara with a disciplined delivery posture:
          structured onboarding, documented acceptance, and enterprise support posture. Availability is{" "}
          <span className="text-white/85 font-medium">on-net where available</span>, with clear feasibility scoping when
          additional build work is required.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["On-net where available", "Structured onboarding", "Documented delivery", "Enterprise support posture"].map(
            (x) => (
              <span key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
                {x}
              </span>
            )
          )}
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

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Niagara connectivity for multi-district SMB operations with “near me” intent
            </h2>

            <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
              <p>
                Niagara is a high-intent region because business demand is spread across multiple districts. When customers
                search “business internet near me,” they want clarity: feasibility, delivery posture, and support.
              </p>

              <p>
                Orbitlink’s approach is operator-grade: confirm feasibility first, align the correct service module
                (business fibre vs DIA), and deliver with documented acceptance checkpoints. Where internal stability matters,
                managed LAN/Wi-Fi and segmentation posture reduce tickets and prevent instability.
              </p>

              <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">
                Service modules commonly deployed in Niagara
              </h3>

              <ul className="mt-2 space-y-2">
                {[
                  { t: "Business Fibre Internet", href: "/services/business-fibre-internet" },
                  { t: "Dedicated Internet Access (DIA)", href: "/services/dedicated-internet-access" },
                  { t: "Managed LAN & Enterprise Wi-Fi", href: "/services/managed-lan-wifi" },
                  { t: "LTE / 5G Continuity Architecture", href: "/services/lte-5g-continuity" },
                  { t: "VoIP & Cloud Voice", href: "/services/voip-cloud-voice" },
                  { t: "Static IP Routing", href: "/services/static-ip-routing" },
                ].map((x) => (
                  <li key={x.t} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>
                      <Link href={x.href} className="text-white/85 hover:text-white underline underline-offset-4">
                        {x.t}
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">Broadband fibre vs DIA</h3>
              <p>
                Broadband fibre is ideal when you want strong value with a professional delivery posture. DIA is the fit when
                deterministic performance and formal delivery requirements are needed (critical operations, regulated environments,
                multi-site routing, or where broadband variance is unacceptable).
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h2 className="text-lg font-semibold tracking-tight">Request availability</h2>

            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div>
                <div className="text-white/60">Phone</div>
                <a className="text-white/85 hover:text-white underline underline-offset-4" href={`tel:${BUSINESS.phoneE164}`}>
                  {BUSINESS.phoneDisplay}
                </a>
              </div>

              <div>
                <div className="text-white/60">Ontario coverage hub</div>
                <Link href="/locations/ontario" className="text-white/85 hover:text-white underline underline-offset-4">
                  View province coverage
                </Link>
              </div>

              <div>
                <div className="text-white/60">What to include</div>
                <div className="text-white/85">Address + posture (DIA, static IP, managed LAN/Wi-Fi, continuity).</div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-sm font-semibold tracking-tight">Recommended starting point</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Start with feasibility confirmation. If performance is critical, request a DIA assessment and continuity review.
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
              <Link href="/locations/hamilton" className="text-white/80 hover:text-white underline underline-offset-4">
                Hamilton
              </Link>
              {", "}
              <Link href="/locations/ontario" className="text-white/80 hover:text-white underline underline-offset-4">
                Ontario hub
              </Link>
              .
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Niagara FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Clear, operational answers—coverage confirmed per site, with scope defined before activation.
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