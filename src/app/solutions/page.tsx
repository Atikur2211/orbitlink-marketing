// src/app/solutions/page.tsx
import PageShell from "@/components/PageShell";
import StickyModuleNav from "@/components/StickyModuleNav";
import { MODULE_SPECS } from "@/lib/siteStatus";

function toneStyles(tone: "blue" | "gold" | "emerald") {
  if (tone === "blue")
    return {
      chip: "text-blue-200 bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/15",
      dot: "bg-blue-400",
      line: "from-blue-500/0 via-blue-400/35 to-blue-500/0",
      glow:
        "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_22px_70px_rgba(59,130,246,0.08)]",
    };

  if (tone === "emerald")
    return {
      chip: "text-emerald-200 bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-500/15",
      dot: "bg-emerald-400",
      line: "from-emerald-500/0 via-emerald-400/30 to-emerald-500/0",
      glow:
        "hover:shadow-[0_0_0_1px_rgba(16,185,129,0.16),0_22px_70px_rgba(16,185,129,0.08)]",
    };

  return {
    chip: "text-[#FDE68A] bg-[#FACC15]/10 border-[#FACC15]/25 hover:bg-[#FACC15]/15",
    dot: "bg-[#FACC15]",
    line: "from-[#FACC15]/0 via-[#FACC15]/35 to-[#FACC15]/0",
    glow:
      "hover:shadow-[0_0_0_1px_rgba(250,204,21,0.16),0_22px_70px_rgba(250,204,21,0.08)]",
  };
}

function SpecCard({ m }: { m: (typeof MODULE_SPECS)[number] }) {
  const s = toneStyles(m.tone);

  return (
    <section
      id={m.id}
      className={[
        // So TopNav + StickyModuleNav never cover headings on hash jump
        "scroll-mt-[168px] md:scroll-mt-[184px]",
        "rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7",
        "transition hover:border-white/15",
        s.glow,
      ].join(" ")}
    >
      {/* Accent header */}
      <div className="relative">
        <div className={`h-px w-full bg-gradient-to-r ${s.line}`} />

        <div className="mt-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="min-w-0">
            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1",
                "text-[11px] tracking-[0.22em]",
                s.chip,
              ].join(" ")}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              MODULE
            </div>

            <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white">
              {m.name}
            </h2>

            <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/65 max-w-3xl">
              {m.tagline}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              ONBOARDING
            </div>
            <div className="mt-1 text-sm text-white/80">{m.onboarding}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">PURPOSE</div>
          <p className="mt-3 text-sm leading-6 text-white/65">{m.purpose}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">IDEAL FOR</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {m.idealFor.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            DELIVERABLES
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {m.deliverables.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA strip */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              NEXT STEP
            </div>
            <div className="mt-2 text-sm text-white/70">
              Request access with your location + module + target go-live date.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
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
            <a
              href="/network"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Network Posture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const modules = MODULE_SPECS.map((m) => ({
    id: m.id,
    name: m.name,
    tone: m.tone,
  }));

  return (
    <PageShell
      eyebrow="SOLUTIONS"
      title="Service Modules"
      subtitle="Each module is delivered with controlled onboarding, clear documentation, and an operator-grade support posture."
    >
      {/* TOP GATE: nav appears after this scrolls out */}
      <div id="solutions-sentinel" className="h-px w-full" />

      {/* Sticky index (auto-highlight + sliding indicator + progress + gates) */}
      <StickyModuleNav
        modules={modules}
        watchOffsetTop={72}
        watchId="solutions-sentinel"
        bottomWatchId="solutions-bottom-sentinel"
      />

      {/* Modules */}
      <div className="mt-6 grid gap-4 sm:gap-5">
        {MODULE_SPECS.map((m) => (
          <SpecCard key={m.id} m={m} />
        ))}
      </div>

      {/* BOTTOM GATE: nav fades out when this enters */}
      <div id="solutions-bottom-sentinel" className="h-px w-full" />

      {/* Integrity footer */}
      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              INTEGRITY
            </div>
            <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/70">
              Modules are introduced through controlled onboarding windows. Public statements remain
              conservative until milestones are verified.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
            <div className="mt-1 text-sm text-white/80">
              Controlled rollout • Evidence-first
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
          <a
            href="/network"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
          >
            Network Posture
          </a>
        </div>
      </div>
    </PageShell>
  );
}
