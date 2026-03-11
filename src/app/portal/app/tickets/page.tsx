// src/app/portal/app/tickets/page.tsx
import PageShell from "@/components/PageShell";
import TicketComposer from "@/components/portal/TicketComposer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { touchSession, verifySessionCookieValue } from "@/lib/portalAuth";
import { listTicketsForOrg, TicketRow } from "@/lib/portalTickets";

function Pill({
  tone = "neutral",
  children,
}: {
  tone?: "gold" | "emerald" | "blue" | "neutral" | "red";
  children: React.ReactNode;
}) {
  const cls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : tone === "blue"
      ? "border-blue-400/20 bg-blue-500/10 text-blue-200"
      : tone === "gold"
      ? "border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FDE68A]"
      : tone === "red"
      ? "border-red-400/20 bg-red-500/10 text-red-200"
      : "border-white/12 bg-white/5 text-white/70";

  return (
    <span
      className={["inline-flex items-center rounded-full border px-3 py-1 text-[11px]", cls].join(
        " "
      )}
    >
      {children}
    </span>
  );
}

function toneForStatus(s: TicketRow["status"]) {
  if (s === "Resolved" || s === "Closed") return "emerald";
  if (s === "In Progress") return "blue";
  if (s === "Awaiting Info") return "gold";
  return "neutral";
}

function toneForPriority(p: TicketRow["priority"]) {
  if (p === "Critical") return "red";
  if (p === "High") return "gold";
  if (p === "Normal") return "blue";
  return "neutral";
}

function fmtISO(iso: string) {
  // Keep it deterministic + safe (no locale drift in server render)
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // YYYY-MM-DD HH:MM UTC
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi} UTC`;
}

function TicketCard({ t }: { t: TicketRow }) {
  return (
    <a
      href={`/portal/app/tickets/${encodeURIComponent(t.id)}`}
      className={[
        "group block rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 transition",
        "hover:bg-white/[0.06] hover:border-white/15",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-white/45">{t.id}</div>
          <div className="mt-2 text-sm sm:text-[15px] font-semibold text-white/90 truncate">
            {t.title}
          </div>
          <div className="mt-2 text-sm text-white/65 leading-6">{t.impact}</div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <Pill tone={toneForStatus(t.status) as any}>{t.status}</Pill>
          <Pill tone={toneForPriority(t.priority) as any}>PRIORITY: {t.priority}</Pill>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-xs text-white/55">CATEGORY</div>
          <div className="mt-1 text-sm text-white/80">{t.category}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-xs text-white/55">UPDATED</div>
          <div className="mt-1 text-sm text-white/80">{fmtISO(t.updatedAt)}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="text-xs text-white/55">LAST ACTOR</div>
          <div className="mt-1 text-sm text-white/80 truncate">{t.lastActor}</div>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/75 group-hover:text-white transition">
        <span>Open ticket</span>
        <span className="translate-x-0 group-hover:translate-x-0.5 transition">→</span>
      </div>
    </a>
  );
}

export default async function TicketsPage() {
  // ✅ Next dynamic APIs: cookies() may be async in your Next version
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!verified.ok) redirect("/portal/login");

  // keepalive
  await touchSession(verified.sessionId).catch(() => {});

  // ✅ FIX: correct call signature (orgId + email + role)
  const tickets = await listTicketsForOrg({
    orgId: verified.orgId,
    email: verified.email,
    role: verified.role,
  });

  return (
    <PageShell
      eyebrow="PORTAL / TICKETS"
      title="Tickets & Requests"
      subtitle="High-signal intake with disciplined, timestamped updates. Built to stay calm under load."
    >
      {/* posture header */}
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="gold">CONTROLLED INTAKE</Pill>
              <Pill tone="blue">TIMESTAMPED UPDATES</Pill>
              <Pill tone="emerald">OPERATOR POSTURE</Pill>
            </div>
            <div className="mt-4 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
              Keep requests crisp. Define scope, impact, timeline, and desired outcome. Noise is rejected to
              protect operations.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/portal/app"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Console
            </a>
            <a
              href="#new"
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Open ticket
            </a>
          </div>
        </div>
      </div>

      {/* list */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-5">
        {tickets.length ? (
          tickets.map((t) => <TicketCard key={t.id} t={t} />)
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
            <div className="text-[11px] tracking-[0.28em] text-white/55">NO TICKETS</div>
            <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">Nothing open</div>
            <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
              When you open a ticket, it appears here with status + priority + timeline.
            </div>
          </div>
        )}
      </div>

      {/* composer */}
      <div id="new" className="mt-4 sm:mt-5">
        <TicketComposer />
      </div>
    </PageShell>
  );
}
