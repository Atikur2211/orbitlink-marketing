import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/oshawa";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BUSINESS = {
  name: "Orbitlink™",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
} as const;

export const metadata: Metadata = {
  title: "Business Fibre Internet Oshawa",
  description:
    "Business internet in Oshawa for offices, industrial sites, and commercial locations. Fibre, dedicated internet, and address-based availability checks.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Business Fibre Internet Oshawa | Orbitlink",
    description:
      "Business internet in Oshawa for offices, industrial sites, and commercial locations. Fibre, dedicated internet, and address-based availability checks.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet in Oshawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet Oshawa | Orbitlink",
    description:
      "Business internet in Oshawa for offices, industrial sites, and commercial locations.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

const FAQ = [
  {
    q: "Do you service my address in Oshawa?",
    a: "Coverage depends on building infrastructure and upstream feasibility. Orbitlink confirms availability by address and outlines next steps when additional feasibility review is required.",
  },
  {
    q: "Is Oshawa a strong market for business fibre internet?",
    a: "Yes. Oshawa is a growing business market with office demand, healthcare and education-linked activity, logistics access, and broader Durham-region commercial growth.",
  },
  {
    q: "Do you offer Dedicated Internet Access (DIA) in Oshawa?",
    a: "Yes. Dedicated Internet Access may be available for performance-critical environments that need stronger uptime, more predictable throughput, and a cleaner enterprise handoff.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options may be available depending on the access type and location. Orbitlink confirms options during the availability and onboarding process.",
  },
  {
    q: "Can you manage LAN and enterprise Wi-Fi?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi including segmentation, guest access, and coverage planning for operational environments.",
  },
  {
    q: "Do you offer continuity and failover options?",
    a: "Yes. Orbitlink can support LTE and 5G continuity options for sites that require uptime during access disruptions, subject to site fit and feasibility.",
  },
  {
    q: "How long does installation take in Oshawa?",
    a: "Timelines depend on building readiness, access type, landlord coordination, and upstream delivery conditions. Expectations are confirmed during the onboarding process.",
  },
  {
    q: "Are you a reseller?",
    a: "Orbitlink is the customer-facing provider responsible for onboarding, documentation, and support experience. Certain access products may be delivered through reseller or agent models and are identified accordingly.",
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
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": PAGE_URL,
        url: PAGE_URL,
        name: "Business Fibre Internet Oshawa",
        description:
          "Business internet in Oshawa for offices, industrial sites, and commercial locations. Fibre, dedicated internet, and address-based availability checks.",
        inLanguage: "en-CA",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Locations",
            item: `${SITE_URL}/locations`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Oshawa",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };
}

export default function OshawaLocationPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">Service Area</span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
          Business Fibre Internet in Oshawa
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          Orbitlink supports business internet in Oshawa for offices, industrial locations,
          and commercial environments. Availability is confirmed by building so the right
          service path can be matched to the site before moving forward.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability by building",
            "Business fibre and DIA",
            "Commercial and industrial fit",
            "Structured onboarding",
            "Durham-region business coverage",
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
              Oshawa connectivity for offices, industrial sites, and growing business operations
            </h2>

            <div className="mt-3 space-y-4 leading-relaxed text-white/70">
              <p>
                Oshawa is a strong Ontario market for business connectivity because it combines
                office demand, healthcare and education-linked activity, logistics access, and
                broader Durham-region commercial growth.
              </p>

              <p>
                Orbitlink starts with feasibility confirmation, then aligns the correct service
                path for the building. That matters in markets like Oshawa where building
                conditions, operational requirements, and connectivity expectations can vary
                significantly by site.
              </p>

              <p>
                Many Oshawa businesses rely on cloud applications, voice, VPN access, cameras,
                internal Wi-Fi, and multi-user workflows. In those environments, stable outcomes
                often depend on choosing the right combination of business fibre, dedicated
                internet, managed LAN and Wi-Fi, and continuity design where uptime matters.
              </p>

              <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">
                Service modules commonly deployed in Oshawa
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
                Business fibre vs dedicated internet
              </h3>
              <p>
                Business fibre is often the right fit when you need strong value, stable
                day-to-day performance, and a structured business delivery process. Dedicated
                internet is better when predictable throughput, stronger uptime, or cleaner
                enterprise handoff matters for critical systems.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Managed network posture
              </h3>
              <p>
                Managed LAN and Wi-Fi helps Oshawa offices and commercial environments stay
                stable with segmentation, guest access, cleaner coverage planning, and more
                structured operational support.
              </p>

              <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                Continuity architecture
              </h3>
              <p>
                If uptime matters, Orbitlink can support LTE and 5G continuity options aligned
                to the site’s operational priorities. Constraints and feasibility are reviewed
                before activation.
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
                  Address, broadband vs DIA needs, static IP requirements, managed Wi-Fi,
                  and continuity requirements.
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-sm font-semibold tracking-tight">Recommended starting point</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Start with feasibility confirmation. If performance is critical, request a
                dedicated internet assessment and continuity review.
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
                href="/locations/whitby"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Whitby
              </Link>
              {", "}
              <Link
                href="/locations/toronto"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Toronto
              </Link>
              {", "}
              <Link
                href="/locations/ontario"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Ontario hub
              </Link>
              .
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Oshawa FAQs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers with availability confirmed by site before moving forward.
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