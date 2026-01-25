import PageShell from "@/components/PageShell";

function Item({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/65">{children}</div>
    </div>
  );
}

export default function AcceptableUsePage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Acceptable Use Policy"
      subtitle="A simple policy that protects customers, operations, and service integrity."
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">PROHIBITED</div>
        <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white/90">
          Misuse is not tolerated
        </h2>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
          You may not use the site or services to harm others, disrupt networks, attempt unauthorized access, or submit
          fraudulent requests. We reserve the right to restrict access for abuse prevention.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <Item title="Unauthorized access">
            Attempts to probe, scan, or access systems or data without authorization.
          </Item>
          <Item title="Abuse & disruption">
            Activities intended to disrupt service, degrade performance, or harass others.
          </Item>
          <Item title="Fraud & deception">
            Submitting false identity, impersonation, or misleading business claims.
          </Item>
          <Item title="Malicious content">
            Uploading malware, harmful payloads, or links designed to compromise devices.
          </Item>
        </div>

        <div className="mt-6 text-sm sm:text-[15px] leading-6 text-white/70">
          If you believe your access was restricted incorrectly, contact{" "}
          <a className="text-white/80 hover:text-white underline underline-offset-4" href="mailto:concierge@orbitlink.ca">
            concierge@orbitlink.ca
          </a>
          .
        </div>
      </div>
    </PageShell>
  );
}
