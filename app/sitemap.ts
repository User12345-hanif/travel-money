import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedCurrencySlugs } from "@/lib/data/currency-content";
import { publishedToolRoutes, routes } from "@/lib/routes";

/**
 * Emits the homepage, published currency pages, and published tool pages.
 * Reserved but unpublished URLs are not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const currencyPages: MetadataRoute.Sitemap = publishedCurrencySlugs.map((slug) => ({
    url: `${site.url}${routes.currency(slug)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = publishedToolRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...currencyPages,
    ...toolPages,
  ];
}
