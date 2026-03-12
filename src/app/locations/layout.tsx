// src/app/locations/layout.tsx
import TopNav from "@/components/TopNav";
import StatusBandClient from "@/components/StatusBandClient";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#09090B] text-white">
      {/* premium atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* base glow fields */}
        <div className="absolute -top-24 left-[-2rem] h-56 w-56 rounded-full bg-blue-500/8 blur-3xl sm:left-6 sm:h-72 sm:w-72 sm:bg-blue-500/10" />
        <div className="absolute right-[-2rem] top-8 h-56 w-56 rounded-full bg-emerald-500/7 blur-3xl sm:right-6 sm:top-10 sm:h-72 sm:w-72 sm:bg-emerald-500/10" />
        <div className="absolute bottom-[-120px] left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[#FACC15]/7 blur-3xl sm:bottom-[-150px] sm:h-84 sm:w-[58rem] sm:bg-[#FACC15]/10" />

        {/* atmospheric wash */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.038),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(56,253,254,0.04),transparent_24%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(250,204,21,0.04),transparent_28%)]" />

        {/* refined grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />

        {/* horizon lines */}
        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 top-[52%] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute inset-x-0 bottom-[16%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* top wash */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.02] to-transparent" />

        {/* side masks */}
        <div className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[#09090B] to-transparent lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[#09090B] to-transparent lg:block" />

        {/* bottom grounding */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent" />
      </div>

      {/* nav */}
      <div className="relative z-[140]">
        <TopNav />
      </div>

      {/* status */}
      <div className="relative z-[125]">
        <StatusBandClient />
      </div>

      {/* content */}
      <main className="relative z-10 flex-1">
        <div className="mx-auto w-full max-w-[1600px]">
          {children}
        </div>
      </main>

      {/* divider before concierge */}
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
    </div>
  );
}