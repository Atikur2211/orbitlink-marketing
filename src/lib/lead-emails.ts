export type LeadRequest = {
  fullName?: string;
  email: string;
  company?: string;
  role?: string;
  location?: string;
  module?: string;
  timeline?: string;
  sites?: string;
  notes?: string;
};

const BRAND_NAME = "Orbitlink";
const BRAND_MARK = "Orbitlink™";
const SITE_URL = "https://orbitlink.ca";
const CONTACT_URL = "https://orbitlink.ca/contact";
const LOGO_URL = "https://orbitlink.ca/brand/orbitlink-email-logo.png";
const SUPPORT_PHONE = "1-888-867-2480";
const GENERAL_EMAIL = "concierge@orbitlink.ca";
const SALES_EMAIL = "concierge@orbitlink.ca";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function prettyValue(value?: string) {
  return value && value.trim() ? value.trim() : "—";
}

function prettyRole(value?: string) {
  const map: Record<string, string> = {
    business_owner: "Owner / Leadership",
    business_buyer: "Buyer / Procurement",
    it_network: "IT / Network Lead",
    operations_facilities: "Operations / Facilities",
    property_management: "Property Management",
    partner_vendor: "Partner / Vendor",
  };

  return map[value || ""] || prettyValue(value);
}

function prettyTimeline(value?: string) {
  const map: Record<string, string> = {
    asap: "As soon as possible",
    within_30_days: "Within 30 days",
    within_60_90_days: "Within 60–90 days",
    planning_stage: "Planning stage",
    not_sure: "Not sure yet",
  };

  return map[value || ""] || prettyValue(value);
}

function prettySites(value?: string) {
  const map: Record<string, string> = {
    "1": "1 site",
    "2_5": "2–5 sites",
    "6_20": "6–20 sites",
    "20_plus": "20+ sites",
  };

  return map[value || ""] || prettyValue(value);
}

function prettyService(value?: string) {
  const key = (value || "").trim().toLowerCase();

  const map: Record<string, string> = {
    "business fibre internet": "Business Fibre Internet",
    "business fiber internet": "Business Fibre Internet",
    "dedicated internet access": "Dedicated Internet Access",
    "managed wi-fi & lan": "Managed Wi-Fi & LAN",
    "managed wifi & lan": "Managed Wi-Fi & LAN",
    "managed lan/wifi": "Managed Wi-Fi & LAN",
    "managed lan wifi": "Managed Wi-Fi & LAN",
    "business voice": "Business Voice",
    "voip cloud voice": "Business Voice",
    "cloud voice": "Business Voice",
    "backup connectivity": "Backup Connectivity",
    "lte / 5g continuity": "Backup Connectivity",
    "lte/5g continuity": "Backup Connectivity",
    "lte 5g continuity": "Backup Connectivity",
    "iot connectivity": "IoT Connectivity",
    "static ip routing": "Static IP Routing",
    "colocation infrastructure": "Colocation Infrastructure",
    "starlink agent": "Starlink Agent",
  };

  return map[key] || "Service Request";
}

function detailsTable(rows: Array<[string, string]>) {
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:7px 0;color:#8ea0b8;width:165px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:7px 0;color:#e5edf7;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;">
      ${body}
    </table>
  `;
}

function signatureBlock() {
  return `
    <div style="margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:15px;line-height:1.7;color:#e5edf7;font-weight:700;">
        Orbitlink Concierge Team
      </div>
      <div style="font-size:13px;line-height:1.7;color:#d1d9e6;">
        Business Support &amp; Service Coordination
      </div>
      <div style="font-size:13px;line-height:1.7;color:#d1d9e6;">
        ${BRAND_MARK} · TIRAV Technologies Inc.
      </div>
      <div style="font-size:13px;line-height:1.7;color:#d1d9e6;">
        Support ${escapeHtml(SUPPORT_PHONE)}
      </div>
      <div style="font-size:13px;line-height:1.7;color:#d1d9e6;">
        <a href="mailto:${GENERAL_EMAIL}" style="color:#d9e5f6;text-decoration:none;">${GENERAL_EMAIL}</a>
        &nbsp; | &nbsp;
        <a href="${SITE_URL}" style="color:#d9e5f6;text-decoration:none;">orbitlink.ca</a>
      </div>
      <div style="margin-top:8px;font-size:13px;line-height:1.7;">
        <a href="${CONTACT_URL}" style="color:#f6dd8f;text-decoration:none;font-weight:600;">
          Service requests &amp; availability →
        </a>
      </div>
    </div>
  `;
}

function wrapBrandEmail(args: {
  preheader: string;
  title: string;
  intro?: string;
  bodyHtml: string;
  footerNote?: string;
}) {
  const {
    preheader,
    title,
    intro,
    bodyHtml,
    footerNote = "This communication was issued by Orbitlink™ as part of a customer order and service operations workflow. Service availability, network design, provisioning intervals, implementation requirements, and activation timelines may vary by address, building access, carrier facilities, and final qualification outcomes. All services remain subject to applicable terms, policies, and final service acceptance.",
  } = args;

  return `
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>

  <div style="margin:0;padding:0;background:#08101d;">
    <div style="max-width:680px;margin:0 auto;padding:24px 16px;">
      <div style="border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;background:#0f172a;box-shadow:0 20px 60px rgba(0,0,0,0.35);">
        
        <div style="padding:24px 28px 20px 28px;background:linear-gradient(135deg,#081b3a 0%,#0f274f 58%,#0b1e3f 100%);border-bottom:1px solid rgba(255,255,255,0.08);">
          <img
            src="${LOGO_URL}"
            width="140"
            alt="${escapeHtml(BRAND_NAME)}"
            style="display:block;margin:0 0 14px 0;border:0;outline:none;text-decoration:none;"
          />

          <div style="font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:700;line-height:1.15;color:#ffffff;">
            ${escapeHtml(title)}
          </div>

          ${
            intro
              ? `<div style="margin-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#d7e0ec;">${escapeHtml(intro)}</div>`
              : ""
          }
        </div>

        <div style="padding:28px;background:#0f172a;">
          ${bodyHtml}
        </div>

        <div style="padding:22px 28px;border-top:1px solid rgba(255,255,255,0.08);background:#0a1220;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:#7f90a6;">
            ${escapeHtml(footerNote)}
          </div>

          <div style="margin-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:#8ea0b8;">
            Terms:
            <a href="${SITE_URL}/legal/terms" style="color:#d9e5f6;text-decoration:none;">${SITE_URL}/legal/terms</a>
            &nbsp; | &nbsp;
            Privacy:
            <a href="${SITE_URL}/legal/privacy" style="color:#d9e5f6;text-decoration:none;">${SITE_URL}/legal/privacy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

export function buildCustomerConfirmationEmail(lead: LeadRequest) {
  const name = escapeHtml(lead.fullName?.trim() || "there");
  const service = prettyService(lead.module);
  const location = prettyValue(lead.location);
  const company = prettyValue(lead.company);

  const subject = `${BRAND_MARK} · Request Received`;

  const summary = detailsTable([
    ["Company", company],
    ["Service", service],
    ["Service Location", location],
    ["Timeline", prettyTimeline(lead.timeline)],
    ...(lead.sites ? [["Sites", prettySites(lead.sites)] as [string, string]] : []),
  ]);

  const html = wrapBrandEmail({
    preheader: "Your Orbitlink request has been received.",
    title: "Request Received",
    intro: "Your Orbitlink business service enquiry has been received and is now under review.",
    bodyHtml: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#e5edf7;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Hi ${name},</p>

        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#d1d9e6;">
          Thank you for contacting ${escapeHtml(BRAND_MARK)}.
        </p>

        <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#d1d9e6;">
          We’ve received your request and will review the address, service fit, and project details before replying with the clearest next step.
        </p>

        <div style="margin:20px 0;padding:18px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;background:rgba(255,255,255,0.03);">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:#f6dd8f;">
            Request Summary
          </div>
          <div style="margin-top:12px;">
            ${summary}
          </div>
        </div>

        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#d1d9e6;">
          Typical response time is within 1 business day.
        </p>

        <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#d1d9e6;">
          If you require support, clarification, or want to add context to the request, please reply to this email and our team will assist.
        </p>

        <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
          Regards,
        </p>

        ${signatureBlock()}
      </div>
    `,
  });

  const text = [
    `${BRAND_MARK} - Request Received`,
    "",
    `Hi ${lead.fullName?.trim() || "there"},`,
    "",
    `Thank you for contacting ${BRAND_MARK}.`,
    "",
    "We’ve received your request and will review the address, service fit, and project details before replying with the clearest next step.",
    "",
    "Request Summary",
    `Company: ${company}`,
    `Service: ${service}`,
    `Service Location: ${location}`,
    `Timeline: ${prettyTimeline(lead.timeline)}`,
    ...(lead.sites ? [`Sites: ${prettySites(lead.sites)}`] : []),
    "",
    "Typical response time is within 1 business day.",
    "",
    "If you require support, clarification, or want to add context to the request, please reply to this email and our team will assist.",
    "",
    "Orbitlink Concierge Team",
    "Business Support & Service Coordination",
    `${BRAND_MARK} · TIRAV Technologies Inc.`,
    `Support ${SUPPORT_PHONE}`,
    `${GENERAL_EMAIL} | ${SITE_URL}`,
    `Service requests & availability: ${CONTACT_URL}`,
  ].join("\n");

  return { subject, html, text };
}

export function buildInternalLeadNotificationEmail(
  lead: LeadRequest,
  isUpdate = false
) {
  const company = prettyValue(lead.company);
  const service = prettyService(lead.module);

  const subject = isUpdate
    ? `${BRAND_NAME} Lead Update · ${company} · ${service}`
    : `${BRAND_NAME} New Lead · ${company} · ${service}`;

  const bodyRows: Array<[string, string]> = [
    ["Name", prettyValue(lead.fullName)],
    ["Email", prettyValue(lead.email)],
    ["Company", company],
    ["Role", prettyRole(lead.role)],
    ["Address", prettyValue(lead.location)],
    ["Service", service],
    ["Timeline", prettyTimeline(lead.timeline)],
    ["Sites", prettySites(lead.sites)],
  ];

  const html = wrapBrandEmail({
    preheader: isUpdate ? "An existing lead was updated." : "A new lead has been submitted.",
    title: isUpdate ? "Lead Updated" : "New Lead",
    intro: isUpdate
      ? "An existing Orbitlink lead record has been updated through the intake workflow."
      : "A new Orbitlink lead has been submitted through the intake workflow.",
    bodyHtml: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#e5edf7;">
        <div style="padding:18px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;background:rgba(255,255,255,0.03);">
          <div style="font-size:12px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:#f6dd8f;">
            Lead Details
          </div>
          <div style="margin-top:12px;">
            ${detailsTable(bodyRows)}
          </div>
        </div>

        <div style="margin-top:18px;padding:18px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;background:rgba(255,255,255,0.03);">
          <div style="font-size:12px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:#f6dd8f;">
            Project Details
          </div>
          <div style="margin-top:10px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#d1d9e6;">
            ${escapeHtml(prettyValue(lead.notes))}
          </div>
        </div>

        <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
          Reply directly to this message to respond to the lead.
        </p>

        ${signatureBlock()}
      </div>
    `,
  });

  const text = [
    isUpdate ? `${BRAND_NAME} Lead Updated` : `${BRAND_NAME} New Lead`,
    "",
    `Name: ${prettyValue(lead.fullName)}`,
    `Email: ${prettyValue(lead.email)}`,
    `Company: ${company}`,
    `Role: ${prettyRole(lead.role)}`,
    `Address: ${prettyValue(lead.location)}`,
    `Service: ${service}`,
    `Timeline: ${prettyTimeline(lead.timeline)}`,
    `Sites: ${prettySites(lead.sites)}`,
    "",
    "Project Details:",
    prettyValue(lead.notes),
    "",
    "Orbitlink Concierge Team",
    "Business Support & Service Coordination",
    `${BRAND_MARK} · TIRAV Technologies Inc.`,
    `Support ${SUPPORT_PHONE}`,
    `${GENERAL_EMAIL} | ${SITE_URL}`,
    `Service requests & availability: ${CONTACT_URL}`,
  ].join("\n");

  return { subject, html, text };
}

export function getInternalLeadRecipients() {
  return {
    to: SALES_EMAIL,
    cc: GENERAL_EMAIL,
    replyTo: SALES_EMAIL,
  };
}