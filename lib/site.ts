export const site = {
  name: "Wayfare",
  // Production origin for canonical URLs, sitemap, Open Graph and JSON-LD.
  url: "https://travel-money.uk",
  tagline: "Your money, wherever you go.",
  description:
    "Convert published travel currencies, plan a trip budget, and prepare travel money — using indicative rates for travel planning, not dealing quotes.",
  locale: "en_GB",
} as const;

export type Site = typeof site;
