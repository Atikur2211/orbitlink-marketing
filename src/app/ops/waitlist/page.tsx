// src/app/ops/waitlist/page.tsx
import PageShell from "@/components/PageShell";
import OpsSummaryBand from "@/components/OpsSummaryBand";
import OpsWaitlistTable from "@/components/OpsWaitlistTable";
import CopyEmailsButton from "@/components/CopyEmailsButton";
import fs from "fs";
import path from "path";

import { normalizeRecord, type WaitlistRecord } from "@/lib/waitlistOps";

export const runtime = "nodejs";

type WaitlistStoreLike =
  | unknown[]
  | {
      value?: unknown[];
      Count?: number;
    };

function extractRecords(data: WaitlistStoreLike): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && Array.isArray(data.value)) return data.value;
  return [];
}

function safeReadWaitlist(): WaitlistRecord[] {
  const filePath = path.join(process.cwd(), "waitlist.json");
  if (!fs.existsSync(filePath)) return [];

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data: WaitlistStoreLike = JSON.parse(raw);

    const rows = extractRecords(data);

    const normalized = rows.map(normalizeRecord).filter(Boolean) as WaitlistRecord[];

    normalized.sort((a, b) => {
      const ta = Date.parse(a.updatedAt || a.createdAt || a.ts || "") || 0;
      const tb = Date.parse(b.updatedAt || b.createdAt || b.ts || "") || 0;
      return tb - ta;
    });

    return normalized;
  } catch {
    return [];
  }
}

export default function OpsWaitlistPage() {
  const list = safeReadWaitlist();
  const enriched = list.some((x) => x.createdAt && x.id);

  return (
    <PageShell
      eyebrow="OPS"
      title="Waitlist (Internal)"
      subtitle="Read-only view of business enquiries, availability requests, pricing requests, and earlier lead captures."
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-white/85">
              Entries: <span className="text-white/70">{list.length}</span>
            </div>
            <div className="mt-1 text-xs text-white/55">
              Source: <span className="text-white/70">waitlist.json</span> • Schema:{" "}
              <span className="text-white/70">{enriched ? "enriched" : "basic"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <a
              href="/api/ops/waitlist.json"
              className="rounded-2xl bg-[#FACC15] px-4 py-2.5 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Download JSON
            </a>

            <a
              href="/api/ops/waitlist.csv"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm text-white transition hover:bg-white/10"
            >
              Export CSV
            </a>

            <CopyEmailsButton emails={list.map((x) => x.email)} />
          </div>
        </div>

        <OpsSummaryBand entries={list} />
        <OpsWaitlistTable entries={list} />

        <div className="mt-5 text-xs text-white/55">
          Protected by Ops Basic Auth. Keep unlinked from public navigation.
        </div>
      </div>
    </PageShell>
  );
}