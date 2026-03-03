import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VoIP & Cloud Voice | Orbitlink™",
  description:
    "Business VoIP and cloud voice services with onboarding support, number porting guidance, and a reliability-first posture for modern teams.",
  alternates: { canonical: "/services/voip-cloud-voice" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm tracking-wide text-white/60">AUREX Voice</span>
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          VoIP & Cloud Voice
        </h1>

        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Modern voice isn’t just dial tone—it’s routing, reliability, and operational readiness.
          Orbitlink supports cloud voice deployments with business-appropriate onboarding and
          clear expectations.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact#intake"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-[#0B0F14] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Request Voice Options
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
          >
            Back to Services
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold tracking-tight">Included guidance</h2>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            Number porting readiness, endpoint considerations, and clean onboarding for business
            operations. Availability depends on service design and feasibility.
          </p>
        </div>
      </section>
    </main>
  );
}