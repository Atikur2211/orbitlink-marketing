// src/app/api/portal/tickets/[id]/capsule/route.ts
// GOLDEN+++ CAPSULE SIGNED — ENTERPRISE CANONICAL (DROP-IN v1.1)
//
// ✅ GOLDEN CONTRACT:
// - Detached signature MUST verify the EXACT bytes returned by ?download=1
// - Therefore we sign AND download the SAME bytes: canonicalStable
// - Canonical bytes MUST NOT include request-time/session-time fields
// - Canonical bytes MUST NOT depend on who downloaded it
//
// ✅ ENTERPRISE 304 CONTRACT:
// - ETag = sha256(canonicalStable)
// - Cache-Control allows private storage but forces revalidation
// - If-None-Match matching supports weak etags + lists
// - Vary: Cookie is added (not replacing other vary values)
//
// Modes:
//   ?download=1       -> CANONICAL stable bytes (signed by detached sig)
//   ?sig=1            -> detached signature over CANONICAL bytes
//   ?pub=1            -> public key PEM
//   ?downloadSigned=1 -> optional: signed capsule JSON (embedded signature fields; NOT canonical)

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import {
  COOKIE_NAME,
  verifySessionCookieValue,
  verifySessionExists,
  touchSession,
  shouldRefreshCookie,
  mintRollingCookie,
} from "@/lib/portalAuth";
import { getTicketForOrg } from "@/lib/portalTickets";
import { signCapsuleBytes } from "@/lib/capsuleSign";

export const runtime = "nodejs";

/* =========================================================
   Helpers
   ========================================================= */

function nowISO() {
  return new Date().toISOString();
}

function sha256Hex(input: string | Buffer) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/**
 * Add Vary token without overwriting existing Vary values.
 * Next.js often sets Vary: rsc, next-router-... (keep it).
 */
function addVary(res: NextResponse, token: string) {
  const cur = res.headers.get("vary");
  if (!cur) {
    res.headers.set("vary", token);
    return;
  }
  const parts = cur
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!parts.map((p) => p.toLowerCase()).includes(token.toLowerCase())) {
    parts.push(token);
    res.headers.set("vary", parts.join(", "));
  }
}

/**
 * Cache headers for auth'd artifact endpoints:
 * - private: ok to store in browser only
 * - no-cache + must-revalidate + max-age=0: forces revalidation => enables 304
 *
 * NOTE: do NOT use no-store if you want caching/304 to work.
 */
const CACHE_ARTIFACT = "private, no-cache, max-age=0, must-revalidate";

/**
 * JSON API default (non-artifact) - no-store.
 */
function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  addVary(res, "Cookie");
  return res;
}

function withRefreshedCookie(res: NextResponse, setCookieValue?: string) {
  if (!setCookieValue) return res;
  res.cookies.set(COOKIE_NAME, setCookieValue, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function normalizeEtag(v: string) {
  return String(v || "").trim().replace(/^W\//, "").replace(/^"|"$/g, "");
}

function inmMatchesEtag(inmRaw: string, etagQuoted: string) {
  const target = normalizeEtag(etagQuoted);
  const parts = String(inmRaw || "")
    .split(",")
    .map((s) => normalizeEtag(s))
    .filter(Boolean);

  return parts.includes(target) || parts.includes("*");
}

/**
 * Stable deterministic JSON string (enterprise canonical).
 * - Sorts object keys recursively
 * - Preserves array order
 * - Handles circular refs safely
 */
function stableStringify(x: any): string {
  const seen = new WeakSet();

  const norm = (v: any): any => {
    if (v === null || v === undefined) return v;

    const t = typeof v;
    if (t === "string" || t === "number" || t === "boolean") return v;

    if (t !== "object") return String(v);

    if (seen.has(v)) return "[circular]";
    seen.add(v);

    if (Array.isArray(v)) return v.map(norm);

    const keys = Object.keys(v).sort();
    const out: any = {};
    for (const k of keys) out[k] = norm(v[k]);
    return out;
  };

  return JSON.stringify(norm(x));
}

/* =========================================================
   Auth: Golden
   ========================================================= */

async function authGolden() {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value || "";

  const decoded = v ? verifySessionCookieValue(v) : { ok: false as const };
  if (!decoded.ok) return { ok: false as const, why: "cookie_invalid" };

  const exists = await verifySessionExists(decoded.sessionId);
  if (!exists.ok) return { ok: false as const, why: "session_missing_or_expired" };

  const touched = await touchSession(decoded.sessionId);
  if (!touched.ok) return { ok: false as const, why: "touch_failed" };

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
    serverExpiresAt: touched.expiresAt, // UI-only
  };
}

/* =========================================================
   Canonical capsule builder (AUDIT GRADE)
   ========================================================= */

function computeChainHead(ticket: any) {
  const base = {
    id: ticket?.id,
    orgId: ticket?.orgId,
    createdAt: ticket?.createdAt,
    updatedAt: ticket?.updatedAt,
    ownerEmail: ticket?.ownerEmail,
    assignee: ticket?.assignee || "",
    title: ticket?.title,
    category: ticket?.category,
    impact: ticket?.impact,
    details: ticket?.details,
    status: ticket?.status,
    priority: ticket?.priority,
    sla: ticket?.sla,
    tags: ticket?.tags || [],
    comments: ticket?.comments || [],
    timeline: ticket?.timeline || [],
    lastActor: ticket?.lastActor || "",
  };

  const s = stableStringify(base);
  const head = sha256Hex(s);
  return { head, input: base };
}

function makeCanonicalCapsule(args: { ticket: any; orgId: string }) {
  const { ticket, orgId } = args;

  const { head, input } = computeChainHead(ticket);

  const generatedAt = ticket?.updatedAt || ticket?.createdAt || "1970-01-01T00:00:00.000Z";

  const canonical = {
    capsuleVersion: "1.1.0-golden-signed",
    kind: "orbitlink.ticket.capsule",
    generatedAt,
    orgId,
    ticketId: ticket.id,
    integrity: {
      algo: "sha256",
      chainHead: head,
      note: "Detached signature covers canonical stable-serialized capsule bytes (deterministic).",
      signature: { status: "unsigned", keyId: "", alg: "", sigB64Url: "" },
    },
    ticket: input,
  };

  const canonicalStable = stableStringify(canonical);
  const canonicalSha = sha256Hex(canonicalStable);

  return { canonical, canonicalStable, canonicalSha, chainHead: head };
}

/* =========================================================
   GET /capsule
   ========================================================= */

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const gate = await authGolden();
  if (!gate.ok) {
    return jsonNoCache({ ok: false, error: "unauthorized", why: gate.why }, { status: 401 });
  }

  const a = gate.auth;

  if (a.role !== "customer" && a.role !== "ops" && a.role !== "admin") {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 }), gate.setCookieValue);
  }

  const p = await params;
  const ticketId = safeDecode(p.id);

  const ticket = await getTicketForOrg({
    orgId: a.orgId,
    email: a.email,
    role: a.role,
    id: ticketId,
  });

  if (!ticket) {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "not_found" }, { status: 404 }), gate.setCookieValue);
  }

  const url = new URL(req.url);
  const download = url.searchParams.get("download") === "1";
  const sigOnly = url.searchParams.get("sig") === "1";
  const pubOnly = url.searchParams.get("pub") === "1";
  const downloadSigned = url.searchParams.get("downloadSigned") === "1";

  // Build canonical snapshot first (etag based on this)
  const { canonical, canonicalStable, canonicalSha, chainHead } = makeCanonicalCapsule({
    ticket,
    orgId: a.orgId,
  });

  const etag = `"${canonicalSha}"`;

  // ✅ IMPORTANT: 304 check BEFORE signing (enterprise efficiency)
  const inm = req.headers.get("if-none-match") || "";
  if (inmMatchesEtag(inm, etag)) {
    const res = new NextResponse(null, {
      status: 304,
      headers: {
        etag,
        "cache-control": CACHE_ARTIFACT,
        "x-portal-ts": nowISO(),
        "x-capsule-sha256": canonicalSha,
        "x-chain-head": chainHead,
      },
    });
    addVary(res, "Cookie");
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // Sign canonical bytes (only needed on 200 responses)
  const signed = await signCapsuleBytes(canonicalStable);

  const canonicalSigned = {
    ...canonical,
    integrity: {
      ...canonical.integrity,
      signature: { status: "signed", keyId: signed.keyId, alg: "ed25519", sigB64Url: signed.signatureB64Url },
    },
  };

  const signedStable = stableStringify(canonicalSigned);
  const signedSha = sha256Hex(signedStable);

  const safeId = String(ticket.id || "ticket").replace(/[^a-zA-Z0-9-_]/g, "");

  // ?pub=1
  if (pubOnly) {
    const res = new NextResponse(signed.publicKeyPem, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": CACHE_ARTIFACT,
        etag,
        "x-portal-ts": nowISO(),
        "x-key-id": signed.keyId,
      },
    });
    addVary(res, "Cookie");
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // ?sig=1
  if (sigOnly) {
    const filename = `${safeId}-capsule.json.asc`;
    const res = new NextResponse(signed.signatureB64Url + "\n", {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "content-disposition": `attachment; filename="${filename}"`,
        "cache-control": CACHE_ARTIFACT,
        etag,
        "x-portal-ts": nowISO(),
        "x-key-id": signed.keyId,
        "x-capsule-sha256": canonicalSha,
        "x-chain-head": chainHead,
      },
    });
    addVary(res, "Cookie");
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // ?downloadSigned=1
  if (downloadSigned) {
    const filename = `${safeId}-capsule.signed.json`;
    const res = new NextResponse(signedStable, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "content-disposition": `attachment; filename="${filename}"`,
        "cache-control": CACHE_ARTIFACT,
        etag,
        "x-portal-ts": nowISO(),
        "x-key-id": signed.keyId,
        "x-capsule-sha256": signedSha,
        "x-capsule-sha256-canonical": canonicalSha,
        "x-chain-head": chainHead,
      },
    });
    addVary(res, "Cookie");
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // ?download=1 (canonical bytes)
  if (download) {
    const filename = `${safeId}-capsule.json`;
    const res = new NextResponse(canonicalStable, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "content-disposition": `attachment; filename="${filename}"`,
        "cache-control": CACHE_ARTIFACT,
        etag,
        "x-portal-ts": nowISO(),
        "x-key-id": signed.keyId,
        "x-capsule-sha256": canonicalSha,
        "x-chain-head": chainHead,
      },
    });
    addVary(res, "Cookie");
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // Default JSON (non-artifact response)
  const res = jsonNoCache(
    {
      ok: true,
      capsule: canonicalSigned,
      ui: {
        requestedBy: { email: a.email, role: a.role },
        session: { serverExpiresAt: gate.serverExpiresAt },
      },
      integrity: {
        capsuleSha256: canonicalSha,
        capsuleSignedSha256: signedSha,
        chainHead,
        etag,
        signature: { keyId: signed.keyId, alg: "ed25519" },
      },
    },
    { status: 200 }
  );

  res.headers.set("etag", etag);
  res.headers.set("x-capsule-sha256", canonicalSha);
  res.headers.set("x-capsule-sha256-signed", signedSha);
  res.headers.set("x-chain-head", chainHead);
  res.headers.set("x-key-id", signed.keyId);
  addVary(res, "Cookie");

  return withRefreshedCookie(res, gate.setCookieValue);
}
