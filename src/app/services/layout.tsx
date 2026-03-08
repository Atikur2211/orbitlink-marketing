// src/app/services/layout.tsx
import TopNav from "@/components/TopNav";
import StatusBandClient from "@/components/StatusBandClient";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[#09090B] text-white overflow-x-hidden">
      {/* premium global atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* navigation */}
      <div className="relative z-20">
        <TopNav />
      </div>

      {/* status band */}
      <div className="relative z-20">
        <StatusBandClient />
      </div>

      {/* page content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* lower-page premium transition */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-7">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* concierge */}
      <div className="relative z-10">
        <ConciergeBlock />
      </div>

      {/* footer */}
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </main>
  );
}