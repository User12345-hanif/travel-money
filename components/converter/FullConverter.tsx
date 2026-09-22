"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { baseCurrency, getCurrency, type Currency } from "@/lib/data/currencies";
import { currencySymbol, formatCurrency, formatRate } from "@/lib/format";
import {
  getAmountConversions,
  getBidirectionalRates,
  getConversion,
  QUICK_GBP_AMOUNTS,
  type RateTable,
} from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { Badge } from "@/components/ui/Badge";

function sanitizeAmount(value: string): string {
  return value.replace(/[^0-9.]/g, "");
}

function Field({
  label,
  amount,
  code,
  currencies,
  editable,
  onAmountChange,
  onCodeChange,
}: {
  label: string;
  amount: string;
  code: string;
  currencies: Currency[];
  editable: boolean;
  onAmountChange?: (value: string) => void;
  onCodeChange: (code: string) => void;
}) {
  const currency = getCurrency(code) ?? baseCurrency;
  const inputId = useId();
  const selectId = useId();

  return (
    <div className="min-w-0 rounded-2xl border border-line bg-canvas/60 px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={editable ? inputId : selectId}
          className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
        >
          {label}
        </label>
        <div className="relative shrink-0">
          <select
            id={selectId}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            aria-label={`${label} currency`}
            className="peer h-11 min-w-0 cursor-pointer appearance-none rounded-full border border-line-strong bg-surface py-0 pr-9 pl-3.5 text-sm font-semibold text-ink outline-none transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {currencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.flag} {item.code}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
        </div>
      </div>

      <div className="mt-4 flex min-w-0 items-baseline gap-2">
        {editable ? (
          <>
            <span className="text-2xl font-semibold text-muted sm:text-[28px]" aria-hidden>
              {currencySymbol(code)}
            </span>
            <input
              id={inputId}
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => onAmountChange?.(sanitizeAmount(e.target.value))}
              aria-label={`Amount in ${currency.name}`}
              className="w-full min-w-0 bg-transparent text-[40px] leading-none font-semibold tracking-tight text-ink tabular-nums outline-none placeholder:text-muted/60 sm:text-[44px]"
              placeholder="0.00"
            />
          </>
        ) : (
          <output
            aria-live="polite"
            aria-label={`Amount in ${currency.name}`}
            className="w-full min-w-0 truncate text-[40px] leading-none font-semibold tracking-tight text-ink tabular-nums sm:text-[44px]"
          >
            {amount}
          </output>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">{currency.name}</p>
    </div>
  );
}

export function FullConverter({
  currencies,
  initialFrom = "GBP",
  initialTo = "EUR",
  initialAmount = "100",
  rateTable,
}: {
  currencies: Currency[];
  /** Starting source code. Pair pages can pass this later without a new engine. */
  initialFrom?: string;
  initialTo?: string;
  initialAmount?: string;
  rateTable?: RateTable;
}) {
  const fallback = currencies[0]?.code ?? baseCurrency.code;
  const has = (code: string) => currencies.some((currency) => currency.code === code);
  const [amount, setAmount] = useState(initialAmount);
  const [from, setFrom] = useState(has(initialFrom) ? initialFrom : fallback);
  const [to, setTo] = useState(
    has(initialTo) && initialTo !== (has(initialFrom) ? initialFrom : fallback)
      ? initialTo
      : (currencies.find((currency) => currency.code !== (has(initialFrom) ? initialFrom : fallback))
          ?.code ?? fallback)
  );
  const [swapping, setSwapping] = useState(false);

  const numericAmount = Number(amount) || 0;
  const conversion = useMemo(
    () => getConversion(numericAmount, from, to, rateTable),
    [numericAmount, from, to, rateTable]
  );
  const pair = useMemo(() => getBidirectionalRates(from, to, rateTable), [from, to, rateTable]);
  const quick = useMemo(
    () => getAmountConversions(QUICK_GBP_AMOUNTS, from, to, rateTable),
    [from, to, rateTable]
  );

  const fromCurrency = getCurrency(from) ?? baseCurrency;
  const toCurrency = getCurrency(to) ?? baseCurrency;
  const selectedQuick = Number(amount);
  const source = rateSourceDisplay(rateTable);

  function setFromCode(code: string) {
    if (code === to) setTo(from);
    setFrom(code);
  }

  function setToCode(code: string) {
    if (code === from) setFrom(to);
    setTo(code);
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setSwapping((value) => !value);
  }

  return (
    <div className="min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Convert an amount</p>
        <Badge tone="muted">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
          {source.badge}
        </Badge>
      </div>

      <div className="relative mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <Field
          label="From"
          amount={amount}
          code={from}
          currencies={currencies}
          editable
          onAmountChange={setAmount}
          onCodeChange={setFromCode}
        />

        <div className="flex justify-center lg:px-1">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap currencies"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-surface bg-brand-600 text-white shadow-[0_4px_12px_-2px_rgba(31,107,84,0.5)] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-brand-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <ArrowUpDown
              className={cn(
                "h-4 w-4 transition-transform duration-300 ease-out",
                swapping && "rotate-180"
              )}
              aria-hidden
            />
          </button>
        </div>

        <Field
          label="To"
          amount={formatCurrency(conversion.converted, to)}
          code={to}
          currencies={currencies}
          editable={false}
          onCodeChange={setToCode}
        />
      </div>

      <div className="mt-6 min-w-0 rounded-2xl border border-line bg-canvas/70 px-4 py-4 sm:px-5">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
          Converted amount
        </p>
        <p className="mt-2 flex min-w-0 items-baseline gap-x-2.5 text-[28px] leading-none font-semibold tracking-tight text-ink tabular-nums max-sm:flex-wrap max-sm:gap-y-1 sm:gap-x-3 sm:text-[32px] sm:flex-nowrap">
          <span className="whitespace-nowrap">{formatCurrency(numericAmount, from)}</span>
          <span className="shrink-0 text-xl text-muted" aria-hidden>
            →
          </span>
          <span className="whitespace-nowrap">{formatCurrency(conversion.converted, to)}</span>
        </p>
        <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-1">
          <p className="min-w-0 text-body">
            {source.rateNoun}:{" "}
            <span className="whitespace-nowrap tabular-nums">
              1 {fromCurrency.code} = {formatRate(pair.forward.rate)} {toCurrency.code}
            </span>
          </p>
          <p className="min-w-0 text-muted">
            Inverse:{" "}
            <span className="whitespace-nowrap tabular-nums">
              1 {toCurrency.code} = {formatRate(pair.reverse.rate)} {fromCurrency.code}
            </span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">{source.disclaimer}</p>

      <div className="mt-8 border-t border-line pt-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
              Quick conversions
            </p>
            <h2 className="mt-2 text-h3 font-semibold text-ink">
              {fromCurrency.code} to {toCurrency.code}
            </h2>
          </div>
          <p className="text-sm text-muted">Tap an amount to fill the converter.</p>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quick.map((row) => {
            const isActive = selectedQuick === row.amount;
            return (
              <li key={row.amount}>
                <button
                  type="button"
                  onClick={() => setAmount(String(row.amount))}
                  aria-pressed={isActive}
                  className={cn(
                    "flex min-h-16 w-full min-w-0 flex-col items-start rounded-2xl border px-3.5 py-3 text-left shadow-[var(--shadow-card)] transition-[border-color,background-color] duration-200",
                    "hover:border-brand-300 hover:bg-brand-50/50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    isActive ? "border-brand-500 bg-brand-50" : "border-line bg-surface"
                  )}
                >
                  <span className="text-sm font-semibold text-ink tabular-nums">
                    {formatCurrency(row.amount, from, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span className="mt-1 text-xs text-muted tabular-nums">
                    {formatCurrency(row.converted, to)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
