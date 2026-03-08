// src/app/about/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About · Orbitlink",
  description:
    "Orbitlink is a disciplined connectivity brand built for modern enterprise environments in Ontario — calm by design, reliability-first in execution, and structured for long-term trust.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About · Orbitlink",
    description:
      "A disciplined operator posture: calm, precise, reliability-first. Orbitlink is a brand of TIRAV Technologies Inc.",
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
    title: "About · Orbitlink",
    description:
      "A disciplined operator posture: calm, precise, reliability-first. Orbitlink is a brand of TIRAV Technologies Inc.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

const STORY_BLOCKS = [
  {
    label: "THE IDEA",
    text:
      "Orbitlink was created around a simple belief: business connectivity should feel calm, exact, and professionally governed. Instead of noise, we prioritize clarity. Instead of overclaiming, we prioritize evidence. Instead of a mass-market telecom experience, we design for disciplined delivery and long-term confidence.",
  },
  {
    label: "THE POSTURE",
    text:
      "Our posture is operator-minded from the beginning. That means structured onboarding, measured statements, clean escalation paths, and a visible bias toward reliability. We communicate conservatively, validate before we publish, and treat infrastructure as a trust surface — not just a product category.",
  },
  {
    label: "THE DIRECTION",
    text:
      "Orbitlink is being shaped to serve modern enterprise and business environments across Ontario with premium fibre, managed network infrastructure, and compliance-aware operations. The ambition is not to look large for the sake of appearance — it is to build something durable, credible, and respected.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Calm over noise",
    desc:
      "We avoid exaggerated language and unstable promises. The brand is designed to signal confidence through restraint, not volume.",
  },
  {
    title: "Reliability over theatrics",
    desc:
      "The real product is dependable execution: controlled change, disciplined support, and a service posture built for continuity.",
  },
  {
    title: "Evidence over assumption",
    desc:
      "Status, performance posture, and operational claims are expressed conservatively and updated when milestones are actually confirmed.",
  },
  {
    title: "Long-term trust over short-term hype",
    desc:
      "Every page, module, and delivery motion is designed to support durable credibility with clients, partners, and future regulators.",
  },
] as const;

const FOUNDATIONS = [
  {
    eyebrow: "BRAND FOUNDATION",
    title: "Built to feel institutional from day one",
    body:
      "Orbitlink is designed with the visual restraint and operating discipline of a serious infrastructure company: dark control-surface aesthetics, precise language, structured disclosure, and premium spacing that communicates authority without excess.",
  },
  {
    eyebrow: "DELIVERY MODEL",
    title: "Structured onboarding, documented delivery",
    body:
      "We introduce service through controlled intake, scoped evaluation, and measured rollout. The goal is a cleaner client experience, fewer surprises, and better alignment between promise and execution.",
  },
  {
    eyebrow: "CLIENT EXPERIENCE",
    title: "Enterprise-minded, even when engagement starts small",
    body:
      "Whether the requirement is business fibre, managed infrastructure, or a broader connectivity posture, the experience is intended to feel deliberate, premium, and professionally governed from first contact onward.",
  },
] as const;

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
      title="A disciplined connectivity brand for modern enterprise environments"
      subtitle="Orbitlink is built around a calm operator posture — reliability-first, evidence-led, and structured for long-term trust across Ontario."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            BRAND STORY
          </div>
          <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Built to make connectivity feel precise, governed, and quietly premium
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
            Orbitlink is not positioned as a loud telecom brand. It is being built
            as a modern infrastructure surface — measured in tone, intentional in
            design, and disciplined in delivery. The objective is a business
            connectivity experience that feels stable before a single circuit is ever discussed.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
            {STORY_BLOCKS.map((block) => (
              <div
                key={block.label}
                className="rounded-3xl border border-white/10 bg-black/20 p-6"
              >
                <div className="text-[11px] tracking-[0.26em] text-white/50">
                  {block.label}
                </div>
                <p className="mt-4 text-sm leading-6 text-white/70">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-5">
        {FOUNDATIONS.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7"
          >
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              {item.eyebrow}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/66 sm:text-[15px]">
              {item.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">
          OPERATING PRINCIPLES
        </div>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          The standard behind the brand
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          Orbitlink is designed to feel composed because the operating model behind
          it is meant to be composed. The goal is not short-term attention. The
          goal is professional trust that compounds over time.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 sm:gap-4">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="text-sm font-medium text-white/90">
                {principle.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              CORPORATE DISCLOSURE
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Brand, governance, and public posture
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              Orbitlink is a brand of{" "}
              <span className="text-white/88">TIRAV Technologies Inc.</span> Public
              service posture, onboarding windows, and operational statements are
              expressed conservatively and updated as regulatory, technical, and
              delivery milestones complete.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              DISCLOSURE STANDARD
            </div>
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
            href="/coming-soon"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Request Access
          </a>
        </div>
      </section>
    </PageShell>
  );
}