import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Orbitlink",
  description:
    "The page you requested could not be found. Explore Orbitlink business fibre, dedicated internet, and managed network services.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-10 top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,253,254,0.08),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-20">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-12">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
            Orbitlink
          </div>

          <div className="mt-6 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                Error 404
              </p>

              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
                Page not found.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                The page you requested may have moved, expired, or no longer
                exists. You can return to the homepage or continue through the
                most useful Orbitlink paths below.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl bg-[#38FDFE] px-5 py-3 text-sm font-semibold text-[#071014] transition hover:opacity-90"
                >
                  Return home
                </Link>

                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Compare services
                </Link>

                <Link
                  href="/why-orbitlink"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Why Orbitlink
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm font-medium text-white/85">
                Helpful links
              </p>

              <div className="mt-4 space-y-3">
                <Link
                  href="/"
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="text-sm font-semibold text-white">
                    Homepage
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Business fibre internet and dedicated internet overview.
                  </div>
                </Link>

                <Link
                  href="/compare"
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="text-sm font-semibold text-white">
                    Compare
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Review service paths and business connectivity fit.
                  </div>
                </Link>

                <Link
                  href="/why-orbitlink"
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="text-sm font-semibold text-white">
                    Why Orbitlink
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    See the Orbitlink operating model and provider experience.
                  </div>
                </Link>

                <Link
                  href="/contact"
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="text-sm font-semibold text-white">
                    Contact
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Reach Orbitlink for site qualification and next steps.
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}