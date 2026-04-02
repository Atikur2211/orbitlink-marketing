import { createClient } from "@supabase/supabase-js";

type StatCard = {
  label: string;
  value: number;
  tone?: "gold" | "neutral" | "danger";
};

type SectionCard = {
  name: string;
  href: string;
  description: string;
};

function getStatCardStyle(tone: StatCard["tone"] = "neutral"): React.CSSProperties {
  switch (tone) {
    case "gold":
      return {
        border: "1px solid rgba(212, 175, 55, 0.18)",
        background:
          "linear-gradient(135deg, rgba(212,175,55,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
      };
    case "danger":
      return {
        border: "1px solid rgba(255, 99, 71, 0.18)",
        background:
          "linear-gradient(135deg, rgba(255,99,71,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
      };
    default:
      return {
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
      };
  }
}

export default async function AdminDashboardPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [
    accountsRes,
    ordersRes,
    servicesRes,
    ticketsRes,
    scheduledActionsRes,
    lifecycleRes,
    jobRunsRes,
  ] = await Promise.all([
    supabase.from("accounts").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("service_instances").select("*", { count: "exact", head: true }),
    supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .in("status", ["new", "open", "waiting_customer", "escalated"]),
    supabase
      .from("scheduled_actions")
      .select("*", { count: "exact", head: true })
      .in("status", ["scheduled", "queued", "running", "failed"]),
    supabase.from("lifecycle_events").select("*", { count: "exact", head: true }),
    (supabase as any)
      .from("job_runs")
      .select("*", { count: "exact", head: true }),
  ]);

  const stats: StatCard[] = [
    { label: "Accounts", value: accountsRes.count ?? 0, tone: "gold" },
    { label: "Orders", value: ordersRes.count ?? 0 },
    { label: "Services", value: servicesRes.count ?? 0 },
    { label: "Open Tickets", value: ticketsRes.count ?? 0, tone: "danger" },
    { label: "Active Scheduled Actions", value: scheduledActionsRes.count ?? 0 },
    { label: "Lifecycle Events", value: lifecycleRes.count ?? 0 },
    { label: "Job Runs", value: jobRunsRes.count ?? 0, tone: "gold" },
  ];

  const sections: SectionCard[] = [
    {
      name: "Accounts",
      href: "/admin/accounts",
      description: "Manage customer organizations, account state, and commercial ownership.",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      description: "Track submissions, installs, activation readiness, and order progression.",
    },
    {
      name: "Services",
      href: "/admin/services",
      description: "Review live service state, runtime changes, and service control actions.",
    },
    {
      name: "Billing",
      href: "/admin/billing",
      description: "Review invoices, payment position, and financial service alignment.",
    },
    {
      name: "Support",
      href: "/admin/support",
      description: "Track support demand, open tickets, and customer operational issues.",
    },
    {
      name: "Locations",
      href: "/admin/locations",
      description: "Manage service addresses, site context, and deployment geography.",
    },
    {
      name: "Scheduled Actions",
      href: "/admin/scheduled-actions",
      description: "Manage future-dated workflow actions across orders and services.",
    },
    {
      name: "Lifecycle",
      href: "/admin/lifecycle",
      description: "Review key operational events across accounts, orders, and services.",
    },
    {
      name: "Job Runs",
      href: "/admin/job-runs",
      description: "Review automation execution history, failures, and runtime outcomes.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.10) 0%, rgba(10,10,10,1) 24%), linear-gradient(180deg, #080808 0%, #101010 46%, #151515 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1480px", margin: "0 auto" }}>
        <section
          style={{
            marginBottom: "28px",
            padding: "32px",
            borderRadius: "28px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 28px 70px rgba(0,0,0,0.40)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 85% 20%, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.00) 35%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#d4af37",
                marginBottom: "14px",
              }}
            >
              Orbitlink OS
            </div>

            <h1
              style={{
                fontSize: "40px",
                lineHeight: 1.1,
                fontWeight: 700,
                margin: "0 0 12px 0",
                color: "#fff7db",
              }}
            >
              Admin Dashboard
            </h1>

            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.74)",
                margin: 0,
                maxWidth: "860px",
                lineHeight: 1.7,
              }}
            >
              Enterprise control surface for Orbitlink operations across accounts,
              orders, services, billing, support, lifecycle, scheduled automation,
              and execution monitoring.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          {stats.map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: "22px",
                padding: "22px",
                ...getStatCardStyle(item.tone),
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
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
                  color: item.tone === "danger" ? "#ffcfbf" : "#fff2c4",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            borderRadius: "26px",
            border: "1px solid rgba(212, 175, 55, 0.14)",
            background: "rgba(255,255,255,0.03)",
            boxShadow: "0 22px 55px rgba(0,0,0,0.32)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(212,175,55,0.06)",
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
              Admin Sections
            </h2>
          </div>

          <div
            style={{
              padding: "22px",
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
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "20px",
                  padding: "22px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
                  transition: "transform 180ms ease, border-color 180ms ease",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#fff7db",
                  }}
                >
                  {section.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.66)",
                  }}
                >
                  {section.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}