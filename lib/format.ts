/**
 * Central formatting layer. Components must format money through these helpers
 * rather than hand-rolling `toFixed`/string concatenation, so currency
 * conventions stay consistent everywhere (e.g. ₺1,000.00, £19.11).
 */

const LOCALE = "en-GB";

/**
 * Full currency string with the narrow symbol prefixed (₺1,000.00, £19.11).
 * `narrowSymbol` avoids locale artefacts like "TRY 1,000.00".
 */
export function formatCurrency(
  amount: number,
  code: string,
  opts: Intl.NumberFormatOptions = {}
): string {
  try {
    // No hardcoded fraction digits: Intl uses each currency's own convention,
    // so GBP/EUR/TRY show 2dp (£19.11, ₺1,000.00) while JPY shows 0 (¥1,000).
    return new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
      ...opts,
    }).format(amount);
  } catch {
    return `${formatAmount(amount)} ${code}`;
  }
}

/** The narrow symbol for a currency (₺, £, €, $…), derived, not hardcoded. */
export function currencySymbol(code: string): string {
  try {
    const parts = new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? code;
  } catch {
    return code;
  }
}

/** Plain grouped number with 2dp (no symbol) — for the "amount" slot in the converter. */
export function formatAmount(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** A rate value with sensible precision (more dp for small rates). */
export function formatRate(value: number): string {
  const maximumFractionDigits = value >= 100 ? 2 : 4;
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}
