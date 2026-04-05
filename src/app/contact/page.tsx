// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import PageShell from "@/components/PageShell";
import IntakeStatusBanner from "@/components/IntakeStatusBanner";
import ContactIntakeForm from "@/components/ContactIntakeForm";
import { SERVICE_CATALOG } from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/contact`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Contact Orbitlink | Check Availability & Request Pricing",
  description:
    "Check availability, request pricing, and submit business fibre, dedicated internet, managed Wi-Fi, voice, backup connectivity, and network service requests for Ontario business locations.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact Orbitlink | Check Availability & Request Pricing",
    description:
      "Submit a request for business fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Contact Orbitlink for business internet and network services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Orbitlink | Business Connectivity Request",
    description:
      "Check availability and request pricing for business internet and network services.",
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70 sm:text-xs">
      {children}
    </span>
  );
}

function Surface({ children, className = "" }: any) {
  return (
    <div className={`rounded-[28px] border border-white/10 bg-white/[0.04] ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: any) {
  return (
    <div className="text-[10px] tracking-[0.28em] text-white/45">
      {children}
    </div>
  );
}

function MetricPill({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[10px] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

export default function ContactPage() {
  const moduleOptions = SERVICE_CATALOG.map((s) => s.publicLabel);

  return (
    <PageShell
      eyebrow="CONTACT"
      title="Check availability for your business location"
      subtitle="Tell us your address and what you need. We confirm availability and guide the next step."
      pills={[
        "Business-only requests",
        "Availability checked by address",
        "Clear next step",
      ]}
      actions={[
        { label: "Check Availability", href: "#intake", variant: "primary" },
        { label: "View Services", href: "/services", variant: "secondary" },
      ]}
    >
      {/* HERO */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold">
          Tell us your address and service need
        </h2>

        <p className="mt-3 text-white/70 max-w-2xl">
          Submit your business address, required service, and timing.
          We check what is available and guide you to the right setup.
        </p>

        <div className="mt-6 flex gap-2 flex-wrap">
          <Pill>Business fibre</Pill>
          <Pill>Dedicated internet</Pill>
          <Pill>Managed Wi-Fi</Pill>
          <Pill>Voice</Pill>
          <Pill>Backup internet</Pill>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricPill label="BEST FOR" value="Ontario businesses" />
          <MetricPill label="CHECKED BY" value="Address and building" />
          <MetricPill label="YOU GET" value="Availability + next step" />
        </div>
      </section>

      {/* FORM */}
      <section id="intake" className="p-6">
        <h2 className="text-xl font-semibold">Submit your request</h2>

        <p className="mt-2 text-white/70">
          Fill out the form to check availability and get the next step.
        </p>

        <div className="mt-4">
          <Suspense fallback={null}>
            <IntakeStatusBanner />
          </Suspense>
        </div>

        <div className="mt-6">
          <ContactIntakeForm moduleOptions={moduleOptions} />
        </div>

        <p className="mt-4 text-xs text-white/50">
          Best results: include full address, service type, and timing.
        </p>
      </section>

      {/* WHAT HAPPENS */}
      <section className="p-6">
        <h2 className="text-xl font-semibold">What happens next</h2>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="border border-white/10 p-4 rounded-xl">
            <div className="font-medium">1. We check availability</div>
            <p className="text-sm text-white/70 mt-2">
              Based on your address and building.
            </p>
          </div>

          <div className="border border-white/10 p-4 rounded-xl">
            <div className="font-medium">2. We match the service</div>
            <p className="text-sm text-white/70 mt-2">
              Fibre, dedicated internet, or backup.
            </p>
          </div>

          <div className="border border-white/10 p-4 rounded-xl">
            <div className="font-medium">3. You get next steps</div>
            <p className="text-sm text-white/70 mt-2">
              Pricing direction or deployment path.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="p-6">
        <h2 className="text-xl font-semibold">Direct contact</h2>

        <div className="mt-4 text-white/70 space-y-2">
          <div>📧 concierge@orbitlink.ca</div>
          <div>📧 sales@orbitlink.ca</div>
          <div>📞 1-888-867-2480</div>
          <div>Hours: Mon–Fri 9AM–6PM</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="p-6">
        <h2 className="text-xl font-semibold">FAQ</h2>

        <div className="mt-4 grid md:grid-cols-2 gap-4 text-white/70">
          <div>
            <strong>What should I include?</strong>
            <p>Address, service type, and timing.</p>
          </div>

          <div>
            <strong>What happens after?</strong>
            <p>We review and guide the next step.</p>
          </div>

          <div>
            <strong>Is this for business?</strong>
            <p>Yes, business locations only.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}