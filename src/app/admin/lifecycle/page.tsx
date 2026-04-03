import { createClient } from "@supabase/supabase-js";

type LifecycleEvent = {
  id: string;
  entity_type: string;
  event_type: string;
  event_label: string | null;
  notes: string | null;
  created_at: string | null;
  accounts: { account_name: string }[] | null;
};

function getEntityBadgeStyle(entityType: string): React.CSSProperties {
  switch (entityType) {
    case "account":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "order":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f5f5f5",
      };
    case "service":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "invoice":
      return {
        background: "rgba(212, 175, 55, 0.14)",
        border: "1px solid rgba(212, 175, 55, 0.30)",
        color: "#fff2c4",
      };
    case "ticket":
      return {
        background: "rgba(255, 99, 71, 0.10)",
        border: "1px solid rgba(255, 99, 71, 0.24)",
        color: "#ffb29b",
      };
    case "location":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
    case "incident":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    default:
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
  }
}

export default async function AdminLifecyclePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("lifecycle_events")
    .select(`
      id,
      entity_type,
      event_type,
      event_label,
      notes,
      created_at,
      accounts ( account_name )
    `)
    .order("created_at", { ascending: false });

  const events = (data as LifecycleEvent[] | null) ?? [];

  const totalEvents = events.length;
  const accountEvents = events.filter((e) => e.entity_type === "account").length;
  const orderEvents = events.filter((e) => e.entity_type === "order").length;
  const serviceEvents = events.filter((e) => e.entity_type === "service").length;
  const incidentEvents = events.filter((e) => e.entity_type === "incident").length;
  const ticketEvents = events.filter((e) => e.entity_type === "ticket").length;

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
            Lifecycle Log
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: "920px",
              lineHeight: 1.65,
            }}
          >
            Review customer, service, commercial, support, and operational events
            from one premium operator-grade event ledger across Orbitlink.
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
            { label: "Total Events", value: totalEvents },
            { label: "Accounts", value: accountEvents },
            { label: "Orders", value: orderEvents },
            { label: "Services", value: serviceEvents },
            { label: "Incidents / Tickets", value: incidentEvents + ticketEvents },
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
              Error loading lifecycle events: {error.message}
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
                Event Ledger
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1500px",
                }}
              >
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Entity</th>
                    <th style={headerCell}>Event Type</th>
                    <th style={headerCell}>Label</th>
                    <th style={headerCell}>Notes</th>
                    <th style={headerCell}>Created</th>
                  </tr>
                </thead>

                <tbody>
                  {events.length ? (
                    events.map((event) => (
                      <tr
                        key={event.id}
                        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <td style={bodyCell}>
                          {event.accounts?.[0]?.account_name ?? "—"}
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
                              ...getEntityBadgeStyle(event.entity_type),
                            }}
                          >
                            {event.entity_type}
                          </span>
                        </td>

                        <td style={bodyCell}>
                          <code
                            style={{
                              fontSize: "12px",
                              color: "#fff2c4",
                              background: "rgba(255,255,255,0.04)",
                              padding: "4px 6px",
                              borderRadius: "8px",
                            }}
                          >
                            {event.event_type}
                          </code>
                        </td>

                        <td style={bodyCell}>
                          <div style={{ fontWeight: 600, color: "#fff7db" }}>
                            {event.event_label ?? "—"}
                          </div>
                        </td>

                        <td style={bodyCell}>
                          <div
                            style={{
                              maxWidth: "560px",
                              color: "rgba(255,255,255,0.74)",
                              lineHeight: 1.6,
                            }}
                          >
                            {event.notes ?? "—"}
                          </div>
                        </td>

                        <td style={bodyCell}>{event.created_at ?? "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={6}>
                        No lifecycle events found.
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