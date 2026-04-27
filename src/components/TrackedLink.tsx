"use client";

import type { ReactNode, MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  eventName,
  location,
  cta,
  className,
  children,
}: {
  href: string;
  eventName: string;
  location: string;
  cta?: string;
  className?: string;
  children: ReactNode;
}) {
  const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, {
      location,
      cta,
      href,
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}