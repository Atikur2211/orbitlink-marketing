import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Incident = {
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
  incident_impacts: { id: string }[] | null;
  tickets: { id: string }[] | null;
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

export default async function AdminIncidentsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await (supabase as any)
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
      notes,
      incident_impacts ( id ),
      tickets ( id )
    `)
    .order("opened_at", { ascending: false });

  const incidents = (data as Incident[] | null) ?? [];

  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter((incident) =>
    ["open", "investigating", "identified", "monitoring"].includes(incident.status)
  ).length;
  const criticalIncidents = incidents.filter(
    (incident) => incident.severity === "critical"
  ).length;
  const resolvedIncidents = incidents.filter((incident) =>
    ["resolved", "closed"].includes(incident.status)
  ).length;

  const totalImpacts = incidents.reduce(
    (sum, incident) => sum + (incident.incident_impacts?.length ?? 0),
    0
  );

  const totalTickets = incidents.reduce(
    (sum, incident) => sum + (incident.tickets?.length ?? 0),
    0
  );

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
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "28px",
            padding: "32px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 28px 70px rgba(0,0,0,0.40)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: "360px",
              height: "360px",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 32%, rgba(212,175,55,0.00) 70%)",
              pointerEvents: "none",
              filter: "blur(8px)",
            }}
          />

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
              Orbitlink OS · Incident Intelligence
            </div>

            <h1
              style={{
                fontSize: "40px",
                lineHeight: 1.08,
                fontWeight: 700,
                margin: "0 0 12px 0",
                color: "#fff7db",
                maxWidth: "920px",
              }}
            >
              Incidents
            </h1>

            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.74)",
                margin: 0,
                maxWidth: "900px",
                lineHeight: 1.72,
              }}
            >
              Review outage, degradation, automation-linked failures, customer
              impact records, and related tickets from one operator-grade incident
              surface.
            </p>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "Total Incidents", value: totalIncidents },
            { label: "Open", value: openIncidents },
            { label: "Critical", value: criticalIncidents },
            { label: "Resolved", value: resolvedIncidents },
            { label: "Impact Records", value: totalImpacts },
            { label: "Linked Tickets", value: totalTickets },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: "20px",
                padding: "20px",
                border: "1px solid rgba(212, 175, 55, 0.14)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
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
              Error loading incidents: {error.message}
            </p>
          </div>
        ) : (
          <div
            style={{
              borderRadius: "26px",
              overflow: "hidden",
              border: "1px solid rgba(212, 175, 55, 0.16)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 22px 55px rgba(0,0,0,0.32)",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.02) 100%)",
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
                Incident Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1620px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      textAlign: "left",
                    }}
                  >
                    <th style={headerCell}>Title</th>
                    <th style={headerCell}>Type</th>
                    <th style={headerCell}>Severity</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Impacts</th>
                    <th style={headerCell}>Tickets</th>
                    <th style={headerCell}>Opened</th>
                    <th style={headerCell}>Resolved</th>
                    <th style={headerCell}>Summary</th>
                    <th style={headerCell}>Root Cause</th>
                    <th style={headerCell}>Notes</th>
                  </tr>
                </thead>

                <tbody>
                  {incidents.length ? (
                    incidents.map((incident) => {
                      const severityBadge = getSeverityStyles(incident.severity);
                      const statusBadge = getStatusStyles(incident.status);
                      const impactCount = incident.incident_impacts?.length ?? 0;
                      const ticketCount = incident.tickets?.length ?? 0;

                      return (
                        <tr
                          key={incident.id}
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <td style={bodyCell}>
                            <Link
                              href={`/admin/incidents/${incident.id}`}
                              style={{
                                color: "#fff7db",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
                            >
                              {incident.title}
                            </Link>
                          </td>
                          <td style={bodyCell}>{incident.incident_type}</td>
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
                                ...severityBadge,
                              }}
                            >
                              {incident.severity}
                            </span>
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
                                ...statusBadge,
                              }}
                            >
                              {incident.status}
                            </span>
                          </td>
                          <td style={bodyCell}>
                            <span style={countBadgeGold}>{impactCount}</span>
                          </td>
                          <td style={bodyCell}>
                            <span style={countBadgeNeutral}>{ticketCount}</span>
                          </td>
                          <td style={bodyCell}>{incident.opened_at}</td>
                          <td style={bodyCell}>{incident.resolved_at ?? "—"}</td>
                          <td style={bodyCell}>{incident.summary ?? "—"}</td>
                          <td style={bodyCell}>{incident.root_cause ?? "—"}</td>
                          <td style={bodyCell}>{incident.notes ?? "—"}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={11}>
                        No incidents found.
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

const countBadgeGold: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "42px",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  background: "rgba(212, 175, 55, 0.14)",
  border: "1px solid rgba(212, 175, 55, 0.30)",
  color: "#f4d57b",
};

const countBadgeNeutral: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "42px",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "#f5f5f5",
};