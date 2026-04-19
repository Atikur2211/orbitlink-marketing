import type { MetadataRoute } from "next";

const BASE_URL = "https://orbitlink.ca";
const now = new Date();

const staticPages = [
  "/",
  "/about",
  "/business-fibre-internet-ontario",
  "/business-internet-ontario",
  "/business-internet-brampton",
  "/business-internet-milton",
  "/business-internet-mississauga",
  "/business-internet-toronto",
  "/compare",
  "/contact",
  "/internet-near-me",
  "/legal/acceptable-use",
  "/legal/privacy",
  "/legal/terms",
  "/locations",
  "/locations/ontario",
  "/network",
  "/services",
  "/solutions",
  "/trust",
  "/why-orbitlink",
] as const;

const servicePages = [
  "business-fibre-internet",
  "colocation-infrastructure",
  "dedicated-internet-access",
  "iot-connectivity",
  "lte-5g-continuity",
  "managed-lan-wifi",
  "starlink-agent",
  "static-ip-routing",
  "voip-cloud-voice",
] as const;

const locationPages = [
  "aurora",
  "barrie",
  "brampton",
  "burlington",
  "cambridge",
  "etobicoke",
  "guelph",
  "hamilton",
  "kingston",
  "kitchener-waterloo",
  "london",
  "markham",
  "milton",
  "mississauga",
  "newmarket",
  "niagara-st-catharines",
  "north-york",
  "oakville",
  "oshawa",
  "ottawa",
  "peterborough",
  "richmond-hill",
  "scarborough",
  "sudbury",
  "thunder-bay",
  "toronto",
  "vaughan",
  "whitby",
  "windsor",
] as const;

function pagePriority(path: string): number {
  if (path === "/") return 1.0;
  if (
    path === "/services" ||
    path === "/locations" ||
    path === "/business-fibre-internet-ontario" ||
    path === "/contact" ||
    path === "/solutions"
  ) {
    return 0.95;
  }
  if (path.startsWith("/business-internet-")) return 0.9;
  if (path.startsWith("/services/")) return 0.9;
  if (path.startsWith("/locations/")) return 0.85;
  if (path.startsWith("/legal")) return 0.5;
  return 0.8;
}

function changeFrequencyFor(
  path: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.startsWith("/legal")) return "yearly";
  if (path === "/" || path.startsWith("/services") || path.startsWith("/locations")) {
    return "weekly";
  }
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFrequencyFor(path),
    priority: pagePriority(path),
  }));

  const serviceEntries = servicePages.map((slug) => {
    const path = `/services/${slug}`;
    return {
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: changeFrequencyFor(path),
      priority: pagePriority(path),
    };
  });

  const locationEntries = locationPages.map((slug) => {
    const path = `/locations/${slug}`;
    return {
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: changeFrequencyFor(path),
      priority: pagePriority(path),
    };
  });

  return [...staticEntries, ...serviceEntries, ...locationEntries];
}