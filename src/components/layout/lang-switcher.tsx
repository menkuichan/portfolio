"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname as useNextPathname } from "next/navigation";
import { useTransition } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/**
 * LangSwitcher — switches locale while preserving the current path.
 *
 * Strategy (canonical, no hacks):
 * - `usePathname()` from `next/navigation` returns the raw browser
 *   path (e.g. "/pt/about"). We strip the locale prefix ourselves so
 *   we know exactly what we're navigating to — no reliance on next-intl's
 *   `usePathname` quirks during client-side transitions.
 * - `useRouter()` from `@/i18n/navigation` is next-intl's router. We pass
 *   it the stripped path plus the target `{ locale }`. It handles:
 *     * applying the correct prefix for the target locale
 *     * writing the NEXT_LOCALE cookie (so refreshes remember the choice)
 *     * keeping App Router state in sync
 *
 * Locale detection from cookies is disabled in `routing.ts`, so this
 * switch is reliably one-way: URL → locale, period.
 */

function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}

export function LangSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LangSwitcher");
  const router = useRouter();
  const rawPathname = useNextPathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === currentLocale) return;

    const cleanPath = stripLocalePrefix(rawPathname);
    startTransition(() => {
      router.replace(cleanPath, { locale: nextLocale });
    });
  }

  return (
    <label className={cn("relative inline-flex items-center gap-2", className)}>
      <span className="sr-only">{t("switchTo")}</span>
      <select
        value={currentLocale}
        onChange={handleChange}
        disabled={isPending}
        aria-label={t("label")}
        className={cn(
          "appearance-none rounded-full border bg-transparent py-1 pr-8 pl-3 text-sm font-medium",
          "border-cream-300 text-ink hover:bg-cream-100",
          "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:opacity-60",
        )}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="text-ink-muted pointer-events-none absolute right-2.5 h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 4.5L6 7.5L9 4.5" />
      </svg>
    </label>
  );
}
