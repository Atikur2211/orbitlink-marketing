// src/app/internet-near-me/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/internet-near-me";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

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
  title: "Internet Near Me | Business Fibre & Managed Network | Orbitlink™",
  description:
    "Searching “internet near me”? Orbitlink provides operator-grade business internet across Ontario: fibre, DIA, managed LAN/Wi-Fi, and continuity architecture. Check availability.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Internet Near Me | Orbitlink™",
    description:
      "Business internet near you—operator-grade delivery posture with structured onboarding, documented acceptance, and enterprise support posture. Availability confirmed per address.",
    url: PAGE_PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet Near Me | Orbitlink™",
    description:
      "Operator-grade business internet across Ontario. Check availability per address and request access.",
  },
};

const FAQ = [
  {
    q: "Do you provide “internet near me” for businesses?",
    a: "Yes. Orbitlink provides business connectivity across Ontario. Availability depends on building infrastructure and upstream feasibility, so we confirm serviceability per address before activation.",
  },
  {
    q: "Do you service my exact address?",
    a: "Submit your service address and requirements (Fibre vs DIA, static IP, managed LAN/Wi-Fi, continuity). Orbitlink will confirm feasibility and scope before activation—no overclaims.",
  },
  {
    q: "What’s the difference between Business Fibre and DIA?",
    a: "Business Fibre is ideal for strong value with disciplined onboarding. Dedicated Internet Access (DIA) is for performance-critical sites requiring a more deterministic delivery posture.",
  },
  {
    q: "Do you offer managed Wi-Fi and LAN support?",
    a: "Yes. Orbitlink provides Managed LAN & Enterprise Wi-Fi including segmentation posture, guest networks, and coverage planning aligned to an operator-grade support posture.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options are available where feasible and depend on access type and location. We confirm options during onboarding.",
  },
  {
    q: "How fast can you install?",
    a: "Timelines vary by building readiness, access type, and upstream coordination. Orbitlink uses structured onboarding and documented acceptance so expectations are defined before activation.",
  },
  {
    q: "Is Orbitlink residential internet?",
    a: "Orbitlink is optimized for business connectivity and managed network posture. If you have a mixed-use requirement, submit your details and we’ll advise what’s feasible.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Internet Near Me", item: PAGE_URL },
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
    "@type": "Service",
    name: "Business Internet Near Me (Ontario)",
    provider: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access (DIA)",
      "Managed LAN & Enterprise Wi-Fi",
      "LTE / 5G Continuity Architecture",
      "VoIP & Cloud Voice",
      "Static IP Routing",
    ],
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

export default function InternetNearMePage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">High-intent search page</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Internet near me — business fibre & operator-grade delivery
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70 leading-relaxed">
          If you’re searching for <span className="text-white/85 font-medium">“internet near me”</span>, you usually need
          one thing: <span className="text-white/85 font-medium">reliable service at your address</span>, delivered with
          clear scope, timelines, and support posture. Orbitlink serves Ontario businesses with structured onboarding,
          documented acceptance, and enterprise support posture. Availability is{" "}
          <span className="text-white/85 font-medium">confirmed per building</span>.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Availability confirmed per address", "Structured onboarding", "Documented delivery", "Enterprise support posture"].map(
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

      {/* How we handle "near me" */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight">What “internet near me” actually means for business</h2>

            <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
              <p>
                “Near me” searches are high-intent: you want an internet provider that can serve your address, install with a
                clear timeline, and support the service when it matters. Orbitlink is built around a disciplined operator posture:
                feasibility-first, scope clarity, and documented acceptance.
              </p>

              <p>
                If your site relies on uptime (voice, VPN, cameras, cloud apps), you may need more than “a circuit.” We align the
                right module: Business Fibre for strong value, DIA for deterministic posture, managed LAN/Wi-Fi for stability, and
                continuity architecture for disruption events.
              </p>

              <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">Choose your module</h3>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    t: "Business Fibre Internet",
                    d: "Strong value with disciplined onboarding.",
                    href: "/services/business-fibre-internet",
                  },
                  {
                    t: "Dedicated Internet Access (DIA)",
                    d: "Deterministic posture for critical operations.",
                    href: "/services/dedicated-internet-access",
                  },
                  {
                    t: "Managed LAN & Enterprise Wi-Fi",
                    d: "Segmentation posture + stability and coverage.",
                    href: "/services/managed-lan-wifi",
                  },
                  {
                    t: "LTE / 5G Continuity",
                    d: "Uptime patterns during disruption events.",
                    href: "/services/lte-5g-continuity",
                  },
                ].map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.t}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</div>
                    <div className="mt-3 text-xs text-white/60">Open module →</div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold tracking-tight">What to send (so we can confirm availability fast)</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {[
                    "Service address (unit / suite if applicable)",
                    "Preferred module: Business Fibre or DIA",
                    "Static IP requirement (yes/no)",
                    "Managed LAN/Wi-Fi needed (yes/no)",
                    "Continuity requirement (LTE/5G failover, yes/no)",
                    "Timeline and any building access constraints",
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
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h2 className="text-lg font-semibold tracking-tight">Popular service areas</h2>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Browse a city page to see local FAQs, posture, and direct service links.
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

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] tracking-[0.26em] text-white/55">LOCAL SEO SIGNALS</div>
              <div className="mt-2 text-sm text-white/80">Business-first • Ontario coverage • feasibility-first</div>
              <div className="mt-3 text-sm text-white/70">
                Address: {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postal}
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
          </aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Internet near me FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Clear answers for high-intent searches—built to convert to an availability request.
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