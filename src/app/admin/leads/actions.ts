"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getSupabaseAdmin } from "@/lib/supabase";

function clean(value: FormDataEntryValue | null, max = 2000) {
  const s = typeof value === "string" ? value.trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

function parseIds(formData: FormData) {
  return formData
    .getAll("ids")
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean);
}

function getRequiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getAdminAllowlist() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
}

async function assertAdminAccess() {
  const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() {},
      remove() {},
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    throw new Error("Unauthorized.");
  }

  const allowlist = getAdminAllowlist();
  if (allowlist.length === 0) {
    throw new Error("Missing admin allowlist. Set ADMIN_EMAILS.");
  }

  const email = user.email.toLowerCase();
  if (!allowlist.includes(email)) {
    throw new Error("Forbidden.");
  }

  return { email };
}

async function updateLead(
  id: string,
  patch: Record<string, unknown>,
  revalidateId?: string
) {
  await assertAdminAccess();

  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("intake_submissions")
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update lead: ${error.message}`);
  }

  revalidatePath("/admin/leads");
  if (revalidateId) {
    revalidatePath(`/admin/leads/${revalidateId}`);
  }
}

async function updateMany(ids: string[], patch: Record<string, unknown>) {
  await assertAdminAccess();

  if (ids.length === 0) {
    throw new Error("No leads selected.");
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("intake_submissions")
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .in("id", ids);

  if (error) {
    throw new Error(`Failed to update selected leads: ${error.message}`);
  }

  revalidatePath("/admin/leads");
  for (const id of ids) {
    revalidatePath(`/admin/leads/${id}`);
  }
}

export async function markLeadReviewed(formData: FormData) {
  const { email } = await assertAdminAccess();

  const id = clean(formData.get("id"), 120);
  const reviewedBy = clean(formData.get("reviewedBy"), 160) || email;
  const reviewNote = clean(formData.get("reviewNote"), 2000);

  if (!id) {
    throw new Error("Missing lead id.");
  }

  await updateLead(
    id,
    {
      review_status: "reviewed",
      reviewed_at: new Date().toISOString(),
      reviewed_by: reviewedBy,
      review_note: reviewNote || null,
    },
    id
  );
}

export async function updateLeadInternalNote(formData: FormData) {
  await assertAdminAccess();

  const id = clean(formData.get("id"), 120);
  const reviewNote = clean(formData.get("reviewNote"), 2000);

  if (!id) {
    throw new Error("Missing lead id.");
  }

  await updateLead(
    id,
    {
      review_note: reviewNote || null,
    },
    id
  );
}

export async function markLeadContacted(formData: FormData) {
  await assertAdminAccess();

  const id = clean(formData.get("id"), 120);
  const reviewNote = clean(formData.get("reviewNote"), 2000);

  if (!id) {
    throw new Error("Missing lead id.");
  }

  const patch: Record<string, unknown> = {
    last_contacted_at: new Date().toISOString(),
  };

  if (reviewNote) {
    patch.review_note = reviewNote;
  }

  await updateLead(id, patch, id);
}

export async function archiveLead(formData: FormData) {
  const { email } = await assertAdminAccess();

  const id = clean(formData.get("id"), 120);
  const reviewNote = clean(formData.get("reviewNote"), 2000);

  if (!id) {
    throw new Error("Missing lead id.");
  }

  await updateLead(
    id,
    {
      review_status: "archived",
      reviewed_at: new Date().toISOString(),
      reviewed_by: email,
      review_note: reviewNote || null,
    },
    id
  );
}

export async function bulkMarkReviewed(formData: FormData) {
  const { email } = await assertAdminAccess();

  const ids = parseIds(formData);
  const reviewedBy = clean(formData.get("reviewedBy"), 160) || email;
  const reviewNote = clean(formData.get("reviewNote"), 2000);

  await updateMany(ids, {
    review_status: "reviewed",
    reviewed_at: new Date().toISOString(),
    reviewed_by: reviewedBy,
    review_note: reviewNote || null,
  });
}

export async function bulkArchiveLeads(formData: FormData) {
  const { email } = await assertAdminAccess();

  const ids = parseIds(formData);
  const reviewNote = clean(formData.get("reviewNote"), 2000);

  await updateMany(ids, {
    review_status: "archived",
    reviewed_at: new Date().toISOString(),
    reviewed_by: email,
    review_note: reviewNote || null,
  });
}