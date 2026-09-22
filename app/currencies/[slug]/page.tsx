import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCurrencies, type Currency } from "@/lib/data/currencies";
import {
  getCurrencyContent,
  publishedCurrencySlugs,
} from "@/lib/data/currency-content";
import { routes } from "@/lib/routes";
import {
  breadcrumbSchema,
  createMetadata,
  faqSchema,
  type BreadcrumbItem,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { CurrencyHero } from "@/components/currency/CurrencyHero";
import { ExchangeRateCard } from "@/components/currency/ExchangeRateCard";
import { TravelBudget } from "@/components/currency/TravelBudget";
import { CurrencyFacts } from "@/components/currency/CurrencyFacts";
import { CurrencyInfo } from "@/components/currency/CurrencyInfo";
import { TravelMoney } from "@/components/currency/TravelMoney";
import { CurrencyFaq } from "@/components/currency/CurrencyFaq";
import { RelatedLinks } from "@/components/currency/RelatedLinks";
import { getRateSnapshot } from "@/lib/rates/snapshot";

// Published currencies are statically generated at build time. Any other slug
// is handled on demand and returns a clean 404 via notFound() below (this
// avoids the internal NoFallbackError that `dynamicParams = false` logs for the
// many not-yet-built currency routes the site links to).
export const dynamicParams = true;

export function generateStaticParams() {
  return publishedCurrencySlugs.map((slug) => ({ slug }));
}

function findCurrencyBySlug(slug: string): Currency | undefined {
  return allCurrencies.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/currencies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const currency = findCurrencyBySlug(slug);
  const content = getCurrencyContent(slug);
  if (!currency || !content) {
    // Unpublished currency: this URL 404s. Return a non-indexable response with
    // no canonical so it can never be mistaken for a real, indexable page.
    return {
      title: "Currency not found",
      robots: { index: false, follow: false },
      alternates: { canonical: null },
    };
  }

  return createMetadata({
    title:
      content.metaTitle ??
      `${currency.name} (${currency.code}) Exchange Rate & Currency Guide`,
    description: content.metaDescription,
    path: routes.currency(slug),
  });
}

export default async function CurrencyPage({
  params,
}: PageProps<"/currencies/[slug]">) {
  const { slug } = await params;
  const currency = findCurrencyBySlug(slug);
  const content = getCurrencyContent(slug);

  if (!currency || !content) notFound();

  const rateTable = await getRateSnapshot();

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Currencies", path: routes.currencies },
    { name: currency.name, path: routes.currency(slug) },
  ];

  const infoBlocks = [
    content.about,
    content.howRatesWork,
    content.whatAffects,
    content.readingRates,
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(content.faqs)]} />

      <CurrencyHero
        currency={currency}
        summary={content.summary}
        breadcrumbs={breadcrumbs}
        rateTable={rateTable}
        heading={content.h1}
      />

      <ExchangeRateCard
        currency={currency}
        baseCodes={content.rateBaseCodes}
        description={content.rateSummaryDescription}
        rateTable={rateTable}
      />

      <TravelBudget currency={currency} rateTable={rateTable} />

      <TravelMoney
        currency={currency}
        blocks={content.travel}
        place={content.travelPlace}
      />

      <CurrencyFacts currency={currency} />

      <CurrencyInfo currency={currency} blocks={infoBlocks} />

      <CurrencyFaq faqs={content.faqs} currencyName={currency.name} />

      <RelatedLinks
        currency={currency}
        relatedCurrencyCodes={content.relatedCurrencyCodes}
        pairBases={content.conversionPairBases}
      />
    </>
  );
}
