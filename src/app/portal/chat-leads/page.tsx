import { promises as fs } from "fs";
import path from "path";
import PageShell from "@/components/PageShell";
import ChatLeadsDashboard, {
  type ChatLeadRecord,
} from "@/components/ChatLeadsDashboard";

const CHAT_LEADS_FILE =
  process.env.CHAT_LEADS_FILE || path.join(process.cwd(), "chat-leads.json");

async function getChatLeads(): Promise<ChatLeadRecord[]> {
  try {
    const raw = await fs.readFile(CHAT_LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
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