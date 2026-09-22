import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { getPublishedCurrencies } from "@/lib/data/currency-content";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export function Footer() {
  const year = new Date().getFullYear();
  const published = getPublishedCurrencies();
  const columns: FooterColumn[] = [
    {
      heading: "Currencies",
      links: published.map((currency) => ({
        label: currency.name,
        href: routes.currency(currency.slug),
      })),
    },
    {
      heading: "Travel Money",
      links: [
        { label: "Travel money", href: routes.travelMoney },
        { label: "Currency converter", href: routes.converter },
        { label: "Travel money planner", href: routes.travelMoneyPlanner },
        { label: "ATM withdrawal", href: routes.atmWithdrawal },
        { label: "Currency explorer", href: routes.currencies },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-ink text-white/70">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo className="[&_span:last-child]:text-white" />
            <p className="mt-4 max-w-xs text-sm text-white/60">{site.description}</p>
          </div>

          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className={column.heading === "Currencies" ? "lg:col-span-2" : undefined}
            >
              <h2 className="text-sm font-semibold text-white">{column.heading}</h2>
              <ul
                className={
                  column.heading === "Currencies"
                    ? "mt-4 columns-1 gap-x-8 space-y-2.5 sm:columns-2"
                    : "mt-4 space-y-2.5"
                }
              >
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`} className="break-inside-avoid">
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Exchange rates shown across the site are
            indicative for travel planning, not live market data. Actual rates and
            fees can vary by provider.
          </p>
          <p>Made for travellers.</p>
        </div>
      </Container>
    </footer>
  );
}
