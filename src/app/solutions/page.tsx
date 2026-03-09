// src/app/solutions/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StickyModuleNav from "@/components/StickyModuleNav";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/solutions`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Business Connectivity Solutions by Business Type | Orbitlink",
  description:
    "Explore Orbitlink business connectivity solutions for offices, clinics, warehouses, multi-site organizations, and commercial buildings across Ontario.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Connectivity Solutions by Business Type | Orbitlink",
    description:
      "Business fibre, dedicated internet, managed Wi-Fi, voice, continuity, and infrastructure solutions tailored to real business environments across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business connectivity solutions by business type",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Connectivity Solutions by Business Type | Orbitlink",
    description:
      "Solutions for offices, clinics, warehouses, multi-site organizations, and commercial buildings across Ontario.",
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

const SOLUTIONS = [
  {
    id: "offices",
    name: "Professional Offices",
    tone: "blue" as const,
    tagline:
      "Business internet, managed Wi-Fi, voice, and cleaner support for offices that need a more professional provider experience.",
    purpose:
      "Built for offices that need reliable connectivity, simple onboarding, clear communication, and a better day-to-day service relationship.",
    idealFor: [
      "Law firms and accounting offices",
      "Professional services firms",
      "Administrative offices",
      "Executive suites and shared office environments",
    ],
    deliverables: [
      "Business fibre internet or dedicated access",
      "Managed Wi-Fi and LAN support",
      "Business voice and call routing",
      "Structured intake and address review",
    ],
    bestFit:
      "Best when the priority is reliable office connectivity, cleaner onboarding, and a provider that feels organized and business-ready.",
  },
  {
    id: "clinics",
    name: "Clinics & Service Businesses",
    tone: "emerald" as const,
    tagline:
      "Connectivity, guest Wi-Fi, voice, and continuity planning for customer-facing environments that depend on stable daily operations.",
    purpose:
      "Designed for businesses where internet downtime, poor Wi-Fi, or unclear provider support creates real client-facing disruption.",
    idealFor: [
      "Clinics and wellness practices",
      "Dental and health-adjacent offices",
      "Retail-service environments",
      "Appointment-based businesses",
    ],
    deliverables: [
      "Primary business internet",
      "Guest Wi-Fi and internal segmentation",
      "Voice and front-desk routing",
      "Backup connectivity planning",
    ],
    bestFit:
      "Best when the site depends on daily uptime, customer-facing service quality, and a clear support path.",
  },
  {
    id: "warehouses",
    name: "Warehouses & Industrial Sites",
    tone: "gold" as const,
    tagline:
      "Dedicated internet, continuity, managed networking, and site coordination for industrial and operational environments.",
    purpose:
      "Built for environments where uptime, coordination, resilience, and site practicality matter more than generic telecom packaging.",
    idealFor: [
      "Warehouses and logistics sites",
      "Industrial and light manufacturing environments",
      "Operational facilities",
      "Sites with continuity requirements",
    ],
    deliverables: [
      "Business fibre or dedicated internet",
      "LTE / 5G backup connectivity",
      "Managed LAN and Wi-Fi where needed",
      "Structured commercial review and site qualification",
    ],
    bestFit:
      "Best when the priority is operational reliability, stronger resilience, and a commercial path that understands site realities.",
  },
  {
    id: "multisite",
    name: "Multi-Site Businesses",
    tone: "blue" as const,
    tagline:
      "A more organized connectivity path for businesses that need consistency across more than one office, branch, or operating location.",
    purpose:
      "Created for organizations that want cleaner coordination, standardized service paths, and a provider experience that scales more predictably.",
    idealFor: [
      "Growing regional businesses",
      "Operators with multiple offices or branches",
      "Service businesses with expansion needs",
      "Organizations needing standardized connectivity planning",
    ],
    deliverables: [
      "Primary internet by location",
      "Managed network support options",
      "Voice and continuity coordination",
      "Commercial intake based on site-by-site fit",
    ],
    bestFit:
      "Best when the business wants a clearer way to qualify, review, and scale service across multiple locations.",
  },
  {
    id: "buildings",
    name: "Commercial Buildings & Property Stakeholders",
    tone: "emerald" as const,
    tagline:
      "Address-based review, cleaner onboarding, and a more structured telecom posture for building-level commercial environments.",
    purpose:
      "Designed for commercial property conversations where clarity, documentation, service fit, and operating discipline matter.",
    idealFor: [
      "Commercial landlords and property groups",
      "Managed office buildings",
      "Mixed commercial environments",
      "Stakeholders reviewing business internet options for tenants or managed spaces",
    ],
    deliverables: [
      "Address-qualified service review",
      "Business internet and managed network options",
      "Structured onboarding language",
      "Trust and compliance support path",
    ],
    bestFit:
      "Best when the priority is building-level review, professional stakeholder communication, and a more credible provider posture.",
  },
] as const;

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

function SolutionCard({ s }: { s: (typeof SOLUTIONS)[number] }) {
  const style = toneStyles(s.tone);

  return (
    <section
      id={s.id}
      className={[
        "scroll-mt-[168px] md:scroll-mt-[184px]",
        "rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7",
        "transition hover:border-white/15",
        style.glow,
      ].join(" ")}
    >
      <div className="relative">
        <div className={`h-px w-full bg-gradient-to-r ${style.line}`} />

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1",
                "text-[11px] tracking-[0.22em]",
                style.chip,
              ].join(" ")}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              SOLUTION TYPE
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">{s.name}</h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              {s.tagline}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">BEST FIT</div>
            <div className="mt-1 text-sm text-white/80">{s.bestFit}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">BUSINESS NEED</div>
          <p className="mt-3 text-sm leading-6 text-white/65">{s.purpose}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">COMMON FIT</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {s.idealFor.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">TYPICAL SERVICES</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {s.deliverables.map((x) => (
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
              Submit your address, business need, and target timeline to start structured
              qualification and availability review.
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`/contact#intake?source=solutions&solution=${encodeURIComponent(s.name)}`}
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability & Request Pricing
            </a>
            <a
              href="/services"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              View Services
            </a>
            <a
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Trust & Compliance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const modules = SOLUTIONS.map((s) => ({ id: s.id, name: s.name, tone: s.tone }));

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
        name: "Business Connectivity Solutions by Business Type",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Thing", name: "Business connectivity solutions for Ontario organizations" },
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
        "@type": "OfferCatalog",
        "@id": `${PAGE_URL}#catalog`,
        name: "Orbitlink Solutions by Business Type",
        url: PAGE_URL,
        provider: { "@id": `${SITE_URL}/#org` },
        itemListElement: SOLUTIONS.map((s) => ({
          "@type": "Offer",
          name: s.name,
          url: `${PAGE_URL}#${s.id}`,
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.tagline,
            provider: { "@id": `${SITE_URL}/#org` },
            areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
            serviceType: "Business Connectivity Solution",
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How should I use this page?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Start with the type of business environment that best matches your site, then review common fit, typical services, and the next step for qualification.",
            },
          },
          {
            "@type": "Question",
            name: "Do you review availability by address?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes. Orbitlink reviews serviceability by location, business need, and operating requirements before confirming the next commercial step.",
            },
          },
          {
            "@type": "Question",
            name: "What should I include in a request?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Include the site location, business need, target go-live date, and any important requirements such as managed Wi-Fi, voice, continuity, static IPs, or multi-site scope.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="SOLUTIONS"
      title="Business connectivity solutions by business type"
      subtitle="A clearer way to match Orbitlink services to real business environments across Ontario, from offices and clinics to warehouses, multi-site organizations, and commercial buildings."
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
              Buyer-focused solutions surface
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              Choose the solution that matches your business environment
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              This page is designed to help buyers move faster from “What is right for my site?”
              to a practical next step. Start with the type of business environment, review the
              common fit, then move into structured intake for availability and pricing.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="BUYER MODE" value="Choose • Compare • Request" />
              <MetricPill label="PAGE PURPOSE" value="Solutions by business type" />
              <MetricPill label="NEXT STEP" value="Availability and pricing review" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <SectionEyebrow>HOW BUSINESSES START</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                A cleaner path from business need to service fit
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Each solution is designed to answer four buyer questions quickly: what kind of
                business it fits, what services usually matter, what the business need looks like,
                and what to do next.
              </p>

              <div className="mt-5 grid gap-3">
                <BuyerStep
                  step="1"
                  title="Choose your business type"
                  desc="Start with the environment that best matches the site, team, or operating model."
                />
                <BuyerStep
                  step="2"
                  title="Review service fit"
                  desc="See the typical services, common business need, and commercial fit before enquiring."
                />
                <BuyerStep
                  step="3"
                  title="Move into intake"
                  desc="Submit one clear request tied to the address, timeline, and operating requirements."
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
            <SectionEyebrow>SOLUTIONS BY BUSINESS NEED</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Start with the environment, not the jargon
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Most buyers do not begin by asking for a product architecture. They begin with a
              business problem: office connectivity, clinic uptime, warehouse resilience, multi-site
              coordination, or building-level service review. This page is built around that reality.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Better fit • Less confusion</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FitCard
            title="Professional offices"
            body="Best when the priority is reliable business internet, managed Wi-Fi, voice, and cleaner provider support."
          />
          <FitCard
            title="Clinics and service businesses"
            body="Best when uptime, guest Wi-Fi, front-desk calling, and day-to-day dependability matter."
          />
          <FitCard
            title="Warehouses and industrial sites"
            body="Best when resilience, continuity, operational coordination, and stronger commercial review matter."
          />
          <FitCard
            title="Multi-site and building-led environments"
            body="Best when the business needs site-by-site consistency, building review, and a more organized commercial path."
          />
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:gap-5">
        {SOLUTIONS.map((s) => (
          <SolutionCard key={s.id} s={s} />
        ))}
      </div>

      <div id="solutions-bottom-sentinel" className="h-px w-full" />

      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionEyebrow>WHY THIS APPROACH WORKS</SectionEyebrow>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
              Buyers usually convert faster when the site matches how they actually think: by site
              type, operating need, and business context. Orbitlink uses that structure to make the
              next commercial step clearer.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">Business-first • Human-readable</div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact#intake?source=solutions_footer"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability & Request Pricing
          </a>
          <a
            href="/services"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            View Services
          </a>
          <a
            href="/locations"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            View Locations
          </a>
        </div>
      </div>
    </PageShell>
  );
}