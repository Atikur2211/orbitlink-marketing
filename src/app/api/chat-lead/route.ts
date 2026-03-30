import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

type ChatLeadMessage = {
  role: "user" | "assistant";
  text: string;
};

type ChatLeadPayload = {
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
};

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
  messages: ChatLeadMessage[];
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  followUpDate: string;
  internalNotes: string;
  archived: boolean;
};

const CHAT_LEADS_FILE =
  process.env.CHAT_LEADS_FILE || path.join(process.cwd(), "chat-leads.json");

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMessages(messages: unknown): ChatLeadMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .map((m) => {
      if (!m || typeof m !== "object") return null;

      const role =
        (m as { role?: unknown }).role === "assistant" ? "assistant" : "user";
      const text = safeString((m as { text?: unknown }).text);

      if (!text) return null;

      return { role, text } as ChatLeadMessage;
    })
    .filter((m): m is ChatLeadMessage => Boolean(m));
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

async function appendLeadToFile(filePath: string, lead: StoredChatLead) {
  const leads = await readLeads(filePath);
  leads.unshift(lead);
  await writeLeads(filePath, leads);
}

async function sendEmailNotification(lead: StoredChatLead) {
  const resendKey = process.env.RESEND_API_KEY;
  const intakeTo = process.env.INTAKE_TO_EMAIL;
  const fromEmail = process.env.INTAKE_FROM_EMAIL;

  if (!resendKey || !intakeTo || !fromEmail) {
    return { sent: false as const, reason: "missing_email_env" as const };
  }

  const transcript = lead.messages
    .map((m) => `${m.role.toUpperCase()}: ${m.text}`)
    .join("\n\n");

  const body = [
    "New Orbitlink commercial review request from chat",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || ""}`,
    `Company: ${lead.company || ""}`,
    `Location: ${lead.location || ""}`,
    `Status: ${lead.status}`,
    `Source: ${lead.source}`,
    `Page: ${lead.page || ""}`,
    `Created At: ${lead.createdAt}`,
    "",
    "Notes:",
    lead.notes || "",
    "",
    "Transcript:",
    transcript || "No transcript available",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [intakeTo],
      subject: `New Orbitlink chat lead: ${lead.name || "Unknown visitor"}`,
      text: body,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error: ${errorText}`);
  }

  return { sent: true as const };
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ChatLeadPayload;

    const name = safeString(payload.name);
    const email = safeString(payload.email);
    const phone = safeString(payload.phone);
    const company = safeString(payload.company);
    const location = safeString(payload.location);
    const page = safeString(payload.page);
    const notes = safeString(payload.notes);
    const messages = normalizeMessages(payload.messages);

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 },
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Chat transcript is required." },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();

    const lead: StoredChatLead = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      name,
      email,
      phone,
      company,
      location,
      intent: "live-agent",
      source: "chat",
      page,
      notes,
      messages,
      status: "new",
      followUpDate: "",
      internalNotes: "",
      archived: false,
    };

    const isVercel = process.env.VERCEL === "1";

    // Only write to file in local/dev
    if (!isVercel) {
      await appendLeadToFile(CHAT_LEADS_FILE, lead);
    }

    let emailStatus:
      | { sent: true }
      | { sent: false; reason: "missing_email_env" }
      | { sent: false; reason: "send_failed"; detail: string } = {
      sent: false,
      reason: "missing_email_env",
    };

    try {
      emailStatus = await sendEmailNotification(lead);
    } catch (error) {
      emailStatus = {
        sent: false,
        reason: "send_failed",
        detail: error instanceof Error ? error.message : "unknown error",
      };
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      emailStatus,
      storageMode: isVercel ? "email-only" : "file+email",
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