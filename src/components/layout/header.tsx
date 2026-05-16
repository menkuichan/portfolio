import { useTranslations } from "next-intl";
import { Star } from "@/components/illustrations";
import { Container } from "@/components/ui";
import { navItems } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LangSwitcher } from "./lang-switcher";
import { MobileNav } from "./mobile-nav";

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
          className="group font-display text-ink hover:text-peach-500 inline-flex items-center gap-1.5 text-xl tracking-tight transition-colors"
        >
          {siteConfig.shortName}
          <Star
            className="text-peach-500 h-3 w-3 transition-transform group-hover:scale-110 group-hover:rotate-12"
            aria-hidden="true"
          />
        </Link>

        {/* Desktop nav — hidden on mobile */}
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

        {/* Desktop lang switcher — hidden on mobile (lives inside the drawer there) */}
        <div className="hidden md:block">
          <LangSwitcher />
        </div>

        {/* Mobile hamburger + drawer */}
        <MobileNav />
      </Container>
    </header>
  );
}
