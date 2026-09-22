import { routes } from "@/lib/routes";
import type { RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

/** Editorial copy for /currencies/. Searchable list comes from published currencies. */
export const explorerPage = {
  metaTitle: "Travel Currencies: Browse Guides and Conversions",
  metaDescription:
    "Search published travel currencies by name, code or country. Open a guide for indicative rates, travel-money notes and conversion tools. Not dealing quotes.",
  h1: "Browse travel currencies",
  lead: "Find a currency by name, code or country, open its guide, and start a conversion. Figures use labelled sample rates, not live market data.",
};

export function explorerPageCopy(table?: RateTable) {
  const source = rateSourceDisplay(table);
  if (source.kind !== "reference") return explorerPage;
  return {
    ...explorerPage,
    lead: "Find a currency by name, code or country, open its guide, and start a conversion. Figures use indicative reference rates for information only.",
  };
}

export const explorerRelated = [
  {
    title: "Currency converter",
    href: routes.converter,
    blurb: "Convert an amount with the dedicated converter.",
    cta: "Open converter",
  },
  {
    title: "Travel money",
    href: routes.travelMoney,
    blurb: "Cash versus card, exchange tips and the travel-money toolkit.",
    cta: "Open travel money",
  },
  {
    title: "Travel money planner",
    href: routes.travelMoneyPlanner,
    blurb: "Estimate a trip budget and split cash and card.",
    cta: "Open planner",
  },
  {
    title: "ATM withdrawal calculator",
    href: routes.atmWithdrawal,
    blurb: "Estimate local cash and optional fees before you withdraw abroad.",
    cta: "Estimate a withdrawal",
  },
];
