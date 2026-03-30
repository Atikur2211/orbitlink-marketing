"use client";

import { useMemo, useState } from "react";

export type ChatLeadMessage = {
  role: "user" | "assistant";
  text: string;
};

export type ChatLeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "won"
  | "lost";

export type ChatLeadRecord = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  intent: "live-agent";
  source: "chat";
  page?: string;
  notes?: string;
  messages: ChatLeadMessage[];
  status: ChatLeadStatus;
  followUpDate?: string;
  internalNotes?: string;
  archived?: boolean;
};

function formatDate(value?: string) {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat("en-CA", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function metricToneClass(tone: "default" | "gold" | "emerald" | "blue") {
  switch (tone) {
    case "gold":
      return "border-[#FACC15]/20 bg-[#FACC15]/[0.06] text-[#FDE68A]";
    case "emerald":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
    case "blue":
      return "border-cyan-400/20 bg-cyan-500/10 text-cyan-200";
    default:
      return "border-white/10 bg-black/20 text-white/90";
  }
}

function statusToneClass(status: ChatLeadStatus) {
  switch (status) {
    case "won":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
    case "qualified":
      return "border-cyan-400/20 bg-cyan-500/10 text-cyan-200";
    case "contacted":
      return "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]";
    case "lost":
      return "border-red-400/20 bg-red-500/10 text-red-200";
    default:
      return "border-white/10 bg-white/[0.04] text-white/75";
  }
}

function MetricCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "gold" | "emerald" | "blue";
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div
        className={`mt-3 rounded-2xl border px-4 py-3 text-lg font-semibold ${metricToneClass(
          tone,
        )}`}
      >
        {value}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-8 text-center">
      <div className="text-[11px] tracking-[0.28em] text-white/50">NO LEADS YET</div>
      <h2 className="mt-3 text-xl font-semibold text-white">No chat leads have been captured</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/65">
        Once a visitor requests a live agent through chat, their lead details and transcript will
        appear here.
      </p>
    </div>
  );
}

function LeadCard({
  lead,
  isActive,
  onClick,
}: {
  lead: ChatLeadRecord;
  isActive: boolean;
  onClick: () => void;
}) {
  const lastUserMessage =
    [...lead.messages].reverse().find((m) => m.role === "user")?.text ||
    "No user message captured";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-[26px] border p-5 text-left transition-all duration-300",
        isActive
          ? "border-[#FACC15]/30 bg-[#FACC15]/[0.06]"
          : "border-white/10 bg-black/20 hover:border-white/15 hover:bg-black/25",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-medium text-white/92">
            {lead.name || "Unknown visitor"}
          </div>
          <div className="mt-1 text-sm text-white/62">{lead.email}</div>
        </div>

        <div
          className={`rounded-full border px-3 py-1.5 text-[11px] ${statusToneClass(
            lead.status,
          )}`}
        >
          {lead.status}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <div className="text-[11px] tracking-[0.22em] text-white/50">COMPANY</div>
          <div className="mt-1 text-sm text-white/72">{lead.company || "—"}</div>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.22em] text-white/50">LOCATION</div>
          <div className="mt-1 text-sm text-white/72">{lead.location || "—"}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[11px] tracking-[0.22em] text-white/50">LAST USER MESSAGE</div>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/68">{lastUserMessage}</p>
      </div>

      <div className="mt-4 text-xs text-white/45">{formatDate(lead.createdAt)}</div>
    </button>
  );
}

function TranscriptBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  return (
    <div
      className={
        role === "user"
          ? "ml-10 rounded-2xl bg-[#FACC15] px-3 py-2 text-sm text-black"
          : "mr-10 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75"
      }
    >
      {text}
    </div>
  );
}

export default function ChatLeadsDashboard({
  initialLeads,
}: {
  initialLeads: ChatLeadRecord[];
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ChatLeadStatus>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(
    initialLeads[0]?.id ?? null,
  );
  const [saving, setSaving] = useState(false);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();

    return leads.filter((lead) => {
      if (!showArchived && lead.archived) return false;
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;

      if (!q) return true;

      const haystack = [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.location,
        lead.notes,
        lead.page,
        lead.internalNotes,
        ...lead.messages.map((m) => m.text),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [leads, query, statusFilter, showArchived]);

  const activeLead =
    filteredLeads.find((lead) => lead.id === activeLeadId) || filteredLeads[0] || null;

  async function updateLead(
    id: string,
    updates: Partial<
      Pick<ChatLeadRecord, "status" | "followUpDate" | "internalNotes" | "archived">
    >,
  ) {
    setSaving(true);

    try {
      const response = await fetch("/api/chat-lead-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...updates,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to update lead.");
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : lead,
        ),
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update lead.");
    } finally {
      setSaving(false);
    }
  }

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new" && !lead.archived).length;
  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "qualified" && !lead.archived,
  ).length;
  const wonLeads = leads.filter((lead) => lead.status === "won" && !lead.archived).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricCard label="TOTAL LEADS" value={String(totalLeads)} tone="gold" />
        <MetricCard label="NEW" value={String(newLeads)} tone="default" />
        <MetricCard label="QUALIFIED" value={String(qualifiedLeads)} tone="blue" />
        <MetricCard label="WON" value={String(wonLeads)} tone="emerald" />
      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-[11px] tracking-[0.28em] text-white/55">SEARCH & FILTER</div>
            <h2 className="mt-2 text-xl font-semibold text-white">Manage chat leads</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
              Review transcripts, update sales status, set follow-up dates, and keep internal
              notes in one place.
            </p>
          </div>

          <div className="grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, company, location, transcript..."
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | ChatLeadStatus)}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
              />
              Show archived
            </label>
          </div>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                isActive={activeLead?.id === lead.id}
                onClick={() => setActiveLeadId(lead.id)}
              />
            ))}
          </div>

          {activeLead && (
            <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] tracking-[0.28em] text-white/55">LEAD DETAIL</div>
                  <h2 className="mt-2 text-xl font-semibold text-white">{activeLead.name}</h2>
                  <p className="mt-2 text-sm text-white/62">{activeLead.email}</p>
                </div>

                <div
                  className={`rounded-full border px-3 py-1.5 text-sm ${statusToneClass(
                    activeLead.status,
                  )}`}
                >
                  {activeLead.status}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">PHONE</div>
                  <div className="mt-2 text-sm text-white/78">{activeLead.phone || "—"}</div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">COMPANY</div>
                  <div className="mt-2 text-sm text-white/78">{activeLead.company || "—"}</div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">LOCATION</div>
                  <div className="mt-2 text-sm text-white/78">{activeLead.location || "—"}</div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">PAGE</div>
                  <div className="mt-2 text-sm text-white/78">{activeLead.page || "—"}</div>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] tracking-[0.22em] text-white/55">STATUS CONTROL</div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <select
                    value={activeLead.status}
                    onChange={(e) =>
                      updateLead(activeLead.id, {
                        status: e.target.value as ChatLeadStatus,
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
                    disabled={saving}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>

                  <input
                    type="date"
                    value={activeLead.followUpDate || ""}
                    onChange={(e) =>
                      updateLead(activeLead.id, {
                        followUpDate: e.target.value,
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
                    disabled={saving}
                  />
                </div>

                <textarea
                  value={activeLead.internalNotes || ""}
                  onChange={(e) =>
                    setLeads((prev) =>
                      prev.map((lead) =>
                        lead.id === activeLead.id
                          ? { ...lead, internalNotes: e.target.value }
                          : lead,
                      ),
                    )
                  }
                  onBlur={(e) =>
                    updateLead(activeLead.id, {
                      internalNotes: e.target.value,
                    })
                  }
                  rows={5}
                  placeholder="Internal notes, follow-up details, deal context..."
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                  disabled={saving}
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      updateLead(activeLead.id, {
                        archived: !activeLead.archived,
                      })
                    }
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                    disabled={saving}
                  >
                    {activeLead.archived ? "Unarchive Lead" : "Archive Lead"}
                  </button>

                  {saving && <div className="self-center text-sm text-white/55">Saving...</div>}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] tracking-[0.22em] text-white/55">VISITOR NOTES</div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  {activeLead.notes || "No visitor notes provided."}
                </p>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[11px] tracking-[0.22em] text-white/55">TRANSCRIPT</div>
                  <div className="text-xs text-white/45">
                    {activeLead.messages.length} message
                    {activeLead.messages.length === 1 ? "" : "s"}
                  </div>
                </div>

                <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto">
                  {activeLead.messages.map((message, index) => (
                    <TranscriptBubble
                      key={`${activeLead.id}-${index}`}
                      role={message.role}
                      text={message.text}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${activeLead.email}`}
                  className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Email Lead
                </a>

                {activeLead.phone ? (
                  <a
                    href={`tel:${activeLead.phone}`}
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
                  >
                    Call Lead
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}