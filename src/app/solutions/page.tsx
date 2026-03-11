// src/app/solutions/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StickyModuleNav from "@/components/StickyModuleNav";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/solutions`;

export const metadata: Metadata = {
  title: "Business Connectivity Solutions | Orbitlink",
  description:
    "Business fibre, dedicated internet, managed Wi-Fi, voice, and continuity solutions for offices, clinics, warehouses, multi-site organizations, and commercial buildings across Ontario.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Business Connectivity Solutions | Orbitlink",
    description:
      "Connectivity solutions for offices, clinics, warehouses, multi-site organizations, and commercial buildings.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SOLUTIONS = [
  {
    id: "offices",
    name: "Professional Offices",
    tone: "blue" as const,
    tagline:
      "Reliable business internet, managed Wi-Fi, and voice for modern offices.",
    purpose:
      "Professional environments that need stable connectivity, simple onboarding, and dependable support.",
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
    bestFit: "Reliable office connectivity with organized support.",
  },
  {
    id: "clinics",
    name: "Clinics & Service Businesses",
    tone: "emerald" as const,
    tagline:
      "Connectivity and guest Wi-Fi for customer-facing service environments.",
    purpose:
      "Businesses where downtime directly affects appointments, staff workflow, or customer experience.",
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
    bestFit: "Stable connectivity for daily client-facing operations.",
  },
  {
    id: "warehouses",
    name: "Warehouses & Industrial Sites",
    tone: "gold" as const,
    tagline:
      "Dedicated internet and continuity planning for operational environments.",
    purpose:
      "Industrial locations where reliability and resilience matter more than standard telecom packaging.",
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
    bestFit: "Operational reliability and stronger connectivity resilience.",
  },
  {
    id: "multisite",
    name: "Multi-Site Businesses",
    tone: "blue" as const,
    tagline:
      "Consistent connectivity planning for organizations with multiple locations.",
    purpose:
      "Businesses that want predictable connectivity, coordination, and support across several sites.",
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
    bestFit: "Standardized connectivity across multiple locations.",
  },
  {
    id: "buildings",
    name: "Commercial Buildings",
    tone: "emerald" as const,
    tagline:
      "Connectivity planning and service review for commercial properties.",
    purpose:
      "Property stakeholders reviewing reliable connectivity options for tenants or managed spaces.",
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
    bestFit: "Clear telecom options for building environments.",
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

function SolutionCard({ s }: { s: (typeof SOLUTIONS)[number] }) {
  return (
    <section
      id={s.id}
      className="scroll-mt-[160px] rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7"
    >
      <h2 className="text-xl font-semibold text-white sm:text-2xl">{s.name}</h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65">
        {s.tagline}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            BUSINESS NEED
          </div>
          <p className="mt-3 text-sm text-white/65">{s.purpose}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            COMMON FIT
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {s.idealFor.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            TYPICAL SERVICES
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {s.deliverables.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              BEST FIT
            </div>

            <div className="mt-2 text-sm text-white/70">{s.bestFit}</div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <a
              href={`/contact#intake?solution=${encodeURIComponent(s.name)}`}
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black hover:bg-[#FDE047]"
            >
              Check Availability
            </a>

            <a
              href="/services"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
            >
              View Services
            </a>

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
  }));

  return (
    <PageShell
      eyebrow="SOLUTIONS"
      title="Solutions by business type"
      subtitle="Business fibre, dedicated internet, managed Wi-Fi, voice, and continuity solutions for offices, clinics, warehouses, multi-site organizations, and commercial buildings."
    >

      <section className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          <div className="lg:col-span-8">

            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Find the right solution for your site
            </h2>

            <p className="mt-4 max-w-3xl text-sm text-white/68">
              Start with your business type, review the typical fit, and submit
              your address to check availability and pricing.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricPill label="START HERE" value="Choose business type" />
              <MetricPill label="COMPARE" value="Review service fit" />
              <MetricPill label="NEXT STEP" value="Check availability" />
            </div>

          </div>

          <div className="lg:col-span-4">

            <div className="rounded-[28px] border border-white/10 bg-black/25 p-6">

              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>

              <div className="mt-3 text-lg font-semibold text-white">
                Simple qualification process
              </div>

              <ul className="mt-4 space-y-3 text-sm text-white/65">

                <li>1. Choose your business type</li>
                <li>2. Review service fit</li>
                <li>3. Submit address for availability</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      <div className="h-px w-full" />

      <StickyModuleNav
        modules={modules}
        watchOffsetTop={72}
      />

      <div className="mt-6 grid gap-5">

        {SOLUTIONS.map((s) => (
          <SolutionCard key={s.id} s={s} />
        ))}

      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-6">

        <p className="max-w-3xl text-sm text-white/70">
          Orbitlink solutions are designed around real business environments.
          Submit your address and requirements to begin service qualification
          and pricing review.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">

          <a
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black hover:bg-[#FDE047]"
          >
            Check Availability
          </a>

          <a
            href="/services"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
          >
            View Services
          </a>

        </div>

      </div>

    </PageShell>
  );
}