// src/app/about/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About Orbitlink | Business Connectivity for Ontario",
  description:
    "Orbitlink is a business connectivity and network infrastructure brand for Ontario organizations. Built around clear communication, structured delivery, and long-term trust.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About Orbitlink | Business Connectivity for Ontario",
    description:
      "A business connectivity brand built around clear communication, structured delivery, and long-term trust. Orbitlink is a brand of TIRAV Technologies Inc.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink — About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Orbitlink | Business Connectivity for Ontario",
    description:
      "A business connectivity brand built around clear communication, structured delivery, and long-term trust.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

const STORY_BLOCKS = [
  {
    label: "WHY ORBITLINK EXISTS",
    text:
      "Orbitlink was created around a simple idea: business connectivity should be easier to understand, easier to buy, and easier to trust. Too often, telecom feels noisy, vague, or overly sales-driven. Orbitlink is designed to feel clearer, calmer, and more professionally structured from the first interaction onward.",
  },
  {
    label: "HOW WE OPERATE",
    text:
      "We focus on clear qualification, structured onboarding, measured language, and cleaner delivery expectations. Instead of making broad claims, we confirm fit, scope, and readiness before moving forward. The goal is a better business experience, not just a louder brand.",
  },
  {
    label: "WHERE WE ARE GOING",
    text:
      "Orbitlink is shaped to support business fibre, dedicated internet, managed networks, voice, continuity, and broader infrastructure requirements across Ontario. The ambition is to build a durable, credible connectivity company that earns trust over time.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Clear over confusing",
    desc:
      "We want buyers to understand what they are getting, what fits their site, and what happens next without unnecessary complexity.",
  },
  {
    title: "Structured over improvised",
    desc:
      "We believe onboarding, delivery, escalation, and communication should feel organized from the beginning.",
  },
  {
    title: "Measured over exaggerated",
    desc:
      "We avoid overclaiming. Service posture, rollout, and operational statements are expressed conservatively and refined as they become verifiable.",
  },
  {
    title: "Trust over short-term hype",
    desc:
      "The brand is built for long-term credibility with business clients, partners, and future regulatory or infrastructure stakeholders.",
  },
] as const;

const FOUNDATIONS = [
  {
    eyebrow: "BRAND FOUNDATION",
    title: "Built to feel serious from day one",
    body:
      "Orbitlink is designed to look and read like a disciplined infrastructure company. The visual language is restrained, the copy is deliberate, and the service structure is meant to feel stable and credible.",
  },
  {
    eyebrow: "DELIVERY MODEL",
    title: "Structured intake and cleaner execution",
    body:
      "Services are introduced through qualification, address review, scope definition, and measured rollout. The objective is fewer surprises, cleaner alignment, and a more professional client experience.",
  },
  {
    eyebrow: "CLIENT EXPERIENCE",
    title: "Business-first from first contact",
    body:
      "Whether a request starts with one site or a broader infrastructure need, the experience is intended to feel premium, clear, and professionally handled from the beginning.",
  },
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Easier to understand",
    body:
      "The company story is presented in buyer language, not internal jargon or vague brand messaging.",
  },
  {
    title: "More credible first impression",
    body:
      "The page is designed to make Orbitlink feel more established, more selective, and more operationally serious.",
  },
  {
    title: "Better alignment with enterprise buyers",
    body:
      "The positioning supports buyers who expect structure, discipline, and commercial clarity before they evaluate services.",
  },
  {
    title: "Stronger long-term trust signal",
    body:
      "The page reinforces that Orbitlink is being built as a durable business platform, not a short-term marketing surface.",
  },
] as const;

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-white/[0.045] ${className}`}>
      {children}
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>;
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

export default function AboutPage() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Orbitlink",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        brand: {
          "@type": "Brand",
          name: "Orbitlink",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "30 Eglinton Ave W, Suite 400-A77",
          addressLocality: "Mississauga",
          addressRegion: "ON",
          postalCode: "L5R 3E7",
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario, Canada",
        },
      },
      {
        "@type": "AboutPage",
        "@id": `${PAGE_URL}#about`,
        url: PAGE_URL,
        name: "About Orbitlink",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#org`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Orbitlink",
        url: SITE_URL,
        publisher: {
          "@id": `${SITE_URL}/#org`,
        },
        inLanguage: "en-CA",
      },
    ],
  };

  return (
    <PageShell
      eyebrow="ABOUT"
      title="A business connectivity brand built for clarity and long-term trust"
      subtitle="Orbitlink is designed for Ontario organizations that want cleaner communication, structured delivery, and a more disciplined business connectivity experience."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <SectionShell className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative">
          <SectionEyebrow>BRAND STORY</SectionEyebrow>
          <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Built to make business connectivity feel clearer, calmer, and more professionally run
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
            Orbitlink is not positioned as a loud mass-market telecom brand. It is positioned as a
            modern business connectivity platform with a cleaner operating style: clear
            qualification, measured communication, structured onboarding, and a visible bias toward
            long-term trust.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
            {STORY_BLOCKS.map((block) => (
              <div
                key={block.label}
                className="rounded-3xl border border-white/10 bg-black/20 p-6"
              >
                <div className="text-[11px] tracking-[0.26em] text-white/50">{block.label}</div>
                <p className="mt-4 text-sm leading-6 text-white/70">{block.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="POSITIONING" value="Business-first connectivity brand" />
            <MetricPill label="OPERATING STYLE" value="Structured and measured" />
            <MetricPill label="LONG-TERM AIM" value="Durable enterprise trust" />
          </div>
        </div>
      </SectionShell>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 sm:mt-5 sm:gap-5">
        {FOUNDATIONS.map((item) => (
          <SectionShell key={item.title} className="p-6 sm:p-7">
            <SectionEyebrow>{item.eyebrow}</SectionEyebrow>
            <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/66 sm:text-[15px]">{item.body}</p>
          </SectionShell>
        ))}
      </section>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              What this brand posture is designed to communicate
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              The objective is not to sound abstract or overly polished. It is to help buyers,
              partners, and stakeholders quickly understand that Orbitlink is built with
              discipline, commercial clarity, and long-term seriousness.
            </p>
          </div>

          <MetricPill label="MODE" value="Clear and buyer-readable" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 sm:gap-4">
          {BUSINESS_OUTCOMES.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="text-sm font-medium text-white/90">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <SectionEyebrow>OPERATING PRINCIPLES</SectionEyebrow>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          The standard behind the brand
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          Orbitlink is designed to feel composed because the operating model behind it is meant to
          be composed. The goal is professional trust that becomes stronger over time.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 sm:gap-4">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="text-sm font-medium text-white/90">{principle.title}</div>
              <p className="mt-2 text-sm leading-6 text-white/65">{principle.desc}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 sm:mt-5 sm:gap-5">
        <SectionShell className="p-6 sm:p-7">
          <SectionEyebrow>WHAT ORBITLINK IS</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            A business connectivity and infrastructure platform
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink is shaped to support business fibre, dedicated internet, managed LAN and
            Wi-Fi, voice, continuity, IoT uplinks, static routing, and broader infrastructure
            coordination. The common thread is a cleaner, more disciplined client experience.
          </p>
        </SectionShell>

        <SectionShell className="p-6 sm:p-7">
          <SectionEyebrow>WHAT ORBITLINK IS NOT</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            Not a hype-first telecom brand
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
            The brand is intentionally restrained. It is not built around exaggerated marketing,
            blanket claims, or noisy service language. It is built to feel stable,
            understandable, and commercially credible.
          </p>
        </SectionShell>
      </section>

      <section className="mt-4 rounded-3xl border border-white/10 bg-black/25 p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>CORPORATE DISCLOSURE</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Brand, governance, and public posture
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              Orbitlink is a brand of <span className="text-white/88">TIRAV Technologies Inc.</span>{" "}
              Public service posture, onboarding windows, and operational statements are expressed
              conservatively and updated as regulatory, technical, and delivery milestones are
              confirmed.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE STANDARD</div>
            <div className="mt-1 text-sm text-white/80">
              No overclaiming • Controlled rollout
            </div>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
            View Network Posture
          </a>
          <a
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Contact Orbitlink
          </a>
        </div>
      </section>
    </PageShell>
  );
}