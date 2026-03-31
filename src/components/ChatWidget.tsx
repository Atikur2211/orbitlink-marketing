"use client";

import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

type LeadIntent = "sales" | "billing" | "technical" | "appointment" | "general";

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  notes: string;
  intent: LeadIntent;
};

type RenderedMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const STORAGE_KEY = "orbitlink-chat-state-v2";

const QUICK_ACTIONS: Array<{
  label: string;
  value: string;
  intent: LeadIntent;
  openLeadForm?: boolean;
}> = [
  {
    label: "Business Internet",
    value: "I need business internet for a business location in Ontario.",
    intent: "sales",
  },
  {
    label: "Wi-Fi Issues",
    value: "We have Wi-Fi problems at our business location.",
    intent: "technical",
  },
  {
    label: "Technical Support",
    value: "Our business internet is not working properly.",
    intent: "technical",
    openLeadForm: true,
  },
  {
    label: "Billing Question",
    value: "I have a billing question for a business account.",
    intent: "billing",
    openLeadForm: true,
  },
  {
    label: "Get Pricing",
    value: "I want pricing for business internet.",
    intent: "sales",
    openLeadForm: true,
  },
  {
    label: "Book Appointment",
    value: "I want to book a connectivity review.",
    intent: "appointment",
    openLeadForm: true,
  },
];

function safeLower(value: string) {
  return value.toLowerCase();
}

function detectIntentFromText(text: string): LeadIntent {
  const lower = safeLower(text);

  if (
    lower.includes("billing") ||
    lower.includes("invoice") ||
    lower.includes("payment") ||
    lower.includes("charge")
  ) {
    return "billing";
  }

  if (
    lower.includes("technical") ||
    lower.includes("outage") ||
    lower.includes("not working") ||
    lower.includes("internet down") ||
    lower.includes("slow") ||
    lower.includes("speed") ||
    lower.includes("wifi") ||
    lower.includes("wi-fi") ||
    lower.includes("reliability") ||
    lower.includes("voice issue") ||
    lower.includes("support")
  ) {
    return "technical";
  }

  if (
    lower.includes("appointment") ||
    lower.includes("book") ||
    lower.includes("schedule") ||
    lower.includes("meeting") ||
    lower.includes("call tomorrow") ||
    lower.includes("discussion")
  ) {
    return "appointment";
  }

  if (
    lower.includes("pricing") ||
    lower.includes("quote") ||
    lower.includes("review") ||
    lower.includes("consultation") ||
    lower.includes("internet") ||
    lower.includes("dia") ||
    lower.includes("backup") ||
    lower.includes("new setup") ||
    lower.includes("fibre")
  ) {
    return "sales";
  }

  return "general";
}

function shouldOpenLeadFormFromConversation(messages: RenderedMessage[]) {
  const fullConversation = messages.map((m) => safeLower(m.text)).join(" ");

  const likelyBusiness =
    fullConversation.includes("clinic") ||
    fullConversation.includes("office") ||
    fullConversation.includes("warehouse") ||
    fullConversation.includes("business") ||
    fullConversation.includes("firm") ||
    fullConversation.includes("building") ||
    fullConversation.includes("company") ||
    fullConversation.includes("site") ||
    fullConversation.includes("organization");

  const hasLocation =
    fullConversation.includes("mississauga") ||
    fullConversation.includes("toronto") ||
    fullConversation.includes("brampton") ||
    fullConversation.includes("vaughan") ||
    fullConversation.includes("markham") ||
    fullConversation.includes("oakville") ||
    fullConversation.includes("milton") ||
    fullConversation.includes("ottawa") ||
    fullConversation.includes("ontario");

  const hasNeed =
    fullConversation.includes("slow") ||
    fullConversation.includes("speed") ||
    fullConversation.includes("wifi") ||
    fullConversation.includes("wi-fi") ||
    fullConversation.includes("reliability") ||
    fullConversation.includes("backup") ||
    fullConversation.includes("upgrade") ||
    fullConversation.includes("dia") ||
    fullConversation.includes("internet") ||
    fullConversation.includes("billing") ||
    fullConversation.includes("invoice") ||
    fullConversation.includes("outage") ||
    fullConversation.includes("technical");

  const hasTiming =
    fullConversation.includes("now") ||
    fullConversation.includes("future") ||
    fullConversation.includes("planning") ||
    fullConversation.includes("soon") ||
    fullConversation.includes("this week") ||
    fullConversation.includes("next week") ||
    fullConversation.includes("urgent");

  const strongIntent =
    fullConversation.includes("pricing") ||
    fullConversation.includes("quote") ||
    fullConversation.includes("talk to someone") ||
    fullConversation.includes("talk to a person") ||
    fullConversation.includes("call me") ||
    fullConversation.includes("contact me") ||
    fullConversation.includes("review") ||
    fullConversation.includes("consultation") ||
    fullConversation.includes("book a call") ||
    fullConversation.includes("billing issue") ||
    fullConversation.includes("technical issue") ||
    fullConversation.includes("live agent");

  return strongIntent || (likelyBusiness && hasLocation && hasNeed) || (likelyBusiness && hasNeed && hasTiming);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState("");
  const [leadError, setLeadError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [detectedIntent, setDetectedIntent] = useState<LeadIntent>("general");

  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    notes: "",
    intent: "general",
  });

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const renderedMessages = useMemo<RenderedMessage[]>(() => {
    return messages.map((message) => {
      const text =
        message.parts
          ?.filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("") || "";

      return {
        id: message.id,
        role: message.role as "user" | "assistant",
        text,
      };
    });
  }, [messages]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setHydrated(true);
        return;
      }

      const saved = JSON.parse(raw);

      if (saved?.messages) setMessages(saved.messages);
      if (typeof saved?.open === "boolean") setOpen(saved.open);
      if (typeof saved?.showLeadForm === "boolean") setShowLeadForm(saved.showLeadForm);
      if (saved?.leadForm) setLeadForm(saved.leadForm);
      if (saved?.detectedIntent) setDetectedIntent(saved.detectedIntent);
    } catch {
      // ignore restore errors
    } finally {
      setHydrated(true);
    }
  }, [setMessages]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages,
        open,
        showLeadForm,
        leadForm,
        detectedIntent,
      }),
    );
  }, [messages, open, showLeadForm, leadForm, detectedIntent, hydrated]);

  useEffect(() => {
    if (renderedMessages.length === 0) return;

    const fullConversation = renderedMessages.map((m) => m.text).join(" ");
    const nextIntent = detectIntentFromText(fullConversation);

    setDetectedIntent(nextIntent);

    setLeadForm((prev) => ({
      ...prev,
      intent: nextIntent,
    }));

    if (shouldOpenLeadFormFromConversation(renderedMessages)) {
      setShowLeadForm(true);
    }
  }, [renderedMessages]);

  function updateLeadField<K extends keyof LeadFormState>(
    key: K,
    value: LeadFormState[K],
  ) {
    setLeadForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetChat() {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setLeadSuccess("");
    setLeadError("");
    setShowLeadForm(false);
    setDetectedIntent("general");
    setLeadForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      notes: "",
      intent: "general",
    });
  }

  function handleQuickAction(action: (typeof QUICK_ACTIONS)[number]) {
    setOpen(true);
    setDetectedIntent(action.intent);

    setLeadForm((prev) => ({
      ...prev,
      intent: action.intent,
    }));

    if (action.openLeadForm) {
      setShowLeadForm(true);
    }

    sendMessage({ text: action.value });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = input.trim();
    if (!value) return;

    const nextIntent = detectIntentFromText(value);
    const lower = safeLower(value);

    const leadIntentPhrases = [
      "live agent",
      "human",
      "talk to someone",
      "talk to a person",
      "call me",
      "contact me",
      "sales rep",
      "real person",
      "quote",
      "pricing",
      "review",
      "consultation",
      "next step",
      "billing issue",
      "technical issue",
      "book a call",
      "schedule a call",
    ];

    setDetectedIntent(nextIntent);
    setLeadForm((prev) => ({
      ...prev,
      intent: nextIntent,
    }));

    if (leadIntentPhrases.some((phrase) => lower.includes(phrase))) {
      setShowLeadForm(true);
    }

    sendMessage({ text: value });
    setInput("");
  }

  async function submitLeadRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadSubmitting(true);
    setLeadSuccess("");
    setLeadError("");

    try {
      const transcriptMessages = renderedMessages
        .filter((m) => m.text.trim())
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const fallbackTranscript =
        transcriptMessages.length > 0
          ? transcriptMessages
          : [
              {
                role: "user" as const,
                text: [
                  leadForm.company ? `Company: ${leadForm.company}` : "",
                  leadForm.location ? `Location: ${leadForm.location}` : "",
                  leadForm.notes ? `Request: ${leadForm.notes}` : "Requested Orbitlink follow-up",
                ]
                  .filter(Boolean)
                  .join(" | "),
              },
            ];

      const response = await fetch("/api/chat-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          intent: leadForm.intent,
          source: "chat",
          page: typeof window !== "undefined" ? window.location.pathname : "",
          messages: fallbackTranscript,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setLeadSuccess(
        "Thanks — your request has been submitted. Orbitlink can now follow up directly.",
      );
      setLeadError("");
      setShowLeadForm(false);
      setLeadForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        location: "",
        notes: "",
        intent: detectedIntent,
      });
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#FACC15] px-5 py-3 text-sm font-medium text-black shadow-[0_20px_60px_rgba(250,204,21,0.22)] transition hover:bg-[#FDE047]"
        aria-label="Open Orbitlink chat"
      >
        Business Review
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[390px] overflow-hidden rounded-[28px] border border-white/10 bg-black/90 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-white">
                  Orbitlink Business Connectivity
                </div>
                <div className="mt-1 text-xs text-white/55">
                  Fibre, Wi-Fi, voice, backup, and commercial review
                </div>
                <div className="mt-2 text-[11px] text-emerald-300">
                  Live advisor • Ontario business support
                </div>
              </div>

              <button
                type="button"
                onClick={resetChat}
                className="text-xs text-white/45 transition hover:text-white/75"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="h-[380px] space-y-3 overflow-y-auto p-4">
            {renderedMessages.length === 0 && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/80">
                  Tell me what you're trying to solve. I can help review internet,
                  Wi-Fi, reliability, backup connectivity, billing, technical issues,
                  or a new setup.
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action)}
                      className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {renderedMessages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-10 rounded-2xl bg-[#FACC15] px-3 py-2 text-sm text-black"
                    : "mr-10 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75"
                }
              >
                {message.text || (
                  <span className="text-white/40">
                    {message.role === "assistant" ? "Thinking..." : ""}
                  </span>
                )}
              </div>
            ))}

            {(status === "submitted" || status === "streaming") && (
              <div className="mr-10 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/50">
                Typing...
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                Chat is temporarily unavailable. You can still send a follow-up request below.
              </div>
            )}

            {leadSuccess && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                {leadSuccess}
              </div>
            )}

            {showLeadForm && (
              <form
                onSubmit={submitLeadRequest}
                className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="text-sm font-medium text-white">
                  Start a business connectivity review
                </div>

                <div className="text-xs text-white/50">
                  We’ll review your location, requirements, and next steps.
                </div>

                <input
                  value={leadForm.name}
                  onChange={(e) => updateLeadField("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                  required
                />

                <input
                  value={leadForm.email}
                  onChange={(e) => updateLeadField("email", e.target.value)}
                  placeholder="Work email"
                  type="email"
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                  required
                />

                <input
                  value={leadForm.phone}
                  onChange={(e) => updateLeadField("phone", e.target.value)}
                  placeholder="Phone"
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <input
                  value={leadForm.company}
                  onChange={(e) => updateLeadField("company", e.target.value)}
                  placeholder="Company / organization"
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <input
                  value={leadForm.location}
                  onChange={(e) => updateLeadField("location", e.target.value)}
                  placeholder="City or service location"
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <textarea
                  value={leadForm.notes}
                  onChange={(e) => updateLeadField("notes", e.target.value)}
                  placeholder="Anything important we should know?"
                  rows={3}
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/55">
                  Request type: {leadForm.intent}
                </div>

                {leadError && (
                  <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                    {leadError}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="rounded-xl bg-[#FACC15] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047] disabled:opacity-60"
                  >
                    {leadSubmitting ? "Submitting..." : "Send request"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              onClick={() => setShowLeadForm(true)}
              className="block w-full rounded-xl bg-[#FACC15] px-3 py-2 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Start Business Review
            </button>

            <div className="mt-2 text-center text-xs text-white/50">
              Or speak directly with Orbitlink • 1-888-867-2480
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your business and location..."
              className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#FACC15] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}