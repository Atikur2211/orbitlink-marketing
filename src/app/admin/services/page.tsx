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
  order_id?: string | null;
  location_id?: string | null;
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

type AccountOption = {
  id: string;
  account_name: string;
};

type OrderOption = {
  id: string;
  order_number: string;
  account_id: string;
};

type LocationOption = {
  id: string;
  location_name: string | null;
  account_id: string;
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

function getScheduledActionBadge(status: string | null): React.CSSProperties {
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
        color: "#ffb29b",
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

function getScheduledEventMeta(actionType: string) {
  switch (actionType) {
    case "suspend":
      return {
        event_type: "service_suspend_scheduled",
        event_label: "Service suspend scheduled",
      };
    case "terminate":
      return {
        event_type: "service_termination_scheduled",
        event_label: "Service termination scheduled",
      };
    case "activate":
      return {
        event_type: "service_activation_scheduled",
        event_label: "Service activation scheduled",
      };
    default:
      return {
        event_type: "service_action_scheduled",
        event_label: "Service action scheduled",
      };
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

  async function createService(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const serviceName = String(formData.get("service_name") ?? "").trim();
    const serviceType = String(formData.get("service_type") ?? "").trim();
    const carrier = String(formData.get("carrier") ?? "").trim();
    const accountId = String(formData.get("account_id") ?? "");
    const orderId = String(formData.get("order_id") ?? "");
    const locationId = String(formData.get("location_id") ?? "");
    const activationDate = String(formData.get("activation_date") ?? "");
    const billingStartDate = String(formData.get("billing_start_date") ?? "");

    if (!serviceName || !serviceType || !accountId) return;

    const { data: service, error } = await supabase
      .from("service_instances")
      .insert({
        service_name: serviceName,
        service_type: serviceType,
        carrier: carrier || null,
        account_id: accountId,
        order_id: orderId || null,
        location_id: locationId || null,
        activation_date: activationDate || null,
        billing_start_date: billingStartDate || null,
        status: "pending",
      })
      .select("id, service_name, service_type, carrier, status, activation_date, billing_start_date")
      .single();

    if (error || !service) {
      console.error("Failed to create service:", error?.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "service",
      entity_id: service.id,
      event_type: "service_created",
      event_label: "Service created",
      notes: `Service created: ${service.service_name}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "service",
      entity_id: service.id,
      action: "create",
      after_state: {
        service_name: service.service_name,
        service_type: service.service_type,
        carrier: service.carrier,
        status: service.status,
        activation_date: service.activation_date,
        billing_start_date: service.billing_start_date,
      },
      source_interface: "admin_services_create",
    });

    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateServiceDetails(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const serviceId = String(formData.get("service_id") ?? "");
    const serviceName = String(formData.get("service_name") ?? "").trim();
    const serviceType = String(formData.get("service_type") ?? "").trim();
    const carrier = String(formData.get("carrier") ?? "").trim();
    const activationDate = String(formData.get("activation_date") ?? "");
    const billingStartDate = String(formData.get("billing_start_date") ?? "");

    if (!serviceId || !serviceName || !serviceType) return;

    const { data: before, error: beforeError } = await supabase
      .from("service_instances")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (beforeError || !before) {
      console.error("Failed loading service before update:", beforeError?.message);
      return;
    }

    const beforeState = {
      service_name: before.service_name,
      service_type: before.service_type,
      carrier: before.carrier,
      activation_date: before.activation_date,
      billing_start_date: before.billing_start_date,
    };

    const afterState = {
      service_name: serviceName,
      service_type: serviceType,
      carrier: carrier || null,
      activation_date: activationDate || null,
      billing_start_date: billingStartDate || null,
    };

    const noChanges =
      beforeState.service_name === afterState.service_name &&
      beforeState.service_type === afterState.service_type &&
      beforeState.carrier === afterState.carrier &&
      beforeState.activation_date === afterState.activation_date &&
      beforeState.billing_start_date === afterState.billing_start_date;

    if (noChanges) return;

    const { error } = await supabase
      .from("service_instances")
      .update(afterState)
      .eq("id", serviceId);

    if (error) {
      console.error("Failed updating service details:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: before.account_id,
      entity_type: "service",
      entity_id: serviceId,
      event_type: "service_updated",
      event_label: "Service updated",
      notes: `Service details updated: ${serviceName}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "service",
      entity_id: serviceId,
      action: "update",
      before_state: beforeState,
      after_state: afterState,
      source_interface: "admin_services_edit",
    });

    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateServiceStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const serviceId = String(formData.get("service_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const serviceName = String(formData.get("service_name") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!serviceId || !nextStatus) return;
    if (currentStatus === nextStatus) return;

    const { error } = await supabase
      .from("service_instances")
      .update({ status: nextStatus })
      .eq("id", serviceId);

    if (error) {
      console.error("Error updating service status:", error.message);
      return;
    }

    const meta = getEventMeta(nextStatus);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "service",
      entity_id: serviceId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `${serviceName} status changed from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "service",
      entity_id: serviceId,
      action: "status_change",
      before_state: { status: currentStatus || null },
      after_state: { status: nextStatus },
      source_interface: "admin_services_status",
    });

    if (nextStatus === "degraded" || nextStatus === "suspended") {
      const incidentType = nextStatus === "degraded" ? "degradation" : "outage";

      const { data: incident } = await (supabase as any)
        .from("incidents")
        .insert({
          title: `Service Issue: ${serviceName}`,
          incident_type: incidentType,
          severity: "medium",
          status: "open",
          summary: `${serviceName} moved to ${nextStatus}.`,
          notes: "Auto-created from service status change",
        })
        .select("id")
        .single();

      if (incident?.id) {
        await supabase.from("incident_impacts").insert({
          incident_id: incident.id,
          impact_type: "service",
          status: "active",
          service_instance_id: serviceId,
        });
      }
    }

    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/incidents");
    revalidatePath("/admin/noc");
  }

  async function scheduleServiceAction(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const serviceId = String(formData.get("service_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const serviceName = String(formData.get("service_name") ?? "");
    const actionType = String(formData.get("action_type") ?? "");
    const targetStatus = String(formData.get("target_status") ?? "");
    const effectiveDate = String(formData.get("effective_date") ?? "");
    const reason = String(formData.get("reason") ?? "").trim();

    if (!serviceId || !accountId || !actionType || !targetStatus || !effectiveDate) return;

    const { data: existingDuplicate } = await supabase
      .from("scheduled_actions")
      .select("id")
      .eq("entity_type", "service")
      .eq("entity_id", serviceId)
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
        entity_type: "service",
        entity_id: serviceId,
        action_type: actionType,
        target_status: targetStatus,
        effective_date: effectiveDate,
        reason: reason || `${actionType} scheduled via admin`,
        status: "scheduled",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error scheduling service action:", error.message);
      return;
    }

    const meta = getScheduledEventMeta(actionType);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "service",
      entity_id: serviceId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `${serviceName} scheduled to ${actionType} (${targetStatus}) on ${effectiveDate}. Reason: ${reason || "No reason provided"}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "service",
      entity_id: serviceId,
      action: "create",
      after_state: {
        scheduled_action_id: scheduledAction?.id ?? null,
        action_type: actionType,
        target_status: targetStatus,
        effective_date: effectiveDate,
        reason: reason || `${actionType} scheduled via admin`,
      },
      source_interface: "admin_services_schedule_action",
    });

    revalidatePath("/admin/services");
    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/dashboard");
  }

  const [
    { data: servicesData, error },
    { data: scheduledData },
    { data: accountsData },
    { data: ordersData },
    { data: locationsData },
  ] = await Promise.all([
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
        order_id,
        location_id,
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
      .order("effective_date", { ascending: true }),
    supabase
      .from("accounts")
      .select("id, account_name")
      .neq("status", "archived")
      .order("account_name", { ascending: true }),
    supabase
      .from("orders")
      .select("id, order_number, account_id")
      .neq("status", "cancelled")
      .order("order_number", { ascending: true }),
    supabase
      .from("locations")
      .select("id, location_name, account_id")
      .order("location_name", { ascending: true }),
  ]);

  const serviceList = (servicesData as ServiceInstance[] | null) ?? [];
  const scheduledActions = (scheduledData as ScheduledAction[] | null) ?? [];
  const accountOptions = (accountsData as AccountOption[] | null) ?? [];
  const orderOptions = (ordersData as OrderOption[] | null) ?? [];
  const locationOptions = (locationsData as LocationOption[] | null) ?? [];

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
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
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
              maxWidth: "900px",
              lineHeight: 1.65,
            }}
          >
            Create services, manage live customer connectivity, edit operational
            details, apply immediate service changes, and control future-dated
            service actions from one premium operator-grade surface.
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
              Create Service
            </h2>
          </div>

          <div style={{ padding: "20px 22px" }}>
            <form action={createService} style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  name="service_name"
                  placeholder="Service Name"
                  required
                  style={textInput}
                />
                <input
                  name="service_type"
                  placeholder="Service Type"
                  required
                  style={textInput}
                />
                <input
                  name="carrier"
                  placeholder="Carrier"
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
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <select name="order_id" style={textInput}>
                  <option value="">Optional Order</option>
                  {orderOptions.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.order_number}
                    </option>
                  ))}
                </select>

                <select name="location_id" style={textInput}>
                  <option value="">Optional Location</option>
                  {locationOptions.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location_name ?? "Unnamed location"}
                    </option>
                  ))}
                </select>

                <input
                  name="activation_date"
                  type="date"
                  style={dateInput}
                />

                <input
                  name="billing_start_date"
                  type="date"
                  style={dateInput}
                />
              </div>

              <div>
                <button style={actionButtonGold} type="submit">
                  Create Service
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
                  minWidth: "2050px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      textAlign: "left",
                    }}
                  >
                    <th style={headerCell}>Service Name</th>
                    <th style={headerCell}>Service Type</th>
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
                    <th style={headerCell}>Save Details</th>
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
                      const currentStatus = service.status ?? "pending";

                      return (
                        <tr
                          key={service.id}
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <td style={bodyCell}>
                            <form action={updateServiceDetails}>
                              <input type="hidden" name="service_id" value={service.id} />
                              <input
                                type="hidden"
                                name="service_type"
                                value={service.service_type}
                              />
                              <input
                                type="hidden"
                                name="carrier"
                                value={service.carrier ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_date"
                                value={service.activation_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="billing_start_date"
                                value={service.billing_start_date ?? ""}
                              />
                              <input
                                name="service_name"
                                defaultValue={service.service_name}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateServiceDetails}>
                              <input type="hidden" name="service_id" value={service.id} />
                              <input
                                type="hidden"
                                name="service_name"
                                value={service.service_name}
                              />
                              <input
                                type="hidden"
                                name="carrier"
                                value={service.carrier ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_date"
                                value={service.activation_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="billing_start_date"
                                value={service.billing_start_date ?? ""}
                              />
                              <input
                                name="service_type"
                                defaultValue={service.service_type}
                                style={textInput}
                              />
                            </form>
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

                          <td style={bodyCell}>
                            <form action={updateServiceDetails}>
                              <input type="hidden" name="service_id" value={service.id} />
                              <input
                                type="hidden"
                                name="service_name"
                                value={service.service_name}
                              />
                              <input
                                type="hidden"
                                name="service_type"
                                value={service.service_type}
                              />
                              <input
                                type="hidden"
                                name="activation_date"
                                value={service.activation_date ?? ""}
                              />
                              <input
                                type="hidden"
                                name="billing_start_date"
                                value={service.billing_start_date ?? ""}
                              />
                              <input
                                name="carrier"
                                defaultValue={service.carrier ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateServiceDetails}>
                              <input type="hidden" name="service_id" value={service.id} />
                              <input
                                type="hidden"
                                name="service_name"
                                value={service.service_name}
                              />
                              <input
                                type="hidden"
                                name="service_type"
                                value={service.service_type}
                              />
                              <input
                                type="hidden"
                                name="carrier"
                                value={service.carrier ?? ""}
                              />
                              <input
                                type="hidden"
                                name="billing_start_date"
                                value={service.billing_start_date ?? ""}
                              />
                              <input
                                name="activation_date"
                                defaultValue={service.activation_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateServiceDetails}>
                              <input type="hidden" name="service_id" value={service.id} />
                              <input
                                type="hidden"
                                name="service_name"
                                value={service.service_name}
                              />
                              <input
                                type="hidden"
                                name="service_type"
                                value={service.service_type}
                              />
                              <input
                                type="hidden"
                                name="carrier"
                                value={service.carrier ?? ""}
                              />
                              <input
                                type="hidden"
                                name="activation_date"
                                value={service.activation_date ?? ""}
                              />
                              <input
                                name="billing_start_date"
                                defaultValue={service.billing_start_date ?? ""}
                                type="date"
                                style={dateInput}
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
                                    <input type="hidden" name="current_status" value={currentStatus} />
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
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div style={{ fontSize: "12px", color: "#fff2c4", fontWeight: 600 }}>
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
                            <div style={{ display: "grid", gap: "10px", minWidth: "320px" }}>
                              {service.status !== "terminated" ? (
                                <form action={scheduleServiceAction} style={futureActionForm}>
                                  <input type="hidden" name="service_id" value={service.id} />
                                  <input type="hidden" name="account_id" value={service.account_id} />
                                  <input type="hidden" name="service_name" value={service.service_name} />
                                  <input type="hidden" name="action_type" value="suspend" />
                                  <input type="hidden" name="target_status" value="suspended" />
                                  <input type="date" name="effective_date" required style={dateInput} />
                                  <input name="reason" placeholder="Suspend reason" style={textInput} />
                                  <button style={actionButton} type="submit">
                                    Schedule Suspend
                                  </button>
                                </form>
                              ) : null}

                              <form action={scheduleServiceAction} style={futureActionForm}>
                                <input type="hidden" name="service_id" value={service.id} />
                                <input type="hidden" name="account_id" value={service.account_id} />
                                <input type="hidden" name="service_name" value={service.service_name} />
                                <input type="hidden" name="action_type" value="terminate" />
                                <input type="hidden" name="target_status" value="terminated" />
                                <input type="date" name="effective_date" required style={dateInput} />
                                <input name="reason" placeholder="Termination reason" style={textInput} />
                                <button style={actionButtonDanger} type="submit">
                                  Schedule Terminate
                                </button>
                              </form>

                              {service.status !== "active" ? (
                                <form action={scheduleServiceAction} style={futureActionForm}>
                                  <input type="hidden" name="service_id" value={service.id} />
                                  <input type="hidden" name="account_id" value={service.account_id} />
                                  <input type="hidden" name="service_name" value={service.service_name} />
                                  <input type="hidden" name="action_type" value="activate" />
                                  <input type="hidden" name="target_status" value="active" />
                                  <input type="date" name="effective_date" required style={dateInput} />
                                  <input name="reason" placeholder="Activation reason" style={textInput} />
                                  <button style={actionButtonGold} type="submit">
                                    Schedule Activate
                                  </button>
                                </form>
                              ) : null}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateServiceDetails} style={{ display: "grid", gap: "8px", minWidth: "180px" }}>
                              <input type="hidden" name="service_id" value={service.id} />
                              <input
                                name="service_name"
                                defaultValue={service.service_name}
                                style={textInput}
                              />
                              <input
                                name="service_type"
                                defaultValue={service.service_type}
                                style={textInput}
                              />
                              <input
                                name="carrier"
                                defaultValue={service.carrier ?? ""}
                                style={textInput}
                              />
                              <input
                                name="activation_date"
                                defaultValue={service.activation_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                              <input
                                name="billing_start_date"
                                defaultValue={service.billing_start_date ?? ""}
                                type="date"
                                style={dateInput}
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
                      <td style={bodyCell} colSpan={13}>
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