// src/proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Orbitlink Ops", charset="UTF-8"',
    },
  });
}

function parseBasicAuth(auth: string | null) {
  if (!auth) return null;
  const v = auth.trim();
  if (!v.startsWith("Basic ")) return null;

  try {
    const b64 = v.slice("Basic ".length).trim();

    // Edge-safe base64 decode
    const decoded =
      typeof atob === "function"
        ? atob(b64)
        : Buffer.from(b64, "base64").toString("utf8");

    const idx = decoded.indexOf(":");
    if (idx < 0) return null;

    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return null;
  }
}

// ✅ MUST be named `proxy` in Next 16.1+
export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ✅ Protect BOTH Ops UI + Ops APIs
  const isOps = pathname.startsWith("/ops") || pathname.startsWith("/api/ops");
  if (!isOps) return NextResponse.next();

  const user = process.env.OPS_BASIC_USER || "";
  const pass = process.env.OPS_BASIC_PASS || "";
  if (!user || !pass) return unauthorized();

  const creds = parseBasicAuth(req.headers.get("authorization"));
  if (!creds) return unauthorized();

  if (creds.user === user && creds.pass === pass) return NextResponse.next();
  return unauthorized();
}

export const config = {
  matcher: ["/ops/:path*", "/api/ops/:path*"],
};
