import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookieValue } from "@/lib/portalAuth";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

function ticketsPath() {
  return path.join(process.cwd(), "portal_tickets.json");
}

function nowISO() {
  return new Date().toISOString();
}

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  return res;
}

async function auth() {
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  return verified.ok ? verified : null;
}

function normalizeBadBody(s: string) {
  // Fix the exact bad pattern you have: "{body:...}"
  const m = s.match(/^\{\s*body\s*:\s*(.+)\}$/i);
  if (m?.[1]) return String(m[1]).trim();
  return s;
}

async function writeJSONAtomic(filePath: string, data: unknown) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

export async function POST() {
  const a = await auth();
  if (!a) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });
  if (a.role !== "admin" && a.role !== "ops") return jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 });

  const file = ticketsPath();
  const raw = await fs.readFile(file, "utf8").catch(() => "[]");
  const list: any[] = (() => {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p : [];
    } catch {
      return [];
    }
  })();

  let changed = 0;

  for (const t of list) {
    if (!Array.isArray(t?.comments)) continue;
    for (const c of t.comments) {
      if (typeof c?.body !== "string") continue;
      const before = c.body;
      const after = normalizeBadBody(before);
      if (after !== before) {
        c.body = after;
        changed++;
      }
    }
  }

  if (changed > 0) await writeJSONAtomic(file, list);

  return jsonNoCache({ ok: true, changed });
}
