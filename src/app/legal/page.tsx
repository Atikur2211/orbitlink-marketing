import PageShell from "@/components/PageShell";
import Link from "next/link";

function Card({
  href,
  label,
  title,
  desc,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 hover:bg-white/[0.06] transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
          <div className="mt-2 text-lg sm:text-xl font-semibold text-white/90">
            {title}
          </div>
          <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/65 max-w-2xl">
            {desc}
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/60 group-hover:text-white/80 transition">
          Open
        </div>
      </div>
    </Link>
  );
}

export default function LegalIndexPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Policies & Legal"
      subtitle="Clear terms. Minimal ambiguity. Written for enterprise-grade operations — without overclaiming."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <Card
          href="/legal/privacy"
          label="PRIVACY"
          title="Privacy Policy"
          desc="How we collect, use, and protect information submitted through this site and our controlled intake workflows."
        />
        <Card
          href="/legal/terms"
          label="TERMS"
          title="Terms of Use"
          desc="Rules for using the Orbitlink website, including disclaimers, acceptable conduct, and limitation language."
        />
        <Card
          href="/legal/acceptable-use"
          label="ACCEPTABLE USE"
          title="Acceptable Use Policy"
          desc="Defines prohibited behavior and misuse — protects service integrity, customers, and operational posture."
        />
        <Card
          href="/legal/cookies"
          label="COOKIES"
          title="Cookies & Analytics"
          desc="Explains cookie usage, optional analytics, and how to control tracking preferences where applicable."
        />
      </div>

      <div className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">REGULATORY-SAFE NOTE</div>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
          Orbitlink is a brand of <span className="text-white/85">TIRAV Technologies Inc.</span> Service
          availability, onboarding, and product status may change as operational and regulatory milestones complete.
        </p>
      </div>
    </PageShell>
  );
}
