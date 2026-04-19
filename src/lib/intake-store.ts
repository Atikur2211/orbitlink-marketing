import crypto from "crypto";

import { getSupabaseAdmin } from "@/lib/supabase";
import type { Submission } from "@/app/api/waitlist/route";

function nowIso() {
  return new Date().toISOString();
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function normalizeReviewStatus(
  value: unknown
): Submission["reviewStatus"] | undefined {
  return value === "new" || value === "reviewed" || value === "archived"
    ? value
    : undefined;
}

function normalizeRow(row: Record<string, unknown>): Submission {
  return {
    id: String(row.id ?? ""),
    type: (row.type as Submission["type"]) ?? "lead",

    createdAt: asString(row.created_at),
    updatedAt: asString(row.updated_at),
    lastNotifiedAt: asString(row.last_notified_at),
    lastContactedAt: asString(row.last_contacted_at),

    source: row.source as Submission["source"],
    intent: row.intent as Submission["intent"],
    lastSource: row.last_source as Submission["lastSource"],
    lastIntent: row.last_intent as Submission["lastIntent"],

    email: String(row.email ?? ""),
    fullName: asString(row.full_name),
    company: asString(row.company),
    role: asString(row.role),

    location: asString(row.location),
    module: asString(row.module),
    sites: asString(row.sites),
    timeline: asString(row.timeline),
    notes: asString(row.notes),

    userAgent: asString(row.user_agent),
    ip: asString(row.ip),

    reviewStatus: normalizeReviewStatus(row.review_status),
    reviewedAt: asString(row.reviewed_at),
    reviewedBy: asString(row.reviewed_by),
    reviewNote: asString(row.review_note),

    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
  };
}

function toRow(sub: Submission) {
  return {
    id: sub.id || crypto.randomBytes(8).toString("hex"),
    type: sub.type ?? "lead",

    created_at: sub.createdAt ?? nowIso(),
    updated_at: sub.updatedAt ?? nowIso(),
    last_notified_at: sub.lastNotifiedAt || null,
    last_contacted_at: sub.lastContactedAt || null,

    source: sub.source || null,
    intent: sub.intent || null,
    last_source: sub.lastSource || null,
    last_intent: sub.lastIntent || null,

    email: sub.email,
    full_name: sub.fullName || null,
    company: sub.company || null,
    role: sub.role || null,

    location: sub.location || null,
    module: sub.module || null,
    sites: sub.sites || null,
    timeline: sub.timeline || null,
    notes: sub.notes || null,

    user_agent: sub.userAgent || null,
    ip: sub.ip || null,

    review_status: sub.reviewStatus || "new",
    reviewed_at: sub.reviewedAt || null,
    reviewed_by: sub.reviewedBy || null,
    review_note: sub.reviewNote || null,

    tags: sub.tags ?? [],
  };
}

export async function findMatchingSubmission(args: {
  email: string;
  intent?: string;
  module?: string;
}) {
  const supabase = getSupabaseAdmin();

  const query = supabase
    .from("intake_submissions")
    .select("*")
    .ilike("email", args.email)
    .limit(20);

  const { data, error } = await query;
  if (error) throw error;

  const rows = (data ?? []).map((x) => normalizeRow(x as Record<string, unknown>));

  return (
    rows.find((x) => {
      const sameEmail = x.email.toLowerCase() === args.email.toLowerCase();
      if (!sameEmail) return false;

      const aIntent = x.intent ?? "";
      const bIntent = args.intent ?? "";
      const aModule = x.module ?? "";
      const bModule = args.module ?? "";

      if (bIntent && bModule) return aIntent === bIntent && aModule === bModule;
      if (bIntent) return aIntent === bIntent;
      if (bModule) return aModule === bModule;

      return true;
    }) ?? null
  );
}

export async function upsertSubmission(sub: Submission) {
  const supabase = getSupabaseAdmin();
  const row = toRow(sub);

  const { data, error } = await supabase
    .from("intake_submissions")
    .upsert(row)
    .select()
    .single();

  if (error) throw error;

  return normalizeRow(data as Record<string, unknown>);
}