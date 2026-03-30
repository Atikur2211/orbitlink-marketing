import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type ChatLeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

type UpdatePayload = {
  id: string;
  status?: ChatLeadStatus;
  followUpDate?: string;
  internalNotes?: string;
  archived?: boolean;
};

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

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const payload = (await req.json()) as UpdatePayload;
    const id = safeString(payload.id);

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Lead id is required." },
        { status: 400 },
      );
    }

    const updateData: {
      status?: ChatLeadStatus;
      follow_up_date?: string | null;
      internal_notes?: string;
      archived?: boolean;
      updated_at: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (payload.status && VALID_STATUSES.includes(payload.status)) {
      updateData.status = payload.status;
    }

    if (payload.followUpDate !== undefined) {
      const nextFollowUpDate = safeString(payload.followUpDate);
      updateData.follow_up_date = nextFollowUpDate || null;
    }

    if (payload.internalNotes !== undefined) {
      updateData.internal_notes = safeString(payload.internalNotes);
    }

    if (payload.archived !== undefined) {
      updateData.archived = Boolean(payload.archived);
    }

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
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { ok: false, error: "Lead not found." },
        { status: 404 },
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
      },
      storageMode: "supabase",
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