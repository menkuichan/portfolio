"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { defaultLocale, locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * LangSwitcher — switches locale while preserving the current path.
 *
 * Uses Next.js's native router and pathname (NOT next-intl's wrapped
 * versions) to avoid edge-cases where next-intl's `as-needed` strategy
 * occasionally returns a still-prefixed pathname during client-side
 * transitions. We strip and re-attach the locale prefix manually here —
 * one source of truth, one tested place.
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

function buildTargetPath(pathname: string, targetLocale: Locale): string {
  const cleanPath = stripLocalePrefix(pathname);
  if (targetLocale === defaultLocale) {
    return cleanPath;
  }
  // For non-default locales, prefix the path. Treat "/" specially so we
  // don't end up with "/ru/" (trailing slash).
  return cleanPath === "/" ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
}

export function LangSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LangSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === currentLocale) return;
    const target = buildTargetPath(pathname, nextLocale);
    startTransition(() => {
      router.replace(target);
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
