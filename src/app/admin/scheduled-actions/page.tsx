import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type ScheduledAction = {
  id: string;
  account_id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  target_status: string | null;
  effective_date: string;
  reason: string | null;
  status: string | null;
  executed_at?: string | null;
  failed_at?: string | null;
  failure_reason?: string | null;
  approval_required?: boolean | null;
  accounts: { account_name: string }[] | null;
};

function getStatusStyles(status: string | null): React.CSSProperties {
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
        color: "#fff2c4",
      };
    case "failed":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "cancelled":
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

function getAvailableActions(status: string | null) {
  switch (status) {
    case "scheduled":
      return ["cancelled"];
    case "failed":
      return ["scheduled", "cancelled"];
    case "cancelled":
      return ["scheduled"];
    default:
      return [];
  }
}

function getStatusActionLabel(nextStatus: string) {
  switch (nextStatus) {
    case "scheduled":
      return "Requeue";
    case "cancelled":
      return "Cancel";
    default:
      return "Update";
  }
}

function getStatusActionStyle(nextStatus: string): React.CSSProperties {
  if (nextStatus === "cancelled") return actionButtonDanger;
  if (nextStatus === "scheduled") return actionButtonGold;
  return actionButton;
}

export default async function AdminScheduledActionsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function updateScheduledActionDetails(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const actionId = String(formData.get("action_id") ?? "");
    const reason = String(formData.get("reason") ?? "").trim();

    if (!actionId) return;

    const { data: before, error: beforeError } = await supabase
      .from("scheduled_actions")
      .select("*")
      .eq("id", actionId)
      .single();

    if (beforeError || !before) {
      console.error("Failed loading scheduled action before update:", beforeError?.message);
      return;
    }

    if ((before.reason ?? "") === reason) return;

    const { error } = await supabase
      .from("scheduled_actions")
      .update({
        reason: reason || null,
      })
      .eq("id", actionId);

    if (error) {
      console.error("Failed updating scheduled action details:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: before.account_id,
      entity_type: before.entity_type,
      entity_id: before.entity_id,
      event_type: `${before.entity_type}_scheduled_action_updated`,
      event_label: "Scheduled action updated",
      notes: `${before.action_type} action updated for ${before.entity_type}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: before.entity_type,
      entity_id: before.entity_id,
      action: "update",
      before_state: {
        scheduled_action_id: before.id,
        reason: before.reason,
      },
      after_state: {
        scheduled_action_id: before.id,
        reason: reason || null,
      },
      source_interface: "admin_scheduled_actions_edit",
    });

    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/lifecycle");
  }

  async function updateScheduledActionStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const actionId = String(formData.get("action_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const entityType = String(formData.get("entity_type") ?? "");
    const entityId = String(formData.get("entity_id") ?? "");
    const actionType = String(formData.get("action_type") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!actionId || !nextStatus) return;
    if (currentStatus === nextStatus) return;

    const updatePayload: Record<string, string | null> = {
      status: nextStatus,
    };

    if (nextStatus === "scheduled") {
      updatePayload.failed_at = null;
      updatePayload.failure_reason = null;
      updatePayload.executed_at = null;
    }

    const { error } = await supabase
      .from("scheduled_actions")
      .update(updatePayload)
      .eq("id", actionId);

    if (error) {
      console.error("Failed updating scheduled action status:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId || null,
      entity_type: entityType,
      entity_id: entityId,
      event_type: `${entityType}_scheduled_action_status_changed`,
      event_label: "Scheduled action status changed",
      notes: `${actionType} moved from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: entityType,
      entity_id: entityId,
      action: "status_change",
      before_state: {
        scheduled_action_id: actionId,
        status: currentStatus || null,
      },
      after_state: {
        scheduled_action_id: actionId,
        status: nextStatus,
      },
      source_interface: "admin_scheduled_actions_status",
    });

    revalidatePath("/admin/scheduled-actions");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
    revalidatePath("/admin/noc");
  }

  const { data, error } = await supabase
    .from("scheduled_actions")
    .select(`
      id,
      account_id,
      entity_type,
      entity_id,
      action_type,
      target_status,
      effective_date,
      reason,
      status,
      executed_at,
      failed_at,
      failure_reason,
      approval_required,
      accounts ( account_name )
    `)
    .order("effective_date", { ascending: true });

  const actions = (data as ScheduledAction[] | null) ?? [];

  const totalActions = actions.length;
  const scheduledCount = actions.filter((a) => a.status === "scheduled").length;
  const runningCount = actions.filter((a) => a.status === "running").length;
  const executedCount = actions.filter((a) => a.status === "executed").length;
  const failedCount = actions.filter((a) => a.status === "failed").length;

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
            Scheduled Actions
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
            Review and control future-dated workflow actions such as cancellations,
            suspensions, activations, and terminations from one premium automation surface.
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
            { label: "Total Actions", value: totalActions },
            { label: "Scheduled", value: scheduledCount },
            { label: "Running", value: runningCount },
            { label: "Executed", value: executedCount },
            { label: "Failed", value: failedCount },
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
              Error loading scheduled actions: {error.message}
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
                Automation Register
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
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Entity</th>
                    <th style={headerCell}>Entity ID</th>
                    <th style={headerCell}>Action</th>
                    <th style={headerCell}>Target Status</th>
                    <th style={headerCell}>Effective Date</th>
                    <th style={headerCell}>Editable Reason</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Approval</th>
                    <th style={headerCell}>Execution / Failure</th>
                    <th style={headerCell}>Lifecycle Actions</th>
                    <th style={headerCell}>Save Reason</th>
                  </tr>
                </thead>

                <tbody>
                  {actions.length ? (
                    actions.map((action) => {
                      const currentStatus = action.status ?? "scheduled";
                      const availableActions = getAvailableActions(currentStatus);

                      return (
                        <tr
                          key={action.id}
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <td style={bodyCell}>
                            {action.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>{action.entity_type}</td>

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
                              {action.entity_id}
                            </code>
                          </td>

                          <td style={bodyCell}>{action.action_type}</td>

                          <td style={bodyCell}>{action.target_status ?? "—"}</td>

                          <td style={bodyCell}>{action.effective_date}</td>

                          <td style={bodyCell}>
                            <form action={updateScheduledActionDetails}>
                              <input type="hidden" name="action_id" value={action.id} />
                              <input
                                name="reason"
                                defaultValue={action.reason ?? ""}
                                placeholder="Reason"
                                style={textInput}
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
                                ...getStatusStyles(currentStatus),
                              }}
                            >
                              {currentStatus}
                            </span>
                          </td>

                          <td style={bodyCell}>
                            {action.approval_required ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  padding: "6px 10px",
                                  borderRadius: "999px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  background: "rgba(255, 193, 7, 0.12)",
                                  border: "1px solid rgba(255, 193, 7, 0.28)",
                                  color: "#ffd666",
                                }}
                              >
                                Approval Required
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>

                          <td style={bodyCell}>
                            <div style={{ display: "grid", gap: "4px" }}>
                              <div style={{ color: "rgba(255,255,255,0.72)" }}>
                                Executed: {action.executed_at ?? "—"}
                              </div>
                              <div style={{ color: "rgba(255,255,255,0.72)" }}>
                                Failed: {action.failed_at ?? "—"}
                              </div>
                              <div style={{ color: "rgba(255,255,255,0.52)" }}>
                                {action.failure_reason ?? "—"}
                              </div>
                            </div>
                          </td>

                          <td style={bodyCell}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {availableActions.length ? (
                                availableActions.map((nextStatus) => (
                                  <form key={nextStatus} action={updateScheduledActionStatus}>
                                    <input type="hidden" name="action_id" value={action.id} />
                                    <input type="hidden" name="account_id" value={action.account_id} />
                                    <input type="hidden" name="entity_type" value={action.entity_type} />
                                    <input type="hidden" name="entity_id" value={action.entity_id} />
                                    <input type="hidden" name="action_type" value={action.action_type} />
                                    <input type="hidden" name="current_status" value={currentStatus} />
                                    <input type="hidden" name="next_status" value={nextStatus} />
                                    <button
                                      type="submit"
                                      style={getStatusActionStyle(nextStatus)}
                                    >
                                      {getStatusActionLabel(nextStatus)}
                                    </button>
                                  </form>
                                ))
                              ) : (
                                <span style={{ color: "rgba(255,255,255,0.52)", fontSize: "13px" }}>
                                  No actions available
                                </span>
                              )}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateScheduledActionDetails} style={{ display: "grid", gap: "8px", minWidth: "220px" }}>
                              <input type="hidden" name="action_id" value={action.id} />
                              <input
                                name="reason"
                                defaultValue={action.reason ?? ""}
                                placeholder="Reason"
                                style={textInput}
                              />
                              <button style={actionButtonGold} type="submit">
                                Save Reason
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={12}>
                        No scheduled actions found.
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
  minWidth: "150px",
};