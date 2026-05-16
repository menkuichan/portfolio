"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/**
 * LangSwitcher — preserves the current path when switching locale.
 *
 * Renders a compact <select>. Replace with a popover-styled menu in
 * Phase 2 if a richer interaction is needed.
 */
export function LangSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LangSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
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
