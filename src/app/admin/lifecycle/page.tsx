import { createClient } from "@supabase/supabase-js";

type LifecycleEvent = {
  id: string;
  entity_type: string;
  event_type: string;
  event_label: string | null;
  notes: string | null;
  created_at: string | null;
  accounts: { account_name: string }[] | null;
};

export default async function AdminLifecyclePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("lifecycle_events")
    .select(`
      id,
      entity_type,
      event_type,
      event_label,
      notes,
      created_at,
      accounts ( account_name )
    `)
    .order("created_at", { ascending: false });

  const events = (data as LifecycleEvent[] | null) ?? [];

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Lifecycle Log
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
        Track major customer and service events across Orbitlink.
      </p>

      {error ? (
        <div style={{ border: "1px solid #f3c2c2", borderRadius: "12px", padding: "20px" }}>
          <p style={{ margin: 0 }}>Error loading lifecycle events: {error.message}</p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Account</th>
                <th style={{ padding: "12px" }}>Entity</th>
                <th style={{ padding: "12px" }}>Event Type</th>
                <th style={{ padding: "12px" }}>Label</th>
                <th style={{ padding: "12px" }}>Notes</th>
                <th style={{ padding: "12px" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {events.length ? (
                events.map((event) => (
                  <tr key={event.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>
                      {event.accounts?.[0]?.account_name ?? "—"}
                    </td>
                    <td style={{ padding: "12px" }}>{event.entity_type}</td>
                    <td style={{ padding: "12px" }}>{event.event_type}</td>
                    <td style={{ padding: "12px" }}>{event.event_label ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{event.notes ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{event.created_at ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: "12px" }} colSpan={6}>
                    No lifecycle events found.
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