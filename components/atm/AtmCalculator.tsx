"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { getCurrency, type Currency } from "@/lib/data/currencies";
import { currencySymbol, formatCurrency, formatRate } from "@/lib/format";
import { estimateAtmWithdrawal, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const DEFAULTS = {
  amount: "500",
  from: "GBP",
  to: "TRY",
  atmFee: "3",
  additionalFee: "0",
} as const;

function sanitizeDecimal(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [whole, ...fraction] = cleaned.split(".");
  if (fraction.length === 0) return whole;
  return `${whole}.${fraction.join("").slice(0, 2)}`;
}

function toNumber(value: string): number {
  if (value.trim() === "") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function AtmCalculator({
  currencies,
  rateTable,
}: {
  currencies: Currency[];
  rateTable?: RateTable;
}) {
  const amountId = useId();
  const fromId = useId();
  const toId = useId();
  const atmFeeId = useId();
  const extraFeeId = useId();
  const resultId = useId();

  const [amount, setAmount] = useState<string>(DEFAULTS.amount);
  const [from, setFrom] = useState<string>(DEFAULTS.from);
  const [to, setTo] = useState<string>(DEFAULTS.to);
  const [atmFee, setAtmFee] = useState<string>(DEFAULTS.atmFee);
  const [additionalFee, setAdditionalFee] = useState<string>(DEFAULTS.additionalFee);

  const estimate = useMemo(
    () =>
      estimateAtmWithdrawal({
        amount: toNumber(amount),
        from,
        to,
        atmFee: toNumber(atmFee),
        additionalFee: toNumber(additionalFee),
        table: rateTable,
      }),
    [amount, from, to, atmFee, additionalFee, rateTable]
  );

  const fromCurrency = getCurrency(from);
  const toCurrency = getCurrency(to);
  const source = rateSourceDisplay(rateTable);

  function handleReset() {
    setAmount(DEFAULTS.amount);
    setFrom(DEFAULTS.from);
    setTo(DEFAULTS.to);
    setAtmFee(DEFAULTS.atmFee);
    setAdditionalFee(DEFAULTS.additionalFee);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById(resultId)?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)] lg:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-ink">ATM cash withdrawal</p>
          <Badge tone="muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
            {source.badge}
          </Badge>
        </div>

        <div className="mt-5 space-y-3">
          <FieldShell>
            <label
              htmlFor={toId}
              className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
            >
              Destination
            </label>
            <CurrencySelect
              id={toId}
              value={to}
              label="Destination currency"
              currencies={currencies}
              onChange={setTo}
            />
          </FieldShell>

          <FieldShell>
            <label
              htmlFor={amountId}
              className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
            >
              You withdraw
            </label>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                <span className="text-xl font-semibold text-muted" aria-hidden>
                  {currencySymbol(from)}
                </span>
                <input
                  id={amountId}
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(sanitizeDecimal(e.target.value))}
                  aria-label={`Withdrawal amount in ${fromCurrency?.name ?? from}`}
                  className="w-full min-w-0 bg-transparent text-[28px] font-semibold tracking-tight text-ink tabular-nums outline-none placeholder:text-muted/60"
                  placeholder="0.00"
                />
              </div>
              <CurrencySelect
                id={fromId}
                value={from}
                label="Base currency"
                currencies={currencies}
                compact
                onChange={setFrom}
              />
            </div>
          </FieldShell>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MoneyField
              id={atmFeeId}
              label="ATM fee"
              code={from}
              value={atmFee}
              onChange={setAtmFee}
            />
            <MoneyField
              id={extraFeeId}
              label="Additional fee"
              code={from}
              value={additionalFee}
              onChange={setAdditionalFee}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button type="submit" size="lg" className="sm:flex-1">
            Calculate
          </Button>
          <Button type="button" size="lg" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-canvas/50 p-5 sm:p-6">
        <div
          id={resultId}
          tabIndex={-1}
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-live="polite"
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
            Estimated cash received
          </p>
          <p className="mt-2 text-[32px] leading-none font-semibold tracking-tight text-ink tabular-nums">
            {formatCurrency(estimate.conversion.converted, to)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {toCurrency?.name ?? to} · estimate only
          </p>

          <div className="mt-5 border-t border-line pt-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
              Estimated total cost
            </p>
            <p className="mt-2 text-2xl font-semibold text-ink tabular-nums">
              {formatCurrency(estimate.totalCost, from)}
            </p>
          </div>

          <dl className="mt-4 space-y-2 text-sm">
            <BreakdownRow
              label="Withdrawal"
              value={formatCurrency(estimate.amount, from)}
            />
            <BreakdownRow
              label="ATM fee"
              value={formatCurrency(estimate.atmFee, from)}
            />
            <BreakdownRow
              label="Additional fee"
              value={formatCurrency(estimate.additionalFee, from)}
            />
          </dl>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface px-3.5 py-2.5 text-sm">
          <span className="text-muted">{source.rateLine}</span>
          <span className="font-semibold text-ink tabular-nums">
            1 {from} = {formatRate(estimate.conversion.rate)} {to}
          </span>
        </div>

        <p className="mt-3 text-xs text-muted">{source.disclaimer}</p>
      </div>
    </form>
  );
}

function FieldShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-canvas/60 px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 hover:border-line-strong focus-within:border-brand-500 focus-within:bg-surface focus-within:shadow-[0_0_0_4px_var(--brand-50)]">
      {children}
    </div>
  );
}

function MoneyField({
  id,
  label,
  code,
  value,
  onChange,
}: {
  id: string;
  label: string;
  code: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FieldShell>
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
      >
        {label}
      </label>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-lg font-semibold text-muted" aria-hidden>
          {currencySymbol(code)}
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(sanitizeDecimal(e.target.value))}
          className="w-full min-w-0 bg-transparent text-xl font-semibold tracking-tight text-ink tabular-nums outline-none"
        />
      </div>
    </FieldShell>
  );
}

function CurrencySelect({
  id,
  value,
  label,
  currencies,
  compact = false,
  onChange,
}: {
  id: string;
  value: string;
  label: string;
  currencies: Currency[];
  compact?: boolean;
  onChange: (code: string) => void;
}) {
  return (
    <div className={compact ? "relative shrink-0" : "relative mt-2"}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={
          compact
            ? "peer h-10 max-w-[9.5rem] cursor-pointer appearance-none rounded-full border border-line-strong bg-surface py-0 pr-9 pl-3.5 text-sm font-semibold text-ink outline-none transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-600/20"
            : "peer h-11 w-full cursor-pointer appearance-none rounded-xl border border-line-strong bg-surface py-0 pr-10 pl-3.5 text-sm font-semibold text-ink outline-none transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-600/20"
        }
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.country} · {c.code}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-body">
      <dt>{label}</dt>
      <dd className="font-medium text-ink tabular-nums">{value}</dd>
    </div>
  );
}
