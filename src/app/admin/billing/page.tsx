import { createClient } from "@supabase/supabase-js";

type Invoice = {
  id: string;
  invoice_number: string;
  amount: number;
  due_date: string | null;
  status: string | null;
  stripe_invoice_id: string | null;
  accounts: {
    account_name: string;
  } | null;
  service_instances: {
    service_name: string;
  } | null;
};

export default async function AdminBillingPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: invoices, error } = await supabase
    .from("invoices")
    .select(`
      id,
      invoice_number,
      amount,
      due_date,
      status,
      stripe_invoice_id,
      accounts ( account_name ),
      service_instances ( service_name )
    `)
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Billing
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
        Review invoices and payment state.
      </p>

      {error ? (
        <div style={{ border: "1px solid #f3c2c2", borderRadius: "12px", padding: "20px" }}>
          <p style={{ margin: 0 }}>Error loading invoices: {error.message}</p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Invoice</th>
                <th style={{ padding: "12px" }}>Account</th>
                <th style={{ padding: "12px" }}>Service</th>
                <th style={{ padding: "12px" }}>Amount</th>
                <th style={{ padding: "12px" }}>Due Date</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(invoices as Invoice[] | null)?.length ? (
                (invoices as Invoice[]).map((invoice) => (
                  <tr key={invoice.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{invoice.invoice_number}</td>
                    <td style={{ padding: "12px" }}>{invoice.accounts?.account_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{invoice.service_instances?.service_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>${Number(invoice.amount).toFixed(2)}</td>
                    <td style={{ padding: "12px" }}>{invoice.due_date ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{invoice.status ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: "12px" }} colSpan={6}>
                    No invoices found.
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