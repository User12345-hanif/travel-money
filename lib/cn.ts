export type ClassValue = string | number | false | null | undefined;

/**
 * Minimal class-name joiner. Keeps the bundle free of an extra dependency
 * for something the platform can already do.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
