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

// ===== TRUST PAGE COPY (Golden grade + regulator-safe) =====

export const TRUST_TILES: TrustTile[] = [
  { label: "TRANSPARENCY POSTURE", value: "DISCLOSURE-FIRST", tone: "info" },
  { label: "BITS LICENCE", value: "IN PROCESS • TRACKED", tone: "inprogress" },
  { label: "9-1-1 OBLIGATIONS", value: "SUBMITTED • MONITORED", tone: "info" },
];

export const TRUST_DISCLOSURES: TrustDisclosure[] = [
  {
    heading: "REGULATORY READINESS",
    bullets: [
      "Regulatory items are tracked as milestones — with dates and scope notes",
      "BITS licence progress is updated only when confirmations are received",
      "9-1-1 obligations are maintained where applicable to the service scope",
      "Accessibility posture is reviewed, logged, and documented",
    ],
    note:
      "We avoid optimistic language. Statements update only when they can be supported.",
  },
  {
    heading: "OPERATIONAL GOVERNANCE",
    bullets: [
      "Least-privilege access and role-scoped administration",
      "Change control with staged releases and rollback posture",
      "Incident handling guided by documented escalation paths",
      "Audit-friendly logging with retention discipline",
    ],
    note:
      "Trust is an operations practice: repeatable controls, accountable handling, reviewable outcomes.",
  },

  // ✅ “Million-dollar move” (credibility) — but still conservative
  {
    heading: "VERIFICATION PACK (REQUEST-ONLY)",
    bullets: [
      "A one-page disclosure memo: what is live vs. what is planned (no overclaiming)",
      "Operational posture summary: onboarding, change policy, escalation path",
      "Evidence samples where available (redacted, scope-appropriate)",
      "A direct contact path for auditor/regulator review questions",
    ],
    note:
      "Delivered on request to keep sensitive details out of public navigation. Contents vary by module and readiness.",
  },

  // ✅ The real “million-dollar move” for enterprise trust
  {
    heading: "SCOPE-LOCKED COMMITMENTS",
    bullets: [
      "Service commitments are written per engagement (site + scope + responsibilities)",
      "We confirm what we will measure, what we will report, and what we will not claim",
      "Milestones are timeboxed and communicated as windows — not promises",
      "Operational exceptions are documented instead of hidden",
    ],
    note:
      "Enterprises don’t buy hype — they buy clarity. This section is designed to make reviews faster and safer.",
  },
];

export const TRUST_ASSURANCE =
  "Orbitlink keeps a strict separation between public statements and confirmed status. We publish conservative disclosures, update when milestones are verified, and onboard through controlled windows with documented operational posture.";


// ===== ORBITLINK — GLOBAL TELEMETRY (single source of truth) =====

export type StatusTone = "ok" | "warn" | "info";

export type StatusItem = {
  label: string;
  value: string;
  tone: StatusTone;
  note?: string;
};

export const STATUS_BAND: StatusItem[] = [
  {
    label: "SYSTEM STATUS",
    value: "OPERATIONAL",
    tone: "ok",
    note: "Measured posture • conservative disclosures",
  },
  {
    label: "EDGE POPs",
    value: "12 ONLINE",
    tone: "info",
    note: "Presence expressed as operational roles",
  },
  {
    label: "LATENCY",
    value: "18ms",
    tone: "info",
    note: "Contextual measurement (route/time window)",
  },
  {
    label: "COMPLIANCE",
    value: "READY",
    tone: "ok",
    note: "Evidence-first • audit-ready workflows",
  },
];

export type NetworkMetric = {
  label: string;
  value: string;
  note: string;
  tone: "ok" | "info" | "warn";
};

export const NETWORK_METRICS: NetworkMetric[] = [
  { label: "Uptime Target", value: "99.9%+", note: "SLA-aligned delivery posture.", tone: "ok" },
  { label: "Observability", value: "Enabled", note: "Telemetry, alerting, escalation paths.", tone: "info" },
  { label: "Failover", value: "Planned (milestone-driven)", note: "Redundancy options by service scope.", tone: "warn" },
  { label: "Change Control", value: "Disciplined", note: "Staged releases with rollback posture.", tone: "ok" },
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
    value: "Stable routing • monitored",
    note: "Operational posture is measured, not marketed.",
    tone: "ok" as const,
  },
  next_window: {
    label: "NEXT WINDOW",
    value: "Announced when scheduled",
    note: "Planned work is disclosed conservatively to prevent overclaiming.",
    tone: "warn" as const,
  },
  policy: {
    eyebrow: "POLICY",
    value: "Staged rollout • Evidence retained",
    detail:
      "We disclose maintenance windows when confirmed, retain evidence of changes, and keep statements conservative until milestones are complete.",
  },
} as const;

export const NETWORK_CAPABILITIES: { title: string; desc: string }[] = [
  {
    title: "Edge POP posture",
    desc: "Operational readiness for scaled delivery with clean routing and predictable performance.",
  },
  {
    title: "Latency discipline",
    desc: "Measured, monitored, and reported with transparency-first communication.",
  },
  {
    title: "Incident response",
    desc: "Clear escalation path with documented events and post-incident review posture.",
  },
  {
    title: "Customer visibility",
    desc: "Status surfaces designed to feel like an operator console — not a marketing page.",
  },
];

export const NETWORK_COVERAGE_NOTE =
  "Coverage and availability are introduced through controlled onboarding. If you require a specific site assessment, request access and include your location and service module.";

export type ModuleSpec = {
  id: "internet" | "voice" | "smart" | "horizon";
  name: string;
  tagline: string;
  purpose: string;
  idealFor: string[];
  deliverables: string[];
  onboarding: string;
  tone: "blue" | "gold" | "emerald";
};

export const MODULE_SPECS: ModuleSpec[] = [
  {
    id: "internet",
    name: "AUREX Internet",
    tagline: "Enterprise connectivity with disciplined delivery posture.",
    purpose:
      "Provide predictable connectivity with transparency-first operations and structured escalation.",
    idealFor: [
      "Canadian businesses requiring reliable primary connectivity",
      "Sites that need clear accountability and support posture",
      "Operators needing clean rollout and documentation",
    ],
    deliverables: [
      "Provisioning coordination & onboarding checklist",
      "Performance posture (latency/uptime targets where applicable)",
      "Incident handling posture & escalation path",
      "Service documentation package",
    ],
    onboarding:
      "Controlled onboarding window. Availability assessed per location and service scope.",
    tone: "blue",
  },
  {
    id: "voice",
    name: "AUREX Voice",
    tagline: "Precision PBX. Professional VoIP for modern teams.",
    purpose:
      "Deliver a business-grade voice experience with structured routing, greetings, and support.",
    idealFor: [
      "Teams needing a professional reception experience",
      "Businesses migrating from legacy phone providers",
      "Organizations requiring clean call routing & extensions",
    ],
    deliverables: [
      "PBX configuration & numbering plan",
      "Auto-attendant / IVR / business greetings",
      "Extensions, ring groups, voicemail posture",
      "Operational support contact surface",
    ],
    onboarding:
      "Provisioned by request. Rollout is sequenced to protect reliability and support response time.",
    tone: "gold",
  },
  {
    id: "smart",
    name: "AUREX Smart",
    tagline: "Connected office monitoring with alerting posture.",
    purpose:
      "Provide IoT integration and facility monitoring for visibility, uptime, and controlled alerts.",
    idealFor: [
      "Offices needing facility signals (environment, access, uptime)",
      "Sites wanting alerting without complexity",
      "Operators seeking a unified monitoring posture",
    ],
    deliverables: [
      "Sensor and gateway integration plan",
      "Alert thresholds & notification posture",
      "Dashboard visibility surface",
      "Operational runbook for maintenance",
    ],
    onboarding:
      "Designed for staged deployment. Sensor scope defined before activation.",
    tone: "emerald",
  },
  {
    id: "horizon",
    name: "TIRAV Horizon",
    tagline: "Sovereign compliance evidence automation.",
    purpose:
      "Automate evidence capture, integrity verification, and audit-friendly disclosure bundles.",
    idealFor: [
      "Regulated or compliance-heavy operators",
      "Organizations needing verifiable audit artifacts",
      "Teams requiring disciplined retention & integrity checks",
    ],
    deliverables: [
      "Signed evidence bundles (integrity verification)",
      "Retention discipline and audit posture",
      "Operational logs designed for review",
      "Disclosure surfaces for auditors/regulators",
    ],
    onboarding:
      "Deployed as a controlled appliance workflow with documented operating posture.",
    tone: "gold",
  },
];

export const ABOUT_STORY = {
  headline: "Corporate Transparency",
  subhead:
    "Orbitlink is built as an infrastructure-grade platform with disciplined operations and regulator-aware delivery.",
  principles: [
    {
      title: "Control, then scale",
      desc: "We prioritize predictable onboarding, stable operations, and documented posture before expanding intake volume.",
    },
    {
      title: "Evidence over hype",
      desc: "Trust is treated as an operational system: logging discipline, change control, and verifiable artifacts.",
    },
    {
      title: "Operator-grade experience",
      desc: "The website is designed to feel like a control surface because the business is run like an operator.",
    },
    {
      title: "Regulator-aware by default",
      desc: "Public statements remain conservative. Status is tracked and updated as confirmations/issuances occur.",
    },
  ],
  story: [
    {
      label: "WHO WE ARE",
      text:
        "Orbitlink is a brand of TIRAV Technologies Inc. We build and operate connectivity and digital utility services with an emphasis on operational clarity and disciplined execution.",
    },
    {
      label: "WHY IT EXISTS",
      text:
        "Most providers sell features. Orbitlink sells posture: predictable delivery, transparent operations, and a controlled rollout model designed for enterprise expectations.",
    },
    {
      label: "HOW WE OPERATE",
      text:
        "We maintain a separation between marketing and reality. What we publish is intentionally precise, and our internal systems are built to produce reviewable artifacts — not vague promises.",
    },
  ],
};



