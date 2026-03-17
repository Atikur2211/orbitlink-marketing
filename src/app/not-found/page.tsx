import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-10 top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/2 h-80 w-[56rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-20">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-12">
          <p className="text-sm uppercase tracking-[0.28em] text-white/45">
            Error 404
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Page not found.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            The page you requested may have moved, expired, or no longer
            exists. Continue through one of the links below.
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
      </div>
    </main>
  );
}