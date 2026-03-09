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
    <div className="relative min-h-screen overflow-x-hidden bg-[#09090B] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-8 top-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,253,254,0.045),transparent_24%)]" />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute inset-x-0 top-[20%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/[0.025] to-transparent" />

        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#09090B] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#09090B] to-transparent" />
      </div>

      <div className="relative z-[140]">
        <TopNav />
      </div>

      <div className="relative z-[130]">
        <StatusBandClient />
      </div>

      <main className="relative z-10">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>

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