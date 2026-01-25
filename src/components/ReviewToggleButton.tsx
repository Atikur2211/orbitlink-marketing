"use client";

import { useState } from "react";

export default function ReviewToggleButton({
  id,
  reviewedAt,
}: {
  id: string;
  reviewedAt?: string;
}) {
  const [busy, setBusy] = useState(false);
  const reviewed = Boolean(reviewedAt);

  async function toggle() {
    if (busy) return;
    setBusy(true);

    try {
      const res = await fetch("/api/ops/waitlist/review", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, reviewed: !reviewed }),
      });

      if (res.ok) window.location.reload();
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
        reviewed
          ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
          : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10",
        busy ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
      title={reviewed ? "Mark as unreviewed" : "Mark as reviewed"}
    >
      {busy ? "…" : reviewed ? "Reviewed" : "Mark reviewed"}
    </button>
  );
}
