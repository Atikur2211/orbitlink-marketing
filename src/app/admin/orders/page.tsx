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
    default:
      return {
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
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

export default async function AdminOrdersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function updateOrderStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const orderId = formData.get("order_id") as string;
    const accountId = formData.get("account_id") as string;
    const orderNumber = formData.get("order_number") as string;
    const nextStatus = formData.get("next_status") as string;

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
      notes: `Order ${orderNumber} status changed to ${nextStatus}.`,
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

    const orderId = formData.get("order_id") as string;
    const accountId = formData.get("account_id") as string;
    const orderNumber = formData.get("order_number") as string;
    const actionType = formData.get("action_type") as string;
    const targetStatus = formData.get("target_status") as string;
    const effectiveDate = formData.get("effective_date") as string;

    if (!effectiveDate) return;

    const { error } = await supabase.from("scheduled_actions").insert({
      account_id: accountId,
      entity_type: "order",
      entity_id: orderId,
      action_type: actionType,
      target_status: targetStatus,
      effective_date: effectiveDate,
      reason: `${actionType} scheduled via admin`,
      status: "scheduled",
    });

    if (error) {
      console.error(error);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "order",
      entity_id: orderId,
      event_type: `order_${actionType}_scheduled`,
      event_label: `Order ${actionType} scheduled`,
      notes: `${orderNumber} scheduled to ${actionType} on ${effectiveDate}.`,
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/lifecycle");
  }

  const [{ data: ordersData, error }, { data: scheduledData }] = await Promise.all([
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
      .eq("status", "scheduled")
      .order("effective_date", { ascending: true }),
  ]);

  const orderList = (ordersData as Order[] | null) ?? [];
  const scheduledActions = (scheduledData as ScheduledAction[] | null) ?? [];

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
      <div style={{ maxWidth: "1480px", margin: "0 auto" }}>
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
              maxWidth: "760px",
              lineHeight: 1.6,
            }}
          >
            Track install progression, activation readiness, immediate workflow changes,
            and future-dated order actions from one premium operator surface.
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
                  minWidth: "1550px",
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
                    <th style={headerCell}>Install Target</th>
                    <th style={headerCell}>Activation Target</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Immediate Actions</th>
                    <th style={headerCell}>Scheduled Actions</th>
                    <th style={headerCell}>Add Future Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orderList.length ? (
                    orderList.map((order) => {
                      const badge = getStatusStyles(order.status);
                      const rowScheduled = scheduledActions.filter(
                        (item) => item.entity_id === order.id
                      );

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
                            <div style={{ color: "rgba(255,255,255,0.58)", marginTop: "4px" }}>
                              {order.notes ?? "—"}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            {order.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {order.locations?.[0]?.location_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {order.quotes?.[0]?.quote_number ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {order.install_target_date ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {order.activation_target_date ?? "—"}
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
                                    <div style={{ fontSize: "12px", color: "#fff2c4", fontWeight: 600 }}>
                                      {item.action_type} → {item.target_status ?? "—"}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.68)", marginTop: "4px" }}>
                                      {item.effective_date}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.52)", marginTop: "4px" }}>
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
                            <div style={{ display: "grid", gap: "8px", minWidth: "250px" }}>
                              {order.status !== "cancelled" ? (
                                <form
                                  action={scheduleOrderAction}
                                  style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                                >
                                  <input type="hidden" name="order_id" value={order.id} />
                                  <input type="hidden" name="account_id" value={order.account_id} />
                                  <input type="hidden" name="order_number" value={order.order_number} />
                                  <input type="hidden" name="action_type" value="cancel" />
                                  <input type="hidden" name="target_status" value="cancelled" />
                                  <input type="date" name="effective_date" required style={dateInput} />
                                  <button style={actionButtonDanger} type="submit">
                                    Schedule Cancel
                                  </button>
                                </form>
                              ) : (
                                <span style={{ color: "rgba(255,255,255,0.52)", fontSize: "13px" }}>
                                  Final state
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={10}>
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
};