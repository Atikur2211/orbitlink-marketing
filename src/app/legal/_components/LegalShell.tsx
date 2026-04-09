// src/app/legal/_components/LegalShell.tsx
import PageShell from "@/components/PageShell";

function formatUpdatedAt(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function LegalShell({
  eyebrow,
  title,
  subtitle,
  children,
  updatedAt,
  contactHref = "mailto:concierge@orbitlink.ca",
  contactLabel = "concierge@orbitlink.ca",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  updatedAt: string; // ISO date like "2026-01-15"
  children: React.ReactNode;
  contactHref?: string;
  contactLabel?: string;
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#FACC15]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[0.06] px-3 py-1 text-[10px] text-[#FDE68A] sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
                LEGAL DOCUMENT
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-white/55 sm:text-[11px]">
                Operational clarity surface
              </div>
            </div>

            <div className="text-xs text-white/55">
              Last updated:{" "}
              <span className="text-white/75">{formatUpdatedAt(updatedAt)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-6 sm:p-8">
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:leading-7 prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white/90 prose-a:text-white prose-a:no-underline hover:prose-a:text-white/80">
              {children}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.22em] text-white/55">
                DOCUMENT NOTICE
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                This legal page is presented as part of Orbitlink’s disclosure-first operating
                posture. Language is intended to remain readable, commercially clear, and aligned
                with the current service model.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Orbitlink is a brand of TIRAV Technologies Inc. These pages may be updated as
                services, operating posture, or legal requirements evolve.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
              <div className="text-[11px] tracking-[0.22em] text-white/55">CONTACT</div>
              <div className="mt-3 text-sm text-white/70">
                Questions about this document or the related service posture:
              </div>

              <a
                className="mt-3 inline-flex text-sm text-white/85 transition hover:text-white"
                href={contactHref}
              >
                {contactLabel}
              </a>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-5 text-white/55">
                For commercial service review, availability, or onboarding questions, use the
                main contact intake for a faster and more structured response path.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}