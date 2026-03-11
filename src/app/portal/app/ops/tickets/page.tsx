// src/app/portal/app/ops/tickets/page.tsx
import PageShell from "@/components/PageShell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { touchSession, verifySessionCookieValue } from "@/lib/portalAuth";
import { listTicketsForOrg } from "@/lib/portalTickets";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

export default async function OpsTickets() {
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const a = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!a.ok) redirect("/portal/login");
  if (a.role !== "ops") redirect("/portal/app");

  await touchSession(a.sessionId).catch(() => {});

  const tickets = await listTicketsForOrg({ orgId: a.orgId, email: a.email, role: a.role });

  return (
    <PageShell
      eyebrow="PORTAL / OPS"
      title="Ops Inbox"
      subtitle="High-signal queue for intake, triage, assignment, and status discipline."
    >
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          <Pill>ROLE: OPS</Pill>
          <Pill>ORG: {a.orgId}</Pill>
          <Pill>DISCIPLINED UPDATES</Pill>
          <Pill>NOISE REJECTED</Pill>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-5">
        {tickets.map((t) => (
          <a
            key={t.id}
            href={`/portal/app/tickets/${encodeURIComponent(t.id)}`}
            className="block rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 hover:bg-white/[0.06] transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs text-white/45">{t.id} • {t.ownerEmail}</div>
                <div className="mt-2 text-sm sm:text-[15px] font-semibold text-white/90 truncate">{t.title}</div>
                <div className="mt-2 text-sm text-white/65">{t.impact}</div>
              </div>
              <div className="text-xs text-white/55 text-right">
                <div>Status: <span className="text-white/80">{t.status}</span></div>
                <div>Priority: <span className="text-white/80">{t.priority}</span></div>
                <div className="mt-2">
                  SLA breach at <span className="text-white/80">{t.sla.breachAt}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
