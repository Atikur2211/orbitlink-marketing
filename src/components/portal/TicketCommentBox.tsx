"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FieldErrors = Partial<Record<"body", string>>;
type LocalPrefs = { autoAck: boolean };

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function clean(v: unknown) {
  return String(v ?? "").replace(/\s+/g, " ").trim();
}

function humanizeErr(code: string) {
  const c = (code || "").toLowerCase().trim();
  if (c === "unauthorized") return "Session not recognized. Please sign in again.";
  if (c === "forbidden") return "Access denied for this ticket.";
  if (c === "not_found") return "Ticket not found.";
  if (c === "validation" || c === "invalid_body") return "Comment needs correction.";
  if (c === "network") return "Network issue. Check connection and retry.";
  if (c === "comment_failed" || c === "server_error") return "Server error. Try again shortly.";
  if (c.startsWith("http_")) return `Request failed (${c.toUpperCase()}).`;
  return code || "Request could not be completed.";
}

function readPrefs(): LocalPrefs {
  try {
    const raw = localStorage.getItem("orbit_ops_prefs");
    if (!raw) return { autoAck: true };
    const p = JSON.parse(raw) as Partial<LocalPrefs>;
    return { autoAck: typeof p.autoAck === "boolean" ? p.autoAck : true };
  } catch {
    return { autoAck: true };
  }
}

function writePrefs(p: LocalPrefs) {
  try {
    localStorage.setItem("orbit_ops_prefs", JSON.stringify(p));
  } catch {
    // ignore
  }
}

export default function TicketCommentBox({ ticketId }: { ticketId: string }) {
  const router = useRouter();

  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  // enterprise error model
  const [globalErr, setGlobalErr] = useState<string>("");
  const [fieldErrs, setFieldErrs] = useState<FieldErrors>({});

  // ✅ Golden: UI toggle for SLA Auto-Ack
  const [autoAck, setAutoAck] = useState<boolean>(() => {
    // localStorage not available on server; this component is client-only, but keep it guarded anyway
    if (typeof window === "undefined") return true;
    return readPrefs().autoAck;
  });

  function setPrefs(nextAutoAck: boolean) {
    setAutoAck(nextAutoAck);
    if (typeof window !== "undefined") writePrefs({ autoAck: nextAutoAck });
  }

  const bodyClean = useMemo(() => String(body ?? "").trimEnd(), [body]);

  const canSubmit = useMemo(() => {
    const b = clean(bodyClean);
    return !busy && b.length >= 3;
  }, [busy, bodyClean]);

  async function submit() {
    setGlobalErr("");
    setFieldErrs({});

    // ✅ local validation first
    const b = clean(bodyClean);
    if (!b || b.length < 3) {
      setGlobalErr("validation");
      setFieldErrs({ body: "Comment is required (min 3 characters)." });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(`/api/portal/tickets/${encodeURIComponent(ticketId)}/comment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // ✅ Golden: signal server route to apply auto-ack if supported
          "x-ops-auto-ack": autoAck ? "1" : "0",
        },
        body: JSON.stringify({ body: bodyClean }),
      });

      const raw = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(raw);
      } catch {
        // not json
      }

      if (!res.ok || !data?.ok) {
        // ✅ structured validation support
        if ((data?.error === "validation" || data?.error === "invalid_body") && data?.fields?.body) {
          setGlobalErr("validation");
          setFieldErrs({ body: String(data.fields.body) });
          return;
        }

        const msg =
          (typeof data?.error === "string" && data.error) ||
          (typeof data?.message === "string" && data.message) ||
          `HTTP_${res.status}`;

        console.log("COMMENT_POST_FAIL", { status: res.status, raw });
        setGlobalErr(msg);
        return;
      }

      setBody("");
      setGlobalErr("");
      setFieldErrs({});
      router.refresh();
    } catch {
      setGlobalErr("network");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">COMMENT</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">Add a high-signal update</div>
          <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
            Keep it scoped. Provide timeline changes, confirmation, or new evidence.
          </div>
          <div className="mt-3 text-xs text-white/45 leading-5">
            Tip: Ctrl/⌘ + Enter posts. Keep language operational, not emotional.
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-3 py-1 text-[11px] text-[#FDE68A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
          Traceable note
        </div>
      </div>

      {/* ✅ Golden: Auto-Ack toggle panel */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        <div className="text-xs text-white/60 leading-5">
          <span className="text-white/75">SLA Auto-Ack (ops)</span>: when enabled, the server may move a ticket from{" "}
          <span className="text-white/75">Queued</span> → <span className="text-white/75">In Progress</span> after the
          first operator comment (audit-traceable).
        </div>

        <button
          type="button"
          onClick={() => setPrefs(!autoAck)}
          className={cx(
            "rounded-full border px-3 py-1 text-[11px] transition w-fit",
            autoAck
              ? "border-[#FACC15]/30 bg-[#FACC15]/10 text-[#FDE68A]"
              : "border-white/10 bg-black/20 text-white/60 hover:bg-white/5"
          )}
          aria-pressed={autoAck}
        >
          {autoAck ? "AUTO-ACK: ON" : "AUTO-ACK: OFF"}
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-white/55">Update</div>
        <div className="text-[11px] text-white/35">{clean(bodyClean).length}/2000</div>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
        placeholder="Write an update…"
        onKeyDown={(e) => {
          const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === "Enter";
          if (isCmdEnter) {
            e.preventDefault();
            if (!busy) submit();
          }
        }}
        className={cx(
          "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
          fieldErrs.body ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
        )}
      />
      {fieldErrs.body ? <div className="mt-2 text-xs text-red-200">{fieldErrs.body}</div> : null}

      {/* Error panel */}
      {globalErr ? (
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
          <div className="text-xs tracking-[0.22em] text-red-100/80">COMMENT BLOCKED</div>
          <div className="mt-2 text-sm text-red-100">{humanizeErr(globalErr)}</div>
          {globalErr === "validation" ? (
            <div className="mt-2 text-xs text-red-100/70">Fix the highlighted field, then post again.</div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          disabled={!canSubmit}
          onClick={submit}
          className={cx(
            "rounded-2xl px-5 py-3 text-sm font-medium transition text-center",
            canSubmit ? "bg-[#FACC15] text-black hover:bg-[#FDE047]" : "bg-[#FACC15]/40 text-black/60 cursor-not-allowed"
          )}
        >
          {busy ? "Posting…" : "Post comment"}
        </button>

        <button
          disabled={busy || !body}
          onClick={() => setBody("")}
          className={cx(
            "rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center",
            busy || !body ? "opacity-60 cursor-not-allowed" : ""
          )}
        >
          Clear
        </button>
      </div>

      <div className="mt-4 text-xs text-white/45 leading-5">
        Operator posture: comments become part of the ticket record and may be used for audit-grade traceability.
      </div>
    </div>
  );
}
