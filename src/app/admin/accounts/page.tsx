import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type Account = {
  id: string;
  account_name: string;
  legal_name: string | null;
  primary_contact_name: string | null;
  primary_contact_email: string | null;
  status: string | null;
  created_at: string | null;
};

function getStatusBadgeStyle(status: string | null): React.CSSProperties {
  switch (status) {
    case "active":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "inactive":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f3f3f3",
      };
    case "suspended":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "archived":
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

const cardStyle: React.CSSProperties = {
  borderRadius: "22px",
  padding: "22px",
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
  boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
};

export default async function AdminAccountsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function createAccount(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const account_name = String(formData.get("account_name") ?? "").trim();
    const legal_name = String(formData.get("legal_name") ?? "").trim();
    const contact_name = String(formData.get("contact_name") ?? "").trim();
    const contact_email = String(formData.get("contact_email") ?? "").trim();

    if (!account_name) return;

    const { data: account, error } = await supabase
      .from("accounts")
      .insert({
        account_name,
        legal_name: legal_name || null,
        primary_contact_name: contact_name || null,
        primary_contact_email: contact_email || null,
        status: "active",
      })
      .select("id, account_name")
      .single();

    if (error || !account) {
      console.error("Failed to create account:", error?.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: account.id,
      entity_type: "account",
      entity_id: account.id,
      event_type: "account_created",
      event_label: "Account created",
      notes: `New account created: ${account.account_name}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "account",
      entity_id: account.id,
      action: "create",
      after_state: {
        account_name,
        legal_name: legal_name || null,
        primary_contact_name: contact_name || null,
        primary_contact_email: contact_email || null,
        status: "active",
      },
      source_interface: "admin_accounts_page",
    });

    revalidatePath("/admin/accounts");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateAccountStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const accountId = String(formData.get("account_id") ?? "");
    const accountName = String(formData.get("account_name") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!accountId || !nextStatus) return;

    const { error } = await supabase
      .from("accounts")
      .update({ status: nextStatus })
      .eq("id", accountId);

    if (error) {
      console.error("Failed to update account status:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "account",
      entity_id: accountId,
      event_type:
        nextStatus === "suspended"
          ? "account_suspended"
          : nextStatus === "archived"
            ? "account_archived"
            : "account_status_changed",
      event_label:
        nextStatus === "suspended"
          ? "Account suspended"
          : nextStatus === "archived"
            ? "Account archived"
            : "Account status changed",
      notes: `${accountName} moved from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "account",
      entity_id: accountId,
      action: "status_change",
      before_state: { status: currentStatus || null },
      after_state: { status: nextStatus },
      source_interface: "admin_accounts_page",
    });

    revalidatePath("/admin/accounts");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  const { data, error } = await supabase
    .from("accounts")
    .select(
      "id, account_name, legal_name, primary_contact_name, primary_contact_email, status, created_at"
    )
    .order("created_at", { ascending: false });

  const accounts = (data as Account[] | null) ?? [];

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter((a) => (a.status ?? "active") === "active").length;
  const suspendedAccounts = accounts.filter((a) => a.status === "suspended").length;
  const archivedAccounts = accounts.filter((a) => a.status === "archived").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.13) 0%, rgba(212,175,55,0.04) 12%, rgba(8,8,8,1) 34%), linear-gradient(180deg, #060606 0%, #0d0d0d 46%, #141414 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "28px",
            padding: "34px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.20)",
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(255,255,255,0.05) 36%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.42)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: "420px",
              height: "420px",
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
              Orbitlink OS · Customer Control
            </div>

            <h1
              style={{
                margin: "0 0 12px 0",
                fontSize: "42px",
                lineHeight: 1.08,
                fontWeight: 700,
                color: "#fff7db",
              }}
            >
              Accounts
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "940px",
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.74)",
              }}
            >
              Manage customer organizations, contact ownership, lifecycle posture,
              and account status from one premium operator-grade control surface.
            </p>
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
          {[
            { label: "Total Accounts", value: totalAccounts },
            { label: "Active", value: activeAccounts },
            { label: "Suspended", value: suspendedAccounts },
            { label: "Archived", value: archivedAccounts },
          ].map((item) => (
            <div key={item.label} style={cardStyle}>
              <div
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.11em",
                  color: "rgba(255,255,255,0.58)",
                  marginBottom: "10px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "34px",
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
            display: "grid",
            gridTemplateColumns: "420px 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              ...cardStyle,
              border: "1px solid rgba(212, 175, 55, 0.16)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#d4af37",
                marginBottom: "10px",
              }}
            >
              Create Account
            </div>

            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: "22px",
                fontWeight: 600,
                color: "#fff7db",
              }}
            >
              New customer record
            </h2>

            <p
              style={{
                margin: "0 0 18px 0",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.64)",
              }}
            >
              Creates an account immediately, sets status to active, and writes a
              lifecycle event for account creation.
            </p>

            <form action={createAccount} style={{ display: "grid", gap: "12px" }}>
              <input
                name="account_name"
                placeholder="Account Name"
                required
                style={inputStyle}
              />
              <input
                name="legal_name"
                placeholder="Legal Name"
                style={inputStyle}
              />
              <input
                name="contact_name"
                placeholder="Primary Contact Name"
                style={inputStyle}
              />
              <input
                name="contact_email"
                placeholder="Primary Contact Email"
                type="email"
                style={inputStyle}
              />

              <button type="submit" style={primaryButton}>
                Create Account
              </button>
            </form>
          </div>

          <div
            style={{
              borderRadius: "28px",
              overflow: "hidden",
              border: "1px solid rgba(212, 175, 55, 0.14)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 24px 62px rgba(0,0,0,0.34)",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
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
                Account Register
              </h2>
            </div>

            {error ? (
              <div
                style={{
                  margin: "20px",
                  border: "1px solid rgba(255, 99, 71, 0.35)",
                  borderRadius: "20px",
                  padding: "20px",
                  background: "rgba(255, 99, 71, 0.08)",
                }}
              >
                <p style={{ margin: 0, color: "#ffb29b" }}>
                  Error loading accounts: {error.message}
                </p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "1200px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        textAlign: "left",
                      }}
                    >
                      <th style={headerCell}>Account</th>
                      <th style={headerCell}>Legal Name</th>
                      <th style={headerCell}>Primary Contact</th>
                      <th style={headerCell}>Email</th>
                      <th style={headerCell}>Status</th>
                      <th style={headerCell}>Created</th>
                      <th style={headerCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length ? (
                      accounts.map((account) => {
                        const currentStatus = account.status ?? "active";
                        const availableActions =
                          currentStatus === "active"
                            ? ["inactive", "suspended", "archived"]
                            : currentStatus === "inactive"
                              ? ["active", "archived"]
                              : currentStatus === "suspended"
                                ? ["active", "archived"]
                                : ["active"];

                        return (
                          <tr
                            key={account.id}
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <td style={bodyCell}>
                              <div style={{ fontWeight: 600, color: "#fff7db" }}>
                                {account.account_name}
                              </div>
                            </td>
                            <td style={bodyCell}>{account.legal_name ?? "—"}</td>
                            <td style={bodyCell}>{account.primary_contact_name ?? "—"}</td>
                            <td style={bodyCell}>{account.primary_contact_email ?? "—"}</td>
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
                                  ...getStatusBadgeStyle(currentStatus),
                                }}
                              >
                                {currentStatus}
                              </span>
                            </td>
                            <td style={bodyCell}>{account.created_at ?? "—"}</td>
                            <td style={bodyCell}>
                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {availableActions.map((nextStatus) => (
                                  <form key={nextStatus} action={updateAccountStatus}>
                                    <input type="hidden" name="account_id" value={account.id} />
                                    <input
                                      type="hidden"
                                      name="account_name"
                                      value={account.account_name}
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
                                    <button type="submit" style={actionButton(nextStatus)}>
                                      {nextStatus === "active"
                                        ? "Activate"
                                        : nextStatus === "inactive"
                                          ? "Mark Inactive"
                                          : nextStatus === "suspended"
                                            ? "Suspend"
                                            : "Archive"}
                                    </button>
                                  </form>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td style={bodyCell} colSpan={7}>
                          No accounts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "#f5f5f5",
  outline: "none",
};

const primaryButton: React.CSSProperties = {
  marginTop: "4px",
  padding: "12px 16px",
  borderRadius: "14px",
  border: "1px solid rgba(212, 175, 55, 0.28)",
  background: "rgba(212, 175, 55, 0.14)",
  color: "#fff2c4",
  fontWeight: 600,
  cursor: "pointer",
};

function actionButton(status: string): React.CSSProperties {
  if (status === "archived") {
    return {
      padding: "8px 12px",
      borderRadius: "999px",
      border: "1px solid rgba(255, 99, 71, 0.28)",
      background: "rgba(255, 99, 71, 0.12)",
      color: "#ffb29b",
      fontSize: "12px",
      cursor: "pointer",
    };
  }

  if (status === "suspended") {
    return {
      padding: "8px 12px",
      borderRadius: "999px",
      border: "1px solid rgba(255, 193, 7, 0.28)",
      background: "rgba(255, 193, 7, 0.12)",
      color: "#ffd666",
      fontSize: "12px",
      cursor: "pointer",
    };
  }

  if (status === "active") {
    return {
      padding: "8px 12px",
      borderRadius: "999px",
      border: "1px solid rgba(212, 175, 55, 0.34)",
      background: "rgba(212, 175, 55, 0.16)",
      color: "#f4d57b",
      fontSize: "12px",
      cursor: "pointer",
    };
  }

  return {
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#f3f3f3",
    fontSize: "12px",
    cursor: "pointer",
  };
}