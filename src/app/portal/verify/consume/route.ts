// src/app/portal/verify/consume/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { makeSessionCookieValue } from "@/lib/portalAuth";

export const runtime = "nodejs";

function clean(v: unknown, max = 400) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function cleanEmail(v: unknown) {
  const s = clean(v, 200).toLowerCase();
  if (!s || !s.includes("@")) return "";
  return s;
}

function readAllowedEmails() {
  return String(process.env.PORTAL_ALLOWED_EMAILS || "")
    .split(",")
    .map((x) => cleanEmail(x))
    .filter(Boolean);
}

function readPortalSecret() {
  const s = String(process.env.PORTAL_COOKIE_SECRET || "").trim();
  if (!s || s.length < 24) {
    throw new Error("PORTAL_COOKIE_SECRET_missing");
  }
  return s;
}

function verifyBootstrapToken(token: string) {
  const secret = readPortalSecret();
  const allowedEmails = readAllowedEmails();
  if (allowedEmails.length === 0) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const payloadB64 = parts[0];
  const sig = parts[1];

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  const decoded = Buffer.from(payloadB64, "base64url").toString("utf8");
  const payload = JSON.parse(decoded);

  const email = cleanEmail(payload?.email);
  const exp = Date.parse(String(payload?.expiresAt || ""));

  if (!email || !allowedEmails.includes(email)) return null;
  if (!exp || Date.now() > exp) return null;

  const role = email === "support@orbitlink.ca" ? "ops" : "admin";

  return {
    email,
    orgId: "orbitlink-internal",
    role: role as const,
    sessionId: crypto.randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const token = String(body?.token || "").trim();

    if (!token) {
      return NextResponse.json({ ok: false, error: "missing_token" }, { status: 400 });
    }

    const v = verifyBootstrapToken(token);
    if (!v) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const cookieValue = makeSessionCookieValue({
      sessionId: v.sessionId,
      email: v.email,
      orgId: v.orgId,
      role: v.role,
      expiresAt: v.expiresAt,
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set("orbit_portal_session", cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(v.expiresAt),
    });

    return res;
  } catch (e) {
    console.error("portal verify consume error:", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}