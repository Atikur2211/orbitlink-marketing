// src/lib/capsuleSign.ts (GOLDEN SIGNER ++ Enterprise)
import crypto from "crypto";
import { getOrCreateActiveCapsuleKey } from "@/lib/capsuleKeyring";

/**
 * IMPORTANT ENTERPRISE RULE:
 * - stableBytes MUST be the exact deterministic string you will later:
 *   1) hash (sha256)
 *   2) send via download=1
 *   3) verify on /verify
 *
 * If you pretty-print JSON or re-stringify in a different way, verification will fail.
 */

function b64urlEncode(buf: Buffer) {
  return buf.toString("base64url");
}

function sha256HexUtf8(s: string) {
  return crypto.createHash("sha256").update(Buffer.from(s, "utf8")).digest("hex");
}

function assertStableBytes(stableBytes: unknown): asserts stableBytes is string {
  if (typeof stableBytes !== "string") throw new Error("capsule_sign_invalid_input");
  if (!stableBytes) throw new Error("capsule_sign_empty_bytes");

  // sanity: should look like a JSON object string from stableStringify (no trailing whitespace)
  if (stableBytes[0] !== "{" || stableBytes[stableBytes.length - 1] !== "}") {
    throw new Error("capsule_sign_not_json_object_bytes");
  }
  if (/\s$/.test(stableBytes)) {
    // common failure: pretty JSON / newline at end
    throw new Error("capsule_sign_trailing_whitespace_detected");
  }
}

/**
 * Optional: produce a detached signature text that still works as a downloadable ".asc" artifact.
 * (Not PGP armor; simple Orbitlink armor with metadata.)
 */
function toOrbitlinkAsc(args: {
  alg: "ed25519";
  keyId: string;
  payloadSha256: string;
  sigB64Url: string;
}) {
  return [
    "-----BEGIN ORBITLINK DETACHED SIGNATURE-----",
    `alg: ${args.alg}`,
    `keyId: ${args.keyId}`,
    `payloadSha256: ${args.payloadSha256}`,
    "",
    args.sigB64Url,
    "-----END ORBITLINK DETACHED SIGNATURE-----",
    "",
  ].join("\n");
}

export type CapsuleSignature = {
  alg: "ed25519";
  keyId: string;               // e.g. ed25519:<sha16>
  logicalKeyId: string;        // internal label / rotation label
  signatureB64Url: string;     // detached signature (base64url)
  publicKeyPem: string;        // PEM public key for verification
  payloadSha256: string;       // sha256 over EXACT stableBytes
  signatureAsc: string;        // human-friendly detached signature text (downloadable)
  signedAt: string;            // ISO
};

export async function signCapsuleBytes(stableBytes: string): Promise<CapsuleSignature> {
  assertStableBytes(stableBytes);

  const active = await getOrCreateActiveCapsuleKey();

  // sha over EXACT bytes we sign (useful for headers + debugging)
  const payloadSha256 = sha256HexUtf8(stableBytes);

  // Ed25519: algorithm = null in Node crypto.sign/verify
  const signature = crypto.sign(
    null,
    Buffer.from(stableBytes, "utf8"),
    active.privateKeyPem
  );

  const signatureB64Url = b64urlEncode(signature);

  return {
    alg: "ed25519",
    keyId: active.keyId,
    logicalKeyId: active.logicalKeyId,
    signatureB64Url,
    publicKeyPem: active.publicKeyPem,
    payloadSha256,
    signatureAsc: toOrbitlinkAsc({
      alg: "ed25519",
      keyId: active.keyId,
      payloadSha256,
      sigB64Url: signatureB64Url,
    }),
    signedAt: new Date().toISOString(),
  };
}
