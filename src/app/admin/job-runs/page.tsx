import { createClient } from "@supabase/supabase-js";

type JobRun = {
  id: string;
  job_type: string;
  related_entity_type: string | null;
  related_entity_id: string | null;
  scheduled_action_id: string | null;
  status: string;
  started_at: string;
  finished_at: string | null;
  retry_count: number | null;
  error_message: string | null;
};

function getStatusStyles(status: string): React.CSSProperties {
  switch (status) {
    case "success":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "failed":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "running":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    default:
      return {
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        color: "#d8d8d8",
      };
  }
}

export default async function AdminJobRunsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await (supabase as any)
    .from("job_runs")
    .select(`
      id,
      job_type,
      related_entity_type,
      related_entity_id,
      scheduled_action_id,
      status,
      started_at,
      finished_at,
      retry_count,
      error_message
    `)
    .order("started_at", { ascending: false });

  const jobRuns = (data as JobRun[] | null) ?? [];

  const totalRuns = jobRuns.length;
  const successRuns = jobRuns.filter((job) => job.status === "success").length;
  const failedRuns = jobRuns.filter((job) => job.status === "failed").length;
  const runningRuns = jobRuns.filter((job) => job.status === "running").length;

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
            Job Runs
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
            Review automation execution history, scheduled action processing,
            operational failures, and runtime outcomes from one operator-grade
            control view.
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
            { label: "Total Runs", value: totalRuns },
            { label: "Success", value: successRuns },
            { label: "Failed", value: failedRuns },
            { label: "Running", value: runningRuns },
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
              Error loading job runs: {error.message}
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
                Execution Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1350px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      textAlign: "left",
                    }}
                  >
                    <th style={headerCell}>Job Type</th>
                    <th style={headerCell}>Entity</th>
                    <th style={headerCell}>Entity ID</th>
                    <th style={headerCell}>Scheduled Action</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Started</th>
                    <th style={headerCell}>Finished</th>
                    <th style={headerCell}>Retries</th>
                    <th style={headerCell}>Error</th>
                  </tr>
                </thead>

                <tbody>
                  {jobRuns.length ? (
                    jobRuns.map((job) => {
                      const badge = getStatusStyles(job.status);

                      return (
                        <tr
                          key={job.id}
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <td style={bodyCell}>{job.job_type}</td>
                          <td style={bodyCell}>{job.related_entity_type ?? "—"}</td>
                          <td style={bodyCell}>{job.related_entity_id ?? "—"}</td>
                          <td style={bodyCell}>{job.scheduled_action_id ?? "—"}</td>
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
                              {job.status}
                            </span>
                          </td>
                          <td style={bodyCell}>{job.started_at}</td>
                          <td style={bodyCell}>{job.finished_at ?? "—"}</td>
                          <td style={bodyCell}>{job.retry_count ?? 0}</td>
                          <td style={bodyCell}>
                            {job.error_message ? (
                              <span style={{ color: "#ffb29b" }}>{job.error_message}</span>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={9}>
                        No job runs found.
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