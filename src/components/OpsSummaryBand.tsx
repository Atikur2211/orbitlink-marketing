// src/components/OpsSummaryBand.tsx
"use client";

import { useMemo } from "react";
import { scoreRecord, type WaitlistRecord, formatShortDate } from "@/lib/waitlistOps";

function severityLabel(n: number) {
  if (n >= 7) return "HIGH";
  if (n >= 4) return "MED";
  return "LOW";
}

function severityTone(n: number): "emerald" | "gold" | "warn" {
  if (n >= 7) return "warn";
  if (n >= 4) return "gold";
  return "emerald";
}

function ToneChip({
  label,
  value,
  tone = "gold",
  note,
}: {
  label: string;
  value: string | number;
  tone?: "gold" | "emerald" | "blue" | "warn";
  note?: string;
}) {
  const cls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "blue"
      ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
      : tone === "warn"
      ? "border-rose-400/20 bg-rose-500/10 text-rose-200"
      : "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
          <div className="mt-1 text-sm text-white/85">{value}</div>
          {note ? <div className="mt-1 text-[11px] text-white/50 leading-4">{note}</div> : null}
        </div>

        <span className={["shrink-0 rounded-full border px-2.5 py-1 text-[11px]", cls].join(" ")}>
          {tone === "emerald"
            ? "OK"
            : tone === "warn"
            ? "URGENT"
            : tone === "blue"
            ? "INFO"
            : "PRIORITY"}
        </span>
      </div>
    </div>
  );
}

export default function OpsSummaryBand({ entries }: { entries: WaitlistRecord[] }) {
  const summary = useMemo(() => {
    const total = entries.length;

    const byIntent: Record<string, number> = {};
    const byRole: Record<string, number> = {};

    let topScore = 0;

    let reviewedCount = 0;
    let unreviewedCount = 0;

    let contactedCount = 0;
    let uncontactedCount = 0;

    // backlog pressure: count unreviewed high-signal
    let backlogPressure = 0;
    const unreviewedScored: { e: WaitlistRecord; score: number }[] = [];

    for (const e of entries) {
      const intent = (e.intent || "—").trim() || "—";
      const role = (e.role || "—").trim() || "—";

      byIntent[intent] = (byIntent[intent] || 0) + 1;
      byRole[role] = (byRole[role] || 0) + 1;

      const score = scoreRecord(e);
      topScore = Math.max(topScore, score);

      const isReviewed = Boolean(e.reviewedAt);
      if (isReviewed) reviewedCount += 1;
      else unreviewedCount += 1;

      const isContacted = Boolean(e.lastContactedAt);
      if (isContacted) contactedCount += 1;
      else uncontactedCount += 1;

      // pressure weights (conservative but meaningful)
      if (!isReviewed) {
        if (score >= 75) backlogPressure += 3;
        else if (score >= 60) backlogPressure += 2;
        else if (score >= 40) backlogPressure += 1;

        unreviewedScored.push({ e, score });
      }
    }

    // normalize pressure into 0..10
    const severity = Math.max(0, Math.min(10, Math.round(backlogPressure / 3)));

    // top 3 queue: unreviewed by score desc, then newest
    unreviewedScored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ta = Date.parse(a.e.updatedAt || a.e.createdAt || "") || 0;
      const tb = Date.parse(b.e.updatedAt || b.e.createdAt || "") || 0;
      return tb - ta;
    });

    const nextQueue = unreviewedScored.slice(0, 3).map(({ e, score }) => ({
      email: e.email,
      score,
      intent: e.intent || "—",
      when: formatShortDate(e.updatedAt || e.createdAt),
    }));

    const most = (obj: Record<string, number>) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([k, v]) => `${k} (${v})`)
        .join(" • ");

    return {
      total,
      topIntents: most(byIntent) || "—",
      topRoles: most(byRole) || "—",
      topScore,
      reviewedCount,
      unreviewedCount,
      contactedCount,
      uncontactedCount,
      severity,
      nextQueue,
    };
  }, [entries]);

  const sevTone = severityTone(summary.severity);
  const sev = summary.severity;

  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-3">
      {/* row 1 */}
      <div className="lg:col-span-3">
        <ToneChip label="TOTAL" value={summary.total} tone="blue" />
      </div>

      <div className="lg:col-span-3">
        <ToneChip label="TOP INTENTS" value={summary.topIntents} tone="gold" />
      </div>

      <div className="lg:col-span-3">
        <ToneChip label="TOP ROLES" value={summary.topRoles} tone="gold" />
      </div>

      <div className="lg:col-span-3">
        <ToneChip
          label="HIGHEST SCORE"
          value={`${summary.topScore}/100`}
          tone={summary.topScore >= 75 ? "gold" : "blue"}
          note="Signal concentration (not a promise)"
        />
      </div>

      {/* row 2: ops intelligence */}
      <div className="lg:col-span-4">
        <ToneChip
          label="REVIEW STATE"
          value={`${summary.unreviewedCount} unreviewed • ${summary.reviewedCount} reviewed`}
          tone={summary.unreviewedCount > 0 ? "gold" : "emerald"}
          note="Unreviewed is the active queue"
        />
      </div>

      <div className="lg:col-span-4">
        <ToneChip
          label="CONTACT COVERAGE"
          value={`${summary.uncontactedCount} pending • ${summary.contactedCount} contacted`}
          tone={summary.uncontactedCount > 0 ? "blue" : "emerald"}
          note="Uses lastContactedAt when set"
        />
      </div>

      <div className="lg:col-span-4">
        <ToneChip
          label="BACKLOG SEVERITY"
          value={`${sev}/10 • ${severityLabel(sev)}`}
          tone={sevTone === "warn" ? "warn" : sevTone === "gold" ? "gold" : "emerald"}
          note="Weighted by unreviewed high-score entries"
        />
      </div>

      {/* row 3: next queue */}
      <div className="lg:col-span-12 rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              NEXT TO REVIEW (UNREVIEWED QUEUE)
            </div>
            <div className="mt-1 text-sm text-white/80">
              Highest signal first — keeps Ops clean, fast, and disciplined.
            </div>
          </div>

          <div className="hidden sm:block text-xs text-white/50">
            Unreviewed is sorted first in the table
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {summary.nextQueue.length ? (
            summary.nextQueue.map((x) => (
              <div
                key={x.email + x.when + x.score}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
              >
                <div className="text-sm text-white/85 truncate">{x.email}</div>
                <div className="mt-1 text-xs text-white/55 truncate">
                  {x.intent} • {x.when}
                </div>
                <div className="mt-2 inline-flex rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-2.5 py-1 text-[11px] text-[#FDE68A]">
                  Score {x.score}/100
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-6 text-center text-sm text-white/55">
              No unreviewed entries. Queue is clean.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
