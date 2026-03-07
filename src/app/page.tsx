// src/app/page.tsx
import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import StatusBandClient from "@/components/StatusBandClient";
import BentoServices from "@/components/BentoServices";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

import type { Metadata } from "next";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const SITE_DESC =
  "Business Fibre Internet, Managed Network Infrastructure, and Compliance-Ready Connectivity for modern enterprises in Ontario, Canada.";
const OG_TITLE = "Orbitlink — Business Fibre & Network Infrastructure";
const OG_DESC =
  "Audit-ready connectivity, enterprise fibre internet, and infrastructure-grade operations for modern businesses in Ontario.";
const TWITTER_DESC =
  "Enterprise fibre internet and audit-ready connectivity for modern operators in Ontario.";
const OG_IMAGE = `${SITE_URL}/opengraph-image.png?v=2`;

export const metadata: Metadata = {
  title: "Orbitlink",
  description: SITE_DESC,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: TWITTER_DESC,
    images: [OG_IMAGE],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/opengraph-image.png`,
    telephone: "+18888672480",
    email: "concierge@orbitlink.ca",
    areaServed: "Ontario, Canada",
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 Eglinton Ave W, Suite 400-A77",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      postalCode: "L5R 3E7",
      addressCountry: "CA",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "TIRAV Technologies Inc.",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Fibre Internet",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Managed Network Infrastructure",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TopNav />
      <StickyStatusStrip />
      <StatusBandClient />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-7 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Infrastructure-grade operations • Compliance-ready delivery
          </div>

          <h1 className="mt-6 text-[2.1rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl sm:leading-[1.05] lg:text-6xl lg:leading-[1.02]">
            Business Fibre & Audit-Ready Connectivity
            <span className="block text-white/70">
              for Modern Enterprises in Ontario
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-6 text-white/70 sm:text-lg sm:leading-7">
            Precision network services engineered for reliability, clean operations,
            and compliance-first delivery — built for modern businesses in Mississauga
            and across Ontario.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="/coming-soon"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Access
            </a>
            <a
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              View Network
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3 lg:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                RELIABILITY
              </div>
              <div className="mt-2 text-sm text-white/90">SLA-first delivery</div>
              <div className="mt-2 text-sm text-white/65">
                Designed for uptime, predictable routing, and disciplined escalation.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                OPERATIONS
              </div>
              <div className="mt-2 text-sm text-white/90">
                Network-grade visibility
              </div>
              <div className="mt-2 text-sm text-white/65">
                Telemetry that feels like a control plane — not marketing.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                COMPLIANCE
              </div>
              <div className="mt-2 text-sm text-white/90">
                Audit-ready by default
              </div>
              <div className="mt-2 text-sm text-white/65">
                Evidence-friendly workflows designed for regulators and auditors.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="hero-sentinel" className="h-2 w-full" />

      <BentoServices />
      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}