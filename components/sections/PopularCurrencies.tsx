import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LinkCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { popularCurrencies } from "@/lib/data/popular";
import { publishedCurrencySlugs } from "@/lib/data/currency-content";
import { baseCurrency } from "@/lib/data/currencies";
import { formatRate } from "@/lib/format";
import { routes } from "@/lib/routes";
import { getConversion, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

const visuals = {
  EUR: {
    src: "/images/home/popular-eur.webp",
    alt: "Euro banknotes beside a passport and boarding pass",
  },
  TRY: {
    src: "/images/home/popular-try.webp",
    alt: "Turkish lira banknotes beside a passport and boarding pass",
  },
  USD: {
    src: "/images/home/popular-usd.webp",
    alt: "US dollar banknotes beside a passport and boarding pass",
  },
  AED: {
    src: "/images/home/popular-aed.webp",
    alt: "UAE dirham banknotes beside a passport and boarding pass",
  },
} as const;

function CurrencyTile({
  currency,
  rate,
}: {
  currency: (typeof popularCurrencies)[number];
  rate: number;
}) {
  const visual = visuals[currency.code as keyof typeof visuals];

  return (
    <LinkCard href={routes.currency(currency.slug)} className="overflow-hidden">
      <div className="relative h-[4.5rem]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 46vw, 92vw"
          className="object-cover object-center"
        />
        <span
          className="absolute top-2.5 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface/90 text-lg shadow-[var(--shadow-card)]"
          aria-hidden
        >
          {currency.flag}
        </span>
        <ArrowUpRight
          className="absolute top-3 right-3 h-5 w-5 text-ink/70 transition-colors group-hover:text-brand-600"
          aria-hidden
        />
      </div>
      <div className="p-5">
        <p className="text-lg font-semibold text-ink">{currency.code}</p>
        <p className="text-sm text-muted">{currency.name}</p>
        <p className="mt-4 border-t border-line pt-3 text-sm text-body tabular-nums">
          1 {baseCurrency.code} ={" "}
          <span className="font-semibold text-ink">
            {formatRate(rate)} {currency.code}
          </span>
        </p>
      </div>
    </LinkCard>
  );
}

export function PopularCurrencies({ rateTable }: { rateTable: RateTable }) {
  const featured = popularCurrencies.filter((currency) =>
    publishedCurrencySlugs.includes(currency.slug)
  );
  const source = rateSourceDisplay(rateTable);

  return (
    <Section id="currencies">
      <SectionHeader
        eyebrow="Popular"
        title="Popular currencies"
        description={
          source.kind === "reference"
            ? "Start with the currencies travellers convert most. Rates shown are indicative reference rates."
            : "Start with the currencies travellers convert most. Rates shown are indicative samples."
        }
        action={
          <Button href={routes.currencies} size="md" variant="secondary">
            Explore currencies
          </Button>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((currency) => (
          <CurrencyTile
            key={currency.code}
            currency={currency}
            rate={getConversion(1, baseCurrency.code, currency.code, rateTable).rate}
          />
        ))}
      </div>
    </Section>
  );
}
