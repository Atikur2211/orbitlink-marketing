"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

/* -----------------------------
   TYPES
----------------------------- */

export type ChatLeadMessage = {
  role: "user" | "assistant";
  text: string;
};

export type ChatLeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "appointment-booked"
  | "support-open"
  | "won"
  | "lost";

export type ChatLeadDepartment =
  | "sales"
  | "billing"
  | "technical"
  | "appointments"
  | "general";

export type ChatLeadPriority = "low" | "normal" | "high" | "urgent";

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
  department?: ChatLeadDepartment;
  priority?: ChatLeadPriority;
  assignedTo?: string;
  slaDueAt?: string;
  notificationSent?: boolean;
  lastNotifiedAt?: string;
  leadScore?: number;
};

type LeadDraft = {
  status: ChatLeadStatus;
  department: ChatLeadDepartment;
  priority: ChatLeadPriority;
  assignedTo: string;
  slaDueAt: string;
  followUpDate: string;
  internalNotes: string;
  archived: boolean;
};

/* -----------------------------
   HELPERS
----------------------------- */

function isValidStatus(value: unknown): value is ChatLeadStatus {
  return (
    value === "new" ||
    value === "contacted" ||
    value === "qualified" ||
    value === "appointment-booked" ||
    value === "support-open" ||
    value === "won" ||
    value === "lost"
  );
}

function isValidDepartment(value: unknown): value is ChatLeadDepartment {
  return (
    value === "sales" ||
    value === "billing" ||
    value === "technical" ||
    value === "appointments" ||
    value === "general"
  );
}

function isValidPriority(value: unknown): value is ChatLeadPriority {
  return (
    value === "low" ||
    value === "normal" ||
    value === "high" ||
    value === "urgent"
  );
}

function normalizeMessages(value: unknown): ChatLeadMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const role =
        (item as { role?: unknown }).role === "assistant" ? "assistant" : "user";

      const text =
        typeof (item as { text?: unknown }).text === "string"
          ? (item as { text?: string }).text!.trim()
          : "";

      if (!text) return null;

      return { role, text } as ChatLeadMessage;
    })
    .filter((item): item is ChatLeadMessage => Boolean(item));
}

function mapRowToLead(row: Record<string, unknown>): ChatLeadRecord | null {
  const id = typeof row.id === "string" ? row.id : "";
  if (!id) return null;

  return {
    id,
    createdAt: typeof row.created_at === "string" ? row.created_at : "",
    updatedAt: typeof row.updated_at === "string" ? row.updated_at : "",
    name: typeof row.name === "string" ? row.name : "",
    email: typeof row.email === "string" ? row.email : "",
    phone: typeof row.phone === "string" ? row.phone : "",
    company: typeof row.company === "string" ? row.company : "",
    location: typeof row.location === "string" ? row.location : "",
    intent: "live-agent",
    source: "chat",
    page: typeof row.page === "string" ? row.page : "",
    notes: typeof row.notes === "string" ? row.notes : "",
    messages: normalizeMessages(row.messages),
    status: isValidStatus(row.status) ? row.status : "new",
    followUpDate:
      typeof row.follow_up_date === "string" ? row.follow_up_date : "",
    internalNotes:
      typeof row.internal_notes === "string" ? row.internal_notes : "",
    archived: Boolean(row.archived),
    department: isValidDepartment(row.department) ? row.department : "general",
    priority: isValidPriority(row.priority) ? row.priority : "normal",
    assignedTo: typeof row.assigned_to === "string" ? row.assigned_to : "",
    slaDueAt: typeof row.sla_due_at === "string" ? row.sla_due_at : "",
    notificationSent: Boolean(row.notification_sent),
    lastNotifiedAt:
      typeof row.last_notified_at === "string" ? row.last_notified_at : "",
    leadScore: typeof row.lead_score === "number" ? row.lead_score : 0,
  };
}

function getSafeTime(value?: string) {
  const parsed = new Date(value || "").getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDate(value?: string) {
  if (!value) return "—";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  try {
    return new Intl.DateTimeFormat("en-CA", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Toronto",
    }).format(parsed);
  } catch {
    return "—";
  }
}

function toDateTimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getSlaState(slaDueAt?: string) {
  if (!slaDueAt) {
    return { label: "No SLA", className: "text-white/50" };
  }

  const due = new Date(slaDueAt).getTime();
  const now = Date.now();

  if (!Number.isFinite(due)) {
    return { label: "No SLA", className: "text-white/50" };
  }

  if (due <= now) {
    return { label: "Overdue", className: "text-red-300" };
  }

  const minutes = Math.max(0, Math.round((due - now) / 60000));

  if (minutes <= 30) {
    return { label: `${minutes} min left`, className: "text-red-300" };
  }

  if (minutes <= 120) {
    return { label: `${minutes} min left`, className: "text-yellow-300" };
  }

  return { label: `${minutes} min left`, className: "text-emerald-300" };
}

function statusColor(status: ChatLeadStatus) {
  switch (status) {
    case "won":
      return "text-emerald-300 border-emerald-400/20 bg-emerald-500/10";
    case "qualified":
      return "text-cyan-200 border-cyan-400/20 bg-cyan-500/10";
    case "contacted":
      return "text-yellow-200 border-yellow-400/20 bg-yellow-500/10";
    case "appointment-booked":
      return "text-purple-200 border-purple-400/20 bg-purple-500/10";
    case "support-open":
      return "text-red-200 border-red-400/20 bg-red-500/10";
    case "lost":
      return "text-red-200 border-red-400/20 bg-red-500/10";
    default:
      return "text-white/70 border-white/10 bg-white/[0.04]";
  }
}

function departmentColor(dep?: ChatLeadDepartment) {
  switch (dep) {
    case "technical":
      return "text-red-200 border-red-400/20 bg-red-500/10";
    case "billing":
      return "text-blue-200 border-blue-400/20 bg-blue-500/10";
    case "sales":
      return "text-emerald-200 border-emerald-400/20 bg-emerald-500/10";
    case "appointments":
      return "text-purple-200 border-purple-400/20 bg-purple-500/10";
    default:
      return "text-white/60 border-white/10 bg-white/[0.04]";
  }
}

function priorityColor(priority?: ChatLeadPriority) {
  switch (priority) {
    case "urgent":
      return "text-red-300 border-red-400/20 bg-red-500/10";
    case "high":
      return "text-yellow-300 border-yellow-400/20 bg-yellow-500/10";
    case "normal":
      return "text-white/70 border-white/10 bg-white/[0.04]";
    default:
      return "text-white/50 border-white/10 bg-white/[0.04]";
  }
}

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-300";
  if (score >= 45) return "text-yellow-300";
  return "text-white/70";
}

function buildDraft(lead: ChatLeadRecord): LeadDraft {
  return {
    status: lead.status,
    department: lead.department || "general",
    priority: lead.priority || "normal",
    assignedTo: lead.assignedTo || "",
    slaDueAt: toDateTimeLocal(lead.slaDueAt),
    followUpDate: lead.followUpDate || "",
    internalNotes: lead.internalNotes || "",
    archived: Boolean(lead.archived),
  };
}

async function postLeadUpdate(
  body: Record<string, unknown>,
): Promise<{ ok: boolean; lead?: unknown; error?: string }> {
  const response = await fetch("/api/chat-lead-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

const selectClass =
  "rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-2 text-sm text-white outline-none";
const inputClass =
  "rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-2 text-sm text-white outline-none placeholder:text-white/35";

/* -----------------------------
   MAIN COMPONENT
----------------------------- */

export default function ChatLeadsDashboard({
  initialLeads,
}: {
  initialLeads: ChatLeadRecord[];
}) {
  const [leads, setLeads] = useState<ChatLeadRecord[]>(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(
    initialLeads[0]?.id ?? null,
  );

  const [statusFilter, setStatusFilter] = useState<"all" | ChatLeadStatus>("all");
  const [departmentFilter, setDepartmentFilter] = useState<
    "all" | ChatLeadDepartment
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | ChatLeadPriority>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [draft, setDraft] = useState<LeadDraft | null>(
    initialLeads[0] ? buildDraft(initialLeads[0]) : null,
  );

  useEffect(() => {
    setLeads(initialLeads);
    setActiveId((current) => current ?? initialLeads[0]?.id ?? null);
  }, [initialLeads]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = window.setTimeout(() => setSuccessMessage(""), 2500);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    let isMounted = true;
    const supabase = getSupabaseBrowserClient();

    const channel = supabase
      .channel("chat-leads-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_leads" },
        (payload) => {
          if (!isMounted) return;

          try {
            if (!payload || (!payload.new && !payload.old)) return;

            if (payload.eventType === "DELETE") {
              const oldRow =
                payload.old && typeof payload.old === "object"
                  ? (payload.old as Record<string, unknown>)
                  : null;

              const deletedId =
                oldRow && typeof oldRow.id === "string" ? oldRow.id : "";

              if (!deletedId) return;

              setLeads((prev) => prev.filter((lead) => lead.id !== deletedId));
              setActiveId((prev) => (prev === deletedId ? null : prev));
              return;
            }

            const newRow =
              payload.new && typeof payload.new === "object"
                ? (payload.new as Record<string, unknown>)
                : null;

            if (!newRow) return;

            const updated = mapRowToLead(newRow);
            if (!updated) return;

            setLeads((prev) => {
              const exists = prev.some((lead) => lead.id === updated.id);
              const next = exists
                ? prev.map((lead) => (lead.id === updated.id ? updated : lead))
                : [updated, ...prev];

              return next.sort(
                (a, b) => getSafeTime(b.createdAt) - getSafeTime(a.createdAt),
              );
            });
          } catch (error) {
            console.error("Chat leads realtime event error:", error);
          }
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("Chat leads realtime channel error.");
        }
      });

    return () => {
      isMounted = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();

    return leads
      .filter((lead) => (showArchived ? true : !lead.archived))
      .filter((lead) => (statusFilter === "all" ? true : lead.status === statusFilter))
      .filter((lead) =>
        departmentFilter === "all" ? true : lead.department === departmentFilter,
      )
      .filter((lead) =>
        priorityFilter === "all" ? true : lead.priority === priorityFilter,
      )
      .filter((lead) => {
        if (!q) return true;

        const haystack = [
          lead.name,
          lead.email,
          lead.company,
          lead.location,
          lead.phone,
          lead.notes,
          lead.internalNotes,
          lead.assignedTo,
          ...lead.messages.map((m) => m.text),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      })
      .sort((a, b) => getSafeTime(b.createdAt) - getSafeTime(a.createdAt));
  }, [leads, showArchived, statusFilter, departmentFilter, priorityFilter, query]);

  const active =
    filteredLeads.find((lead) => lead.id === activeId) || filteredLeads[0] || null;

  useEffect(() => {
    if (!filteredLeads.length) {
      setActiveId(null);
      setDraft(null);
      return;
    }

    if (!activeId) {
      setActiveId(filteredLeads[0].id);
      return;
    }

    const stillExists = filteredLeads.some((lead) => lead.id === activeId);
    if (!stillExists) {
      setActiveId(filteredLeads[0].id);
    }
  }, [filteredLeads, activeId]);

  useEffect(() => {
    if (!active) {
      setDraft(null);
      return;
    }
    setDraft(buildDraft(active));
  }, [active?.id]);

  async function saveLeadChanges() {
    if (!active || !draft) return;

    setSaving(true);

    try {
      const result = await postLeadUpdate({
        id: active.id,
        status: draft.status,
        department: draft.department,
        priority: draft.priority,
        assignedTo: draft.assignedTo,
        slaDueAt: draft.slaDueAt ? new Date(draft.slaDueAt).toISOString() : "",
        followUpDate: draft.followUpDate,
        internalNotes: draft.internalNotes,
        archived: draft.archived,
      });

      if (!result.ok) {
        throw new Error(result.error || "Failed to update lead.");
      }

      let message = "Lead updated successfully";

      if (draft.archived !== Boolean(active.archived)) {
        message = draft.archived
          ? "Lead archived successfully"
          : "Lead unarchived successfully";
      } else if (draft.status !== active.status) {
        message = `Status updated to ${draft.status}`;
      } else if (draft.department !== (active.department || "general")) {
        message = `Department updated to ${draft.department}`;
      } else if (draft.priority !== (active.priority || "normal")) {
        message = `Priority updated to ${draft.priority}`;
      } else if (draft.assignedTo !== (active.assignedTo || "")) {
        message = "Lead assignment updated successfully";
      } else if (draft.followUpDate !== (active.followUpDate || "")) {
        message = "Follow-up date updated successfully";
      } else if (draft.internalNotes !== (active.internalNotes || "")) {
        message = "Internal notes updated successfully";
      }

      setSuccessMessage(message);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update lead.");
    } finally {
      setSaving(false);
    }
  }

  if (!filteredLeads.length) {
    return (
      <div className="space-y-6">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads, company, location..."
              className={inputClass}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | ChatLeadStatus)}
              className={selectClass}
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="appointment-booked">Appointment Booked</option>
              <option value="support-open">Support Open</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value as "all" | ChatLeadDepartment)
              }
              className={selectClass}
            >
              <option value="all">All departments</option>
              <option value="sales">Sales</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="appointments">Appointments</option>
              <option value="general">General</option>
            </select>

            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-2 text-sm text-white/75">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
              />
              Show archived
            </label>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
          <div className="text-[11px] tracking-[0.28em] text-white/45">
            NO MATCHING LEADS
          </div>
          <h2 className="mt-3 text-xl font-semibold text-white">
            No leads match your current filters
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Try changing the search, status, department, priority, or archive filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </div>
      )}

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, company, location..."
            className={inputClass}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | ChatLeadStatus)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="appointment-booked">Appointment Booked</option>
            <option value="support-open">Support Open</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value as "all" | ChatLeadDepartment)
            }
            className={selectClass}
          >
            <option value="all">All departments</option>
            <option value="sales">Sales</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="appointments">Appointments</option>
            <option value="general">General</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value as "all" | ChatLeadPriority)
            }
            className={selectClass}
          >
            <option value="all">All priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>

          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-2 text-sm text-white/75">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
            />
            Show archived
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const lastMessage =
              [...lead.messages].reverse().find((m) => m.role === "user")?.text ||
              "No message";

            const sla = getSlaState(lead.slaDueAt);

            return (
              <button
                key={lead.id}
                type="button"
                onClick={() => setActiveId(lead.id)}
                className={`w-full rounded-[24px] border p-5 text-left transition ${
                  active?.id === lead.id
                    ? "border-[#FACC15]/30 bg-[#FACC15]/[0.06]"
                    : "border-white/10 bg-black/20 hover:bg-black/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium text-white">
                      {lead.name || "Unknown contact"}
                    </div>
                    <div className="mt-1 text-sm text-white/60">
                      {lead.email || "—"}
                    </div>
                  </div>

                  <div
                    className={`rounded-full border px-3 py-1 text-xs ${statusColor(
                      lead.status,
                    )}`}
                  >
                    {lead.status}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <div
                    className={`rounded border px-2 py-1 ${departmentColor(
                      lead.department,
                    )}`}
                  >
                    {lead.department || "general"}
                  </div>

                  <div
                    className={`rounded border px-2 py-1 ${priorityColor(
                      lead.priority,
                    )}`}
                  >
                    {lead.priority || "normal"}
                  </div>

                  <div className={`rounded border border-white/10 px-2 py-1 ${sla.className}`}>
                    {sla.label}
                  </div>

                  <div className={`rounded border border-white/10 px-2 py-1 ${scoreColor(lead.leadScore ?? 0)}`}>
                    Score {lead.leadScore ?? 0}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/55">
                  <div>Assigned: {lead.assignedTo || "Unassigned"}</div>
                  <div>Notify: {lead.notificationSent ? "Sent" : "Pending"}</div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-white/70">
                  {lastMessage}
                </p>

                <div className="mt-3 text-xs text-white/40">
                  {formatDate(lead.createdAt)}
                </div>
              </button>
            );
          })}
        </div>

        {active && draft && (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {active.name || "Unknown contact"}
                </h2>
                <p className="mt-1 text-sm text-white/60">{active.email || "—"}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div
                  className={`rounded-full border px-3 py-1 text-xs ${statusColor(
                    draft.status,
                  )}`}
                >
                  {draft.status}
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-xs ${departmentColor(
                    draft.department,
                  )}`}
                >
                  {draft.department}
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-xs ${priorityColor(
                    draft.priority,
                  )}`}
                >
                  {draft.priority}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-white/75 sm:grid-cols-2">
              <div>Company: {active.company || "—"}</div>
              <div>Location: {active.location || "—"}</div>
              <div>Phone: {active.phone || "—"}</div>
              <div>Assigned To: {active.assignedTo || "Unassigned"}</div>
              <div>SLA Due: {formatDate(active.slaDueAt)}</div>
              <div>Lead Score: {active.leadScore ?? 0}</div>
              <div>Notification Sent: {active.notificationSent ? "Yes" : "No"}</div>
              <div>Last Notified: {formatDate(active.lastNotifiedAt)}</div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              <select
                value={draft.status}
                onChange={(e) =>
                  setDraft((prev) =>
                    prev ? { ...prev, status: e.target.value as ChatLeadStatus } : prev,
                  )
                }
                className={selectClass}
                disabled={saving}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="appointment-booked">Appointment Booked</option>
                <option value="support-open">Support Open</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>

              <select
                value={draft.department}
                onChange={(e) =>
                  setDraft((prev) =>
                    prev
                      ? { ...prev, department: e.target.value as ChatLeadDepartment }
                      : prev,
                  )
                }
                className={selectClass}
                disabled={saving}
              >
                <option value="sales">Sales</option>
                <option value="billing">Billing</option>
                <option value="technical">Technical</option>
                <option value="appointments">Appointments</option>
                <option value="general">General</option>
              </select>

              <select
                value={draft.priority}
                onChange={(e) =>
                  setDraft((prev) =>
                    prev
                      ? { ...prev, priority: e.target.value as ChatLeadPriority }
                      : prev,
                  )
                }
                className={selectClass}
                disabled={saving}
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>

              <input
                value={draft.assignedTo}
                onChange={(e) =>
                  setDraft((prev) => (prev ? { ...prev, assignedTo: e.target.value } : prev))
                }
                placeholder="Assign owner"
                className={inputClass}
                disabled={saving}
              />

              <input
                type="datetime-local"
                value={draft.slaDueAt}
                onChange={(e) =>
                  setDraft((prev) => (prev ? { ...prev, slaDueAt: e.target.value } : prev))
                }
                className={inputClass}
                disabled={saving}
              />

              <input
                type="date"
                value={draft.followUpDate}
                onChange={(e) =>
                  setDraft((prev) =>
                    prev ? { ...prev, followUpDate: e.target.value } : prev,
                  )
                }
                className={inputClass}
                disabled={saving}
              />
            </div>

            <textarea
              value={draft.internalNotes}
              onChange={(e) =>
                setDraft((prev) =>
                  prev ? { ...prev, internalNotes: e.target.value } : prev,
                )
              }
              rows={5}
              placeholder="Internal notes, next actions, context..."
              className="mt-4 w-full rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
              disabled={saving}
            />

            <div className="mt-4 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-white/75">
                <input
                  type="checkbox"
                  checked={draft.archived}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, archived: e.target.checked } : prev,
                    )
                  }
                  disabled={saving}
                />
                Archived
              </label>

              <button
                type="button"
                onClick={saveLeadChanges}
                className="rounded-xl bg-[#FACC15] px-5 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047] disabled:opacity-60"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-xs text-white/50">TRANSCRIPT</div>

              <div className="max-h-[350px] space-y-2 overflow-y-auto">
                {active.messages.length > 0 ? (
                  active.messages.map((message, index) => (
                    <div
                      key={`${active.id}-${index}`}
                      className={`rounded-lg p-3 text-sm ${
                        message.role === "user"
                          ? "ml-10 bg-[#FACC15] text-black"
                          : "mr-10 bg-white/[0.06] text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-white/55">
                    No transcript available.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${active.email}`}
                className="rounded-xl bg-[#FACC15] px-5 py-2 text-black transition hover:bg-[#FDE047]"
              >
                Email
              </a>

              {active.phone ? (
                <a
                  href={`tel:${active.phone}`}
                  className="rounded-xl border border-white/20 px-5 py-2 text-white transition hover:bg-white/10"
                >
                  Call
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}