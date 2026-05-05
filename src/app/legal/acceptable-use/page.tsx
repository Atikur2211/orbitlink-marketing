// src/app/legal/acceptable-use/page.tsx

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal/acceptable-use";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Orbitlink acceptable use policy outlining permitted and prohibited use of services, including security, network integrity, abuse prevention, and enforcement.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Acceptable Use Policy | Orbitlink",
    description:
      "Orbitlink acceptable use policy covering service integrity, abuse prevention, prohibited activities, and customer responsibilities.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink Acceptable Use Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acceptable Use Policy | Orbitlink",
    description:
      "Orbitlink acceptable use policy covering permitted use, abuse prevention, and service integrity.",
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

export default function AcceptableUsePage() {
  const lastUpdated = "May 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Acceptable Use Policy"
      subtitle="Rules for responsible use of Orbitlink services, designed to protect customers, network integrity, and business operations."
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
              Service integrity and abuse prevention
            </div>

            <div className="text-xs text-white/55">
              Last updated:{" "}
              <span className="text-white/80">{lastUpdated}</span>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            Responsible use of Orbitlink services
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            This Acceptable Use Policy defines acceptable and prohibited uses of
            services provided by Orbitlink™ (TIRAV Technologies Inc.). It forms
            part of the Orbitlink Service Agreement and supports service
            integrity, network protection, security, and compliance.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="POLICY MODE" value="Carrier-grade protection" />
            <Signal label="PRIMARY PURPOSE" value="Network integrity" />
            <Signal label="ENFORCEMENT" value="Action when misuse occurs" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
            <Section label="1" title="Purpose">
              <p>
                This Acceptable Use Policy (“AUP”) defines acceptable and
                prohibited uses of services provided by Orbitlink™ (TIRAV
                Technologies Inc.) (“Orbitlink”).
              </p>
              <p>
                This AUP forms part of and is incorporated into the Orbitlink
                Service Agreement.
              </p>
              <p>
                For the purposes of this AUP, “Services” means the
                telecommunications services provided by Orbitlink.
              </p>
            </Section>

            <Section label="2" title="Scope">
              <p>
                This AUP applies to all customers, users, and any third parties
                accessing or using Orbitlink services (“Customer”).
              </p>
              <p>
                Customers are responsible for all use of Services under their
                account, including use by employees, contractors, guests, or
                third parties.
              </p>
              <p>
                Customer remains fully responsible for any use of the Services by
                third parties using its account or network, whether authorized or
                unauthorized.
              </p>
            </Section>

            <Section label="3" title="General Use Requirements">
              <p>Customers must:</p>
              <BulletList
                items={[
                  "use Services in compliance with all applicable laws and regulations in Canada",
                  "ensure use does not harm, degrade, or disrupt networks or services",
                  "maintain appropriate security controls over their systems and access credentials",
                  "cooperate with Orbitlink in investigating suspected violations",
                ]}
              />
            </Section>

            <Section label="4" title="Prohibited Activities">
              <p>
                Customers may not use Orbitlink services to engage in, promote,
                or facilitate prohibited activities.
              </p>

              <div>
                <h3 className="font-semibold text-white/85">
                  4.1 Illegal Activity
                </h3>
                <BulletList
                  items={[
                    "any activity that violates applicable laws or regulations",
                    "fraud, identity theft, or financial abuse",
                    "distribution of illegal content",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  4.2 Network Abuse
                </h3>
                <BulletList
                  items={[
                    "actions that interfere with or disrupt network performance",
                    "excessive or abnormal usage that degrades service for others",
                    "denial-of-service (DoS/DDoS) attacks",
                    "unauthorized scanning, probing, or penetration testing",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  4.3 Security Violations
                </h3>
                <BulletList
                  items={[
                    "unauthorized access to systems, networks, or data",
                    "attempting to bypass authentication or security controls",
                    "introducing malware, ransomware, or malicious code",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  4.4 Spam and Messaging Abuse
                </h3>
                <BulletList
                  items={[
                    "sending unsolicited bulk email or spam",
                    "operating open mail relays or bulk messaging systems",
                    "distributing phishing or deceptive communications",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  4.5 Intellectual Property Violations
                </h3>
                <BulletList
                  items={[
                    "infringement of copyrights, trademarks, or other rights",
                    "unauthorized distribution of protected content",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white/85">
                  4.6 Harmful or Abusive Conduct
                </h3>
                <BulletList
                  items={[
                    "harassment, threats, or abuse",
                    "distribution of harmful or offensive material where unlawful",
                    "activities that create legal or reputational risk for Orbitlink",
                  ]}
                />
              </div>
            </Section>

            <Section label="5" title="Network Integrity and Fair Use">
              <p>
                Orbitlink reserves the right to take action where Customer usage:
              </p>
              <BulletList
                items={[
                  "materially impacts network stability or performance",
                  "creates risk to infrastructure or other customers",
                  "exceeds reasonable or expected usage patterns as determined by Orbitlink acting reasonably",
                ]}
              />
            </Section>

            <Section label="6" title="Customer Responsibilities">
              <p>Customers are responsible for:</p>
              <BulletList
                items={[
                  "securing their internal networks and devices",
                  "preventing unauthorized access or misuse",
                  "monitoring usage under their account",
                  "ensuring compliance by all users of their Services",
                ]}
              />
            </Section>

            <Section label="7" title="Enforcement and Remedies">
              <p>
                Orbitlink may, at its sole discretion and without liability to
                Customer:
              </p>
              <BulletList
                items={[
                  "suspend or restrict Services",
                  "block traffic or access",
                  "investigate suspected violations",
                  "terminate Services for serious or repeated violations",
                ]}
              />

              <p>Orbitlink may take immediate action where necessary to:</p>
              <BulletList
                items={[
                  "protect network integrity",
                  "comply with legal obligations",
                  "prevent harm or disruption",
                ]}
              />

              <p>
                Orbitlink may disclose information related to Customer use of the
                Services where required by law, regulation, or lawful request
                from governmental or regulatory authorities.
              </p>

              <p>
                Orbitlink shall not be liable for any damages, losses, or
                consequences arising from actions taken in good faith to enforce
                this AUP.
              </p>
            </Section>

            <Section label="8" title="Reporting Violations">
              <p>Customers must promptly report any:</p>
              <BulletList
                items={[
                  "suspected security incidents",
                  "unauthorized access",
                  "abuse or misuse of Services",
                ]}
              />
              <p>
                Reports can be submitted to{" "}
                <a
                  className="text-[#FDE68A] underline underline-offset-4 transition hover:text-[#FACC15]"
                  href="mailto:abuse@orbitlink.ca"
                >
                  abuse@orbitlink.ca
                </a>
                .
              </p>
            </Section>

            <Section label="9" title="Changes to This Policy">
              <p>Orbitlink may update this AUP from time to time.</p>
              <p>
                Updates will be effective upon posting or reasonable notice to
                Customers.
              </p>
            </Section>

            <Section label="10" title="Relationship to Agreement">
              <p>
                This AUP is incorporated into the Orbitlink Service Agreement.
              </p>
              <p>
                In the event of conflict, the terms of the Service Agreement will
                prevail.
              </p>
            </Section>

            <Section label="11" title="No Obligation to Monitor">
              <p>
                Orbitlink is not obligated to monitor Customer use of the
                Services. However, Orbitlink reserves the right to monitor,
                investigate, or take action where it reasonably believes a
                violation of this AUP has occurred.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}