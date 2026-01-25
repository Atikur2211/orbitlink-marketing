// src/app/coming-soon/page.tsx
import PageShell from "@/components/PageShell";
import WaitlistBanner from "@/components/WaitlistBanner";
import { MODULE_SPECS } from "@/lib/siteStatus";
import { Suspense } from "react";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      {children}
    </span>
  );
}

export default function ComingSoonPage() {
  const moduleOptions = MODULE_SPECS.map((m) => m.name);

  return (
    <PageShell
      eyebrow="SOFT LAUNCH"
      title="Controlled onboarding intake"
      subtitle="Requests are reviewed for fit, readiness, and location. No mass signups."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* LEFT: posture + expectations */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.22em] text-white/55">ROLLOUT</div>
          <div className="mt-3 text-sm text-white/90 font-medium">
            Sequenced intake — enterprise posture
          </div>

          <p className="mt-4 text-sm leading-6 text-white/65">
            We onboard in controlled windows as operational and regulatory milestones complete.
            If your profile fits the next window, you’ll receive a single response with next steps.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">WHO THIS IS FOR</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>Enterprise Internet</Pill>
              <Pill>ISP / Operator</Pill>
              <Pill>Auditor / Compliance</Pill>
              <Pill>Regulator-safe rollout</Pill>
            </div>

            <div className="mt-4 text-xs text-white/55">
              We keep public statements conservative — we only confirm what is implemented and verifiable.
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">YOU’LL GET</div>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>• One reply when your intake window opens</li>
              <li>• A short readiness checklist</li>
              <li>• A controlled go-live coordination path</li>
            </ul>
          </div>
        </div>

        {/* RIGHT: structured intake form */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                EARLY ACCESS REQUEST
              </div>
              <div className="mt-3 text-sm text-white/90 font-medium">
                Request an intake slot
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                One submission. One response when your profile fits the next window.
              </p>
            </div>

            <div className="hidden sm:block shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-[11px] tracking-[0.22em] text-white/55">POSTURE</div>
              <div className="mt-1 text-sm text-white/80">Controlled • Verified • Minimal</div>
            </div>
          </div>

          {/* Banner */}
          <div className="mt-5">
            <Suspense fallback={null}>
              <WaitlistBanner />
            </Suspense>
          </div>

          {/* Form */}
          <form className="mt-4 grid gap-3" action="/api/waitlist" method="post">
            {/* Funnel */}
            <input type="hidden" name="source" value="coming-soon" />
            <input type="hidden" name="intent" value="early-access" />
            <input type="hidden" name="returnTo" value="/coming-soon" />
            
            {/* Honeypot */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="mt-1 text-[11px] tracking-[0.28em] text-white/55">
              DETAILS
            </div>

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
              {moduleOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {/* Optional notes (kept small + luxury) */}
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

          {/* Status */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">STATUS</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                Intake: <span className="text-white/60">Limited</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                Rollout: <span className="text-white/60">Sequenced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
