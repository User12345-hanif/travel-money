"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Currency } from "@/lib/data/currencies";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";

function matchesQuery(currency: Currency, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    currency.name.toLowerCase().includes(q) ||
    currency.code.toLowerCase().includes(q) ||
    currency.symbol.toLowerCase().includes(q) ||
    currency.country.toLowerCase().includes(q) ||
    currency.region.toLowerCase().includes(q) ||
    currency.slug.includes(q)
  );
}

export function CurrencySearch({ currencies }: { currencies: Currency[] }) {
  const searchId = useId();
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => currencies.filter((currency) => matchesQuery(currency, query)),
    [currencies, query]
  );

  return (
    <div className="min-w-0">
      <div className="rounded-2xl border border-line bg-surface px-4 py-3 shadow-[var(--shadow-card)] focus-within:border-brand-500 focus-within:shadow-[0_0_0_4px_var(--brand-50)]">
        <label
          htmlFor={searchId}
          className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
        >
          Search currencies
        </label>
        <div className="mt-2 flex min-w-0 items-center gap-2">
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, code, symbol or country — e.g. euro, TRY, ₺"
            autoComplete="off"
            className="h-11 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {query.trim()
          ? `${results.length} ${results.length === 1 ? "match" : "matches"}`
          : `${currencies.length} published ${currencies.length === 1 ? "currency" : "currencies"}`}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-line bg-surface px-5 py-8 text-center text-sm text-muted">
          No published currencies match “{query.trim()}”.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {results.map((currency) => (
            <li key={currency.code}>
              <article className="min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
                <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-2xl"
                      aria-hidden
                    >
                      {currency.flag}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-h3 font-semibold text-ink">{currency.name}</h3>
                      <p className="mt-1 text-sm text-body">
                        <span className="font-semibold text-ink">{currency.code}</span>
                        <span className="mx-2 text-muted" aria-hidden>
                          ·
                        </span>
                        <span>{currency.symbol}</span>
                        <span className="mx-2 text-muted" aria-hidden>
                          ·
                        </span>
                        <span>
                          {currency.country}, {currency.region}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-wrap gap-2">
                    <Button href={routes.currency(currency.slug)} size="md">
                      Explore
                    </Button>
                    <Button
                      href={`${routes.currency(currency.slug)}#converter`}
                      size="md"
                      variant="secondary"
                    >
                      Convert
                    </Button>
                    <Button href={routes.travelMoney} size="md" variant="secondary">
                      Travel money
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
