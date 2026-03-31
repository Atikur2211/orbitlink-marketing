import PageShell from "@/components/PageShell";
import ChatLeadsDashboardClient from "@/components/ChatLeadsDashboardClient";
import type { ChatLeadRecord } from "@/components/ChatLeadsDashboard";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getChatLeads(): Promise<ChatLeadRecord[]> {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("chat_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("SUPABASE READ ERROR:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    company: row.company || "",
    location: row.location || "",

    intent: row.intent || "live-agent",
    source: row.source || "chat",
    page: row.page || "",
    notes: row.notes || "",
    messages: Array.isArray(row.messages) ? row.messages : [],

    status: row.status || "new",
    followUpDate: row.follow_up_date || "",
    internalNotes: row.internal_notes || "",
    archived: Boolean(row.archived),

    department: row.department || "general",
    priority: row.priority || "normal",

    assignedTo: row.assigned_to || "",
    slaDueAt: row.sla_due_at || "",
    notificationSent: Boolean(row.notification_sent),
    lastNotifiedAt: row.last_notified_at || "",
    leadScore: typeof row.lead_score === "number" ? row.lead_score : 0,
  }));
}

export default async function ChatLeadsPage() {
  const leads = await getChatLeads();

  const totalLeads = leads.length;
  const activeLeads = leads.filter((lead) => !lead.archived).length;
  const newLeads = leads.filter(
    (lead) => lead.status === "new" && !lead.archived
  ).length;
  const supportLeads = leads.filter(
    (lead) =>
      (lead.department === "technical" || lead.department === "billing") &&
      !lead.archived
  ).length;
  const highPriorityLeads = leads.filter(
    (lead) => lead.priority === "high" || lead.priority === "urgent"
  ).length;
  const overdueLeads = leads.filter((lead) => {
    if (!lead.slaDueAt || lead.archived) return false;
    const due = new Date(lead.slaDueAt).getTime();
    return Number.isFinite(due) && due < Date.now();
  }).length;
  const assignedLeads = leads.filter(
    (lead) => !!lead.assignedTo && !lead.archived
  ).length;

  return (
    <PageShell
      eyebrow="PORTAL"
      title="Chat Leads"
      subtitle="Live commercial intake, support follow-up, billing requests, technical cases, appointment requests, lead routing, SLA tracking, and internal commercial review for Orbitlink."
    >
      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-[24px] border border-[#FACC15]/20 bg-[#FACC15]/[0.06] p-5">
            <div className="text-[11px] tracking-[0.22em] text-[#FDE68A]/70">
              TOTAL RECORDS
            </div>
            <div className="mt-3 text-2xl font-semibold text-[#FDE68A]">
              {totalLeads}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              ACTIVE
            </div>
            <div className="mt-3 text-2xl font-semibold text-white">
              {activeLeads}
            </div>
          </div>

          <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-500/10 p-5">
            <div className="text-[11px] tracking-[0.22em] text-cyan-200/75">
              NEW
            </div>
            <div className="mt-3 text-2xl font-semibold text-cyan-200">
              {newLeads}
            </div>
          </div>

          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-5">
            <div className="text-[11px] tracking-[0.22em] text-emerald-200/75">
              SUPPORT / BILLING
            </div>
            <div className="mt-3 text-2xl font-semibold text-emerald-200">
              {supportLeads}
            </div>
          </div>

          <div className="rounded-[24px] border border-red-400/20 bg-red-500/10 p-5">
            <div className="text-[11px] tracking-[0.22em] text-red-200/75">
              HIGH PRIORITY
            </div>
            <div className="mt-3 text-2xl font-semibold text-red-200">
              {highPriorityLeads}
            </div>
          </div>

          <div className="rounded-[24px] border border-orange-400/20 bg-orange-500/10 p-5">
            <div className="text-[11px] tracking-[0.22em] text-orange-200/75">
              OVERDUE SLA
            </div>
            <div className="mt-3 text-2xl font-semibold text-orange-200">
              {overdueLeads}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="text-[11px] tracking-[0.28em] text-white/55">
                  ORBITLINK LIVE INTAKE
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Internal review and response surface
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
                  Review live-agent requests, classify business opportunities,
                  manage support cases, assign ownership, track SLA windows,
                  monitor notifications, and route each conversation toward the
                  correct commercial or service outcome.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72">
                Structured for sales, billing, technical support, appointments,
                assignment, and SLA-aware operations.
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              OPS SNAPSHOT
            </div>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <div className="flex items-center justify-between">
                <span>Assigned leads</span>
                <span className="font-medium text-white">{assignedLeads}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Unassigned leads</span>
                <span className="font-medium text-white">
                  {Math.max(activeLeads - assignedLeads, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Archived leads</span>
                <span className="font-medium text-white">
                  {totalLeads - activeLeads}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Notification-ready leads</span>
                <span className="font-medium text-white">
                  {
                    leads.filter(
                      (lead) => !lead.notificationSent && !lead.archived
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <ChatLeadsDashboardClient initialLeads={leads} />
      </section>
    </PageShell>
  );
}