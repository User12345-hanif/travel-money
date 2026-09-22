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
  plannerPage,
  plannerPageCopy,
  plannerCurrencies,
  plannerGuidanceCopy,
  plannerRelated,
  plannerFaqsCopy,
} from "@/lib/data/travel-money-planner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/currency/Breadcrumbs";
import { TravelMoneyPlanner } from "@/components/planner/TravelMoneyPlanner";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, LinkCard } from "@/components/ui/Card";
import { CurrencyFaq } from "@/components/currency/CurrencyFaq";
import { getRateSnapshot } from "@/lib/rates/snapshot";

export const metadata: Metadata = createMetadata({
  title: plannerPage.metaTitle,
  description: plannerPage.metaDescription,
  path: routes.travelMoneyPlanner,
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Travel Money Planner", path: routes.travelMoneyPlanner },
];

export default async function TravelMoneyPlannerPage() {
  const rateTable = await getRateSnapshot();
  const pageCopy = plannerPageCopy(rateTable);
  const guidance = plannerGuidanceCopy(rateTable);
  const faqs = plannerFaqsCopy(rateTable);

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
          </div>

          <div className="mt-10">
            <TravelMoneyPlanner currencies={plannerCurrencies} rateTable={rateTable} />
          </div>
          <p className="mt-6 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <Link
              href={routes.atmWithdrawal}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Estimate an ATM withdrawal
            </Link>
            <Link
              href={routes.converter}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Convert an amount
            </Link>
            <Link
              href={routes.travelMoney}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Prepare travel money
            </Link>
          </p>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Practical"
          title="How to use the plan"
          description="A few habits that keep a sketch useful once you are actually travelling."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guidance.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-mist/40">
        <SectionHeader
          eyebrow="Related"
          title="Continue with Wayfare tools"
          description="After a plan, convert an amount, estimate an ATM withdrawal, or prepare travel money."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plannerRelated.map((item) => (
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

      <CurrencyFaq
        faqs={faqs}
        description="Short answers on trip budgets, cash versus cards and how this planner is calculated."
      />
    </>
  );
}
