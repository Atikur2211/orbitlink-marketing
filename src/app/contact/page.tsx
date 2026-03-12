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
  title: "Contact Orbitlink | Business Fibre, Dedicated Internet & Network Services",
  description:
    "Check availability and request pricing for Orbitlink business fibre internet, dedicated internet access, managed Wi-Fi, voice, continuity, and network services across Ontario.",
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
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
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
    <div className={["rounded-[30px] border border-white/10 bg-white/[0.035]", className].join(" ")}>
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/45">{children}</div>;
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

function SignalCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-[11px] tracking-[0.22em] text-white/50">{step}</div>
      <div className="mt-3 text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/64">{text}</p>
    </div>
  );
}

function ContactCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Surface className="p-6 sm:p-7">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-white/66">{children}</div>
    </Surface>
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
      subtitle="Business fibre, dedicated internet, managed Wi-Fi, voice, continuity, and deployment planning across Ontario."
      pills={["Business service intake", "Address-qualified review", "Pricing and fit"]}
      actions={[
        { label: "Check Availability", href: "#intake", variant: "primary" },
        { label: "View Services", href: "/services", variant: "secondary" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Commercial intake
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              One clear request.
              <span className="block text-white/62">A faster business answer.</span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Share the address, service, and timeline. Orbitlink reviews fit, availability, and
              commercial next steps with a cleaner operator-grade intake path.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Check availability</Pill>
              <Pill>Request pricing</Pill>
              <Pill>Business-grade qualification</Pill>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="BEST FOR" value="Ontario business enquiries" />
              <MetricPill label="SERVICES" value="Fibre • DIA • Voice • Managed Network" />
              <MetricPill label="GOAL" value="Clear fit and next step" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[30px] border border-white/10 bg-black/25 p-6">
              <SectionEyebrow>HOW TO SUBMIT</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold text-white">Make the first request count</h2>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The strongest requests include the exact site, service type, timeline, and any
                technical requirements that matter operationally.
              </p>

              <div className="mt-5 grid gap-3">
                <StepCard
                  step="STEP 1"
                  title="Select the service"
                  text="Business fibre, dedicated internet, managed Wi-Fi, voice, continuity, or another network need."
                />
                <StepCard
                  step="STEP 2"
                  title="Add the site"
                  text="Use the exact service address and include building details when relevant."
                />
                <StepCard
                  step="STEP 3"
                  title="Add real requirements"
                  text="Timing, user count, static IPs, voice, managed network scope, continuity, or multi-site needs."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <ContactCard eyebrow="DIRECT CONTACT" title="Business sales and onboarding">
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

            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-5">
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
          </ContactCard>

          <ContactCard eyebrow="WHAT TO INCLUDE" title="What improves review quality">
            <div className="grid grid-cols-1 gap-3">
              <SignalCard
                title="Exact service address"
                text="The precise address gives the cleanest path into serviceability review."
              />
              <SignalCard
                title="Service type"
                text="Tell us whether this is fibre, DIA, managed Wi-Fi, voice, continuity, or a broader network requirement."
              />
              <SignalCard
                title="Timing and scope"
                text="Include target timing and the operational details that affect the design or commercial path."
              />
            </div>

            <p className="mt-4 text-xs text-white/55">
              Better detail up front usually produces a faster and more useful answer.
            </p>
          </ContactCard>

          <ContactCard eyebrow="AFTER SUBMISSION" title="What happens next">
            <div className="grid grid-cols-1 gap-3">
              <StepCard
                step="REVIEW"
                title="We assess fit"
                text="We review service type, address, timing, and operating requirements."
              />
              <StepCard
                step="NEXT STEP"
                title="We define the path"
                text="That may mean pricing direction, serviceability review, or a more specific commercial follow-up."
              />
              <StepCard
                step="RESPONSE"
                title="We keep it practical"
                text="The goal is a useful next step, not a generic acknowledgement."
              />
            </div>
          </ContactCard>
        </div>

        <div
          id="intake"
          className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:col-span-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionEyebrow>REQUEST FORM</SectionEyebrow>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                Check availability
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                Submit one clear business request with the service, address, and operational
                requirements that matter.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:block">
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
              <p className="mt-2 text-sm leading-6 text-white/65">Include the exact service address.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">TIP</div>
              <p className="mt-2 text-sm leading-6 text-white/65">Add timing and technical needs.</p>
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