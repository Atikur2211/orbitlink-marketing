// src/app/portal/verify/VerifyClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type State =
  | { status: "working" }
  | { status: "ok" }
  | { status: "error"; code: string };

function Pill({
  tone = "neutral",
  children,
}: {
  tone?: "gold" | "emerald" | "blue" | "neutral";
  children: React.ReactNode;
}) {
  const cls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "blue"
      ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
      : tone === "gold"
      ? "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]"
      : "border-white/12 bg-white/5 text-white/70";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] tracking-[0.14em] uppercase",
        cls,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function copyFor(code: string) {
  switch (code) {
    case "missing_token":
      return {
        title: "Missing token",
        body: "This verification link is incomplete. Request a new sign-in link.",
        hint: "No token was provided.",
        primary: { href: "/portal/login", label: "Request new link" },
        secondary: { href: "/trust", label: "Trust & Compliance" },
      };
    case "expired":
      return {
        title: "Link expired",
        body: "This sign-in link is time-limited. Request a fresh link to continue.",
        hint: "Tokens expire quickly to protect operations.",
        primary: { href: "/portal/login", label: "Request new link" },
        secondary: { href: "/trust", label: "Trust & Compliance" },
      };
    case "used":
      return {
        title: "Link already used",
        body: "This sign-in link has already been consumed. Your session may already be active.",
        hint: "Magic links are single-use by design.",
        primary: { href: "/portal/app", label: "Go to Portal" },
        secondary: { href: "/portal/login", label: "Request new link" },
      };
    case "invalid":
      return {
        title: "Link not valid",
        body: "This token is not recognized. Request a new sign-in link.",
        hint: "Invalid or unknown token.",
        primary: { href: "/portal/login", label: "Request new link" },
        secondary: { href: "/trust", label: "Trust & Compliance" },
      };
    case "network":
      return {
        title: "Verification unavailable",
        body: "We couldn’t complete verification right now. Check your connection and try again.",
        hint: "Network or server connectivity issue.",
        primary: { href: "/portal/login", label: "Back to sign-in" },
        secondary: { href: "/trust", label: "Trust & Compliance" },
      };
    default:
      return {
        title: "Link not valid",
        body: "This link may be expired or already used. Request a new sign-in link.",
        hint: `Reason: ${code || "unknown"}`,
        primary: { href: "/portal/login", label: "Request new link" },
        secondary: { href: "/trust", label: "Trust & Compliance" },
      };
  }
}

export default function VerifyClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const token = useMemo(() => (sp.get("token") || "").trim(), [sp]);

  const [state, setState] = useState<State>({ status: "working" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!token) {
        setState({ status: "error", code: "missing_token" });
        return;
      }

      try {
        const res = await fetch("/portal/verify/consume", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
          cache: "no-store",
        });

        const data = await res.json().catch(() => ({} as any));

        if (!res.ok || !data?.ok) {
          const code = String(data?.error || "invalid");
          if (!cancelled) setState({ status: "error", code });
          return;
        }

        if (!cancelled) {
          setState({ status: "ok" });
          router.replace("/portal/app");
        }
      } catch {
        if (!cancelled) setState({ status: "error", code: "network" });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [token, router]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      {/* premium glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 h-80 w-[56rem] rounded-full bg-[#FACC15]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 sm:px-7 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] tracking-[0.28em] text-white/55">PORTAL</div>
            <div className="flex items-center gap-2">
              <Pill tone="gold">CONTROLLED ACCESS</Pill>
              <Pill tone="blue">MAGIC LINK</Pill>
            </div>
          </div>

          {state.status === "working" && (
            <>
              <div className="mt-3 text-lg sm:text-xl font-semibold text-white/90">
                Verifying…
              </div>
              <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
                Secure session provisioning in progress. Please keep this tab open.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-white/55">STATUS</div>
                  <Pill tone="emerald">IN PROGRESS</Pill>
                </div>
                <div className="mt-2 text-sm text-white/75">
                  Token validation → one-time consume → session cookie issuance
                </div>
              </div>
            </>
          )}

          {state.status === "ok" && (
            <>
              <div className="mt-3 text-lg sm:text-xl font-semibold text-white/90">
                Provisioned
              </div>
              <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
                Session established. Redirecting to your console…
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-white/70">SESSION</div>
                  <Pill tone="emerald">ACTIVE</Pill>
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Your portal session is now active on this device.
                </div>
              </div>
            </>
          )}

          {state.status === "error" &&
            (() => {
              const ui = copyFor(state.code);
              return (
                <>
                  <div className="mt-3 text-lg sm:text-xl font-semibold text-white/90">
                    {ui.title}
                  </div>
                  <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
                    {ui.body}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-white/55">DETAIL</div>
                      <Pill tone="blue">SECURITY POSTURE</Pill>
                    </div>
                    <div className="mt-2 text-sm text-white/75">{ui.hint}</div>
                    <div className="mt-2 text-xs text-white/45">
                      Code: <span className="text-white/70">{state.code}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href={ui.primary.href}
                      className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
                    >
                      {ui.primary.label}
                    </a>
                    <a
                      href={ui.secondary.href}
                      className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
                    >
                      {ui.secondary.label}
                    </a>
                  </div>
                </>
              );
            })()}
        </div>

        <div className="mt-6 text-xs text-white/45 leading-5">
          Orbitlink is a brand of{" "}
          <span className="text-white/70">TIRAV Technologies Inc.</span> • Links
          are time-limited and single-use to protect operations.
        </div>
      </div>
    </main>
  );
}
