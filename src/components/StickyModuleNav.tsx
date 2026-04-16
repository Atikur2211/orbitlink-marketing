// src/components/StickyModuleNav.tsx
"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Tone = "blue" | "gold" | "emerald";
type Mod = { id: string; name: string; tone: Tone };

function dotClass(tone: Tone) {
  if (tone === "blue") return "bg-blue-400";
  if (tone === "emerald") return "bg-emerald-400";
  return "bg-[#FACC15]";
}

function indicatorClass(tone: Tone) {
  if (tone === "blue") {
    return "border-blue-400/25 bg-blue-500/10 shadow-[0_10px_40px_rgba(59,130,246,0.14)]";
  }
  if (tone === "emerald") {
    return "border-emerald-400/25 bg-emerald-500/10 shadow-[0_10px_40px_rgba(16,185,129,0.14)]";
  }
  return "border-[#FACC15]/25 bg-[#FACC15]/10 shadow-[0_10px_40px_rgba(250,204,21,0.14)]";
}

function progressClass(tone: Tone) {
  if (tone === "blue") return "bg-blue-400/60";
  if (tone === "emerald") return "bg-emerald-400/60";
  return "bg-[#FACC15]/55";
}

export default function StickyModuleNav({
  modules,
  watchOffsetTop = 72,
  watchId = "solutions-sentinel",
  bottomWatchId = "solutions-bottom-sentinel",
}: {
  modules: Mod[];
  watchOffsetTop?: number;
  watchId?: string;
  bottomWatchId?: string;
}) {
  const ids = useMemo(() => modules.map((m) => m.id), [modules]);

  const [activeId, setActiveId] = useState<string>(modules?.[0]?.id ?? "");
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  const railRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const activeTone: Tone =
    modules.find((m) => m.id === activeId)?.tone ?? (modules?.[0]?.tone ?? "gold");

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      {
        threshold: 0,
        rootMargin: `-${watchOffsetTop + 8}px 0px 0px 0px`,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [watchId, watchOffsetTop]);

  useEffect(() => {
    const el = document.getElementById(bottomWatchId);
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(false);
      },
      {
        threshold: 0,
        rootMargin: `0px 0px -35% 0px`,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [bottomWatchId]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (best?.target?.id) setActiveId(best.target.id);
      },
      {
        threshold: [0.18, 0.28, 0.4, 0.55],
        rootMargin: `-${watchOffsetTop + 96}px 0px -55% 0px`,
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, watchOffsetTop]);

  const recalcIndicator = () => {
    const rail = railRef.current;
    const activeBtn = btnRefs.current[activeId];
    if (!rail || !activeBtn) return;

    const railBox = rail.getBoundingClientRect();
    const btnBox = activeBtn.getBoundingClientRect();

    const left = btnBox.left - railBox.left + rail.scrollLeft;
    const width = btnBox.width;

    setIndicator({ left, width });

    const pad = 64;
    const target = Math.max(0, left - pad);
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    rail.scrollTo({ left: Math.min(maxScroll, target), behavior: "smooth" });
  };

  useLayoutEffect(() => {
    recalcIndicator();
  }, [activeId]);

  useEffect(() => {
    const onResize = () => recalcIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const calc = () => {
      const firstRect = els[0].getBoundingClientRect();
      const lastRect = els[els.length - 1].getBoundingClientRect();

      const viewportTop = watchOffsetTop + 96;
      const startY = firstRect.top + window.scrollY - viewportTop;
      const endY = lastRect.bottom + window.scrollY - viewportTop;

      const y = window.scrollY;
      const t = (y - startY) / Math.max(1, endY - startY);
      setProgress(Math.max(0, Math.min(1, t)));
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);

    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [ids, watchOffsetTop]);

  const onPillClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - (watchOffsetTop + 112);
    window.scrollTo({ top, behavior: "smooth" });

    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <div
      className={[
        "sticky z-30 -mx-5 px-5 sm:-mx-7 sm:px-7",
        "border-b border-white/10 bg-black/45 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      ].join(" ")}
      style={{ top: `${watchOffsetTop}px` }}
      aria-hidden={!show}
    >
      <div className="mx-auto max-w-6xl py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden min-w-0 items-center gap-2 md:flex">
            <span className="relative inline-flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/25" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FACC15]" />
            </span>
            <div className="whitespace-nowrap text-[10px] tracking-[0.28em] text-white/55">
              MODULE INDEX
            </div>
            <div className="truncate text-[10px] text-white/35">
              Operator-grade delivery posture
            </div>
          </div>

          <div className="relative flex-1">
            <div
              ref={railRef}
              className="no-scrollbar relative flex gap-2 overflow-x-auto py-1 scroll-smooth"
            >
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute bottom-1 top-1 rounded-full border transition-all duration-300 ease-out",
                  indicatorClass(activeTone),
                ].join(" ")}
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: `${indicator.width}px`,
                }}
              />

              {modules.map((m) => {
                const active = m.id === activeId;

                return (
                  <a
                    key={m.id}
                    ref={(el) => {
                      btnRefs.current[m.id] = el;
                    }}
                    href={`#${m.id}`}
                    onClick={onPillClick(m.id)}
                    aria-current={active ? "true" : undefined}
                    className={[
                      "relative shrink-0 rounded-full border px-4 py-2 text-[13px] transition",
                      "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                      active ? "text-white" : "",
                    ].join(" ")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${dotClass(m.tone)}`} />
                      {m.name}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-2 h-px w-full bg-white/10">
              <div
                className={[
                  "h-px transition-[width] duration-200 ease-out",
                  progressClass(activeTone),
                ].join(" ")}
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>

          <a
            href="/contact#intake"
            className="hidden whitespace-nowrap rounded-full border border-[#FACC15]/35 bg-[#FACC15]/10 px-4 py-2 text-[13px] font-medium text-[#FDE68A] transition hover:border-[#FACC15]/50 hover:bg-[#FACC15]/15 lg:inline"
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}