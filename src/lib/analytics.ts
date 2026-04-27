"use client";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

type EventParams = Record<string, unknown>;

export function trackEvent(action: string, params: EventParams = {}) {
  try {
    if (typeof window === "undefined") return;

    window.gtag?.("event", action, {
      page: window.location.pathname,
      path: window.location.pathname,
      url: window.location.href,
      ...params,
    });
  } catch {
    // Never break UX because of analytics
  }
}

export function trackPageView(path?: string) {
  try {
    if (typeof window === "undefined") return;

    window.gtag?.("event", "page_view", {
      page_path: path || window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch {
    // Silent fail
  }
}

export function trackFormStart(params: {
  location: string;
  form: string;
  serviceType?: string;
}) {
  trackEvent("form_start", params);
}

export function trackFormSubmit(params: {
  location: string;
  form: string;
  serviceType?: string;
}) {
  trackEvent("form_submit", params);
}

export function trackFormError(params: {
  location: string;
  form: string;
  error?: string;
}) {
  trackEvent("form_error", params);
}