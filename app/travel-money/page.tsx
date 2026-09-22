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
import { getPublishedCurrencies } from "@/lib/data/currency-content";
import {
  travelMoneyPage,
  travelMoneyTrustCopy,
  travelMoneyActionsCopy,
  travelMoneyBuyDescription,
  travelMoneyConnectedTools,
  buyJobCards,
  buyUnderstandPoints,
  buyMethodCards,
  buyOnlineChecks,
  buyBeforeChecks,
  buyLimitations,
  buyNearYouChecks,
  obtainWhere,
  exchangeWhen,
  rateFeePointsCopy,
  travelCardPoints,
  travelCardChecks,
  cashVsCardNotes,
  cashVsCardRows,
  travelMoneyFaqsCopy,
  travelMoneyPublishedGuides,
} from "@/lib/data/travel-money";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/currency/Breadcrumbs";
import { ReceiveSketch } from "@/components/travel-money/ReceiveSketch";
import { TravelMoneyEstimator } from "@/components/travel-money/TravelMoneyEstimator";
import { TravelMoneyChecklist } from "@/components/travel-money/TravelMoneyChecklist";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, LinkCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CurrencyFaq } from "@/components/currency/CurrencyFaq";
import { getRateSnapshot } from "@/lib/rates/snapshot";

export const metadata: Metadata = createMetadata({
  title: travelMoneyPage.metaTitle,
  description: travelMoneyPage.metaDescription,
  path: routes.travelMoney,
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Travel Money", path: routes.travelMoney },
];

const journey = [
  { label: "Explore", href: routes.currencies },
  { label: "Convert", href: routes.converter },
  { label: "Plan", href: routes.travelMoneyPlanner },
  { label: "Prepare", href: routes.travelMoney },
  { label: "Get cash", href: routes.atmWithdrawal },
];

export default async function TravelMoneyPage() {
  const rateTable = await getRateSnapshot();
  const published = getPublishedCurrencies();
  const guides = travelMoneyPublishedGuides();
  const trustCopy = travelMoneyTrustCopy(rateTable);
  const actions = travelMoneyActionsCopy(rateTable);
  const buyDescription = travelMoneyBuyDescription(rateTable);
  const feePoints = rateFeePointsCopy(rateTable);
  const faqs = travelMoneyFaqsCopy(rateTable);

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
              Travel money hub
            </p>
            <h1 className="mt-3 text-hero font-semibold text-ink">
              {travelMoneyPage.h1}
            </h1>
            <p className="mt-5 text-lead text-muted">{travelMoneyPage.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#buy" size="lg">
                How to buy currency
              </Button>
              <Button href={routes.travelMoneyPlanner} size="lg" variant="secondary">
                Plan your travel money
              </Button>
              <Button href={routes.converter} size="lg" variant="secondary">
                Convert money
              </Button>
            </div>
            <p className="mt-6 max-w-xl text-sm text-muted">{trustCopy}</p>
          </div>

          <nav aria-label="Travel money journey" className="mt-10">
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
                    aria-current={step.href === routes.travelMoney ? "page" : undefined}
                  >
                    {step.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </section>

      <Section id="actions" className="bg-mist/40">
        <SectionHeader
          eyebrow="Start here"
          title="What are you trying to do?"
          description="Pick a job, then open the tool or section that helps. Wayfare does not take currency orders."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <LinkCard key={action.href} href={action.href} className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-ink">{action.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{action.blurb}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700">
                {action.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section id="buy">
        <SectionHeader
          eyebrow="Buying foreign currency"
          title="How to buy travel money"
          description={buyDescription}
          action={
            <Button href={routes.converter} size="md" variant="secondary">
              Convert a currency
            </Button>
          }
        />

        <h3 className="mt-10 text-sm font-semibold tracking-wide text-muted uppercase">
          What are you trying to do?
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buyJobCards.map((job) => (
            <LinkCard key={job.title} href={job.href} className="flex h-full flex-col p-5">
              <h3 className="text-base font-semibold text-ink">{job.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{job.body}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700">
                {job.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Choose your currency
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body">
            Open a published currency guide for identity, conversion and destination notes.
            Buying and ordering stay on this hub — there are no separate buy-currency pages.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {guides.map((guide) => (
              <li key={`buy-${guide.href}`}>
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
          <p className="mt-3">
            <Link
              href={routes.currencies}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Browse all published currencies
            </Link>
          </p>
        </div>

        <div id="buy-understand" className="mt-12 scroll-mt-24">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Understand the purchase
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {buyUnderstandPoints.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-surface p-5">
                <h4 className="text-base font-semibold text-ink">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Compare the decision
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body">
            These are ways to obtain money for a trip — not a ranking. Compare the displayed
            rate and fees, and the total amount you receive. No method always wins.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {buyMethodCards.map((item) => (
              <LinkCard key={item.title} href={item.href} className="flex h-full flex-col p-5">
                <h4 className="text-base font-semibold text-ink">{item.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{item.body}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {item.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </LinkCard>
            ))}
          </div>
        </div>

        <div id="buy-online" className="mt-12 scroll-mt-24 rounded-2xl border border-line bg-mist/40 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-ink">Ordering currency online</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body">
            Online order intent is real — Wayfare still does not take those orders. If a
            provider offers collection or delivery, check:
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {buyOnlineChecks.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-body">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Before you buy
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {buyBeforeChecks.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-body">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Use Wayfare tools
          </h3>
          <p className="mt-3 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <Link
              href={routes.converter}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Convert a published pair
            </Link>
            <Link
              href={routes.travelMoneyPlanner}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Plan a cash versus card split
            </Link>
            <Link
              href={routes.atmWithdrawal}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Estimate an ATM withdrawal
            </Link>
            <Link
              href={routes.currencies}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Open a currency guide
            </Link>
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-mist/40 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-ink">What Wayfare cannot do yet</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body">
            Near-me and live-quote searches are real demand. They need provider and location
            data we do not have. This page will not invent shops, stock or rankings. Wayfare
            does not provide:
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {buyLimitations.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-body">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-body">
            If you are choosing a local desk yourself, still check hours, stock, collection,
            fees and the amount received for a set pound figure:
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {buyNearYouChecks.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-body">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <ReceiveSketch currencies={published} rateTable={rateTable} />
        </div>
      </Section>

      <Section id="cash-card" className="bg-mist/40">
        <SectionHeader
          eyebrow="Cash vs card"
          title="Split the trip, then plan the detail"
          description="Cash helps for small purchases and backups; cards help for larger spends and carrying less. This sketch stays in pounds — the travel money planner adds destination currency and a full cash/card split."
          action={
            <Button href={routes.travelMoneyPlanner} size="md" variant="secondary">
              Use the travel money planner
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {cashVsCardNotes.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <TravelMoneyEstimator />
        </div>
        <div className="mt-10 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[44rem] border-collapse overflow-hidden rounded-2xl border border-line bg-surface text-sm shadow-[var(--shadow-card)]">
            <caption className="sr-only">
              Comparison of cash, card and ATM withdrawal for travel money
            </caption>
            <thead>
              <tr className="border-b border-line bg-canvas/70 text-left text-xs font-semibold tracking-wide text-muted uppercase">
                <th scope="col" className="px-5 py-3">
                  Method
                </th>
                <th scope="col" className="px-5 py-3">
                  Convenience
                </th>
                <th scope="col" className="px-5 py-3">
                  Fees
                </th>
                <th scope="col" className="px-5 py-3">
                  Exchange rate
                </th>
                <th scope="col" className="px-5 py-3">
                  Security
                </th>
                <th scope="col" className="px-5 py-3">
                  Best use
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {cashVsCardRows.map((row) => (
                <tr key={row.method}>
                  <th scope="row" className="px-5 py-4 text-left font-semibold text-ink">
                    {row.method}
                  </th>
                  <td className="px-5 py-4 text-body">{row.convenience}</td>
                  <td className="px-5 py-4 text-body">{row.fees}</td>
                  <td className="px-5 py-4 text-body">{row.rate}</td>
                  <td className="px-5 py-4 text-body">{row.security}</td>
                  <td className="px-5 py-4 text-body">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:hidden">
          {cashVsCardRows.map((row) => (
            <Card key={row.method} className="p-5">
              <h3 className="text-base font-semibold text-ink">{row.method}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <CompareItem label="Convenience" value={row.convenience} />
                <CompareItem label="Fees" value={row.fees} />
                <CompareItem label="Exchange rate" value={row.rate} />
                <CompareItem label="Security" value={row.security} />
                <CompareItem label="Best use" value={row.bestFor} />
              </dl>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Topping up cash abroad?{" "}
          <Link
            href={routes.atmWithdrawal}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Estimate ATM withdrawal costs
          </Link>
          .
        </p>
      </Section>

      <Section id="cards">
        <SectionHeader
          eyebrow="Travel-money cards"
          title="Prepaid and preloaded travel cards"
          description="When a holiday-money card may help, what to weigh before you load one, and what to check with an issuer. Wayfare does not issue or rank cards."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {travelCardPoints.map((item) => (
            <article key={item.title}>
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-line bg-mist/40 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-ink">Checklist before you load a card</h3>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {travelCardChecks.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-body">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="exchange" className="bg-mist/40">
        <SectionHeader
          eyebrow="Where and when"
          title="Where and when to get foreign currency"
          description="Banks, desks, airports, postal services and ATMs abroad are common options. Stock, hours and pricing vary — compare the total you keep, not only the displayed rate."
        />
        <h3 className="mt-10 text-sm font-semibold tracking-wide text-muted uppercase">
          Where people typically obtain currency
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {obtainWhere.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-surface p-5">
              <h4 className="text-base font-semibold text-ink">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
        <h3 className="mt-12 text-sm font-semibold tracking-wide text-muted uppercase">
          When to arrange money
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {exchangeWhen.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-surface p-5">
              <h4 className="text-base font-semibold text-ink">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="rates">
        <SectionHeader
          eyebrow="Rates and fees"
          title="What actually changes the cost"
          description="Reference figures, provider rates, fees, margins and DCC are different things. Compare the amount you keep after charges — Wayfare does not offer a dealing quote."
          action={
            <Button href={routes.converter} size="md" variant="secondary">
              Convert a currency
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {feePoints.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="tools" className="bg-mist/40">
        <SectionHeader
          eyebrow="Connected tools"
          title="Calculate, convert and explore"
          description="Move from preparation into the tool that matches the next job."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {travelMoneyConnectedTools.map((tool) => (
            <LinkCard key={tool.href} href={tool.href} className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-ink">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{tool.blurb}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700">
                {tool.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section id="currencies">
        <SectionHeader
          eyebrow="Published currencies"
          title="Destination guides"
          description="Each guide reuses the converter, planner and ATM tools. Unpublished catalog currencies are not listed."
          action={
            <Button href={routes.currencies} size="md" variant="secondary">
              Explore currencies
            </Button>
          }
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

      <Section id="checklist" className="bg-mist/40">
        <SectionHeader
          eyebrow="Prepare"
          title="Before you go"
          description="A preparation sequence for this visit — nothing is stored."
        />
        <div className="mx-auto mt-10 max-w-2xl">
          <TravelMoneyChecklist />
        </div>
      </Section>

      <CurrencyFaq
        faqs={faqs}
        description="How to buy travel money, order online, cash versus card, fees, DCC and ATMs — including that Wayfare does not sell notes."
      />
    </>
  );
}

function CompareItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-body">{value}</dd>
    </div>
  );
}
