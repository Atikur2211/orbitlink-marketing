import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type Ticket = {
  id: string;
  subject: string | null;
  category: string | null;
  priority: string | null;
  status: string | null;
  created_at: string | null;
  account_id: string;
  location_id: string | null;
  service_instance_id: string | null;
  incident_id: string | null;
  accounts: { account_name: string }[] | null;
  locations: { location_name: string | null }[] | null;
  service_instances: { service_name: string }[] | null;
};

type AccountOption = {
  id: string;
  account_name: string;
};

type LocationOption = {
  id: string;
  location_name: string | null;
  account_id: string;
};

type ServiceOption = {
  id: string;
  service_name: string;
  account_id: string;
};

type IncidentOption = {
  id: string;
  title: string;
  status: string | null;
};

function getStatusStyles(status: string | null): React.CSSProperties {
  switch (status) {
    case "new":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f5f5f5",
      };
    case "open":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "waiting_customer":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "escalated":
      return {
        background: "rgba(255, 99, 71, 0.10)",
        border: "1px solid rgba(255, 99, 71, 0.22)",
        color: "#ffb29b",
      };
    case "resolved":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#fff2c4",
      };
    case "closed":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
    default:
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
  }
}

function getPriorityStyles(priority: string | null): React.CSSProperties {
  switch (priority) {
    case "critical":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "high":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "medium":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f5f5f5",
      };
    case "low":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
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
    case "open":
      return { event_type: "ticket_opened", event_label: "Ticket opened" };
    case "waiting_customer":
      return {
        event_type: "ticket_waiting_customer",
        event_label: "Ticket waiting for customer",
      };
    case "escalated":
      return { event_type: "ticket_escalated", event_label: "Ticket escalated" };
    case "resolved":
      return { event_type: "ticket_resolved", event_label: "Ticket resolved" };
    case "closed":
      return { event_type: "ticket_closed", event_label: "Ticket closed" };
    default:
      return { event_type: "ticket_updated", event_label: "Ticket updated" };
  }
}

function getAvailableActions(currentStatus: string) {
  if (currentStatus === "new") return ["open", "escalated", "closed"];
  if (currentStatus === "open") return ["waiting_customer", "escalated", "resolved", "closed"];
  if (currentStatus === "waiting_customer") return ["open", "resolved", "closed"];
  if (currentStatus === "escalated") return ["open", "resolved", "closed"];
  if (currentStatus === "resolved") return ["closed", "open"];
  return ["open"];
}

export default async function AdminSupportPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function createTicket(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const subject = String(formData.get("subject") ?? "").trim();
    const accountId = String(formData.get("account_id") ?? "");
    const locationId = String(formData.get("location_id") ?? "");
    const serviceInstanceId = String(formData.get("service_instance_id") ?? "");
    const incidentId = String(formData.get("incident_id") ?? "");
    const category = String(formData.get("category") ?? "").trim();
    const priority = String(formData.get("priority") ?? "").trim();

    if (!subject || !accountId) return;

    const { data: ticket, error } = await supabase
      .from("tickets")
      .insert({
        subject,
        account_id: accountId,
        location_id: locationId || null,
        service_instance_id: serviceInstanceId || null,
        incident_id: incidentId || null,
        category: category || null,
        priority: priority || "medium",
        status: "new",
      })
      .select("id, subject, status, category, priority")
      .single();

    if (error || !ticket) {
      console.error("Failed to create ticket:", error?.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "ticket",
      entity_id: ticket.id,
      event_type: "ticket_opened",
      event_label: "Ticket opened",
      notes: `Ticket created: ${ticket.subject}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "ticket",
      entity_id: ticket.id,
      action: "create",
      after_state: {
        subject: ticket.subject,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        incident_id: incidentId || null,
      },
      source_interface: "admin_support_create",
    });

    revalidatePath("/admin/support");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/noc");
  }

  async function updateTicketDetails(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const ticketId = String(formData.get("ticket_id") ?? "");
    const subject = String(formData.get("subject") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const priority = String(formData.get("priority") ?? "").trim();

    if (!ticketId || !subject) return;

    const { data: before, error: beforeError } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (beforeError || !before) {
      console.error("Failed loading ticket before update:", beforeError?.message);
      return;
    }

    const beforeState = {
      subject: before.subject,
      category: before.category,
      priority: before.priority,
    };

    const afterState = {
      subject,
      category: category || null,
      priority: priority || null,
    };

    const noChanges =
      beforeState.subject === afterState.subject &&
      beforeState.category === afterState.category &&
      beforeState.priority === afterState.priority;

    if (noChanges) return;

    const { error } = await supabase
      .from("tickets")
      .update(afterState)
      .eq("id", ticketId);

    if (error) {
      console.error("Failed updating ticket details:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: before.account_id,
      entity_type: "ticket",
      entity_id: ticketId,
      event_type: "ticket_updated",
      event_label: "Ticket updated",
      notes: `Ticket updated: ${subject}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "ticket",
      entity_id: ticketId,
      action: "update",
      before_state: beforeState,
      after_state: afterState,
      source_interface: "admin_support_edit",
    });

    revalidatePath("/admin/support");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateTicketStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const ticketId = String(formData.get("ticket_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const subject = String(formData.get("subject") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!ticketId || !nextStatus) return;
    if (currentStatus === nextStatus) return;

    const { error } = await supabase
      .from("tickets")
      .update({ status: nextStatus })
      .eq("id", ticketId);

    if (error) {
      console.error("Failed updating ticket status:", error.message);
      return;
    }

    const meta = getEventMeta(nextStatus);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "ticket",
      entity_id: ticketId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `Ticket "${subject}" moved from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "ticket",
      entity_id: ticketId,
      action: "status_change",
      before_state: { status: currentStatus || null },
      after_state: { status: nextStatus },
      source_interface: "admin_support_status",
    });

    revalidatePath("/admin/support");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/noc");
  }

  const [
    { data, error },
    { data: accountsData },
    { data: locationsData },
    { data: servicesData },
    { data: incidentsData },
  ] = await Promise.all([
    supabase
      .from("tickets")
      .select(`
        id,
        subject,
        category,
        priority,
        status,
        created_at,
        account_id,
        location_id,
        service_instance_id,
        incident_id,
        accounts ( account_name ),
        locations ( location_name ),
        service_instances ( service_name )
      `)
      .order("created_at", { ascending: false }),
    supabase
      .from("accounts")
      .select("id, account_name")
      .neq("status", "archived")
      .order("account_name", { ascending: true }),
    supabase
      .from("locations")
      .select("id, location_name, account_id")
      .order("location_name", { ascending: true }),
    supabase
      .from("service_instances")
      .select("id, service_name, account_id")
      .neq("status", "terminated")
      .order("service_name", { ascending: true }),
    (supabase as any)
      .from("incidents")
      .select("id, title, status")
      .in("status", ["open", "investigating", "identified", "monitoring"])
      .order("opened_at", { ascending: false }),
  ]);

  const tickets = (data as Ticket[] | null) ?? [];
  const accountOptions = (accountsData as AccountOption[] | null) ?? [];
  const locationOptions = (locationsData as LocationOption[] | null) ?? [];
  const serviceOptions = (servicesData as ServiceOption[] | null) ?? [];
  const incidentOptions = (incidentsData as IncidentOption[] | null) ?? [];

  const totalTickets = tickets.length;
  const newTickets = tickets.filter((t) => t.status === "new").length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const escalatedTickets = tickets.filter((t) => t.status === "escalated").length;
  const resolvedTickets = tickets.filter((t) => t.status === "resolved").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.12) 0%, rgba(10,10,10,1) 28%), linear-gradient(180deg, #080808 0%, #111111 48%, #161616 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <section
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
            Support Control
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
            Create tickets, manage support demand, edit issue details, connect
            tickets to accounts, services, incidents, and move customer issues
            through an operator-grade lifecycle.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "Total Tickets", value: totalTickets },
            { label: "New", value: newTickets },
            { label: "Open", value: openTickets },
            { label: "Escalated", value: escalatedTickets },
            { label: "Resolved", value: resolvedTickets },
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
              Create Ticket
            </h2>
          </div>

          <div style={{ padding: "20px 22px" }}>
            <form action={createTicket} style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  name="subject"
                  placeholder="Ticket Subject"
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

                <select name="location_id" style={textInput}>
                  <option value="">Optional Location</option>
                  {locationOptions.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location_name ?? "Unnamed location"}
                    </option>
                  ))}
                </select>

                <select name="service_instance_id" style={textInput}>
                  <option value="">Optional Service</option>
                  {serviceOptions.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.service_name}
                    </option>
                  ))}
                </select>

                <select name="incident_id" style={textInput}>
                  <option value="">Optional Incident</option>
                  {incidentOptions.map((incident) => (
                    <option key={incident.id} value={incident.id}>
                      {incident.title}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  name="category"
                  placeholder="Category"
                  style={textInput}
                />

                <select name="priority" style={textInput}>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical Priority</option>
                </select>
              </div>

              <div>
                <button style={actionButtonGold} type="submit">
                  Create Ticket
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
              Error loading tickets: {error.message}
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
                Ticket Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1750px",
                }}
              >
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                    <th style={headerCell}>Subject</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Location</th>
                    <th style={headerCell}>Service</th>
                    <th style={headerCell}>Category</th>
                    <th style={headerCell}>Priority</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Created</th>
                    <th style={headerCell}>Immediate Actions</th>
                    <th style={headerCell}>Save Details</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.length ? (
                    tickets.map((ticket) => {
                      const currentStatus = ticket.status ?? "new";
                      const availableActions = getAvailableActions(currentStatus);

                      return (
                        <tr
                          key={ticket.id}
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <td style={bodyCell}>
                            <form action={updateTicketDetails}>
                              <input type="hidden" name="ticket_id" value={ticket.id} />
                              <input
                                type="hidden"
                                name="category"
                                value={ticket.category ?? ""}
                              />
                              <input
                                type="hidden"
                                name="priority"
                                value={ticket.priority ?? ""}
                              />
                              <input
                                name="subject"
                                defaultValue={ticket.subject ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            {ticket.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {ticket.locations?.[0]?.location_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {ticket.service_instances?.[0]?.service_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            <form action={updateTicketDetails}>
                              <input type="hidden" name="ticket_id" value={ticket.id} />
                              <input
                                type="hidden"
                                name="subject"
                                value={ticket.subject ?? ""}
                              />
                              <input
                                type="hidden"
                                name="priority"
                                value={ticket.priority ?? ""}
                              />
                              <input
                                name="category"
                                defaultValue={ticket.category ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateTicketDetails}>
                              <input type="hidden" name="ticket_id" value={ticket.id} />
                              <input
                                type="hidden"
                                name="subject"
                                value={ticket.subject ?? ""}
                              />
                              <input
                                type="hidden"
                                name="category"
                                value={ticket.category ?? ""}
                              />
                              <select
                                name="priority"
                                defaultValue={ticket.priority ?? "medium"}
                                style={textInput}
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                              </select>
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
                                ...getStatusStyles(currentStatus),
                              }}
                            >
                              {currentStatus}
                            </span>
                          </td>

                          <td style={bodyCell}>{ticket.created_at ?? "—"}</td>

                          <td style={bodyCell}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {availableActions.map((nextStatus) => (
                                <form key={nextStatus} action={updateTicketStatus}>
                                  <input type="hidden" name="ticket_id" value={ticket.id} />
                                  <input type="hidden" name="account_id" value={ticket.account_id} />
                                  <input
                                    type="hidden"
                                    name="subject"
                                    value={ticket.subject ?? ""}
                                  />
                                  <input
                                    type="hidden"
                                    name="current_status"
                                    value={currentStatus}
                                  />
                                  <input
                                    type="hidden"
                                    name="next_status"
                                    value={nextStatus}
                                  />
                                  <button
                                    type="submit"
                                    style={
                                      nextStatus === "resolved" || nextStatus === "closed"
                                        ? actionButtonGold
                                        : nextStatus === "escalated"
                                          ? actionButtonDanger
                                          : actionButton
                                    }
                                  >
                                    {nextStatus === "waiting_customer"
                                      ? "Waiting Customer"
                                      : nextStatus === "resolved"
                                        ? "Resolve"
                                        : nextStatus === "closed"
                                          ? "Close"
                                          : nextStatus === "escalated"
                                            ? "Escalate"
                                            : nextStatus === "open"
                                              ? "Open"
                                              : nextStatus}
                                  </button>
                                </form>
                              ))}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateTicketDetails} style={{ display: "grid", gap: "8px", minWidth: "180px" }}>
                              <input type="hidden" name="ticket_id" value={ticket.id} />
                              <input
                                name="subject"
                                defaultValue={ticket.subject ?? ""}
                                placeholder="Subject"
                                style={textInput}
                              />
                              <input
                                name="category"
                                defaultValue={ticket.category ?? ""}
                                placeholder="Category"
                                style={textInput}
                              />
                              <select
                                name="priority"
                                defaultValue={ticket.priority ?? "medium"}
                                style={textInput}
                              >
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                                <option value="critical">Critical Priority</option>
                              </select>
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
                      <td style={bodyCell} colSpan={10}>
                        No tickets found.
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

const textInput: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "12px",
  minWidth: "130px",
};