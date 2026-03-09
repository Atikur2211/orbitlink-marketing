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

export default function ContactIntakeForm({ moduleOptions }: { moduleOptions: string[] }) {
  const options = useMemo(() => moduleOptions, [moduleOptions]);

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
          We review your address, service needs, and timeline, then reply with the clearest next
          step available.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="fullName" className="text-sm text-white/82">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-white/82">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
          />
          <FieldHint>Using a work email usually helps us respond more clearly.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="company" className="text-sm text-white/82">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder="Company name"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="role" className="text-sm text-white/82">
            Your role
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="business_buyer">Business buyer</option>
            <option value="it_network">IT / Network lead</option>
            <option value="operations_facilities">Operations / Facilities</option>
            <option value="property_management">Property / Building management</option>
            <option value="partner_vendor">Partner / Vendor</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="location" className="text-sm text-white/82">
            Service address
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="Street address, city, province"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
          />
          <FieldHint>The exact address helps us review availability more accurately.</FieldHint>
        </div>

        <div className="grid gap-2">
          <label htmlFor="module" className="text-sm text-white/82">
            Service needed
          </label>
          <select
            id="module"
            name="module"
            required
            defaultValue=""
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40"
          >
            <option value="" disabled>
              Select a service
            </option>
            {options.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <FieldHint>Choose the main service you want to discuss first.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="timeline" className="text-sm text-white/82">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40"
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
        </div>

        <div className="grid gap-2">
          <label htmlFor="sites" className="text-sm text-white/82">
            Number of sites
          </label>
          <select
            id="sites"
            name="sites"
            defaultValue=""
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#FACC15]/40"
          >
            <option value="" disabled>
              Select number of sites
            </option>
            <option value="1">1 site</option>
            <option value="2_5">2–5 sites</option>
            <option value="6_20">6–20 sites</option>
            <option value="20_plus">20+ sites</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="notes" className="text-sm text-white/82">
          Project details
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="Tell us what you need. Include your timeline, current setup if relevant, and any requirements such as static IPs, managed Wi-Fi, voice, continuity, or multi-site service."
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
        />
        <FieldHint>
          Helpful details include the address, install timing, service priority, and any technical
          needs.
        </FieldHint>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-[11px] tracking-[0.22em] text-white/55">HELPFUL TO INCLUDE</div>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Static IPs, managed Wi-Fi, voice, continuity, landlord or building details, and your
          preferred installation window.
        </p>
      </div>

      <div className="mt-1 grid gap-2">
        <button
          type="submit"
          className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
        >
          Check Availability & Request Pricing
        </button>

        <div className="text-xs text-white/55">
          Prefer email? <span className="text-white/80">concierge@orbitlink.ca</span>
        </div>
      </div>
    </form>
  );
}