import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Render without the inner container (for full-bleed backgrounds). */
  bare?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  className,
  containerClassName,
  bare = false,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-14 sm:py-16 lg:py-20", className)}>
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold tracking-wide text-brand-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-h2 font-semibold">{title}</h2>
        {description ? (
          <p className="mt-4 text-lead text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
