import PageShell from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="CONTACT"
      title="Enterprise Onboarding"
      subtitle="Controlled rollout. Clear expectations. Professional client care."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            INTAKE
          </div>
          <div className="mt-3 text-sm text-white/90 font-medium">
            What to include in your message
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            <li>• Location (City / Province)</li>
            <li>• Service module (Internet / Voice / Smart / Trust)</li>
            <li>• Number of users / sites</li>
            <li>• Target go-live date</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="text-[11px] tracking-[0.22em] text-white/55">
            RESPONSE
          </div>
          <div className="mt-3 text-sm text-white/90 font-medium">
            What you can expect
          </div>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Concierge Desk responds with a controlled onboarding plan, timeline,
            and next actions. No hype — just execution.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

