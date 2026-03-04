// src/app/services/layout.tsx
import TopNav from "@/components/TopNav";
import StatusBandClient from "@/components/StatusBandClient";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <TopNav />
      <StatusBandClient />

      {/* consistent premium spacing */}
      <div className="mx-auto max-w-6xl px-5 sm:px-7 pt-10 pb-16">{children}</div>

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}