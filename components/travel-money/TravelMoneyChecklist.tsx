"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { travelMoneyChecklistGroups } from "@/lib/data/travel-money";
import { Card } from "@/components/ui/Card";

const checklistSections = (() => {
  let start = 0;
  return travelMoneyChecklistGroups.map((group) => {
    const section = { ...group, start };
    start += group.items.length;
    return section;
  });
})();

const totalItems = checklistSections.reduce((sum, section) => sum + section.items.length, 0);

export function TravelMoneyChecklist() {
  const [done, setDone] = useState<boolean[]>(() => Array.from({ length: totalItems }, () => false));

  function toggle(index: number) {
    setDone((current) => current.map((value, i) => (i === index ? !value : value)));
  }

  const complete = done.filter(Boolean).length;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Before your trip</p>
        <p className="text-sm text-muted tabular-nums">
          {complete} of {totalItems} checked
        </p>
      </div>
      <div className="mt-5 space-y-6">
        {checklistSections.map((group) => (
          <div key={group.heading}>
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
              {group.heading}
            </h3>
            <ul className="mt-2 divide-y divide-line">
              {group.items.map((item, localIndex) => {
                const index = group.start + localIndex;
                const checked = done[index];
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-pressed={checked}
                      className="flex w-full min-h-11 items-start gap-3 py-3.5 text-left transition-colors hover:bg-canvas/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <span
                        className={
                          checked
                            ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-600 text-white"
                            : "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line-strong bg-canvas"
                        }
                        aria-hidden
                      >
                        {checked ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      <span
                        className={
                          checked
                            ? "text-sm text-muted line-through"
                            : "text-sm font-medium text-ink"
                        }
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
