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
      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
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
      className="group relative text-sm text-white/55 transition hover:text-white"
    >
      {children}

      {/* animated underline */}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.26em] text-white/40">
      {children}
    </div>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#07090D] text-white">

      {/* NETWORK GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:70px_70px]" />

      {/* FIBER LIGHT SWEEP */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-[10%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5">

            <div className="flex items-center gap-3">

              {/* live operator indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/40 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
              </span>

              <span className="text-[11px] tracking-[0.32em] text-white/70">
                ORBITLINK
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] tracking-[0.2em] text-white/50">
                OPERATOR NETWORK
              </span>

            </div>

            <h2 className="mt-8 max-w-lg text-[2rem] font-semibold tracking-tight text-white sm:text-[2.4rem] leading-[1.05]">
              Enterprise connectivity engineered with
              <span className="block text-white/60">
                disciplined telecom operations.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/60 sm:text-[15px]">
              Orbitlink delivers structured onboarding, managed infrastructure,
              and operational transparency designed for modern enterprise networks.
            </p>

            {/* badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["TELECOM", "INFRASTRUCTURE", "AUDIT READY"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.15em] text-white/55"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* social */}
            <div className="mt-8 flex gap-2">
              <SocialIcon href="https://www.linkedin.com/company/orbitlinkhq" label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.31V9h3.41v1.6h.05c.48-.9 1.66-1.85 3.41-1.85 3.65 0 4.33 2.4 4.33 5.53v6.17z"/>
                </svg>
              </SocialIcon>

              <SocialIcon href="https://x.com/OrbitlinkHQ" label="X">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.78-6.29L6.6 22H3.5l7.25-8.3L1 2h6.25l4.32 5.7L18.9 2z"/>
                </svg>
              </SocialIcon>
            </div>

            <div className="mt-8 text-xs text-white/45 space-y-1">
              <div>
                Orbitlink is a brand of{" "}
                <span className="text-white/70">
                  TIRAV Technologies Inc.
                </span>
              </div>

              <div>
                30 Eglinton Ave W Suite 400-A77
                Mississauga ON L5R 3E7
              </div>

              <div>
                <a
                  className="text-white/60 hover:text-white transition"
                  href="tel:+18888672480"
                >
                  1-888-8-ORBIT-0
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE NAV */}
          <div className="lg:col-span-7">

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">

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
                  <li><FooterLink href="/locations/ontario">Ontario</FooterLink></li>
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

            {/* concierge bar */}
            <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="text-[11px] tracking-[0.26em] text-white/40">
                  CONCIERGE ACCESS
                </div>

                <div className="mt-2 text-sm text-white/70">
                  Business fibre, dedicated internet, managed LAN/Wi-Fi.
                </div>
              </div>

              <Link
                href="/contact#intake"
                className="inline-flex items-center justify-center rounded-xl bg-[#FACC15] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Request Access
              </Link>

            </div>

          </div>

        </div>

        {/* bottom strip */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-xs text-white/40">
            © {year} TIRAV Technologies Inc.
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-white/40">
            <span>Ontario</span>
            <span>•</span>
            <span>Availability by building</span>
            <span>•</span>
            <span>Enterprise onboarding</span>
          </div>

        </div>

      </div>
    </footer>
  );
}