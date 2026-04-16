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
  title: "Compare Business Internet Providers in Ontario",
  description:
    "Compare Orbitlink with large telecom providers and smaller ISPs across clarity, support, trust, onboarding, and business fit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Compare Business Internet Providers in Ontario | Orbitlink",
    description:
      "A clearer comparison of Orbitlink, large telecom providers, and smaller ISPs for Ontario business buyers.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Compare business internet providers with Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Business Internet Providers | Orbitlink",
    description:
      "Compare Orbitlink with large telecom providers and smaller ISPs across clarity, trust, and business fit.",
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
  "Better visibility into trust and next steps",
  "A simpler path from interest to request",
  "Built for business buyers, not generic browsing",
] as const;

const COMPARISON_ROWS = [
  {
    category: "Buying experience",
    orbitlink: "Clear, guided, and business-focused",
    bigTelco: "Broad and familiar, but often more generic",
    smallIsp: "Can feel direct, but varies by provider",
  },
  {
    category: "Availability process",
    orbitlink: "Reviewed by address early",
    bigTelco: "Often confirmed later in the process",
    smallIsp: "Depends on footprint and workflow",
  },
  {
    category: "Support visibility",
    orbitlink: "Explained earlier",
    bigTelco: "Often clearer after engagement",
    smallIsp: "Often based on direct relationship",
  },
  {
    category: "Service explanation",
    orbitlink: "Built around business fit",
    bigTelco: "Often catalog-led or bundle-led",
    smallIsp: "Can be simpler, but less structured",
  },
  {
    category: "Trust on the site",
    orbitlink: "Shown clearly",
    bigTelco: "Often implied by brand size",
    smallIsp: "Often lighter on trust detail",
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
    title: "Choose Orbitlink if you want…",
    items: [
      "A clearer buying path from the start",
      "Better explanation of service fit before contact",
      "Visible trust and business information on the site",
      "A more premium and organized business experience",
      "A cleaner path to availability and pricing",
    ],
  },
  {
    title: "Choose a large telecom provider if you want…",
    items: [
      "A nationally familiar brand",
      "A large service catalog",
      "A provider that may already serve many buildings",
      "A more standardized buying process",
      "Brand familiarity over a tailored buying path",
    ],
  },
  {
    title: "Choose a smaller ISP if you want…",
    items: [
      "A more local or direct relationship",
      "A simpler conversation",
      "A leaner regional provider",
      "A practical option for a straightforward need",
      "Trust built mainly through direct contact",
    ],
  },
] as const;

const ORBITLINK_ADVANTAGES = [
  {
    title: "Clearer before contact",
    body:
      "Orbitlink is designed to explain service fit, business use cases, and next steps in plainer English.",
  },
  {
    title: "More premium buyer experience",
    body:
      "The site, messaging, and layout are built to feel calmer, clearer, and more business-ready.",
  },
  {
    title: "Visible trust signals",
    body:
      "Trust, onboarding, and business positioning are surfaced earlier instead of being hidden later.",
  },
  {
    title: "Stronger lead path",
    body:
      "The site is designed to guide buyers toward the right request instead of making them guess what to do next.",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Why compare Orbitlink with large telecom providers and smaller ISPs?",
    a: "This page helps business buyers understand how Orbitlink differs in clarity, support visibility, trust, and overall buying experience.",
  },
  {
    q: "Is Orbitlink the right fit for every business?",
    a: "No. This page is designed to show where Orbitlink is a stronger fit and where another provider model may suit a different need better.",
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
      pills={[
        "Business-first comparison",
        "Clearer buyer path",
        "Ontario commercial focus",
      ]}
      actions={[
        { label: "Get Availability & Pricing", href: "/contact#intake", variant: "primary" },
        { label: "Why Orbitlink", href: "/why-orbitlink", variant: "secondary" },
      ]}
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
              The right provider is not only about speed.
              <span className="block text-white/72">
                It is also about clarity, trust, and how easy the buying process feels.
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Large telecom providers bring scale. Smaller ISPs can bring a more direct
              relationship. Orbitlink is built to combine premium presentation, clearer
              service logic, visible trust, and a more business-friendly buying experience.
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
                Get Availability & Pricing
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
                View Solutions
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
                The biggest difference is not only the service list. It is how clear
                the business feels, how easy the request path is, and how much trust
                is visible before the first conversation.
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
        <div className="max-w-3xl">
          <SectionEyebrow>SIDE-BY-SIDE VIEW</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Compare the provider model that fits your business
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            This comparison focuses on the parts that shape trust and decision-making
            before a provider is chosen.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[26px] border border-white/10">
          <div className="grid grid-cols-1 bg-white/[0.04] md:grid-cols-4">
            <div className="px-4 py-3 text-sm text-white/55">Category</div>
            <div className="px-4 py-3 text-sm font-medium text-white">Orbitlink</div>
            <div className="px-4 py-3 text-sm font-medium text-white">Large telecom provider</div>
            <div className="px-4 py-3 text-sm font-medium text-white">Smaller ISP</div>
          </div>

          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.category}
              className="grid grid-cols-1 border-t border-white/10 md:grid-cols-4"
            >
              <div className="px-4 py-4 text-sm text-white/55">{row.category}</div>
              <div className="px-4 py-4 text-sm text-white/82">{row.orbitlink}</div>
              <div className="px-4 py-4 text-sm text-white/68">{row.bigTelco}</div>
              <div className="px-4 py-4 text-sm text-white/68">{row.smallIsp}</div>
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
        <div className="max-w-3xl">
          <SectionEyebrow>WHICH FIT IS RIGHT?</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Choose the provider model that fits your business
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            This section helps buyers compare provider types more honestly and choose
            the one that fits best.
          </p>
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
              Large telecom providers win on scale. Smaller ISPs can win on direct
              relationships. Orbitlink is built to win where many serious business buyers
              care most: a clearer buying journey, a more premium service surface, and a
              provider that feels easier to trust from the start.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Get Availability & Pricing
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