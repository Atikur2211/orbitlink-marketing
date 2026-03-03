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
  topOffset = 72, // keep below TopNav
  hideOnScrollDown = true,
}: {
  watchId?: string;
  topOffset?: number;
  hideOnScrollDown?: boolean;
}) {
  // shows only after hero is passed
  const [passedHero, setPassedHero] = useState(false);

  // scroll behavior: hide when scrolling down, show when scrolling up
  const [scrollVisible, setScrollVisible] = useState(true);

  const lastHero = useRef<boolean>(false);
  const lastY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting; // hero gone => true
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

        // tiny jitter guard (trackpads)
        if (Math.abs(delta) > 6) {
          if (delta > 0) {
            // scrolling down
            setScrollVisible(false);
          } else {
            // scrolling up
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

  // Final “should show”
  const show = passedHero && scrollVisible;

  // Calm mobile: show only 2 items (System + Latency)
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
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
      ].join(" ")}
      style={{ top: `${topOffset}px` }}
      aria-hidden={!show}
    >
      {/* OUTER must never block clicks outside the panel */}
      <div className="pointer-events-none mx-auto max-w-6xl px-3 sm:px-7">
        {/* PANEL can be clicked */}
        <div
          className={[
            "pointer-events-auto",
            "rounded-2xl border border-white/10",
            "bg-black/55 backdrop-blur-xl",
            "shadow-[0_14px_50px_rgba(0,0,0,0.55)]",
            "px-3 sm:px-4 py-2",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Left */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative inline-flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FACC15]/30 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACC15]" />
              </span>

              <div className="text-[10px] tracking-[0.28em] text-white/55 whitespace-nowrap">
                ORBITLINK
              </div>

              <div className="hidden sm:block text-[10px] text-white/35 truncate">
                Conservative disclosure • operator surface
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Mobile: 2 compact pills */}
              <div className="flex items-center gap-2 sm:hidden">
                {mobileItems.map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                    <span className="text-[11px] text-white/80 whitespace-nowrap">
                      {i.value}
                    </span>
                  </div>
                ))}
                <a
                  href="/network"
                  className="rounded-xl border border-white/12 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-white/80 hover:bg-white/[0.07] transition whitespace-nowrap"
                >
                  Open
                </a>
              </div>

              {/* Desktop: full pills + CTA */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                {STATUS_BAND.map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                    <span className="hidden md:inline text-[10px] tracking-[0.18em] text-white/45">
                      {i.label}
                    </span>
                    <span className="text-[11px] text-white/80 whitespace-nowrap">
                      {i.value}
                    </span>
                  </div>
                ))}

                <a
                  href="/coming-soon"
                  className="ml-1 rounded-xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-3 py-1.5 text-[11px] font-medium text-[#FDE68A] hover:bg-[#FACC15]/15 hover:border-[#FACC15]/50 transition whitespace-nowrap"
                >
                  Request Access
                </a>
              </div>
            </div>
          </div>

          {/* Microline on mobile (calm) */}
          <div className="mt-1.5 sm:hidden text-[10px] text-white/35 truncate">
            Live posture • measured rollout
          </div>
        </div>
      </div>
    </div>
  );
}


