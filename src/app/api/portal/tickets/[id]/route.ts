// src/app/api/portal/tickets/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookieValue } from "@/lib/portalAuth";
import { getTicketForOrg } from "@/lib/portalTickets";

export const runtime = "nodejs";

const CACHE_CONTROL = "private, must-revalidate";

function baseHeaders() {
  return {
    "Cache-Control": CACHE_CONTROL,
    "Vary": "Cookie",
    "X-Content-Type-Options": "nosniff",
  } as Record<string, string>;
}

async function authOr401() {
  const jar = await cookies();
  const v = jar.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!verified.ok) return null;
  return verified; // expects { ok:true, orgId, email, role, ... }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const a = await authOr401();
  if (!a) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401, headers: baseHeaders() }
    );
  }

  const p = await params;
  const id = decodeURIComponent(p.id);

  const t = await getTicketForOrg({
    orgId: a.orgId,
    email: a.email,
    role: a.role,
    id,
  });

  if (!t) {
    return NextResponse.json(
      { ok: false, error: "not_found" },
      { status: 404, headers: baseHeaders() }
    );
  }

  return NextResponse.json(
    { ok: true, ticket: t },
    { status: 200, headers: baseHeaders() }
  );
}
