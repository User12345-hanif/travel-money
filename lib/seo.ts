import type { Metadata } from "next";
import { site } from "./site";

/** Absolute URL for a site-relative path. */
function absolute(path: string): string {
  return path.startsWith("http") ? path : `${site.url}${path}`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** schema.org BreadcrumbList JSON-LD. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** schema.org FAQPage JSON-LD. */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Builds page metadata with sensible defaults, canonical URL and Open Graph.
 * New pages call this so canonical/OG stay consistent across the site.
 */
export function createMetadata({
  title,
  description = site.description,
  path = "/",
  noindex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const canonical = path;
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;

  return {
    // Omit `title` when unset so the root layout default is used. Passing
    // `title: undefined` from the homepage previously wiped the document title.
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: canonical,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
