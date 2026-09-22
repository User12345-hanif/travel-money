import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { RateTable } from "@/lib/rates/provider";
import { rateSourceDisplay } from "@/lib/rates/copy";

export function TrustStrip({ rateTable }: { rateTable?: RateTable }) {
  const source = rateSourceDisplay(rateTable);
  const points = [
    source.kind === "reference" ? "Reference exchange rates" : "Sample exchange rates",
    "Simple currency tools",
    "Free to use",
    "Built for travellers",
  ];

  return (
    <div className="border-y border-line bg-mist/60">
      <Container>
        <ul className="grid grid-cols-2 gap-y-5 py-7 md:grid-cols-4 md:gap-y-0">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center justify-center gap-2.5 px-3 text-center text-sm font-medium text-body md:border-l md:border-line/80 md:[&:nth-child(4n+1)]:border-l-0"
            >
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Check className="h-3 w-3" aria-hidden strokeWidth={3} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
