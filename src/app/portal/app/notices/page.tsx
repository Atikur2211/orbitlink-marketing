// src/app/portal/app/notices/page.tsx
import PageShell from "@/components/PageShell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { touchSession, verifySessionCookieValue } from "@/lib/portalAuth";

export default async function NoticesPage() {
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!verified.ok) redirect("/portal/login");
  await touchSession(verified.sessionId).catch(() => {});

  return (
    <PageShell
      eyebrow="PORTAL / OPS"
      title="Operator Notices"
      subtitle="High-signal updates only (stub). Next: wire to a notice feed."
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-sm text-white/70">
          No notices posted.
        </div>
      </div>
    </PageShell>
  );
}
