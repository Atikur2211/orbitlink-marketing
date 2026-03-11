"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type TimelineEvent = {
  id: string;
  at: string;
  type: string;
  by: string;
  note?: string;
  from?: string;
  to?: string;
};

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function fmtUTC(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return (
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d) + " UTC"
  );
}

async function safeCopy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "comment", label: "Comments" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "assign", label: "Assign" },
  { key: "sla", label: "SLA" },
  { key: "created", label: "Created" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const QUICK_CHIPS = [
  { label: "Breached SLA", query: "sla breached" },
  { label: "Closed/Resolved", query: "to closed OR: to resolved" },
  { label: "Assignee: billing", query: "billing@orbitlink.ca" },
  { label: "Priority changes", query: "priority" },
  { label: "Status changes", query: "status" },
  { label: "Reasons", query: "reason:" },
] as const;

function norm(v: string) {
  return String(v || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const raw = String(text || "");
  const q = norm(query);
  if (!q) return <>{raw}</>;

  // highlight all tokens (not just whole query)
  const tokens = tokenizeQuery(q).tokens;
  if (!tokens.length) return <>{raw}</>;

  const re = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "ig");
  const parts = raw.split(re);
  if (parts.length === 1) return <>{raw}</>;

  return (
    <>
      {parts.map((p, i) => {
        const hit = tokens.some((t) => p.toLowerCase() === t.toLowerCase());
        if (!hit) return <span key={i}>{p}</span>;
        return (
          <mark
            key={i}
            className="rounded-md border border-[#FACC15]/25 bg-[#FACC15]/15 px-1 py-[1px] text-[#FDE68A]"
          >
            {p}
          </mark>
        );
      })}
    </>
  );
}

function typeLabel(t: string) {
  const k = (t || "").toLowerCase().trim();
  if (k === "comment") return "Comment";
  if (k === "status") return "Status";
  if (k === "priority") return "Priority";
  if (k === "assign" || k === "assigned") return "Assign";
  if (k === "sla") return "SLA";
  if (k === "created") return "Created";
  return (t || "Event").toString();
}

/**
 * Query grammar (enterprise-friendly, simple):
 * - Default: multi-word AND match (all tokens must appear)
 * - OR mode: prefix with "OR:" or include " OR: " anywhere
 *   Example: "to closed OR: to resolved"
 * - Supports "reason:" token (matches anywhere; future-ready)
 */
function tokenizeQuery(qRaw: string): { mode: "and" | "or"; tokens: string[] } {
  const q = norm(qRaw);
  if (!q) return { mode: "and", tokens: [] };

  // If contains "OR:" anywhere, switch to OR mode
  const parts = q.split("or:").map((x) => x.trim()).filter(Boolean);
  if (parts.length > 1) {
    // OR mode: flatten tokens from each clause
    const toks = parts
      .map((clause) => clause.split(" ").map((t) => t.trim()).filter(Boolean))
      .flat()
      .filter(Boolean);
    return { mode: "or", tokens: dedupe(toks) };
  }

  // AND mode tokens
  const tokens = q.split(" ").map((t) => t.trim()).filter(Boolean);
  return { mode: "and", tokens: dedupe(tokens) };
}

function dedupe(xs: string[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const x of xs) {
    const k = x.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function buildHaystack(ticketId: string, e: TimelineEvent) {
  return [
    ticketId,
    e.id,
    e.type,
    typeLabel(e.type),
    e.by,
    e.note,
    e.from,
    e.to,
    e.at,
    fmtUTC(e.at),
    // future-safe: if note includes "Reason:" or "breached" or etc.
  ]
    .filter(Boolean)
    .join(" • ")
    .toLowerCase();
}

function matchesQuery(ticketId: string, e: TimelineEvent, q: string) {
  const { mode, tokens } = tokenizeQuery(q);
  if (!tokens.length) return true;

  const hay = buildHaystack(ticketId, e);

  if (mode === "or") {
    return tokens.some((t) => hay.includes(t.toLowerCase()));
  }

  // AND mode
  return tokens.every((t) => hay.includes(t.toLowerCase()));
}

function isSensitiveEvent(e: TimelineEvent) {
  const t = (e.type || "").toLowerCase();
  const to = (e.to || "").toLowerCase();
  if (t === "status" && (to === "closed" || to === "resolved" || to === "queued")) return true;
  return false;
}

function isSlaBreachHint(e: TimelineEvent) {
  const note = (e.note || "").toLowerCase();
  return note.includes("breach") || note.includes("breached") || note.includes("sla breached");
}

export default function TicketOpsActivity({
  ticketId,
  timeline,
}: {
  ticketId: string;
  timeline: TimelineEvent[];
}) {
  const router = useRouter();

  const [filter, setFilter] = useState<FilterKey>("all");
  const [q, setQ] = useState<string>("");
  const [toast, setToast] = useState<string>("");

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // Sorted master list (deterministic)
  const sorted = useMemo(() => {
    const src = Array.isArray(timeline) ? timeline.slice(0) : [];
    src.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)); // newest first
    return src;
  }, [timeline]);

  const filtered = useMemo(() => {
    const byType = filter === "all" ? sorted : sorted.filter((e) => (e.type || "").toLowerCase() === filter);
    const byQuery = norm(q) ? byType.filter((e) => matchesQuery(ticketId, e, q)) : byType;
    return byQuery;
  }, [sorted, filter, q, ticketId]);

  const items = useMemo(() => filtered.slice(0, 10), [filtered]);

  // Hotkeys: only when panel is focused
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    function onKeyDown(e: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null;
      const isTyping =
        active?.tagName === "INPUT" ||
        active?.tagName === "TEXTAREA" ||
        (active as any)?.isContentEditable;

      // allow "/" to focus search even if not typing
      if (!isTyping && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (isTyping) return;

      const key = e.key.toLowerCase();

      // filters 1..7
      if (key >= "1" && key <= "7") {
        const idx = Number(key) - 1;
        const fk = FILTERS[idx]?.key;
        if (fk) {
          setFilter(fk);
          setToast(`Filter: ${FILTERS[idx].label}`);
          window.setTimeout(() => setToast(""), 1200);
        }
        return;
      }

      // refresh
      if (key === "r") {
        router.refresh();
        setToast("Refreshed.");
        window.setTimeout(() => setToast(""), 1200);
        return;
      }

      // copy top event json
      if (key === "c") {
        const top = items[0];
        if (!top) return;
        const payload = JSON.stringify({ ticketId, event: top }, null, 2);
        void safeCopy(payload).then((ok) => {
          setToast(ok ? "Top event JSON copied." : "Copy failed.");
          window.setTimeout(() => setToast(""), 1400);
        });
        return;
      }

      // reset
      if (key === "escape") {
        setFilter("all");
        setQ("");
        setToast("Reset.");
        window.setTimeout(() => setToast(""), 1000);
        return;
      }
    }

    // attach to window but only if the panel is "active"
    function onWindowKeyDown(e: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null;
      // only run if focus is inside panel
      if (!wrapRef.current) return;
      if (active && wrapRef.current.contains(active)) onKeyDown(e);
    }

    window.addEventListener("keydown", onWindowKeyDown);
    return () => window.removeEventListener("keydown", onWindowKeyDown);
  }, [router, items, ticketId]);

  async function copyPack(kind: "last10" | "filtered") {
    const base = kind === "last10" ? sorted.slice(0, 10) : filtered.slice(0, 50);
    const payload = JSON.stringify(
      {
        ticketId,
        exportedAt: new Date().toISOString(),
        kind,
        count: base.length,
        events: base,
      },
      null,
      2
    );

    const ok = await safeCopy(payload);
    setToast(ok ? `Copied ${kind === "last10" ? "last 10" : "filtered"} export.` : "Copy failed.");
    window.setTimeout(() => setToast(""), 1800);
  }

  const hasSearch = norm(q).length > 0;
  const tokenInfo = useMemo(() => tokenizeQuery(q), [q]);

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7 outline-none focus:ring-2 focus:ring-[#FACC15]/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">OPS ACTIVITY</div>
          <div className="mt-2 text-lg font-semibold text-white/90">Last 10 events</div>
          <div className="mt-2 text-sm text-white/70 leading-6">
            Filtered operator view for high-signal audit & troubleshooting.
          </div>

          <div className="mt-3 text-[11px] text-white/45 leading-5">
            Hotkeys (panel focus): <span className="text-white/70">1–7</span> filters •{" "}
            <span className="text-white/70">/</span> search • <span className="text-white/70">r</span> refresh •{" "}
            <span className="text-white/70">c</span> copy top • <span className="text-white/70">Esc</span> reset
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.refresh()}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition"
          >
            Refresh
          </button>

          <button
            onClick={() => {
              setFilter("all");
              setQ("");
              setToast("");
            }}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition"
            title="Reset filters/search"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[11px] tracking-[0.22em] text-white/55">SEARCH</div>

          <div className="text-[11px] text-white/40">
            Mode:{" "}
            <span className="text-white/70">{tokenInfo.mode === "or" ? "OR (any token)" : "AND (all tokens)"}</span>
          </div>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Example: "to closed reason:" or "billing@orbitlink.ca" or "to closed OR: to resolved"'
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/85 outline-none transition focus:border-white/20"
          />
          <button
            onClick={() => setQ("")}
            disabled={!hasSearch}
            className={cx(
              "rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition",
              hasSearch ? "hover:bg-white/10" : "opacity-60 cursor-not-allowed"
            )}
          >
            Clear
          </button>
        </div>

        {/* chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_CHIPS.map((c) => (
            <button
              key={c.label}
              onClick={() => setQ(c.query)}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/60 hover:bg-white/5 transition"
              title={`Set query: ${c.query}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {hasSearch ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-3 py-1 text-[11px] text-[#FDE68A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Highlighting {tokenInfo.tokens.length} token(s)
          </div>
        ) : null}
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cx(
              "rounded-full border px-3 py-1 text-[11px] transition",
              filter === f.key
                ? "border-[#FACC15]/30 bg-[#FACC15]/10 text-[#FDE68A]"
                : "border-white/10 bg-black/20 text-white/60 hover:bg-white/5"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Export / Copy pack */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => void copyPack("last10")}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
          title="Copy last 10 events as a JSON export pack"
        >
          Copy last-10 export
        </button>

        <button
          onClick={() => void copyPack("filtered")}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
          title="Copy up to 50 filtered events (audit/debug pack)"
        >
          Copy filtered export
        </button>

        <div className="sm:ml-auto text-[11px] text-white/45 self-center">
          Showing <span className="text-white/70">{items.length}</span> of{" "}
          <span className="text-white/70">{filtered.length}</span> matched
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100/90">
          {toast}
        </div>
      ) : null}

      {/* List */}
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.map((e) => {
            const payload = JSON.stringify({ ticketId, event: e }, null, 2);
            const sensitive = isSensitiveEvent(e);
            const breachHint = isSlaBreachHint(e);

            return (
              <div
                key={e.id}
                className={cx(
                  "rounded-2xl border bg-black/20 px-4 py-3",
                  sensitive ? "border-[#FACC15]/20 bg-[#FACC15]/[0.06]" : "border-white/10",
                  breachHint ? "ring-1 ring-red-400/15" : ""
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-white/55">
                      <HighlightText text={fmtUTC(e.at)} query={q} />
                    </div>

                    <div className="mt-1 text-sm text-white/85">
                      <span className="text-white/90">
                        <HighlightText text={typeLabel(e.type).toUpperCase()} query={q} />
                      </span>
                      <span className="text-white/50"> • </span>
                      <span className="text-white/70">
                        <HighlightText text={String(e.by || "")} query={q} />
                      </span>

                      {sensitive ? (
                        <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 px-2 py-[2px] text-[10px] text-[#FDE68A]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                          Sensitive
                        </span>
                      ) : null}

                      {breachHint ? (
                        <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-2 py-[2px] text-[10px] text-red-100/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-300/80" />
                          Breach hint
                        </span>
                      ) : null}
                    </div>

                    {e.from || e.to ? (
                      <div className="mt-1 text-xs text-white/55">
                        {e.from ? (
                          <span>
                            from{" "}
                            <span className="text-white/75">
                              <HighlightText text={String(e.from || "")} query={q} />
                            </span>{" "}
                          </span>
                        ) : null}
                        {e.to ? (
                          <span>
                            to{" "}
                            <span className="text-white/75">
                              <HighlightText text={String(e.to || "")} query={q} />
                            </span>
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    {e.note ? (
                      <div className="mt-1 text-xs text-white/45">
                        <HighlightText text={String(e.note || "")} query={q} />
                      </div>
                    ) : null}
                  </div>

                  <div className="shrink-0 flex flex-col gap-2">
                    <button
                      onClick={async () => {
                        const ok = await safeCopy(payload);
                        setToast(ok ? "Event JSON copied." : "Copy failed.");
                        window.setTimeout(() => setToast(""), 1600);
                      }}
                      className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
                      title="Copy this event as JSON (audit/debug)"
                    >
                      Copy JSON
                    </button>

                    <button
                      onClick={async () => {
                        const compact = JSON.stringify({ ticketId, id: e.id }, null, 0);
                        const ok = await safeCopy(compact);
                        setToast(ok ? "Event pointer copied." : "Copy failed.");
                        window.setTimeout(() => setToast(""), 1400);
                      }}
                      className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
                      title="Copy a minimal pointer (ticketId + eventId)"
                    >
                      Copy pointer
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/60">
            No events in this filter/search.
          </div>
        )}
      </div>

      <div className="mt-5 text-xs text-white/45 leading-5">
        Enterprise posture: read-only surface. Events remain append-only in the underlying ticket record.
        <br />
        Future ops: add operator signatures, approval chains for sensitive transitions, and export digests (SHA256) for
        offline verification.
      </div>
    </div>
  );
}
