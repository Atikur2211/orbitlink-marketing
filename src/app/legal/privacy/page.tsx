// src/app/legal/privacy/page.tsx

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal/privacy";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Orbitlink privacy policy explaining how personal information is collected, used, disclosed, retained, and protected in accordance with Canadian privacy laws including PIPEDA.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Privacy Policy | Orbitlink",
    description:
      "How Orbitlink collects, uses, discloses, retains, and protects personal information.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Orbitlink",
    description:
      "How Orbitlink collects, uses, discloses, retains, and protects personal information.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-7">
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

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/55">
        {label}
      </div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  const lastUpdated = "May 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Privacy Policy"
      subtitle="How Orbitlink collects, uses, discloses, retains, and protects personal information in accordance with Canadian privacy laws."
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              PIPEDA-aligned privacy framework
            </div>

            <div className="text-xs text-white/55">
              Last updated:{" "}
              <span className="text-white/80">{lastUpdated}</span>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            Privacy, security, and responsible information handling
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            This Privacy Policy explains how Orbitlink™ (TIRAV Technologies Inc.)
            collects, uses, discloses, retains, and protects personal information
            in connection with our services, website, support, billing, and
            operational workflows.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="LEGAL ALIGNMENT" value="Canadian privacy laws / PIPEDA" />
            <Signal label="DATA POSTURE" value="Limited, practical, service-related" />
            <Signal label="CUSTOMER EXPECTATION" value="No sale of personal information" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
            <Section label="1" title="Introduction">
              <p>
                This Privacy Policy describes how Orbitlink™ (TIRAV Technologies
                Inc.) (“Orbitlink”, “we”, “us”, or “our”) collects, uses,
                discloses, and protects personal information in accordance with
                applicable Canadian privacy laws, including the Personal
                Information Protection and Electronic Documents Act (PIPEDA).
              </p>
              <p>
                This Policy applies to all customers, users, and visitors
                interacting with Orbitlink services, websites, and communications.
              </p>
            </Section>

            <Section label="2" title="Accountability">
              <p>
                Orbitlink is responsible for personal information under its
                control and has designated a Privacy Officer responsible for
                compliance with this Policy and applicable privacy laws.
              </p>
              <p>Contact details are provided in Section 13.</p>
            </Section>

            <Section label="3" title="What Information We Collect">
              <p>
                Orbitlink may collect the following categories of personal
                information:
              </p>

              <div>
                <h3 className="font-semibold text-white/85">3.1 Customer Information</h3>
                <BulletList
                  items={[
                    "name, company name, and contact details",
                    "email address and phone number",
                    "service and billing address",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  3.2 Account & Service Information
                </h3>
                <BulletList
                  items={[
                    "account identifiers",
                    "service configuration details",
                    "IP address allocations, where applicable",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  3.3 Billing & Payment Information
                </h3>
                <BulletList
                  items={[
                    "billing contact details",
                    "transaction records",
                    "payment method information processed via third-party providers",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  3.4 Technical & Usage Information
                </h3>
                <BulletList
                  items={[
                    "network usage data",
                    "service performance metrics",
                    "device and connection information",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  3.5 Website & Communication Data
                </h3>
                <BulletList
                  items={[
                    "website usage data, including cookies and analytics",
                    "communication records, including email and support interactions",
                  ]}
                />
              </div>
            </Section>

            <Section label="4" title="How We Use Personal Information">
              <p>Orbitlink uses personal information for the following purposes:</p>
              <BulletList
                items={[
                  "to provide, activate, and manage services",
                  "to communicate with customers regarding services and support",
                  "to process billing and payments",
                  "to monitor and maintain network performance and security",
                  "to prevent fraud, abuse, or unauthorized use",
                  "to comply with legal and regulatory requirements",
                ]}
              />
              <p>
                Orbitlink limits collection and use to what is necessary for these
                purposes.
              </p>
            </Section>

            <Section label="5" title="Consent">
              <p>
                By using Orbitlink services or providing personal information,
                customers consent to its collection, use, and disclosure as
                described in this Policy.
              </p>
              <p>Where required, Orbitlink will obtain express consent.</p>
              <p>
                Customers may withdraw consent subject to legal or contractual
                restrictions, which may affect service availability.
              </p>
            </Section>

            <Section label="6" title="Disclosure of Personal Information">
              <p>Orbitlink may disclose personal information to:</p>

              <div>
                <h3 className="font-semibold text-white/85">6.1 Service Providers</h3>
                <BulletList
                  items={[
                    "third-party carriers and infrastructure providers",
                    "billing and payment processors",
                    "IT and support vendors",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  6.2 Legal & Regulatory Authorities
                </h3>
                <p>Where required by law or valid legal process, including:</p>
                <BulletList
                  items={[
                    "court orders",
                    "subpoenas",
                    "regulatory requests",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">6.3 Business Transfers</h3>
                <p>In connection with:</p>
                <BulletList
                  items={["mergers", "acquisitions", "sale of assets"]}
                />
              </div>

              <p>Orbitlink does not sell personal information.</p>
            </Section>

            <Section label="7" title="Data Retention">
              <p>
                Orbitlink retains personal information only as long as necessary
                to:
              </p>
              <BulletList
                items={[
                  "fulfill identified purposes",
                  "comply with legal and regulatory requirements",
                  "enforce agreements",
                ]}
              />
              <p>
                Information is securely destroyed or anonymized when no longer
                required.
              </p>
            </Section>

            <Section label="8" title="Safeguards">
              <p>
                Orbitlink uses commercially reasonable administrative, technical,
                and physical safeguards to protect personal information, including:
              </p>
              <BulletList
                items={[
                  "access controls and authentication",
                  "network security monitoring",
                  "encryption where appropriate",
                ]}
              />
              <p>
                No system can be guaranteed fully secure, but Orbitlink takes
                reasonable steps to protect data.
              </p>
              <p>
                Access to personal information is restricted to authorized
                personnel who require it for business purposes.
              </p>
            </Section>

            <Section label="9" title="Customer Responsibilities">
              <p>Customers are responsible for:</p>
              <BulletList
                items={[
                  "maintaining the confidentiality of account credentials",
                  "securing their own systems and devices",
                  "ensuring authorized use of services",
                ]}
              />
            </Section>

            <Section label="10" title="Access, Correction, and Complaints">
              <p>
                Customers may request access to or correction of their personal
                information by contacting Orbitlink’s Privacy Officer.
              </p>
              <p>
                Orbitlink will respond to such requests within a reasonable
                timeframe, generally within thirty (30) days, subject to
                applicable legal limitations.
              </p>
              <p>
                Orbitlink may require verification of identity before providing
                access.
              </p>
              <p>
                Customers may submit complaints regarding the handling of their
                personal information by contacting Orbitlink’s Privacy Officer.
              </p>
              <p>
                Orbitlink will investigate and respond to complaints within a
                reasonable timeframe.
              </p>
              <p>
                If a Customer is not satisfied with the response, they may contact
                the Office of the Privacy Commissioner of Canada.
              </p>
            </Section>

            <Section label="11" title="Cookies and Tracking Technologies">
              <p>Orbitlink may use cookies and similar technologies to:</p>
              <BulletList
                items={[
                  "improve website functionality",
                  "analyze usage patterns",
                  "enhance user experience",
                ]}
              />
              <p>Customers may adjust browser settings to manage cookies.</p>
            </Section>

            <Section label="12" title="Cross-Border Data Transfers">
              <p>
                Personal information may be processed or stored outside of Canada
                by third-party service providers.
              </p>
              <p>
                Such information may be subject to the laws of those jurisdictions.
              </p>
              <p>Orbitlink takes reasonable steps to ensure appropriate protection.</p>
            </Section>

            <Section label="13" title="Contact Information">
              <p>
                For questions, requests, or complaints regarding this Privacy
                Policy or personal information:
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/75">
                <p className="font-semibold text-white/90">Privacy Officer</p>
                <p>Orbitlink™ (TIRAV Technologies Inc.)</p>
                <p>
                  <a className="text-[#FDE68A] hover:text-[#FACC15]" href="mailto:privacy@orbitlink.ca">
                    privacy@orbitlink.ca
                  </a>
                </p>
                <p>
                  <a className="text-[#FDE68A] hover:text-[#FACC15]" href="tel:+18888672480">
                    1-888-867-2480
                  </a>
                </p>
              </div>
            </Section>

            <Section label="14" title="Changes to This Policy">
              <p>Orbitlink may update this Privacy Policy from time to time.</p>
              <p>
                Updates will be effective upon posting or reasonable notice to
                customers.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}