import TrackedLink from "@/components/TrackedLink";
import type { Metadata } from "next";
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

const PAGE_TITLE = "Check Business Internet Availability & Pricing";
const PAGE_DESCRIPTION =
  "Check business internet availability and pricing for your Ontario location. Fibre, dedicated internet, managed Wi-Fi, voice, static IPs, and backup connectivity.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Check business internet availability and pricing for your Ontario location.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet availability and pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Check business internet availability and pricing for your Ontario location.",
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
      className={`rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:rounded-[32px] sm:p-8 lg:p-10 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/55 sm:text-[11px]">
      {children}
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 sm:p-5">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/68">{body}</p>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/48">
        {label}
      </div>
      <div className="mt-1 text-sm text-white/84">{value}</div>
    </div>
  );
}

function TrustPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/72 sm:text-xs">
      {children}
    </span>
  );
}

function ContactMethod({
  href,
  title,
  body,
  cta,
}: {
  href: string;
  title: string;
  body: string;
  cta?: string;
}) {
  const eventName = href.startsWith("mailto:")
    ? "email_click"
    : href.startsWith("tel:")
      ? "phone_click"
      : "contact_link_click";

  return (
    <TrackedLink
      href={href}
      eventName={eventName}
      location="contact_page"
      cta={cta}
      className="block rounded-[22px] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/5 sm:p-5"
    >
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="mt-1 text-sm leading-6 text-white/65">{body}</div>
    </TrackedLink>
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
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 sm:p-5">
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
        publisher: { "@id": ORG_ID },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        inLanguage: "en-CA",
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Business Internet Availability & Pricing Intake",
        provider: { "@id": ORG_ID },
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
          "Static IP Business Internet",
          "Address-qualified availability review",
          ...moduleOptions,
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${PAGE_URL}#intake`,
        },
        termsOfService: `${SITE_URL}/legal/terms`,
        description:
          "Address-based availability, pricing, and service-fit intake for Ontario business connectivity requests.",
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
            name: "What do I get after submitting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Orbitlink reviews your business address and service need, then replies with availability direction, pricing guidance, or the clearest next step.",
            },
          },
          {
            "@type": "Question",
            name: "Is there any obligation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The intake is a business connectivity review with no obligation and no sales pressure.",
            },
          },
          {
            "@type": "Question",
            name: "Is this for residential internet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This intake is for business internet, dedicated connectivity, managed networking, backup internet, and business voice.",
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
      eyebrow="BUSINESS INTERNET CHECK"
      title="Check Business Internet Availability at Your Address"
      subtitle="See what is actually available at your location before choosing a provider."
      pills={["30-second intake", "No obligation", "Business-only review"]}
      actions={[
        {
          label: "Check Availability & Pricing",
          href: "#intake",
          variant: "primary",
        },
        {
          label: `Call ${PHONE_DISPLAY}`,
          href: `tel:${PHONE_E164}`,
          variant: "secondary",
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(moduleOptions)),
        }}
      />

      <Section className="relative overflow-hidden border-[#FACC15]/15 bg-[#FACC15]/[0.045]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[30rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionEyebrow>START HERE</SectionEyebrow>

            <h2 className="mt-3 text-[2rem] font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.05]">
              Check what’s available before you commit.
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/72 sm:text-[15px]">
              Submit your business address and service need. We review your
              location and reply with the clearest connectivity path.
            </p>

            <div className="mt-5 grid gap-2 text-sm text-white/76">
              <div>✓ Fibre, dedicated internet, backup, and managed network options</div>
              <div>✓ Availability and pricing direction for your location</div>
              <div>✓ No contracts, no obligation, no sales pressure</div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <TrustPill>Business fibre</TrustPill>
              <TrustPill>DIA</TrustPill>
              <TrustPill>Managed Wi-Fi</TrustPill>
              <TrustPill>Backup internet</TrustPill>
              <TrustPill>Static IPs</TrustPill>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <MetricPill label="TIME" value="~30 seconds" />
              <MetricPill label="REVIEW" value="Address-first" />
              <MetricPill label="REPLY" value="~1 business day" />
            </div>

            <div className="mt-6 rounded-[24px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FDE68A]">
                Priority review
              </div>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Limited intake volume — priority responses for current Ontario
                business requests.
              </p>
            </div>

            <div className="mt-4 text-xs leading-5 text-white/48">
              Built for offices, clinics, warehouses, multi-site operators, and
              commercial locations that need stable business connectivity.
            </div>
          </div>

          <div id="intake" className="lg:col-span-7">
            <div className="rounded-[28px] border border-white/10 bg-[#070B10]/80 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-6">
              <div className="mb-4">
                <SectionEyebrow>30-SECOND BUSINESS INTAKE</SectionEyebrow>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Get availability and pricing direction
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/64">
                  No technical knowledge required. Add your address, service
                  need, and timeline.
                </p>
              </div>

              <Suspense fallback={null}>
                <IntakeStatusBanner />
              </Suspense>

              <ContactIntakeForm moduleOptions={moduleOptions} />

              <div className="mt-4 rounded-[22px] border border-white/10 bg-black/20 p-4 text-xs leading-5 text-white/55">
                No obligation. No residential sales flow. Your request is
                reviewed for business connectivity fit.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="mt-4">
        <div className="max-w-3xl">
          <SectionEyebrow>WHY THIS MATTERS</SectionEyebrow>

          <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
            Avoid choosing the wrong internet setup.
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
            Business internet availability depends on the address, building,
            provider path, install timing, and service type. Orbitlink helps you
            review the correct path before you buy.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <InfoCard
            title="Address-first review"
            body="We check your location first instead of pushing generic packages."
          />
          <InfoCard
            title="Right-fit connectivity"
            body="Fibre, DIA, backup, voice, managed Wi-Fi, and static IP needs can be matched properly."
          />
          <InfoCard
            title="Clear next step"
            body="You get availability direction, pricing guidance, or the cleanest action to move forward."
          />
        </div>
      </Section>

      <Section className="mt-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>

            <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
              Prefer to speak with someone?
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              Call or email for availability, pricing, service options, or a
              commercial review.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              <ContactMethod
                href={`tel:${PHONE_E164}`}
                title={`Call ${PHONE_DISPLAY}`}
                body="Business enquiries, pricing, and availability."
                cta="direct_phone"
              />
              <ContactMethod
                href={`mailto:${GENERAL_EMAIL}`}
                title={GENERAL_EMAIL}
                body="General business connectivity enquiries."
                cta="direct_concierge_email"
              />
              <ContactMethod
                href={`mailto:${SALES_EMAIL}`}
                title={SALES_EMAIL}
                body="Sales discussions and commercial follow-up."
                cta="direct_sales_email"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="mt-4">
        <div className="max-w-3xl">
          <SectionEyebrow>FAQ</SectionEyebrow>

          <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
            Before you submit
          </h2>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <FAQCard
            question="What do I get after submitting?"
            answer="You receive availability direction, pricing guidance, or the clearest next step based on your business address."
          />
          <FAQCard
            question="Is there any obligation?"
            answer="No. This is a business connectivity review with no obligation and no sales pressure."
          />
          <FAQCard
            question="Is this for residential internet?"
            answer="No. This intake is for business internet, dedicated connectivity, managed networking, backup internet, and business voice."
          />
          <FAQCard
            question="How fast is the review?"
            answer="Clear requests with a full business address usually receive direction faster, often within about one business day."
          />
        </div>
      </Section>

      <Section className="mt-4 border-[#FACC15]/15 bg-[#FACC15]/[0.06] text-center">
        <SectionEyebrow>FINAL STEP</SectionEyebrow>

        <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-white sm:text-3xl">
          Check availability for your business location
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-[15px]">
          Submit your address and service need. Orbitlink will review likely
          service fit, availability, and pricing direction.
        </p>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
          <TrackedLink
            href="#intake"
            eventName="quote_cta_click"
            location="contact_page"
            cta="final_check_availability"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability & Pricing
          </TrackedLink>

          <TrackedLink
            href={`tel:${PHONE_E164}`}
            eventName="phone_click"
            location="contact_page"
            cta="final_phone_cta"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Call {PHONE_DISPLAY}
          </TrackedLink>
        </div>

        <div className="mt-3 text-xs text-white/60">
          Fast response • No obligation • Business-only
        </div>
      </Section>
    </PageShell>
  );
}