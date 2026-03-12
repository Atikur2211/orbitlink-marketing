// src/components/StatusBand.tsx
import { STATUS_BAND } from "@/lib/siteStatus";

function toneText(tone: "ok" | "warn" | "info") {
  if (tone === "ok") return "text-emerald-200";
  if (tone === "warn") return "text-[#FDE68A]";
  return "text-blue-200";
}

function tonePill(tone: "ok" | "warn" | "info") {
  if (tone === "ok") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  if (tone === "warn") return "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";
  return "border-blue-400/20 bg-blue-500/10 text-blue-200";
}

export default function StatusBand() {
  return (
    <section className="relative z-[20] mx-auto mt-4 max-w-6xl px-5 sm:mt-6 sm:px-7">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="flex flex-col gap-2 border-b border-white/10 bg-black/15 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>

            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.28em] text-white/55 sm:text-[11px]">
                BUSINESS STATUS
              </div>
              <div className="mt-1 text-sm text-white/78">
                Business service posture active
              </div>
            </div>
          </div>

          <div className="text-[11px] tracking-[0.18em] text-white/45 sm:text-right">
            Address-qualified availability • structured onboarding
          </div>
        </div>

        <div className="p-3 sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STATUS_BAND.map((i) => (
              <div
                key={i.label}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 text-[10px] tracking-[0.20em] text-white/55 sm:text-[11px] sm:tracking-[0.22em]">
                    {i.label}
                  </div>

                  <div
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-[11px] ${tonePill(i.tone)}`}
                  >
                    {i.tone === "ok" ? "OK" : i.tone === "warn" ? "WATCH" : "INFO"}
                  </div>
                </div>

                <div className={`mt-3 text-[16px] font-medium sm:text-[18px] ${toneText(i.tone)}`}>
                  {i.value}
                </div>

                <div className="mt-2 text-[11px] leading-5 text-white/58 sm:text-xs">
                  {i.note ?? "Business-ready service communication"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}