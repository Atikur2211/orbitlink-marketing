import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TopNav from "@/components/TopNav";
import StickyStatusStrip from "@/components/StickyStatusStrip";
import BentoServices from "@/components/BentoServices";
import ConciergeBlock from "@/components/ConciergeBlock";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://orbitlink.ca";

export const metadata: Metadata = {
  title:
    "Business Fibre Internet & Dedicated Internet Access in Ontario | Orbitlink",
  description:
    "Business fibre internet, dedicated internet access (DIA), managed Wi-Fi, voice, and backup connectivity for Ontario businesses.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090D] text-white">
      <TopNav />
      <StickyStatusStrip />

      {/* HERO — CLEAN CINEMATIC */}
      <section className="relative isolate overflow-hidden min-h-[100dvh] flex items-center justify-center">
        <Image
          src="/images/hero-business-ontario.jpg"
          alt="Modern Ontario business environment"
          fill
          priority
          className="object-cover object-[72%_center] sm:object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.35),rgba(4,7,12,0.95))]" />

        <div className="relative max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/70">
            Business Fibre • Dedicated Internet • Managed Network
          </div>

          <h1 className="mt-6 text-[2.2rem] sm:text-[3.2rem] lg:text-[4.4rem] font-semibold leading-tight tracking-tight">
            Business Fibre Internet for Ontario Companies
          </h1>

          <p className="mt-5 text-[15px] sm:text-lg text-white/75 leading-relaxed">
            Reliable connectivity designed around your building, your operations,
            and your long-term growth — not generic packages.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact#intake"
              className="bg-[#FACC15] text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#FDE047] transition"
            >
              Check Availability
            </Link>

            <Link
              href="/compare"
              className="border border-white/15 px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition"
            >
              Compare Options
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/45">
            Operated by TIRAV Technologies Inc. • CRTC-registered reseller
          </div>
        </div>
      </section>

      {/* SOLUTIONS — PREMIUM REDESIGN */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Business Internet Solutions in Ontario
          </h2>
          <p className="mt-3 text-white/65">
            Connectivity options aligned to infrastructure, uptime requirements,
            and real business environments.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.03]">
            <h3 className="font-medium text-white">
              Business Fibre Internet
            </h3>
            <p className="mt-2 text-sm text-white/65">
              High-speed fibre designed for offices, clinics, and commercial
              environments.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.03]">
            <h3 className="font-medium text-white">
              Dedicated Internet Access (DIA)
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Consistent performance with higher assurance for critical operations.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.03]">
            <h3 className="font-medium text-white">
              Managed Wi-Fi & Network
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Reliable internal connectivity across devices and environments.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.03]">
            <h3 className="font-medium text-white">
              Backup & Continuity
            </h3>
            <p className="mt-2 text-sm text-white/65">
              LTE/5G failover options to maintain uptime when it matters.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-white/55 max-w-3xl">
          Every solution is reviewed based on your address, infrastructure,
          provider availability, and operational requirements.
        </p>
      </section>

      <BentoServices />

      {/* PROCESS — SIMPLIFIED */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            How it works
          </h2>
          <p className="mt-3 text-white/65">
            A simple, structured path from enquiry to recommendation.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            "Submit your business address",
            "We review infrastructure and options",
            "Receive a clear recommendation",
          ].map((step) => (
            <div
              key={step}
              className="rounded-2xl border border-white/10 p-6 bg-black/20"
            >
              <p className="text-sm text-white/80">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-white/10 p-8 bg-white/[0.03]">
          <h2 className="text-2xl font-semibold">
            Built for clarity and trust
          </h2>
          <p className="mt-3 text-white/65 max-w-3xl">
            Orbitlink provides structured, transparent recommendations so
            businesses understand availability, limitations, and options before
            making a decision.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-[#FACC15]/20 bg-[#FACC15]/10 p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Check what’s available at your location
          </h2>

          <p className="mt-3 text-white/70">
            No obligation. Clear answer based on your building and requirements.
          </p>

          <div className="mt-6">
            <Link
              href="/contact#intake"
              className="bg-[#FACC15] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#FDE047]"
            >
              Start Review
            </Link>
          </div>
        </div>
      </section>

      <ConciergeBlock />
      <SiteFooter />
    </main>
  );
}