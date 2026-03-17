import Link from "next/link";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#09090B] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* cinematic glow fields */}
        <div className="absolute -top-24 left-[-4rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-3rem] top-12 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-80 w-[58rem] -translate-x-1/2 rounded-full bg-[#38FDFE]/8 blur-3xl" />

        {/* ambient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,253,254,0.10),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_25%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_28%)]" />

        {/* premium grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />

        {/* soft spotlight */}
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      <TopNav />

      <section className="relative mx-auto flex min-h-[calc(100vh-180px)] w-full max-w-7xl items-center px-5 py-16 sm:px-7 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-[#38FDFE]/20 bg-[#38FDFE]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#B8FEFF]">
              Orbitlink access layer
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.30em] text-white/45">
              Error 404
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              This route is outside the current Orbitlink surface.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              The page you requested may have moved, expired, or never existed.
              The site is operating normally. Use the primary paths below to
              continue reviewing Orbitlink business fibre, dedicated internet,
              managed network services, and provider comparison pages.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#38FDFE] px-5 py-3 text-sm font-semibold text-[#071014] shadow-[0_0_24px_rgba(56,253,254,0.16)] transition hover:translate-y-[-1px] hover:opacity-95"
              >
                Return home
              </Link>

              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Compare services
              </Link>

              <Link
                href="/why-orbitlink"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Why Orbitlink
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Route status
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Page unavailable
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  The requested URL is not part of the current production route
                  map.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Site posture
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Core platform active
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Continue through approved navigation paths and active
                  conversion pages.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Recommended path
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Resume qualification
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Review service fit, provider posture, and next-step guidance.
                </p>
              </div>
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-medium text-white/85">
                  Continue with a valid Orbitlink path
                </p>

                <div className="mt-5 space-y-3">
                  <Link
                    href="/"
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#38FDFE]/25 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">
                      Homepage
                    </div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      Business fibre internet, dedicated internet, and managed
                      connectivity overview.
                    </div>
                  </Link>

                  <Link
                    href="/compare"
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#38FDFE]/25 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">
                      Compare
                    </div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      Compare service models, buying paths, and provider fit for
                      Ontario businesses.
                    </div>
                  </Link>

                  <Link
                    href="/why-orbitlink"
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#38FDFE]/25 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">
                      Why Orbitlink
                    </div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      Review the Orbitlink operating model, accountability
                      posture, and premium provider experience.
                    </div>
                  </Link>

                  <Link
                    href="/locations"
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#38FDFE]/25 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">
                      Locations
                    </div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      Explore location-based service coverage pages and Ontario
                      business connectivity routes.
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#38FDFE]/25 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">
                      Contact
                    </div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      Reach Orbitlink to begin site qualification and next-step
                      review.
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#38FDFE]/14 bg-[#38FDFE]/7 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#CFFDFF]/70">
                  Golden-grade note
                </p>
                <p className="mt-2 text-sm leading-6 text-white/76">
                  Not every route should resolve. A premium platform makes
                  invalid paths clear, calm, and recoverable without breaking
                  trust.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}