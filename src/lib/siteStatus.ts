// src/lib/siteStatus.ts
export type Tone = "ok" | "inprogress" | "info";

export type TrustTile = {
  label: string;
  value: string;
  tone: Tone;
};

export type TrustDisclosure = {
  heading: string;
  bullets: string[];
  note?: string;
};

// ===== TRUST PAGE COPY =====

export const TRUST_TILES: TrustTile[] = [
  { label: "TRANSPARENCY POSTURE", value: "DISCLOSURE-FIRST", tone: "info" },
  { label: "BITS LICENCE", value: "APPROVED • ACTIVE", tone: "ok" },
  { label: "TSP REGISTRATION", value: "APPROVED • ACTIVE", tone: "ok" },
  { label: "9-1-1 COMPLIANCE POSTURE", value: "SCOPE-MONITORED", tone: "info" },
];

export const TRUST_DISCLOSURES: TrustDisclosure[] = [
  {
    heading: "REGULATORY READINESS",
    bullets: [
      "Regulatory items are tracked as documented milestones with scope notes and review posture",
      "BITS licence is approved and maintained under documented operational controls",
      "TSP registration is approved and maintained under documented operational controls",
      "9-1-1 obligations are handled according to service scope and applicable requirements",
      "Accessibility posture is reviewed, logged, and updated through controlled processes",
      "Public statements reflect confirmed scope rather than internal roadmap assumptions",
    ],
    note:
      "We publish conservatively. Status is updated only when it can be supported by confirmation, documentation, and operational evidence.",
  },
  {
    heading: "OPERATIONAL GOVERNANCE",
    bullets: [
      "Least-privilege access with role-scoped administration",
      "Change control with staged releases, validation, and rollback posture",
      "Incident handling guided by documented escalation paths",
      "Audit-friendly logging with retention discipline and reviewability",
      "Operational exceptions are documented rather than hidden",
    ],
    note:
      "Trust is treated as an operating discipline: repeatable controls, accountable handling, and reviewable outcomes.",
  },
  {
    heading: "VERIFICATION PACK (REQUEST-ONLY)",
    bullets: [
      "One-page disclosure memo clarifying live scope versus planned scope",
      "Operational posture summary covering onboarding, change policy, and escalation path",
      "Evidence samples where available in redacted, scope-appropriate form",
      "Direct contact path for auditor, regulator, partner, or enterprise review questions",
    ],
    note:
      "Delivered on request to keep sensitive details outside public navigation. Contents vary by module, engagement stage, and readiness.",
  },
  {
    heading: "SCOPE-LOCKED COMMITMENTS",
    bullets: [
      "Commitments are defined per engagement by site, scope, and responsibility model",
      "We confirm what will be measured, what will be reported, and what will not be claimed",
      "Milestones are communicated as controlled windows rather than marketing promises",
      "No surprise claims, silent launches, or inflated public posture",
    ],
    note:
      "Enterprise buyers do not buy hype. They buy clarity, accountability, and a lower-risk review path.",
  },
];

export const TRUST_ASSURANCE =
  "Orbitlink maintains a strict separation between public statements and confirmed status. Where approvals are confirmed, we reflect them plainly while keeping sensitive operational details request-only. We publish conservative disclosures, update when milestones are verifiable, and onboard through controlled windows with documented operating posture.";

// ===== GLOBAL STATUS LAYER =====

export type StatusTone = "ok" | "warn" | "info";

export type StatusItem = {
  label: string;
  value: string;
  tone: StatusTone;
  note?: string;
};

export const STATUS_BAND: StatusItem[] = [
  {
    label: "SERVICE POSTURE",
    value: "BUSINESS-READY",
    tone: "ok",
    note: "Structured onboarding and clear next steps",
  },
  {
    label: "AVAILABILITY",
    value: "REVIEWED BY ADDRESS",
    tone: "info",
    note: "Serviceability is confirmed by site and scope",
  },
  {
    label: "COMMERCIAL PATH",
    value: "STRUCTURED",
    tone: "info",
    note: "Qualification, fit, and pricing handled in a clear sequence",
  },
  {
    label: "TRUST POSTURE",
    value: "DOCUMENTED",
    tone: "ok",
    note: "Business-first review and controlled disclosure",
  },
];

export type NetworkMetric = {
  label: string;
  value: string;
  note: string;
  tone: "ok" | "info" | "warn";
};

export const NETWORK_METRICS: NetworkMetric[] = [
  {
    label: "Delivery Target",
    value: "99.9%+",
    note: "SLA-aligned delivery posture.",
    tone: "ok",
  },
  {
    label: "Visibility",
    value: "Active",
    note: "Monitoring, alerting, and escalation paths.",
    tone: "info",
  },
  {
    label: "Continuity",
    value: "Planned (milestone-driven)",
    note: "Redundancy options aligned to service scope.",
    tone: "warn",
  },
  {
    label: "Change Control",
    value: "Structured",
    note: "Staged releases with rollback posture.",
    tone: "ok",
  },
];

export const NETWORK_CHANGELOG = {
  last_change: {
    label: "LAST CHANGE",
    value: "Controlled release • documented (UTC)",
    note: "Changes follow staged validation before broader rollout.",
    tone: "info" as const,
  },
  current_posture: {
    label: "CURRENT POSTURE",
    value: "Stable service • monitored",
    note: "Status is communicated with a business-first posture.",
    tone: "ok" as const,
  },
  next_window: {
    label: "NEXT WINDOW",
    value: "Announced when scheduled",
    note: "Planned work is disclosed conservatively once confirmed.",
    tone: "warn" as const,
  },
  policy: {
    eyebrow: "POLICY",
    value: "Staged rollout • Documented updates",
    detail:
      "We disclose maintenance windows when confirmed, retain evidence of changes, and keep public statements measured until milestones are complete.",
  },
} as const;

export const NETWORK_CAPABILITIES: { title: string; desc: string }[] = [
  {
    title: "Service readiness",
    desc: "Operational readiness for business delivery with structured qualification and predictable service posture.",
  },
  {
    title: "Performance visibility",
    desc: "Measured, monitored, and communicated with a transparency-first approach.",
  },
  {
    title: "Incident response",
    desc: "Clear escalation paths with documented events and reviewable outcomes.",
  },
  {
    title: "Customer visibility",
    desc: "Status surfaces designed to help business buyers understand service posture more clearly.",
  },
];

export const NETWORK_COVERAGE_NOTE =
  "Coverage and availability are introduced through structured onboarding. If you need a site review, submit your address, service need, and operational requirements for qualification.";

export type ServiceSpec = {
  id: "internet" | "voice" | "smart" | "horizon";
  name: string;
  publicLabel: string;
  tagline: string;
  purpose: string;
  idealFor: string[];
  deliverables: string[];
  onboarding: string;
  tone: "blue" | "gold" | "emerald";
};

export const SERVICE_CATALOG: ServiceSpec[] = [
  {
    id: "internet",
    name: "AUREX Internet",
    publicLabel: "Business Fibre Internet",
    tagline: "Business connectivity with structured delivery and clear commercial handling.",
    purpose:
      "Provide predictable business connectivity with transparent onboarding, clear escalation, and a more accountable provider experience.",
    idealFor: [
      "Canadian businesses requiring reliable primary connectivity",
      "Sites that need clear accountability and premium support posture",
      "Organizations seeking cleaner rollout and documented delivery",
    ],
    deliverables: [
      "Provisioning coordination and onboarding checklist",
      "Performance posture and commercial expectations",
      "Incident handling posture and escalation path",
      "Service documentation package",
    ],
    onboarding:
      "Controlled onboarding window. Availability is assessed per location, service scope, and delivery feasibility.",
    tone: "blue",
  },
  {
    id: "voice",
    name: "AUREX Voice",
    publicLabel: "Business Voice",
    tagline: "Professional cloud voice for modern teams.",
    purpose:
      "Deliver a business-grade voice experience with structured routing, clean call handling, and support aligned to day-to-day operations.",
    idealFor: [
      "Teams needing a professional reception and call-routing experience",
      "Businesses migrating from legacy phone providers",
      "Organizations requiring extensions, ring groups, and cleaner operational handling",
    ],
    deliverables: [
      "PBX configuration and numbering plan",
      "Auto-attendant, IVR, and business greeting setup",
      "Extensions, ring groups, and voicemail posture",
      "Operational support contact surface",
    ],
    onboarding:
      "Provisioned by request. Rollout is sequenced to protect reliability, cutover quality, and support response time.",
    tone: "gold",
  },
  {
    id: "smart",
    name: "AUREX Smart",
    publicLabel: "IoT Connectivity",
    tagline: "Connected office monitoring with controlled alerting.",
    purpose:
      "Provide IoT integration and facility monitoring for visibility, uptime signals, and practical business alerting.",
    idealFor: [
      "Offices needing environmental, access, or uptime signals",
      "Sites wanting alerting without unnecessary complexity",
      "Organizations seeking a unified monitoring posture",
    ],
    deliverables: [
      "Sensor and gateway integration plan",
      "Alert thresholds and notification posture",
      "Dashboard visibility surface",
      "Operational runbook for maintenance and review",
    ],
    onboarding:
      "Designed for staged deployment. Sensor scope and operational intent are defined before activation.",
    tone: "emerald",
  },
  {
    id: "horizon",
    name: "TIRAV Horizon",
    publicLabel: "Compliance Automation",
    tagline: "Compliance evidence automation with review-friendly handling.",
    purpose:
      "Automate evidence capture, integrity verification, retention discipline, and audit-friendly disclosure bundles.",
    idealFor: [
      "Regulated or compliance-heavy operators",
      "Organizations needing verifiable audit artifacts",
      "Teams requiring disciplined retention and integrity checks",
    ],
    deliverables: [
      "Signed evidence bundles with integrity verification",
      "Retention discipline and audit posture",
      "Operational logs designed for review",
      "Disclosure surfaces for auditors and regulators",
    ],
    onboarding:
      "Deployed as a controlled appliance workflow with documented operating posture and evidence-first handling.",
    tone: "gold",
  },
];

export const ABOUT_STORY = {
  headline: "Built with business discipline",
  subhead:
    "Orbitlink is a brand of TIRAV Technologies Inc., designed for organizations that value reliability, operational clarity, and structured delivery.",
  principles: [
    {
      title: "Discipline before scale",
      desc: "We prioritize controlled onboarding, documented operations, and measured delivery before expanding commercial scope.",
    },
    {
      title: "Evidence over claims",
      desc: "Public statements remain conservative. Service posture is supported by process, documentation, and reviewable artifacts.",
    },
    {
      title: "Business-ready experience",
      desc: "From support surfaces to service design, Orbitlink is built to feel calm, precise, and professionally structured.",
    },
    {
      title: "Regulator-aware by default",
      desc: "Compliance and disclosure are treated as operating disciplines, not afterthoughts.",
    },
  ],
  story: [
    {
      label: "WHO WE ARE",
      text:
        "Orbitlink is the customer-facing connectivity platform of TIRAV Technologies Inc., built to deliver business internet and infrastructure services with a disciplined operating posture.",
    },
    {
      label: "WHY IT EXISTS",
      text:
        "Too many providers sell speed without process. Orbitlink was created to offer a cleaner model: structured onboarding, transparent delivery, and enterprise-caliber support posture.",
    },
    {
      label: "HOW WE OPERATE",
      text:
        "We separate presentation from proof. What we publish is intentionally measured, and what we deliver is designed to be reviewable, supportable, and operationally accountable.",
    },
  ],
};