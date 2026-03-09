"use client";

import Link from "next/link";

function Card({
  title,
  desc,
  accent,
  href,
  badge,
  bullets,
  children,
  cta = "View service",
}: {
  title: string;
  desc: string;
  accent: "blue" | "gold" | "emerald";
  href: string;
  badge: string;
  bullets: string[];
  children: React.ReactNode;
  cta?: string;
}) {
  const glow =
    accent === "blue"
      ? "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.22),0_22px_60px_rgba(59,130,246,0.10)]"
      : accent === "emerald"
      ? "hover:shadow-[0_0_0_1px_rgba(16,185,129,0.20),0_22px_60px_rgba(16,185,129,0.10)]"
      : "hover:shadow-[0_0_0_1px_rgba(250,204,21,0.18),0_22px_60px_rgba(250,204,21,0.10)]";

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-6 transition ${glow} sm:p-7`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.04] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.24em] text-white/50">{badge}</div>
            <div className="mt-3 text-lg font-medium text-white sm:text-[1.05rem]">{title}</div>
            <div className="mt-3 max-w-[46ch] text-sm leading-6 text-white/66">{desc}</div>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/60 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/78">
            {cta}
          </div>
        </div>

        <div className="mt-6">{children}</div>

        <div className="mt-5 flex flex-wrap gap-2">
          {bullets.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/66"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function FibrePulse() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="orbit-slide absolute left-0 top-1/2 h-[3px] w-28 -translate-y-1/2 bg-blue-400/50 blur-md" />
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Fibre service path
      </div>
    </div>
  );
}

function DedicatedLine() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0">
        <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-cyan-300/15 via-cyan-200/80 to-cyan-300/15" />
        <div className="absolute left-[22%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(56,253,254,0.45)]" />
        <div className="absolute right-[22%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(56,253,254,0.45)]" />
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Dedicated path
      </div>
    </div>
  );
}

function ManagedGrid() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-4 gap-2 p-3 opacity-85">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="rounded-sm border border-white/10 bg-white/5" />
        ))}
      </div>

      {[
        { left: "18%", top: "48%" },
        { left: "46%", top: "62%" },
        { left: "72%", top: "40%" },
      ].map((p, idx) => (
        <div
          key={idx}
          className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400"
          style={{ left: p.left, top: p.top }}
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
        </div>
      ))}

      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Managed network
      </div>
    </div>
  );
}

function VoiceWave() {
  return (
    <div className="relative flex h-24 items-center overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-4">
      <div className="flex w-full items-end gap-1 opacity-95">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="orbit-bar w-1.5 rounded-sm bg-[#FACC15]/70"
            style={{
              height: `${12 + ((i * 9) % 44)}px`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/75">
        Voice ready
      </div>
    </div>
  );
}

function ContinuityPulse() {
  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08),transparent_62%)]" />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <div className="orbit-spin absolute -inset-2 rounded-2xl border border-[#FACC15]/30" />
        <div className="text-lg text-[#FACC15]">↺</div>
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Backup ready
      </div>
    </div>
  );
}

function BuyerStep({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-xs font-medium text-[#FDE68A]">
          {step}
        </div>
        <div className="text-sm font-medium text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
    </div>
  );
}

function FitStrip({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-sm font-medium text-white/90">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
    </div>
  );
}

export default function BentoServices() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14 lg:py-16">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">SERVICES</div>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Business connectivity services, clearly organized
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-[15px]">
              Start with the service your site needs most. The goal is to make selection easier,
              reduce confusion, and help buyers move to the right next step faster.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/50">BUYER MODE</div>
            <div className="mt-1 text-sm text-white/80">
              Choose service • confirm fit • request pricing
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
          <Card
            title="Business Fibre Internet"
            desc="High-quality business internet for offices, commercial spaces, and growing organizations that need a cleaner provider experience."
            accent="blue"
            href="/services/business-fibre-internet"
            badge="INTERNET"
            bullets={["Business fibre", "Commercial sites", "Ontario"]}
            cta="View fibre"
          >
            <FibrePulse />
          </Card>

          <Card
            title="Dedicated Internet Access"
            desc="Dedicated connectivity for business sites that need stronger performance expectations, cleaner delivery, and more predictable service."
            accent="blue"
            href="/services/dedicated-internet-access"
            badge="DEDICATED CONNECTIVITY"
            bullets={["Dedicated internet", "Critical sites", "Business-grade"]}
            cta="View DIA"
          >
            <DedicatedLine />
          </Card>

          <Card
            title="Managed Wi-Fi & LAN"
            desc="Managed internal network service for businesses that need better Wi-Fi, cleaner segmentation, stronger support, and easier site operations."
            accent="emerald"
            href="/services/managed-lan-wifi"
            badge="MANAGED NETWORK"
            bullets={["Managed Wi-Fi", "LAN support", "Site operations"]}
            cta="View network"
          >
            <ManagedGrid />
          </Card>

          <Card
            title="Business Voice"
            desc="Cloud voice and business calling for teams that need number porting, front-desk routing, and a more structured communications setup."
            accent="gold"
            href="/services/voip-cloud-voice"
            badge="VOICE"
            bullets={["Cloud voice", "Number porting", "Call routing"]}
            cta="View voice"
          >
            <VoiceWave />
          </Card>

          <Card
            title="Backup Connectivity"
            desc="Continuity service for businesses that want LTE or 5G failover, outage resilience, and a stronger backup plan for critical operations."
            accent="gold"
            href="/services/lte-5g-continuity"
            badge="CONTINUITY"
            bullets={["LTE / 5G backup", "Failover", "Resilience"]}
            cta="View backup"
          >
            <ContinuityPulse />
          </Card>

          <Card
            title="IoT Connectivity"
            desc="Secure uplinks for gateways, sensors, and connected devices that need clearer segmentation and safer day-to-day connectivity."
            accent="emerald"
            href="/services/iot-connectivity"
            badge="CONNECTED DEVICES"
            bullets={["IoT uplinks", "Segmentation", "Monitoring-ready"]}
            cta="View IoT"
          >
            <ManagedGrid />
          </Card>
        </div>
      </div>

      <div className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:mt-5 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">BEST FIT</div>
            <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Where most buyers usually begin
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Most buyers start with the service that solves the main site need first, then add
              voice, backup, managed networking, or IoT as the scope becomes clearer.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/50">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Faster selection • Better fit</div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FitStrip
            title="Offices and commercial sites"
            body="Usually start with Business Fibre Internet."
          />
          <FitStrip
            title="Critical business locations"
            body="Usually start with Dedicated Internet Access."
          />
          <FitStrip
            title="Internal network and Wi-Fi issues"
            body="Usually start with Managed Wi-Fi & LAN."
          />
          <FitStrip
            title="Calling and continuity needs"
            body="Usually start with Business Voice or Backup Connectivity."
          />
        </div>
      </div>

      <div className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-5 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">HOW TO START</div>
            <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Start with the service the business needs most
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              You do not need to plan everything at once. Start with internet, voice, managed
              networking, backup, or IoT, then move into a clear request with your address,
              timeline, and site requirements.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/50">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Cleaner decisions • Better leads</div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          <BuyerStep
            step="1"
            title="Choose a service"
            desc="Start with fibre, dedicated internet, managed Wi-Fi, voice, backup, or IoT."
          />
          <BuyerStep
            step="2"
            title="Add your site details"
            desc="Share your address, timeline, and the requirements that matter most."
          />
          <BuyerStep
            step="3"
            title="Request review and pricing"
            desc="Submit one clear request and receive the next best step."
          />
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact#intake"
            className="rounded-2xl bg-[#FACC15] px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
          >
            Check Availability & Request Pricing
          </Link>
          <Link
            href="/services"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            Browse All Services
          </Link>
          <Link
            href="/trust"
            className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-center text-sm text-white/85 transition hover:border-white/20 hover:bg-white/5"
          >
            View Trust & Compliance
          </Link>
        </div>
      </div>
    </section>
  );
}