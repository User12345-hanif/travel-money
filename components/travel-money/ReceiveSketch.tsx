"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getCurrency, type Currency } from "@/lib/data/currencies";
import { formatCurrency, formatRate } from "@/lib/format";
import { illustrateExchangeOffer, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/lib/routes";

const DEFAULTS = {
  amount: "100",
  to: "EUR",
  fee: "0",
  margin: "3",
} as const;

function sanitizeDecimal(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [whole, ...fraction] = cleaned.split(".");
  if (fraction.length === 0) return whole;
  return `${whole}.${fraction.join("").slice(0, 2)}`;
}

function sanitizePercent(value: string): string {
  const next = value.replace(/[^0-9.]/g, "");
  const n = Number(next);
  if (next !== "" && Number.isFinite(n) && n > 50) return "50";
  return next;
}

function toNumber(value: string): number {
  if (value.trim() === "") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

/**
 * GBP → published currency receive sketch.
 * Reuses the converter rate engine. Optional fee and margin are illustrations,
 * not provider quotes.
 */
export function ReceiveSketch({
  currencies,
  variant = "hub",
  rateTable,
}: {
  currencies: Currency[];
  /** Hub links to the converter; converter links back to Travel money. */
  variant?: "hub" | "converter";
  rateTable?: RateTable;
}) {
  const amountId = useId();
  const toId = useId();
  const feeId = useId();
  const marginId = useId();
  const resultId = useId();

  const fallback = currencies[0]?.code ?? DEFAULTS.to;
  const [amount, setAmount] = useState<string>(DEFAULTS.amount);
  const [to, setTo] = useState<string>(
    currencies.some((currency) => currency.code === DEFAULTS.to) ? DEFAULTS.to : fallback
  );
  const [fee, setFee] = useState<string>(DEFAULTS.fee);
  const [margin, setMargin] = useState<string>(DEFAULTS.margin);

  const illustration = useMemo(
    () =>
      illustrateExchangeOffer({
        amount: toNumber(amount),
        from: "GBP",
        to,
        fee: toNumber(fee),
        marginPercent: toNumber(margin),
        table: rateTable,
      }),
    [amount, to, fee, margin, rateTable]
  );

  const toCurrency = getCurrency(to);
  const source = rateSourceDisplay(rateTable);

  function handleReset() {
    setAmount(DEFAULTS.amount);
    setTo(
      currencies.some((currency) => currency.code === DEFAULTS.to) ? DEFAULTS.to : fallback
    );
    setFee(DEFAULTS.fee);
    setMargin(DEFAULTS.margin);
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
          <p className="text-[15px] font-semibold text-ink">
            {variant === "converter" ? "Compare an illustrated payout" : "Amount you might receive"}
          </p>
          <Badge tone="muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
            {source.badge}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted">
          Illustration — not a provider quote. Optional fee and a weaker rate
          change the displayed conversion; they are not an offer from Wayfare.
        </p>

        <div className="mt-5 space-y-3">
          <FieldShell>
            <label
              htmlFor={toId}
              className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
            >
              Foreign currency
            </label>
            <div className="relative mt-2">
              <select
                id={toId}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                aria-label="Foreign currency"
                className="peer h-11 w-full cursor-pointer appearance-none rounded-xl border border-line-strong bg-surface py-0 pr-10 pl-3.5 text-sm font-semibold text-ink outline-none transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-600/20"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} · {currency.code}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </div>
          </FieldShell>

          <FieldShell>
            <label
              htmlFor={amountId}
              className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
            >
              You spend
            </label>
            <div className="mt-2 flex min-w-0 items-baseline gap-1.5">
              <span className="text-xl font-semibold text-muted" aria-hidden>
                £
              </span>
              <input
                id={amountId}
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(sanitizeDecimal(e.target.value))}
                aria-label="Amount in pounds"
                className="w-full min-w-0 bg-transparent text-[28px] font-semibold tracking-tight text-ink tabular-nums outline-none placeholder:text-muted/60"
                placeholder="0.00"
              />
            </div>
          </FieldShell>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FieldShell>
              <label
                htmlFor={feeId}
                className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
              >
                Optional fee
              </label>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-lg font-semibold text-muted" aria-hidden>
                  £
                </span>
                <input
                  id={feeId}
                  type="text"
                  inputMode="decimal"
                  value={fee}
                  onChange={(e) => setFee(sanitizeDecimal(e.target.value))}
                  aria-label="Optional commission in pounds"
                  className="w-full min-w-0 bg-transparent text-xl font-semibold tracking-tight text-ink tabular-nums outline-none"
                />
              </div>
            </FieldShell>
            <FieldShell>
              <label
                htmlFor={marginId}
                className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
              >
                Weaker rate (%)
              </label>
              <div className="mt-2 flex items-baseline gap-1.5">
                <input
                  id={marginId}
                  type="text"
                  inputMode="decimal"
                  value={margin}
                  onChange={(e) => setMargin(sanitizePercent(e.target.value))}
                  aria-label={`Percent weaker than the ${source.adjective} rate`}
                  className="w-full min-w-0 bg-transparent text-xl font-semibold tracking-tight text-ink tabular-nums outline-none"
                />
                <span className="text-lg font-semibold text-muted" aria-hidden>
                  %
                </span>
              </div>
            </FieldShell>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button type="submit" size="lg" className="sm:flex-1">
            Compare amount
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
            Illustrated amount received
          </p>
          <p className="mt-2 text-[32px] leading-none font-semibold tracking-tight text-ink tabular-nums">
            {formatCurrency(illustration.illustratedReceived, to)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {formatCurrency(illustration.amount, "GBP")} · {toCurrency?.name ?? to} ·
            not a provider quote
          </p>

          <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
            <div className="flex items-start justify-between gap-3 text-body">
              <dt>Base converted amount</dt>
              <dd className="text-right font-medium text-ink tabular-nums">
                {formatCurrency(illustration.sample.converted, to)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3 text-body">
              <dt>Fee</dt>
              <dd className="text-right font-medium text-ink tabular-nums">
                {formatCurrency(illustration.fee, "GBP")}
                {illustration.fee > 0 ? (
                  <span className="mt-0.5 block text-xs font-normal text-muted">
                    {formatCurrency(illustration.amountConverted, "GBP")} converted
                  </span>
                ) : null}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3 text-body">
              <dt className="min-w-0 pr-3">Illustrated provider adjustment</dt>
              <dd className="text-right font-medium text-ink tabular-nums">
                {illustration.marginPercent > 0
                  ? `${illustration.marginPercent}% weaker`
                  : source.rateNoun}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted">
            {illustration.difference > 0
              ? `${formatCurrency(illustration.difference, to)} less than the base converted amount`
              : "Matches the base converted amount"}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface px-3.5 py-2.5 text-sm">
          <span className="text-muted">{source.rateLine}</span>
          <span className="font-semibold text-ink tabular-nums">
            1 GBP = {formatRate(illustration.sample.rate)} {to}
          </span>
        </div>

        <p className="mt-3 text-xs text-muted">
          {source.disclaimer} A real bureau uses its own rate and fees. Wayfare
          does not sell currency.
          {variant === "converter" ? (
            <>
              {" "}
              Open{" "}
              <Link
                href={routes.travelMoney}
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                Travel money
              </Link>{" "}
              to prepare cash and cards around this figure.
            </>
          ) : (
            <>
              {" "}
              Open the{" "}
              <Link
                href={routes.converter}
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                currency converter
              </Link>{" "}
              for the same conversion without the fee illustration.
            </>
          )}
        </p>
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
