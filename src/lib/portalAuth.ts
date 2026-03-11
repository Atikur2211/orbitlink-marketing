// src/lib/portalAuth.ts (v2.3 PORTABLE STORAGE)
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type PortalRole = "customer" | "admin" | "ops";

export type MagicTokenRow = {
  token: string;
  email: string;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
  ip?: string;
  userAgent?: string;
};

export type SessionRow = {
  sessionId: string;
  email: string;
  orgId: string;
  role: PortalRole;
  createdAt: string;
  expiresAt: string;
  lastSeenAt?: string;
  ip?: string;
  userAgent?: string;
};

export type ProvisionRow = {
  email: string;
  orgId: string;
  role: PortalRole;
  enabled: boolean;
  note?: string;
  createdAt: string;
};

function nowISO() {
  return new Date().toISOString();
}

function clean(v: unknown, max = 260) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

export function cleanEmail(v: unknown) {
  const s = clean(v, 200).toLowerCase();
  if (!s || s.length < 6) return "";
  if (!s.includes("@")) return "";
  return s;
}

function randomHex(bytes = 24) {
  return crypto.randomBytes(bytes).toString("hex");
}

function runtimeDataDir() {
  if (process.env.NODE_ENV === "production") return "/tmp";
  return process.cwd();
}

function tokensPath() {
  return path.join(runtimeDataDir(), "portal_tokens.json");
}

function sessionsPath() {
  return path.join(runtimeDataDir(), "portal_sessions.json");
}

function provisionPath() {
  return path.join(runtimeDataDir(), "portal_provision.json");
}

async function readArrayJSON<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

async function writeJSONAtomic(filePath: string, data: unknown) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function isPortalRole(v: unknown): v is PortalRole {
  return v === "customer" || v === "admin" || v === "ops";
}

/**
 * Golden posture:
 * - Cookie is SIGNED (HMAC) so role/org cannot be forged client-side.
 * - Cookie expiry is SHORT and rolls forward (sliding session).
 * - Server session expiry is source of truth.
 */

const COOKIE_NAME = "orbit_portal_session";

// Rolling session config
const SESSION_TTL_HOURS = Number(process.env.PORTAL_SESSION_TTL_HOURS ?? 24);
const COOKIE_TTL_MINUTES = Number(process.env.PORTAL_COOKIE_TTL_MINUTES ?? 60);
const ROLLING_GRACE_MINUTES = Number(process.env.PORTAL_ROLLING_GRACE_MINUTES ?? 15);

function mustSecret(): string {
  const s = String(process.env.PORTAL_COOKIE_SECRET || "").trim();
  if (!s || s.length < 24) {
    if (process.env.NODE_ENV !== "production") {
      return "DEV_ONLY_CHANGE_ME_DEV_ONLY_CHANGE_ME_1234567890";
    }
    throw new Error("PORTAL_COOKIE_SECRET_missing");
  }
  return s;
}

function b64urlEncode(buf: Buffer) {
  return buf.toString("base64url");
}

function b64urlDecode(s: string) {
  return Buffer.from(s, "base64url");
}

function hmac(payloadB64: string) {
  const key = mustSecret();
  return crypto.createHmac("sha256", key).update(payloadB64).digest("base64url");
}

export type CookieIdentity = {
  sessionId: string;
  email: string;
  orgId: string;
  role: PortalRole;
  expiresAt: string;
};

function makeCookiePayload(x: CookieIdentity) {
  return b64urlEncode(Buffer.from(JSON.stringify(x), "utf8"));
}

export function makeSessionCookieValue(x: CookieIdentity) {
  const payload = makeCookiePayload(x);
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function verifySessionCookieValue(v: string):
  | ({ ok: true } & CookieIdentity)
  | { ok: false } {
  try {
    const raw = String(v || "").trim();
    if (!raw) return { ok: false };

    const parts = raw.split(".");
    if (parts.length !== 2) return { ok: false };

    const payloadB64 = parts[0];
    const sig = parts[1];

    const expected = hmac(payloadB64);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);

    if (a.length !== b.length) return { ok: false };
    if (!crypto.timingSafeEqual(a, b)) return { ok: false };

    const decoded = b64urlDecode(payloadB64).toString("utf8");
    const obj = JSON.parse(decoded);

    const sessionId = clean(obj?.sessionId, 200);
    const email = cleanEmail(obj?.email);
    const orgId = clean(obj?.orgId, 80);
    const role = obj?.role;
    const expiresAt = clean(obj?.expiresAt, 80);

    if (!sessionId || !email || !orgId || !expiresAt) return { ok: false };
    if (!isPortalRole(role)) return { ok: false };

    const exp = Date.parse(expiresAt);
    if (!exp || Date.now() > exp) return { ok: false };

    return { ok: true, sessionId, email, orgId, role, expiresAt };
  } catch {
    return { ok: false };
  }
}

/**
 * v2.3 provisioning rules
 * - Reads real provision file in dev
 * - In production, falls back to bootstrap env because /tmp is ephemeral
 */
async function getProvisionForEmail(email: string): Promise<ProvisionRow | null> {
  const normalizedEmail = cleanEmail(email);
  if (!normalizedEmail) return null;

  if (process.env.NODE_ENV !== "production") {
    const list = await readArrayJSON<ProvisionRow>(provisionPath());
    const row = list.find((x) => cleanEmail(x?.email) === normalizedEmail && x?.enabled);
    if (row) return row;
  }

  const bootstrap = cleanEmail(process.env.PORTAL_DEV_BOOTSTRAP_EMAIL || "");
  if (bootstrap && bootstrap === normalizedEmail) {
    return {
      email: normalizedEmail,
      orgId: "orbitlink-internal",
      role: "admin",
      enabled: true,
      note: "Bootstrap access",
      createdAt: nowISO(),
    };
  }

  return null;
}

/**
 * Magic token
 */
export async function makeMagicToken(args: {
  email: string;
  ip?: string;
  userAgent?: string;
  ttlMinutes?: number;
}) {
  const email = cleanEmail(args.email);
  if (!email) throw new Error("invalid_email");

  const prov = await getProvisionForEmail(email);
  if (!prov) throw new Error("not_provisioned");

  const ttlMinutes = clamp(Number(args.ttlMinutes ?? 20), 5, 60);
  const createdAt = nowISO();
  const expiresAt = new Date(Date.now() + ttlMinutes * 60_000).toISOString();
  const token = randomHex(24);

  const row: MagicTokenRow = {
    token,
    email,
    createdAt,
    expiresAt,
    ip: clean(args.ip, 120) || undefined,
    userAgent: clean(args.userAgent, 240) || undefined,
  };

  const file = tokensPath();
  const list = await readArrayJSON<MagicTokenRow>(file);
  list.unshift(row);
  await writeJSONAtomic(file, list.slice(0, 2000));

  return { token, row };
}

export const createMagicTokenRow = makeMagicToken;

/**
 * Verify token -> create session
 */
export async function verifyMagicToken(tokenRaw: string): Promise<
  | { ok: true; email: string; orgId: string; role: PortalRole; sessionId: string; expiresAt: string }
  | { ok: false; error: "missing_token" | "invalid" | "expired" | "used" | "not_provisioned" }
> {
  const token = clean(tokenRaw, 140);
  if (!token) return { ok: false, error: "missing_token" };

  const file = tokensPath();
  const list = await readArrayJSON<MagicTokenRow>(file);
  const idx = list.findIndex((x) => String(x?.token || "") === token);
  if (idx < 0) return { ok: false, error: "invalid" };

  const row = list[idx];
  if (row.usedAt) return { ok: false, error: "used" };

  const exp = Date.parse(row.expiresAt || "");
  if (!exp || Date.now() > exp) return { ok: false, error: "expired" };

  const prov = await getProvisionForEmail(row.email);
  if (!prov) return { ok: false, error: "not_provisioned" };

  const usedAt = nowISO();
  list[idx] = { ...row, usedAt };
  await writeJSONAtomic(file, list);

  const sessionId = randomHex(32);
  const sessionExpiresAt = new Date(
    Date.now() + SESSION_TTL_HOURS * 60 * 60_000
  ).toISOString();

  const sessionsFile = sessionsPath();
  const sessions = await readArrayJSON<SessionRow>(sessionsFile);

  const srow: SessionRow = {
    sessionId,
    email: row.email,
    orgId: prov.orgId,
    role: prov.role,
    createdAt: usedAt,
    expiresAt: sessionExpiresAt,
    lastSeenAt: usedAt,
    ip: row.ip,
    userAgent: row.userAgent,
  };

  sessions.unshift(srow);
  await writeJSONAtomic(sessionsFile, sessions.slice(0, 5000));

  return {
    ok: true,
    email: row.email,
    orgId: prov.orgId,
    role: prov.role,
    sessionId,
    expiresAt: sessionExpiresAt,
  };
}

/**
 * Strict validator: server session must exist + not expired
 */
export async function verifySessionExists(sessionIdRaw: string): Promise<
  | { ok: true; row: SessionRow }
  | { ok: false; error: "missing" | "not_found" | "expired" }
> {
  const sessionId = clean(sessionIdRaw, 200);
  if (!sessionId) return { ok: false, error: "missing" };

  const sessions = await readArrayJSON<SessionRow>(sessionsPath());
  const row = sessions.find((x) => x?.sessionId === sessionId);
  if (!row) return { ok: false, error: "not_found" };

  const exp = Date.parse(row.expiresAt || "");
  if (!exp || Date.now() > exp) return { ok: false, error: "expired" };

  return { ok: true, row };
}

/**
 * Touch session: sliding extension
 */
export async function touchSession(
  sessionIdRaw: string
): Promise<{ ok: true; expiresAt: string } | { ok: false }> {
  const sessionId = clean(sessionIdRaw, 200);
  if (!sessionId) return { ok: false };

  const file = sessionsPath();
  const sessions = await readArrayJSON<SessionRow>(file);
  const idx = sessions.findIndex((x) => x?.sessionId === sessionId);
  if (idx < 0) return { ok: false };

  const row = sessions[idx];
  const exp = Date.parse(row.expiresAt || "");
  if (!exp || Date.now() > exp) return { ok: false };

  const nextExpiresAt = new Date(
    Date.now() + SESSION_TTL_HOURS * 60 * 60_000
  ).toISOString();

  sessions[idx] = {
    ...row,
    lastSeenAt: nowISO(),
    expiresAt: nextExpiresAt,
  };

  await writeJSONAtomic(file, sessions);
  return { ok: true, expiresAt: nextExpiresAt };
}

/**
 * Revoke
 */
export async function revokeSession(sessionIdRaw: string) {
  const sessionId = clean(sessionIdRaw, 200);
  if (!sessionId) return;

  const file = sessionsPath();
  const sessions = await readArrayJSON<SessionRow>(file);
  const next = sessions.filter((s) => s?.sessionId !== sessionId);
  if (next.length === sessions.length) return;

  await writeJSONAtomic(file, next);
}

/**
 * Refresh cookie soon?
 */
export function shouldRefreshCookie(cookieExpiresAtISO: string) {
  const exp = Date.parse(cookieExpiresAtISO || "");
  if (!exp) return true;
  const msLeft = exp - Date.now();
  return msLeft < ROLLING_GRACE_MINUTES * 60_000;
}

export function mintRollingCookie(identity: {
  sessionId: string;
  email: string;
  orgId: string;
  role: PortalRole;
}) {
  const cookieExpiresAt = new Date(
    Date.now() + COOKIE_TTL_MINUTES * 60_000
  ).toISOString();

  return makeSessionCookieValue({
    sessionId: identity.sessionId,
    email: identity.email,
    orgId: identity.orgId,
    role: identity.role,
    expiresAt: cookieExpiresAt,
  });
}

export { COOKIE_NAME };