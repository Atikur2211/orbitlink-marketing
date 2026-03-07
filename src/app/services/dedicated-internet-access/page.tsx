import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/dedicated-internet-access";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

export const metadata: Metadata = {
  title: "Dedicated Internet Access (DIA) | Orbitlink™",
  description:
    "Dedicated Internet Access for Ontario organizations requiring deterministic performance posture, structured onboarding, documented acceptance, and enterprise-grade support.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Dedicated Internet Access (DIA) | Orbitlink™",
    description:
      "Business-critical DIA with deterministic posture, clear scoping, structured onboarding, and documented delivery across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedicated Internet Access (DIA) | Orbitlink™",
    description:
      "Business-critical Dedicated Internet Access with enterprise delivery posture and structured onboarding.",
  },
};

const FAQ = [
  {
    q: "What is Dedicated Internet Access (DIA)?",
    a: "Dedicated Internet Access is a business internet service designed for organizations that require a more deterministic delivery posture, clearer handoff expectations, and performance alignment suitable for critical operations. Orbitlink scopes DIA per address and confirms feasibility before activation.",
  },
  {
    q: "How is DIA different from Business Fibre?",
    a: "Business Fibre is often the right fit for offices and day-to-day operations that need strong capacity and stable performance. DIA is better suited to organizations that require more deterministic throughput posture, business-critical alignment, or a clearer enterprise handoff model.",
  },
  {
    q: "Do you offer DIA in Mississauga?",
    a: "Yes. Orbitlink can evaluate Dedicated Internet Access opportunities in Mississauga and other Ontario markets, subject to building readiness, access feasibility, and upstream design.",
  },
  {
    q: "Do you offer static IPs on DIA?",
    a: "Static IP options may be available depending on the access design and location. Orbitlink confirms addressing and related technical options during onboarding.",
  },
  {
    q: "How long does DIA installation take?",
    a: "Install timelines vary by building readiness, landlord access, and upstream coordination. Orbitlink uses structured onboarding with clear checkpoints and documented acceptance before go-live.",
  },
  {
    q: "When should a business choose DIA?",
    a: "DIA is appropriate when broadband variance is unacceptable, when uptime posture matters to operations, or when the organization needs a cleaner enterprise-grade access design for critical applications, voice, cloud, or multi-site connectivity.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dedicated Internet Access (DIA)",
        item: PAGE_URL,
      },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Dedicated Internet Access (DIA)",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario" },
      { "@type": "City", name: "Mississauga" },
    ],
    serviceType: [
      "Dedicated Internet Access",
      "Business-critical connectivity",
      "Enterprise internet service",
      "Deterministic access posture",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Business",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: PAGE_URL,
    },
    termsOfService: `${SITE_URL}/legal/terms`,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return [breadcrumb, telecomService, faq];
}

const fitItems = [
  "Head offices, healthcare, logistics, and multi-site operations",
  "VoIP, contact centers, cloud-first environments, and critical workflows",
  "Sites requiring clearer handoff expectations and enterprise-grade posture",
  "Environments where broadband variance is operationally unacceptable",
] as const;

const postureItems = [
  {
    title: "Clear scope",
    desc: "Feasibility and constraints are confirmed before activation.",
  },
  {
    title: "Structured onboarding",
    desc: "Defined checkpoints guide installation and acceptance.",
  },
  {
    title: "Enterprise posture",
    desc: "Escalation patterns align with business expectations and operational impact.",
  },
  {
    title: "No overclaims",
    desc: "Orbitlink confirms what is possible per building before commitment.",
  },
] as const;

const useCases = [
  "Primary access for business-critical applications",
  "Clean enterprise handoff posture for sensitive environments",
  "Cloud, voice, VPN, and multi-site business connectivity",
  "Operational environments where downtime posture matters",
  "High-value sites requiring disciplined onboarding and support",
  "Organizations planning premium network architecture around core internet access",
] as const;

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 sm:px-7 pt-14 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            <span className="text-sm tracking-wide text-white/60">AUREX Internet</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Deterministic posture
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Structured onboarding
            </span>
          </div>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Dedicated Internet Access (DIA)
        </h1>

        <p className="mt-4 max-w-3xl text-white/70 text-base md:text-lg leading-relaxed">
          DIA is designed for organizations that require a more deterministic internet posture,
          predictable operational alignment, and a delivery model suitable for critical business
          environments. Orbitlink approaches DIA with clear scoping, structured onboarding, and
          documented acceptance.
        </p>

        <p className="mt-4 max-w-3xl text-white/65 text-base leading-relaxed">
          This is the right fit when access design is not just about speed, but about operational
          clarity, cleaner expectations, and a support posture that matches the importance of the
          site.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-semibold hover:bg-[#FDE047] transition"
          >
            Request DIA Assessment
          </Link>

          <Link
            href="/locations/mississauga"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Mississauga Service Area
          </Link>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-5 sm:px-7 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
              <div className="text-[11px] tracking-[0.28em] text-white/55">DELIVERY POSTURE</div>

              <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
                Built for business-critical environments
              </h2>

              <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
                DIA engagements are scoped with clarity: feasibility checks, building constraints,
                access path design, and installation sequencing are addressed before activation.
                Orbitlink keeps onboarding structured so there is less ambiguity during delivery and
                cleaner alignment before go-live.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {postureItems.map((x) => (
                  <div key={x.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-sm font-semibold text-white/90">{x.title}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xs text-white/55">
                Availability, handoff options, routing posture, and timelines vary by address and
                upstream feasibility. Orbitlink confirms what is actually possible before activation.
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Typical use cases for DIA
              </h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {useCases.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm text-white/70 leading-relaxed">
                DIA is often selected when a site supports important applications, voice, secure
                connectivity, or operations where generic broadband posture is not sufficient.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6 sm:p-7">
              <div className="text-[11px] tracking-[0.22em] text-white/55">BUSINESS FIBRE VS DIA</div>
              <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
                When to choose Business Fibre instead
              </h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                If your organization needs strong capacity, stable business internet, and a premium
                onboarding posture without the more specialized requirements of DIA, Business Fibre
                is often the right starting point. Orbitlink keeps that path clean and allows room
                for future upgrades where requirements evolve.
              </p>
              <Link
                href="/services/business-fibre-internet"
                className="mt-4 inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
              >
                View Business Fibre →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
              <div className="text-[11px] tracking-[0.28em] text-white/55">TYPICAL FIT</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {fitItems.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">LOCAL RELEVANCE</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Orbitlink evaluates DIA opportunities across Ontario, including Mississauga and
                other business-dense commercial markets where serviceability and delivery posture
                support the site.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/locations/mississauga"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
                >
                  Mississauga DIA Context
                </Link>
                <Link
                  href="/internet-near-me"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
                >
                  Internet Near Me
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
              <div className="text-[11px] tracking-[0.28em] text-white/55">NEXT STEP</div>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Request a DIA assessment and include your address, go-live target, uptime posture,
                voice/network requirements, and whether static IPs or managed services are needed.
              </p>
              <Link
                href="/contact#intake"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#FACC15] text-black px-4 py-2.5 text-sm font-semibold hover:bg-[#FDE047] transition"
              >
                Request DIA Assessment
              </Link>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">FAQ</div>
          <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
            Dedicated Internet Access FAQs
          </h2>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="text-sm font-semibold text-white/90">{f.q}</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-semibold hover:bg-[#FDE047] transition"
            >
              Request DIA Assessment
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Browse Locations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}