export type Region = "Europe" | "Asia" | "Middle East" | "Americas" | "Oceania";

export interface Currency {
  /** ISO 4217 code, e.g. "EUR". */
  code: string;
  /** Display name, e.g. "Euro". */
  name: string;
  /** Route slug: /currencies/[slug]/ */
  slug: string;
  /** Narrow symbol, e.g. "€". Derived symbols are also available via lib/format. */
  symbol: string;
  /** Primary country/area where the currency is used. */
  country: string;
  region: Region;
  /** Emoji flag used as a lightweight, dependency-free visual marker. */
  flag: string;
  /** Currency decimal precision (minor units): most are 2, JPY/ISK are 0. */
  decimals: number;
  /**
   * SAMPLE rate: units of this currency per 1 GBP.
   * These are indicative demo values, not live market data. When a live rates
   * provider is wired up (see lib/rates/provider.ts) this field is only used as
   * a fallback / for local development.
   */
  perGbp: number;
}

/**
 * Single source of truth for currency metadata. UI components read from here so
 * that new currencies and pages can be added without touching layout code, and
 * so currency facts (symbol, decimals, country) are never duplicated inline.
 */
export const currencies: Currency[] = [
  // Europe
  { code: "EUR", name: "Euro", slug: "euro", symbol: "€", country: "Eurozone", region: "Europe", flag: "🇪🇺", decimals: 2, perGbp: 1.1642 },
  { code: "PLN", name: "Polish Zloty", slug: "polish-zloty", symbol: "zł", country: "Poland", region: "Europe", flag: "🇵🇱", decimals: 2, perGbp: 4.92 },
  { code: "HUF", name: "Hungarian Forint", slug: "hungarian-forint", symbol: "Ft", country: "Hungary", region: "Europe", flag: "🇭🇺", decimals: 2, perGbp: 470.0 },
  { code: "CZK", name: "Czech Koruna", slug: "czech-koruna", symbol: "Kč", country: "Czechia", region: "Europe", flag: "🇨🇿", decimals: 2, perGbp: 29.2 },
  { code: "DKK", name: "Danish Krone", slug: "danish-krone", symbol: "kr", country: "Denmark", region: "Europe", flag: "🇩🇰", decimals: 2, perGbp: 8.68 },
  { code: "ISK", name: "Icelandic Krona", slug: "icelandic-krona", symbol: "kr", country: "Iceland", region: "Europe", flag: "🇮🇸", decimals: 0, perGbp: 168.0 },

  // Asia
  { code: "TRY", name: "Turkish Lira", slug: "turkish-lira", symbol: "₺", country: "Turkey", region: "Asia", flag: "🇹🇷", decimals: 2, perGbp: 52.34 },
  { code: "THB", name: "Thai Baht", slug: "thai-baht", symbol: "฿", country: "Thailand", region: "Asia", flag: "🇹🇭", decimals: 2, perGbp: 44.5 },
  { code: "IDR", name: "Indonesian Rupiah", slug: "indonesian-rupiah", symbol: "Rp", country: "Indonesia", region: "Asia", flag: "🇮🇩", decimals: 2, perGbp: 21500.0 },
  { code: "JPY", name: "Japanese Yen", slug: "japanese-yen", symbol: "¥", country: "Japan", region: "Asia", flag: "🇯🇵", decimals: 0, perGbp: 205.0 },

  // Middle East
  { code: "AED", name: "UAE Dirham", slug: "uae-dirham", symbol: "د.إ", country: "United Arab Emirates", region: "Middle East", flag: "🇦🇪", decimals: 2, perGbp: 4.95 },

  // Americas
  { code: "USD", name: "US Dollar", slug: "us-dollar", symbol: "$", country: "United States", region: "Americas", flag: "🇺🇸", decimals: 2, perGbp: 1.351 },
  { code: "CAD", name: "Canadian Dollar", slug: "canadian-dollar", symbol: "$", country: "Canada", region: "Americas", flag: "🇨🇦", decimals: 2, perGbp: 1.84 },
  { code: "MXN", name: "Mexican Peso", slug: "mexican-peso", symbol: "$", country: "Mexico", region: "Americas", flag: "🇲🇽", decimals: 2, perGbp: 24.8 },

  // Oceania
  { code: "AUD", name: "Australian Dollar", slug: "australian-dollar", symbol: "$", country: "Australia", region: "Oceania", flag: "🇦🇺", decimals: 2, perGbp: 2.03 },
];

/** Base currency used across sample conversions. */
export const BASE_CODE = "GBP";
export const baseCurrency: Currency = {
  code: "GBP",
  name: "British Pound",
  slug: "british-pound",
  symbol: "£",
  country: "United Kingdom",
  region: "Europe",
  flag: "🇬🇧",
  decimals: 2,
  perGbp: 1,
};

/** Every currency including the base, indexed by code. */
export const allCurrencies: Currency[] = [baseCurrency, ...currencies];

const byCode: Record<string, Currency> = Object.fromEntries(
  allCurrencies.map((c) => [c.code, c])
);

export function getCurrency(code: string): Currency | undefined {
  return byCode[code];
}

/** Currency decimal precision (minor units), defaulting to 2 if unknown. */
export function currencyDecimals(code: string): number {
  return getCurrency(code)?.decimals ?? 2;
}

export const regionOrder: Region[] = [
  "Europe",
  "Asia",
  "Middle East",
  "Americas",
  "Oceania",
];

export function currenciesByRegion(): Record<Region, Currency[]> {
  const grouped = {
    Europe: [],
    Asia: [],
    "Middle East": [],
    Americas: [],
    Oceania: [],
  } as Record<Region, Currency[]>;
  for (const c of currencies) grouped[c.region].push(c);
  return grouped;
}

/**
 * Indicative cross rate: how many units of `to` for 1 unit of `from`,
 * derived from sample GBP anchors. Not live data — the rates provider
 * (lib/rates/provider.ts) is the boundary the UI actually calls.
 */
export function sampleRate(fromCode: string, toCode: string): number {
  const from = getCurrency(fromCode);
  const to = getCurrency(toCode);
  if (!from || !to) return 0;
  return to.perGbp / from.perGbp;
}
