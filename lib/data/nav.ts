import { routes } from "@/lib/routes";

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Primary navigation. Only published destinations (or homepage sections that
 * already exist). Unpublished routes such as /exchange-rates/ and /guides/
 * are omitted until those pages ship.
 */
export const primaryNav: NavLink[] = [
  { label: "Currencies", href: routes.currencies },
  { label: "Converter", href: routes.converter },
  { label: "Travel Money", href: routes.travelMoney },
];
