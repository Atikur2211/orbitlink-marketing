import PageShell from "@/components/PageShell";
import ChatLeadsDashboard, {
  type ChatLeadRecord,
} from "@/components/ChatLeadsDashboard";
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
    name: row.name,
    email: row.email,
    phone: row.phone || "",
    company: row.company || "",
    location: row.location || "",
    intent: row.intent,
    source: row.source,
    page: row.page || "",
    notes: row.notes || "",
    messages: Array.isArray(row.messages) ? row.messages : [],
    status: row.status,
    followUpDate: row.follow_up_date || "",
    internalNotes: row.internal_notes || "",
    archived: Boolean(row.archived),
  }));
}

export default async function ChatLeadsPage() {
  const leads = await getChatLeads();

  return (
    <PageShell
      eyebrow="PORTAL"
      title="Chat Leads"
      subtitle="Internal review surface for live-agent requests, chat transcripts, lead status, follow-up timing, and sales notes."
    >
      <ChatLeadsDashboard initialLeads={leads} />
    </PageShell>
  );
}