// src/app/api/portal/tickets/[id]/artifact/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

import { verifySessionCookieValue } from "@/lib/portalAuth";
import { getTicketForOrg } from "@/lib/portalTickets";

export const runtime = "nodejs";

function nowISO() {
  return new Date().toISOString();
}

function sha256(s: string) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}

function clean(v: unknown, max = 220) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  return res;
}

async function auth() {
  // ✅ Next.js route handler: cookies() is async
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

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await auth();
  if (!a) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  const p = await params;
  const ticketId = safeDecode(p.id);

  // ✅ Enterprise access model: org + role aware
  const t = await getTicketForOrg({
    orgId: a.orgId,
    email: a.email,
    role: a.role,
    id: ticketId,
  });

  if (!t) return jsonNoCache({ ok: false, error: "not_found" }, { status: 404 });

  // ✅ Evidence capsule (stable schema + org metadata)
  const capsule = {
    schema: "orbitlink.ticket.artifact.v1",
    exportedAt: nowISO(),
    orgId: t.orgId,
    exportedBy: {
      email: a.email,
      role: a.role,
    },
    ticket: {
      id: t.id,
      category: t.category,
      priority: t.priority,
      status: t.status,
      title: t.title,
      impact: t.impact,
      details: t.details,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      lastActor: t.lastActor,
      assignee: t.assignee || "Ops",
      sla: t.sla,
      tags: t.tags || [],
    },
    comments: t.comments || [],
    timeline: t.timeline || [],
  };

  const json = JSON.stringify(capsule, null, 2);
  const digest = sha256(json);

  // ✅ Downloadable file + SHA256 header
  return new NextResponse(json, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="${clean(t.id, 64)}.artifact.json"`,
      "cache-control": "no-store, max-age=0",
      "x-portal-ts": nowISO(),
      "x-orbitlink-sha256": digest,
      "x-content-type-options": "nosniff",
    },
  });
}
