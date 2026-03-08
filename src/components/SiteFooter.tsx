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
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
    >
      {children}
    </a>
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
      className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
    >
      <span className="h-1 w-1 rounded-full bg-white/20 transition group-hover:bg-[#FACC15]" />
      <span>{children}</span>
    </Link>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#07090D] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[#FACC15]/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-7 sm:py-10">
        <div className="relative min-h-[88vh] overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute left-[8%] top-[18%] h-px w-[38%] bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
            <div className="absolute right-[10%] top-[28%] h-px w-[24%] bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
            <div className="absolute bottom-[18%] left-1/2 h-px w-[36%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FACC15]/25 to-transparent" />
          </div>

          <div className="relative flex min-h-[88vh] flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/30 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                  </span>
                  <span className="text-[11px] tracking-[0.30em] text-white/70">ORBITLINK</span>
                  <span className="text-[10px] tracking-[0.22em] text-white/40">TIER-1 POSTURE</span>
                </div>

                <h2 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                  Calm infrastructure.
                  <span className="block text-white/62">
                    Clean delivery.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/66 sm:text-[15px]">
                  Premium connectivity engineered for disciplined operations across Ontario —
                  structured onboarding, documented delivery, and enterprise support with a true operator feel.
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {["ONTARIO", "ENTERPRISE CONNECTIVITY", "OPERATIONS-FIRST", "AUDIT-READY"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] tracking-[0.18em] text-white/55"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-8 flex items-center gap-2.5">
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
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-[30px] border border-white/10 bg-black/20 p-6">
                  <div className="text-[11px] tracking-[0.28em] text-white/38">COMPANY</div>
                  <div className="mt-5 space-y-4">
                    <FooterLink href="/about">About</FooterLink>
                    <FooterLink href="/network">Network</FooterLink>
                    <FooterLink href="/services">Services</FooterLink>
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-black/20 p-6">
                  <div className="text-[11px] tracking-[0.28em] text-white/38">PLATFORM</div>
                  <div className="mt-5 space-y-4">
                    <FooterLink href="/solutions">Solutions</FooterLink>
                    <FooterLink href="/trust">Trust</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr_0.9fr] lg:items-end">
                <div>
                  <div className="text-[11px] tracking-[0.28em] text-white/38">CORPORATE</div>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    Orbitlink is a brand of <span className="text-white/82">TIRAV Technologies Inc.</span>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/54">
                    30 Eglinton Ave W, Suite 400-A77, Mississauga, ON L5R 3E7, Canada
                  </p>
                </div>

                <div>
                  <div className="text-[11px] tracking-[0.28em] text-white/38">CLIENT CARE</div>
                  <div className="mt-4">
                    <a
                      href="tel:+18888672480"
                      className="text-sm text-white/76 transition hover:text-white"
                    >
                      1-888-8-ORBIT-0
                    </a>
                  </div>
                  <div className="mt-2">
                    <a
                      href="mailto:concierge@orbitlink.ca"
                      className="text-sm text-white/76 transition hover:text-white"
                    >
                      concierge@orbitlink.ca
                    </a>
                  </div>
                </div>

                <div className="lg:text-right">
                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl border border-[#FACC15]/30 bg-[#FACC15]/10 px-5 py-3 text-sm font-medium text-[#FDE68A] transition hover:border-[#FACC15]/55 hover:bg-[#FACC15]/15"
                  >
                    Request Access
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-white/42">
                © {year} TIRAV Technologies Inc. All rights reserved.
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-white/42">
                <span>Ontario</span>
                <span aria-hidden="true">•</span>
                <span>Availability by building</span>
                <span aria-hidden="true">•</span>
                <span>Documented delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}