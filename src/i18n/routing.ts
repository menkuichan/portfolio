/**
 * Routing config consumed by next-intl middleware.
 *
 * `localeDetection: false` is intentional — we don't want the middleware
 * to auto-redirect based on the user's previous choice stored in the
 * NEXT_LOCALE cookie or their browser's Accept-Language header. Doing so
 * makes "switch back to English" impossible from any non-default locale
 * page (the cookie wins, and the user gets bounced right back).
 *
 * The locale is determined ONLY by the URL prefix:
 *   /         → en (default)
 *   /ru/...   → ru
 *   /es/...   → es
 *   /pt/...   → pt
 *
 * Language preference is still persisted (next-intl's router writes the
 * cookie when the user explicitly switches), but the middleware ignores
 * it for routing decisions — the URL is the single source of truth.
 */

import { defineRouting } from "next-intl/routing";
import { defaultLocale, localePrefix, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});
