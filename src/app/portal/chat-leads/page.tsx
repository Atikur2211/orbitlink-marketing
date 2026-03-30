import { promises as fs } from "fs";
import path from "path";
import PageShell from "@/components/PageShell";
import ChatLeadsDashboard, {
  type ChatLeadRecord,
} from "@/components/ChatLeadsDashboard";

const CHAT_LEADS_FILE =
  process.env.CHAT_LEADS_FILE || path.join(process.cwd(), "chat-leads.json");

async function getChatLeads(): Promise<ChatLeadRecord[]> {
  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    return [];
  }

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
  const isVercel = process.env.VERCEL === "1";
  const leads = await getChatLeads();

  return (
    <PageShell
      eyebrow="PORTAL"
      title="Chat Leads"
      subtitle="Internal review surface for live-agent requests, chat transcripts, lead status, follow-up timing, and sales notes."
    >
      {isVercel ? (
        <div className="mb-6 rounded-[24px] border border-[#FACC15]/20 bg-[#FACC15]/[0.06] p-5">
          <div className="text-[11px] tracking-[0.22em] text-[#FDE68A]">
            PRODUCTION NOTICE
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/78">
            Production lead storage is currently running in email-only mode. The internal
            dashboard will show local development leads, but live production persistence
            requires a database such as Supabase.
          </p>
        </div>
      ) : null}

      <ChatLeadsDashboard initialLeads={leads} />
    </PageShell>
  );
}