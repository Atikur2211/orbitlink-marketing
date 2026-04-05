"use client";

import { useMemo } from "react";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-5 text-white/50">{children}</p>;
}

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-white/84">
      {children}
      {optional ? <span className="ml-1 text-white/45">(optional)</span> : null}
    </label>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.24em] text-white/50">{eyebrow}</div>
      <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>
      {desc ? <p className="mt-2 text-sm leading-6 text-white/62">{desc}</p> : null}
    </div>
  );
}

function InfoPanel({
  eyebrow,
  title,
  text,
  tone = "neutral",
}: {
  eyebrow: string;
  title: string;
  text: string;
  tone?: "neutral" | "accent" | "positive";
}) {
  const toneClass =
    tone === "accent"
      ? "border-[#FACC15]/15 bg-[#FACC15]/[0.06]"
      : tone === "positive"
        ? "border-emerald-400/15 bg-emerald-400/[0.06]"
        : "border-white/10 bg-black/20";

  const eyebrowClass =
    tone === "accent"
      ? "text-[#FDE68A]"
      : tone === "positive"
        ? "text-emerald-200"
        : "text-white/55";

  return (
    <div className={`rounded-[24px] border p-4 ${toneClass}`}>
      <div className={`text-[11px] tracking-[0.22em] ${eyebrowClass}`}>{eyebrow}</div>
      <div className="mt-2 text-sm font-medium text-white/88">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/72">{text}</p>
    </div>
  );
}

function normalizeServiceLabel(name: string) {
  const key = name.trim().toLowerCase();

  const labelMap: Record<string, string> = {
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
  };

  return labelMap[key] ?? name;
}

function inputClassName() {
  return "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30";
}

function textareaClassName() {
  return "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30";
}

export default function ContactIntakeForm({ moduleOptions }: { moduleOptions: string[] }) {
  const options = useMemo(
    () =>
      moduleOptions.map((value) => ({
        value,
        label: normalizeServiceLabel(value),
      })),
    [moduleOptions]
  );

  const fieldClassName = inputClassName();

  return (
    <form
      className="mt-4 grid gap-5"
      action="/api/waitlist"
      method="post"
      onSubmit={() => {
        window.gtag?.("event", "lead_submit", {
          location: "contact_page",
          intent: "availability_pricing",
        });
      }}
    >
      <input type="hidden" name="source" value="contact" />
      <input type="hidden" name="intent" value="availability_pricing" />
      <input type="hidden" name="returnTo" value="/contact" />

      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <SectionTitle
        eyebrow="REQUEST DETAILS"
        title="Tell us what you need"
        desc="Add your business address, service need, and timing. We review the request and guide the next step clearly."
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <InfoPanel
          eyebrow="WHAT YOU GET"
          title="Availability, pricing direction, and service recommendation"
          text="We review your address and service need, then reply with availability, pricing direction, or the best next step for the site."
          tone="accent"
        />
        <InfoPanel
          eyebrow="RESPONSE TIME"
          title="Usually within 1 business day (often faster)"
          text="Response time depends on the address, service type, and detail provided."
          tone="positive"
        />
        <InfoPanel
          eyebrow="NO OBLIGATION"
          title="Business review first"
          text="Your request is reviewed without commitment. Orbitlink focuses on clarity first, then the right next step."
          tone="neutral"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel htmlFor="fullName">Full name</FieldLabel>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="email">Work email</FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className={fieldClassName}
          />
          <FieldHint>Work email is preferred for business requests.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel htmlFor="company">Company name</FieldLabel>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="Your company name"
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="role" optional>
            Your role
          </FieldLabel>
          <select id="role" name="role" defaultValue="" className={fieldClassName}>
            <option value="" disabled>
              Select your role
            </option>
            <option value="business_owner">Owner / leadership</option>
            <option value="business_buyer">Buyer / procurement</option>
            <option value="it_network">IT / network lead</option>
            <option value="operations_facilities">Operations / facilities</option>
            <option value="property_management">Property management</option>
            <option value="partner_vendor">Partner / vendor</option>
            <option value="other">Other</option>
          </select>
          <FieldHint>Optional, but helpful for routing the request properly.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel htmlFor="location">Business address</FieldLabel>
          <input
            id="location"
            name="location"
            type="text"
            required
            autoComplete="street-address"
            placeholder="Street address, city, province"
            className={fieldClassName}
          />
          <FieldHint>Use the exact service address for the best review.</FieldHint>
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="module">Service needed</FieldLabel>
          <select id="module" name="module" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>
              Select a service
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldHint>Choose the main service first. You can mention additional services below.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel htmlFor="timeline" optional>
            Timeline
          </FieldLabel>
          <select id="timeline" name="timeline" defaultValue="" className={fieldClassName}>
            <option value="" disabled>
              Select timeline
            </option>
            <option value="asap">As soon as possible</option>
            <option value="within_30_days">Within 30 days</option>
            <option value="within_60_90_days">Within 60–90 days</option>
            <option value="planning_stage">Planning stage</option>
            <option value="not_sure">Not sure yet</option>
          </select>
          <FieldHint>Helps us understand urgency.</FieldHint>
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="sites" optional>
            Number of sites
          </FieldLabel>
          <select id="sites" name="sites" defaultValue="" className={fieldClassName}>
            <option value="" disabled>
              Select number of sites
            </option>
            <option value="1">1 site</option>
            <option value="2_5">2–5 sites</option>
            <option value="6_20">6–20 sites</option>
            <option value="20_plus">20+ sites</option>
          </select>
          <FieldHint>Add this for multi-site requests.</FieldHint>
        </div>
      </div>

      <div className="grid gap-2">
        <FieldLabel htmlFor="notes" optional>
          Project details
        </FieldLabel>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="Example: 20-user office, need fibre + Wi-Fi, current provider Bell, moving in 30 days, may need static IPs and backup internet."
          className={textareaClassName()}
        />
        <FieldHint>
          Mention fibre, Wi-Fi, voice, backup, static IPs, timing, landlord coordination,
          or anything important for the site.
        </FieldHint>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
        <div className="text-[11px] tracking-[0.22em] text-white/55">HELPFUL DETAILS</div>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Static IPs, managed Wi-Fi, voice, backup connectivity, install window, building details,
          landlord coordination, multi-site needs, or any service combination that matters to the location.
        </p>
      </div>

      <div className="grid gap-3 pt-1">
        <button
          type="submit"
          className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
        >
          Check Availability & Get Next Step
        </button>

        <a
          href="tel:+18888672480"
          className="text-center rounded-2xl border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
        >
          Or call 1-888-867-2480
        </a>

        <p className="text-center text-xs text-white/50">
          Business-only requests • No obligation • Reviewed by address
        </p>

        <div className="text-xs text-white/55 text-center">
          Prefer email?{" "}
          <a
            href="mailto:concierge@orbitlink.ca"
            className="text-white/80 transition hover:text-white"
          >
            concierge@orbitlink.ca
          </a>
        </div>
      </div>
    </form>
  );
}