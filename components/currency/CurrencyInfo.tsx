import { Section, SectionHeader } from "@/components/ui/Section";
import type { Currency } from "@/lib/data/currencies";
import type { InfoBlock } from "@/lib/data/currency-content";

/** Concise informational blocks — each answers a genuine user question. */
export function CurrencyInfo({
  currency,
  blocks,
}: {
  currency: Currency;
  blocks: InfoBlock[];
}) {
  return (
    <Section className="bg-mist/40">
      <SectionHeader
        eyebrow="Guide"
        title={`About the ${currency.name}`}
        description={`Key facts about ${currency.code}, how its rate is set and how to read a quote.`}
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {blocks.map((block) => (
          <article
            key={block.heading}
            className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
          >
            <h3 className="text-h3 font-semibold">{block.heading}</h3>
            <div className="mt-3 space-y-3 text-body">
              {block.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
