import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import {
  NETWORK_CAPABILITIES,
  NETWORK_COVERAGE_NOTE,
  NETWORK_METRICS,
  NETWORK_CHANGELOG,
} from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_URL = `${SITE_URL}/network`;
const OG_IMAGE_URL = `${SITE_URL}/network/opengraph-image`;

export const metadata: Metadata = {
  title: "Network Availability & Service Readiness",
  description:
    "Network availability and service readiness for Ontario businesses. Check fibre coverage, service options, and delivery by address.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Business Network Availability & Service Readiness | Orbitlink",
    description:
      "A clearer view of Orbitlink network readiness, service communication, escalation handling, and address-qualified business availability.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink network availability and service readiness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Network Availability & Service Readiness | Orbitlink",
    description:
      "Business-first network visibility, structured escalation, and address-qualified service availability.",
    images: [OG_IMAGE_URL],
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

function toneClass(tone: "ok" | "info" | "warn") {
  if (tone === "ok") return "text-emerald-300";
  if (tone === "warn") return "text-[#FACC15]";
  return "text-cyan-300";
}

function tonePill(tone: "ok" | "info" | "warn") {
  if (tone === "ok") {
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  }
  if (tone === "warn") {
    return "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";
  }
  return "border-cyan-400/20 bg-cyan-500/10 text-cyan-200";
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/50">{children}</div>;
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "ok" | "info" | "warn";
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
        <div className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(tone)}`}>
          {tone === "ok" ? "OK" : tone === "warn" ? "WATCH" : "INFO"}
        </div>
      </div>

      <div className={`mt-4 text-xl font-semibold ${toneClass(tone)}`}>{value}</div>
      <p className="mt-2 text-sm leading-6 text-white/62">{note}</p>
    </div>
  );
}

function MeaningCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/63">{text}</p>
    </div>
  );
}

function HeroCommandPanel() {
  const leadMetrics = NETWORK_METRICS.slice(0, 4);

  return (
    <Surface className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/2 h-40 w-[36rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative border-b border-white/10 px-6 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>
            <SectionEyebrow>NETWORK VISIBILITY</SectionEyebrow>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Address-qualified availability
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Structured escalation
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Controlled disclosure
            </span>
          </div>
        </div>
      </div>

      <div className="relative px-6 py-7 sm:px-7 sm:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.02]">
              Network availability for business sites,
              <span className="block text-white/68">
                reviewed by address, scope, and service fit.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-[15px]">
              Orbitlink presents network readiness the way serious business buyers expect to
              see it: clearly, carefully, and without blanket overclaiming. This page explains
              how availability, service readiness, escalation, and change handling are approached
              before, during, and after activation.
            </p>

            <div className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
              Move from network review into{" "}
              <Link
                href="/services/business-fibre-internet"
                className="underline underline-offset-4 hover:text-white"
              >
                business fibre
              </Link>
              ,{" "}
              <Link
                href="/services/dedicated-internet-access"
                className="underline underline-offset-4 hover:text-white"
              >
                dedicated internet
              </Link>
              ,{" "}
              <Link
                href="/services/colocation-infrastructure"
                className="underline underline-offset-4 hover:text-white"
              >
                colocation & infrastructure services
              </Link>
              , or{" "}
              <Link
                href="/services/starlink-agent"
                className="underline underline-offset-4 hover:text-white"
              >
                Starlink access coordination
              </Link>
              .
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability
              </Link>
              <Link
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Review Trust & Compliance
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] tracking-[0.22em] text-white/50">CURRENT VIEW</div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    Business service summary
                  </div>
                </div>

                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-[11px] text-cyan-200">
                  ACTIVE
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Public updates reflect verified service posture only.",
                  "Availability is reviewed per address, site, and requested scope.",
                  "Changes are disclosed after timing, ownership, and impact are confirmed.",
                  "Escalation follows a documented intake, diagnosis, and resolution path.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leadMetrics.map((m) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              note={m.note}
              tone={m.tone}
            />
          ))}
        </div>
      </div>
    </Surface>
  );
}

function NextStepBridge() {
  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>NEXT STEP</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Move from network review to service selection
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Once the network posture makes sense, the next step is choosing the right
            service for the site. Orbitlink helps connect availability review to the
            correct business service path.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">PURPOSE</div>
          <div className="mt-1 text-sm text-white/80">Trust → Service → Action</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/services/business-fibre-internet"
          className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25"
        >
          <div className="text-sm font-medium text-white/90">Business Fibre Internet</div>
          <p className="mt-3 text-sm leading-6 text-white/63">
            Primary business internet for offices, clinics, warehouses, and everyday operations.
          </p>
          <div className="mt-4 text-sm text-white/75">Open service →</div>
        </Link>

        <Link
          href="/services/dedicated-internet-access"
          className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25"
        >
          <div className="text-sm font-medium text-white/90">Dedicated Internet Access</div>
          <p className="mt-3 text-sm leading-6 text-white/63">
            Stronger uptime and more predictable performance for higher-criticality environments.
          </p>
          <div className="mt-4 text-sm text-white/75">Open service →</div>
        </Link>

        <Link
          href="/locations"
          className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25"
        >
          <div className="text-sm font-medium text-white/90">Browse Service Locations</div>
          <p className="mt-3 text-sm leading-6 text-white/63">
            Review Ontario service areas and move from market interest into address-based qualification.
          </p>
          <div className="mt-4 text-sm text-white/75">View locations →</div>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href="/services/colocation-infrastructure"
          className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25"
        >
          <div className="text-sm font-medium text-white/90">Colocation & Infrastructure Services</div>
          <p className="mt-3 text-sm leading-6 text-white/63">
            Infrastructure-aligned delivery for rack planning, cross-connect coordination, and edge deployment posture.
          </p>
          <div className="mt-4 text-sm text-white/75">Open infrastructure service →</div>
        </Link>

        <Link
          href="/services/starlink-agent"
          className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-black/25"
        >
          <div className="text-sm font-medium text-white/90">Starlink Access Coordination</div>
          <p className="mt-3 text-sm leading-6 text-white/63">
            Satellite coordination for remote, delayed, temporary, or continuity-oriented sites.
          </p>
          <div className="mt-4 text-sm text-white/75">Open satellite service →</div>
        </Link>
      </div>
    </Surface>
  );
}

function PopNode({
  left,
  top,
  label,
  tone,
  role,
}: {
  left: string;
  top: string;
  label: string;
  tone: "ok" | "info" | "warn";
  role: string;
}) {
  const dot =
    tone === "ok" ? "bg-emerald-400" : tone === "warn" ? "bg-[#FACC15]" : "bg-cyan-400";

  return (
    <div className="absolute" style={{ left, top }}>
      <div className={`relative h-3 w-3 rounded-full ${dot}`}>
        <div
          className={`absolute inset-0 rounded-full ${dot}/25 animate-[ping_2.8s_ease-in-out_infinite]`}
        />
      </div>

      <div className="mt-2 rounded-xl border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-[3px]">
        <div className="text-[10px] tracking-[0.22em] text-white/55">{label}</div>
        <div className="mt-1 text-xs text-white/75">{role}</div>
      </div>
    </div>
  );
}

function NetworkAtlas() {
  return (
    <Surface className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5 sm:px-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionEyebrow>NETWORK VIEW</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
              Footprint context, route awareness, and measured expansion
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              This visual layer shows how Orbitlink communicates network presence:
              operating areas, route context, and milestone-based expansion. It is
              intentionally conservative and should be read as an operating view, not a
              blanket service coverage map.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DISPLAY MODE</div>
            <div className="mt-1 text-sm text-white/80">
              Operating view • not a marketing map
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[320px] border-b border-white/10 sm:h-[380px] lg:h-[440px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(56,253,254,0.12),transparent_25%),radial-gradient(circle_at_78%_28%,rgba(250,204,21,0.10),transparent_24%),radial-gradient(circle_at_55%_72%,rgba(16,185,129,0.10),transparent_28%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        <div className="absolute left-[14%] top-[58%] h-px w-[35%] bg-gradient-to-r from-emerald-400/20 via-cyan-400/45 to-cyan-400/10" />
        <div className="absolute left-[45%] top-[44%] h-px w-[25%] bg-gradient-to-r from-cyan-400/20 via-cyan-400/45 to-[#FACC15]/20" />
        <div className="absolute left-[46%] top-[45%] h-[18%] w-px bg-gradient-to-b from-cyan-400/10 via-cyan-400/35 to-[#FACC15]/20" />

        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="orbit-slide h-[3px] w-40 bg-cyan-400/30 blur-md" />
        </div>

        <PopNode left="18%" top="58%" label="MISSISSAUGA" tone="ok" role="Primary operating area" />
        <PopNode left="44%" top="44%" label="TORONTO" tone="info" role="Route and interconnect context" />
        <PopNode left="69%" top="62%" label="OTTAWA" tone="warn" role="Milestone-based expansion" />
        <PopNode left="79%" top="34%" label="MONTREAL" tone="info" role="Upstream route context" />

        <div className="absolute bottom-4 right-5 text-[10px] text-white/50">
          Visual network view only • availability confirmed per address
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4 sm:px-7">
        {[
          {
            name: "Mississauga",
            status: "Operational",
            tone: "ok" as const,
            note: "Primary operating area for intake, service coordination, and escalation alignment.",
          },
          {
            name: "Toronto",
            status: "Observed",
            tone: "info" as const,
            note: "Route and interconnect context for connected business demand.",
          },
          {
            name: "Montreal",
            status: "Observed",
            tone: "info" as const,
            note: "Broader route and upstream context within the operating narrative.",
          },
          {
            name: "Ottawa",
            status: "Planned",
            tone: "warn" as const,
            note: "Expansion is disclosed only when milestones and delivery conditions are confirmed.",
          },
        ].map((p) => (
          <div
            key={p.name}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-medium text-white/90">{p.name}</div>
              <div className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(p.tone)}`}>
                {p.status}
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/63">{p.note}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function WhatThisMeansStrip() {
  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>WHAT THIS MEANS IN PRACTICE</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Network posture should help a buyer make a better decision
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            This page is designed to reduce uncertainty, explain how Orbitlink qualifies
            service, and make network-related claims easier to understand before the
            commercial conversation moves forward.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">BUYER VALUE</div>
          <div className="mt-1 text-sm text-white/80">Clarity • Confidence • Direction</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <MeaningCard
          title="Availability is not guessed"
          text="Serviceability is reviewed against address, building context, and requested service scope rather than broad coverage claims."
        />
        <MeaningCard
          title="Escalation is structured"
          text="When service events happen, ownership, diagnosis, and provider coordination follow a more ordered path."
        />
        <MeaningCard
          title="Public statements stay controlled"
          text="Network language is updated conservatively so serious buyers can rely on what is shown publicly."
        />
      </div>
    </Surface>
  );
}

function CapabilityField() {
  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>BUSINESS EXPECTATIONS</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            What business buyers should expect from the service model
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            A serious provider is judged by how it qualifies service, communicates
            changes, and handles escalation when connectivity matters. Orbitlink is
            designed to keep those areas clear, structured, and easier to review.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
          <div className="mt-1 text-sm text-white/80">Clear • structured • business-first</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {NETWORK_CAPABILITIES.map((c) => (
          <div
            key={c.title}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-sm font-medium text-white/90">{c.title}</div>
            <p className="mt-2 text-sm leading-6 text-white/63">{c.desc}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function BuyerOutcomesStrip() {
  const items = [
    {
      t: "Clearer pre-sales qualification",
      b: "Address-based review helps reduce mismatched expectations before activation.",
    },
    {
      t: "Cleaner implementation motion",
      b: "Structured onboarding keeps delivery, install readiness, and acceptance more organized.",
    },
    {
      t: "Better incident communication",
      b: "Defined escalation paths support clearer updates during service-impacting events.",
    },
    {
      t: "More credible public posture",
      b: "Measured disclosure reduces overclaim risk and supports enterprise trust.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <SectionEyebrow>BUSINESS OUTCOMES</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
        What this service model means for your business
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
        Orbitlink’s network model is designed to improve service qualification,
        deployment clarity, and operational communication for organizations that
        depend on business connectivity.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.t}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-sm font-medium text-white/90">{item.t}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.b}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function OperatingPhilosophy() {
  const items = [
    {
      t: "Verified disclosure",
      b: "Public statements are updated after milestones are confirmed, not when they are only planned.",
    },
    {
      t: "Operational context",
      b: "Performance and service posture are explained with route, timing, and rollout context where relevant.",
    },
    {
      t: "Documented change handling",
      b: "Changes are recorded clearly enough to support buyer review, internal tracking, and post-incident understanding.",
    },
    {
      t: "Structured escalation",
      b: "Incident handling follows ownership, timestamps, decision points, and clearer client communication.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <SectionEyebrow>COMMUNICATION STANDARD</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
        How Orbitlink keeps public network statements credible
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
        Buyers trust providers that communicate precisely. Orbitlink uses measured
        language, operational context, and documented updates so service statements
        remain credible to technical, commercial, and property stakeholders.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.t}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-sm font-medium text-white/90">{item.t}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.b}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function LatencyPosture() {
  return (
    <Surface className="p-6 sm:p-7">
      <SectionEyebrow>PERFORMANCE VIEW</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
        Performance is measured carefully and explained honestly
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
        Orbitlink treats latency and path quality as service signals, not headline
        marketing claims. Measurements are interpreted with route conditions, timing,
        upstream state, and last-mile context so buyers see a more reliable picture
        of service behaviour.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            t: "Baseline discipline",
            b: "Performance baselines are tied to route and service conditions rather than collapsed into one generic number.",
          },
          {
            t: "Change-aware review",
            b: "When routing, policy, or upstream conditions shift, measurements are reviewed against the service and incident context.",
          },
          {
            t: "Clear explanation",
            b: "When issues occur, updates explain what changed, what was observed, and what restored stability.",
          },
        ].map((item) => (
          <div
            key={item.t}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-sm font-medium text-white/90">{item.t}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.b}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function EscalationModel() {
  const steps = [
    {
      level: "L1 — Intake & Scope Confirmation",
      bullets: [
        "Confirm affected site, service scope, and business impact",
        "Verify power, link state, and basic path checks",
        "Capture timestamps and a plain-language symptom summary",
      ],
    },
    {
      level: "L2 — Network Review & Diagnosis",
      bullets: [
        "Review monitoring, route behaviour, and error conditions",
        "Check whether the issue is local, upstream, or equipment-related",
        "Prepare a clearer diagnosis before external escalation",
      ],
    },
    {
      level: "L3 — Provider Coordination & Resolution",
      bullets: [
        "Engage upstream remediation when required",
        "Maintain client updates against a documented timeline",
        "Close with resolution notes and operating follow-through",
      ],
    },
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>ESCALATION MODEL</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            A structured service path from intake to resolution
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Business buyers need to know that incidents move in an ordered way.
            Orbitlink uses a defined sequence for intake, diagnosis, escalation,
            and provider coordination so updates remain clear and next steps remain visible.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
          <div className="mt-1 text-sm text-white/80">Clearer ownership • cleaner updates</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.level}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-sm font-medium text-white/90">{s.level}</div>
            <ul className="mt-3 space-y-2 text-sm text-white/63">
              {s.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function AssuranceModel() {
  const items = [
    {
      t: "Before activation",
      b: "Service scope is reviewed against address, building conditions, and requested operating requirements.",
    },
    {
      t: "During rollout",
      b: "Changes are introduced through controlled sequencing rather than vague promises.",
    },
    {
      t: "During incidents",
      b: "Escalation follows intake, diagnosis, and provider coordination with documented updates.",
    },
    {
      t: "After resolution",
      b: "The service record is clarified with resolution notes and a cleaner understanding of what changed.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <SectionEyebrow>SERVICE ASSURANCE</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
        A structured sequence before, during, and after service events
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
        Serious buyers want to know how a provider behaves across the full lifecycle,
        not only at the moment of sale. This section explains the sequence Orbitlink
        uses to keep delivery and service communication orderly.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.t}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-sm font-medium text-white/90">{item.t}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.b}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function ChangeLogStrip() {
  const items = [
    NETWORK_CHANGELOG.last_change,
    NETWORK_CHANGELOG.current_posture,
    NETWORK_CHANGELOG.next_window,
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>CHANGE UPDATES</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Controlled updates, communicated responsibly
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Maintenance windows and routing changes are communicated when confirmed.
            Public language remains measured until milestones complete and outcomes
            can be described clearly.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            {NETWORK_CHANGELOG.policy.eyebrow}
          </div>
          <div className="mt-1 text-sm text-white/80">{NETWORK_CHANGELOG.policy.value}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((i) => (
          <div
            key={i.label}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">{i.label}</div>
              <div className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(i.tone)}`}>
                {i.tone === "ok" ? "STABLE" : i.tone === "warn" ? "PENDING" : "LOGGED"}
              </div>
            </div>

            <div className={`mt-3 text-sm font-medium ${toneClass(i.tone)}`}>{i.value}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{i.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 text-xs text-white/52">{NETWORK_CHANGELOG.policy.detail}</div>
    </Surface>
  );
}

function TelemetryDisclosureStrip() {
  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>SERVICE COMMUNICATION</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Public service status is kept intentionally measured
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Orbitlink avoids blanket availability claims and exaggerated performance
            language. The published network view reflects verified service posture,
            readiness signals, change windows, and structured rollout status.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">STANDARD</div>
          <div className="mt-1 text-sm text-white/80">
            Verified status • measured language
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            t: "What we publish",
            b: "Verified readiness, confirmed changes, operating context, and address-qualified service posture.",
          },
          {
            t: "What we avoid",
            b: "Blanket availability promises, exaggerated speed marketing, and public claims not tied to confirmed conditions.",
          },
          {
            t: "When it updates",
            b: "After milestones complete, service conditions stabilize, and disclosure can remain accurate and defensible.",
          },
        ].map((item) => (
          <div
            key={item.t}
            className="rounded-[26px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              {item.t.toUpperCase()}
            </div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.b}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function EnterpriseReadinessStrip() {
  const items = [
    "Address-qualified service discussions",
    "Structured onboarding and delivery coordination",
    "Documented escalation path",
    "Measured public communication",
    "Business-oriented network updates",
    "Business-first service intake",
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>BUSINESS FIT</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Designed for buyers who want more than generic internet marketing
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Orbitlink is built for organizations that expect qualified service
            discussions, cleaner implementation flow, and more disciplined
            communication around business connectivity.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">FIT</div>
          <div className="mt-1 text-sm text-white/80">Business-first • infrastructure-minded</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/72 transition-all duration-300 hover:border-white/15 hover:bg-black/25"
          >
            {item}
          </div>
        ))}
      </div>
    </Surface>
  );
}

function CoverageAndCTA() {
  return (
    <Surface className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-white/10 p-6 lg:col-span-8 lg:border-b-0 lg:border-r sm:p-7">
          <SectionEyebrow>AVAILABILITY & INTAKE</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Service availability begins with qualified review
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Orbitlink does not use blanket coverage promises. Serviceability is
            reviewed per address, building conditions, required service type, and
            operating scope. This keeps deployment conversations more accurate from the beginning.
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-6 text-white/63">
            {NETWORK_COVERAGE_NOTE}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              View Services
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2">
            <Link href="/locations/barrie" className="underline hover:text-white">
              Business internet in Barrie
            </Link>
            <Link href="/locations/north-york" className="underline hover:text-white">
              Business internet in North York
            </Link>
            <Link href="/locations/niagara-st-catharines" className="underline hover:text-white">
              Business internet in Niagara / St. Catharines
            </Link>
            <Link href="/internet-near-me" className="underline hover:text-white">
              Business internet near me
            </Link>
          </div>
        </div>

        <div className="p-6 lg:col-span-4 sm:p-7">
          <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE SIGNAL</div>
            <div className="mt-3 text-lg font-semibold text-white">
              The strongest requests include business and technical scope up front
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Service address or building context",
                "Required service type or deployment scope",
                "Static IP, managed LAN, or continuity requirements",
                "Target timeline and operating constraints",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function NetworkIntegrityFooter() {
  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <SectionEyebrow>INTEGRITY NOTICE</SectionEyebrow>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            This page reflects Orbitlink’s current service posture and verified public
            network statements. Availability, rollout timing, and readiness notes are
            described carefully and updated only when they can be presented accurately.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE</div>
          <div className="mt-1 text-sm text-white/80">
            Measured language • no blanket overclaiming
          </div>
        </div>
      </div>
    </Surface>
  );
}

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Network Availability & Service Readiness",
        description:
          "Network availability and service readiness for Ontario businesses. Check fibre coverage, service options, and delivery by address.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
            name: "Network",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this a coverage map?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "No. This page shows Orbitlink’s business network view, not blanket service coverage. Availability is reviewed per address, building conditions, and service scope.",
            },
          },
          {
            "@type": "Question",
            name: "How does Orbitlink handle outages or incidents?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink follows a structured incident sequence: intake and scope confirmation, network diagnosis, and provider coordination when needed. Updates are handled with documented escalation and clearer ownership.",
            },
          },
          {
            "@type": "Question",
            name: "Do you publish performance claims like latency numbers?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink treats latency and route quality as service measurements, not headline marketing claims. Performance is explained with route, timing, and service context where relevant.",
            },
          },
          {
            "@type": "Question",
            name: "Where do services operate?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Orbitlink focuses on Ontario business connectivity, with serviceability confirmed through qualified intake by address and deployment scope.",
            },
          },
        ],
      },
    ],
  };
}

export default function NetworkPage() {
  return (
    <PageShell
      eyebrow="NETWORK"
      title="Network availability with clearer operating context"
      subtitle="Address-qualified business connectivity, structured escalation, and a more disciplined path from site review to next step."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <div className="space-y-4 sm:space-y-6">
        <HeroCommandPanel />
        <NextStepBridge />
        <WhatThisMeansStrip />
        <NetworkAtlas />
        <CapabilityField />
        <BuyerOutcomesStrip />
        <OperatingPhilosophy />
        <LatencyPosture />
        <EscalationModel />
        <AssuranceModel />
        <ChangeLogStrip />
        <TelemetryDisclosureStrip />
        <EnterpriseReadinessStrip />
        <CoverageAndCTA />
        <NetworkIntegrityFooter />
      </div>
    </PageShell>
  );
}