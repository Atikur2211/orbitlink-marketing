// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { Resend } from "resend";

export const runtime = "nodejs"; // ✅ REQUIRED (fs/path + email)

/**
 * ORBITLINK — INTAKE / WAITLIST (Golden-grade)
 * - Local JSON store (dev + single node)
 * - Node runtime (Vercel serverless) for fs/path + Resend
 * - Conservative redirects (no open redirect)
 * - Deduping + spam guard + optional rate limit
 * - Email notify outside lock; storage always wins
 */

type Intent = "early-access" | "verification-pack" | "onboarding";
type Source = "coming-soon" | "trust" | "solutions" | "contact" | "other";

export type Submission = {
  id: string;

  // timestamps
  createdAt?: string; // current
  ts?: string; // legacy
  updatedAt?: string;

  // ops review
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;

  // funnel
  source: Source;
  intent?: Intent;

  // contact
  email: string;
  fullName?: string;
  company?: string;
  role?: string;

  // fit
  location?: string;
  module?: string;
  volume?: string;
  notes?: string;

  // light telemetry
  userAgent?: string;
  ip?: string;

  // latest touchpoint
  lastSource?: Source;
  lastIntent?: Intent;

  // notification guard
  lastNotifiedAt?: string;
};

type Store = { value: Submission[]; Count: number };

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// env-driven storage locations (with safe defaults)
const WAITLIST_FILE = process.env.WAITLIST_FILE || "waitlist.json";
const LOCK_FILE = process.env.WAITLIST_LOCK_FILE || "waitlist.lock";

// rate limit (minutes); default 10
const RATE_LIMIT_MIN = clampInt(process.env.INTAKE_RATE_LIMIT_MINUTES, 10, 1, 120);

// -------- helpers

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
  // allow only local paths; default to /contact
  const s = v.trim();
  if (!s) return "/contact";
  if (!s.startsWith("/")) return "/contact";
  if (s.startsWith("//")) return "/contact";
  return s;
}

function buildRedirect(reqUrl: string, returnTo: string, params: Record<string, string>) {
  const base = safeReturnTo(returnTo);
  const url = new URL(base, reqUrl);
  for (const [k, v] of Object.entries(params)) {
    if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  }
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

// -------- store (supports legacy formats)

async function readStore(filePath: string): Promise<Store> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);

    // legacy array format
    if (Array.isArray(parsed)) {
      return { value: parsed as Submission[], Count: (parsed as Submission[]).length };
    }

    // current { value, Count } format
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

async function writeStoreAtomic(filePath: string, list: Submission[]) {
  const tmp = `${filePath}.tmp`;
  const payload: Store = { value: list, Count: list.length };
  await fs.writeFile(tmp, JSON.stringify(payload, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

/**
 * Simple lock file for single process safety.
 * If you scale horizontally, move to DB/KV.
 */
async function withFileLock<T>(lockPath: string, fn: () => Promise<T>) {
  const start = Date.now();
  const timeoutMs = 2500;

  while (true) {
    try {
      const handle = await fs.open(lockPath, "wx");
      await handle.close();
      break;
    } catch {
      if (Date.now() - start > timeoutMs) break; // fail-open
      await new Promise((r) => setTimeout(r, 60));
    }
  }

  try {
    return await fn();
  } finally {
    try {
      await fs.unlink(lockPath);
    } catch {
      // ignore
    }
  }
}

// -------- ops notify (email)

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
    <div style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:10px;">${escapeHtml(
      sub.notes || "(none)"
    )}</div>
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

// -------- main handler

export async function POST(req: Request) {
  const headers = new Headers(req.headers);
  const userAgent = headers.get("user-agent") ?? "";
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "";

  try {
    const form = await req.formData();

    // Honeypot
    const honeypot = clean(form.get("company_website"), 120);
    if (honeypot) {
      const url = buildRedirect(req.url, "/contact", { ok: "1" });
      return NextResponse.redirect(url, 303);
    }

    // Inputs
    const email = clean(form.get("email"), 180).toLowerCase();
    const returnTo = clean(form.get("returnTo"), 120) || "/contact";

    if (!isValidEmail(email)) {
      const url = buildRedirect(req.url, returnTo, { error: "invalid" });
      return NextResponse.redirect(url, 303);
    }

    // Funnel
    const source = normalizeSource(clean(form.get("source") || "contact", 80));
    const intent = normalizeIntent(clean(form.get("intent") || "onboarding", 80));

    // Optional fields
    const fullName = clean(form.get("fullName"), 120) || undefined;
    const company = clean(form.get("company"), 160) || undefined;
    const role = clean(form.get("role"), 80) || undefined;
    const location = clean(form.get("location"), 120) || undefined;
    const module = clean(form.get("module"), 120) || undefined;
    const volume = clean(form.get("volume"), 120) || undefined;
    const notes = clean(form.get("notes"), 800) || undefined;

    const filePath = path.join(process.cwd(), WAITLIST_FILE);
    const lockPath = path.join(process.cwd(), LOCK_FILE);
    const now = new Date().toISOString();

    let notify: { sub: Submission; isUpdate: boolean } | null = null;

    await withFileLock(lockPath, async () => {
      const store = await readStore(filePath);
      const list = store.value;

      // -------- optional rate limit
      // Rate-limit on (email + ip) by checking latest record timestamps.
      // Conservative: only blocks if a record exists within RATE_LIMIT_MIN minutes.
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
          // store nothing new; just redirect success (quietly)
          return;
        }
      }

      // -------- dedupe match
      const matchIndex = list.findIndex((x) => {
        const sameEmail = String(x.email ?? "").toLowerCase() === email;
        if (!sameEmail) return false;

        const aIntent = x.intent ?? "";
        const bIntent = intent ?? "";
        const aModule = x.module ?? "";
        const bModule = module ?? "";

        // Most specific -> least specific
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

          // preserve earliest source/intent; track latest touchpoint
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

        // spam guard: notify if not notified within 10 minutes
        const lastNotify = prev.lastNotifiedAt ? Date.parse(prev.lastNotifiedAt) : 0;
        const okToNotify = !lastNotify || Date.now() - lastNotify > 10 * 60 * 1000;

        if (okToNotify) {
          updated.lastNotifiedAt = now;
          notify = { sub: updated, isUpdate: true };
        }

        const next = list.slice();
        next.splice(matchIndex, 1);
        next.unshift(updated);

        await writeStoreAtomic(filePath, next);
        return;
      }

      // new submission
      const submission: Submission = {
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

        lastNotifiedAt: now, // new lead should notify
      };

      notify = { sub: submission, isUpdate: false };
      await writeStoreAtomic(filePath, [submission, ...list]);
    });

    // Notify outside lock
    if (notify) {
      try {
        await notifyOps(notify.sub, notify.isUpdate);
      } catch (e) {
        console.error("Intake email notify failed:", e);
        // still succeed — stored already
      }
    }

    // ✅ clean success redirect (no duplicate ?ok=1)
    const okUrl = buildRedirect(req.url, returnTo, { ok: "1" });
    return NextResponse.redirect(okUrl, 303);
  } catch (e) {
    console.error("waitlist POST error", e);
    const errUrl = buildRedirect(req.url, "/contact", { error: "server" });
    return NextResponse.redirect(errUrl, 303);
  }
}