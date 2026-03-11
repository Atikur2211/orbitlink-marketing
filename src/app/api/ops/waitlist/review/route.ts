// src/app/api/ops/waitlist/review/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type Row = {
  id?: string;
  updatedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;
};

function clean(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

async function readList(filePath: string): Promise<Row[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Row[]) : [];
  } catch {
    return [];
  }
}

async function writeAtomic(filePath: string, data: unknown) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const id = clean(body?.id, 80);
    const reviewed = Boolean(body?.reviewed);

    // optional (future-proof)
    const reviewedBy = clean(body?.reviewedBy, 80);
    const reviewNote = clean(body?.reviewNote, 600);

    if (!id) {
      return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "waitlist.json");
    const list = await readList(filePath);

    const idx = list.findIndex((x) => String(x?.id || "") === id);
    if (idx < 0) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const prev = list[idx];

    list[idx] = {
      ...prev,
      updatedAt: now,
      reviewedAt: reviewed ? (prev.reviewedAt || now) : undefined,
      reviewedBy: reviewed ? (reviewedBy || prev.reviewedBy) : undefined,
      reviewNote: reviewed ? (reviewNote || prev.reviewNote) : undefined,
    };

    await writeAtomic(filePath, list);

    return NextResponse.json({
      ok: true,
      id,
      reviewedAt: list[idx].reviewedAt ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
