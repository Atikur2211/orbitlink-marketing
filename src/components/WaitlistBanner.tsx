// src/components/WaitlistBanner.tsx
"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Dot({ tone }: { tone: "ok" | "warn" }) {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      <span
        className={[
          "absolute inline-flex h-full w-full rounded-full animate-ping",
          tone === "ok" ? "bg-emerald-400/25" : "bg-[#FACC15]/25",
        ].join(" ")}
      />
      <span
        className={[
          "relative inline-flex h-2 w-2 rounded-full",
          tone === "ok" ? "bg-emerald-400" : "bg-[#FACC15]",
        ].join(" ")}
      />
    </span>
  );
}

export default function WaitlistBanner() {
  const sp = useSearchParams();
  const ok = sp.get("ok");
  const err = sp.get("error");

  const router = useRouter();
  const pathname = usePathname();

  const state = useMemo(() => {
    if (ok === "1") {
      return {
        tone: "ok" as const,
        eyebrow: "REQUEST RECEIVED",
        title: "You’re on the early access list.",
        body: "We’ll notify you when the next intake window opens. No marketing noise.",
      };
    }

    if (!err) return null;

    if (err === "invalid") {
      return {
        tone: "warn" as const,
        eyebrow: "CHECK EMAIL",
        title: "That address doesn’t look valid.",
        body: "Please enter a real email and try again.",
      };
    }

    if (err === "blocked") {
      return {
        tone: "warn" as const,
        eyebrow: "UNAVAILABLE",
        title: "That request couldn’t be accepted.",
        body: "If you think this is a mistake, email concierge@orbitlink.ca.",
      };
    }

    return {
      tone: "warn" as const,
      eyebrow: "TRY AGAIN",
      title: "We couldn’t process the request.",
      body: "Please retry in a moment, or email concierge@orbitlink.ca.",
    };
  }, [ok, err]);

  if (!state) return null;

  const isOk = state.tone === "ok";
  const toneClass = isOk
    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
    : "border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FDE68A]";

  const onClear = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className={["rounded-3xl border p-4 sm:p-5", toneClass].join(" ")}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Dot tone={state.tone} />
            <div className="text-[11px] tracking-[0.28em] opacity-90">
              {state.eyebrow}
            </div>
          </div>

          <div className="mt-2 text-sm sm:text-[15px] font-medium text-white">
            {state.title}
          </div>

          <div className="mt-2 text-sm leading-6 text-white/75">
            {state.body}
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-2xl border px-3 py-2 text-xs transition border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
          aria-label="Dismiss message"
        >
          {isOk ? "Dismiss" : "Try again"}
        </button>
      </div>
    </div>
  );
}
