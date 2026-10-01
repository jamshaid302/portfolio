/**
 * Centralized formatting function for text labels and headings.
 * For English ('en'), converts text to UPPERCASE (matching design requirement).
 * For Urdu ('ur'), preserves exact script without casing modification.
 */
export function formatText(text: string, lang: 'en' | 'ur' = 'en', forceUppercase: boolean = true): string {
  if (!text) return "";
  if (lang === 'ur') {
    return text; // Urdu language has no uppercase/lowercase concept
  }
  return forceUppercase ? text.toUpperCase() : text;
}
