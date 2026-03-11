// src/app/portal/app/tickets/[id]/page.tsx
import PageShell from "@/components/PageShell";
import TicketCommentBox from "@/components/portal/TicketCommentBox";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { touchSession, verifySessionCookieValue } from "@/lib/portalAuth";
import { getTicketForOrg, TicketRow } from "@/lib/portalTickets";
import TicketOpsControls from "@/components/portal/TicketOpsControls";
import TicketOpsActivity from "@/components/portal/TicketOpsActivity";

// ✅ Ops Controls is a client component embedded into this server page
import OpsControls from "./ui/OpsControls";

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

function fmtUTC(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return (
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d) + " UTC"
  );
}

function msToHuman(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h <= 0) return `${m}m`;
  return `${h}h ${m}m`;
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

function slaTone(t: TicketRow) {
  if (t.sla?.breached) return "red";
  if (t.priority === "Critical") return "red";
  if (t.priority === "High") return "gold";
  return "blue";
}

function safeDecode(v: string) {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

export default async function TicketDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!verified.ok) redirect("/portal/login");

  await touchSession(verified.sessionId).catch(() => {});

  const p = await params;
  const id = safeDecode(p.id);

  // ✅ org + role + email scope enforced server-side
  const t = await getTicketForOrg({
    orgId: verified.orgId,
    email: verified.email,
    role: verified.role,
    id,
  });

  if (!t) redirect("/portal/app/tickets");

  const now = Date.now();
  const breachAtMs = Date.parse(t.sla?.breachAt || "");
  const hasBreach = Number.isFinite(breachAtMs);
  const msLeft = hasBreach ? breachAtMs - now : 0;
  const isBreached = !!t.sla?.breached || (hasBreach && msLeft < 0);

  const slaLabel = isBreached
    ? "SLA BREACHED"
    : hasBreach
    ? `ACK DUE IN ${msToHuman(msLeft)}`
    : "SLA ACTIVE";

  return (
    <PageShell
      eyebrow="PORTAL / TICKET"
      title={`${t.id}`}
      subtitle="Traceable ticket record with disciplined updates, comments, and immutable timeline."
    >
      {/* header */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="gold">{t.category}</Pill>
              <Pill tone={toneForPriority(t.priority) as any}>PRIORITY: {t.priority}</Pill>
              <Pill tone={toneForStatus(t.status) as any}>{t.status}</Pill>
              <Pill tone={slaTone(t) as any}>{slaLabel}</Pill>
            </div>

            <div className="mt-4 text-lg sm:text-xl font-semibold text-white/90">{t.title}</div>
            <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">{t.impact}</div>

            {/* Meta grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/55">CREATED</div>
                <div className="mt-1 text-sm text-white/80">{fmtUTC(t.createdAt)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/55">UPDATED</div>
                <div className="mt-1 text-sm text-white/80">{fmtUTC(t.updatedAt)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/55">LAST ACTOR</div>
                <div className="mt-1 text-sm text-white/80 truncate">{t.lastActor}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/55">SLA DEADLINE</div>
                <div className="mt-1 text-sm text-white/80">
                  {t.sla?.breachAt ? fmtUTC(t.sla.breachAt) : "—"}
                </div>
                <div className="mt-1 text-[11px] text-white/45">
                  Target: {t.sla?.targetMinutes ? `${t.sla.targetMinutes}m` : "—"}
                </div>
              </div>
            </div>

            {/* tags */}
            {t.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {t.tags.slice(0, 12).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/api/portal/tickets/${encodeURIComponent(t.id)}/artifact`}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Export artifact (SHA256)
            </a>

            <a
              href="/portal/app/tickets"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
            >
              Back to tickets
            </a>

            <a
              href="/portal/app"
              className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
            >
              Console
            </a>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Evidence posture */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-[11px] tracking-[0.28em] text-white/55">EVIDENCE ARTIFACT</div>
              <div className="mt-2 text-sm text-white/70">
                Export produces a traceable JSON capsule with a SHA256 digest header (enterprise-safe, offline verifiable).
              </div>
              <div className="mt-2 text-xs text-white/45 leading-5">
                Posture: capsule is immutable; timeline events are append-only.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`/api/portal/tickets/${encodeURIComponent(t.id)}/artifact`}
                className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
              >
                Download capsule
              </a>
              <a
                href="/trust"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
              >
                Trust posture
              </a>
            </div>
          </div>
        </div>

        {/* ✅ OPS CONTROLS (admin/ops only) */}
        {verified.role !== "customer" ? (
          <div className="mt-6">
            <OpsControls ticketId={t.id} current={{ status: t.status, priority: t.priority, assignee: t.assignee || "Ops" }} />
          </div>
        ) : null}

        {/* Details */}
        <div className="mt-6">
          <div className="text-[11px] tracking-[0.28em] text-white/55">DETAILS</div>
          <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-white/75 leading-6">
{t.details}
          </pre>
        </div>
      </div>

      {/* comments + timeline */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <TicketOpsControls
            ticketId={t.id}
            initialStatus={t.status}
            initialPriority={t.priority}
            initialAssignee={t.assignee}
            billingAssignee="billing@orbitlink.ca"
          />
          
          {/* Timeline / Activity */}
          <TicketOpsActivity
            ticketId={t.id}
            timeline={t.timeline}
          />

          <TicketCommentBox ticketId={t.id} />

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
            <div className="text-[11px] tracking-[0.28em] text-white/55">COMMENTS</div>
            <div className="mt-3 space-y-3">
              {t.comments.length ? (
                t.comments.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-white/55">
                        <span className="text-white/75">{c.by}</span> • {fmtUTC(c.at)}
                      </div>
                      <Pill tone={c.role === "ops" ? "gold" : "blue"}>
                        {c.role === "ops" ? "OPERATOR" : "CUSTOMER"}
                      </Pill>
                    </div>
                    <div className="mt-3 text-sm text-white/75 leading-6 whitespace-pre-wrap">{c.body}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-white/60">No comments yet.</div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
            <div className="text-[11px] tracking-[0.28em] text-white/55">TIMELINE</div>
            <div className="mt-3 space-y-3">
              {t.timeline.length ? (
                t.timeline.map((e) => (
                  <div key={e.id} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <div className="text-xs text-white/55">{fmtUTC(e.at)}</div>
                    <div className="mt-1 text-sm text-white/80">
                      <span className="text-white/90">{e.type.toUpperCase()}</span>
                      <span className="text-white/50"> • </span>
                      <span className="text-white/70">{e.by}</span>
                    </div>

                    {e.from || e.to ? (
                      <div className="mt-1 text-xs text-white/50">
                        {e.from ? (
                          <span>
                            from <span className="text-white/70">{e.from}</span>{" "}
                          </span>
                        ) : null}
                        {e.to ? (
                          <span>
                            to <span className="text-white/70">{e.to}</span>
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    {e.note ? <div className="mt-1 text-xs text-white/45">{e.note}</div> : null}
                  </div>
                ))
              ) : (
                <div className="text-sm text-white/60">No events yet.</div>
              )}
            </div>

            <div className="mt-6 text-xs text-white/45 leading-5">
              Enterprise posture: timeline events are append-only. Future step: operator signatures + change approvals.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
