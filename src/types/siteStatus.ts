// src/types/siteStatus.ts
export {};

declare global {
  interface Window {
    /** GA4 gtag, if present */
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}