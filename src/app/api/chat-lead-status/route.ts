import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

type ChatLeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

type StoredChatLead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  intent: "live-agent";
  source: "chat";
  page: string;
  notes: string;
  messages: { role: "user" | "assistant"; text: string }[];
  status: ChatLeadStatus;
  followUpDate: string;
  internalNotes: string;
  archived: boolean;
};

type UpdatePayload = {
  id: string;
  status?: ChatLeadStatus;
  followUpDate?: string;
  internalNotes?: string;
  archived?: boolean;
};

const CHAT_LEADS_FILE =
  process.env.CHAT_LEADS_FILE || path.join(process.cwd(), "chat-leads.json");

const VALID_STATUSES: ChatLeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
];

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function ensureFileExists(filePath: string) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
  }
}

async function readLeads(filePath: string): Promise<StoredChatLead[]> {
  await ensureFileExists(filePath);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(filePath: string, leads: StoredChatLead[]) {
  await fs.writeFile(filePath, JSON.stringify(leads, null, 2), "utf8");
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as UpdatePayload;
    const id = safeString(payload.id);

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Lead id is required." },
        { status: 400 },
      );
    }

    const leads = await readLeads(CHAT_LEADS_FILE);
    const index = leads.findIndex((lead) => lead.id === id);

    if (index === -1) {
      return NextResponse.json(
        { ok: false, error: "Lead not found." },
        { status: 404 },
      );
    }

    const existing = leads[index];

    const nextStatus =
      payload.status && VALID_STATUSES.includes(payload.status)
        ? payload.status
        : existing.status;

    const nextFollowUpDate =
      payload.followUpDate !== undefined
        ? safeString(payload.followUpDate)
        : existing.followUpDate;

    const nextInternalNotes =
      payload.internalNotes !== undefined
        ? safeString(payload.internalNotes)
        : existing.internalNotes;

    const nextArchived =
      payload.archived !== undefined ? Boolean(payload.archived) : existing.archived;

    leads[index] = {
      ...existing,
      status: nextStatus,
      followUpDate: nextFollowUpDate,
      internalNotes: nextInternalNotes,
      archived: nextArchived,
      updatedAt: new Date().toISOString(),
    };

    await writeLeads(CHAT_LEADS_FILE, leads);

    return NextResponse.json({
      ok: true,
      lead: leads[index],
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}