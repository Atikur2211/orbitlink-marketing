// src/app/locations/whitby/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/locations/whitby";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BUSINESS = {
  name: "Orbitlink™",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
} as const;

export const metadata: Metadata = {
  title: "Business Fibre Internet Whitby | Orbitlink",
  description:
    "Business internet in Whitby for offices, warehouses, and commercial sites. Fibre, dedicated internet, and address-based availability checks.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Business Fibre Internet Whitby | Orbitlink",
    description:
      "Business internet in Whitby for offices, warehouses, and commercial sites. Fibre, dedicated internet, and address-based availability checks.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet in Whitby",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet Whitby | Orbitlink",
    description:
      "Business internet in Whitby for offices, warehouses, and commercial sites.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

const FAQ = [
  {
    q: "Do you service my address in Whitby?",
    a: "Availability depends on building infrastructure and upstream feasibility. Orbitlink confirms serviceability by address and outlines any additional access or build requirements before activation.",
  },
  {
    q: "Is Whitby a strong market for business fibre internet?",
    a: "Yes. Whitby is a growing Durham-region business market with office, commercial, and expansion-oriented demand where stable connectivity and structured delivery matter.",
  },
  {
    q: "Do you offer Dedicated Internet Access in Whitby?",
    a: "Yes. Dedicated Internet Access may be available for performance-critical environments that require stronger uptime, more predictable performance, and cleaner enterprise handoff.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Static IP options may be available depending on access type, design, and location. Options are confirmed during qualification.",
  },
  {
    q: "Can you manage LAN and enterprise Wi-Fi?",
    a: "Yes. Orbitlink supports managed LAN and business Wi-Fi, including segmentation, guest access, and coverage planning aligned with business operational needs.",
  },
  {
    q: "Do you offer continuity and failover options?",
    a: "Yes. Orbitlink can support LTE and 5G continuity options for sites that require resilience during access disruption, subject to site conditions and feasibility.",
  },
  {
    q: "How long does installation take in Whitby?",
    a: "Timelines vary based on building readiness, landlord coordination, access method, and upstream delivery conditions. Orbitlink uses structured onboarding so expectations are defined before activation.",
  },
  {
    q: "Are you a reseller?",
    a: "Orbitlink is the customer-facing provider responsible for qualification, onboarding, documentation, and support experience. Some access products may be delivered through partner or reseller models and are identified accordingly.",
  },
] as const;

const serviceModules = [
  {
    t: "Business Fibre Internet",
    href: "/services/business-fibre-internet",
    d: "Primary internet for Whitby offices, commercial sites, and growth-stage operations.",
  },
  {
    t: "Dedicated Internet Access",
    href: "/services/dedicated-internet-access",
    d: "Stronger delivery posture for critical systems and uptime-sensitive environments.",
  },
  {
    t: "Managed LAN & Enterprise Wi-Fi",
    href: "/services/managed-lan-wifi",
    d: "Internal network support, segmentation, guest access, and coverage planning.",
  },
  {
    t: "LTE / 5G Continuity",
    href: "/services/lte-5g-continuity",
    d: "Backup architecture for resilience during access disruption or outage events.",
  },
  {
    t: "VoIP & Cloud Voice",
    href: "/services/voip-cloud-voice",
    d: "Business voice for teams that need routing, portability, and cleaner communications.",
  },
  {
    t: "Static IP Routing",
    href: "/services/static-ip-routing",
    d: "Fixed addressing for VPNs, remote access, firewalls, and hosted business systems.",
  },
] as const;

const signals = [
  {
    t: "Address-qualified",
    d: "Availability is reviewed by building and service fit before commitment.",
  },
  {
    t: "Business-first",
    d: "Built for real commercial environments, not generic consumer intake.",
  },
  {
    t: "Structured delivery",
    d: "Clear onboarding, scoped expectations, and documented activation posture.",
  },
  {
    t: "Durham-region fit",
    d: "Strong match for offices, commercial sites, and growth-oriented operations.",
  },
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": PAGE_URL,
        url: PAGE_URL,
        name: "Business Fibre Internet Whitby | Orbitlink",
        description:
          "Business internet in Whitby for offices, warehouses, and commercial sites. Fibre, dedicated internet, and address-based availability checks.",
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
            name: "Whitby",
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/45">{children}</div>;
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["rounded-[30px] border border-white/10 bg-white/[0.03]", className].join(" ")}>
      {children}
    </div>
  );
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
      <div className="text-[11px] tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

export default function WhitbyLocationPage() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-7 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <span className="text-sm tracking-wide text-white/65">Whitby service area</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="text-[11px] tracking-[0.30em] text-white/40">
                DURHAM REGION • FIBRE • DIA • MANAGED NETWORKING
              </div>

              <h1 className="mt-4 text-[2.5rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.75rem] lg:leading-[0.98]">
                Business fibre internet
                <span className="block text-white/62">in Whitby</span>
              </h1>

              <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/66 sm:text-lg">
                Business connectivity for Whitby offices, commercial sites, and expansion-ready
                environments. Availability is reviewed by address, building, and service fit before
                the next step is confirmed.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Availability by building",
                  "Business-first posture",
                  "Structured onboarding",
                  "Durham-region fit",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/66"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Check Availability
                </Link>
                <Link
                  href="/services/business-fibre-internet"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Business Fibre
                </Link>
                <Link
                  href="/services/dedicated-internet-access"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Dedicated Internet
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricPill label="BUYER FIT" value="Whitby business sites" />
                <MetricPill label="QUALIFICATION" value="Address and building based" />
                <MetricPill label="NEXT STEP" value="Availability review" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <Surface className="bg-white/[0.04] p-6">
                <SectionEyebrow>COMMERCIAL FIT</SectionEyebrow>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  Durham-region demand with cleaner qualification
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  Whitby is well-suited to business fibre, dedicated internet, managed networking,
                  and continuity for sites that need a more disciplined buying and delivery path.
                </p>

                <div className="mt-5 grid gap-3">
                  {signals.map((item) => (
                    <div
                      key={item.t}
                      className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                    >
                      <div className="text-sm font-medium text-white/90">{item.t}</div>
                      <p className="mt-2 text-sm leading-6 text-white/63">{item.d}</p>
                    </div>
                  ))}
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="space-y-6">
          <Surface className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionEyebrow>WHITBY MARKET</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Built for business growth and clean delivery
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-6 text-white/64 sm:text-[15px]">
                  <p>
                    Whitby is a strong Ontario market because it combines office demand, commercial
                    activity, expansion-ready sites, and broader Durham-region business movement.
                  </p>
                  <p>
                    Orbitlink’s posture is simple: confirm feasibility first, align the correct
                    service module, and move forward with documented delivery. That matters in
                    markets where buildings, access methods, and operating requirements vary
                    meaningfully from site to site.
                  </p>
                  <p>
                    For many Whitby businesses, the real requirement is not just access. It is the
                    right mix of business fibre or dedicated internet, internal network stability,
                    and continuity planning where uptime matters.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">RECOMMENDED PATH</div>
                  <div className="mt-3 text-base font-semibold text-white">
                    Start with address qualification
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/63">
                    If the environment is uptime-sensitive, request dedicated internet and
                    continuity review with the availability submission.
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href="/contact#intake"
                      className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                    >
                      Request Access
                    </Link>
                    <Link
                      href="/trust"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
                    >
                      Trust & Delivery Posture
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <SectionEyebrow>SERVICE MODULES</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Common service paths in Whitby
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">
              Choose the path that matches the operational environment, uptime requirement, and
              internal network posture.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {serviceModules.map((item) => (
                <Link
                  key={item.t}
                  href={item.href}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-medium text-white/90">{item.t}</div>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.d}</p>
                  <div className="mt-3 text-xs text-white/55">Open module →</div>
                </Link>
              ))}
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionEyebrow>NETWORK POSTURE</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Fibre when value matters. Dedicated internet when certainty matters.
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-6 text-white/64 sm:text-[15px]">
                  <p>
                    Business fibre is the right fit when you want strong value with disciplined
                    onboarding and a professional delivery experience.
                  </p>
                  <p>
                    Dedicated Internet Access is the stronger fit when predictable performance,
                    cleaner enterprise handoff, or more formal delivery posture is required for
                    critical systems, multi-site routing, or uptime-sensitive operations.
                  </p>
                  <p>
                    Managed LAN and enterprise Wi-Fi help Whitby sites stay stable through better
                    segmentation, cleaner coverage planning, and a support posture that feels
                    business-grade rather than consumer-grade.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">NEARBY MARKETS</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href="/locations/oshawa"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/10"
                    >
                      Oshawa
                    </Link>
                    <Link
                      href="/locations/toronto"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/10"
                    >
                      Toronto
                    </Link>
                    <Link
                      href="/locations/ontario"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/10"
                    >
                      Ontario hub
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Surface>

          <Surface className="p-6 sm:p-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Whitby FAQs</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">
              Clear answers for business buyers reviewing service availability in Whitby.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {FAQ.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-5"
                >
                  <h3 className="text-base font-semibold tracking-tight text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/63">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Browse Locations
              </Link>
            </div>
          </Surface>
        </div>
      </section>
    </div>
  );
}