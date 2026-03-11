// src/app/api/portal/keys/route.ts (AUDITOR KEY DISCOVERY)
// Lists public keys (PEM) for verifying capsule signatures.

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
import { listPublicKeys } from "@/lib/capsuleKeyring";

export const runtime = "nodejs";

function nowISO() {
  return new Date().toISOString();
}

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  return res;
}

function withRefreshedCookie(res: NextResponse, setCookieValue?: string) {
  if (!setCookieValue) return res;
  res.cookies.set(COOKIE_NAME, setCookieValue, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}

async function authGolden() {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value || "";
  const decoded = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!decoded.ok) return { ok: false as const };

  const exists = await verifySessionExists(decoded.sessionId);
  if (!exists.ok) return { ok: false as const };

  const touched = await touchSession(decoded.sessionId);
  if (!touched.ok) return { ok: false as const };

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
    auth: { email: exists.row.email, orgId: exists.row.orgId, role: exists.row.role },
    setCookieValue: nextCookie || undefined,
    serverExpiresAt: touched.expiresAt,
  };
}

export async function GET() {
  const gate = await authGolden();
  if (!gate.ok) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  // enterprise: ops/admin only
  if (gate.auth.role !== "ops" && gate.auth.role !== "admin") {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 }), gate.setCookieValue);
  }

  const keys = await listPublicKeys();

  const res = jsonNoCache(
    {
      ok: true,
      orgId: gate.auth.orgId,
      keys: keys.map((k) => ({
        keyId: k.keyId,
        alg: k.alg,
        createdAt: k.createdAt,
        publicKeyPem: k.publicKeyPem,
      })),
      session: { serverExpiresAt: gate.serverExpiresAt },
    },
    { status: 200 }
  );

  return withRefreshedCookie(res, gate.setCookieValue);
}
