import TopNav from "@/components/TopNav";
import StatusBand from "@/components/StatusBand";
import SiteFooter from "@/components/SiteFooter";

export default function PortalShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <TopNav />
      <StatusBand />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-10 right-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 h-80 w-[56rem] rounded-full bg-[#FACC15]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-7 pt-12 sm:pt-16 pb-10">
          <div className="text-[11px] tracking-[0.28em] text-white/55">{eyebrow}</div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-[15px] leading-6 text-white/65">{subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-7 pb-16">{children}</section>

      <SiteFooter />
    </main>
  );
}
