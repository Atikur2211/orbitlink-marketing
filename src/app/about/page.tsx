// src/app/about/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About Orbitlink | Business Connectivity for Ontario",
  description:
    "Orbitlink is a business connectivity brand for Ontario organizations, focused on clear communication, structured delivery, and long-term trust.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About Orbitlink | Business Connectivity for Ontario",
    description:
      "Orbitlink is a business connectivity brand built for clear communication, structured delivery, and long-term trust.",
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
      "A business connectivity brand built for clarity, structured delivery, and long-term trust.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

const STORY_BLOCKS = [
  {
    label: "WHY ORBITLINK EXISTS",
    text:
      "Orbitlink was created to make business connectivity easier to understand, easier to buy, and easier to trust.",
  },
  {
    label: "HOW WE OPERATE",
    text:
      "We focus on clear qualification, structured onboarding, measured communication, and a cleaner service experience from first contact onward.",
  },
  {
    label: "WHERE WE ARE GOING",
    text:
      "Orbitlink is being built to support business internet, managed networks, voice, continuity, and broader infrastructure needs across Ontario.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Clear communication",
    desc:
      "Buyers should understand what fits their site, what happens next, and what to expect from the process.",
  },
  {
    title: "Structured delivery",
    desc:
      "Qualification, onboarding, and service coordination should feel organized from the beginning.",
  },
  {
    title: "Measured language",
    desc:
      "We avoid overclaiming and keep public service statements conservative and reviewable.",
  },
  {
    title: "Long-term trust",
    desc:
      "Orbitlink is designed to build durable credibility with business clients, partners, and stakeholders.",
  },
] as const;

const FOUNDATIONS = [
  {
    eyebrow: "BRAND FOUNDATION",
    title: "Built to feel serious",
    body:
      "Orbitlink is designed to read like a disciplined business infrastructure brand, not a noisy mass-market telecom site.",
  },
  {
    eyebrow: "DELIVERY MODEL",
    title: "Structured from the start",
    body:
      "Services begin with address review, scope confirmation, and a clearer path to onboarding and delivery.",
  },
  {
    eyebrow: "CLIENT EXPERIENCE",
    title: "Business-first experience",
    body:
      "The goal is a cleaner, more professional experience for organizations reviewing business connectivity.",
  },
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Clearer first impression",
    body: "Buyers quickly understand what Orbitlink is and how it operates.",
  },
  {
    title: "Stronger credibility",
    body: "The brand is positioned to feel serious, stable, and commercially ready.",
  },
  {
    title: "Better buyer fit",
    body: "The page supports organizations that expect structure and clarity.",
  },
  {
    title: "Long-term trust signal",
    body: "Orbitlink is presented as a durable business platform, not a short-term marketing surface.",
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
      title="A business connectivity brand built for clarity and trust"
      subtitle="Orbitlink is designed for Ontario organizations that want clearer communication, structured delivery, and a more professional connectivity experience."
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
          <SectionEyebrow>ABOUT ORBITLINK</SectionEyebrow>
          <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Built for business connectivity that feels clearer and more professionally run
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
            Orbitlink is built for organizations that want business connectivity with clearer
            communication, structured onboarding, and a more disciplined service experience.
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
            <MetricPill label="POSITIONING" value="Business connectivity brand" />
            <MetricPill label="OPERATING STYLE" value="Structured and measured" />
            <MetricPill label="FOCUS" value="Long-term business trust" />
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
            <SectionEyebrow>WHAT THIS SIGNALS</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              What buyers should understand about Orbitlink
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              Orbitlink is designed to feel credible, structured, and commercially clear from the
              first review.
            </p>
          </div>

          <MetricPill label="MODE" value="Clear and buyer-focused" />
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
          Orbitlink is built to feel composed because the operating model behind it is meant to be
          clear, structured, and dependable.
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
          <SectionEyebrow>WHAT ORBITLINK PROVIDES</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            Business connectivity and infrastructure services
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink is positioned to support business fibre, dedicated internet, managed Wi-Fi,
            voice, continuity, and broader connectivity requirements for Ontario organizations.
          </p>
        </SectionShell>

        <SectionShell className="p-6 sm:p-7">
          <SectionEyebrow>HOW ORBITLINK IS POSITIONED</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            A restrained and credible business brand
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink is not positioned as a hype-first telecom brand. It is designed to feel
            stable, understandable, and commercially credible.
          </p>
        </SectionShell>
      </section>

      <section className="mt-4 rounded-3xl border border-white/10 bg-black/25 p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>CORPORATE DISCLOSURE</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Brand and operating company
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              Orbitlink is a brand of <span className="text-white/88">TIRAV Technologies Inc.</span>.
              Public service statements, onboarding posture, and operational updates are presented
              conservatively and updated as milestones are confirmed.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE STANDARD</div>
            <div className="mt-1 text-sm text-white/80">
              Measured language • controlled rollout
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
            Network
          </a>
          <a
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability
          </a>
        </div>
      </section>
    </PageShell>
  );
}