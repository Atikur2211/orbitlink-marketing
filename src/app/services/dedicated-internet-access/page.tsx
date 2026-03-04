import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dedicated Internet Access (DIA) | Orbitlink™",
  description:
    "Dedicated Internet Access for business-critical environments with deterministic performance, structured delivery, and enterprise support posture.",
  alternates: { canonical: "/services/dedicated-internet-access" },
  openGraph: {
    title: "Dedicated Internet Access (DIA) | Orbitlink™",
    description:
      "Deterministic performance posture for business-critical environments — clear scope, structured onboarding, documented acceptance.",
    url: "https://orbitlink.ca/services/dedicated-internet-access",
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedicated Internet Access (DIA) | Orbitlink™",
    description:
      "Business-critical DIA with structured delivery posture and enterprise-minded support.",
  },
};

const FAQ = [
  {
    q: "What is Dedicated Internet Access (DIA)?",
    a: "DIA is a business internet service designed for consistent throughput and a more deterministic delivery posture. Orbitlink scopes DIA carefully and confirms feasibility per address before activation.",
  },
  {
    q: "How is DIA different from Business Fibre?",
    a: "Business Fibre is optimized for strong performance and value. DIA is used when operations require a more deterministic posture, cleaner handoff expectations, or performance requirements that broadband variance cannot support.",
  },
  {
    q: "Do you offer static IPs on DIA?",
    a: "Static IP options may be available depending on access type and location. Orbitlink confirms addressing options during onboarding.",
  },
  {
    q: "How long does install take?",
    a: "Timelines vary by building readiness and upstream coordination. Orbitlink uses structured onboarding with clear checkpoints and documented acceptance before go-live.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://orbitlink.ca/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://orbitlink.ca/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dedicated Internet Access (DIA)",
        item: "https://orbitlink.ca/services/dedicated-internet-access",
      },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dedicated Internet Access (DIA)",
    serviceType: "Dedicated Internet Access",
    provider: { "@type": "Organization", name: "Orbitlink", url: "https://orbitlink.ca" },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
    audience: { "@type": "Audience", audienceType: "Business" },
    termsOfService: "https://orbitlink.ca/legal/terms",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [breadcrumb, service, faq] };
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 sm:px-7 pt-14 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2">
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
          DIA is designed for organizations that require consistent throughput, predictable latency, and a delivery posture
          aligned with critical operations. Orbitlink approaches DIA with clear scoping, structured onboarding, and documented
          acceptance — no overclaims.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-semibold hover:bg-[#FDE047] transition"
          >
            Request DIA Assessment
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-5 sm:px-7 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main card */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
            <div className="text-[11px] tracking-[0.28em] text-white/55">DELIVERY POSTURE</div>

            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
              Built for critical operations
            </h2>

            <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
              DIA engagements are scoped with clarity: feasibility checks, constraints captured early, and an installation path
              that avoids ambiguity. Orbitlink emphasizes clean onboarding and documented acceptance before go-live.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { t: "Clear scope", d: "Confirm feasibility and constraints before activation." },
                { t: "Structured onboarding", d: "Defined checkpoints for install and acceptance." },
                { t: "Enterprise posture", d: "Escalation patterns aligned to business expectations." },
                { t: "No overclaims", d: "We confirm what’s possible at your address before committing." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold text-white/90">{x.t}</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-white/55">
              Availability, handoff options, and timelines vary by address and upstream constraints. Orbitlink confirms feasibility per building before activation.
            </div>
          </div>

          {/* Sidebar */}
          <aside className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
            <div className="text-[11px] tracking-[0.28em] text-white/55">TYPICAL FIT</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {[
                "Head offices, healthcare, logistics, and multi-site operations",
                "VoIP/contact centers and cloud-first environments",
                "Sites requiring contractual performance posture and clean handoff",
                "Environments where broadband variance is unacceptable",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">ALSO CONSIDER</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                If you don’t need deterministic posture, Business Fibre is often the right starting point with a clean upgrade path.
              </p>
              <Link
                href="/services/business-fibre-internet"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
              >
                View Business Fibre →
              </Link>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.28em] text-white/55">FAQ</div>
          <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">Dedicated Internet Access FAQs</h2>

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