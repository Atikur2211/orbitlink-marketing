// src/app/contact/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import WaitlistBanner from "@/components/WaitlistBanner";
import { MODULE_SPECS } from "@/lib/siteStatus";
import { Suspense } from "react";
import ContactIntakeForm from "@/components/ContactIntakeForm";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/contact`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Contact · Orbitlink",
  description:
    "Business contact and intake for fibre, dedicated internet, managed networks, voice, continuity, and infrastructure services across Ontario. Clear qualification, structured onboarding, and premium enterprise response posture.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact · Orbitlink",
    description:
      "Business-first intake for sales, onboarding, provisioning coordination, and structured qualification across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Contact & Onboarding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Orbitlink",
    description:
      "Business-first intake for sales, onboarding, provisioning coordination, and structured qualification.",
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
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
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
      <h2 className="mt-3 text-base font-medium text-white/90 sm:text-lg">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-white/65">{children}</div>
    </div>
  );
}

function IntakeSignal({
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
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

export default function ContactPage() {
  const moduleOptions = MODULE_SPECS.map((m) => m.name);

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
              text: "Include your address or building, the service you want, your timeline, and any requirements such as static IPs, managed Wi-Fi, voice, continuity, or multi-site needs.",
            },
          },
          {
            "@type": "Question",
            name: "Can I contact Orbitlink for business fibre, DIA, voice, or infrastructure planning?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The intake path supports business fibre, dedicated internet access, managed LAN and Wi-Fi, voice, continuity, static IP routing, and infrastructure-related requests.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after I submit the form?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Orbitlink reviews the request against service fit, rollout posture, timing, and serviceability, then responds with the clearest next step available.",
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="CONTACT"
      title="Business intake, handled with clarity"
      subtitle="A premium contact surface for sales, qualification, onboarding, and deployment planning across Ontario."
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
              Premium onboarding surface
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Contact should feel like the front desk of a serious operator
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              This intake page is designed for real business requests: service qualification,
              address review, deployment timing, and operational requirements. The goal is simple:
              make it easy to send a strong request and easy to receive a clear next step.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Easy to submit</Pill>
              <Pill>Business-first qualification</Pill>
              <Pill>Structured onboarding</Pill>
              <Pill>Minimal back-and-forth</Pill>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="BEST FOR" value="Business service requests" />
              <MetricPill label="RESPONSE STYLE" value="Clear next step" />
              <MetricPill label="INTAKE MODEL" value="Scope-first" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
              <div className="text-[11px] tracking-[0.22em] text-white/55">HOW TO GET THE BEST RESPONSE</div>
              <div className="mt-3 text-lg font-semibold text-white">
                Send one complete request
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                The strongest submissions usually include the service needed, the address or
                building, the target timeline, and any technical requirements that matter to the
                site.
              </p>

              <div className="mt-5 grid gap-3">
                <StepCard
                  step="STEP 1"
                  title="Choose the service"
                  text="Tell us what you want: Business Fibre, DIA, Voice, Managed LAN/Wi-Fi, Continuity, Static IP, IoT, or Infrastructure."
                />
                <StepCard
                  step="STEP 2"
                  title="Add the site"
                  text="Include the address, city, and any building or facility context that affects serviceability."
                />
                <StepCard
                  step="STEP 3"
                  title="Add your needs"
                  text="Include timeline, user count, static IP needs, voice, managed Wi-Fi, continuity, or multi-site requirements."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 sm:mt-6 sm:gap-5">
        <div className="space-y-4 sm:space-y-5 lg:col-span-5">
          <InfoCard eyebrow="CONTACT DESK" title="Business sales and onboarding">
            <p>
              Use this page for sales conversations, address checks, service fit, rollout timing,
              deployment planning, and onboarding review. The intake path is built to move serious
              requests toward a cleaner qualification process.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Business fibre</Pill>
              <Pill>Dedicated internet</Pill>
              <Pill>Managed network</Pill>
              <Pill>Voice</Pill>
              <Pill>Continuity</Pill>
              <Pill>Infrastructure</Pill>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">DIRECT CHANNELS</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  • Concierge: <span className="text-white/85">concierge@orbitlink.ca</span>
                </li>
                <li>
                  • Sales: <span className="text-white/85">sales@orbitlink.ca</span>
                </li>
                <li>
                  • Client Care: <span className="text-white/85">1-888-8-ORBIT-0</span>
                </li>
                <li>
                  • Hours: <span className="text-white/85">Mon–Fri, 9AM–6PM ET</span>
                </li>
              </ul>
            </div>
          </InfoCard>

          <InfoCard eyebrow="WHAT TO INCLUDE" title="Requests that qualify faster">
            <div className="grid grid-cols-1 gap-3">
              <IntakeSignal
                title="Address or building"
                text="City, province, and building context help determine serviceability and the right intake path."
              />
              <IntakeSignal
                title="Service type"
                text="Tell us which service you are evaluating so we can route the request correctly from the start."
              />
              <IntakeSignal
                title="Timeline and requirements"
                text="Include target go-live date, static IP needs, voice, continuity, managed Wi-Fi, SLA expectations, or multi-site scope where relevant."
              />
            </div>

            <p className="mt-4 text-xs text-white/55">
              Better input at intake usually leads to faster qualification and less back-and-forth.
            </p>
          </InfoCard>

          <InfoCard eyebrow="RESPONSE MODEL" title="What happens after you submit">
            <div className="grid grid-cols-1 gap-3">
              <StepCard
                step="REVIEW"
                title="We assess fit"
                text="The request is reviewed against service fit, rollout posture, timing, and address context."
              />
              <StepCard
                step="DECISION"
                title="We identify the next step"
                text="The next step may be discovery, feasibility review, waitlist, structured follow-up, or a direct commercial conversation."
              />
              <StepCard
                step="RESPONSE"
                title="We keep it clear"
                text="The goal is to return one clean next step rather than a vague or fragmented reply."
              />
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">OPERATING NOTE</div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                This contact page is intentionally designed to feel calm, selective, and easy to
                use. It is built for real business requests, not generic spam volume.
              </p>
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
              <h2 className="mt-3 text-base font-medium text-white/90 sm:text-lg">
                Send a business request
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                Keep it simple. Tell us what service you need, where the site is, and what matters
                operationally. One strong submission should be enough to move the conversation
                forward.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:block">
              <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
              <div className="mt-1 text-sm text-white/80">Clear • Structured • Easy</div>
            </div>
          </div>

          <div className="mt-5">
            <Suspense fallback={null}>
              <WaitlistBanner />
            </Suspense>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">BEST PRACTICE</div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Use a work email when possible.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">BEST PRACTICE</div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Include the exact service address.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">BEST PRACTICE</div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Add timeline and technical needs.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ContactIntakeForm moduleOptions={moduleOptions} />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE</div>
                <div className="mt-2 text-sm text-white/80">
                  Open <span className="text-white/55">for qualified business requests</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">REVIEW MODEL</div>
                <div className="mt-2 text-sm text-white/80">
                  Scope-led <span className="text-white/55">and address-aware</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE</div>
                <div className="mt-2 text-sm text-white/80">
                  Conservative <span className="text-white/55">until verified</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/55">
              Orbitlink is a brand of TIRAV Technologies Inc. Requests are reviewed against service
              fit, rollout posture, timing, and operational readiness.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}