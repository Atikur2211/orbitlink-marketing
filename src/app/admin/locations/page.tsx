import { createClient } from "@supabase/supabase-js";

type Location = {
  id: string;
  location_name: string | null;
  address_line_1: string;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  status: string | null;
  accounts: {
    account_name: string;
  } | null;
};

export default async function AdminLocationsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: locations, error } = await supabase
    .from("locations")
    .select(`
      id,
      location_name,
      address_line_1,
      city,
      province,
      postal_code,
      contact_name,
      contact_phone,
      status,
      accounts ( account_name )
    `)
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Locations
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
        Manage service addresses and site contacts.
      </p>

      {error ? (
        <div style={{ border: "1px solid #f3c2c2", borderRadius: "12px", padding: "20px" }}>
          <p style={{ margin: 0 }}>Error loading locations: {error.message}</p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Location</th>
                <th style={{ padding: "12px" }}>Account</th>
                <th style={{ padding: "12px" }}>Address</th>
                <th style={{ padding: "12px" }}>Contact</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(locations as Location[] | null)?.length ? (
                (locations as Location[]).map((location) => (
                  <tr key={location.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{location.location_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>{location.accounts?.account_name ?? "—"}</td>
                    <td style={{ padding: "12px" }}>
                      {location.address_line_1}
                      <br />
                      <span style={{ color: "#666" }}>
                        {[location.city, location.province, location.postal_code].filter(Boolean).join(", ")}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {location.contact_name ?? "—"}
                      <br />
                      <span style={{ color: "#666" }}>{location.contact_phone ?? "—"}</span>
                    </td>
                    <td style={{ padding: "12px" }}>{location.status ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: "12px" }} colSpan={5}>
                    No locations found.
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