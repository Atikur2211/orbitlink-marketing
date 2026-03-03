// src/app/api/waitlist/contacted/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = clean(url.searchParams.get("id"), 64);

    // If you later connect to storage, you can check status.
    // For now we return an operator-safe shape.

    return NextResponse.json({
      ok: true,
      id: id || null,
      contacted: id ? true : null,
    });
  } catch (e: unknown) {
    console.error("contacted route error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}