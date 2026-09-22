import "server-only";

import { cache } from "react";
import { normalizeFrankfurterRates } from "./frankfurter";
import { parseRatesProvider, resolveRateSnapshot, type RatesProviderId } from "./resolve";
import { getSampleRateTable, SNAPSHOT_DESTINATION_CODES, type RateTable } from "./table";

/**
 * Server-only FX snapshot fetch.
 * ---------------------------------------------------------------------------
 * Returns a RateTable. Does not convert amounts — lib/rates/provider.ts is
 * the only conversion engine.
 *
 * RATES_PROVIDER (server env, not NEXT_PUBLIC):
 *   unset | "sample"  → existing demo table, no network call (default)
 *   "frankfurter"     → Frankfurter v2 latest, or demo if the snapshot fails
 *
 * Call from Server Components only. React `cache()` dedupes within one render.
 * This module must not be imported from Client Components.
 */

/** Frankfurter sources are daily. 6 hours avoids per-request fetches without claiming live data. */
export const RATES_REVALIDATE_SECONDS = 6 * 60 * 60;

/** Abort the provider HTTP call if it has not responded by this time. */
export const RATES_FETCH_TIMEOUT_MS = 8_000;

export const RATES_CACHE_TAG = "wayfare-fx-rates";

const FRANKFURTER_RATES_URL =
  "https://api.frankfurter.dev/v2/rates?base=GBP&quotes=" +
  SNAPSHOT_DESTINATION_CODES.join(",");

export type { RatesProviderId } from "./resolve";
export { parseRatesProvider } from "./resolve";

export function getConfiguredRatesProvider(): RatesProviderId {
  return parseRatesProvider(process.env.RATES_PROVIDER);
}

async function fetchFrankfurterTable(): Promise<RateTable | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RATES_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(FRANKFURTER_RATES_URL, {
      signal: controller.signal,
      next: {
        revalidate: RATES_REVALIDATE_SECONDS,
        tags: [RATES_CACHE_TAG],
      },
    });

    if (!response.ok) return null;

    const payload: unknown = await response.json();
    return normalizeFrankfurterRates(payload);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Atomic snapshot: complete reference table, or the existing sample table.
 * Never mixes provider rates with sample anchors. Deduped per server render.
 */
export const getRateSnapshot = cache(async function getRateSnapshot(): Promise<RateTable> {
  const sample = getSampleRateTable();
  if (getConfiguredRatesProvider() !== "frankfurter") return sample;

  const fetched = await fetchFrankfurterTable();
  return resolveRateSnapshot(fetched, sample);
});
