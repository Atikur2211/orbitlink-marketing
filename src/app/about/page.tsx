import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc. o/a Orbitlink";
const PAGE_URL = `${SITE_URL}/about`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ABOUTPAGE_ID = `${PAGE_URL}#aboutpage`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;

const PAGE_TITLE = "About Orbitlink";
const PAGE_DESCRIPTION =
  "About Orbitlink, a business connectivity brand for Ontario organizations. Fibre, dedicated internet, managed networking, and structured delivery.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Orbitlink is a business connectivity brand built for Ontario organizations that value clarity, structured delivery, and long-term trust.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "About Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "A business connectivity brand built for clarity, structured delivery, and long-term trust.",
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

const STORY_BLOCKS = [
  {
    label: "WHY ORBITLINK EXISTS",
    text:
      "Orbitlink was created because too many business buyers still face an unclear telecom experience: generic claims, rushed sales language, inconsistent qualification, and too little confidence before commitment.",
  },
  {
    label: "WHAT WE ARE BUILDING",
    text:
      "We are building a business connectivity platform for Ontario organizations that want clearer service matching, more disciplined communication, and a more accountable commercial path from first contact onward.",
  },
  {
    label: "WHAT MAKES THE APPROACH DIFFERENT",
    text:
      "Orbitlink is designed to feel structured from the start. Availability is reviewed by address and site fit. Service language is kept measured. The goal is not noise. The goal is credibility.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Clarity before commitment",
    desc:
      "Buyers should understand service fit, likely next steps, and commercial direction before they are pushed into a decision.",
  },
  {
    title: "Structured delivery",
    desc:
      "Qualification, onboarding, escalation, and follow-through should feel organized, calm, and business-ready.",
  },
  {
    title: "Measured public language",
    desc:
      "Orbitlink avoids overclaiming. Public statements are intended to remain supportable, reviewable, and commercially credible.",
  },
  {
    title: "Long-term trust over short-term hype",
    desc:
      "We are building for durable relationships with business clients, landlords, partners, and future infrastructure stakeholders.",
  },
] as const;

const FOUNDATIONS = [
  {
    eyebrow: "BRAND FOUNDATION",
    title: "Built to feel serious from day one",
    body:
      "Orbitlink is intentionally positioned as a premium business infrastructure brand. The presentation, language, and buyer path are designed to feel calmer, clearer, and more commercially credible than generic telecom marketing.",
  },
  {
    eyebrow: "OPERATING FOUNDATION",
    title: "Built around discipline, not volume",
    body:
      "The model starts with qualified requests, clearer service fit, and more structured onboarding. That creates a better experience for serious buyers and a stronger base for long-term growth.",
  },
  {
    eyebrow: "MARKET FOUNDATION",
    title: "Built for Ontario first",
    body:
      "Orbitlink is focused on Ontario business demand: offices, clinics, warehouses, multi-site organizations, and commercial buildings that need better connectivity decisions and cleaner commercial follow-through.",
  },
] as const;

const FUTURE_PATH = [
  {
    title: "Phase 1 — Build trust through service clarity",
    body:
      "The first phase is simple: win through better buyer experience, clearer qualification, more disciplined onboarding, and stronger business trust across Ontario markets.",
  },
  {
    title: "Phase 2 — Expand operational depth",
    body:
      "As the base grows, Orbitlink expands deeper into managed networking, continuity services, business voice, static IP requirements, and more advanced commercial infrastructure support.",
  },
  {
    title: "Phase 3 — Strengthen infrastructure posture",
    body:
      "Longer term, the path is toward stronger operating identity, broader network coordination, and a more infrastructure-led business platform for Ontario organizations.",
  },
  {
    title: "Phase 4 — Become a durable Ontario business brand",
    body:
      "The long-term goal is not to look big quickly. It is to become a trusted, reviewable, and respected business connectivity name that can grow responsibly across the province.",
  },
] as const;

const FOUNDER_PATH = [
  {
    title: "Founder-led and deliberate",
    body:
      "Orbitlink is being built with a deliberate founder-led mindset: move carefully, communicate clearly, and earn trust before scale.",
  },
  {
    title: "Capital-efficient growth logic",
    body:
      "The growth model is designed around disciplined execution, commercial validation, and measured expansion rather than oversized promises or premature complexity.",
  },
  {
    title: "Ontario business first",
    body:
      "The near-term focus remains Ontario businesses with real demand, real service needs, and real reasons to value a better provider experience.",
  },
  {
    title: "Built to become infrastructure-grade over time",
    body:
      "The long-term ambition is to evolve from a premium business connectivity brand into a stronger infrastructure-led operating platform with deeper network presence and more durable market credibility.",
  },
] as const;

const BUSINESS_OUTCOMES = [
  {
    title: "Clearer first impression",
    body:
      "Buyers quickly understand what Orbitlink is, who it serves, and how it intends to operate.",
  },
  {
    title: "Stronger commercial credibility",
    body:
      "The brand is positioned to feel measured, serious, and structurally more trustworthy to business stakeholders.",
  },
  {
    title: "Better Ontario market fit",
    body:
      "The story is anchored in real business demand across Ontario rather than generic telecom positioning.",
  },
  {
    title: "A stronger long-term signal",
    body:
      "Orbitlink is presented as something being built carefully for the future, not just marketed for the moment.",
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
    <section
      className={`rounded-[32px] border border-white/10 bg-white/[0.045] ${className}`}
    >
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

function StoryCard({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
      <div className="text-[11px] tracking-[0.26em] text-white/50">{label}</div>
      <p className="mt-4 text-sm leading-6 text-white/70">{text}</p>
    </div>
  );
}

function InfoCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <SectionShell className="p-6 sm:p-7">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/66 sm:text-[15px]">{body}</p>
    </SectionShell>
  );
}

function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
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
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@orbitlink.ca",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@orbitlink.ca",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: {
          "@id": ORG_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "AboutPage",
        "@id": ABOUTPAGE_ID,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        breadcrumb: {
          "@id": BREADCRUMB_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
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
            name: "About",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="ABOUT"
      title="A business connectivity brand built for clarity, trust, and long-term Ontario growth"
      subtitle="Orbitlink is being built for Ontario organizations that want clearer communication, structured delivery, and a more credible path for business connectivity and network infrastructure."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />

      <SectionShell className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <SectionEyebrow>ABOUT ORBITLINK</SectionEyebrow>
          <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
            Built to make business connectivity easier to understand, easier to trust, and stronger over time
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
            Orbitlink is being built for a simple reason: many Ontario businesses still face a telecom
            experience that feels unclear, generic, and harder to trust than it should be.
            We believe business connectivity should feel more structured, more professional,
            and more aligned to real operating needs.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
            {STORY_BLOCKS.map((block) => (
              <StoryCard key={block.label} label={block.label} text={block.text} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="POSITIONING" value="Business connectivity brand" />
            <MetricPill label="OPERATING STYLE" value="Structured and measured" />
            <MetricPill label="LONG-TERM AIM" value="Ontario infrastructure platform" />
          </div>
        </div>
      </SectionShell>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 sm:mt-5 sm:gap-5">
        {FOUNDATIONS.map((item) => (
          <InfoCard
            key={item.title}
            eyebrow={item.eyebrow}
            title={item.title}
            body={item.body}
          />
        ))}
      </section>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>THE STORY</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              The problem Orbitlink is solving
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              Many organizations do not struggle only with internet service itself. They struggle with
              the way connectivity is explained, sold, qualified, and supported. Orbitlink exists to improve
              that experience by making business connectivity feel clearer, more disciplined, and more useful
              to buyers from the first interaction onward.
            </p>
          </div>

          <MetricPill label="PROBLEM WE SOLVE" value="Clarity and trust in telecom buying" />
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
          Orbitlink is designed to feel composed because the operating model behind it is meant to be
          clear, disciplined, and dependable.
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

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>ONTARIO FOCUS</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Built for Ontario business demand
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              Orbitlink is focused on Ontario because that is where the immediate opportunity is strongest:
              professional offices, clinics, warehouses, multi-site organizations, and commercial buildings
              that need better internet decisions and a more business-ready provider experience.
            </p>
          </div>

          <MetricPill label="MARKET" value="Ontario business connectivity" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">What Ontario businesses need</div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Better service fit, better communication, cleaner onboarding, stronger trust, and a provider
              that feels more accountable from the beginning.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">Why the market matters</div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Ontario has dense commercial demand, strong business search intent, and many environments
              where connectivity decisions directly affect operations, service delivery, and growth.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <SectionEyebrow>FUTURE PATH</SectionEyebrow>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          Where Orbitlink is going
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          The long-term path is intentional: begin with a strong business-facing service layer,
          earn trust through disciplined execution, then deepen operational capability over time.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {FUTURE_PATH.map((item) => (
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
        <SectionEyebrow>FOUNDER-LED PATH</SectionEyebrow>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          Built deliberately, with long-term discipline
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          Orbitlink is being built with a founder-led mindset that prioritizes credibility,
          commercial realism, and measured growth. The objective is not to appear bigger than reality.
          The objective is to build something durable enough to deserve long-term trust.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {FOUNDER_PATH.map((item) => (
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

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 sm:mt-5 sm:gap-5">
        <InfoCard
          eyebrow="WHAT ORBITLINK PROVIDES"
          title="Business connectivity and infrastructure services"
          body="Orbitlink is positioned to support business fibre, dedicated internet, managed Wi-Fi, voice, continuity, and broader connectivity requirements for Ontario organizations."
        />

        <InfoCard
          eyebrow="HOW ORBITLINK IS POSITIONED"
          title="A restrained and credible business brand"
          body="Orbitlink is not positioned as a hype-first telecom brand. It is designed to feel stable, understandable, commercially credible, and increasingly infrastructure-minded over time."
        />
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
          <Link
            href="/trust"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Trust & Compliance
          </Link>
          <Link
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Network
          </Link>
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability
          </Link>
        </div>
      </section>
    </PageShell>
  );
}