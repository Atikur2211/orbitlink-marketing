import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/business-internet-toronto";
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
} as const;

export const metadata: Metadata = {
  title: "Business Internet in Toronto, ON | Check Availability | Orbitlink",
  description:
    "Business internet in Toronto for offices, commercial buildings, clinics, studios, and performance-sensitive business environments. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity with availability checked by address.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Internet in Toronto, ON | Check Availability | Orbitlink",
    description:
      "Business internet in Toronto for offices, multi-tenant buildings, clinics, studios, and performance-sensitive business environments. Availability is checked by address.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet in Toronto, ON | Orbitlink",
    description:
      "Business internet in Toronto for offices, multi-tenant buildings, and performance-sensitive business environments.",
  },
};

const FAQ = [
  {
    q: "Do you provide business internet in Toronto?",
    a: "Yes. Orbitlink supports business internet opportunities across Toronto for offices, clinics, studios, professional firms, and performance-sensitive environments. Availability depends on building infrastructure and upstream serviceability, so it is checked by address before moving forward.",
  },
  {
    q: "What type of business internet is available in Toronto?",
    a: "Depending on the site, Orbitlink may provide business fibre internet, dedicated internet, managed LAN and Wi-Fi, backup internet, voice, and static IP routing.",
  },
  {
    q: "Do you support downtown Toronto office buildings?",
    a: "Yes. Toronto includes dense office and multi-tenant commercial environments where building access and serviceability can vary significantly. Orbitlink checks feasibility by address before the next step is confirmed.",
  },
  {
    q: "What is the difference between business fibre and dedicated internet?",
    a: "Business fibre is often the right fit when a site needs strong performance and good value. Dedicated internet is better for critical environments that need stronger uptime and more predictable performance.",
  },
  {
    q: "Can you manage LAN and Wi-Fi in Toronto offices and mixed-use environments?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi, including segmentation, guest access, device separation, and coverage planning.",
  },
  {
    q: "Do you offer backup internet options?",
    a: "Yes. Orbitlink can design LTE and 5G backup options for uptime-sensitive business environments, subject to feasibility and site constraints.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Business Internet Toronto", item: PAGE_URL },
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
      { "@type": "City", name: "Toronto" },
      { "@type": "AdministrativeArea", name: "Ontario" },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Business Internet in Toronto",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Toronto" },
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

const fitCards = [
  {
    title: "Downtown office towers",
    desc: "Connectivity for law firms, finance teams, agencies, and professional services in multi-tenant office environments.",
  },
  {
    title: "Clinics & studios",
    desc: "Stable internet for voice, booking systems, cloud apps, cameras, and uptime-sensitive daily workflows.",
  },
  {
    title: "Commercial buildings",
    desc: "Business internet for mixed-device teams, guest access, managed Wi-Fi, and predictable day-to-day support.",
  },
  {
    title: "Performance-critical sites",
    desc: "Dedicated internet and backup design for organizations where downtime directly affects operations and client service.",
  },
] as const;

const modules = [
  {
    title: "Business Fibre Internet",
    desc: "Reliable primary internet for offices, clinics, studios, and growing business locations.",
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.24em] text-white/50">{children}</div>;
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

export default function BusinessInternetTorontoPage() {
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

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
          <span className="text-sm tracking-wide text-white/65">
            Toronto business internet page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business internet in Toronto, ON
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Orbitlink provides business internet in Toronto for offices,
              commercial buildings, clinics, studios, professional firms, and
              performance-sensitive environments. Availability is checked by address
              so the right service setup can be matched to the site before moving forward.
            </p>

            <div className="mt-3 text-sm text-white/68">
              Built for downtown offices, multi-tenant buildings, clinics, studios, and uptime-sensitive teams.
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Business internet",
                "Fibre & dedicated internet",
                "Office and commercial fit",
                "Availability checked by address",
                "Clear next step",
              ].map((x) => (
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
                href="/locations/toronto"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Toronto Service Area
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Toronto business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and pricing direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>TORONTO MARKET FIT</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Built for Toronto’s office and multi-tenant environments
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Toronto is a premium commercial market where building constraints,
              serviceability, and business expectations can vary sharply by site.
              Orbitlink is positioned for organizations that want more than a generic
              ISP experience, including professional firms, clinics, studios,
              multi-tenant offices, and performance-sensitive operations.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {[
                "Availability checked per address",
                "Office and multi-tenant fit",
                "Managed LAN and Wi-Fi support",
                "Backup internet options",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>BUSINESS INTERNET IN TORONTO</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business internet for Toronto’s office and commercial environments
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Toronto is one of the most competitive commercial internet markets
                  in Canada. Business internet in this environment is not only about
                  speed. It is about stable operations, clean installation, the right
                  service model, and support that fits office towers, clinics,
                  studios, agencies, retail offices, and multi-tenant business environments.
                </p>

                <p>
                  Sites across downtown, midtown, financial districts, professional
                  corridors, and mixed commercial areas can have very different
                  building infrastructure and serviceability. Orbitlink checks what
                  is available per address instead of making blanket claims.
                </p>

                <p>
                  For many organizations, the right solution is not only internet
                  access. It may also include business fibre, dedicated internet,
                  managed LAN and Wi-Fi, backup internet, static IPs, or voice
                  support aligned to daily operations.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business internet usually needs to support in Toronto
                </h3>

                <p>
                  Toronto business environments often depend on cloud applications,
                  VoIP, VPNs, cameras, guest Wi-Fi, payment systems, collaboration
                  platforms, booking systems, and operational networks running
                  together. That makes access design, segmentation, and uptime more
                  important than a simple speed claim.
                </p>

                <p>
                  Orbitlink also supports nearby commercial markets including{" "}
                  <Link
                    href="/locations/etobicoke"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Etobicoke
                  </Link>
                  ,{" "}
                  <Link
                    href="/locations/scarborough"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    Scarborough
                  </Link>
                  , and{" "}
                  <Link
                    href="/locations/north-york"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    North York
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>TYPICAL TORONTO FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Toronto business environments
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {fitCards.map((x) => (
                  <div
                    key={x.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>SERVICE OPTIONS</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Choose the right service
              </h2>

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

              <h3 className="pt-6 text-lg font-semibold tracking-tight text-white">
                Business fibre vs dedicated internet in Toronto
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Business fibre is often the right fit when you need strong
                performance, value, and stable day-to-day operations. Dedicated
                internet is better for critical environments where stronger uptime
                and more predictable performance matter.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <SectionEyebrow>REQUEST AVAILABILITY</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">Check availability</h2>

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
                    href="/locations/toronto"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Toronto service area page
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">Helpful details</div>
                  <div className="text-white/85">
                    Service address, fibre vs dedicated internet, static IP needs,
                    managed Wi-Fi, and backup internet requirements.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold tracking-tight">Best next step</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Start with an availability request. If your environment is
                  performance-sensitive or multi-tenant, include operational details
                  so Orbitlink can guide the right setup.
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
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                RELATED MARKETS
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/locations/etobicoke"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Etobicoke
                </Link>
                <Link
                  href="/locations/scarborough"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  Scarborough
                </Link>
                <Link
                  href="/locations/north-york"
                  className="underline underline-offset-4 text-white/80 hover:text-white"
                >
                  North York
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
            Toronto business internet FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Clear answers for Toronto commercial search intent, with availability
            checked per site before moving forward.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
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
              href="/locations/toronto"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Toronto Service Area
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