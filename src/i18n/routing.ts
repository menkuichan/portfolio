/**
 * Routing config consumed by next-intl middleware.
 */

import { defineRouting } from "next-intl/routing";
import { defaultLocale, localePrefix, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
