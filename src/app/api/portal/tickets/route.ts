// src/app/api/portal/tickets/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookieValue } from "@/lib/portalAuth";
import {
  createTicket,
  listTicketsForOrg,
  validateTicketPayload,
  type TicketFieldErrors,
} from "@/lib/portalTickets";

export const runtime = "nodejs";

function nowISO() {
  return new Date().toISOString();
}

function getIP(req: Request) {
  const h = req.headers;
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
}

function cleanStr(v: unknown, max = 4000) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
}

function cleanLine(v: unknown, max = 300) {
  return cleanStr(v, max).replace(/\s+/g, " ").trim();
}

function jsonNoCache(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("x-portal-ts", nowISO());
  return res;
}

// ✅ Next.js: cookies() may be async -> await it here, AND await auth() in handlers
async function auth() {
  const c = await cookies();
  const v = c.get("orbit_portal_session")?.value || "";
  const verified = v ? verifySessionCookieValue(v) : { ok: false as const };
  return verified.ok ? verified : null;
}

function deriveOrgRole(a: any): { orgId: string; role: "customer" | "admin" | "ops" } {
  const orgId = cleanLine(a?.orgId, 80) || "orbitlink";
  const roleRaw = cleanLine(a?.role, 40).toLowerCase();
  const role = roleRaw === "ops" ? "ops" : roleRaw === "admin" ? "admin" : "customer";
  return { orgId, role };
}

function mapValidationToFields(message: string): TicketFieldErrors | null {
  if (message === "invalid_title") return { title: "Title is required (min 6 characters)." };
  if (message === "invalid_impact") return { impact: "Impact is required (min 12 characters)." };
  if (message === "invalid_details") return { details: "Details are required (min 20 characters)." };
  return null;
}

export async function GET() {
  const a = await auth();
  if (!a) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  // hard guards
  if (!a.email) return jsonNoCache({ ok: false, error: "unauthorized", message: "missing_email" }, { status: 401 });
  if (!a.orgId) return jsonNoCache({ ok: false, error: "unauthorized", message: "missing_orgId" }, { status: 401 });

  const { orgId, role } = deriveOrgRole(a);

  try {
    const tickets = await listTicketsForOrg({ orgId, email: a.email, role });
    return jsonNoCache({ ok: true, tickets }, { status: 200 });
  } catch (e: any) {
    const msg = cleanLine(e?.message || "server_error", 200);
    console.error("[tickets.GET] failed", { msg, ts: nowISO(), orgId, email: a.email });
    return jsonNoCache({ ok: false, error: "server_error", message: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const a = await auth();
  if (!a) return jsonNoCache({ ok: false, error: "unauthorized" }, { status: 401 });

  if (!a.email) return jsonNoCache({ ok: false, error: "unauthorized", message: "missing_email" }, { status: 401 });
  if (!a.orgId) return jsonNoCache({ ok: false, error: "unauthorized", message: "missing_orgId" }, { status: 401 });

  const { orgId } = deriveOrgRole(a);

  const body = await req.json().catch(() => ({} as any));

  const payload = {
    category: cleanLine(body?.category, 30),
    priority: cleanLine(body?.priority, 30),
    title: cleanLine(body?.title, 160),
    impact: cleanLine(body?.impact, 320),
    details: cleanStr(body?.details, 6000),
  };

  console.log("[tickets.POST] intake", {
    ts: nowISO(),
    email: a.email,
    orgId,
    category: payload.category,
    priority: payload.priority,
    titleLen: payload.title.length,
    impactLen: payload.impact.length,
    detailsLen: payload.details.length,
  });

  const v = validateTicketPayload(payload);
  if (!v.ok) {
    return jsonNoCache(
      { ok: false, error: "validation", fields: v.fields, hint: "Fix highlighted fields and retry." },
      { status: 400 }
    );
  }

  try {
    const row = await createTicket({
      orgId,
      ownerEmail: a.email,
      title: payload.title,
      category: payload.category as any,
      priority: payload.priority as any,
      impact: payload.impact,
      details: payload.details,
      ip: getIP(req),
      userAgent: req.headers.get("user-agent") || "",
    });

    return jsonNoCache({ ok: true, ticket: row }, { status: 200 });
  } catch (e: any) {
    const message = cleanLine(e?.message || "create_failed", 250);
    console.error("[tickets.POST] create failed", { message, stack: e?.stack, ts: nowISO(), orgId, email: a.email });

    const fieldMap = mapValidationToFields(message);
    if (fieldMap) {
      return jsonNoCache(
        { ok: false, error: "validation", fields: fieldMap, hint: "Fix highlighted fields and retry." },
        { status: 400 }
      );
    }

    return jsonNoCache(
      { ok: false, error: "server_write_failed", message, hint: "Storage write failed. Check permissions / JSON." },
      { status: 500 }
    );
  }
}
