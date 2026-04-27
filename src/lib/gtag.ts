"use client";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

type EventParams = Record<string, unknown>;

export const trackEvent = (
  action: string,
  params: EventParams = {}
) => {
  try {
    if (typeof window === "undefined") return;

    window.gtag?.("event", action, {
      page: window.location.pathname,
      ...params,
    });
  } catch {
    // never break UX
  }
};