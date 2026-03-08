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
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
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
      className="text-sm text-white/58 transition hover:text-white"
    >
      {children}
    </Link>
  );
}

function RailTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.28em] text-white/40">
      {children}
    </div>
  );
}

function FooterRail({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <RailTitle>{title}</RailTitle>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/network", label: "Network" },
  { href: "/trust", label: "Trust" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services", label: "All services" },
  { href: "/services/business-fibre-internet", label: "Business fibre" },
  { href: "/services/dedicated-internet-access", label: "Dedicated Internet" },
  { href: "/services/managed-lan-wifi", label: "Managed Wi-Fi" },
  { href: "/services/lte-5g-continuity", label: "LTE / 5G continuity" },
  { href: "/services/voip-cloud-voice", label: "VoIP & cloud voice" },
];

const locationLinks = [
  { href: "/locations", label: "All locations" },
  { href: "/locations/ontario", label: "Ontario hub" },
  { href: "/locations/mississauga", label: "Mississauga" },
  { href: "/locations/brampton", label: "Brampton" },
  { href: "/locations/toronto", label: "Toronto" },
  { href: "/locations/markham", label: "Markham" },
];

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/acceptable-use", label: "Acceptable use" },
  { href: "/legal/cookies", label: "Cookies" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-0 top-10 h-56 w-56 rounded-full bg-blue-500/6 blur-3xl" />
        <div className="absolute right-0 top-16 h-56 w-56 rounded-full bg-emerald-500/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[34rem] -translate-x-1/2 rounded-full bg-[#FACC15]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FACC15]/30 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
              </span>

              <div className="text-[11px] tracking-[0.30em] text-white/72">
                ORBITLINK
              </div>

              <span className="hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] tracking-wide text-white/65 sm:inline-flex">
                Operator-grade
              </span>
            </div>

            <div className="mt-5 max-w-md text-sm leading-6 text-white/68 sm:text-[15px]">
              Premium connectivity engineered for disciplined operations,
              structured onboarding, documented delivery, and an enterprise
              support posture across Ontario.
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["TELECOMMUNICATIONS", "OPERATIONS-FIRST", "AUDIT-READY"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] tracking-[0.18em] text-white/56"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              <SocialIcon
                href="https://www.linkedin.com/company/orbitlinkhq"
                label="Orbitlink on LinkedIn"
              >
                <IconLinkedIn />
              </SocialIcon>
              <SocialIcon href="https://x.com/OrbitlinkHQ" label="Orbitlink on X">
                <IconX />
              </SocialIcon>
              <SocialIcon
                href="https://www.youtube.com/@Orbitlinkhq"
                label="Orbitlink on YouTube"
              >
                <IconYouTube />
              </SocialIcon>
              <SocialIcon
                href="https://www.facebook.com/orbitlinkhq"
                label="Orbitlink on Facebook"
              >
                <IconFacebook />
              </SocialIcon>
            </div>

            <div className="mt-7 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-[11px] tracking-[0.26em] text-white/42">
                CORPORATE DETAILS
              </div>

              <div className="mt-4 space-y-2 text-sm leading-6 text-white/65">
                <div>
                  Orbitlink is a brand of{" "}
                  <span className="text-white/82">TIRAV Technologies Inc.</span>
                </div>
                <div>
                  <span className="text-white/45">Address:</span>{" "}
                  30 Eglinton Ave W, Suite 400-A77, Mississauga, ON L5R 3E7,
                  Canada
                </div>
                <div>
                  <span className="text-white/45">Phone:</span>{" "}
                  <a
                    className="text-white/78 transition hover:text-white"
                    href="tel:+18888672480"
                  >
                    1-888-8-ORBIT-0
                  </a>
                </div>
                <div className="text-xs text-white/45">
                  Availability is confirmed per address. No overclaims.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <FooterRail title="COMPANY" links={companyLinks} />
                <FooterRail title="SERVICES" links={serviceLinks} />
                <FooterRail title="LOCATIONS" links={locationLinks} />
                <FooterRail title="LEGAL" links={legalLinks} />
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="text-[11px] tracking-[0.26em] text-white/42">
                    CONCIERGE DESK
                  </div>
                  <div className="mt-2 text-sm text-white/82">
                    Request access for structured onboarding and provisioning.
                  </div>
                  <div className="mt-1 text-xs leading-5 text-white/50">
                    Include address • module (Fibre/DIA) • static IP • managed
                    LAN/Wi-Fi • continuity
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:concierge@orbitlink.ca"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm text-white/78 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    concierge@orbitlink.ca
                  </a>

                  <Link
                    href="/contact#intake"
                    className="inline-flex items-center justify-center rounded-2xl border border-[#FACC15]/35 bg-[#FACC15]/10 px-4 py-2.5 text-sm font-medium text-[#FDE68A] transition hover:border-[#FACC15]/55 hover:bg-[#FACC15]/15"
                  >
                    Request Access
                  </Link>
                </div>
              </div>
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
    </footer>
  );
}