// src/app/legal/terms/page.tsx
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal/terms";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Terms of Use | Orbitlink",
  description:
    "Orbitlink terms of use outlining site conditions, acceptable use, limitations, and legal responsibilities for visitors and businesses.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Terms of Use | Orbitlink",
    description:
      "Orbitlink terms of use outlining site conditions, acceptable use, limitations, and legal responsibilities for visitors and businesses.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink Terms of Use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Orbitlink",
    description:
      "Orbitlink terms of use outlining site conditions, acceptable use, and responsibilities.",
    images: [`${SITE_URL}/twitter-image`],
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
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
        {label}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white/90 sm:text-xl">
        {title}
      </h2>

      <div className="mt-3 space-y-3 text-sm leading-6 text-white/70 sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function Signal({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

export default function TermsPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Terms of Use"
      subtitle="Rules for using the Orbitlink site, written to be clear, practical, and operationally realistic."
    >
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Site terms and use conditions
          </div>

          <div className="text-xs text-white/55">
            Last updated: <span className="text-white/80">{lastUpdated}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[30px]">
            Clear terms for a controlled business-facing site
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            These terms explain the basic conditions for using the Orbitlink website.
            They are intended to support a clear, business-readable, and operationally
            realistic understanding of how the site may be used.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="SITE PURPOSE" value="Information and controlled intake" />
            <Signal label="USE EXPECTATION" value="Lawful and responsible use" />
            <Signal label="OPERATING POSTURE" value="Clear and practical" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
          <Block label="1" title="About Orbitlink">
            <p>
              Orbitlink is a brand of{" "}
              <span className="text-white/85">TIRAV Technologies Inc.</span>. This
              website provides product information, trust and legal disclosures, and
              controlled intake paths for prospective customers and business enquiries.
            </p>
          </Block>

          <Block label="2" title="Acceptance of these terms">
            <p>
              By accessing or using this website, you agree to these Terms of Use and
              any related legal notices published on the site. If you do not agree,
              you should not use the website.
            </p>
          </Block>

          <Block label="3" title="Permitted use">
            <p>
              You may use this website for lawful informational purposes, to review
              Orbitlink services, and to submit legitimate business enquiries.
            </p>
            <p>
              You may not use the site in a way that interferes with its operation,
              attempts unauthorized access, scrapes restricted areas, or misrepresents
              identity, intent, or affiliation.
            </p>
          </Block>

          <Block label="4" title="No guarantee of service availability">
            <p>
              Information on this website does not guarantee that a service is available
              at any specific address or building. Availability depends on feasibility,
              network conditions, upstream access, property requirements, and commercial review.
            </p>
          </Block>

          <Block label="5" title="Quotes, pricing, and service information">
            <p>
              Any pricing, examples, package descriptions, or service references shown
              on this site are for general information only unless explicitly confirmed
              in writing by Orbitlink.
            </p>
            <p>
              Final pricing, scope, lead times, and service terms may vary by address,
              building conditions, access method, and project requirements.
            </p>
          </Block>

          <Block label="6" title="Acceptable conduct">
            <p>
              You agree not to use the site to submit false requests, transmit malicious
              code, harvest data, test vulnerabilities without authorization, or engage
              in abusive, unlawful, or disruptive behavior.
            </p>
          </Block>

          <Block label="7" title="Intellectual property">
            <p>
              Unless otherwise stated, the content, branding, layout, graphics, copy,
              and design elements on this site are owned by Orbitlink or used with permission.
            </p>
            <p>
              You may not copy, reproduce, republish, or distribute site materials for
              commercial use without prior written permission.
            </p>
          </Block>

          <Block label="8" title="Third-party services and links">
            <p>
              This website may reference or link to third-party tools, carriers, vendors,
              or platforms. Orbitlink is not responsible for third-party websites, policies,
              availability, or content outside its direct control.
            </p>
          </Block>

          <Block label="9" title="No warranty">
            <p>
              This site is provided on an “as is” and “as available” basis. While Orbitlink
              aims to keep information clear and current, it does not guarantee that the site
              will always be uninterrupted, error-free, or complete.
            </p>
          </Block>

          <Block label="10" title="Limitation of liability">
            <p>
              To the maximum extent permitted by law, Orbitlink will not be liable for
              indirect, incidental, consequential, or special damages arising from use of,
              or inability to use, this website.
            </p>
          </Block>

          <Block label="11" title="Privacy and submitted information">
            <p>
              Information submitted through forms or intake paths is handled in accordance
              with Orbitlink’s privacy posture and related notices published on the site.
            </p>
            <p>
              You should only submit information that is accurate, relevant, and appropriate
              for a business enquiry or service review.
            </p>
          </Block>

          <Block label="12" title="Changes to the site or terms">
            <p>
              Orbitlink may update, revise, suspend, or remove website content or these
              Terms of Use at any time without prior notice. Updated terms become effective
              when posted.
            </p>
          </Block>

          <Block label="13" title="Governing law">
            <p>
              These terms are governed by the laws of Ontario and the applicable laws of
              Canada, without regard to conflict of law principles.
            </p>
          </Block>

          <Block label="14" title="Contact">
            <p>
              For questions about these Terms of Use, contact Orbitlink through the
              official contact methods listed on the website.
            </p>
          </Block>
        </div>
      </div>
    </PageShell>
  );
}