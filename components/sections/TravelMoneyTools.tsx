import { ArrowRight } from "lucide-react";
import { ToolMark } from "@/components/brand/ToolMarks";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, LinkCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { tools } from "@/lib/data/tools";

export function TravelMoneyTools() {
  return (
    <Section id="tools" className="bg-mist/50">
      <SectionHeader
        eyebrow="Tools"
        title="Travel money tools"
        description="Convert an amount, prepare travel money, plan a trip budget, or estimate an ATM withdrawal."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => {
          const comingSoon = tool.status === "coming-soon";

          const inner = (
            <div className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_8px_16px_-10px_rgba(31,107,84,0.9)]">
                  <ToolMark title={tool.title} />
                </span>
                {comingSoon ? <Badge tone="muted">Coming soon</Badge> : null}
              </div>
              <h3 className="mt-5 text-base font-semibold text-ink">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{tool.description}</p>
              <span
                className={
                  comingSoon
                    ? "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted"
                    : "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-800"
                }
              >
                {comingSoon ? "In development" : tool.cta}
                {!comingSoon ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
              </span>
            </div>
          );

          return comingSoon ? (
            <Card key={tool.title} className="h-full opacity-95">
              {inner}
            </Card>
          ) : (
            <LinkCard key={tool.title} href={tool.href} className="h-full">
              {inner}
            </LinkCard>
          );
        })}
      </div>
    </Section>
  );
}
