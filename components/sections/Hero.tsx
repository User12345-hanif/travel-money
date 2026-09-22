import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CurrencyConverter } from "@/components/converter/CurrencyConverter";
import { getConverterCurrencies } from "@/lib/data/currency-content";
import { routes } from "@/lib/routes";
import type { RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

export function Hero({ rateTable }: { rateTable: RateTable }) {
  const source = rateSourceDisplay(rateTable);
  return (
    <section className="relative overflow-hidden">
      {/* Subtle, restrained background wash — no giant glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,var(--brand-50)_0%,transparent_55%)]"
      />
      <Container className="grid grid-cols-1 items-center gap-10 pt-12 pb-14 sm:gap-12 sm:pt-16 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-24 lg:pb-20">
        <div className="max-w-xl motion-safe:animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
            Currency &amp; travel-money tools
          </span>

          <h1 className="mt-5 text-hero font-semibold text-ink">
            Travel money tools
          </h1>

          <p className="mt-5 text-lead text-muted">
            Convert published currencies, plan trip spending, and prepare travel money.
            {source.kind === "reference"
              ? " Figures use indicative reference rates — for information only."
              : " Figures use labelled sample rates — not live quotes."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#converter" size="lg">
              Currency Converter
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={routes.currencies} size="lg" variant="secondary">
              Explore Currencies
            </Button>
          </div>
        </div>

        <div id="converter" className="scroll-mt-24 motion-safe:animate-fade-up lg:justify-self-end">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 hidden w-[118%] -translate-x-1/2 -translate-y-[48%] sm:block lg:w-[132%]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/home/hero-still-life.webp"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 42rem, 32rem"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="relative">
                <CurrencyConverter currencies={getConverterCurrencies()} rateTable={rateTable} />
              </div>
            </div>
            <p className="mt-3 text-center">
              <Link
                href={routes.converter}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                Open full converter
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
