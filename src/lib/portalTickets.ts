// src/lib/portalTickets.ts (GOLDEN++ v2.5)
// Append-only timeline + hash chain + audit-ready fields

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type TicketStatus =
  | "Queued"
  | "In Review"
  | "In Progress"
  | "Awaiting Info"
  | "Resolved"
  | "Closed";

export type TicketPriority = "Low" | "Normal" | "High" | "Critical";

export type TicketComment = {
  id: string;
  at: string;
  by: string;
  role: "customer" | "ops";
  body: string;
};

export type TicketEventType = "created" | "status" | "priority" | "comment" | "assign" | "sla";

/**
 * ✅ Golden++ event:
 * - prevHash/hash create an append-only chain
 * - reason supports sensitive transitions and audit
 * - actorId/signatureStub/approvalChainId are future hooks
 */
export type TicketEvent = {
  id: string;
  at: string;
  type: TicketEventType;
  by: string;

  from?: string;
  to?: string;
  note?: string;

  // Golden++ fields
  reason?: string;
  actorId?: string;
  signatureStub?: string;
  approvalChainId?: string;

  // Immutable chain
  prevHash?: string; // hash of previous head
  hash?: string; // hash of this event (computed)
};

export type TicketSLA = {
  targetMinutes: number;
  breachAt: string;
  breached: boolean;
};

export type TicketRow = {
  id: string; // ORB-1234
  orgId: string;

  createdAt: string;
  updatedAt: string;

  ownerEmail: string;
  assignee?: string;

  title: string;
  category: "Incident" | "Request" | "Change" | "Access" | "Billing";
  impact: string;
  details: string;

  status: TicketStatus;
  priority: TicketPriority;

  sla: TicketSLA;

  lastActor: string;
  tags: string[];

  comments: TicketComment[];
  timeline: TicketEvent[];

  ip?: string;
  userAgent?: string;
};

export type TicketFieldErrors = Partial<
  Record<"category" | "priority" | "title" | "impact" | "details", string>
>;

function nowISO() {
  return new Date().toISOString();
}

function clean(v: unknown, max = 8000) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function cleanLine(v: unknown, max = 300) {
  return clean(v, max).replace(/\s+/g, " ").trim();
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function randId(bytes = 12) {
  return crypto.randomBytes(bytes).toString("hex");
}

function ticketsPath() {
  return path.join(process.cwd(), "portal_tickets.json");
}

function ticketCounterPath() {
  return path.join(process.cwd(), "portal_ticket_counter.json");
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

async function readObjectJSON<T extends object>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as T;
    return fallback;
  } catch {
    return fallback;
  }
}

async function writeJSONAtomic(filePath: string, data: unknown) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

async function nextTicketIdStable(): Promise<string> {
  const file = ticketCounterPath();
  const obj = await readObjectJSON<{ last: number }>(file, { last: 1000 });
  const next = clamp(Number(obj.last ?? 1000) + 1, 1000, 9999);
  await writeJSONAtomic(file, { last: next });
  return `ORB-${next}`;
}

function slaTargetMinutes(priority: TicketPriority) {
  if (priority === "Critical") return 15;
  if (priority === "High") return 60;
  if (priority === "Normal") return 240;
  return 1440;
}

function computeSLA(createdAtISO: string, priority: TicketPriority): TicketSLA {
  const created = Date.parse(createdAtISO);
  const mins = slaTargetMinutes(priority);
  const breach = new Date(created + mins * 60_000).toISOString();
  const breached = Date.now() > Date.parse(breach);
  return { targetMinutes: mins, breachAt: breach, breached };
}

/* =========================================================
   GOLDEN++: EVENT HASH CHAIN
   - canonicalize event content (excluding "hash")
   - compute sha256
   - store prevHash + hash
   ========================================================= */

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}

function canonicalEventForHash(e: TicketEvent) {
  // IMPORTANT: exclude "hash" so hash is stable
  const obj: any = {
    id: String(e.id || ""),
    at: String(e.at || ""),
    type: String(e.type || ""),
    by: String(e.by || ""),
    from: e.from ?? undefined,
    to: e.to ?? undefined,
    note: e.note ?? undefined,
    reason: e.reason ?? undefined,
    actorId: e.actorId ?? undefined,
    signatureStub: e.signatureStub ?? undefined,
    approvalChainId: e.approvalChainId ?? undefined,
    prevHash: e.prevHash ?? undefined,
  };

  // stable key order
  const ordered: any = {};
  for (const k of [
    "id",
    "at",
    "type",
    "by",
    "from",
    "to",
    "note",
    "reason",
    "actorId",
    "signatureStub",
    "approvalChainId",
    "prevHash",
  ]) {
    if (obj[k] !== undefined && obj[k] !== "") ordered[k] = obj[k];
  }
  return JSON.stringify(ordered);
}

function sealEvent(e: TicketEvent, prevHash: string) {
  const base: TicketEvent = { ...e, prevHash };
  const hash = sha256Hex(canonicalEventForHash(base));
  return { ...base, hash };
}

function headHash(t: TicketRow) {
  const h = (t.timeline && t.timeline[0] && t.timeline[0].hash) || "";
  return String(h || "");
}

/**
 * Push a new event onto the timeline (newest-first) while maintaining the hash chain.
 */
function appendEvent(t: TicketRow, e: TicketEvent) {
  const prev = headHash(t);
  const sealed = sealEvent(e, prev);
  t.timeline.unshift(sealed);
  return sealed.hash || prev;
}

/**
 * For multiple events in one action, keep a deterministic order and chain them.
 */
function appendEvents(t: TicketRow, events: TicketEvent[]) {
  let prev = headHash(t);
  for (const e of events) {
    const sealed = sealEvent(e, prev);
    t.timeline.unshift(sealed);
    prev = sealed.hash || prev;
  }
  return prev;
}

/* =========================================================
   VALIDATION
   ========================================================= */

export function validateTicketPayload(input: {
  category: unknown;
  priority: unknown;
  title: unknown;
  impact: unknown;
  details: unknown;
}): { ok: true } | { ok: false; fields: TicketFieldErrors } {
  const fields: TicketFieldErrors = {};

  const title = cleanLine(input.title, 160);
  const impact = cleanLine(input.impact, 240);
  const details = clean(input.details, 4000);

  if (!title || title.length < 6) fields.title = "Title is required (min 6 characters).";
  if (!impact || impact.length < 12) fields.impact = "Impact is required (min 12 characters).";
  if (!details || details.length < 20) fields.details = "Details are required (min 20 characters).";

  const low = new Set(["test", "help", "hello", "pls", "asd", "xxxxx"]);
  if (title && low.has(title.toLowerCase())) fields.title = "Title is too low-signal. Use a precise subject line.";

  const category = String(input.category || "").trim();
  const priority = String(input.priority || "").trim();

  const allowedCategory = new Set(["Incident", "Request", "Change", "Access", "Billing"]);
  const allowedPriority = new Set(["Low", "Normal", "High", "Critical"]);

  if (!allowedCategory.has(category)) fields.category = "Invalid category.";
  if (!allowedPriority.has(priority)) fields.priority = "Invalid priority.";

  return Object.keys(fields).length ? { ok: false, fields } : { ok: true };
}

/* =========================================================
   READ
   ========================================================= */

export async function listTicketsForOrg(args: { orgId: string; email: string; role: "customer" | "admin" | "ops" }) {
  const list = await readArrayJSON<TicketRow>(ticketsPath());

  if (args.role === "customer") {
    return list
      .filter((t) => t.orgId === args.orgId && t.ownerEmail === args.email)
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }

  return list.filter((t) => t.orgId === args.orgId).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function getTicketForOrg(args: {
  orgId: string;
  email: string;
  role: "customer" | "admin" | "ops";
  id: string;
}) {
  const list = await readArrayJSON<TicketRow>(ticketsPath());
  const t = list.find((x) => x.id === args.id);
  if (!t) return null;
  if (t.orgId !== args.orgId) return null;
  if (args.role === "customer" && t.ownerEmail !== args.email) return null;
  return t;
}

/* =========================================================
   CREATE
   ========================================================= */

export async function createTicket(args: {
  orgId: string;
  ownerEmail: string;
  title: string;
  category: TicketRow["category"];
  priority: TicketPriority;
  impact: string;
  details: string;
  ip?: string;
  userAgent?: string;
}) {
  const file = ticketsPath();
  const list = await readArrayJSON<TicketRow>(file);

  const createdAt = nowISO();
  const id = await nextTicketIdStable();

  const title = cleanLine(args.title, 160);
  const impact = cleanLine(args.impact, 240);
  const details = clean(args.details, 4000);

  if (!title || title.length < 6) throw new Error("invalid_title");
  if (!impact || impact.length < 12) throw new Error("invalid_impact");
  if (!details || details.length < 20) throw new Error("invalid_details");

  const sla = computeSLA(createdAt, args.priority);
  const owner = cleanLine(args.ownerEmail, 200).toLowerCase();

  const row: TicketRow = {
    id,
    orgId: cleanLine(args.orgId, 80),
    createdAt,
    updatedAt: createdAt,
    ownerEmail: owner,
    assignee: "Ops",

    title,
    category: args.category,
    impact,
    details,

    status: "Queued",
    priority: args.priority,
    sla,

    lastActor: owner,
    tags: ["controlled-intake", "sla-ack-clock"],

    comments: [],
    timeline: [],
    ip: clean(args.ip, 120),
    userAgent: clean(args.userAgent, 240),
  };

  // Golden++: seed chain with created + sla events (newest-first)
  appendEvents(row, [
    {
      id: randId(8),
      at: createdAt,
      type: "sla",
      by: "System",
      note: `SLA clock started (${sla.targetMinutes}m).`,
      actorId: "system",
    },
    {
      id: randId(8),
      at: createdAt,
      type: "created",
      by: owner,
      note: "Ticket created via portal intake.",
      actorId: owner,
    },
  ]);

  list.unshift(row);
  await writeJSONAtomic(file, list.slice(0, 5000));
  return row;
}

/* =========================================================
   AUTO-ACK (optional)
   ========================================================= */

export async function maybeAutoAckOnFirstOpsComment(args: {
  orgId: string;
  actorEmail: string;
  role: string;
  ticketId: string;
}) {
  const { orgId, actorEmail, role, ticketId } = args;

  // Only ops/admin
  if (role !== "ops" && role !== "admin") return null;

  const t = await getTicketForOrg({ orgId, email: actorEmail, role: role as any, id: ticketId });
  if (!t) return null;

  // Only if still queued
  if (t.status !== "Queued") return null;

  // Only if no previous ops comment exists
  const hasOpsComment = (t.comments || []).some((c: any) => String(c.role || "").toLowerCase() === "ops");
  if (hasOpsComment) return null;

  // Apply status change (with reason)
  return opsPatchTicket({
    orgId,
    actorEmail,
    role: role as any,
    ticketId,
    patch: { status: "In Progress", reason: "Auto-ack on first operator comment." },
  });
}

/* =========================================================
   COMMENT
   ========================================================= */

export async function addComment(args: {
  orgId: string;
  ticketId: string;
  actorEmail: string;
  role: "customer" | "ops";
  body: string;
}) {
  const file = ticketsPath();
  const list = await readArrayJSON<TicketRow>(file);

  const idx = list.findIndex((x) => x.id === args.ticketId);
  if (idx < 0) throw new Error("not_found");

  const t = list[idx];
  if (t.orgId !== args.orgId) throw new Error("forbidden");

  const actor = cleanLine(args.actorEmail, 200).toLowerCase();
  if (args.role === "customer" && t.ownerEmail !== actor) throw new Error("forbidden");

  const at = nowISO();
  const body = clean(args.body, 2000);
  if (!body || body.length < 3) throw new Error("invalid_body");

  t.comments.unshift({
    id: randId(10),
    at,
    by: args.role === "ops" ? "Ops" : actor,
    role: args.role,
    body,
  });

  appendEvent(t, {
    id: randId(8),
    at,
    type: "comment",
    by: args.role === "ops" ? "Ops" : actor,
    actorId: args.role === "ops" ? "ops" : actor,
    note: args.role === "ops" ? "Operator note added." : "Customer comment added.",
  });

  t.updatedAt = at;
  t.lastActor = args.role === "ops" ? "Ops" : actor;
  t.sla = { ...t.sla, breached: Date.now() > Date.parse(t.sla.breachAt) };

  list[idx] = t;
  await writeJSONAtomic(file, list);
  return t;
}

/* =========================================================
   OPS PATCH (Golden++)
   ========================================================= */

function isSensitiveStatus(s?: TicketStatus) {
  return !!s && (s === "Resolved" || s === "Closed" || s === "Queued");
}

export async function opsPatchTicket(args: {
  orgId: string;
  ticketId: string;
  actorEmail: string;
  role: "admin" | "ops";

  patch?: {
    status?: TicketStatus;
    priority?: TicketPriority;
    assignee?: string;
    reason?: string; // audit reason (required for sensitive status)
    actorId?: string; // stable identity
    signatureStub?: string; // future signing
    approvalChainId?: string; // future approvals
  };

  // back-compat (allow top-level too)
  status?: TicketStatus;
  priority?: TicketPriority;
  assignee?: string;
  reason?: string;
}) {
  if (!args?.orgId || !args?.ticketId || !args?.actorEmail) throw new Error("invalid_body");
  if (args.role !== "admin" && args.role !== "ops") throw new Error("forbidden");

  const at = nowISO(); // single timestamp for this patch

  // Accept patch OR top-level fields
  const patch = args.patch && typeof args.patch === "object" ? args.patch : {};
  const status = (patch.status ?? args.status) as TicketStatus | undefined;
  const priority = (patch.priority ?? args.priority) as TicketPriority | undefined;
  const assignee = (patch.assignee ?? args.assignee) as string | undefined;

  const actorId = cleanLine(patch.actorId || "ops", 120);
  const signatureStub = cleanLine(patch.signatureStub || "", 400);
  const approvalChainId = cleanLine(patch.approvalChainId || "", 200);

  const reasonRaw = (patch.reason ?? args.reason) as string | undefined;
  const reason = reasonRaw ? cleanLine(reasonRaw, 400) : "";

  const assigneeClean = assignee ? String(assignee).trim().slice(0, 120) : undefined;

  const hasAny = !!status || !!priority || !!assigneeClean;
  if (!hasAny) throw new Error("invalid_body");

  // Strict enum validation
  const validStatus = new Set<TicketStatus>([
    "Queued",
    "In Review",
    "In Progress",
    "Awaiting Info",
    "Resolved",
    "Closed",
  ]);
  const validPriority = new Set<TicketPriority>(["Low", "Normal", "High", "Critical"]);

  if (status && !validStatus.has(status)) throw new Error("invalid_body");
  if (priority && !validPriority.has(priority)) throw new Error("invalid_body");

  // Enterprise rule: reason required for sensitive status moves
  if (status && isSensitiveStatus(status) && (!reason || reason.length < 6)) throw new Error("invalid_body");

  // Load tickets
  const tickets = await readArrayJSON<TicketRow>(ticketsPath());
  const idx = tickets.findIndex((t) => t.id === args.ticketId && t.orgId === args.orgId);
  if (idx < 0) throw new Error("not_found");

  const t = tickets[idx];

  // Before values
  const beforeStatus = t.status;
  const beforePriority = t.priority;
  const beforeAssignee = t.assignee || "";

  // Apply patch
  if (status) t.status = status;
  if (priority) t.priority = priority;
  if (assigneeClean) t.assignee = assigneeClean;

  t.updatedAt = at;
  t.lastActor = "Ops";

  // SLA refresh discipline
  if (priority && priority !== beforePriority) {
    // anchored to createdAt
    t.sla = computeSLA(t.createdAt, priority);
  } else {
    t.sla = { ...t.sla, breached: Date.now() > Date.parse(t.sla.breachAt) };
  }

  const reasonNote = reason ? ` Reason: ${reason}` : "";

  // Deterministic event order for one ops action:
  // 1) status, 2) priority, 3) assign
  const newEvents: TicketEvent[] = [];

  if (status && status !== beforeStatus) {
    newEvents.push({
      id: randId(8),
      at,
      type: "status",
      by: "Ops",
      from: beforeStatus,
      to: status,
      note: `Operator status update.${reasonNote}`,
      reason: reason || undefined,
      actorId,
      signatureStub: signatureStub || undefined,
      approvalChainId: approvalChainId || undefined,
    });
  }

  if (priority && priority !== beforePriority) {
    newEvents.push({
      id: randId(8),
      at,
      type: "priority",
      by: "Ops",
      from: beforePriority,
      to: priority,
      note: `Operator priority update.${reasonNote}`,
      reason: reason || undefined,
      actorId,
      signatureStub: signatureStub || undefined,
      approvalChainId: approvalChainId || undefined,
    });
  }

  if (assigneeClean && assigneeClean !== beforeAssignee) {
    newEvents.push({
      id: randId(8),
      at,
      type: "assign",
      by: "Ops",
      from: beforeAssignee || "—",
      to: assigneeClean,
      note: `Operator assignment update.${reasonNote}`,
      reason: reason || undefined,
      actorId,
      signatureStub: signatureStub || undefined,
      approvalChainId: approvalChainId || undefined,
    });
  }

  // Append newest-first, hash-chained
  // IMPORTANT: because timeline is newest-first, we add events in reverse
  // so the first pushed ends up closest to top deterministically.
  appendEvents(t, newEvents.reverse());

  tickets[idx] = t;
  await writeJSONAtomic(ticketsPath(), tickets);

  return t;
}

/* =========================================================
   GOLDEN CAPSULE EXPORT (helper)
   - You can later attach this to /api/.../export
   ========================================================= */

export function makeTicketCapsule(ticket: TicketRow) {
  // Keep capsule stable and offline verifiable
  const body = {
    ticket,
    chainHead: headHash(ticket),
    exportedAt: nowISO(),
  };

  const bodyJson = JSON.stringify(body, null, 2);
  const digest = sha256Hex(bodyJson);

  return {
    header: {
      kind: "orbitlink.ticket.capsule",
      version: "1.0.0",
      sha256: digest,
      chainHead: headHash(ticket),
      exportedAt: body.exportedAt,
    },
    body,
  };
}
