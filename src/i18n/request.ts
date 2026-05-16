/**
 * Per-request i18n config. Loads the messages bundle for the
 * resolved locale; falls back to the default if missing.
 *
 * Connected to next-intl via the `next-intl/plugin` in `next.config.ts`.
 */

import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, type Locale } from "./config";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  // Soft fallback: if a translation file is missing or has missing keys,
  // next-intl will fall through to the default locale automatically when
  // we pass the default messages as a second-layer dictionary.
  const [messages, fallback] = await Promise.all([
    import(`@/messages/${locale}.json`).then((m) => m.default as Record<string, unknown>),
    locale === defaultLocale
      ? Promise.resolve(null)
      : import(`@/messages/${defaultLocale}.json`).then(
          (m) => m.default as Record<string, unknown>,
        ),
  ]);

  return {
    locale,
    messages: fallback ? { ...fallback, ...messages } : messages,
  };
});
