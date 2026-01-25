// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { name: "Network", href: "/network" },
  { name: "Trust", href: "/trust" },
  { name: "Solutions", href: "/solutions" },
  { name: "About", href: "/about" },
  { name: "Coming Soon", href: "/coming-soon" },
];

// ✅ Enterprise contact constants (single source of truth)
const SUPPORT_PHONE_DISPLAY = "📞 1-888-8-ORBIT-0";
const SUPPORT_PHONE_TEL = "tel:+18888827480"; // numeric form of 1-888-8-ORBIT-0
const SUPPORT_PHONE_ARIA = "Call Orbitlink Client Care at 1 888 8 ORBIT 0";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const openBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close menu on route change (Stripe-level polish)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock background scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        openBtnRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 sm:px-7 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3" aria-label="Orbitlink home">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
            </span>
            <span className="text-xs tracking-[0.28em] text-white/90">ORBITLINK</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70" aria-label="Primary">
            {NAV.map((i) => {
              const active = pathname === i.href;
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

          {/* Right side */}
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

            <Link
              href="/coming-soon"
              className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/10 transition"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" id="orbitlink-mobile-menu">
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          {/* sheet */}
          <div className="absolute top-0 left-0 right-0 mx-auto max-w-6xl px-5 sm:px-7">
            <div className="mt-3 rounded-3xl border border-white/10 bg-[#09090B]/95 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                  <span className="text-xs tracking-[0.28em] text-white/90">ORBITLINK</span>
                </div>
                <button
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                  onClick={() => {
                    setOpen(false);
                    openBtnRef.current?.focus();
                  }}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 py-4">
                <div className="text-[11px] tracking-[0.28em] text-white/55">NAVIGATION</div>

                <div className="mt-3 grid gap-2">
                  {NAV.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10 transition flex items-center justify-between"
                    >
                      <span>{i.name}</span>
                      <span className="text-[#FACC15]">→</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT</div>
                  <div className="mt-2 text-sm text-white/80">
                    Enterprise onboarding • controlled rollout
                  </div>

                  <div className="mt-3 grid gap-2">
                    <Link
                      href="/contact"
                      className="rounded-2xl bg-[#FACC15] text-black px-4 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
                    >
                      Talk to Sales
                    </Link>

                    {/* ✅ Enterprise call-to-action (replaces 647) */}
                    <a
                      href={SUPPORT_PHONE_TEL}
                      aria-label={SUPPORT_PHONE_ARIA}
                      className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white hover:bg-white/10 transition text-center"
                    >
                      {SUPPORT_PHONE_DISPLAY}
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
