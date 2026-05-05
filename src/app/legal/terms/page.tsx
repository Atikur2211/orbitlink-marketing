// src/app/legal/terms/page.tsx

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal/terms";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Orbitlink terms of use outlining website conditions, acceptable use, limitations of liability, and legal responsibilities.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Terms of Use | Orbitlink",
    description:
      "Website terms of use outlining conditions, limitations, and responsibilities.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
  },
};

function Block({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
        {label}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white/90">{title}</h2>

      <div className="mt-3 space-y-3 text-sm leading-6 text-white/70">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  const lastUpdated = "May 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Terms of Use"
      subtitle="Conditions for using the Orbitlink website and interacting with its services."
    >
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-7 lg:p-8">

        <div className="flex justify-between text-xs text-white/55 mb-6">
          <span>Website use terms</span>
          <span>Last updated: {lastUpdated}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">

          <Block label="1" title="About Orbitlink">
            Orbitlink™ is a brand of TIRAV Technologies Inc. This website provides
            service information, legal disclosures, and controlled intake paths
            for business enquiries.
          </Block>

          <Block label="2" title="Acceptance of Terms">
            By accessing or using this website, you agree to these Terms of Use.
            If you do not agree, you should not use the website.
          </Block>

          <Block label="3" title="Permitted Use">
            You may use this website for lawful informational purposes and to
            submit legitimate business enquiries. You may not interfere with site
            operation, attempt unauthorized access, or misrepresent identity.
          </Block>

          <Block label="4" title="No Guarantee of Service Availability">
            Information on this site does not guarantee service availability at
            any address. Availability is subject to feasibility, infrastructure,
            and commercial validation.
          </Block>

          <Block label="5" title="Quotes and Pricing">
            Any pricing or service descriptions are for general information only
            unless formally confirmed in writing. Final terms depend on location,
            infrastructure, and service configuration.
          </Block>

          <Block label="6" title="Acceptable Conduct">
            You agree not to submit false requests, distribute malicious content,
            test vulnerabilities, or engage in unlawful or disruptive behavior.
          </Block>

          <Block label="7" title="Intellectual Property">
            All content, branding, and design are owned by Orbitlink or used with
            permission. Unauthorized reproduction or distribution is prohibited.
          </Block>

          <Block label="8" title="Third-Party Services">
            Orbitlink is not responsible for third-party platforms, carriers, or
            services referenced on this site.
          </Block>

          <Block label="9" title="No Warranty">
            This website is provided “as is” and “as available” without warranty
            of accuracy, completeness, or uninterrupted operation.
          </Block>

          <Block label="10" title="Limitation of Liability">
            To the maximum extent permitted by law, Orbitlink is not liable for
            indirect, incidental, or consequential damages arising from use of
            this website.
          </Block>

          <Block label="11" title="Relationship to Service Agreement">
            These Terms of Use apply to website usage only. Any telecommunications
            services provided by Orbitlink are governed exclusively by the
            Orbitlink Service Agreement, including its SLA, Acceptable Use Policy,
            and Privacy Policy.
          </Block>

          <Block label="12" title="Privacy">
            Information submitted through this site is handled in accordance with
            the Orbitlink Privacy Policy.
          </Block>

          <Block label="13" title="Changes to Terms">
            Orbitlink may update these Terms at any time. Changes are effective
            upon posting.
          </Block>

          <Block label="14" title="Governing Law">
            These terms are governed by the laws of Ontario and applicable
            Canadian law.
          </Block>

          <Block label="15" title="Contact">
            For questions, contact:
            <br />
            concierge@orbitlink.ca
          </Block>

        </div>
      </div>
    </PageShell>
  );
}