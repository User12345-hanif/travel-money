import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import type { Currency } from "@/lib/data/currencies";

/** Compact facts sourced only from `lib/data/currencies.ts`. */
export function CurrencyFacts({ currency }: { currency: Currency }) {
  const facts = [
    { label: "Currency", value: currency.name },
    { label: "Code", value: currency.code },
    { label: "Symbol", value: currency.symbol },
    { label: "Used in", value: currency.country },
    { label: "Decimal places", value: String(currency.decimals) },
  ];

  return (
    <Section className="border-t border-line">
      <SectionHeader
        eyebrow="Facts"
        title={`${currency.name} at a glance`}
        description={`Code, symbol and where ${currency.code} is used.`}
      />

      <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {facts.map((fact) => (
          <Card key={fact.label} className="p-4 sm:p-5">
            <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-ink">{fact.value}</dd>
          </Card>
        ))}
      </dl>
    </Section>
  );
}
