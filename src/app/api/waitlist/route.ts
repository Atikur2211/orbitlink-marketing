// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

import { SERVICE_CATALOG } from "@/lib/siteStatus";

export const runtime = "nodejs";

type Intent =
  | "early-access"
  | "verification-pack"
  | "onboarding"
  | "availability_pricing"
  | "sales"
  | "future-careers-pipeline";

type Source =
  | "coming-soon"
  | "trust"
  | "solutions"
  | "contact"
  | "careers"
  | "other";

type SubmissionType = "lead" | "careers_pipeline";
type ReviewStatus = "new" | "reviewed" | "archived";

export type Submission = {
  id: string;

  type?: SubmissionType;

  createdAt?: string;
  ts?: string;
  updatedAt?: string;
  lastNotifiedAt?: string;
  lastContactedAt?: string;

  source?: Source;
  intent?: Intent;
  lastSource?: Source;
  lastIntent?: Intent;

  email: string;
  fullName?: string;
  company?: string;
  role?: string;

  location?: string;
  module?: string;
  sites?: string;
  timeline?: string;
  notes?: string;

  userAgent?: string;
  ip?: string;

  reviewStatus?: ReviewStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;

  tags?: string[];
};

type Store = {
  value: Submission[];
  Count: number;
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const INTAKE_STORE_LOCAL =
  (process.env.INTAKE_STORE_LOCAL || "false").toLowerCase() === "true";

const WAITLIST_FILE = process.env.WAITLIST_FILE || "waitlist.json";
const LOCK_FILE = process.env.WAITLIST_LOCK_FILE || "waitlist.lock";

const RATE_LIMIT_MIN = clampInt(process.env.INTAKE_RATE_LIMIT_MINUTES, 10, 0, 120);

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
  if (x === "availability_pricing") return "availability_pricing";
  if (x === "sales") return "sales";
  if (x === "future-careers-pipeline") return "future-careers-pipeline";
  return undefined;
}

function normalizeSource(v: string): Source {
  const x = v.toLowerCase();
  if (x === "coming-soon") return "coming-soon";
  if (x === "trust") return "trust";
  if (x === "solutions") return "solutions";
  if (x === "contact") return "contact";
  if (x === "careers") return "careers";
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
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
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

function formatIntentLabel(intent?: Intent) {
  switch (intent) {
    case "availability_pricing":
      return "Availability & Pricing";
    case "sales":
      return "Sales";
    case "onboarding":
      return "Onboarding";
    case "verification-pack":
      return "Verification Pack";
    case "early-access":
      return "Early Access";
    case "future-careers-pipeline":
      return "Future Careers Pipeline";
    default:
      return "N/A";
  }
}

function formatScopeLabel(sites?: string) {
  switch (sites) {
    case "1":
      return "1 site";
    case "2_5":
      return "2–5 sites";
    case "6_20":
      return "6–20 sites";
    case "20_plus":
      return "20+ sites";
    default:
      return sites || "N/A";
  }
}

function formatTimelineLabel(timeline?: string) {
  switch (timeline) {
    case "asap":
      return "As soon as possible";
    case "within_30_days":
    case "30_days":
      return "Within 30 days";
    case "within_60_90_days":
    case "60_90_days":
      return "Within 60–90 days";
    case "planning_stage":
    case "planning":
      return "Planning stage";
    case "not_sure":
      return "Not sure yet";
    default:
      return timeline || "N/A";
  }
}

function normalizeModuleName(input?: string, intent?: Intent): string | undefined {
  if (!input) return undefined;

  const raw = input.trim();
  if (!raw) return undefined;

  if (intent === "future-careers-pipeline") return raw;

  const lowered = raw.toLowerCase();

  for (const service of SERVICE_CATALOG) {
    if (service.name.toLowerCase() === lowered) return service.name;
    if (service.publicLabel.toLowerCase() === lowered) return service.name;
  }

  const labelMap: Record<string, string> = {
    "business fibre internet": "AUREX Internet",
    "business fiber internet": "AUREX Internet",
    "dedicated internet access": "AUREX Internet",
    "managed wi-fi & lan": "AUREX Internet",
    "managed wifi & lan": "AUREX Internet",
    "managed lan/wifi": "AUREX Internet",
    "managed lan wifi": "AUREX Internet",
    "business voice": "AUREX Voice",
    "backup connectivity": "AUREX Internet",
    "lte / 5g continuity": "AUREX Internet",
    "lte/5g continuity": "AUREX Internet",
    "iot connectivity": "AUREX Smart",
    "compliance automation": "TIRAV Horizon"
  };

  return labelMap[lowered] ?? raw;
}

function formatModuleLabel(moduleName?: string, intent?: Intent) {
  if (!moduleName) return "N/A";
  if (intent === "future-careers-pipeline") return moduleName;

  const lowered = moduleName.toLowerCase();
  const match = SERVICE_CATALOG.find(
    (service) =>
      service.name.toLowerCase() === lowered || service.publicLabel.toLowerCase() === lowered
  );

  return match?.publicLabel || moduleName;
}

function slugifyTag(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function deriveRegionTag(location?: string) {
  if (!location) return "ontario";
  const x = location.toLowerCase();

  if (x.includes("mississauga")) return "mississauga";
  if (x.includes("toronto")) return "toronto";
  if (x.includes("brampton")) return "brampton";
  if (x.includes("markham")) return "markham";
  if (x.includes("vaughan")) return "vaughan";
  if (x.includes("oakville")) return "oakville";
  if (x.includes("ottawa")) return "ottawa";
  if (x.includes("hamilton")) return "hamilton";
  if (x.includes("ontario")) return "ontario";
  if (x.includes("canada")) return "canada";

  return "ontario";
}

function buildTags(args: {
  careers: boolean;
  source: Source;
  intent?: Intent;
  moduleName?: string;
  location?: string;
}) {
  const { careers, source, intent, moduleName, location } = args;

  const tags = careers
    ? [
        "careers",
        "pipeline",
        moduleName ? slugifyTag(moduleName) : "general"
      ]
    : [
        "lead",
        source,
        intent || "general",
        moduleName ? slugifyTag(moduleName) : "general",
        deriveRegionTag(location)
      ];

  return Array.from(new Set(tags.filter(Boolean)));
}

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
        Count: Number(parsed.Count ?? parsed.value.length)
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

function isCareersPipeline(sub: Submission) {
  return sub.source === "careers" && sub.intent === "future-careers-pipeline";
}

async function notifyOps(sub: Submission, isUpdate: boolean) {
  if (!resend) return;

  const to = process.env.INTAKE_TO_EMAIL || "concierge@orbitlink.ca";
  const from = process.env.INTAKE_FROM_EMAIL || "Orbitlink <onboarding@resend.dev>";

  const careers = isCareersPipeline(sub);
  const companyOrEmail = sub.company || sub.email;
  const moduleOrFallback = formatModuleLabel(sub.module, sub.intent);

  const subject = careers
    ? isUpdate
      ? `Orbitlink Careers Pipeline Update — ${sub.fullName || companyOrEmail}`
      : `Orbitlink Careers Pipeline — ${sub.fullName || companyOrEmail}`
    : isUpdate
      ? `Orbitlink Lead Update — ${companyOrEmail} — ${moduleOrFallback}`
      : `Orbitlink New Lead — ${companyOrEmail} — ${moduleOrFallback}`;

  const when = sub.createdAt || sub.ts || new Date().toISOString();

  const text = careers
    ? [
        isUpdate ? "Orbitlink Careers Pipeline Update" : "Orbitlink Careers Pipeline",
        "—",
        `Name: ${sub.fullName || "N/A"}`,
        `Email: ${sub.email}`,
        `Background / Company: ${sub.company || "N/A"}`,
        `Role: ${sub.role || "N/A"}`,
        `Area of Interest: ${formatModuleLabel(sub.module, sub.intent)}`,
        `Source: ${sub.lastSource || sub.source || "N/A"}`,
        `Intent: ${formatIntentLabel(sub.lastIntent || sub.intent)}`,
        `When: ${when}`,
        "",
        "Notes:",
        sub.notes || "(none)"
      ].join("\n")
    : [
        isUpdate ? "Orbitlink Lead Update" : "Orbitlink New Lead",
        "—",
        `Name: ${sub.fullName || "N/A"}`,
        `Email: ${sub.email}`,
        `Company: ${sub.company || "N/A"}`,
        `Role: ${sub.role || "N/A"}`,
        `Service Address: ${sub.location || "N/A"}`,
        `Service Needed: ${formatModuleLabel(sub.module, sub.intent)}`,
        `Timeline: ${formatTimelineLabel(sub.timeline)}`,
        `Number of Sites: ${formatScopeLabel(sub.sites)}`,
        `Source: ${sub.lastSource || sub.source || "N/A"}`,
        `Intent: ${formatIntentLabel(sub.lastIntent || sub.intent)}`,
        `When: ${when}`,
        "",
        "Project Details:",
        sub.notes || "(none)"
      ].join("\n");

  const html = careers
    ? `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5; color:#111;">
        <h2 style="margin:0 0 12px;">${escapeHtml(
          isUpdate ? "Orbitlink Careers Pipeline Update" : "Orbitlink Careers Pipeline"
        )}</h2>

        <table style="border-collapse:collapse;">
          <tr><td style="padding:6px 10px;color:#666;">Name</td><td style="padding:6px 10px;">${escapeHtml(sub.fullName || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Email</td><td style="padding:6px 10px;">${escapeHtml(sub.email)}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Background / Company</td><td style="padding:6px 10px;">${escapeHtml(sub.company || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Role</td><td style="padding:6px 10px;">${escapeHtml(sub.role || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Area of Interest</td><td style="padding:6px 10px;">${escapeHtml(formatModuleLabel(sub.module, sub.intent))}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Source</td><td style="padding:6px 10px;">${escapeHtml(sub.lastSource || sub.source || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Intent</td><td style="padding:6px 10px;">${escapeHtml(formatIntentLabel(sub.lastIntent || sub.intent))}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">When</td><td style="padding:6px 10px;">${escapeHtml(when)}</td></tr>
        </table>

        <h3 style="margin:18px 0 8px;">Notes</h3>
        <div style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:10px;">${escapeHtml(
          sub.notes || "(none)"
        )}</div>
      </div>
    `
    : `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5; color:#111;">
        <h2 style="margin:0 0 12px;">${escapeHtml(
          isUpdate ? "Orbitlink Lead Update" : "Orbitlink New Lead"
        )}</h2>

        <table style="border-collapse:collapse;">
          <tr><td style="padding:6px 10px;color:#666;">Name</td><td style="padding:6px 10px;">${escapeHtml(sub.fullName || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Email</td><td style="padding:6px 10px;">${escapeHtml(sub.email)}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Company</td><td style="padding:6px 10px;">${escapeHtml(sub.company || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Role</td><td style="padding:6px 10px;">${escapeHtml(sub.role || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Service Address</td><td style="padding:6px 10px;">${escapeHtml(sub.location || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Service Needed</td><td style="padding:6px 10px;">${escapeHtml(formatModuleLabel(sub.module, sub.intent))}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Timeline</td><td style="padding:6px 10px;">${escapeHtml(formatTimelineLabel(sub.timeline))}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Number of Sites</td><td style="padding:6px 10px;">${escapeHtml(formatScopeLabel(sub.sites))}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Source</td><td style="padding:6px 10px;">${escapeHtml(sub.lastSource || sub.source || "N/A")}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">Intent</td><td style="padding:6px 10px;">${escapeHtml(formatIntentLabel(sub.lastIntent || sub.intent))}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;">When</td><td style="padding:6px 10px;">${escapeHtml(when)}</td></tr>
        </table>

        <h3 style="margin:18px 0 8px;">Project Details</h3>
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
    replyTo: sub.email
  });
}

export async function POST(req: Request) {
  const headers = new Headers(req.headers);
  const userAgent = headers.get("user-agent") ?? "";
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "";

  let notifySub: Submission | null = null;
  let notifyIsUpdate = false;

  try {
    const form = await req.formData();

    const honeypot = clean(form.get("company_website"), 120);
    if (honeypot) {
      return NextResponse.redirect(buildRedirect(req.url, "/contact", { ok: "1" }), 303);
    }

    const email = clean(form.get("email"), 180).toLowerCase();
    const returnTo = clean(form.get("returnTo"), 180) || "/contact";

    if (!isValidEmail(email)) {
      return NextResponse.redirect(buildRedirect(req.url, returnTo, { error: "invalid" }), 303);
    }

    const source = normalizeSource(clean(form.get("source") || "contact", 80));
    const intent = normalizeIntent(clean(form.get("intent") || "availability_pricing", 80));

    const fullName = clean(form.get("fullName"), 120) || undefined;
    const company = clean(form.get("company"), 160) || undefined;
    const role = clean(form.get("role"), 80) || undefined;
    const location = clean(form.get("location"), 180) || undefined;
    const moduleName = normalizeModuleName(clean(form.get("module"), 120) || undefined, intent);
    const timeline = clean(form.get("timeline"), 80) || undefined;
    const sites = clean(form.get("sites"), 80) || undefined;
    const notes = clean(form.get("notes"), 1200) || undefined;

    const now = new Date().toISOString();
    const careers = source === "careers" && intent === "future-careers-pipeline";
    const tags = buildTags({
      careers,
      source,
      intent,
      moduleName,
      location
    });

    const draft: Submission = {
      id: crypto.randomBytes(8).toString("hex"),
      type: careers ? "careers_pipeline" : "lead",
      createdAt: now,
      updatedAt: now,
      lastNotifiedAt: "",
      lastContactedAt: "",
      source,
      intent,
      lastSource: source,
      lastIntent: intent,
      email,
      fullName,
      company,
      role,
      location,
      module: moduleName,
      timeline,
      sites,
      notes,
      userAgent: userAgent || undefined,
      ip: ip || undefined,
      reviewStatus: "new",
      reviewedAt: "",
      reviewedBy: "",
      reviewNote: "",
      tags
    };

    if (!INTAKE_STORE_LOCAL) {
      notifySub = { ...draft, lastNotifiedAt: now };
      notifyIsUpdate = false;

      try {
        await notifyOps(notifySub, notifyIsUpdate);
      } catch (e) {
        console.error("Intake email notify failed (prod no-store):", e);
      }

      return NextResponse.redirect(buildRedirect(req.url, returnTo, { ok: "1" }), 303);
    }

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
        const bModule = moduleName ?? "";

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
          type: prev.type || (careers ? "careers_pipeline" : "lead"),
          source: prev.source || source,
          intent: prev.intent || intent,
          lastSource: source,
          lastIntent: intent,
          fullName: fullName ?? prev.fullName,
          company: company ?? prev.company,
          role: role ?? prev.role,
          location: location ?? prev.location,
          module: moduleName ?? prev.module,
          timeline: timeline ?? prev.timeline,
          sites: sites ?? prev.sites,
          notes: notes ?? prev.notes,
          userAgent: prev.userAgent || userAgent || undefined,
          ip: prev.ip || ip || undefined,
          reviewStatus: prev.reviewStatus || "new",
          reviewedAt: prev.reviewedAt || "",
          reviewedBy: prev.reviewedBy || "",
          reviewNote: prev.reviewNote || "",
          lastContactedAt: prev.lastContactedAt || "",
          tags: prev.tags?.length ? prev.tags : tags
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