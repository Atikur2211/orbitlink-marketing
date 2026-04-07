import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/business-internet-brampton";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

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
  title: "Business Internet Brampton | Orbitlink",
  description:
    "Business internet in Brampton for warehouses, industrial sites, logistics operations, and offices. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity. Check availability by address.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Internet Brampton | Orbitlink",
    description:
      "Business internet in Brampton for industrial, warehouse, logistics, and office environments. Check availability by address and find the right setup for your business.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet Brampton | Orbitlink",
    description:
      "Business internet in Brampton for industrial, warehouse, logistics, and office environments.",
  },
};

const FAQ = [
  {
    q: "Do you provide business internet in Brampton?",
    a: "Yes. Orbitlink supports business internet opportunities in Brampton for industrial, warehouse, logistics, and office environments. Availability depends on building infrastructure and upstream serviceability, so it is confirmed by address before moving forward.",
  },
  {
    q: "What type of business internet is available in Brampton?",
    a: "Depending on the site, Orbitlink may support business fibre internet, dedicated internet, managed LAN and Wi-Fi, backup internet, cloud voice, and static IP routing.",
  },
  {
    q: "Do you support warehouses and logistics sites in Brampton?",
    a: "Yes. Brampton has one of Ontario’s strongest industrial and logistics footprints. Sites with scanners, cameras, cloud platforms, VPNs, voice systems, and operational devices often need more than generic broadband.",
  },
  {
    q: "What is the difference between business fibre and dedicated internet?",
    a: "Business fibre is often the right fit when you need strong performance, good value, and stable day-to-day operations. Dedicated internet is better for critical environments that need stronger uptime and more predictable performance.",
  },
  {
    q: "Can you manage LAN and Wi-Fi in Brampton offices and warehouses?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi, including segmentation, guest access, operational device separation, and cleaner coverage planning.",
  },
  {
    q: "Do you offer backup internet options?",
    a: "Yes. Orbitlink can support LTE and 5G backup options for uptime-sensitive business environments, subject to site fit and feasibility.",
  },
] as const;

const fitCards = [
  {
    title: "Warehouses & logistics",
    desc: "Stable connectivity for scanners, shipping systems, cameras, voice platforms, cloud tools, and VPN-dependent workflows.",
  },
  {
    title: "Industrial facilities",
    desc: "Segmentation between office users, operational devices, guest access, and site systems for cleaner day-to-day operations.",
  },
  {
    title: "Business parks & offices",
    desc: "Business internet for collaboration, VoIP, cloud applications, and teams that depend on uptime.",
  },
  {
    title: "Performance-critical sites",
    desc: "Dedicated internet and backup design for organizations where internet access is tied closely to operations.",
  },
] as const;

const modules = [
  {
    title: "Business Fibre Internet",
    desc: "Reliable primary internet for warehouses, offices, and growing business sites.",
    href: "/services/business-fibre-internet",
  },
  {
    title: "Dedicated Internet Access",
    desc: "Stronger uptime and more predictable performance for critical operations.",
    href: "/services/dedicated-internet-access",
  },
  {
    title: "Managed LAN & Wi-Fi",
    desc: "Segmentation, stability, coverage planning, and better internal network support.",
    href: "/services/managed-lan-wifi",
  },
  {
    title: "LTE / 5G Backup",
    desc: "Backup internet for sites that need continuity during access disruptions.",
    href: "/services/lte-5g-continuity",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Business Internet Brampton", item: PAGE_URL },
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
      { "@type": "City", name: "Brampton" },
      { "@type": "AdministrativeArea", name: "Ontario" },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet Brampton",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Brampton" },
    serviceType: [
      "Business Internet",
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
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return [breadcrumb, localBusiness, telecomService, faqPage];
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.24em] text-white/50">{children}</div>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
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

export default function BusinessInternetBramptonPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_25%,transparent_75%,rgba(255,255,255,0.02))]" />
      </div>

      <TopNav />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
          <span className="text-sm tracking-wide text-white/65">
            Brampton business internet landing page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business Internet for Brampton Businesses
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Orbitlink provides business internet in Brampton for industrial,
              warehouse, logistics, and office environments. Availability is checked
              by address so the right service setup can be matched to your location
              before moving forward.
            </p>

            <p className="mt-3 text-sm text-white/68">
              For many organizations, this becomes a more reliable business internet
              option in Brampton when uptime, operational stability, and day-to-day performance matter.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Business internet Brampton",
                "Fibre & dedicated internet",
                "Industrial and warehouse fit",
                "Availability checked by address",
                "Clear next step for business buyers",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                >
                  {item}
                </span>
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
                href="/locations/brampton"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Brampton Service Area
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-3 text-sm text-white/60">
              Availability varies by building. Submit your address to confirm options.
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Brampton business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and service direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>WHY BUSINESSES SWITCH</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Cleaner performance for real Brampton operations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Businesses usually switch when internet instability starts affecting voice,
              cloud tools, internal systems, remote access, scanners, cameras, or
              multi-user workflows. The right Brampton business internet setup needs to fit
              both the building and the way the site actually operates.
            </p>

            <div className="mt-6">
              <BulletList
                items={[
                  "Better fit for cloud apps, VoIP, and internal platforms",
                  "Stronger multi-user stability during business hours",
                  "Cleaner support for warehouses, industrial sites, and offices",
                  "Better starting point for managed Wi-Fi and backup design",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>BUSINESS INTERNET IN BRAMPTON</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business internet for Brampton industrial, warehouse, and commercial environments
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Business internet in Brampton is not only about speed. It is about
                  supporting daily operations with stable connectivity for multiple users,
                  cloud platforms, scanners, cameras, voice systems, operational devices,
                  and customer-facing services.
                </p>

                <p>
                  Brampton is one of Ontario’s strongest industrial and logistics markets,
                  with warehouses, industrial facilities, business parks, and office
                  environments spread across major employment corridors.
                </p>

                <p>
                  Orbitlink checks what is available by address instead of making blanket
                  claims. That makes it easier to recommend the right combination of
                  business fibre, dedicated internet, managed LAN and Wi-Fi, backup
                  connectivity, static IPs, and voice support where needed.
                </p>

                <p>
                  This makes Orbitlink a strong option for businesses looking for reliable
                  business internet in Brampton with a clearer deployment path and more
                  structured support.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business internet usually needs to support in Brampton
                </h3>

                <p>
                  Industrial and logistics environments often depend on scanners, handheld
                  devices, cloud platforms, cameras, VPNs, voice systems, IoT devices,
                  office users, and internal operational networks running together. That
                  makes uptime, segmentation, and day-to-day consistency more important
                  than a simple speed claim.
                </p>

                <p>
                  Orbitlink also supports nearby business markets including{" "}
                  <Link
                    href="/locations/mississauga"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Mississauga
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/toronto"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Toronto
                  </Link>
                  , and{" "}
                  <Link
                    href="/locations/vaughan"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Vaughan
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>CHECK AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Check business internet availability for your location
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Availability depends on building infrastructure, upstream serviceability,
                  installation feasibility, and the type of business internet your site
                  actually needs. Orbitlink checks this by address before recommending the
                  next step.
                </p>

                <p>
                  This matters because Brampton business environments can vary sharply
                  between warehouse sites, industrial units, office spaces, and mixed-use
                  commercial properties.
                </p>

                <p>
                  A quick availability request helps confirm what is realistic for the site
                  instead of relying on generic assumptions.
                </p>

                <BulletList
                  items={[
                    "What is available at your building",
                    "Whether fibre or dedicated internet is the right fit",
                    "Installation feasibility and service path",
                    "Whether managed Wi-Fi, voice, or backup should be included",
                  ]}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>TYPICAL BRAMPTON FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Brampton business environments
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {fitCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="text-sm font-semibold text-white/90">{card.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {card.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE OPTIONS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Choose the right service for the site
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {modules.map((module) => (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white/90">{module.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">
                      {module.desc}
                    </div>
                    <div className="mt-3 text-xs text-white/60">Open service →</div>
                  </Link>
                ))}
              </div>

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business fibre vs dedicated internet in Brampton
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Business fibre is often the right fit when you need strong performance,
                good value, and stable day-to-day operations. Dedicated internet is
                better for critical environments where stronger uptime and more
                predictable performance matter.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>REQUEST AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                Check business internet availability
              </h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div>
                  <div className="text-white/60">Phone</div>
                  <a
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                    href={`tel:${BUSINESS.phoneE164}`}
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>

                <div>
                  <div className="text-white/60">Related page</div>
                  <Link
                    href="/locations/brampton"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Brampton service area page
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">Helpful details to include</div>
                  <div className="text-white/85">
                    Service address, fibre vs dedicated internet needs, static IP
                    requirements, managed Wi-Fi, and backup internet requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an address-based availability check. If your environment is
                  warehouse-heavy, industrial, or uptime-sensitive, include those details
                  so the right setup can be recommended.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
                  >
                    Check Business Internet Availability
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Trust & Compliance
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                RELATED MARKETS
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/mississauga"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Mississauga
                </Link>
                <Link
                  href="/locations/toronto"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Toronto
                </Link>
                <Link
                  href="/locations/vaughan"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Vaughan
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Brampton business internet FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers for Brampton business buyers, with availability checked by site
            before moving forward.
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
              href="/locations/brampton"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Brampton Service Area
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}