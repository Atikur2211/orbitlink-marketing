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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#09090B] text-white">
      {/* controlled atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* ambient orbs */}
        <div className="absolute -top-20 left-6 h-52 w-52 rounded-full bg-blue-500/8 blur-3xl sm:-top-24 sm:left-8 sm:h-72 sm:w-72 sm:bg-blue-500/10" />
        <div className="absolute right-6 top-10 h-52 w-52 rounded-full bg-emerald-500/8 blur-3xl sm:right-8 sm:top-12 sm:h-72 sm:w-72 sm:bg-emerald-500/10" />
        <div className="absolute bottom-[-110px] left-1/2 h-60 w-[34rem] -translate-x-1/2 rounded-full bg-[#FACC15]/8 blur-3xl sm:bottom-[-140px] sm:h-80 sm:w-[56rem] sm:bg-[#FACC15]/10" />

        {/* premium radial wash */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,253,254,0.04),transparent_24%)]" />

        {/* grid */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />

        {/* guide lines */}
        <div className="absolute inset-x-0 top-[20%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* top wash */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/[0.025] to-transparent" />

        {/* edge masking only on larger screens */}
        <div className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[#09090B] to-transparent lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[#09090B] to-transparent lg:block" />
      </div>

      <div className="relative z-[140]">
        <TopNav />
      </div>

      <div className="relative z-[130]">
        <StatusBandClient />
      </div>

      {/* content */}
      <main className="relative z-10 flex-1">
        {children}
      </main>

      {/* divider before concierge */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-7">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      <div className="relative z-10">
        <ConciergeBlock />
      </div>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}