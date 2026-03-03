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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1VWDS0BMLY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1VWDS0BMLY');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-[#09090B] text-white antialiased">
        {children}
      </body>
    </html>
  );
}