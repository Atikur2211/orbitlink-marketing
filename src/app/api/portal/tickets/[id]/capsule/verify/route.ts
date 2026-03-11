// src/app/api/portal/tickets/[id]/capsule/verify/route.ts
// ENTERPRISE VERIFY v1.3 GOLDEN+++
// Verifies signature over CANONICAL stable capsule bytes.
//
// Accepts either:
//   Body A: { capsuleStable, keyId, sigB64Url, expectedSha256? }
//   Body B: { capsule,       keyId, sigB64Url, expectedSha256? }  // capsule object, any formatting/order
//
// GOLDEN CONTRACT:
// - Verification MUST be performed over canonical stable bytes.
// - Canonical bytes MUST NOT include session/requestedBy/request-time fields.
// - Canonical bytes MUST match ?download=1 from /capsule.
//
// Never 500 on user input. Only returns 200/400/401/403.

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
import { findPublicKeyByFingerprint } from "@/lib/capsuleKeyring";

export const runtime = "nodejs";

/* ================================
   Helpers
   ================================ */

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
  res.cookies.set(COOKIE_NAME, setCookieValue, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}

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
    auth: { email: exists.row.email, orgId: exists.row.orgId, role: exists.row.role },
    setCookieValue: nextCookie || undefined,
    serverExpiresAt: touched.expiresAt,
  };
}

function sha256Hex(input: string | Buffer) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function safeText(v: unknown, max = 20000) {
  const s = String(v ?? "");
  return s.length > max ? s.slice(0, max) : s;
}

function stripUtf8Bom(s: string) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function isFingerprintKeyId(v: string) {
  // ed25519:<16 hex>
  return /^ed25519:[0-9a-f]{16}$/i.test(v);
}

/**
 * Stable deterministic JSON string (enterprise canonical).
 * - Sorts object keys recursively
 * - Preserves array order
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

/**
 * GOLDEN: Canonicalize capsule object to match /capsule?download=1.
 * Removes volatile/non-canonical fields if present.
 */
function canonicalizeCapsuleObject(obj: any) {
  // Node 18+ has structuredClone; fallback safe for POJOs
  const c: any = typeof structuredClone === "function"
    ? structuredClone(obj ?? {})
    : JSON.parse(JSON.stringify(obj ?? {}));

  // remove wrapper fields if someone posts the whole API response
  delete c.ok;
  delete c.ui;
  delete c.integrity?.capsuleSignedSha256;
  delete c.integrity?.capsuleSha256;
  delete c.integrity?.etag;
  delete c.integrity?.signature;

  // remove UI/request-time fields if present
  delete c.session;
  delete c.requestedBy;

  // sometimes users send { capsule: {...} }
  if (c.capsule && typeof c.capsule === "object") return canonicalizeCapsuleObject(c.capsule);

  // if embedded signature exists, strip it back to unsigned placeholder
  if (c.integrity?.signature) {
    c.integrity = {
      ...c.integrity,
      signature: {
        status: "unsigned",
        keyId: "",
        alg: "",
        sigB64Url: "",
      },
    };
  }

  return c;
}

function normalizeHex(v: string) {
  return String(v || "").trim().toLowerCase().replace(/[^0-9a-f]/g, "");
}

/* ================================
   POST /verify
   ================================ */

export async function POST(req: Request) {
  const gate = await authGolden();
  if (!gate.ok) return jsonNoCache({ ok: false, error: "unauthorized", why: gate.why }, { status: 401 });

  // ops/admin only
  if (gate.auth.role !== "ops" && gate.auth.role !== "admin") {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "forbidden" }, { status: 403 }), gate.setCookieValue);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return withRefreshedCookie(
      jsonNoCache({ ok: false, error: "invalid_body", hint: "Send JSON { capsuleStable|capsule, keyId, sigB64Url, expectedSha256? }" }, { status: 400 }),
      gate.setCookieValue
    );
  }

  const keyId = safeText(body?.keyId, 200).trim();
  const sigB64Url = safeText(body?.sigB64Url, 8000).trim();
  const expectedSha256 = normalizeHex(safeText(body?.expectedSha256, 128));

  if (!keyId || !sigB64Url) {
    return withRefreshedCookie(
      jsonNoCache({ ok: false, error: "validation", hint: "Send { keyId, sigB64Url, capsuleStable|capsule }" }, { status: 400 }),
      gate.setCookieValue
    );
  }

  if (!isFingerprintKeyId(keyId)) {
    return withRefreshedCookie(
      jsonNoCache({ ok: false, error: "bad_key_id", hint: "Expected keyId like ed25519:<sha16>", keyId }, { status: 400 }),
      gate.setCookieValue
    );
  }

  // Key lookup
  let pub: Awaited<ReturnType<typeof findPublicKeyByFingerprint>> | null = null;
  try {
    pub = await findPublicKeyByFingerprint(keyId);
  } catch (e) {
    console.error("[capsule.verify] key lookup failed", e);
    pub = null;
  }

  if (!pub?.publicKeyPem) {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "unknown_key", keyId }, { status: 400 }), gate.setCookieValue);
  }

  // Decode signature
  let sigBuf: Buffer;
  try {
    sigBuf = Buffer.from(sigB64Url, "base64url");
  } catch {
    return withRefreshedCookie(jsonNoCache({ ok: false, error: "bad_signature_encoding" }, { status: 400 }), gate.setCookieValue);
  }

  if (sigBuf.length !== 64) {
    const res = jsonNoCache(
      { ok: false, error: "bad_signature_length", expected: 64, got: sigBuf.length, keyId },
      { status: 400 }
    );
    res.headers.set("x-key-id", keyId);
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // ======= GOLDEN: Determine canonical bytes to verify =======
  const capsuleStableRaw = body?.capsuleStable;
  const capsuleObj = body?.capsule;

  let inputSha = "";
  let canonicalStable = "";
  let canonicalSha = "";
  let inputType: "stable" | "object" | "stable_parsed" | "stable_raw" = "stable";

  // Case B: capsule object provided (best UX)
  if (capsuleObj && typeof capsuleObj === "object") {
    inputType = "object";
    try {
      const canonicalObj = canonicalizeCapsuleObject(capsuleObj);
      canonicalStable = stableStringify(canonicalObj);
      inputSha = sha256Hex(stableStringify(capsuleObj));
    } catch {
      return withRefreshedCookie(
        jsonNoCache({ ok: false, error: "bad_capsule_object", hint: "capsule must be a JSON object" }, { status: 400 }),
        gate.setCookieValue
      );
    }
  } else {
    // Case A: capsuleStable string provided
    let inputStable = safeText(capsuleStableRaw, 5_000_000);
    inputStable = stripUtf8Bom(inputStable);

    if (!inputStable) {
      return withRefreshedCookie(
        jsonNoCache({ ok: false, error: "validation", hint: "Send capsuleStable (string) or capsule (object)" }, { status: 400 }),
        gate.setCookieValue
      );
    }

    inputSha = sha256Hex(inputStable);

    // Try to parse and canonicalize defensively (so pretty-print won’t break verification)
    try {
      const parsed = JSON.parse(inputStable);
      const canonicalObj = canonicalizeCapsuleObject(parsed);
      canonicalStable = stableStringify(canonicalObj);
      inputType = "stable_parsed";
    } catch {
      // Legacy: verify exact bytes only (still supports raw signature workflows)
      canonicalStable = inputStable;
      inputType = "stable_raw";
    }
  }

  canonicalSha = sha256Hex(canonicalStable);

  // Optional enforcement: client expected hash must match server canonical hash
  if (expectedSha256 && expectedSha256.length === 64 && expectedSha256 !== canonicalSha) {
    const res = jsonNoCache(
      {
        ok: false,
        error: "expected_sha_mismatch",
        expectedSha256,
        canonicalSha256: canonicalSha,
        inputSha256: inputSha,
        hint: "expectedSha256 must equal SHA256 of canonical bytes (matches /capsule?download=1).",
      },
      { status: 400 }
    );
    res.headers.set("x-input-sha256", inputSha);
    res.headers.set("x-capsule-sha256", canonicalSha);
    res.headers.set("x-key-id", keyId);
    res.headers.set("x-verified-at", nowISO());
    return withRefreshedCookie(res, gate.setCookieValue);
  }

  // Verify signature over canonical bytes
  let ok = false;
  try {
    ok = crypto.verify(null, Buffer.from(canonicalStable, "utf8"), pub.publicKeyPem, sigBuf);
  } catch (e) {
    console.error("[capsule.verify] crypto.verify failed", e);
    ok = false;
  }

  const verifiedAt = nowISO();

  const res = jsonNoCache(
    {
      ok,
      alg: "ed25519",
      keyId,
      capsuleSha256: canonicalSha, // ✅ canonical bytes hash
      inputSha256: inputSha,       // helpful debug
      verifiedAt,
      meta: { inputType },
      details: ok
        ? { logicalKeyId: pub.logicalKeyId, keyCreatedAt: pub.createdAt }
        : {
            logicalKeyId: pub.logicalKeyId,
            keyCreatedAt: pub.createdAt,
            canonicalLen: canonicalStable.length,
            sigLen: sigBuf.length,
            hint: "Verify uses CANONICAL stable bytes (matches /capsule?download=1). Use --data-binary @verify.json in curl.exe.",
          },
    },
    { status: ok ? 200 : 400 }
  );

  // Auditor headers
  res.headers.set("x-input-sha256", inputSha);
  res.headers.set("x-capsule-sha256", canonicalSha);
  res.headers.set("x-key-id", keyId);
  res.headers.set("x-verified-at", verifiedAt);

  return withRefreshedCookie(res, gate.setCookieValue);
}
