// src/components/StatusBand.tsx
import { STATUS_BAND } from "@/lib/siteStatus";

function toneText(tone: "ok" | "warn" | "info") {
  if (tone === "ok") return "text-emerald-200";
  if (tone === "warn") return "text-[#FDE68A]";
  return "text-blue-200";
}

function toneDot(tone: "ok" | "warn" | "info") {
  if (tone === "ok") return "bg-emerald-400";
  if (tone === "warn") return "bg-[#FACC15]";
  return "bg-blue-400";
}

function tonePill(tone: "ok" | "warn" | "info") {
  if (tone === "ok") {
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  }
  if (tone === "warn") {
    return "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";
  }
  return "border-blue-400/20 bg-blue-500/10 text-blue-200";
}

export default function StatusBand() {
  return (
    <section className="relative z-[120] border-b border-white/10 bg-black/24 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-7">
        <div className="flex min-h-[54px] items-center">
          <div className="grid w-full grid-cols-1 gap-2 py-3 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/30 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.26em] text-white/46 sm:text-[11px]">
                  NETWORK STATUS
                </div>
                <div className="mt-0.5 text-sm text-white/74">
                  Business service posture active
                </div>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-0.5 lg:justify-end">
              {STATUS_BAND.map((item) => (
                <div
                  key={item.label}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${toneDot(item.tone)}`} />

                  <span className="text-[11px] tracking-[0.18em] text-white/46">
                    {item.label}
                  </span>

                  <span className={`text-sm font-medium ${toneText(item.tone)}`}>
                    {item.value}
                  </span>

                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${tonePill(item.tone)}`}
                  >
                    {item.tone === "ok" ? "OK" : item.tone === "warn" ? "WATCH" : "INFO"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}