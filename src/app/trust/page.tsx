// src/app/trust/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import {
  TRUST_ASSURANCE,
  TRUST_DISCLOSURES,
  TRUST_TILES,
  MODULE_SPECS,
} from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/trust`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Trust & Compliance · Orbitlink",
  description:
    "A premium trust surface for enterprise buyers, auditors, and regulated environments — evidence-first operations, controlled rollout, disciplined disclosure, and scope-locked delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Trust & Compliance · Orbitlink",
    description:
      "Audit-ready posture: controlled rollout, verifiable status statements, evidence-friendly operations, and disciplined change management.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Trust & Compliance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust & Compliance · Orbitlink",
    description:
      "Evidence-first operations, controlled rollout, and disciplined change management for modern enterprise environments.",
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

function statusText(tone: "ok" | "inprogress" | "info") {
  if (tone === "ok") return "OPERATIONAL";
  if (tone === "inprogress") return "IN PROCESS";
  return "DISCLOSURE";
}

function toneTextClass(tone: "ok" | "inprogress" | "info") {
  if (tone === "ok") return "text-emerald-300";
  if (tone === "inprogress") return "text-[#FACC15]";
  return "text-blue-300";
}

function tonePillClass(tone: "ok" | "inprogress" | "info") {
  if (tone === "ok") {
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  }
  if (tone === "inprogress") {
    return "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";
  }
  return "border-blue-400/20 bg-blue-500/10 text-blue-200";
}

function StatusTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "inprogress" | "info";
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-6 transition hover:border-white/15 hover:bg-white/[0.055] sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.04] blur-2xl" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.28em] text-white/48">{label}</div>
          <div className={`mt-3 text-sm font-medium ${toneTextClass(tone)}`}>{value}</div>
        </div>

        <div
          className={[
            "shrink-0 rounded-full border px-3 py-1.5 text-[11px]",
            tonePillClass(tone),
          ].join(" ")}
        >
          {statusText(tone)}
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <p className="mt-4 text-sm leading-6 text-white/64">
        Statements remain conservative and update only when the underlying milestone is complete,
        internally verifiable, and appropriate for public disclosure.
      </p>
    </div>
  );
}

function EvidenceCard({
  heading,
  bullets,
  note,
}: {
  heading: string;
  bullets: string[];
  note?: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition hover:border-white/15 hover:bg-black/25 sm:p-6">
      <div className="text-[11px] tracking-[0.28em] text-white/50">{heading}</div>

      <ul className="mt-4 space-y-2.5 text-sm text-white/65">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {note ? <p className="mt-4 text-xs leading-5 text-white/50">{note}</p> : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      {children}
    </span>
  );
}

function TrustPrinciple({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-white/15 hover:bg-black/25">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{desc}</p>
    </div>
  );
}

function ReviewStep({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
    </div>
  );
}

function ModuleChip({
  name,
  tagline,
}: {
  name: string;
  tagline: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white/88">{name}</div>
      <div className="mt-1 text-xs leading-5 text-white/55">{tagline}</div>
    </div>
  );
}

export default function TrustPage() {
  const moduleOptions = MODULE_SPECS.map((m) => m.name);

  const schemaOrg = {
    "@context": "https://schema.org",
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
        email: "support@orbitlink.ca",
        availableLanguage: ["English"],
        areaServed: "CA-ON",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 Eglinton Ave W, Suite 400-A77",
      addressCountry: "CA",
      addressRegion: "ON",
      addressLocality: "Mississauga",
      postalCode: "L5R 3E7",
    },
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#trust-surface`,
    name: "Trust & Compliance Review Surface",
    provider: { "@id": `${SITE_URL}/#org` },
    serviceType: [
      "Business Fibre Internet",
      "Managed Network Infrastructure",
      "Compliance-first Delivery Posture",
      "Operational Escalation & Support",
      "Verification Review Process",
    ],
    audience: { "@type": "Audience", audienceType: "Business" },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario, Canada" },
      { "@type": "City", name: "Mississauga" },
    ],
    termsOfService: `${SITE_URL}/legal/terms`,
  };

  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
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
        name: "Trust & Compliance",
        item: PAGE_URL,
      },
    ],
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does controlled rollout mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Controlled rollout means Orbitlink confirms scope conservatively and updates public statements only after milestones are complete and verifiable.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide audit-ready documentation?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Orbitlink emphasizes evidence-friendly operations, structured change posture, and scope-locked commitments. Review material may be provided in redacted form when appropriate.",
        },
      },
      {
        "@type": "Question",
        name: "Can enterprise buyers or auditors request verification material?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Verification material is request-only and tailored to the engagement scope. Sensitive operational details remain private and are shared only when necessary.",
        },
      },
      {
        "@type": "Question",
        name: "How are public trust statements updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Statements are maintained as a living disclosure and updated only when milestones are complete and internally verifiable.",
        },
      },
    ],
  };

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [schemaOrg, schemaService, schemaBreadcrumbs, schemaFaq],
  };

  return (
    <PageShell
      eyebrow="TRUST & COMPLIANCE"
      title="Trust designed for serious review"
      subtitle="A premium trust surface for enterprise buyers, auditors, partners, and regulated environments that expect measured claims, disciplined disclosure, and evidence-first operations."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[32rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Evidence-first disclosure surface
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              A trust layer built like infrastructure
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Orbitlink is engineered to support serious review. That means measured public
              statements, scope-locked commitments, controlled onboarding, request-only
              verification material, and a clean distinction between what is visible publicly and
              what remains appropriately private.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Controlled rollout</Pill>
              <Pill>Request-only verification</Pill>
              <Pill>Evidence-friendly operations</Pill>
              <Pill>Enterprise review posture</Pill>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/52">TRUST MODEL</div>
              <div className="mt-3 text-lg font-semibold text-white">
                Conservative, reviewable, and defensible
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The goal is not to sound bigger. The goal is to make every statement easier to
                verify, explain, and defend in front of enterprise buyers and regulated reviewers.
              </p>

              <div className="mt-5 grid gap-3">
                <ReviewStep
                  step="1"
                  title="Define scope"
                  desc="Separate live scope, planned scope, and request-only detail."
                />
                <ReviewStep
                  step="2"
                  title="Control disclosure"
                  desc="Publish only what is internally supportable and operationally accurate."
                />
                <ReviewStep
                  step="3"
                  title="Support review"
                  desc="Provide redacted, scope-appropriate material when a real review path exists."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 sm:mt-6 sm:gap-5">
        {TRUST_TILES.map((tile) => (
          <StatusTile
            key={tile.label}
            label={tile.label}
            value={tile.value}
            tone={tile.tone}
          />
        ))}
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-4xl">
            <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
              VERIFICATION PACK (REQUEST-ONLY)
            </div>

            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Enterprise review material without overexposing operational detail
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
              Request a scope-appropriate review pack that clarifies what is live, what is planned,
              what evidence exists today, and how operational statements are governed. Materials are
              supplied in redacted form where appropriate and only when the review path is real.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Disclosure memo</Pill>
              <Pill>Change posture summary</Pill>
              <Pill>Evidence samples</Pill>
              <Pill>Escalation governance</Pill>
            </div>

            <p className="mt-4 text-xs text-white/55">
              Sensitive technical internals remain private. Pack contents vary by module, readiness
              state, and review scope.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-[#FACC15]/25 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">
              Minimal exposure • Maximum clarity
            </div>
          </div>
        </div>

        <form
          className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-12"
          action="/api/waitlist"
          method="post"
        >
          <input type="hidden" name="source" value="trust" />
          <input type="hidden" name="intent" value="verification-pack" />
          <input type="hidden" name="returnTo" value="/trust" />

          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Work email"
            className="lg:col-span-4 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/45"
          />

          <input
            name="company"
            type="text"
            placeholder="Company (optional)"
            className="lg:col-span-3 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/45"
          />

          <select
            name="role"
            defaultValue=""
            className="lg:col-span-2 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/45"
          >
            <option value="" disabled>
              Role (optional)
            </option>
            <option value="enterprise">Enterprise buyer</option>
            <option value="isp">ISP / Operator</option>
            <option value="auditor">Auditor / Compliance</option>
            <option value="partner">Partner / Vendor</option>
            <option value="other">Other</option>
          </select>

          <select
            name="module"
            defaultValue=""
            className="lg:col-span-3 w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/45"
          >
            <option value="" disabled>
              Module (optional)
            </option>
            {moduleOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <div className="lg:col-span-12 mt-1 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request verification pack
            </button>

            <a
              href="/coming-soon?intent=early-access&source=trust"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Request early access
            </a>

            <div className="flex items-center text-xs text-white/55 sm:ml-auto">
              Or email:
              <span className="ml-1 text-white/80">concierge@orbitlink.ca</span>
            </div>
          </div>

          <div className="lg:col-span-12 text-xs text-white/55">
            Requests are reviewed against active intake and review windows.
          </div>
        </form>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              OPERATIONAL DISCLOSURE
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Built for enterprise expectation and regulator review
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Orbitlink is positioned as an infrastructure-grade operating surface. The trust model
              prioritizes accountability, disciplined operations, structured disclosure, and a clean
              separation between what can be published broadly and what must remain request-only.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">PRINCIPLE</div>
            <div className="mt-1 text-sm text-white/80">Controlled rollout • No overclaiming</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
          {TRUST_DISCLOSURES.map((item) => (
            <EvidenceCard
              key={item.heading}
              heading={item.heading}
              bullets={item.bullets}
              note={item.note}
            />
          ))}
        </div>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              REVIEW FLOW
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              A cleaner path from first diligence to controlled onboarding
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Serious buyers want fewer surprises. This review flow is designed to reduce ambiguity,
              separate scope from assumption, and keep the commercial path aligned with operational
              reality.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Faster diligence • Cleaner go-live</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <ReviewStep
            step="1"
            title="Qualify intent"
            desc="Understand the buyer, the environment, and the actual review objective."
          />
          <ReviewStep
            step="2"
            title="Lock scope"
            desc="Define what is live, what is planned, what is included, and what remains excluded."
          />
          <ReviewStep
            step="3"
            title="Support review"
            desc="Provide redacted or scoped verification material when the review path is active."
          />
          <ReviewStep
            step="4"
            title="Enter onboarding"
            desc="Move into a controlled commercial and operational intake window."
          />
        </div>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              SCOPE-LOCKED COMMITMENTS
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Serious buyers do not purchase features first — they purchase clarity
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Each engagement is defined by what is included, what is measured, what is excluded,
              how changes are handled, and how evidence can be reviewed. This reduces uncertainty at
              procurement, audit, and go-live stages.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Cleaner review • Lower risk</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
          <EvidenceCard
            heading="What we confirm"
            bullets={[
              "Live scope versus planned scope",
              "Measured posture where applicable",
              "Operational ownership and escalation path",
            ]}
          />
          <EvidenceCard
            heading="How changes happen"
            bullets={[
              "Staged windows with rollback posture",
              "Documentation-first releases",
              "No silent launches or surprise claims",
            ]}
          />
          <EvidenceCard
            heading="What stays private"
            bullets={[
              "Sensitive internals remain request-only",
              "Redacted samples used when appropriate",
              "Disclosure boundary for technical detail",
            ]}
          />
        </div>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              MODULE REVIEW CONTEXT
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Review posture varies by service surface
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Trust review is not one-size-fits-all. Each module has a different disclosure boundary,
              onboarding posture, and evidence path depending on scope, operating model, and delivery
              readiness.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">MODULE COUNT</div>
            <div className="mt-1 text-sm text-white/80">{moduleOptions.length} active surfaces</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {MODULE_SPECS.map((module) => (
            <ModuleChip key={module.id} name={module.name} tagline={module.tagline} />
          ))}
        </div>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:p-8">
        <div className="text-[11px] tracking-[0.28em] text-white/55">
          GOVERNANCE PRINCIPLES
        </div>
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
          The discipline behind the brand surface
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          The premium feel of Orbitlink is supported by operational restraint. Public credibility is
          protected through disclosure discipline, change governance, and evidence-friendly review
          paths rather than oversized claims.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 sm:gap-4">
          <TrustPrinciple
            title="Publish conservatively"
            desc="Only claims that can be explained, defended, and supported should appear on the public surface."
          />
          <TrustPrinciple
            title="Separate live from planned"
            desc="The trust model clearly distinguishes what is operational today from what remains milestone-driven."
          />
          <TrustPrinciple
            title="Design for reviewability"
            desc="Enterprise buyers and auditors should be able to understand the posture without requiring internal system access."
          />
          <TrustPrinciple
            title="Protect sensitive internals"
            desc="Operational details are shared on a need-to-review basis, not exposed broadly for appearance."
          />
        </div>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">ASSURANCE</div>
        <div className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-[15px]">
          {TRUST_ASSURANCE}
        </div>
      </section>

      <section className="mt-4 sm:mt-6 rounded-[32px] border border-white/10 bg-black/40 p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              CORPORATE DISCLOSURE
            </div>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Orbitlink is a brand of TIRAV Technologies Inc. Services are introduced through
              controlled onboarding, governed by applicable Canadian requirements, and described in a
              manner intended to remain accurate as operational and regulatory milestones evolve.
            </p>
            <p className="mt-4 text-xs text-white/55">
              This page is maintained as a living disclosure. Statements update when milestones are
              complete and internally verifiable.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE MODEL</div>
            <div className="mt-1 text-sm text-white/80">
              Living page • Milestone-based updates
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/about"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            About Orbitlink
          </a>
          <a
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            View Network Posture
          </a>
          <a
            href="/coming-soon"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Request Access
          </a>
        </div>
      </section>
    </PageShell>
  );
}