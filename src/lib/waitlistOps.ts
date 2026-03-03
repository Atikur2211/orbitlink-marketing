// src/lib/waitlistOps.ts

export type WaitlistRecord = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;

  source?: string; // coming-soon / trust / solutions
  intent?: string; // early-access / verification-pack

  email: string;

  fullName?: string;
  company?: string;
  role?: string;
  location?: string;
  module?: string;
  volume?: string;
  notes?: string;

  // ✅ OPS fields (internal)
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
  const s = typeof v === "string" ? v.trim().toLowerCase() : "";
  return s;
}

/**
 * Normalize unknown input into a stable WaitlistRecord.
 * - No `any`
 * - Defensive parsing
 * - Rejects missing/invalid email
 */
export function normalizeRecord(x: unknown): WaitlistRecord | null {
  if (!isRecord(x)) return null;

  const email = cleanEmail(x.email);
  if (!email) return null;

  const createdAt =
    asString(x.createdAt) ??
    asString(x.ts) ??
    undefined;

  return {
    id: asString(x.id),
    createdAt,
    updatedAt: asString(x.updatedAt),

    source: asString(x.source),
    intent: asString(x.intent),

    email,
    fullName: asString(x.fullName),
    company: asString(x.company),
    role: asString(x.role),
    location: asString(x.location),
    module: asString(x.module),
    volume: asString(x.volume),
    notes: asString(x.notes),

    reviewedAt: asString(x.reviewedAt),
    reviewedBy: asString(x.reviewedBy),
    reviewNote: asString(x.reviewNote),
    lastContactedAt: asString(x.lastContactedAt),

    ts: asString(x.ts),
  };
}

export function scoreRecord(r: WaitlistRecord): number {
  let s = 0;

  // Intent
  if (r.intent === "verification-pack") s += 50;
  if (r.intent === "early-access") s += 30;

  // Role
  if (r.role === "auditor") s += 35;
  if (r.role === "enterprise") s += 30;
  if (r.role === "isp") s += 20;
  if (r.role === "partner") s += 10;

  // Completeness
  if (r.company) s += 10;
  if (r.fullName) s += 8;
  if (r.location) s += 6;
  if (r.module) s += 8;
  if (r.volume) s += 4;

  // Notes
  const n = (r.notes || "").trim();
  if (n.length >= 40) s += 6;
  if (n.length >= 140) s += 6;

  // Trust source nudge
  if (r.source === "trust") s += 10;

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
    return "Orbitlink — Verification Pack (Request Received)";
  }
  return "Orbitlink — Intake Request (Next Window)";
}

export function makeReplyTemplate(r: WaitlistRecord) {
  const lines: string[] = [];

  if (r.intent === "verification-pack") {
    lines.push("Thanks — request received.");
    lines.push("We’ll reply when your request matches an active review window.");
    lines.push("");
    lines.push("To prepare the scope-appropriate pack, please confirm:");
    lines.push("• Module (if applicable): " + (r.module || "—"));
    lines.push("• Location: " + (r.location || "—"));
    lines.push(
      "• Review audience (auditor / internal / regulator): " + (r.role || "—")
    );
    lines.push("");
    lines.push(
      "We keep sensitive operational details request-only and provide redacted samples where appropriate."
    );
  } else {
    lines.push("Thanks — intake request received.");
    lines.push("We’ll reply when your profile fits the next onboarding window.");
    lines.push("");
    lines.push("Captured details:");
    lines.push("• Module: " + (r.module || "—"));
    lines.push("• Location: " + (r.location || "—"));
    lines.push("• Company: " + (r.company || "—"));
    if (r.notes) {
      lines.push("");
      lines.push("Notes:");
      lines.push(r.notes.trim());
    }
    lines.push("");
    lines.push("Orbitlink intake is controlled: one response, no marketing noise.");
  }

  return lines.join("\n");
}