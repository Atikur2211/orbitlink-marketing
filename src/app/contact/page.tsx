// src/app/contact/page.tsx
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

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{eyebrow}</div>
      <div className="mt-3 text-sm text-white/90 font-medium">{title}</div>
      <div className="mt-4 text-sm leading-6 text-white/65">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  const moduleOptions = MODULE_SPECS.map((m) => m.name);

  return (
    <PageShell
      eyebrow="CONTACT"
      title="Sales & onboarding"
      subtitle="Enterprise-first intake. Scope-led qualification, disciplined onboarding, and controlled rollout posture."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* LEFT: posture + contact */}
        <div className="space-y-4 sm:space-y-5">
          <Card eyebrow="CONCIERGE DESK" title="Enterprise Client Care">
            <p>
              For sales, provisioning coordination, and operational planning. We respond with a
              single, actionable path based on fit and serviceability.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Controlled rollout</Pill>
              <Pill>Scope-locked commitments</Pill>
              <Pill>Regulator-aware posture</Pill>
              <Pill>Enterprise onboarding</Pill>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  • Concierge: <span className="text-white/85">concierge@orbitlink.ca</span>
                </li>
                <li>
                  • Sales: <span className="text-white/85">sales@orbitlink.ca</span>
                </li>
                <li>
                  • Client Care: <span className="text-white/85">1-888-8-ORBIT-0</span>
                </li>
                <li>
                  • Hours: <span className="text-white/85">Mon–Fri, 9AM–6PM ET</span>
                </li>
              </ul>
            </div>

            <p className="mt-4 text-xs text-white/55">
              We publish conservatively and confirm scope only when verifiable.
            </p>
          </Card>

          <Card eyebrow="WHAT TO INCLUDE" title="High-signal details (fastest response)">
            <ul className="space-y-2 text-sm text-white/65">
              <li>• Site location (city + province)</li>
              <li>• Module (Internet / Voice / Smart / Horizon)</li>
              <li>• Site count + timeline (if any)</li>
              <li>• Constraints (handoff, static IP, SLA needs)</li>
            </ul>
            <p className="mt-4 text-xs text-white/55">
              Clear inputs → faster qualification → cleaner go-live.
            </p>
          </Card>
        </div>

        {/* RIGHT: intake form */}
        <div
          className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7"
          id="intake"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/55">INTAKE FORM</div>
              <div className="mt-3 text-sm text-white/90 font-medium">Request onboarding</div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                One submission. One response when your request matches an active intake window.
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
          <form
            className="mt-4 grid gap-3"
            action="/api/waitlist"
            method="post"
            onSubmit={() => {
              window.gtag?.("event", "lead_submit", {
                location: "contact_page",
                module: "onboarding",
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
              {moduleOptions.map((name) => (
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

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="text-[11px] tracking-[0.22em] text-white/55">STATUS</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                Intake: <span className="text-white/60">Open</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                Rollout: <span className="text-white/60">Controlled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
