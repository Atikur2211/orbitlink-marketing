// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { name: "Network", href: "/network" },
  { name: "Trust", href: "/trust" },
  { name: "Solutions", href: "/solutions" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

const SUPPORT_PHONE_DISPLAY = "📞 1-888-8-ORBIT-0";
const SUPPORT_PHONE_TEL = "tel:+18888827480";
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

  // iOS-safe scroll lock + restore (no warnings)
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

  // Focus on open + return focus on close (snapshot opener to avoid ref cleanup warning)
  useEffect(() => {
    if (!open) return;

    const dlg = dialogRef.current;
    if (!dlg) return;

    const opener = openBtnRef.current; // ✅ snapshot

    const focusables = getFocusable(dlg);
    focusables[0]?.focus();

    return () => {
      opener?.focus();
    };
  }, [open]);

  // Keyboard: Escape + Focus Trap (Tab cycles inside)
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
    <header className="sticky top-0 z-[80]">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 sm:px-7 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3" aria-label="Orbitlink home">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>
            <span className="text-xs tracking-[0.28em] text-white/90">ORBITLINK</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70" aria-label="Primary">
            {NAV.map((i) => {
              const active = activeHref === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  aria-current={active ? "page" : undefined}
                  className={["hover:text-white transition", active ? "text-white" : ""].join(" ")}
                >
                  {i.name}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              ref={openBtnRef}
              className="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
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
              className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              {SUPPORT_PHONE_DISPLAY}
            </a>

            <Link
              href={INTAKE_HREF}
              className="rounded-xl bg-[#FACC15] text-black px-3 py-2 text-sm font-medium hover:bg-[#FDE047] transition"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile dialog */}
      {open && (
        <div
          className="fixed inset-0 z-[90] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="orbitlink-menu-title"
          aria-describedby="orbitlink-menu-desc"
          id="orbitlink-mobile-menu"
          onClickCapture={(e) => {
            // ✅ hard-close on ANY link click, avoids route-change setState-in-effect
            const target = e.target as HTMLElement | null;
            const link = target?.closest?.("a");
            if (link) setOpen(false);
          }}
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-[1px] transition-opacity motion-reduce:transition-none"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          {/* Sheet */}
          <div className="absolute top-0 left-0 right-0 mx-auto max-w-6xl px-5 sm:px-7">
            <div
              ref={dialogRef}
              className={[
                "mt-3 rounded-3xl border border-white/10 bg-[#09090B]/95 backdrop-blur-xl shadow-2xl",
                "transform transition-all duration-200 ease-out motion-reduce:transition-none",
                "translate-y-0 opacity-100",
              ].join(" ")}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                  <div>
                    <div id="orbitlink-menu-title" className="text-xs tracking-[0.28em] text-white/90">
                      ORBITLINK
                    </div>
                    <div id="orbitlink-menu-desc" className="text-[11px] text-white/55">
                      Navigation • enterprise onboarding posture
                    </div>
                  </div>
                </div>

                <button
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 py-4">
                <div className="text-[11px] tracking-[0.28em] text-white/55">NAVIGATION</div>

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
                          "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10 transition flex items-center justify-between",
                          active ? "text-white" : "text-white/85",
                        ].join(" ")}
                      >
                        <span>{i.name}</span>
                        <span className="text-[#FACC15]">→</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT</div>
                  <div className="mt-2 text-sm text-white/80">
                    Enterprise onboarding • regulated delivery posture
                  </div>

                  <div className="mt-3 grid gap-2">
                    <Link
                      href={INTAKE_HREF}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl bg-[#FACC15] text-black px-4 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
                    >
                      Talk to Sales
                    </Link>

                    <a
                      href={SUPPORT_PHONE_TEL}
                      aria-label={SUPPORT_PHONE_ARIA}
                      className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white hover:bg-white/10 transition text-center"
                    >
                      {SUPPORT_PHONE_DISPLAY}
                    </a>

                    <a
                      href="mailto:concierge@orbitlink.ca"
                      className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white hover:bg-white/10 transition text-center"
                    >
                      concierge@orbitlink.ca
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-xs text-white/55">
                  Orbitlink is a brand of TIRAV Technologies Inc.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}