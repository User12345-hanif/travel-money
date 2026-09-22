import { RATE_SOURCE, type RateTable } from "./provider";

/**
 * User-facing RateTable status. Visible copy must follow table.kind.
 * Sample (including Frankfurter fallback) keeps Demo data wording.
 * Reference uses the provider asOf date — never the visitor's "today".
 */

export interface RateSourceDisplay {
  kind: "sample" | "reference";
  /** Short badge: "Demo data" | "Reference rate". */
  label: string;
  /** Badge including as-of when reference. */
  badge: string;
  /** "As of 17 September 2026", or null for sample. */
  asOfLabel: string | null;
  /** Rate-row caption: "Demo exchange rate" | "Reference rate". */
  rateLine: string;
  /** "Sample rate" | "Reference rate". */
  rateNoun: string;
  /** "sample" | "reference" for inline sentences. */
  adjective: string;
  disclaimer: string;
}

const SAMPLE_DISPLAY: RateSourceDisplay = {
  kind: "sample",
  label: RATE_SOURCE.label,
  badge: RATE_SOURCE.label,
  asOfLabel: null,
  rateLine: "Demo exchange rate",
  rateNoun: "Sample rate",
  adjective: "sample",
  disclaimer: RATE_SOURCE.disclaimer,
};

const REFERENCE_DISCLAIMER =
  "Reference rates are for information only. Actual rates offered by banks, bureaux, card providers or ATMs may differ and may include fees or margins.";

/** Format a provider YYYY-MM-DD as an en-GB date. No invented time. */
export function formatAsOfDate(asOf: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(asOf.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = Date.UTC(year, month - 1, day);
  const date = new Date(utc);
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function isDisplayedReference(
  table?: RateTable | null
): table is RateTable & { kind: "reference"; asOf: string } {
  return (
    table?.kind === "reference" &&
    typeof table.asOf === "string" &&
    formatAsOfDate(table.asOf) !== null
  );
}

export function rateSourceDisplay(table?: RateTable | null): RateSourceDisplay {
  if (!isDisplayedReference(table)) return SAMPLE_DISPLAY;
  const formatted = formatAsOfDate(table.asOf);
  if (!formatted) return SAMPLE_DISPLAY;
  const asOfLabel = `As of ${formatted}`;
  return {
    kind: "reference",
    label: "Reference rate",
    badge: `Reference rate · ${asOfLabel}`,
    asOfLabel,
    rateLine: "Reference rate",
    rateNoun: "Reference rate",
    adjective: "reference",
    disclaimer: REFERENCE_DISCLAIMER,
  };
}
