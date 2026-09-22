import { allCurrencies } from "../data/currencies";

/**
 * GBP-anchored rate snapshot.
 * ---------------------------------------------------------------------------
 * `perGbp[code]` is units of `code` per 1 GBP. Currency metadata (slug,
 * decimals, publication) stays in lib/data/currencies.ts — this table is
 * rate data only.
 *
 * `kind` is never "live": a daily/reference feed is not a dealing quote.
 */
export type RateSourceKind = "sample" | "reference";

export interface RateTable {
  /** Units of each ISO code per 1 GBP. GBP is always 1. */
  perGbp: Record<string, number>;
  /** Provider observation date (YYYY-MM-DD), or null for sample data. */
  asOf: string | null;
  providerName: string;
  kind: RateSourceKind;
}

/**
 * Currently published Wayfare ecosystem (GBP + published destinations).
 * Do not expand this list here — publishing a currency is a separate task.
 */
export const SNAPSHOT_BASE_CODE = "GBP";

export const SNAPSHOT_DESTINATION_CODES = [
  "EUR",
  "USD",
  "TRY",
  "AED",
  "THB",
  "CZK",
  "PLN",
  "JPY",
] as const;

export const REQUIRED_SNAPSHOT_CODES = [
  SNAPSHOT_BASE_CODE,
  ...SNAPSHOT_DESTINATION_CODES,
] as const;

export type SnapshotDestinationCode = (typeof SNAPSHOT_DESTINATION_CODES)[number];
export type RequiredSnapshotCode = (typeof REQUIRED_SNAPSHOT_CODES)[number];

export function isValidRate(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/**
 * Same formula as sampleRate: units of `to` per 1 unit of `from`,
 * derived from GBP anchors. Missing or invalid codes yield 0.
 */
export function quoteFromTable(table: RateTable, from: string, to: string): number {
  const fromPerGbp = table.perGbp[from];
  const toPerGbp = table.perGbp[to];
  if (!isValidRate(fromPerGbp) || !isValidRate(toPerGbp)) return 0;
  return toPerGbp / fromPerGbp;
}

/** True only when every required published code is present and GBP is 1. */
export function isCompleteSnapshot(table: RateTable): boolean {
  if (table.perGbp[SNAPSHOT_BASE_CODE] !== 1) return false;
  for (const code of REQUIRED_SNAPSHOT_CODES) {
    if (!isValidRate(table.perGbp[code])) return false;
  }
  return true;
}

/**
 * Existing demo anchors from the currency catalog. Used when no RateTable is
 * supplied to getQuote, and as the atomic fallback when a provider snapshot
 * is incomplete or unavailable.
 */
export function getSampleRateTable(): RateTable {
  const perGbp: Record<string, number> = {};
  for (const currency of allCurrencies) {
    perGbp[currency.code] = currency.perGbp;
  }
  return {
    perGbp,
    asOf: null,
    providerName: "sample",
    kind: "sample",
  };
}
