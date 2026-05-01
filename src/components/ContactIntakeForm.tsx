"use client";

import { useMemo, useState } from "react";
import TrackedLink from "@/components/TrackedLink";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

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

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30";

const textareaClassName =
  "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-[#FACC15]/40 focus:bg-black/30";

function StepBadge({ step }: { step: number }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between text-xs text-white/55">
        <span>Step {step} of 3</span>
        <span>
          {step === 1
            ? "Address"
            : step === 2
              ? "Contact"
              : "Service need"}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#FACC15] transition-all"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function ContactIntakeForm({
  moduleOptions,
}: {
  moduleOptions: string[];
}) {
  const [step, setStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const [businessAddress, setBusinessAddress] = useState("");
  const [city, setCity] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const options = useMemo(
    () =>
      moduleOptions.map((value) => ({
        value,
        label: normalizeServiceLabel(value),
      })),
    [moduleOptions]
  );

  function startTracking() {
    if (hasStarted) return;

    setHasStarted(true);

    trackFormStart({
      location: "contact_page",
      form: "contact_intake_multistep",
      serviceType: selectedService || undefined,
    });
  }

  function goToStep(nextStep: number) {
    startTracking();
    setStep(nextStep);
  }

  function handleSubmit() {
    trackFormSubmit({
      location: "contact_page",
      form: "contact_intake_multistep",
      serviceType: selectedService || undefined,
    });
  }

  const canContinueStep1 = businessAddress.trim().length >= 5;
  const canContinueStep2 =
    fullName.trim().length >= 2 &&
    email.trim().includes("@") &&
    company.trim().length >= 2;

  return (
    <form
      className="mt-4 grid gap-5"
      action="/api/waitlist"
      method="post"
      onFocus={startTracking}
      onSubmit={handleSubmit}
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

      <StepBadge step={step} />

      {step === 1 ? (
        <div className="grid gap-5">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-[#FDE68A]">
              START WITH ADDRESS
            </div>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              What business address should we check?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/62">
              Start with the location. We’ll review what is actually available
              before asking for the full project details.
            </p>
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="location">Business address</FieldLabel>
            <input
              id="location"
              name="location"
              type="text"
              required
              autoComplete="street-address"
              placeholder="Street address, city, province"
              value={businessAddress}
              onChange={(event) => setBusinessAddress(event.target.value)}
              className={inputClassName}
            />
            <FieldHint>
              Use the exact service address for the best availability review.
            </FieldHint>
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="city" optional>
              City
            </FieldLabel>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="Toronto, Mississauga, Brampton..."
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/65">
            No obligation. No sales pressure. This starts with an address-based
            business connectivity review.
          </div>

          <button
            type="button"
            disabled={!canContinueStep1}
            onClick={() => goToStep(2)}
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next — Check This Address
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-[#FDE68A]">
              CONTACT DETAILS
            </div>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              Who should we send the result to?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/62">
              Add your contact details so we can respond with availability,
              pricing direction, or the best next step.
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
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className={inputClassName}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClassName}
              />
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
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className={inputClassName}
              />
            </div>

            <div className="grid gap-2">
              <FieldLabel htmlFor="phone" optional>
                Phone
              </FieldLabel>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Business phone"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/10 sm:w-1/2"
            >
              Back
            </button>

            <button
              type="button"
              disabled={!canContinueStep2}
              onClick={() => goToStep(3)}
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047] disabled:cursor-not-allowed disabled:opacity-45 sm:w-1/2"
            >
              Next — Service Need
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-5">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-[#FDE68A]">
              SERVICE NEED
            </div>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              What do you need for this location?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/62">
              Choose the main service. You can add any technical notes or timing
              details below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <FieldLabel htmlFor="module">Service needed</FieldLabel>
              <select
                id="module"
                name="module"
                required
                defaultValue=""
                className={inputClassName}
                onChange={(event) => setSelectedService(event.target.value)}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <FieldLabel htmlFor="timeline" optional>
                Timeline
              </FieldLabel>
              <select
                id="timeline"
                name="timeline"
                defaultValue=""
                className={inputClassName}
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
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="notes" optional>
              Project details
            </FieldLabel>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Example: office move, unstable Bell connection, need fibre + managed Wi-Fi, static IPs, or backup internet."
              className={textareaClassName}
            />
            <FieldHint>
              Mention fibre, Wi-Fi, voice, static IPs, backup, install window,
              or landlord coordination if relevant.
            </FieldHint>
          </div>

          <div className="rounded-[22px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-4 text-sm leading-6 text-white/72">
            You’ll receive availability direction, pricing guidance, or the
            clearest next step for the site.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/10 sm:w-1/2"
            >
              Back
            </button>

            {/* Persist previous step data */}
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="fullName" value={fullName} />
            <input type="hidden" name="company" value={company} />
            <input type="hidden" name="location" value={businessAddress} />
            <input type="hidden" name="city" value={city} />

            <button
              type="submit"
              className="rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047] sm:w-1/2"
            >
              Check Availability & Pricing
            </button>
          </div>

          <div className="text-center text-xs text-white/55">
            Prefer email?{" "}
            <TrackedLink
              href="mailto:concierge@orbitlink.ca"
              eventName="email_click"
              location="contact_form"
              cta="form_concierge_email"
              className="text-white/80 transition hover:text-white"
            >
              concierge@orbitlink.ca
            </TrackedLink>
          </div>

          <TrackedLink
            href="tel:+18888672480"
            eventName="phone_click"
            location="contact_form"
            cta="form_phone_cta"
            className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Or call 1-888-867-2480
          </TrackedLink>
        </div>
      ) : null}
    </form>
  );
}