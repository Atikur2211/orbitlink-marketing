export const trackEvent = (
  action: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", action, params);
  }
};