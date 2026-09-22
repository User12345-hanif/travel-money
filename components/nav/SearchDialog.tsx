"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { currencies } from "@/lib/data/currencies";
import { publishedCurrencySlugs } from "@/lib/data/currency-content";
import { routes } from "@/lib/routes";

const publishedCurrencies = currencies.filter((c) =>
  publishedCurrencySlugs.includes(c.slug)
);

/**
 * Lightweight currency search. Filters published currency pages only so
 * results never send visitors to unpublished 404 routes.
 */
export function SearchDialog({
  variant = "icon",
}: {
  variant?: "icon" | "full";
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function openDialog() {
    setQuery("");
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return publishedCurrencies.slice(0, 6);
    return publishedCurrencies
      .filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.slug.includes(q)
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={openDialog}
          aria-label="Search currencies"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-body transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <Search className="h-5 w-5" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={openDialog}
          className="inline-flex w-full items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2.5 text-sm text-muted transition-colors hover:border-brand-300"
        >
          <Search className="h-4 w-4" aria-hidden />
          Search currencies
        </button>
      )}

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh] sm:pt-[16vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search currencies"
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm motion-safe:animate-[fade-in_0.2s_ease]"
            onClick={closeDialog}
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)] motion-safe:animate-fade-up">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or code (e.g. Euro, EUR)"
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close search"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  No currencies match “{query}”.
                </li>
              ) : (
                results.map((c) => (
                  <li key={c.code}>
                    <Link
                      href={routes.currency(c.slug)}
                      onClick={closeDialog}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-mist focus-visible:bg-mist focus-visible:outline-none"
                    >
                      <span className="text-xl" aria-hidden>
                        {c.flag}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-ink">{c.name}</span>
                        <span className="block text-xs text-muted">{c.code}</span>
                      </span>
                      <span className="text-xs text-muted">View →</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
