import PageShell from "@/components/PageShell";

function Tile({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="text-[11px] tracking-[0.28em] text-white/55">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white/90">{value}</div>
      {note ? (
        <div className="mt-2 text-sm leading-6 text-white/65">{note}</div>
      ) : null}
    </div>
  );
}

export default function PortalStatusPage() {
  return (
    <PageShell
      eyebrow="PORTAL"
      title="Status Preview"
      subtitle="High-level operational posture. No customer-specific data is displayed on this page."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <Tile
          label="POSTURE"
          value="OPERATIONAL"
          note="Public posture only. Customer status appears inside the portal after provisioning."
        />
        <Tile
          label="INTAKE"
          value="CONTROLLED"
          note="Requests are reviewed during onboarding windows. Response timing can vary."
        />
        <Tile
          label="DISCLOSURE"
          value="MINIMAL"
          note="We publish only what is necessary for trust and clarity."
        />
      </div>

      <div className="mt-4 sm:mt-5 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-7">
        <div className="text-[11px] tracking-[0.28em] text-white/55">NOTE</div>
        <p className="mt-3 text-sm sm:text-[15px] leading-6 text-white/70 max-w-3xl">
          This preview is intentionally conservative. If you are an approved client, operational details will be shared
          through the portal and direct communications.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="/coming-soon"
            className="rounded-2xl bg-[#FACC15] text-black px-5 py-3 text-sm font-medium hover:bg-[#FDE047] transition text-center"
          >
            Request Portal Access
          </a>
          <a
            href="/trust"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition text-center"
          >
            Trust & Compliance
          </a>
        </div>
      </div>
    </PageShell>
  );
}
