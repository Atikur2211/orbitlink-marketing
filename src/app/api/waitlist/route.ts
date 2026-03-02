// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

/**
 * ORBITLINK — INTAKE / WAITLIST (Golden-grade, production-safe)
 * - runtime=nodejs
 * - INTAKE_STORE_LOCAL=true  => write to local waitlist.json (dev only)
 * - INTAKE_STORE_LOCAL=false => no fs writes (Vercel-safe), email still sends
 * - Safe redirects (no open redirect)
 * - Dedupe + spam-guard + optional rate limit
 */
export const runtime = "nodejs";

// ---------------- types

type Intent = "early-access" | "verification-pack" | "onboarding";
type Source = "coming-soon" | "trust" | "solutions" | "contact" | "other";

export type Submission = {
  id: string;

  createdAt?: string;
  ts?: string;
  updatedAt?: string;

  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;

  source: Source;
  intent?: Intent;

  email: string;
  fullName?: string;
  company?: string;
  role?: string;

  location?: string;
  module?: string;
  volume?: string;
  notes?: string;

  userAgent?: string;
  ip?: string;

  lastSource?: Source;
  lastIntent?: Intent;

  lastNotifiedAt?: string;
};

type Store = { value: Submission[]; Count: number };

// ---------------- env

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const INTAKE_STORE_LOCAL =
  (process.env.INTAKE_STORE_LOCAL || "false").toLowerCase() === "true";

const WAITLIST_FILE = process.env.WAITLIST_FILE || "waitlist.json";
const LOCK_FILE = process.env.WAITLIST_LOCK_FILE || "waitlist.lock";

const RATE_LIMIT_MIN = clampInt(process.env.INTAKE_RATE_LIMIT_MINUTES, 10, 0, 120);

// ---------------- helpers

function clampInt(v: string | undefined, fallback: number, min: number, max: number) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

function clean(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeIntent(v: string): Intent | undefined {
  const x = v.toLowerCase();
  if (x === "early-access") return "early-access";
  if (x === "verification-pack") return "verification-pack";
  if (x === "onboarding") return "onboarding";
  return undefined;
}

function normalizeSource(v: string): Source {
  const x = v.toLowerCase();
  if (x === "coming-soon") return "coming-soon";
  if (x === "trust") return "trust";
  if (x === "solutions") return "solutions";
  if (x === "contact") return "contact";
  return "other";
}

function safeReturnTo(v: string): string {
  const s = v.trim();
  if (!s) return "/contact";
  if (!s.startsWith("/")) return "/contact";
  if (s.startsWith("//")) return "/contact";
  return s;
}

function buildRedirect(reqUrl: string, returnTo: string, params: Record<string, string>) {
  const base = safeReturnTo(returnTo);
  const url = new URL(base, reqUrl);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------------- local store (only if INTAKE_STORE_LOCAL=true)

async function readStoreLocal(filePath: string): Promise<Store> {
  const fs = await import("fs/promises");
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return { value: parsed as Submission[], Count: (parsed as Submission[]).length };
    }
    if (parsed && Array.isArray(parsed.value)) {
      return {
        value: parsed.value as Submission[],
        Count: Number(parsed.Count ?? parsed.value.length),
      };
    }
    return { value: [], Count: 0 };
  } catch {
    return { value: [], Count: 0 };
  }
}

async function writeStoreAtomicLocal(filePath: string, list: Submission[]) {
  const fs = await import("fs/promises");
  const tmp = `${filePath}.tmp`;
  const payload: Store = { value: list, Count: list.length };
  await fs.writeFile(tmp, JSON.stringify(payload, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

async function withFileLockLocal<T>(lockPath: string, fn: () => Promise<T>) {
  const fs = await import("fs/promises");
  const start = Date.now();
  const timeoutMs = 2500;

  while (true) {
    try {
      const handle = await fs.open(lockPath, "wx");
      await handle.close();
      break;
    } catch {
      if (Date.now() - start > timeoutMs) break;
      await new Promise((r) => setTimeout(r, 60));
    }
  }

  try {
    return await fn();
  } finally {
    try {
      await fs.unlink(lockPath);
    } catch {}
  }
}

// ---------------- ops notify (email)

async function notifyOps(sub: Submission, isUpdate: boolean) {
  if (!resend) return;

  const to = process.env.INTAKE_TO_EMAIL || "concierge@orbitlink.ca";
  const from = process.env.INTAKE_FROM_EMAIL || "Orbitlink <onboarding@resend.dev>";

  const subject = isUpdate
    ? `Orbitlink Intake (Update) — ${sub.company || sub.email}`
    : `Orbitlink Intake — ${sub.company || sub.email}`;

  const when = sub.createdAt || sub.ts || new Date().toISOString();

  const text = [
    "Orbitlink Intake Submission",
    "—",
    `Email: ${sub.email}`,
    `Name: ${sub.fullName || "N/A"}`,
    `Company: ${sub.company || "N/A"}`,
    `Role: ${sub.role || "N/A"}`,
    `Location: ${sub.location || "N/A"}`,
    `Module: ${sub.module || "N/A"}`,
    `Source: ${sub.lastSource || sub.source || "N/A"}`,
    `Intent: ${sub.lastIntent || sub.intent || "N/A"}`,
    `When: ${when}`,
    "",
    "Notes:",
    sub.notes || "(none)",
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5;">
      <h2 style="margin:0 0 12px;">Orbitlink Intake ${isUpdate ? "(Update)" : ""}</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:6px 10px;color:#666;">Email</td><td style="padding:6px 10px;">${escapeHtml(sub.email)}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Name</td><td style="padding:6px 10px;">${escapeHtml(sub.fullName || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Company</td><td style="padding:6px 10px;">${escapeHtml(sub.company || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Role</td><td style="padding:6px 10px;">${escapeHtml(sub.role || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Location</td><td style="padding:6px 10px;">${escapeHtml(sub.location || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Module</td><td style="padding:6px 10px;">${escapeHtml(sub.module || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Source</td><td style="padding:6px 10px;">${escapeHtml(sub.lastSource || sub.source || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Intent</td><td style="padding:6px 10px;">${escapeHtml(sub.lastIntent || sub.intent || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">When</td><td style="padding:6px 10px;">${escapeHtml(when)}</td></tr>
      </table>
      <h3 style="margin:18px 0 8px;">Notes</h3>
      <div style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:10px;">${escapeHtml(sub.notes || "(none)")}</div>
    </div>
  `;

  await resend.emails.send({
    to,
    from,
    subject,
    text,
    html,
    replyTo: sub.email,
  });
}

// ---------------- main

export async function POST(req: Request) {
  const headers = new Headers(req.headers);
  const userAgent = headers.get("user-agent") ?? "";
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "";

  // ✅ GOLDEN FIX: avoid union-object notify state (prevents TS "never")
  let notifySub: Submission | null = null;
  let notifyIsUpdate = false;

  try {
    const form = await req.formData();

    const honeypot = clean(form.get("company_website"), 120);
    if (honeypot) {
      return NextResponse.redirect(buildRedirect(req.url, "/contact", { ok: "1" }), 303);
    }

    const email = clean(form.get("email"), 180).toLowerCase();
    const returnTo = clean(form.get("returnTo"), 120) || "/contact";

    if (!isValidEmail(email)) {
      return NextResponse.redirect(buildRedirect(req.url, returnTo, { error: "invalid" }), 303);
    }

    const source = normalizeSource(clean(form.get("source") || "contact", 80));
    const intent = normalizeIntent(clean(form.get("intent") || "onboarding", 80));

    const fullName = clean(form.get("fullName"), 120) || undefined;
    const company = clean(form.get("company"), 160) || undefined;
    const role = clean(form.get("role"), 80) || undefined;
    const location = clean(form.get("location"), 120) || undefined;
    const module = clean(form.get("module"), 120) || undefined;
    const volume = clean(form.get("volume"), 120) || undefined;
    const notes = clean(form.get("notes"), 800) || undefined;

    const now = new Date().toISOString();

    const draft: Submission = {
      id: crypto.randomBytes(8).toString("hex"),
      createdAt: now,
      source,
      intent,
      lastSource: source,
      lastIntent: intent,
      email,
      fullName,
      company,
      role,
      location,
      module,
      volume,
      notes,
      userAgent: userAgent || undefined,
      ip: ip || undefined,
    };

    // PROD SAFE: no filesystem writes
    if (!INTAKE_STORE_LOCAL) {
      notifySub = { ...draft, lastNotifiedAt: now };
      notifyIsUpdate = false;

      if (notifySub) {
        try {
          await notifyOps(notifySub, notifyIsUpdate);
        } catch (e) {
          console.error("Intake email notify failed (prod no-store):", e);
        }
      }

      return NextResponse.redirect(buildRedirect(req.url, returnTo, { ok: "1" }), 303);
    }

    // DEV/LOCAL STORE PATH
    const { default: pathMod } = await import("path");
    const filePath = pathMod.join(process.cwd(), WAITLIST_FILE);
    const lockPath = pathMod.join(process.cwd(), LOCK_FILE);

    let rateLimited = false;

    await withFileLockLocal(lockPath, async () => {
      const store = await readStoreLocal(filePath);
      const list = store.value;

      if (RATE_LIMIT_MIN > 0) {
        const cutoff = Date.now() - RATE_LIMIT_MIN * 60 * 1000;
        const recent = list.find((x) => {
          const sameEmail = String(x.email || "").toLowerCase() === email;
          const sameIp = ip && x.ip && String(x.ip) === String(ip);
          if (!sameEmail && !sameIp) return false;
          const t = Date.parse(x.updatedAt || x.createdAt || x.ts || "");
          return Number.isFinite(t) && t > cutoff;
        });

        if (recent) {
          rateLimited = true;
          return;
        }
      }

      const matchIndex = list.findIndex((x) => {
        const sameEmail = String(x.email ?? "").toLowerCase() === email;
        if (!sameEmail) return false;

        const aIntent = x.intent ?? "";
        const bIntent = intent ?? "";
        const aModule = x.module ?? "";
        const bModule = module ?? "";

        if (bIntent && bModule) return aIntent === bIntent && aModule === bModule;
        if (bIntent) return aIntent === bIntent;
        if (bModule) return aModule === bModule;
        return true;
      });

      if (matchIndex >= 0) {
        const prev = list[matchIndex];

        const updated: Submission = {
          ...prev,
          updatedAt: now,
          source: prev.source || source,
          intent: prev.intent || intent,
          lastSource: source,
          lastIntent: intent,

          fullName: fullName ?? prev.fullName,
          company: company ?? prev.company,
          role: role ?? prev.role,
          location: location ?? prev.location,
          module: module ?? prev.module,
          volume: volume ?? prev.volume,
          notes: notes ?? prev.notes,

          userAgent: prev.userAgent || userAgent || undefined,
          ip: prev.ip || ip || undefined,
        };

        const lastNotify = prev.lastNotifiedAt ? Date.parse(prev.lastNotifiedAt) : 0;
        const okToNotify = !lastNotify || Date.now() - lastNotify > 10 * 60 * 1000;

        if (okToNotify) {
          updated.lastNotifiedAt = now;
          notifySub = updated;
          notifyIsUpdate = true;
        }

        const next = list.slice();
        next.splice(matchIndex, 1);
        next.unshift(updated);

        await writeStoreAtomicLocal(filePath, next);
        return;
      }

      const submission: Submission = { ...draft, lastNotifiedAt: now };
      notifySub = submission;
      notifyIsUpdate = false;

      await writeStoreAtomicLocal(filePath, [submission, ...list]);
    });

    if (rateLimited) {
      return NextResponse.redirect(buildRedirect(req.url, returnTo, { ok: "1" }), 303);
    }

    if (notifySub) {
      try {
        await notifyOps(notifySub, notifyIsUpdate);
      } catch (e) {
        console.error("Intake email notify failed:", e);
      }
    }

    return NextResponse.redirect(buildRedirect(req.url, returnTo, { ok: "1" }), 303);
  } catch (e) {
    console.error("waitlist POST error", e);
    return NextResponse.redirect(buildRedirect(req.url, "/contact", { error: "server" }), 303);
  }
}