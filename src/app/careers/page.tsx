import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/careers`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Careers at Orbitlink | Future Opportunities",
  description:
    "Orbitlink is not actively hiring yet, but we are building a future talent pipeline for business connectivity, network operations, customer experience, and growth roles in Ontario.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Careers at Orbitlink | Future Opportunities",
    description:
      "Join the future Orbitlink talent pipeline for Ontario business connectivity, network operations, customer experience, and growth roles.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Careers at Orbitlink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Orbitlink | Future Opportunities",
    description:
      "Orbitlink is building toward future roles in business connectivity, operations, and customer experience across Ontario.",
    images: [TWITTER_IMAGE_URL],
  },
};

function SectionShell({
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
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
      <div className="text-[11px] tracking-[0.22em] text-white/50">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-[11px] tracking-[0.22em] text-white/45">{step}</div>
      <div className="mt-3 text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

const FUTURE_ROLES = [
  {
    title: "Business Sales",
    body:
      "Consultative sales for Ontario business connectivity, focused on fit, clarity, and long-term client relationships.",
  },
  {
    title: "Network Operations",
    body:
      "Service monitoring, escalation handling, infrastructure coordination, and operational discipline across business services.",
  },
  {
    title: "Customer Success",
    body:
      "Onboarding, account coordination, and client experience for organizations that expect a stronger provider relationship.",
  },
  {
    title: "Technical Support",
    body:
      "Structured troubleshooting, service follow-through, and business-aware technical response.",
  },
  {
    title: "Project Coordination",
    body:
      "Install coordination, site readiness, vendor communication, and rollout support for business environments.",
  },
  {
    title: "Growth & Partnerships",
    body:
      "Strategic market development, channel relationships, and ecosystem growth aligned with Ontario expansion.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Clarity before growth",
    body:
      "Orbitlink is building the operating system first, so future roles enter a clearer and more stable environment.",
  },
  {
    title: "Professional standards",
    body:
      "We want future team members to join a brand that communicates clearly, delivers carefully, and operates with discipline.",
  },
  {
    title: "Measured expansion",
    body:
      "Hiring will follow real demand, real structure, and the ability to support people properly over time.",
  },
  {
    title: "Long-term fit",
    body:
      "The goal is not short-term hiring volume. The goal is durable roles that can grow with the company.",
  },
] as const;

export default async function CareersPage({
  searchParams,
}: {
  searchParams?: Promise<{ submitted?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const submitted = params.submitted === "careers";

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
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Orbitlink",
        url: SITE_URL,
        publisher: {
          "@id": `${SITE_URL}/#org`,
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#careers`,
        url: PAGE_URL,
        name: "Careers at Orbitlink",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#org`,
        },
        description:
          "A future hiring page and quiet talent pipeline for Orbitlink.",
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
            name: "Careers",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="CAREERS"
      title="Future opportunities at Orbitlink"
      subtitle="We are not actively hiring yet, but we are building a quiet pipeline for future roles in business connectivity, operations, customer experience, and growth across Ontario."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <SectionShell className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-[26rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Future hiring pipeline
          </div>

          <h2 className="mt-5 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
            Building the platform first, so future roles can be built properly
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
            Orbitlink is not actively hiring yet. We are focused on building a stronger
            operating foundation first: clearer service delivery, structured onboarding,
            disciplined communication, and a durable Ontario business growth path.
          </p>

          <div className="mt-6 rounded-[24px] border border-[#FACC15]/20 bg-[#FACC15]/[0.08] p-5">
            <div className="text-sm font-medium text-[#FDE68A]">
              We are not currently hiring for active roles
            </div>
            <p className="mt-2 text-sm leading-6 text-white/75">
              You can still submit your information if you want to be considered for
              future opportunities once Orbitlink opens hiring.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricPill label="STATUS" value="Pipeline open" />
            <MetricPill label="HIRING" value="Not active yet" />
            <MetricPill label="FOCUS" value="Ontario growth path" />
          </div>
        </div>
      </SectionShell>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 sm:mt-5 sm:gap-5">
        <SectionShell className="p-6 sm:p-7">
          <SectionEyebrow>WHY THIS PAGE EXISTS</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            A quiet way to stay connected
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
            This page is for people who understand what Orbitlink is building and want
            to stay visible for future roles. It is not a mass hiring page. It is a
            controlled pipeline for people who may align with the brand and the long-term path.
          </p>
        </SectionShell>

        <SectionShell className="p-6 sm:p-7">
          <SectionEyebrow>LONG-TERM VIEW</SectionEyebrow>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
            Built for roles that can last
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
            The goal is to open roles only when the business, operating structure, and
            service foundation are ready to support them properly. That is better for
            the company, and better for future team members.
          </p>
        </SectionShell>
      </section>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <SectionEyebrow>FUTURE ROLE AREAS</SectionEyebrow>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          Areas we expect to build over time
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          As Orbitlink grows, future opportunities are likely to emerge across commercial,
          operational, technical, and growth functions.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {FUTURE_ROLES.map((role) => (
            <InfoCard key={role.title} title={role.title} body={role.body} />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <SectionEyebrow>WORKING STANDARD</SectionEyebrow>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          How Orbitlink intends to build its team
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
          Future roles should sit inside a clear operating model, not a rushed one.
          Orbitlink is building toward a team environment defined by clarity, accountability,
          professional standards, and long-term market credibility.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PRINCIPLES.map((item) => (
            <InfoCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>JOIN THE FUTURE PIPELINE</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Submit your interest quietly
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              If you would like to be considered when future roles open, submit your
              information below. This is not an application for an active job posting.
              It is an expression of interest for future opportunities.
            </p>
          </div>

          <MetricPill label="PIPELINE TYPE" value="Future consideration" />
        </div>

        {submitted ? (
          <div className="mt-6 rounded-[28px] border border-emerald-400/20 bg-emerald-500/[0.08] p-6 sm:p-7">
            <div className="text-[11px] tracking-[0.22em] text-emerald-200">
              SUBMISSION RECEIVED
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Thank you for your interest in Orbitlink
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">
              Your information has been received and added to our future talent pipeline.
              We are not actively hiring at the moment, but we may review future submissions
              as Orbitlink opens selective roles over time.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">STATUS</div>
                <div className="mt-1 text-sm text-white/82">Pipeline saved</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">HIRING</div>
                <div className="mt-1 text-sm text-white/82">Not active yet</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] tracking-[0.22em] text-white/50">NEXT STEP</div>
                <div className="mt-1 text-sm text-white/82">Future review only</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Learn About Orbitlink
              </Link>
              <Link
                href="/careers"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
              >
                Back to Careers
              </Link>
            </div>
          </div>
        ) : (
          <form
            className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12"
            action="/api/waitlist"
            method="post"
          >
            <input type="hidden" name="source" value="careers" />
            <input type="hidden" name="intent" value="future-careers-pipeline" />
            <input type="hidden" name="returnTo" value="/careers?submitted=careers" />

            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="lg:col-span-6">
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-white/85"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Your full name"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
              />
            </div>

            <div className="lg:col-span-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white/85"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@email.com"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
              />
            </div>

            <div className="lg:col-span-6">
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-white/85"
              >
                Current company or background
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company, background, or current role"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
              />
            </div>

            <div className="lg:col-span-6">
              <label
                htmlFor="roleInterest"
                className="mb-2 block text-sm font-medium text-white/85"
              >
                Area of interest
              </label>
              <select
                id="roleInterest"
                name="module"
                defaultValue=""
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
              >
                <option value="" disabled>
                  Select an area
                </option>
                <option value="Business Sales">Business Sales</option>
                <option value="Network Operations">Network Operations</option>
                <option value="Customer Success">Customer Success</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Project Coordination">Project Coordination</option>
                <option value="Growth & Partnerships">Growth & Partnerships</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="lg:col-span-12">
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-white/85"
              >
                Short note
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={5}
                placeholder="Tell us a bit about your background, what interests you about Orbitlink, and what kind of future role you would want to be considered for."
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
              />
            </div>

            <div className="lg:col-span-12">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] tracking-[0.22em] text-white/55">
                  IMPORTANT
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Submitting this form does not mean there is a current opening. It simply
                  allows Orbitlink to keep your information on file for future review when
                  hiring begins.
                </p>
              </div>
            </div>

            <div className="lg:col-span-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Join Future Talent Pipeline
              </button>

              <Link
                href="/about"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
              >
                Learn About Orbitlink
              </Link>

              <div className="text-xs text-white/55 sm:ml-auto">
                Quiet intake • Future consideration only
              </div>
            </div>
          </form>
        )}
      </SectionShell>

      <SectionShell className="mt-4 p-6 sm:mt-5 sm:p-7">
        <SectionEyebrow>FUTURE HIRING PATH</SectionEyebrow>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
          When roles begin to open
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <StepCard
            step="PHASE 1"
            title="Foundation first"
            body="Service clarity, commercial discipline, and a stronger operating model come first."
          />
          <StepCard
            step="PHASE 2"
            title="Demand and structure"
            body="As demand becomes more consistent and internal systems mature, roles become more viable."
          />
          <StepCard
            step="PHASE 3"
            title="Selective hiring"
            body="Hiring begins when Orbitlink can support people properly and maintain a high working standard."
          />
        </div>
      </SectionShell>

      <SectionShell className="mt-4 border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:mt-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>FINAL NOTE</SectionEyebrow>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Orbitlink is building carefully for the long term
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
              We want future roles to enter a company with a clearer standard, stronger
              discipline, and a more durable Ontario growth path. That is why the pipeline
              opens before active hiring.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Business Enquiries
            </Link>
            <Link
              href="/about"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              About Orbitlink
            </Link>
          </div>
        </div>
      </SectionShell>
    </PageShell>
  );
}