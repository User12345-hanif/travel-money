import type { CurrencyFaq } from "./currency-content";
import { getPublishedCurrencies } from "./currency-content";
import { formatCurrency, formatRate } from "@/lib/format";
import { getConversion, illustrateExchangeOffer, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { routes } from "@/lib/routes";

/**
 * Editorial copy for /currency-converter/.
 * Conversion maths stays in lib/rates/provider.ts. Pair sub-routes such as
 * /currency-converter/gbp-to-eur/ are reserved in lib/routes.ts and are not
 * published yet.
 */
export const converterPage = {
  metaTitle: "Currency Converter: Convert Pounds to Foreign Currency",
  metaDescription:
    "Convert pounds into published travel currencies such as euros and dollars. See what a sample amount means after an illustrative fee or weaker rate. Indicative planning figures — not dealing quotes.",
  h1: "Currency converter",
  lead: "Convert pounds into travel currencies and understand what the amount means. Change the amount or pair and the result updates immediately. Displayed figures use a labelled demo exchange rate, not a live market quote.",
};

export function converterPageCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return converterPage;
  return {
    ...converterPage,
    lead: "Convert pounds into travel currencies and understand what the amount means. Change the amount or pair and the result updates immediately. Displayed figures use an indicative reference rate for information only.",
  };
}

export const converterTrust =
  "Rates on this page are labelled demo or sample figures, not live, current or real-time quotes. Wayfare does not sell currency and does not claim the best exchange rate.";

export function converterTrustCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return converterTrust;
  return "Rates on this page are indicative reference rates for information only. Actual rates offered by banks, bureaux, card providers or ATMs may differ and may include fees or margins. Wayfare does not sell currency and does not claim the best exchange rate.";
}

/** GBP → EUR examples from the shared engine — copy stays in step with the maths. */
function gbpEurLessons(table?: RateTable) {
  const hundred = getConversion(100, "GBP", "EUR", table);
  const onePound = getConversion(1, "GBP", "EUR", table);
  const oneEuro = getConversion(1, "EUR", "GBP", table);
  const withFee = illustrateExchangeOffer({
    amount: 100,
    from: "GBP",
    to: "EUR",
    fee: 5,
    marginPercent: 0,
    table,
  });
  const weaker = illustrateExchangeOffer({
    amount: 100,
    from: "GBP",
    to: "EUR",
    fee: 0,
    marginPercent: 3,
    table,
  });
  return { hundred, onePound, oneEuro, withFee, weaker };
}

export function converterRateLessons(table?: RateTable): Array<{ title: string; body: string }> {
  const { hundred, onePound, oneEuro, withFee, weaker } = gbpEurLessons(table);
  const source = rateSourceDisplay(table);
  const asOf = source.asOfLabel ? ` (${source.asOfLabel})` : "";
  return [
    {
      title: "Exchange rate",
      body: `The ${source.adjective} rate is how many destination units one pound buys. Here, £1 converts to ${formatCurrency(onePound.converted, "EUR")} at the ${source.adjective} GBP/EUR rate of ${formatRate(onePound.rate)}${asOf}. ${formatCurrency(hundred.amount, "GBP")} therefore becomes ${formatCurrency(hundred.converted, "EUR")}. A bureau uses its own rate.`,
    },
    {
      title: "Inverse rate",
      body: `The inverse asks the other way: how many pounds one euro is worth. At this ${source.adjective} pair, €1 is ${formatCurrency(oneEuro.converted, "GBP")}. Swap the converter to read the same pair in reverse — still not a dealing quote.`,
    },
    {
      title: "Advertised rate vs cash received",
      body: `A poster rate can look strong and still pay out less once a fee or a weaker dealing rate is applied. Compare the cash you would actually keep with the displayed conversion — here ${formatCurrency(hundred.amount, "GBP")} → ${formatCurrency(hundred.converted, "EUR")} before any illustration.`,
    },
    {
      title: "Fees",
      body: `A commission taken from the pounds you hand over reduces the amount that is converted. On ${formatCurrency(100, "GBP")} with a ${formatCurrency(5, "GBP")} fee, ${formatCurrency(withFee.amountConverted, "GBP")} is converted, so the illustrated total is ${formatCurrency(withFee.illustratedReceived, "EUR")} instead of ${formatCurrency(hundred.converted, "EUR")}.`,
    },
    {
      title: "Weaker rates and margins",
      body: `Retail travel-money rates sit away from a mid-market figure. A rate 3% weaker than this ${source.adjective} rate turns ${formatCurrency(100, "GBP")} into ${formatCurrency(weaker.illustratedReceived, "EUR")} — ${formatCurrency(weaker.difference, "EUR")} less than ${formatCurrency(hundred.converted, "EUR")}. That gap is an illustration, not a provider quote.`,
    },
  ];
}

export const converterNextSteps = [
  {
    title: "Planning a trip?",
    href: routes.travelMoneyPlanner,
    blurb:
      "Estimate your total budget, then split cash and card in the destination currency.",
    cta: "Open planner",
    kind: "primary" as const,
  },
  {
    title: "Travel money",
    href: routes.travelMoney,
    blurb: "Prepare your cash, cards and exchange before travelling.",
    cta: "Open travel money",
    kind: "secondary" as const,
  },
  {
    title: "ATM withdrawal",
    href: routes.atmWithdrawal,
    blurb: "Estimate the cost of getting cash abroad, including optional fees.",
    cta: "Estimate a withdrawal",
    kind: "secondary" as const,
  },
];

export function converterPublishedGuides() {
  return getPublishedCurrencies().map((currency) => ({
    code: currency.code,
    name: currency.name,
    href: routes.currency(currency.slug),
    flag: currency.flag,
  }));
}

export function converterFaqs(table?: RateTable): CurrencyFaq[] {
  const source = rateSourceDisplay(table);
  const isRef = source.kind === "reference";
  return [
  {
    question: "How much foreign currency would I receive for my pounds?",
    answer: isRef
      ? "Enter a pound amount, set the destination currency, and the converter shows an indicative converted total from the reference rate. The amount a bureau, card or ATM actually pays out will differ once their rate and fees apply."
      : "Enter a pound amount, set the destination currency, and the converter shows a sample converted total. That is a labelled demo figure — the amount a bureau, card or ATM actually pays out will differ once their rate and fees apply.",
  },
  {
    question: "What happens if a provider charges a fee or a weaker rate?",
    answer: isRef
      ? "Use the illustration under the converter. An optional pound fee reduces the amount converted; a weaker-rate percentage applies a margin to the reference rate. The result is labelled as an illustration, not a quote from any provider."
      : "Use the illustration under the converter. An optional pound fee reduces the amount converted; a weaker-rate percentage applies a margin to the sample rate. The result is labelled as an illustration, not a quote from any provider.",
  },
  {
    question: "Are these live currency exchange rates?",
    answer: isRef
      ? "No. This page uses an indicative reference rate for information only. Banks, cards and bureaux use their own rates and may add fees. Wayfare does not sell currency and does not claim the best rate."
      : "No. This page uses a labelled demo exchange rate so you can see the conversion. Banks, cards and bureaux use their own rates and may add fees. Wayfare does not sell currency and does not claim the best rate.",
  },
  {
    question: "Where can I see today’s exchange rates?",
    answer: isRef
      ? "Use this converter or a published currency page for an indicative reference figure for travel planning. Wayfare does not publish a live market board or “best rate today” table. A bureau, card or ATM will quote its own dealing rate."
      : "Use this converter or a published currency page for a labelled sample figure for travel planning. Wayfare does not publish a live market board or “best rate today” table. A bureau, card or ATM will quote its own dealing rate.",
  },
  {
    question: "How do I convert pounds to euros?",
    answer: isRef
      ? "Enter a pound amount, set the destination to EUR, and the converter shows an indicative euro total using the reference rate. That is a useful way to sketch a pound-to-euro conversion — not the amount a bureau will pay out."
      : "Enter a pound amount, set the destination to EUR, and the converter shows an indicative euro total using the demo rate. That is a useful way to sketch a pound-to-euro conversion — not the amount a bureau will pay out.",
  },
  {
    question: "How do I convert pounds to dollars?",
    answer: isRef
      ? "Set the destination to USD. A pound-to-dollar conversion multiplies your amount by the GBP/USD reference rate. Open the US Dollar guide for travel-money notes alongside the figure. The result is indicative — not a dealing quote."
      : "Set the destination to USD. A pound-to-dollar conversion multiplies your amount by the sample GBP/USD rate. Open the US Dollar guide for travel-money notes alongside the figure. The result is a labelled demo conversion, not a live quote.",
  },
  {
    question: "How do I convert pounds to yen?",
    answer: isRef
      ? "Set the destination to JPY. A pound-to-yen conversion multiplies your amount by the GBP/JPY reference rate. Open the Japanese Yen guide for Japan travel-money notes alongside the figure."
      : "Set the destination to JPY. A pound-to-yen conversion multiplies your amount by the sample GBP/JPY rate. Open the Japanese Yen guide for Japan travel-money notes alongside the figure.",
  },
  {
    question: "How should I compare a travel-money quote?",
    answer:
      "Ask how much you receive for a set amount, including fees. Compare that with the conversion here, then use the illustration if the offer includes commission or a weaker rate. A slightly better headline rate can still pay out less.",
  },
  {
    question: "Should I use cash or a card abroad?",
    answer:
      "Most trips use both. Cards are convenient where contactless works; cash covers gaps. Check foreign-transaction fees on your card, compare any cash offer with this converter, and plan the mix on the travel money planner.",
  },
];
}
