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
  scheduled_for?: string | null;
  executed_at?: string | null;
  failed_at?: string | null;
  failure_reason?: string | null;
  approval_required?: boolean | null;
  approval_id?: string | null;
};

function getCompletionEventMeta(action: ScheduledActionRow) {
  const targetStatus = action.target_status ?? action.action_type;

  switch (`${action.entity_type}:${targetStatus}`) {
    case "service:terminated":
      return { event_type: "service_terminated", event_label: "Service terminated" };
    case "service:suspended":
      return { event_type: "service_suspended", event_label: "Service suspended" };
    case "service:active":
      return { event_type: "service_activated", event_label: "Service activated" };
    case "service:degraded":
      return { event_type: "service_degraded", event_label: "Service degraded" };
    case "order:cancelled":
      return { event_type: "order_cancelled", event_label: "Order cancelled" };
    case "order:activated":
      return { event_type: "order_activated", event_label: "Order activated" };
    case "order:scheduled":
      return { event_type: "install_scheduled", event_label: "Install scheduled" };
    case "account:suspended":
      return { event_type: "account_suspended", event_label: "Account suspended" };
    case "account:archived":
      return { event_type: "account_archived", event_label: "Account archived" };
    case "invoice:void":
    case "invoice:voided":
      return { event_type: "invoice_voided", event_label: "Invoice voided" };
    case "invoice:paid":
      return { event_type: "invoice_paid", event_label: "Invoice paid" };
    case "ticket:closed":
      return { event_type: "ticket_closed", event_label: "Ticket closed" };
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

async function createJobRun(admin: any, action: ScheduledActionRow) {
  const payload = {
    job_type: "scheduled_action_execution",
    related_entity_type: action.entity_type,
    related_entity_id: action.entity_id,
    scheduled_action_id: action.id,
    status: "running",
    started_at: new Date().toISOString(),
    retry_count: 0,
    error_message: null,
  };

  const { data, error } = await admin
    .from("job_runs")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to create job run: ${error.message}`);
  }

  return data as { id: string };
}

async function logJobRun(
  admin: any,
  jobRunId: string,
  level: "info" | "warning" | "error",
  message: string
) {
  const { error } = await admin.from("job_run_logs").insert({
    job_run_id: jobRunId,
    log_level: level,
    message,
  });

  if (error) {
    console.error("Failed to write job_run_log:", error.message);
  }
}

async function markScheduledActionFailed(
  admin: any,
  actionId: string,
  reason: string
) {
  const { error } = await admin
    .from("scheduled_actions")
    .update({
      status: "failed",
      failed_at: new Date().toISOString(),
      failure_reason: reason,
    })
    .eq("id", actionId);

  if (error) {
    console.error("Failed to mark scheduled action failed:", error.message);
  }
}

async function markJobRunFailed(admin: any, jobRunId: string, reason: string) {
  const { error } = await admin
    .from("job_runs")
    .update({
      status: "failed",
      finished_at: new Date().toISOString(),
      error_message: reason,
    })
    .eq("id", jobRunId);

  if (error) {
    console.error("Failed to mark job run failed:", error.message);
  }
}

async function markJobRunSuccess(admin: any, jobRunId: string) {
  const { error } = await admin
    .from("job_runs")
    .update({
      status: "success",
      finished_at: new Date().toISOString(),
      error_message: null,
    })
    .eq("id", jobRunId);

  if (error) {
    console.error("Failed to mark job run success:", error.message);
  }
}

async function markScheduledActionRunning(admin: any, actionId: string) {
  const { error } = await admin
    .from("scheduled_actions")
    .update({
      status: "running",
      scheduled_for: new Date().toISOString(),
      failed_at: null,
      failure_reason: null,
    })
    .eq("id", actionId);

  if (error) {
    throw new Error(`Failed to mark scheduled action running: ${error.message}`);
  }
}

async function markScheduledActionExecuted(admin: any, actionId: string) {
  const { error } = await admin
    .from("scheduled_actions")
    .update({
      status: "executed",
      executed_at: new Date().toISOString(),
      failed_at: null,
      failure_reason: null,
    })
    .eq("id", actionId);

  if (error) {
    throw new Error(`Failed to mark scheduled action executed: ${error.message}`);
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

  const admin = supabase as any;
  const today = new Date().toISOString().slice(0, 10);

  const { data: actions, error } = await admin
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
      executed: 0,
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
    executed: 0,
    failed: 0,
    skipped: 0,
    results: [] as Array<{
      scheduled_action_id: string;
      entity_type: string;
      entity_id: string;
      action_type: string;
      target_status: string | null;
      result: "executed" | "failed" | "skipped";
      message: string;
      job_run_id?: string;
    }>,
  };

  for (const action of dueActions) {
    let jobRunId: string | null = null;

    try {
      const job = await createJobRun(admin, action);
      jobRunId = job.id;

      await logJobRun(
        admin,
        jobRunId,
        "info",
        `Starting scheduled action ${action.action_type} for ${action.entity_type}:${action.entity_id}`
      );

      if (action.approval_required && !action.approval_id) {
        const message = "Approval required but approval_id is missing.";

        await logJobRun(admin, jobRunId, "error", message);
        await markScheduledActionFailed(admin, action.id, message);
        await markJobRunFailed(admin, jobRunId, message);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_failed`,
          event_label: "Scheduled action failed",
          notes: message,
        });

        summary.failed += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "failed",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      const table = getEntityTable(action.entity_type);

      if (!table) {
        const message = `Unsupported entity type: ${action.entity_type}`;

        await logJobRun(admin, jobRunId, "error", message);
        await markScheduledActionFailed(admin, action.id, message);
        await markJobRunFailed(admin, jobRunId, message);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_failed`,
          event_label: "Scheduled action failed",
          notes: message,
        });

        summary.failed += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "failed",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      if (!action.target_status) {
        const message = "Missing target_status on scheduled action.";

        await logJobRun(admin, jobRunId, "error", message);
        await markScheduledActionFailed(admin, action.id, message);
        await markJobRunFailed(admin, jobRunId, message);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_failed`,
          event_label: "Scheduled action failed",
          notes: message,
        });

        summary.failed += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "failed",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      await markScheduledActionRunning(admin, action.id);
      await logJobRun(
        admin,
        jobRunId,
        "info",
        `Scheduled action marked running with target status ${action.target_status}`
      );

      const { data: existingEntity, error: fetchEntityError } = await admin
        .from(table)
        .select("id, status")
        .eq("id", action.entity_id)
        .maybeSingle();

      if (fetchEntityError) {
        const message = `Could not load target record: ${fetchEntityError.message}`;

        await logJobRun(admin, jobRunId, "error", message);
        await markScheduledActionFailed(admin, action.id, message);
        await markJobRunFailed(admin, jobRunId, message);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_failed`,
          event_label: "Scheduled action failed",
          notes: message,
        });

        summary.failed += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "failed",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      if (!existingEntity) {
        const message = "Target record not found.";

        await logJobRun(admin, jobRunId, "error", message);
        await markScheduledActionFailed(admin, action.id, message);
        await markJobRunFailed(admin, jobRunId, message);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_failed`,
          event_label: "Scheduled action failed",
          notes: message,
        });

        summary.failed += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "failed",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      if ((existingEntity as { status?: string | null }).status === action.target_status) {
        const message = `Target already in status ${action.target_status}`;

        await logJobRun(admin, jobRunId, "warning", message);
        await markScheduledActionExecuted(admin, action.id);
        await markJobRunSuccess(admin, jobRunId);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_skipped`,
          event_label: "Scheduled action skipped",
          notes: message,
        });

        summary.skipped += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "skipped",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      await logJobRun(
        admin,
        jobRunId,
        "info",
        `Updating ${table} record ${action.entity_id} to status ${action.target_status}`
      );

      const { error: updateError } = await admin
        .from(table)
        .update({ status: action.target_status })
        .eq("id", action.entity_id);

      if (updateError) {
        const message = `Failed updating status to ${action.target_status}: ${updateError.message}`;

        await logJobRun(admin, jobRunId, "error", message);
        await markScheduledActionFailed(admin, action.id, message);
        await markJobRunFailed(admin, jobRunId, message);

        await admin.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: `${action.entity_type}_scheduled_action_failed`,
          event_label: "Scheduled action failed",
          notes: message,
        });

        summary.failed += 1;
        summary.results.push({
          scheduled_action_id: action.id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          action_type: action.action_type,
          target_status: action.target_status,
          result: "failed",
          message,
          job_run_id: jobRunId,
        });
        continue;
      }

      const completionMeta = getCompletionEventMeta(action);

      await markScheduledActionExecuted(admin, action.id);
      await markJobRunSuccess(admin, jobRunId);

      await logJobRun(
        admin,
        jobRunId,
        "info",
        `Execution completed successfully. Status changed to ${action.target_status}`
      );

      await admin.from("lifecycle_events").insert([
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
          event_type: `${action.entity_type}_scheduled_action_executed`,
          event_label: "Scheduled action executed",
          notes: `${action.action_type} executed on ${today}. Reason: ${action.reason ?? "No reason provided"}`,
        },
      ]);

      summary.executed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "executed",
        message: `Status changed to ${action.target_status}`,
        job_run_id: jobRunId,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown scheduled action execution error";

      if (jobRunId) {
        await logJobRun(admin, jobRunId, "error", message);
        await markJobRunFailed(admin, jobRunId, message);
      }

      await markScheduledActionFailed(admin, action.id, message);

      await admin.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        event_type: `${action.entity_type}_scheduled_action_failed`,
        event_label: "Scheduled action failed",
        notes: message,
      });

      summary.failed += 1;
      summary.results.push({
        scheduled_action_id: action.id,
        entity_type: action.entity_type,
        entity_id: action.entity_id,
        action_type: action.action_type,
        target_status: action.target_status,
        result: "failed",
        message,
        job_run_id: jobRunId ?? undefined,
      });
    }
  }

  return NextResponse.json(summary);
}