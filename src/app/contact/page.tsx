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
  title: "Check Availability & Pricing | Orbitlink Business Internet",
  description:
    "Tell us your business address. We’ll check availability, pricing, and the best internet option for your location.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Check Availability & Pricing | Orbitlink Business Internet",
    description:
      "Tell us your business address. We’ll check availability, pricing, and the best internet option for your location.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink contact page for business internet availability and pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Availability & Pricing | Orbitlink Business Internet",
    description:
      "Tell us your business address. We’ll check availability, pricing, and the best internet option for your location.",
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
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
    <div className="text-[10px] tracking-[0.24em] text-white/55 sm:text-[11px] sm:tracking-[0.26em]">
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
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 sm:rounded-2xl sm:p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/68">{body}</p>
    </div>
  );
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
      <div className="text-[10px] tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

export default function ContactPage() {
  const moduleOptions = SERVICE_CATALOG.map((s) => s.publicLabel);

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Orbitlink",
        url: SITE_URL,
        telephone: PHONE_E164,
        email: "concierge@orbitlink.ca",
        brand: { "@type": "Brand", name: "Orbitlink" },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Contact Orbitlink",
        description:
          "Check availability and request pricing for business internet and network services.",
        about: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "ContactPage",
        url: PAGE_URL,
        name: "Contact Orbitlink",
      },
    ],
  };

  return (
    <PageShell
      eyebrow="CHECK AVAILABILITY"
      title="Tell us your address. We’ll check what’s available."
      subtitle="Business fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity — matched to your location."
      pills={[
        "Business-only service",
        "Address-based review",
        "Clear next step",
      ]}
      actions={[
        { label: "Check Availability", href: "#intake", variant: "primary" },
        { label: "Call Now", href: `tel:${PHONE_E164}`, variant: "secondary" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <Section>
        <div className="max-w-2xl">
          <SectionEyebrow>START HERE</SectionEyebrow>
          <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-white sm:text-3xl">
            Start your availability check
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
            Enter your business address and what you need. We’ll confirm
            availability, pricing direction, and the best setup for your location.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-white/60 sm:text-xs">
            <span>✔ Offices</span>
            <span>✔ Clinics</span>
            <span>✔ Warehouses</span>
            <span>✔ Multi-location businesses</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3">
          <MetricPill label="CHECKED BY" value="Address and building fit" />
          <MetricPill label="BEST FOR" value="Ontario business locations" />
          <MetricPill label="YOU GET" value="Availability + next step" />
        </div>
      </Section>

      <Section id="intake" className="mt-4 sm:mt-6">
        <div className="max-w-2xl">
          <SectionEyebrow>SUBMIT YOUR REQUEST</SectionEyebrow>
          <h2 className="mt-3 text-[1.4rem] font-semibold tracking-tight text-white sm:text-2xl">
            Enter your details
          </h2>

          <p className="mt-2 text-sm text-white/65">
            Takes less than 60 seconds.
          </p>
        </div>

        <div className="mt-5">
          <Suspense fallback={null}>
            <IntakeStatusBanner />
          </Suspense>
        </div>

        <div className="mt-6">
          <ContactIntakeForm moduleOptions={moduleOptions} />
        </div>

        <p className="mt-4 text-xs leading-5 text-white/50">
          Tip: Include full address and service type for faster response.
        </p>
      </Section>

      <Section className="mt-4 sm:mt-6">
        <div className="max-w-3xl">
          <SectionEyebrow>WHAT HAPPENS NEXT</SectionEyebrow>
          <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-white sm:text-3xl">
            What happens next
          </h2>
        </div>

        <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
          <InfoCard
            title="1. We check your address"
            body="Available providers, building access, and infrastructure are reviewed first."
          />
          <InfoCard
            title="2. Match the right service"
            body="We align the request to fibre, dedicated internet, Wi-Fi, voice, or backup connectivity."
          />
          <InfoCard
            title="3. You get next steps"
            body="You receive pricing direction, availability guidance, or the recommended install path."
          />
        </div>
      </Section>

      <Section className="mt-4 sm:mt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>
            <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-white sm:text-3xl">
              Prefer to speak directly?
            </h2>

            <div className="mt-5 space-y-3">
              <a
                href={`tel:${PHONE_E164}`}
                className="block rounded-[22px] border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
              >
                <div className="text-sm font-medium text-white/92">
                  Call {PHONE_DISPLAY}
                </div>
                <div className="mt-1 text-sm text-white/65">
                  Business enquiries and availability requests
                </div>
              </a>

              <a
                href="mailto:concierge@orbitlink.ca"
                className="block rounded-[22px] border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
              >
                <div className="text-sm font-medium text-white/92">
                  concierge@orbitlink.ca
                </div>
                <div className="mt-1 text-sm text-white/65">
                  General business connectivity enquiries
                </div>
              </a>
            </div>
          </div>

          <div>
            <SectionEyebrow>WHAT TO INCLUDE</SectionEyebrow>
            <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-white sm:text-3xl">
              Best results come from better details
            </h2>

            <div className="mt-5 grid gap-3">
              <InfoCard
                title="Full business address"
                body="Include the full address so availability can be checked properly."
              />
              <InfoCard
                title="Service type"
                body="Tell us whether you need fibre, dedicated internet, Wi-Fi, voice, backup, or more than one service."
              />
              <InfoCard
                title="Timing"
                body="Share your target install date, upgrade need, or current service issue if relevant."
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="mt-4 sm:mt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>FINAL CTA</SectionEyebrow>
            <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-white sm:text-3xl">
              Ready to check availability?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Submit your address and we’ll guide the next step clearly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-row sm:gap-3">
            <a
              href="#intake"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </a>

            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}