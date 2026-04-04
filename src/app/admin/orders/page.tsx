import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

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

function getLocationLabel(location: LocationOption | null | undefined) {
  if (!location) return "—";
  const name = location.location_name?.trim();
  const city = location.city?.trim();
  if (name && city) return `${name} · ${city}`;
  if (name) return name;
  if (city) return `${location.address_line_1} · ${city}`;
  return location.address_line_1;
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

    const { data: location } = await supabase
      .from("locations")
      .select("id, location_name, address_line_1, city")
      .eq("id", locationId)
      .single();

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

    const locationLabel =
      location?.location_name || location?.address_line_1 || "selected site";

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
      .select("id, location_name, address_line_1")
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
      location?.location_name || location?.address_line_1 || "selected site";

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

    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      return;
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