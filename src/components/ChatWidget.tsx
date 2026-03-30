"use client";

import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  notes: string;
};

const STORAGE_KEY = "orbitlink-chat-state-v1";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState("");
  const [leadError, setLeadError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    notes: "",
  });

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const renderedMessages = useMemo(() => {
    return messages.map((message) => {
      const text =
        message.parts
          ?.filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("") || "";

      return {
        id: message.id,
        role: message.role,
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
      }),
    );
  }, [messages, open, showLeadForm, leadForm, hydrated]);

  useEffect(() => {
    const fullConversation = renderedMessages.map((m) => m.text.toLowerCase()).join(" ");

    const likelyBusiness =
      fullConversation.includes("clinic") ||
      fullConversation.includes("office") ||
      fullConversation.includes("warehouse") ||
      fullConversation.includes("business") ||
      fullConversation.includes("firm") ||
      fullConversation.includes("building") ||
      fullConversation.includes("company");

    const hasLocation =
      fullConversation.includes("mississauga") ||
      fullConversation.includes("toronto") ||
      fullConversation.includes("brampton") ||
      fullConversation.includes("vaughan") ||
      fullConversation.includes("markham") ||
      fullConversation.includes("oakville") ||
      fullConversation.includes("milton") ||
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
      fullConversation.includes("internet");

    const hasTiming =
      fullConversation.includes("now") ||
      fullConversation.includes("future") ||
      fullConversation.includes("planning") ||
      fullConversation.includes("soon") ||
      fullConversation.includes("upgrade");

    if (likelyBusiness && hasLocation && hasNeed && hasTiming) {
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
    setLeadForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      notes: "",
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = input.trim();
    if (!value) return;

    const lower = value.toLowerCase();
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
    ];

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
                  leadForm.notes
                    ? `Request: ${leadForm.notes}`
                    : "Requested commercial review",
                ]
                  .filter(Boolean)
                  .join(" | "),
              },
            ];

      const response = await fetch("/api/chat-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          intent: "live-agent",
          source: "chat",
          page: typeof window !== "undefined" ? window.location.pathname : "",
          messages: fallbackTranscript,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to submit lead.");
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
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#FACC15] px-5 py-3 text-sm font-medium text-black shadow-lg transition hover:bg-[#FDE047]"
        aria-label="Open Orbitlink chat"
      >
        Check Connectivity
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-lg">
          <div className="border-b border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-white">
                  Orbitlink Connectivity Advisor
                </div>
                <div className="mt-1 text-xs text-white/55">
                  Business internet, Wi-Fi, voice, and availability guidance
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

          <div className="h-[320px] overflow-y-auto space-y-3 p-4">
            {renderedMessages.length === 0 && (
              <div className="space-y-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/70">
                  Describe your business, location, and what you're trying to improve.
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Clinic in Mississauga with slow Wi-Fi",
                    "Office internet upgrade",
                    "Need backup internet",
                    "Request commercial review",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        if (suggestion.toLowerCase().includes("review")) {
                          setShowLeadForm(true);
                        }
                        sendMessage({ text: suggestion });
                      }}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                    >
                      {suggestion}
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
                Chat temporarily unavailable.
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
                className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="text-sm font-medium text-white">
                  Request a commercial review
                </div>

                <div className="text-xs text-white/50">
                  This keeps your details here without restarting the conversation.
                </div>

                <input
                  value={leadForm.name}
                  onChange={(e) => updateLeadField("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                  required
                />

                <input
                  value={leadForm.email}
                  onChange={(e) => updateLeadField("email", e.target.value)}
                  placeholder="Work email"
                  type="email"
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                  required
                />

                <input
                  value={leadForm.phone}
                  onChange={(e) => updateLeadField("phone", e.target.value)}
                  placeholder="Phone (optional)"
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <input
                  value={leadForm.company}
                  onChange={(e) => updateLeadField("company", e.target.value)}
                  placeholder="Company / organization"
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <input
                  value={leadForm.location}
                  onChange={(e) => updateLeadField("location", e.target.value)}
                  placeholder="City or service location"
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                <textarea
                  value={leadForm.notes}
                  onChange={(e) => updateLeadField("notes", e.target.value)}
                  placeholder="Anything important we should know?"
                  rows={3}
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />

                {leadError && (
                  <div className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                    {leadError}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="rounded-lg bg-[#FACC15] px-3 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047] disabled:opacity-60"
                  >
                    {leadSubmitting ? "Submitting..." : "Send request"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10"
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
              className="block w-full rounded-lg bg-[#FACC15] px-3 py-2 text-center text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Request Commercial Review
            </button>

            <a
              href="/contact#intake"
              className="mt-2 block w-full rounded-lg border border-white/10 px-3 py-2 text-center text-sm text-white/75 transition hover:bg-white/10"
            >
              Open Full Contact Form
            </a>

            <div className="mt-2 text-center text-xs text-white/50">
              Prefer direct help? Call 1-888-867-2480
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your business and location..."
              className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#FACC15] px-3 py-2 text-sm font-medium text-black transition hover:bg-[#FDE047]"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}