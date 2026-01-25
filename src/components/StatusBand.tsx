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
    <section className="mx-auto max-w-6xl px-5 sm:px-7 mt-7 sm:mt-10">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-xl">
        {/* Header strip */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FACC15]/35 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>
            <div className="text-[11px] tracking-[0.28em] text-white/55">LIVE POSTURE</div>
          </div>

          <div className="text-[11px] tracking-[0.22em] text-white/45">
            Operator surface • conservative statements
          </div>
        </div>

        {/* Tiles */}
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATUS_BAND.map((i) => (
              <div
                key={i.label}
                className="group rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5 transition hover:bg-black/30 hover:border-white/15"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">{i.label}</div>

                  <div className={`rounded-full border px-3 py-1.5 text-[11px] ${tonePill(i.tone)}`}>
                    {i.tone === "ok" ? "OK" : i.tone === "warn" ? "WATCH" : "INFO"}
                  </div>
                </div>

                <div className={`mt-3 text-base sm:text-[17px] font-medium ${toneText(i.tone)}`}>
                  {i.value}
                </div>

                {i.note ? (
                  <div className="mt-2 text-xs text-white/55 leading-5 max-w-[34ch]">{i.note}</div>
                ) : (
                  <div className="mt-2 text-xs text-white/40 leading-5">Telemetry-aligned disclosure</div>
                )}

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
