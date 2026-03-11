// src/lib/capsuleKeyring.ts (GOLDEN+++ KEYRING)
// Enterprise key rotation (Ed25519):
// - Multiple keys stored on disk (dev-friendly). Later: KMS/HSM.
// - One ACTIVE logicalKeyId selected by env.
// - Public-facing keyId is ALWAYS a fingerprint: ed25519:<sha16>
// - Old keys remain for verification.

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

type StoredKey = {
  logicalKeyId: string; // ex: ed25519-primary, ed25519-2026Q1
  createdAt: string;
  publicKeyPem: string;
  privateKeyPem: string; // server-only
  alg: "ed25519";
  revokedAt?: string; // optional future use
};

type KeyringFile = {
  version: "2";
  keys: StoredKey[];
};

function nowISO() {
  return new Date().toISOString();
}

function keyringPath() {
  // keep in repo root next to portal_sessions.json, etc.
  return path.join(process.cwd(), "portal_capsule_keyring.json");
}

async function readKeyring(): Promise<KeyringFile> {
  try {
    const raw = await fs.readFile(keyringPath(), "utf8");
    const parsed = JSON.parse(raw);

    // v2
    if (parsed?.version === "2" && Array.isArray(parsed?.keys)) {
      return parsed as KeyringFile;
    }

    // v1 -> migrate (your old format used keyId as logical id)
    if (parsed?.version === "1" && Array.isArray(parsed?.keys)) {
      const migrated: KeyringFile = {
        version: "2",
        keys: (parsed.keys as any[]).map((k) => ({
          logicalKeyId: String(k?.keyId || "ed25519-primary"),
          createdAt: String(k?.createdAt || nowISO()),
          publicKeyPem: String(k?.publicKeyPem || ""),
          privateKeyPem: String(k?.privateKeyPem || ""),
          alg: "ed25519" as const,
        })),
      };
      // write back migrated format (best-effort)
      await writeKeyringAtomic(migrated).catch(() => {});
      return migrated;
    }
  } catch {
    // ignore
  }
  return { version: "2", keys: [] };
}

async function writeKeyringAtomic(data: KeyringFile) {
  const file = keyringPath();
  const tmp = `${file}.tmp`;

  // write with restricted perms where possible
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), { encoding: "utf8" });
  await fs.rename(tmp, file);

  // best-effort: lock file down on unix
  try {
    await fs.chmod(file, 0o600);
  } catch {
    // windows/dev: ignore
  }
}

/**
 * IMPORTANT: fingerprint must be stable even if PEM formatting changes.
 * So we hash the DER bytes of the SPKI public key.
 */
function fingerprintKeyIdFromPublicPem(publicKeyPem: string) {
  const pubKeyObj = crypto.createPublicKey(publicKeyPem);
  const der = pubKeyObj.export({ type: "spki", format: "der" }) as Buffer;
  const fp = crypto.createHash("sha256").update(der).digest("hex").slice(0, 16);
  return `ed25519:${fp}`;
}

function generateEd25519PemPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
  return { publicKeyPem, privateKeyPem };
}

/**
 * ACTIVE key selection:
 * - Set PORTAL_CAPSULE_KEY_ID to a logical ID (ex: ed25519-2026Q1)
 * - If missing, default ed25519-primary
 */
function activeLogicalKeyId() {
  return String(process.env.PORTAL_CAPSULE_KEY_ID || "ed25519-primary").trim();
}

/**
 * Ensure ACTIVE key exists and return it.
 * Returns:
 * - logicalKeyId (internal label)
 * - keyId (fingerprint, safe to disclose; used for verification)
 */
export async function getOrCreateActiveCapsuleKey() {
  const logical = activeLogicalKeyId();
  const ring = await readKeyring();

  let hit = ring.keys.find((k) => k.logicalKeyId === logical && !k.revokedAt);

  if (!hit) {
    const { publicKeyPem, privateKeyPem } = generateEd25519PemPair();

    hit = {
      logicalKeyId: logical,
      createdAt: nowISO(),
      publicKeyPem,
      privateKeyPem,
      alg: "ed25519",
    };

    ring.keys.unshift(hit);

    // keep last 25 keys (tune as you want)
    ring.keys = ring.keys.slice(0, 25);

    await writeKeyringAtomic(ring);
  }

  const fingerprintKeyId = fingerprintKeyIdFromPublicPem(hit.publicKeyPem);

  return {
    logicalKeyId: hit.logicalKeyId,
    keyId: fingerprintKeyId,
    alg: hit.alg,
    publicKeyPem: hit.publicKeyPem,
    privateKeyPem: hit.privateKeyPem,
    createdAt: hit.createdAt,
  };
}

/**
 * Find key by PUBLIC fingerprint id (ed25519:<sha16>)
 * Used by /capsule/verify.
 */
export async function findPublicKeyByFingerprint(fingerprintKeyId: string) {
  const ring = await readKeyring();

  for (const k of ring.keys) {
    if (k.revokedAt) continue;

    const fp = fingerprintKeyIdFromPublicPem(k.publicKeyPem);
    if (fp === fingerprintKeyId) {
      return {
        keyId: fp,
        logicalKeyId: k.logicalKeyId,
        publicKeyPem: k.publicKeyPem,
        alg: k.alg,
        createdAt: k.createdAt,
      };
    }
  }
  return null;
}

/**
 * Auditor-friendly: list all public keys (including old ones, excluding revoked if you want).
 */
export async function listPublicKeys() {
  const ring = await readKeyring();
  return ring.keys
    .filter((k) => !k.revokedAt)
    .map((k) => ({
      keyId: fingerprintKeyIdFromPublicPem(k.publicKeyPem),
      logicalKeyId: k.logicalKeyId,
      alg: k.alg,
      createdAt: k.createdAt,
      publicKeyPem: k.publicKeyPem,
    }));
}

/**
 * Optional: allow manual revocation (keep for audit trails).
 * Example: await revokeLogicalKey("ed25519-2025Q4")
 */
export async function revokeLogicalKey(logicalKeyId: string) {
  const logical = String(logicalKeyId || "").trim();
  if (!logical) return;

  const ring = await readKeyring();
  const idx = ring.keys.findIndex((k) => k.logicalKeyId === logical && !k.revokedAt);
  if (idx < 0) return;

  ring.keys[idx] = { ...ring.keys[idx], revokedAt: nowISO() };
  await writeKeyringAtomic(ring);
}
