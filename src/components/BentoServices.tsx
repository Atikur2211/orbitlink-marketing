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
}: {
  title: string;
  desc: string;
  accent: "blue" | "gold" | "emerald";
  href: string;
  badge: string;
  bullets: string[];
  children: React.ReactNode;
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
            <div className="mt-3 max-w-[46ch] text-sm leading-6 text-white/65">{desc}</div>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/60 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/78">
            View
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

function FiberPulse() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="orbit-slide absolute left-0 top-1/2 h-[3px] w-28 -translate-y-1/2 bg-blue-400/50 blur-md" />
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Fibre path • monitored
      </div>
    </div>
  );
}

function Waveform647() {
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

function SmartGrid() {
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
        Nodes active • alerts enabled
      </div>
    </div>
  );
}

function ShieldSeal() {
  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <div className="orbit-spin absolute -inset-2 rounded-2xl border border-[#FACC15]/30" />
        <div className="text-xl text-[#FACC15]">⛨</div>
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Integrity check • current
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

export default function BentoServices() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-14 lg:py-16">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">SERVICE SURFACE</div>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Orbitlink service modules
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-[15px]">
              Each service is presented as a business-ready module with a clear role, cleaner
              buying context, and a more structured delivery posture than a typical small-provider
              catalog.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/50">BUYER MODE</div>
            <div className="mt-1 text-sm text-white/80">Choose module • confirm fit • move forward</div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
          <Card
            title="AUREX Internet"
            desc="Business fibre internet and dedicated connectivity for organizations that need clean onboarding, stronger performance posture, and a more professional service experience."
            accent="blue"
            href="/services/business-fibre-internet"
            badge="CONNECTIVITY"
            bullets={["Business Fibre", "Dedicated Internet", "Ontario business sites"]}
          >
            <FiberPulse />
          </Card>

          <Card
            title="AUREX Voice"
            desc="Business cloud voice and VoIP for teams that need cleaner call routing, number porting support, and a more structured communications rollout."
            accent="gold"
            href="/services/voip-cloud-voice"
            badge="COMMUNICATIONS"
            bullets={["Cloud Voice", "Number Porting", "Business Call Routing"]}
          >
            <Waveform647 />
          </Card>

          <Card
            title="AUREX Smart"
            desc="IoT connectivity and secure uplinks for device fleets, sensors, gateways, and environments that need clearer boundaries and safer operational control."
            accent="emerald"
            href="/services/iot-connectivity"
            badge="CONNECTED SYSTEMS"
            bullets={["IoT Uplinks", "Segmentation", "Monitoring-ready"]}
          >
            <SmartGrid />
          </Card>

          <Card
            title="TIRAV Horizon"
            desc="Trust, compliance, and evidence-friendly operational posture for buyers and reviewers who expect clearer governance, controlled disclosure, and disciplined service language."
            accent="gold"
            href="/trust"
            badge="TRUST LAYER"
            bullets={["Trust Surface", "Verification Path", "Controlled Disclosure"]}
          >
            <ShieldSeal />
          </Card>
        </div>
      </div>

      <div className="mt-4 rounded-[32px] border border-white/10 bg-black/25 p-6 sm:mt-5 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.28em] text-white/55">HOW TO USE THIS SURFACE</div>
            <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Start with the module that matches the business need
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
              Buyers do not need to decode the whole platform at once. Start with the service that
              best fits the site, then add voice, continuity, network, infrastructure, or trust
              context as the requirement becomes clearer.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] text-white/50">OUTCOME</div>
            <div className="mt-1 text-sm text-white/80">Cleaner decisions • Better fit</div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          <BuyerStep
            step="1"
            title="Choose the primary service"
            desc="Start with internet, voice, smart connectivity, or trust review depending on the buyer’s real objective."
          />
          <BuyerStep
            step="2"
            title="Add operational context"
            desc="Layer in continuity, managed networking, static routing, or infrastructure requirements where needed."
          />
          <BuyerStep
            step="3"
            title="Move into structured intake"
            desc="Use the contact path to submit one clear request tied to the service, address, timeline, and site needs."
          />
        </div>
      </div>
    </section>
  );
}