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

    const account_name = formData.get("account_name") as string;
    const legal_name = formData.get("legal_name") as string;
    const contact_name = formData.get("contact_name") as string;
    const contact_email = formData.get("contact_email") as string;

    // 1. Insert account
    const { data: account, error } = await supabase
      .from("accounts")
      .insert({
        account_name,
        legal_name,
        primary_contact_name: contact_name,
        primary_contact_email: contact_email,
      })
      .select()
      .single();

    if (error || !account) {
      console.error(error);
      return;
    }

    // 2. Insert lifecycle event
    await supabase.from("lifecycle_events").insert({
      account_id: account.id,
      entity_type: "account",
      entity_id: account.id,
      event_type: "account_created",
      event_label: "Account created",
      notes: `New account created: ${account_name}`,
    });
  }

  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("id, account_name, legal_name, primary_contact_name, primary_contact_email, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Accounts
      </h1>

      {/* CREATE ACCOUNT FORM */}
      <form action={createAccount} style={{ marginBottom: "32px", display: "grid", gap: "12px", maxWidth: "400px" }}>
        <input name="account_name" placeholder="Account Name" required />
        <input name="legal_name" placeholder="Legal Name" />
        <input name="contact_name" placeholder="Contact Name" />
        <input name="contact_email" placeholder="Contact Email" />
        <button type="submit">Create Account</button>
      </form>

      {error ? (
        <div style={{ border: "1px solid #f3c2c2", borderRadius: "12px", padding: "20px" }}>
          <p style={{ margin: 0 }}>Error loading accounts: {error.message}</p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Account</th>
                <th style={{ padding: "12px" }}>Legal Name</th>
                <th style={{ padding: "12px" }}>Primary Contact</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(accounts as Account[] | null)?.length ? (
                (accounts as Account[]).map((account) => (
                  <tr key={account.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{account.account_name}</td>
                    <td style={{ padding: "12px" }}>{account.legal_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{account.primary_contact_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{account.primary_contact_email ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{account.status ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: "12px" }} colSpan={5}>
                    No accounts found.
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