import Link from "next/link";
import { ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Currency } from "@/lib/data/currencies";
import { getCurrency } from "@/lib/data/currencies";
import { getCurrencyContent } from "@/lib/data/currency-content";
import { publishedPairs, routes } from "@/lib/routes";

const toolLinks = [
  {
    href: routes.converter,
    label: "Currency converter",
    blurb: "Convert any published pair with the full converter.",
  },
  {
    href: routes.travelMoney,
    label: "Travel money",
    blurb: "Cash, cards, exchange and fees before you go.",
  },
  {
    href: routes.travelMoneyPlanner,
    label: "Travel money planner",
    blurb: "Plan a trip budget and cash versus card split.",
  },
  {
    href: routes.atmWithdrawal,
    label: "ATM withdrawal",
    blurb: "Estimate local cash and optional fees abroad.",
  },
  {
    href: routes.currencies,
    label: "Currency explorer",
    blurb: "Browse published destination currencies.",
  },
] as const;

/**
 * Internal links to published currency pages and Wayfare tools.
 * Conversion-pair URLs are omitted until those routes exist in `publishedPairs`.
 */
export function RelatedLinks({
  currency,
  relatedCurrencyCodes,
  pairBases,
}: {
  currency: Currency;
  relatedCurrencyCodes: string[];
  pairBases: string[];
}) {
  const relatedCurrencies = relatedCurrencyCodes
    .map((code) => getCurrency(code))
    .filter((c): c is Currency => Boolean(c))
    .filter((c) => Boolean(getCurrencyContent(c.slug)))
    .filter((c) => c.code !== currency.code);

  const pairs = pairBases
    .map((code) => getCurrency(code))
    .filter((c): c is Currency => Boolean(c))
    .filter((from) =>
      publishedPairs.some(
        (pair) =>
          pair.from.toUpperCase() === from.code &&
          pair.to.toUpperCase() === currency.code
      )
    );

  return (
    <Section>
      <SectionHeader
        eyebrow="Next"
        title="Continue with Wayfare tools"
        description={`Use ${currency.code} with the converter, planner and ATM tools, or open another published currency.`}
      />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Wayfare tools
          </h3>
          <ul className="mt-4 space-y-2">
            {toolLinks.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group flex min-h-11 items-start justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-brand-800">
                      {tool.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{tool.blurb}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted group-hover:text-brand-700"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {relatedCurrencies.length > 0 || pairs.length > 0 ? (
          <div className="space-y-8">
            {relatedCurrencies.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
                  Other currencies
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {relatedCurrencies.map((c) => (
                    <li key={c.code}>
                      <Link
                        href={routes.currency(c.slug)}
                        className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-body transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                      >
                        <span aria-hidden>{c.flag}</span>
                        <span className="font-semibold text-ink group-hover:text-brand-800">
                          {c.code}
                        </span>
                        <span>{c.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {pairs.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
                  Popular conversions
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pairs.map((from) => (
                    <li key={from.code}>
                      <Link
                        href={routes.pair(from.code, currency.code)}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-body transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                      >
                        <ArrowLeftRight className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                        <span className="font-semibold text-ink">
                          {from.code} → {currency.code}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
