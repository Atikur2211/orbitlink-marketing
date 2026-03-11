"use client";

import { useMemo, useState } from "react";

type Props = {
  ticketId: string;
  current: {
    status: string;
    priority: string;
    assignee: string;
  };
};

function clsJoin(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function OpsControls({ ticketId, current }: Props) {
  const [status, setStatus] = useState(current.status);
  const [priority, setPriority] = useState(current.priority);
  const [assignee, setAssignee] = useState(current.assignee);

  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<{ tone: "ok" | "bad"; msg: string } | null>(null);

  const statusOptions = useMemo(
    () => ["Queued", "In Progress", "Awaiting Info", "Resolved", "Closed"],
    []
  );

  const priorityOptions = useMemo(() => ["Low", "Normal", "High", "Critical"], []);

  async function patch(body: any) {
    setBusy(true);
    setBanner(null);

    try {
      const res = await fetch(`/api/portal/tickets/${encodeURIComponent(ticketId)}/ops`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        const msg =
          json?.fields?.patch ||
          json?.fields?.status ||
          json?.fields?.priority ||
          json?.fields?.assignee ||
          json?.message ||
          "Ops update failed.";
        setBanner({ tone: "bad", msg });
        return;
      }

      setBanner({ tone: "ok", msg: "Ops update applied. Refreshing…" });

      // ✅ Hard refresh so server page reloads with fresh ticket state
      setTimeout(() => window.location.reload(), 350);
    } catch (e: any) {
      setBanner({ tone: "bad", msg: e?.message || "Network error." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">OPS CONTROLS</div>
          <div className="mt-2 text-sm text-white/70">
            Operator-only changes. Each change appends an immutable timeline event (priority/status/assign).
          </div>
        </div>

        {banner ? (
          <div
            className={clsJoin(
              "rounded-2xl border px-4 py-3 text-xs",
              banner.tone === "ok"
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                : "border-red-400/20 bg-red-500/10 text-red-200"
            )}
          >
            {banner.msg}
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* STATUS */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/55">STATUS</div>
          <select
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={busy}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            className={clsJoin(
              "mt-3 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition",
              busy && "opacity-60 cursor-not-allowed"
            )}
            onClick={() => patch({ status })}
            disabled={busy}
          >
            Apply status
          </button>
        </div>

        {/* PRIORITY */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/55">PRIORITY</div>
          <select
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 outline-none"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={busy}
          >
            {priorityOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button
            className={clsJoin(
              "mt-3 w-full rounded-2xl bg-[#FACC15] text-black px-4 py-2.5 text-sm font-medium hover:bg-[#FDE047] transition",
              busy && "opacity-60 cursor-not-allowed"
            )}
            onClick={() => patch({ priority })}
            disabled={busy}
          >
            Apply priority
          </button>
        </div>

        {/* ASSIGNEE */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/55">ASSIGNEE</div>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 outline-none"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            disabled={busy}
            placeholder="billing@orbitlink.ca"
          />

          <button
            className={clsJoin(
              "mt-3 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition",
              busy && "opacity-60 cursor-not-allowed"
            )}
            onClick={() => patch({ assignee })}
            disabled={busy}
          >
            Assign
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/45 leading-5">
        Golden posture: next step is <span className="text-white/70">operator signature stubs</span> (sign each ops action)
        + <span className="text-white/70">approval chains</span> for sensitive changes.
      </div>
    </div>
  );
}
