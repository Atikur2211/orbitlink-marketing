// src/app/services/static-ip-routing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/static-ip-routing";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Static IP Routing | Orbitlink™ Business Network Services",
  description:
    "Orbitlink static IP routing for business VPNs, hosted services, fixed endpoints, and predictable policy-based access. Structured onboarding, clear delivery posture, and feasibility-led assignment in Ontario.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Static IP Routing | Orbitlink™",
    description:
      "Business static IP routing with disciplined onboarding, feasibility-led assignment, and operator-grade delivery posture.",
    url: PAGE_URL,
    siteName: "Orbitlink",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Static IP Routing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Static IP Routing | Orbitlink™",
    description:
      "Business static IP options for VPNs, fixed endpoints, and routing clarity with operator-grade delivery posture.",
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const CAPABILITIES = [
  {
    title: "Static endpoint support",
    desc: "Supports business use cases that require fixed addressing for remote access, policy control, and predictable reachability.",
  },
  {
    title: "VPN-ready posture",
    desc: "A cleaner fit for site-to-site VPN coordination, firewall policy alignment, and operational access requirements.",
  },
  {
    title: "Hosted service alignment",
    desc: "Useful where business systems, applications, gateways, or externally reachable services depend on stable address assignment.",
  },
  {
    title: "Documented delivery",
    desc: "Addressing is introduced with clearer scoping, feasibility review, and service-aligned expectation setting.",
  },
] as const;

const ROUTING_MODULES = [
  {
    eyebrow: "MODULE 01",
    title: "Addressing requirements review",
    copy:
      "Start by confirming whether the client needs a single static IP, a small assignment posture, or a routing design aligned to access policy and operational use.",
  },
  {
    eyebrow: "MODULE 02",
    title: "Feasibility & access alignment",
    copy:
      "Static IP posture depends on the underlying service, site design, and delivery scope. It is reviewed as part of the broader commercial and technical intake.",
  },
  {
    eyebrow: "MODULE 03",
    title: "Implementation & handoff",
    copy:
      "Once confirmed, routing expectations, endpoint requirements, and operational handoff are documented to keep deployment cleaner and easier to manage.",
  },
] as const;

const ASSURANCE_ITEMS = [
  "VPN-ready posture",
  "Feasibility-led assignment",
  "Fixed endpoint support",
  "Operator-grade delivery",
  "Ontario business focus",
] as const;

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Orbitlink",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        brand: { "@type": "Brand", name: "Orbitlink" },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Static IP Routing",
        serviceType: "Business Static IP and Routing Services",
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          { "@type": "City", name: "Mississauga" },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        url: PAGE_URL,
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
            name: "Static IP Routing",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Orbitlink offer static IP options?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, where feasible. Static IP availability depends on the underlying access service, site requirements, and delivery scope.",
            },
          },
          {
            "@type": "Question",
            name: "Who is this service for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This is designed for business use cases such as VPN connectivity, hosted services, fixed endpoints, remote access policy, and predictable routing requirements.",
            },
          },
          {
            "@type": "Question",
            name: "Can static IP routing be paired with other Orbitlink services?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Static IP requirements can be aligned with business fibre, dedicated internet access, managed network services, and continuity architecture where appropriate.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Operator Layer
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Static IP Routing
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-lg">
                Static addressing supports site-to-site VPNs, hosted services,
                fixed endpoints, remote access controls, and more predictable
                policy-based network operations. Orbitlink provides static IP
                options where feasible through a disciplined, service-aligned
                delivery posture.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {ASSURANCE_ITEMS.map((item) => (
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
                  Request Static IP Options
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
                <div className="text-[11px] tracking-[0.22em] text-white/55">
                  ROUTING POSTURE
                </div>
                <div className="mt-3 text-lg font-semibold text-white">
                  Stable addressing for business operations
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Static IP assignment is handled as part of a broader access and
                  routing review, helping reduce ambiguity before implementation.
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    1. Confirm use case and scope
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    2. Review service feasibility
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    3. Enter structured delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/50">
                USE CASE
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Fixed access and policy control
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Designed for businesses that need stable addressing for secure
                connectivity and operational consistency.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/50">
                DELIVERY POSTURE
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Feasibility before assignment
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Availability depends on access type, site design, and service
                scope rather than generic public assumptions.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/50">
                ENTERPRISE SIGNAL
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Routing with cleaner expectations
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Better fit for IT teams, firewall policy planning, remote
                connectivity, and controlled service handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">
                CAPABILITIES
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                Addressing designed for business infrastructure needs
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Static IP routing should fit cleanly into the wider operating
                model. The objective is a better alignment between business
                access, policy requirements, security posture, and long-term
                manageability.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">
                MODE
              </div>
              <div className="mt-1 text-sm text-white/80">
                Clarity-first • Feasibility-led
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {CAPABILITIES.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-black/20 p-6"
              >
                <div className="text-lg font-semibold text-white">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] tracking-[0.28em] text-white/45">
                ROUTING MODULES
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
                A cleaner path to static addressing
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
                Begin with the operational use case, confirm delivery
                feasibility, then document the routing posture for a cleaner
                implementation path.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/50">
                DELIVERY
              </div>
              <div className="mt-1 text-sm text-white/80">
                Structured review • Predictable handoff
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ROUTING_MODULES.map((item) => (
              <div
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="text-[11px] tracking-[0.24em] text-white/45">
                  {item.eyebrow}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[11px] tracking-[0.28em] text-white/45">
                NEXT STEP
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Add static routing the right way
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                If you are evaluating static IP options, define the access
                service, intended use case, firewall or VPN requirements, hosted
                service expectations, and whether the site also needs managed
                LAN, DIA, or continuity architecture.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                COMMERCIAL MODE
              </div>
              <div className="mt-1 text-sm text-white/80">
                Scope-led review • Cleaner implementation
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Static IP Options
            </Link>
            <Link
              href="/services/dedicated-internet-access"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Dedicated Internet
            </Link>
            <Link
              href="/services/business-fibre-internet"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Business Fibre
            </Link>
            <Link
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              Trust & Delivery Posture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}