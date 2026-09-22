import { ArrowDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Currency } from "@/lib/data/currencies";
import { baseCurrency, getCurrency } from "@/lib/data/currencies";
import {
  getBidirectionalRates,
  getConversion,
  type RateTable,
} from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { formatRate } from "@/lib/format";

/**
 * Bidirectional GBP ↔ page-currency rate, plus any extra bases from content.
 * Values come from the rates provider — never hardcoded.
 */
export function ExchangeRateCard({
  currency,
  baseCodes,
  description,
  rateTable,
}: {
  currency: Currency;
  baseCodes: string[];
  description?: string;
  rateTable?: RateTable;
}) {
  const pair = getBidirectionalRates(baseCurrency.code, currency.code, rateTable);
  const source = rateSourceDisplay(rateTable);
  const headerDescription =
    source.kind === "reference"
      ? `Indicative reference rates between the pound and the ${currency.name.toLowerCase()}. For information only — not a dealing quote.`
      : (description ??
        `Indicative sample rates between the pound and the ${currency.name.toLowerCase()}.`);
  const extras = baseCodes
    .filter((code) => code !== baseCurrency.code)
    .map((code) => {
      const from = getCurrency(code);
      if (!from) return null;
      const { rate } = getConversion(1, code, currency.code, rateTable);
      return { from, rate };
    })
    .filter((row): row is { from: Currency; rate: number } => row !== null);

  return (
    <Section className="bg-mist/40">
      <SectionHeader
        eyebrow="Exchange rate"
        title={`${baseCurrency.code} to ${currency.code}`}
        description={headerDescription}
        action={
          <Badge tone="muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
            {source.badge}
          </Badge>
        }
      />

      <Card className="mt-10 p-5 sm:p-6">
        <p className="text-sm font-semibold text-muted">
          {baseCurrency.code} → {currency.code}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RateColumn
            fromCode={baseCurrency.code}
            fromFlag={baseCurrency.flag}
            toCode={currency.code}
            toFlag={currency.flag}
            rate={pair.forward.rate}
          />
          <RateColumn
            fromCode={currency.code}
            fromFlag={currency.flag}
            toCode={baseCurrency.code}
            toFlag={baseCurrency.flag}
            rate={pair.reverse.rate}
          />
        </div>
      </Card>

      {extras.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {extras.map(({ from, rate }) => (
            <Card key={from.code} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-muted">
                  <span aria-hidden>{from.flag}</span> {from.code}/{currency.code}
                </span>
                <span className="text-sm font-semibold text-ink tabular-nums">
                  1 {from.code} = {formatRate(rate)} {currency.code}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      <p className="mt-4 text-xs text-muted">{source.disclaimer}</p>
    </Section>
  );
}

function RateColumn({
  fromCode,
  fromFlag,
  toCode,
  toFlag,
  rate,
}: {
  fromCode: string;
  fromFlag: string;
  toCode: string;
  toFlag: string;
  rate: number;
}) {
  return (
    <div>
      <p className="text-2xl font-semibold text-ink tabular-nums">
        <span aria-hidden>{fromFlag}</span> 1 {fromCode}
      </p>
      <ArrowDown className="mt-2 h-4 w-4 text-brand-600" aria-hidden />
      <p className="mt-2 text-2xl font-semibold text-ink tabular-nums">
        <span aria-hidden>{toFlag}</span> {formatRate(rate)} {toCode}
      </p>
    </div>
  );
}
