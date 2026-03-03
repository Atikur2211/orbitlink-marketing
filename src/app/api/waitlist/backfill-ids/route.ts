// src/app/api/waitlist/backfill-ids/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type SubmissionLike = {
  id?: string;
  email?: string;
  createdAt?: string;
  ts?: string;
  updatedAt?: string;
  [k: string]: unknown;
};

type StoreLike =
  | SubmissionLike[]
  | {
      value?: SubmissionLike[];
      Count?: number;
      [k: string]: unknown;
    };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isSubmissionArray(v: unknown): v is SubmissionLike[] {
  return Array.isArray(v) && v.every((x) => isObject(x));
}

function readList(parsed: unknown): SubmissionLike[] {
  if (isSubmissionArray(parsed)) return parsed;
  if (isObject(parsed) && Array.isArray(parsed.value) && isSubmissionArray(parsed.value)) {
    return parsed.value;
  }
  return [];
}

function writePayload(list: SubmissionLike[]) {
  return { value: list, Count: list.length };
}

export async function POST() {
  // This endpoint is intended for DEV/local use only.
  // If you deploy it, protect with auth in front of it.
  const fs = await import("fs/promises");
  const path = await import("path");

  const WAITLIST_FILE = process.env.WAITLIST_FILE || "waitlist.json";
  const filePath = path.join(process.cwd(), WAITLIST_FILE);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed: StoreLike = JSON.parse(raw) as StoreLike;

    const list = readList(parsed);

    const updated = list.map((s) => {
      if (s.id && String(s.id).trim()) return s;
      return {
        ...s,
        id: crypto.randomBytes(8).toString("hex"),
      };
    });

    await fs.writeFile(filePath, JSON.stringify(writePayload(updated), null, 2), "utf8");

    return NextResponse.json({
      ok: true,
      Count: updated.length,
      backfilled: updated.filter((x) => !list.find((o) => o === x)).length,
    });
  } catch (e: unknown) {
    console.error("backfill-ids error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}