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
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
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

function RailTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.28em] text-white/45">{children}</div>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/60 transition hover:text-white">
      {children}
    </Link>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] tracking-[0.18em] text-white/60">
      {children}
    </span>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/30">
      {/* subtle top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-7 py-10">
        {/* ambient blobs (very subtle) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-8 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl" />
          <div className="absolute top-4 right-8 h-64 w-64 rounded-full bg-emerald-500/7 blur-3xl" />
          <div className="absolute -bottom-28 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-[#FACC15]/8 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand / identity block */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/25" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
              </span>
              <div className="text-[11px] tracking-[0.32em] text-white/75">ORBITLINK</div>
            </div>

            <div className="mt-4 max-w-md text-sm sm:text-[15px] leading-6 text-white/70">
              Premium connectivity engineered for disciplined operations and compliance-ready delivery — built for
              Ontario.
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Chip>TELECOMMUNICATIONS</Chip>
              <Chip>OPERATIONS-FIRST</Chip>
              <Chip>AUDIT-READY</Chip>
            </div>

            <div className="mt-5 flex items-center gap-2">
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

            {/* HQ block (requested) */}
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="text-[11px] tracking-[0.28em] text-white/45">HEADQUARTERS</div>
              <div className="mt-3 text-sm text-white/80">
                <div className="font-medium text-white/90">TIRAV Technologies Inc.</div>
                <div className="mt-1 text-white/65 leading-6">
                  30 Eglinton Ave W, Suite 400-A35
                  <br />
                  Mississauga, ON L5R 3E7
                  <br />
                  Canada
                </div>
              </div>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mt-4 text-xs text-white/50 leading-5">
                Controlled intake. Responses are provided during active review windows.
              </div>
            </div>
          </div>

          {/* rails */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <RailTitle>COMPANY</RailTitle>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <FooterLink href="/about">About</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/solutions">Solutions</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/network">Network</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/trust">Trust</FooterLink>
                  </li>
                </ul>
              </div>

              <div>
                <RailTitle>LEGAL</RailTitle>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <FooterLink href="/legal/privacy">Privacy</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/legal/terms">Terms</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/legal/acceptable-use">Acceptable use</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/legal/cookies">Cookies</FooterLink>
                  </li>
                </ul>
              </div>

              <div>
                <RailTitle>CONTACT</RailTitle>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a className="text-white/60 transition hover:text-white" href="mailto:concierge@orbitlink.ca">
                      concierge@orbitlink.ca
                    </a>
                  </li>
                  <li>
                    <a className="text-white/60 transition hover:text-white" href="mailto:sales@orbitlink.ca">
                      sales@orbitlink.ca
                    </a>
                  </li>
                  <li>
                    <a className="text-white/60 transition hover:text-white" href="tel:+18888672480">
                      1-888-8-ORBIT-0
                    </a>
                  </li>
                </ul>

                {/* Enterprise micro CTA (premium, not loud) */}
                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] tracking-[0.28em] text-white/45">CONCIERGE DESK</div>
                      <div className="mt-2 text-sm text-white/80">
                        Enterprise onboarding and provisioning coordination.
                      </div>
                      <div className="mt-2 text-xs text-white/50 leading-5">
                        One response when your request matches an active intake window.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href="/coming-soon"
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-4 py-3 text-sm font-medium text-[#FDE68A] transition hover:border-[#FACC15]/55 hover:bg-[#FACC15]/15"
                    >
                      Request Access
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: remove if you want ultra-minimal */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-white/70">
                  Built for disciplined operations — engineered for reliability, transparency, and regulated delivery.
                </div>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                >
                  Explore solutions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/45">© {year} TIRAV Technologies Inc. All rights reserved.</div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/45">
              <span>Mississauga, ON</span>
              <span aria-hidden="true">•</span>
              <span>Ontario, Canada</span>
              <span aria-hidden="true">•</span>
              <span>Operations-first</span>
              <span aria-hidden="true">•</span>
              <span>Audit-ready posture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
