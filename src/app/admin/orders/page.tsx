import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type Order = {
  id: string;
  order_number: string;
  status: string | null;
  install_target_date: string | null;
  activation_target_date: string | null;
  notes: string | null;
  account_id: string;
  location_id: string | null;
  quote_id: string | null;
  accounts: { account_name: string }[] | null;
  locations: { location_name: string | null }[] | null;
  quotes: { quote_number: string }[] | null;
};

type ScheduledAction = {
  id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  target_status: string | null;
  effective_date: string;
  reason: string | null;
  status: string | null;
};

type AccountOption = {
  id: string;
  account_name: string;
};

type LocationOption = {
  id: string;
  account_id: string;
  location_name: string | null;
  address_line_1: string;
  city: string | null;
};

type QuoteOption = {
  id: string;
  account_id: string;
  quote_number: string;
};

type EmailOrderContext = {
  primaryContactName: string | null;
  primaryContactEmail: string | null;
  accountName: string;
  orderNumber: string;
  serviceLocation: string;
  installTargetDate: string | null;
  activationTargetDate: string | null;
  quoteNumber: string | null;
  notes: string | null;
};

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

const resend = new Resend(resendApiKey);

const VERIFIED_FROM_EMAIL = "Orbitlink <noreply@orbitlink.ca>";
const DEFAULT_REPLY_TO = "concierge@orbitlink.ca";
const DEFAULT_CC_EMAIL = "concierge@orbitlink.ca";
const EMAIL_LOGO_URL = "https://orbitlink.ca/brand/orbitlink-email-logo.png";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeEmail(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatDateLabel(value: string | null) {
  if (!value) return "To be confirmed";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getLocationLabel(location: LocationOption | null | undefined) {
  if (!location) return "—";
  const name = location.location_name?.trim();
  const city = location.city?.trim();
  if (name && city) return `${name} · ${city}`;
  if (name) return name;
  if (city) return `${location.address_line_1} · ${city}`;
  return location.address_line_1;
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
                  Terms: https://orbitlink.ca/legal/terms &nbsp;|&nbsp; Privacy: https://orbitlink.ca/privacy
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

function buildOrderSummaryCard(ctx: EmailOrderContext) {
  const accountName = escapeHtml(ctx.accountName);
  const orderNumber = escapeHtml(ctx.orderNumber);
  const serviceLocation = escapeHtml(ctx.serviceLocation);
  const quoteNumber = escapeHtml(ctx.quoteNumber || "Not linked");
  const installTargetDate = escapeHtml(formatDateLabel(ctx.installTargetDate));
  const activationTargetDate = escapeHtml(formatDateLabel(ctx.activationTargetDate));
  const notes = escapeHtml(ctx.notes || "No additional order notes provided.");

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:22px 0 22px 0;">
      <tr>
        <td style="background:#f8f9fc;border:1px solid #dfe5ef;border-radius:14px;padding:18px 18px;">
          <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6e7b8f;margin-bottom:6px;">
            Order Reference
          </div>
          <div style="font-family:Arial,sans-serif;font-size:22px;line-height:1.35;font-weight:700;color:#0f172a;word-break:break-word;">
            ${orderNumber}
          </div>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px 0;">
      <tr>
        <td style="padding:0 0 10px 0;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#6e7b8f;">
          Order Details
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;border:1px solid #e3e8f1;border-radius:14px;padding:0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;width:38%;">Account</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${accountName}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Service Location</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${serviceLocation}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Quote Reference</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${quoteNumber}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Install Target</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e7ebf2;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${installTargetDate}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;color:#64748b;">Activation Target</td>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;font-weight:600;">${activationTargetDate}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="margin:0 0 22px 0;padding:16px 18px;background:#f8f9fc;border:1px solid #dfe5ef;border-radius:14px;">
      <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6e7b8f;margin-bottom:6px;">
        Notes
      </div>
      <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a;">
        ${notes}
      </div>
    </div>
  `;
}

function buildOrderConfirmationEmail(ctx: EmailOrderContext) {
  const contactName = escapeHtml(ctx.primaryContactName || "Customer");

  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${contactName},</p>

        <p style="margin:0 0 16px 0;">
          This is to confirm that Orbitlink™ has opened your service order successfully.
        </p>

        <p style="margin:0 0 16px 0;">
          Our operations team is now coordinating the next stage of service delivery, which may include building qualification, carrier coordination, install planning, and activation readiness depending on service type and site conditions.
        </p>

        ${buildOrderSummaryCard(ctx)}

        <p style="margin:0 0 16px 0;">
          You will receive additional communication as your order progresses through scheduling, installation, and activation milestones.
        </p>

        <p style="margin:0;">
          Regards,<br />
          <strong>Orbitlink™ Operations</strong>
        </p>
      </td>
    </tr>
  `;

  return buildEmailShell(
    "Order Confirmation",
    "Your order has been entered into Orbitlink operations and is now progressing through coordination and provisioning workflow.",
    body
  );
}

function buildInstallationScheduledEmail(ctx: EmailOrderContext) {
  const contactName = escapeHtml(ctx.primaryContactName || "Customer");
  const installDate = escapeHtml(formatDateLabel(ctx.installTargetDate));

  const body = `
    <tr>
      <td style="padding:30px 22px 18px 22px;font-family:Arial,sans-serif;color:#17202a;font-size:15px;line-height:1.78;">
        <p style="margin:0 0 16px 0;">Hi ${contactName},</p>

        <p style="margin:0 0 16px 0;">
          Your Orbitlink™ order has now moved into the installation scheduled stage.
        </p>

        <p style="margin:0 0 16px 0;">
          Our team is coordinating the installation workflow and site readiness requirements for your service location. Please ensure that building access, site contact availability, and any required internal access arrangements are prepared as applicable.
        </p>

        ${buildOrderSummaryCard(ctx)}

        <div style="margin:0 0 22px 0;padding:16px 18px;background:#fff8e7;border:1px solid #eedca4;border-radius:14px;">
          <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8b6b14;margin-bottom:6px;">
            Scheduled Install Window
          </div>
          <div style="font-family:Arial,sans-serif;font-size:20px;line-height:1.4;font-weight:700;color:#111827;">
            ${installDate}
          </div>
        </div>

        <p style="margin:0 0 16px 0;">
          If any site access conditions, contact details, or coordination requirements have changed, please reply to this message so our team can update the order before the scheduled install window.
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

async function sendOrderEmail(
  subject: string,
  html: string,
  recipientEmail: string
) {
  const { data, error } = await resend.emails.send({
    from: VERIFIED_FROM_EMAIL,
    to: recipientEmail,
    cc: [DEFAULT_CC_EMAIL],
    replyTo: DEFAULT_REPLY_TO,
    subject,
    html,
  });

  if (error) {
    console.error(
      "Resend returned an error while sending order email:",
      JSON.stringify(error, null, 2)
    );
  } else {
    console.log(
      "Order email sent successfully:",
      JSON.stringify(data, null, 2)
    );
  }
}

async function getOrderEmailContext(
  supabase: ReturnType<typeof createClient>,
  accountId: string,
  locationId: string | null,
  quoteId: string | null,
  orderNumber: string,
  installTargetDate: string | null,
  activationTargetDate: string | null,
  notes: string | null
): Promise<EmailOrderContext | null> {
  const [{ data: account }, { data: location }, { data: quote }] = await Promise.all([
    supabase
      .from("accounts")
      .select("id, account_name, primary_contact_name, primary_contact_email")
      .eq("id", accountId)
      .single(),
    locationId
      ? supabase
          .from("locations")
          .select("id, location_name, address_line_1, city")
          .eq("id", locationId)
          .single()
      : Promise.resolve({ data: null }),
    quoteId
      ? supabase
          .from("quotes")
          .select("id, quote_number")
          .eq("id", quoteId)
          .single()
      : Promise.resolve({ data: null }),
  ]);

  if (!account?.account_name) return null;

  const serviceLocation = getLocationLabel(
    location
      ? {
          id: location.id,
          account_id: accountId,
          location_name: location.location_name,
          address_line_1: location.address_line_1,
          city: location.city,
        }
      : null
  );

  return {
    primaryContactName: account.primary_contact_name ?? null,
    primaryContactEmail: account.primary_contact_email ?? null,
    accountName: account.account_name,
    orderNumber,
    serviceLocation,
    installTargetDate,
    activationTargetDate,
    quoteNumber: quote?.quote_number ?? null,
    notes,
  };
}

function getStatusStyles(status: string | null) {
  switch (status) {
    case "activated":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.35)",
        color: "#f5d67b",
      };
    case "scheduled":
      return {
        background: "rgba(255, 215, 0, 0.12)",
        border: "1px solid rgba(255, 215, 0, 0.28)",
        color: "#f7d774",
      };
    case "installing":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "submitted":
      return {
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        color: "#f5f5f5",
      };
    case "cancelled":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb09a",
      };
    case "pending_carrier":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
    case "draft":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
    default:
      return {
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        color: "#d8d8d8",
      };
  }
}

function getScheduledActionBadge(status: string | null) {
  switch (status) {
    case "scheduled":
      return {
        background: "rgba(212, 175, 55, 0.14)",
        border: "1px solid rgba(212, 175, 55, 0.28)",
        color: "#f4d57b",
      };
    case "running":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "executed":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f5d67b",
      };
    case "failed":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb09a",
      };
    case "cancelled":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f5f5f5",
      };
    default:
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
  }
}

function getEventMeta(nextStatus: string) {
  switch (nextStatus) {
    case "scheduled":
      return {
        event_type: "install_scheduled",
        event_label: "Install scheduled",
      };
    case "installing":
      return {
        event_type: "order_installing",
        event_label: "Order installing",
      };
    case "activated":
      return {
        event_type: "order_activated",
        event_label: "Order activated",
      };
    case "cancelled":
      return {
        event_type: "order_cancelled",
        event_label: "Order cancelled",
      };
    default:
      return {
        event_type: "order_updated",
        event_label: "Order updated",
      };
  }
}

function getScheduledEventMeta(actionType: string) {
  switch (actionType) {
    case "schedule_install":
      return {
        event_type: "order_install_scheduled",
        event_label: "Order install scheduled",
      };
    case "activate":
      return {
        event_type: "order_activation_scheduled",
        event_label: "Order activation scheduled",
      };
    case "cancel":
      return {
        event_type: "order_cancellation_scheduled",
        event_label: "Order cancellation scheduled",
      };
    default:
      return {
        event_type: "order_action_scheduled",
        event_label: "Order action scheduled",
      };
  }
}

export default async function AdminOrdersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function createOrder(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const orderNumber = String(formData.get("order_number") ?? "").trim();
    const accountId = String(formData.get("account_id") ?? "");
    const locationId = String(formData.get("location_id") ?? "");
    const quoteId = String(formData.get("quote_id") ?? "");
    const notes = String(formData.get("notes") ?? "").trim();
    const installTargetDate = String(formData.get("install_target_date") ?? "");
    const activationTargetDate = String(formData.get("activation_target_date") ?? "");

    if (!orderNumber || !accountId || !locationId) return;

    const orderEmailContextBeforeInsert = await getOrderEmailContext(
      supabase,
      accountId,
      locationId,
      quoteId || null,
      orderNumber,
      installTargetDate || null,
      activationTargetDate || null,
      notes || null
    );

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        account_id: accountId,
        location_id: locationId,
        quote_id: quoteId || null,
        status: "submitted",
        notes: notes || null,
        install_target_date: installTargetDate || null,
        activation_target_date: activationTargetDate || null,
      })
      .select(
        "id, order_number, status, notes, install_target_date, activation_target_date, location_id, quote_id"
      )
      .single();

    if (error || !order) {
      console.error("Failed to create order:", error?.message);
      return;
    }

    const locationLabel = orderEmailContextBeforeInsert?.serviceLocation || "selected site";

    const recipientEmail = normalizeEmail(
      orderEmailContextBeforeInsert?.primaryContactEmail
    );

    if (recipientEmail && isValidEmail(recipientEmail) && orderEmailContextBeforeInsert) {
      try {
        await sendOrderEmail(
          "Orbitlink™ — Order Confirmation",
          buildOrderConfirmationEmail(orderEmailContextBeforeInsert),
          recipientEmail
        );
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
      }
    } else {
      console.warn(
        "Order created without a valid account contact email:",
        accountId,
        orderEmailContextBeforeInsert?.primaryContactEmail
      );
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "order",
      entity_id: order.id,
      event_type: "order_created",
      event_label: "Order created",
      notes: `Order ${order.order_number} created for ${locationLabel}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "order",
      entity_id: order.id,
      action: "create",
      after_state: {
        order_number: order.order_number,
        status: order.status,
        notes: order.notes,
        install_target_date: order.install_target_date,
        activation_target_date: order.activation_target_date,
        location_id: order.location_id,
        quote_id: order.quote_id,
      },
      source_interface: "admin_orders_create",
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateOrderDetails(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const orderId = String(formData.get("order_id") ?? "");
    const locationId = String(formData.get("location_id") ?? "");
    const quoteId = String(formData.get("quote_id") ?? "");
    const installDate = String(formData.get("install_target_date") ?? "");
    const activationDate = String(formData.get("activation_target_date") ?? "");
    const notes = String(formData.get("notes") ?? "").trim();

    if (!orderId || !locationId) return;

    const { data: before, error: beforeError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (beforeError || !before) {
      console.error("Failed loading order before update:", beforeError?.message);
      return;
    }

    const { data: location } = await supabase
      .from("locations")
      .select("id, location_name, address_line_1, city")
      .eq("id", locationId)
      .single();

    const beforeState = {
      location_id: before.location_id ?? null,
      quote_id: before.quote_id ?? null,
      install_target_date: before.install_target_date,
      activation_target_date: before.activation_target_date,
      notes: before.notes,
    };

    const afterState = {
      location_id: locationId || null,
      quote_id: quoteId || null,
      install_target_date: installDate || null,
      activation_target_date: activationDate || null,
      notes: notes || null,
    };

    const noChanges =
      beforeState.location_id === afterState.location_id &&
      beforeState.quote_id === afterState.quote_id &&
      beforeState.install_target_date === afterState.install_target_date &&
      beforeState.activation_target_date === afterState.activation_target_date &&
      beforeState.notes === afterState.notes;

    if (noChanges) return;

    const { error } = await supabase
      .from("orders")
      .update(afterState)
      .eq("id", orderId);

    if (error) {
      console.error("Failed updating order details:", error.message);
      return;
    }

    const locationLabel =
      location
        ? getLocationLabel({
            id: location.id,
            account_id: before.account_id,
            location_name: location.location_name,
            address_line_1: location.address_line_1,
            city: location.city,
          })
        : "selected site";

    await supabase.from("lifecycle_events").insert({
      account_id: before.account_id,
      entity_type: "order",
      entity_id: orderId,
      event_type: "order_updated",
      event_label: "Order updated",
      notes: `Order ${before.order_number} details updated for ${locationLabel}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "order",
      entity_id: orderId,
      action: "update",
      before_state: beforeState,
      after_state: afterState,
      source_interface: "admin_orders_edit",
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateOrderStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const orderId = String(formData.get("order_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const orderNumber = String(formData.get("order_number") ?? "");
    const locationLabel = String(formData.get("location_label") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!orderId || !nextStatus) return;
    if (currentStatus === nextStatus) return;

    const { data: before } = await supabase
      .from("orders")
      .select("id, order_number, install_target_date, activation_target_date, notes, location_id, quote_id")
      .eq("id", orderId)
      .single();

    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      return;
    }

    if (nextStatus === "scheduled" && before) {
      const emailContext = await getOrderEmailContext(
        supabase,
        accountId,
        before.location_id,
        before.quote_id,
        before.order_number,
        before.install_target_date,
        before.activation_target_date,
        before.notes
      );

      const recipientEmail = normalizeEmail(emailContext?.primaryContactEmail);

      if (recipientEmail && isValidEmail(recipientEmail) && emailContext) {
        try {
          await sendOrderEmail(
            "Orbitlink™ — Installation Scheduled",
            buildInstallationScheduledEmail(emailContext),
            recipientEmail
          );
        } catch (emailError) {
          console.error("Failed to send installation scheduled email:", emailError);
        }
      } else {
        console.warn(
          "Install scheduled without a valid account contact email:",
          accountId,
          emailContext?.primaryContactEmail
        );
      }
    }

    const meta = getEventMeta(nextStatus);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "order",
      entity_id: orderId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `Order ${orderNumber} at ${locationLabel || "site"} changed from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "order",
      entity_id: orderId,
      action: "status_change",
      before_state: { status: currentStatus || null },
      after_state: { status: nextStatus },
      source_interface: "admin_orders_page",
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function scheduleOrderAction(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const orderId = String(formData.get("order_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const orderNumber = String(formData.get("order_number") ?? "");
    const locationLabel = String(formData.get("location_label") ?? "");
    const actionType = String(formData.get("action_type") ?? "");
    const targetStatus = String(formData.get("target_status") ?? "");
    const effectiveDate = String(formData.get("effective_date") ?? "");
    const reason = String(formData.get("reason") ?? "").trim();

    if (!orderId || !accountId || !actionType || !targetStatus || !effectiveDate) return;

    const { data: existingDuplicate } = await supabase
      .from("scheduled_actions")
      .select("id")
      .eq("entity_type", "order")
      .eq("entity_id", orderId)
      .eq("action_type", actionType)
      .eq("target_status", targetStatus)
      .eq("effective_date", effectiveDate)
      .eq("status", "scheduled")
      .maybeSingle();

    if (existingDuplicate) {
      console.error("Duplicate scheduled action blocked");
      return;
    }

    const { data: scheduledAction, error } = await supabase
      .from("scheduled_actions")
      .insert({
        account_id: accountId,
        entity_type: "order",
        entity_id: orderId,
        action_type: actionType,
        target_status: targetStatus,
        effective_date: effectiveDate,
        reason: reason || `${actionType} scheduled via admin`,
        status: "scheduled",
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    const meta = getScheduledEventMeta(actionType);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "order",
      entity_id: orderId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `${orderNumber} at ${locationLabel || "site"} scheduled to ${actionType} (${targetStatus}) on ${effectiveDate}. Reason: ${reason || "No reason provided"}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "order",
      entity_id: orderId,
      action: "create",
      after_state: {
        scheduled_action_id: scheduledAction?.id ?? null,
        action_type: actionType,
        target_status: targetStatus,
        effective_date: effectiveDate,
        reason: reason || `${actionType} scheduled via admin`,
      },
      source_interface: "admin_orders_page_schedule_action",
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/dashboard");
  }

  const [
    { data: ordersData, error },
    { data: scheduledData },
    { data: accountsData },
    { data: locationsData },
    { data: quotesData },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select(`
        id,
        order_number,
        status,
        install_target_date,
        activation_target_date,
        notes,
        account_id,
        location_id,
        quote_id,
        accounts ( account_name ),
        locations ( location_name ),
        quotes ( quote_number )
      `)
      .order("created_at", { ascending: false }),
    supabase
      .from("scheduled_actions")
      .select(`
        id,
        entity_type,
        entity_id,
        action_type,
        target_status,
        effective_date,
        reason,
        status
      `)
      .eq("entity_type", "order")
      .order("effective_date", { ascending: true }),
    supabase
      .from("accounts")
      .select("id, account_name")
      .neq("status", "archived")
      .order("account_name", { ascending: true }),
    supabase
      .from("locations")
      .select("id, account_id, location_name, address_line_1, city")
      .neq("status", "archived")
      .order("created_at", { ascending: false }),
    supabase
      .from("quotes")
      .select("id, account_id, quote_number")
      .order("created_at", { ascending: false }),
  ]);

  const orderList = (ordersData as Order[] | null) ?? [];
  const scheduledActions = (scheduledData as ScheduledAction[] | null) ?? [];
  const accountOptions = (accountsData as AccountOption[] | null) ?? [];
  const locationOptions = (locationsData as LocationOption[] | null) ?? [];
  const quoteOptions = (quotesData as QuoteOption[] | null) ?? [];

  const totalOrders = orderList.length;
  const submittedOrders = orderList.filter((order) => order.status === "submitted").length;
  const scheduledOrders = orderList.filter((order) => order.status === "scheduled").length;
  const activatedOrders = orderList.filter((order) => order.status === "activated").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #111111 45%, #161616 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1540px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "28px",
            padding: "28px",
            borderRadius: "24px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.10) 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: "12px",
            }}
          >
            Orbitlink OS
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              margin: "0 0 10px 0",
              color: "#fff7db",
            }}
          >
            Orders Control
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: "900px",
              lineHeight: 1.6,
            }}
          >
            Create orders against real customer sites, track install progression,
            manage activation readiness, and schedule future-dated actions from one
            premium location-linked operator surface.
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "Total Orders", value: totalOrders },
            { label: "Submitted", value: submittedOrders },
            { label: "Scheduled", value: scheduledOrders },
            { label: "Activated", value: activatedOrders },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: "20px",
                padding: "20px",
                border: "1px solid rgba(212, 175, 55, 0.14)",
                background: "rgba(255,255,255,0.03)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.58)",
                  marginBottom: "10px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#fff2c4",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            marginBottom: "24px",
            borderRadius: "24px",
            border: "1px solid rgba(212, 175, 55, 0.16)",
            background: "rgba(255,255,255,0.03)",
            boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 22px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(212, 175, 55, 0.06)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#fff2c4",
              }}
            >
              Create Order
            </h2>
          </div>

          <div style={{ padding: "20px 22px" }}>
            <form action={createOrder} style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr 1.2fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  name="order_number"
                  placeholder="Order Number"
                  required
                  style={textInput}
                />

                <select name="account_id" required style={textInput}>
                  <option value="">Select Account</option>
                  {accountOptions.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_name}
                    </option>
                  ))}
                </select>

                <select name="location_id" required style={textInput}>
                  <option value="">Select Location</option>
                  {locationOptions.map((location) => (
                    <option key={location.id} value={location.id}>
                      {getLocationLabel(location)}
                    </option>
                  ))}
                </select>

                <select name="quote_id" style={textInput}>
                  <option value="">Optional Quote</option>
                  {quoteOptions.map((quote) => (
                    <option key={quote.id} value={quote.id}>
                      {quote.quote_number}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1.4fr",
                  gap: "12px",
                }}
              >
                <input
                  name="install_target_date"
                  type="date"
                  style={dateInput}
                />

                <input
                  name="activation_target_date"
                  type="date"
                  style={dateInput}
                />

                <input
                  name="notes"
                  placeholder="Order notes"
                  style={textInput}
                />
              </div>

              <div>
                <button style={actionButtonGold} type="submit">
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </section>

        {error ? (
          <div
            style={{
              border: "1px solid rgba(255, 99, 71, 0.35)",
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255, 99, 71, 0.08)",
            }}
          >
            <p style={{ margin: 0, color: "#ffb09a" }}>
              Error loading orders: {error.message}
            </p>
          </div>
        ) : (
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(212, 175, 55, 0.16)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.30)",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(212, 175, 55, 0.06)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#fff2c4",
                }}
              >
                Order Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "2150px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      textAlign: "left",
                    }}
                  >
                    <th style={headerCell}>Order</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Location</th>
                    <th style={headerCell}>Quote</th>
                    <th style={headerCell}>Reassign Location</th>
                    <th style={headerCell}>Reassign Quote</th>
                    <th style={headerCell}>Install Target</th>
                    <th style={headerCell}>Activation Target</th>
                    <th style={headerCell}>Editable Notes</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Immediate Actions</th>
                    <th style={headerCell}>Scheduled Actions</th>
                    <th style={headerCell}>Add Future Action</th>
                    <th style={headerCell}>Save Details</th>
                  </tr>
                </thead>

                <tbody>
                  {orderList.length ? (
                    orderList.map((order) => {
                      const badge = getStatusStyles(order.status);
                      const rowScheduled = scheduledActions.filter(
                        (item) => item.entity_id === order.id
                      );
                      const currentStatus = order.status ?? "submitted";
                      const currentLocationLabel =
                        order.locations?.[0]?.location_name ?? "Site not linked";

                      return (
                        <tr
                          key={order.id}
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <td style={bodyCell}>
                            <div style={{ fontWeight: 600, color: "#fff7db" }}>
                              {order.order_number}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            {order.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            <div style={{ color: "#fff2c4", fontWeight: 600 }}>
                              {order.locations?.[0]?.location_name ?? "—"}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            {order.quotes?.[0]?.quote_number ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            <form action={updateOrderDetails}>
                              <input type="hidden" name="order_id" value={order.id} />
                              <input
                                type="hidden"
                                name="quote_id"
                                value={order.quote_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="install_target_date"
                                value={order.install_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_target_date"
                                value={order.activation_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="notes"
                                value={order.notes ?? ""}
                              />
                              <select
                                name="location_id"
                                defaultValue={order.location_id ?? ""}
                                style={textInput}
                              >
                                <option value="">Select Location</option>
                                {locationOptions
                                  .filter((location) => location.account_id === order.account_id)
                                  .map((location) => (
                                    <option key={location.id} value={location.id}>
                                      {getLocationLabel(location)}
                                    </option>
                                  ))}
                              </select>
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateOrderDetails}>
                              <input type="hidden" name="order_id" value={order.id} />
                              <input
                                type="hidden"
                                name="location_id"
                                value={order.location_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="install_target_date"
                                value={order.install_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_target_date"
                                value={order.activation_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="notes"
                                value={order.notes ?? ""}
                              />
                              <select
                                name="quote_id"
                                defaultValue={order.quote_id ?? ""}
                                style={textInput}
                              >
                                <option value="">Optional Quote</option>
                                {quoteOptions
                                  .filter((quote) => quote.account_id === order.account_id)
                                  .map((quote) => (
                                    <option key={quote.id} value={quote.id}>
                                      {quote.quote_number}
                                    </option>
                                  ))}
                              </select>
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateOrderDetails}>
                              <input type="hidden" name="order_id" value={order.id} />
                              <input
                                type="hidden"
                                name="location_id"
                                value={order.location_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="quote_id"
                                value={order.quote_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_target_date"
                                value={order.activation_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="notes"
                                value={order.notes ?? ""}
                              />
                              <input
                                name="install_target_date"
                                defaultValue={order.install_target_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateOrderDetails}>
                              <input type="hidden" name="order_id" value={order.id} />
                              <input
                                type="hidden"
                                name="location_id"
                                value={order.location_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="quote_id"
                                value={order.quote_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="install_target_date"
                                value={order.install_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="notes"
                                value={order.notes ?? ""}
                              />
                              <input
                                name="activation_target_date"
                                defaultValue={order.activation_target_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateOrderDetails}>
                              <input type="hidden" name="order_id" value={order.id} />
                              <input
                                type="hidden"
                                name="location_id"
                                value={order.location_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="quote_id"
                                value={order.quote_id ?? ""}
                              />
                              <input
                                type="hidden"
                                name="install_target_date"
                                value={order.install_target_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_target_date"
                                value={order.activation_target_date ?? ""}
                              />
                              <input
                                name="notes"
                                defaultValue={order.notes ?? ""}
                                placeholder="Order notes"
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "6px 10px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 600,
                                textTransform: "capitalize",
                                ...badge,
                              }}
                            >
                              {order.status ?? "—"}
                            </span>
                          </td>

                          <td style={bodyCell}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {order.status !== "scheduled" &&
                              order.status !== "activated" &&
                              order.status !== "cancelled" ? (
                                <form action={updateOrderStatus}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="current_status" value={currentStatus} />
                                  <input type="hidden" name="next_status" value="scheduled" />
                                  <button style={actionButton} type="submit">
                                    Schedule
                                  </button>
                                </form>
                              ) : null}

                              {order.status !== "installing" &&
                              order.status !== "activated" &&
                              order.status !== "cancelled" ? (
                                <form action={updateOrderStatus}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="current_status" value={currentStatus} />
                                  <input type="hidden" name="next_status" value="installing" />
                                  <button style={actionButton} type="submit">
                                    Installing
                                  </button>
                                </form>
                              ) : null}

                              {order.status !== "activated" && order.status !== "cancelled" ? (
                                <form action={updateOrderStatus}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="current_status" value={currentStatus} />
                                  <input type="hidden" name="next_status" value="activated" />
                                  <button style={actionButtonGold} type="submit">
                                    Activate
                                  </button>
                                </form>
                              ) : null}

                              {order.status !== "cancelled" && order.status !== "activated" ? (
                                <form action={updateOrderStatus}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="current_status" value={currentStatus} />
                                  <input type="hidden" name="next_status" value="cancelled" />
                                  <button style={actionButtonDanger} type="submit">
                                    Cancel
                                  </button>
                                </form>
                              ) : null}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            {rowScheduled.length ? (
                              <div style={{ display: "grid", gap: "8px" }}>
                                {rowScheduled.map((item) => (
                                  <div
                                    key={item.id}
                                    style={{
                                      border: "1px solid rgba(255,255,255,0.1)",
                                      background: "rgba(255,255,255,0.04)",
                                      borderRadius: "12px",
                                      padding: "10px 12px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "#fff2c4",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {item.action_type} → {item.target_status ?? "—"}
                                      </div>
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          padding: "4px 8px",
                                          borderRadius: "999px",
                                          fontSize: "11px",
                                          fontWeight: 600,
                                          textTransform: "capitalize",
                                          ...getScheduledActionBadge(item.status),
                                        }}
                                      >
                                        {item.status ?? "—"}
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "rgba(255,255,255,0.68)",
                                        marginTop: "4px",
                                      }}
                                    >
                                      {item.effective_date}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "rgba(255,255,255,0.52)",
                                        marginTop: "4px",
                                      }}
                                    >
                                      {item.reason ?? "No reason"}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.52)", fontSize: "13px" }}>
                                No scheduled actions
                              </span>
                            )}
                          </td>

                          <td style={bodyCell}>
                            {order.status !== "cancelled" ? (
                              <div style={{ display: "grid", gap: "10px", minWidth: "320px" }}>
                                <form action={scheduleOrderAction} style={futureActionForm}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="action_type" value="schedule_install" />
                                  <input type="hidden" name="target_status" value="scheduled" />
                                  <input
                                    type="date"
                                    name="effective_date"
                                    required
                                    style={dateInput}
                                  />
                                  <input
                                    name="reason"
                                    placeholder="Install reason"
                                    style={textInput}
                                  />
                                  <button style={actionButton} type="submit">
                                    Schedule Install
                                  </button>
                                </form>

                                <form action={scheduleOrderAction} style={futureActionForm}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="action_type" value="activate" />
                                  <input type="hidden" name="target_status" value="activated" />
                                  <input
                                    type="date"
                                    name="effective_date"
                                    required
                                    style={dateInput}
                                  />
                                  <input
                                    name="reason"
                                    placeholder="Activation reason"
                                    style={textInput}
                                  />
                                  <button style={actionButtonGold} type="submit">
                                    Schedule Activate
                                  </button>
                                </form>

                                <form action={scheduleOrderAction} style={futureActionForm}>
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="location_label" value={currentLocationLabel} />
                                  <input type="hidden" name="action_type" value="cancel" />
                                  <input type="hidden" name="target_status" value="cancelled" />
                                  <input
                                    type="date"
                                    name="effective_date"
                                    required
                                    style={dateInput}
                                  />
                                  <input
                                    name="reason"
                                    placeholder="Cancellation reason"
                                    style={textInput}
                                  />
                                  <button style={actionButtonDanger} type="submit">
                                    Schedule Cancel
                                  </button>
                                </form>
                              </div>
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.52)", fontSize: "13px" }}>
                                Final state
                              </span>
                            )}
                          </td>

                          <td style={bodyCell}>
                            <form action={updateOrderDetails} style={{ display: "grid", gap: "8px", minWidth: "220px" }}>
                              <input type="hidden" name="order_id" value={order.id} />
                              <select
                                name="location_id"
                                defaultValue={order.location_id ?? ""}
                                style={textInput}
                              >
                                <option value="">Select Location</option>
                                {locationOptions
                                  .filter((location) => location.account_id === order.account_id)
                                  .map((location) => (
                                    <option key={location.id} value={location.id}>
                                      {getLocationLabel(location)}
                                    </option>
                                  ))}
                              </select>
                              <select
                                name="quote_id"
                                defaultValue={order.quote_id ?? ""}
                                style={textInput}
                              >
                                <option value="">Optional Quote</option>
                                {quoteOptions
                                  .filter((quote) => quote.account_id === order.account_id)
                                  .map((quote) => (
                                    <option key={quote.id} value={quote.id}>
                                      {quote.quote_number}
                                    </option>
                                  ))}
                              </select>
                              <input
                                name="install_target_date"
                                defaultValue={order.install_target_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                              <input
                                name="activation_target_date"
                                defaultValue={order.activation_target_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                              <input
                                name="notes"
                                defaultValue={order.notes ?? ""}
                                placeholder="Order notes"
                                style={textInput}
                              />
                              <button style={actionButtonGold} type="submit">
                                Save Details
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={14}>
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const headerCell: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.62)",
};

const bodyCell: React.CSSProperties = {
  padding: "16px",
  fontSize: "14px",
  color: "#f5f5f5",
  verticalAlign: "top",
};

const actionButton: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  color: "#f5f5f5",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
};

const actionButtonGold: React.CSSProperties = {
  background: "rgba(212, 175, 55, 0.18)",
  color: "#fff2c4",
  border: "1px solid rgba(212, 175, 55, 0.35)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
};

const actionButtonDanger: React.CSSProperties = {
  background: "rgba(255, 99, 71, 0.12)",
  color: "#ffb09a",
  border: "1px solid rgba(255, 99, 71, 0.28)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
};

const dateInput: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "12px",
  minWidth: "120px",
};

const textInput: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "12px",
  minWidth: "150px",
};

const futureActionForm: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  alignItems: "center",
};