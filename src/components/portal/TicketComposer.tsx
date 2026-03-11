"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Category = "Incident" | "Request" | "Change" | "Access" | "Billing";
type Priority = "Low" | "Normal" | "High" | "Critical";

type FieldErrors = Partial<Record<"category" | "priority" | "title" | "impact" | "details", string>>;

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function clean(s: string) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

function validateLocal(payload: {
  category: Category;
  priority: Priority;
  title: string;
  impact: string;
  details: string;
}): { ok: true } | { ok: false; fields: FieldErrors } {
  const fields: FieldErrors = {};
  const title = clean(payload.title);
  const impact = clean(payload.impact);
  const details = String(payload.details ?? "").trim();

  if (!title || title.length < 6) fields.title = "Title is required (min 6 characters).";
  if (!impact || impact.length < 12) fields.impact = "Impact is required (min 12 characters).";
  if (!details || details.length < 20) fields.details = "Details are required (min 20 characters).";

  const lowSignal = new Set(["test", "hello", "help", "pls", "asd", "xxxxx"]);
  if (title && lowSignal.has(title.toLowerCase())) fields.title = "Title is too low-signal. Use a precise subject line.";

  return Object.keys(fields).length ? { ok: false, fields } : { ok: true };
}

function humanizeErr(code: string) {
  const c = (code || "").toLowerCase().trim();

  if (c === "unauthorized") return "Session not recognized. Please sign in again.";
  if (c === "network") return "Network issue. Check connection and retry.";
  if (c === "server" || c === "server_error") return "Server error. Try again shortly.";
  if (c === "validation") return "Some fields need correction.";
  if (c === "invalid_title") return "Title rejected. Use a precise subject (min 6 chars).";
  if (c === "invalid_impact") return "Impact rejected. Explain who/what is affected (min 12 chars).";
  if (c === "invalid_details") return "Details rejected. Add scope + timeline + desired outcome (min 20 chars).";
  if (c === "create_failed") return "Ticket could not be created. Please retry.";
  if (c.startsWith("http_")) return `Request failed (${c.toUpperCase()}).`;
  return code || "Request could not be completed.";
}

export default function TicketComposer() {
  const router = useRouter();

  const [category, setCategory] = useState<Category>("Request");
  const [priority, setPriority] = useState<Priority>("Normal");
  const [title, setTitle] = useState("");
  const [impact, setImpact] = useState("");
  const [details, setDetails] = useState("");

  const [busy, setBusy] = useState(false);
  const [okFlash, setOkFlash] = useState(false);

  const [globalErr, setGlobalErr] = useState<string>("");
  const [fieldErrs, setFieldErrs] = useState<FieldErrors>({});

  const payload = useMemo(
    () => ({
      category,
      priority,
      title: clean(title),
      impact: clean(impact),
      details,
    }),
    [category, priority, title, impact, details]
  );

  // ✅ FIX: include busy in deps
  const canSubmit = useMemo(() => {
    const v = validateLocal(payload);
    return v.ok && !busy;
  }, [payload, busy]);

  function applyServerFieldErrors(fields: any) {
    const f = fields || {};
    setFieldErrs({
      category: typeof f.category === "string" ? f.category : undefined,
      priority: typeof f.priority === "string" ? f.priority : undefined,
      title: typeof f.title === "string" ? f.title : undefined,
      impact: typeof f.impact === "string" ? f.impact : undefined,
      details: typeof f.details === "string" ? f.details : undefined,
    });
  }

  async function submit() {
    if (busy) return; // ✅ block double-submit
    setOkFlash(false);
    setGlobalErr("");
    setFieldErrs({});

    const local = validateLocal(payload);
    if (!local.ok) {
      setGlobalErr("validation");
      setFieldErrs(local.fields);
      return;
    }

    setBusy(true);

    try {
      const res = await fetch("/api/portal/tickets", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(raw);
      } catch {}

      if (!res.ok || !data?.ok) {
        if (String(data?.error || "") === "validation" && data?.fields && typeof data.fields === "object") {
          setGlobalErr("validation");
          applyServerFieldErrors(data.fields);
          return;
        }

        const msg =
          (typeof data?.error === "string" && data.error) ||
          (typeof data?.message === "string" && data.message) ||
          `HTTP_${res.status}`;

        console.log("TICKET_SUBMIT_FAIL", { status: res.status, raw });
        setGlobalErr(msg);
        return;
      }

      // success
      setTitle("");
      setImpact("");
      setDetails("");
      setCategory("Request");
      setPriority("Normal");
      setGlobalErr("");
      setFieldErrs({});
      setOkFlash(true);

      const id = String(data.ticket?.id || "");
      setTimeout(() => {
        if (id) router.push(`/portal/app/tickets/${encodeURIComponent(id)}`);
        else router.refresh();
      }, 350);
    } catch {
      setGlobalErr("network");
    } finally {
      setBusy(false);
    }
  }

  const cmdEnter = (e: React.KeyboardEvent) => {
    const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === "Enter";
    if (isCmdEnter) {
      e.preventDefault();
      if (!busy) submit();
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">NEW TICKET</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">Open a disciplined request</div>
          <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
            Keep it high-signal: scope + impact + timeline + desired outcome.
          </div>
          <div className="mt-3 text-xs text-white/45 leading-5">
            Tip: Ctrl/⌘ + Enter submits. Keep language operational, not emotional.
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-3 py-1 text-[11px] text-[#FDE68A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
          Controlled intake
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-white/55">Category</div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.category ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          >
            <option>Incident</option>
            <option>Request</option>
            <option>Change</option>
            <option>Access</option>
            <option>Billing</option>
          </select>
          {fieldErrs.category ? <div className="mt-2 text-xs text-red-200">{fieldErrs.category}</div> : null}
        </div>

        <div>
          <div className="text-xs text-white/55">Priority</div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.priority ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          {fieldErrs.priority ? <div className="mt-2 text-xs text-red-200">{fieldErrs.priority}</div> : null}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/55">Title</div>
            <div className="text-[11px] text-white/35">{clean(title).length}/160</div>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={cmdEnter}
            placeholder="Short + precise (e.g., Incorrect charge on January invoice)"
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.title ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          />
          {fieldErrs.title ? <div className="mt-2 text-xs text-red-200">{fieldErrs.title}</div> : null}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/55">Impact</div>
            <div className="text-[11px] text-white/35">{clean(impact).length}/320</div>
          </div>
          <input
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            onKeyDown={cmdEnter}
            placeholder="Unexpected billing discrepancy affecting reconciliation and account balance."
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.impact ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          />
          {fieldErrs.impact ? <div className="mt-2 text-xs text-red-200">{fieldErrs.impact}</div> : null}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/55">Details</div>
            <div className="text-[11px] text-white/35">{details.length}/6000</div>
          </div>

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={8}
            onKeyDown={cmdEnter}
            placeholder={[
              "Scope:",
              "- Invoice / account:",
              "- Plan expected:",
              "",
              "Timeline:",
              "- When noticed:",
              "- Recurring or one-time:",
              "",
              "Desired outcome:",
              "- Correction requested:",
              "- Target adjustment timeline:",
            ].join("\n")}
            className={cx(
              "mt-2 w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition",
              fieldErrs.details ? "border-red-400/30 focus:border-red-400/40" : "border-white/10 focus:border-white/20"
            )}
          />
          {fieldErrs.details ? <div className="mt-2 text-xs text-red-200">{fieldErrs.details}</div> : null}
        </div>
      </div>

      {okFlash ? (
        <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
          <div className="text-xs tracking-[0.22em] text-emerald-100/80">ACCEPTED</div>
          <div className="mt-2 text-sm text-emerald-100">Ticket created. Redirecting…</div>
        </div>
      ) : null}

      {globalErr ? (
        <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
          <div className="text-xs tracking-[0.22em] text-red-100/80">SUBMISSION BLOCKED</div>
          <div className="mt-2 text-sm text-red-100">{humanizeErr(globalErr)}</div>
          {globalErr === "validation" ? (
            <div className="mt-2 text-xs text-red-100/70">Fix the highlighted fields, then submit again.</div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          disabled={!canSubmit}
          onClick={submit}
          className={cx(
            "rounded-2xl px-5 py-3 text-sm font-medium transition text-center",
            canSubmit ? "bg-[#FACC15] text-black hover:bg-[#FDE047]" : "bg-[#FACC15]/40 text-black/60 cursor-not-allowed"
          )}
        >
          {busy ? "Submitting…" : "Submit ticket"}
        </button>

        <a
          href="/portal/app"
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
        >
          Back to console
        </a>
      </div>

      <div className="mt-5 text-xs text-white/45 leading-5">
        Enterprise note: requests may be acknowledged only during active intake windows. Noise is rejected to protect operations.
      </div>
    </div>
  );
}
