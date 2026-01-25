// src/components/CopyEmailsButton.tsx
"use client";

import { useMemo, useState } from "react";

type Props = {
  emails: string[];
  label?: string; // optional: "Early Access", "Verification Pack"
  mode?: "normal" | "bcc";
};

export default function CopyEmailsButton({
  emails,
  label = "emails",
  mode = "normal",
}: Props) {
  const [copied, setCopied] = useState(false);

  const deduped = useMemo(() => {
    const set = new Set<string>();
    for (const e of emails) {
      const x = String(e || "").trim().toLowerCase();
      if (x) set.add(x);
    }
    return Array.from(set);
  }, [emails]);

  const formatted =
    mode === "bcc"
      ? `BCC: ${deduped.join(", ")}`
      : deduped.join(", ");

  async function copy() {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // silent fail
    }
  }

  return (
    <button
      onClick={copy}
      type="button"
      className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition flex items-center gap-2"
      title="Copy deduplicated emails to clipboard"
    >
      {copied ? (
        <>
          <span className="text-emerald-300">Copied</span>
        </>
      ) : (
        <>
          <span>Copy {label}</span>
          <span className="text-white/50">({deduped.length})</span>
        </>
      )}
    </button>
  );
}
