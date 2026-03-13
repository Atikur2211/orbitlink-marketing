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
      className="mt-4 grid gap-4"
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

      <div className="text-[11px] tracking-[0.28em] text-white/55">REQUEST DETAILS</div>

      <div className="rounded-2xl border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-4">
        <div className="text-[11px] tracking-[0.22em] text-[#FDE68A]">WHAT HAPPENS NEXT</div>
        <p className="mt-2 text-sm leading-6 text-white/75">
          We review your address, service need, and timeline, then respond with the most useful
          next step for availability, pricing direction, or service qualification.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4">
        <div className="text-[11px] tracking-[0.22em] text-emerald-200">
          RESPONSE EXPECTATION
        </div>
        <p className="mt-2 text-sm leading-6 text-white/78">
          Most business enquiries receive a response within 1 business day, with the next step based
          on address, service type, and request detail.
        </p>
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
          <FieldHint>
            Using a work email usually helps us review and respond more efficiently.
          </FieldHint>
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
          <FieldLabel htmlFor="role">Your role</FieldLabel>
          <select id="role" name="role" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>
              Select your role
            </option>
            <option value="business_owner">Business owner / leadership</option>
            <option value="business_buyer">Procurement / business buyer</option>
            <option value="it_network">IT / network lead</option>
            <option value="operations_facilities">Operations / facilities</option>
            <option value="property_management">Property / building management</option>
            <option value="partner_vendor">Partner / vendor</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel htmlFor="location">Service address</FieldLabel>
          <input
            id="location"
            name="location"
            type="text"
            required
            autoComplete="street-address"
            placeholder="Street address, city, province"
            className={fieldClassName}
          />
          <FieldHint>
            The exact service address is the most important detail for availability review.
          </FieldHint>
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="module">Primary service needed</FieldLabel>
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
          <FieldHint>Choose the main service you want reviewed first.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel htmlFor="timeline" optional>
            Project timeline
          </FieldLabel>
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className={fieldClassName}
          >
            <option value="" disabled>
              Select timeline
            </option>
            <option value="asap">As soon as possible</option>
            <option value="within_30_days">Within 30 days</option>
            <option value="within_60_90_days">Within 60–90 days</option>
            <option value="planning_stage">Planning stage</option>
            <option value="not_sure">Not sure yet</option>
          </select>
          <FieldHint>
            Timing helps us understand urgency and the likely commercial path.
          </FieldHint>
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
          <FieldHint>
            Add this if the request covers multiple offices, branches, or facilities.
          </FieldHint>
        </div>
      </div>

      <div className="grid gap-2">
        <FieldLabel htmlFor="notes" optional>
          Project details
        </FieldLabel>
        <textarea
          id="notes"
          name="notes"
          rows={6}
          placeholder="Describe what you need. Helpful details include your current provider, target install timing, user count, static IP needs, managed Wi-Fi, voice, backup connectivity, landlord coordination, or multi-site requirements."
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30"
        />
        <FieldHint>
          Strong requests usually include current service, timing, site context, and any technical requirements.
        </FieldHint>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-[11px] tracking-[0.22em] text-white/55">HELPFUL TO INCLUDE</div>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Static IPs, managed Wi-Fi, voice, backup connectivity, building details, desired install
          window, and anything that affects the site or commercial decision.
        </p>
      </div>

      <div className="mt-1 grid gap-2">
        <button
          type="submit"
          className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
        >
          Submit Request & Check Availability
        </button>

        <div className="text-xs text-white/55">
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