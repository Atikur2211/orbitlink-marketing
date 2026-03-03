// src/app/api/waitlist/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactBody = {
  id: string;
  contactedBy?: string;
  note?: string;
};

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function clean(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

export async function POST(req: Request) {
  try {
    const bodyUnknown: unknown = await req.json();

    if (!isObject(bodyUnknown)) {
      return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
    }

    const id = clean(bodyUnknown.id, 64);
    const contactedBy = clean(bodyUnknown.contactedBy, 120) || undefined;
    const note = clean(bodyUnknown.note, 800) || undefined;

    if (!id) {
      return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
    }

    // If you later wire this into a persistent store:
    // - update record: contactedAt/ reviewedAt / reviewNote, etc.
    // For now, return a clean operator response.

    const payload: ContactBody = { id, contactedBy, note };
    return NextResponse.json({ ok: true, payload });
  } catch (e: unknown) {
    console.error("contact route error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}