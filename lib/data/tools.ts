import { routes } from "@/lib/routes";

export interface Tool {
  title: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  cta: string;
}

export const tools: Tool[] = [
  {
    title: "Currency Converter",
    description:
      "Convert published travel currencies with an indicative rate — not a dealing quote.",
    href: routes.converter,
    status: "available",
    cta: "Open converter",
  },
  {
    title: "Travel Money",
    description:
      "Cash versus card, fees, exchange timing and how to prepare money before you travel.",
    href: routes.travelMoney,
    status: "available",
    cta: "Prepare travel money",
  },
  {
    title: "Plan Your Travel Money",
    description:
      "Estimate your trip budget and decide how much to keep as cash or use by card.",
    href: routes.travelMoneyPlanner,
    status: "available",
    cta: "Plan your trip",
  },
  {
    title: "ATM Withdrawal",
    description:
      "Estimate foreign ATM cash, optional fees and total cost before you withdraw abroad.",
    href: routes.atmWithdrawal,
    status: "available",
    cta: "Estimate a withdrawal",
  },
];
