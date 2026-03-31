import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/* -----------------------------
   TYPES
----------------------------- */

type ChatLeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "appointment-booked"
  | "support-open"
  | "won"
  | "lost";

type ChatLeadDepartment =
  | "sales"
  | "billing"
  | "technical"
  | "appointments"
  | "general";

type ChatLeadPriority = "low" | "normal" | "high" | "urgent";

type UpdatePayload = {
  id: string;

  status?: ChatLeadStatus;
  followUpDate?: string;
  internalNotes?: string;
  archived?: boolean;

  department?: ChatLeadDepartment;
  assignedTo?: string;
  priority?: ChatLeadPriority;

  slaDueAt?: string;
  notificationSent?: boolean;
  lastNotifiedAt?: string;

  leadScore?: number;
};

/* -----------------------------
   VALIDATION
----------------------------- */

const VALID_STATUSES: ChatLeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "appointment-booked",
  "support-open",
  "won",
  "lost",
];

const VALID_DEPARTMENTS: ChatLeadDepartment[] = [
  "sales",
  "billing",
  "technical",
  "appointments",
  "general",
];

const VALID_PRIORITIES: ChatLeadPriority[] = [
  "low",
  "normal",
  "high",
  "urgent",
];

/* -----------------------------
   HELPERS
----------------------------- */

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidDateString(value: string) {
  if (!value) return false;
  return !Number.isNaN(Date.parse(value));
}

/* -----------------------------
   MAIN ROUTE
----------------------------- */

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const payload = (await req.json()) as UpdatePayload;

    const id = safeString(payload.id);

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Lead id is required." },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    /* -----------------------------
       STATUS
    ----------------------------- */

    if (payload.status !== undefined) {
      if (!VALID_STATUSES.includes(payload.status)) {
        return NextResponse.json(
          { ok: false, error: "Invalid lead status." },
          { status: 400 }
        );
      }

      updateData.status = payload.status;
    }

    /* -----------------------------
       FOLLOW-UP
    ----------------------------- */

    if (payload.followUpDate !== undefined) {
      const nextFollowUpDate = safeString(payload.followUpDate);

      if (nextFollowUpDate && !isValidDateString(nextFollowUpDate)) {
        return NextResponse.json(
          { ok: false, error: "Invalid follow-up date." },
          { status: 400 }
        );
      }

      updateData.follow_up_date = nextFollowUpDate || null;
    }

    /* -----------------------------
       INTERNAL NOTES
    ----------------------------- */

    if (payload.internalNotes !== undefined) {
      updateData.internal_notes = safeString(payload.internalNotes);
    }

    /* -----------------------------
       ARCHIVE
    ----------------------------- */

    if (payload.archived !== undefined) {
      updateData.archived = Boolean(payload.archived);
    }

    /* -----------------------------
       DEPARTMENT
    ----------------------------- */

    if (payload.department !== undefined) {
      if (!VALID_DEPARTMENTS.includes(payload.department)) {
        return NextResponse.json(
          { ok: false, error: "Invalid department." },
          { status: 400 }
        );
      }

      updateData.department = payload.department;
    }

    /* -----------------------------
       ASSIGNMENT
    ----------------------------- */

    if (payload.assignedTo !== undefined) {
      updateData.assigned_to = safeString(payload.assignedTo) || null;
    }

    /* -----------------------------
       PRIORITY
    ----------------------------- */

    if (payload.priority !== undefined) {
      if (!VALID_PRIORITIES.includes(payload.priority)) {
        return NextResponse.json(
          { ok: false, error: "Invalid priority." },
          { status: 400 }
        );
      }

      updateData.priority = payload.priority;
    }

    /* -----------------------------
       SLA
    ----------------------------- */

    if (payload.slaDueAt !== undefined) {
      const sla = safeString(payload.slaDueAt);

      if (sla && !isValidDateString(sla)) {
        return NextResponse.json(
          { ok: false, error: "Invalid SLA date." },
          { status: 400 }
        );
      }

      updateData.sla_due_at = sla || null;
    }

    /* -----------------------------
       NOTIFICATIONS
    ----------------------------- */

    if (payload.notificationSent !== undefined) {
      updateData.notification_sent = Boolean(payload.notificationSent);
    }

    if (payload.lastNotifiedAt !== undefined) {
      const ts = safeString(payload.lastNotifiedAt);

      if (ts && !isValidDateString(ts)) {
        return NextResponse.json(
          { ok: false, error: "Invalid notification timestamp." },
          { status: 400 }
        );
      }

      updateData.last_notified_at = ts || null;
    }

    /* -----------------------------
       LEAD SCORE
    ----------------------------- */

    if (payload.leadScore !== undefined) {
      const score = Number(payload.leadScore);

      if (!Number.isFinite(score) || score < 0 || score > 100) {
        return NextResponse.json(
          { ok: false, error: "Invalid lead score (0–100)." },
          { status: 400 }
        );
      }

      updateData.lead_score = score;
    }

    /* -----------------------------
       DB UPDATE
    ----------------------------- */

    const { data, error } = await supabaseAdmin
      .from("chat_leads")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("SUPABASE UPDATE ERROR:", error);

      return NextResponse.json(
        { ok: false, error: error.message || "Lead update failed." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { ok: false, error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      lead: {
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,

        name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        location: data.location || "",

        intent: data.intent,
        source: data.source,
        page: data.page || "",
        notes: data.notes || "",
        messages: Array.isArray(data.messages) ? data.messages : [],

        status: data.status,
        followUpDate: data.follow_up_date || "",
        internalNotes: data.internal_notes || "",
        archived: Boolean(data.archived),

        department: data.department || "general",
        assignedTo: data.assigned_to || "",
        priority: data.priority || "normal",

        slaDueAt: data.sla_due_at || "",
        notificationSent: Boolean(data.notification_sent),
        lastNotifiedAt: data.last_notified_at || "",
        leadScore: data.lead_score ?? 0,
      },
      storageMode: "supabase",
    });
  } catch (error) {
    console.error("CHAT LEAD STATUS ROUTE ERROR:", error);

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