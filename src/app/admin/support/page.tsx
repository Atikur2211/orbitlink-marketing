import { createClient } from "@supabase/supabase-js";

type Ticket = {
  id: string;
  subject: string | null;
  category: string | null;
  priority: string | null;
  status: string | null;
  created_at: string | null;
  accounts: {
    account_name: string;
  } | null;
  locations: {
    location_name: string | null;
  } | null;
  service_instances: {
    service_name: string;
  } | null;
};

export default async function AdminSupportPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: tickets, error } = await supabase
    .from("tickets")
    .select(`
      id,
      subject,
      category,
      priority,
      status,
      created_at,
      accounts ( account_name ),
      locations ( location_name ),
      service_instances ( service_name )
    `)
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Support
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
        Track customer tickets and issues.
      </p>

      {error ? (
        <div style={{ border: "1px solid #f3c2c2", borderRadius: "12px", padding: "20px" }}>
          <p style={{ margin: 0 }}>Error loading tickets: {error.message}</p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Subject</th>
                <th style={{ padding: "12px" }}>Account</th>
                <th style={{ padding: "12px" }}>Location</th>
                <th style={{ padding: "12px" }}>Service</th>
                <th style={{ padding: "12px" }}>Category</th>
                <th style={{ padding: "12px" }}>Priority</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(tickets as Ticket[] | null)?.length ? (
                (tickets as Ticket[]).map((ticket) => (
                  <tr key={ticket.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{ticket.subject ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{ticket.accounts?.account_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{ticket.locations?.location_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{ticket.service_instances?.service_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{ticket.category ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{ticket.priority ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{ticket.status ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: "12px" }} colSpan={7}>
                    No tickets found.
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