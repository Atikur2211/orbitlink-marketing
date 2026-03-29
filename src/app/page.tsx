import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const LEGAL_NAME = "TIRAV Technologies Inc.";
const CANONICAL_URL = `${SITE_URL}/`;

const SITE_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and backup connectivity for Ontario businesses.";

const OG_TITLE =
  "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink";

const OG_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and backup connectivity for Ontario businesses.";

const TWITTER_DESC =
  "Business fibre internet, dedicated internet access, managed Wi-Fi, voice, and backup connectivity for Ontario businesses.";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

export const metadata: Metadata = {
  title: OG_TITLE,
  description: SITE_DESC,
  keywords: [
    "business fibre internet ontario",
    "dedicated internet access ontario",
    "business internet mississauga",
    "business internet toronto",
    "business internet brampton",
    "business internet vaughan",
    "managed wi-fi ontario",
    "managed network services ontario",
    "business voip ontario",
    "backup internet for business",
    "lte failover business internet",
    "commercial internet provider ontario",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: CANONICAL_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink business internet for Ontario businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: TWITTER_DESC,
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

function ServiceCard({
  index,
  title,
  desc,
  href,
}: {
  index: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#FACC15]/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="text-[10px] tracking-[0.22em] text-white/40">{index}</div>
        <h3 className="mt-3 text-sm font-medium text-white/92">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/64">{desc}</p>
        <div className="mt-4 text-xs text-white/50">Open service →</div>
      </div>
    </Link>
  );
}

function PainCard({ text }: { text: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-5 text-sm text-white/80">
      {text}
    </div>
  );
}

function FlowCard({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
        {step}
      </div>
      <h3 className="mt-4 text-sm font-medium text-white/92">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/64">{desc}</p>
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

function LocationCard({
  city,
  note,
  href,
}: {
  city: string;
  note: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="text-[11px] tracking-[0.22em] text-white/48">
        {city.toUpperCase()}
      </div>
      <div className="mt-2 text-sm font-medium text-white/90">{note}</div>
      <div className="mt-4 text-xs text-white/52">Open page →</div>
    </Link>
  );
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: CANONICAL_URL,
    logo: `${SITE_URL}/icon.png`,
    image: OG_IMAGE_URL,
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

  const telecomSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#telecom`,
    name: "Orbitlink Business Internet & Managed Network Services",
    provider: {
      "@id": `${SITE_URL}/#org`,
    },
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
    audience: {
      "@type": "Audience",
      audienceType: "Business",
    },
    termsOfService: `${SITE_URL}/legal/terms`,
  };

  return (
    <main className="min-h-screen bg-[#06080C] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(telecomSchema) }}
      />

      <TopNav />
      <StickyStatusStrip />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-business-ontario.jpg"
            alt="Ontario business team in a modern office environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[74%_center] sm:object-[68%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.28)_0%,rgba(4,7,12,0.52)_34%,rgba(4,7,12,0.86)_74%,rgba(4,7,12,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,7,12,0.92)_0%,rgba(4,7,12,0.58)_34%,rgba(4,7,12,0.10)_66%,rgba(4,7,12,0.74)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(250,204,21,0.08),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.10),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:58px_58px]" />
        </div>

        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 pb-12 pt-28 sm:px-7 sm:pt-24 lg:min-h-[92vh] lg:px-10 lg:pb-16 lg:pt-20">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-white/76 backdrop-blur sm:text-xs">
              Ontario Business Connectivity
            </div>

            <h1 className="mt-6 max-w-4xl text-[2.15rem] font-semibold leading-[0.98] tracking-tight sm:text-[3.15rem] lg:text-[4.4rem] xl:text-[5.1rem]">
              Internet that actually fits your business
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/82 sm:text-[1.08rem]">
              Not packages. Not guesses. Your building, your workload, and your
              operating needs — reviewed properly before you commit.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Mississauga", "Toronto", "Brampton", "Vaughan", "Ontario-wide"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/68 sm:text-xs"
                  >
                    {item}
                  </span>
                )
              )}
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
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/15 px-6 py-3 text-sm transition hover:bg-white/10"
              >
                View Service Catalog
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Business-only review • No obligation • Clear answer
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
            SERVICE CATALOG
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
            What Orbitlink can actually help with
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
            Clear categories for the most common business connectivity needs.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ServiceCard
            index="01"
            title="Business Fibre Internet"
            desc="High-capacity access for offices, clinics, and commercial sites."
            href="/services/business-fibre-internet"
          />
          <ServiceCard
            index="02"
            title="Dedicated Internet Access"
            desc="Higher-assurance connectivity for uptime-sensitive operations."
            href="/services/dedicated-internet-access"
          />
          <ServiceCard
            index="03"
            title="Managed Wi-Fi"
            desc="Internal wireless performance aligned to real device demand."
            href="/services/managed-lan-wifi"
          />
          <ServiceCard
            index="04"
            title="Backup Connectivity"
            desc="Secondary path planning when continuity matters."
            href="/services/lte-5g-continuity"
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
              The usual issue is not speed. It is fit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Businesses often end up on the wrong service path for the building,
              internal layout, backup needs, or workload profile.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <PainCard text="Connection slows down when usage rises" />
            <PainCard text="Wireless coverage inside the unit is inconsistent" />
            <PainCard text="Current service is not aligned to the environment" />
            <PainCard text="A backup path is needed for continuity" />
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
          <FlowCard
            step="1"
            title="Submit your address"
            desc="Share the location and what the connection needs to support."
          />
          <FlowCard
            step="2"
            title="We review options"
            desc="We assess infrastructure, provider paths, and continuity fit."
          />
          <FlowCard
            step="3"
            title="Receive direction"
            desc="You get a clear next step, not a generic package."
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

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-7 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-black/22 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              ONTARIO LOCATIONS
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[34px]">
              Explore location-based pages
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/64 sm:text-[15px]">
              Browse focused commercial pages built around local intent and
              address-based availability.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LocationCard
              city="Toronto"
              note="Business internet and commercial connectivity"
              href="/locations/toronto"
            />
            <LocationCard
              city="Mississauga"
              note="Priority business market"
              href="/locations/mississauga"
            />
            <LocationCard
              city="Vaughan"
              note="Industrial and office environments"
              href="/locations/vaughan"
            />
            <LocationCard
              city="Brampton"
              note="Warehouse and logistics environments"
              href="/locations/brampton"
            />
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

      <div id="hero-sentinel" className="h-2 w-full" />

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}