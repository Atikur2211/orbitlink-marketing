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
  title: "Compare Business Internet Providers | Orbitlink",
  description:
    "Compare Orbitlink with large telecom providers and smaller ISPs across service clarity, support, onboarding, trust, and business fit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Compare Business Internet Providers | Orbitlink",
    description:
      "A business-focused comparison of Orbitlink, large telecom providers, and smaller ISPs across clarity, support, trust, and business fit.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet provider comparison page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Business Internet Providers | Orbitlink",
    description:
      "Compare business internet providers across clarity, support, trust, and business fit.",
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

const HERO_POINTS = [
  "Clearer service fit before you commit",
  "More visible trust and business information",
  "Simpler next steps for business buyers",
  "A cleaner path from interest to request",
] as const;

const SCORECARDS = [
  {
    title: "Clarity before contact",
    orbitlink: "Clear and business-focused",
    bigTelco: "Often broad and catalog-led",
    smallIsp: "Varies by provider",
    note: "Orbitlink is designed to explain service fit, buying path, and next steps before you reach out.",
  },
  {
    title: "Business buying experience",
    orbitlink: "Guided and easier to follow",
    bigTelco: "Standardized at scale",
    smallIsp: "Often direct but less structured",
    note: "Orbitlink aims to make the buying process easier to understand from the first visit.",
  },
  {
    title: "Trust on the site",
    orbitlink: "Shown early",
    bigTelco: "Often implied by brand size",
    smallIsp: "Often lighter on-page",
    note: "Orbitlink treats trust, business fit, and service guidance as part of the buying experience.",
  },
  {
    title: "Consistency across pages",
    orbitlink: "Aligned and business-ready",
    bigTelco: "Broad but sometimes segmented",
    smallIsp: "Can vary by page",
    note: "Orbitlink is built to feel more coherent and easier to navigate for business buyers.",
  },
] as const;

const COMPARISON_ROWS = [
  {
    category: "Buying experience",
    orbitlink:
      "Guided, business-focused, and built to reduce confusion",
    bigTelco:
      "Broad selection and big scale, but often more generic",
    smallIsp:
      "Can feel direct and personal, but quality varies",
  },
  {
    category: "Availability guidance",
    orbitlink: "Reviewed by address early",
    bigTelco: "Often discussed later in the process",
    smallIsp: "Depends on provider and footprint",
  },
  {
    category: "Support path visibility",
    orbitlink: "Explained earlier",
    bigTelco: "Often clearer after engagement",
    smallIsp: "Often based on direct relationship",
  },
  {
    category: "Service explanation",
    orbitlink: "Built around business fit",
    bigTelco: "Often bundle-led or mass-market",
    smallIsp: "Can be simple, but sometimes feature-heavy",
  },
  {
    category: "Trust surface",
    orbitlink: "Clearer on-page",
    bigTelco: "Strong brand familiarity",
    smallIsp: "Often lighter on trust details",
  },
  {
    category: "Commercial feel",
    orbitlink: "Premium and deliberate",
    bigTelco: "Polished but mass-scale",
    smallIsp: "Often practical and local",
  },
  {
    category: "Confidence before contact",
    orbitlink: "Built to increase confidence early",
    bigTelco: "Brand familiarity drives confidence",
    smallIsp: "Confidence depends on operator relationship",
  },
  {
    category: "Best fit",
    orbitlink: "Businesses wanting clarity and guidance",
    bigTelco: "Buyers prioritizing scale and familiarity",
    smallIsp: "Buyers wanting a local or direct relationship",
  },
] as const;

const BEST_FOR = [
  {
    title: "Choose Orbitlink if you want...",
    items: [
      "A clearer business buying experience from the start",
      "Better explanation of service fit before contact",
      "Visible trust and business information on the site",
      "A more premium and organized service surface",
      "A cleaner path from interest to request",
    ],
  },
  {
    title: "Choose a large telecom provider if you want...",
    items: [
      "A nationally familiar brand",
      "A large product catalog",
      "A provider that may already serve many buildings",
      "A more standardized process",
      "Brand familiarity over a tailored buying path",
    ],
  },
  {
    title: "Choose a smaller ISP if you want...",
    items: [
      "A more local or direct operator relationship",
      "A simpler buying conversation",
      "A leaner regional provider",
      "A practical option for a straightforward need",
      "Trust built mainly through direct contact",
    ],
  },
] as const;

const ORBITLINK_ADVANTAGES = [
  {
    title: "Clearer before you contact us",
    body:
      "Orbitlink is built to explain service fit, business use cases, and next steps in plainer English.",
  },
  {
    title: "More premium business presentation",
    body:
      "The site, layout, and messaging are designed to feel calmer, clearer, and more business-ready than most smaller providers.",
  },
  {
    title: "More visible trust signals",
    body:
      "Trust, onboarding, and business positioning are surfaced earlier instead of being hidden deeper in the process.",
  },
  {
    title: "Stronger lead path",
    body:
      "The site is designed to guide buyers toward the right request instead of making them guess what to click next.",
  },
] as const;

const BUYER_PATH = [
  {
    step: "1",
    title: "Understand the right fit",
    body:
      "Orbitlink helps buyers understand which service fits the business and when a higher-assurance option makes sense.",
  },
  {
    step: "2",
    title: "Review the address properly",
    body:
      "Availability is reviewed against the address, building context, and business need before overpromising.",
  },
  {
    step: "3",
    title: "Move forward with a clear next step",
    body:
      "The buyer gets a simpler path toward availability, pricing, and the right service direction.",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Why compare Orbitlink with large telecom providers and smaller ISPs?",
    a: "This page helps business buyers understand how Orbitlink differs in clarity, business fit, support visibility, and overall buying experience.",
  },
  {
    q: "Is Orbitlink the right fit for every business?",
    a: "No. This page is meant to show where Orbitlink is a stronger fit and where another provider model may suit a different need better.",
  },
  {
    q: "What is Orbitlink’s strongest difference?",
    a: "Orbitlink is designed to provide a clearer, more business-friendly, and more trust-forward buying experience.",
  },
  {
    q: "Who is this page for?",
    a: "It is built for business owners, office managers, IT leads, operations teams, and other buyers comparing providers for a business location.",
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

function NeutralPill({ value }: { value: string }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75">
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
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Orbitlink",
        url: SITE_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Compare Business Internet Providers",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#org` },
        description:
          "A business internet comparison page showing how Orbitlink differs from large telecom providers and smaller ISPs.",
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
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <PageShell
      eyebrow="COMPARE"
      title="Compare business internet providers"
      subtitle="A clearer comparison for businesses evaluating Orbitlink, large telecom providers, and smaller ISPs."
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
              Business-first comparison
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              The right provider is not only about speed or bandwidth.
              <span className="block text-white/72">
                It is also about clarity, trust, and how easy the buying process feels.
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Large telecom providers bring scale. Smaller ISPs can bring a more direct relationship.
              Orbitlink is being built to combine premium presentation, clearer service logic,
              visible trust, and a more business-friendly buying experience.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HERO_POINTS.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78"
                >
                  {item}
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
              <SectionEyebrow>QUICK TAKE</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                Orbitlink stands out most in clarity and buyer experience
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The difference is not only the service list. It is how clear the business feels,
                how easy the request path is, and how much trust is visible before the first conversation.
              </p>

              <div className="mt-5 grid gap-3">
                <MetricPill label="CLARITY" value="More explicit" />
                <MetricPill label="GUIDANCE" value="More helpful" />
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
              Where Orbitlink stands out
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This is not about being everything for everyone. It is about showing where Orbitlink creates a better business buying experience.
            </p>
          </div>

          <MetricPill label="FOCUS" value="Clarity and trust" />
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
                  <div className="text-[11px] tracking-[0.22em] text-white/45">
                    ORBITLINK
                  </div>
                  <div className="mt-2">
                    <NeutralPill value={item.orbitlink} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">
                    LARGE TELCO
                  </div>
                  <div className="mt-2">
                    <NeutralPill value={item.bigTelco} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">
                    SMALLER ISP
                  </div>
                  <div className="mt-2">
                    <NeutralPill value={item.smallIsp} />
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
              The real difference in buying experience
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This comparison focuses on the things that shape trust and decision-making before a provider is chosen.
            </p>
          </div>

          <MetricPill label="OUTCOME" value="Cleaner choice" />
        </div>

        <div className="mt-7 space-y-3">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.category}
              className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6"
            >
              <div className="text-[11px] tracking-[0.24em] text-white/45">
                {row.category}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">
                    ORBITLINK
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/82">
                    {row.orbitlink}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">
                    LARGE TELCO
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {row.bigTelco}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/45">
                    SMALLER ISP
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {row.smallIsp}
                  </p>
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
              Choose the provider model that fits your business
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This section helps buyers compare provider types more honestly and choose the one that fits best.
            </p>
          </div>

          <MetricPill label="POSITIONING" value="Clear fit" />
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
            <SectionEyebrow>HOW ORBITLINK HELPS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Orbitlink removes friction from business telecom buying
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              The goal is simple: help the buyer feel more informed and more ready to act because the provider already feels organized and credible.
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
        <div className="max-w-3xl">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Common questions about this comparison
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            These answers explain the purpose of this page and when Orbitlink is the right fit.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6"
            >
              <h3 className="text-sm font-medium text-white/90">{item.q}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{item.a}</p>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>FINAL TAKE</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Orbitlink is the stronger fit when your business values clarity, trust, and a cleaner buying path
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Large telecom providers win on scale. Smaller ISPs can win on direct relationships.
              Orbitlink is being built to win where many serious business buyers care most:
              a clearer buying journey, a more premium service surface, and a provider that feels easier to trust from the start.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
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