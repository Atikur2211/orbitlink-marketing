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

function row(label: string, value: string, isLast = false) {
  return `
    <tr>
      <td
        style="
          padding:10px 0;
          width:160px;
          vertical-align:top;
          color:#7e90ac;
          font-family:Arial,Helvetica,sans-serif;
          font-size:13px;
          line-height:1.5;
          border-bottom:${isLast ? "0" : "1px solid #22304d"};
        "
      >
        ${escapeHtml(label)}
      </td>
      <td
        style="
          padding:10px 0;
          vertical-align:top;
          color:#edf3fb;
          font-family:Arial,Helvetica,sans-serif;
          font-size:13px;
          line-height:1.6;
          font-weight:600;
          border-bottom:${isLast ? "0" : "1px solid #22304d"};
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function detailsTable(rows: Array<[string, string]>) {
  return `
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse;"
    >
      ${rows.map(([k, v], i) => row(k, v, i === rows.length - 1)).join("")}
    </table>
  `;
}

function signatureBlock() {
  return `
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse;margin-top:18px;"
    >
      <tr>
        <td
          style="
            padding-top:16px;
            border-top:1px solid #22304d;
            font-family:Arial,Helvetica,sans-serif;
            color:#d8e2f0;
          "
        >
          <div style="font-size:14px;line-height:1.6;font-weight:700;color:#f4f7fb;">
            Orbitlink Concierge Team
          </div>
          <div style="font-size:13px;line-height:1.65;color:#b7c4d8;">
            Business Support &amp; Service Coordination
          </div>
          <div style="font-size:13px;line-height:1.65;color:#b7c4d8;">
            ${BRAND_MARK} · TIRAV Technologies Inc.
          </div>
          <div style="font-size:13px;line-height:1.65;color:#b7c4d8;">
            ${SUPPORT_PHONE} ·
            <a href="mailto:${GENERAL_EMAIL}" style="color:#dbe7ff;text-decoration:none;">${GENERAL_EMAIL}</a>
            ·
            <a href="${SITE_URL}" style="color:#dbe7ff;text-decoration:none;">orbitlink.ca</a>
          </div>
          <div style="margin-top:8px;font-size:13px;line-height:1.65;">
            <a
              href="${CONTACT_URL}"
              style="color:#f3d67a;text-decoration:none;font-weight:700;"
            >
              Service requests &amp; availability →
            </a>
          </div>
        </td>
      </tr>
    </table>
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
    footerNote = "This communication was issued by Orbitlink™ as part of a customer order and service operations workflow. Service availability, network design, provisioning intervals, implementation requirements, and final qualification outcomes may vary by address, building access, carrier facilities, and service acceptance terms.",
  } = args;

  return `
  <!doctype html>
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:#08101d;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        ${escapeHtml(preheader)}
      </div>

      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="border-collapse:collapse;background:#08101d;margin:0;padding:0;"
      >
        <tr>
          <td align="center" style="padding:20px 10px;">
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width:600px;border-collapse:collapse;background:#0f172a;border:1px solid #1d2b45;border-radius:20px;overflow:hidden;"
            >
              <tr>
                <td
                  style="
                    padding:22px 22px 18px 22px;
                    background:linear-gradient(135deg,#081b3a 0%,#0f274f 60%,#0b1f40 100%);
                    border-bottom:1px solid #1d2b45;
                  "
                >
                  <img
                    src="${LOGO_URL}"
                    width="128"
                    alt="${escapeHtml(BRAND_NAME)}"
                    style="display:block;border:0;outline:none;text-decoration:none;margin:0 0 8px 0;"
                  />
                  <div
                    style="
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:13px;
                      line-height:1.4;
                      color:#d7e2f2;
                      font-weight:700;
                      margin:0 0 10px 0;
                    "
                  >
                    ${escapeHtml(BRAND_MARK)}
                  </div>
                  <div
                    style="
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:32px;
                      line-height:1.12;
                      color:#ffffff;
                      font-weight:700;
                      margin:0;
                    "
                  >
                    ${escapeHtml(title)}
                  </div>
                  ${
                    intro
                      ? `
                      <div
                        style="
                          margin-top:10px;
                          font-family:Arial,Helvetica,sans-serif;
                          font-size:14px;
                          line-height:1.65;
                          color:#d5dfed;
                        "
                      >
                        ${escapeHtml(intro)}
                      </div>
                    `
                      : ""
                  }
                </td>
              </tr>

              <tr>
                <td style="padding:22px 22px 18px 22px;background:#0f172a;">
                  ${bodyHtml}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding:16px 22px 20px 22px;
                    border-top:1px solid #1d2b45;
                    background:#0b1322;
                    font-family:Arial,Helvetica,sans-serif;
                  "
                >
                  <div style="font-size:11px;line-height:1.7;color:#7f90a6;">
                    ${escapeHtml(footerNote)}
                  </div>

                  <div style="margin-top:10px;font-size:11px;line-height:1.7;color:#8ea0b8;">
                    Terms:
                    <a href="${SITE_URL}/legal/terms" style="color:#d9e5f6;text-decoration:none;">${SITE_URL}/legal/terms</a>
                    &nbsp; | &nbsp;
                    Privacy:
                    <a href="${SITE_URL}/legal/privacy" style="color:#d9e5f6;text-decoration:none;">${SITE_URL}/legal/privacy</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export function buildCustomerConfirmationEmail(lead: LeadRequest) {
  const name = escapeHtml(lead.fullName?.trim() || "there");
  const service = prettyService(lead.module);
  const location = prettyValue(lead.location);
  const company = prettyValue(lead.company);

  const subject = `${BRAND_MARK} · Request Received`;

  const summaryRows: Array<[string, string]> = [
    ["Company", company],
    ["Service", service],
    ["Service Location", location],
    ["Timeline", prettyTimeline(lead.timeline)],
    ...(lead.sites ? [["Sites", prettySites(lead.sites)] as [string, string]] : []),
  ];

  const html = wrapBrandEmail({
    preheader: "Your Orbitlink request has been received.",
    title: "Request Received",
    intro: "Your Orbitlink business service enquiry has been received and is now under review.",
    bodyHtml: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#e5edf7;">
        <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;">Hi ${name},</p>

        <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
          Thank you for contacting ${escapeHtml(BRAND_MARK)}.
        </p>

        <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
          We’ve received your request and will review the address, service fit, and project details before replying with the clearest next step.
        </p>

        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="border-collapse:collapse;margin:18px 0;background:#17223a;border:1px solid #283758;border-radius:16px;overflow:hidden;"
        >
          <tr>
            <td style="padding:16px 16px 8px 16px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:#f3d67a;font-weight:700;">
                Request Summary
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 16px 12px 16px;">
              ${detailsTable(summaryRows)}
            </td>
          </tr>
        </table>

        <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
          Typical response time is within 1 business day.
        </p>

        <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
          If you require support, clarification, or want to add context to the request, please reply to this email and our team will assist.
        </p>

        <p style="margin:0;font-size:15px;line-height:1.7;color:#d1d9e6;">
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
    `${SUPPORT_PHONE} · ${GENERAL_EMAIL} · ${SITE_URL}`,
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
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="border-collapse:collapse;margin:0 0 18px 0;background:#17223a;border:1px solid #283758;border-radius:16px;overflow:hidden;"
        >
          <tr>
            <td style="padding:16px 16px 8px 16px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:#f3d67a;font-weight:700;">
                Lead Details
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 16px 12px 16px;">
              ${detailsTable(bodyRows)}
            </td>
          </tr>
        </table>

        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="border-collapse:collapse;margin:0 0 16px 0;background:#17223a;border:1px solid #283758;border-radius:16px;overflow:hidden;"
        >
          <tr>
            <td style="padding:16px 16px 8px 16px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:#f3d67a;font-weight:700;">
                Project Details
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 16px 16px 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#d1d9e6;white-space:pre-wrap;">
              ${escapeHtml(prettyValue(lead.notes))}
            </td>
          </tr>
        </table>

        <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#d1d9e6;">
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
    `${SUPPORT_PHONE} · ${GENERAL_EMAIL} · ${SITE_URL}`,
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