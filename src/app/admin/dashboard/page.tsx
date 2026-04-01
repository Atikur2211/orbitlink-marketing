import { createClient } from "@supabase/supabase-js";

export default async function AdminDashboardPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [accountsRes, ordersRes, servicesRes, ticketsRes] = await Promise.all([
    supabase.from("accounts").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("service_instances").select("*", { count: "exact", head: true }),
    supabase.from("tickets").select("*", { count: "exact", head: true }).in("status", [
      "new",
      "open",
      "waiting_customer",
      "escalated",
    ]),
  ]);

  const sections = [
    { name: "Accounts", href: "/admin/accounts", description: "Manage customer businesses" },
    { name: "Orders", href: "/admin/orders", description: "Track installs and activations" },
    { name: "Services", href: "/admin/services", description: "View active and pending services" },
    { name: "Billing", href: "/admin/billing", description: "Review invoices and payment state" },
    { name: "Support", href: "/admin/support", description: "Track tickets and requests" },
    { name: "Locations", href: "/admin/locations", description: "Manage service addresses" },
    { name: "Scheduled Actions", href: "/admin/scheduled-actions", description: "Manage future-dated workflow actions" },
    { name: "Lifecycle", href: "/admin/lifecycle", description: "Review major customer and service events" },
  ];

  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Orbitlink Admin Dashboard
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "32px" }}>
        Internal control panel for accounts, orders, services, billing, and support.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", marginBottom: "8px" }}>Accounts</h2>
          <p style={{ fontSize: "28px", fontWeight: 700 }}>{accountsRes.count ?? 0}</p>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", marginBottom: "8px" }}>Orders</h2>
          <p style={{ fontSize: "28px", fontWeight: 700 }}>{ordersRes.count ?? 0}</p>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", marginBottom: "8px" }}>Services</h2>
          <p style={{ fontSize: "28px", fontWeight: 700 }}>{servicesRes.count ?? 0}</p>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", marginBottom: "8px" }}>Open Tickets</h2>
          <p style={{ fontSize: "28px", fontWeight: 700 }}>{ticketsRes.count ?? 0}</p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
          Admin Sections
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {sections.map((section) => (
            <a
              key={section.name}
              href={section.href}
              style={{
                display: "block",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                {section.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>{section.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}