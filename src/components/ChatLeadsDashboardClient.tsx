"use client";

import dynamic from "next/dynamic";
import type { ChatLeadRecord } from "@/components/ChatLeadsDashboard";

const ChatLeadsDashboard = dynamic(
  () => import("@/components/ChatLeadsDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <div className="text-[11px] tracking-[0.28em] text-white/45">
          LOADING
        </div>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Loading chat leads dashboard
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/60">
          Preparing the live Orbitlink intake and response surface.
        </p>
      </div>
    ),
  }
);

export default function ChatLeadsDashboardClient({
  initialLeads,
}: {
  initialLeads: ChatLeadRecord[];
}) {
  return <ChatLeadsDashboard initialLeads={initialLeads} />;
}