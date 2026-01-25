// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://orbitlink.ca";

  // Keep this list tight + canonical.
  const routes = [
    "/",
    "/solutions",
    "/network",
    "/trust",
    "/about",
    "/contact",
    "/coming-soon",
    "/legal",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/acceptable-use",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.6,
  }));
}
