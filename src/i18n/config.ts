/**
 * Single source of truth for supported locales.
 * Adding a new locale: update `locales` and create `messages/<locale>.json`.
 */

export const locales = ["en", "ru", "es", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * `as-needed` strategy: the default locale (en) has no URL prefix,
 * other locales are prefixed (e.g. /ru, /es, /pt).
 * Pick "always" if you want every locale to have a prefix.
 */
export const localePrefix = "as-needed" as const;

/**
 * Human-readable labels used in the language switcher.
 * Native names render correctly in their own scripts.
 */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  es: "Español",
  pt: "Português",
};

/**
 * Used as <html lang="...">. Maps to BCP 47 tags.
 */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  es: "es",
  pt: "pt",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
