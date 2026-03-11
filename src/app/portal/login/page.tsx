"use client";

import PageShell from "@/components/PageShell";
import { useState } from "react";

export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    if (busy) return;
    setBusy(true);
    setDevLink(null);
    setMsg(null);

    try {
      const res = await fetch("/api/portal/magic-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setMsg("Could not issue a link. Check the email and try again.");
        return;
      }

      setMsg("If your email is eligible, a sign-in link is issued.");
      if (data?.link) setDevLink(data.link); // dev convenience
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell
      eyebrow="PORTAL SIGN-IN"
      title="Secure magic link"
      subtitle="Enter your email. If you’re provisioned, you’ll receive a time-limited sign-in link."
    >
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">EMAIL</div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#FACC15]/40"
        />

        <button
          type="button"
          onClick={submit}
          disabled={busy}
          className={[
            "mt-4 w-full rounded-2xl px-5 py-3 text-sm font-medium transition text-center",
            "bg-[#FACC15] text-black hover:bg-[#FDE047]",
            busy ? "opacity-70 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {busy ? "Issuing link…" : "Send sign-in link"}
        </button>

        <div className="mt-4 text-xs text-white/55 leading-5">
          Links expire quickly and are single-use. Access remains controlled to protect operations.
        </div>

        {msg ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/75">
            {msg}
          </div>
        ) : null}

        {devLink ? (
          <div className="mt-4 rounded-2xl border border-[#FACC15]/20 bg-[#FACC15]/10 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-[#FDE68A]">DEV LINK</div>
            <a
              href={devLink}
              className="mt-2 block break-all text-sm text-white/90 underline decoration-white/25 hover:decoration-white/60"
            >
              {devLink}
            </a>
            <div className="mt-2 text-xs text-white/60">In production this is emailed (not returned).</div>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
