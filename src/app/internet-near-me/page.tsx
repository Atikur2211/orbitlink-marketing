// src/app/internet-near-me/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/internet-near-me";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: "TIRAV Technologies Inc. o/a Orbitlink",
  phoneDisplay: "1-888-8-ORBIT-0",
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
  title: "Internet Near Me | Business Internet in Ontario | Orbitlink™",
  description:
    "Searching for business internet near you? Orbitlink provides business fibre, dedicated internet access, managed network infrastructure, and continuity options across Ontario with availability confirmed per address.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Internet Near Me | Orbitlink™",
    description:
      "Business internet near you with structured onboarding, documented delivery, and enterprise support posture. Availability confirmed per address across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet Near Me | Orbitlink™",
    description:
      "Operator-grade business internet across Ontario. Fibre, DIA, managed network options, and availability confirmed per address.",
  },
};

const FAQ = [
  {
    q: "Do you provide “internet near me” for businesses?",
    a: "Yes. Orbitlink provides business internet across Ontario, including commercial markets like Mississauga and other major cities. Availability depends on building infrastructure and upstream feasibility, so serviceability is confirmed per address before activation.",
  },
  {
    q: "Do you service my exact address?",
    a: "Submit your service address and requirements, including whether you need Business Fibre, Dedicated Internet Access, static IPs, managed LAN/Wi-Fi, or continuity design. Orbitlink will confirm feasibility and scope before activation.",
  },
  {
    q: "What’s the difference between Business Fibre and DIA?",
    a: "Business Fibre is often the right fit for organizations that need strong capacity and a premium onboarding posture. Dedicated Internet Access is better suited to performance-critical environments requiring a more deterministic delivery posture.",
  },
  {
    q: "Do you offer managed Wi-Fi and LAN support?",
    a: "Yes. Orbitlink provides managed LAN and enterprise Wi-Fi, including segmentation posture, guest network planning, and coverage design aligned with a business-grade support model.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on the access type, service design, and location. Orbitlink confirms options during onboarding.",
  },
  {
    q: "How fast can you install?",
    a: "Install timelines vary by building readiness, access type, landlord coordination, and upstream feasibility. Orbitlink uses structured onboarding and documented acceptance so expectations are clear before activation.",
  },
  {
    q: "Is Orbitlink residential internet?",
    a: "Orbitlink is designed primarily for business connectivity and managed network posture. If you have a mixed-use or edge-case requirement, submit your details and Orbitlink will advise what is feasible.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Internet Near Me", item: PAGE_URL },
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
    areaServed: [{ "@type": "AdministrativeArea", name: "Ontario" }],
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
    name: "Business Internet Near Me",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "AdministrativeArea", name: "Ontario" }],
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

const QUICK_CITIES = [
  { name: "Mississauga", href: "/locations/mississauga" },
  { name: "Brampton", href: "/locations/brampton" },
  { name: "Toronto", href: "/locations/toronto" },
  { name: "Markham", href: "/locations/markham" },
  { name: "Vaughan", href: "/locations/vaughan" },
  { name: "Oakville", href: "/locations/oakville" },
  { name: "Hamilton", href: "/locations/hamilton" },
  { name: "Ottawa", href: "/locations/ottawa" },
] as const;

const modules = [
  {
    title: "Business Fibre Internet",
    desc: "Strong value with disciplined onboarding and business-grade delivery posture.",
    href: "/services/business-fibre-internet",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    desc: "Deterministic posture for critical operations and clearer enterprise handoff expectations.",
    href: "/services/dedicated-internet-access",
  },
  {
    title: "Managed LAN & Enterprise Wi-Fi",
    desc: "Segmentation, stability, and coverage design for business environments.",
    href: "/services",
  },
  {
    title: "LTE / 5G Continuity",
    desc: "Continuity architecture for uptime-sensitive sites during disruption events.",
    href: "/services/lte-5g-continuity",
  },
] as const;

export default function InternetNearMePage() {
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
          <span className="text-sm tracking-wide text-white/60">High-intent search page</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Internet near me — business fibre, DIA, and operator-grade delivery
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          If you are searching for <span className="text-white/85 font-medium">internet near me</span>,
          what usually matters is simple: can the provider serve your address, scope the work clearly,
          and support the service properly after activation? Orbitlink serves Ontario businesses with
          structured onboarding, documented acceptance, and availability confirmed per building.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability confirmed per address",
            "Structured onboarding",
            "Documented delivery",
            "Enterprise support posture",
            "Ontario service footprint",
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
            href="/locations"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Browse Service Areas
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            View Service Modules
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/55">
          Phone:{" "}
          <a className="text-white/75 hover:text-white transition" href={`tel:${BUSINESS.phoneE164}`}>
            {BUSINESS.phoneDisplay}
          </a>{" "}
          • Ontario • Business-first posture
        </div>
      </section>

      {/* Core content */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                What “internet near me” really means for business
              </h2>

              <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
                <p>
                  “Near me” searches are high-intent. You are not looking for generic marketing
                  language — you are trying to find a provider that can actually serve your address,
                  install with a clear timeline, and support the connection in a way that matches
                  business operations.
                </p>

                <p>
                  Orbitlink handles this with a disciplined operator posture: feasibility first,
                  scope clarity before commitment, and documented acceptance before go-live. This is
                  especially important when the site depends on voice, VPN, cameras, cloud apps,
                  guest Wi-Fi, or continuity design.
                </p>

                <p>
                  If your business needs more than “just a circuit,” Orbitlink aligns the right
                  service module: Business Fibre for strong value, DIA for deterministic posture,
                  managed LAN/Wi-Fi for internal stability, and LTE/5G continuity for disruption events.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Choose the right service module</h2>

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
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                What to send for the fastest availability check
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {[
                  "Service address (unit / suite if applicable)",
                  "Preferred module: Business Fibre or DIA",
                  "Static IP requirement (yes/no)",
                  "Managed LAN / Wi-Fi needed (yes/no)",
                  "Continuity requirement: LTE / 5G failover (yes/no)",
                  "Timeline and any building or landlord access constraints",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
                >
                  Request Access
                </Link>
                <Link
                  href="/trust"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
                >
                  Trust & Delivery Posture
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-lg font-semibold tracking-tight">Popular service areas</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Browse a city page to see local context, FAQs, and direct service links.
              </p>

              <div className="mt-4 grid gap-2">
                {QUICK_CITIES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10 transition flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-[#FACC15]">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] tracking-[0.26em] text-white/55">LOCAL SIGNALS</div>
              <div className="mt-2 text-sm text-white/80">
                Business-first • Ontario coverage • feasibility-first
              </div>
              <div className="mt-3 text-sm text-white/70">
                Address: {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.region}{" "}
                {BUSINESS.address.postal}
              </div>
              <div className="mt-2 text-sm">
                <a className="text-white/75 hover:text-white transition" href={`tel:${BUSINESS.phoneE164}`}>
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div className="mt-4">
                <Link
                  href="/locations/ontario"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 transition w-full"
                >
                  Ontario Coverage Hub
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">START HERE</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                If you are searching for a provider near your business location, the best next step
                is to request availability with your address and requirements so Orbitlink can confirm
                what is feasible.
              </p>
              <Link
                href="/contact#intake"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
              >
                Check Availability
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Internet near me FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Clear answers for high-intent searches, built to move from interest to an availability request.
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
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Browse Locations
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}