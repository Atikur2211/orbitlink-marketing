import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  verifySessionCookieValue,
  verifySessionExists,
  touchSession,
  shouldRefreshCookie,
  mintRollingCookie,
} from "@/lib/portalAuth";

export const runtime = "nodejs";

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  return res;
}

async function authGolden() {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value || "";

  const decoded = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!decoded.ok) return { ok: false as const, why: "cookie_decode_failed" };

  const exists = await verifySessionExists(decoded.sessionId);
  if (!exists.ok) return { ok: false as const, why: "session_missing_or_expired" };

  const touched = await touchSession(decoded.sessionId);
  if (!touched.ok) return { ok: false as const, why: "touch_failed" };

  const refresh = shouldRefreshCookie(decoded.expiresAt);
  const nextCookie = refresh
    ? mintRollingCookie({
        sessionId: exists.row.sessionId,
        email: exists.row.email,
        orgId: exists.row.orgId,
        role: exists.row.role,
      })
    : null;

  return {
    ok: true as const,
    auth: {
      sessionId: exists.row.sessionId,
      email: exists.row.email,
      orgId: exists.row.orgId,
      role: exists.row.role,
    },
    setCookieValue: nextCookie || undefined,
    serverExpiresAt: touched.expiresAt,
  };
}

export async function GET() {
  const gate = await authGolden();
  if (!gate.ok) return jsonNoCache({ ok: false, error: "unauthorized", why: gate.why }, { status: 401 });

  const res = jsonNoCache(
    { ok: true, auth: gate.auth, session: { serverExpiresAt: gate.serverExpiresAt } },
    { status: 200 }
  );

  if (gate.setCookieValue) {
    res.cookies.set(COOKIE_NAME, gate.setCookieValue, { httpOnly: true, sameSite: "lax", path: "/" });
  }

  return res;
}
