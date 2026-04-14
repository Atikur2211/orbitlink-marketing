import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import type { CSSProperties } from "react";

export const revalidate = 30;

const ESCALATION_MINUTES = 30;

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
  opened_at?: string | null;
  accounts: { account_name: string }[] | null;
};

type NocAlert = {
  id: string;
  severity: string;
  type: string;
  entity_type: string;
  entity_id: string;
  message: string;
  created_at: string;
  acknowledged: boolean;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

function badgeStyle(
  kind: "danger" | "warn" | "gold" | "neutral"
): CSSProperties {
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

function formatUtc(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function minutesSince(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
}

function getEscalationMeta(alert: NocAlert) {
  const ageMinutes = minutesSince(alert.created_at);
  const remaining = ESCALATION_MINUTES - ageMinutes;
  const escalated =
    ["critical", "high"].includes(alert.severity) && remaining <= 0;

  return {
    ageMinutes,
    remaining: Math.max(0, remaining),
    escalated,
  };
}

function getAlertEntityHref(alert: NocAlert) {
  switch (alert.entity_type) {
    case "order":
      return `/admin/orders?highlight=${alert.entity_id}`;
    case "account":
      return `/admin/accounts?highlight=${alert.entity_id}`;
    case "location":
      return `/admin/locations?highlight=${alert.entity_id}`;
    case "service":
      return `/admin/services?highlight=${alert.entity_id}`;
    case "ticket":
      return `/admin/support?highlight=${alert.entity_id}`;
    case "incident":
      return `/admin/incidents/${alert.entity_id}`;
    default:
      return null;
  }
}

function getAlertEntityLabel(alert: NocAlert) {
  switch (alert.entity_type) {
    case "order":
      return "Open affected order";
    case "account":
      return "Open affected account";
    case "location":
      return "Open affected location";
    case "service":
      return "Open affected service";
    case "ticket":
      return "Open affected ticket";
    case "incident":
      return "Open incident";
    default:
      return "Open record";
  }
}

function getSeverityPriority(severity: string) {
  switch (severity) {
    case "critical":
      return 4;
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
}

function getAlertCardStyle(alert: NocAlert): CSSProperties {
  if (alert.severity === "critical") {
    return {
      ...rowBox,
      border: "1px solid rgba(255, 99, 71, 0.42)",
      background: "rgba(255, 99, 71, 0.06)",
      boxShadow: "0 0 0 1px rgba(255,99,71,0.08) inset",
    };
  }

  if (alert.severity === "high") {
    return {
      ...rowBox,
      border: "1px solid rgba(255, 193, 7, 0.28)",
      background: "rgba(255, 193, 7, 0.04)",
    };
  }

  return rowBox;
}

async function acknowledgeAlert(formData: FormData) {
  "use server";

  const supabase = getSupabase();
  const alertId = String(formData.get("alert_id") ?? "").trim();
  if (!alertId) return;

  const { data: alertBefore } = await (supabase as any)
    .from("noc_alerts")
    .select("id, severity, type, entity_type, entity_id, message, acknowledged")
    .eq("id", alertId)
    .single();

  const { error } = await (supabase as any)
    .from("noc_alerts")
    .update({ acknowledged: true })
    .eq("id", alertId);

  if (error) {
    console.error("Failed to acknowledge NOC alert:", error.message);
    return;
  }

  if (alertBefore) {
    await (supabase as any).from("lifecycle_events").insert({
      account_id: null,
      entity_type: "noc_alert",
      entity_id: alertId,
      event_type: "noc_alert_acknowledged",
      event_label: "NOC alert acknowledged",
      notes: `Alert acknowledged: ${alertBefore.type} · ${alertBefore.message}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "noc_alert",
      entity_id: alertId,
      action: "acknowledge",
      before_state: {
        acknowledged: alertBefore.acknowledged,
        severity: alertBefore.severity,
        type: alertBefore.type,
        entity_type: alertBefore.entity_type,
        entity_id: alertBefore.entity_id,
        message: alertBefore.message,
      },
      after_state: {
        acknowledged: true,
      },
      source_interface: "admin_noc_acknowledge_alert",
    });
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/admin/noc");
  revalidatePath("/admin/dashboard");
}

export default async function AdminNocPage() {
  const supabase = getSupabase();

  const [
    incidentsRes,
    failedJobsRes,
    runningActionsRes,
    openTicketsRes,
    nocAlertsRes,
    allOpenIncidentsCountRes,
    allActiveAlertsCountRes,
  ] = await Promise.all([
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
      .order("status", { ascending: false }) // running first
      .order("effective_date", { ascending: true })
      .limit(10),

    supabase
      .from("tickets")
      .select(
        `
        id,
        subject,
        priority,
        status,
        opened_at,
        accounts ( account_name )
      `
      )
      .in("status", ["new", "open", "waiting_customer", "escalated"])
      .order("opened_at", { ascending: false })
      .limit(10),

    supabase
      .from("noc_alerts")
      .select("id, severity, type, entity_type, entity_id, message, created_at, acknowledged")
      .eq("acknowledged", false)
      .order("created_at", { ascending: false })
      .limit(20),

    (supabase as any)
      .from("incidents")
      .select("id", { count: "exact", head: true })
      .in("status", ["open", "investigating", "identified", "monitoring"]),

    (supabase as any)
      .from("noc_alerts")
      .select("id", { count: "exact", head: true })
      .eq("acknowledged", false),
  ]);

  const incidents = (incidentsRes.data as Incident[] | null) ?? [];
  const failedJobs = (failedJobsRes.data as JobRun[] | null) ?? [];
  const runningActions = (runningActionsRes.data as ScheduledAction[] | null) ?? [];
  const openTickets = (openTicketsRes.data as Ticket[] | null) ?? [];
  const nocAlerts = (nocAlertsRes.data as NocAlert[] | null) ?? [];

  const sortedAlerts = [...nocAlerts].sort((a, b) => {
    const severityDelta = getSeverityPriority(b.severity) - getSeverityPriority(a.severity);
    if (severityDelta !== 0) return severityDelta;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const criticalUnacknowledgedAlerts = sortedAlerts.filter(
    (alert) => alert.severity === "critical"
  ).length;

  const highOrCriticalAlerts = sortedAlerts.filter((alert) =>
    ["critical", "high"].includes(alert.severity)
  ).length;

  const escalatedNowCount = sortedAlerts.filter(
    (alert) => getEscalationMeta(alert).escalated
  ).length;

  const activeAlertsCount =
    typeof allActiveAlertsCountRes.count === "number"
      ? allActiveAlertsCountRes.count
      : sortedAlerts.length;

  const openIncidentsCount =
    typeof allOpenIncidentsCountRes.count === "number"
      ? allOpenIncidentsCountRes.count
      : incidents.length;

  const systemHealthLabel = sortedAlerts.length === 0 ? "Healthy" : "Attention";
  const systemHealthKind =
    sortedAlerts.length === 0 ? ("gold" as const) : ("danger" as const);

  const statCards = [
    { label: "System Health", value: systemHealthLabel, kind: systemHealthKind },
    { label: "Active Alerts", value: activeAlertsCount, kind: "danger" as const },
    {
      label: "Critical Unacked",
      value: criticalUnacknowledgedAlerts,
      kind:
        criticalUnacknowledgedAlerts > 0
          ? ("danger" as const)
          : ("neutral" as const),
    },
    { label: "Open Incidents", value: openIncidentsCount, kind: "danger" as const },
    {
      label: "High / Critical",
      value: highOrCriticalAlerts,
      kind: highOrCriticalAlerts > 0 ? ("warn" as const) : ("neutral" as const),
    },
    {
      label: "Escalation Overdue",
      value: escalatedNowCount,
      kind: escalatedNowCount > 0 ? ("danger" as const) : ("neutral" as const),
    },
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
              Real-time operator view across alerts, incidents, failed automation,
              active scheduled actions, and open support demand.
            </p>

            <div
              style={{
                marginTop: "14px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.56)",
                letterSpacing: "0.04em",
              }}
            >
              <span>ISR revalidate every 30 seconds</span>
              <span>·</span>
              <span>last rendered {lastRefreshed}</span>
              <span>·</span>
              <Link
                href="/admin/noc"
                style={{
                  color: "#f4d57b",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Refresh now →
              </Link>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
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
                  fontSize: typeof item.value === "string" ? "24px" : "32px",
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
            gridTemplateColumns: "1.3fr 1fr",
            gap: "20px",
          }}
        >
          <div style={panelStyle}>
            <div style={panelHeader}>
              <div>
                <h2 style={panelTitle}>Active Network Alerts</h2>
                <div style={panelSubtle}>
                  Highest severity first · newest alerts prioritized
                </div>
              </div>
            </div>

            <div style={panelBody}>
              {sortedAlerts.length ? (
                sortedAlerts.map((alert) => {
                  const escalation = getEscalationMeta(alert);
                  const entityHref = getAlertEntityHref(alert);
                  const entityLabel = getAlertEntityLabel(alert);

                  return (
                    <div
                      key={alert.id}
                      style={{
                        ...getAlertCardStyle(alert),
                        cursor: "default",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={rowTitle}>{alert.type.replaceAll("_", " ")}</div>
                        <div style={rowMeta}>{alert.message}</div>
                        <div style={{ ...rowMeta, marginTop: "4px" }}>
                          Raised {formatUtc(alert.created_at)}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginTop: "10px",
                          }}
                        >
                          <span
                            style={{
                              ...pillBase,
                              ...badgeStyle(
                                alert.severity === "critical"
                                  ? "danger"
                                  : alert.severity === "high"
                                    ? "warn"
                                    : "gold"
                              ),
                            }}
                          >
                            {alert.severity}
                          </span>

                          {["critical", "high"].includes(alert.severity) ? (
                            <span
                              style={{
                                ...pillBase,
                                ...(escalation.escalated
                                  ? badgeStyle("danger")
                                  : badgeStyle("warn")),
                              }}
                            >
                              {escalation.escalated
                                ? "escalation threshold exceeded"
                                : `escalates in ${escalation.remaining} min`}
                            </span>
                          ) : null}

                          <span style={{ ...pillBase, ...badgeStyle("neutral") }}>
                            age {escalation.ageMinutes} min
                          </span>

                          <span style={{ ...pillBase, ...badgeStyle("neutral") }}>
                            {alert.entity_type}
                          </span>
                        </div>

                        {entityHref ? (
                          <div style={{ marginTop: "12px" }}>
                            <Link
                              href={entityHref}
                              style={{
                                color: "#f4d57b",
                                textDecoration: "none",
                                fontSize: "12px",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                              }}
                            >
                              {entityLabel} →
                            </Link>
                          </div>
                        ) : null}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <form action={acknowledgeAlert}>
                          <input type="hidden" name="alert_id" value={alert.id} />
                          <button
                            type="submit"
                            style={ackButtonStyle}
                            disabled={alert.acknowledged}
                          >
                            Acknowledge
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={emptyState}>
                  System healthy — no active alerts detected.
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={panelStyle}>
              <div style={panelHeader}>
                <div>
                  <h2 style={panelTitle}>Open Incidents</h2>
                  <div style={panelSubtle}>Operational incidents currently active</div>
                </div>
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
                        <div style={rowMeta}>{formatUtc(incident.opened_at)}</div>
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
                <div>
                  <h2 style={panelTitle}>Failed Job Runs</h2>
                  <div style={panelSubtle}>Recent background execution failures</div>
                </div>
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
                        <div style={rowMeta}>
                          {job.error_message ?? "Execution failed"}
                        </div>
                        <div style={{ ...rowMeta, marginTop: "4px" }}>
                          {formatUtc(job.started_at)}
                        </div>
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
                <div>
                  <h2 style={panelTitle}>Active Scheduled Actions</h2>
                  <div style={panelSubtle}>Scheduled, queued, or running workflow tasks</div>
                </div>
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
                          Target {action.target_status ?? "—"} · effective{" "}
                          {formatDate(action.effective_date)}
                        </div>
                      </div>
                      <span
                        style={{
                          ...pillBase,
                          ...(action.status === "running"
                            ? badgeStyle("danger")
                            : badgeStyle("warn")),
                        }}
                      >
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
                <div>
                  <h2 style={panelTitle}>Open Tickets</h2>
                  <div style={panelSubtle}>Support demand requiring operator visibility</div>
                </div>
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
                        {ticket.opened_at ? (
                          <div style={{ ...rowMeta, marginTop: "4px" }}>
                            Opened {formatUtc(ticket.opened_at)}
                          </div>
                        ) : null}
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {ticket.priority ? (
                          <span
                            style={{
                              ...pillBase,
                              ...badgeStyle(
                                ["critical", "high"].includes(ticket.priority)
                                  ? "warn"
                                  : "neutral"
                              ),
                            }}
                          >
                            {ticket.priority}
                          </span>
                        ) : null}
                        <span style={{ ...pillBase, ...badgeStyle("gold") }}>
                          {ticket.status ?? "—"}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={emptyState}>No open tickets.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const panelStyle: CSSProperties = {
  borderRadius: "26px",
  overflow: "hidden",
  border: "1px solid rgba(212, 175, 55, 0.16)",
  background: "rgba(255,255,255,0.03)",
  boxShadow: "0 22px 55px rgba(0,0,0,0.32)",
};

const panelHeader: CSSProperties = {
  padding: "18px 22px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(90deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.02) 100%)",
};

const panelTitle: CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 600,
  color: "#fff2c4",
};

const panelSubtle: CSSProperties = {
  marginTop: "6px",
  fontSize: "12px",
  color: "rgba(255,255,255,0.52)",
};

const panelBody: CSSProperties = {
  padding: "14px",
  display: "grid",
  gap: "10px",
};

const rowLink: CSSProperties = {
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

const rowBox: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  borderRadius: "18px",
  padding: "14px 16px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  color: "inherit",
};

const rowTitle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#fff7db",
  marginBottom: "4px",
  textTransform: "capitalize",
};

const rowMeta: CSSProperties = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.60)",
  lineHeight: 1.5,
};

const pillBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "capitalize",
  whiteSpace: "nowrap",
};

const emptyState: CSSProperties = {
  borderRadius: "18px",
  padding: "18px",
  border: "1px dashed rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.58)",
  fontSize: "14px",
};

const ackButtonStyle: CSSProperties = {
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#fff2c4",
  background: "rgba(212, 175, 55, 0.16)",
  border: "1px solid rgba(212, 175, 55, 0.32)",
};