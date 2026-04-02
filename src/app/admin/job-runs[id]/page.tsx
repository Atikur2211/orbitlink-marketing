import { createClient } from "@supabase/supabase-js";

type JobRun = {
  id: string;
  job_type: string;
  status: string;
  started_at: string;
  finished_at: string | null;
  error_message: string | null;
};

type JobLog = {
  id: string;
  log_level: string;
  message: string;
  created_at: string;
};

export default async function JobRunDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: job } = await (supabase as any)
    .from("job_runs")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: logs } = await (supabase as any)
    .from("job_run_logs")
    .select("*")
    .eq("job_run_id", params.id)
    .order("created_at", { ascending: true });

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Job Run Detail
      </h1>

      {job && (
        <div style={{ marginBottom: "24px" }}>
          <p><strong>ID:</strong> {job.id}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Started:</strong> {job.started_at}</p>
          <p><strong>Finished:</strong> {job.finished_at ?? "—"}</p>
          <p><strong>Error:</strong> {job.error_message ?? "—"}</p>
        </div>
      )}

      <h2 style={{ marginBottom: "12px" }}>Execution Logs</h2>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
        {logs?.length ? (
          logs.map((log: JobLog) => (
            <div
              key={log.id}
              style={{
                padding: "12px",
                borderBottom: "1px solid #eee",
                fontSize: "14px",
              }}
            >
              <strong>{log.log_level.toUpperCase()}</strong> — {log.message}
              <div style={{ fontSize: "12px", color: "#777" }}>
                {log.created_at}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "12px" }}>No logs found</div>
        )}
      </div>
    </main>
  );
}