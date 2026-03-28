import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const PAGE_URL = `${SITE_URL}/`;

export const metadata: Metadata = {
  title: "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink",
  description:
    "Business fibre internet, dedicated internet access, managed Wi-Fi, and backup connectivity for Ontario businesses.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed Wi-Fi, and backup connectivity for Ontario businesses.",
    url: PAGE_URL,
    siteName: "Orbitlink",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet for Ontario businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink",
    description:
      "Business fibre internet, dedicated internet access, managed Wi-Fi, and backup connectivity for Ontario businesses.",
    images: [`${SITE_URL}/twitter-image`],
  },
};

function GlowCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#FACC15]/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          {eyebrow}
        </div>
        <h3 className="mt-3 text-base font-medium text-white/92">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/64">{body}</p>
      </div>
    </div>
  );
}

function MinimalStep({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
        {index}
      </div>
      <h3 className="mt-4 text-sm font-medium text-white/92">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/64">{body}</p>
    </div>
  );
}

function ProofPill({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-white/70 sm:text-xs">
      {text}
    </div>
  );
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Orbitlink",
    legalName: "TIRAV Technologies Inc.",
    url: PAGE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: "+18888672480",
    email: "concierge@orbitlink.ca",
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 Eglinton Ave W, Suite 400-A77",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      postalCode: "L5R 3E7",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ontario, Canada",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Orbitlink Business Internet & Managed Network Services",
    provider: { "@id": `${SITE_URL}/#org` },
    serviceType: [
      "Business Fibre Internet",
      "Dedicated Internet Access",
      "Managed Wi-Fi",
      "Business VoIP",
      "LTE and 5G Backup Connectivity",
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ontario, Canada" },
      { "@type": "City", name: "Mississauga" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Brampton" },
      { "@type": "City", name: "Vaughan" },
    ],
  };

  return (
    <main className="min-h-screen bg-[#06080C] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <TopNav />
      <StickyStatusStrip />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-business-ontario.jpg"
            alt="Modern Ontario business environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[74%_center] sm:object-[68%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.30)_0%,rgba(4,7,12,0.54)_34%,rgba(4,7,12,0.86)_72%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.92)_0%,rgba(4,7,12,0.60)_34%,rgba(4,7,12,0.12)_66%,rgba(4,7,12,0.74)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(250,204,21,0.08),transparent_25%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.10),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:58px_58px]" />
        </div>

        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 pb-12 pt-28 sm:px-7 sm:pt-24 lg:min-h-[92vh] lg:px-10 lg:pb-16 lg:pt-20">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/76 backdrop-blur sm:text-xs">
              Business Connectivity • Ontario
            </div>

            <h1 className="mt-6 max-w-4xl text-[2.2rem] font-semibold leading-[0.98] tracking-tight sm:text-[3.2rem] lg:text-[4.5rem] xl:text-[5.2rem]">
              Internet that actually fits your business
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/82 sm:text-[1.08rem]">
              Not packages. Not guesses. Your building, your workload, and your
              operational needs — reviewed properly before you commit.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Mississauga",
                "Toronto",
                "Brampton",
                "Vaughan",
                "Ontario-wide",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/68 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Check Availability
              </Link>

              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-6 py-3 text-sm transition hover:bg-white/10"
              >
                Request Pricing
              </Link>

              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-6 py-3 text-sm transition hover:bg-white/10"
              >
                Compare Options
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Business-only • No obligation • Clear answer
            </div>

            <div className="mt-6 text-xs text-white/42">
              Operated by TIRAV Technologies Inc. • CRTC-registered reseller
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-7 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            BUILT FOR REAL BUSINESS ENVIRONMENTS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
            Less brochure. More buyer clarity.
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Fast visual scanning. Clear commercial language. Stronger confidence
            before enquiry.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <GlowCard
            eyebrow="01"
            title="Fibre Internet"
            body="High-capacity access for office, clinical, and commercial use."
          />
          <GlowCard
            eyebrow="02"
            title="Dedicated Internet"
            body="Higher-assurance service for uptime-sensitive operations."
          />
          <GlowCard
            eyebrow="03"
            title="Managed Wi-Fi"
            body="Internal wireless performance aligned to actual device demand."
          />
          <GlowCard
            eyebrow="04"
            title="Backup Connectivity"
            body="Secondary path planning when continuity matters."
          />
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <p className="max-w-3xl text-sm leading-6 text-white/68">
            Every recommendation is based on your address, infrastructure,
            provider reach, and how the site actually operates.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-7 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              WHY BUYERS REACH OUT
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
              The usual problem is not speed. It is fit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Businesses often end up on the wrong service path for their building,
              internal layout, backup needs, or workload profile.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Connection slows down when usage rises",
              "Wireless coverage inside the unit is inconsistent",
              "Current service is not aligned to the environment",
              "A backup path is needed for continuity",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-black/20 p-5 text-sm text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-7 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            HOW IT WORKS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
            A simple path from address to recommendation
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <MinimalStep
            index="1"
            title="Submit your address"
            body="Share the location and what the connection needs to support."
          />
          <MinimalStep
            index="2"
            title="We review options"
            body="We assess infrastructure, provider paths, and continuity fit."
          />
          <MinimalStep
            index="3"
            title="Receive direction"
            body="You get a clear next step, not a generic package."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-7 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              TRUST
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
              Clear posture. Cleaner buying decision.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Orbitlink provides structured, transparent recommendations so buyers
              understand availability, limitations, and next steps before committing.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <ProofPill text="Operated by TIRAV Technologies Inc." />
            <ProofPill text="CRTC-registered reseller" />
            <ProofPill text="Address-reviewed availability" />
            <ProofPill text="Documented commercial posture" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-7 lg:px-10">
        <div className="rounded-[32px] border border-[#FACC15]/15 bg-[#FACC15]/[0.06] p-6 text-center sm:p-8 lg:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-[11px] tracking-[0.28em] text-[#FDE68A]">
              READY TO REVIEW YOUR OPTIONS?
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
              Stop guessing your internet setup
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-[15px]">
              Most businesses are on the wrong connection for their workload.
              We fix that.
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact#intake"
              className="rounded-2xl bg-[#FACC15] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Get a Clear Recommendation
            </Link>

            <Link
              href="/contact#intake"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm transition hover:bg-white/10"
            >
              Request Pricing
            </Link>
          </div>
        </div>
      </section>

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}