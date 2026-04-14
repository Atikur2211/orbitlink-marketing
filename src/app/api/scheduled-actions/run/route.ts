import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Orbitlink <noreply@orbitlink.ca>";
const CC = "concierge@orbitlink.ca";
const REPLY_TO = "concierge@orbitlink.ca";
const EMAIL_LOGO_URL = "https://orbitlink.ca/brand/orbitlink-email-logo.png";

const MAX_RETRIES = 3;
const BATCH_LIMIT = 50;
const ESCALATION_MINUTES = 30;
const LOCK_KEY = "scheduled-actions-run";
const LOCK_TTL_MINUTES = 10;

const ORDER_STATUS = {
  SUBMITTED: "submitted",
  SCHEDULED: "scheduled",
  INSTALLING: "installing",
  ACTIVATED: "activated",
  CANCELLED: "cancelled",
  PENDING_CARRIER: "pending_carrier",
  DRAFT: "draft",
} as const;

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

type ScheduledActionStatus =
  | "scheduled"
  | "queued"
  | "running"
  | "executed"
  | "failed"
  | "cancelled";

type ScheduledActionRow = {
  id: string;
  account_id: string | null;
  entity_type: string;
  entity_id: string;
  action_type: string;
  target_status: string | null;
  effective_date: string;
  reason: string | null;
  status: ScheduledActionStatus | null;
  retry_count?: number | null;
  approval_required?: boolean | null;
  approval_id?: string | null;
  executed_at?: string | null;
  failed_at?: string | null;
  failure_reason?: string | null;
  metadata?: Record<string, Json> | null;
  created_at?: string | null;
};

type NocAlertSeverity = "low" | "medium" | "high" | "critical";

type OrderContext = {
  id: string;
  order_number: string;
  status: string;
  account_id: string | null;
  location_id: string | null;
  install_target_date: string | null;
  activation_target_date: string | null;
  notes: string | null;
  quote_id?: string | null;
};

type AccountContext = {
  id: string;
  account_name: string | null;
  tier: string | null;
  status: string | null;
  primary_contact_name?: string | null;
  primary_contact_email?: string | null;
};

type LocationContext = {
  id: string;
  location_name: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  province?: string | null;
  postal_code?: string | null;
};

type TicketContext = {
  id: string;
  subject: string | null;
  status: string | null;
  priority: string | null;
  opened_at?: string | null;
  account_id?: string | null;
};

type IncidentContext = {
  id: string;
  title: string;
  severity: string;
  status: string;
  opened_at: string;
};

type JobRunInsert = {
  job_type: string;
  status: string;
  started_at: string;
  completed_at?: string | null;
  error_message?: string | null;
  output?: Json | null;
};

type ExecutionLockRow = {
  lock_key: string;
  locked_until: string;
  locked_by: string | null;
  metadata?: Json | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDateLabel(value: string | null | undefined) {
  if (!value) return "To be confirmed";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatServiceLocation(location: LocationContext | null) {
  if (!location) return "Location on file";

  const parts = [
    location.location_name,
    location.address_line_1,
    location.address_line_2,
    location.city,
    location.province,
    location.postal_code,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "Location on file";
}

function daysBetween(startDate: string, endDate: string) {
  const a = new Date(`${startDate}T00:00:00`);
  const b = new Date(`${endDate}T00:00:00`);
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function todayDateString() {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowDateString() {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + 1);
  return now.toISOString().slice(0, 10);
}

function isPremiumTier(tier: string | null | undefined) {
  if (!tier) return false;
  const v = tier.toLowerCase();
  return (
    v.includes("premium") ||
    v.includes("priority") ||
    v.includes("enterprise") ||
    v.includes("gold")
  );
}

function getInstallOverdueSeverity(daysOverdue: number): NocAlertSeverity {
  if (daysOverdue >= 5) return "critical";
  if (daysOverdue >= 2) return "high";
  return "medium";
}

function getActivationOverdueSeverity(daysOverdue: number): NocAlertSeverity {
  if (daysOverdue >= 3) return "critical";
  if (daysOverdue >= 1) return "high";
  return "medium";
}

function buildEmailShell(title: string, intro: string, bodyHtml: string) {
  const safeTitle = escapeHtml(title);
  const safeIntro = escapeHtml(intro);

  return `
  <div style="margin:0;padding:0;background:#eef1f6;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#eef1f6;margin:0;padding:0;width:100%;">
      <tr>
        <td align="center" style="padding:18px 10px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;max-width:680px;width:100%;background:#ffffff;border:1px solid #dbe2ee;border-radius:18px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,0.10);">
            <tr>
              <td
                align="center"
                style="
                  padding:28px 20px 24px 20px;
                  background:
                    radial-gradient(circle at top, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 22%, rgba(255,255,255,0) 52%),
                    linear-gradient(180deg, #071225 0%, #0c2148 52%, #112b5f 100%);
                  border-bottom:1px solid rgba(212,175,55,0.18);
                "
              >
                <img
                  src="${EMAIL_LOGO_URL}"
                  alt="Orbitlink"
                  width="210"
                  style="display:block;width:100%;max-width:210px;height:auto;border:0;outline:none;margin:0 auto 16px auto;"
                />
                <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#d4af37;margin-bottom:8px;">
                  Orbitlink™
                </div>
                <div style="font-family:Arial,sans-serif;font-size:28px;line-height:1.18;font-weight:700;color:#ffffff;margin:0 0 8px 0;">
                  ${safeTitle}
                </div>
                <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.82);max-width:500px;margin:0 auto;">
                  ${safeIntro}
                </div>
              </td>
            </tr>

            ${bodyHtml}

            <tr>
              <td style="padding:0 22px 0 22px;">
                <div style="height:1px;background:#e7ebf2;"></div>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 22px 24px 22px;background:#fbfcfe;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="center" style="padding-bottom:12px;">
                      <img
                        src="${EMAIL_LOGO_URL}"
                        alt="Orbitlink"
                        width="120"
                        style="display:block;width:100%;max-width:120px;height:auto;border:0;outline:none;margin:0 auto;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-family:Arial,sans-serif;font-size:14px;line-height:1.75;color:#5d6776;">
                      <strong style="color:#111827;">Orbitlink™</strong><br />
                      Business Internet &amp; Network Infrastructure<br />
                      1-888-867-2480<br />
                      orbitlink.ca
                    </td>
                  </tr>
                </table>

                <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7b8492;text-align:left;">
                  This communication was issued by Orbitlink™ as part of a customer order and service operations workflow. Service availability, network design, provisioning intervals, implementation requirements, and activation timelines may vary by address, building access, carrier facilities, and final qualification outcomes. All services remain subject to applicable terms, policies, and final service acceptance.
                </div>

                <div style="margin-top:10px;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7b8492;text-align:left;">
                  Terms: https://orbitlink.ca/legal/terms &nbsp;|&nbsp; Privacy: https://orbitlink.ca/legal/privacy
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}

function buildSummaryCard(ctx: {
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  installTargetDate?: string | null;
  activationTargetDate?: string | null;
  reason?: string | null;
}) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:22px 0 22px 0;">
      <tr>
        <td style="background:#f8f9fc;border:1px solid #dfe5ef;border-radius:14px;padding:18px 18px;">
          <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6e7b8f;margin-bottom:6px;">
            Order Reference
          </div>
          <div style="font-family:Arial,sans-serif;font-size:22px;line-height:1.35;font-weight:700;color:#0f172a;word-break:break-word;">
            ${escapeHtml(ctx.orderNumber)}
          </div>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px 0;">
      <tr>
        <td style="background:#ffffff;border:1px solid #e3e8f1;border-radius:14px;padding:0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;width:38%;">Account</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${escapeHtml(ctx.accountName)}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Service Location</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${escapeHtml(ctx.serviceLocation)}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Install Target</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${escapeHtml(formatDateLabel(ctx.installTargetDate))}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Activation Target</td>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${escapeHtml(formatDateLabel(ctx.activationTargetDate))}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${
      ctx.reason
        ? `
      <div style="margin:0 0 22px 0;padding:16px 18px;background:#f8f9fc;border:1px solid #dfe5ef;border-radius:14px;">
        <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6e7b8f;margin-bottom:6px;">
          Workflow Note
        </div>
        <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a;">
          ${escapeHtml(ctx.reason)}
        </div>
      </div>
    `
        : ""
    }
  `;
}

function buildInstallationScheduledEmail(ctx: {
  primaryContactName?: string | null;
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  installTargetDate?: string | null;
  activationTargetDate?: string | null;
  reason?: string | null;
}) {
  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${escapeHtml(ctx.primaryContactName || "Customer")},</p>
        <p style="margin:0 0 16px 0;">
          Your Orbitlink™ order has now moved into the installation scheduled stage.
        </p>
        <p style="margin:0 0 16px 0;">
          Our operations team is coordinating the installation workflow and site readiness requirements for your service location.
        </p>
        ${buildSummaryCard(ctx)}
        <p style="margin:0 0 16px 0;">
          If building access, site contact details, or coordination requirements have changed, please reply to this message so our team can update the order before the scheduled install window.
        </p>
        <p style="margin:0;">
          Regards,<br />
          <strong>Orbitlink™ Operations</strong>
        </p>
      </td>
    </tr>
  `;

  return buildEmailShell(
    "Installation Scheduled",
    "Your Orbitlink service order is now in scheduled installation workflow.",
    body
  );
}

function buildActivationEmail(ctx: {
  primaryContactName?: string | null;
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  installTargetDate?: string | null;
  activationTargetDate?: string | null;
  reason?: string | null;
}) {
  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${escapeHtml(ctx.primaryContactName || "Customer")},</p>
        <p style="margin:0 0 16px 0;">
          Your Orbitlink™ service is now <strong>active and operational</strong>.
        </p>
        <p style="margin:0 0 16px 0;">
          The order has completed activation workflow and is now in service.
        </p>
        ${buildSummaryCard(ctx)}
        <p style="margin:0 0 16px 0;">
          If you require support, configuration assistance, or service changes, please reply to this message and our team will assist.
        </p>
        <p style="margin:0;">
          Regards,<br />
          <strong>Orbitlink™ Operations</strong>
        </p>
      </td>
    </tr>
  `;

  return buildEmailShell(
    "Service Activated",
    "Your Orbitlink service order has completed activation workflow.",
    body
  );
}

function buildCancellationEmail(ctx: {
  primaryContactName?: string | null;
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  installTargetDate?: string | null;
  activationTargetDate?: string | null;
  reason?: string | null;
}) {
  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${escapeHtml(ctx.primaryContactName || "Customer")},</p>
        <p style="margin:0 0 16px 0;">
          Your Orbitlink™ order has been <strong>cancelled</strong>.
        </p>
        ${buildSummaryCard(ctx)}
        <p style="margin:0 0 16px 0;">
          If this was not intended or you would like to proceed again, please contact our team and we will assist.
        </p>
        <p style="margin:0;">
          Regards,<br />
          <strong>Orbitlink™ Operations</strong>
        </p>
      </td>
    </tr>
  `;

  return buildEmailShell(
    "Order Cancelled",
    "Your Orbitlink order has been updated to cancelled status.",
    body
  );
}

function buildInstallReminderEmail(ctx: {
  primaryContactName?: string | null;
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  installTargetDate?: string | null;
  activationTargetDate?: string | null;
  reason?: string | null;
}) {
  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${escapeHtml(ctx.primaryContactName || "Customer")},</p>
        <p style="margin:0 0 16px 0;">
          This is a reminder that your Orbitlink™ installation is scheduled for
          <strong>${escapeHtml(formatDateLabel(ctx.installTargetDate))}</strong>.
        </p>
        ${buildSummaryCard(ctx)}
        <p style="margin:0 0 16px 0;">
          Please ensure site access is available during the scheduled window.
        </p>
        <p style="margin:0;">
          Regards,<br />
          <strong>Orbitlink™ Operations</strong>
        </p>
      </td>
    </tr>
  `;

  return buildEmailShell(
    "Installation Reminder",
    "Your Orbitlink installation is scheduled for tomorrow.",
    body
  );
}

function buildPremiumLifecycleEmail(ctx: {
  primaryContactName?: string | null;
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  stageLabel: string;
  installTargetDate?: string | null;
  activationTargetDate?: string | null;
  reason?: string | null;
}) {
  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${escapeHtml(ctx.primaryContactName || "Customer")},</p>
        <p style="margin:0 0 16px 0;">
          Your premium Orbitlink™ service order has advanced to the following stage:
          <strong>${escapeHtml(ctx.stageLabel)}</strong>.
        </p>
        <p style="margin:0 0 16px 0;">
          Your order remains under elevated coordination and monitoring.
        </p>
        ${buildSummaryCard(ctx)}
        <p style="margin:0;">
          Regards,<br />
          <strong>Orbitlink™ Operations</strong>
        </p>
      </td>
    </tr>
  `;

  return buildEmailShell(
    "Premium Order Update",
    "Your Orbitlink premium service workflow has been updated.",
    body
  );
}

async function safeSend(params: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping email send.");
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: params.to,
      cc: [CC],
      replyTo: REPLY_TO,
      subject: params.subject,
      html: params.html,
    });

    if (error) {
      console.error(
        "Resend returned an error while sending scheduled-action email:",
        JSON.stringify(error, null, 2)
      );
    }
  } catch (err) {
    console.error("Scheduled-action email send failed:", err);
  }
}

async function insertAuditLog(
  supabase: ReturnType<typeof getSupabase>,
  payload: {
    entity_type: string;
    entity_id: string;
    action: string;
    before_state?: Json | null;
    after_state?: Json | null;
    source_interface: string;
  }
) {
  await supabase.from("audit_logs").insert({
    entity_type: payload.entity_type,
    entity_id: payload.entity_id,
    action: payload.action,
    before_state: payload.before_state ?? null,
    after_state: payload.after_state ?? null,
    source_interface: payload.source_interface,
  });
}

async function insertLifecycleEvent(
  supabase: ReturnType<typeof getSupabase>,
  payload: {
    account_id?: string | null;
    entity_type: string;
    entity_id: string;
    event_type: string;
    event_label: string;
    notes?: string | null;
    metadata?: Json | null;
  }
) {
  await supabase.from("lifecycle_events").insert({
    account_id: payload.account_id ?? null,
    entity_type: payload.entity_type,
    entity_id: payload.entity_id,
    event_type: payload.event_type,
    event_label: payload.event_label,
    notes: payload.notes ?? null,
    metadata: payload.metadata ?? null,
  });
}

async function createJobRun(
  supabase: ReturnType<typeof getSupabase>,
  payload: JobRunInsert
) {
  const { data, error } = await supabase
    .from("job_runs")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to create job run: ${error.message}`);
  }

  return String(data.id);
}

async function finalizeJobRun(
  supabase: ReturnType<typeof getSupabase>,
  jobRunId: string,
  status: "completed" | "failed",
  output?: Json | null,
  errorMessage?: string | null
) {
  const { error } = await supabase
    .from("job_runs")
    .update({
      status,
      completed_at: new Date().toISOString(),
      output: output ?? null,
      error_message: errorMessage ?? null,
    })
    .eq("id", jobRunId);

  if (error) {
    console.error("Failed to finalize job run:", error.message);
  }
}

async function tryAcquireExecutionLock(
  supabase: ReturnType<typeof getSupabase>,
  jobRunId: string
) {
  const now = new Date();
  const lockedUntil = new Date(now.getTime() + LOCK_TTL_MINUTES * 60 * 1000);

  const { data: existing, error: readError } = await supabase
    .from("execution_locks")
    .select("lock_key, locked_until, locked_by")
    .eq("lock_key", LOCK_KEY)
    .maybeSingle<ExecutionLockRow>();

  if (readError) {
    throw new Error(`Failed to inspect execution lock: ${readError.message}`);
  }

  if (existing) {
    const expiresAt = new Date(existing.locked_until);
    if (!Number.isNaN(expiresAt.getTime()) && expiresAt > now) {
      return {
        acquired: false,
        reason: `Lock is already active until ${existing.locked_until}`,
      } as const;
    }

    const { error: updateError } = await supabase
      .from("execution_locks")
      .update({
        locked_until: lockedUntil.toISOString(),
        locked_by: jobRunId,
        metadata: {
          renewed_at: now.toISOString(),
        },
      })
      .eq("lock_key", LOCK_KEY);

    if (updateError) {
      throw new Error(`Failed to refresh execution lock: ${updateError.message}`);
    }

    return { acquired: true } as const;
  }

  const { error: insertError } = await supabase.from("execution_locks").insert({
    lock_key: LOCK_KEY,
    locked_until: lockedUntil.toISOString(),
    locked_by: jobRunId,
    metadata: {
      created_at: now.toISOString(),
    },
  });

  if (insertError) {
    throw new Error(`Failed to create execution lock: ${insertError.message}`);
  }

  return { acquired: true } as const;
}

async function releaseExecutionLock(
  supabase: ReturnType<typeof getSupabase>,
  jobRunId: string
) {
  const { error } = await supabase
    .from("execution_locks")
    .delete()
    .eq("lock_key", LOCK_KEY)
    .eq("locked_by", jobRunId);

  if (error) {
    console.error("Failed to release execution lock:", error.message);
  }
}

async function fetchOrderContext(
  supabase: ReturnType<typeof getSupabase>,
  orderId: string
): Promise<OrderContext | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, account_id, location_id, install_target_date, activation_target_date, notes, quote_id"
    )
    .eq("id", orderId)
    .maybeSingle<OrderContext>();

  if (error) {
    throw new Error(`Failed to load order ${orderId}: ${error.message}`);
  }

  return data ?? null;
}

async function fetchAccountContext(
  supabase: ReturnType<typeof getSupabase>,
  accountId: string | null | undefined
): Promise<AccountContext | null> {
  if (!accountId) return null;

  const { data, error } = await supabase
    .from("accounts")
    .select(
      "id, account_name, tier, status, primary_contact_name, primary_contact_email"
    )
    .eq("id", accountId)
    .maybeSingle<AccountContext>();

  if (error) {
    throw new Error(`Failed to load account ${accountId}: ${error.message}`);
  }

  return data ?? null;
}

async function fetchLocationContext(
  supabase: ReturnType<typeof getSupabase>,
  locationId: string | null | undefined
): Promise<LocationContext | null> {
  if (!locationId) return null;

  const { data, error } = await supabase
    .from("locations")
    .select(
      "id, location_name, address_line_1, address_line_2, city, province, postal_code"
    )
    .eq("id", locationId)
    .maybeSingle<LocationContext>();

  if (error) {
    throw new Error(`Failed to load location ${locationId}: ${error.message}`);
  }

  return data ?? null;
}

async function fetchTicketContext(
  supabase: ReturnType<typeof getSupabase>,
  ticketId: string
): Promise<TicketContext | null> {
  const { data, error } = await supabase
    .from("tickets")
    .select("id, subject, status, priority, opened_at, account_id")
    .eq("id", ticketId)
    .maybeSingle<TicketContext>();

  if (error) {
    throw new Error(`Failed to load ticket ${ticketId}: ${error.message}`);
  }

  return data ?? null;
}

async function markActionRunning(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow
) {
  const beforeState = {
    status: action.status,
    retry_count: action.retry_count ?? 0,
    failed_at: action.failed_at ?? null,
    failure_reason: action.failure_reason ?? null,
  };

  const afterState = {
    status: "running",
  };

  const { error } = await supabase
    .from("scheduled_actions")
    .update({
      status: "running",
      failed_at: null,
      failure_reason: null,
    })
    .eq("id", action.id);

  if (error) {
    throw new Error(`Failed to mark scheduled action running: ${error.message}`);
  }

  await insertLifecycleEvent(supabase, {
    account_id: action.account_id ?? null,
    entity_type: "scheduled_action",
    entity_id: action.id,
    event_type: "scheduled_action_running",
    event_label: "Scheduled action running",
    notes: `Scheduled action ${action.action_type} is now running.`,
  });

  await insertAuditLog(supabase, {
    entity_type: "scheduled_action",
    entity_id: action.id,
    action: "set_running",
    before_state: beforeState,
    after_state: afterState,
    source_interface: "scheduled_actions_run_api",
  });
}

async function markExecuted(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow
) {
  const executedAt = new Date().toISOString();

  const beforeState = {
    status: action.status,
    executed_at: action.executed_at ?? null,
    failed_at: action.failed_at ?? null,
    failure_reason: action.failure_reason ?? null,
    retry_count: action.retry_count ?? 0,
  };

  const afterState = {
    status: "executed",
    executed_at: executedAt,
    failed_at: null,
    failure_reason: null,
    retry_count: 0,
  };

  const { error } = await supabase
    .from("scheduled_actions")
    .update({
      status: "executed",
      executed_at: executedAt,
      failed_at: null,
      failure_reason: null,
      retry_count: 0,
    })
    .eq("id", action.id);

  if (error) {
    throw new Error(`Failed to mark scheduled action executed: ${error.message}`);
  }

  await insertLifecycleEvent(supabase, {
    account_id: action.account_id ?? null,
    entity_type: "scheduled_action",
    entity_id: action.id,
    event_type: "scheduled_action_executed",
    event_label: "Scheduled action executed",
    notes: `Scheduled action ${action.action_type} executed successfully.`,
  });

  await insertAuditLog(supabase, {
    entity_type: "scheduled_action",
    entity_id: action.id,
    action: "execute",
    before_state: beforeState,
    after_state: afterState,
    source_interface: "scheduled_actions_run_api",
  });
}

async function markFailed(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow,
  reason: string
) {
  const retryCount = (action.retry_count ?? 0) + 1;
  const exhausted = retryCount >= MAX_RETRIES;

  const beforeState = {
    status: action.status,
    retry_count: action.retry_count ?? 0,
    failure_reason: action.failure_reason ?? null,
    failed_at: action.failed_at ?? null,
  };

  const afterState = exhausted
    ? {
        status: "failed",
        retry_count: retryCount,
        failed_at: new Date().toISOString(),
        failure_reason: reason,
      }
    : {
        status: "scheduled",
        retry_count: retryCount,
        failed_at: new Date().toISOString(),
        failure_reason: reason,
      };

  const { error } = await supabase
    .from("scheduled_actions")
    .update(afterState)
    .eq("id", action.id);

  if (error) {
    console.error("Failed to mark scheduled action failed:", error.message);
  }

  await insertLifecycleEvent(supabase, {
    account_id: action.account_id ?? null,
    entity_type: "scheduled_action",
    entity_id: action.id,
    event_type: exhausted
      ? "scheduled_action_failed"
      : "scheduled_action_retry_scheduled",
    event_label: exhausted
      ? "Scheduled action failed"
      : "Scheduled action retry scheduled",
    notes: exhausted
      ? `Scheduled action ${action.action_type} failed after ${retryCount} attempts: ${reason}`
      : `Scheduled action ${action.action_type} failed and will retry. Attempt ${retryCount}/${MAX_RETRIES}. Reason: ${reason}`,
  });

  await insertAuditLog(supabase, {
    entity_type: "scheduled_action",
    entity_id: action.id,
    action: exhausted ? "fail" : "retry",
    before_state: beforeState,
    after_state: afterState,
    source_interface: "scheduled_actions_run_api",
  });
}

async function updateOrderStatus(
  supabase: ReturnType<typeof getSupabase>,
  orderId: string,
  nextStatus: string,
  sourceLabel: string
) {
  const { data: before, error: beforeError } = await supabase
    .from("orders")
    .select("id, status")
    .eq("id", orderId)
    .single();

  if (beforeError) {
    throw new Error(`Failed to inspect order before update: ${beforeError.message}`);
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }

  await insertLifecycleEvent(supabase, {
    account_id: null,
    entity_type: "order",
    entity_id: orderId,
    event_type: "order_status_changed",
    event_label: "Order status changed",
    notes: `Order status changed from ${before.status} to ${nextStatus} by ${sourceLabel}.`,
    metadata: {
      before_status: before.status,
      after_status: nextStatus,
    },
  });

  await insertAuditLog(supabase, {
    entity_type: "order",
    entity_id: orderId,
    action: "status_change",
    before_state: { status: before.status },
    after_state: { status: nextStatus },
    source_interface: sourceLabel,
  });
}

async function sendOrderLifecycleEmails(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow,
  order: OrderContext
) {
  const account = await fetchAccountContext(supabase, order.account_id);
  const location = await fetchLocationContext(supabase, order.location_id);

  if (!account?.primary_contact_email) {
    return;
  }

  const emailCtx = {
    primaryContactName: account.primary_contact_name ?? "Customer",
    accountName: account.account_name ?? "Orbitlink Account",
    orderNumber: order.order_number,
    serviceLocation: formatServiceLocation(location),
    installTargetDate: order.install_target_date,
    activationTargetDate: order.activation_target_date,
    reason: action.reason,
  };

  const subjectBase = `${order.order_number} · Orbitlink`;

  if (action.target_status === ORDER_STATUS.SCHEDULED) {
    await safeSend({
      to: account.primary_contact_email,
      subject: `${subjectBase} · Installation Scheduled`,
      html: buildInstallationScheduledEmail(emailCtx),
    });
  }

  if (action.target_status === ORDER_STATUS.ACTIVATED) {
    await safeSend({
      to: account.primary_contact_email,
      subject: `${subjectBase} · Service Activated`,
      html: buildActivationEmail(emailCtx),
    });
  }

  if (action.target_status === ORDER_STATUS.CANCELLED) {
    await safeSend({
      to: account.primary_contact_email,
      subject: `${subjectBase} · Order Cancelled`,
      html: buildCancellationEmail(emailCtx),
    });
  }

  if (isPremiumTier(account.tier)) {
    await safeSend({
      to: account.primary_contact_email,
      subject: `${subjectBase} · Premium Order Update`,
      html: buildPremiumLifecycleEmail({
        ...emailCtx,
        stageLabel: action.target_status ?? action.action_type,
      }),
    });
  }
}

async function maybeSendInstallationReminderEmails(
  supabase: ReturnType<typeof getSupabase>
) {
  const tomorrow = tomorrowDateString();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, account_id, location_id, install_target_date, activation_target_date, notes, quote_id"
    )
    .eq("install_target_date", tomorrow)
    .in("status", [ORDER_STATUS.SCHEDULED, ORDER_STATUS.INSTALLING])
    .limit(BATCH_LIMIT);

  if (error) {
    throw new Error(`Failed to load installation reminders: ${error.message}`);
  }

  let sent = 0;

  for (const order of (orders as OrderContext[] | null) ?? []) {
    const account = await fetchAccountContext(supabase, order.account_id);
    if (!account?.primary_contact_email) continue;

    const alreadySentKey = `install_reminder_${order.id}_${tomorrow}`;

    const { data: existing } = await supabase
      .from("lifecycle_events")
      .select("entity_id")
      .eq("entity_type", "order")
      .eq("entity_id", order.id)
      .eq("event_type", "installation_reminder_sent")
      .contains("metadata", { dedupe_key: alreadySentKey })
      .limit(1);

    if (existing && existing.length > 0) {
      continue;
    }

    const location = await fetchLocationContext(supabase, order.location_id);

    await safeSend({
      to: account.primary_contact_email,
      subject: `${order.order_number} · Installation Reminder`,
      html: buildInstallReminderEmail({
        primaryContactName: account.primary_contact_name ?? "Customer",
        accountName: account.account_name ?? "Orbitlink Account",
        orderNumber: order.order_number,
        serviceLocation: formatServiceLocation(location),
        installTargetDate: order.install_target_date,
        activationTargetDate: order.activation_target_date,
      }),
    });

    await insertLifecycleEvent(supabase, {
      account_id: order.account_id ?? null,
      entity_type: "order",
      entity_id: order.id,
      event_type: "installation_reminder_sent",
      event_label: "Installation reminder sent",
      notes: `Installation reminder sent for order ${order.order_number}.`,
      metadata: {
        dedupe_key: alreadySentKey,
        install_target_date: order.install_target_date,
      },
    });

    await insertAuditLog(supabase, {
      entity_type: "order",
      entity_id: order.id,
      action: "send_installation_reminder",
      before_state: null,
      after_state: {
        install_target_date: order.install_target_date,
        email_to: account.primary_contact_email,
      },
      source_interface: "scheduled_actions_run_api",
    });

    sent += 1;
  }

  return sent;
}

async function createNocAlert(
  supabase: ReturnType<typeof getSupabase>,
  payload: {
    severity: NocAlertSeverity;
    type: string;
    entity_type: string;
    entity_id: string;
    account_id?: string | null;
    message: string;
    metadata?: Record<string, Json> | null;
  }
) {
  const { data: existing, error: readError } = await supabase
    .from("noc_alerts")
    .select("id, acknowledged")
    .eq("type", payload.type)
    .eq("entity_type", payload.entity_type)
    .eq("entity_id", payload.entity_id)
    .eq("acknowledged", false)
    .limit(1);

  if (readError) {
    throw new Error(`Failed to inspect NOC alerts: ${readError.message}`);
  }

  if (existing && existing.length > 0) {
    return {
      created: false,
      alertId: String(existing[0].id),
    } as const;
  }

  const { data, error } = await supabase
    .from("noc_alerts")
    .insert({
      severity: payload.severity,
      type: payload.type,
      entity_type: payload.entity_type,
      entity_id: payload.entity_id,
      message: payload.message,
      acknowledged: false,
      metadata: payload.metadata ?? null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to create NOC alert: ${error.message}`);
  }

  const alertId = String(data.id);

  await insertLifecycleEvent(supabase, {
    account_id: payload.account_id ?? null,
    entity_type: "noc_alert",
    entity_id: alertId,
    event_type: "noc_alert_created",
    event_label: "NOC alert created",
    notes: `${payload.type} · ${payload.message}`,
    metadata: {
      severity: payload.severity,
      source_entity_type: payload.entity_type,
      source_entity_id: payload.entity_id,
      ...(payload.metadata ?? {}),
    },
  });

  await insertAuditLog(supabase, {
    entity_type: "noc_alert",
    entity_id: alertId,
    action: "create",
    before_state: null,
    after_state: {
      severity: payload.severity,
      type: payload.type,
      entity_type: payload.entity_type,
      entity_id: payload.entity_id,
      message: payload.message,
      acknowledged: false,
    },
    source_interface: "scheduled_actions_run_api",
  });

  return {
    created: true,
    alertId,
  } as const;
}

async function linkIncidentImpact(
  supabase: ReturnType<typeof getSupabase>,
  incidentId: string,
  entityType: string,
  entityId: string
) {
  const { data: existing, error: readError } = await supabase
    .from("incident_impacts")
    .select("id")
    .eq("incident_id", incidentId)
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .limit(1);

  if (readError) {
    throw new Error(`Failed to inspect incident impacts: ${readError.message}`);
  }

  if (existing && existing.length > 0) {
    return;
  }

  const { error } = await supabase.from("incident_impacts").insert({
    incident_id: incidentId,
    entity_type: entityType,
    entity_id: entityId,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to link incident impact: ${error.message}`);
  }

  await insertLifecycleEvent(supabase, {
    entity_type: "incident",
    entity_id: incidentId,
    event_type: "incident_impact_linked",
    event_label: "Incident impact linked",
    notes: `Impact linked to ${entityType} ${entityId}.`,
    metadata: {
      impacted_entity_type: entityType,
      impacted_entity_id: entityId,
    },
  });

  await insertAuditLog(supabase, {
    entity_type: "incident",
    entity_id: incidentId,
    action: "link_impact",
    before_state: null,
    after_state: {
      entity_type: entityType,
      entity_id: entityId,
    },
    source_interface: "scheduled_actions_run_api",
  });
}

async function autoEscalateAlertToIncident(
  supabase: ReturnType<typeof getSupabase>,
  params: {
    alertId: string;
    accountId?: string | null;
    severity: NocAlertSeverity;
    type: string;
    entityType: string;
    entityId: string;
    message: string;
  }
) {
  if (!["critical", "high"].includes(params.severity)) {
    return null;
  }

  const { data: existingIncidentLinks, error: linkReadError } = await supabase
    .from("incident_impacts")
    .select("incident_id")
    .eq("entity_type", params.entityType)
    .eq("entity_id", params.entityId)
    .limit(1);

  if (linkReadError) {
    throw new Error(`Failed to inspect existing incident links: ${linkReadError.message}`);
  }

  if (existingIncidentLinks && existingIncidentLinks.length > 0) {
    const incidentId = String(existingIncidentLinks[0].incident_id);

    await insertLifecycleEvent(supabase, {
      account_id: params.accountId ?? null,
      entity_type: "noc_alert",
      entity_id: params.alertId,
      event_type: "noc_alert_escalation_reused",
      event_label: "NOC alert escalation reused existing incident",
      notes: `Alert ${params.type} reused incident ${incidentId}.`,
    });

    return incidentId;
  }

  const title = `Auto-escalated ${params.type.replaceAll("_", " ")}`;
  const openedAt = new Date().toISOString();

  const { data: incident, error: createError } = await supabase
    .from("incidents")
    .insert({
      title,
      severity: params.severity,
      status: "open",
      opened_at: openedAt,
      summary: params.message,
      source: "scheduled_actions_run_api",
    })
    .select("id, title, severity, status, opened_at")
    .single<IncidentContext>();

  if (createError) {
    throw new Error(`Failed to auto-create incident: ${createError.message}`);
  }

  await insertLifecycleEvent(supabase, {
    account_id: params.accountId ?? null,
    entity_type: "incident",
    entity_id: incident.id,
    event_type: "incident_opened",
    event_label: "Incident opened",
    notes: `Incident auto-created from NOC alert ${params.type}.`,
    metadata: {
      source_alert_id: params.alertId,
      source_entity_type: params.entityType,
      source_entity_id: params.entityId,
    },
  });

  await insertAuditLog(supabase, {
    entity_type: "incident",
    entity_id: incident.id,
    action: "create",
    before_state: null,
    after_state: {
      title: incident.title,
      severity: incident.severity,
      status: incident.status,
      opened_at: incident.opened_at,
    },
    source_interface: "scheduled_actions_run_api",
  });

  await linkIncidentImpact(supabase, incident.id, params.entityType, params.entityId);

  await insertLifecycleEvent(supabase, {
    account_id: params.accountId ?? null,
    entity_type: "noc_alert",
    entity_id: params.alertId,
    event_type: "noc_alert_escalated",
    event_label: "NOC alert escalated to incident",
    notes: `Alert ${params.type} escalated to incident ${incident.id}.`,
    metadata: {
      incident_id: incident.id,
    },
  });

  await insertAuditLog(supabase, {
    entity_type: "noc_alert",
    entity_id: params.alertId,
    action: "auto_escalate",
    before_state: null,
    after_state: {
      incident_id: incident.id,
      escalated_at: new Date().toISOString(),
    },
    source_interface: "scheduled_actions_run_api",
  });

  return incident.id;
}

async function maybeCreateEscalatedIncidentForAlert(
  supabase: ReturnType<typeof getSupabase>,
  alertId: string
) {
  const { data: alert, error } = await supabase
    .from("noc_alerts")
    .select("id, severity, type, entity_type, entity_id, message, created_at, acknowledged")
    .eq("id", alertId)
    .single();

  if (error) {
    throw new Error(`Failed to inspect alert for escalation: ${error.message}`);
  }

  if (alert.acknowledged) return null;
  if (!["critical", "high"].includes(alert.severity)) return null;

  const ageMinutes = Math.max(
    0,
    Math.floor((Date.now() - new Date(alert.created_at).getTime()) / 60000)
  );

  if (ageMinutes < ESCALATION_MINUTES) {
    return null;
  }

  return autoEscalateAlertToIncident(supabase, {
    alertId: String(alert.id),
    severity: alert.severity as NocAlertSeverity,
    type: String(alert.type),
    entityType: String(alert.entity_type),
    entityId: String(alert.entity_id),
    message: String(alert.message),
    accountId: null,
  });
}

async function scanOverdueOrderMilestones(
  supabase: ReturnType<typeof getSupabase>
) {
  const today = todayDateString();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, account_id, location_id, install_target_date, activation_target_date, notes, quote_id"
    )
    .not("status", "in", `("${ORDER_STATUS.ACTIVATED}","${ORDER_STATUS.CANCELLED}")`)
    .limit(BATCH_LIMIT * 4);

  if (error) {
    throw new Error(`Failed to scan overdue orders: ${error.message}`);
  }

  const results = {
    installAlertsCreated: 0,
    activationAlertsCreated: 0,
    incidentsOpened: 0,
  };

  for (const order of (orders as OrderContext[] | null) ?? []) {
    if (
      order.install_target_date &&
      order.status !== ORDER_STATUS.ACTIVATED &&
      order.status !== ORDER_STATUS.CANCELLED
    ) {
      const daysOverdue = daysBetween(order.install_target_date, today);
      if (
        daysOverdue > 0 &&
        ![ORDER_STATUS.ACTIVATED, ORDER_STATUS.CANCELLED].includes(order.status)
      ) {
        const severity = getInstallOverdueSeverity(daysOverdue);
        const created = await createNocAlert(supabase, {
          severity,
          type: "install_sla_overdue",
          entity_type: "order",
          entity_id: order.id,
          account_id: order.account_id ?? null,
          message: `Install SLA overdue for order ${order.order_number} by ${daysOverdue} day(s).`,
          metadata: {
            order_number: order.order_number,
            install_target_date: order.install_target_date,
            days_overdue: daysOverdue,
            order_status: order.status,
          },
        });

        if (created.created) {
          results.installAlertsCreated += 1;
          const incidentId = await autoEscalateAlertToIncident(supabase, {
            alertId: created.alertId,
            accountId: order.account_id ?? null,
            severity,
            type: "install_sla_overdue",
            entityType: "order",
            entityId: order.id,
            message: `Install SLA overdue for order ${order.order_number} by ${daysOverdue} day(s).`,
          });

          if (incidentId) {
            results.incidentsOpened += 1;
          }
        }
      }
    }

    if (
      order.activation_target_date &&
      ![ORDER_STATUS.ACTIVATED, ORDER_STATUS.CANCELLED].includes(order.status)
    ) {
      const daysOverdue = daysBetween(order.activation_target_date, today);
      if (daysOverdue > 0 && order.status !== ORDER_STATUS.ACTIVATED) {
        const severity = getActivationOverdueSeverity(daysOverdue);
        const created = await createNocAlert(supabase, {
          severity,
          type: "activation_sla_overdue",
          entity_type: "order",
          entity_id: order.id,
          account_id: order.account_id ?? null,
          message: `Activation SLA overdue for order ${order.order_number} by ${daysOverdue} day(s).`,
          metadata: {
            order_number: order.order_number,
            activation_target_date: order.activation_target_date,
            days_overdue: daysOverdue,
            order_status: order.status,
          },
        });

        if (created.created) {
          results.activationAlertsCreated += 1;
          const incidentId = await autoEscalateAlertToIncident(supabase, {
            alertId: created.alertId,
            accountId: order.account_id ?? null,
            severity,
            type: "activation_sla_overdue",
            entityType: "order",
            entityId: order.id,
            message: `Activation SLA overdue for order ${order.order_number} by ${daysOverdue} day(s).`,
          });

          if (incidentId) {
            results.incidentsOpened += 1;
          }
        }
      }
    }
  }

  return results;
}

async function scanSupportEscalations(
  supabase: ReturnType<typeof getSupabase>
) {
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select("id, subject, status, priority, opened_at, account_id")
    .in("status", ["new", "open", "escalated"])
    .in("priority", ["high", "critical"])
    .limit(BATCH_LIMIT);

  if (error) {
    throw new Error(`Failed to scan support escalations: ${error.message}`);
  }

  let alertsCreated = 0;
  let incidentsOpened = 0;

  for (const ticket of (tickets as TicketContext[] | null) ?? []) {
    if (!ticket.opened_at) continue;

    const ageMinutes = Math.max(
      0,
      Math.floor((Date.now() - new Date(ticket.opened_at).getTime()) / 60000)
    );

    if (ageMinutes < ESCALATION_MINUTES) {
      continue;
    }

    const severity: NocAlertSeverity =
      ticket.priority === "critical" ? "critical" : "high";

    const created = await createNocAlert(supabase, {
      severity,
      type: "support_ticket_escalation_due",
      entity_type: "ticket",
      entity_id: ticket.id,
      account_id: ticket.account_id ?? null,
      message: `Support ticket ${ticket.subject ?? ticket.id} exceeded escalation threshold.`,
      metadata: {
        ticket_priority: ticket.priority,
        ticket_status: ticket.status,
        age_minutes: ageMinutes,
      },
    });

    if (created.created) {
      alertsCreated += 1;

      const incidentId = await autoEscalateAlertToIncident(supabase, {
        alertId: created.alertId,
        accountId: ticket.account_id ?? null,
        severity,
        type: "support_ticket_escalation_due",
        entityType: "ticket",
        entityId: ticket.id,
        message: `Support ticket ${ticket.subject ?? ticket.id} exceeded escalation threshold.`,
      });

      if (incidentId) {
        incidentsOpened += 1;
      }
    }
  }

  return { alertsCreated, incidentsOpened };
}

async function processOrderScheduledAction(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow
) {
  const order = await fetchOrderContext(supabase, action.entity_id);
  if (!order) {
    throw new Error(`Order not found for scheduled action ${action.id}`);
  }

  const targetStatus = action.target_status?.trim();
  if (!targetStatus) {
    throw new Error(`Scheduled action ${action.id} missing target_status`);
  }

  await updateOrderStatus(
    supabase,
    order.id,
    targetStatus,
    "scheduled_actions_run_api"
  );

  const refreshedOrder = await fetchOrderContext(supabase, order.id);
  if (!refreshedOrder) {
    throw new Error(`Order ${order.id} disappeared after update`);
  }

  await sendOrderLifecycleEmails(supabase, action, refreshedOrder);

  return {
    entity_type: "order",
    entity_id: order.id,
    order_number: refreshedOrder.order_number,
    applied_status: targetStatus,
  };
}

async function processAccountScheduledAction(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow
) {
  const account = await fetchAccountContext(supabase, action.entity_id);
  if (!account) {
    throw new Error(`Account not found for scheduled action ${action.id}`);
  }

  const targetStatus = action.target_status?.trim();
  if (!targetStatus) {
    throw new Error(`Scheduled action ${action.id} missing target_status`);
  }

  const beforeState = {
    status: account.status,
  };

  const { error } = await supabase
    .from("accounts")
    .update({
      status: targetStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", account.id);

  if (error) {
    throw new Error(`Failed to update account status: ${error.message}`);
  }

  await insertLifecycleEvent(supabase, {
    account_id: account.id,
    entity_type: "account",
    entity_id: account.id,
    event_type: "account_status_changed",
    event_label: "Account status changed",
    notes: `Account status changed from ${account.status ?? "unknown"} to ${targetStatus}.`,
  });

  await insertAuditLog(supabase, {
    entity_type: "account",
    entity_id: account.id,
    action: "status_change",
    before_state: beforeState,
    after_state: { status: targetStatus },
    source_interface: "scheduled_actions_run_api",
  });

  return {
    entity_type: "account",
    entity_id: account.id,
    account_name: account.account_name,
    applied_status: targetStatus,
  };
}

async function processTicketScheduledAction(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow
) {
  const ticket = await fetchTicketContext(supabase, action.entity_id);
  if (!ticket) {
    throw new Error(`Ticket not found for scheduled action ${action.id}`);
  }

  const targetStatus = action.target_status?.trim();
  if (!targetStatus) {
    throw new Error(`Scheduled action ${action.id} missing target_status`);
  }

  const beforeState = {
    status: ticket.status,
  };

  const { error } = await supabase
    .from("tickets")
    .update({
      status: targetStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", ticket.id);

  if (error) {
    throw new Error(`Failed to update ticket status: ${error.message}`);
  }

  await insertLifecycleEvent(supabase, {
    account_id: ticket.account_id ?? null,
    entity_type: "ticket",
    entity_id: ticket.id,
    event_type: "ticket_status_changed",
    event_label: "Ticket status changed",
    notes: `Ticket status changed from ${ticket.status ?? "unknown"} to ${targetStatus}.`,
  });

  await insertAuditLog(supabase, {
    entity_type: "ticket",
    entity_id: ticket.id,
    action: "status_change",
    before_state: beforeState,
    after_state: { status: targetStatus },
    source_interface: "scheduled_actions_run_api",
  });

  return {
    entity_type: "ticket",
    entity_id: ticket.id,
    subject: ticket.subject,
    applied_status: targetStatus,
  };
}

async function executeScheduledAction(
  supabase: ReturnType<typeof getSupabase>,
  action: ScheduledActionRow
) {
  switch (action.entity_type) {
    case "order":
      return processOrderScheduledAction(supabase, action);
    case "account":
      return processAccountScheduledAction(supabase, action);
    case "ticket":
      return processTicketScheduledAction(supabase, action);
    default:
      throw new Error(
        `Unsupported entity_type "${action.entity_type}" for scheduled action ${action.id}`
      );
  }
}

async function getDueScheduledActions(
  supabase: ReturnType<typeof getSupabase>
): Promise<ScheduledActionRow[]> {
  const today = todayDateString();

  const { data, error } = await supabase
    .from("scheduled_actions")
    .select(
      "id, account_id, entity_type, entity_id, action_type, target_status, effective_date, reason, status, retry_count, approval_required, approval_id, executed_at, failed_at, failure_reason, metadata, created_at"
    )
    .lte("effective_date", today)
    .in("status", ["scheduled", "queued"])
    .order("effective_date", { ascending: true })
    .limit(BATCH_LIMIT);

  if (error) {
    throw new Error(`Failed to load due scheduled actions: ${error.message}`);
  }

  const actions = (data as ScheduledActionRow[] | null) ?? [];

  return actions.filter((row) => {
    if (!row.approval_required) return true;
    return Boolean(row.approval_id);
  });
}

export async function POST() {
  const supabase = getSupabase();
  const startedAt = new Date().toISOString();

  let jobRunId: string | null = null;
  let lockAcquired = false;

  const summary = {
    started_at: startedAt,
    scheduled_actions_scanned: 0,
    scheduled_actions_executed: 0,
    scheduled_actions_failed: 0,
    install_reminders_sent: 0,
    noc_alerts_created: 0,
    incidents_opened: 0,
    overdue_install_alerts_created: 0,
    overdue_activation_alerts_created: 0,
    support_escalation_alerts_created: 0,
    support_escalation_incidents_opened: 0,
    errors: [] as string[],
    action_results: [] as Json[],
  };

  try {
    jobRunId = await createJobRun(supabase, {
      job_type: "scheduled_actions_run",
      status: "running",
      started_at: startedAt,
      output: null,
    });

    const lockResult = await tryAcquireExecutionLock(supabase, jobRunId);
    if (!lockResult.acquired) {
      await finalizeJobRun(
        supabase,
        jobRunId,
        "completed",
        {
          skipped: true,
          reason: lockResult.reason,
        },
        null
      );

      return NextResponse.json(
        {
          ok: true,
          skipped: true,
          reason: lockResult.reason,
        },
        { status: 200 }
      );
    }

    lockAcquired = true;

    const actions = await getDueScheduledActions(supabase);
    summary.scheduled_actions_scanned = actions.length;

    for (const action of actions) {
      try {
        await markActionRunning(supabase, action);
        const result = await executeScheduledAction(supabase, action);
        await markExecuted(supabase, action);

        summary.scheduled_actions_executed += 1;
        summary.action_results.push({
          action_id: action.id,
          result,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown scheduled action failure";

        await markFailed(supabase, action, message);
        summary.scheduled_actions_failed += 1;
        summary.errors.push(`Action ${action.id}: ${message}`);
      }
    }

    summary.install_reminders_sent = await maybeSendInstallationReminderEmails(
      supabase
    );

    const overdue = await scanOverdueOrderMilestones(supabase);
    summary.overdue_install_alerts_created = overdue.installAlertsCreated;
    summary.overdue_activation_alerts_created = overdue.activationAlertsCreated;
    summary.noc_alerts_created +=
      overdue.installAlertsCreated + overdue.activationAlertsCreated;
    summary.incidents_opened += overdue.incidentsOpened;

    const supportEscalations = await scanSupportEscalations(supabase);
    summary.support_escalation_alerts_created = supportEscalations.alertsCreated;
    summary.support_escalation_incidents_opened =
      supportEscalations.incidentsOpened;
    summary.noc_alerts_created += supportEscalations.alertsCreated;
    summary.incidents_opened += supportEscalations.incidentsOpened;

    const { data: pendingEscalationAlerts, error: pendingAlertsError } = await supabase
      .from("noc_alerts")
      .select("id")
      .eq("acknowledged", false)
      .in("severity", ["critical", "high"])
      .limit(BATCH_LIMIT);

    if (pendingAlertsError) {
      throw new Error(
        `Failed to inspect pending escalation alerts: ${pendingAlertsError.message}`
      );
    }

    for (const row of pendingEscalationAlerts ?? []) {
      const incidentId = await maybeCreateEscalatedIncidentForAlert(
        supabase,
        String(row.id)
      );
      if (incidentId) {
        summary.incidents_opened += 1;
      }
    }

    await finalizeJobRun(supabase, jobRunId, "completed", summary, null);

    return NextResponse.json(
      {
        ok: true,
        summary,
      },
      { status: 200 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Scheduled actions run failed";

    if (jobRunId) {
      await finalizeJobRun(
        supabase,
        jobRunId,
        "failed",
        {
          ...summary,
          failed_at: new Date().toISOString(),
        },
        message
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: message,
        summary,
      },
      { status: 500 }
    );
  } finally {
    if (lockAcquired && jobRunId) {
      await releaseExecutionLock(supabase, jobRunId);
    }
  }
}

export async function GET() {
  return POST();
}