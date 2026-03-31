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

  // NEW CRM FIELDS
  department?: "sales" | "billing" | "technical" | "appointments" | "general";
  priority?: "low" | "normal" | "high" | "urgent";
};

/* -----------------------------
   HELPERS
----------------------------- */

function formatDate(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
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

function departmentColor(dep?: string) {
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

function priorityColor(priority?: string) {
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
  const [leads, setLeads] = useState(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(
    initialLeads[0]?.id ?? null
  );

  /* -----------------------------
     REALTIME SYNC
  ----------------------------- */

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    const channel = supabase
      .channel("chat-leads-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_leads" },
        (payload) => {
          const row = payload.new as any;

          const updated: ChatLeadRecord = {
            id: row.id,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            name: row.name,
            email: row.email,
            phone: row.phone,
            company: row.company,
            location: row.location,
            intent: "live-agent",
            source: "chat",
            page: row.page,
            notes: row.notes,
            messages: row.messages || [],
            status: row.status,
            followUpDate: row.follow_up_date,
            internalNotes: row.internal_notes,
            archived: row.archived,
            department: row.department,
            priority: row.priority,
          };

          setLeads((prev) => {
            const exists = prev.find((l) => l.id === updated.id);
            if (!exists) return [updated, ...prev];

            return prev.map((l) => (l.id === updated.id ? updated : l));
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* -----------------------------
     ACTIVE LEAD
  ----------------------------- */

  const active =
    leads.find((l) => l.id === activeId) || leads[0] || null;

  /* -----------------------------
     UI
  ----------------------------- */

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      
      {/* LEFT LIST */}
      <div className="space-y-4">
        {leads.map((lead) => {
          const lastMessage =
            [...lead.messages]
              .reverse()
              .find((m) => m.role === "user")?.text || "No message";

          return (
            <button
              key={lead.id}
              onClick={() => setActiveId(lead.id)}
              className={`w-full rounded-[24px] border p-5 text-left transition ${
                active?.id === lead.id
                  ? "border-[#FACC15]/30 bg-[#FACC15]/[0.06]"
                  : "border-white/10 bg-black/20 hover:bg-black/30"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-white">{lead.name}</div>
                  <div className="text-sm text-white/60">{lead.email}</div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full border text-xs ${statusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </div>
              </div>

              <div className="mt-3 flex gap-2 text-xs">
                <div
                  className={`px-2 py-1 rounded border ${departmentColor(
                    lead.department
                  )}`}
                >
                  {lead.department || "general"}
                </div>

                <div className={`${priorityColor(lead.priority)}`}>
                  {lead.priority || "normal"}
                </div>
              </div>

              <p className="mt-3 text-sm text-white/70 line-clamp-2">
                {lastMessage}
              </p>

              <div className="mt-2 text-xs text-white/40">
                {formatDate(lead.createdAt)}
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT PANEL */}
      {active && (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">
            {active.name}
          </h2>

          <p className="text-sm text-white/60 mt-1">{active.email}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>Company: {active.company || "—"}</div>
            <div>Location: {active.location || "—"}</div>
            <div>Phone: {active.phone || "—"}</div>
            <div>Status: {active.status}</div>
          </div>

          {/* TRANSCRIPT */}
          <div className="mt-6">
            <div className="text-xs text-white/50 mb-2">TRANSCRIPT</div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              {active.messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-sm ${
                    m.role === "user"
                      ? "bg-[#FACC15] text-black ml-10"
                      : "bg-white/[0.06] text-white mr-10"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">
            <a
              href={`mailto:${active.email}`}
              className="bg-[#FACC15] text-black px-5 py-2 rounded-xl"
            >
              Email
            </a>

            {active.phone && (
              <a
                href={`tel:${active.phone}`}
                className="border border-white/20 px-5 py-2 rounded-xl text-white"
              >
                Call
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}