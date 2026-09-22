import type { Metadata } from "next";
import Link from "next/link";
import { Landmark, CreditCard, Percent, ArrowRight } from "lucide-react";
import { createMetadata, breadcrumbSchema, faqSchema, type BreadcrumbItem } from "@/lib/seo";
import { routes } from "@/lib/routes";
import {
  atmPage,
  atmPageCopy,
  atmHowItWorksCopy,
  atmFeeCards,
  atmTips,
  atmFaqsCopy,
  atmRelated,
} from "@/lib/data/atm";
import { getConverterCurrencies } from "@/lib/data/currency-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/currency/Breadcrumbs";
import { AtmCalculator } from "@/components/atm/AtmCalculator";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, LinkCard } from "@/components/ui/Card";
import { CurrencyFaq } from "@/components/currency/CurrencyFaq";
import { getRateSnapshot } from "@/lib/rates/snapshot";

export const metadata: Metadata = createMetadata({
  title: atmPage.metaTitle,
  description: atmPage.metaDescription,
  path: routes.atmWithdrawal,
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "ATM Withdrawal", path: routes.atmWithdrawal },
];

const feeIcons = [Landmark, CreditCard, Percent];

export default async function AtmWithdrawalPage() {
  const rateTable = await getRateSnapshot();
  const pageCopy = atmPageCopy(rateTable);
  const howItWorks = atmHowItWorksCopy(rateTable);
  const faqs = atmFaqsCopy(rateTable);

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
            <AtmCalculator currencies={getConverterCurrencies()} rateTable={rateTable} />
          </div>
          <p className="mt-6 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <Link
              href={routes.converter}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Convert an amount
            </Link>
            <Link
              href={routes.travelMoneyPlanner}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Plan a trip budget
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
          eyebrow="How it works"
          title="How the calculator works"
          description="Four inputs, then an estimate. Fees you leave at zero are treated as unknown, not as proven free withdrawals."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {howItWorks.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="text-h3 font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-body">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-mist/40">
        <SectionHeader
          eyebrow="Costs"
          title="ATM fees explained"
          description="Travellers may meet more than one kind of cost. Amounts vary by machine, card and country — enter only fees you know."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {atmFeeCards.map((item, index) => {
            const Icon = feeIcons[index] ?? Landmark;
            return (
              <Card key={item.title} className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="On the machine"
          title="Dynamic currency conversion"
          description="An ATM may offer to charge you in your home currency. That is a conversion by the operator, not by your card issuer."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-h3 font-semibold">ATM displays a conversion</h3>
            <p className="mt-3 leading-relaxed text-body">
              Dynamic currency conversion (DCC) shows the withdrawal in pounds (or
              another home currency) on the screen. The machine applies its own rate
              and may add a fee. You are agreeing to that conversion if you accept.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-h3 font-semibold">Your card issuer converts</h3>
            <p className="mt-3 leading-relaxed text-body">
              If you take cash in local currency, the ATM posts a local amount and
              your card issuer converts it later. That rate and any card fee are set
              by the issuer. Neither path is universally cheaper — compare the
              figures shown before you confirm.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-mist/40">
        <SectionHeader
          eyebrow="Before you accept"
          title="Choosing the local currency"
          description="Check the offered conversion carefully. The better choice is the one with a clearer rate and fee on that screen, not a rule that always applies."
        />
        <Card className="mt-10 p-6 sm:p-8">
          <p className="max-w-3xl leading-relaxed text-body">
            When a machine asks whether to charge you in local currency or in pounds,
            read the rate, the cash amount and any fee. If the home-currency offer
            looks expensive next to a local-currency withdrawal, you can usually
            decline DCC. If the numbers are unclear, cancelling and using another
            machine or a card payment can be safer than guessing.
          </p>
        </Card>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Practical"
          title="Cash withdrawal tips"
          description="Small habits that make foreign ATM trips less expensive and less stressful."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {atmTips.map((item) => (
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
          description="After an ATM estimate, convert an amount, plan spending, or prepare travel money."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {atmRelated.map((item) => (
            <LinkCard key={item.href} href={item.href} className="p-6">
              <h3 className="text-base font-semibold text-ink">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Open
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CurrencyFaq
        faqs={faqs}
        description="Quick answers about ATM fees, cash withdrawals abroad and dynamic currency conversion."
      />
    </>
  );
}
