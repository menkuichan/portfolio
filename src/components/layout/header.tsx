import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { navItems } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LangSwitcher } from "./lang-switcher";

/**
 * Top header with branding, nav, and language switcher.
 *
 * Server component — no client JS required for the structure.
 * Only the embedded <LangSwitcher /> ships as client code.
 */
export function Header() {
  const t = useTranslations("Nav");

  return (
    <header className="border-cream-200 border-b">
      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="font-display text-ink hover:text-peach-500 text-xl tracking-tight transition-colors"
        >
          {siteConfig.shortName}
          <span className="text-peach-500" aria-hidden="true">
            .
          </span>
        </Link>

        {/* Primary nav — hidden on small screens, full mobile menu comes in Phase 2 */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium",
                    "text-ink-muted hover:text-ink hover:bg-cream-100",
                    "transition-colors",
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Lang switcher */}
        <LangSwitcher />
      </Container>
    </header>
  );
}
