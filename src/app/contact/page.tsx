import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import PageShell from "@/components/PageShell";
import IntakeStatusBanner from "@/components/IntakeStatusBanner";
import ContactIntakeForm from "@/components/ContactIntakeForm";
import { SERVICE_CATALOG } from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc. o/a Orbitlink";
const PAGE_URL = `${SITE_URL}/contact`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";
const GENERAL_EMAIL = "concierge@orbitlink.ca";
const SALES_EMAIL = "sales@orbitlink.ca";
const SUPPORT_EMAIL = "support@orbitlink.ca";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const SERVICE_ID = `${PAGE_URL}#contact-intake`;
const FAQ_ID = `${PAGE_URL}#faq`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;

const PAGE_TITLE = "Check Availability & Pricing";
const PAGE_DESCRIPTION =
  "Check business internet availability, pricing, and service fit for your location. Fibre, dedicated connectivity, and managed networking for Ontario businesses.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Check business internet availability, pricing, and the right setup for your location.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
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
    title: PAGE_TITLE,
    description:
      "Check business internet availability, pricing, and the right setup for your location.",
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
      className={`rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:rounded-[32px] sm:p-8 lg:p-10 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.26em] text-white/55 sm:text-[11px]">
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
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-white/15 hover:bg-black/25 sm:p-5">
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
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function ContactMethod({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-[22px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/5 sm:p-5"
    >
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="mt-1 text-sm leading-6 text-white/65">{body}</div>
    </a>
  );
}

function FAQCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-white/15 hover:bg-black/25 sm:p-5">
      <h3 className="text-sm font-medium text-white/92">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-white/68">{answer}</p>
    </div>
  );
}

function buildJsonLd(moduleOptions: string[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        telephone: PHONE_E164,
        email: GENERAL_EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "30 Eglinton Ave W, Suite 400-A77",
          addressLocality: "Mississauga",
          addressRegion: "ON",
          postalCode: "L5R 3E7",
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: PHONE_E164,
            email: SALES_EMAIL,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: PAGE_URL,
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: PHONE_E164,
            email: SUPPORT_EMAIL,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: PAGE_URL,
          },
          {
            "@type": "ContactPoint",
            contactType: "general inquiries",
            telephone: PHONE_E164,
            email: GENERAL_EMAIL,
            areaServed: "CA-ON",
            availableLanguage: ["English"],
            url: PAGE_URL,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": ORG_ID,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORG_ID,
        },
        breadcrumb: {
          "@id": BREADCRUMB_ID,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Availability & Pricing Intake",
        provider: {
          "@id": ORG_ID,
        },
        url: PAGE_URL,
        audience: {
          "@type": "Audience",
          audienceType: "Business",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
        serviceType: [
          "Business Fibre Internet",
          "Dedicated Internet Access",
          "Managed LAN and Wi-Fi",
          "LTE / 5G Backup Connectivity",
          "Business Voice",
          "Address-qualified availability review",
          ...moduleOptions,
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${PAGE_URL}#intake`,
        },
        termsOfService: `${SITE_URL}/legal/terms`,
        description:
          "Availability, pricing, and service-fit intake for Ontario business connectivity requests.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
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
        "@id": FAQ_ID,
        mainEntity: [
          {
            "@type": "Question",
            name: "What should I include in my request?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Include your full business address, service type, timeline, and any important requirements such as static IPs, managed Wi-Fi, voice, or backup connectivity.",
            },
          },
          {
            "@type": "Question",
            name: "How quickly will Orbitlink review my request?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Review timing depends on the address, service type, and infrastructure complexity, but clearer requests with full address and scope are reviewed faster.",
            },
          },
          {
            "@type": "Question",
            name: "Is this page for residential service?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "This intake path is built primarily for business internet, managed networking, dedicated connectivity, and business voice requirements.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I submit a request?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink reviews address availability, infrastructure fit, provider options, and likely service match, then returns the clearest next step.",
            },
          },
        ],
      },
    ],
  };
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
        {
          label: `Call ${PHONE_DISPLAY}`,
          href: `tel:${PHONE_E164}`,
          variant: "secondary",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(moduleOptions)) }}
      />

      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="max-w-3xl">
            <SectionEyebrow>START HERE</SectionEyebrow>

            <h2 className="mt-3 text-[1.9rem] font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
              Submit your business address
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
              We review infrastructure, provider reach, and service fit, then guide you to the
              right next step for your site.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-white/62 sm:text-xs">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                Offices
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                Clinics
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                Warehouses
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                Multi-site operations
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricPill label="REVIEW MODE" value="Address and building fit" />
              <MetricPill label="COMMERCIAL GOAL" value="Clearer next step" />
              <MetricPill label="BEST RESULT" value="Full address and scope" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="intake" className="mt-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionEyebrow>SUBMIT REQUEST</SectionEyebrow>
            <h2 className="mt-3 text-[1.55rem] font-semibold tracking-tight text-white sm:text-[2rem]">
              Takes less than 60 seconds
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/68">
              Include the full service address and the type of connectivity you need for the
              fastest and most accurate review.
            </p>

            <div className="mt-6 grid gap-3">
              <InfoCard
                title="What helps most"
                body="Full address, business type, target timeline, and service need."
              />
              <InfoCard
                title="Useful technical detail"
                body="Static IPs, managed Wi-Fi, voice, backup internet, or multi-site scope."
              />
              <InfoCard
                title="What you receive"
                body="Availability guidance, pricing direction, and the clearest next step."
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mt-1">
              <Suspense fallback={null}>
                <IntakeStatusBanner />
              </Suspense>
            </div>

            <div className="mt-6">
              <ContactIntakeForm moduleOptions={moduleOptions} />
            </div>

            <p className="mt-4 text-xs leading-5 text-white/50">
              This intake is designed for business requests. Full address and service type help
              reduce review time and improve service matching.
            </p>
          </div>
        </div>
      </Section>

      <Section className="mt-4">
        <div className="max-w-3xl">
          <SectionEyebrow>WHAT HAPPENS NEXT</SectionEyebrow>

          <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
            Simple, clear process
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
            The goal is to move from enquiry to clarity without unnecessary friction.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <InfoCard
            title="1. Address review"
            body="We check building infrastructure, access conditions, and likely provider reach."
          />
          <InfoCard
            title="2. Service match"
            body="We assess fibre, dedicated internet, managed networking, voice, or backup fit."
          />
          <InfoCard
            title="3. Clear next step"
            body="You receive pricing direction, qualification feedback, or the likely install path."
          />
        </div>
      </Section>

      <Section className="mt-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>

            <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
              Prefer to speak directly?
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              Reach Orbitlink directly for business enquiries, availability review, or general
              questions about service fit.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              <ContactMethod
                href={`tel:${PHONE_E164}`}
                title={`Call ${PHONE_DISPLAY}`}
                body="Business enquiries, availability review, and general commercial questions."
              />
              <ContactMethod
                href={`mailto:${GENERAL_EMAIL}`}
                title={GENERAL_EMAIL}
                body="General enquiries and business connectivity requests."
              />
              <ContactMethod
                href={`mailto:${SALES_EMAIL}`}
                title={SALES_EMAIL}
                body="Sales discussions, service matching, and commercial follow-up."
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="mt-4">
        <div className="max-w-3xl">
          <SectionEyebrow>BUYER GUIDANCE</SectionEyebrow>

          <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
            What makes a request stronger
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
            The more clearly the site and requirement are described, the faster Orbitlink can
            return useful direction.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            title="Business address"
            body="Include the exact address so infrastructure and serviceability can be reviewed properly."
          />
          <InfoCard
            title="Site type"
            body="Office, clinic, warehouse, industrial, retail-service, or multi-site environment."
          />
          <InfoCard
            title="Service scope"
            body="Business fibre, dedicated internet, managed Wi-Fi, voice, static IPs, or backup."
          />
          <InfoCard
            title="Timing"
            body="Include move date, install deadline, or any urgency affecting the commercial path."
          />
        </div>
      </Section>

      <Section className="mt-4">
        <div className="max-w-3xl">
          <SectionEyebrow>FAQ</SectionEyebrow>

          <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
            Questions buyers ask before submitting
          </h2>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <FAQCard
            question="What should I include in my request?"
            answer="Include your full address, service type, business environment, and any requirements such as static IPs, managed Wi-Fi, voice, or backup internet."
          />
          <FAQCard
            question="Is this page for residential service?"
            answer="This intake path is designed primarily for business internet, managed networking, dedicated connectivity, and business voice requirements."
          />
          <FAQCard
            question="How quickly will Orbitlink review my request?"
            answer="Review timing depends on the address, infrastructure complexity, and service type, but stronger requests with clear scope are reviewed faster."
          />
          <FAQCard
            question="What happens after I submit?"
            answer="Orbitlink reviews the location, service fit, provider reach, and likely delivery path, then responds with the clearest next step."
          />
        </div>
      </Section>

      <Section className="mt-4 border-[#FACC15]/15 bg-[#FACC15]/[0.06]">
        <SectionEyebrow>FINAL STEP</SectionEyebrow>

        <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
          Check availability for your location
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-[15px]">
          Start with the address and the service requirement. Orbitlink will guide you to
          the right next step for the site.
        </p>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <a
            href="#intake"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability
          </a>

          <Link
            href="/services"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            View Services
          </Link>

          <Link
            href="/trust"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Trust & Compliance
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}