// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://orbitlink.ca"),
  title: {
    default: "Orbitlink",
    template: "%s · Orbitlink",
  },
  description: "Audit-Ready Connectivity for Modern Operators",

  // ✅ Golden-grade: DO NOT set a global canonical to "/"
  // Per-page canonicals belong in each page's `export const metadata`.

  openGraph: {
    type: "website",
    url: "https://orbitlink.ca",
    siteName: "Orbitlink",
    title: "Orbitlink",
    description: "Audit-Ready Connectivity for Modern Operators",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitlink",
    description: "Audit-Ready Connectivity for Modern Operators",
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

const GA_MEASUREMENT_ID = "G-1VWDS0BMLY";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <html lang="en">
      <head>
        {/* Performance: preconnect to GA endpoints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
      </body>
    </html>
  );
}