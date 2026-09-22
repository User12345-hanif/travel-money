import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  createMetadata,
  breadcrumbSchema,
  faqSchema,
  type BreadcrumbItem,
} from "@/lib/seo";
import { routes } from "@/lib/routes";
import {
  getConverterCurrencies,
  getPublishedCurrencies,
} from "@/lib/data/currency-content";
import {
  converterPage,
  converterPageCopy,
  converterTrustCopy,
  converterRateLessons,
  converterNextSteps,
  converterPublishedGuides,
  converterFaqs,
} from "@/lib/data/currency-converter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/currency/Breadcrumbs";
import { FullConverter } from "@/components/converter/FullConverter";
import { ReceiveSketch } from "@/components/travel-money/ReceiveSketch";
import { CurrencyFaq } from "@/components/currency/CurrencyFaq";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LinkCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getRateSnapshot } from "@/lib/rates/snapshot";
import { rateSourceDisplay } from "@/lib/rates/copy";

export const metadata: Metadata = createMetadata({
  title: converterPage.metaTitle,
  description: converterPage.metaDescription,
  path: routes.converter,
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Currency Converter", path: routes.converter },
];

const journey = [
  { label: "Explore", href: routes.currencies },
  { label: "Convert", href: routes.converter },
  { label: "Plan", href: routes.travelMoneyPlanner },
  { label: "Prepare", href: routes.travelMoney },
  { label: "Get cash", href: routes.atmWithdrawal },
];

export default async function CurrencyConverterPage() {
  const rateTable = await getRateSnapshot();
  const currencies = getConverterCurrencies();
  const published = getPublishedCurrencies();
  const guides = converterPublishedGuides();
  const lessons = converterRateLessons(rateTable);
  const faqs = converterFaqs(rateTable);
  const pageCopy = converterPageCopy(rateTable);
  const trustCopy = converterTrustCopy(rateTable);
  const sourceKind = rateSourceDisplay(rateTable).kind;
  const [planner, ...otherSteps] = converterNextSteps;

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />

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
              Travel money
            </p>
            <h1 className="mt-3 text-hero font-semibold text-ink">{pageCopy.h1}</h1>
            <p className="mt-5 text-lead text-muted">{pageCopy.lead}</p>
            <p className="mt-4 max-w-xl text-sm text-muted">{trustCopy}</p>
          </div>

          <nav aria-label="Travel money journey" className="mt-8">
            <ol className="flex flex-wrap gap-x-1 gap-y-2 text-sm">
              {journey.map((step, index) => (
                <li key={step.label} className="inline-flex items-center gap-1">
                  {index > 0 ? (
                    <span className="px-1 text-muted" aria-hidden>
                      /
                    </span>
                  ) : null}
                  <Link
                    href={step.href}
                    className="inline-flex min-h-11 items-center rounded-full px-2.5 font-medium text-body transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                    aria-current={step.href === routes.converter ? "page" : undefined}
                  >
                    {step.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10">
            <FullConverter currencies={currencies} rateTable={rateTable} />
          </div>
        </Container>
      </section>

      <Section id="receive">
        <SectionHeader
          eyebrow="Amount received"
          title="What would I receive?"
          description={
            sourceKind === "reference"
              ? "Add an optional fee or a weaker rate to the same reference conversion. Illustration — not a provider quote, and not an offer from Wayfare."
              : "Add an optional fee or a weaker rate to the same demo conversion. Illustration — not a provider quote, and not an offer from Wayfare."
          }
        />
        <div className="mt-10">
          <ReceiveSketch currencies={published} variant="converter" rateTable={rateTable} />
        </div>
      </Section>

      <Section id="rates" className="bg-mist/40">
        <SectionHeader
          eyebrow="Rates"
          title={sourceKind === "reference" ? "What the reference rate means" : "What the sample rate means"}
          description={
            sourceKind === "reference"
              ? "Short examples using the same GBP/EUR reference conversion as the converter. Wayfare does not claim the best rate."
              : "Short examples using the same demo GBP/EUR conversion as the converter. Wayfare does not claim the best rate."
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {lessons.map((item) => (
            <article key={item.title}>
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="next">
        <SectionHeader
          eyebrow="Next"
          title={planner.title}
          description={planner.blurb}
          action={
            <Button href={planner.href} size="lg">
              {planner.cta}
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {otherSteps.map((item) => (
            <LinkCard key={item.href} href={item.href} className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{item.blurb}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700">
                {item.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section id="currencies" className="bg-mist/40">
        <SectionHeader
          eyebrow="Published currencies"
          title="Open a currency guide"
          description="Each guide reuses this converter. Unpublished catalog currencies are not listed."
        />
        <ul className="mt-10 flex flex-wrap gap-2">
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-body transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                <span aria-hidden>{guide.flag}</span>
                <span className="font-semibold text-ink">{guide.code}</span>
                <span>{guide.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CurrencyFaq
        faqs={faqs}
        description={
          sourceKind === "reference"
            ? "Short answers on converting published currencies, reference rates, and how the amount-received illustration works."
            : "Short answers on converting published currencies, sample rates, and how the amount-received illustration works."
        }
      />
    </>
  );
}
