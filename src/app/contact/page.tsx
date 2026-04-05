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
const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";

export const metadata: Metadata = {
  title: "Check Availability & Pricing | Orbitlink",
  description:
    "Check business internet availability, pricing, and the right setup for your location.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Check Availability & Pricing | Orbitlink",
    description:
      "Check business internet availability, pricing, and the right setup for your location.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink availability and pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Availability & Pricing | Orbitlink",
    description:
      "Check business internet availability, pricing, and the right setup for your location.",
    images: [TWITTER_IMAGE_URL],
  },
};

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`rounded-[26px] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[28px] sm:p-8 lg:p-10 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.24em] text-white/55 sm:text-[11px]">
      {children}
    </div>
  );
}

function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 sm:p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/68">{body}</p>
    </div>
  );
}

export default function ContactPage() {
  const moduleOptions = SERVICE_CATALOG.map((s) => s.publicLabel);

  return (
    <PageShell
      eyebrow="CHECK AVAILABILITY"
      title="Connectivity, engineered for your location."
      subtitle="Tell us your address and requirement. We’ll confirm availability, pricing, and the right setup."
      pills={[
        "Business-only service",
        "Address-qualified review",
        "Clear next step",
      ]}
      actions={[
        { label: "Check Availability", href: "#intake", variant: "primary" },
        { label: "Call 1-888-867-2480", href: `tel:${PHONE_E164}`, variant: "secondary" },
      ]}
    >
      {/* START */}
      <Section>
        <div className="max-w-2xl">
          <SectionEyebrow>START HERE</SectionEyebrow>

          <h2 className="mt-3 text-[1.7rem] font-semibold text-white sm:text-3xl">
            Submit your business address
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/70">
            We review infrastructure, providers, and service fit — then guide you
            to the right next step.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
            <span>✔ Offices</span>
            <span>✔ Clinics</span>
            <span>✔ Warehouses</span>
            <span>✔ Multi-site operations</span>
          </div>
        </div>
      </Section>

      {/* FORM */}
      <Section id="intake" className="mt-4">
        <div className="max-w-2xl">
          <SectionEyebrow>SUBMIT REQUEST</SectionEyebrow>
          <h2 className="mt-3 text-[1.4rem] font-semibold text-white">
            Takes less than 60 seconds
          </h2>
        </div>

        <div className="mt-5">
          <Suspense fallback={null}>
            <IntakeStatusBanner />
          </Suspense>
        </div>

        <div className="mt-6">
          <ContactIntakeForm moduleOptions={moduleOptions} />
        </div>

        <p className="mt-4 text-xs text-white/50">
          Include full address and service type for faster response.
        </p>
      </Section>

      {/* PROCESS */}
      <Section className="mt-4">
        <SectionEyebrow>WHAT HAPPENS NEXT</SectionEyebrow>

        <h2 className="mt-3 text-[1.7rem] font-semibold text-white sm:text-3xl">
          Simple, clear process
        </h2>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <InfoCard
            title="1. Address review"
            body="We check building infrastructure and available providers."
          />
          <InfoCard
            title="2. Service match"
            body="Fibre, dedicated internet, Wi-Fi, voice, or backup."
          />
          <InfoCard
            title="3. Clear next step"
            body="You get pricing direction or install path."
          />
        </div>
      </Section>

      {/* CONTACT */}
      <Section className="mt-4">
        <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>

        <h2 className="mt-3 text-[1.7rem] font-semibold text-white sm:text-3xl">
          Prefer to speak directly?
        </h2>

        <div className="mt-5 space-y-3">
          <a
            href={`tel:${PHONE_E164}`}
            className="block rounded-[22px] border border-white/10 bg-black/20 p-4 hover:bg-white/5"
          >
            <div className="text-sm font-medium text-white">
              Call {PHONE_DISPLAY}
            </div>
            <div className="text-sm text-white/65">
              Business enquiries and availability
            </div>
          </a>

          <a
            href="mailto:concierge@orbitlink.ca"
            className="block rounded-[22px] border border-white/10 bg-black/20 p-4 hover:bg-white/5"
          >
            <div className="text-sm font-medium text-white">
              concierge@orbitlink.ca
            </div>
            <div className="text-sm text-white/65">
              General enquiries
            </div>
          </a>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="mt-4">
        <SectionEyebrow>FINAL STEP</SectionEyebrow>

        <h2 className="mt-3 text-[1.7rem] font-semibold text-white sm:text-3xl">
          Check availability for your location
        </h2>

        <div className="mt-6 grid gap-3 sm:flex">
          <a
            href="#intake"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black hover:bg-[#FDE047]"
          >
            Check Availability
          </a>

          <Link
            href="/services"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
          >
            View Services
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}