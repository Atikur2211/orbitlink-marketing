// src/app/api/portal/tickets/[id]/comment/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookieValue } from "@/lib/portalAuth";
import { addComment } from "@/lib/portalTickets";
import { maybeAutoAckOnFirstOpsComment } from "@/lib/portalTickets";

export const runtime = "nodejs";

function nowISO() {
  return new Date().toISOString();
}

function clampText(v: unknown, max = 2400) {
  const s = String(v ?? "");
  return s.length > max ? s.slice(0, max) : s;
}

function cleanLine(v: unknown, max = 240) {
  return clampText(v, max).replace(/\s+/g, " ").trim();
}

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  return res;
}

async function auth() {
  // ✅ Next.js route handler: cookies() is async in your environment
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  return verified.ok ? verified : null;
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/**
 * Premium: Accepts
 * - JSON object: { body: "..." }
 * - JSON string: "..."
 * - Plain text: "..."
 */
async function readBodyText(req: Request): Promise<string> {
  const raw = await req.text().catch(() => "");
  if (!raw) return "";

  // Try JSON first
  try {
    const parsed: any = JSON.parse(raw);

    if (parsed && typeof parsed === "object" && typeof parsed.body === "string") {
      return parsed.body;
    }

    if (typeof parsed === "string") return parsed;

    return "";
  } catch {
    // plain text fallback
    return raw;
  }
}

/**
 * Golden: prevent storage of accidental wrappers like:
 * "{body: Update...}" or "body: Update..." or "{ body : Update... }"
 */
function unwrapBodyArtifacts(input: string) {
  let t = input.trim();

  // unwrap "{body: ...}" (common curl / PS formatting mistakes)
  t = t.replace(/^\s*\{\s*body\s*:\s*/i, "");
  t = t.replace(/\s*\}\s*$/i, "");

  // unwrap "body: ..." (plain text mistakes)
  t = t.replace(/^\s*body\s*:\s*/i, "");

  // normalize whitespace (keep newlines, but clean excessive spaces)
  t = t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

  return t;
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await auth();
  if (!a) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  const p = await params;
  const ticketId = safeDecode(p.id);

  const rawText = await readBodyText(req);
  const unwrapped = unwrapBodyArtifacts(rawText);

  // Clamp after unwrap
  const text = clampText(unwrapped, 2000);

  // ✅ enterprise validation
  if (!text || text.length < 3) {
    return jsonNoCache(
      { ok: false, error: "validation", fields: { body: "Comment is required (min 3 characters)." } },
      { status: 400 }
    );
  }

  // ✅ label ops/admin as ops; customers as customer
  const role: "customer" | "ops" = a.role === "customer" ? "customer" : "ops";

  // ✅ high-signal intake log (no body content leakage)
  console.log("[tickets.comment] intake", {
    ts: nowISO(),
    orgId: a.orgId,
    email: a.email,
    role,
    ticketId,
    bodyLen: text.length,
    ct: req.headers.get("content-type") || "",
  });

  try {
    const t = await addComment({
      orgId: a.orgId,
      ticketId,
      actorEmail: a.email,
      role,
      body: text,
    });

    return jsonNoCache({ ok: true, ticket: t }, { status: 200 });
  } catch (e: any) {
    const msg = cleanLine(e?.message || "comment_failed", 220);

    console.error("[tickets.comment] failed", {
      ts: nowISO(),
      orgId: a.orgId,
      email: a.email,
      role,
      ticketId,
      message: msg,
      stack: e?.stack,
    });

    // Golden+++ SLA auto-ack: if first ops comment and queued => In Progress
    await maybeAutoAckOnFirstOpsComment({
      orgId: a.orgId,
      actorEmail: a.email,
      role: a.role,
      ticketId,
    }).catch(() => {});

    // Map known codes from portalTickets.ts
    if (msg === "invalid_body") {
      return jsonNoCache(
        { ok: false, error: "validation", fields: { body: "Comment is too short or empty." } },
        { status: 400 }
      );
    }
    if (msg === "forbidden") return jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 });
    if (msg === "not_found") return jsonNoCache({ ok: false, error: "not_found" }, { status: 404 });

    // Unknown
    return jsonNoCache({ ok: false, error: "comment_failed", message: msg }, { status: 500 });
  }
}
