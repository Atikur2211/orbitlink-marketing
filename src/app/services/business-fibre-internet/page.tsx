import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/services/business-fibre-internet";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const ORG_ID = `${SITE_URL}/#org`;

export const metadata: Metadata = {
  title: "Business Fibre Internet | Orbitlink™",
  description:
    "Business fibre internet for Ontario organizations with structured onboarding, disciplined delivery, and documented acceptance. Availability confirmed per address.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Business Fibre Internet | Orbitlink™",
    description:
      "Operator-grade business fibre internet with clear scoping, structured onboarding, and a premium support posture across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet | Orbitlink™",
    description:
      "Business fibre internet with structured onboarding, disciplined delivery, and availability confirmed per address.",
  },
};

const FAQ = [
  {
    q: "Do you offer business fibre internet in Ontario?",
    a: "Yes. Orbitlink offers business fibre internet across Ontario where building and upstream feasibility support deployment. Availability is confirmed per address and building, not assumed universally.",
  },
  {
    q: "Do you offer business fibre internet in Mississauga?",
    a: "Yes. Mississauga is a priority commercial market for Orbitlink. Fibre availability depends on building infrastructure, access feasibility, and service design, and is confirmed during onboarding.",
  },
  {
    q: "Is Orbitlink fibre symmetrical?",
    a: "Where the access method supports it, Orbitlink may offer symmetrical tiers under AUREX Internet, subject to site feasibility and service design.",
  },
  {
    q: "What is the difference between business fibre internet and Dedicated Internet Access?",
    a: "Business fibre internet is typically the right fit for most office, clinic, studio, and SMB environments that need strong capacity and stable operations. Dedicated Internet Access is better suited to business-critical environments requiring more deterministic delivery posture and clearer handoff expectations.",
  },
  {
    q: "How do I check fibre availability?",
    a: "Use the Orbitlink intake form and include your address, business type, expected go-live date, and any requirements such as static IPs, voice, managed Wi-Fi, or continuity. Orbitlink will confirm feasibility and next steps.",
  },
  {
    q: "Do you offer static IPs with business fibre internet?",
    a: "Static IP options may be available depending on service design, access method, and site feasibility. Orbitlink confirms availability during onboarding.",
  },
] as const;

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Business Fibre Internet", item: PAGE_URL },
    ],
  };

  const telecomService = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#service`,
    name: "Business Fibre Internet",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario" },
      { "@type": "City", name: "Mississauga" },
    ],
    serviceType: [
      "Business Fibre Internet",
      "Operator-grade connectivity",
      "Structured onboarding",
      "Documented acceptance",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: PAGE_URL,
    },
  };

  const faqPage = {
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

  return [breadcrumb, telecomService, faqPage];
}

const typicalFit = [
  "SMB offices, studios, clinics, and multi-tenant suites",
  "Cloud apps, collaboration platforms, VoIP, VPN, and day-to-day operations",
  "Organizations upgrading from cable or DSL variability",
  "Sites that want a clean onboarding path with future upgrade flexibility",
] as const;

const advantages = [
  "Structured onboarding with feasibility confirmed before activation",
  "Clear scoping instead of vague blanket availability claims",
  "Documented delivery and acceptance posture",
  "Premium support experience aligned to business operations",
  "Upgrade path toward DIA or managed network architecture when required",
] as const;

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">AUREX Internet</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Business Fibre Internet
        </h1>

        <p className="mt-4 max-w-3xl text-white/70 text-base md:text-lg leading-relaxed">
          AUREX Business Fibre is designed for organizations that need high-capacity connectivity
          with a disciplined delivery posture. Orbitlink confirms availability per address, scopes
          building constraints before activation, and delivers with documented acceptance.
        </p>

        <p className="mt-4 max-w-3xl text-white/65 text-base leading-relaxed">
          This service is ideal for Ontario businesses that want a premium business internet
          experience without overclaiming. Where fibre feasibility exists, Orbitlink aligns the
          right access method, support posture, and onboarding sequence for the site.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Availability confirmed per address",
            "Structured onboarding",
            "Documented acceptance",
            "Business-grade posture",
            "Ontario service footprint",
          ].map((x) => (
            <span
              key={x}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
            >
              {x}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Check Fibre Availability
          </Link>
          <Link
            href="/locations/mississauga"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Mississauga Service Area
          </Link>
        </div>
      </section>

      {/* Main sections */}
      <section className="mx-auto max-w-5xl px-6 pb-10 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Built for real business operations
          </h2>

          <div className="mt-4 space-y-4 text-white/70 leading-relaxed">
            <p>
              Business fibre internet is often the right fit for modern offices, professional
              services, medical environments, creative teams, and growing organizations that rely on
              cloud platforms, video collaboration, VoIP, and business applications throughout the
              day.
            </p>

            <p>
              Orbitlink’s approach is not “generic gigabit everywhere.” We confirm serviceability,
              align the correct access design, and keep onboarding structured so customers know what
              is feasible, what is included, and what happens next.
            </p>

            <p>
              This creates a cleaner activation experience and gives organizations a better path to
              future upgrades if requirements expand toward DIA, managed LAN, enterprise Wi-Fi,
              continuity design, or static IP posture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-lg font-semibold tracking-tight">Typical fit</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {typicalFit.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-lg font-semibold tracking-tight">Why Orbitlink posture matters</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {advantages.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">Common business use cases</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Primary office internet for daily operations",
              "Business internet for cloud apps and VoIP",
              "Upgrade path from unstable cable or DSL",
              "Foundation layer before moving to DIA",
              "Internet backbone for managed office Wi-Fi",
              "Professional environments that need premium support posture",
            ].map((x) => (
              <div
                key={x}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="text-[11px] tracking-[0.26em] text-white/55">NEED DIA?</div>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">
            When to choose Dedicated Internet Access instead
          </h2>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            If your environment requires deterministic delivery posture, clearer handoff
            expectations, business-critical uptime alignment, or a more formal enterprise internet
            framework, Dedicated Internet Access may be the better fit.
          </p>
          <Link
            href="/services/dedicated-internet-access"
            className="mt-4 inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            View Dedicated Internet Access →
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-lg font-semibold tracking-tight">Local relevance</h2>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Orbitlink prioritizes Ontario business connectivity with structured onboarding and
            clear serviceability confirmation. For local commercial demand, start with our{" "}
            <Link
              href="/locations/mississauga"
              className="text-white/85 hover:text-white underline underline-offset-4"
            >
              Mississauga business fibre internet page
            </Link>{" "}
            or request availability directly.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/locations/mississauga"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Mississauga Location Page
            </Link>
            <Link
              href="/internet-near-me"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Internet Near Me
            </Link>
          </div>
        </div>

        <p className="text-xs text-white/55">
          Availability, architecture, and optional features vary by building infrastructure and
          serviceability. Orbitlink confirms feasibility per address — no overclaims.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Business Fibre Internet FAQs
          </h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">
            These answers reflect a practical delivery posture: clear scoping, building-based
            feasibility, and a premium operator experience.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              Explore Services
            </Link>
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Check Fibre Availability
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}