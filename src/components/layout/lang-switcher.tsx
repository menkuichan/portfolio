"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { defaultLocale, locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * LangSwitcher — switches locale via a full-page navigation.
 *
 * Why full reload (window.location), not router.replace:
 *
 * Next.js App Router preserves the root layout across client-side
 * navigations. Our root layout sets `<html lang>` and renders the
 * NextIntlClientProvider with the messages for the active locale.
 * If we use the client-side router for the locale switch, neither
 * `<html lang>` nor the loaded messages update — only the URL changes.
 * Result: visible content stays in the previous language even though
 * the URL now says /es.
 *
 * A full-page navigation forces the server to render the new locale
 * from scratch: correct lang attribute, correct messages, correct
 * cookies, correct metadata. The "flash" of a full reload is the
 * expected UX cost for switching languages — every major i18n site
 * does the same.
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

function buildTargetPath(cleanPath: string, targetLocale: Locale): string {
  if (targetLocale === defaultLocale) return cleanPath;
  return cleanPath === "/" ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
}

export function LangSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LangSwitcher");
  const rawPathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === currentLocale) return;

    const cleanPath = stripLocalePrefix(rawPathname);
    const target = buildTargetPath(cleanPath, nextLocale);

    // `startTransition` shows the disabled state while the navigation
    // is in flight. The actual navigation is a full reload so the root
    // layout re-renders with the new locale.
    startTransition(() => {
      window.location.assign(target);
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
