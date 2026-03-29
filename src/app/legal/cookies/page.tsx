import PageShell from "@/components/PageShell";

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
        {label}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white/90 sm:text-xl">{title}</h2>

      <div className="mt-3 text-sm leading-6 text-white/70 sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function Signal({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-[11px] tracking-[0.22em] text-white/55">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Cookies & Analytics"
      subtitle="A transparent summary of how Orbitlink uses cookies and what visitors should expect from basic site analytics."
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
            Transparent cookie and measurement summary
          </div>

          <h2 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            Clear, minimal, and business-readable
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink aims to use website technologies in a straightforward and measured way.
            This page explains what cookies are, how they may be used on the site, and what
            visitors can expect from any future analytics or measurement tooling.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="PRIMARY MODE" value="Minimal and practical" />
            <Signal label="PURPOSE" value="Site function and clarity" />
            <Signal label="VISITOR CONTROL" value="Browser-based settings" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
            <Section label="1" title="What cookies are">
              <p>
                Cookies are small files stored on your device that help websites function,
                remember certain preferences, and support a more consistent browsing experience.
              </p>
            </Section>

            <Section label="2" title="How Orbitlink uses cookies">
              <ul className="list-disc pl-5 space-y-2">
                <li>Essential site functionality, such as security, session behaviour, and basic routing.</li>
                <li>Operational stability, where limited technical behaviour helps the site work as intended.</li>
                <li>Optional aggregate measurement or analytics, if enabled in the future.</li>
              </ul>
            </Section>

            <Section label="3" title="Analytics and measurement">
              <p>
                Orbitlink may use basic analytics tools to understand high-level site activity,
                such as page usage, broad traffic patterns, and visitor interaction trends.
                These tools are intended to support site improvement and operational clarity,
                not intrusive tracking.
              </p>
            </Section>

            <Section label="4" title="Your control">
              <p>
                You can control or restrict cookies through your browser settings. Disabling
                certain cookies may affect how parts of the site function or how consistently
                pages behave during a visit.
              </p>
            </Section>

            <Section label="5" title="Updates to this page">
              <p>
                As Orbitlink’s platform evolves, this page may be updated to reflect changes
                in tooling, measurement practices, legal requirements, or operational needs.
              </p>
            </Section>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              QUESTIONS
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Questions about cookies, analytics, or related site behaviour can be directed to:
            </p>

            <a
              className="mt-3 inline-flex text-sm text-white/85 transition hover:text-white underline underline-offset-4"
              href="mailto:concierge@orbitlink.ca"
            >
              concierge@orbitlink.ca
            </a>

            <p className="mt-4 text-xs leading-5 text-white/52">
              Orbitlink is a brand of TIRAV Technologies Inc. This page may be updated as
              site tooling, analytics posture, and operational requirements evolve.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}