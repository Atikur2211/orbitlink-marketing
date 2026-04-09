import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/why-orbitlink";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";

export const metadata: Metadata = {
  title: "Why Orbitlink | Business Internet for Ontario Businesses",
  description:
    "Why Ontario businesses choose Orbitlink for business fibre, dedicated internet, managed Wi-Fi, voice, and structured service delivery.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Why Orbitlink | Business Internet for Ontario Businesses",
    description:
      "See why Ontario businesses choose Orbitlink for clearer qualification, structured onboarding, stronger trust posture, and a more business-ready connectivity experience.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Why Orbitlink for Ontario business connectivity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Orbitlink | Business Internet for Ontario Businesses",
    description:
      "Why businesses choose Orbitlink for business internet, managed networks, voice, continuity, and structured service delivery.",
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
  "Structured onboarding posture",
  "Clear next-step guidance",
  "Trust and delivery visibility",
  "Plain-English service language",
] as const;

const DIFFERENTIATORS = [
  {
    title: "Clearer than mass-market telecom",
    body:
      "Orbitlink explains service fit, qualification logic, and next steps in plain business language instead of broad telecom messaging.",
  },
  {
    title: "More structured from the start",
    body:
      "Requests are reviewed by address, building context, timeline, and operational need so the commercial path feels cleaner from day one.",
  },
  {
    title: "Built for serious business review",
    body:
      "Trust posture, escalation visibility, and onboarding clarity are surfaced earlier for IT leads, operators, and property stakeholders.",
  },
  {
    title: "Premium without overclaiming",
    body:
      "Orbitlink uses measured language and disciplined presentation so the brand feels more credible, more controlled, and easier to trust.",
  },
] as const;

const BUYER_TYPES = [
  {
    title: "Business owners and operators",
    body:
      "For buyers who want a provider that feels easier to work with, easier to understand, and more deliberate than a generic internet vendor.",
  },
  {
    title: "IT and network decision-makers",
    body:
      "For teams that care about structured intake, static IP context, managed networking, escalation clarity, and fewer surprises at go-live.",
  },
  {
    title: "Property and facility stakeholders",
    body:
      "For managers who need clear discussion around address feasibility, building context, installation posture, and business expectations.",
  },
  {
    title: "Multi-site and continuity-minded buyers",
    body:
      "For organizations aligning internet, voice, Wi-Fi, continuity, and infrastructure planning across more than one operational requirement.",
  },
] as const;

const COMPARISON = [
  {
    a: "Generic marketing before relevance",
    b: "Service fit explained before commitment",
  },
  {
    a: "Broad claims about availability",
    b: "Availability reviewed per address and scope",
  },
  {
    a: "Sales flow first, clarity later",
    b: "Qualification and scope first",
  },
  {
    a: "Support posture appears after purchase",
    b: "Escalation and trust posture visible earlier",
  },
  {
    a: "Each service feels fragmented",
    b: "Services feel like one business-ready system",
  },
] as const;

const BUYER_PATH = [
  {
    step: "1",
    title: "Start with the business need",
    body:
      "Choose the actual requirement: business fibre, dedicated internet, managed Wi-Fi, voice, continuity, static IPs, IoT, or infrastructure support.",
  },
  {
    step: "2",
    title: "Add address and operating context",
    body:
      "Orbitlink qualifies requests by site, timeline, building conditions, and operational needs so the conversation starts in the right place.",
  },
  {
    step: "3",
    title: "Receive a cleaner next step",
    body:
      "The next step is clear: feasibility review, structured onboarding path, waitlist direction, or direct commercial discussion.",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Why would a business choose Orbitlink instead of a larger provider?",
    a: "Orbitlink is built to offer clearer qualification, more structured onboarding, and a stronger trust posture for business connectivity requests.",
  },
  {
    q: "What makes Orbitlink different from a typical smaller provider?",
    a: "Orbitlink emphasizes address-aware review, controlled disclosure, trust visibility, and a more business-readable service experience.",
  },
  {
    q: "How do I evaluate Orbitlink for my business?",
    a: "Start by submitting your address, service requirement, timeline, and any technical needs such as managed Wi-Fi, static IPs, voice, or continuity requirements.",
  },
  {
    q: "Is Orbitlink only for large organizations?",
    a: "No. Orbitlink is designed for serious business buyers of different sizes, especially organizations that value clarity, structure, and a more professional provider experience.",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium tracking-[0.24em] text-white/52">
      {children}
    </div>
  );
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
        "rounded-[28px] border border-white/8 bg-white/[0.03]",
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
    <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/46">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
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
    <div className="rounded-[24px] border border-white/8 bg-black/20 p-5 sm:p-6">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/66">{body}</p>
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
    <div className="rounded-[24px] border border-white/8 bg-black/20 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/92">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/66">{body}</p>
    </div>
  );
}

function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          : "inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
      }
    >
      {children}
    </Link>
  );
}

function ComparisonRow({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[24px] border border-white/8 bg-black/20 p-5 md:grid-cols-2">
      <div>
        <div className="text-[11px] tracking-[0.22em] text-white/45">
          Typical provider experience
        </div>
        <div className="mt-2 text-sm leading-6 text-white/60">{left}</div>
      </div>
      <div>
        <div className="text-[11px] tracking-[0.22em] text-white/45">
          Orbitlink experience
        </div>
        <div className="mt-2 text-sm leading-6 text-white/84">{right}</div>
      </div>
    </div>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Why Orbitlink | Business Internet for Ontario Businesses",
        description:
          "A buyer-focused page explaining why Orbitlink is different for business internet, managed networks, and structured service delivery.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
        "@id": `${PAGE_URL}#faq`,
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
}

export default function WhyOrbitlinkPage() {
  return (
    <PageShell
      eyebrow="WHY ORBITLINK"
      title="A better business connectivity buying experience"
      subtitle="Built for buyers who want more clarity, more structure, and more trust than the typical telecom website delivers."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <Surface className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-12 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="absolute right-0 top-6 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/2 h-20 w-64 -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Built for serious business buyers
            </div>

            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              Most telecom websites make business buying harder.
              <span className="block text-white/72">
                Orbitlink is designed to make it clearer.
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Orbitlink is built for businesses that want a cleaner path from interest
              to action. Services are explained more clearly, requests are qualified
              more carefully, and the next step is easier to understand.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
              Business fibre, dedicated internet access, managed Wi-Fi, voice,
              backup connectivity, and infrastructure services for Ontario offices,
              clinics, warehouses, and commercial environments.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
              Orbitlink does not assume availability. Requests are reviewed by address,
              building context, and business requirements before moving forward.
            </p>

            <div className="mt-4 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
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
                managed Wi-Fi
              </Link>
              ,{" "}
              <Link
                href="/services/colocation-infrastructure"
                className="underline underline-offset-4 hover:text-white"
              >
                colocation & infrastructure services
              </Link>
              , and{" "}
              <Link
                href="/services/starlink-agent"
                className="underline underline-offset-4 hover:text-white"
              >
                Starlink access coordination
              </Link>
              .
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_SIGNALS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton href="/contact#intake" primary>
                Start Business Request
              </CTAButton>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Call {PHONE_DISPLAY}
              </a>
              <CTAButton href="/services">Explore Services</CTAButton>
              <CTAButton href="/trust">Review Trust Posture</CTAButton>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[24px] border border-white/8 bg-black/20 p-5 sm:p-6">
              <SectionEyebrow>BUYER SUMMARY</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                What makes Orbitlink feel stronger
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Buyers stay longer when the provider feels easier to understand,
                more disciplined, and more serious about delivery.
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

      <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {DIFFERENTIATORS.map((item) => (
          <BenefitCard key={item.title} title={item.title} body={item.body} />
        ))}
      </section>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>WHY BUSINESSES CHOOSE ORBITLINK</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Buyers do not only want service.
              <span className="block text-white/72">
                They want confidence in the provider.
              </span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              A standard service page explains what is sold. A strong Why Orbitlink
              page explains why the provider feels safer, clearer, and more commercially
              credible before a request is even submitted.
            </p>
          </div>

          <MetricPill label="PAGE PURPOSE" value="Increase buying confidence" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BUYER_TYPES.map((item) => (
            <BenefitCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
          Orbitlink supports business markets across Ontario including Mississauga,
          Toronto, Brampton, Oakville, Vaughan, Markham, Milton, Ottawa, and surrounding
          commercial regions.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/locations/barrie" className="underline hover:text-white">
            Business internet in Barrie
          </Link>
          <Link href="/locations/north-york" className="underline hover:text-white">
            Business internet in North York
          </Link>
          <Link href="/locations/niagara-st-catharines" className="underline hover:text-white">
            Business internet in Niagara / St. Catharines
          </Link>
          <Link href="/locations/newmarket" className="underline hover:text-white">
            Business internet in Newmarket
          </Link>
          <Link href="/locations/sudbury" className="underline hover:text-white">
            Business internet in Sudbury
          </Link>
          <Link href="/locations/kingston" className="underline hover:text-white">
            Business internet in Kingston
          </Link>
          <Link href="/locations/thunder-bay" className="underline hover:text-white">
            Business internet in Thunder Bay
          </Link>
          <Link href="/internet-near-me" className="underline hover:text-white">
            Business internet near me
          </Link>
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
              Orbitlink creates a more intentional and more trustworthy buying experience
              before the first commercial discussion even begins.
            </p>
          </div>

          <MetricPill label="OUTCOME" value="Lower friction, stronger confidence" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3">
          {COMPARISON.map((row, i) => (
            <ComparisonRow key={`${row.a}-${i}`} left={row.a} right={row.b} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CTAButton href="/compare" primary>
            Compare Provider Models
          </CTAButton>
          <CTAButton href="/contact#intake">Start Business Request</CTAButton>
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
              qualified request without uncertainty.
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
              className="rounded-[24px] border border-white/8 bg-black/20 p-5 sm:p-6"
            >
              <h3 className="text-sm font-medium text-white/92">{item.q}</h3>
              <p className="mt-3 text-sm leading-6 text-white/66">{item.a}</p>
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
              That is the conversion advantage. The experience feels clearer than a
              big-telco journey, more premium than a generic reseller surface, and more
              structured than most smaller providers.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/60 sm:text-[15px]">
              Start with your address and business requirements. Orbitlink will guide the
              next step clearly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href="/contact#intake" primary>
              Start Business Request
            </CTAButton>
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
            <CTAButton href="/services">Explore Services</CTAButton>
          </div>
        </div>
      </Surface>
    </PageShell>
  );
}