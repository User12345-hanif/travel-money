/**
 * Small text helpers shared across the UI. Keeping these centralised avoids
 * hardcoding grammar (like "1 currency" vs "2 currencies") in components.
 */

/**
 * Pick the singular or plural form for a count. English pluralisation is
 * irregular ("currency" → "currencies"), so callers pass the plural explicitly
 * when it isn't a simple `+s`.
 */
export function plural(
  count: number,
  singular: string,
  pluralForm: string = `${singular}s`
): string {
  return Math.abs(count) === 1 ? singular : pluralForm;
}

/** "1 currency", "2 currencies" — count paired with the correct word. */
export function countLabel(
  count: number,
  singular: string,
  pluralForm?: string
): string {
  return `${count} ${plural(count, singular, pluralForm)}`;
}
