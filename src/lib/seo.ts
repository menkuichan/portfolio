/**
 * SEO helpers — single source of truth for metadata defaults,
 * alternate language URLs, and JSON-LD structured data.
 *
 * Keep all URL-construction logic here so changing the domain
 * or the locale prefix strategy only happens in one place.
 */

import { siteConfig } from "@/config/site";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

const SITE_URL = siteConfig.url;

/** Locale prefix strategy: `as-needed` (no prefix for default locale). */
function pathForLocale(locale: Locale, path: string): string {
  const cleaned = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? cleaned || "/" : `/${locale}${cleaned}`;
}

/**
 * Build absolute URL for a given (locale, path) combination.
 */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return new URL(pathForLocale(locale, path), SITE_URL).toString();
}

/**
 * `alternates.languages` map for a given canonical path.
 * Includes `x-default` pointing at the default-locale URL.
 *
 * Example output for path="/services":
 *   {
 *     en: "https://.../services",
 *     ru: "https://.../ru/services",
 *     es: "https://.../es/services",
 *     pt: "https://.../pt/services",
 *     "x-default": "https://.../services"
 *   }
 */
export function languageAlternates(path = "/"): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = absoluteUrl(locale, path);
  }
  alternates["x-default"] = absoluteUrl(defaultLocale, path);
  return alternates;
}

/**
 * Convenience: build a full `alternates` block for next.js Metadata.
 */
export function buildAlternates(locale: Locale, path = "/") {
  return {
    canonical: absoluteUrl(locale, path),
    languages: languageAlternates(path),
  };
}
