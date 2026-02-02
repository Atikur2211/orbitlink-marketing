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
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 shadow-[0_1px_0_rgba(255,255,255,0.03)]">
      <div className="text-[11px] tracking-[0.28em] text-white/45">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/70 transition hover:text-white">
      {children}
    </Link>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/35">
      <div className="mx-auto max-w-6xl px-5 sm:px-7 py-12">
        {/* Top strip */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] tracking-[0.32em] text-white/60">ORBITLINK</div>
            <div className="mt-2 max-w-2xl text-sm sm:text-[15px] leading-6 text-white/70">
              Business-grade internet and connectivity solutions — engineered for disciplined operations.
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        {/* 3-card grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          {/* Card 1: Company */}
          <Card title="COMPANY">
            <div className="space-y-2 text-sm">
              <div className="text-white/85 font-medium">Orbitlink</div>
              <div className="text-white/60 leading-6">
                A brand of <span className="text-white/80">TIRAV Technologies Inc.</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/solutions">Solutions</FooterLink>
                <FooterLink href="/network">Network</FooterLink>
                <FooterLink href="/trust">Trust</FooterLink>
                <FooterLink href="/portal">Client portal</FooterLink>
                <FooterLink href="/coming-soon">Request access</FooterLink>
              </div>
            </div>
          </Card>

          {/* Card 2: Headquarters */}
          <Card title="HEADQUARTERS">
            <div className="text-sm text-white/70 leading-6">
              <div className="text-white/85 font-medium">TIRAV Technologies Inc.</div>
              <div className="mt-2">
                30 Eglinton Ave W, Suite 400-A35
                <br />
                Mississauga, ON L5R 3E7
                <br />
                Canada
              </div>

              <div className="mt-4 text-xs text-white/50">
                Controlled intake. Responses are provided during active review windows.
              </div>
            </div>
          </Card>

          {/* Card 3: Contact */}
          <Card title="CONTACT">
            <div className="space-y-3 text-sm">
              <a className="block text-white/70 transition hover:text-white" href="mailto:concierge@orbitlink.ca">
                concierge@orbitlink.ca
              </a>
              <a className="block text-white/70 transition hover:text-white" href="mailto:sales@orbitlink.ca">
                sales@orbitlink.ca
              </a>
              <a className="block text-white/70 transition hover:text-white" href="tel:+18888672480">
                1-888-8-ORBIT-0
              </a>

              <div className="pt-3">
                <Link
                  href="/coming-soon"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-4 py-3 text-sm font-medium text-[#FDE68A] transition hover:border-[#FACC15]/55 hover:bg-[#FACC15]/15"
                >
                  Request access
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  );
}
