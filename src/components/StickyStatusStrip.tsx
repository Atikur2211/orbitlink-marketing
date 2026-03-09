// src/components/StickyStatusStrip.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STATUS_BAND } from "@/lib/siteStatus";

function toneDot(tone: "ok" | "warn" | "info") {
  if (tone === "ok") return "bg-emerald-400";
  if (tone === "warn") return "bg-[#FACC15]";
  return "bg-blue-400";
}

export default function StickyStatusStrip({
  watchId = "hero-sentinel",
  topOffset = 72,
  hideOnScrollDown = true,
}: {
  watchId?: string;
  topOffset?: number;
  hideOnScrollDown?: boolean;
}) {
  const [passedHero, setPassedHero] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(true);

  const lastHero = useRef<boolean>(false);
  const lastY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting;
        if (next !== lastHero.current) {
          lastHero.current = next;
          setPassedHero(next);
        }
      },
      { threshold: 0, rootMargin: "-120px 0px 0px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);

  useEffect(() => {
    if (!hideOnScrollDown) return;

    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (Math.abs(delta) > 6) {
          if (delta > 0) {
            setScrollVisible(false);
          } else {
            setScrollVisible(true);
          }
          lastY.current = y;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOnScrollDown]);

  const show = passedHero && scrollVisible;

  const mobileItems = useMemo(() => {
    const sys = STATUS_BAND.find((x) => x.label === "SYSTEM STATUS") ?? STATUS_BAND[0];
    const lat = STATUS_BAND.find((x) => x.label === "LATENCY") ?? STATUS_BAND[2];
    return [sys, lat].filter(Boolean);
  }, []);

  return (
    <div
      className={[
        "fixed left-0 right-0 z-40",
        "transition-all duration-250 ease-out",
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      ].join(" ")}
      style={{ top: `${topOffset}px` }}
      aria-hidden={!show}
    >
      <div className="pointer-events-none mx-auto max-w-6xl px-3 sm:px-7">
        <div
          className={[
            "pointer-events-auto",
            "rounded-2xl border border-white/10",
            "bg-black/55 px-3 py-2 backdrop-blur-xl sm:px-4",
            "shadow-[0_14px_50px_rgba(0,0,0,0.55)]",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACC15]" />
              </span>

              <div className="whitespace-nowrap text-[10px] tracking-[0.28em] text-white/55">
                ORBITLINK
              </div>

              <div className="hidden truncate text-[10px] text-white/35 sm:block">
                Business-ready service posture • trusted commercial path
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 sm:hidden">
                {mobileItems.map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                    <span className="whitespace-nowrap text-[11px] text-white/80">{i.value}</span>
                  </div>
                ))}
                <a
                  href="/contact#intake"
                  className="rounded-xl border border-white/12 bg-white/[0.04] px-2.5 py-1.5 text-[11px] whitespace-nowrap text-white/80 transition hover:bg-white/[0.07]"
                >
                  Contact
                </a>
              </div>

              <div className="hidden items-center gap-2 sm:flex sm:gap-3">
                {STATUS_BAND.map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                    <span className="hidden text-[10px] tracking-[0.18em] text-white/45 md:inline">
                      {i.label}
                    </span>
                    <span className="whitespace-nowrap text-[11px] text-white/80">{i.value}</span>
                  </div>
                ))}

                <a
                  href="/contact#intake"
                  className="ml-1 rounded-xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-[#FDE68A] transition hover:border-[#FACC15]/50 hover:bg-[#FACC15]/15"
                >
                  Check Availability
                </a>
              </div>
            </div>
          </div>

          <div className="mt-1.5 truncate text-[10px] text-white/35 sm:hidden">
            Availability reviewed by address • structured onboarding
          </div>
        </div>
      </div>
    </div>
  );
}