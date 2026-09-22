import { Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { CurrencyFaq as Faq } from "@/lib/data/currency-content";

/**
 * FAQ built on native <details>/<summary> — accessible and keyboard-friendly
 * with zero client-side JavaScript. Pair with faqSchema() for FAQPage markup.
 */
export function CurrencyFaq({
  faqs,
  currencyName,
  description,
}: {
  faqs: Faq[];
  currencyName?: string;
  /** Overrides the default currency-page description when set. */
  description?: string;
}) {
  const intro =
    description ??
    (currencyName
      ? `Quick answers to common questions about the ${currencyName} and converting to it.`
      : undefined);

  return (
    <Section className="bg-mist/40">
      <SectionHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description={intro}
      />

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-ink transition-colors marker:content-none hover:bg-canvas/70 focus-visible:bg-canvas/70 focus-visible:outline-none sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-semibold">{faq.question}</h3>
              <Plus
                className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                aria-hidden
              />
            </summary>
            <div className="px-5 pb-5 text-body sm:px-6">
              <p className="leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
