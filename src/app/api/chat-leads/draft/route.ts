import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

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

type DraftLeadPayload = {
  draftLeadId?: string;
  draftSessionId: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  location?: string;
  intent?: ChatLeadIntent;
  page?: string;
  notes?: string;
  messages: ChatLeadMessage[];
};

type ChatLeadDepartment =
  | "sales"
  | "billing"
  | "technical"
  | "appointments"
  | "general";

type ChatLeadPriority = "low" | "normal" | "high" | "urgent";

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

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const payload = (await req.json()) as DraftLeadPayload;

    const draftLeadId = safeString(payload.draftLeadId);
    const draftSessionId = safeString(payload.draftSessionId);
    const name = safeString(payload.name);
    const email = safeString(payload.email);
    const phone = safeString(payload.phone);
    const company = safeString(payload.company);
    const location = safeString(payload.location);
    const page = safeString(payload.page);
    const notes = safeString(payload.notes);
    const intent = payload.intent || "general";
    const messages = normalizeMessages(payload.messages);

    if (!draftSessionId) {
      return NextResponse.json(
        { ok: false, error: "draftSessionId is required." },
        { status: 400 },
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Draft transcript required." },
        { status: 400 },
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

    const draftData = {
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
      is_draft: true,
      draft_session_id: draftSessionId,
    };

    if (draftLeadId) {
      const { data, error } = await supabaseAdmin
        .from("chat_leads")
        .update(draftData)
        .eq("id", draftLeadId)
        .select("id")
        .single();

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message || "Draft update failed." },
          { status: 500 },
        );
      }

      return NextResponse.json({
        ok: true,
        draftLeadId: data.id,
        mode: "updated",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("chat_leads")
      .insert([
        {
          id: crypto.randomUUID(),
          created_at: now,
          ...draftData,
        },
      ])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Draft insert failed." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      draftLeadId: data.id,
      mode: "created",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}