import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://orbitlink.ca";
const PAGE_PATH = "/legal/terms";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Terms of Use",
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
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
        {label}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white/90 sm:text-xl">
        {title}
      </h2>

      <div className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
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
              Site terms and use conditions
            </div>

            <div className="text-xs text-white/55">
              Last updated: <span className="text-white/80">{lastUpdated}</span>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
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

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
            <Block label="1" title="About Orbitlink">
              <p>
                Orbitlink is a brand of{" "}
                <span className="text-white/85">TIRAV Technologies Inc.</span>. This
                website provides product information, trust and legal disclosures, and
                controlled intake paths for prospective customers and business enquiries.
              </p>
            </Block>

            {/* rest of your blocks remain unchanged */}
          </div>
        </div>
      </div>
    </PageShell>
  );
}