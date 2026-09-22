import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { baseCurrency } from "@/lib/data/currencies";
import { publishedCurrencySlugs } from "@/lib/data/currency-content";
import { formatRate } from "@/lib/format";
import {
  getPreviewRates,
  type PreviewRate,
  type RateTable,
} from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

const rowLayout =
  "flex items-center justify-between gap-4 px-5 py-4 sm:grid sm:grid-cols-[1fr_auto] sm:px-6";

function RateRowBody({ row }: { row: PreviewRate }) {
  return (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-xl" aria-hidden>
          {row.flag}
        </span>
        <div className="min-w-0">
          <span className="font-semibold text-ink">{row.code}</span>
          <span className="ml-2 hidden text-sm text-muted sm:inline">{row.name}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <span className="text-right font-semibold text-ink tabular-nums">
          {formatRate(row.value)}
        </span>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-muted/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600"
          aria-hidden
        />
      </div>
    </>
  );
}

function RateRow({ row }: { row: PreviewRate }) {
  const label = `${row.name} (${row.code}) exchange rate — 1 ${baseCurrency.code} equals ${formatRate(row.value)} ${row.code}`;

  return (
    <Link
      href={routes.currency(row.slug)}
      aria-label={label}
      className={cn(
        rowLayout,
        "group transition-colors hover:bg-canvas/70 focus-visible:bg-canvas/70 focus-visible:outline-none"
      )}
    >
      <RateRowBody row={row} />
    </Link>
  );
}

export function ExchangeRatePreview({ rateTable }: { rateTable: RateTable }) {
  const rows = getPreviewRates(rateTable).filter((row) =>
    publishedCurrencySlugs.includes(row.slug)
  );
  const source = rateSourceDisplay(rateTable);

  return (
    <Section id="rates" className="bg-mist/40">
      <SectionHeader
        eyebrow="Rates"
        title={source.kind === "reference" ? "Reference exchange rates" : "Sample exchange rates"}
        description={
          source.kind === "reference"
            ? `Indicative reference rates against the ${baseCurrency.name} (${baseCurrency.code})${source.asOfLabel ? ` · ${source.asOfLabel}` : ""}. Not a dealing quote.`
            : `Indicative sample rates against the ${baseCurrency.name} (${baseCurrency.code}). Demo data — not a live market quote.`
        }
      />

      <Card className="mt-10 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
          <div className="grid flex-1 grid-cols-[1fr_auto] items-center gap-4">
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">
              Currency
            </span>
            <span className="hidden text-right text-xs font-semibold tracking-wide text-muted uppercase sm:block">
              Rate (per {baseCurrency.code})
            </span>
          </div>
          <Badge tone="muted" className="shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
            {source.badge}
          </Badge>
        </div>

        <ul className="divide-y divide-line">
          {rows.map((row) => (
            <li key={row.code}>
              <RateRow row={row} />
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-4 text-xs text-muted">{source.disclaimer}</p>
    </Section>
  );
}
