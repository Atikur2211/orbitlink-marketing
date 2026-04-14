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
  retry_count?: number | null;
};

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

async function safeSend(params: {
  to: string;
  subject: string;
  html: string;
}) {
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

async function markExecuted(supabase: any, actionId: string) {
  await supabase
    .from("scheduled_actions")
    .update({
      status: "executed",
      executed_at: new Date().toISOString(),
      failed_at: null,
      failure_reason: null,
      retry_count: 0,
    })
    .eq("id", actionId);
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const today = new Date().toISOString().split("T")[0];

  const { data: actions, error } = await supabase
    .from("scheduled_actions")
    .select(`
      id,
      account_id,
      entity_type,
      entity_id,
      action_type,
      target_status,
      effective_date,
      reason,
      status,
      retry_count
    `)
    .eq("status", "scheduled")
    .lte("effective_date", today)
    .order("effective_date", { ascending: true })
    .limit(BATCH_LIMIT);

  if (error) {
    console.error("Failed to load scheduled actions:", error.message);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  if (!actions?.length) {
    return NextResponse.json({
      ok: true,
      message: "No scheduled actions to execute",
      executed: 0,
      failed: 0,
    });
  }

  let executed = 0;
  let failed = 0;

  for (const action of actions as ScheduledActionRow[]) {
    try {
      const { data: lock, error: lockError } = await supabase
        .from("scheduled_actions")
        .update({ status: "running" })
        .eq("id", action.id)
        .eq("status", "scheduled")
        .select("id")
        .single();

      if (lockError || !lock) {
        continue;
      }

      if (action.entity_type !== "order") {
        throw new Error(`Unsupported entity_type: ${action.entity_type}`);
      }

      const { data: orderBefore, error: orderBeforeError } = await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          status,
          account_id,
          location_id,
          install_target_date,
          activation_target_date,
          notes
        `)
        .eq("id", action.entity_id)
        .single();

      if (orderBeforeError || !orderBefore) {
        throw new Error(
          `Order not found for scheduled action ${action.id}: ${orderBeforeError?.message || "missing order"}`
        );
      }

      if (orderBefore.status === action.target_status) {
        await markExecuted(supabase, action.id);
        executed += 1;
        continue;
      }
      // 🚫 Prevent downgrade (VERY IMPORTANT)
      if (
        orderBefore.status === "activated" &&
        action.target_status === "scheduled"
      ) {
        await supabase.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: "order",
          entity_id: action.entity_id,
          event_type: "order_status_downgrade_blocked",
          event_label: "Order status downgrade blocked",
          notes: `Prevented downgrade from activated to scheduled for order ${orderBefore.order_number}.`,
        });

        await markExecuted(supabase, action.id);
        executed += 1;
        continue;
      }
      if (!action.target_status) {
        throw new Error(`Scheduled action ${action.id} missing target_status`);
      }

      const { error: orderUpdateError } = await supabase
        .from("orders")
        .update({ status: action.target_status })
        .eq("id", action.entity_id);
      
      if (orderUpdateError) {
        throw new Error(
          `Failed updating order ${action.entity_id}: ${orderUpdateError.message}`
        );
      }

      const { data: account } = await supabase
        .from("accounts")
        .select("account_name, primary_contact_name, primary_contact_email")
        .eq("id", orderBefore.account_id)
        .single();

      const { data: location } = await supabase
        .from("locations")
        .select("location_name, address_line_1, city")
        .eq("id", orderBefore.location_id)
        .maybeSingle();

      const ctx = {
        primaryContactName: account?.primary_contact_name ?? null,
        primaryContactEmail: account?.primary_contact_email ?? null,
        accountName: account?.account_name ?? "Orbitlink Customer",
        orderNumber: orderBefore.order_number,
        serviceLocation:
          location?.location_name ||
          (location?.address_line_1 && location?.city
            ? `${location.address_line_1} · ${location.city}`
            : location?.address_line_1) ||
          "Customer Site",
        installTargetDate: orderBefore.install_target_date,
        activationTargetDate: orderBefore.activation_target_date,
        reason: action.reason ?? orderBefore.notes ?? null,
      };
        if (ctx.primaryContactEmail) {
          if (action.target_status === "scheduled") {
          await safeSend({
            to: ctx.primaryContactEmail,
            subject: "Orbitlink™ — Installation Scheduled",
            html: buildInstallationScheduledEmail(ctx),
          });
        }
      
        if (action.target_status === "activated") {
          await safeSend({
            to: ctx.primaryContactEmail,
            subject: "Orbitlink™ — Service Activated",
            html: buildActivationEmail(ctx),
          });
        }

        if (action.target_status === "cancelled") {
          await safeSend({
            to: ctx.primaryContactEmail,
            subject: "Orbitlink™ — Order Cancelled",
            html: buildCancellationEmail(ctx),
          });
        }
      }

      await supabase.from("lifecycle_events").insert({
        account_id: action.account_id,
        entity_type: "order",
        entity_id: action.entity_id,
        event_type: "scheduled_action_executed",
        event_label: "Scheduled action executed",
        notes: `Auto executed ${action.action_type} → ${action.target_status} for order ${orderBefore.order_number}.`,
      });

      await (supabase as any).from("audit_logs").insert({
        entity_type: "order",
        entity_id: action.entity_id,
        action: "auto_execute",
        before_state: {
          status: orderBefore.status,
        },
        after_state: {
          status: action.target_status,
          scheduled_action_id: action.id,
          action_type: action.action_type,
          effective_date: action.effective_date,
        },
        source_interface: "system_scheduled_actions_executor",
      });

      await markExecuted(supabase, action.id);
      executed += 1;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown execution failure";

      console.error("Scheduled action execution failed:", action.id, message);

      const retryCount = (action.retry_count || 0) + 1;

      if (retryCount < MAX_RETRIES) {
        await supabase
          .from("scheduled_actions")
          .update({
            status: "scheduled",
            retry_count: retryCount,
            failure_reason: message,
          })
          .eq("id", action.id);
      } else {
        await supabase
          .from("scheduled_actions")
          .update({
            status: "failed",
            failed_at: new Date().toISOString(),
            failure_reason: message,
          })
          .eq("id", action.id);

        await supabase.from("lifecycle_events").insert({
          account_id: action.account_id,
          entity_type: action.entity_type,
          entity_id: action.entity_id,
          event_type: "scheduled_action_failed",
          event_label: "Scheduled action failed",
          notes: `Scheduled action ${action.action_type} failed: ${message}`,
        });

        failed += 1;
      }
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Scheduled action execution complete",
    executed,
    failed,
  });
}