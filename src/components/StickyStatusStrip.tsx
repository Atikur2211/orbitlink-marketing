"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STATUS_BAND } from "@/lib/siteStatus";

function toneDot(tone: "ok" | "warn" | "info") {
  if (tone === "ok") return "bg-emerald-400";
  if (tone === "warn") return "bg-[#FACC15]";
  return "bg-cyan-400";
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
        "transition-all duration-300 ease-out",
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      ].join(" ")}
      style={{ top: `${topOffset}px` }}
      aria-hidden={!show}
    >
      <div className="pointer-events-none mx-auto max-w-7xl px-3 sm:px-7 lg:px-10">
        <div
          className={[
            "pointer-events-auto relative overflow-hidden",
            "rounded-2xl border border-white/10",
            "bg-[#06080C]/78 px-3 py-2.5 backdrop-blur-2xl sm:px-4",
            "shadow-[0_14px_50px_rgba(0,0,0,0.55)]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.00))]" />
            <div className="absolute -left-8 top-0 h-14 w-14 rounded-full bg-cyan-400/10 blur-2xl" />
            <div className="absolute right-0 top-0 h-14 w-14 rounded-full bg-emerald-400/10 blur-2xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute left-[8%] top-1/2 h-px w-[24%] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
            <div className="absolute right-[10%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          <div className="relative flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-2.5">
              <span className="relative inline-flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACC15]" />
              </span>

              <div className="whitespace-nowrap text-[10px] tracking-[0.30em] text-white/80">
                ORBITLINK
              </div>

              <div className="hidden truncate text-[10px] text-white/38 sm:block">
                Ontario commercial service review • address-first qualification
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
                  className="rounded-xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-2.5 py-1.5 text-[11px] whitespace-nowrap text-[#FDE68A] transition hover:border-[#FACC15]/50 hover:bg-[#FACC15]/15"
                >
                  Contact
                </a>
              </div>

              <div className="hidden items-center gap-2 sm:flex sm:gap-3">
                {STATUS_BAND.map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                    <span className="hidden text-[10px] tracking-[0.18em] text-white/42 md:inline">
                      {i.label}
                    </span>
                    <span className="whitespace-nowrap text-[11px] text-white/82">{i.value}</span>
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

          <div className="mt-1.5 truncate text-[10px] text-white/38 sm:hidden">
            Availability reviewed by address • business-only intake • Ontario commercial coverage
          </div>
        </div>
      </div>
    </div>
  );
}