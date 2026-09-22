"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { baseCurrency } from "@/lib/data/currencies";
import { estimateTravelMoneySplit } from "@/lib/rates/provider";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/lib/routes";
import Link from "next/link";

const DEFAULTS = {
  days: "7",
  daily: "80",
  cashPercent: "30",
} as const;

function sanitizeInteger(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

function toNumber(value: string): number {
  if (value.trim() === "") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function TravelMoneyEstimator() {
  const daysId = useId();
  const dailyId = useId();
  const cashId = useId();
  const resultId = useId();

  const [days, setDays] = useState<string>(DEFAULTS.days);
  const [daily, setDaily] = useState<string>(DEFAULTS.daily);
  const [cashPercent, setCashPercent] = useState<string>(DEFAULTS.cashPercent);

  const estimate = useMemo(
    () =>
      estimateTravelMoneySplit({
        days: toNumber(days),
        dailySpend: toNumber(daily),
        cashPercent: toNumber(cashPercent),
        currency: baseCurrency.code,
      }),
    [days, daily, cashPercent]
  );

  function handleReset() {
    setDays(DEFAULTS.days);
    setDaily(DEFAULTS.daily);
    setCashPercent(DEFAULTS.cashPercent);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById(resultId)?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)] lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-ink">Quick cash vs card sketch</p>
          <Badge tone="muted">Estimate only</Badge>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NumberField
            id={daysId}
            label="Days"
            value={days}
            onChange={(v) => setDays(sanitizeInteger(v))}
          />
          <NumberField
            id={dailyId}
            label={`Daily spend (${baseCurrency.symbol})`}
            value={daily}
            onChange={(v) => setDaily(sanitizeInteger(v))}
          />
          <NumberField
            id={cashId}
            label="Cash share (%)"
            value={cashPercent}
            onChange={(v) => {
              const next = sanitizeInteger(v);
              const n = Number(next);
              if (next !== "" && n > 100) setCashPercent("100");
              else setCashPercent(next);
            }}
          />
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

      <div className="flex flex-col justify-center bg-canvas/50 p-5 sm:p-6">
        <div
          id={resultId}
          tabIndex={-1}
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-live="polite"
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
            Estimated trip spending
          </p>
          <p className="mt-2 text-[32px] leading-none font-semibold tracking-tight text-ink tabular-nums">
            {formatCurrency(estimate.total, baseCurrency.code)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {estimate.days} days × {formatCurrency(estimate.dailySpend, baseCurrency.code)}{" "}
            a day
          </p>

          <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-line pt-4 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                Suggested cash
              </dt>
              <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">
                {formatCurrency(estimate.cash, baseCurrency.code)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                Suggested card
              </dt>
              <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">
                {formatCurrency(estimate.card, baseCurrency.code)}
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-3 text-xs text-muted">
          Sketch in pounds only — not a recommended budget. Actual spending varies by
          destination, fees and how you travel. The{" "}
          <Link
            href={routes.travelMoneyPlanner}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            travel money planner
          </Link>{" "}
          is the full trip-planning product, including a destination-currency view.
        </p>
      </div>
    </form>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas/60 px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 focus-within:border-brand-500 focus-within:bg-surface focus-within:shadow-[0_0_0_4px_var(--brand-50)]">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full min-w-0 bg-transparent text-[28px] font-semibold tracking-tight text-ink tabular-nums outline-none"
      />
    </div>
  );
}
