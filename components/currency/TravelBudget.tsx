"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Currency } from "@/lib/data/currencies";
import { baseCurrency } from "@/lib/data/currencies";
import { estimateTripCost, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { formatCurrency } from "@/lib/format";
import { routes } from "@/lib/routes";

/**
 * Lightweight trip-spend estimate. Maths lives in the rates provider; this
 * component only collects inputs and displays the result.
 */
export function TravelBudget({
  currency,
  rateTable,
}: {
  currency: Currency;
  rateTable?: RateTable;
}) {
  const travelersId = useId();
  const daysId = useId();
  const dailyId = useId();
  const [travelers, setTravelers] = useState("2");
  const [days, setDays] = useState("7");
  const [dailyBudget, setDailyBudget] = useState("100");

  const estimate = useMemo(
    () =>
      estimateTripCost({
        travelers: Number(travelers) || 0,
        days: Number(days) || 0,
        dailyBudget: Number(dailyBudget) || 0,
        from: baseCurrency.code,
        to: currency.code,
        table: rateTable,
      }),
    [travelers, days, dailyBudget, currency.code, rateTable]
  );
  const source = rateSourceDisplay(rateTable);

  return (
    <Section>
      <SectionHeader
        eyebrow="Plan"
        title="Travel budget calculator"
        description={`A simple estimate of trip spend in pounds and ${currency.name.toLowerCase()}. Not an official recommended budget — the travel money planner is the full trip-planning product.`}
        action={
          <Badge tone="muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
            {source.badge}
          </Badge>
        }
      />

      <Card className="mt-10 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberField
            id={travelersId}
            label="Travellers"
            value={travelers}
            min={1}
            onChange={setTravelers}
          />
          <NumberField
            id={daysId}
            label="Days"
            value={days}
            min={1}
            onChange={setDays}
          />
          <NumberField
            id={dailyId}
            label={`Daily budget (${baseCurrency.symbol})`}
            value={dailyBudget}
            min={0}
            onChange={setDailyBudget}
          />
        </div>

        <div
          className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-canvas/70 px-4 py-4 sm:grid-cols-2"
          aria-live="polite"
        >
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Total {baseCurrency.code}
            </p>
            <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
              {formatCurrency(estimate.totalFrom, baseCurrency.code)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Estimated {currency.code}
            </p>
            <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
              {formatCurrency(estimate.conversion.converted, currency.code)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted">
          Estimate only — using {source.label.toLowerCase()}
          {source.asOfLabel ? ` · ${source.asOfLabel}` : ""}. Actual rates and fees
          can vary by provider, so the amount you actually spend can differ. For a
          cash versus card split, open the{" "}
          <Link
            href={routes.travelMoneyPlanner}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            travel money planner
          </Link>
          .
        </p>
      </Card>
    </Section>
  );
}

function NumberField({
  id,
  label,
  value,
  min,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min: number;
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
        type="number"
        inputMode="numeric"
        min={min}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        className="mt-2 w-full min-w-0 bg-transparent text-[28px] font-semibold tracking-tight text-ink tabular-nums outline-none"
      />
    </div>
  );
}
