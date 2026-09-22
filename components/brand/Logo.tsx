import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { wayfareMark } from "./mark";

/**
 * Symbol, or symbol plus the Wayfare wordmark.
 * `lockup` hides the wordmark below the desktop header.
 */
export function Logo({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "lockup";
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className
      )}
    >
      <svg viewBox={wayfareMark.viewBox} className="h-8 w-8 shrink-0 text-white" aria-hidden>
        <rect width="32" height="32" rx="8" className="fill-brand-600" />
        {wayfareMark.paths.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <span
        className={cn(
          "logo-word text-[1.0625rem] leading-none font-semibold tracking-[-0.04em] text-ink",
          variant === "lockup" && "max-lg:hidden"
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
