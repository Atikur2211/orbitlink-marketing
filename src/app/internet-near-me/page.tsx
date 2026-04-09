import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/internet-near-me";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: "TIRAV Technologies Inc. o/a Orbitlink",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
  email: "concierge@orbitlink.ca",
  address: {
    street: "30 Eglinton Ave W, Suite 400-A77",
    city: "Mississauga",
    region: "ON",
    postal: "L5R 3E7",
    country: "CA",
  },
} as const;

export const metadata: Metadata = {
  title: "Business Internet Near Me | Orbitlink",
  description:
    "Business internet near you in Ontario. Fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity. Check availability by address.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Internet Near Me | Orbitlink",
    description:
      "Business internet near you for Ontario offices, warehouses, clinics, and commercial sites. Check availability by address and find the right setup for your business.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Business Internet Near Me | Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet Near Me | Orbitlink",
    description:
      "Business internet near you across Ontario. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity.",
    images: [TWITTER_IMAGE_URL],
  },
};

const FAQ = [
  {
    q: "Do you provide business internet near me?",
    a: "Yes. Orbitlink supports Ontario business locations, including major commercial markets such as Mississauga, Toronto, Brampton, Markham, Vaughan, Oakville, Hamilton, and Ottawa. Availability depends on the building and upstream serviceability, so it is checked by address before moving forward.",
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

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Business Internet Near Me | Orbitlink",
        description:
          "Business internet near you in Ontario. Fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity. Check availability by address.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Business Internet Near Me", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/50">{children}</div>;
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

function BulletGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function InternetNearMePage() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">High-intent business search page</span>
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Business Internet Near You for Ontario Businesses
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          If you are searching for <span className="font-medium text-white/85">business internet near me</span>,
          the real question is simple: can the provider serve your address, recommend the right
          setup, and support the service properly after installation? Orbitlink helps Ontario
          businesses with fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity,
          with availability checked by address.
        </p>

        <p className="mt-3 text-sm text-white/60">
          Availability varies by building. Submit your address to confirm what fits your site.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability checked by address",
            "Business-first service model",
            "Ontario coverage",
            "Clear next step for business buyers",
            "Built for offices, warehouses, clinics, and commercial locations",
          ].map((item) => (
            <span
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Check Business Internet Availability
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
          <MetricPill label="NEXT STEP" value="Availability and service direction" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>WHY THIS PAGE MATTERS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business internet near you should be simple
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  “Internet near me” is a high-intent search. Most business buyers are not
                  looking for generic marketing language. They want to know whether the provider
                  can serve the address, install clearly, and support the service properly after.
                </p>

                <p>
                  Orbitlink is built around that process: check the address first, match the
                  right service to the site, and guide the next step clearly before activation.
                </p>

                <p>
                  Businesses expanding across Ontario markets can also explore{" "}
                  <Link
                    href="/business-internet-milton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    business internet in Milton
                  </Link>{" "}
                  to understand availability, service fit, and next steps for warehouse, industrial, and office environments.
                </p>

                <p>
                  This matters most when the business depends on voice, VPNs, cameras, cloud
                  apps, guest Wi-Fi, static IPs, or backup internet.
                </p>

                <p>
                  For many organizations, this makes Orbitlink a stronger option when searching
                  for business internet near me in Ontario with a clearer deployment path and
                  more structured support.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>BUSINESS INTERNET OPTIONS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Choose the right service for the site
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  The right business internet setup is not always the same from one building
                  to another. Some sites need reliable business fibre. Others need dedicated
                  internet, stronger Wi-Fi design, static IPs, or backup connectivity.
                </p>

                <p>
                  Orbitlink helps businesses move from a generic search into a clearer
                  recommendation based on building fit, serviceability, and operational needs.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {modules.map((module) => (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{module.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{module.desc}</div>
                    <div className="mt-3 text-xs text-white/60">Open service →</div>
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2">
                <Link href="/locations/barrie" className="underline hover:text-white">
                  Business internet in Barrie
                </Link>
                <Link href="/locations/north-york" className="underline hover:text-white">
                  Business internet in North York
                </Link>
                <Link href="/locations/niagara-st-catharines" className="underline hover:text-white">
                  Business internet in Niagara / St. Catharines
                </Link>
                <Link href="/locations/newmarket" className="underline hover:text-white">
                  Business internet in Newmarket
                </Link>
                <Link href="/locations/sudbury" className="underline hover:text-white">
                  Business internet in Sudbury
                </Link>
                <Link href="/locations/kingston" className="underline hover:text-white">
                  Business internet in Kingston
                </Link>
                <Link href="/locations/thunder-bay" className="underline hover:text-white">
                  Business internet in Thunder Bay
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <SectionEyebrow>FASTEST WAY TO CHECK</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                What to send for the fastest availability check
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
                A better request leads to a faster answer. Include the key details below so the
                right service direction can be reviewed quickly.
              </p>

              <div className="mt-5">
                <BulletGrid
                  items={[
                    "Service address, including unit or suite if applicable",
                    "Preferred service: business fibre or dedicated internet",
                    "Static IPs needed or not",
                    "Managed Wi-Fi or LAN support needed or not",
                    "Backup internet needed or not",
                    "Timeline and any building or landlord constraints",
                  ]}
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                >
                  Check Business Internet Availability
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
                Open a city page to see local business context, direct service links, and
                location-specific FAQs.
              </p>

              <div className="mt-4 grid gap-2">
                {QUICK_CITIES.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                  >
                    <span>{city.name}</span>
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
                If you are searching for a provider near your business location, the best next
                step is to submit your address and requirements so Orbitlink can confirm what is available.
              </p>
              <Link
                href="/contact#intake"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Check Business Internet Availability
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Business internet near me FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers built to move from search interest to an availability request.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-base font-semibold tracking-tight">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Check Business Internet Availability
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
    </div>
  );
}