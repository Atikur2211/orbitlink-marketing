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

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Privacy Policy"
      subtitle="A practical description of how Orbitlink handles information submitted through our site and controlled intake."
    >
      <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/25 px-6 py-4">
        <div className="text-xs text-white/60">Last updated</div>
        <div className="text-xs text-white/80">{lastUpdated}</div>
      </div>

      <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-5">
        <Section label="1" title="What we collect">
          <ul className="list-disc pl-5 space-y-2">
            <li>Contact details you submit (e.g., email, name, company, location, intent).</li>
            <li>Operational metadata (e.g., timestamps, form source/module, optional notes).</li>
            <li>Basic technical logs for security and abuse prevention (e.g., IP, user-agent).</li>
          </ul>
        </Section>

        <Section label="2" title="How we use information">
          <ul className="list-disc pl-5 space-y-2">
            <li>Respond to requests submitted through controlled intake windows.</li>
            <li>Prioritize and manage inbound requests (review/contact status).</li>
            <li>Maintain service integrity, detect abuse, and protect operations.</li>
            <li>Improve site quality and reliability (aggregated, non-personal trends where possible).</li>
          </ul>
        </Section>

        <Section label="3" title="What we do not do">
          <ul className="list-disc pl-5 space-y-2">
            <li>We do not sell personal information.</li>
            <li>We do not publish your submitted details.</li>
            <li>We do not promise continuous availability or response times.</li>
          </ul>
        </Section>

        <Section label="4" title="Sharing">
          <p>
            We may share information only when necessary to operate the service, comply with law, or protect our
            systems. Examples include service providers (hosting, email) and lawful requests.
          </p>
        </Section>

        <Section label="5" title="Retention">
          <p>
            We retain information only as long as needed for operational review, security, and compliance obligations.
            Retention periods may vary by workflow.
          </p>
        </Section>

        <Section label="6" title="Security">
          <p>
            We use reasonable safeguards appropriate for an operations-first posture. No method of transmission or
            storage is 100% secure, but we continuously aim for disciplined handling.
          </p>
        </Section>

        <Section label="7" title="Contact">
          <p>
            Questions or requests can be sent to{" "}
            <a className="text-white/80 hover:text-white underline underline-offset-4" href="mailto:concierge@orbitlink.ca">
              concierge@orbitlink.ca
            </a>
            .
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
