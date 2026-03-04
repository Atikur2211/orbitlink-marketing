// src/app/services/layout.tsx
import TopNav from "@/components/TopNav";
import StatusBandClient from "@/components/StatusBandClient";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#09090B] text-white relative overflow-hidden">
      
      {/* global glow background (full width) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-12 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 h-80 w-[56rem] rounded-full bg-[#FACC15]/10 blur-3xl" />
      </div>

      {/* navigation */}
      <TopNav />

      {/* network status band */}
      <StatusBandClient />

      {/* page content */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-7 pt-10 pb-16">
          {children}
        </div>
      </section>

      {/* concierge */}
      <ConciergeBlock />

      {/* footer */}
      <SiteFooter />
    </main>
  );
}