import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="border-b border-line">
      <Container className="py-20 lg:py-28">
        <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          404
        </p>
        <h1 className="mt-3 text-hero font-semibold text-ink">Page not found</h1>
        <p className="mt-5 max-w-xl text-lead text-muted">
          That address is not a published Wayfare page. Unpublished currencies and
          reserved routes return here on purpose.
        </p>
        <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li>
            <Link
              href={routes.home}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={routes.currencies}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Currency explorer
            </Link>
          </li>
          <li>
            <Link
              href={routes.travelMoney}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Travel money
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
