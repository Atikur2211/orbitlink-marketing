// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

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
      <body className="min-h-screen bg-[#09090B] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
