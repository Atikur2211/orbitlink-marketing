import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/managed-lan-wifi";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Managed LAN & Enterprise Wi-Fi | Orbitlink™",
  description:
    "Managed LAN and enterprise Wi-Fi for business environments across Ontario. Segmentation, guest access, policy-ready network design, and operator-grade support for offices, commercial sites, and multi-tenant environments.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Managed LAN & Enterprise Wi-Fi | Orbitlink™",
    description:
      "Business-ready managed LAN and Wi-Fi with segmentation, guest networking, coverage planning, and operator-grade support posture.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Managed LAN & Enterprise Wi-Fi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed LAN & Enterprise Wi-Fi | Orbitlink™",
    description:
      "Enterprise-grade LAN and Wi-Fi design for offices, multi-tenant sites, and business operations across Ontario.",
    images: [TWITTER_IMAGE_URL],
  },
};

const CAPABILITIES = [
  {
    title: "Segmentation posture",
    body: "Separate staff, guest, IoT, voice, and sensitive systems with cleaner boundaries and reduced operational risk.",
  },
  {
    title: "Coverage planning",
    body: "Design Wi-Fi for actual business use, with practical attention to floor layout, density, interference, and roaming behavior.",
  },
  {
    title: "Business-ready handoff",
    body: "Documented network posture, cleaner support expectations, and a more professional operating model than unmanaged retail gear.",
  },
  {
    title: "Growth-ready architecture",
    body: "A structured LAN and Wi-Fi layer that can expand as teams, floors, devices, and service requirements grow.",
  },
];

const BUYER_SIGNALS = [
  "Multi-floor office environments",
  "Professional services firms",
  "Commercial suites and tenant spaces",
  "Guest + staff network separation",
  "Voice and device density planning",
  "Managed operational support posture",
];

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Managed LAN & Enterprise Wi-Fi",
        serviceType: "Managed Network Services",
        provider: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#org`,
          name: "Orbitlink",
          url: SITE_URL,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          { "@type": "City", name: "Mississauga" },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        url: PAGE_URL,
        description:
          "Managed LAN and enterprise Wi-Fi for business environments, including segmentation, guest networking, and operator-grade support posture.",
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
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Managed LAN & Enterprise Wi-Fi",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Managed Network
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Managed LAN & Enterprise Wi-Fi
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                A clean, managed network layer built for business environments that need more than
                consumer-grade equipment. Orbitlink designs LAN and Wi-Fi posture for offices,
                commercial suites, multi-tenant floors, and operational environments where
                segmentation, reliability, and support clarity matter.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Segmentation-ready",
                  "Guest + staff separation",
                  "Coverage planning",
                  "Business-grade support",
                  "Operator-grade posture",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Request Network Design
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Back to Services
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] tracking-[0.22em] text-white/55">BUYER FIT</div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Best for businesses that need clean internal network operations
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  This is usually the right layer for teams moving beyond unmanaged routers,
                  inconsistent Wi-Fi, flat networks, and unclear support responsibility.
                </p>

                <div className="mt-5 grid gap-2">
                  {BUYER_SIGNALS.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core value strip */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">OPERATIONAL VALUE</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                Stable internal networking is part of the customer experience
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Buyers often focus first on internet access, but internal LAN and Wi-Fi quality
                determines how teams actually experience that service. A stronger internal network
                reduces instability, support noise, and the “bad internet” feeling caused by poor
                local design.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">MODE</div>
              <div className="mt-1 text-sm text-white/80">Structured design • Clean handoff</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight text-white">{c.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/68">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Journey / sellable section */}
        <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">BUYING JOURNEY FIT</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Usually paired with primary access and continuity planning
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Managed LAN and Wi-Fi becomes most valuable when aligned with the broader service
                stack: primary connectivity, resilience posture, static addressing, and voice.
                This creates a cleaner operating environment and a much more premium client
                experience at the site edge.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL SIGNAL</div>
              <div className="mt-1 text-sm text-white/80">Higher-value site architecture</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/business-fibre-internet"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Business Fibre
            </Link>
            <Link
              href="/services/dedicated-internet-access"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Dedicated Internet Access
            </Link>
            <Link
              href="/services/lte-5g-continuity"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              LTE / 5G Continuity
            </Link>
            <Link
              href="/services/static-ip-routing"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Static IP Routing
            </Link>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-12 rounded-[30px] border border-white/10 bg-black/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">NEXT STEP</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Scope the site before devices become the problem
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                The strongest network outcomes happen when access, LAN, Wi-Fi, and support posture
                are aligned early. Submit your site details, device profile, and layout needs to
                begin structured onboarding.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Request Access
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Review Trust Posture
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}