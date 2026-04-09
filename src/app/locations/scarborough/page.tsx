// src/app/locations/scarborough/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/locations/scarborough";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;
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
  hours: [
    { day: "Monday", opens: "09:00", closes: "18:00" },
    { day: "Tuesday", opens: "09:00", closes: "18:00" },
    { day: "Wednesday", opens: "09:00", closes: "18:00" },
    { day: "Thursday", opens: "09:00", closes: "18:00" },
    { day: "Friday", opens: "09:00", closes: "18:00" },
  ],
} as const;

const PAGE_TITLE = "Business Internet in Scarborough, Toronto, ON";
const PAGE_DESCRIPTION =
  "Business internet in Scarborough with fibre, dedicated internet, managed Wi-Fi, static IPs, voice, and backup connectivity. Availability is checked by address.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Business internet in Scarborough with fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Scarborough business internet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Business internet in Scarborough with fibre, dedicated internet, managed Wi-Fi, and backup connectivity.",
    images: [TWITTER_IMAGE_URL],
  },
};

const FAQ = [
  {
    q: "Do you service my address in Scarborough?",
    a: "Availability depends on the building, access feasibility, and upstream serviceability. Orbitlink confirms availability by address before moving forward.",
  },
  {
    q: "Do you support industrial and commercial sites in Scarborough?",
    a: "Yes. Scarborough includes a strong mix of industrial and commercial corridors. Orbitlink reviews each site and recommends the right access model based on business needs.",
  },
  {
    q: "Do you offer dedicated internet in Scarborough?",
    a: "Yes. Dedicated internet is available for performance-critical environments that need stronger uptime and more predictable performance, subject to feasibility.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Yes. Static IP options are available where feasible and depend on the access type, service design, and site location.",
  },
  {
    q: "Can you manage LAN and business Wi-Fi across office and floor devices?",
    a: "Yes. Orbitlink provides managed LAN and business Wi-Fi, including segmentation, guest access, coverage planning, and network support.",
  },
  {
    q: "How long does installation take in Scarborough?",
    a: "Install timing depends on building readiness, access type, landlord coordination, and upstream serviceability.",
  },
  {
    q: "Do you offer backup connectivity?",
    a: "Yes. Orbitlink can design LTE and 5G backup options for sites that need uptime during access disruptions.",
  },
  {
    q: "Are you a reseller?",
    a: "Orbitlink is the customer-facing operator responsible for onboarding, documentation, and support experience. Some access products may be delivered via an agent or reseller model and are labeled clearly.",
  },
] as const;

const serviceModules = [
  { title: "Business Fibre Internet", href: "/services/business-fibre-internet" },
  { title: "Dedicated Internet Access", href: "/services/dedicated-internet-access" },
  { title: "Managed LAN & Wi-Fi", href: "/services/managed-lan-wifi" },
  { title: "LTE / 5G Backup", href: "/services/lte-5g-continuity" },
  { title: "VoIP & Cloud Voice", href: "/services/voip-cloud-voice" },
  { title: "Static IP Routing", href: "/services/static-ip-routing" },
] as const;

const buildingTypes = [
  "Industrial and warehouse sites",
  "Commercial plazas and office environments",
  "Professional offices and service businesses",
  "Mixed office and floor-device environments",
  "Multi-site business operations",
] as const;

const whyOrbitlink = [
  "Availability checked by address",
  "Clear difference between broadband and dedicated internet",
  "Managed network options for mixed environments",
  "Backup options for uptime-sensitive operations",
  "Documented onboarding and delivery",
  "Business-first support",
] as const;

const heroTags = [
  "Business fibre internet",
  "Dedicated internet",
  "Managed Wi-Fi",
  "Backup connectivity",
  "Industrial and commercial fit",
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Scarborough", item: PAGE_URL },
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
    email: BUSINESS.email,
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
      { "@type": "Place", name: "Scarborough, Toronto" },
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
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet in Scarborough",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Scarborough, Toronto" },
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

export default function ScarboroughLocationPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-8 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#38FDFE]" />
            <span className="text-sm tracking-wide text-white/60">Scarborough business service area</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.02]">
                Business internet in Scarborough
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
                Orbitlink supports Scarborough businesses with fibre, dedicated internet,
                managed Wi-Fi, voice, static IPs, and backup connectivity. Availability is
                checked by address, building, and service fit before the next step is confirmed.
              </p>

              <div className="mt-3 text-sm text-white/70">
                Built for warehouses, industrial sites, commercial plazas, offices, and mixed business environments.
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {heroTags.map((x) => (
                  <span
                    key={x}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                  >
                    {x}
                  </span>
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
                  href="/services/business-fibre-internet"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Explore Fibre Service
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricPill label="CITY" value="Scarborough business locations" />
                <MetricPill label="CHECKED BY" value="Address and building fit" />
                <MetricPill label="NEXT STEP" value="Availability and pricing direction" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <SectionEyebrow>HOW TO START</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                  Start with your address
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  The best requests include the service address, service needed, target
                  timeline, and important details such as dedicated internet, static IPs,
                  managed Wi-Fi, voice, or backup connectivity.
                </p>

                <div className="mt-5 grid gap-3">
                  <MetricPill label="STEP 1" value="Choose the service" />
                  <MetricPill label="STEP 2" value="Add address and timing" />
                  <MetricPill label="STEP 3" value="Get the next step" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>LOCAL MARKET</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Scarborough combines industrial demand with mixed business environments
              </h2>

              <div className="mt-4 space-y-4 text-white/70 leading-relaxed">
                <p>
                  Scarborough is a strong business market with industrial corridors, commercial
                  areas, and mixed operating environments where stable connectivity and service
                  clarity matter.
                </p>

                <p>
                  Orbitlink approaches this market simply: check availability, match the site
                  to the right access type, define any managed network needs, and move into the
                  next business step.
                </p>

                <p>
                  Many Scarborough businesses run mixed environments with office users, floor
                  devices, cameras, IoT endpoints, voice systems, and cloud applications.
                  Depending on the site, fibre, dedicated internet, managed LAN and Wi-Fi,
                  or backup connectivity may all play an important role.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE OPTIONS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Services available in Scarborough
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {serviceModules.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
                  >
                    <div className="text-sm font-medium text-white/90">{item.title}</div>
                    <div className="mt-2 text-sm text-white/60">View service →</div>
                  </Link>
                ))}
              </div>

              <p className="mt-5 leading-relaxed text-white/70">
                Available services may include business fibre, dedicated internet,
                managed LAN and Wi-Fi, backup connectivity, voice, and static IP
                options depending on the site and service design.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>COMMON BUILDING TYPES</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business environments we commonly review
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {buildingTypes.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>

              <p className="mt-5 leading-relaxed text-white/70">
                Final availability depends on the specific property, landlord access,
                building cabling, upstream reach, and service design.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>WHY ORBITLINK</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Why Scarborough businesses choose Orbitlink
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {whyOrbitlink.map((x) => (
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

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>BUSINESS DETAILS</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                Orbitlink contact details
              </h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div>
                  <div className="text-white/60">Business</div>
                  <div className="font-medium text-white/85">{BUSINESS.name}</div>
                </div>

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
                  <div className="text-white/60">Email</div>
                  <a
                    className="text-white/85 underline underline-offset-4 hover:text-white"
                    href={`mailto:${BUSINESS.email}`}
                  >
                    {BUSINESS.email}
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
              <SectionEyebrow>BEST NEXT STEP</SectionEyebrow>
              <h3 className="mt-3 text-sm font-semibold tracking-tight">
                Check availability for your location
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Submit your address, business type, and service requirements to begin
                availability and pricing review.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                >
                  Check Availability
                </Link>
                <Link
                  href="/trust"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Trust & Compliance
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionEyebrow>RELATED PAGES</SectionEyebrow>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/toronto"
                  className="text-white/80 underline underline-offset-4 hover:text-white"
                >
                  Toronto
                </Link>
                <Link
                  href="/locations/etobicoke"
                  className="text-white/80 underline underline-offset-4 hover:text-white"
                >
                  Etobicoke
                </Link>
                <Link
                  href="/locations/markham"
                  className="text-white/80 underline underline-offset-4 hover:text-white"
                >
                  Markham
                </Link>
                <Link
                  href="/locations/ontario"
                  className="text-white/80 underline underline-offset-4 hover:text-white"
                >
                  Ontario coverage hub
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Scarborough FAQs</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            Quick answers for buyers evaluating business internet in Scarborough.
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