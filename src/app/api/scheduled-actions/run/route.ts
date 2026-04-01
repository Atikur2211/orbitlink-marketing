import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ScheduledActionRow = {
  id: string;
  account_id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  target_status: string | null;
  effective_date: string;
  reason: string | null;
  status: string | null;
};

function getCompletionEventMeta(action: ScheduledActionRow) {
  const targetStatus = action.target_status ?? action.action_type;

  switch (`${action.entity_type}:${targetStatus}`) {
    case "service:terminated":
      return {
        event_type: "service_terminated",
        event_label: "Service terminated",
      };
    case "service:suspended":
      return {
        event_type: "service_suspended",
        event_label: "Service suspended",
      };
    case "service:active":
      return {
        event_type: "service_activated",
        event_label: "Service activated",
      };
    case "service:degraded":
      return {
        event_type: "service_degraded",
        event_label: "Service degraded",
      };
    case "order:cancelled":
      return {
        event_type: "order_cancelled",
        event_label: "Order cancelled",
      };
    case "order:activated":
      return {
        event_type: "order_activated",
        event_label: "Order activated",
      };
    case "order:scheduled":
      return {
        event_type: "install_scheduled",
        event_label: "Install scheduled",
      };
    case "account:suspended":
      return {
        event_type: "account_suspended",
        event_label: "Account suspended",
      };
    case "account:archived":
      return {
        event_type: "account_archived",
        event_label: "Account archived",
      };
    case "invoice:void":
    case "invoice:voided":
      return {
        event_type: "invoice_voided",
        event_label: "Invoice voided",
      };
    case "invoice:paid":
      return {
        event_type: "invoice_paid",
        event_label: "Invoice paid",
      };
    case "ticket:closed":
      return {
        event_type: "ticket_closed",
        event_label: "Ticket closed",
      };
    default:
      return {
        event_type: `${action.entity_type}_updated`,
        event_label: `${action.entity_type} updated`,
      };
  }
}

function getEntityTable(entityType: string) {
  switch (entityType) {
    case "service":
      return "service_instances";
    case "order":
      return "orders";
    case "account":
      return "accounts";
    case "ticket":
      return "tickets";
    case "invoice":
      return "invoices";
    case "location":
      return "locations";
    case "quote":
      return "quotes";
    default:
      return null;
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const userAgent = request.headers.get("user-agent") || "";

  const isVercelCron =
    userAgent.toLowerCase().includes("vercel-cron") ||
    userAgent.toLowerCase().includes("vercel");

  if (cronSecret) {
    const isManualAuthorized = authHeader === `Bearer ${cronSecret}`;

    if (!isManualAuthorized && !isVercelCron) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const today = new Date().toISOString().slice(0, 10);

  const { data: actions, error } = await supabase
    .from("scheduled_actions")
    .select("*")
    .eq("status", "scheduled")
    .lte("effective_date", today)
    .order("effective_date", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to load scheduled actions",
        details: error.message,
      },
      { status: 500 }
    );
  }

  const dueActions = (actions as ScheduledActionRow[] | null) ?? [];

  if (!dueActions.length) {
    return NextResponse.json({
      ok: true,
      message: "No scheduled actions due",
      processed: 0,
      completed: 0,
      failed: 0,
      skipped: 0,
      date: today,
      trigger: isVercelCron ? "vercel-cron" : "manual",
    });
  }

  const summary = {
    ok: true,
    date: today,
    trigger: isVercelCron ? "vercel-cron" : "manual",
    processed: dueActions.length,
    completed: 0,
    failed: 0,
    skipped: 0,
    results: [] as Array<{
      scheduled_action_id: string;
      entity_type: string;
      entity_id: string;
      action_type: string;
      target_status: string | null;
      result: "completed" | "failed" | "skipped";
      message: string;
    }>,
  };

  for (const action of dueActions) {
    const table = getEntityTable(action.entity_type);

    if (!table) {
      await supabase
        .from("scheduled_actions")
        .update({ status: "failed" })
        .eq("id", action.id);

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_failed`,
        event_label: "Scheduled action failed",
        notes: `Unsupported entity type: ${action.entity_type}`,
      });

      summary.failed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "failed",
        message: `Unsupported entity type: ${action.entity_type}`,
      });
      continue;
    }

    if (!action.target_status) {
      await supabase
        .from("scheduled_actions")
        .update({ status: "failed" })
        .eq("id", action.id);

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_failed`,
        event_label: "Scheduled action failed",
        notes: "Missing target_status on scheduled action.",
      });

      summary.failed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "failed",
        message: "Missing target_status",
      });
      continue;
    }

    const { data: existingEntity, error: fetchEntityError } = await supabase
      .from(table)
      .select("id, status")
      .eq("id", action.entity_id)
      .maybeSingle();

    if (fetchEntityError) {
      await supabase
        .from("scheduled_actions")
        .update({ status: "failed" })
        .eq("id", action.id);

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_failed`,
        event_label: "Scheduled action failed",
        notes: `Could not load target record: ${fetchEntityError.message}`,
      });

      summary.failed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "failed",
        message: `Could not load target record: ${fetchEntityError.message}`,
      });
      continue;
    }

    if (!existingEntity) {
      await supabase
        .from("scheduled_actions")
        .update({ status: "failed" })
        .eq("id", action.id);

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_failed`,
        event_label: "Scheduled action failed",
        notes: "Target record not found.",
      });

      summary.failed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "failed",
        message: "Target record not found",
      });
      continue;
    }

    if ((existingEntity as { status?: string | null }).status === action.target_status) {
      await supabase
        .from("scheduled_actions")
        .update({ status: "completed" })
        .eq("id", action.id);

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_skipped`,
        event_label: "Scheduled action skipped",
        notes: `Target already in status ${action.target_status}.`,
      });

      summary.skipped += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "skipped",
        message: `Target already in status ${action.target_status}`,
      });
      continue;
    }

    const { error: updateError } = await supabase
      .from(table)
      .update({ status: action.target_status })
      .eq("id", action.entity_id);

    if (updateError) {
      await supabase
        .from("scheduled_actions")
        .update({ status: "failed" })
        .eq("id", action.id);

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_failed`,
        event_label: "Scheduled action failed",
        notes: `Failed updating status to ${action.target_status}: ${updateError.message}`,
      });

      summary.failed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "failed",
        message: `Failed updating status: ${updateError.message}`,
      });
      continue;
    }

    const completionMeta = getCompletionEventMeta(action);

    await supabase
      .from("scheduled_actions")
      .update({ status: "completed" })
      .eq("id", action.id);

    await supabase.from("lifecycle_events").insert([
      {
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: completionMeta.event_type,
        event_label: completionMeta.event_label,
        notes: `Scheduled action executed. Status changed to ${action.target_status}.`,
      },
      {
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_completed`,
        event_label: "Scheduled action completed",
        notes: `${action.action_type} executed on ${today}. Reason: ${action.reason ?? "No reason provided"}`,
      },
    ]);

    summary.completed += 1;
    summary.results.push({
      scheduled_action_id: action.id,
      entity_type: action.entity_type,
      entity_id: action.entity_id,
      action_type: action.action_type,
      target_status: action.target_status,
      result: "completed",
      message: `Status changed to ${action.target_status}`,
    });
  }

  return NextResponse.json(summary);
}