import { cn } from "@/lib/cn";

type Tone = "neutral" | "brand" | "positive" | "negative" | "muted";

const tones: Record<Tone, string> = {
  neutral: "bg-mist text-ink",
  brand: "bg-brand-50 text-brand-700",
  positive: "bg-positive-soft text-positive",
  negative: "bg-negative-soft text-negative",
  muted: "bg-mist text-muted",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
