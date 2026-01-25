// src/components/BentoServices.tsx
"use client";

import Link from "next/link";

function Card({
  title,
  desc,
  accent,
  children,
  href,
}: {
  title: string;
  desc: string;
  accent: "blue" | "gold" | "emerald";
  children: React.ReactNode;
  href: string;
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
      className={`group rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7 transition ${glow}`}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-sm sm:text-base font-medium text-white">
            {title}
          </div>
          <div className="mt-2 text-sm leading-6 text-white/65 max-w-[44ch]">
            {desc}
          </div>
        </div>

        <div className="shrink-0 text-xs text-white/50 group-hover:text-white/70 transition">
          Open →
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </Link>
  );
}

function FiberPulse() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] w-28 bg-blue-400/50 blur-md orbit-slide" />
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Fiber pulse • monitored
      </div>
    </div>
  );
}

function Waveform647() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25 flex items-center px-4">
      <div className="flex items-end gap-1 w-full opacity-95">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 rounded-sm bg-[#FACC15]/70 orbit-bar"
            style={{
              height: `${12 + ((i * 9) % 44)}px`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/75">
        (647)
      </div>
    </div>
  );
}

function SmartGrid() {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-4 gap-2 p-3 opacity-85">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-white/5 border border-white/10"
          />
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
          <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
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
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/25 flex items-center justify-center">
      <div className="relative h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
        <div className="absolute -inset-2 rounded-2xl border border-[#FACC15]/30 orbit-spin" />
        <div className="text-[#FACC15] text-xl">⛨</div>
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] text-white/55">
        Integrity check • just now
      </div>
    </div>
  );
}

export default function BentoServices() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-7 py-12 sm:py-14 lg:py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-white/55">
            MODULES
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
            Orbitlink System Surface
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-[15px] leading-6 text-white/65">
            Four core modules designed for reliability, operations, and regulated delivery.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <Card
          title="AUREX Internet"
          desc="Enterprise Connectivity. Scalable fiber and failover solutions for Mississauga businesses."
          accent="blue"
          href="/solutions#internet"
        >
          <FiberPulse />
        </Card>

        <Card
          title="AUREX Voice"
          desc="Precision PBX. Professional VoIP that sounds as good as your business looks."
          accent="gold"
          href="/solutions#voice"
        >
          <Waveform647 />
        </Card>

        <Card
          title="AUREX Smart"
          desc="The Connected Office. Intelligent IoT integration for real-time facility monitoring."
          accent="emerald"
          href="/solutions#smart"
        >
          <SmartGrid />
        </Card>

        <Card
          title="TIRAV Horizon"
          desc="Sovereign Compliance. Automated data archiving with zero-knowledge encryption."
          accent="gold"
          href="/trust"
        >
          <ShieldSeal />
        </Card>
      </div>
    </section>
  );
}
