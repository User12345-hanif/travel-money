import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { type Currency, type Region, regionOrder } from "@/lib/data/currencies";
import { getPublishedCurrencies } from "@/lib/data/currency-content";
import { countLabel } from "@/lib/text";
import { routes } from "@/lib/routes";

const chipClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-sm font-medium text-body";

export function CurrencyExplorer() {
  const grouped = Object.fromEntries(
    regionOrder.map((region) => [region, [] as Currency[]])
  ) as Record<Region, Currency[]>;

  for (const currency of getPublishedCurrencies()) {
    grouped[currency.region].push(currency);
  }

  return (
    <Section>
      <SectionHeader
        eyebrow="Explore"
        title="Explore currencies"
        description="Destination currencies, grouped by region. Open a guide to convert and plan."
        action={
          <Button href={routes.currencies} size="md" variant="secondary">
            Explore currencies
          </Button>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {regionOrder
          .filter((region) => grouped[region].length > 0)
          .map((region) => (
            <div
              key={region}
              className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-h3 font-semibold">{region}</h3>
                <span className="text-xs font-semibold text-muted">
                  {countLabel(grouped[region].length, "currency", "currencies")}
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {grouped[region].map((currency) => (
                  <li key={currency.code}>
                    <Link
                      href={routes.currency(currency.slug)}
                      className={`${chipClass} transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800`}
                    >
                      <span aria-hidden>{currency.flag}</span>
                      <span className="font-semibold text-ink">{currency.code}</span>
                      <span className="text-muted">{currency.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </Section>
  );
}
