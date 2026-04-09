import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Policies & Legal",
  description:
    "Orbitlink legal and policy pages including privacy, terms, acceptable use, and cookies. Clear, business-readable documents for buyers and stakeholders.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Policies & Legal | Orbitlink",
    description:
      "Orbitlink legal and policy pages including privacy, terms, acceptable use, and cookies. Clear, business-readable documents for buyers and stakeholders.",
    url: PAGE_URL,
    type: "website",
    siteName: "Orbitlink",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink Legal & Policies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Policies & Legal | Orbitlink",
    description:
      "Orbitlink legal and policy pages including privacy, terms, acceptable use, and cookies.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

function Card({
  href,
  label,
  title,
  desc,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[32px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            {label}
          </div>

          <div className="mt-4 text-lg font-semibold text-white/90 sm:text-xl">
            {title}
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-[15px]">
            {desc}
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/60 transition group-hover:border-white/15 group-hover:text-white/80">
          Open
        </div>
      </div>
    </Link>
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

export default function LegalIndexPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Policies & Legal"
      subtitle="Clear terms. Minimal ambiguity. Written for enterprise-grade operations without overclaiming."
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
            Legal and policy index
          </div>

          <h2 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            A clearer legal surface for buyers, reviewers, and stakeholders
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            This section brings together the core Orbitlink legal and policy documents in one
            place. Each page is designed to be readable, commercially clear, and aligned with
            Orbitlink’s disclosure-first operating posture.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="DOCUMENT STYLE" value="Clear and business-readable" />
            <Signal label="PRIMARY PURPOSE" value="Clarity and operational hygiene" />
            <Signal label="BRAND POSTURE" value="Controlled and disclosure-first" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            <Card
              href="/legal/privacy"
              label="PRIVACY"
              title="Privacy Policy"
              desc="How Orbitlink collects, uses, and protects information submitted through the site and controlled intake workflows."
            />
            <Card
              href="/legal/terms"
              label="TERMS"
              title="Terms of Use"
              desc="Rules for using the Orbitlink website, including disclaimers, acceptable conduct, and limitation language."
            />
            <Card
              href="/legal/acceptable-use"
              label="ACCEPTABLE USE"
              title="Acceptable Use Policy"
              desc="Defines prohibited behaviour and misuse to protect service integrity, customers, and operational posture."
            />
            <Card
              href="/legal/cookies"
              label="COOKIES"
              title="Cookies & Analytics"
              desc="Explains cookie usage, analytics posture, and visitor controls."
            />
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            These pages are intended to support buyer clarity, legal readability, and a more
            disciplined public-facing operating surface.
          </p>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              REGULATORY-SAFE NOTE
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
              Orbitlink is a brand of <span className="text-white/85">TIRAV Technologies Inc.</span>.
              Service availability, onboarding posture, and product status may change as
              operational and regulatory milestones complete.
            </p>
            <p className="mt-3 text-xs leading-5 text-white/52">
              Legal and policy pages are written to remain commercially clear, operationally
              realistic, and aligned with Orbitlink’s disclosure-first posture.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}