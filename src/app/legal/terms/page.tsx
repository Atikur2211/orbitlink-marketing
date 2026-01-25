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
    <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
      <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white/90">{title}</h2>
      <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <PageShell
      eyebrow="LEGAL"
      title="Terms of Use"
      subtitle="Rules for using this site. Written to be clear and operationally realistic."
    >
      <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/25 px-6 py-4">
        <div className="text-xs text-white/60">Last updated</div>
        <div className="text-xs text-white/80">{lastUpdated}</div>
      </div>

      <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-5">
        <Block label="1" title="About Orbitlink">
          <p>
            Orbitlink is a brand of <span className="text-white/85">TIRAV Technologies Inc.</span> This website provides
            product information and controlled intake for prospective customers.
          </p>
        </Block>

        <Block label="2" title="No guarantees">
          <p>
            Content is provided for informational purposes. Availability, timelines, and features may change. We do not
            guarantee uninterrupted access, response times, or outcomes.
          </p>
        </Block>

        <Block label="3" title="Acceptable use">
          <p>
            You agree not to misuse the site, attempt unauthorized access, interfere with service operation, or submit
            harmful or deceptive content.
          </p>
        </Block>

        <Block label="4" title="Intellectual property">
          <p>
            Site content, branding, and design are owned by TIRAV Technologies Inc. You may not copy, distribute, or
            create derivative works without permission, except as allowed by law.
          </p>
        </Block>

        <Block label="5" title="Third-party links">
          <p>
            Links to third-party platforms (e.g., social) are provided for convenience. We are not responsible for
            third-party content or practices.
          </p>
        </Block>

        <Block label="6" title="Limitation of liability">
          <p>
            To the extent permitted by law, Orbitlink and TIRAV Technologies Inc. are not liable for indirect,
            incidental, special, consequential, or punitive damages arising from use of this site.
          </p>
        </Block>

        <Block label="7" title="Contact">
          <p>
            Questions can be directed to{" "}
            <a className="text-white/80 hover:text-white underline underline-offset-4" href="mailto:concierge@orbitlink.ca">
              concierge@orbitlink.ca
            </a>
            .
          </p>
        </Block>
      </div>
    </PageShell>
  );
}
