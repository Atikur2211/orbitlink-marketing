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

type ChatLeadDepartment =
  | "sales"
  | "billing"
  | "technical"
  | "appointments"
  | "general";

type ChatLeadPriority = "low" | "normal" | "high" | "urgent";

type ChatLeadPayload = {
  draftLeadId?: string;
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

function resolveDepartment(intent?: ChatLeadIntent): ChatLeadDepartment {
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

function resolvePriority(intent?: ChatLeadIntent): ChatLeadPriority {
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

function computeLeadScore(input: {
  intent?: ChatLeadIntent;
  company: string;
  location: string;
  notes: string;
  messages: ChatLeadMessage[];
}) {
  let score = 0;

  if (input.intent === "sales") score += 35;
  if (input.intent === "technical") score += 25;
  if (input.intent === "appointment") score += 20;
  if (input.intent === "billing") score += 15;
  if (input.company) score += 10;
  if (input.location) score += 10;

  const text = [input.notes, ...input.messages.map((m) => m.text)]
    .join(" ")
    .toLowerCase();

  if (text.includes("pricing")) score += 15;
  if (text.includes("quote")) score += 15;
  if (text.includes("urgent")) score += 20;
  if (text.includes("outage")) score += 20;
  if (text.includes("new setup")) score += 10;
  if (text.includes("dedicated internet") || text.includes("dia")) score += 20;
  if (text.includes("backup")) score += 10;

  return Math.min(score, 100);
}

function computeSlaDueAt(priority: ChatLeadPriority) {
  const now = Date.now();

  const minutes =
    priority === "urgent"
      ? 15
      : priority === "high"
      ? 60
      : priority === "normal"
      ? 240
      : 1440;

  return new Date(now + minutes * 60 * 1000).toISOString();
}

async function sendEmailNotification(lead: {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  notes: string;
  messages: ChatLeadMessage[];
  intent?: string;
  department: string;
  priority: string;
  leadScore: number;
  slaDueAt: string;
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

  const subject = `Orbitlink ${lead.department} lead • ${lead.name} • ${lead.priority}`;

  const body = [
    "New Orbitlink lead (Chat Intake)",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || ""}`,
    `Company: ${lead.company || ""}`,
    `Location: ${lead.location || ""}`,
    `Intent: ${lead.intent || "general"}`,
    `Department: ${lead.department}`,
    `Priority: ${lead.priority}`,
    `Lead Score: ${lead.leadScore}`,
    `SLA Due: ${lead.slaDueAt}`,
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

    const draftLeadId = safeString(payload.draftLeadId);
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
    const department = resolveDepartment(intent);
    const priority = resolvePriority(intent);
    const leadScore = computeLeadScore({
      intent,
      company,
      location,
      notes,
      messages,
    });
    const slaDueAt = computeSlaDueAt(priority);

    const leadData = {
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
      department,
      priority,
      assigned_to: null,
      sla_due_at: slaDueAt,
      lead_score: leadScore,
      notification_sent: false,
      last_notified_at: null,
      follow_up_date: null,
      internal_notes: "",
      archived: false,
      is_draft: false,
    };

    let leadId: string | null = null;

    /* -----------------------------
       TRY UPDATE EXISTING DRAFT
    ----------------------------- */

    if (draftLeadId) {
      console.log("Attempting to finalize draft:", draftLeadId);

      const { data, error } = await supabaseAdmin
        .from("chat_leads")
        .update(leadData)
        .eq("id", draftLeadId)
        .eq("is_draft", true)
        .select("id")
        .maybeSingle();

      if (error) {
        console.error("DRAFT UPDATE ERROR:", error);
      }

      if (data?.id) {
        leadId = data.id;
        console.log("Draft successfully finalized:", leadId);
      } else {
        console.warn("Draft not found or already finalized, fallback to insert");
      }
    }

    /* -----------------------------
       FALLBACK → CREATE NEW LEAD
    ----------------------------- */

    if (!leadId) {
      console.log("Creating new lead (no valid draft)");

      const { data, error } = await supabaseAdmin
        .from("chat_leads")
        .insert([
          {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            ...leadData,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("CHAT LEADS INSERT ERROR:", error);

        return NextResponse.json(
          { ok: false, error: error.message || "Database insert failed." },
          { status: 500 }
        );
      }

      leadId = data.id;
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
        department,
        priority,
        leadScore,
        slaDueAt,
      });

      if (emailStatus.sent) {
        await supabaseAdmin
          .from("chat_leads")
          .update({
            notification_sent: true,
            last_notified_at: new Date().toISOString(),
          })
          .eq("id", leadId);
      }
    } catch {
      emailStatus = { sent: false, reason: "send_failed" };
    }

    return NextResponse.json({
      ok: true,
      leadId,
      emailStatus,
      routing: {
        department,
        priority,
      },
      slaDueAt,
      leadScore,
      archived: false,
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