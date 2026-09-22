import { getCurrency, type Currency } from "./currencies";

/** Codes featured in the "Popular currencies" grid. */
export const popularCodes = ["EUR", "TRY", "USD", "AED"] as const;

export const popularCurrencies: Currency[] = popularCodes
  .map((code) => getCurrency(code))
  .filter((c): c is Currency => Boolean(c));
