"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ThankYouTracker() {
  useEffect(() => {
    trackEvent("thank_you_view", {
      location: "contact_thank_you",
      intent: "form_submission",
    });
  }, []);

  return null;
}