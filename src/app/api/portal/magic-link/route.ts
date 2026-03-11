// src/app/api/portal/magic-link/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { cleanEmail } from "@/lib/portalAuth";

export const runtime = "nodejs";

function getIP(req: Request) {
  const h = req.headers;
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
}

function clean(v: unknown, max = 400) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function readBootstrapEmail() {
  return cleanEmail(process.env.PORTAL_DEV_BOOTSTRAP_EMAIL || "");
}

function readPortalSecret() {
  const s = String(process.env.PORTAL_COOKIE_SECRET || "").trim();
  if (!s || s.length < 24) {
    throw new Error("PORTAL_COOKIE_SECRET_missing");
  }
  return s;
}

function signBootstrapToken(payload: { email: string; expiresAt: string }) {
  const secret = readPortalSecret();
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const email = cleanEmail(body?.email);

    if (!email) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const bootstrapEmail = readBootstrapEmail();
    if (!bootstrapEmail || email !== bootstrapEmail) {
      return NextResponse.json({ ok: false, error: "not_provisioned" }, { status: 403 });
    }

    const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();
    const token = signBootstrapToken({ email, expiresAt });

    const base = process.env.PORTAL_PUBLIC_BASE_URL || "https://orbitlink.ca";
    const link = `${base}/portal/verify?token=${encodeURIComponent(token)}`;

    return NextResponse.json({
      ok: true,
      delivered: "dev-return-link",
      link,
      ip: clean(getIP(req), 120) || undefined,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}