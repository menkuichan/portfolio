/**
 * Per-request i18n config. Loads the messages bundle for the
 * resolved locale and DEEP-merges it on top of the default-locale
 * bundle, so partial translations don't leave nested keys missing.
 *
 * Connected to next-intl via `next-intl/plugin` in next.config.ts.
 */

import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { deepMerge } from "@/lib/deep-merge";
import { defaultLocale, type Locale } from "./config";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  const [localeMessages, defaultMessages] = await Promise.all([
    import(`@/messages/${locale}.json`).then((m) => m.default as Messages),
    locale === defaultLocale
      ? Promise.resolve(null)
      : import(`@/messages/${defaultLocale}.json`).then((m) => m.default as Messages),
  ]);

  return {
    locale,
    messages: defaultMessages ? deepMerge(defaultMessages, localeMessages) : localeMessages,
  };
});
