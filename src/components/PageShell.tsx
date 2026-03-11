import ConciergeBlock from "@/components/ConciergeBlock";
import TopNav from "@/components/TopNav";
import StatusBandClient from "@/components/StatusBandClient";
import SiteFooter from "@/components/SiteFooter";

type PageShellAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export default function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  pills = [],
  actions = [],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  pills?: string[];
  actions?: PageShellAction[];
}) {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <TopNav />
      <StatusBandClient />

      <section className="relative overflow-hidden border-b border-white/6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-emerald-500/9 blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-[#FACC15]/9 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.12]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-7 sm:pb-12 sm:pt-16 lg:pb-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.22em] text-white/62">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              {eyebrow}
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.04]">
              {title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-[15px]">
              {subtitle}
            </p>

            {pills.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/72"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            ) : null}

            {actions.length > 0 ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {actions.map((action) => {
                  const variant = action.variant || "secondary";

                  const classes =
                    variant === "primary"
                      ? "rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
                      : variant === "ghost"
                      ? "rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-center text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
                      : "rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10";

                  return (
                    <a key={`${action.href}-${action.label}`} href={action.href} className={classes}>
                      {action.label}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-7 sm:pt-8">
        {children}
      </section>

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}