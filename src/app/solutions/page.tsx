// src/app/solutions/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StickyModuleNav from "@/components/StickyModuleNav";
import { MODULE_SPECS } from "@/lib/siteStatus";

export const metadata: Metadata = {
  title: "Business Fibre & Network Solutions",
  description:
    "Business Fibre Internet, managed network infrastructure, and compliance-ready connectivity solutions for enterprises in Ontario, Canada. Controlled onboarding and operator-grade support.",
  alternates: { canonical: "https://orbitlink.ca/solutions" },
  openGraph: {
    title: "Business Fibre & Network Solutions · Orbitlink",
    description:
      "Enterprise fibre internet and infrastructure-grade network services delivered with controlled onboarding and disciplined operations.",
    url: "https://orbitlink.ca/solutions",
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: "https://orbitlink.ca/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orbitlink Business Fibre & Network Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre & Network Solutions · Orbitlink",
    description:
      "Enterprise fibre internet and compliance-ready network infrastructure in Ontario.",
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

function toneStyles(tone: "blue" | "gold" | "emerald") {
  if (tone === "blue")
    return {
      chip: "text-blue-200 bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/15",
      dot: "bg-blue-400",
      line: "from-blue-500/0 via-blue-400/35 to-blue-500/0",
      glow:
        "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_22px_70px_rgba(59,130,246,0.08)]",
    };

  if (tone === "emerald")
    return {
      chip: "text-emerald-200 bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-500/15",
      dot: "bg-emerald-400",
      line: "from-emerald-500/0 via-emerald-400/30 to-emerald-500/0",
      glow:
        "hover:shadow-[0_0_0_1px_rgba(16,185,129,0.16),0_22px_70px_rgba(16,185,129,0.08)]",
    };

  return {
    chip: "text-[#FDE68A] bg-[#FACC15]/10 border-[#FACC15]/25 hover:bg-[#FACC15]/15",
    dot: "bg-[#FACC15]",
    line: "from-[#FACC15]/0 via-[#FACC15]/35 to-[#FACC15]/0",
    glow:
      "hover:shadow-[0_0_0_1px_rgba(250,204,21,0.16),0_22px_70px_rgba(250,204,21,0.08)]",
  };
}

function SpecCard({ m }: { m: (typeof MODULE_SPECS)[number] }) {
  const s = toneStyles(m.tone);

  return (
    <section
      id={m.id}
      className={[
        "scroll-mt-[168px] md:scroll-mt-[184px]",
        "rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7",
        "transition hover:border-white/15",
        s.glow,
      ].join(" ")}
    >
      <div className="relative">
        <div className={`h-px w-full bg-gradient-to-r ${s.line}`} />

        <div className="mt-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="min-w-0">
            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1",
                "text-[11px] tracking-[0.22em]",
                s.chip,
              ].join(" ")}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              MODULE
            </div>

            <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white">{m.name}</h2>

            <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/65 max-w-3xl">
              {m.tagline}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">ONBOARDING</div>
            <div className="mt-1 text-sm text-white/80">{m.onboarding}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">PURPOSE</div>
          <p className="mt-3 text-sm leading-6 text-white/65">{m.purpose}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">IDEAL FOR</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {m.idealFor.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">DELIVERABLES</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {m.deliverables.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[0.22em] text-white/55">NEXT STEP</div>
            <div className="mt-2 text-sm text-white/70">
              Request access with your location + module + target go-live date.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/contact#intake?intent=access&source=solutions&module=${encodeURIComponent(
                m.name
              )}`}
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Request Access
            </a>
            <a
              href="/trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Trust & Compliance
            </a>
            <a
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Network Posture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const modules = MODULE_SPECS.map((m) => ({ id: m.id, name: m.name, tone: m.tone }));

  /** ✅ Authority schema graph (operator-grade, not reseller vibes) */
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      // --- Organization authority ---
      {
        "@type": "Organization",
        "@id": "https://orbitlink.ca/#org",
        name: "Orbitlink",
        url: "https://orbitlink.ca",
        logo: "https://orbitlink.ca/logo.png",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CA",
          addressRegion: "ON",
          addressLocality: "Mississauga",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@orbitlink.ca",
            areaServed: "CA-ON",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@orbitlink.ca",
            areaServed: "CA-ON",
            availableLanguage: ["English"],
          },
        ],
      },

      // --- WebSite entity (helps canonical authority) ---
      {
        "@type": "WebSite",
        "@id": "https://orbitlink.ca/#website",
        url: "https://orbitlink.ca",
        name: "Orbitlink",
        publisher: { "@id": "https://orbitlink.ca/#org" },
        inLanguage: "en-CA",
      },

      // --- WebPage entity ---
      {
        "@type": "WebPage",
        "@id": "https://orbitlink.ca/solutions#webpage",
        url: "https://orbitlink.ca/solutions",
        name: "Business Fibre & Network Solutions",
        isPartOf: { "@id": "https://orbitlink.ca/#website" },
        about: { "@type": "Thing", name: "Business fibre and network infrastructure services" },
        inLanguage: "en-CA",
      },

      // --- Breadcrumbs ---
      {
        "@type": "BreadcrumbList",
        "@id": "https://orbitlink.ca/solutions#breadcrumbs",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://orbitlink.ca/" },
          { "@type": "ListItem", position: 2, name: "Solutions", item: "https://orbitlink.ca/solutions" },
        ],
      },

      // --- TelecomService (operator/service signal) ---
      {
        "@type": "TelecomService",
        "@id": "https://orbitlink.ca/solutions#telecom",
        name: "Orbitlink Business Connectivity & Network Services",
        provider: { "@id": "https://orbitlink.ca/#org" },
        serviceType: [
          "Business Internet",
          "Fibre Connectivity",
          "Managed Network Services",
          "Operational Escalation & Support",
          "Compliance-first Delivery Posture",
        ],
        areaServed: [
          { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          { "@type": "City", name: "Mississauga" },
        ],
        audience: { "@type": "Audience", audienceType: "Business" },
        termsOfService: "https://orbitlink.ca/legal/terms",
      },

      // --- OfferCatalog (modules as real service catalog) ---
      {
        "@type": "OfferCatalog",
        "@id": "https://orbitlink.ca/solutions#catalog",
        name: "Orbitlink Service Modules",
        url: "https://orbitlink.ca/solutions",
        provider: { "@id": "https://orbitlink.ca/#org" },
        itemListElement: MODULE_SPECS.map((m) => ({
          "@type": "Offer",
          name: m.name,
          url: `https://orbitlink.ca/solutions#${m.id}`,
          itemOffered: {
            "@type": "Service",
            name: m.name,
            description: m.tagline,
            provider: { "@id": "https://orbitlink.ca/#org" },
            areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
            serviceType: "Network Service Module",
          },
        })),
      },

      // --- ItemList (discovery) ---
      {
        "@type": "ItemList",
        "@id": "https://orbitlink.ca/solutions#list",
        name: "Orbitlink Solutions List",
        url: "https://orbitlink.ca/solutions",
        itemListElement: MODULE_SPECS.map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: m.name,
          url: `https://orbitlink.ca/solutions#${m.id}`,
        })),
      },

      // --- FAQ (safe, conservative) ---
      {
        "@type": "FAQPage",
        "@id": "https://orbitlink.ca/solutions#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do onboarding windows work?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink introduces modules through controlled onboarding windows. Requests are qualified by location, scope, and readiness, and we confirm commitments only when verifiable.",
            },
          },
          {
            "@type": "Question",
            name: "Do you publish coverage or performance claims?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink avoids broad availability and performance overclaims. Public statements remain conservative and update only when milestones are confirmed.",
            },
          },
          {
            "@type": "Question",
            name: "What should I include in an access request?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Include the site location (city/province), the module you need, the target go-live date, and any constraints such as handoff type, static IP needs, or SLA requirements.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="SOLUTIONS"
      title="Service Modules"
      subtitle="Each module is delivered with controlled onboarding, clear documentation, and an operator-grade support posture."
    >
      {/* ✅ Authority Schema Pack */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div id="solutions-sentinel" className="h-px w-full" />

      <StickyModuleNav
        modules={modules}
        watchOffsetTop={72}
        watchId="solutions-sentinel"
        bottomWatchId="solutions-bottom-sentinel"
      />

      <div className="mt-6 grid gap-4 sm:gap-5">
        {MODULE_SPECS.map((m) => (
          <SpecCard key={m.id} m={m} />
        ))}
      </div>

      <div id="solutions-bottom-sentinel" className="h-px w-full" />

      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">INTEGRITY</div>
            <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/70">
              Modules are introduced through controlled onboarding windows. Public statements remain
              conservative until milestones are verified.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">Controlled rollout • Evidence-first</div>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="/contact#intake?intent=access&source=solutions_footer"
            className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
          >
            Request Access
          </a>
          <a
            href="/trust"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
          >
            Trust & Compliance
          </a>
          <a
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
          >
            Network Posture
          </a>
        </div>
      </div>
    </PageShell>
  );
}