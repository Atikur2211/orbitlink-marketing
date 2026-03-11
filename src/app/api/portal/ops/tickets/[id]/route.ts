// src/app/api/portal/ops/tickets/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookieValue } from "@/lib/portalAuth";
import { opsPatchTicket } from "@/lib/portalTickets";

export const runtime = "nodejs";

/**
 * Authenticated endpoint cache posture:
 * - private: only browser/private caches, never shared
 * - must-revalidate: enables safe ETag/304 later if you add it
 */
const CACHE_CONTROL = "private, must-revalidate";

function baseHeaders() {
  return {
    "Cache-Control": CACHE_CONTROL,
    "Vary": "Cookie",
    "X-Content-Type-Options": "nosniff",
  } as Record<string, string>;
}

async function authOpsOr403() {
  const jar = await cookies();
  const v = jar.get("orbit_portal_session")?.value || "";
  const a = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!a.ok) return null;
  if (a.role !== "ops") return null;
  return a;
}

/**
 * PATCH /api/portal/ops/tickets/[id]
 * Ops-only: patch ticket fields.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const a = await authOpsOr403();
  if (!a) {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403, headers: baseHeaders() }
    );
  }

  const p = await params;
  const id = decodeURIComponent(p.id);

  // Parse body safely
  const body = (await req.json().catch(() => ({}))) as any;

  // Allow only known patch fields (enterprise-safe)
  const patch: Record<string, any> = {};
  if (body?.status !== undefined) patch.status = body.status;
  if (body?.priority !== undefined) patch.priority = body.priority;
  if (body?.assignee !== undefined) patch.assignee = body.assignee;

  // Reject empty patches (optional but professional)
  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { ok: false, error: "no_valid_fields" },
      { status: 400, headers: baseHeaders() }
    );
  }

  try {
    const t = await opsPatchTicket({
      orgId: a.orgId,
      ticketId: id,
      actorEmail: a.email,
      role: "ops",
      patch,
    });

    return NextResponse.json(
      { ok: true, ticket: t },
      { status: 200, headers: baseHeaders() }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || "invalid") },
      { status: 400, headers: baseHeaders() }
    );
  }
}
