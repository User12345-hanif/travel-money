import { currencies } from "./data/currencies";
import { guides } from "./data/guides";

/**
 * Central place for the site's reserved URL architecture. Pages are added over
 * time; keeping the shape here means the sitemap and internal links stay in
 * sync as the site grows.
 */
export const routes = {
  home: "/",
  converter: "/currency-converter/",
  exchangeRates: "/exchange-rates/",
  travelMoney: "/travel-money/",
  travelMoneyPlanner: "/travel-money-planner/",
  atmWithdrawal: "/atm-withdrawal/",
  currencies: "/currencies/",
  currency: (slug: string) => `/currencies/${slug}/`,
  converterPair: (from: string, to: string) =>
    `/currency-converter/${from.toLowerCase()}-to-${to.toLowerCase()}/`,
  guide: (slug: string) => `/guides/${slug}/`,
  pair: (from: string, to: string) => `/${from.toLowerCase()}-to-${to.toLowerCase()}/`,
} as const;

/** Top-level routes that will become real pages. */
export const topLevelRoutes: string[] = [
  routes.home,
  routes.converter,
  routes.exchangeRates,
  routes.travelMoney,
  routes.travelMoneyPlanner,
  routes.atmWithdrawal,
  routes.currencies,
];

/** Tool pages that actually exist and may be listed in the sitemap. */
export const publishedToolRoutes: readonly string[] = [
  routes.atmWithdrawal,
  routes.travelMoney,
  routes.travelMoneyPlanner,
  routes.currencies,
  routes.converter,
];

export const currencyRoutes: string[] = currencies.map((c) => routes.currency(c.slug));
export const guideRoutes: string[] = guides.map((g) => routes.guide(g.slug));

/** Featured conversion pairs reserved in the architecture. */
export const pairRoutes: string[] = [
  routes.pair("gbp", "eur"),
  routes.pair("gbp", "try"),
  routes.pair("gbp", "usd"),
];

/**
 * Conversion-pair pages that actually exist and may be linked.
 * Empty until `/gbp-to-eur/` (and similar) routes ship.
 */
export const publishedPairs: ReadonlyArray<{ from: string; to: string }> = [];

/**
 * Dedicated converter pair pages, e.g. `/currency-converter/gbp-to-eur/`.
 * Reuse FullConverter with initialFrom/initialTo when these ship. Empty for now.
 */
export const publishedConverterPairs: ReadonlyArray<{ from: string; to: string }> =
  [];
