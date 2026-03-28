"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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

  const lastHero = useRef(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

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
          setScrollVisible(delta < 0);
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
    const availability =
      STATUS_BAND.find((x) => x.label === "AVAILABILITY") ?? STATUS_BAND[1];
    const trust =
      STATUS_BAND.find((x) => x.label === "TRUST POSTURE") ?? STATUS_BAND[3];
    return [availability, trust].filter(Boolean);
  }, []);

  return (
    <div
      className={[
        "fixed left-0 right-0 z-40",
        "transition-all duration-300 ease-out",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      ].join(" ")}
      style={{ top: `${topOffset}px` }}
      aria-hidden={!show}
    >
      <div className="pointer-events-none mx-auto max-w-7xl px-3 sm:px-6 lg:px-10">
        <div className="pointer-events-auto relative overflow-hidden rounded-2xl border border-white/10 bg-[#06080C]/78 backdrop-blur-2xl shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.00))]" />
            <div className="absolute -left-8 top-0 h-16 w-16 rounded-full bg-cyan-400/10 blur-2xl" />
            <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-emerald-400/10 blur-2xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Mobile */}
          <div className="relative block sm:hidden">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="relative inline-flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/30" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACC15]" />
                  </span>
                  <div className="text-[10px] tracking-[0.30em] text-white/84">
                    ORBITLINK
                  </div>
                </div>
                <div className="mt-1 text-[10px] leading-4 text-white/42">
                  Ontario commercial service review
                </div>
              </div>

              <Link
                href="/contact#intake"
                className="shrink-0 rounded-xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-3 py-2 text-[11px] font-medium text-[#FDE68A] transition hover:border-[#FACC15]/50 hover:bg-[#FACC15]/15"
              >
                Contact
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/8 px-3 py-2.5">
              {mobileItems.map((i) => (
                <div
                  key={i.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                    <span className="text-[9px] tracking-[0.18em] text-white/42">
                      {i.label}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-white/82">{i.value}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/8 px-3 py-2 text-[10px] leading-4 text-white/38">
              Address-reviewed availability • business-only intake
            </div>
          </div>

          {/* Tablet/Desktop */}
          <div className="relative hidden sm:flex sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3">
            <div className="min-w-0 flex items-center gap-3">
              <span className="relative inline-flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACC15]" />
              </span>

              <div className="whitespace-nowrap text-[10px] tracking-[0.30em] text-white/84">
                ORBITLINK
              </div>

              <div className="hidden h-4 w-px bg-white/10 lg:block" />

              <div className="hidden truncate text-[11px] text-white/40 lg:block">
                Ontario commercial service review • address-first qualification
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              {STATUS_BAND.map((i) => (
                <div
                  key={i.label}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 lg:px-3"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${toneDot(i.tone)}`} />
                  <span className="hidden text-[10px] tracking-[0.18em] text-white/42 xl:inline">
                    {i.label}
                  </span>
                  <span className="whitespace-nowrap text-[11px] text-white/82">
                    {i.value}
                  </span>
                </div>
              ))}

              <Link
                href="/contact#intake"
                className="ml-1 rounded-xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-3 py-2 text-[11px] font-medium whitespace-nowrap text-[#FDE68A] transition hover:border-[#FACC15]/50 hover:bg-[#FACC15]/15"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}