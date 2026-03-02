import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

type Row = Record<string, any>;

async function readJSON(filePath: string): Promise<Row[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeJSONAtomic(filePath: string, data: unknown) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

export async function POST() {
  const filePath = path.join(process.cwd(), "waitlist.json");
  const list = await readJSON(filePath);

  let changed = 0;

  const next = list.map((x) => {
    if (!x || typeof x !== "object") return x;
    if (typeof x.id === "string" && x.id.trim()) return x;

    changed += 1;
    return {
      ...x,
      id: crypto.randomBytes(8).toString("hex"),
      updatedAt: new Date().toISOString(),
    };
  });

  if (changed) await writeJSONAtomic(filePath, next);

  return NextResponse.json({ ok: true, changed });
}
