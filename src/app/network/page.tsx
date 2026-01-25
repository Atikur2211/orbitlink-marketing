// src/app/network/page.tsx
import PageShell from "@/components/PageShell";
import {
  NETWORK_CAPABILITIES,
  NETWORK_COVERAGE_NOTE,
  NETWORK_METRICS,
  NETWORK_CHANGELOG,
} from "@/lib/siteStatus";

function toneClass(tone: "ok" | "info" | "warn") {
  if (tone === "ok") return "text-emerald-300";
  if (tone === "warn") return "text-[#FACC15]";
  return "text-blue-300";
}

function tonePill(tone: "ok" | "info" | "warn") {
  if (tone === "ok") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  if (tone === "warn") return "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";
  return "border-blue-400/20 bg-blue-500/10 text-blue-200";
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
    tone === "ok"
      ? "bg-emerald-400"
      : tone === "warn"
      ? "bg-[#FACC15]"
      : "bg-blue-400";

  return (
    <div className="absolute" style={{ left, top }}>
      <div className={`relative h-3 w-3 rounded-full ${dot}`}>
        <div className={`absolute inset-0 rounded-full ${dot}/40 animate-ping`} />
      </div>
      <div className="mt-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
        <div className="text-[10px] tracking-[0.22em] text-white/55">{label}</div>
        <div className="mt-1 text-xs text-white/75">{role}</div>
      </div>
    </div>
  );
}

function PopMap() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25">
      <div className="p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              NETWORK MAP
            </div>
            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
              POP posture & routing surface
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
              A calm representation of presence and operational posture. This is not a marketing
              coverage map — it reflects how we think about reliability, telemetry, and escalation.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">MODE</div>
            <div className="mt-1 text-sm text-white/80">
              Measured rollout • Evidence-first
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] border-t border-white/10">
        {/* Ambient gradient + grid */}
        <div className="absolute inset-0 opacity-[0.22]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(250,204,21,0.15),transparent_55%),radial-gradient(circle_at_70%_35%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(circle_at_55%_75%,rgba(16,185,129,0.12),transparent_55%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        {/* Fiber line (calm pulse) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/45 to-transparent" />
          <div className="h-[3px] w-32 bg-blue-400/35 blur-md orbit-slide" />
        </div>

        {/* Nodes */}
        <PopNode left="18%" top="56%" label="MISSISSAUGA" tone="ok" role="Primary edge" />
        <PopNode left="44%" top="42%" label="TORONTO" tone="info" role="Interconnect" />
        <PopNode left="68%" top="62%" label="OTTAWA" tone="warn" role="Expansion path" />
        <PopNode left="78%" top="36%" label="MONTREAL" tone="info" role="Transit peer" />

        <div className="absolute bottom-3 right-4 text-[10px] text-white/55">
          Visual posture • not a service availability map
        </div>
      </div>
    </div>
  );
}

function PopList() {
  const pops = [
    {
      name: "Mississauga (Primary Edge)",
      status: "Operational",
      tone: "ok" as const,
      note: "Primary monitoring & escalation anchor.",
    },
    {
      name: "Toronto (Interconnect)",
      status: "Observed",
      tone: "info" as const,
      note: "Interconnect posture and telemetry alignment.",
    },
    {
      name: "Montreal (Transit Peer)",
      status: "Observed",
      tone: "info" as const,
      note: "Transit posture and routing discipline.",
    },
    {
      name: "Ottawa (Expansion Path)",
      status: "Planned",
      tone: "warn" as const,
      note: "Expansion remains milestone-driven (no overclaiming).",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">EDGE POP LIST</div>
      <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
        Presence expressed as operational roles
      </h2>
      <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
        POPs are presented as operational components (edge, interconnect, peer). Status is
        conservative and updated as delivery milestones are completed.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {pops.map((p) => (
          <div key={p.name} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-medium text-white/90">{p.name}</div>
              <div className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(p.tone)}`}>
                {p.status}
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/65">{p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LatencyPosture() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">LATENCY POSTURE</div>
      <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
        Measured, documented, and explained
      </h2>
      <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
        We treat latency as an operational signal — not a marketing number. Measurements are contextual:
        route, time window, upstream conditions, and the client’s physical last-mile environment.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">BASELINE</div>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Baselines are recorded per service profile, not “one number for everyone.”
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">CHANGE CONTROL</div>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Routing or policy changes follow staged rollout and validation before broader release.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">EVIDENCE</div>
          <p className="mt-3 text-sm leading-6 text-white/65">
            When issues occur, we document what changed, what we observed, and what resolved it.
          </p>
        </div>
      </div>
    </div>
  );
}

function EscalationModel() {
  const steps = [
    {
      level: "L1 — Intake & Confirmation",
      bullets: [
        "Confirm scope: single site vs area signal",
        "Verify power, link state, and basic path tests",
        "Collect timestamps and a simple description of symptoms",
      ],
    },
    {
      level: "L2 — Network Diagnosis",
      bullets: [
        "Telemetry review: path stability and error posture",
        "Route / upstream checks (as applicable)",
        "Determine whether issue is local, upstream, or equipment-related",
      ],
    },
    {
      level: "L3 — Provider & Remediation",
      bullets: [
        "Engage upstream/partner escalation when required",
        "Maintain documented timeline and client updates",
        "Close-out report with resolution summary and prevention notes",
      ],
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">ESCALATION MODEL</div>
      <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
        Predictable response, disciplined updates
      </h2>
      <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
        We keep escalation structured and calm: clear ownership, clear timestamps, and a predictable
        sequence of checks before vendor escalation.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {steps.map((s) => (
          <div key={s.level} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">{s.level}</div>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {s.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChangeLogStrip() {
  const items = [
    NETWORK_CHANGELOG.last_change,
    NETWORK_CHANGELOG.current_posture,
    NETWORK_CHANGELOG.next_window,
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            CHANGE LOG
          </div>
          <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
            Controlled updates, disclosed responsibly
          </h2>
          <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
            Orbitlink maintains a conservative change posture. We disclose maintenance windows and
            updates when they are confirmed, and we document what changed, what was observed, and
            what stabilized.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            {NETWORK_CHANGELOG.policy.eyebrow}
          </div>
          <div className="mt-1 text-sm text-white/80">
            {NETWORK_CHANGELOG.policy.value}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {items.map((i) => (
          <div
            key={i.label}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                {i.label}
              </div>
              <div
                className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(
                  i.tone
                )}`}
              >
                {i.tone === "ok" ? "STABLE" : i.tone === "warn" ? "PENDING" : "LOGGED"}
              </div>
            </div>

            <div className={`mt-3 text-sm font-medium ${toneClass(i.tone)}`}>
              {i.value}
            </div>
            <p className="mt-3 text-sm leading-6 text-white/65">{i.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 text-xs text-white/55">
        {NETWORK_CHANGELOG.policy.detail}
      </div>
    </div>
  );
}

function NetworkIntegrityFooter() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            INTEGRITY NOTICE
          </div>
          <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
            This page reflects operational posture and telemetry-driven status statements. Coverage,
            timelines, and milestones are disclosed conservatively and updated only when confirmed.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">DISCLOSURE</div>
          <div className="mt-1 text-sm text-white/80">
            No overclaiming • Controlled rollout
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <a
          href="/coming-soon"
          className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
        >
          Request Access
        </a>
        <a
          href="/trust"
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
        >
          Trust & Compliance
        </a>
      </div>
    </div>
  );
}

export default function NetworkPage() {
  return (
    <PageShell
      eyebrow="NETWORK"
      title="Operational Surface"
      subtitle="A calm view of delivery posture: telemetry, routing discipline, controlled rollout, and predictable escalation."
    >
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {NETWORK_METRICS.map((m) => (
          <div
            key={m.label}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="text-[11px] tracking-[0.22em] text-white/55">{m.label}</div>
              <div className="flex items-center gap-2">
                <div className={`text-sm font-medium ${toneClass(m.tone)}`}>{m.value}</div>
                <div className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(m.tone)}`}>
                  {m.tone === "ok" ? "OK" : m.tone === "warn" ? "WATCH" : "INFO"}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/65">{m.note}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="mt-4 sm:mt-6">
        <PopMap />
      </div>

      {/* POP list */}
      <div className="mt-4 sm:mt-6">
        <PopList />
      </div>

      {/* Capability grid */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">CAPABILITIES</div>
        <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
          Infrastructure-grade operations
        </h2>
        <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
          Orbitlink is designed to feel like an operator platform: measured performance, disciplined
          change management, and transparency-first delivery.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {NETWORK_CAPABILITIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-medium text-white/90">{c.title}</div>
              <p className="mt-2 text-sm leading-6 text-white/65">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latency posture */}
      <div className="mt-4 sm:mt-6">
        <LatencyPosture />
      </div>

      {/* Escalation model */}
      <div className="mt-4 sm:mt-6">
        <EscalationModel />
      </div>
      
      {/* Change log strip */}
      <div className="mt-4 sm:mt-6">
        <ChangeLogStrip />
      </div>

      {/* Coverage / note strip */}
      <div className="mt-4 sm:mt-6 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">COVERAGE</div>
        <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
          {NETWORK_COVERAGE_NOTE}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="/coming-soon"
            className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
          >
            Request Access
          </a>
          <a
            href="/solutions"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
          >
            View Modules
          </a>
        </div>
      </div>

      {/* Network integrity footer */}
      <div className="mt-4 sm:mt-6">
        <NetworkIntegrityFooter />
      </div>

      </PageShell>
      );
      }
