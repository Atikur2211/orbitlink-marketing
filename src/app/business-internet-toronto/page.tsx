import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/business-internet-toronto";
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
  title: "Business Internet Toronto | Orbitlink",
  description:
    "Business internet in Toronto for offices, clinics, and commercial spaces. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity. Check availability by address.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Internet Toronto | Orbitlink",
    description:
      "Business internet in Toronto for offices, clinics, studios, and commercial spaces. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity with address-based availability checks.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Business Internet Toronto | Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Internet Toronto | Orbitlink",
    description:
      "Business internet in Toronto for offices, clinics, and commercial spaces.",
    images: [TWITTER_IMAGE_URL],
  },
};

const FAQ = [
  {
    q: "Do you provide business internet in Toronto?",
    a: "Yes. Orbitlink supports business internet opportunities across Toronto for offices, clinics, commercial spaces, studios, and performance-sensitive environments. Availability depends on building infrastructure and upstream serviceability, so it is confirmed by address before moving forward.",
  },
  {
    q: "What type of business internet is available in Toronto?",
    a: "Depending on the site, Orbitlink may support business fibre internet, dedicated internet, managed LAN and Wi-Fi, backup internet, cloud voice, and static IP routing.",
  },
  {
    q: "Do you support downtown Toronto office buildings?",
    a: "Yes. Toronto includes dense office and multi-tenant commercial environments where access and serviceability can vary significantly by site. Orbitlink checks building fit before the next step is recommended.",
  },
  {
    q: "What is the difference between business fibre and dedicated internet?",
    a: "Business fibre is often the right fit when a site needs strong performance, good value, and stable daily operations. Dedicated internet is better for critical environments that need stronger uptime and more predictable performance.",
  },
  {
    q: "Can you manage LAN and Wi-Fi in Toronto offices and mixed-use environments?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi, including segmentation, guest access, device separation, and cleaner coverage planning.",
  },
  {
    q: "Do you offer backup internet options?",
    a: "Yes. Orbitlink can support LTE and 5G backup options for uptime-sensitive business environments, subject to site fit and feasibility.",
  },
] as const;

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
    desc: "Business internet for mixed-device teams, guest access, managed Wi-Fi, and more predictable day-to-day support.",
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
    desc: "Segmentation, stability, coverage planning, and stronger internal network support.",
    href: "/services/managed-lan-wifi",
  },
  {
    title: "LTE / 5G Backup",
    desc: "Backup internet for sites that need continuity during access disruptions.",
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
        name: "Business Internet Toronto | Orbitlink",
        description:
          "Business internet in Toronto for offices, clinics, and commercial spaces. Fibre, dedicated internet, managed Wi-Fi, and backup connectivity. Check availability by address.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
        },
        about: {
          "@type": "Thing",
          name: "Business internet in Toronto",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Business Internet Toronto", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
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

export default function BusinessInternetTorontoPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
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
            Toronto business internet landing page
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Business Internet for Toronto Businesses
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
              Orbitlink provides business internet in Toronto for offices, commercial
              buildings, clinics, studios, and performance-sensitive environments.
              Availability is checked by address so the right service setup can be matched
              to your location before moving forward.
            </p>

            <p className="mt-3 text-sm text-white/68">
              For many organizations, this becomes a more reliable business internet option
              in Toronto when stability, uptime, and day-to-day performance matter.
            </p>

            <div className="mt-4 max-w-3xl text-sm leading-6 text-white/62">
              Explore{" "}
              <Link
                href="/services/business-fibre-internet"
                className="underline underline-offset-4 hover:text-white"
              >
                business fibre internet
              </Link>
              ,{" "}
              <Link
                href="/services/dedicated-internet-access"
                className="underline underline-offset-4 hover:text-white"
              >
                dedicated internet access
              </Link>
              ,{" "}
              <Link
                href="/services/managed-lan-wifi"
                className="underline underline-offset-4 hover:text-white"
              >
                managed LAN & Wi-Fi
              </Link>
              , and{" "}
              <Link
                href="/services/lte-5g-continuity"
                className="underline underline-offset-4 hover:text-white"
              >
                LTE / 5G backup
              </Link>
              .
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Business internet Toronto",
                "Fibre & dedicated internet",
                "Office and commercial fit",
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

            <div className="mt-3 text-sm text-white/60">
              Availability varies by building. Submit your address to confirm options.
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="BEST FOR" value="Toronto business locations" />
              <MetricCard label="CHECKED BY" value="Address and building fit" />
              <MetricCard label="NEXT STEP" value="Availability and service direction" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <SectionEyebrow>WHY BUSINESSES SWITCH</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Cleaner performance for real Toronto operations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Businesses usually switch when internet instability starts affecting voice,
              cloud tools, internal systems, remote access, or multi-user workflows.
              The right Toronto business internet setup needs to fit both the building and
              the way the organization actually operates.
            </p>

            <div className="mt-6">
              <BulletList
                items={[
                  "Better fit for VoIP, cloud apps, and internal platforms",
                  "Stronger multi-user stability during business hours",
                  "Cleaner support for offices, clinics, and studio workflows",
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
              <SectionEyebrow>BUSINESS INTERNET IN TORONTO</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Business internet for Toronto offices and commercial environments
              </h2>

              <div className="mt-3 space-y-4 leading-relaxed text-white/70">
                <p>
                  Business internet in Toronto is not only about speed. It is about
                  supporting daily operations with stable connectivity for multiple users,
                  cloud applications, VoIP, internal systems, and customer-facing services.
                  The right setup depends on your building, infrastructure, and operational
                  requirements.
                </p>

                <p>
                  Toronto is one of the most competitive commercial internet markets in
                  Canada. Office towers, professional corridors, clinics, retail offices,
                  studios, and multi-tenant buildings can all have very different
                  infrastructure and serviceability conditions.
                </p>

                <p>
                  Orbitlink checks what is available by address instead of making blanket
                  claims. That makes it easier to recommend the right combination of
                  business fibre, dedicated internet, managed LAN and Wi-Fi, backup
                  connectivity, static IPs, and voice support where needed.
                </p>

                <p>
                  Businesses operating across multiple locations may also want to review{" "}
                  <Link
                    href="/business-fibre-internet-ontario"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    business fibre internet across Ontario
                  </Link>{" "}
                  as part of broader connectivity planning, procurement, and long-term
                  network standardization.
                </p>

                <p>
                  This makes Orbitlink a strong option for businesses looking for reliable
                  business internet in Toronto with a clearer deployment path and more
                  structured support.
                </p>

                <h3 className="pt-4 text-lg font-semibold tracking-tight text-white">
                  What business internet usually needs to support in Toronto
                </h3>

                <p>
                  Toronto business environments often depend on cloud applications, VoIP,
                  VPNs, cameras, guest Wi-Fi, payment systems, collaboration platforms,
                  booking systems, and operational networks running together. That makes
                  uptime, segmentation, and day-to-day consistency more important than a
                  simple speed claim.
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
                  This matters because Toronto business environments can vary sharply
                  between downtown towers, smaller mixed-use buildings, clinics, studios,
                  and commercial properties across the city.
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
              <SectionEyebrow>TYPICAL TORONTO FIT</SectionEyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Common Toronto business environments
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
                Business fibre vs dedicated internet in Toronto
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Business fibre is often the right fit when you need strong performance,
                good value, and stable day-to-day operations. Dedicated internet is
                better for critical environments where stronger uptime and more
                predictable performance matter. Learn more about{" "}
                <Link
                  href="/services/dedicated-internet-access"
                  className="underline underline-offset-4 text-white/85 hover:text-white"
                >
                  dedicated internet access
                </Link>{" "}
                and how it compares based on your site.
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
                    href="/locations/toronto"
                    className="underline underline-offset-4 text-white/85 hover:text-white"
                  >
                    View Toronto service area page
                  </Link>
                </div>

                <div>
                  <div className="text-white/60">Service model</div>
                  <div className="text-white/85">
                    Business connectivity delivered through structured onboarding,
                    availability validation, and clearly defined next steps.
                  </div>
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
                  multi-tenant, performance-sensitive, or uptime-sensitive, include those
                  details so the right setup can be recommended.
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
            Clear answers for Toronto business buyers, with availability checked by site
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
    </div>
  );
}