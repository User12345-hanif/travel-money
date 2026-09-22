import type { CurrencyFaq } from "./currency-content";
import { publishedCurrencySlugs } from "./currency-content";
import { currencies, type Currency } from "./currencies";
import { routes } from "@/lib/routes";
import type { RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

/**
 * Editorial copy and published-only links for /travel-money-planner/.
 * Selectable destinations follow published currency pages so new guides
 * appear here when they launch — unpublished slugs stay hidden.
 */
export const plannerPage = {
  metaTitle: "Travel Money Planner: Trip Budget, Cash and Card",
  metaDescription:
    "Estimate how much travel money to take, split cash and card, and see an indicative amount in the destination currency. A planning tool — not a live exchange-rate quote.",
  h1: "Plan how much travel money to take",
  lead: "Sketch how much you may spend, how much cash to carry, and what that looks like in the destination currency. Figures update as you type. Sample rates, not a live quote.",
};

export function plannerPageCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return plannerPage;
  return {
    ...plannerPage,
    lead: "Sketch how much you may spend, how much cash to carry, and what that looks like in the destination currency. Figures update as you type. Indicative reference rates, for information only.",
  };
}

/** Currencies with a published page — the planner’s destination list. */
export const plannerCurrencies: Currency[] = currencies.filter((currency) =>
  publishedCurrencySlugs.includes(currency.slug)
);

export const plannerGuidance: Array<{ title: string; body: string }> = [
  {
    title: "Start with a daily figure, then add the lumps",
    body: "Food, local transport and small purchases sit in the daily amount. Hotels, car hire and tickets are easier as separate trip totals so they do not get counted twice.",
  },
  {
    title: "Cash is for gaps, not the whole trip",
    body: "A cash share of around 20–40% covers markets, tips and the first day. Cards usually handle hotels and meals where contactless works. Adjust the slider for how you actually pay.",
  },
  {
    title: "Keep emergency money separate",
    body: "A modest extra line is a buffer, not spending you plan to use. Keep it on a second card or in a different pocket so a lost wallet does not take the whole budget.",
  },
  {
    title: "Compare the rate you are offered",
    body: "The destination total here uses a labelled sample rate. A bureau, card or ATM will use its own figure plus fees. Compare what you would actually receive before you commit.",
  },
];

export function plannerGuidanceCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  return plannerGuidance.map((item) =>
    item.title !== "Compare the rate you are offered"
      ? item
      : {
          ...item,
          body:
            source.kind === "reference"
              ? "The destination total here uses an indicative reference rate. A bureau, card or ATM will use its own figure plus fees. Compare what you would actually receive before you commit."
              : item.body,
        }
  );
}

/** Tool handoffs after a plan — currency guides live under Currency Explorer. */
export const plannerRelated = [
  {
    title: "Travel money",
    href: routes.travelMoney,
    blurb: "Prepare cash, cards and exchange before you travel.",
    cta: "Open travel money",
  },
  {
    title: "Currency converter",
    href: routes.converter,
    blurb: "Convert an amount with the dedicated converter.",
    cta: "Open converter",
  },
  {
    title: "ATM withdrawal calculator",
    href: routes.atmWithdrawal,
    blurb: "Estimate local cash and optional fees before you use a foreign ATM.",
    cta: "Estimate a withdrawal",
  },
  {
    title: "Currency explorer",
    href: routes.currencies,
    blurb: "Search published currencies and open a destination guide.",
    cta: "Browse currencies",
  },
];

export const plannerFaqs: CurrencyFaq[] = [
  {
    question: "How much travel money should I take?",
    answer:
      "There is no single right amount. A practical sketch is daily spend × days × travellers, then add known lumps such as hotels or tickets. Use this planner as a starting point and adjust for your destination and habits.",
  },
  {
    question: "How much cash should I carry?",
    answer:
      "Enough for the first day, tips and places that prefer notes — often a minority of the trip total. The cash slider is a preference, not advice. Carry less than you would mind losing, and keep a backup card.",
  },
  {
    question: "Should I use cash or a card abroad?",
    answer:
      "Most trips use both. Cards are convenient where they are accepted; cash still matters for smaller vendors and backups. Check your card’s foreign-transaction fees before you rely on it.",
  },
  {
    question: "How much emergency money should I keep?",
    answer:
      "A buffer that would cover a night, a taxi or a replacement card collection is enough for many travellers. Keep it separate from daily spending. This tool does not set a recommended amount.",
  },
  {
    question: "How should I budget daily spending?",
    answer:
      "Think about meals, local travel and incidentals for one person, then multiply by travellers and days. Put accommodation and long-distance transport in their own fields so the daily figure stays realistic.",
  },
  {
    question: "Does this planner use live exchange rates?",
    answer:
      "No. Destination amounts use clearly labelled sample / demo rates so you can see the conversion. A bank, card or ATM will use a different rate and may add fees.",
  },
];

export function plannerFaqsCopy(table?: RateTable): CurrencyFaq[] {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return plannerFaqs;
  return plannerFaqs.map((faq) =>
    faq.question !== "Does this planner use live exchange rates?"
      ? faq
      : {
          ...faq,
          answer:
            "No. Destination amounts use an indicative reference rate for information only. A bank, card or ATM will use a different rate and may add fees.",
        }
  );
}
