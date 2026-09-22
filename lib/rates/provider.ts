import { currencyDecimals, getCurrency, sampleRate } from "@/lib/data/currencies";
import { quoteFromTable, type RateSourceKind, type RateTable } from "./table";

export type { RateSourceKind, RateTable } from "./table";
export {
  getSampleRateTable,
  isCompleteSnapshot,
  quoteFromTable,
  REQUIRED_SNAPSHOT_CODES,
} from "./table";

/**
 * Rates provider boundary.
 * ---------------------------------------------------------------------------
 * The UI reads quotes and metadata from here only. Conversion maths stays
 * here — a RateTable (sample or a reference snapshot) only supplies
 * GBP-anchored numbers. Products that omit `table` keep the existing demo
 * path. Visible status copy is derived in lib/rates/copy.ts from table.kind.
 */

export interface RateQuote {
  from: string;
  to: string;
  /** Units of `to` per 1 unit of `from`. */
  rate: number;
  source: RateSourceKind;
}

export const RATE_SOURCE = {
  kind: "sample" as RateSourceKind,
  /** Short label shown on badges. */
  label: "Demo data",
  /** Longer disclaimer shown near converted values. */
  disclaimer: "Indicative sample rates for demonstration — not live market data.",
} as const;

export const IS_SAMPLE_DATA = RATE_SOURCE.kind === "sample";

export function getQuote(from: string, to: string, table?: RateTable): RateQuote {
  const rate = table ? quoteFromTable(table, from, to) : sampleRate(from, to);
  return {
    from,
    to,
    rate,
    source: table?.kind ?? RATE_SOURCE.kind,
  };
}

export interface Conversion extends RateQuote {
  /** Input amount in `from`. */
  amount: number;
  /** Result in `to`, rounded to the target currency's precision. */
  converted: number;
}

/**
 * Pure conversion calculation. Keeping the maths here (rather than in the
 * converter component) preserves the UI → data → calculation → formatting
 * separation. An optional RateTable supplies GBP anchors; products that omit
 * it keep the existing demo path.
 */
function roundToCurrency(amount: number, code: string): number {
  const factor = 10 ** currencyDecimals(code);
  return Number.isFinite(amount) ? Math.round(amount * factor) / factor : 0;
}

export function getConversion(
  amount: number,
  from: string,
  to: string,
  table?: RateTable
): Conversion {
  const quote = getQuote(from, to, table);
  const converted = roundToCurrency(amount * quote.rate, to);
  return { ...quote, amount, converted };
}

/**
 * Educational sketch of how a weaker rate or a fee changes cash received.
 * Uses the same sample-rate engine as the converter. Not a bureau quote,
 * inventory check, or offer from Wayfare.
 */
export interface ExchangeOfferIllustration {
  from: string;
  to: string;
  amount: number;
  /** Optional commission taken from the amount converted, in `from`. */
  fee: number;
  /** Percent weaker than the sample rate (0–50). */
  marginPercent: number;
  sample: Conversion;
  /** Amount converted after deducting the optional fee. */
  amountConverted: number;
  illustratedRate: number;
  illustratedReceived: number;
  /** Sample cash minus illustrated cash, in `to`. */
  difference: number;
}

export function illustrateExchangeOffer({
  amount,
  from,
  to,
  fee = 0,
  marginPercent = 0,
  table,
}: {
  amount: number;
  from: string;
  to: string;
  fee?: number;
  marginPercent?: number;
  table?: RateTable;
}): ExchangeOfferIllustration {
  const safeAmount = Math.max(0, amount);
  const safeFee = Math.max(0, fee);
  const safeMargin = Math.min(50, Math.max(0, marginPercent));
  const sample = getConversion(safeAmount, from, to, table);
  const amountConverted = roundToCurrency(Math.max(0, safeAmount - safeFee), from);
  const illustratedRate = sample.rate * (1 - safeMargin / 100);
  const illustratedReceived = roundToCurrency(amountConverted * illustratedRate, to);
  return {
    from,
    to,
    amount: safeAmount,
    fee: safeFee,
    marginPercent: safeMargin,
    sample,
    amountConverted,
    illustratedRate,
    illustratedReceived,
    difference: roundToCurrency(sample.converted - illustratedReceived, to),
  };
}

/** 1 `base` in `quote`, and 1 `quote` in `base`. */
export function getBidirectionalRates(base: string, quote: string, table?: RateTable) {
  return {
    forward: getConversion(1, base, quote, table),
    reverse: getConversion(1, quote, base, table),
  };
}

/** Pound amounts shown as one-tap shortcuts on currency pages. */
export const QUICK_GBP_AMOUNTS = [1, 10, 50, 100, 500, 1000] as const;

export function getAmountConversions(
  amounts: readonly number[],
  from: string,
  to: string,
  table?: RateTable
): Conversion[] {
  return amounts.map((amount) => getConversion(amount, from, to, table));
}

export interface TripCostEstimate {
  travelers: number;
  days: number;
  dailyBudget: number;
  /** Travelers × days × daily budget, in `from`. */
  totalFrom: number;
  conversion: Conversion;
}

export interface AtmWithdrawalEstimate {
  from: string;
  to: string;
  /** Withdrawal amount in `from`. */
  amount: number;
  /** Optional ATM operator fee in `from`. */
  atmFee: number;
  /** Optional extra fee (card/FX) in `from`. */
  additionalFee: number;
  /** amount + fees, in `from`. */
  totalCost: number;
  /** Estimated local cash for the withdrawal amount (fees charged on top). */
  conversion: Conversion;
}

/**
 * Estimate a foreign ATM withdrawal.
 * Cash received is the converted withdrawal amount. ATM and additional fees
 * are treated as extra charges in the base currency, not deducted from cash.
 * This is an estimate helper — not a quote from a bank or ATM network.
 */
export function estimateAtmWithdrawal({
  amount,
  from,
  to,
  atmFee = 0,
  additionalFee = 0,
  table,
}: {
  amount: number;
  from: string;
  to: string;
  atmFee?: number;
  additionalFee?: number;
  table?: RateTable;
}): AtmWithdrawalEstimate {
  const safeAmount = Math.max(0, amount);
  const safeAtm = Math.max(0, atmFee);
  const safeExtra = Math.max(0, additionalFee);
  return {
    from,
    to,
    amount: safeAmount,
    atmFee: safeAtm,
    additionalFee: safeExtra,
    totalCost: roundToCurrency(safeAmount + safeAtm + safeExtra, from),
    conversion: getConversion(safeAmount, from, to, table),
  };
}

/**
 * Rough trip spend: travelers × days × daily budget, then converted.
 * This is an estimate helper, not a recommended budget.
 */
export function estimateTripCost({
  travelers,
  days,
  dailyBudget,
  from,
  to,
  table,
}: {
  travelers: number;
  days: number;
  dailyBudget: number;
  from: string;
  to: string;
  table?: RateTable;
}): TripCostEstimate {
  const safeTravelers = Math.max(0, travelers);
  const safeDays = Math.max(0, days);
  const safeDaily = Math.max(0, dailyBudget);
  const totalFrom = safeTravelers * safeDays * safeDaily;
  return {
    travelers: safeTravelers,
    days: safeDays,
    dailyBudget: safeDaily,
    totalFrom,
    conversion: getConversion(totalFrom, from, to, table),
  };
}

/**
 * Split estimated trip spend between cash and card.
 * Pure arithmetic in the chosen currency — no exchange-rate lookup.
 */
export interface TravelMoneySplit {
  days: number;
  dailySpend: number;
  cashPercent: number;
  currency: string;
  total: number;
  cash: number;
  card: number;
}

export function estimateTravelMoneySplit({
  days,
  dailySpend,
  cashPercent,
  currency,
}: {
  days: number;
  dailySpend: number;
  cashPercent: number;
  currency: string;
}): TravelMoneySplit {
  const safeDays = Math.max(0, days);
  const safeDaily = Math.max(0, dailySpend);
  const safePercent = Math.min(100, Math.max(0, cashPercent));
  const total = roundToCurrency(safeDays * safeDaily, currency);
  const cash = roundToCurrency((total * safePercent) / 100, currency);
  const card = roundToCurrency(total - cash, currency);
  return {
    days: safeDays,
    dailySpend: safeDaily,
    cashPercent: safePercent,
    currency,
    total,
    cash,
    card,
  };
}

/**
 * Full trip-money plan: daily spend × travellers × days, plus optional
 * lump-sum categories, then a cash/card split and destination conversion.
 * Conversion uses the sample-rate provider — not a live quote.
 */
export interface TravelMoneyPlan {
  from: string;
  to: string;
  days: number;
  travellers: number;
  dailySpend: number;
  dailyTotal: number;
  accommodation: number;
  transport: number;
  activities: number;
  emergency: number;
  cashPercent: number;
  total: number;
  cash: number;
  card: number;
  conversion: Conversion;
  cashConversion: Conversion;
  cardConversion: Conversion;
}

export function estimateTravelMoneyPlan({
  from,
  to,
  days,
  travellers,
  dailySpend,
  accommodation = 0,
  transport = 0,
  activities = 0,
  emergency = 0,
  cashPercent,
  table,
}: {
  from: string;
  to: string;
  days: number;
  travellers: number;
  dailySpend: number;
  accommodation?: number;
  transport?: number;
  activities?: number;
  emergency?: number;
  cashPercent: number;
  table?: RateTable;
}): TravelMoneyPlan {
  const safeDays = Math.max(0, days);
  const safeTravellers = Math.max(0, travellers);
  const safeDaily = Math.max(0, dailySpend);
  const safeAccommodation = roundToCurrency(Math.max(0, accommodation), from);
  const safeTransport = roundToCurrency(Math.max(0, transport), from);
  const safeActivities = roundToCurrency(Math.max(0, activities), from);
  const safeEmergency = roundToCurrency(Math.max(0, emergency), from);
  const safePercent = Math.min(100, Math.max(0, cashPercent));
  const dailyTotal = roundToCurrency(safeTravellers * safeDays * safeDaily, from);
  const total = roundToCurrency(
    dailyTotal + safeAccommodation + safeTransport + safeActivities + safeEmergency,
    from
  );
  const cash = roundToCurrency((total * safePercent) / 100, from);
  const card = roundToCurrency(total - cash, from);
  return {
    from,
    to,
    days: safeDays,
    travellers: safeTravellers,
    dailySpend: safeDaily,
    dailyTotal,
    accommodation: safeAccommodation,
    transport: safeTransport,
    activities: safeActivities,
    emergency: safeEmergency,
    cashPercent: safePercent,
    total,
    cash,
    card,
    conversion: getConversion(total, from, to, table),
    cashConversion: getConversion(cash, from, to, table),
    cardConversion: getConversion(card, from, to, table),
  };
}

export interface PreviewRate {
  code: string;
  name: string;
  /** Route slug so the row can link to the currency page. */
  slug: string;
  /** Flag emoji marker. */
  flag: string;
  /** Units per 1 unit of the base currency. */
  value: number;
  source: RateSourceKind;
}

const PREVIEW_CODES = ["EUR", "USD", "TRY", "AED"] as const;

export function getPreviewRates(table?: RateTable): PreviewRate[] {
  return PREVIEW_CODES.map((code) => {
    const currency = getCurrency(code);
    return {
      code,
      name: currency?.name ?? code,
      slug: currency?.slug ?? code.toLowerCase(),
      flag: currency?.flag ?? "",
      value: table ? quoteFromTable(table, "GBP", code) : (currency?.perGbp ?? 0),
      source: table?.kind ?? RATE_SOURCE.kind,
    };
  });
}
