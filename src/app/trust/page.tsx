// src/app/trust/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import {
  TRUST_ASSURANCE,
  TRUST_DISCLOSURES,
  TRUST_TILES,
  SERVICE_CATALOG,
} from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/trust`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Business Trust & Compliance Review | Orbitlink",
  description:
    "Business trust and compliance review for Ontario organizations. Clear disclosure, structured onboarding, evidence-friendly operations, and disciplined delivery for serious buyers, property stakeholders, and regulated environments.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Trust & Compliance Review | Orbitlink",
    description:
      "Business trust posture with clear disclosure, controlled onboarding, evidence-friendly operations, and disciplined change management.",
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
    title: "Business Trust & Compliance Review | Orbitlink",
    description:
      "Evidence-first operations, controlled rollout, and disciplined change management for business environments.",
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
  if (tone === "ok") return "ACTIVE";
  if (tone === "inprogress") return "IN REVIEW";
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      {children}
    </span>
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
    <div className="h-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
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
    <div className="group relative h-full overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-6 transition hover:border-white/15 hover:bg-white/[0.055] sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.04] blur-2xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
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
          Public trust statements stay conservative and update only when a milestone is complete,
          reviewable, and ready for disclosure.
        </p>
      </div>
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
    <div className="h-full rounded-[26px] border border-white/10 bg-black/20 p-5 transition hover:border-white/15 hover:bg-black/25 sm:p-6">
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
    <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
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

function TrustPrinciple({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="h-full rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-white/15 hover:bg-black/25">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{desc}</p>
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
    <div className="h-full rounded-[22px] border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white/88">{name}</div>
      <div className="mt-1 text-xs leading-5 text-white/55">{tagline}</div>
    </div>
  );
}

function BuyerFitCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="h-full rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
    </div>
  );
}

export default function TrustPage() {
  const moduleOptions = SERVICE_CATALOG.map((s) => s.name);

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
            "Controlled rollout means Orbitlink confirms scope carefully and updates public statements only after milestones are complete and reviewable.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide review or verification material?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Orbitlink supports evidence-friendly operations, structured change posture, and scope-appropriate review material when the engagement and review path are real.",
        },
      },
      {
        "@type": "Question",
        name: "Can enterprise buyers or auditors request verification material?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Verification material is request-based and tailored to the engagement scope. Sensitive operational details remain private and are shared only when appropriate.",
        },
      },
      {
        "@type": "Question",
        name: "How are public trust statements updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Statements are maintained as a living disclosure and updated only when milestones are complete and internally reviewable.",
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
      title="Trust designed for serious business review"
      subtitle="A premium trust surface for buyers, partners, and regulated environments that expect clear statements, disciplined disclosure, and structured delivery."
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
              A trust layer built to be clear, reviewable, and defensible
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Orbitlink is designed to support serious business review with clear public statements,
              scope-aware commitments, controlled onboarding, request-based verification material,
              and a clean separation between what is public and what stays private.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Controlled rollout</Pill>
              <Pill>Request-based verification</Pill>
              <Pill>Evidence-friendly operations</Pill>
              <Pill>Enterprise review posture</Pill>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Contact Orbitlink
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Compare Provider Models
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="TRUST MODEL" value="Clear and conservative" />
              <MetricPill label="REVIEW STYLE" value="Scope-aware" />
              <MetricPill label="DELIVERY SIGNAL" value="Structured and disciplined" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.24em] text-white/52">TRUST MODEL</div>
              <div className="mt-3 text-lg font-semibold text-white">
                Conservative, reviewable, and commercially clear
              </div>
              <p className="mt-3 text-sm leading-6 text-white/64">
                The goal is not to sound bigger than reality. The goal is to make each public
                statement easier to understand, easier to verify, and easier to defend in front of
                buyers, partners, and reviewers.
              </p>

              <div className="mt-5 grid gap-3">
                <ReviewStep
                  step="1"
                  title="Define scope"
                  desc="Separate what is live, what is planned, and what is request-only."
                />
                <ReviewStep
                  step="2"
                  title="Control disclosure"
                  desc="Publish only what is supportable and operationally accurate."
                />
                <ReviewStep
                  step="3"
                  title="Support review"
                  desc="Share redacted or scoped material when there is a real review path."
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

      <section className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>WHY BUSINESSES READ THIS PAGE</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Serious buyers do not just evaluate service. They evaluate judgment.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              This page answers the questions stronger buyers usually ask: Can this provider
              communicate clearly? Can it control scope? Can it separate live from planned? Can it
              support diligence without making careless claims?
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">BUYER SIGNAL</div>
            <div className="mt-1 text-sm text-white/80">Professional judgment is visible</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <BuyerFitCard
            title="Enterprise buyers"
            text="Need clarity before procurement, not generic promises."
          />
          <BuyerFitCard
            title="Property stakeholders"
            text="Need cleaner delivery language, fewer surprises, and better operating discipline."
          />
          <BuyerFitCard
            title="IT and network leads"
            text="Need statements that make technical sense and do not overclaim what is not yet proven."
          />
          <BuyerFitCard
            title="Auditors and reviewers"
            text="Need a provider surface that can be read, checked, and understood quickly."
          />
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>HOW THIS SUPPORTS BUYER DECISIONS</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Trust works best when it helps a buyer move forward
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              A trust page should help a buyer understand the provider, compare options, and decide
              on the next step. It should not feel isolated from the rest of the buying journey.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DECISION SUPPORT</div>
            <div className="mt-1 text-sm text-white/80">Trust → compare → contact</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <BuyerFitCard
            title="Provider comparison"
            text="Use the comparison page when deciding between Orbitlink, a big telco, or a smaller ISP."
          />
          <BuyerFitCard
            title="Trust review"
            text="Use this page when the buyer wants a clearer view of disclosure, rollout, and review posture."
          />
          <BuyerFitCard
            title="Commercial intake"
            text="Use the intake path when the buyer is ready to submit an address, service need, and timing."
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/compare"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Compare Provider Models
          </Link>
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Contact Orbitlink
          </Link>
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-4xl">
            <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
              VERIFICATION PACK (REQUEST-ONLY)
            </div>

            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Review material for real diligence without overexposing sensitive internals
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
              Request a scope-appropriate review pack that clarifies what is live, what is planned,
              what evidence exists today, and how public trust statements are governed. Materials
              are supplied in redacted form where appropriate and only when the review path is real.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Disclosure memo</Pill>
              <Pill>Change posture summary</Pill>
              <Pill>Evidence samples</Pill>
              <Pill>Escalation governance</Pill>
            </div>

            <p className="mt-4 text-xs text-white/55">
              Sensitive technical internals remain private. Pack contents vary by service, readiness
              state, and engagement scope.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-[#FACC15]/25 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">Minimal exposure • Maximum clarity</div>
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
            className="w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/45 lg:col-span-4"
          />

          <input
            name="company"
            type="text"
            placeholder="Company or organization"
            className="w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/45 lg:col-span-3"
          />

          <select
            name="role"
            defaultValue=""
            className="w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/45 lg:col-span-2"
          >
            <option value="" disabled>
              Role
            </option>
            <option value="enterprise">Business buyer</option>
            <option value="it">IT / Network lead</option>
            <option value="auditor">Auditor / Compliance</option>
            <option value="partner">Partner / Vendor</option>
            <option value="other">Other</option>
          </select>

          <select
            name="module"
            defaultValue=""
            className="w-full rounded-2xl border border-[#FACC15]/15 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/45 lg:col-span-3"
          >
            <option value="" disabled>
              Service surface
            </option>
            {moduleOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <div className="mt-1 flex flex-col gap-3 lg:col-span-12 sm:flex-row sm:flex-wrap">
            <button
              type="submit"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request verification pack
            </button>

            <Link
              href="/contact#intake"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              Contact Orbitlink
            </Link>

            <div className="flex items-center text-xs text-white/55 sm:ml-auto">
              Or email:
              <span className="ml-1 text-white/80">concierge@orbitlink.ca</span>
            </div>
          </div>

          <div className="text-xs text-white/55 lg:col-span-12">
            Requests are reviewed against active review and intake windows.
          </div>
        </form>
      </section>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>OPERATIONAL DISCLOSURE</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Built for enterprise expectation and reviewer confidence
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Orbitlink is positioned as an infrastructure-grade operating surface. The trust model
              prioritizes accountability, structured operations, disciplined disclosure, and a clear
              separation between what can be published broadly and what should remain request-only.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">PRINCIPLE</div>
            <div className="mt-1 text-sm text-white/80">Controlled rollout • No overclaiming</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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

      <section className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>REVIEW FLOW</SectionEyebrow>
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
            desc="Understand the buyer, the environment, and the real review objective."
          />
          <ReviewStep
            step="2"
            title="Lock scope"
            desc="Define what is live, what is planned, what is included, and what is excluded."
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

      <section className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>SCOPE-LOCKED COMMITMENTS</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Serious buyers do not purchase features first — they purchase clarity
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Each engagement is defined by what is included, what is measured, what is excluded,
              how changes are handled, and how evidence can be reviewed. This reduces uncertainty
              at procurement, review, and go-live stages.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Cleaner review • Lower risk</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
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

      <section className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>PROCUREMENT CONFIDENCE</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Built to reduce buyer hesitation before the commercial conversation
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              A strong trust page does not replace service pages. It removes doubt around the
              provider itself. This section helps buyers feel that the business behind the service
              is deliberate, governed, and easier to work with over time.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">COMMERCIAL IMPACT</div>
            <div className="mt-1 text-sm text-white/80">Higher trust • Lower friction</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <BuyerFitCard
            title="Fewer credibility questions"
            text="The page answers the trust questions that normally slow down early-stage deals."
          />
          <BuyerFitCard
            title="Cleaner property discussions"
            text="Building and operations stakeholders can understand the posture without reading technical internals."
          />
          <BuyerFitCard
            title="Better enterprise fit"
            text="Buyers see a provider that can separate claims, scope, and review process more professionally."
          />
          <BuyerFitCard
            title="Stronger close conditions"
            text="Clearer disclosure and controlled commitments support smoother commercial next steps."
          />
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>MODULE REVIEW CONTEXT</SectionEyebrow>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Review posture varies by service surface
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Trust review is not one-size-fits-all. Each service has a different disclosure
              boundary, onboarding posture, and evidence path depending on scope, operating model,
              and delivery readiness.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">MODULE COUNT</div>
            <div className="mt-1 text-sm text-white/80">{moduleOptions.length} active surfaces</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {SERVICE_CATALOG.map((module) => (
            <ModuleChip key={module.id} name={module.name} tagline={module.tagline} />
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-6 sm:p-7">
        <SectionEyebrow>GOVERNANCE PRINCIPLES</SectionEyebrow>
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
          The discipline behind the brand surface
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          The premium feel of Orbitlink is supported by operational restraint. Public credibility
          is protected through disclosure discipline, change governance, and evidence-friendly
          review paths rather than oversized claims.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
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
            desc="Buyers and auditors should be able to understand the posture without needing internal system access."
          />
          <TrustPrinciple
            title="Protect sensitive internals"
            desc="Operational details are shared on a need-to-review basis, not exposed broadly for appearance."
          />
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-6 sm:p-7">
        <SectionEyebrow>ASSURANCE</SectionEyebrow>
        <div className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-[15px]">
          {TRUST_ASSURANCE}
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-black/40 p-6 sm:mt-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>CORPORATE DISCLOSURE</SectionEyebrow>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Orbitlink is a brand of TIRAV Technologies Inc. Services are introduced through
              controlled onboarding, governed by applicable Canadian requirements, and described in
              a way intended to remain accurate as operational and regulatory milestones evolve.
            </p>
            <p className="mt-4 text-xs text-white/55">
              This page is maintained as a living disclosure. Statements update when milestones are
              complete and internally reviewable.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE MODEL</div>
            <div className="mt-1 text-sm text-white/80">Living page • Milestone-based updates</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/about"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            About Orbitlink
          </Link>
          <Link
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            View Network Posture
          </Link>
          <Link
            href="/compare"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Compare Provider Models
          </Link>
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Contact Orbitlink
          </Link>
        </div>
      </section>
    </PageShell>
  );
}