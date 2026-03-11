// src/app/api/ops/waitlist/contact/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type WaitlistRow = {
  id?: string;
  email?: string;

  createdAt?: string;
  updatedAt?: string;
  ts?: string; // old format compatibility

  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;

  lastContactedAt?: string;
};

async function readJSON(filePath: string): Promise<WaitlistRow[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WaitlistRow[]) : [];
  } catch {
    return [];
  }
}

async function writeJSONAtomic(filePath: string, data: unknown) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

function clean(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const id = clean(body?.id, 80);
    const contacted = Boolean(body?.contacted); // true -> stamp, false -> clear

    if (!id) {
      return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "waitlist.json");
    const list = await readJSON(filePath);

    const idx = list.findIndex((x) => String(x?.id || "") === id);
    if (idx < 0) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const prev = list[idx];

    // ✅ Million-dollar ops move:
    // If you contact them, they are de-facto reviewed (unless already reviewed).
    // Clearing contacted does NOT erase reviewed (audit-safe).
    const nextRow: WaitlistRow = {
      ...prev,
      updatedAt: now,

      lastContactedAt: contacted ? now : undefined,

      reviewedAt: contacted ? (prev.reviewedAt || now) : prev.reviewedAt,
      reviewedBy: prev.reviewedBy,
      reviewNote: prev.reviewNote,
    };

    const next = list.slice();
    next[idx] = nextRow;

    await writeJSONAtomic(filePath, next);

    return NextResponse.json({
      ok: true,
      id,
      lastContactedAt: nextRow.lastContactedAt ?? null,
      reviewedAt: nextRow.reviewedAt ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
