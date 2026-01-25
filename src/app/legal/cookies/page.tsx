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
    <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
      <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white/90">{title}</h2>
      <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">{children}</div>
    </section>
  );
}

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Cookies & Analytics"
      subtitle="A transparent summary of cookie usage and basic analytics expectations."
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        <Section label="1" title="What cookies are">
          <p>
            Cookies are small files stored on your device that help websites function and remember preferences.
          </p>
        </Section>

        <Section label="2" title="How Orbitlink uses cookies">
          <ul className="list-disc pl-5 space-y-2">
            <li>Essential functionality (security, session behavior, basic routing).</li>
            <li>Optional measurement (aggregate analytics) if enabled in the future.</li>
          </ul>
        </Section>

        <Section label="3" title="Your control">
          <p>
            You can control cookies through your browser settings. Disabling some cookies may affect site function.
          </p>
        </Section>

        <Section label="4" title="Updates">
          <p>
            As the platform evolves, this page may change to reflect tooling and operational requirements.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
