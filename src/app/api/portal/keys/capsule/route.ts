// src/app/api/portal/capsule/pub/route.ts (ENTERPRISE CAPSULE PUBLIC KEY)
// Purpose: publish ACTIVE capsule signing public key for offline verification.

import { NextResponse } from "next/server";
import crypto from "crypto";
import { getOrCreateActiveCapsuleKey } from "@/lib/capsuleKeyring";

export const runtime = "nodejs";

function nowISO() {
  return new Date().toISOString();
}

function sha256Hex(s: string) {
  return crypto.createHash("sha256").update(Buffer.from(s, "utf8")).digest("hex");
}

export async function GET(req: Request) {
  const active = await getOrCreateActiveCapsuleKey();
  const publicKeyPem = active.publicKeyPem;
  const keyId = active.keyId;
  const logicalKeyId = active.logicalKeyId;

  // Strong ETag derived from the key material
  const etag = `"${sha256Hex(publicKeyPem)}"`;
  const inm = req.headers.get("if-none-match") || "";

  if (inm === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        etag,
        "cache-control": "no-store, max-age=0",
        "x-portal-ts": nowISO(),
        "x-key-id": keyId,
        "x-logical-key-id": logicalKeyId,
      },
    });
  }

  const url = new URL(req.url);
  const download = url.searchParams.get("download") === "1";

  const res = new NextResponse(publicKeyPem, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      etag,
      "x-portal-ts": nowISO(),
      "x-key-id": keyId,
      "x-logical-key-id": logicalKeyId,
      ...(download
        ? { "content-disposition": `attachment; filename="orbitlink-capsule-${keyId}.pub.pem"` }
        : {}),
    },
  });

  return res;
}
