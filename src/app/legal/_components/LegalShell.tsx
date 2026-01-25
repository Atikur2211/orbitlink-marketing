// src/app/legal/_components/LegalShell.tsx
import PageShell from "@/components/PageShell";

export default function LegalShell({
  eyebrow,
  title,
  subtitle,
  children,
  updatedAt,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  updatedAt: string; // ISO date like "2026-01-15"
  children: React.ReactNode;
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            LEGAL DOCUMENT
          </div>
          <div className="text-xs text-white/55">
            Last updated: <span className="text-white/75">{updatedAt}</span>
          </div>
        </div>

        <div className="mt-6 prose prose-invert prose-p:leading-7 prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white/90 max-w-none">
          {children}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT</div>
          <div className="mt-2 text-sm text-white/70">
            Questions about these terms:
          </div>
          <a
            className="mt-2 inline-flex text-sm text-white/80 hover:text-white transition"
            href="mailto:concierge@orbitlink.ca"
          >
            concierge@orbitlink.ca
          </a>
          <div className="mt-3 text-xs text-white/50 leading-5">
            Orbitlink is a brand of TIRAV Technologies Inc. These pages are provided for
            clarity and operational hygiene and may be updated as services evolve.
          </div>
        </div>
      </div>
    </PageShell>
  );
}
