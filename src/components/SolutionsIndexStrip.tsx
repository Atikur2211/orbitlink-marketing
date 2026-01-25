// src/components/SolutionsIndexStrip.tsx
import { MODULE_SPECS } from "@/lib/siteStatus";

export default function SolutionsIndexStrip() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 overflow-hidden">
      {/* subtle animated rail (no styled-jsx) */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute -left-24 top-0 h-px w-56 bg-gradient-to-r from-transparent via-[#FACC15]/35 to-transparent orbit-slide" />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              MODULE INDEX
            </div>
            <div className="mt-2 text-sm text-white/80">
              Operator-grade delivery posture • controlled onboarding
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              {MODULE_SPECS.length} modules
            </span>
            <span className="rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-3 py-1.5 text-[#FDE68A]">
              conservative disclosure
            </span>
          </div>
        </div>

        {/* quick anchors (quiet + premium) */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {MODULE_SPECS.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/80 hover:bg-white/10 transition"
            >
              {m.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
