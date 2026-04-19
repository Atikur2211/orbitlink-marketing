export type WaitlistRecord = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;

  source?: string; // contact / trust / solutions / coming-soon
  intent?: string; // availability_pricing / verification-pack / early-access

  email: string;

  fullName?: string;
  company?: string;
  role?: string;
  location?: string;
  module?: string;
  volume?: string;
  timeline?: string;
  sites?: string;
  notes?: string;

  // OPS fields
  reviewStatus?: "new" | "reviewed" | "archived";
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;
  lastContactedAt?: string;

  // Old format compatibility
  ts?: string;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === "object" && v !== null;
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function cleanEmail(v: unknown): string {
  return typeof v === "string" ? v.trim().toLowerCase() : "";
}

function normalizeStatus(
  v?: string
): "new" | "reviewed" | "archived" | undefined {
  if (v === "new" || v === "reviewed" || v === "archived") return v;
  return undefined;
}

/**
 * Normalize unknown input into a stable WaitlistRecord.
 * Supports both camelCase and snake_case inputs.
 */
export function normalizeRecord(x: unknown): WaitlistRecord | null {
  if (!isRecord(x)) return null;

  const email = cleanEmail(x.email);
  if (!email) return null;

  const createdAt =
    asString(x.createdAt) ??
    asString(x.created_at) ??
    asString(x.ts) ??
    undefined;

  const updatedAt =
    asString(x.updatedAt) ??
    asString(x.updated_at) ??
    undefined;

  const reviewStatus = normalizeStatus(
    asString(x.reviewStatus) ?? asString(x.review_status)
  );

  const reviewedAt =
    asString(x.reviewedAt) ??
    asString(x.reviewed_at) ??
    undefined;

  const reviewedBy =
    asString(x.reviewedBy) ??
    asString(x.reviewed_by) ??
    undefined;

  const reviewNote =
    asString(x.reviewNote) ??
    asString(x.review_note) ??
    undefined;

  const lastContactedAt =
    asString(x.lastContactedAt) ??
    asString(x.last_contacted_at) ??
    undefined;

  return {
    id: asString(x.id),
    createdAt,
    updatedAt,

    source: asString(x.source),
    intent: asString(x.intent),

    email,
    fullName: asString(x.fullName) ?? asString(x.full_name),
    company: asString(x.company),
    role: asString(x.role),
    location: asString(x.location),
    module: asString(x.module),
    volume: asString(x.volume),
    timeline: asString(x.timeline),
    sites: asString(x.sites),
    notes: asString(x.notes),

    reviewStatus,
    reviewedAt,
    reviewedBy,
    reviewNote,
    lastContactedAt,

    ts: asString(x.ts),
  };
}

export function inferReviewStatus(
  r: WaitlistRecord
): "new" | "reviewed" | "archived" {
  if (r.reviewStatus === "archived") return "archived";
  if (r.reviewStatus === "reviewed") return "reviewed";
  if (r.reviewedAt || r.reviewNote) return "reviewed";
  return "new";
}

export function scoreRecord(r: WaitlistRecord): number {
  let s = 0;

  if (r.intent === "availability_pricing") s += 35;
  if (r.intent === "verification-pack") s += 45;
  if (r.intent === "early-access") s += 20;

  if (r.source === "contact") s += 20;
  if (r.source === "trust") s += 10;
  if (r.source === "solutions") s += 8;

  if (r.role === "business_owner") s += 22;
  if (r.role === "business_buyer") s += 24;
  if (r.role === "it_network") s += 20;
  if (r.role === "operations_facilities") s += 16;
  if (r.role === "property_management") s += 16;
  if (r.role === "partner_vendor") s += 8;

  if (r.role === "auditor") s += 30;
  if (r.role === "enterprise") s += 24;
  if (r.role === "isp") s += 16;
  if (r.role === "partner") s += 8;

  if (r.company) s += 10;
  if (r.fullName) s += 8;
  if (r.location) s += 14;
  if (r.module) s += 12;
  if (r.timeline) s += 8;
  if (r.sites) s += 6;
  if (r.volume) s += 4;

  if (r.timeline === "asap") s += 10;
  if (r.timeline === "within_30_days") s += 8;
  if (r.timeline === "within_60_90_days") s += 5;

  if (r.sites === "2_5") s += 4;
  if (r.sites === "6_20") s += 8;
  if (r.sites === "20_plus") s += 12;

  const n = (r.notes || "").trim();
  if (n.length >= 40) s += 6;
  if (n.length >= 140) s += 6;

  return Math.min(100, s);
}

export function formatWhen(r: WaitlistRecord): string {
  const ts = r.updatedAt || r.createdAt;
  if (!ts) return "—";

  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "—";

  return d.toISOString().slice(0, 10);
}

export function formatShortDate(ts?: string) {
  if (!ts) return "—";

  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "—";

  return d.toISOString().slice(0, 10);
}

export function uniqSorted(values: (string | undefined)[]) {
  return Array.from(
    new Set(values.map((v) => (v || "").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
}

export function makeMailtoSubject(r: WaitlistRecord) {
  if (r.intent === "verification-pack") {
    return "Orbitlink — Verification Pack Request";
  }

  if (r.intent === "availability_pricing") {
    return "Orbitlink — Availability & Pricing Request";
  }

  return "Orbitlink — Service Request";
}

export function makeReplyTemplate(r: WaitlistRecord) {
  const lines: string[] = [];

  if (r.intent === "verification-pack") {
    lines.push("Thanks — your request has been received.");
    lines.push("We’ll reply when your request matches an active review window.");
    lines.push("");
    lines.push("To prepare the scope-appropriate pack, please confirm:");
    lines.push("• Service or module: " + (r.module || "—"));
    lines.push("• Location: " + (r.location || "—"));
    lines.push("• Review audience: " + (r.role || "—"));
    lines.push("");
    lines.push(
      "Sensitive operational details remain request-only, and redacted materials are shared where appropriate."
    );

    return lines.join("\n");
  }

  if (r.intent === "availability_pricing") {
    lines.push("Thanks — your request has been received.");
    lines.push("We’re reviewing the address, service fit, and project details now.");
    lines.push("");
    lines.push("Captured details:");
    lines.push("• Service: " + (r.module || "—"));
    lines.push("• Address: " + (r.location || "—"));
    lines.push("• Company: " + (r.company || "—"));
    lines.push("• Timeline: " + (r.timeline || "—"));
    lines.push("• Sites: " + (r.sites || r.volume || "—"));

    if (r.notes && r.notes.trim()) {
      lines.push("");
      lines.push("Project details:");
      lines.push(r.notes.trim());
    }

    lines.push("");
    lines.push(
      "We’ll reply with the clearest next step available, which may include availability direction, pricing guidance, or a follow-up question if more detail is needed."
    );

    return lines.join("\n");
  }

  lines.push("Thanks — your request has been received.");
  lines.push("");
  lines.push("Captured details:");
  lines.push("• Service: " + (r.module || "—"));
  lines.push("• Address: " + (r.location || "—"));
  lines.push("• Company: " + (r.company || "—"));

  if (r.notes && r.notes.trim()) {
    lines.push("");
    lines.push("Notes:");
    lines.push(r.notes.trim());
  }

  lines.push("");
  lines.push("We’ll reply with the next appropriate step.");

  return lines.join("\n");
}