"use client";

import { useState } from "react";

export default function ContactedToggleButton({
  id,
  lastContactedAt,
  mailto, // ✅ pass mailto in so ops can “stamp + send”
}: {
  id: string;
  lastContactedAt?: string;
  mailto?: string;
}) {
  const [busy, setBusy] = useState(false);
  const contacted = Boolean(lastContactedAt);

  async function toggle() {
    if (busy) return;
    setBusy(true);

    try {
      const nextContacted = !contacted;

      const res = await fetch("/api/ops/waitlist/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, contacted: nextContacted }),
      });

      if (!res.ok) return;

      // ✅ Million-dollar move:
      // If you just marked contacted, immediately open the email draft.
      if (nextContacted && mailto) {
        window.open(mailto, "_blank", "noopener,noreferrer");
      }

      // keep it simple: refresh view
      window.location.reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      className={[
        "rounded-2xl border px-3 py-2 text-xs transition",
        contacted
          ? "border-blue-400/25 bg-blue-500/10 text-blue-200 hover:bg-blue-500/15"
          : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10",
        busy ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
      title={contacted ? "Clear contacted stamp" : "Mark as contacted (opens email draft)"}
    >
      {busy ? "…" : contacted ? "Contacted" : "Mark contacted"}
    </button>
  );
}
