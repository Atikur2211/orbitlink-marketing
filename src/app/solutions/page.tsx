// src/app/solutions/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import StickyModuleNav from "@/components/StickyModuleNav";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/solutions`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: "Business Connectivity Solutions by Environment | Orbitlink",
  description:
    "Business connectivity solutions for Ontario organizations. Fibre, dedicated internet, managed network, voice, and backup services. Explore the right fit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Connectivity Solutions by Environment | Orbitlink",
    description:
      "Explore business connectivity solutions by environment, including offices, clinics, warehouses, multi-site organizations, and commercial buildings across Ontario.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business connectivity solutions by business type",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Connectivity Solutions by Environment | Orbitlink",
    description:
      "Find the right business connectivity solution for your site, building type, and operating environment.",
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

const SOLUTIONS = [
  {
    id: "offices",
    name: "Professional Offices",
    tone: "blue" as const,
    tagline:
      "Business connectivity for office environments that need dependable internet, organized onboarding, and cleaner day-to-day support.",
    purpose:
      "Professional office environments often need stable primary connectivity, managed internal networking, and a service provider that communicates clearly with business stakeholders.",
    idealFor: [
      "Law firms",
      "Accounting offices",
      "Professional services firms",
      "Shared office environments",
    ],
    deliverables: [
      "Business fibre internet",
      "Managed Wi-Fi and LAN",
      "Business voice",
      "Structured onboarding",
    ],
    bestFit:
      "Best for office environments that need reliable primary connectivity and a more business-ready provider experience.",
    outcome:
      "Day-to-day stability, cleaner support flow, and better internal network consistency.",
  },
  {
    id: "clinics",
    name: "Clinics & Service Businesses",
    tone: "emerald" as const,
    tagline:
      "Connectivity for client-facing environments where uptime, call handling, and day-to-day workflow matter directly.",
    purpose:
      "Clinics and service businesses often depend on stable internet, cleaner guest access, reliable voice, and stronger continuity planning because interruptions can affect appointments, customer experience, and staff workflow.",
    idealFor: [
      "Medical clinics",
      "Dental practices",
      "Wellness offices",
      "Retail-service businesses",
    ],
    deliverables: [
      "Primary business internet",
      "Guest Wi-Fi segmentation",
      "Voice and call routing",
      "Backup connectivity planning",
    ],
    bestFit:
      "Best for customer-facing environments where service continuity and internal workflow reliability matter daily.",
    outcome:
      "Fewer workflow interruptions, cleaner client experience, and stronger continuity planning.",
  },
  {
    id: "warehouses",
    name: "Warehouses & Industrial Sites",
    tone: "gold" as const,
    tagline:
      "Connectivity for operational environments where resilience, site fit, and stronger service posture matter more than generic telecom packaging.",
    purpose:
      "Warehouses and industrial sites often require more deliberate site review, higher-assurance connectivity options, and continuity planning that reflects operational reality.",
    idealFor: [
      "Warehouses",
      "Logistics facilities",
      "Industrial operations",
      "Manufacturing sites",
    ],
    deliverables: [
      "Dedicated or fibre internet",
      "LTE / 5G backup",
      "Managed networking",
      "Site qualification review",
    ],
    bestFit:
      "Best for operational environments where reliability, resilience, and clearer site qualification matter more than standard retail telecom flows.",
    outcome:
      "Stronger uptime posture, better resilience, and a more operations-aware connectivity model.",
  },
  {
    id: "multisite",
    name: "Multi-Site Businesses",
    tone: "blue" as const,
    tagline:
      "Connectivity planning for organizations that need more consistency across several locations.",
    purpose:
      "Multi-site businesses need a provider model that can support more standardized service selection, onboarding, and operating expectations across multiple business locations.",
    idealFor: [
      "Regional businesses",
      "Multi-location offices",
      "Growing organizations",
      "Franchise operators",
    ],
    deliverables: [
      "Internet by location",
      "Managed networking",
      "Voice coordination",
      "Site-by-site onboarding",
    ],
    bestFit:
      "Best for organizations that want a cleaner and more standardized connectivity approach across several sites.",
    outcome:
      "Better consistency, simpler rollout, and cleaner service coordination across locations.",
  },
  {
    id: "buildings",
    name: "Commercial Buildings",
    tone: "emerald" as const,
    tagline:
      "Connectivity planning and service review for building stakeholders, managed spaces, and tenant environments.",
    purpose:
      "Commercial buildings often need a clearer way to review service fit, tenant connectivity options, onboarding posture, and address-qualified business internet availability.",
    idealFor: [
      "Commercial landlords",
      "Office buildings",
      "Managed workspaces",
      "Mixed-use commercial properties",
    ],
    deliverables: [
      "Address-based service review",
      "Business internet options",
      "Tenant connectivity planning",
      "Professional onboarding",
    ],
    bestFit:
      "Best for property and building environments that need clearer telecom planning and more business-readable service options.",
    outcome:
      "Cleaner tenant conversations, clearer building fit, and stronger commercial planning.",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.28em] text-white/55">{children}</div>
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
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
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
    <section
      className={[
        "rounded-[34px] border border-white/10 bg-white/[0.045] backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {children}
    </section>
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
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/64">{text}</p>
    </div>
  );
}

function FitStartCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FACC15]/25 hover:bg-white/[0.05]">
      <div className="text-sm font-medium text-white/92">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/66">{text}</p>
    </div>
  );
}

function SolutionCard({ s }: { s: (typeof SOLUTIONS)[number] }) {
  return (
    <section
      id={s.id}
      className="scroll-mt-[160px] rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-7 lg:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <SectionEyebrow>SOLUTION ENVIRONMENT</SectionEyebrow>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {s.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/68">{s.tagline}</p>
        </div>

        <MetricPill label="BEST FIT" value={s.name} />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            BUSINESS NEED
          </div>
          <p className="mt-3 text-sm leading-6 text-white/65">{s.purpose}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            COMMON FIT
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
            {s.idealFor.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            TYPICAL SERVICES
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
            {s.deliverables.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            BUYER TAKEAWAY
          </div>
          <div className="mt-2 text-sm leading-6 text-white/72">{s.bestFit}</div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            EXPECTED OUTCOME
          </div>
          <div className="mt-2 text-sm leading-6 text-white/72">{s.outcome}</div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-black/25 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              NEXT STEP
            </div>
            <div className="mt-2 text-sm leading-6 text-white/72">
              Move from environment review into address-qualified availability,
              fit, and commercial direction.
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/contact#intake?solution=${encodeURIComponent(s.name)}`}
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </Link>

            <Link
              href="/services"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const modules = SOLUTIONS.map((s) => ({
    id: s.id,
    name: s.name,
    tone: s.tone,
  }));

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
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Business Connectivity Solutions by Environment",
        description:
          "Business connectivity solutions for offices, clinics, warehouses, multi-site organizations, and commercial buildings across Ontario.",
      },
      {
        "@type": "ItemList",
        name: "Orbitlink Solutions",
        itemListElement: SOLUTIONS.map((solution, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: solution.name,
          url: `${PAGE_URL}#${solution.id}`,
        })),
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
            name: "Solutions",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      eyebrow="SOLUTIONS"
      title="Solutions by business environment"
      subtitle="Business fibre, dedicated internet, managed networking, voice, and continuity solutions organized around the operating realities of different business environments."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <Surface className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[32rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[11px] text-[#FDE68A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Business-first solution view
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.02]">
              Find the right connectivity solution for your environment
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
              Start with the business environment, not just the product name. This page
              helps buyers identify the most likely service fit for their office, clinic,
              warehouse, multi-site organization, or commercial building before moving into
              availability and commercial review.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="START HERE" value="Choose business environment" />
              <MetricPill label="REVIEW" value="Understand likely fit" />
              <MetricPill label="NEXT STEP" value="Check availability" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-6">
              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>

              <div className="mt-3 text-lg font-semibold text-white">
                A simpler qualification path
              </div>

              <p className="mt-3 text-sm leading-6 text-white/64">
                Start with the environment, review the common fit, then submit the
                site address and service need for a clearer commercial next step.
              </p>

              <div className="mt-5 grid gap-3">
                <SignalCard
                  title="1. Choose the environment"
                  text="Select the business type or site environment that best matches the location."
                />
                <SignalCard
                  title="2. Review likely fit"
                  text="Understand the service mix commonly aligned to that environment."
                />
                <SignalCard
                  title="3. Submit the address"
                  text="Move into availability, fit, and pricing direction with a stronger starting point."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[26px] border border-white/10 bg-black/20 p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <SignalCard
              title="Environment-led service view"
              text="This page helps buyers start with the real operating context, not just a generic product list."
            />
            <SignalCard
              title="Address-based next step"
              text="Availability and commercial direction still depend on the exact site and service scope."
            />
            <SignalCard
              title="Ontario commercial focus"
              text="The solutions are framed for Ontario business environments and commercial locations."
            />
            <SignalCard
              title="Business-readable structure"
              text="The page is built to reduce friction for buyers comparing service fit across different sites."
            />
          </div>
        </div>
      </Surface>

      <Surface className="mt-6 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <SectionEyebrow>START HERE</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
            Choose the operating environment first
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Most buyers know the environment before they know the final service model.
            This section helps narrow the likely fit faster.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FitStartCard
            title="Workplaces & Offices"
            text="Reliable primary internet, managed Wi-Fi, and cleaner day-to-day support."
          />
          <FitStartCard
            title="Client-Facing Environments"
            text="Stronger continuity, voice handling, and smoother daily workflow."
          />
          <FitStartCard
            title="Operational & Multi-Site Environments"
            text="Better resilience, site qualification, and more standardized rollout."
          />
        </div>
      </Surface>

      <div className="h-px w-full" />

      <StickyModuleNav modules={modules} watchOffsetTop={72} />

      <div className="mt-6 grid gap-5">
        {SOLUTIONS.map((s) => (
          <SolutionCard key={s.id} s={s} />
        ))}
      </div>

      <Surface className="mt-6 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>WHY THIS PAGE HELPS BUYERS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Better fit starts with better framing
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Most buyers do not begin with the final product name. They begin with the
              site, the business model, and the operational need. This page is designed
              to bridge that gap and make service selection easier before the intake step.
            </p>
          </div>

          <MetricPill label="BUYER OUTCOME" value="Better fit • Lower friction" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SignalCard
            title="Offices"
            text="Often need strong primary internet, managed Wi-Fi, and clean onboarding for day-to-day business operations."
          />
          <SignalCard
            title="Clinics & service businesses"
            text="Often need reliable client-facing connectivity, call handling, and continuity-aware planning."
          />
          <SignalCard
            title="Warehouses & industrial sites"
            text="Often need stronger site qualification, resilience, and a more operationally aligned connectivity posture."
          />
          <SignalCard
            title="Multi-site and building environments"
            text="Often need consistency, coordination, and more business-readable service planning across multiple locations or stakeholders."
          />
        </div>
      </Surface>

      <Surface className="mt-6 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>WHAT THIS HELPS YOU DECIDE</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Move from broad interest to a more qualified service path
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              This page is designed to reduce early-stage uncertainty. It helps buyers
              understand likely fit before the address-qualified review begins.
            </p>
          </div>

          <MetricPill label="DECISION MODE" value="Environment → Fit → Availability" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SignalCard
            title="Choose the likely path faster"
            text="The environment-led view narrows the service conversation before pricing and qualification."
          />
          <SignalCard
            title="Reduce mismatch risk"
            text="A better starting point helps avoid choosing the wrong service path for the site."
          />
          <SignalCard
            title="Enter review with better context"
            text="The next step becomes more useful when the business environment is already clear."
          />
        </div>
      </Surface>

      <Surface className="mt-6 border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>FINAL STEP</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[34px]">
              Move from solution browsing to a qualified commercial request
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
              Orbitlink solutions are designed around real business environments. The
              next step is to submit the site address, service need, and timing so the
              request can be reviewed properly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </Link>

            <Link
              href="/services"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </Surface>
    </PageShell>
  );
}