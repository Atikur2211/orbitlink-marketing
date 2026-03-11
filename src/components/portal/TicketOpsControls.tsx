"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type OpsField = "status" | "priority" | "assignee" | "reason";
type FieldErrors = Partial<Record<OpsField, string>>;
type Patch = Partial<Record<OpsField, string>>;

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function clean(v: unknown) {
  return String(v ?? "").replace(/\s+/g, " ").trim();
}

function humanizeErr(code: string) {
  const c = (code || "").toLowerCase().trim();
  if (c === "unauthorized") return "Session not recognized. Please sign in again.";
  if (c === "forbidden") return "Operator access required for this action.";
  if (c === "not_found") return "Ticket not found.";
  if (c === "validation" || c === "invalid_body") return "Patch needs correction.";
  if (c === "network") return "Network issue. Check connection and retry.";
  if (c === "ops_patch_failed" || c === "server_error") return "Server error. Try again shortly.";
  if (c.startsWith("http_")) return `Request failed (${c.toUpperCase()}).`;
  return code || "Request could not be completed.";
}

const STATUS_OPTIONS = ["Queued", "In Progress", "Awaiting Info", "Resolved", "Closed"] as const;
const PRIORITY_OPTIONS = ["Low", "Normal", "High", "Critical"] as const;

function shallowEqualPatch(a: Patch, b: Patch) {
  const ak = Object.keys(a).sort();
  const bk = Object.keys(b).sort();
  if (ak.length !== bk.length) return false;
  for (let i = 0; i < ak.length; i++) {
    if (ak[i] !== bk[i]) return false;
    const k = ak[i] as OpsField;
    if (String(a[k] ?? "") !== String(b[k] ?? "")) return false;
  }
  return true;
}

async function safeCopy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function isSensitiveStatus(next?: string) {
  return next === "Resolved" || next === "Closed";
}

function needsReason(p: Patch) {
  return isSensitiveStatus(clean(p.status)) || clean(p.status) === "Queued"; // Reopen-ish moves also deserve reason
}

export default function TicketOpsControls(props: {
  ticketId: string;
  initialStatus?: string;
  initialPriority?: string;
  initialAssignee?: string;
  billingAssignee?: string; // default billing@orbitlink.ca
}) {
  const router = useRouter();
  const billing = props.billingAssignee || "billing@orbitlink.ca";

  const initialStatus = clean(props.initialStatus || "");
  const initialPriority = clean(props.initialPriority || "");
  const initialAssignee = clean(props.initialAssignee || "");

  // Manual inputs
  const [status, setStatus] = useState<string>(initialStatus);
  const [priority, setPriority] = useState<string>(initialPriority);
  const [assignee, setAssignee] = useState<string>(initialAssignee);

  // Enterprise safety: reason for sensitive actions
  const [reason, setReason] = useState<string>("");

  // State
  const [busy, setBusy] = useState(false);
  const [globalErr, setGlobalErr] = useState<string>("");
  const [fieldErrs, setFieldErrs] = useState<FieldErrors>({});

  // Golden UI
  const [toast, setToast] = useState<{ tone: "ok" | "warn"; msg: string } | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);
  const [pendingPatch, setPendingPatch] = useState<Patch | null>(null);

  const toastTimer = useRef<number | null>(null);

  function showToast(msg: string, tone: "ok" | "warn" = "ok") {
    setToast({ msg, tone });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  const manualPatch: Patch = useMemo(() => {
    const p: Patch = {};
    const s = clean(status);
    const pr = clean(priority);
    const a = clean(assignee);
    if (s && s !== initialStatus) p.status = s;
    if (pr && pr !== initialPriority) p.priority = pr;
    if (a && a !== initialAssignee) p.assignee = a;
    return p;
  }, [status, priority, assignee, initialStatus, initialPriority, initialAssignee]);

  const manualHasChanges = useMemo(() => {
    const base: Patch = { status: initialStatus, priority: initialPriority, assignee: initialAssignee };
    const norm = (x: Patch) => {
      const out: Patch = {};
      (Object.keys(x) as OpsField[]).forEach((k) => {
        const v = clean(x[k]);
        if (v) out[k] = v;
      });
      return out;
    };
    return !shallowEqualPatch(norm(manualPatch), norm(base));
  }, [manualPatch, initialStatus, initialPriority, initialAssignee]);

  const canSubmitManual = useMemo(() => {
    return !busy && Object.keys(manualPatch).length > 0 && manualHasChanges;
  }, [busy, manualPatch, manualHasChanges]);

  const effectivePatchForCurl = useMemo(() => {
    const p = pendingPatch || manualPatch || {};
    // include reason only if required and present
    const out: Patch = { ...p };
    const r = clean(reason);
    if (needsReason(p) && r) out.reason = r;
    return out;
  }, [pendingPatch, manualPatch, reason]);

  const curlForPatch = useMemo(() => {
    const payload = JSON.stringify(effectivePatchForCurl);
    return [
      `curl.exe -i -X POST "http://localhost:3000/api/portal/tickets/${encodeURIComponent(
        props.ticketId
      )}/ops"`,
      `  -H "Content-Type: application/json"`,
      `  -H "Cookie: $cookieHeader"`,
      `  --data-raw '${payload.replace(/'/g, "'\\''")}'`,
    ].join(" \\\n");
  }, [effectivePatchForCurl, props.ticketId]);

  async function applyPatch(patch: Patch, label?: string) {
    setGlobalErr("");
    setFieldErrs({});
    setToast(null);

    if (!patch || Object.keys(patch).length === 0) {
      setGlobalErr("validation");
      setFieldErrs({
        status: "Provide status, priority, or assignee.",
        priority: "Provide status, priority, or assignee.",
        assignee: "Provide status, priority, or assignee.",
      });
      return;
    }

    // Assignee sanity
    if (patch.assignee && clean(patch.assignee).length < 3) {
      setGlobalErr("validation");
      setFieldErrs({ assignee: "Assignee looks too short." });
      return;
    }

    // Enterprise: require reason on sensitive actions
    const nextStatus = clean(patch.status);
    const requireReason = needsReason(patch);

    if (requireReason) {
      const r = clean(reason);
      if (!r || r.length < 6) {
        setGlobalErr("validation");
        setFieldErrs({ reason: "Reason is required (min 6 characters) for this action." });
        return;
      }
      patch = { ...patch, reason: r };
    }

    setBusy(true);
    try {
      const res = await fetch(`/api/portal/tickets/${encodeURIComponent(props.ticketId)}/ops`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      });

      const raw = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(raw);
      } catch {
        // ignore
      }

      if (!res.ok || !data?.ok) {
        if (data?.error === "validation" && data?.fields) {
          setGlobalErr("validation");
          const fe: FieldErrors = {};
          if (typeof data.fields.status === "string") fe.status = data.fields.status;
          if (typeof data.fields.priority === "string") fe.priority = data.fields.priority;
          if (typeof data.fields.assignee === "string") fe.assignee = data.fields.assignee;
          if (typeof data.fields.reason === "string") fe.reason = data.fields.reason;
          if (typeof data.fields.patch === "string") {
            const msg = String(data.fields.patch);
            fe.status = fe.status || msg;
            fe.priority = fe.priority || msg;
            fe.assignee = fe.assignee || msg;
          }
          setFieldErrs(fe);
          return;
        }

        const msg =
          (typeof data?.error === "string" && data.error) ||
          (typeof data?.message === "string" && data.message) ||
          `HTTP_${res.status}`;

        console.log("OPS_PATCH_FAIL", { status: res.status, raw });
        setGlobalErr(msg);
        return;
      }

      setConfirmClose(false);
      setPendingPatch(null);

      // clear reason after a sensitive action so it doesn't accidentally apply to next ticket
      if (requireReason) setReason("");

      showToast(label || "Patch applied.", "ok");
      router.refresh();
    } catch {
      setGlobalErr("network");
    } finally {
      setBusy(false);
    }
  }

  function requestPatch(patch: Patch, label: string, requireConfirm?: boolean) {
    setPendingPatch(patch);
    if (requireConfirm) {
      setConfirmClose(true);
      setToast(null);
      return;
    }
    applyPatch(patch, label);
  }

  function QuickButton({
    label,
    onClick,
    tone = "ghost",
    disabled,
    hotkey,
  }: {
    label: string;
    onClick: () => void;
    tone?: "gold" | "ghost" | "danger";
    disabled?: boolean;
    hotkey?: string;
  }) {
    const base =
      "rounded-2xl px-4 py-2.5 text-sm transition border text-center select-none focus:outline-none focus:ring-2 focus:ring-[#FACC15]/35 focus:ring-offset-0";
    const gold = "bg-[#FACC15] text-black border-[#FACC15]/40 hover:bg-[#FDE047]";
    const ghost = "border-white/15 bg-white/5 text-white hover:bg-white/10";
    const danger = "border-red-400/25 bg-red-500/10 text-red-100 hover:bg-red-500/15";
    const cls = tone === "gold" ? gold : tone === "danger" ? danger : ghost;

    return (
      <button
        disabled={!!disabled}
        onClick={onClick}
        className={cx(base, cls, disabled ? "opacity-60 cursor-not-allowed" : "")}
        title={hotkey ? `Shortcut: ${hotkey}` : undefined}
      >
        <span className="inline-flex items-center gap-2">
          {label}
          {hotkey ? (
            <span className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[11px] text-white/60">
              {hotkey}
            </span>
          ) : null}
        </span>
      </button>
    );
  }

  const needsReasonUI = useMemo(() => needsReason(pendingPatch || manualPatch || {}), [pendingPatch, manualPatch]);
  const currentStatus = initialStatus;

  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20"
      onKeyDown={(e) => {
        if (busy) return;

        const mod = e.metaKey || e.ctrlKey;
        if (!mod) return;

        // Ctrl/⌘ + 1 => Critical
        // Ctrl/⌘ + 2 => In Progress
        // Ctrl/⌘ + 3 => Assign Billing
        // Ctrl/⌘ + 4 => Resolve (needs reason)
        // Ctrl/⌘ + 5 => Close (needs confirm + reason)
        if (e.key === "1") {
          e.preventDefault();
          requestPatch({ priority: "Critical" }, "Priority set to Critical.");
        } else if (e.key === "2") {
          e.preventDefault();
          requestPatch({ status: "In Progress" }, "Status set to In Progress.");
        } else if (e.key === "3") {
          e.preventDefault();
          requestPatch({ assignee: billing }, `Assigned to ${billing}.`);
        } else if (e.key === "4") {
          e.preventDefault();
          requestPatch({ status: "Resolved" }, "Status set to Resolved.");
        } else if (e.key === "5") {
          e.preventDefault();
          requestPatch({ status: "Closed" }, "Status set to Closed.", true);
        }
      }}
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">OPS CONTROLS</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">Operator patch (traceable)</div>
          <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
            Changes append events. Close requires confirmation. Sensitive actions require a reason.
          </div>
          <div className="mt-3 text-xs text-white/45 leading-5">
            Golden++: hotkeys + Copy cURL supports operator speed + reproducible debugging.
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-3 py-1 text-[11px] text-[#FDE68A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
          Operator actions
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div
          className={cx(
            "mt-4 rounded-2xl border px-4 py-3 text-sm",
            toast.tone === "ok"
              ? "border-emerald-400/15 bg-emerald-500/10 text-emerald-100/90"
              : "border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FDE68A]"
          )}
        >
          {toast.msg}
        </div>
      ) : null}

      {/* Quick actions */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">QUICK ACTIONS</div>

          <button
            disabled={busy}
            onClick={async () => {
              const ok = await safeCopy(curlForPatch);
              showToast(ok ? "cURL copied." : "Copy failed (browser permission).", ok ? "ok" : "warn");
            }}
            className={cx(
              "rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition",
              busy ? "opacity-60 cursor-not-allowed" : ""
            )}
            title="Copy a reproducible cURL command (uses $cookieHeader)"
          >
            Copy cURL
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <QuickButton
            label="Set Critical"
            tone="danger"
            hotkey="Ctrl/⌘+1"
            disabled={busy}
            onClick={() => requestPatch({ priority: "Critical" }, "Priority set to Critical.")}
          />
          <QuickButton
            label="Set In Progress"
            tone="gold"
            hotkey="Ctrl/⌘+2"
            disabled={busy}
            onClick={() => requestPatch({ status: "In Progress" }, "Status set to In Progress.")}
          />
          <QuickButton
            label="Assign Billing"
            hotkey="Ctrl/⌘+3"
            disabled={busy}
            onClick={() => requestPatch({ assignee: billing }, `Assigned to ${billing}.`)}
          />
          <QuickButton
            label="Resolve"
            hotkey="Ctrl/⌘+4"
            disabled={busy}
            onClick={() => requestPatch({ status: "Resolved" }, "Status set to Resolved.")}
          />
          <QuickButton
            label="Close"
            tone="ghost"
            hotkey="Ctrl/⌘+5"
            disabled={busy}
            onClick={() => requestPatch({ status: "Closed" }, "Status set to Closed.", true)}
          />
        </div>

        {/* Pending preview */}
        {pendingPatch ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="text-[11px] tracking-[0.22em] text-white/55">PENDING PATCH</div>
            <div className="mt-2 text-sm text-white/75">
              {Object.entries(pendingPatch).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3">
                  <span className="text-white/50">{k.toUpperCase()}</span>
                  <span className="text-white/85">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Confirm close */}
        {confirmClose && pendingPatch?.status === "Closed" ? (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
            <div className="text-xs tracking-[0.22em] text-red-100/80">CONFIRM CLOSE</div>
            <div className="mt-2 text-sm text-red-100">Closing a ticket is a strong action. Continue?</div>

            {/* OPTIONAL enterprise safety rule */}
            {currentStatus !== "Resolved" ? (
              <div className="mt-2 text-xs text-red-100/70">
                Recommendation: set <span className="text-red-100">Resolved</span> first, then Close.
              </div>
            ) : null}

            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <button
                disabled={busy}
                onClick={() => applyPatch(pendingPatch, "Status set to Closed.")}
                className={cx(
                  "rounded-2xl px-5 py-3 text-sm font-medium transition text-center",
                  busy ? "bg-red-500/40 text-white/60 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-400"
                )}
              >
                {busy ? "Closing…" : "Yes, close"}
              </button>
              <button
                disabled={busy}
                onClick={() => {
                  setConfirmClose(false);
                  setPendingPatch(null);
                }}
                className={cx(
                  "rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center",
                  busy ? "opacity-60 cursor-not-allowed" : ""
                )}
              >
                Cancel
              </button>
            </div>

            <div className="mt-3 text-xs text-red-100/70">
              Tip: use “Resolved” if you want a softer closure state.
            </div>
          </div>
        ) : null}
      </div>

      {/* Manual patch */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <div className="text-xs text-white/55">Status</div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-3 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.status ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          >
            <option value="">— No change —</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {fieldErrs.status ? <div className="mt-2 text-xs text-red-200">{fieldErrs.status}</div> : null}
        </div>

        <div>
          <div className="text-xs text-white/55">Priority</div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-3 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.priority ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          >
            <option value="">— No change —</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {fieldErrs.priority ? <div className="mt-2 text-xs text-red-200">{fieldErrs.priority}</div> : null}
        </div>

        <div>
          <div className="text-xs text-white/55">Assignee</div>
          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder={billing}
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.assignee ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          />
          {fieldErrs.assignee ? <div className="mt-2 text-xs text-red-200">{fieldErrs.assignee}</div> : null}
        </div>
      </div>

      {/* Sensitive reason */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] tracking-[0.22em] text-white/55">OPERATOR REASON</div>
          <div className="text-[11px] text-white/40">
            {needsReasonUI ? "Required for this action" : "Optional"}
          </div>
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="Add an operational reason (audit-friendly). Example: Verified invoice; billing will correct within 48h."
          className={cx(
            "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
            fieldErrs.reason ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
          )}
        />
        {fieldErrs.reason ? <div className="mt-2 text-xs text-red-200">{fieldErrs.reason}</div> : null}
      </div>

      {globalErr ? (
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
          <div className="text-xs tracking-[0.22em] text-red-100/80">PATCH BLOCKED</div>
          <div className="mt-2 text-sm text-red-100">{humanizeErr(globalErr)}</div>
          {globalErr === "validation" ? (
            <div className="mt-2 text-xs text-red-100/70">Fix the highlighted field(s), then apply again.</div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          disabled={!canSubmitManual}
          onClick={() => applyPatch(manualPatch, "Patch applied.")}
          className={cx(
            "rounded-2xl px-5 py-3 text-sm font-medium transition text-center",
            canSubmitManual
              ? "bg-[#FACC15] text-black hover:bg-[#FDE047]"
              : "bg-[#FACC15]/40 text-black/60 cursor-not-allowed"
          )}
        >
          {busy ? "Applying…" : "Apply manual patch"}
        </button>

        <button
          disabled={busy || (!status && !priority && !assignee && !reason)}
          onClick={() => {
            setStatus(initialStatus);
            setPriority(initialPriority);
            setAssignee(initialAssignee);
            setReason("");
            setGlobalErr("");
            setFieldErrs({});
            setToast(null);
            setConfirmClose(false);
            setPendingPatch(null);
          }}
          className={cx(
            "rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center",
            busy || (!status && !priority && !assignee && !reason) ? "opacity-60 cursor-not-allowed" : ""
          )}
        >
          Reset
        </button>
      </div>

      <div className="mt-4 text-xs text-white/45 leading-5">
        Hotkeys work when this panel is focused. Click inside once, then use Ctrl/⌘+1..5.
        <span className="block mt-1">
          Enterprise posture: actions append timeline events; prior states remain immutable.
        </span>
      </div>
    </div>
  );
}
