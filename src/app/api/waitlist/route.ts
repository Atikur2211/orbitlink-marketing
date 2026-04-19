import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

import { SERVICE_CATALOG } from "@/lib/siteStatus";
import { findMatchingSubmission, upsertSubmission } from "@/lib/intake-store";

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

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

function buildSuccessRedirect(reqUrl: string) {
  return new URL("/contact/thank-you", reqUrl);
}

function buildRedirect(reqUrl: string, path: string, params: Record<string, string>) {
  const url = new URL(path, reqUrl);
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

  return raw;
}

function formatModuleLabel(moduleName?: string) {
  if (!moduleName) return "N/A";

  const lowered = moduleName.toLowerCase();
  const match = SERVICE_CATALOG.find(
    (service) =>
      service.name.toLowerCase() === lowered ||
      service.publicLabel.toLowerCase() === lowered
  );

  return match?.publicLabel || moduleName;
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

  return "ontario";
}

function slugifyTag(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildTags(args: {
  source: Source;
  intent?: Intent;
  moduleName?: string;
  location?: string;
}) {
  const { source, intent, moduleName, location } = args;

  return Array.from(
    new Set(
      [
        "lead",
        source,
        intent || "general",
        moduleName ? slugifyTag(moduleName) : "general",
        deriveRegionTag(location),
      ].filter(Boolean)
    )
  );
}

async function notifyOps(sub: Submission, isUpdate: boolean) {
  if (!resend) return;

  const to = process.env.INTAKE_TO_EMAIL || "sales@orbitlink.ca";
  const from = process.env.INTAKE_FROM_EMAIL || "Orbitlink <onboarding@resend.dev>";
  const cc = process.env.INTAKE_CC_EMAIL || "concierge@orbitlink.ca";

  const subject = isUpdate
    ? `Orbitlink Lead Update — ${sub.company || sub.email} — ${formatModuleLabel(sub.module)}`
    : `Orbitlink New Lead — ${sub.company || sub.email} — ${formatModuleLabel(sub.module)}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;">
      <h2>${escapeHtml(isUpdate ? "Orbitlink Lead Update" : "Orbitlink New Lead")}</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:6px 10px;color:#666;">Name</td><td style="padding:6px 10px;">${escapeHtml(sub.fullName || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Email</td><td style="padding:6px 10px;">${escapeHtml(sub.email)}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Company</td><td style="padding:6px 10px;">${escapeHtml(sub.company || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Address</td><td style="padding:6px 10px;">${escapeHtml(sub.location || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Service</td><td style="padding:6px 10px;">${escapeHtml(formatModuleLabel(sub.module))}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Timeline</td><td style="padding:6px 10px;">${escapeHtml(sub.timeline || "N/A")}</td></tr>
        <tr><td style="padding:6px 10px;color:#666;">Sites</td><td style="padding:6px 10px;">${escapeHtml(sub.sites || "N/A")}</td></tr>
      </table>

      <h3 style="margin-top:18px;">Project Details</h3>
      <div style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:10px;">
        ${escapeHtml(sub.notes || "(none)")}
      </div>
    </div>
  `;

  const text = [
    isUpdate ? "Orbitlink Lead Update" : "Orbitlink New Lead",
    `Name: ${sub.fullName || "N/A"}`,
    `Email: ${sub.email}`,
    `Company: ${sub.company || "N/A"}`,
    `Address: ${sub.location || "N/A"}`,
    `Service: ${formatModuleLabel(sub.module)}`,
    `Timeline: ${sub.timeline || "N/A"}`,
    `Sites: ${sub.sites || "N/A"}`,
    "",
    "Project Details:",
    sub.notes || "(none)",
  ].join("\n");

  await resend.emails.send({
    to,
    cc,
    from,
    subject,
    html,
    text,
    replyTo: sub.email,
  });
}

async function sendUserConfirmation(sub: Submission) {
  if (!resend || !sub.email) return;

  const from = process.env.INTAKE_FROM_EMAIL || "Orbitlink <onboarding@resend.dev>";
  const subject = "Orbitlink request received — next step";

  const greeting = sub.fullName ? `Hi ${sub.fullName},` : "Hi,";

  const text = [
    greeting,
    "",
    "Thank you for contacting Orbitlink.",
    "",
    "We’ve received your request and will review the address, service need, and business context before replying with the next recommended step.",
    "",
    `Service requested: ${formatModuleLabel(sub.module)}`,
    `Address: ${sub.location || "N/A"}`,
    "",
    "Typical response time is within 1 business day.",
    "",
    "If your request is time-sensitive, call 1-888-867-2480.",
    "",
    "Best regards,",
    "Orbitlink",
    "Business Connectivity",
    "concierge@orbitlink.ca",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;">
      <p>${escapeHtml(greeting)}</p>
      <p>Thank you for contacting Orbitlink.</p>
      <p>
        We’ve received your request and will review the address, service need, and business context
        before replying with the next recommended step.
      </p>
      <p>
        <strong>Service requested:</strong> ${escapeHtml(formatModuleLabel(sub.module))}<br />
        <strong>Address:</strong> ${escapeHtml(sub.location || "N/A")}
      </p>
      <p>Typical response time is within 1 business day.</p>
      <p>If your request is time-sensitive, call <a href="tel:+18888672480">1-888-867-2480</a>.</p>
      <p>
        Best regards,<br />
        Orbitlink<br />
        Business Connectivity<br />
        <a href="mailto:concierge@orbitlink.ca">concierge@orbitlink.ca</a>
      </p>
    </div>
  `;

  await resend.emails.send({
    to: sub.email,
    from,
    subject,
    text,
    html,
    replyTo: "concierge@orbitlink.ca",
  });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const honeypot = clean(form.get("company_website"), 120);
    if (honeypot) {
      return NextResponse.redirect(buildSuccessRedirect(req.url), 303);
    }

    const email = clean(form.get("email"), 180).toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.redirect(
        buildRedirect(req.url, "/contact", { error: "invalid" }),
        303
      );
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

    if (!fullName || !company || !location || !moduleName) {
      return NextResponse.redirect(
        buildRedirect(req.url, "/contact", { error: "missing_fields" }),
        303
      );
    }

    const headers = new Headers(req.headers);
    const userAgent = headers.get("user-agent") ?? "";
    const ip =
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headers.get("x-real-ip") ??
      "";

    const now = new Date().toISOString();
    const existing = await findMatchingSubmission({
      email,
      intent,
      module: moduleName,
    });

    const submission: Submission = existing
      ? {
          ...existing,
          updatedAt: now,
          lastSource: source,
          lastIntent: intent,
          fullName: fullName ?? existing.fullName,
          company: company ?? existing.company,
          role: role ?? existing.role,
          location: location ?? existing.location,
          module: moduleName ?? existing.module,
          timeline: timeline ?? existing.timeline,
          sites: sites ?? existing.sites,
          notes: notes ?? existing.notes,
          userAgent: existing.userAgent || userAgent || undefined,
          ip: existing.ip || ip || undefined,
        }
      : {
          id: crypto.randomBytes(8).toString("hex"),
          type: "lead",
          createdAt: now,
          updatedAt: now,
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
          tags: buildTags({
            source,
            intent,
            moduleName,
            location,
          }),
        };

    const saved = await upsertSubmission(submission);

    await Promise.allSettled([
      notifyOps(saved, Boolean(existing)),
      !existing ? sendUserConfirmation(saved) : Promise.resolve(),
    ]);

    return NextResponse.redirect(buildSuccessRedirect(req.url), 303);
  } catch (error) {
    console.error("waitlist POST error", error);
    return NextResponse.redirect(
      buildRedirect(req.url, "/contact", { error: "server" }),
      303
    );
  }
}