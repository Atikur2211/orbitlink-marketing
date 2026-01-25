"use client";

import ReviewToggleButton from "@/components/ReviewToggleButton";
import ContactedToggleButton from "@/components/ContactedToggleButton";
import { useMemo, useState } from "react";
import {
  formatWhen,
  formatShortDate,
  makeMailtoSubject,
  makeReplyTemplate,
  scoreRecord,
  type WaitlistRecord,
  uniqSorted,
} from "@/lib/waitlistOps";

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "gold" | "blue" | "emerald";
}) {
  const cls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "blue"
      ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
      : "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px]",
        cls,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 900);
        } catch {}
      }}
      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

function ReviewedPill({ reviewedAt }: { reviewedAt?: string }) {
  const reviewed = Boolean(reviewedAt);
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px]",
        reviewed
          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
          : "border-white/15 bg-white/5 text-white/70",
      ].join(" ")}
      title={reviewedAt ? `Reviewed at ${reviewedAt}` : "Not reviewed yet"}
    >
      {reviewed ? "REVIEWED" : "UNREVIEWED"}
    </span>
  );
}

function ContactedPill({ lastContactedAt }: { lastContactedAt?: string }) {
  const contacted = Boolean(lastContactedAt);
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px]",
        contacted
          ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
          : "border-white/15 bg-white/5 text-white/70",
      ].join(" ")}
      title={lastContactedAt ? `Last contacted at ${lastContactedAt}` : "Not contacted yet"}
    >
      {contacted ? `CONTACTED ${formatShortDate(lastContactedAt)}` : "NOT CONTACTED"}
    </span>
  );
}

export default function OpsWaitlistTable({ entries }: { entries: WaitlistRecord[] }) {
  const intents = useMemo(() => uniqSorted(entries.map((e) => e.intent)), [entries]);
  const roles = useMemo(() => uniqSorted(entries.map((e) => e.role)), [entries]);
  const sources = useMemo(() => uniqSorted(entries.map((e) => e.source)), [entries]);
  const modules = useMemo(() => uniqSorted(entries.map((e) => e.module)), [entries]);

  const [q, setQ] = useState("");
  const [intent, setIntent] = useState("");
  const [role, setRole] = useState("");
  const [source, setSource] = useState("");
  const [module, setModule] = useState("");
  const [minScore, setMinScore] = useState(0);

  // default: focus ops queue
  const [reviewed, setReviewed] = useState<"all" | "unreviewed" | "reviewed">("unreviewed");
  const [contacted, setContacted] = useState<"all" | "not" | "yes">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return entries
      .map((e) => ({ e, score: scoreRecord(e) }))
      .filter(({ e, score }) => {
        if (minScore && score < minScore) return false;

        if (intent && (e.intent || "") !== intent) return false;
        if (role && (e.role || "") !== role) return false;
        if (source && (e.source || "") !== source) return false;
        if (module && (e.module || "") !== module) return false;

        const isReviewed = Boolean(e.reviewedAt);
        if (reviewed === "reviewed" && !isReviewed) return false;
        if (reviewed === "unreviewed" && isReviewed) return false;

        const isContacted = Boolean(e.lastContactedAt);
        if (contacted === "yes" && !isContacted) return false;
        if (contacted === "not" && isContacted) return false;

        if (!needle) return true;

        const hay = [
          e.email,
          e.fullName,
          e.company,
          e.location,
          e.intent,
          e.role,
          e.source,
          e.module,
          e.notes,
          e.reviewNote,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return hay.includes(needle);
      })
      // premium sort: unreviewed first -> not contacted first -> best score
      .sort((a, b) => {
        const ar = Boolean(a.e.reviewedAt);
        const br = Boolean(b.e.reviewedAt);
        if (ar !== br) return ar ? 1 : -1;

        const ac = Boolean(a.e.lastContactedAt);
        const bc = Boolean(b.e.lastContactedAt);
        if (ac !== bc) return ac ? 1 : -1;

        return b.score - a.score;
      });
  }, [entries, q, intent, role, source, module, minScore, reviewed, contacted]);

  return (
    <div className="mt-5">
      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search (email, company, notes, location...)"
          className="lg:col-span-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/40"
        />

        <select
          value={reviewed}
          onChange={(e) => setReviewed(e.target.value as any)}
          className="lg:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        >
          <option value="all">Reviewed (all)</option>
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
        </select>

        <select
          value={contacted}
          onChange={(e) => setContacted(e.target.value as any)}
          className="lg:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        >
          <option value="all">Contacted (all)</option>
          <option value="not">Not contacted</option>
          <option value="yes">Contacted</option>
        </select>

        <select
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="lg:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        >
          <option value="">Intent (all)</option>
          {intents.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="lg:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        >
          <option value="">Role (all)</option>
          {roles.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="lg:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        >
          <option value="">Source (all)</option>
          {sources.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>

        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="lg:col-span-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        >
          <option value="">Module (all)</option>
          {modules.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>

        <div className="lg:col-span-12 flex flex-wrap items-center gap-2">
          <div className="text-xs text-white/55">
            Showing <span className="text-white/80">{filtered.length}</span> of{" "}
            <span className="text-white/80">{entries.length}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="text-xs text-white/55">Min score</div>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white outline-none focus:border-[#FACC15]/40"
            >
              {[0, 25, 40, 60, 75].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setQ("");
                setReviewed("unreviewed");
                setContacted("all");
                setIntent("");
                setRole("");
                setSource("");
                setModule("");
                setMinScore(0);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
        <div className="grid grid-cols-12 bg-black/30 px-4 py-3 text-[11px] tracking-[0.22em] text-white/55">
          <div className="col-span-3">CONTACT</div>
          <div className="col-span-2">INTENT</div>
          <div className="col-span-2">CONTEXT</div>
          <div className="col-span-1 text-center">SCORE</div>
          <div className="col-span-2">WHEN</div>
          <div className="col-span-2 text-right">OPS</div>
        </div>

        <div className="divide-y divide-white/10 bg-black/20">
          {filtered.map(({ e, score }) => {
            const intentTone =
              e.intent === "verification-pack" ? "gold" : e.intent ? "blue" : "gold";
            const srcTone =
              e.source === "trust" ? "emerald" : e.source ? "blue" : "gold";

            const replyText = makeReplyTemplate(e);
            const subject = makeMailtoSubject(e);
            const mailto = `mailto:${e.email}?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(replyText)}`;

            return (
              <div
                key={(e.id || "") + e.email + (e.createdAt || "")}
                className="grid grid-cols-12 gap-2 px-4 py-4"
              >
                <div className="col-span-12 md:col-span-3 min-w-0">
                  <div className="text-sm text-white/85 truncate">{e.email}</div>
                  <div className="mt-1 text-xs text-white/55 truncate">
                    {(e.fullName || "—")}
                    {e.company ? ` • ${e.company}` : ""}
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2 flex flex-col gap-1">
                  <Badge tone={intentTone as any}>{e.intent || "—"}</Badge>
                  {e.role ? (
                    <div className="text-xs text-white/55">{e.role}</div>
                  ) : null}
                </div>

                <div className="col-span-6 md:col-span-2 flex flex-col gap-1">
                  <Badge tone={srcTone as any}>{e.source || "—"}</Badge>
                  <div className="text-xs text-white/55 truncate">
                    {(e.location || "—")}
                    {e.module ? ` • ${e.module}` : ""}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                  <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80">
                    {score}
                  </div>
                </div>

                <div className="col-span-5 md:col-span-2 flex flex-col justify-center gap-1 text-xs text-white/60">
                  <div>
                    {formatWhen(e)}
                    {e.updatedAt ? (
                      <span className="ml-2 text-[11px] text-white/45">(updated)</span>
                    ) : null}
                  </div>
                  {e.lastContactedAt ? (
                    <div className="text-[11px] text-white/45">
                      last contacted: {formatShortDate(e.lastContactedAt)}
                    </div>
                  ) : null}
                </div>

                <div className="col-span-4 md:col-span-2 flex flex-wrap items-center justify-end gap-2">
                  <ReviewedPill reviewedAt={e.reviewedAt} />
                  <ContactedPill lastContactedAt={e.lastContactedAt} />

                  {e.id ? (
                    <ReviewToggleButton id={e.id} reviewedAt={e.reviewedAt} />
                  ) : null}

                  {e.id ? (
                    <ContactedToggleButton
                      id={e.id}
                      lastContactedAt={e.lastContactedAt}
                      mailto={mailto}
                    />
                  ) : null}

                    
                  <CopyButton text={replyText} label="Copy reply" />

                  {/* GOLDEN MOVE: stamp contact first, then open mailto */}
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (e.id) {
                          await fetch("/api/ops/waitlist/contact", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({ id: e.id, contacted: true }),
                          });
                        }
                      } catch {
                        // ignore
                      } finally {
                        window.location.href = mailto;
                      }
                    }}
                    className="rounded-2xl bg-[#FACC15] text-black px-3 py-2 text-xs font-medium hover:bg-[#FDE047] transition"
                    title={e.id ? "Stamp lastContactedAt, then open mail client" : "Open mail client"}
                  >
                    Email
                  </button>
                </div>

                {e.notes ? (
                  <div className="col-span-12 mt-1 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-white/65">
                    {e.notes}
                  </div>
                ) : null}

                {e.reviewNote ? (
                  <div className="col-span-12 mt-2 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-white/65">
                    <span className="text-white/55">Review note:</span> {e.reviewNote}
                  </div>
                ) : null}
              </div>
            );
          })}

          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-white/55">
              No matches. Try resetting filters.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
