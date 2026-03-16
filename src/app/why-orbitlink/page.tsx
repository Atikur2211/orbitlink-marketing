// src/app/why-orbitlink/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/why-orbitlink";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Why Orbitlink | Business Internet with More Clarity",
  description:
    "Why Ontario businesses choose Orbitlink for business fibre, dedicated internet, managed networks, voice, continuity, and infrastructure services: clearer onboarding, stronger trust posture, and a more structured buying experience.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Why Orbitlink | Business Internet with More Clarity",
    description:
      "A buyer-focused page explaining why Orbitlink is different: clearer qualification, better delivery posture, and a more structured business connectivity experience across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Why Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Orbitlink | Business Internet with More Clarity",
    description:
      "Why businesses choose Orbitlink for business internet, managed networks, and structured service delivery.",
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

const HERO_SIGNALS = [
  "Business-first qualification",
  "Address-aware availability review",
  "Structured onboarding",
  "Clear next-step guidance",
  "Trust and delivery visibility",
  "Plain-English service language",
] as const;

const DIFFERENTIATORS = [
  {
    title: "Clearer than mass-market telecom",
    body:
      "Orbitlink explains the service, the fit, and the next step without forcing buyers through generic telecom language or broad coverage assumptions.",
  },
  {
    title: "More structured than a typical small provider",
    body:
      "Service requests are qualified by address, timeline, building context, and operational need so the buying path feels cleaner from the start.",
  },
  {
    title: "Built for serious business review",
    body:
      "Trust, disclosure, escalation, and onboarding posture are visible early, which creates more confidence for IT leads, operations teams, and property stakeholders.",
  },
  {
    title: "Premium without sounding inflated",
    body:
      "Orbitlink uses measured language and disciplined design so the brand feels more credible, more controlled, and easier to trust over time.",
  },
] as const;

const BUYER_TYPES = [
  {
    title: "Business owners and operators",
    body:
      "Buyers who want a provider that feels easier to work with, easier to understand, and more serious than a generic internet vendor.",
  },
  {
    title: "IT and network decision-makers",
    body:
      "Teams that care about structured intake, static IP context, managed networking, escalation clarity, and fewer surprises at go-live.",
  },
  {
    title: "Property and facility stakeholders",
    body:
      "Managers who need a provider that can discuss address feasibility, building context, installation posture, and business expectations clearly.",
  },
  {
    title: "Multi-site and continuity-minded buyers",
    body:
      "Organizations that need more than one service module and want a clearer way to align internet, voice, Wi-Fi, continuity, and infrastructure planning.",
  },
] as const;

const COMPARISON = [
  {
    a: "Generic marketing before relevance",
    b: "Service fit explained before commitment",
  },
  {
    a: "Broad claims about availability",
    b: "Availability confirmed per address and scope",
  },
  {
    a: "Sales flow first, clarity later",
    b: "Qualification and scope first",
  },
  {
    a: "Support posture appears after purchase",
    b: "Escalation and trust posture visible early",
  },
  {
    a: "Each service feels separate and fragmented",
    b: "Services feel like one business-ready system",
  },
] as const;

const BUYER_PATH = [
  {
    step: "1",
    title: "Choose the real business need",
    body:
      "Start with the actual requirement: business fibre, dedicated internet, managed Wi-Fi, voice, continuity, static IPs, IoT, or infrastructure planning.",
  },
  {
    step: "2",
    title: "Add address and scope",
    body:
      "Orbitlink qualifies requests by site, timeline, building conditions, and operating requirements so the conversation starts in the right place.",
  },
  {
    step: "3",
    title: "Get a cleaner next step",
    body:
      "The goal is one strong response path: feasibility review, structured onboarding, waitlist, or direct commercial discussion.",
  },
] as const;

const DECISION_GUIDE = [
  {
    title: "Why buyers compare providers",
    body:
      "Some businesses already know they need internet service. What they still need is confidence in which provider model fits best.",
  },
  {
    title: "What the comparison page explains",
    body:
      "It breaks down differences in onboarding clarity, trust posture, escalation visibility, service explanation, and overall buyer experience.",
  },
  {
    title: "When to use it",
    body:
      "Use it when a prospect is deciding between Orbitlink, a big telco, or a smaller local ISP and wants a clearer business case.",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Why would a business choose Orbitlink instead of a larger provider?",
    a: "Orbitlink is built to provide clearer qualification, more structured onboarding, and a more disciplined trust posture for business connectivity requests.",
  },
  {
    q: "What makes Orbitlink different from a typical small ISP?",
    a: "Orbitlink emphasizes address-aware service review, controlled disclosure, trust visibility, and a more business-readable service experience.",
  },
  {
    q: "What should I do if I want to evaluate Orbitlink?",
    a: "Start by submitting your address, required service, timeline, and any technical needs such as managed Wi-Fi, static IPs, voice, or continuity requirements.",
  },
  {
    q: "Is Orbitlink only for large businesses?",
    a: "No. Orbitlink is designed for serious business buyers of different sizes, especially organizations that value clarity, structure, and a more professional provider experience.",
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

export default function WhyOrbitlinkPage() {
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
        name: "Why Orbitlink",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: { "@id": `${SITE_URL}/#org` },
        description:
          "A buyer-focused page explaining why Orbitlink is different for business internet, managed networks, and structured service delivery.",
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
            name: "Why Orbitlink",
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
      eyebrow="WHY ORBITLINK"
      title="A better business connectivity buying experience"
      subtitle="Built for buyers who want more clarity, more structure, and more trust than the typical telecom website delivers."
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
              Built for serious business buyers
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              Most telecom websites make business buying harder.
              <span className="block text-white/72">
                Orbitlink is designed to make it clearer.
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Orbitlink is built for buyers who want a cleaner path from interest to action.
              The difference is not just visual. It is in how services are explained, how
              requests are qualified, how trust is shown, and how the next step is made simpler.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_SIGNALS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Send a Business Request
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Review Trust Posture
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Compare Provider Models
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <SectionEyebrow>BUYER SUMMARY</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                What makes Orbitlink feel stronger
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Buyers stay longer when the provider looks easier to understand, more
                disciplined, and more serious about delivery. That is exactly what this
                page is designed to show.
              </p>

              <div className="mt-5 grid gap-3">
                <MetricPill label="CLARITY" value="Easy to understand" />
                <MetricPill label="STRUCTURE" value="Cleaner buying path" />
                <MetricPill label="TRUST" value="More reviewable" />
              </div>
            </div>
          </div>
        </div>
      </Surface>

      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 sm:mt-6 sm:gap-5">
        {DIFFERENTIATORS.map((item) => (
          <BenefitCard key={item.title} title={item.title} body={item.body} />
        ))}
      </section>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>WHY THIS PAGE WORKS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Buyers do not just want service.
              <span className="block text-white/72">They want confidence in the provider.</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              A normal service page explains what you sell. A strong “Why Orbitlink” page
              explains why the experience feels safer, clearer, and more commercially
              credible. That is why this kind of page helps convert better than a standard
              catalog page.
            </p>
          </div>

          <MetricPill label="PAGE PURPOSE" value="Increase buying confidence" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BUYER_TYPES.map((item) => (
            <BenefitCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>COMPARISON</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              The difference buyers feel early
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              The commercial value of Orbitlink’s presentation is simple: the experience
              feels more intentional, more structured, and more trustworthy before the
              buyer ever submits a request.
            </p>
          </div>

          <MetricPill label="OUTCOME" value="Lower friction, stronger confidence" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3">
          {COMPARISON.map((row, i) => (
            <div
              key={`${row.a}-${i}`}
              className="grid grid-cols-1 gap-3 rounded-[26px] border border-white/10 bg-black/20 p-5 md:grid-cols-2"
            >
              <div>
                <div className="text-[11px] tracking-[0.22em] text-white/45">
                  Typical provider experience
                </div>
                <div className="mt-2 text-sm leading-6 text-white/58">{row.a}</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.22em] text-white/45">
                  Orbitlink experience
                </div>
                <div className="mt-2 text-sm leading-6 text-white/82">{row.b}</div>
              </div>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>COMPARE PROVIDER MODELS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Still comparing Orbitlink with other provider types?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Some buyers want more than a service page. They want a clearer view of how
              Orbitlink compares with big telcos and typical small ISPs before they decide
              who to contact.
            </p>
          </div>

          <MetricPill label="DECISION SUPPORT" value="Compare provider models" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DECISION_GUIDE.map((item) => (
            <BenefitCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/compare"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Open Comparison Page
          </Link>
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Send a Business Request
          </Link>
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>BUYER PATH</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              A simpler path from interest to action
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Strong business sites reduce hesitation by making the next step obvious.
              Orbitlink is designed to help buyers move from service interest to a
              qualified request without guessing what to do next.
            </p>
          </div>

          <MetricPill label="FLOW" value="Service → Scope → Structured intake" />
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
            Common questions about Orbitlink
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            These answers help buyers understand where Orbitlink fits and what to do next.
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
            <SectionEyebrow>FINAL REASON</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Orbitlink is designed to feel easier to trust before the first call
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              That is the real conversion advantage. The site feels clearer than a
              big-telco experience, more premium than a generic reseller surface, and
              more structured than most small providers. That makes better buyers more
              willing to take the next step.
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
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </Surface>
    </PageShell>
  );
}