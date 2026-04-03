import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 30;

type Incident = {
  id: string;
  title: string;
  severity: string;
  status: string;
  opened_at: string;
};

type JobRun = {
  id: string;
  job_type: string;
  status: string;
  started_at: string;
  error_message: string | null;
};

type ScheduledAction = {
  id: string;
  entity_type: string;
  action_type: string;
  target_status: string | null;
  effective_date: string;
  status: string | null;
};

type Ticket = {
  id: string;
  subject: string | null;
  priority: string | null;
  status: string | null;
  accounts: { account_name: string }[] | null;
};

function badgeStyle(kind: "danger" | "warn" | "gold" | "neutral"): React.CSSProperties {
  switch (kind) {
    case "danger":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "warn":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "gold":
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

export default async function AdminNocPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [incidentsRes, failedJobsRes, runningActionsRes, openTicketsRes] =
    await Promise.all([
      (supabase as any)
        .from("incidents")
        .select("id, title, severity, status, opened_at")
        .in("status", ["open", "investigating", "identified", "monitoring"])
        .order("opened_at", { ascending: false })
        .limit(10),
      (supabase as any)
        .from("job_runs")
        .select("id, job_type, status, started_at, error_message")
        .eq("status", "failed")
        .order("started_at", { ascending: false })
        .limit(10),
      (supabase as any)
        .from("scheduled_actions")
        .select("id, entity_type, action_type, target_status, effective_date, status")
        .in("status", ["scheduled", "queued", "running"])
        .order("effective_date", { ascending: true })
        .limit(10),
      supabase
        .from("tickets")
        .select(`
          id,
          subject,
          priority,
          status,
          accounts ( account_name )
        `)
        .in("status", ["new", "open", "waiting_customer", "escalated"])
        .order("opened_at", { ascending: false })
        .limit(10),
    ]);

  const incidents = (incidentsRes.data as Incident[] | null) ?? [];
  const failedJobs = (failedJobsRes.data as JobRun[] | null) ?? [];
  const runningActions = (runningActionsRes.data as ScheduledAction[] | null) ?? [];
  const openTickets = (openTicketsRes.data as Ticket[] | null) ?? [];

  const statCards = [
    { label: "Open Incidents", value: incidents.length, kind: "danger" as const },
    { label: "Failed Jobs", value: failedJobs.length, kind: "danger" as const },
    { label: "Active Actions", value: runningActions.length, kind: "warn" as const },
    { label: "Open Tickets", value: openTickets.length, kind: "gold" as const },
  ];

  const lastRefreshed = new Date().toISOString();

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
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "28px",
            padding: "32px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02) 100%)",
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
              Orbitlink OS · NOC Console
            </div>

            <h1
              style={{
                fontSize: "40px",
                lineHeight: 1.08,
                fontWeight: 700,
                margin: "0 0 12px 0",
                color: "#fff7db",
              }}
            >
              Network Operations Console
            </h1>

            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.74)",
                margin: 0,
                maxWidth: "920px",
                lineHeight: 1.72,
              }}
            >
              Real-time operator view across incidents, failed automation, active
              scheduled actions, and open support demand.
            </p>

            <div
              style={{
                marginTop: "14px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.56)",
                letterSpacing: "0.04em",
              }}
            >
              Auto-refresh active · updates every 30 seconds · last rendered {lastRefreshed}
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {statCards.map((item) => (
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
                  ...(badgeStyle(item.kind)),
                  background: "transparent",
                  border: "none",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div style={panelStyle}>
            <div style={panelHeader}>
              <h2 style={panelTitle}>Open Incidents</h2>
            </div>
            <div style={panelBody}>
              {incidents.length ? (
                incidents.map((incident) => (
                  <Link
                    key={incident.id}
                    href={`/admin/incidents/${incident.id}`}
                    style={rowLink}
                  >
                    <div>
                      <div style={rowTitle}>{incident.title}</div>
                      <div style={rowMeta}>{incident.opened_at}</div>
                    </div>
                    <span
                      style={{
                        ...pillBase,
                        ...badgeStyle(
                          incident.severity === "critical" ? "danger" : "warn"
                        ),
                      }}
                    >
                      {incident.status}
                    </span>
                  </Link>
                ))
              ) : (
                <div style={emptyState}>No open incidents.</div>
              )}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeader}>
              <h2 style={panelTitle}>Failed Job Runs</h2>
            </div>
            <div style={panelBody}>
              {failedJobs.length ? (
                failedJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/admin/job-runs/${job.id}`}
                    style={rowLink}
                  >
                    <div>
                      <div style={rowTitle}>{job.job_type}</div>
                      <div style={rowMeta}>{job.error_message ?? "Execution failed"}</div>
                    </div>
                    <span style={{ ...pillBase, ...badgeStyle("danger") }}>
                      failed
                    </span>
                  </Link>
                ))
              ) : (
                <div style={emptyState}>No failed job runs.</div>
              )}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeader}>
              <h2 style={panelTitle}>Active Scheduled Actions</h2>
            </div>
            <div style={panelBody}>
              {runningActions.length ? (
                runningActions.map((action) => (
                  <Link
                    key={action.id}
                    href="/admin/scheduled-actions"
                    style={rowLink}
                  >
                    <div>
                      <div style={rowTitle}>
                        {action.entity_type} · {action.action_type}
                      </div>
                      <div style={rowMeta}>
                        Target {action.target_status ?? "—"} · {action.effective_date}
                      </div>
                    </div>
                    <span style={{ ...pillBase, ...badgeStyle("warn") }}>
                      {action.status ?? "—"}
                    </span>
                  </Link>
                ))
              ) : (
                <div style={emptyState}>No active scheduled actions.</div>
              )}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeader}>
              <h2 style={panelTitle}>Open Tickets</h2>
            </div>
            <div style={panelBody}>
              {openTickets.length ? (
                openTickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    href="/admin/support"
                    style={rowLink}
                  >
                    <div>
                      <div style={rowTitle}>{ticket.subject ?? "Untitled ticket"}</div>
                      <div style={rowMeta}>
                        {ticket.accounts?.[0]?.account_name ?? "Unknown account"}
                      </div>
                    </div>
                    <span style={{ ...pillBase, ...badgeStyle("gold") }}>
                      {ticket.status ?? "—"}
                    </span>
                  </Link>
                ))
              ) : (
                <div style={emptyState}>No open tickets.</div>
              )}
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

const panelBody: React.CSSProperties = {
  padding: "14px",
  display: "grid",
  gap: "10px",
};

const rowLink: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  borderRadius: "18px",
  padding: "14px 16px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  textDecoration: "none",
  color: "inherit",
};

const rowTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#fff7db",
  marginBottom: "4px",
};

const rowMeta: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.60)",
  lineHeight: 1.5,
};

const pillBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "capitalize",
  whiteSpace: "nowrap",
};

const emptyState: React.CSSProperties = {
  borderRadius: "18px",
  padding: "18px",
  border: "1px dashed rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.58)",
  fontSize: "14px",
};