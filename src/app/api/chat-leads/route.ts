import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/* -----------------------------
   TYPES
----------------------------- */

type ChatLeadMessage = {
  role: "user" | "assistant";
  text: string;
};

type ChatLeadIntent =
  | "sales"
  | "billing"
  | "technical"
  | "appointment"
  | "general";

type ChatLeadPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  intent?: ChatLeadIntent;
  page?: string;
  notes?: string;
  messages: ChatLeadMessage[];
};

/* -----------------------------
   HELPERS
----------------------------- */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMessages(messages: unknown): ChatLeadMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const role =
        (item as { role?: unknown }).role === "assistant"
          ? "assistant"
          : "user";

      const text = safeString((item as { text?: unknown }).text);

      if (!text) return null;

      return { role, text };
    })
    .filter((item): item is ChatLeadMessage => Boolean(item));
}

function resolveDepartment(intent?: ChatLeadIntent) {
  switch (intent) {
    case "billing":
      return "billing";
    case "technical":
      return "technical";
    case "appointment":
      return "appointments";
    case "sales":
      return "sales";
    default:
      return "general";
  }
}

function resolvePriority(intent?: ChatLeadIntent) {
  switch (intent) {
    case "technical":
      return "high";
    case "sales":
      return "high";
    case "billing":
    case "appointment":
    default:
      return "normal";
  }
}

/* -----------------------------
   EMAIL (OPTIONAL)
----------------------------- */

async function sendEmailNotification(lead: {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  notes: string;
  messages: ChatLeadMessage[];
  intent?: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const intakeTo = process.env.INTAKE_TO_EMAIL;
  const fromEmail = process.env.INTAKE_FROM_EMAIL;

  if (!resendKey || !intakeTo || !fromEmail) {
    return { sent: false as const, reason: "missing_email_env" as const };
  }

  const transcript = lead.messages
    .map((m) => `${m.role.toUpperCase()}: ${m.text}`)
    .join("\n\n");

  const subject = `Orbitlink ${lead.intent || "general"} request • ${lead.name}`;

  const body = [
    "New Orbitlink request (Chat Intake)",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || ""}`,
    `Company: ${lead.company || ""}`,
    `Location: ${lead.location || ""}`,
    `Intent: ${lead.intent || "general"}`,
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
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return { sent: true as const };
}

/* -----------------------------
   MAIN ROUTE
----------------------------- */

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const payload = (await req.json()) as ChatLeadPayload;

    const name = safeString(payload.name);
    const email = safeString(payload.email);
    const phone = safeString(payload.phone);
    const company = safeString(payload.company);
    const location = safeString(payload.location);
    const page = safeString(payload.page);
    const notes = safeString(payload.notes);
    const intent = payload.intent || "general";
    const messages = normalizeMessages(payload.messages);

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Valid email required." },
        { status: 400 }
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Chat transcript required." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const lead = {
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
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
      department: resolveDepartment(intent),
      priority: resolvePriority(intent),
      follow_up_date: null,
      internal_notes: "",
      archived: false,
    };

    const { error: dbError } = await supabaseAdmin
      .from("chat_leads")
      .insert([lead]);

    if (dbError) {
      console.error("CHAT LEADS DB ERROR:", dbError);

      return NextResponse.json(
        { ok: false, error: dbError.message || "Database insert failed." },
        { status: 500 }
      );
    }

    let emailStatus:
      | { sent: true }
      | { sent: false; reason: "missing_email_env" | "send_failed" };

    try {
      emailStatus = await sendEmailNotification({
        name,
        email,
        phone,
        company,
        location,
        notes,
        messages,
        intent,
      });
    } catch {
      emailStatus = { sent: false, reason: "send_failed" };
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      emailStatus,
      routing: {
        department: lead.department,
        priority: lead.priority,
      },
      storageMode: "supabase",
    });
  } catch (error) {
    console.error("CHAT LEADS ROUTE ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}