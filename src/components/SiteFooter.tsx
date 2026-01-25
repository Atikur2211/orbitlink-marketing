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
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition"
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

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/60 hover:text-white transition">
      {children}
    </Link>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-5 sm:px-7 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand / Social */}
          <div className="lg:col-span-5">
            <div className="text-[11px] tracking-[0.28em] text-white/55">ORBITLINK</div>
            <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-md">
              Premium connectivity engineered for disciplined operations, transparent posture,
              and compliance-ready delivery.
            </div>

            <div className="mt-5 flex items-center gap-2">
              <SocialIcon href="https://www.linkedin.com/company/orbitlinkhq" label="LinkedIn">
                <IconLinkedIn />
              </SocialIcon>
              <SocialIcon href="https://x.com/OrbitlinkHQ" label="X">
                <IconX />
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@Orbitlinkhq" label="YouTube">
                <IconYouTube />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/orbitlinkhq" label="Facebook">
                <IconFacebook />
              </SocialIcon>
            </div>

            <div className="mt-6 text-xs text-white/55">
              Orbitlink is a brand of <span className="text-white/75">TIRAV Technologies Inc.</span>
            </div>

            <div className="mt-2 text-xs text-white/45 leading-5">
              Controlled intake. One response when your request matches an active review window.
            </div>
          </div>

          {/* Link rails */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/55">COMPANY</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><FooterLink href="/about">About</FooterLink></li>
                <li><FooterLink href="/solutions">Solutions</FooterLink></li>
                <li><FooterLink href="/trust">Trust</FooterLink></li>
                <li><FooterLink href="/portal">Client portal</FooterLink></li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/55">LEGAL</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><FooterLink href="/legal/privacy">Privacy</FooterLink></li>
                <li><FooterLink href="/legal/terms">Terms</FooterLink></li>
                <li><FooterLink href="/legal/acceptable-use">Acceptable use</FooterLink></li>
                <li><FooterLink href="/legal/cookies">Cookies</FooterLink></li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="text-white/60 hover:text-white transition" href="mailto:concierge@orbitlink.ca">
                    concierge@orbitlink.ca
                  </a>
                </li>
                <li className="text-xs text-white/45 leading-5">
                  Canada-first operations. Services are delivered in accordance with applicable Canadian requirements.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-white/45">
          <div>© {year} TIRAV Technologies Inc. All rights reserved.</div>
          <div className="flex flex-wrap gap-3">
            <span>Canada</span><span>•</span><span>Operations-first</span><span>•</span><span>Audit-ready posture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
