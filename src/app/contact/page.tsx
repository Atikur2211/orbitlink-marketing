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
  title: "Contact Orbitlink | Check Availability & Request Pricing",
  description:
    "Check availability, request pricing, and submit business fibre, dedicated internet, managed Wi-Fi, voice, backup connectivity, and network service requests for Ontario business locations.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact Orbitlink | Check Availability & Request Pricing",
    description:
      "Submit a request for business fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity for Ontario business sites.",
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

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[28px] border border-white/10 bg-white/[0.04] ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-[10px] tracking-[0.28em] text-white/45">
      {children}
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
      <div className="text-[10px] tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
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
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
      <div className="font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/70">{body}</p>
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
      eyebrow="CONTACT"
      title="Check availability for your business location"
      subtitle="Submit your address and requirements. Orbitlink confirms availability, matches the right service, and guides the next step clearly."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <Surface className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionEyebrow>BUSINESS CONNECTIVITY REQUEST</SectionEyebrow>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[40px] lg:leading-[1.04]">
              Tell us your address and service requirement
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
              Orbitlink reviews business fibre, dedicated internet, managed Wi-Fi,
              voice, backup connectivity, and related network requirements for Ontario
              business locations. Start with the address, what you need, and your
              timing. The next step stays clear.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
              Every request is reviewed by address, building condition, and business
              requirements before moving forward. That helps reduce confusion and keeps
              the buying path more structured.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Business fibre</Pill>
              <Pill>Dedicated internet</Pill>
              <Pill>Managed Wi-Fi</Pill>
              <Pill>Voice</Pill>
              <Pill>Backup internet</Pill>
              <Pill>Ontario business locations</Pill>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability
              </a>

              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Call {PHONE_DISPLAY}
              </a>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                View Services
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MetricPill label="BEST FOR" value="Ontario businesses" />
              <MetricPill label="CHECKED BY" value="Address and building fit" />
              <MetricPill label="YOU GET" value="Availability + next step" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <SectionEyebrow>QUICK SUMMARY</SectionEyebrow>
              <div className="mt-3 text-lg font-semibold text-white">
                What to include for the fastest review
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The best requests include the service address, service type, business
                use case, and preferred timing. That helps Orbitlink confirm the right
                direction faster.
              </p>

              <div className="mt-5 grid gap-3">
                <MetricPill label="INCLUDE" value="Full address" />
                <MetricPill label="INCLUDE" value="Service required" />
                <MetricPill label="INCLUDE" value="Timing or go-live target" />
              </div>
            </div>
          </div>
        </div>
      </Surface>

      <Surface id="intake" className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <SectionEyebrow>SUBMIT YOUR REQUEST</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Start your availability review
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
            Fill out the form below to check availability, request pricing direction,
            and move toward the right service path for your business location.
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
          Best results: include the full service address, service type, company name,
          and timing. Business-only requests.
        </p>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <SectionEyebrow>WHAT HAPPENS NEXT</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            A clear path after you submit
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
            Orbitlink is designed to make the next step easy to understand.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoCard
            title="1. Availability review"
            body="The address, building context, and access conditions are reviewed first."
          />
          <InfoCard
            title="2. Service matching"
            body="The request is aligned to business fibre, dedicated internet, managed Wi-Fi, voice, or backup requirements."
          />
          <InfoCard
            title="3. Clear next step"
            body="You receive pricing direction, feasibility guidance, or the recommended deployment path."
          />
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <SectionEyebrow>WHY THIS CONTACT PAGE WORKS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Built for higher-intent business buyers
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              This page is designed to reduce friction. The buyer knows what to do,
              what to include, and what happens after submission.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MetricPill label="CLARITY" value="Simple request flow" />
              <MetricPill label="TRUST" value="Address-based review" />
              <MetricPill label="FIT" value="Business-only" />
              <MetricPill label="OUTCOME" value="Clear next step" />
            </div>
          </div>

          <div>
            <SectionEyebrow>COMMON REQUEST TYPES</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              What buyers usually ask for
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <InfoCard
                title="Business fibre availability"
                body="Primary internet for offices, clinics, studios, and commercial locations."
              />
              <InfoCard
                title="Dedicated internet review"
                body="Higher-assurance connectivity for business-critical environments."
              />
              <InfoCard
                title="Wi-Fi, voice, and continuity"
                body="Managed Wi-Fi, business voice, backup internet, and upgrade planning around the primary connection."
              />
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Speak directly
            </h2>

            <div className="mt-5 space-y-3">
              <a
                href={`tel:${PHONE_E164}`}
                className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/30"
              >
                <div className="text-sm font-medium text-white/90">
                  Call {PHONE_DISPLAY}
                </div>
                <div className="mt-1 text-sm text-white/65">
                  Business enquiries and availability requests
                </div>
              </a>

              <a
                href="mailto:concierge@orbitlink.ca"
                className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/30"
              >
                <div className="text-sm font-medium text-white/90">
                  concierge@orbitlink.ca
                </div>
                <div className="mt-1 text-sm text-white/65">
                  General business connectivity enquiries
                </div>
              </a>

              <a
                href="mailto:sales@orbitlink.ca"
                className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/30"
              >
                <div className="text-sm font-medium text-white/90">
                  sales@orbitlink.ca
                </div>
                <div className="mt-1 text-sm text-white/65">
                  Pricing and service review enquiries
                </div>
              </a>

              <div className="text-sm text-white/55">
                Hours: Monday to Friday, 9:00 AM to 6:00 PM
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow>BEFORE YOU SUBMIT</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Best results come from better details
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <InfoCard
                title="Service address"
                body="Include the full building or unit address so availability can be reviewed properly."
              />
              <InfoCard
                title="Service type"
                body="Business fibre, dedicated internet, managed Wi-Fi, voice, backup connectivity, or multi-service review."
              />
              <InfoCard
                title="Timing and business use"
                body="Include your go-live timing, current provider situation, and what the service needs to support."
              />
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Common questions
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
            Clear answers for business buyers before they submit a request.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoCard
            title="What should I include?"
            body="Include the address, required service, company name, and timing for the best review."
          />
          <InfoCard
            title="What happens after I submit?"
            body="Orbitlink reviews the request and guides the next step, including availability, pricing direction, or service fit."
          />
          <InfoCard
            title="Is this for business only?"
            body="Yes. This intake is designed for Ontario business locations and commercial connectivity requirements."
          />
          <InfoCard
            title="Can I ask about more than one service?"
            body="Yes. You can request fibre, dedicated internet, Wi-Fi, voice, and backup connectivity together."
          />
        </div>
      </Surface>

      <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>FINAL CTA</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Ready to check availability?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              Start with your address and requirements. Orbitlink will guide the next
              step clearly, whether that is availability, pricing, or the right service direction.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </a>
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </Surface>
    </PageShell>
  );
}