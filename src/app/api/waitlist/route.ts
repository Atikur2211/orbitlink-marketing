// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "edge";

type Intent = "early-access" | "verification-pack";
type Source = "coming-soon" | "trust" | "solutions" | "other";

type Submission = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  
  reviewedAt?: string;     // ISO timestamp when reviewed
  reviewedBy?: string;     // optional (ops user/email)
  reviewNote?: string;     // optional short note

  // Funnel
  source: Source;
  intent?: Intent;

  // Contact
  email: string;
  fullName?: string;
  company?: string;
  role?: string;

  // Fit
  location?: string;
  module?: string;
  volume?: string;
  notes?: string;

  // Light telemetry (optional)
  userAgent?: string;
  ip?: string;

  // Optional: helps ops see latest touchpoint without overwriting original source
  lastSource?: Source;
  lastIntent?: Intent;
};

const WAITLIST_FILE = "waitlist.json";
const LOCK_FILE = "waitlist.lock";

function clean(v: unknown, max = 240) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function isValidEmail(email: string) {
  // pragmatic validation (not perfect, but safe)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeIntent(v: string): Intent | undefined {
  const x = v.toLowerCase();
  if (x === "early-access") return "early-access";
  if (x === "verification-pack") return "verification-pack";
  return undefined;
}

function normalizeSource(v: string): Source {
  const x = v.toLowerCase();
  if (x === "coming-soon") return "coming-soon";
  if (x === "trust") return "trust";
  if (x === "solutions") return "solutions";
  return "other";
}

function safeReturnTo(v: string): string {
  // prevent open redirects. Allow only local paths.
  const s = v.trim();
  if (!s) return "/coming-soon";
  if (!s.startsWith("/")) return "/coming-soon";
  if (s.startsWith("//")) return "/coming-soon";
  return s;
}

async function readList(filePath: string): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return [];
  }
}

async function writeListAtomic(filePath: string, data: Submission[]) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

/**
 * Simple lock file to avoid concurrent writes (race condition)
 * Works well for a single node process. If you later scale horizontally,
 * you’ll move waitlist storage to DB/kv.
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
      if (Date.now() - start > timeoutMs) break; // fail open (still works, just less safe)
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

export async function POST(req: Request) {
  const headers = new Headers(req.headers);
  const userAgent = headers.get("user-agent") ?? "";
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "";

  try {
    const form = await req.formData();

    // Honeypot (bots fill hidden fields)
    const honeypot = clean(form.get("company_website"), 120);
    if (honeypot) {
      // pretend success (no signal to bot)
      return NextResponse.redirect(new URL("/coming-soon?ok=1", req.url), 303);
    }

    const email = clean(form.get("email"), 180).toLowerCase();
    const returnTo = safeReturnTo(clean(form.get("returnTo"), 120) || "/coming-soon");

    if (!isValidEmail(email)) {
      return NextResponse.redirect(new URL(`${returnTo}?error=invalid`, req.url), 303);
    }

    // Funnel
    const source = normalizeSource(clean(form.get("source") || "coming-soon", 80));
    const intent = normalizeIntent(clean(form.get("intent") || "", 80));

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

    await withFileLock(lockPath, async () => {
      const list = await readList(filePath);

      // Premium dedupe key:
      // 1) email + intent + module (best)
      // 2) email + intent
      // 3) email + module
      // 4) email
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

          // Keep earliest source/intent, but track latest touchpoint too
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

        const next = list.slice();
        next.splice(matchIndex, 1);
        next.unshift(updated);

        await writeListAtomic(filePath, next);
        return;
      }

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
      };

      await writeListAtomic(filePath, [submission, ...list]);
    });

    return NextResponse.redirect(new URL(`${safeReturnTo(clean(form.get("returnTo"), 120) || returnTo)}?ok=1`, req.url), 303);
  } catch {
    // fail safely
    return NextResponse.redirect(new URL("/coming-soon?error=server", req.url), 303);
  }
}
