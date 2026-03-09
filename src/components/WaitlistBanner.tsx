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
        title: "Thanks — your request has been submitted.",
        body: "We’ll review your address, service needs, and timeline, then reply with the clearest next step available.",
      };
    }

    if (!err) return null;

    if (err === "invalid") {
      return {
        tone: "warn" as const,
        eyebrow: "CHECK YOUR EMAIL",
        title: "That email address doesn’t look valid.",
        body: "Please enter a valid email address and submit the form again.",
      };
    }

    if (err === "blocked") {
      return {
        tone: "warn" as const,
        eyebrow: "REQUEST NOT ACCEPTED",
        title: "We couldn’t accept that request.",
        body: "Please review your details and try again, or email concierge@orbitlink.ca.",
      };
    }

    return {
      tone: "warn" as const,
      eyebrow: "TRY AGAIN",
      title: "We couldn’t process your request.",
      body: "Please try again in a moment, or email concierge@orbitlink.ca for help.",
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
            <div className="text-[11px] tracking-[0.28em] opacity-90">{state.eyebrow}</div>
          </div>

          <div className="mt-2 text-sm font-medium text-white sm:text-[15px]">
            {state.title}
          </div>

          <div className="mt-2 text-sm leading-6 text-white/75">{state.body}</div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
          aria-label="Dismiss message"
        >
          {isOk ? "Dismiss" : "Close"}
        </button>
      </div>
    </div>
  );
}