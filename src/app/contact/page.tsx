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
  title:
    "Contact Orbitlink | Business Availability, Pricing & Commercial Service Review",
  description:
    "Submit a business fibre, dedicated internet, managed Wi-Fi, voice, continuity, or network service request for your Ontario business location. Check availability, request pricing, and receive the right commercial next step.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Contact Orbitlink | Business Availability, Pricing & Commercial Service Review",
    description:
      "Check availability, request pricing, and submit business connectivity enquiries for Ontario commercial locations.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Contact Orbitlink for business fibre, dedicated internet, and managed network services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Orbitlink | Business Connectivity Intake",
    description:
      "Submit a business connectivity request for fibre, dedicated internet, managed Wi-Fi, voice, and continuity services across Ontario.",
    images: [TWITTER_IMAGE_URL],
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
    <div
      className={[
        "rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-sm sm:rounded-[32px]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.28em] text-white/45 sm:text-[11px]">
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
      <div className="text-[10px] tracking-[0.22em] text-white/50 sm:text-[11px]">
        {label}
      </div>
      <div className="mt-1 text-sm leading-5 text-white/82">{value}</div>
    </div>
  );
}

function SignalCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[24px]">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/64">{text}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[24px]">
      <div className="text-[10px] tracking-[0.22em] text-white/50 sm:text-[11px]">
        {step}
      </div>
      <div className="mt-3 text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/64">{text}</p>
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
        legalName: "TIRAV Technologies Inc.",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        brand: { "@type": "Brand", name: "Orbitlink" },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@orbitlink.ca",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+18888672480",
            email: "concierge@orbitlink.ca",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
          {
            "@type": "ContactPoint",
            contactType: "compliance",
            email: "regulatory@tirav.com",
            availableLanguage: ["English"],
            areaServed: "CA-ON",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "30 Eglinton Ave W, Suite 400-A77",
          addressLocality: "Mississauga",
          addressRegion: "ON",
          postalCode: "L5R 3E7",
          addressCountry: "CA",
        },
      },
      {
        "@type": "ContactPage",
        "@id": `${PAGE_URL}#contact-page`,
        url: PAGE_URL,
        name: "Contact Orbitlink",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Orbitlink",
          url: SITE_URL,
        },
        about: { "@id": `${SITE_URL}/#org` },
        primaryImageOfPage: OG_IMAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What should I include in my request?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Include your exact service address, the service needed, your timeline, and any important requirements such as managed Wi-Fi, voice, static IPs, continuity, or multi-site scope.",
            },
          },
          {
            "@type": "Question",
            name: "What services can I request here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can use this page for business fibre internet, dedicated internet access, managed LAN and Wi-Fi, voice, continuity, static IP routing, IoT connectivity, and related network service requests.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I submit the form?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Orbitlink reviews your request based on service fit, address, timing, and requirements, then replies with the next useful commercial step.",
            },
          },
          {
            "@type": "Question",
            name: "Is this page for residential service?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This intake path is designed for business and commercial connectivity enquiries.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="CONTACT"
      title="Check availability and submit your business request"
      subtitle="Business fibre, dedicated internet, managed Wi-Fi, voice, continuity, and infrastructure enquiries for Ontario commercial locations."
      pills={[
        "Business-only service intake",
        "Address-based review",
        "Clear commercial next step",
      ]}
      actions={[
        { label: "Start Request", href: "#intake", variant: "primary" },
        { label: "View Services", href: "/services", variant: "secondary" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:rounded-[34px] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business service intake
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Start with the site and the service you need
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Submit your business address, the service you need, and your timing.
              Orbitlink reviews availability, service fit, and the next useful commercial step.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Business fibre</Pill>
              <Pill>Dedicated internet</Pill>
              <Pill>Managed Wi-Fi</Pill>
              <Pill>Voice</Pill>
              <Pill>Continuity</Pill>
              <Pill>Infrastructure</Pill>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="BEST FOR" value="Ontario business enquiries" />
              <MetricPill label="REVIEW BASIS" value="Address • Fit • Timing" />
              <MetricPill label="OUTCOME" value="Clear next step" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 sm:rounded-[30px] sm:p-6">
              <SectionEyebrow>HOW TO SUBMIT</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold text-white">
                Keep it simple
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The best requests include the exact address, the main service need,
                and any timing or technical detail that matters.
              </p>

              <div className="mt-5 grid gap-3">
                <StepCard
                  step="STEP 1"
                  title="Choose the service"
                  text="Business fibre, dedicated internet, managed Wi-Fi, voice, continuity, or another network need."
                />
                <StepCard
                  step="STEP 2"
                  title="Add the address"
                  text="Use the exact service address so the site can be reviewed properly."
                />
                <StepCard
                  step="STEP 3"
                  title="Add what matters"
                  text="Timeline, user count, static IPs, continuity, voice, or multi-site details."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[24px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SignalCard
              title="Business-only intake"
              text="This form is for commercial connectivity and network service requests."
            />
            <SignalCard
              title="Ontario-focused"
              text="Requests are reviewed for Ontario business addresses, buildings, and service fit."
            />
            <SignalCard
              title="Clear operating entity"
              text="Orbitlink is operated by TIRAV Technologies Inc. for stronger buyer confidence."
            />
            <SignalCard
              title="Practical response"
              text="The goal is a useful next step, not a generic acknowledgement."
            />
          </div>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <Surface className="p-5 sm:p-7">
            <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
              Business connectivity enquiries
            </h2>

            <div className="mt-4 text-sm leading-6 text-white/66">
              Use this page for business fibre internet, dedicated internet access,
              managed Wi-Fi, voice, continuity, static IP routing, IoT, and related
              network service enquiries across Ontario.
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Business fibre</Pill>
              <Pill>Dedicated internet</Pill>
              <Pill>Managed Wi-Fi</Pill>
              <Pill>Voice</Pill>
              <Pill>Continuity</Pill>
              <Pill>Infrastructure</Pill>
            </div>

            <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-5 sm:rounded-[24px]">
              <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                DIRECT CONTACT
              </div>
              <div className="mt-3 space-y-2 text-sm text-white/72">
                <div>
                  Concierge: <span className="text-white/88">concierge@orbitlink.ca</span>
                </div>
                <div>
                  Sales: <span className="text-white/88">sales@orbitlink.ca</span>
                </div>
                <div>
                  Client Care: <span className="text-white/88">1-888-867-2480</span>
                </div>
                <div>
                  Hours: <span className="text-white/88">Mon–Fri, 9AM–6PM ET</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-white/55">
                Best results come from submitting the exact address, required
                service, and timing.
              </p>
            </div>
          </Surface>

          <Surface className="p-5 sm:p-7">
            <SectionEyebrow>WHAT TO INCLUDE</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
              What helps us review your request
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <SignalCard
                title="Exact service address"
                text="The full service address is the most important detail for availability and site-fit review."
              />
              <SignalCard
                title="Required service"
                text="Tell us whether the request is for business fibre, dedicated internet, managed Wi-Fi, voice, continuity, infrastructure, or another network need."
              />
              <SignalCard
                title="Timeline and technical detail"
                text="Add timing, user count, static IP needs, voice requirements, continuity expectations, or multi-site scope when relevant."
              />
            </div>

            <p className="mt-4 text-xs text-white/55">
              Better detail up front usually produces a faster and more useful response.
            </p>
          </Surface>

          <Surface className="p-5 sm:p-7">
            <SectionEyebrow>AFTER SUBMISSION</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
              What happens next
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <StepCard
                step="REVIEW"
                title="We review the request"
                text="We assess the service type, address, timing, and business requirements provided."
              />
              <StepCard
                step="QUALIFICATION"
                title="We determine the path"
                text="That may include serviceability review, pricing direction, or a more specific commercial follow-up."
              />
              <StepCard
                step="RESPONSE"
                title="We return a useful next step"
                text="The objective is a practical answer that helps you move toward the right service or deployment path."
              />
            </div>
          </Surface>
        </div>

        <div
          id="intake"
          className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:rounded-[32px] sm:p-7 lg:col-span-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionEyebrow>REQUEST FORM</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                Submit your business request
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                Use the form below to request availability review, pricing direction,
                or the next commercial step for your site.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:block">
              <div className="text-[11px] tracking-[0.22em] text-white/55">FOCUS</div>
              <div className="mt-1 text-sm text-white/80">
                Ontario commercial intake
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Suspense fallback={null}>
              <IntakeStatusBanner />
            </Suspense>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                BEST PRACTICE
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Use the exact business address.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                BEST PRACTICE
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Add timing and important requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                BEST PRACTICE
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Use a work email when possible.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ContactIntakeForm moduleOptions={moduleOptions} />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                  INTAKE TYPE
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Business-only <span className="text-white/55">commercial enquiries</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                  REVIEW BASIS
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Address, fit, and timing <span className="text-white/55">for the site</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[10px] tracking-[0.22em] text-white/55 sm:text-[11px]">
                  OPERATING ENTITY
                </div>
                <div className="mt-2 text-sm text-white/80">
                  TIRAV Technologies Inc. <span className="text-white/55">o/a Orbitlink</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/55">
              Orbitlink is a brand of TIRAV Technologies Inc. Requests are reviewed
              based on service fit, address details, timing, and operational requirements.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-5">
        <Surface className="p-5 sm:p-7">
          <SectionEyebrow>FREQUENTLY ASKED QUESTIONS</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
            Questions buyers often ask before submitting
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <SignalCard
              title="What should I include in my request?"
              text="Include the exact service address, the service you need, your timeline, and any technical requirements such as voice, static IPs, continuity, or multi-site scope."
            />
            <SignalCard
              title="What services can I request here?"
              text="You can use this page for business fibre internet, dedicated internet access, managed LAN and Wi-Fi, voice, continuity, static IP routing, IoT connectivity, and related network service requests."
            />
            <SignalCard
              title="What happens after I submit the form?"
              text="Orbitlink reviews your request based on service fit, address, timing, and requirements, then replies with the next useful commercial step."
            />
            <SignalCard
              title="Is this page for residential service?"
              text="No. This intake path is designed for business and commercial connectivity enquiries."
            />
          </div>
        </Surface>
      </section>
    </PageShell>
  );
}