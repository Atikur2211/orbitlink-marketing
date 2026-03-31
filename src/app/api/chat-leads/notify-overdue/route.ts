import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type ChatLeadRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  location: string | null;
  department: string | null;
  priority: string | null;
  status: string | null;
  assigned_to: string | null;
  sla_due_at: string | null;
  lead_score: number | null;
  notification_sent: boolean | null;
  last_notified_at: string | null;
  notes: string | null;
  messages: unknown;
  archived: boolean | null;
};

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMessages(value: unknown): Array<{ role: string; text: string }> {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const role =
        typeof (item as { role?: unknown }).role === "string"
          ? (item as { role?: string }).role!
          : "user";

      const text =
        typeof (item as { text?: unknown }).text === "string"
          ? (item as { text?: string }).text!.trim()
          : "";

      if (!text) return null;

      return { role, text };
    })
    .filter((item): item is { role: string; text: string } => Boolean(item));
}

async function sendOverdueEmail(leads: ChatLeadRow[]) {
  const resendKey = process.env.RESEND_API_KEY;
  const intakeTo = process.env.INTAKE_TO_EMAIL;
  const fromEmail = process.env.INTAKE_FROM_EMAIL;

  if (!resendKey || !intakeTo || !fromEmail) {
    return { sent: false as const, reason: "missing_email_env" as const };
  }

  const body = [
    "Orbitlink overdue lead notification",
    "",
    `Overdue leads: ${leads.length}`,
    "",
    ...leads.flatMap((lead, index) => {
      const messages = normalizeMessages(lead.messages);
      const latestUserMessage =
        [...messages].reverse().find((m) => m.role === "user")?.text || "No transcript";

      return [
        `${index + 1}. ${safeString(lead.name) || "Unknown contact"}`,
        `   Email: ${safeString(lead.email) || "—"}`,
        `   Phone: ${safeString(lead.phone) || "—"}`,
        `   Company: ${safeString(lead.company) || "—"}`,
        `   Location: ${safeString(lead.location) || "—"}`,
        `   Department: ${safeString(lead.department) || "general"}`,
        `   Priority: ${safeString(lead.priority) || "normal"}`,
        `   Status: ${safeString(lead.status) || "new"}`,
        `   Assigned To: ${safeString(lead.assigned_to) || "Unassigned"}`,
        `   SLA Due: ${safeString(lead.sla_due_at) || "—"}`,
        `   Lead Score: ${lead.lead_score ?? 0}`,
        `   Notes: ${safeString(lead.notes) || "—"}`,
        `   Latest User Message: ${latestUserMessage}`,
        "",
      ];
    }),
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
      subject: `Orbitlink overdue leads alert • ${leads.length} item(s)`,
      text: body,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return { sent: true as const };
}

export async function GET(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const url = new URL(req.url);
    const dryRun = url.searchParams.get("dryRun") === "true";

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("chat_leads")
      .select("*")
      .eq("archived", false)
      .in("status", ["new", "contacted", "qualified", "appointment-booked", "support-open"])
      .not("sla_due_at", "is", null)
      .lt("sla_due_at", now)
      .or("notification_sent.is.false,last_notified_at.is.null");

    if (error) {
      console.error("OVERDUE LEADS QUERY ERROR:", error);
      return NextResponse.json(
        { ok: false, error: error.message || "Failed to query overdue leads." },
        { status: 500 },
      );
    }

    const leads = (data || []) as ChatLeadRow[];

    if (leads.length === 0) {
      return NextResponse.json({
        ok: true,
        overdueCount: 0,
        notified: false,
        dryRun,
        message: "No overdue leads found.",
      });
    }

    if (dryRun) {
      return NextResponse.json({
        ok: true,
        overdueCount: leads.length,
        notified: false,
        dryRun: true,
        leadIds: leads.map((lead) => lead.id),
      });
    }

    const emailStatus = await sendOverdueEmail(leads);

    if (emailStatus.sent) {
      const ids = leads.map((lead) => lead.id);

      const { error: updateError } = await supabaseAdmin
        .from("chat_leads")
        .update({
          notification_sent: true,
          last_notified_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .in("id", ids);

      if (updateError) {
        console.error("OVERDUE LEADS UPDATE ERROR:", updateError);
        return NextResponse.json(
          {
            ok: false,
            error: updateError.message || "Notification sent but DB update failed.",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      overdueCount: leads.length,
      notified: emailStatus.sent,
      dryRun: false,
      leadIds: leads.map((lead) => lead.id),
    });
  } catch (error) {
    console.error("NOTIFY OVERDUE ROUTE ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}