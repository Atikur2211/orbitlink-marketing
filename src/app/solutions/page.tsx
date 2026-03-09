// src/app/solutions/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StickyModuleNav from "@/components/StickyModuleNav";
import { MODULE_SPECS } from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/solutions`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Business Fibre & Network Solutions",
  description:
    "Business fibre internet, dedicated internet access, managed network infrastructure, voice, continuity, and trust-led service modules for Ontario organizations.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Fibre & Network Solutions · Orbitlink",
    description:
      "Business connectivity and network solutions delivered with structured onboarding, disciplined operations, and a premium buyer experience.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Business Fibre & Network Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre & Network Solutions · Orbitlink",
    description:
      "Business fibre, dedicated internet, managed networks, and trust-led service modules across Ontario.",
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

function toneStyles(tone: "blue" | "gold" | "emerald") {
  if (tone === "blue")
    return {
      chip: "text-blue-200 bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/15",
      dot: "bg-blue-400",
      line: "from-blue-500/0 via-blue-400/35 to-blue-500/0",
      glow:
        "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_22px_70px_rgba(59,130,246,0.08)]",
    };

  if (tone === "emerald")
    return {
      chip: "text-emerald-200 bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-500/15",
      dot: "bg-emerald-400",
      line: "from-emerald-500/0 via-emerald-400/30 to-emerald-500/0",
      glow:
        "hover:shadow-[0_0_0_1px_rgba(16,185,129,0.16),0_22px_70px_rgba(16,185,129,0.08)]",
    };

  return {
    chip: "text-[#FDE68A] bg-[#FACC15]/10 border-[#FACC15]/25 hover:bg-[#FACC15]/15",
    dot: "bg-[#FACC15]",
    line: "from-[#FACC15]/0 via-[#FACC15]/35 to-[#FACC15]/0",
    glow:
      "hover:shadow-[0_0_0_1px_rgba(250,204,21,0.16),0_22px_70px_rgba(250,204,21,0.08)]",
  };
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
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>;
}

function BuyerStep({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
    </div>
  );
}

function FitCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function SpecCard({ m }: { m: (typeof MODULE_SPECS)[number] }) {
  const s = toneStyles(m.tone);

  return (
    <section
      id={m.id}
      className={[
        "scroll-mt-[168px] md:scroll-mt-[184px]",
        "rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7",
        "transition hover:border-white/15",
        s.glow,
      ].join(" ")}
    >
      <div className="relative">
        <div className={`h-px w-full bg-gradient-to-r ${s.line}`} />

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1",
                "text-[11px] tracking-[0.22em]",
                s.chip,
              ].join(" ")}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              SERVICE MODULE
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">{m.name}</h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              {m.tagline}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">ONBOARDING</div>
            <div className="mt-1 text-sm text-white/80">{m.onboarding}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">PURPOSE</div>
          <p className="mt-3 text-sm leading-6 text-white/65">{m.purpose}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">IDEAL FOR</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {m.idealFor.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">DELIVERABLES</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {m.deliverables.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-[11px] tracking-[0.22em] text-white/55">NEXT STEP</div>
            <div className="mt-2 text-sm text-white/70">
              Submit your location, service need, and target go-live date to start structured
              qualification.
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`/contact#intake?intent=access&source=solutions&module=${encodeURIComponent(
                m.name
              )}`}
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Access
            </a>
            <a
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Trust & Compliance
            </a>
            <a
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Network Posture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const modules = MODULE_SPECS.map((m) => ({ id: m.id, name: m.name, tone: m.tone }));

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Orbitlink",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "CA",
          addressRegion: "ON",
          addressLocality: "Mississauga",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@orbitlink.ca",
            areaServed: "CA-ON",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@orbitlink.ca",
            areaServed: "CA-ON",
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Orbitlink",
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Business Fibre & Network Solutions",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Thing", name: "Business fibre and network infrastructure services" },
        inLanguage: "en-CA",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Solutions", item: PAGE_URL },
        ],
      },
      {
        "@type": "TelecomService",
        "@id": `${PAGE_URL}#telecom`,
        name: "Orbitlink Business Connectivity & Network Services",
        provider: { "@id": `${SITE_URL}/#org` },
        serviceType: [
          "Business Internet",
          "Fibre Connectivity",
          "Managed Network Services",
          "Operational Escalation and Support",
          "Compliance-first Delivery Posture",
        ],
        areaServed: [
          { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          { "@type": "City", name: "Mississauga" },
        ],
        audience: { "@type": "Audience", audienceType: "Business" },
        termsOfService: `${SITE_URL}/legal/terms`,
      },
      {
        "@type": "OfferCatalog",
        "@id": `${PAGE_URL}#catalog`,
        name: "Orbitlink Service Modules",
        url: PAGE_URL,
        provider: { "@id": `${SITE_URL}/#org` },
        itemListElement: MODULE_SPECS.map((m) => ({
          "@type": "Offer",
          name: m.name,
          url: `${PAGE_URL}#${m.id}`,
          itemOffered: {
            "@type": "Service",
            name: m.name,
            description: m.tagline,
            provider: { "@id": `${SITE_URL}/#org` },
            areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
            serviceType: "Network Service Module",
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#list`,
        name: "Orbitlink Solutions List",
        url: PAGE_URL,
        itemListElement: MODULE_SPECS.map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: m.name,
          url: `${PAGE_URL}#${m.id}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How does onboarding work?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink introduces services through controlled onboarding windows. Requests are qualified by location, scope, and readiness, and commitments are confirmed only when supportable.",
            },
          },
          {
            "@type": "Question",
            name: "Do you publish broad coverage or performance claims?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink avoids broad availability and performance overclaims. Public statements remain conservative and update only when milestones are confirmed.",
            },
          },
          {
            "@type": "Question",
            name: "What should I include in a request?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Include the site location, the service module you need, the target go-live date, and any constraints such as handoff type, static IP needs, continuity requirements, or SLA expectations.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="SOLUTIONS"
      title="Business connectivity modules"
      subtitle="Each service is presented as a clear business module with structured onboarding, disciplined delivery, and a premium operator-grade posture."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[32rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Structured solution surface
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              Choose the service path that matches the business need
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              This solutions page is designed to make Orbitlink easier to understand and easier to
              buy. Start with the primary service requirement, review fit and deliverables, then
              move into a structured intake path with clearer expectations.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="BUYER MODE" value="Choose • Compare • Request" />
              <MetricPill label="DELIVERY STYLE" value="Structured and controlled" />
              <MetricPill label="TRUST SIGNAL" value="Clearer than generic telecom" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <SectionEyebrow>BUYING JOURNEY</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                A cleaner path from service interest to onboarding
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Each module is meant to answer four buyer questions quickly: what it is, who it
                fits, what it includes, and what to do next.
              </p>

              <div className="mt-5 grid gap-3">
                <BuyerStep
                  step="1"
                  title="Choose the module"
                  desc="Start with internet, voice, smart connectivity, trust review, or another core need."
                />
                <BuyerStep
                  step="2"
                  title="Review fit"
                  desc="Check purpose, ideal environments, and deliverables before starting a conversation."
                />
                <BuyerStep
                  step="3"
                  title="Move into intake"
                  desc="Submit one clear request tied to the site, timeline, and operational requirements."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="solutions-sentinel" className="h-px w-full" />

      <StickyModuleNav
        modules={modules}
        watchOffsetTop={72}
        watchId="solutions-sentinel"
        bottomWatchId="solutions-bottom-sentinel"
      />

      <section className="mt-6 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>HOW TO USE THIS PAGE</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Start with the service that matters most
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Most buyers do not need every service at once. Start with the main requirement, such
              as business fibre, dedicated internet, managed networking, voice, continuity, or
              trust review. Additional layers can be added once the primary scope is clear.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Better fit • Cleaner buying motion</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FitCard
            title="Business Fibre"
            body="Best when the priority is strong business connectivity, clean onboarding, and value."
          />
          <FitCard
            title="Dedicated Internet"
            body="Best when the site requires a more deterministic delivery posture and critical-path alignment."
          />
          <FitCard
            title="Managed Network"
            body="Best when internal LAN, Wi-Fi, segmentation, or local operational control matters."
          />
          <FitCard
            title="Trust & Review"
            body="Best when a buyer or reviewer needs clearer disclosure, governance, and verification posture."
          />
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:gap-5">
        {MODULE_SPECS.map((m) => (
          <SpecCard key={m.id} m={m} />
        ))}
      </div>

      <div id="solutions-bottom-sentinel" className="h-px w-full" />

      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionEyebrow>INTEGRITY</SectionEyebrow>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
              Services are introduced through controlled onboarding windows. Public statements
              remain conservative until milestones are verified and the delivery posture is clear.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">Controlled rollout • Evidence-first</div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact#intake?intent=access&source=solutions_footer"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Request Access
          </a>
          <a
            href="/trust"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Trust & Compliance
          </a>
          <a
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Network Posture
          </a>
        </div>
      </div>
    </PageShell>
  );
}