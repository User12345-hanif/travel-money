"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { baseCurrency, getCurrency, type Currency } from "@/lib/data/currencies";
import { estimateTravelMoneyPlan, type RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { formatCurrency, formatRate } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const DEFAULTS = {
  to: "EUR",
  days: "7",
  travellers: "2",
  daily: "80",
  accommodation: "0",
  transport: "0",
  activities: "0",
  emergency: "100",
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

function sharePercent(amount: number, total: number): number {
  if (total <= 0) return 0;
  return (amount / total) * 100;
}

export function TravelMoneyPlanner({
  currencies,
  rateTable,
}: {
  currencies: Currency[];
  rateTable?: RateTable;
}) {
  const toId = useId();
  const daysId = useId();
  const travellersId = useId();
  const dailyId = useId();
  const accommodationId = useId();
  const transportId = useId();
  const activitiesId = useId();
  const emergencyId = useId();
  const cashId = useId();
  const resultId = useId();

  const fallbackCode = currencies[0]?.code ?? DEFAULTS.to;
  const [to, setTo] = useState<string>(
    currencies.some((c) => c.code === DEFAULTS.to) ? DEFAULTS.to : fallbackCode
  );
  const [days, setDays] = useState<string>(DEFAULTS.days);
  const [travellers, setTravellers] = useState<string>(DEFAULTS.travellers);
  const [daily, setDaily] = useState<string>(DEFAULTS.daily);
  const [accommodation, setAccommodation] = useState<string>(DEFAULTS.accommodation);
  const [transport, setTransport] = useState<string>(DEFAULTS.transport);
  const [activities, setActivities] = useState<string>(DEFAULTS.activities);
  const [emergency, setEmergency] = useState<string>(DEFAULTS.emergency);
  const [cashPercent, setCashPercent] = useState<string>(DEFAULTS.cashPercent);

  const plan = useMemo(
    () =>
      estimateTravelMoneyPlan({
        from: baseCurrency.code,
        to,
        days: toNumber(days),
        travellers: toNumber(travellers),
        dailySpend: toNumber(daily),
        accommodation: toNumber(accommodation),
        transport: toNumber(transport),
        activities: toNumber(activities),
        emergency: toNumber(emergency),
        cashPercent: toNumber(cashPercent),
        table: rateTable,
      }),
    [to, days, travellers, daily, accommodation, transport, activities, emergency, cashPercent, rateTable]
  );

  const toCurrency = getCurrency(to);
  const source = rateSourceDisplay(rateTable);
  const cardPercent = 100 - plan.cashPercent;
  const breakdown = [
    { label: "Daily spending", amount: plan.dailyTotal },
    { label: "Accommodation", amount: plan.accommodation },
    { label: "Transport", amount: plan.transport },
    { label: "Activities", amount: plan.activities },
    { label: "Emergency / extras", amount: plan.emergency },
  ];

  function handleReset() {
    setTo(currencies.some((c) => c.code === DEFAULTS.to) ? DEFAULTS.to : fallbackCode);
    setDays(DEFAULTS.days);
    setTravellers(DEFAULTS.travellers);
    setDaily(DEFAULTS.daily);
    setAccommodation(DEFAULTS.accommodation);
    setTransport(DEFAULTS.transport);
    setActivities(DEFAULTS.activities);
    setEmergency(DEFAULTS.emergency);
    setCashPercent(DEFAULTS.cashPercent);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById(resultId)?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
      <div className="grid min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0 border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[15px] font-semibold text-ink">Trip details</p>
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
                Destination currency
              </label>
              <div className="relative mt-2">
                <select
                  id={toId}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <NumberField
                id={daysId}
                label="Days"
                value={days}
                onChange={(v) => setDays(sanitizeInteger(v))}
              />
              <NumberField
                id={travellersId}
                label="Travellers"
                value={travellers}
                onChange={(v) => setTravellers(sanitizeInteger(v))}
              />
              <NumberField
                id={dailyId}
                label={`Daily spend (${baseCurrency.symbol})`}
                value={daily}
                onChange={(v) => setDaily(sanitizeInteger(v))}
              />
            </div>

            <p className="text-xs text-muted">
              Optional trip totals — leave at 0 if you do not need them.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <NumberField
                id={accommodationId}
                label={`Accommodation (${baseCurrency.symbol})`}
                value={accommodation}
                onChange={(v) => setAccommodation(sanitizeInteger(v))}
              />
              <NumberField
                id={transportId}
                label={`Transport (${baseCurrency.symbol})`}
                value={transport}
                onChange={(v) => setTransport(sanitizeInteger(v))}
              />
              <NumberField
                id={activitiesId}
                label={`Activities (${baseCurrency.symbol})`}
                value={activities}
                onChange={(v) => setActivities(sanitizeInteger(v))}
              />
              <NumberField
                id={emergencyId}
                label={`Emergency / extras (${baseCurrency.symbol})`}
                value={emergency}
                onChange={(v) => setEmergency(sanitizeInteger(v))}
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

        <div className="flex min-w-0 flex-col justify-center bg-canvas/50 p-5 sm:p-6">
          <div
            id={resultId}
            tabIndex={-1}
            className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            aria-live="polite"
          >
            <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
              Estimated trip budget
            </p>
            <p className="mt-2 text-[32px] leading-none font-semibold tracking-tight text-ink tabular-nums sm:text-[40px]">
              {formatCurrency(plan.total, baseCurrency.code)}
            </p>
            <p className="mt-3 text-lg font-semibold text-ink tabular-nums">
              ≈ {formatCurrency(plan.conversion.converted, to)}
            </p>
            <p className="mt-1 text-sm text-muted">
              {toCurrency?.name ?? to} · {source.adjective} rate
            </p>

            <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-line pt-4 sm:grid-cols-2">
              <ResultStat
                label="Daily spend"
                value={formatCurrency(plan.dailySpend, baseCurrency.code)}
                hint={`${plan.travellers} × ${plan.days} days`}
              />
              <ResultStat
                label="Emergency / extras"
                value={formatCurrency(plan.emergency, baseCurrency.code)}
              />
              <ResultStat
                label="Suggested cash"
                value={formatCurrency(plan.cash, baseCurrency.code)}
              />
              <ResultStat
                label="Suggested card"
                value={formatCurrency(plan.card, baseCurrency.code)}
              />
            </dl>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface px-3.5 py-2.5 text-sm">
            <span className="text-muted">{source.rateLine}</span>
            <span className="font-semibold text-ink tabular-nums">
              1 {baseCurrency.code} = {formatRate(plan.conversion.rate)} {to}
            </span>
          </div>
          <p className="mt-3 text-xs text-muted">{source.disclaimer}</p>
        </div>
      </div>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
              Split
            </p>
            <h2 className="mt-1 text-h3 font-semibold text-ink">Cash vs card</h2>
          </div>
          <p className="text-sm text-muted">
            Trip budget {formatCurrency(plan.total, baseCurrency.code)}
          </p>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-mist"
          aria-hidden
        >
          <div className="flex h-full min-w-0">
            <div
              className="h-full bg-brand-600"
              style={{ width: `${plan.cashPercent}%` }}
            />
            <div
              className="h-full bg-brand-200"
              style={{ width: `${cardPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SplitCard
            label="Cash"
            percent={plan.cashPercent}
            amount={formatCurrency(plan.cash, baseCurrency.code)}
            converted={formatCurrency(plan.cashConversion.converted, to)}
            tone="brand"
          />
          <SplitCard
            label="Card"
            percent={cardPercent}
            amount={formatCurrency(plan.card, baseCurrency.code)}
            converted={formatCurrency(plan.cardConversion.converted, to)}
            tone="mist"
          />
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor={cashId}
              className="text-sm font-semibold text-ink"
            >
              Cash share
            </label>
            <p className="text-sm tabular-nums text-muted">
              {plan.cashPercent}% cash · {cardPercent}% card
            </p>
          </div>
          <input
            id={cashId}
            type="range"
            min={0}
            max={100}
            step={1}
            value={plan.cashPercent}
            onChange={(e) => setCashPercent(e.target.value)}
            className="mt-3 h-11 w-full min-w-0 cursor-pointer"
            style={{ accentColor: "var(--brand-600)" }}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={plan.cashPercent}
            aria-valuetext={`${plan.cashPercent} percent cash`}
          />
        </div>
      </section>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
        <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          Breakdown
        </p>
        <h2 className="mt-1 text-h3 font-semibold text-ink">Estimated spending</h2>
        <p className="mt-2 text-sm text-muted">
          Daily spending is travellers × days × daily amount. Other lines are trip totals.
        </p>

        <ul className="mt-6 space-y-4">
          {breakdown.map((row) => {
            const pct = sharePercent(row.amount, plan.total);
            return (
              <li key={row.label} className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-ink">{row.label}</p>
                  <p className="shrink-0 text-sm font-semibold text-ink tabular-nums">
                    {formatCurrency(row.amount, baseCurrency.code)}
                    <span className="ml-2 font-medium text-muted">
                      {Math.round(pct)}%
                    </span>
                  </p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
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
    <FieldShell>
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
    </FieldShell>
  );
}

function ResultStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-semibold text-ink tabular-nums">{value}</dd>
      {hint ? <p className="mt-0.5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

function SplitCard({
  label,
  percent,
  amount,
  converted,
  tone,
}: {
  label: string;
  percent: number;
  amount: string;
  converted: string;
  tone: "brand" | "mist";
}) {
  return (
    <div
      className={
        tone === "brand"
          ? "rounded-xl bg-brand-50 px-4 py-4"
          : "rounded-xl bg-mist px-4 py-4"
      }
    >
      <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
        {label} · {percent}%
      </p>
      <p className="mt-2 text-2xl font-semibold text-ink tabular-nums">{amount}</p>
      <p className="mt-1 text-sm text-muted tabular-nums">{converted}</p>
    </div>
  );
}
