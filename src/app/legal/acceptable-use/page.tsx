import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal/acceptable-use";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Orbitlink",
  description:
    "Orbitlink acceptable use policy outlining permitted and prohibited use of services, including security, abuse prevention, and service integrity.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Acceptable Use Policy | Orbitlink",
    description:
      "Orbitlink acceptable use policy outlining permitted and prohibited use of services, including security, abuse prevention, and service integrity.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink acceptable use policy",
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

function Item({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-white/15 hover:bg-black/25">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/65">{children}</div>
    </div>
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

export default function AcceptableUsePage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Acceptable Use Policy"
      subtitle="A simple policy designed to protect customers, business operations, and service integrity."
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Service integrity and abuse prevention
          </div>

          <h2 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            Misuse is not permitted
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink’s site and services may not be used to harm others, interfere with
            business operations, attempt unauthorized access, distribute malicious content,
            or submit false or misleading requests. Access or service may be restricted,
            suspended, or denied where misuse, abuse, or fraud risk is identified.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="POLICY MODE" value="Business-first and protective" />
            <Signal label="PRIMARY PURPOSE" value="Service integrity and safety" />
            <Signal label="ENFORCEMENT" value="Restriction or suspension when required" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Item title="Unauthorized access">
              Attempts to probe, scan, test, exploit, or access systems, accounts, services,
              or data without authorization are prohibited.
            </Item>

            <Item title="Abuse and disruption">
              Activities intended to disrupt service, degrade performance, overload systems,
              interfere with other users, or harass individuals are prohibited.
            </Item>

            <Item title="Fraud and deception">
              Submitting false identity information, impersonation, misleading business claims,
              or deceptive commercial requests is prohibited.
            </Item>

            <Item title="Malicious content">
              Uploading, transmitting, or linking to malware, harmful code, phishing material,
              or other payloads designed to compromise systems or devices is prohibited.
            </Item>

            <Item title="Improper use of network or service resources">
              Use of the site or services in a way that creates unreasonable operational risk,
              bypasses intended controls, or undermines service integrity is prohibited.
            </Item>

            <Item title="Illegal or harmful activity">
              Use connected to unlawful conduct, harmful activity, or actions that expose
              Orbitlink, customers, or partners to avoidable risk is prohibited.
            </Item>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              ENFORCEMENT POSTURE
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Orbitlink may investigate misuse, reject requests, restrict access, suspend
              service interactions, or take other appropriate protective action where abuse,
              fraud, unauthorized activity, or operational risk is reasonably suspected.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/62">
              This policy supports customer protection, service continuity, and the integrity
              of Orbitlink’s operating environment.
            </p>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              QUESTIONS OR REVIEW REQUESTS
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              If you believe access was restricted incorrectly, or you need clarification
              regarding this policy, contact:
            </p>

            <a
              className="mt-3 inline-flex text-sm text-white/85 transition hover:text-white underline underline-offset-4"
              href="mailto:concierge@orbitlink.ca"
            >
              concierge@orbitlink.ca
            </a>

            <p className="mt-4 text-xs leading-5 text-white/52">
              Orbitlink is a brand of TIRAV Technologies Inc. This policy may be updated as
              services, legal requirements, and operational controls evolve.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}