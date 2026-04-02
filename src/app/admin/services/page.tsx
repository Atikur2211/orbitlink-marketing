import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type ServiceInstance = {
  id: string;
  service_name: string;
  service_type: string;
  carrier: string | null;
  status: string | null;
  activation_date: string | null;
  billing_start_date: string | null;
  account_id: string;
  accounts: { account_name: string }[] | null;
  locations: { location_name: string | null }[] | null;
  orders: { order_number: string }[] | null;
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

function getStatusStyles(status: string | null): React.CSSProperties {
  switch (status) {
    case "active":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "suspended":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "terminated":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "degraded":
      return {
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        color: "#f3f3f3",
      };
    case "pending":
      return {
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
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

function getEventMeta(nextStatus: string) {
  switch (nextStatus) {
    case "active":
      return { event_type: "service_activated", event_label: "Service activated" };
    case "suspended":
      return { event_type: "service_suspended", event_label: "Service suspended" };
    case "terminated":
      return { event_type: "service_terminated", event_label: "Service terminated" };
    case "degraded":
      return { event_type: "service_degraded", event_label: "Service degraded" };
    default:
      return { event_type: "service_updated", event_label: "Service updated" };
  }
}

function getAvailableActions(status: string | null) {
  switch (status) {
    case "active":
      return ["degraded", "suspended", "terminated"];
    case "suspended":
      return ["active", "terminated"];
    case "degraded":
      return ["active", "suspended", "terminated"];
    case "terminated":
      return ["active"];
    case "pending":
      return ["active", "terminated"];
    default:
      return ["active"];
  }
}

function getActionLabel(nextStatus: string) {
  switch (nextStatus) {
    case "active":
      return "Activate";
    case "suspended":
      return "Suspend";
    case "terminated":
      return "Terminate";
    case "degraded":
      return "Degrade";
    default:
      return "Update";
  }
}

function getActionStyle(nextStatus: string): React.CSSProperties {
  switch (nextStatus) {
    case "active":
      return actionButtonGold;
    case "terminated":
      return actionButtonDanger;
    default:
      return actionButton;
  }
}

export default async function AdminServicesPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function updateServiceStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const serviceId = formData.get("service_id") as string;
    const accountId = formData.get("account_id") as string;
    const serviceName = formData.get("service_name") as string;
    const nextStatus = formData.get("next_status") as string;

    const { error } = await supabase
      .from("service_instances")
      .update({ status: nextStatus })
      .eq("id", serviceId);

    if (error) {
      console.error("Error updating service status:", error);
      return;
    }

    const meta = getEventMeta(nextStatus);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "service",
      entity_id: serviceId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `${serviceName} status changed to ${nextStatus}.`,
    });

    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/scheduled-actions");
  }

  async function scheduleServiceAction(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const serviceId = formData.get("service_id") as string;
    const accountId = formData.get("account_id") as string;
    const serviceName = formData.get("service_name") as string;
    const actionType = formData.get("action_type") as string;
    const targetStatus = formData.get("target_status") as string;
    const effectiveDate = formData.get("effective_date") as string;

    if (!effectiveDate) return;

    const { error } = await supabase.from("scheduled_actions").insert({
      account_id: accountId,
      entity_type: "service",
      entity_id: serviceId,
      action_type: actionType,
      target_status: targetStatus,
      effective_date: effectiveDate,
      reason: `${actionType} scheduled via admin`,
      status: "scheduled",
    });

    if (error) {
      console.error("Error scheduling service action:", error);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "service",
      entity_id: serviceId,
      event_type: `service_${actionType}_scheduled`,
      event_label: `Service ${actionType} scheduled`,
      notes: `${serviceName} scheduled to ${actionType} on ${effectiveDate}.`,
    });

    revalidatePath("/admin/services");
    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/lifecycle");
  }

  const [{ data: servicesData, error }, { data: scheduledData }] = await Promise.all([
    supabase
      .from("service_instances")
      .select(`
        id,
        service_name,
        service_type,
        carrier,
        status,
        activation_date,
        billing_start_date,
        account_id,
        accounts ( account_name ),
        locations ( location_name ),
        orders ( order_number )
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
      .eq("entity_type", "service")
      .eq("status", "scheduled")
      .order("effective_date", { ascending: true }),
  ]);

  const serviceList = (servicesData as ServiceInstance[] | null) ?? [];
  const scheduledActions = (scheduledData as ScheduledAction[] | null) ?? [];

  const totalServices = serviceList.length;
  const activeServices = serviceList.filter((service) => service.status === "active").length;
  const suspendedServices = serviceList.filter((service) => service.status === "suspended").length;
  const degradedServices = serviceList.filter((service) => service.status === "degraded").length;
  const terminatedServices = serviceList.filter((service) => service.status === "terminated").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.08) 0%, rgba(10,10,10,1) 28%), linear-gradient(180deg, #080808 0%, #111111 48%, #161616 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1480px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "28px",
            padding: "30px",
            borderRadius: "28px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.10) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.38)",
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
              fontSize: "38px",
              fontWeight: 700,
              margin: "0 0 10px 0",
              color: "#fff7db",
            }}
          >
            Service Control
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: "860px",
              lineHeight: 1.65,
            }}
          >
            Manage live customer connectivity, monitor operational state, apply
            immediate service changes, and review future-dated service actions from
            one premium operator-grade interface.
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "Total Services", value: totalServices },
            { label: "Active", value: activeServices },
            { label: "Suspended", value: suspendedServices },
            { label: "Degraded", value: degradedServices },
            { label: "Terminated", value: terminatedServices },
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
            <p style={{ margin: 0, color: "#ffb29b" }}>
              Error loading services: {error.message}
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
                Live Service Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1680px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      textAlign: "left",
                    }}
                  >
                    <th style={headerCell}>Service</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Location</th>
                    <th style={headerCell}>Order</th>
                    <th style={headerCell}>Carrier</th>
                    <th style={headerCell}>Activated</th>
                    <th style={headerCell}>Billing Start</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Immediate Actions</th>
                    <th style={headerCell}>Scheduled Actions</th>
                    <th style={headerCell}>Add Future Action</th>
                  </tr>
                </thead>

                <tbody>
                  {serviceList.length ? (
                    serviceList.map((service) => {
                      const badge = getStatusStyles(service.status);
                      const actions = getAvailableActions(service.status);
                      const rowScheduled = scheduledActions.filter(
                        (item) => item.entity_id === service.id
                      );

                      return (
                        <tr
                          key={service.id}
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <td style={bodyCell}>
                            <div style={{ fontWeight: 600, color: "#fff7db" }}>
                              {service.service_name}
                            </div>
                            <div style={{ color: "rgba(255,255,255,0.58)", marginTop: "4px" }}>
                              {service.service_type}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            {service.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {service.locations?.[0]?.location_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {service.orders?.[0]?.order_number ?? "—"}
                          </td>

                          <td style={bodyCell}>{service.carrier ?? "—"}</td>

                          <td style={bodyCell}>{service.activation_date ?? "—"}</td>

                          <td style={bodyCell}>{service.billing_start_date ?? "—"}</td>

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
                              {service.status ?? "—"}
                            </span>
                          </td>

                          <td style={bodyCell}>
                            {actions.length ? (
                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {actions.map((nextStatus) => (
                                  <form key={nextStatus} action={updateServiceStatus}>
                                    <input type="hidden" name="service_id" value={service.id} />
                                    <input type="hidden" name="account_id" value={service.account_id} />
                                    <input type="hidden" name="service_name" value={service.service_name} />
                                    <input type="hidden" name="next_status" value={nextStatus} />
                                    <button style={getActionStyle(nextStatus)} type="submit">
                                      {getActionLabel(nextStatus)}
                                    </button>
                                  </form>
                                ))}
                              </div>
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.52)", fontSize: "13px" }}>
                                No actions available
                              </span>
                            )}
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
                            <div style={{ display: "grid", gap: "8px", minWidth: "260px" }}>
                              <form
                                action={scheduleServiceAction}
                                style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}
                              >
                                <input type="hidden" name="service_id" value={service.id} />
                                <input type="hidden" name="account_id" value={service.account_id} />
                                <input type="hidden" name="service_name" value={service.service_name} />
                                <input type="hidden" name="action_type" value="terminate" />
                                <input type="hidden" name="target_status" value="terminated" />
                                <input type="date" name="effective_date" required style={dateInput} />
                                <button style={actionButtonDanger} type="submit">
                                  Schedule Terminate
                                </button>
                              </form>

                              {service.status !== "terminated" ? (
                                <form
                                  action={scheduleServiceAction}
                                  style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}
                                >
                                  <input type="hidden" name="service_id" value={service.id} />
                                  <input type="hidden" name="account_id" value={service.account_id} />
                                  <input type="hidden" name="service_name" value={service.service_name} />
                                  <input type="hidden" name="action_type" value="suspend" />
                                  <input type="hidden" name="target_status" value="suspended" />
                                  <input type="date" name="effective_date" required style={dateInput} />
                                  <button style={actionButton} type="submit">
                                    Schedule Suspend
                                  </button>
                                </form>
                              ) : (
                                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.52)" }}>
                                  Suspended scheduling hidden for terminated state
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={11}>
                        No services found.
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
  color: "#ffb29b",
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