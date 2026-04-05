// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import PageShell from "@/components/PageShell";
import IntakeStatusBanner from "@/components/IntakeStatusBanner";
import ContactIntakeForm from "@/components/ContactIntakeForm";
import { SERVICE_CATALOG } from "@/lib/siteStatus";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/contact`;
const PHONE_E164 = "+18888672480";
const PHONE_DISPLAY = "1-888-867-2480";

export const metadata: Metadata = {
  title: "Check Availability & Pricing | Orbitlink Business Internet",
  description:
    "Tell us your business address. We’ll check availability, pricing, and the best internet option for your location.",
  alternates: { canonical: PAGE_URL },
};

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
      {children}
    </div>
  );
}

export default function ContactPage() {
  const moduleOptions = SERVICE_CATALOG.map((s) => s.publicLabel);

  return (
    <PageShell
      eyebrow="CHECK AVAILABILITY"
      title="Tell us your address. We’ll check what’s available."
      subtitle="Business fibre, dedicated internet, managed Wi-Fi, voice, and backup connectivity — matched to your location."
      pills={[
        "Business-only service",
        "Address-based review",
        "Clear next step",
      ]}
      actions={[
        { label: "Check Availability", href: "#intake", variant: "primary" },
        { label: "Call Now", href: `tel:${PHONE_E164}`, variant: "secondary" },
      ]}
    >
      {/* MAIN INTRO */}
      <Section>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-white">
            Start your availability check
          </h2>

          <p className="mt-3 text-sm text-white/70">
            Enter your business address and what you need. We’ll confirm availability,
            pricing direction, and the best setup for your location.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
            <span>✔ Offices</span>
            <span>✔ Clinics</span>
            <span>✔ Warehouses</span>
            <span>✔ Multi-location businesses</span>
          </div>
        </div>
      </Section>

      {/* FORM */}
      <Section id="intake">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-white">
            Enter your details
          </h2>

          <p className="mt-2 text-sm text-white/65">
            Takes less than 60 seconds.
          </p>
        </div>

        <div className="mt-5">
          <Suspense fallback={null}>
            <IntakeStatusBanner />
          </Suspense>
        </div>

        <div className="mt-6">
          <ContactIntakeForm moduleOptions={moduleOptions} />
        </div>

        <p className="mt-4 text-xs text-white/50">
          Tip: Include full address and service type for faster response.
        </p>
      </Section>

      {/* WHAT HAPPENS NEXT */}
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-white">
            What happens next
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 p-4 text-sm text-white/70">
              <strong className="text-white">1. We check your address</strong>
              <div className="mt-2">
                Available providers, building access, and infrastructure.
              </div>
            </div>

            <div className="rounded-xl border border-white/10 p-4 text-sm text-white/70">
              <strong className="text-white">2. Match the right service</strong>
              <div className="mt-2">
                Fibre, dedicated internet, Wi-Fi, voice, or backup.
              </div>
            </div>

            <div className="rounded-xl border border-white/10 p-4 text-sm text-white/70">
              <strong className="text-white">3. You get next steps</strong>
              <div className="mt-2">
                Pricing direction, availability, or install path.
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* DIRECT CONTACT */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Prefer to speak directly?
            </h2>

            <div className="mt-5 space-y-3">
              <a
                href={`tel:${PHONE_E164}`}
                className="block rounded-xl border border-white/10 p-4 hover:bg-white/5"
              >
                Call {PHONE_DISPLAY}
              </a>

              <a
                href="mailto:concierge@orbitlink.ca"
                className="block rounded-xl border border-white/10 p-4 hover:bg-white/5"
              >
                concierge@orbitlink.ca
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              What should you include?
            </h2>

            <div className="mt-5 space-y-3 text-sm text-white/70">
              <div>• Full business address</div>
              <div>• Type of service needed</div>
              <div>• Timeline (if any)</div>
              <div>• Current issues (optional)</div>
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Ready to check availability?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Submit your address and we’ll guide the next step clearly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#intake"
              className="rounded-xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black"
            >
              Check Availability
            </a>

            <Link
              href="/services"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm text-white"
            >
              View Services
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}