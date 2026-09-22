"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { baseCurrency, getCurrency, type Currency } from "@/lib/data/currencies";
import { currencySymbol, formatCurrency, formatRate } from "@/lib/format";
import { getConversion, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

function CurrencyField({
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

  return (
    <div className="group rounded-xl border border-line bg-canvas/60 px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 hover:border-line-strong focus-within:border-brand-500 focus-within:bg-surface focus-within:shadow-[0_0_0_4px_var(--brand-50)]">
      <label
        htmlFor={inputId}
        className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
      >
        {label}
      </label>
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
          {editable ? (
            <>
              <span className="text-xl font-semibold text-muted" aria-hidden>
                {currencySymbol(code)}
              </span>
              <input
                id={inputId}
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => onAmountChange?.(e.target.value.replace(/[^0-9.]/g, ""))}
                aria-label={`Amount in ${currency.name}`}
                className="w-full min-w-0 bg-transparent text-[28px] font-semibold tracking-tight text-ink tabular-nums outline-none placeholder:text-muted/60"
                placeholder="0.00"
              />
            </>
          ) : (
            <output
              id={inputId}
              aria-live="polite"
              className="w-full min-w-0 truncate text-[28px] font-semibold tracking-tight text-ink tabular-nums"
            >
              {amount}
            </output>
          )}
        </div>

        <div className="relative shrink-0">
          <select
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            aria-label={`${label} currency`}
            className="peer h-10 cursor-pointer appearance-none rounded-full border border-line-strong bg-surface py-0 pr-9 pl-3.5 text-sm font-semibold text-ink outline-none transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-600/20"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted transition-colors peer-hover:text-brand-600"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

export function CurrencyConverter({
  className,
  currencies,
  initialFrom = "GBP",
  initialTo = "EUR",
  initialAmount = "100",
  amount: amountProp,
  onAmountChange,
  rateTable,
}: {
  className?: string;
  /** GBP plus published destination currencies only. */
  currencies: Currency[];
  /** Starting "from" currency code. Defaults to GBP (homepage behaviour). */
  initialFrom?: string;
  /** Starting "to" currency code. Defaults to EUR. */
  initialTo?: string;
  initialAmount?: string;
  /** Controlled send-amount (currency pages). Homepage stays uncontrolled. */
  amount?: string;
  onAmountChange?: (value: string) => void;
  rateTable?: RateTable;
}) {
  const isControlled = amountProp !== undefined;
  const [internalAmount, setInternalAmount] = useState(initialAmount);
  const amount = isControlled ? amountProp : internalAmount;
  const setAmount = (value: string) => {
    if (!isControlled) setInternalAmount(value);
    onAmountChange?.(value);
  };
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [swapping, setSwapping] = useState(false);

  const numericAmount = Number(amount) || 0;
  // Calculation lives in the rates provider, not the component — UI stays
  // presentational and a live provider can swap in behind the same call.
  const conversion = useMemo(
    () => getConversion(numericAmount, from, to, rateTable),
    [numericAmount, from, to, rateTable]
  );
  const converted = conversion.converted;

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setSwapping((s) => !s);
  }

  const fromCurrency = getCurrency(from) ?? baseCurrency;
  const toCurrency = getCurrency(to) ?? baseCurrency;
  const source = rateSourceDisplay(rateTable);

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-ink">Currency Converter</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
          {source.badge}
        </span>
      </div>

      <div className="relative mt-4 flex flex-col gap-2">
        <CurrencyField
          label="You send"
          amount={amount}
          code={from}
          currencies={currencies}
          editable
          onAmountChange={setAmount}
          onCodeChange={(code) => setFrom(code === to ? from : code)}
        />

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap currencies"
          className="group absolute top-1/2 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface bg-brand-600 text-white shadow-[0_4px_12px_-2px_rgba(31,107,84,0.5)] transition-[transform,background-color,box-shadow] duration-200 hover:scale-105 hover:bg-brand-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <ArrowUpDown
            className={cn(
              "h-4 w-4 transition-transform duration-300 ease-out",
              swapping && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        <CurrencyField
          label="You receive"
          amount={formatCurrency(converted, to)}
          code={to}
          currencies={currencies}
          editable={false}
          onCodeChange={(code) => setTo(code === from ? to : code)}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-canvas/70 px-3.5 py-2.5 text-sm">
        <span className="text-muted">{source.rateNoun}</span>
        <span className="font-semibold text-ink tabular-nums">
          1 {fromCurrency.code} = {formatRate(conversion.rate)} {toCurrency.code}
        </span>
      </div>

      <p className="mt-3 text-center text-xs text-muted">{source.disclaimer}</p>
    </div>
  );
}
