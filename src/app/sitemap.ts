import type { MetadataRoute } from "next";

const BASE_URL = "https://orbitlink.ca";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceEntries = servicePages.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
  }));

  const locationEntries = locationPages.map((slug) => ({
    url: `${BASE_URL}/locations/${slug}`,
  }));

  return [...staticEntries, ...serviceEntries, ...locationEntries];
}