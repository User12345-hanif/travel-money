import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "./Breadcrumbs";
import Link from "next/link";
import {
  ConnectedConverter,
  ConverterAmountProvider,
  QuickConversions,
} from "./CurrencyTools";
import type { Currency } from "@/lib/data/currencies";
import { baseCurrency } from "@/lib/data/currencies";
import { getConverterCurrencies } from "@/lib/data/currency-content";
import { routes } from "@/lib/routes";
import {
  getAmountConversions,
  getBidirectionalRates,
  QUICK_GBP_AMOUNTS,
  type RateTable,
} from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { formatCurrency, formatRate } from "@/lib/format";
import type { BreadcrumbItem } from "@/lib/seo";

/**
 * Currency-page hero: identity, rate status, converter and quick amounts.
 * Interactive pieces sit in a small client island; the H1 stays here.
 */
export function CurrencyHero({
  currency,
  summary,
  breadcrumbs,
  rateTable,
  heading,
}: {
  currency: Currency;
  summary: string;
  breadcrumbs: BreadcrumbItem[];
  rateTable?: RateTable;
  heading?: string;
}) {
  const pair = getBidirectionalRates(baseCurrency.code, currency.code, rateTable);
  const source = rateSourceDisplay(rateTable);
  const quickRows = getAmountConversions(
    QUICK_GBP_AMOUNTS,
    baseCurrency.code,
    currency.code,
    rateTable
  ).map((row) => ({
    amount: row.amount,
    fromLabel: formatCurrency(row.amount, baseCurrency.code, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    toLabel: formatCurrency(row.converted, currency.code),
  }));

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,var(--brand-50)_0%,transparent_55%)]"
      />
      <ConverterAmountProvider>
        <Container className="py-8 lg:py-10">
          <Breadcrumbs items={breadcrumbs} />
        </Container>

        <Container className="grid grid-cols-1 items-center gap-10 pb-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-2xl"
                aria-hidden
              >
                {currency.flag}
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <span className="rounded-full bg-brand-50 px-2.5 py-1">{currency.code}</span>
                <span className="rounded-full bg-brand-50 px-2.5 py-1" aria-hidden>
                  {currency.symbol}
                </span>
                <span className="text-muted">{currency.country}</span>
              </div>
            </div>

            <h1 className="mt-5 text-hero font-semibold text-ink">
              {heading ??
                `${currency.name} (${currency.code}) exchange rate & currency guide`}
            </h1>

            <p className="mt-5 text-lead text-muted">{summary}</p>

            <div className="mt-6 inline-flex max-w-full flex-col gap-1 rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm sm:inline-flex sm:flex-row sm:items-center sm:gap-3">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                <span className="font-semibold text-ink tabular-nums">
                  1 {baseCurrency.code} = {formatRate(pair.forward.rate)} {currency.code}
                </span>
              </span>
              <span className="hidden text-line-strong sm:inline" aria-hidden>
                |
              </span>
              <span className="pl-3.5 font-semibold text-ink tabular-nums sm:pl-0">
                1 {currency.code} = {formatRate(pair.reverse.rate)} {baseCurrency.code}
              </span>
              <span className="pl-3.5 text-muted sm:pl-0">· {source.badge}</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#converter" size="lg">
                Convert {baseCurrency.code} to {currency.code}
              </Button>
              <Button href={routes.travelMoneyPlanner} size="lg" variant="secondary">
                Plan a trip
              </Button>
            </div>
            <p className="mt-4 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <Link
                href={routes.atmWithdrawal}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                Estimate an ATM withdrawal
              </Link>
              <Link
                href={routes.travelMoney}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                Prepare travel money
              </Link>
            </p>
          </div>

          <div id="converter" className="scroll-mt-24 lg:justify-self-end">
            <div className="mx-auto w-full max-w-md">
              <ConnectedConverter
                toCode={currency.code}
                currencies={getConverterCurrencies()}
                rateTable={rateTable}
              />
            </div>
          </div>
        </Container>

        <Container className="pb-14 lg:pb-16">
          <QuickConversions toName={currency.name} rows={quickRows} />
        </Container>
      </ConverterAmountProvider>
    </section>
  );
}
