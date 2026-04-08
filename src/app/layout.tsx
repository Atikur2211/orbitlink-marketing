import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";

const SITE_URL = "https://orbitlink.ca";
const SITE_NAME = "Orbitlink";
const SITE_DESC =
  "Business fibre, dedicated internet access, managed network infrastructure, and audit-ready connectivity for organizations across Ontario.";
const GA_MEASUREMENT_ID = "G-1VWDS0BMLY";

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  category: "Telecommunications",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "business fibre Ontario",
    "business internet Ontario",
    "dedicated internet access Ontario",
    "managed network services Ontario",
    "business telecom provider Ontario",
    "Mississauga business fibre",
    "enterprise connectivity Ontario",
    "audit-ready connectivity",
    "managed Wi-Fi Ontario",
    "business VoIP Ontario",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
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
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "Orbitlink",
    description: SITE_DESC,
    locale: "en_CA",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orbitlink — Business Fibre & Network Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitlink",
    description:
      "Business fibre, dedicated internet access, managed network infrastructure, and audit-ready connectivity across Ontario.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  verification: {
    other: {
      "msvalidate.01": "695CB2CE20F126C050AEEA5E84135A79",
    },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV !== "production";

  const globalJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon.png`,
        image: `${SITE_URL}/opengraph-image`,
        description: SITE_DESC,
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
        },
        parentOrganization: {
          "@type": "Organization",
          name: "TIRAV Technologies Inc.",
        },
        telephone: "+1-888-867-2480",
        email: "concierge@orbitlink.ca",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+1-888-867-2480",
            email: "sales@orbitlink.ca",
            availableLanguage: ["en"],
            areaServed: "CA-ON",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+1-888-867-2480",
            email: "support@orbitlink.ca",
            availableLanguage: ["en"],
            areaServed: "CA-ON",
          },
        ],
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
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESC,
        publisher: {
          "@id": `${SITE_URL}/#org`,
        },
        inLanguage: "en-CA",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              debug_mode: ${isDev ? "true" : "false"}
            });
          `}
        </Script>
      </head>

      <body className="min-h-screen bg-[#09090B] text-white antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}