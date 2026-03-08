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
    "Enterprise intake for business fibre, managed network infrastructure, and controlled onboarding. Premium client care, disciplined qualification, and scope-led delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact · Orbitlink",
    description:
      "Enterprise-first intake for sales, provisioning coordination, and structured onboarding across Ontario.",
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
      "Enterprise-first intake for sales, provisioning coordination, and structured onboarding.",
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
    ],
  };

  return (
    <PageShell
      eyebrow="CONTACT"
      title="Enterprise intake, handled with discipline"
      subtitle="A premium contact surface for sales, onboarding, provisioning coordination, and scope-led qualification."
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

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Premium onboarding surface
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Contact should feel like the front desk of an operator, not a generic form
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Orbitlink intake is designed for serious conversations: site qualification, service
              fit, rollout timing, and operational requirements. One submission should produce one
              clear path forward.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Controlled rollout</Pill>
              <Pill>Enterprise client care</Pill>
              <Pill>Scope-led qualification</Pill>
              <Pill>Minimal noise</Pill>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE STANDARD</div>
            <div className="mt-1 text-sm text-white/80">
              Verified • Structured • Response-led
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 sm:mt-6 sm:gap-5">
        <div className="space-y-4 sm:space-y-5 lg:col-span-5">
          <InfoCard eyebrow="CONCIERGE DESK" title="Enterprise Client Care">
            <p>
              For sales, provisioning coordination, onboarding review, and operational planning. We
              aim to respond with a single actionable path based on fit, timing, and serviceability.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Controlled onboarding</Pill>
              <Pill>Scope-locked commitments</Pill>
              <Pill>Regulator-aware posture</Pill>
              <Pill>Enterprise review path</Pill>
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

            <p className="mt-4 text-xs text-white/55">
              Public statements remain conservative. Service scope is confirmed only when it is
              internally reviewable.
            </p>
          </InfoCard>

          <InfoCard eyebrow="HIGH-SIGNAL INTAKE" title="What helps us qualify faster">
            <div className="grid grid-cols-1 gap-3">
              <IntakeSignal
                title="Location"
                text="City, province, and building context help determine whether the request fits an active intake path."
              />
              <IntakeSignal
                title="Module"
                text="Tell us whether you are evaluating Internet, Voice, Smart, Horizon, or a combined infrastructure scope."
              />
              <IntakeSignal
                title="Constraints"
                text="Include timeline, static IP needs, SLA expectations, handoff constraints, and multi-site requirements where relevant."
              />
            </div>

            <p className="mt-4 text-xs text-white/55">
              Better signal at intake usually means faster qualification and a cleaner onboarding
              motion.
            </p>
          </InfoCard>

          <InfoCard eyebrow="RESPONSE MODEL" title="How Orbitlink handles new requests">
            <ul className="space-y-2 text-sm text-white/65">
              <li>• Qualification against current rollout and serviceability posture</li>
              <li>• Single response path where the request fits an active intake window</li>
              <li>• Clear next step: review, discovery, waitlist, or structured follow-up</li>
            </ul>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">OPERATING NOTE</div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                The contact surface is intentionally designed to feel calm and selective. It is not
                built for volume spam or vague submissions.
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
              <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE FORM</div>
              <h2 className="mt-3 text-base font-medium text-white/90 sm:text-lg">
                Request onboarding
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                One submission should be enough. When the request matches an active intake window,
                Orbitlink responds with a clear, scope-led next step.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:block">
              <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
              <div className="mt-1 text-sm text-white/80">Controlled • Verified • Minimal</div>
            </div>
          </div>

          <div className="mt-5">
            <Suspense fallback={null}>
              <WaitlistBanner />
            </Suspense>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">BEST RESULTS</div>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Use a work email and describe the site, timeline, and module clearly. The more precise
              the request, the more premium the response path feels.
            </p>
          </div>

          <div className="mt-5">
            <ContactIntakeForm moduleOptions={moduleOptions} />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE</div>
                <div className="mt-2 text-sm text-white/80">
                  Open <span className="text-white/55">for qualified submissions</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/55">ROLLOUT</div>
                <div className="mt-2 text-sm text-white/80">
                  Controlled <span className="text-white/55">and scope-led</span>
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
              fit, rollout posture, and operational readiness.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}