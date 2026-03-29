import PageShell from "@/components/PageShell";

function Block({
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

export default function TermsPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Terms of Use"
      subtitle="Rules for using the Orbitlink site, written to be clear, practical, and operationally realistic."
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
              Site terms and use conditions
            </div>

            <div className="text-xs text-white/55">
              Last updated: <span className="text-white/80">{lastUpdated}</span>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[32px]">
            Clear terms for a controlled business-facing site
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-[15px]">
            These terms explain the basic conditions for using the Orbitlink website.
            They are intended to support a clear, business-readable, and operationally
            realistic understanding of how the site may be used.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Signal label="SITE PURPOSE" value="Information and controlled intake" />
            <Signal label="USE EXPECTATION" value="Lawful and responsible use" />
            <Signal label="OPERATING POSTURE" value="Clear and practical" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5">
            <Block label="1" title="About Orbitlink">
              <p>
                Orbitlink is a brand of{" "}
                <span className="text-white/85">TIRAV Technologies Inc.</span>. This
                website provides product information, trust and legal disclosures, and
                controlled intake paths for prospective customers and business enquiries.
              </p>
            </Block>

            <Block label="2" title="Informational use and no guarantees">
              <p>
                Content on this site is provided for general informational purposes.
                Availability, timelines, features, coverage, readiness, and service
                conditions may change. Orbitlink does not guarantee uninterrupted access,
                response times, or specific outcomes from use of the site.
              </p>
            </Block>

            <Block label="3" title="Acceptable use">
              <p>
                You agree not to misuse the site, attempt unauthorized access, interfere
                with service operation, submit harmful or deceptive content, or use the
                site in a way that creates unreasonable operational, commercial, or security risk.
              </p>
            </Block>

            <Block label="4" title="Intellectual property">
              <p>
                Site content, branding, design, graphics, copy, and related materials are
                owned by TIRAV Technologies Inc. or used with permission where applicable.
                You may not copy, reproduce, distribute, modify, or create derivative works
                without permission except where permitted by law.
              </p>
            </Block>

            <Block label="5" title="Third-party links and services">
              <p>
                Links to third-party platforms, services, or websites may be provided for
                convenience. Orbitlink is not responsible for the content, availability,
                privacy practices, or conduct of third-party services.
              </p>
            </Block>

            <Block label="6" title="Limitation of liability">
              <p>
                To the extent permitted by law, Orbitlink and TIRAV Technologies Inc. are
                not liable for indirect, incidental, special, consequential, exemplary, or
                punitive damages arising from or related to use of this site, reliance on its
                content, or inability to access the site.
              </p>
            </Block>

            <Block label="7" title="Changes to the site or these terms">
              <p>
                Orbitlink may update, revise, suspend, or modify the site, its content, or
                these terms from time to time as services, operating posture, legal requirements,
                or commercial needs evolve.
              </p>
            </Block>

            <Block label="8" title="Contact">
              <p>
                Questions regarding these terms can be directed to{" "}
                <a
                  className="text-white/80 hover:text-white underline underline-offset-4"
                  href="mailto:concierge@orbitlink.ca"
                >
                  concierge@orbitlink.ca
                </a>
                .
              </p>
            </Block>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              TERMS NOTICE
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              These terms are intended to support a clear and controlled public-facing site
              posture. They may be updated as the site, services, legal obligations, or
              operational model evolve.
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