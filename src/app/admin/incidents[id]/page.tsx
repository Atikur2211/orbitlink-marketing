import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type IncidentDetail = {
  id: string;
  title: string;
  incident_type: string;
  severity: string;
  status: string;
  opened_at: string;
  resolved_at: string | null;
  summary: string | null;
  root_cause: string | null;
  notes: string | null;
};

type IncidentImpact = {
  id: string;
  impact_type: string;
  status: string;
  account_id: string | null;
  location_id: string | null;
  service_instance_id: string | null;
  accounts: { account_name: string }[] | null;
  locations: { location_name: string | null }[] | null;
  service_instances: { service_name: string }[] | null;
};

type IncidentTicket = {
  id: string;
  subject: string | null;
  category: string | null;
  priority: string | null;
  status: string | null;
  account_id: string | null;
  service_instance_id: string | null;
  accounts: { account_name: string }[] | null;
  service_instances: { service_name: string }[] | null;
};

function getSeverityStyles(severity: string): React.CSSProperties {
  switch (severity) {
    case "critical":
      return {
        background: "rgba(255, 99, 71, 0.16)",
        border: "1px solid rgba(255, 99, 71, 0.30)",
        color: "#ffb29b",
      };
    case "high":
      return {
        background: "rgba(255, 140, 0, 0.14)",
        border: "1px solid rgba(255, 140, 0, 0.28)",
        color: "#ffd08a",
      };
    case "medium":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    default:
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
  }
}

function getStatusStyles(status: string): React.CSSProperties {
  switch (status) {
    case "open":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "investigating":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "identified":
      return {
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        color: "#f3f3f3",
      };
    case "monitoring":
      return {
        background: "rgba(212, 175, 55, 0.14)",
        border: "1px solid rgba(212, 175, 55, 0.30)",
        color: "#f4d57b",
      };
    case "resolved":
    case "closed":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    default:
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
  }
}

export default async function AdminIncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [{ data: incident, error }, { data: impacts }, { data: tickets }] =
    await Promise.all([
      (supabase as any)
        .from("incidents")
        .select(`
          id,
          title,
          incident_type,
          severity,
          status,
          opened_at,
          resolved_at,
          summary,
          root_cause,
          notes
        `)
        .eq("id", id)
        .single(),
      (supabase as any)
        .from("incident_impacts")
        .select(`
          id,
          impact_type,
          status,
          account_id,
          location_id,
          service_instance_id,
          accounts ( account_name ),
          locations ( location_name ),
          service_instances ( service_name )
        `)
        .eq("incident_id", id),
      supabase
        .from("tickets")
        .select(`
          id,
          subject,
          category,
          priority,
          status,
          account_id,
          service_instance_id,
          accounts ( account_name ),
          service_instances ( service_name )
        `)
        .eq("incident_id", id),
    ]);

  const incidentData = incident as IncidentDetail | null;
  const impactRows = (impacts as IncidentImpact[] | null) ?? [];
  const ticketRows = (tickets as IncidentTicket[] | null) ?? [];

  if (!incidentData || error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "32px",
          background:
            "radial-gradient(circle at top, rgba(212,175,55,0.10) 0%, rgba(10,10,10,1) 28%), linear-gradient(180deg, #080808 0%, #111111 48%, #161616 100%)",
          color: "#f5f5f5",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              border: "1px solid rgba(255, 99, 71, 0.35)",
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255, 99, 71, 0.08)",
            }}
          >
            <p style={{ margin: 0, color: "#ffb29b" }}>Incident not found.</p>
          </div>
        </div>
      </main>
    );
  }

  const severityBadge = getSeverityStyles(incidentData.severity);
  const statusBadge = getStatusStyles(incidentData.status);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.10) 0%, rgba(10,10,10,1) 28%), linear-gradient(180deg, #080808 0%, #111111 48%, #161616 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link
            href="/admin/incidents"
            style={{
              color: "#f4d57b",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Back to Incidents
          </Link>
        </div>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "24px",
            padding: "32px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 28px 70px rgba(0,0,0,0.40)",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(212, 175, 55, 0.22)",
                background: "rgba(212, 175, 55, 0.08)",
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#e2c15c",
                marginBottom: "16px",
              }}
            >
              Orbitlink OS · Incident Detail
            </div>

            <h1
              style={{
                fontSize: "38px",
                lineHeight: 1.1,
                fontWeight: 700,
                margin: "0 0 14px 0",
                color: "#fff7db",
              }}
            >
              {incidentData.title}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  ...severityBadge,
                }}
              >
                {incidentData.severity}
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  ...statusBadge,
                }}
              >
                {incidentData.status}
              </span>

              <span style={metaPill}>{incidentData.incident_type}</span>
              <span style={metaPill}>Impacts {impactRows.length}</span>
              <span style={metaPill}>Tickets {ticketRows.length}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "16px",
              }}
            >
              <div style={detailCard}>
                <div style={detailLabel}>Opened</div>
                <div style={detailValue}>{incidentData.opened_at}</div>
              </div>
              <div style={detailCard}>
                <div style={detailLabel}>Resolved</div>
                <div style={detailValue}>{incidentData.resolved_at ?? "—"}</div>
              </div>
              <div style={detailCard}>
                <div style={detailLabel}>Summary</div>
                <div style={detailValue}>{incidentData.summary ?? "—"}</div>
              </div>
              <div style={detailCard}>
                <div style={detailLabel}>Root Cause</div>
                <div style={detailValue}>{incidentData.root_cause ?? "—"}</div>
              </div>
              <div style={{ ...detailCard, gridColumn: "1 / -1" }}>
                <div style={detailLabel}>Notes</div>
                <div style={detailValue}>{incidentData.notes ?? "—"}</div>
              </div>
            </div>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div style={panelStyle}>
            <div style={panelHeader}>
              <h2 style={panelTitle}>Impacted Records</h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "620px",
                }}
              >
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                    <th style={headerCell}>Impact Type</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Location</th>
                    <th style={headerCell}>Service</th>
                  </tr>
                </thead>
                <tbody>
                  {impactRows.length ? (
                    impactRows.map((impact) => (
                      <tr
                        key={impact.id}
                        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <td style={bodyCell}>{impact.impact_type}</td>
                        <td style={bodyCell}>{impact.status}</td>
                        <td style={bodyCell}>
                          {impact.accounts?.[0]?.account_name ?? "—"}
                        </td>
                        <td style={bodyCell}>
                          {impact.locations?.[0]?.location_name ?? "—"}
                        </td>
                        <td style={bodyCell}>
                          {impact.service_instances?.[0]?.service_name ?? "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={5}>
                        No impacted records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeader}>
              <h2 style={panelTitle}>Linked Tickets</h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "760px",
                }}
              >
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                    <th style={headerCell}>Subject</th>
                    <th style={headerCell}>Category</th>
                    <th style={headerCell}>Priority</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Service</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.length ? (
                    ticketRows.map((ticket) => (
                      <tr
                        key={ticket.id}
                        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <td style={bodyCell}>
                          <div style={{ fontWeight: 600, color: "#fff7db" }}>
                            {ticket.subject ?? "—"}
                          </div>
                        </td>
                        <td style={bodyCell}>{ticket.category ?? "—"}</td>
                        <td style={bodyCell}>{ticket.priority ?? "—"}</td>
                        <td style={bodyCell}>{ticket.status ?? "—"}</td>
                        <td style={bodyCell}>
                          {ticket.accounts?.[0]?.account_name ?? "—"}
                        </td>
                        <td style={bodyCell}>
                          {ticket.service_instances?.[0]?.service_name ?? "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={6}>
                        No linked tickets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const panelStyle: React.CSSProperties = {
  borderRadius: "26px",
  overflow: "hidden",
  border: "1px solid rgba(212, 175, 55, 0.16)",
  background: "rgba(255,255,255,0.03)",
  boxShadow: "0 22px 55px rgba(0,0,0,0.32)",
};

const panelHeader: React.CSSProperties = {
  padding: "18px 22px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(90deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.02) 100%)",
};

const panelTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 600,
  color: "#fff2c4",
};

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

const metaPill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "#f5f5f5",
};

const detailCard: React.CSSProperties = {
  borderRadius: "18px",
  padding: "18px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
};

const detailLabel: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.10em",
  color: "rgba(255,255,255,0.58)",
  marginBottom: "8px",
};

const detailValue: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#f5f5f5",
};