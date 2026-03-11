// src/app/api/portal/session/touch/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  verifySessionCookieValue,
  verifySessionExists,
  touchSession,
  mintRollingCookie,
  shouldRefreshCookie,
} from "@/lib/portalAuth";

export const runtime = "nodejs";

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  return res;
}

export async function POST() {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value || "";

  // 1) Cookie decode + signature + cookie-expiry
  const parsed = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!parsed.ok) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  // 2) Server session must exist + be valid (source of truth)
  const exists = await verifySessionExists(parsed.sessionId);
  if (!exists.ok) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  // 3) Extend server-side session (sliding)
  const touched = await touchSession(parsed.sessionId);
  if (!touched.ok) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  const res = jsonNoCache({ ok: true, expiresAt: touched.expiresAt }, { status: 200 });

  // 4) Refresh cookie if it’s close to expiring (rolling)
  if (shouldRefreshCookie(parsed.expiresAt)) {
    const nextCookie = mintRollingCookie({
      sessionId: exists.row.sessionId,
      email: exists.row.email,
      orgId: exists.row.orgId,
      role: exists.row.role,
    });

    res.cookies.set(COOKIE_NAME, nextCookie, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}
