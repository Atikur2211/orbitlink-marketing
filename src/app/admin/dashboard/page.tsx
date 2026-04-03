import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type StatCard = {
  label: string;
  value: number;
  tone?: "gold" | "neutral" | "danger" | "success" | "warn";
  href?: string;
};

type SectionCard = {
  name: string;
  href: string;
  description: string;
  eyebrow: string;
};

function getStatCardStyle(
  tone: StatCard["tone"] = "neutral"
): React.CSSProperties {
  switch (tone) {
    case "gold":
      return {
        border: "1px solid rgba(212, 175, 55, 0.24)",
        background:
          "linear-gradient(135deg, rgba(212,175,55,0.16) 0%, rgba(255,255,255,0.05) 42%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 22px 50px rgba(0,0,0,0.34)",
      };
    case "danger":
      return {
        border: "1px solid rgba(255, 99, 71, 0.22)",
        background:
          "linear-gradient(135deg, rgba(255,99,71,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 22px 50px rgba(0,0,0,0.34)",
      };
    case "success":
      return {
        border: "1px solid rgba(212, 175, 55, 0.18)",
        background:
          "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(255,248,220,0.04) 45%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 22px 50px rgba(0,0,0,0.34)",
      };
    case "warn":
      return {
        border: "1px solid rgba(255, 193, 7, 0.22)",
        background:
          "linear-gradient(135deg, rgba(255,193,7,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 22px 50px rgba(0,0,0,0.34)",
      };
    default:
      return {
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
      };
  }
}

function getStatValueColor(tone: StatCard["tone"]): string {
  switch (tone) {
    case "danger":
      return "#ffd2c6";
    case "gold":
    case "success":
      return "#fff2c4";
    case "warn":
      return "#ffe08a";
    default:
      return "#f5f5f5";
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
    lifecycleRes,
    incidentsRes,
    jobRunsRes,
    scheduledActionsRes,
  ] = await Promise.all([
    supabase.from("accounts").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("service_instances").select("*", { count: "exact", head: true }),
    supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .in("status", ["new", "open", "waiting_customer", "escalated"]),
    supabase.from("lifecycle_events").select("*", { count: "exact", head: true }),

    (supabase as any)
      .from("incidents")
      .select("*", { count: "exact", head: true })
      .in("status", ["open", "investigating", "identified", "monitoring"]),

    (supabase as any)
      .from("job_runs")
      .select("*", { count: "exact", head: true })
      .eq("status", "failed"),

    (supabase as any)
      .from("scheduled_actions")
      .select("*", { count: "exact", head: true })
      .in("status", ["scheduled", "queued", "running"]),
  ]);

  const stats: StatCard[] = [
    { label: "Accounts", value: accountsRes.count ?? 0, tone: "gold", href: "/admin/accounts" },
    { label: "Orders", value: ordersRes.count ?? 0, tone: "neutral", href: "/admin/orders" },
    { label: "Services", value: servicesRes.count ?? 0, tone: "success", href: "/admin/services" },
    { label: "Open Tickets", value: ticketsRes.count ?? 0, tone: "gold", href: "/admin/support" },
    { label: "Open Incidents", value: incidentsRes.count ?? 0, tone: "danger", href: "/admin/noc" },
    { label: "Failed Jobs", value: jobRunsRes.count ?? 0, tone: "danger", href: "/admin/noc" },
    { label: "Active Actions", value: scheduledActionsRes.count ?? 0, tone: "warn", href: "/admin/noc" },
    { label: "Lifecycle Events", value: lifecycleRes.count ?? 0, tone: "neutral", href: "/admin/lifecycle" },
  ];

  const sections: SectionCard[] = [
    {
      name: "Accounts",
      href: "/admin/accounts",
      eyebrow: "Customer control",
      description:
        "Manage organizations, account posture, ownership, and commercial structure.",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      eyebrow: "Provisioning flow",
      description:
        "Track submissions, install readiness, service activation, and order progression.",
    },
    {
      name: "Services",
      href: "/admin/services",
      eyebrow: "Service runtime",
      description:
        "Review active, degraded, suspended, and terminated service state across customers.",
    },
    {
      name: "Billing",
      href: "/admin/billing",
      eyebrow: "Revenue view",
      description:
        "Review invoices, payment position, and commercial service alignment.",
    },
    {
      name: "Support",
      href: "/admin/support",
      eyebrow: "Operational demand",
      description:
        "Track open tickets, customer issues, and response visibility from one surface.",
    },
    {
      name: "Locations",
      href: "/admin/locations",
      eyebrow: "Site inventory",
      description:
        "Manage service addresses, deployment footprint, and location-level customer context.",
    },
    {
      name: "Scheduled Actions",
      href: "/admin/scheduled-actions",
      eyebrow: "Automation layer",
      description:
        "Manage future-dated operational actions across orders, services, and lifecycle events.",
    },
    {
      name: "Lifecycle",
      href: "/admin/lifecycle",
      eyebrow: "Event ledger",
      description:
        "Review customer and service milestones with operator-grade event visibility.",
    },
    {
      name: "Incidents",
      href: "/admin/incidents",
      eyebrow: "NOC visibility",
      description:
        "Review outage, degradation, and shared operational events across customers and services.",
    },
    {
      name: "NOC Console",
      href: "/admin/noc",
      eyebrow: "Real-time operations",
      description:
        "View open incidents, failed automation, active scheduled actions, and open ticket demand in one operator console.",
    },
    {
      name: "Job Runs",
      href: "/admin/job-runs",
      eyebrow: "Execution visibility",
      description:
        "Review automation execution history, runtime outcomes, and failure tracing.",
    },
  ];

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

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.00) 100%)",
              pointerEvents: "none",
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
              Orbitlink OS · Executive Control Surface
            </div>

            <h1
              style={{
                margin: "0 0 12px 0",
                fontSize: "42px",
                lineHeight: 1.08,
                fontWeight: 700,
                color: "#fff7db",
                maxWidth: "920px",
              }}
            >
              Admin Dashboard
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "960px",
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.74)",
              }}
            >
              Premium internal command surface for customer accounts, provisioning,
              services, billing, support, lifecycle, scheduled automation,
              incident visibility, and execution monitoring across Orbitlink operations.
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
          {stats.map((item) => {
            const card = (
              <div
                style={{
                  borderRadius: "22px",
                  padding: "22px",
                  ...getStatCardStyle(item.tone),
                  height: "100%",
                }}
              >
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
                    color: getStatValueColor(item.tone),
                  }}
                >
                  {item.value}
                </div>
              </div>
            );

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {card}
                </Link>
              );
            }

            return <div key={item.label}>{card}</div>;
          })}
        </section>

        <section
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
              Control Modules
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
                  borderRadius: "22px",
                  padding: "22px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.24)",
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
                  {section.eyebrow}
                </div>

                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "18px",
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
                    lineHeight: 1.68,
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