import {
  isCompleteSnapshot,
  isValidRate,
  SNAPSHOT_BASE_CODE,
  SNAPSHOT_DESTINATION_CODES,
  type RateTable,
} from "./table";
import { publishedReferenceTable } from "./resolve";

const DESTINATION_SET = new Set<string>(SNAPSHOT_DESTINATION_CODES);

type FrankfurterRow = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

function isFrankfurterRow(value: unknown): value is FrankfurterRow {
  if (value === null || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.date === "string" &&
    row.date.length > 0 &&
    typeof row.base === "string" &&
    typeof row.quote === "string" &&
    typeof row.rate === "number" &&
    Number.isFinite(row.rate)
  );
}

/**
 * Normalize a Frankfurter v2 `/v2/rates` payload into a GBP-anchored RateTable.
 * Returns null unless the snapshot is complete for the published ecosystem.
 * Does not convert amounts — that stays in provider.ts.
 */
export function normalizeFrankfurterRates(payload: unknown): RateTable | null {
  if (!Array.isArray(payload) || payload.length === 0) return null;
  if (!payload.every(isFrankfurterRow)) return null;

  const asOf = payload[0].date;
  const perGbp: Record<string, number> = { [SNAPSHOT_BASE_CODE]: 1 };

  for (const row of payload) {
    if (row.date !== asOf) return null;
    if (row.base.toUpperCase() !== SNAPSHOT_BASE_CODE) return null;

    const quote = row.quote.toUpperCase();
    if (quote === SNAPSHOT_BASE_CODE) continue;
    if (!DESTINATION_SET.has(quote)) continue;
    if (!isValidRate(row.rate)) return null;

    const existing = perGbp[quote];
    if (existing !== undefined && existing !== row.rate) return null;
    perGbp[quote] = row.rate;
  }

  const table: RateTable = {
    perGbp,
    asOf,
    providerName: "Frankfurter",
    kind: "reference",
  };

  if (!isCompleteSnapshot(table)) return null;
  return publishedReferenceTable(table);
}
