// src/app/locations/guelph/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const PAGE_PATH = "/locations/guelph";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;

const BUSINESS = {
  name: "Orbitlink™",
  legalName: "TIRAV Technologies Inc. o/a Orbitlink",
  phoneDisplay: "1-888-867-2480",
  phoneE164: "+18888672480",
  email: "concierge@orbitlink.ca",
  address: {
    street: "30 Eglinton Ave W, Suite 400-A77",
    city: "Mississauga",
    region: "ON",
    postal: "L5R 3E7",
    country: "CA",
  },
} as const;

const CITY_NAME = "Guelph";
const PAGE_TITLE = "Business Internet in Guelph, ON";
const PAGE_DESCRIPTION =
  "Business internet in Guelph with fibre, dedicated internet, managed Wi-Fi, static IPs, voice, and backup connectivity. Availability is checked by address.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Orbitlink Guelph business internet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [TWITTER_IMAGE_URL],
  },
};

const FAQ = [
  {
    q: "Do you service my address in Guelph?",
    a: "Availability depends on building infrastructure, access feasibility, and upstream serviceability. Orbitlink confirms feasibility by address before moving forward.",
  },
  {
    q: "Do you offer dedicated internet in Guelph?",
    a: "Yes. Dedicated internet is available for performance-critical environments where stronger uptime and predictable performance are required.",
  },
  {
    q: "Do you provide static IPs?",
    a: "Yes. Static IP options are available depending on access type and service design.",
  },
  {
    q: "Can you manage LAN and Wi-Fi?",
    a: "Yes. Orbitlink provides managed LAN and enterprise Wi-Fi for offices and business environments.",
  },
  {
    q: "Do you offer backup connectivity?",
    a: "Yes. LTE and 5G backup options are available for uptime-sensitive operations.",
  },
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
          { "@type": "ListItem", position: 3, name: CITY_NAME, item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };
}

export default function GuelphLocationPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          Business Internet in Guelph
        </h1>

        <p className="mt-4 text-white/70 max-w-2xl">
          Orbitlink delivers business fibre, dedicated internet, managed Wi-Fi,
          and backup connectivity for Guelph businesses. Availability is checked
          by address and building.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Check Availability
          </Link>
          <Link
            href="/services"
            className="rounded-2xl border border-white/20 px-5 py-3 text-sm"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </main>
  );
}