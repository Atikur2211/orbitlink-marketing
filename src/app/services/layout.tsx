// src/app/services/layout.tsx
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  // Important:
  // PageShell already renders TopNav + StatusBand + ConciergeBlock + SiteFooter.
  // If we render chrome here too, you'll get double header/footer.
  return <>{children}</>;
}