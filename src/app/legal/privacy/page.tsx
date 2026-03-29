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

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Privacy Policy"
      subtitle="A practical description of how Orbitlink handles information submitted through the site, controlled intake, and related operational workflows."
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              Privacy and information handling summary
            </div>

            <div className="text-xs text-white/55">
              Last updated: <span className="text-white/80">{lastUpdated}</span>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            Clear, practical, and operations-aware
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            Orbitlink handles submitted information in a measured and business-readable way.
            This page explains what information may be collected, how it may be used, when it
            may be shared, and the general safeguards applied to support service integrity and
            operational review.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="PRIMARY PURPOSE" value="Operational response and integrity" />
            <Signal label="DATA POSTURE" value="Measured and practical" />
            <Signal label="VISITOR EXPECTATION" value="No sale of personal information" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
            <Section label="1" title="What we collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>Contact details you submit, such as name, email, company, location, and intent.</li>
                <li>Operational metadata, such as timestamps, form source, selected module, and optional notes.</li>
                <li>Basic technical logs used for security, routing, and abuse prevention, such as IP address and user-agent.</li>
              </ul>
            </Section>

            <Section label="2" title="How we use information">
              <ul className="list-disc pl-5 space-y-2">
                <li>Respond to requests submitted through contact forms or controlled intake paths.</li>
                <li>Prioritize, review, and manage inbound business enquiries and commercial follow-up.</li>
                <li>Maintain service integrity, detect abuse, and protect operational systems.</li>
                <li>Improve site quality, reliability, and workflow visibility using aggregated or non-personal trends where practical.</li>
              </ul>
            </Section>

            <Section label="3" title="What we do not do">
              <ul className="list-disc pl-5 space-y-2">
                <li>We do not sell personal information.</li>
                <li>We do not publish submitted details publicly.</li>
                <li>We do not use privacy language to imply guarantees beyond the actual operating model.</li>
              </ul>
            </Section>

            <Section label="4" title="Sharing">
              <p>
                Information may be shared only when reasonably necessary to operate the site
                or services, comply with applicable law, respond to lawful requests, or protect
                systems, customers, or operations. This may include service providers such as
                hosting, email, or related operational tooling.
              </p>
            </Section>

            <Section label="5" title="Retention">
              <p>
                Information is retained only as long as reasonably needed for operational review,
                security, abuse prevention, record-keeping, and compliance obligations. Retention
                periods may vary depending on the workflow, request type, and operating context.
              </p>
            </Section>

            <Section label="6" title="Security">
              <p>
                Orbitlink uses reasonable safeguards appropriate for an operations-first posture.
                No method of transmission or storage is completely secure, but information is handled
                with a disciplined approach intended to support confidentiality, operational integrity,
                and practical risk reduction.
              </p>
            </Section>

            <Section label="7" title="Your contact with us">
              <p>
                Questions, correction requests, or privacy-related enquiries can be sent to{" "}
                <a
                  className="text-white/80 hover:text-white underline underline-offset-4"
                  href="mailto:concierge@orbitlink.ca"
                >
                  concierge@orbitlink.ca
                </a>
                .
              </p>
            </Section>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              POLICY NOTICE
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              This page is intended to provide a readable summary of Orbitlink’s information-handling
              posture. It may be updated as site tooling, legal requirements, intake workflows, or
              operational controls evolve.
            </p>
            <p className="mt-3 text-xs leading-5 text-white/52">
              Orbitlink is a brand of TIRAV Technologies Inc.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}