// src/app/contact/page.tsx
import type { Metadata } from "next";
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
  title: "Contact Orbitlink | Business Fibre, Internet & Network Services Ontario",
  description:
    "Contact Orbitlink for business fibre, dedicated internet, managed Wi-Fi, voice, continuity, and network services across Ontario. Check availability and request pricing.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact Orbitlink | Business Fibre & Network Services",
    description:
      "Check availability and request pricing for business fibre, dedicated internet, managed networks, voice, and continuity services across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Contact Orbitlink for business fibre and network services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Orbitlink | Business Fibre & Network Services",
    description:
      "Check availability and request pricing for business internet and network services across Ontario.",
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
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/72">
      {children}
    </span>
  );
}

function InfoCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.24em] text-white/55">{eyebrow}</div>
      <h2 className="mt-3 text-base font-medium text-white/92 sm:text-lg">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-white/68">{children}</div>
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
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
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
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{step}</div>
      <div className="mt-3 text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
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
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
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
              text: "Include your service address, service needed, timeline, and any important requirements such as managed Wi-Fi, voice, static IPs, continuity, or multi-site scope.",
            },
          },
          {
            "@type": "Question",
            name: "What services can I request here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can use this page for business fibre internet, dedicated internet access, managed LAN and Wi-Fi, voice, continuity, static IP routing, and related network service requests.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I submit the form?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Orbitlink reviews your request based on service fit, address, timing, and requirements, then replies with the next step.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="CONTACT"
      title="Check availability and request pricing"
      subtitle="Contact Orbitlink for business fibre, dedicated internet, managed Wi-Fi, voice, continuity, and deployment planning across Ontario."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business service intake
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Tell us the address, service, and timeline
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Use this page to check availability and request pricing. A complete request helps us
              review service fit faster and reply with the right next step.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Check availability</Pill>
              <Pill>Request pricing</Pill>
              <Pill>Business service review</Pill>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="BEST FOR" value="Business service requests" />
              <MetricPill label="SERVICES" value="Fibre, DIA, voice, managed network" />
              <MetricPill label="GOAL" value="Clear qualification" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
              <div className="text-[11px] tracking-[0.22em] text-white/55">HOW IT WORKS</div>
              <div className="mt-3 text-lg font-semibold text-white">
                Send one complete request
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                The most useful requests include the service needed, exact address, target
                timeline, and any important technical requirements.
              </p>

              <div className="mt-5 grid gap-3">
                <StepCard
                  step="STEP 1"
                  title="Choose the service"
                  text="Tell us what you need, such as fibre, dedicated internet, voice, managed Wi-Fi, or continuity."
                />
                <StepCard
                  step="STEP 2"
                  title="Add the address"
                  text="Include the exact service address and any building details that help with review."
                />
                <StepCard
                  step="STEP 3"
                  title="Add requirements"
                  text="Include timing, user count, static IPs, voice needs, managed network scope, or multi-site details if relevant."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-12">
        <div className="space-y-4 sm:space-y-5 lg:col-span-5">
          <InfoCard eyebrow="DIRECT CONTACT" title="Business sales and onboarding">
            <p>
              Use this page for business fibre internet, dedicated internet, managed network
              services, voice, continuity, address checks, and deployment planning across Ontario.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Business fibre</Pill>
              <Pill>Dedicated internet</Pill>
              <Pill>Managed Wi-Fi</Pill>
              <Pill>Voice</Pill>
              <Pill>Continuity</Pill>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT DETAILS</div>
              <div className="mt-3 space-y-2 text-sm text-white/72">
                <div>
                  Concierge: <span className="text-white/88">concierge@orbitlink.ca</span>
                </div>
                <div>
                  Sales: <span className="text-white/88">sales@orbitlink.ca</span>
                </div>
                <div>
                  Client Care: <span className="text-white/88">1-888-8-ORBIT-0</span>
                </div>
                <div>
                  Hours: <span className="text-white/88">Mon–Fri, 9AM–6PM ET</span>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard eyebrow="WHAT TO INCLUDE" title="What helps us review faster">
            <div className="grid grid-cols-1 gap-3">
              <SignalCard
                title="Service address"
                text="The exact address helps us review serviceability more accurately."
              />
              <SignalCard
                title="Service needed"
                text="Tell us whether you need fibre, dedicated internet, managed Wi-Fi, voice, continuity, or another network service."
              />
              <SignalCard
                title="Timeline and requirements"
                text="Include install timing and any important technical or operational requirements."
              />
            </div>

            <p className="mt-4 text-xs text-white/55">
              Better detail at the start usually leads to a faster and more useful reply.
            </p>
          </InfoCard>

          <InfoCard eyebrow="AFTER YOU SUBMIT" title="What happens next">
            <div className="grid grid-cols-1 gap-3">
              <StepCard
                step="REVIEW"
                title="We review your request"
                text="We look at service fit, address details, timing, and requirements."
              />
              <StepCard
                step="NEXT STEP"
                title="We identify the right path"
                text="That may be pricing direction, serviceability review, or a direct follow-up."
              />
              <StepCard
                step="RESPONSE"
                title="We keep it practical"
                text="The goal is to give you a useful next step instead of a vague reply."
              />
            </div>
          </InfoCard>
        </div>

        <div
          className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:col-span-7"
          id="intake"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/55">REQUEST FORM</div>
              <h2 className="mt-3 text-base font-medium text-white/92 sm:text-lg">
                Check availability
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                Tell us what service you need, where the site is located, and any important
                requirements.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:block">
              <div className="text-[11px] tracking-[0.22em] text-white/55">FOCUS</div>
              <div className="mt-1 text-sm text-white/80">Simple • Clear • Business-ready</div>
            </div>
          </div>

          <div className="mt-5">
            <Suspense fallback={null}>
              <IntakeStatusBanner />
            </Suspense>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">TIP</div>
              <p className="mt-2 text-sm leading-6 text-white/65">Use a work email when possible.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">TIP</div>
              <p className="mt-2 text-sm leading-6 text-white/65">Add the exact service address.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">TIP</div>
              <p className="mt-2 text-sm leading-6 text-white/65">Include timing and requirements.</p>
            </div>
          </div>

          <div className="mt-5">
            <ContactIntakeForm moduleOptions={moduleOptions} />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">REQUESTS</div>
                <div className="mt-2 text-sm text-white/80">
                  Open <span className="text-white/55">for business enquiries</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">REVIEW</div>
                <div className="mt-2 text-sm text-white/80">
                  Based on <span className="text-white/55">address, fit, and timing</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">BRAND</div>
                <div className="mt-2 text-sm text-white/80">
                  Orbitlink <span className="text-white/55">by TIRAV Technologies Inc.</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/55">
              Orbitlink is a brand of TIRAV Technologies Inc. Requests are reviewed based on
              service fit, address details, timing, and operational requirements.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}