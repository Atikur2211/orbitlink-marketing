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

const SUPPORT_PHONE_DISPLAY = "888-8-ORBIT-0";
const SUPPORT_PHONE_TEL = "tel:+18888672480";
const SUPPORT_PHONE_ARIA = "Call Orbitlink at 1 888 8 ORBIT 0";
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

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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
      <div className="border-b border-white/10 bg-black/52 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/42">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-7">
          <Link href="/" className="group flex items-center gap-3.5" aria-label="Orbitlink home">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>

            <div className="flex items-center gap-2.5">
              <span className="text-[12px] tracking-[0.30em] text-white/96 transition group-hover:text-white">
                ORBITLINK
              </span>
              <span className="hidden rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[10px] tracking-[0.16em] text-white/58 sm:inline-flex">
                BUSINESS CONNECTIVITY
              </span>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => {
              const active = isActivePath(activeHref, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-xl px-3 py-2 text-sm transition",
                    active
                      ? "border border-white/10 bg-white/[0.08] text-white"
                      : "text-white/70 hover:bg-white/[0.045] hover:text-white",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              ref={openBtnRef}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/84 transition hover:bg-white/[0.09] xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="orbitlink-mobile-menu"
            >
              Menu
            </button>

            <a
              href={SUPPORT_PHONE_TEL}
              aria-label={SUPPORT_PHONE_ARIA}
              className="hidden rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-sm text-white/78 transition hover:bg-white/[0.08] hover:text-white md:inline-flex"
            >
              {SUPPORT_PHONE_DISPLAY}
            </a>

            <Link
              href={INTAKE_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-[#FACC15] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[220] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="orbitlink-mobile-menu-title"
          id="orbitlink-mobile-menu"
          onClickCapture={(e) => {
            const target = e.target as HTMLElement | null;
            const link = target?.closest?.("a");
            if (link) setOpen(false);
          }}
        >
          <button
            className="absolute inset-0 bg-black/84 backdrop-blur-[6px]"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute inset-x-0 top-0 z-[230] mx-auto max-w-3xl px-4 pb-4 pt-4 sm:px-6">
            <div
              ref={dialogRef}
              className="relative flex min-h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#09090B]/96 shadow-[0_28px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(56,253,254,0.08),transparent_62%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                  </span>

                  <div>
                    <div
                      id="orbitlink-mobile-menu-title"
                      className="text-[11px] tracking-[0.30em] text-white/92"
                    >
                      ORBITLINK
                    </div>
                    <div className="mt-1 text-[12px] text-white/52">
                      Business fibre and managed connectivity
                    </div>
                  </div>
                </div>

                <button
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/84 transition hover:bg-white/[0.1]"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                <div className="grid gap-2">
                  {NAV.map((item) => {
                    const active = isActivePath(activeHref, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition",
                          active
                            ? "border-white/15 bg-white/[0.08] text-white"
                            : "border-white/10 bg-white/[0.04] text-white/84 hover:border-white/15 hover:bg-white/[0.07] hover:text-white",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "h-1.5 w-1.5 rounded-full transition",
                              active ? "bg-[#FACC15]" : "bg-white/25 group-hover:bg-white/45",
                            ].join(" ")}
                          />
                          <span className="text-sm">{item.name}</span>
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

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
                  <div className="text-[11px] tracking-[0.24em] text-white/50">START HERE</div>

                  <div className="mt-2 text-sm font-medium text-white/92">
                    Check availability for your building
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/62">
                    Request pricing, review service fit, or start a business connectivity conversation.
                  </p>

                  <div className="mt-4 grid gap-2">
                    <Link
                      href={INTAKE_HREF}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl bg-[#FACC15] px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
                    >
                      Check Availability
                    </Link>

                    <a
                      href={SUPPORT_PHONE_TEL}
                      aria-label={SUPPORT_PHONE_ARIA}
                      className="rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/[0.08]"
                    >
                      Call {SUPPORT_PHONE_DISPLAY}
                    </a>

                    <a
                      href="mailto:concierge@orbitlink.ca"
                      className="rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/[0.08]"
                    >
                      concierge@orbitlink.ca
                    </a>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4 text-[11px] text-white/45">
                  <div className="flex items-center justify-between gap-3">
                    <span>Availability varies by building</span>
                    <span>Ontario</span>
                  </div>
                </div>

                <div className="h-2" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}