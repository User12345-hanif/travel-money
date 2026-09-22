import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LinkCard } from "@/components/ui/Card";
import { destinations, type Destination } from "@/lib/data/destinations";
import { publishedCurrencySlugs } from "@/lib/data/currency-content";
import { routes } from "@/lib/routes";

function DestinationTile({ destination }: { destination: Destination }) {
  return (
    <LinkCard href={routes.currency(destination.currencySlug)} className="overflow-hidden">
      <div className="relative aspect-[12/5] max-h-28 w-full overflow-hidden border-b border-line">
        <Image
          src={destination.image}
          alt={destination.imageAlt}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 46vw, 92vw"
          className="object-cover"
          style={{ objectPosition: destination.imagePosition }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-ink/30 to-transparent"
        />
        <span
          aria-hidden
          className="absolute top-3 right-3 rounded-full bg-surface/90 px-2 py-1 text-xs font-semibold text-ink shadow-[var(--shadow-card)]"
        >
          {destination.currencyCode}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">{destination.name}</h3>
          <ArrowUpRight
            className="h-5 w-5 text-muted transition-colors group-hover:text-brand-600"
            aria-hidden
          />
        </div>
        <p className="mt-1 text-sm text-muted">{destination.blurb}</p>
        <p className="mt-3 text-xs font-semibold text-brand-700">
          {destination.currencyName}
        </p>
      </div>
    </LinkCard>
  );
}

export function Destinations() {
  const published = destinations.filter((destination) =>
    publishedCurrencySlugs.includes(destination.currencySlug)
  );

  return (
    <Section>
      <SectionHeader
        eyebrow="Destinations"
        title="Going somewhere?"
        description="Line up your destination with its currency before you pack."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {published.map((destination) => (
          <DestinationTile key={destination.name} destination={destination} />
        ))}
      </div>
    </Section>
  );
}
