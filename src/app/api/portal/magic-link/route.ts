// src/app/api/portal/magic-link/route.ts
import { NextResponse } from "next/server";
import { makeMagicToken, cleanEmail } from "@/lib/portalAuth";

export const runtime = "nodejs";

function getIP(req: Request) {
  const h = req.headers;
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const email = cleanEmail(body?.email);

    if (!email) return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });

    const { token } = await makeMagicToken({
      email,
      ip: getIP(req),
      userAgent: req.headers.get("user-agent") || "",
      ttlMinutes: 20,
    });

    const base = process.env.PORTAL_PUBLIC_BASE_URL || "http://localhost:3000";
    const link = `${base}/portal/verify?token=${encodeURIComponent(token)}`;

    // ✅ dev-safe return link
    return NextResponse.json({ ok: true, delivered: "dev-return-link", link });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
