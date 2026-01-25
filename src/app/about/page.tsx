import PageShell from "@/components/PageShell";
import { ABOUT_STORY } from "@/lib/siteStatus";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="ABOUT"
      title={ABOUT_STORY.headline}
      subtitle={ABOUT_STORY.subhead}
    >
      {/* Story blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {ABOUT_STORY.story.map((b) => (
          <div
            key={b.label}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7"
          >
            <div className="text-[11px] tracking-[0.28em] text-white/55">
              {b.label}
            </div>
            <p className="mt-4 text-sm sm:text-[15px] leading-6 text-white/70">
              {b.text}
            </p>
          </div>
        ))}
      </div>

      {/* Principles */}
      <div className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">
          OPERATING PRINCIPLES
        </div>
        <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
          A disciplined operator posture
        </h2>
        <p className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-6 text-white/65">
          Orbitlink is engineered to feel calm and precise — because that is how we operate. The
          goal is long-term reliability, not short-term noise.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {ABOUT_STORY.principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="text-sm font-medium text-white/90">{p.title}</div>
              <p className="mt-2 text-sm leading-6 text-white/65">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate disclosure strip */}
      <div className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">
          CORPORATE DISCLOSURE
        </div>
        <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70">
          Orbitlink is a brand of <span className="text-white/85">TIRAV Technologies Inc.</span>{" "}
          Service availability and onboarding are introduced through controlled intake windows.
          Public status statements are updated as regulatory and operational milestones complete.
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="/trust"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
          >
            Trust & Compliance
          </a>
          <a
            href="/coming-soon"
            className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
          >
            Request Access
          </a>
        </div>
      </div>
    </PageShell>
  );
}