/**
 * Locale-aware navigation utilities.
 * Import `Link`, `useRouter`, `redirect`, `usePathname` from here
 * instead of `next/link` / `next/navigation` to get automatic
 * locale prefixing.
 */

import { createNavigation } from "next-intl/navigation";
import { defaultLocale, localePrefix, locales } from "./config";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation({
  locales,
  defaultLocale,
  localePrefix,
});
