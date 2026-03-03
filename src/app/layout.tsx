// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://orbitlink.ca"),
  title: {
    default: "Orbitlink",
    template: "%s · Orbitlink",
  },
  description: "Audit-Ready Connectivity for Modern Operators",
  alternates: {
    canonical: "/",
  },
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
  },
};

const GA_MEASUREMENT_ID = "G-1VWDS0BMLY";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <html lang="en">
      <head>
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