import type { CurrencyFaq } from "./currency-content";
import { getPublishedCurrencies } from "./currency-content";
import { routes } from "@/lib/routes";
import type { RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

/**
 * Editorial copy for /travel-money/.
 * Job: prepare money for a trip (cash, cards, exchange, fees) and route into
 * Converter, Planner and ATM. Wayfare does not sell or supply notes.
 */
export const travelMoneyPage = {
  metaTitle: "Travel Money: How to Buy Foreign Currency",
  metaDescription:
    "How to buy and prepare travel money — cash, an online order, a travel card or an ATM. Compare the amount received after fees, then convert, plan or estimate a withdrawal. Wayfare does not sell currency.",
  h1: "How to buy and prepare travel money",
  lead: "Decide how to buy and prepare foreign currency for a trip — cash, an online order, a travel card, or cash after you arrive. Compare the amount you would actually receive. Wayfare does not sell notes.",
};

export const travelMoneyTrust =
  "Wayfare does not sell, order or hold foreign currency. Rates on this site are labelled demo or sample figures, not live quotes or provider offers. Actual rates and fees vary by provider.";

export function travelMoneyTrustCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return travelMoneyTrust;
  return "Wayfare does not sell, order or hold foreign currency. Rates on this page are indicative reference rates for information only — not dealing quotes or provider offers. Actual rates and fees vary by provider.";
}

export function travelMoneyBuyDescription(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind === "reference") {
    return "Use this section to choose a buying method, pick a published currency, and compare the amount received after fees — not a poster rate. The sketch uses the same indicative reference conversion as the converter. It is not a quote, and Wayfare does not sell currency.";
  }
  return "Use this section to choose a buying method, pick a published currency, and compare the amount received after fees — not a poster rate. The sketch uses the same demo conversion as the converter. It is not a quote, and Wayfare does not sell currency.";
}

/** Primary job cards — gateway into existing tools and on-page sections. */
export const travelMoneyActions = [
  {
    title: "Plan your travel money",
    href: routes.travelMoneyPlanner,
    blurb: "Estimate a trip budget and split cash and card in the destination currency.",
    cta: "Open planner",
    kind: "primary" as const,
  },
  {
    title: "Convert money",
    href: routes.converter,
    blurb: "Turn pounds into a published travel currency with a labelled demo rate.",
    cta: "Open converter",
    kind: "primary" as const,
  },
  {
    title: "Get cash abroad",
    href: routes.atmWithdrawal,
    blurb: "Estimate local cash, optional machine fees and extra card charges before you withdraw.",
    cta: "Open ATM tool",
    kind: "secondary" as const,
  },
  {
    title: "Buy foreign currency",
    href: "#buy",
    blurb: "Work out cash, online order, travel card or ATM — then compare the amount received after fees. Wayfare does not take orders.",
    cta: "How to buy",
    kind: "secondary" as const,
  },
  {
    title: "Use a travel-money card",
    href: "#cards",
    blurb: "See when a prepaid card may help — and what to check with an issuer.",
    cta: "Card checklist",
    kind: "secondary" as const,
  },
  {
    title: "Explore a destination currency",
    href: routes.currencies,
    blurb: "Open a published currency guide for conversions and travel-money notes.",
    cta: "Browse currencies",
    kind: "secondary" as const,
  },
];

export function travelMoneyActionsCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  return travelMoneyActions.map((action) =>
    action.title !== "Convert money"
      ? action
      : {
          ...action,
          blurb:
            source.kind === "reference"
              ? "Turn pounds into a published travel currency with an indicative reference rate."
              : action.blurb,
        }
  );
}

/** Lean handoffs — one strip, not repeated in every section. */
export const travelMoneyConnectedTools = [
  {
    title: "Travel money planner",
    href: routes.travelMoneyPlanner,
    blurb: "Estimate total spend and a cash versus card split in the destination currency.",
    cta: "Use the travel money planner",
  },
  {
    title: "Currency converter",
    href: routes.converter,
    blurb: "Convert pounds into a published travel currency with a labelled indicative rate.",
    cta: "Convert a currency",
  },
  {
    title: "ATM withdrawal",
    href: routes.atmWithdrawal,
    blurb: "Estimate local cash and optional fees before you use a foreign cash machine.",
    cta: "Estimate ATM withdrawal costs",
  },
  {
    title: "Currency explorer",
    href: routes.currencies,
    blurb: "Browse published destination currencies and open a guide.",
    cta: "Explore currencies",
  },
] as const;

/** In-#buy job picker — buy methods, not a second site map. */
export const buyJobCards: Array<{
  title: string;
  body: string;
  href: string;
  cta: string;
}> = [
  {
    title: "Buy cash before your trip",
    body: "Get notes in the UK for arrival, tips and cash-only corners. Compare the foreign currency you would actually receive after fees.",
    href: "#buy-understand",
    cta: "How buying cash works",
  },
  {
    title: "Order currency online",
    body: "Many UK providers let you order notes for collection or delivery. Wayfare does not take those orders — check cut-offs, ID and the payout with the provider.",
    href: "#buy-online",
    cta: "Online order checks",
  },
  {
    title: "Exchange money",
    body: "Banks, bureaux and airport desks quote their own rate and fee. Compare the total you keep, then see where and when people typically exchange.",
    href: "#exchange",
    cta: "Where and when",
  },
  {
    title: "Use a travel card",
    body: "A prepaid or preloaded card can cap what you carry. It is not automatically cheaper than cash or a debit card — check issuer terms.",
    href: "#cards",
    cta: "Card checklist",
  },
  {
    title: "Get cash after arrival",
    body: "An ATM abroad can top up local notes. Read fee and conversion screens; estimate the cost first with the ATM tool.",
    href: routes.atmWithdrawal,
    cta: "Estimate an ATM withdrawal",
  },
];

/** What actually changes a purchase — not a provider quote. */
export const buyUnderstandPoints: Array<{ title: string; body: string }> = [
  {
    title: "Exchange rate",
    body: "The rate is how much foreign currency one pound converts into on that quote. A board rate is not automatically the amount you keep.",
  },
  {
    title: "Provider margin",
    body: "Banks, bureaux and cards usually build a margin into the dealing rate. Two offers with similar posters can still pay out different totals.",
  },
  {
    title: "Fees",
    body: "Commission, collection charges, card foreign-spend fees and ATM operator fees all reduce what you keep. Add them to the rate, not instead of it.",
  },
  {
    title: "Availability",
    body: "Not every currency is in stock every day. Confirm the notes you need before you travel or collect — Wayfare does not hold inventory.",
  },
  {
    title: "Collection or delivery",
    body: "Some orders are over the counter; others are click-and-collect or posted. Cut-off times and ID rules are set by the provider.",
  },
  {
    title: "Payment method",
    body: "Paying by card, cash or account can change the fee or the rate the provider applies. Ask what you receive for a set pound amount on that payment method.",
  },
];

/** Decision support — not a ranking. */
export const buyMethodCards: Array<{
  title: string;
  body: string;
  href: string;
  cta: string;
}> = [
  {
    title: "Cash in advance",
    body: "Useful for first-day spend and places that prefer notes. You lock a rate when you buy — that is not automatically a stronger rate than later options.",
    href: "#buy-understand",
    cta: "Buying cash",
  },
  {
    title: "Online order",
    body: "Convenient if the provider has stock and you can collect or receive delivery in time. Compare the payout after fees, then confirm cut-offs.",
    href: "#buy-online",
    cta: "Online checks",
  },
  {
    title: "Travel card",
    body: "A prepaid wallet for spends and some ATM withdrawals. Load fees, leftover balances and acceptance vary by issuer — Wayfare does not rank cards.",
    href: "#cards",
    cta: "Card notes",
  },
  {
    title: "ATM abroad",
    body: "Local notes when you need a top-up. Machine fees, card cash-advance charges and on-screen conversion can change the total.",
    href: routes.atmWithdrawal,
    cta: "ATM calculator",
  },
];

export const buyOnlineChecks: string[] = [
  "How much foreign currency you would receive for a set pound amount after fees",
  "Whether the order is collect-in-store, click-and-collect or delivery",
  "Cut-off times so the notes arrive before you travel",
  "Identification or payment rules the provider sets",
  "Whether the currency and denominations you need are actually available",
  "What happens if you need to cancel or change the order",
];

export const buyBeforeChecks: string[] = [
  "Check the displayed rate against the total you would receive",
  "Add every fee and margin — not only commission",
  "Confirm the currency is in stock",
  "Confirm collection or delivery timing",
  "Check denominations if you need small notes for arrival",
  "Decide a cash versus card mix before you convert everything to notes",
];

export const buyLimitations: string[] = [
  "Nearby provider inventory or a store locator",
  "Live bureau availability or opening-hours feeds",
  "Exact provider quotes or a “best rate” table",
  "Online currency ordering, collection or delivery",
];

/** Near-me intent without a fake locator. */
export const buyNearYouChecks: string[] = [
  "Opening hours before you travel or collect",
  "Whether the currency you need is in stock",
  "Collection method — over the counter or click-and-collect",
  "Any identification or order requirements the provider sets",
  "The exchange rate and every fee on that offer",
  "How much foreign currency you would actually receive for a set pound amount",
];

/** Where people typically obtain currency — categories only, no named businesses. */
export const obtainWhere: Array<{ title: string; body: string }> = [
  {
    title: "Banks and high-street desks",
    body: "Many banks and travel-money desks can supply notes or arrange collection. Stock, currencies and cut-offs vary — check with the provider before you rely on them.",
  },
  {
    title: "Bureaux de change",
    body: "Independent or chain exchange desks often quote a rate and fee on the spot. Compare the amount you would keep after charges, not only the board rate.",
  },
  {
    title: "Airports",
    body: "Convenient on travel day if you need a small amount on arrival or departure. Convenience is often reflected in the rate or fee — compare when you can.",
  },
  {
    title: "Postal and banking services",
    body: "Some postal or banking services offer travel money. Availability and collection rules are set by that service — confirm before you order.",
  },
  {
    title: "ATMs abroad",
    body: "A foreign cash machine can dispense local notes with a suitable card. Read fee and conversion screens; estimate the cost first with the ATM tool.",
  },
];

export const exchangeWhen: Array<{ title: string; body: string }> = [
  {
    title: "Before you travel",
    body: "Useful for the first taxi, snack or tip. Compare the cash you would keep after fees. Buying early locks a rate and collection time — it does not guarantee a stronger offer than later options.",
  },
  {
    title: "On the day you fly",
    body: "Airport desks help if you still need a small float. Check opening hours and stock; leave time to compare the payout with any earlier quote you already had.",
  },
  {
    title: "After you arrive",
    body: "Town desks can be easier to compare once you can walk between offers. Carry a small amount of local cash so you are not forced to take the first desk.",
  },
  {
    title: "When you need a top-up",
    body: "An ATM or card payment can cover more spend without carrying a large stash from home. Re-check fees and DCC screens each time — they are not the same on every machine.",
  },
];

export const rateFeePoints: Array<{ title: string; body: string }> = [
  {
    title: "Reference vs provider rate",
    body: "A reference rate is an indicative planning figure. A bureau, bank, card or ATM applies its own rate, which usually includes a margin. Compare any real offer with the amount you would keep after fees.",
  },
  {
    title: "Fees and margins",
    body: "A flat commission reduces the pounds converted. A weaker rate hides cost inside the quote. On a large amount, a few percent weaker rate often costs more than a small flat fee.",
  },
  {
    title: "ATM, card and DCC charges",
    body: "ATMs may add an operator fee; cards may add cash-advance or foreign-spend fees. Dynamic currency conversion (DCC) is the operator’s home-currency quote — compare it with paying in local currency before you confirm.",
  },
];

export function rateFeePointsCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  return rateFeePoints.map((item) =>
    item.title !== "Reference vs provider rate"
      ? item
      : {
          ...item,
          body:
            source.kind === "reference"
              ? "The figure on this site is an indicative reference rate for information only. A bureau, bank, card or ATM applies its own rate, which usually includes a margin. Compare any real offer with the amount you would keep after fees."
              : "The figure on this site is a labelled demo rate for planning. A bureau, bank, card or ATM applies its own rate, which usually includes a margin. Compare any real offer with the amount you would keep after fees.",
        }
  );
}

export const travelCardPoints: Array<{ title: string; body: string }> = [
  {
    title: "What a prepaid travel-money card is",
    body: "A prepaid or preloaded travel card is a card you load in pounds and spend abroad. It sits between cash and a regular debit card: you cap how much is on it, and spending usually converts when you pay or withdraw. Holiday-money cards in the same category work the same way.",
  },
  {
    title: "When a travel-money card can help",
    body: "Useful when you want a capped spending wallet, a backup separate from your main bank card, or a way to pay abroad without carrying most of the trip in notes. It does not replace a small cash float for arrival.",
  },
  {
    title: "What to weigh before you load one",
    body: "Loading and unused-balance fees, the rate or margin on spends and ATM withdrawals, acceptance where you are going, and how leftover pounds are returned. Wayfare does not issue or rank cards — compare terms with the issuer.",
  },
];

/** Practical checks — not a provider ranking. */
export const travelCardChecks: string[] = [
  "Exchange rate or margin on foreign spends",
  "Load, reload and unused-balance fees",
  "ATM withdrawal charges abroad",
  "Supported currencies and spending limits",
  "Card acceptance where you are travelling",
  "Foreign-transaction fees, if any apply on top",
  "Whether cash withdrawal is supported",
  "How leftover pounds are returned or expire",
  "Whether you still need backup cash and a second payment method",
];

export const cashVsCardNotes: Array<{ title: string; body: string }> = [
  {
    title: "When cash helps",
    body: "Small purchases, tips, markets, taxis and places that prefer notes. Carry enough for the first day and gaps — not the whole trip budget.",
  },
  {
    title: "When cards help",
    body: "Larger purchases, hotels and restaurants where contactless works, and reducing how much cash you carry. Check foreign-transaction fees before you rely on one card.",
  },
  {
    title: "Watch the extras",
    body: "ATM operator fees, cash-advance charges and DCC can change the total. Compare the cost, not only the displayed rate.",
  },
];

export const cashVsCardRows: Array<{
  method: string;
  convenience: string;
  fees: string;
  rate: string;
  security: string;
  bestFor: string;
}> = [
  {
    method: "Cash",
    convenience: "Works almost anywhere, including small stalls",
    fees: "Paid when you buy or withdraw the notes",
    rate: "Locked in at the moment you exchange",
    security: "Can be lost or stolen; keep a spare stash",
    bestFor: "Tips, markets, first-day transport",
  },
  {
    method: "Card",
    convenience: "Fast where contactless and chip are accepted",
    fees: "Depends on your issuer’s foreign-spend terms",
    rate: "Converted when the payment settles",
    security: "Can be frozen or replaced if lost",
    bestFor: "Hotels, restaurants, larger spends",
  },
  {
    method: "ATM withdrawal",
    convenience: "Local notes when you need more cash",
    fees: "Machine fee plus any card cash-advance fee",
    rate: "Set by the ATM network or your issuer",
    security: "Use well-lit, bank-branded machines when you can",
    bestFor: "Topping up cash without carrying a large amount",
  },
];

export interface ChecklistGroup {
  heading: string;
  items: string[];
}

export const travelMoneyChecklistGroups: ChecklistGroup[] = [
  {
    heading: "Before you buy",
    items: [
      "Know your destination currency",
      "Estimate spending and an approximate cash versus card split",
      "Decide how much cash you actually need to order",
    ],
  },
  {
    heading: "Before you order or collect",
    items: [
      "Compare amount received after fees — not only the poster rate",
      "Check opening hours, stock and collection method with the provider",
      "Confirm any identification or collection requirements",
    ],
  },
  {
    heading: "Before you depart",
    items: [
      "Pack a backup payment method, separate from daily cash",
      "Keep some emergency cash where appropriate",
      "Know how ATM fees and DCC screens work",
    ],
  },
];

/** Flat list for any consumers that still expect a single array. */
export const travelMoneyChecklist = travelMoneyChecklistGroups.flatMap(
  (group) => group.items
);

export function travelMoneyPublishedGuides() {
  return getPublishedCurrencies().map((currency) => ({
    code: currency.code,
    name: currency.name,
    href: routes.currency(currency.slug),
    flag: currency.flag,
  }));
}

export const travelMoneyFaqs: CurrencyFaq[] = [
  {
    question: "What is travel money?",
    answer:
      "Travel money — also called holiday money — is the mix of cash, cards and converted currency you use on a trip. It includes notes you obtain in advance, card payments abroad, prepaid travel-money cards, and ATM withdrawals in local currency.",
  },
  {
    question: "What is holiday money?",
    answer:
      "Holiday money is another name for travel money: the cash and card spending you take on a trip. The same choices apply — how much to buy in advance, how much to keep on a card, and whether to top up from an ATM abroad.",
  },
  {
    question: "How do I buy travel money?",
    answer:
      "Decide whether you need cash in advance, an online order, a travel card, or cash after you arrive. Pick the destination currency, then compare how much you would actually receive after the rate, margin and fees. Wayfare does not sell or dispatch notes — use a bank, bureau or card issuer, and the tools on this page to sketch the arithmetic.",
  },
  {
    question: "Does Wayfare sell foreign currency?",
    answer:
      "No. Wayfare is a planning and conversion product. It does not sell, order, collect or hold notes. If you want physical currency, you still use a bank, bureau or other provider — then compare what they would actually pay out with the sample conversion here.",
  },
  {
    question: "Where can I buy foreign currency?",
    answer:
      "People commonly use banks, bureaux de change, airport desks, some postal or banking services, or an ATM abroad. Availability, opening hours and stock vary by provider. Wayfare does not list shops — compare the rate and any fees offered by your chosen provider.",
  },
  {
    question: "Where can I buy foreign currency near me?",
    answer:
      "Wayfare does not list shops or provide a map of bureaux. That needs real provider and location data we do not have. Search for a bank, travel-money desk or bureau yourself, then check opening hours, stock, collection rules, fees and the amount of currency you would receive for a set pound figure.",
  },
  {
    question: "Can I order travel money online?",
    answer:
      "Many UK banks and bureaux let you order foreign currency online for collection or delivery. Wayfare does not process those orders. Check the amount you would receive after fees, cut-off times, ID rules and whether the notes you need are in stock before you confirm.",
  },
  {
    question: "How do I compare buying foreign currency in the UK?",
    answer:
      "Ask how much destination currency you receive for a round pound amount after fees. Use the receive sketch on this page to see how a weaker rate or a commission changes that total. The sketch uses a labelled sample rate — it is not a quote from any provider.",
  },
  {
    question: "Should I buy currency before I travel or wait until I arrive?",
    answer:
      "A small amount before you go covers arrival costs. Whether to obtain the rest at home, on arrival or from an ATM depends on the amount received after fees, collection convenience and how much cash you want to carry. There is no method that always wins.",
  },
  {
    question: "Should I take cash or use a card abroad?",
    answer:
      "Most travellers use both. Cash helps for small purchases and places that prefer notes; cards help for larger spends and carrying less cash. The better mix depends on fees, acceptance and how much you want to carry — use the sketch on this page, then the planner for detail.",
  },
  {
    question: "Are travel-money cards useful?",
    answer:
      "They can be, when you want a capped prepaid wallet or a backup payment method. They are not automatically cheaper than a well-priced debit card, and they do not replace a small cash float. Compare load fees, rates, ATM charges and acceptance with the issuer — Wayfare does not recommend a provider.",
  },
  {
    question: "What fees should I check before buying or spending abroad?",
    answer:
      "Look for commission or flat fees on cash, the margin inside the exchange rate, card foreign-transaction fees, ATM operator and cash-advance fees, and any dynamic currency conversion (DCC) quote on a screen. Compare the amount you keep after charges.",
  },
  {
    question: "How does Wayfare’s rate differ from a provider’s rate?",
    answer:
      "Figures on this site are labelled sample or reference rates for travel planning. A bank, bureau, card or ATM uses its own dealing rate and may add fees or a margin. Use Wayfare to sketch the arithmetic — then judge any real offer by what you would actually receive.",
  },
  {
    question: "What is dynamic currency conversion?",
    answer:
      "Dynamic currency conversion (DCC) is when an ATM or card terminal offers to charge you in your home currency instead of the local one. The operator applies its own conversion. Compare that total with paying in local currency before you confirm.",
  },
  {
    question: "How much travel money should I take?",
    answer:
      "There is no single right amount. Start with daily spend × days, then a cash percentage for markets and tips. The sketch on this page is pounds only; the travel money planner is the full trip-planning product, including a destination-currency view.",
  },
  {
    question: "Is it better to withdraw cash from an ATM abroad?",
    answer:
      "An ATM can be a practical way to get local cash if your card’s fees are reasonable and you decline a weak on-screen conversion. Check the machine’s fee screen and estimate the cost first on the ATM tool.",
  },
];

export function travelMoneyFaqsCopy(table?: RateTable): CurrencyFaq[] {
  const source = rateSourceDisplay(table);
  const isRef = source.kind === "reference";
  return travelMoneyFaqs.map((faq) => {
    if (faq.question === "Does Wayfare sell foreign currency?") {
      return {
        ...faq,
        answer: isRef
          ? "No. Wayfare is a planning and conversion product. It does not sell, order, collect or hold notes. If you want physical currency, you still use a bank, bureau or other provider — then compare what they would actually pay out with the indicative conversion here."
          : faq.answer,
      };
    }
    if (faq.question === "How do I compare buying foreign currency in the UK?") {
      return {
        ...faq,
        answer: isRef
          ? "Ask how much destination currency you receive for a round pound amount after fees. Use the receive sketch on this page to see how a weaker rate or a commission changes that total. The sketch uses an indicative reference rate — it is not a quote from any provider."
          : faq.answer,
      };
    }
    if (faq.question === "How does Wayfare’s rate differ from a provider’s rate?") {
      return {
        ...faq,
        answer: isRef
          ? "Figures on this site are indicative reference rates for information only. A bank, bureau, card or ATM uses its own dealing rate and may add fees or a margin. Use Wayfare to sketch the arithmetic — then judge any real offer by what you would actually receive."
          : faq.answer,
      };
    }
    return faq;
  });
}
