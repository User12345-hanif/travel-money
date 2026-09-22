import Link from "next/link";
import { cn } from "@/lib/cn";

const cardBase =
  "rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(cardBase, className)}>{children}</div>;
}

/**
 * Interactive card that behaves as a single large link with a polished hover
 * lift. Keeps the whole surface clickable while remaining keyboard accessible.
 */
export function LinkCard({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(
    cardBase,
    "group relative block transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    className
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
