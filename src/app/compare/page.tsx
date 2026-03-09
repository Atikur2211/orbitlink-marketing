// src/app/compare/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/compare";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Orbitlink vs Big Telco vs Typical Small ISP",
  description:
    "A clear business comparison of Orbitlink versus mass-market telecom and typical small providers across onboarding, trust, service clarity, escalation, and buyer experience.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Orbitlink vs Big Telco vs Typical Small ISP",
    description:
      "See how Orbitlink compares on business buying experience, trust posture, onboarding clarity, and service delivery structure.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Comparison Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitlink vs Big Telco vs Typical Small ISP",
    description:
      "A clear business comparison across trust, onboarding, service clarity, and operational posture.",
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

const SCORECARDS = [
  {
    title: "Clarity before purchase",
    orbitlink: "High",
    bigTelco: "Medium",
    smallIsp: "Low to medium",
    note: "Orbitlink is designed to explain fit, scope, and next step more clearly before commitment.",
  },
  {
    title: "Business-first onboarding",
    orbitlink: "High",
    bigTelco: "Medium",
    smallIsp: "Low",
    note: "Structured qualification and address-aware intake create a cleaner path into deployment.",
  },
  {
    title: "Trust and review posture",
    orbitlink: "High",
    bigTelco: "Medium",
    smallIsp: "Low",
    note: "Trust, disclosure, and escalation are visible early instead of being buried or implied.",
  },
  {
    title: "Service experience consistency",
    orbitlink: "High",
    bigTelco: "Medium",
    smallIsp: "Low to medium",
    note: "The site is designed to make different services feel like one business-ready system.",
  },
] as const;

const COMPARISON_ROWS = [
  {
    category: "Buying experience",
    orbitlink: "Clear, guided, and business-readable",
    bigTelco: "Large catalog with more navigation friction",
    smallIsp: "Often simpler, but less structured and less confidence-building",
  },
  {
    category: "Availability language",
    orbitlink: "Address-aware and scope-led",
    bigTelco: "Broad market language with later qualification",
    smallIsp: "Varies widely, often vague or overly simple",
  },
  {
    category: "Onboarding posture",
    orbitlink: "Structured from first request",
    bigTelco: "Process exists but may feel segmented",
    smallIsp: "Often reactive or founder-led",
  },
  {
    category: "Trust signal",
    orbitlink: "Visible trust, compliance, and disclosure posture",
    bigTelco: "Implicit brand trust, but less buyer-guided explanation",
    smallIsp: "Often limited trust surface",
  },
  {
    category: "Service explanation",
    orbitlink: "Business-fit language with clearer module roles",
    bigTelco: "Marketing-heavy and product-bundle oriented",
    smallIsp: "Usually basic and feature-led",
  },
  {
    category: "Escalation visibility",
    orbitlink: "Operational posture shown early",
    bigTelco: "Usually available later in the process",
    smallIsp: "Often depends on direct contact rather than systemized communication",
  },
  {
    category: "Premium feel",
    orbitlink: "High-end, controlled, and deliberate",
    bigTelco: "Polished, but mass-market",
    smallIsp: "Can feel local, but rarely enterprise-grade",
  },
  {
    category: "Buyer confidence",
    orbitlink: "Built to increase confidence before the first conversation",
    bigTelco: "Brand-scale confidence, but less tailored",
    smallIsp: "Personal and nimble, but often less structured",
  },
] as const;

const BEST_FOR = [
  {
    title: "Choose Orbitlink if you want...",
    items: [
      "A provider that feels easier to understand from the start",
      "A clearer path from service interest to qualified request",
      "A more premium business experience than generic telecom marketing",
      "Visible trust, onboarding, and escalation posture",
      "A provider surface that feels built for serious buyers",
    ],
  },
  {
    title: "Choose a big telco if you want...",
    items: [
      "A nationally familiar brand with broad existing footprint",
      "A large product catalog and mass-market availability",
      "A provider that may already serve multiple locations at scale",
      "Standardized process across many regions and account types",
      "A familiar name even if the buying path feels less tailored",
    ],
  },
  {
    title: "Choose a typical small ISP if you want...",
    items: [
      "A smaller local provider relationship",
      "A simpler and often more personal buying conversation",
      "A leaner provider for a straightforward requirement",
      "A regional specialist where trust is built directly with the operator",
      "A lightweight approach rather than a polished enterprise surface",
    ],
  },
] as const;

const ORBITLINK_ADVANTAGES = [
  {
    title: "More clarity before commitment",
    body:
      "Orbitlink is built to explain the service, fit, and next step without forcing buyers through vague or oversized telecom language.",
  },
  {
    title: "More premium business presentation",
    body:
      "The design, structure, and copy are intentionally built to feel calmer, more credible, and more enterprise-ready than most smaller providers.",
  },
  {
    title: "More visible operating discipline",
    body:
      "Trust, network posture, disclosure, and onboarding are treated as part of the product experience instead of hidden operational details.",
  },
  {
    title: "Better conversion path",
    body:
      "The site guides buyers toward a strong request rather than making them guess which service, page, or form matters most.",
  },
] as const;

const BUYER_PATH = [
  {
    step: "1",
    title: "Understand the service",
    body:
      "Orbitlink helps buyers understand what the service is and when it fits, without making them decode telecom jargon first.",
  },
  {
    step: "2",
    title: "Qualify the site",
    body:
      "Availability and delivery are reviewed against address, building context, and business scope before overpromising.",
  },
  {
    step: "3",
    title: "Move with confidence",
    body:
      "The buyer gets a clearer next step into qualification, review, or onboarding instead of a fragmented or generic handoff.",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>;
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-[32px] border border-white/10 bg-white/[0.045]",
        className,
      ].join(" ")}
    >
      {children}
    </section>
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
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

function BenefitCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function ScorePill({
  value,
}: {
  value: string;
}) {
  const cls =
    value === "High"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : value === "Medium"
      ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-200"
      : value === "Low"
      ? "border-white/10 bg-white/5 text-white/70"
      : value === "Low to medium"
      ? "border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FDE68A]"
      : "border-white/10 bg-white/5 text-white/70";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs ${cls}`}>
      {value}
    </span>
  );
}

export default function ComparePage() {
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
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Orbitlink Comparison",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Orbitlink",
          url: SITE_URL,
        },
        about: { "@id": `${SITE_URL}/#org` },
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
            name: "Compare",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why compare Orbitlink with big telcos and smaller providers?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "This page helps business buyers understand how Orbitlink differs in clarity, onboarding, trust posture, and overall buying experience.",
            },
          },
          {
            "@type": "Question",
            name: "Is Orbitlink trying to replace every provider type?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "No. The comparison is intended to help buyers identify when Orbitlink is the best fit and when other provider models may better suit a different requirement.",
            },
          },
          {
            "@type": "Question",
            name: "What is Orbitlink's strongest difference?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink is designed to provide a clearer, more structured, and more trust-forward business buying experience than most telecom provider websites.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="COMPARE"
      title="Orbitlink vs Big Telco vs Typical Small ISP"
      subtitle="A buyer-first comparison for organizations that want more clarity, more structure, and more confidence before choosing a provider."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <Surface className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[30rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Buyer-focused comparison
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              Not every provider feels the same to a business buyer.
              <span className="block text-white/72">
                This page explains why Orbitlink feels different.
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Big telcos bring scale. Small ISPs often bring local attention. Orbitlink is being
              built to combine premium presentation, clearer service logic, stronger trust posture,
              and a more structured buying experience for Ontario business connectivity.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Send a Business Request
              </Link>
              <Link
                href="/why-orbitlink"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Why Orbitlink
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <SectionEyebrow>BUYER SNAPSHOT</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                Orbitlink’s edge is buyer confidence
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The strongest difference is not just the service list. It is how clearly the
                business is presented, how disciplined the request flow feels, and how visible the
                trust posture is before the first conversation.
              </p>

              <div className="mt-5 grid gap-3">
                <MetricPill label="CLARITY" value="Higher" />
                <MetricPill label="STRUCTURE" value="Stronger" />
                <MetricPill label="TRUST" value="More visible" />
              </div>
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>SCORECARD</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Where Orbitlink wins for business buyers
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This is not about claiming to be everything for everyone. It is about showing where
              Orbitlink creates a stronger business buying experience.
            </p>
          </div>

          <MetricPill label="FOCUS" value="Business readability and trust" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {SCORECARDS.map((item) => (
            <div
              key={item.title}
              className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6"
            >
              <div className="text-sm font-medium text-white/90">{item.title}</div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">ORBITLINK</div>
                  <div className="mt-2">
                    <ScorePill value={item.orbitlink} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">BIG TELCO</div>
                  <div className="mt-2">
                    <ScorePill value={item.bigTelco} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">TYPICAL SMALL ISP</div>
                  <div className="mt-2">
                    <ScorePill value={item.smallIsp} />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/63">{item.note}</p>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>SIDE-BY-SIDE VIEW</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              The real experience difference
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This section is designed to help a buyer instantly see how Orbitlink compares across
              the things that shape trust and decision-making.
            </p>
          </div>

          <MetricPill label="OUTCOME" value="Faster comparison, cleaner decision" />
        </div>

        <div className="mt-7 space-y-3">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.category}
              className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6"
            >
              <div className="text-[11px] tracking-[0.24em] text-white/45">{row.category}</div>

              <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">ORBITLINK</div>
                  <p className="mt-2 text-sm leading-6 text-white/82">{row.orbitlink}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">BIG TELCO</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">{row.bigTelco}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">TYPICAL SMALL ISP</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">{row.smallIsp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Surface>

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-4 sm:mt-6 sm:gap-5">
        {ORBITLINK_ADVANTAGES.map((item) => (
          <BenefitCard key={item.title} title={item.title} body={item.body} />
        ))}
      </section>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>WHICH FIT IS RIGHT?</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Choose the provider model that matches the requirement
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This page is strongest when it helps the buyer self-qualify. That increases trust and
              makes Orbitlink look more confident, not more defensive.
            </p>
          </div>

          <MetricPill label="POSITIONING" value="Clear fit, not generic selling" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {BEST_FOR.map((group) => (
            <div
              key={group.title}
              className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6"
            >
              <div className="text-sm font-medium text-white/90">{group.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>HOW ORBITLINK CLOSES BETTER</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Orbitlink reduces the friction that usually slows telecom buying
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              The goal is simple: make the buyer feel more informed, more comfortable, and more
              ready to act because the provider surface already feels organized and credible.
            </p>
          </div>

          <MetricPill label="CONVERSION LOGIC" value="Confidence before contact" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          {BUYER_PATH.map((item) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>FINAL TAKE</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Orbitlink is the better fit when the buyer values clarity, structure, and trust
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Big telcos win on scale. Small ISPs can win on personal attention. Orbitlink is being
              built to win where better business buyers often care most: a cleaner buying journey,
              a more premium service surface, and a provider that feels easier to trust from the
              beginning.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Send a Business Request
            </Link>
            <Link
              href="/why-orbitlink"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Why Orbitlink
            </Link>
          </div>
        </div>
      </Surface>
    </PageShell>
  );
}