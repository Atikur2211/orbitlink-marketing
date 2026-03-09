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
          intent: "onboarding",
        });
      }}
    >
      <input type="hidden" name="source" value="contact" />
      <input type="hidden" name="intent" value="onboarding" />
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
        <div className="text-[11px] tracking-[0.22em] text-[#FDE68A]">WHAT YOU’LL GET BACK</div>
        <p className="mt-2 text-sm leading-6 text-white/75">
          A clearer next step based on service fit, address feasibility, and your operational
          requirements. The goal is to reduce back-and-forth and move you toward the right service
          path faster.
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
          <FieldHint>Using a work email usually leads to a faster and cleaner response path.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="company" className="text-sm text-white/82">
            Company or organization
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
            <option value="enterprise">Business buyer</option>
            <option value="it">IT / Network lead</option>
            <option value="operations">Operations / Facilities</option>
            <option value="property">Property / Building management</option>
            <option value="partner">Partner / Vendor</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="location" className="text-sm text-white/82">
            Service address or city
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="Address or City, Province"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
          />
          <FieldHint>Address-level detail helps determine feasibility and the right service path.</FieldHint>
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
          <FieldHint>Choose the service that best matches the site’s main requirement today.</FieldHint>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="timeline" className="text-sm text-white/82">
            Target go-live
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
            <option value="30_days">Within 30 days</option>
            <option value="60_90_days">Within 60–90 days</option>
            <option value="planning">Planning stage</option>
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
              Select scope
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
          placeholder="Tell us what you need. Include timeline, building context, current provider if relevant, and any requirements such as static IPs, managed Wi-Fi, voice, continuity, or infrastructure planning."
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40"
        />
        <FieldHint>
          The strongest requests usually include the address, target timeline, service priority, and
          any technical or operational constraints.
        </FieldHint>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-[11px] tracking-[0.22em] text-white/55">QUICK TIP</div>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Good requests often mention one or more of these: static IPs, managed Wi-Fi, voice,
          continuity, landlord/building context, or desired installation window.
        </p>
      </div>

      <div className="mt-1 grid gap-2">
        <button
          type="submit"
          className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
        >
          Check availability and request review
        </button>

        <div className="text-xs text-white/55">
          Prefer email? <span className="text-white/80">concierge@orbitlink.ca</span>
        </div>
      </div>
    </form>
  );
}