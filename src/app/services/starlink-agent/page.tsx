import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/starlink-agent";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Starlink Access (Agent / Reseller) | Orbitlink™",
  description:
    "Starlink connectivity coordination through an agent/reseller model for locations where terrestrial fibre or wired access is limited. Orbitlink clarifies use-cases, constraints, and onboarding posture.",
  alternates: { canonical: PAGE_URL },

  openGraph: {
    title: "Starlink Access (Agent / Reseller) | Orbitlink™",
    description:
      "Satellite connectivity coordination for environments where terrestrial connectivity is constrained. Feasibility review and structured onboarding.",
    url: PAGE_URL,
    siteName: "Orbitlink",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Orbitlink Starlink Access",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Starlink Access | Orbitlink™",
    description:
      "Satellite connectivity coordination through an agent/reseller model where terrestrial options are limited.",
    images: [TWITTER_IMAGE],
  },
};

const USE_CASES = [
  {
    title: "Remote locations",
    desc: "Sites outside fibre or cable coverage where terrestrial connectivity cannot be provisioned within a reasonable timeframe.",
  },
  {
    title: "Temporary operations",
    desc: "Construction sites, temporary offices, and field environments that require rapid internet availability.",
  },
  {
    title: "Continuity scenarios",
    desc: "Secondary connectivity path where terrestrial links serve as primary infrastructure.",
  },
  {
    title: "Edge deployments",
    desc: "Operational environments such as monitoring sites, remote sensors, or infrastructure control systems.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Starlink Access Coordination",
    serviceType: "Satellite Internet Coordination",
    provider: {
      "@type": "Organization",
      name: "Orbitlink",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ontario, Canada",
    },
    url: PAGE_URL,
  };

  return (
    <div className="relative">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-16">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Agent Services
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Starlink Access Coordination
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
            Orbitlink can assist organizations with Starlink procurement and
            onboarding through an agent or reseller model. This is primarily
            used where terrestrial infrastructure such as fibre or dedicated
            internet access cannot be deployed within the required timeline.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Satellite connectivity coordination",
              "Feasibility review",
              "Clear deployment expectations",
              "Continuity scenarios",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">

            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-6 py-3 text-sm font-semibold text-black hover:bg-[#FDE047] transition"
            >
              Discuss Feasibility
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Back to Services
            </Link>

          </div>

        </div>
      </section>

      {/* USE CASES */}
      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8">

          <div className="text-[11px] tracking-[0.28em] text-white/45">
            WHEN THIS MAKES SENSE
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Satellite connectivity in specific scenarios
          </h2>

          <p className="mt-3 text-white/70 max-w-3xl text-sm leading-relaxed">
            Satellite connectivity should be considered in situations where
            terrestrial access is unavailable or impractical. Orbitlink focuses
            on clarifying operational requirements before recommending this
            deployment path.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            {USE_CASES.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-black/20 p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* ENTERPRISE NOTE */}

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-7">

          <div className="text-[11px] tracking-[0.28em] text-white/45">
            POSITIONING NOTE
          </div>

          <h3 className="mt-3 text-xl font-semibold">
            Not a terrestrial operator service
          </h3>

          <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-3xl">
            Starlink connectivity differs significantly from terrestrial
            infrastructure such as fibre or dedicated internet access. Orbitlink
            clarifies deployment constraints, performance expectations, and
            operational differences before recommending this solution.
          </p>

        </div>

      </section>
    </div>
  );
}