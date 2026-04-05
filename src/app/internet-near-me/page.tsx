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
} as const;

export const metadata: Metadata = {
  title: "Internet Near Me | Business Internet in Ontario | Orbitlink",
  description:
    "Searching for business internet near you? Orbitlink provides business fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity across Ontario. Availability is checked by address.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Internet Near Me | Business Internet in Ontario | Orbitlink",
    description:
      "Business internet near you with fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity across Ontario. Availability is checked by address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet Near Me | Orbitlink",
    description:
      "Business internet near you across Ontario. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity.",
  },
};

const FAQ = [
  {
    q: "Do you provide business internet near me?",
    a: "Yes. Orbitlink supports Ontario business locations, including major commercial markets like Mississauga, Toronto, Brampton, Markham, Vaughan, Oakville, Hamilton, and Ottawa. Availability depends on the building and upstream serviceability, so it is checked by address before moving forward.",
  },
  {
    q: "Do you service my exact address?",
    a: "Submit your service address and what you need, such as business fibre, dedicated internet, static IPs, managed Wi-Fi, voice, or backup connectivity. Orbitlink reviews what is available before the next step is confirmed.",
  },
  {
    q: "What’s the difference between business fibre and dedicated internet?",
    a: "Business fibre is often the right fit for strong day-to-day business connectivity and value. Dedicated internet is better for sites that need stronger uptime, cleaner escalation, and more predictable performance.",
  },
  {
    q: "Do you offer managed Wi-Fi and LAN support?",
    a: "Yes. Orbitlink provides managed LAN and business Wi-Fi, including segmentation, guest networking, and coverage planning for business environments.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Yes. Static IP options are available where feasible and depend on the access type, service design, and location.",
  },
  {
    q: "How fast can you install?",
    a: "Installation timing depends on building readiness, access type, landlord coordination, and upstream serviceability. Expectations are reviewed before activation.",
  },
  {
    q: "Is Orbitlink residential internet?",
    a: "Orbitlink is focused mainly on business connectivity and managed network services. Mixed-use or edge-case requests can still be submitted for review.",
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
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet Near Me",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "AdministrativeArea", name: "Ontario" }],
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed LAN and Wi-Fi",
      "LTE and 5G Backup Connectivity",
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
    desc: "Reliable primary internet for offices, commercial sites, and growing businesses.",
    href: "/services/business-fibre-internet",
  },
  {
    title: "Dedicated Internet Access",
    desc: "Stronger uptime and more predictable performance for critical environments.",
    href: "/services/dedicated-internet-access",
  },
  {
    title: "Managed LAN & Wi-Fi",
    desc: "Managed internal networking, segmentation, and better Wi-Fi coverage.",
    href: "/services/managed-lan-wifi",
  },
  {
    title: "LTE / 5G Backup",
    desc: "Backup internet for businesses that need continuity during outages.",
    href: "/services/lte-5g-continuity",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/50">{children}</div>;
}

function MetricPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

export default function InternetNearMePage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Business search page</span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
          Internet near me for Ontario businesses
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          If you are searching for <span className="font-medium text-white/85">internet near me</span>,
          the real question is simple: can the provider serve your address, recommend the right
          setup, and support the service properly after installation? Orbitlink helps Ontario
          businesses with fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity,
          with availability checked by address.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability checked by address",
            "Business-first service model",
            "Ontario coverage",
            "Clear next step",
            "Built for business locations",
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
            Check Availability
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            Browse Service Areas
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            View Services
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/55">
          Phone:{" "}
          <a className="text-white/75 transition hover:text-white" href={`tel:${BUSINESS.phoneE164}`}>
            {BUSINESS.phoneDisplay}
          </a>{" "}
          • Ontario • Business-first
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricPill label="BEST FOR" value="Ontario business locations" />
          <MetricPill label="CHECKED BY" value="Address and building fit" />
          <MetricPill label="NEXT STEP" value="Availability and pricing direction" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>WHAT THIS SEARCH REALLY MEANS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business internet near you should be simple
              </h2>

              <div className="mt-3 space-y-4 text-white/70 leading-relaxed">
                <p>
                  “Internet near me” is a high-intent search. Most business buyers are not looking
                  for generic marketing language. They want to know whether the provider can serve
                  the address, install clearly, and support the service properly afterward.
                </p>

                <p>
                  Orbitlink is built around that process: check the address first, match the right
                  service to the site, and guide the next step clearly before activation.
                </p>

                <p>
                  This matters most when the business depends on voice, VPNs, cameras, cloud apps,
                  guest Wi-Fi, static IPs, or backup internet.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE OPTIONS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">Choose the right service</h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {modules.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                    <div className="mt-3 text-xs text-white/60">Open service →</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionEyebrow>FASTEST WAY TO CHECK</SectionEyebrow>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                What to send for the fastest availability check
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {[
                  "Service address, including unit or suite if applicable",
                  "Preferred service: business fibre or dedicated internet",
                  "Static IPs needed or not",
                  "Managed Wi-Fi or LAN support needed or not",
                  "Backup internet needed or not",
                  "Timeline and any building or landlord constraints",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                >
                  Check Availability
                </Link>
                <Link
                  href="/trust"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Trust & Compliance
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>POPULAR CITIES</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">Browse service areas</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Open a city page to see local context, direct service links, and location-specific FAQs.
              </p>

              <div className="mt-4 grid gap-2">
                {QUICK_CITIES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
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
                Business-first • Ontario coverage • Address-first review
              </div>
              <div className="mt-3 text-sm text-white/70">
                Address: {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.region}{" "}
                {BUSINESS.address.postal}
              </div>
              <div className="mt-2 text-sm">
                <a className="text-white/75 transition hover:text-white" href={`tel:${BUSINESS.phoneE164}`}>
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div className="mt-4">
                <Link
                  href="/locations/ontario"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Ontario Coverage Hub
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">START HERE</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                If you are searching for a provider near your business location, the best next step
                is to submit your address and requirements so Orbitlink can confirm what is available.
              </p>
              <Link
                href="/contact#intake"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Check Availability
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Internet near me FAQs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers built to move from search interest to an availability request.
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
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Availability
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Browse Locations
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}