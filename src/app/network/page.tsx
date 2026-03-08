// src/app/network/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import {
  NETWORK_CAPABILITIES,
  NETWORK_COVERAGE_NOTE,
  NETWORK_METRICS,
  NETWORK_CHANGELOG,
} from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/network`;
const OG_IMAGE_URL = `${SITE_URL}/network/opengraph-image`;

export const metadata: Metadata = {
  title: "Network Posture & Operations",
  description:
    "Operator-grade network posture for enterprises in Ontario: telemetry-driven operations, routing discipline, controlled rollout, and predictable escalation.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Network Posture & Operations · Orbitlink",
    description:
      "Operational surface: telemetry, routing discipline, controlled rollout, and predictable escalation — expressed conservatively and updated only when verifiable.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink — Network Visibility & Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Posture & Operations · Orbitlink",
    description:
      "Operator-grade posture: telemetry, routing discipline, controlled rollout, and predictable escalation.",
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
    <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 sm:p-6">
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
            <SectionEyebrow>NETWORK COMMAND SURFACE</SectionEyebrow>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Evidence-first posture
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Controlled rollout
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Enterprise disclosure
            </span>
          </div>
        </div>
      </div>

      <div className="relative px-6 py-7 sm:px-7 sm:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.02]">
              A cinematic operator surface for
              <span className="block text-white/68">network posture, disclosure, and trust.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-[15px]">
              Orbitlink presents network posture the way enterprise buyers expect to see it:
              measured, conservative, and operationally credible. This page is not a coverage
              advertisement. It is a calm command layer for telemetry, routing discipline, staged
              change management, and predictable escalation.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/coming-soon?intent=access&source=network_hero"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Request Access
              </a>
              <a
                href="/trust"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Review Trust Posture
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] tracking-[0.22em] text-white/50">LIVE MODE</div>
                  <div className="mt-2 text-lg font-semibold text-white">Conservative operational view</div>
                </div>

                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-[11px] text-cyan-200">
                  ACTIVE
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Public statements reflect verified posture only.",
                  "Change windows are disclosed when confirmed.",
                  "Escalation follows documented sequence and ownership.",
                  "Performance is expressed as measured context, not overclaim.",
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
            <SectionEyebrow>ATLAS</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
              POP posture, routing surface, and interconnect narrative
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
              This visual layer is intentionally calm. It shows how Orbitlink thinks about edge
              roles, interconnect posture, transit awareness, and milestone-driven expansion —
              without pretending to be a universal service coverage map.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">DISPLAY MODE</div>
            <div className="mt-1 text-sm text-white/80">Posture • roles • disclosure-safe</div>
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

        <PopNode left="18%" top="58%" label="MISSISSAUGA" tone="ok" role="Primary edge" />
        <PopNode left="44%" top="44%" label="TORONTO" tone="info" role="Interconnect" />
        <PopNode left="69%" top="62%" label="OTTAWA" tone="warn" role="Expansion path" />
        <PopNode left="79%" top="34%" label="MONTREAL" tone="info" role="Transit peer" />

        <div className="absolute bottom-4 right-5 text-[10px] text-white/50">
          Visual posture only • not a service availability map
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4 sm:px-7">
        {[
          {
            name: "Mississauga",
            status: "Operational",
            tone: "ok" as const,
            note: "Primary monitoring, intake confidence, and escalation anchor.",
          },
          {
            name: "Toronto",
            status: "Observed",
            tone: "info" as const,
            note: "Interconnect visibility and posture alignment across service narrative.",
          },
          {
            name: "Montreal",
            status: "Observed",
            tone: "info" as const,
            note: "Transit awareness and route discipline in the broader operating surface.",
          },
          {
            name: "Ottawa",
            status: "Planned",
            tone: "warn" as const,
            note: "Milestone-driven expansion without speculative public claims.",
          },
        ].map((p) => (
          <div key={p.name} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
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

function CapabilityField() {
  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>CAPABILITY FIELD</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Infrastructure-grade operations, shown as operating habits
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            The value of a network platform is not just what it sells. It is how it behaves under
            pressure, how it communicates change, and how consistently it converts telemetry into
            disciplined action.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
          <div className="mt-1 text-sm text-white/80">Calm • measured • operator-led</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {NETWORK_CAPABILITIES.map((c) => (
          <div key={c.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">{c.title}</div>
            <p className="mt-2 text-sm leading-6 text-white/63">{c.desc}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function OperatingPhilosophy() {
  const items = [
    {
      t: "Measured disclosure",
      b: "Public statements are updated when milestones are complete, not when intent exists.",
    },
    {
      t: "Contextual performance",
      b: "Latency, route quality, and readiness are explained with operational context rather than generic headline claims.",
    },
    {
      t: "Evidence retention",
      b: "Changes are documented with enough clarity to support enterprise review and post-incident understanding.",
    },
    {
      t: "Escalation discipline",
      b: "Incident motion follows ownership, timestamps, escalation thresholds, and resolution notes.",
    },
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <SectionEyebrow>OPERATING PHILOSOPHY</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
        Network confidence comes from operating behavior, not slogans
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
        Buyers stay longer on pages that feel credible. This layer explains how Orbitlink operates
        so enterprise reviewers, property stakeholders, and technical evaluators can see a real
        posture instead of a decorative promise.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.t} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
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
      <SectionEyebrow>LATENCY POSTURE</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
        Measured, documented, and explained
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
        We treat latency as an operational signal, not a promotional number. What matters is not
        just the result, but the conditions: route, time window, upstream state, client edge, and
        the physical last-mile environment.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            t: "Baseline discipline",
            b: "Baselines are tied to profile and route conditions, not flattened into one public number.",
          },
          {
            t: "Change-aware interpretation",
            b: "When path or policy shifts, measurements are reviewed against rollout sequence and operational context.",
          },
          {
            t: "Evidence-backed narrative",
            b: "Issues are explained in terms of what changed, what was observed, and what stabilized the environment.",
          },
        ].map((item) => (
          <div key={item.t} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
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
      level: "L1 — Intake & Confirmation",
      bullets: [
        "Confirm scope: single site vs area signal",
        "Verify power, link state, and basic path tests",
        "Collect timestamps and a plain-language symptom description",
      ],
    },
    {
      level: "L2 — Network Diagnosis",
      bullets: [
        "Review telemetry, path stability, and error posture",
        "Check route and upstream signals where applicable",
        "Identify whether condition is local, upstream, or equipment-related",
      ],
    },
    {
      level: "L3 — Provider & Remediation",
      bullets: [
        "Engage upstream escalation where necessary",
        "Maintain client updates against a documented timeline",
        "Close with resolution notes and prevention posture",
      ],
    },
  ];

  return (
    <Surface className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <SectionEyebrow>ESCALATION MODEL</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Predictable response, disciplined updates
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Enterprise trust grows when incident motion feels ordered. This model reflects a clear
            intake path, diagnostic logic, and escalation sequence before provider remediation.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">OUTCOME</div>
          <div className="mt-1 text-sm text-white/80">Faster alignment • cleaner updates</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {steps.map((s) => (
          <div key={s.level} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
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
          <SectionEyebrow>CHANGE LOG</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Controlled updates, disclosed responsibly
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            Maintenance windows and routing changes are communicated when confirmed. Public language
            remains conservative until milestones complete and outcomes can be described cleanly.
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
          <div key={i.label} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
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
          <SectionEyebrow>TELEMETRY & DISCLOSURE</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Status is reported conservatively
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            We avoid broad availability language and unverified performance claims. The published
            network surface reflects observed signals, documented posture, support readiness, and
            confirmed rollout state.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">STANDARD</div>
          <div className="mt-1 text-sm text-white/80">Evidence-first • scope-locked</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            t: "What we publish",
            b: "Verified posture, change windows, readiness statements, and operational context.",
          },
          {
            t: "What we avoid",
            b: "Blanket service promises, vague speed marketing, and unverified universal availability.",
          },
          {
            t: "When it updates",
            b: "After milestones complete, conditions stabilize, and disclosure language can remain precise.",
          },
        ].map((item) => (
          <div key={item.t} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">{item.t.toUpperCase()}</div>
            <p className="mt-3 text-sm leading-6 text-white/63">{item.b}</p>
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
          <SectionEyebrow>COVERAGE & INTAKE</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[32px]">
            Availability is introduced through controlled onboarding
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 sm:text-[15px]">
            {NETWORK_COVERAGE_NOTE}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/coming-soon?intent=access&source=network"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Access
            </a>
            <a
              href="/solutions"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              View Modules
            </a>
          </div>
        </div>

        <div className="p-6 lg:col-span-4 sm:p-7">
          <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE SIGNAL</div>
            <div className="mt-3 text-lg font-semibold text-white">
              Best requests include scope from the start
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Service address or building context",
                "Required module or delivery posture",
                "Static IP / managed LAN / continuity needs",
                "Timeline and operational constraints",
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
            This page reflects operational posture and telemetry-driven status statements.
            Coverage, timelines, milestones, and readiness notes are disclosed conservatively and
            updated only when confirmed.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE</div>
          <div className="mt-1 text-sm text-white/80">No overclaiming • controlled rollout</div>
        </div>
      </div>
    </Surface>
  );
}

export default function NetworkPage() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Orbitlink",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
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
      addressCountry: "CA",
      addressRegion: "ON",
      addressLocality: "Mississauga",
    },
  };

  const schemaTelecom = {
    "@context": "https://schema.org",
    "@type": "TelecomService",
    "@id": `${PAGE_URL}#telecom`,
    name: "Business Fibre & Network Infrastructure",
    provider: { "@id": `${SITE_URL}/#org` },
    serviceType: [
      "Business Internet",
      "Fibre Connectivity",
      "Managed Network Services",
      "Network Monitoring and Escalation",
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario, Canada" },
      { "@type": "City", name: "Mississauga" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Business",
    },
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
        name: "Network",
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
        name: "Is this a coverage map?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. The network page is a posture view. It reflects operational roles, telemetry discipline, and controlled rollout, not broad availability claims.",
        },
      },
      {
        "@type": "Question",
        name: "How does Orbitlink handle outages or incidents?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Escalation follows a structured model: intake and confirmation, network diagnosis, then provider remediation when required. Updates are timestamped and disciplined.",
        },
      },
      {
        "@type": "Question",
        name: "Do you publish performance claims like latency numbers?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We treat latency as an operational signal and publish conservatively. Measurements are contextual and tied to route, time windows, and upstream conditions.",
        },
      },
      {
        "@type": "Question",
        name: "Where do services operate?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Orbitlink focuses on Ontario with controlled onboarding windows. Availability is confirmed per address and engagement scope.",
        },
      },
    ],
  };

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [schemaOrg, schemaTelecom, schemaBreadcrumbs, schemaFaq],
  };

  return (
    <PageShell
      eyebrow="NETWORK"
      title="Operational Surface"
      subtitle="A calm, cinematic control layer for telemetry, routing discipline, disclosure, and predictable escalation."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="space-y-4 sm:space-y-6">
        <HeroCommandPanel />
        <NetworkAtlas />
        <CapabilityField />
        <OperatingPhilosophy />
        <LatencyPosture />
        <EscalationModel />
        <ChangeLogStrip />
        <TelemetryDisclosureStrip />
        <CoverageAndCTA />
        <NetworkIntegrityFooter />
      </div>
    </PageShell>
  );
}