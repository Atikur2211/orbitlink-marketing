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
};

/* -----------------------------
   HELPERS
----------------------------- */

function isValidStatus(value: unknown): value is ChatLeadStatus {
  return (
    value === "new" ||
    value === "contacted" ||
    value === "qualified" ||
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
      const text = typeof (item as { text?: unknown }).text === "string"
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
  };
}

function formatDate(value?: string) {
  if (!value) return "—";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  try {
    return new Intl.DateTimeFormat("en-CA", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsed);
  } catch {
    return "—";
  }
}

function statusColor(status: ChatLeadStatus) {
  switch (status) {
    case "won":
      return "text-emerald-300 border-emerald-400/20 bg-emerald-500/10";
    case "qualified":
      return "text-cyan-200 border-cyan-400/20 bg-cyan-500/10";
    case "contacted":
      return "text-yellow-200 border-yellow-400/20 bg-yellow-500/10";
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
      return "text-red-300";
    case "high":
      return "text-yellow-300";
    case "normal":
      return "text-white/70";
    default:
      return "text-white/50";
  }
}

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

  useEffect(() => {
    setLeads(initialLeads);
    setActiveId((current) => current ?? initialLeads[0]?.id ?? null);
  }, [initialLeads]);

  /* -----------------------------
     REALTIME SYNC (SAFE)
  ----------------------------- */

  useEffect(() => {
    let channel:
      | ReturnType<ReturnType<typeof getSupabaseBrowserClient>["channel"]>
      | null = null;

    try {
      const supabase = getSupabaseBrowserClient();

      channel = supabase
        .channel("chat-leads-live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "chat_leads" },
          (payload) => {
            try {
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
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                );
              });

              setActiveId((prev) => prev ?? updated.id);
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
        if (channel) {
          void supabase.removeChannel(channel);
        }
      };
    } catch (error) {
      console.error("Chat leads realtime setup failed:", error);
    }
  }, []);

  /* -----------------------------
     DERIVED
  ----------------------------- */

  const sortedLeads = useMemo(() => {
    return [...leads].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [leads]);

  const active =
    sortedLeads.find((lead) => lead.id === activeId) || sortedLeads[0] || null;

  useEffect(() => {
    if (!sortedLeads.length) {
      setActiveId(null);
      return;
    }

    if (!activeId) {
      setActiveId(sortedLeads[0].id);
      return;
    }

    const stillExists = sortedLeads.some((lead) => lead.id === activeId);
    if (!stillExists) {
      setActiveId(sortedLeads[0].id);
    }
  }, [sortedLeads, activeId]);

  /* -----------------------------
     UI
  ----------------------------- */

  if (!sortedLeads.length) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <div className="text-[11px] tracking-[0.28em] text-white/45">
          NO LEADS YET
        </div>
        <h2 className="mt-3 text-xl font-semibold text-white">
          No chat leads available
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/60">
          New Orbitlink chat requests will appear here once a visitor submits a
          business review, support request, billing request, or appointment inquiry.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        {sortedLeads.map((lead) => {
          const lastMessage =
            [...lead.messages].reverse().find((m) => m.role === "user")?.text ||
            "No message";

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
                  <div className="mt-1 text-sm text-white/60">{lead.email}</div>
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

                <div className={priorityColor(lead.priority)}>
                  {lead.priority || "normal"}
                </div>
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

      {active && (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">
            {active.name || "Unknown contact"}
          </h2>

          <p className="mt-1 text-sm text-white/60">{active.email || "—"}</p>

          <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-white/75 sm:grid-cols-2">
            <div>Company: {active.company || "—"}</div>
            <div>Location: {active.location || "—"}</div>
            <div>Phone: {active.phone || "—"}</div>
            <div>Status: {active.status}</div>
            <div>Department: {active.department || "general"}</div>
            <div>Priority: {active.priority || "normal"}</div>
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
  );
}