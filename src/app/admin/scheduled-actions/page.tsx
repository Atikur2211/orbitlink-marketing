import { createClient } from "@supabase/supabase-js";

type ScheduledAction = {
  id: string;
  entity_type: string;
  action_type: string;
  target_status: string | null;
  effective_date: string;
  reason: string | null;
  status: string | null;
  accounts: {
    account_name: string;
  } | null;
};

export default async function AdminScheduledActionsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: actions, error } = await supabase
    .from("scheduled_actions")
    .select(`
      id,
      entity_type,
      action_type,
      target_status,
      effective_date,
      reason,
      status,
      accounts ( account_name )
    `)
    .order("effective_date", { ascending: true });

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Scheduled Actions
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
        Review future-dated workflow actions such as cancellations, suspensions, and terminations.
      </p>

      {error ? (
        <div style={{ border: "1px solid #f3c2c2", borderRadius: "12px", padding: "20px" }}>
          <p style={{ margin: 0 }}>Error loading scheduled actions: {error.message}</p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Account</th>
                <th style={{ padding: "12px" }}>Entity</th>
                <th style={{ padding: "12px" }}>Action</th>
                <th style={{ padding: "12px" }}>Target Status</th>
                <th style={{ padding: "12px" }}>Effective Date</th>
                <th style={{ padding: "12px" }}>Reason</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(actions as ScheduledAction[] | null)?.length ? (
                (actions as ScheduledAction[]).map((action) => (
                  <tr key={action.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{action.accounts?.account_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{action.entity_type}</td>
                    <td style={{ padding: "12px" }}>{action.action_type}</td>
                    <td style={{ padding: "12px" }}>{action.target_status ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{action.effective_date}</td>
                    <td style={{ padding: "12px" }}>{action.reason ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{action.status ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: "12px" }} colSpan={7}>
                    No scheduled actions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}