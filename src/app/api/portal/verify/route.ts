// src/app/api/portal/verify/route.ts
import { NextResponse } from "next/server";
import { verifyMagicToken } from "@/lib/portalAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const token = String(body?.token || "").trim();

    const result = await verifyMagicToken(token);

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true, redirectTo: "/portal/app" });

    // ✅ cookie stores sessionId (dev-safe)
    res.cookies.set("orbit_portal_session", result.sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set true on HTTPS in production
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
