// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { name: "Network", href: "/network" },
  { name: "Services", href: "/services" },
  { name: "Locations", href: "/locations" },
  { name: "Solutions", href: "/solutions" },
  { name: "Trust", href: "/trust" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

const SUPPORT_PHONE_DISPLAY = "📞 1-888-8-ORBIT-0";
const SUPPORT_PHONE_TEL = "tel:+18888672480";
const SUPPORT_PHONE_ARIA = "Call Orbitlink Client Care at 1 888 8 ORBIT 0";
const INTAKE_HREF = "/contact#intake";

function getFocusable(container: HTMLElement) {
  const selector = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
  );
}

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef(0);

  const activeHref = useMemo(() => pathname, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;

    const body = document.body;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevWidth = body.style.width;
    const prevOverflow = body.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = prevWidth;
      body.style.overflow = prevOverflow;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const dlg = dialogRef.current;
    if (!dlg) return;

    const opener = openBtnRef.current;
    const focusables = getFocusable(dlg);
    focusables[0]?.focus();

    return () => {
      opener?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const dlg = dialogRef.current;
      if (!dlg) return;

      const focusables = getFocusable(dlg);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-[140]">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-7">
          <Link href="/" className="flex items-center gap-3" aria-label="Orbitlink home">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>
            <span className="text-xs tracking-[0.28em] text-white/90">ORBITLINK</span>
            <span className="ml-2 hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] tracking-wide text-white/70 sm:inline-flex">
              Operator-grade
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex" aria-label="Primary">
            {NAV.map((i) => {
              const active = activeHref === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition hover:text-white ${active ? "text-white" : ""}`}
                >
                  {i.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              ref={openBtnRef}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="orbitlink-mobile-menu"
            >
              ☰
            </button>

            <a
              href={SUPPORT_PHONE_TEL}
              aria-label={SUPPORT_PHONE_ARIA}
              className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 sm:inline-flex"
            >
              {SUPPORT_PHONE_DISPLAY}
            </a>

            <Link
              href={INTAKE_HREF}
              className="rounded-xl bg-[#FACC15] px-3 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[220] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="orbitlink-menu-title"
          aria-describedby="orbitlink-menu-desc"
          id="orbitlink-mobile-menu"
          onClickCapture={(e) => {
            const target = e.target as HTMLElement | null;
            const link = target?.closest?.("a");
            if (link) setOpen(false);
          }}
        >
          <button
            className="absolute inset-0 bg-black/80 backdrop-blur-[3px]"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute inset-x-0 top-0 z-[230] mx-auto max-w-6xl px-4 pt-3 pb-3 sm:px-6">
            <div
              ref={dialogRef}
              className="relative flex max-h-[calc(100dvh-1.5rem)] min-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#09090B]/96 shadow-[0_24px_90px_rgba(0,0,0,0.58)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(56,253,254,0.09),transparent_62%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-[72px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                  </span>

                  <div>
                    <div
                      id="orbitlink-menu-title"
                      className="text-[11px] tracking-[0.30em] text-white/88"
                    >
                      ORBITLINK
                    </div>
                    <div
                      id="orbitlink-menu-desc"
                      className="mt-1 text-[11px] text-white/50"
                    >
                      Tier-1 navigation surface
                    </div>
                  </div>
                </div>

                <button
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                <div className="relative">
                  <div className="text-[11px] tracking-[0.28em] text-white/50">PRIMARY</div>

                  <div className="mt-3 grid gap-2">
                    {NAV.map((i) => {
                      const active = activeHref === i.href;

                      return (
                        <Link
                          key={i.href}
                          href={i.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition",
                            active
                              ? "border-white/15 bg-white/[0.08] text-white"
                              : "border-white/10 bg-white/[0.04] text-white/82 hover:border-white/15 hover:bg-white/[0.07] hover:text-white",
                          ].join(" ")}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={[
                                "h-1.5 w-1.5 rounded-full transition",
                                active ? "bg-[#FACC15]" : "bg-white/25 group-hover:bg-white/45",
                              ].join(" ")}
                            />
                            <span className="text-sm">{i.name}</span>
                          </div>

                          <span
                            className={[
                              "text-sm transition",
                              active ? "text-[#FACC15]" : "text-white/30 group-hover:text-white/60",
                            ].join(" ")}
                          >
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] tracking-[0.28em] text-white/50">QUICK ACCESS</div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link
                        href="/locations/ontario"
                        onClick={() => setOpen(false)}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                      >
                        Ontario Hub
                      </Link>
                      <Link
                        href="/services/dedicated-internet-access"
                        onClick={() => setOpen(false)}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                      >
                        DIA
                      </Link>
                      <Link
                        href="/services/managed-lan-wifi"
                        onClick={() => setOpen(false)}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                      >
                        Managed LAN
                      </Link>
                      <Link
                        href="/services/business-fibre-internet"
                        onClick={() => setOpen(false)}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                      >
                        Business Fibre
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] tracking-[0.24em] text-white/50">
                          CONCIERGE DESK
                        </div>
                        <div className="mt-2 text-sm font-medium text-white/90">
                          Structured onboarding for enterprise buyers
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          Clean intake. Clear scoping. Documented delivery.
                        </p>
                      </div>

                      <div className="rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 px-3 py-1.5 text-[11px] text-[#FDE68A]">
                        ACTIVE
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <Link
                        href={INTAKE_HREF}
                        onClick={() => setOpen(false)}
                        className="rounded-2xl bg-[#FACC15] px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
                      >
                        Talk to Sales
                      </Link>

                      <a
                        href={SUPPORT_PHONE_TEL}
                        aria-label={SUPPORT_PHONE_ARIA}
                        className="rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
                      >
                        {SUPPORT_PHONE_DISPLAY}
                      </a>

                      <a
                        href="mailto:concierge@orbitlink.ca"
                        className="rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
                      >
                        concierge@orbitlink.ca
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="flex flex-col gap-2 text-[11px] text-white/45">
                      <div className="flex items-center justify-between gap-3">
                        <span>Operator-grade surface</span>
                        <span>Ontario</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Availability by building</span>
                        <span>TIRAV Technologies Inc.</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}