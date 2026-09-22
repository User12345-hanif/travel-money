export interface Guide {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  /** Live product route — unpublished /guides/ pages are not linked. */
  href: string;
  cta: string;
}

export const guides: Guide[] = [
  {
    title: "How currency exchange rates work",
    slug: "how-exchange-rates-work",
    excerpt:
      "What actually moves a rate, why the number you see isn't always the one you get, and how to read a quote.",
    category: "Basics",
    href: "/currency-converter/",
    cta: "Open converter",
  },
  {
    title: "Cash vs card when travelling",
    slug: "cash-vs-card-when-travelling",
    excerpt:
      "The real trade-offs between notes and plastic abroad — and a simple split that works almost everywhere.",
    category: "Travel money",
    href: "/travel-money/",
    cta: "Open travel money",
  },
  {
    title: "How much travel money should you take?",
    slug: "how-much-travel-money-to-take",
    excerpt:
      "A practical way to budget cash for a trip without carrying too much or running short.",
    category: "Planning",
    href: "/travel-money-planner/",
    cta: "Open planner",
  },
  {
    title: "Understanding foreign exchange fees",
    slug: "understanding-foreign-exchange-fees",
    excerpt:
      "Spreads, markups and 'zero-commission' claims — the fees to look for before you convert.",
    category: "Fees",
    href: "/atm-withdrawal/",
    cta: "Open ATM calculator",
  },
];
