"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CurrencyConverter } from "@/components/converter/CurrencyConverter";
import { cn } from "@/lib/cn";
import { baseCurrency, type Currency } from "@/lib/data/currencies";
import type { RateTable } from "@/lib/rates/provider";

interface ConverterAmountContextValue {
  amount: string;
  setAmount: (value: string) => void;
  pairNonce: number;
  applyQuickAmount: (value: number) => void;
}

const ConverterAmountContext = createContext<ConverterAmountContextValue | null>(
  null
);

export function ConverterAmountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [amount, setAmount] = useState("100");
  const [pairNonce, setPairNonce] = useState(0);

  const applyQuickAmount = useCallback((value: number) => {
    setAmount(String(value));
    setPairNonce((n) => n + 1);
  }, []);

  return (
    <ConverterAmountContext.Provider
      value={{ amount, setAmount, pairNonce, applyQuickAmount }}
    >
      {children}
    </ConverterAmountContext.Provider>
  );
}

function useConverterAmount() {
  const ctx = useContext(ConverterAmountContext);
  if (!ctx) {
    throw new Error("Converter amount context is missing.");
  }
  return ctx;
}

export function ConnectedConverter({
  toCode,
  currencies,
  rateTable,
}: {
  toCode: string;
  currencies: Currency[];
  rateTable?: RateTable;
}) {
  const { amount, setAmount, pairNonce } = useConverterAmount();

  return (
    <CurrencyConverter
      key={pairNonce}
      currencies={currencies}
      initialFrom={baseCurrency.code}
      initialTo={toCode}
      amount={amount}
      onAmountChange={setAmount}
      rateTable={rateTable}
    />
  );
}

export interface QuickConversionRow {
  amount: number;
  fromLabel: string;
  toLabel: string;
}

export function QuickConversions({
  toName,
  rows,
}: {
  toName: string;
  rows: QuickConversionRow[];
}) {
  const { amount, applyQuickAmount } = useConverterAmount();
  const selected = Number(amount);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Quick conversions
          </p>
          <h2 className="mt-2 text-h3 font-semibold">
            Pounds to {toName.toLowerCase()}
          </h2>
        </div>
        <p className="text-sm text-muted">Tap an amount to fill the converter.</p>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {rows.map((row) => {
          const isActive = selected === row.amount;
          return (
            <li key={row.amount}>
              <button
                type="button"
                onClick={() => applyQuickAmount(row.amount)}
                aria-pressed={isActive}
                className={cn(
                  "flex min-h-16 w-full flex-col items-start rounded-2xl border bg-surface px-3.5 py-3 text-left shadow-[var(--shadow-card)] transition-[border-color,background-color,box-shadow] duration-200",
                  "hover:border-brand-300 hover:bg-brand-50/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                  isActive
                    ? "border-brand-500 bg-brand-50"
                    : "border-line"
                )}
              >
                <span className="text-sm font-semibold text-ink tabular-nums">
                  {row.fromLabel}
                </span>
                <span className="mt-1 text-xs text-muted tabular-nums">
                  {row.toLabel}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
