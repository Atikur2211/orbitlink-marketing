import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/contact/thank-you";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";

export const metadata: Metadata = {
  title: "Thank You | Orbitlink Business Request Received",
  description:
    "Your Orbitlink business connectivity request has been received. Next step guidance for availability review, pricing direction, and service matching.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Thank You | Orbitlink Business Request Received",
    description:
      "Your request has been received. Orbitlink will review the address, service need, and next step for your business location.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You | Orbitlink Business Request Received",
    description:
      "Your business request has been received and is being reviewed.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[32px] border border-white/10 bg-white/[0.045] ${className}`}
    >
      {children}
    </section>
  );
}

function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>;
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
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          : "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
      }
    >
      {children}
    </Link>
  );
}

export default function ContactThankYouPage() {
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
        name: "Thank You",
        description:
          "Confirmation page for submitted Orbitlink business connectivity requests.",
        about: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
        <Surface className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute right-0 top-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-[11px] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Request received
              </div>

              <SectionEyebrow>
                THANK YOU
              </SectionEyebrow>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
                Your business request has been received
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
                Orbitlink will review your address, business requirements, and service request,
                then guide the next step clearly.
              </p>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
                The next response may include availability direction, pricing guidance,
                service matching, or clarification if the site needs more detail.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <MetricPill label="STATUS" value="Request submitted" />
                <MetricPill label="NEXT STEP" value="Address and fit review" />
                <MetricPill label="RESPONSE" value="Usually within 1 business day" />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`tel:${PHONE_E164}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Call {PHONE_DISPLAY}
                </a>

                <CTAButton href="/services">
                  Explore Services
                </CTAButton>

                <CTAButton href="/why-orbitlink">
                  Why Orbitlink
                </CTAButton>

                <CTAButton href="/compare">
                  Compare Provider Models
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
                <SectionEyebrow>WHAT TO EXPECT</SectionEyebrow>
                <div className="mt-3 text-lg font-semibold text-white">
                  A cleaner next step, not a vague follow-up
                </div>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  Orbitlink reviews requests by address, building context, and business use.
                  That helps keep the next reply more useful and more specific.
                </p>

                <div className="mt-5 grid gap-3">
                  <MetricPill label="REVIEW" value="Address and service fit" />
                  <MetricPill label="FOCUS" value="Business-only requests" />
                  <MetricPill label="OUTCOME" value="Availability or pricing direction" />
                </div>
              </div>
            </div>
          </div>
        </Surface>

        <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <SectionEyebrow>WHAT HAPPENS NEXT</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              A simple review path
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
              Your request moves through a straightforward business review flow.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              title="1. Address review"
              body="The service address and building context are checked first to understand the right path."
            />
            <InfoCard
              title="2. Service fit"
              body="Orbitlink reviews whether business fibre, dedicated internet, Wi-Fi, voice, backup, or a multi-service setup fits best."
            />
            <InfoCard
              title="3. Clear reply"
              body="You receive the next recommended step, whether that is availability, pricing direction, or feasibility guidance."
            />
          </div>
        </Surface>

        <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <SectionEyebrow>WHILE YOU WAIT</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Helpful next pages
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <InfoCard
                  title="Business Fibre Internet"
                  body="Review the primary business connectivity path for offices, clinics, commercial suites, and growing teams."
                />
                <InfoCard
                  title="Dedicated Internet Access"
                  body="Understand when a more formal business-critical access model may be the better fit."
                />
                <InfoCard
                  title="Why Orbitlink"
                  body="See how Orbitlink differs in trust posture, clarity, and business buying experience."
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTAButton href="/services/business-fibre-internet">
                  Business Fibre
                </CTAButton>
                <CTAButton href="/services/dedicated-internet-access">
                  Dedicated Internet
                </CTAButton>
                <CTAButton href="/why-orbitlink">
                  Why Orbitlink
                </CTAButton>
              </div>
            </div>

            <div>
              <SectionEyebrow>DIRECT CONTACT</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Need to speak now?
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-3">
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
              </div>

              <p className="mt-4 text-sm leading-6 text-white/55">
                Hours: Monday to Friday, 9:00 AM to 6:00 PM
              </p>
            </div>
          </div>
        </Surface>

        <Surface className="mt-4 p-6 sm:mt-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>FINAL CTA</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Want to review services while your request is being checked?
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-[15px]">
                Explore the service pages or compare provider models to better understand
                the right fit for your business location.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton href="/services" primary>
                Explore Services
              </CTAButton>
              <CTAButton href="/compare">
                Compare Providers
              </CTAButton>
            </div>
          </div>
        </Surface>
      </div>
    </main>
  );
}