// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://orbitlink.ca"),
  title: "Orbitlink",
  description: "Audit-Ready Connectivity for Modern Operators",
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
