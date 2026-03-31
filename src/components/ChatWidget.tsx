"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type StoredChatState = {
  messages?: unknown;
  open?: boolean;
  showLeadForm?: boolean;
  showLeadPrompt?: boolean;
  leadForm?: Partial<LeadFormState>;
  detectedIntent?: LeadIntent;
  draftLeadId?: string;
  draftSessionId?: string;
};

const STORAGE_KEY = "orbitlink-chat-state-v7";

const QUICK_ACTIONS: Array<{
  label: string;
  value: string;
  intent: LeadIntent;
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
  },
  {
    label: "Billing Question",
    value: "I have a billing question for a business account.",
    intent: "billing",
  },
  {
    label: "Get Pricing",
    value: "I want pricing for business internet.",
    intent: "sales",
  },
  {
    label: "Book Appointment",
    value: "I want to book a connectivity review.",
    intent: "appointment",
  },
];

function safeLower(value: string) {
  return value.toLowerCase();
}

function isLeadIntent(value: unknown): value is LeadIntent {
  return (
    value === "sales" ||
    value === "billing" ||
    value === "technical" ||
    value === "appointment" ||
    value === "general"
  );
}

function getEmptyLeadForm(intent: LeadIntent = "general"): LeadFormState {
  return {
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    notes: "",
    intent,
  };
}

function makeDraftSessionId() {
  return `chat_${crypto.randomUUID()}`;
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
    lower.includes("new setup") ||
    lower.includes("install") ||
    lower.includes("upgrade") ||
    lower.includes("fibre") ||
    lower.includes("fiber") ||
    lower.includes("dia") ||
    lower.includes("dedicated internet") ||
    lower.includes("backup internet") ||
    lower.includes("business internet")
  ) {
    return "sales";
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
    lower.includes("support") ||
    lower.includes("disconnect") ||
    lower.includes("dropping")
  ) {
    return "technical";
  }

  if (lower.includes("internet")) {
    return "sales";
  }

  return "general";
}

function shouldSuggestLeadForm(messages: RenderedMessage[]) {
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length < 2) return false;

  const fullConversation = messages.map((m) => safeLower(m.text)).join(" ");

  const explicitFollowUpIntent =
    fullConversation.includes("pricing") ||
    fullConversation.includes("quote") ||
    fullConversation.includes("talk to someone") ||
    fullConversation.includes("talk to a person") ||
    fullConversation.includes("call me") ||
    fullConversation.includes("contact me") ||
    fullConversation.includes("review") ||
    fullConversation.includes("consultation") ||
    fullConversation.includes("book a call") ||
    fullConversation.includes("live agent") ||
    fullConversation.includes("someone reach out");

  const likelyQualifiedBusinessLead =
    (fullConversation.includes("clinic") ||
      fullConversation.includes("office") ||
      fullConversation.includes("warehouse") ||
      fullConversation.includes("business") ||
      fullConversation.includes("retail") ||
      fullConversation.includes("firm") ||
      fullConversation.includes("company")) &&
    (fullConversation.includes("mississauga") ||
      fullConversation.includes("toronto") ||
      fullConversation.includes("brampton") ||
      fullConversation.includes("vaughan") ||
      fullConversation.includes("markham") ||
      fullConversation.includes("oakville") ||
      fullConversation.includes("milton") ||
      fullConversation.includes("ottawa") ||
      fullConversation.includes("ontario")) &&
    (fullConversation.includes("new setup") ||
      fullConversation.includes("upgrade") ||
      fullConversation.includes("pricing") ||
      fullConversation.includes("quote") ||
      fullConversation.includes("business internet") ||
      fullConversation.includes("dia") ||
      fullConversation.includes("backup internet"));

  return explicitFollowUpIntent || likelyQualifiedBusinessLead;
}

function shouldCreateDraftLead(messages: RenderedMessage[]) {
  const userMessages = messages.filter((m) => m.role === "user");
  return userMessages.length >= 2;
}

function normalizeStoredLeadForm(value: unknown, fallbackIntent: LeadIntent) {
  if (!value || typeof value !== "object") {
    return getEmptyLeadForm(fallbackIntent);
  }

  const obj = value as Partial<LeadFormState>;

  return {
    name: typeof obj.name === "string" ? obj.name : "",
    email: typeof obj.email === "string" ? obj.email : "",
    phone: typeof obj.phone === "string" ? obj.phone : "",
    company: typeof obj.company === "string" ? obj.company : "",
    location: typeof obj.location === "string" ? obj.location : "",
    notes: typeof obj.notes === "string" ? obj.notes : "",
    intent: isLeadIntent(obj.intent) ? obj.intent : fallbackIntent,
  };
}

function extractEmail(text: string) {
  const match = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match ? match[0] : "";
}

function extractPhone(text: string) {
  const match = text.match(
    /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
  );
  return match ? match[0] : "";
}

function extractLocation(text: string) {
  const cities = [
    "mississauga",
    "toronto",
    "brampton",
    "vaughan",
    "markham",
    "oakville",
    "milton",
    "ottawa",
    "ontario",
  ];

  const lower = text.toLowerCase();
  const found = cities.find((city) => lower.includes(city));

  return found ? found.charAt(0).toUpperCase() + found.slice(1) : "";
}

async function upsertDraftLead(body: Record<string, unknown>) {
  const response = await fetch("/api/chat-leads/draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
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
  const [showLeadPrompt, setShowLeadPrompt] = useState(false);
  const [draftLeadId, setDraftLeadId] = useState("");
  const [draftSessionId, setDraftSessionId] = useState("");

  const draftSyncingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [leadForm, setLeadForm] = useState<LeadFormState>(getEmptyLeadForm());

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
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [renderedMessages, status, showLeadPrompt, showLeadForm, leadSuccess, leadError]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        const sessionId = makeDraftSessionId();
        setDraftSessionId(sessionId);
        setHydrated(true);
        return;
      }

      const saved = JSON.parse(raw) as StoredChatState;
      const nextIntent = isLeadIntent(saved?.detectedIntent)
        ? saved.detectedIntent
        : "general";

      if (saved?.messages) {
        setMessages(saved.messages as never);
      }

      if (typeof saved?.open === "boolean") {
        setOpen(saved.open);
      }

      setShowLeadForm(false);
      setShowLeadPrompt(false);
      setDetectedIntent(nextIntent);
      setLeadForm(normalizeStoredLeadForm(saved?.leadForm, nextIntent));

      setDraftLeadId(typeof saved?.draftLeadId === "string" ? saved.draftLeadId : "");
      setDraftSessionId(
        typeof saved?.draftSessionId === "string" && saved.draftSessionId
          ? saved.draftSessionId
          : makeDraftSessionId(),
      );
    } catch {
      setDraftSessionId(makeDraftSessionId());
    } finally {
      setHydrated(true);
    }
  }, [setMessages]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;

    const stateToStore: StoredChatState = {
      messages,
      open,
      showLeadForm,
      showLeadPrompt,
      leadForm,
      detectedIntent,
      draftLeadId,
      draftSessionId,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
  }, [
    messages,
    open,
    showLeadForm,
    showLeadPrompt,
    leadForm,
    detectedIntent,
    draftLeadId,
    draftSessionId,
    hydrated,
  ]);

  useEffect(() => {
    if (renderedMessages.length === 0) return;

    const fullConversation = renderedMessages.map((m) => m.text).join(" ");
    const lastUserMessage =
      [...renderedMessages].reverse().find((m) => m.role === "user")?.text || "";

    const nextIntent = detectIntentFromText(fullConversation);

    setDetectedIntent(nextIntent);

    setLeadForm((prev) => {
      const email = extractEmail(lastUserMessage);
      const phone = extractPhone(lastUserMessage);
      const location = extractLocation(lastUserMessage);

      return {
        ...prev,
        intent: nextIntent,
        email: prev.email || email,
        phone: prev.phone || phone,
        location: prev.location || location,
      };
    });

    if (!showLeadForm && !showLeadPrompt && shouldSuggestLeadForm(renderedMessages)) {
      setShowLeadPrompt(true);
    }
  }, [renderedMessages, showLeadForm, showLeadPrompt]);

  useEffect(() => {
    async function syncDraftLead() {
      if (!hydrated) return;
      if (!draftSessionId) return;
      if (!shouldCreateDraftLead(renderedMessages)) return;
      if (draftSyncingRef.current) return;

      draftSyncingRef.current = true;

      try {
        const transcriptMessages = renderedMessages
          .filter((m) => m.text.trim())
          .map((m) => ({
            role: m.role,
            text: m.text,
          }));

        const result = await upsertDraftLead({
          draftLeadId: draftLeadId || undefined,
          draftSessionId,
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          company: leadForm.company,
          location: leadForm.location,
          intent: detectedIntent,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          notes: leadForm.notes,
          messages: transcriptMessages,
        });

        if (!result?.ok) {
          throw new Error(result?.error || "Draft lead sync failed.");
        }

        if (typeof result?.draftLeadId === "string") {
          setDraftLeadId(result.draftLeadId);
        }
      } catch (error) {
        console.error("Draft lead sync failed:", error);
        setLeadError(
          error instanceof Error ? error.message : "Draft lead sync failed.",
        );
      } finally {
        draftSyncingRef.current = false;
      }
    }

    void syncDraftLead();
  }, [
    hydrated,
    draftSessionId,
    draftLeadId,
    renderedMessages,
    leadForm.name,
    leadForm.email,
    leadForm.phone,
    leadForm.company,
    leadForm.location,
    leadForm.notes,
    detectedIntent,
  ]);

  function updateLeadField<K extends keyof LeadFormState>(
    key: K,
    value: LeadFormState[K],
  ) {
    setLeadForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function openLeadFormPanel(intent?: LeadIntent) {
    const nextIntent = intent ?? detectedIntent;

    setDetectedIntent(nextIntent);
    setLeadForm((prev) => ({
      ...prev,
      intent: nextIntent,
    }));
    setLeadError("");
    setLeadSuccess("");
    setShowLeadPrompt(false);
    setShowLeadForm(true);
  }

  function closeLeadFormPanel() {
    setShowLeadForm(false);
    setLeadError("");
  }

  function resetChat() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }

    setMessages([]);
    setLeadSuccess("");
    setLeadError("");
    setShowLeadForm(false);
    setShowLeadPrompt(false);
    setDetectedIntent("general");
    setLeadForm(getEmptyLeadForm());
    setInput("");
    setDraftLeadId("");
    setDraftSessionId(makeDraftSessionId());
  }

  function handleQuickAction(action: (typeof QUICK_ACTIONS)[number]) {
    setOpen(true);
    setDetectedIntent(action.intent);
    setLeadForm((prev) => ({
      ...prev,
      intent: action.intent,
    }));
    setLeadSuccess("");
    setLeadError("");
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
      setShowLeadPrompt(true);
    }

    setLeadSuccess("");
    setLeadError("");
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
                  leadForm.notes
                    ? `Request: ${leadForm.notes}`
                    : "Requested Orbitlink follow-up",
                ]
                  .filter(Boolean)
                  .join(" | "),
              },
            ];

      let finalDraftLeadId = draftLeadId;

      if (!finalDraftLeadId && fallbackTranscript.length > 0) {
        const draftResult = await upsertDraftLead({
          draftLeadId: undefined,
          draftSessionId,
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          company: leadForm.company,
          location: leadForm.location,
          intent: leadForm.intent,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          notes: leadForm.notes,
          messages: fallbackTranscript,
        });

        if (!draftResult?.ok || !draftResult?.draftLeadId) {
          throw new Error(draftResult?.error || "Failed to create draft lead.");
        }

        finalDraftLeadId = draftResult.draftLeadId;
        setDraftLeadId(finalDraftLeadId);
      }

      const response = await fetch("/api/chat-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          draftLeadId: finalDraftLeadId || undefined,
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
      setShowLeadPrompt(false);
      setLeadForm(getEmptyLeadForm(detectedIntent));
      setDraftLeadId("");
      setDraftSessionId(makeDraftSessionId());
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#FACC15] px-5 py-3 text-sm font-medium text-black shadow-[0_20px_60px_rgba(250,204,21,0.22)] transition hover:bg-[#FDE047]"
        aria-label="Open Orbitlink chat"
      >
        Business Review
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[430px] overflow-hidden rounded-[28px] border border-white/10 bg-black/90 shadow-2xl backdrop-blur-xl max-sm:left-4 max-sm:right-4 max-sm:bottom-24 max-sm:w-auto">
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

          <div className="grid grid-cols-1">
            <div
              ref={scrollRef}
              className="h-[420px] space-y-3 overflow-y-auto p-4"
            >
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
                        type="button"
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

              {leadError && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {leadError}
                </div>
              )}

              {leadSuccess && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                  {leadSuccess}
                </div>
              )}

              {showLeadPrompt && !showLeadForm && (
                <div className="rounded-2xl border border-[#FACC15]/20 bg-[#FACC15]/[0.08] p-4">
                  <div className="text-sm font-medium text-white">
                    Ready to move this forward?
                  </div>
                  <div className="mt-1 text-xs leading-5 text-white/65">
                    You can keep chatting, or open a quick Orbitlink follow-up request without leaving this page.
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openLeadFormPanel(detectedIntent)}
                      className="rounded-xl bg-[#FACC15] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047]"
                    >
                      Open request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLeadPrompt(false)}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
                    >
                      Keep chatting
                    </button>
                  </div>
                </div>
              )}
            </div>

            {showLeadForm && (
              <div className="border-t border-white/10 bg-black/40 p-4">
                <form onSubmit={submitLeadRequest} className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Start a business connectivity review
                      </div>
                      <div className="mt-1 text-xs text-white/50">
                        We’ll review your location, requirements, and next steps.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={closeLeadFormPanel}
                      className="text-xs text-white/45 transition hover:text-white/75"
                    >
                      Close
                    </button>
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
                      onClick={closeLeadFormPanel}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {!showLeadForm && (
            <div className="border-t border-white/10 p-3">
              <button
                type="button"
                onClick={() => openLeadFormPanel(detectedIntent)}
                className="block w-full rounded-xl bg-[#FACC15] px-3 py-2 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
              >
                Start Business Review
              </button>

              <div className="mt-2 text-center text-xs text-white/50">
                Or speak directly with Orbitlink • 1-888-867-2480
              </div>
            </div>
          )}

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