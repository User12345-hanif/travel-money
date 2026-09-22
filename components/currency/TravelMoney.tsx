import {
  ArrowLeftRight,
  Banknote,
  Building2,
  CreditCard,
  Landmark,
  Percent,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Currency } from "@/lib/data/currencies";
import type { InfoBlock, TravelTopic } from "@/lib/data/currency-content";
import { routes } from "@/lib/routes";

const topicIcons: Record<TravelTopic, typeof Wallet> = {
  cash: Banknote,
  cards: CreditCard,
  atms: Landmark,
  exchange: Building2,
  dcc: ArrowLeftRight,
  fees: Percent,
};

/** Practical, factual travel-money guidance for the currency's country. */
export function TravelMoney({
  currency,
  blocks,
  place,
}: {
  currency: Currency;
  blocks: InfoBlock[];
  /** Optional place phrase for the heading; defaults to the currency's country. */
  place?: string;
}) {
  return (
    <Section>
      <SectionHeader
        eyebrow="Travel money"
        title={`Travel money in ${place ?? currency.country}`}
        description={`Practical choices for cash, cards, ATMs and exchange when you're using ${currency.name.toLowerCase()}.`}
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => {
          const Icon = (block.topic && topicIcons[block.topic]) || Wallet;
          return (
            <article
              key={block.heading}
              className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{block.heading}</h3>
              <div className="mt-2 space-y-3 text-sm text-muted">
                {block.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
        <Link
          href={routes.travelMoneyPlanner}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Plan a trip budget
        </Link>
        <Link
          href={routes.atmWithdrawal}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Estimate an ATM withdrawal
        </Link>
        <Link
          href={`${routes.travelMoney}#buy`}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          How to buy travel money
        </Link>
      </p>
    </Section>
  );
}
