"use client";

import { useMemo } from "react";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export default function ContactIntakeForm({ moduleOptions }: { moduleOptions: string[] }) {
  // Stable options render (minor polish)
  const options = useMemo(() => moduleOptions, [moduleOptions]);

  return (
    <form
      className="mt-4 grid gap-3"
      action="/api/waitlist"
      method="post"
      onSubmit={() => {
        window.gtag?.("event", "lead_submit", {
          location: "contact_page",
          intent: "onboarding",
        });
      }}
    >
      {/* Funnel */}
      <input type="hidden" name="source" value="contact" />
      <input type="hidden" name="intent" value="onboarding" />
      <input type="hidden" name="returnTo" value="/contact" />

      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="mt-1 text-[11px] tracking-[0.28em] text-white/55">DETAILS</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="fullName"
          type="text"
          required
          placeholder="Full name"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/40"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Work email"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="company"
          type="text"
          required
          placeholder="Company / organization"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/40"
        />
        <select
          name="role"
          required
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
          defaultValue=""
        >
          <option value="" disabled>
            Role
          </option>
          <option value="enterprise">Enterprise buyer</option>
          <option value="isp">ISP / Operator</option>
          <option value="auditor">Auditor / Compliance</option>
          <option value="partner">Partner / Vendor</option>
          <option value="other">Other</option>
        </select>
      </div>

      <input
        name="location"
        type="text"
        required
        placeholder="Location (City, Province)"
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/40"
      />

      <select
        name="module"
        required
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#FACC15]/40"
        defaultValue=""
      >
        <option value="" disabled>
          Module
        </option>
        {options.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <textarea
        name="notes"
        rows={3}
        placeholder="Optional: practical note (scope, site count, deadlines)"
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#FACC15]/40"
      />

      <div className="mt-3 grid gap-2">
        <button
          type="submit"
          className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition"
        >
          Submit request
        </button>

        <div className="text-xs text-white/55">
          Or email: <span className="text-white/80">concierge@orbitlink.ca</span>
        </div>
      </div>
    </form>
  );
}