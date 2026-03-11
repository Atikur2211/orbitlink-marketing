// src/app/api/portal/tickets/[id]/ops/route.ts (GOLDEN++ FINAL)
// Enterprise: ONE auth pattern + append-only patch + audit-grade logs + rolling cookie

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  verifySessionCookieValue,
  verifySessionExists,
  touchSession,
  shouldRefreshCookie,
  mintRollingCookie,
} from "@/lib/portalAuth";
import { opsPatchTicket } from "@/lib/portalTickets";

export const runtime = "nodejs";

/* =========================================================
   Response helpers (single source of truth)
   ========================================================= */

function nowISO() {
  return new Date().toISOString();
}

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  return res;
}

function withRefreshedCookie(res: NextResponse, setCookieValue?: string) {
  if (!setCookieValue) return res;
  res.cookies.set(COOKIE_NAME, setCookieValue, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}

/* =========================================================
   ✅ ONE GOLDEN AUTH PATTERN
   1) verify signed cookie
   2) verify server session exists
   3) touch session (sliding expiry)
   4) refresh cookie if near expiry
   ========================================================= */

async function authGolden() {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value || "";

  const decoded = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!decoded.ok) return { ok: false as const };

  const exists = await verifySessionExists(decoded.sessionId);
  if (!exists.ok) return { ok: false as const };

  const touched = await touchSession(decoded.sessionId);
  if (!touched.ok) return { ok: false as const };

  const refresh = shouldRefreshCookie(decoded.expiresAt);
  const nextCookie = refresh
    ? mintRollingCookie({
        sessionId: exists.row.sessionId,
        email: exists.row.email,
        orgId: exists.row.orgId,
        role: exists.row.role,
      })
    : null;

  return {
    ok: true as const,
    auth: {
      sessionId: exists.row.sessionId,
      email: exists.row.email,
      orgId: exists.row.orgId,
      role: exists.row.role,
    },
    setCookieValue: nextCookie || undefined,
    serverExpiresAt: touched.expiresAt,
  };
}

/* =========================================================
   Parsing + normalization (enterprise tolerant, safe)
   ========================================================= */

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function clampText(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

/**
 * Accepts:
 * - JSON: {"priority":"Critical"}
 * - wrapper: {"patch":{"priority":"Critical"}}
 * - loose: {priority:Critical} or "priority:Critical"
 *
 * Golden rule:
 * - Try strict JSON first
 * - If not JSON, only accept "k:v" pairs (reject other junk)
 */
function parseLoose(raw: string): any {
  const t = (raw || "").trim();
  if (!t) return {};

  // 1) strict JSON
  try {
    return JSON.parse(t);
  } catch {
    // continue
  }

  // 2) tolerate key:value
  let body = t.replace(/^\s*\{/, "").replace(/\}\s*$/, "").trim();
  if (!body) return {};

  const out: Record<string, any> = {};
  for (const part of body.split(",").map((x) => x.trim()).filter(Boolean)) {
    const idx = part.indexOf(":");
    if (idx <= 0) continue;

    const k = part
      .slice(0, idx)
      .trim()
      .replace(/^"|"$/g, "")
      .replace(/^'|'$/g, "");

    let v = part.slice(idx + 1).trim();
    v = v.replace(/^"|"$/g, "").replace(/^'|'$/g, "");

    if (!k) continue;
    out[k] = v;
  }
  return out;
}

async function readPatch(req: Request) {
  const ct = req.headers.get("content-type") || "";
  const raw = await req.text().catch(() => "");
  const rawLen = raw.length;
  const rawPreview = raw.slice(0, 140);

  const parsed = parseLoose(raw);

  const patch =
    parsed && typeof parsed === "object" && parsed.patch && typeof parsed.patch === "object"
      ? parsed.patch
      : parsed;

  const topKeys = parsed && typeof parsed === "object" ? Object.keys(parsed) : [];
  const patchKeys = patch && typeof patch === "object" ? Object.keys(patch) : [];

  return { ct, rawLen, rawPreview, parsed, patch, topKeys, patchKeys };
}

function normalizePriority(p?: string) {
  if (!p) return undefined;
  const key = clampText(p, 40).toLowerCase().trim();
  const map: Record<string, "Low" | "Normal" | "High" | "Critical"> = {
    low: "Low",
    normal: "Normal",
    high: "High",
    critical: "Critical",
  };
  return map[key];
}

function normalizeStatus(s?: string) {
  if (!s) return undefined;
  const key = clampText(s, 80).toLowerCase().replace(/\s+/g, " ").trim();
  const map: Record<
    string,
    "Queued" | "In Review" | "In Progress" | "Awaiting Info" | "Resolved" | "Closed"
  > = {
    queued: "Queued",
    "in review": "In Review",
    "in progress": "In Progress",
    "awaiting info": "Awaiting Info",
    resolved: "Resolved",
    closed: "Closed",
  };
  return map[key];
}

function normalizeAssignee(a?: string) {
  if (!a) return undefined;
  const v = clampText(a, 120);
  return v ? v : undefined;
}

function normalizeReason(r?: string) {
  if (!r) return undefined;
  const cleaned = clampText(r, 400).replace(/\s+/g, " ").trim();
  return cleaned ? cleaned : undefined;
}

function isSensitiveStatus(s?: string) {
  return s === "Resolved" || s === "Closed" || s === "Queued";
}

/* =========================================================
   POST /ops (enterprise)
   ========================================================= */

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const gate = await authGolden();
  if (!gate.ok) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  const a = gate.auth;

  // ops/admin only
  if (a.role !== "ops" && a.role !== "admin") {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 }), gate.setCookieValue);
  }

  const p = await params;
  const ticketId = safeDecode(p.id);

  const dbg = await readPatch(req);

  const statusRaw = typeof dbg.patch?.status === "string" ? dbg.patch.status : undefined;
  const priorityRaw = typeof dbg.patch?.priority === "string" ? dbg.patch.priority : undefined;
  const assigneeRaw = typeof dbg.patch?.assignee === "string" ? dbg.patch.assignee : undefined;
  const reasonRaw = typeof dbg.patch?.reason === "string" ? dbg.patch.reason : undefined;

  const status = normalizeStatus(statusRaw);
  const priority = normalizePriority(priorityRaw);
  const assignee = normalizeAssignee(assigneeRaw);
  const reason = normalizeReason(reasonRaw);

  const hasAny = !!status || !!priority || !!assignee;

  // ✅ enterprise logging: high-signal, no secrets
  console.log("[tickets.ops] patch_intake", {
    ts: nowISO(),
    orgId: a.orgId,
    email: a.email,
    role: a.role,
    ticketId,
    ct: dbg.ct,
    rawLen: dbg.rawLen,
    rawPreview: dbg.rawPreview,
    topKeys: dbg.topKeys,
    patchKeys: dbg.patchKeys,
    hasStatus: !!status,
    hasPriority: !!priority,
    hasAssignee: !!assignee,
    hasReason: !!reason,
  });

  if (!hasAny) {
    return withRefreshedCookie(
      jsonNoCache(
        {
          ok: false,
          error: "validation",
          fields: { patch: "Provide a valid status OR priority OR assignee." },
          hint:
            'Send JSON like {"priority":"Critical"} OR {"status":"In Progress"} OR {"assignee":"billing@orbitlink.ca"}',
        },
        { status: 400 }
      ),
      gate.setCookieValue
    );
  }

  // sensitive statuses require reason
  if (status && isSensitiveStatus(status) && (!reason || reason.length < 6)) {
    return withRefreshedCookie(
      jsonNoCache(
        {
          ok: false,
          error: "validation",
          fields: { reason: `Reason required for status "${status}" (min 6 chars).` },
          hint: 'Include {"reason":"closing confirmed with customer"}',
        },
        { status: 400 }
      ),
      gate.setCookieValue
    );
  }

  try {
    const t = await opsPatchTicket({
      orgId: a.orgId,
      actorEmail: a.email,
      role: a.role,
      ticketId,
      patch: {
        status,
        priority,
        assignee,
        reason,

        // ✅ Golden++ fields (future-ready; stored in timeline)
        actorId: a.email,          // stable operator identity
        signatureStub: "",         // future: signature payload
        approvalChainId: "",       // future: approvals
      },
    });

    return withRefreshedCookie(
      jsonNoCache(
        {
          ok: true,
          ticket: t,
          session: { serverExpiresAt: gate.serverExpiresAt },
        },
        { status: 200 }
      ),
      gate.setCookieValue
    );
  } catch (e: any) {
    const msg = String(e?.message || "ops_patch_failed").trim();

    // Map known errors from portalTickets.ts
    if (msg === "invalid_body") {
      return withRefreshedCookie(
        jsonNoCache(
          { ok: false, error: "validation", fields: { patch: "Invalid patch body." }, message: msg },
          { status: 400 }
        ),
        gate.setCookieValue
      );
    }

    if (msg === "forbidden") {
      return withRefreshedCookie(jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 }), gate.setCookieValue);
    }

    if (msg === "not_found") {
      return withRefreshedCookie(jsonNoCache({ ok: false, error: "not_found" }, { status: 404 }), gate.setCookieValue);
    }

    // Unknown
    return withRefreshedCookie(
      jsonNoCache({ ok: false, error: "ops_patch_failed", message: msg }, { status: 500 }),
      gate.setCookieValue
    );
  }
}
