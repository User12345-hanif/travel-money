import type { CurrencyFaq } from "./currency-content";
import { routes } from "@/lib/routes";
import type { RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

/**
 * Editorial copy for /atm-withdrawal/.
 * Search intent is ATM / cash-withdrawal (fees, DCC, local currency) — not
 * currency-page exchange-rate intent.
 */
export const atmPage = {
  metaTitle: "ATM Withdrawal Calculator: Cash, Fees and Cost Abroad",
  metaDescription:
    "Estimate local cash from a foreign ATM, add optional fees, and compare a home-currency conversion offer. Indicative planning figures — not a bank quote, and not an ATM locator.",
  h1: "ATM cash withdrawal calculator",
  lead: "Estimate the local cash from a foreign ATM withdrawal, then add any ATM or extra fees to see a total cost. Figures are estimates using demo rates — not a live quote from a bank or cash machine.",
};

export function atmPageCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return atmPage;
  return {
    ...atmPage,
    lead: "Estimate the local cash from a foreign ATM withdrawal, then add any ATM or extra fees to see a total cost. Figures are estimates using an indicative reference rate — not a dealing quote from a bank or cash machine.",
  };
}

export const atmHowItWorks: Array<{ title: string; body: string }> = [
  {
    title: "Withdrawal amount",
    body: "The amount you want to take out, in your base currency. The calculator converts this to the destination currency to estimate cash received.",
  },
  {
    title: "Exchange rate",
    body: "An indicative sample rate from the existing provider. A bank or ATM network will use its own rate, which usually includes a margin.",
  },
  {
    title: "ATM fee",
    body: "An optional operator charge some machines add on top of the withdrawal. Enter the fee you expect in your base currency — leave it at zero if you are not sure.",
  },
  {
    title: "Additional fee",
    body: "An optional extra cost, such as a card foreign-transaction fee. This is also treated as an add-on to total cost, not a cut from the cash dispensed.",
  },
];

export function atmHowItWorksCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  return atmHowItWorks.map((item) =>
    item.title !== "Exchange rate"
      ? item
      : {
          ...item,
          body:
            source.kind === "reference"
              ? "An indicative reference rate for information only. ATM operators, banks, card providers and bureaux may apply their own rates, fees or margins."
              : item.body,
        }
  );
}

export const atmFeeCards: Array<{ title: string; body: string }> = [
  {
    title: "ATM operator fee",
    body: "Some cash machines charge a fixed amount or a percentage for using their network. The fee, if any, is set by the operator — this page does not assume a standard charge.",
  },
  {
    title: "Card issuer fee",
    body: "Your bank or card may add a foreign-transaction or cash-advance fee on withdrawals abroad. Check your card’s terms; do not treat any example figure as typical.",
  },
  {
    title: "Exchange-rate margin",
    body: "The rate applied to the withdrawal is often a little away from the mid-market rate. That difference is a cost even when no separate fee line appears.",
  },
];

export const atmTips: Array<{ title: string; body: string }> = [
  {
    title: "Read the screen before you confirm",
    body: "ATMs often show the amount, a conversion and any operator fee on the confirmation step. Pause there and compare what is offered with the estimate you ran here.",
  },
  {
    title: "Know your card’s charges",
    body: "A flat ATM fee makes several small withdrawals more expensive than one larger one. Whether that applies depends on your card — check before you travel.",
  },
  {
    title: "Prefer bank-branded machines when you can",
    body: "Machines attached to banks are often clearer about fees than standalone kiosks. That is a practical starting point, not a guarantee of a better rate.",
  },
  {
    title: "Keep a little cash, not a lot",
    body: "Carry enough for markets, tips and places that prefer cash, and use a card for larger spends where contactless is accepted. Split the risk if a card is declined.",
  },
];

export const atmFaqs: CurrencyFaq[] = [
  {
    question: "How do I estimate an ATM cash withdrawal abroad?",
    answer:
      "Enter the amount you want to withdraw, the destination currency and any fees you expect. The calculator converts the withdrawal at an indicative sample rate and adds fees on top to show an estimated total cost.",
  },
  {
    question: "What is an ATM withdrawal fee?",
    answer:
      "Some cash machines charge a fee for a foreign withdrawal, as a fixed amount or a percentage. Your card issuer may add a separate charge. This tool only includes fees you type in — it does not look up live ATM charges.",
  },
  {
    question: "What is dynamic currency conversion?",
    answer:
      "Dynamic currency conversion (DCC) is when an ATM or card terminal offers to charge you in your home currency instead of the local one. The operator applies its own conversion. You can usually decline and let your card issuer convert the local amount instead.",
  },
  {
    question: "Should I choose local currency or pounds at an ATM?",
    answer:
      "There is no option that is always cheaper. Compare the rate and any fee shown on the machine with what your card would charge for a local-currency withdrawal. If the offered conversion looks poor, declining DCC and paying in local currency is often the clearer path — but it depends on the quote in front of you.",
  },
  {
    question: "Do ATM fees come out of the cash I receive?",
    answer:
      "Often the machine still dispenses the amount you requested and charges fees to your card on top. This calculator follows that model: estimated cash is the converted withdrawal; ATM and additional fees increase total cost. Your bank’s statement is the source of truth.",
  },
  {
    question: "Does this calculator use live exchange rates?",
    answer:
      "No. It uses clearly labelled demo / sample rates so you can see how the estimate is built. A real ATM will use its own rate and fees, which can differ.",
  },
  {
    question: "Can I withdraw foreign currency from an ATM abroad?",
    answer:
      "Yes — that is the usual way to get local notes with a foreign card. Enter the amount and destination currency here to sketch cash received and optional fees. The machine’s own rate and charges still apply when you withdraw.",
  },
  {
    question: "Does this tool find cash machines near me?",
    answer:
      "No. This page estimates cost and explains fees and DCC. It is not an ATM locator and does not list machines. Use your bank’s map or a maps app to find a cash point, then compare that machine’s screen with the estimate here.",
  },
  {
    question: "How can I reduce the cost of cash withdrawals when travelling?",
    answer:
      "Use a card with low foreign-transaction fees if you have one, avoid unnecessary DCC if the on-screen rate looks weak, and be wary of repeated small withdrawals when a flat fee applies. Always read the ATM’s own fee and conversion screens.",
  },
];

export function atmFaqsCopy(table?: RateTable): CurrencyFaq[] {
  const source = rateSourceDisplay(table);
  const isRef = source.kind === "reference";
  return atmFaqs.map((faq) => {
    if (faq.question === "How do I estimate an ATM cash withdrawal abroad?") {
      return {
        ...faq,
        answer: isRef
          ? "Enter the amount you want to withdraw, the destination currency and any fees you expect. The calculator converts the withdrawal at an indicative reference rate and adds fees on top to show an estimated total cost. ATM operators, banks and card providers may apply their own rates, fees or margins."
          : faq.answer,
      };
    }
    if (faq.question === "Does this calculator use live exchange rates?") {
      return {
        ...faq,
        answer: isRef
          ? "No. It uses an indicative reference rate for information only. A real ATM will use its own rate and fees, which can differ."
          : faq.answer,
      };
    }
    return faq;
  });
}

/** Tool handoffs after an ATM estimate — not a currency link dump. */
export const atmRelated = [
  {
    name: "Travel money",
    href: routes.travelMoney,
    blurb: "Cash, cards, fees and exchange — how to prepare before you withdraw.",
  },
  {
    name: "Currency converter",
    href: routes.converter,
    blurb: "Convert an amount with the dedicated converter.",
  },
  {
    name: "Travel money planner",
    href: routes.travelMoneyPlanner,
    blurb: "Estimate a trip budget and cash versus card split.",
  },
  {
    name: "Currency explorer",
    href: routes.currencies,
    blurb: "Browse published destination currencies and open a guide.",
  },
];
