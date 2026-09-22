import {
  getSampleRateTable,
  isCompleteSnapshot,
  REQUIRED_SNAPSHOT_CODES,
  SNAPSHOT_BASE_CODE,
  SNAPSHOT_DESTINATION_CODES,
  type RateTable,
} from "./table";

export type RatesProviderId = "sample" | "frankfurter";

/**
 * Server env RATES_PROVIDER. Unknown or empty values stay on sample so
 * production never fetches until explicitly opted in.
 */
export function parseRatesProvider(value: string | undefined): RatesProviderId {
  if (value?.trim().toLowerCase() === "frankfurter") return "frankfurter";
  return "sample";
}

/** Reference tables must be exactly GBP + the published destinations. */
export function isUsableReferenceTable(table: RateTable | null): table is RateTable {
  if (table === null) return false;
  if (table.kind !== "reference") return false;
  if (table.providerName !== "Frankfurter") return false;
  if (typeof table.asOf !== "string" || table.asOf.length === 0) return false;
  if (!isCompleteSnapshot(table)) return false;

  const keys = Object.keys(table.perGbp);
  if (keys.length !== REQUIRED_SNAPSHOT_CODES.length) return false;
  for (const code of REQUIRED_SNAPSHOT_CODES) {
    if (!keys.includes(code)) return false;
  }
  return table.perGbp[SNAPSHOT_BASE_CODE] === 1;
}

/** Copy only the published snapshot codes. Never merge with sample anchors. */
export function publishedReferenceTable(table: RateTable | null): RateTable | null {
  if (!table || table.kind !== "reference") return null;
  const perGbp: Record<string, number> = { [SNAPSHOT_BASE_CODE]: 1 };
  for (const code of SNAPSHOT_DESTINATION_CODES) {
    perGbp[code] = table.perGbp[code];
  }
  const next: RateTable = {
    perGbp,
    asOf: table.asOf,
    providerName: "Frankfurter",
    kind: "reference",
  };
  return isUsableReferenceTable(next) ? next : null;
}

/**
 * Atomic choice: a complete Frankfurter reference table, or the full sample
 * table. Never mixes the two.
 */
export function resolveRateSnapshot(
  fetched: RateTable | null,
  sample: RateTable = getSampleRateTable()
): RateTable {
  const reference = publishedReferenceTable(fetched);
  return reference ?? sample;
}
