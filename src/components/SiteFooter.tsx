import Link from "next/link";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
    >
      {children}
    </a>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-sm text-white/58 transition duration-300 hover:text-white"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#38FDFE] via-white/70 to-transparent transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.28em] text-white/38">
      {children}
    </div>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.31V9h3.41v1.6h.05c.48-.9 1.66-1.85 3.41-1.85 3.65 0 4.33 2.4 4.33 5.53v6.17zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.78-6.29L6.6 22H3.5l7.25-8.3L1 2h6.25l4.32 5.7L18.9 2zm-1.07 18h1.7L7.17 3.88H5.34L17.83 20z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.2 31.2 0 0 0 2 12s.1 3.8.4 4.8a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1 .4-4.8.4-4.8s-.1-3.8-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#06080C] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:68px_68px]" />

        <div className="absolute -left-28 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[12%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-x-[12%] top-24 h-px bg-gradient-to-r from-transparent via-[#38FDFE]/35 to-transparent" />
        <div className="absolute inset-x-[22%] bottom-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-[#38FDFE]/40 shadow-[0_0_28px_rgba(56,253,254,0.45)]" />
        <div className="absolute left-[46%] top-[10%] h-1.5 w-1.5 rounded-full bg-white/30 shadow-[0_0_18px_rgba(255,255,255,0.22)]" />
        <div className="absolute right-[12%] top-[22%] h-2 w-2 rounded-full bg-emerald-300/30 shadow-[0_0_26px_rgba(52,211,153,0.35)]" />
        <div className="absolute left-[74%] bottom-[18%] h-2 w-2 rounded-full bg-[#FACC15]/30 shadow-[0_0_26px_rgba(250,204,21,0.30)]" />

        <div className="absolute top-[23%] h-px w-40 bg-gradient-to-r from-transparent via-[#38FDFE]/45 to-transparent blur-sm animate-[footerSweep_10s_linear_infinite]" />
      </div>

      <style jsx>{`
        @keyframes footerSweep {
          0% {
            transform: translateX(-10vw);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            transform: translateX(92vw);
            opacity: 0;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/35 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
              </span>

              <span className="text-[11px] tracking-[0.32em] text-white/72">
                ORBITLINK
              </span>

              <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] tracking-[0.18em] text-white/46 sm:inline-flex">
                OPERATOR SURFACE
              </span>
            </div>

            <div className="mt-8 max-w-xl">
              <h2 className="text-[1.95rem] font-semibold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.03]">
                Infrastructure-grade connectivity,
                <span className="block text-white/58">
                  presented with calm operational clarity.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/62 sm:text-[15px]">
                Premium business fibre, managed network infrastructure, and disciplined onboarding
                designed for modern enterprise environments across Ontario.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["TELECOM", "OPS-FIRST", "AUDIT-READY"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.16em] text-white/52"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-2">
              <SocialIcon href="https://www.linkedin.com/company/orbitlinkhq" label="Orbitlink on LinkedIn">
                <IconLinkedIn />
              </SocialIcon>
              <SocialIcon href="https://x.com/OrbitlinkHQ" label="Orbitlink on X">
                <IconX />
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@Orbitlinkhq" label="Orbitlink on YouTube">
                <IconYouTube />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/orbitlinkhq" label="Orbitlink on Facebook">
                <IconFacebook />
              </SocialIcon>
            </div>

            <div className="mt-8 space-y-1.5 text-xs text-white/45">
              <div>
                Orbitlink is a brand of <span className="text-white/68">TIRAV Technologies Inc.</span>
              </div>
              <div className="max-w-sm text-white/58">
                30 Eglinton Ave W, Suite 400-A77, Mississauga, ON L5R 3E7, Canada
              </div>
              <div>
                <a
                  className="text-white/62 transition hover:text-white"
                  href="tel:+18888672480"
                >
                  1-888-8-ORBIT-0
                </a>
              </div>
              <div className="text-white/38">Availability is confirmed per address.</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              <div>
                <SectionTitle>COMPANY</SectionTitle>
                <ul className="mt-4 space-y-3">
                  <li><FooterLink href="/about">About</FooterLink></li>
                  <li><FooterLink href="/network">Network</FooterLink></li>
                  <li><FooterLink href="/services">Services</FooterLink></li>
                </ul>
              </div>

              <div>
                <SectionTitle>PLATFORM</SectionTitle>
                <ul className="mt-4 space-y-3">
                  <li><FooterLink href="/solutions">Solutions</FooterLink></li>
                  <li><FooterLink href="/trust">Trust</FooterLink></li>
                  <li><FooterLink href="/contact">Contact</FooterLink></li>
                </ul>
              </div>

              <div>
                <SectionTitle>LOCATIONS</SectionTitle>
                <ul className="mt-4 space-y-3">
                  <li><FooterLink href="/locations">All locations</FooterLink></li>
                  <li><FooterLink href="/locations/ontario">Ontario hub</FooterLink></li>
                  <li><FooterLink href="/locations/mississauga">Mississauga</FooterLink></li>
                </ul>
              </div>

              <div>
                <SectionTitle>LEGAL</SectionTitle>
                <ul className="mt-4 space-y-3">
                  <li><FooterLink href="/legal/privacy">Privacy</FooterLink></li>
                  <li><FooterLink href="/legal/terms">Terms</FooterLink></li>
                  <li><FooterLink href="/legal/acceptable-use">Acceptable use</FooterLink></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <div className="text-[11px] tracking-[0.26em] text-white/40">
                    CONCIERGE ACCESS
                  </div>
                  <div className="mt-2 text-sm text-white/78">
                    Structured onboarding for business fibre, dedicated internet, managed LAN/Wi-Fi,
                    continuity, and enterprise infrastructure review.
                  </div>
                </div>

                <Link
                  href="/contact#intake"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                >
                  Request Access
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/38">
            © {year} TIRAV Technologies Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-white/38">
            <span>Ontario</span>
            <span aria-hidden="true">•</span>
            <span>Availability by building</span>
            <span aria-hidden="true">•</span>
            <span>Enterprise onboarding</span>
          </div>
        </div>
      </div>
    </footer>
  );
}