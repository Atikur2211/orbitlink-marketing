// src/app/portal/verify/consume/route.ts
import { NextResponse } from "next/server";
import { verifyMagicToken, makeSessionCookieValue } from "@/lib/portalAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const token = String(body?.token || "").trim();
    if (!token) return NextResponse.json({ ok: false, error: "missing_token" }, { status: 400 });

    const v = await verifyMagicToken(token);
    if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

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
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
