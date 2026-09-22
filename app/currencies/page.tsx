import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  createMetadata,
  breadcrumbSchema,
  type BreadcrumbItem,
} from "@/lib/seo";
import { routes } from "@/lib/routes";
import { baseCurrency } from "@/lib/data/currencies";
import { getPublishedCurrencies } from "@/lib/data/currency-content";
import { explorerPage, explorerPageCopy, explorerRelated } from "@/lib/data/currency-explorer";
import {
  getConversion,
} from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";
import { formatCurrency, formatRate } from "@/lib/format";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/currency/Breadcrumbs";
import { CurrencySearch } from "@/components/explorer/CurrencySearch";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, LinkCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getRateSnapshot } from "@/lib/rates/snapshot";

const QUICK_AMOUNT = 100;

export const metadata: Metadata = createMetadata({
  title: explorerPage.metaTitle,
  description: explorerPage.metaDescription,
  path: routes.currencies,
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Currencies", path: routes.currencies },
];

export default async function CurrenciesPage() {
  const rateTable = await getRateSnapshot();
  const source = rateSourceDisplay(rateTable);
  const pageCopy = explorerPageCopy(rateTable);
  const published = getPublishedCurrencies();
  const conversions = published.map((currency) => ({
    currency,
    conversion: getConversion(QUICK_AMOUNT, baseCurrency.code, currency.code, rateTable),
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,var(--brand-50)_0%,transparent_55%)]"
        />
        <Container className="py-8 lg:py-10">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
        <Container className="pb-14 lg:pb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
              Currencies
            </p>
            <h1 className="mt-3 text-hero font-semibold text-ink">{pageCopy.h1}</h1>
            <p className="mt-5 text-lead text-muted">{pageCopy.lead}</p>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Convert"
          title="Quick conversion"
          description={
            source.kind === "reference"
              ? `£${QUICK_AMOUNT} into each published currency, using an indicative reference rate.`
              : `£${QUICK_AMOUNT} into each published currency, using a labelled sample rate.`
          }
          action={
            <Badge tone="muted">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
              {source.badge}
            </Badge>
          }
        />
        <div className="mt-10 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          {conversions.map(({ currency, conversion }) => (
            <Card key={currency.code} className="flex h-full min-w-0 flex-col p-6">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                {baseCurrency.code} → {currency.code}
              </p>
              <p className="mt-3 text-sm text-muted">
                {formatCurrency(QUICK_AMOUNT, baseCurrency.code, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-1 text-[32px] leading-none font-semibold tracking-tight text-ink tabular-nums">
                {formatCurrency(conversion.converted, currency.code)}
              </p>
              <p className="mt-3 text-sm text-muted tabular-nums">
                1 {baseCurrency.code} = {formatRate(conversion.rate)} {currency.code}
              </p>
              <div className="mt-5">
                <Button
                  href={`${routes.currency(currency.slug)}#converter`}
                  size="md"
                  variant="secondary"
                >
                  Convert {currency.code}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">{source.disclaimer}</p>
      </Section>

      <Section className="bg-mist/40">
        <SectionHeader
          eyebrow="Browse"
          title="Published currencies"
          description="Search published destination currencies. New currencies appear here when their pages publish."
        />
        <div className="mt-10">
          <CurrencySearch currencies={published} />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Discover"
          title="Popular travel currencies"
          description="Published destination guides — not a ranking or traffic list."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {published.map((currency) => (
            <LinkCard
              key={currency.code}
              href={routes.currency(currency.slug)}
              className="p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-2xl"
                  aria-hidden
                >
                  {currency.flag}
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                    {currency.code}
                  </p>
                  <h3 className="text-h3 font-semibold text-ink">{currency.name}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-body">
                {currency.country} · {currency.region}. Open the guide for conversions
                and travel-money notes.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Explore {currency.name}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section className="bg-mist/40">
        <SectionHeader
          eyebrow="Related"
          title="Related Wayfare tools"
          description="Converter, planner and ATM tools that are already published."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {explorerRelated.map((item) => (
            <LinkCard key={item.href} href={item.href} className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{item.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                {item.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>
    </>
  );
}
