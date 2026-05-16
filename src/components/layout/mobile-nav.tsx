"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Star } from "@/components/illustrations";
import { navItems } from "@/config/nav";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LangSwitcher } from "./lang-switcher";

/**
 * MobileNav — hamburger button + slide-in drawer.
 *
 * Visible on mobile only (<md). Replaces the inline desktop nav.
 * Behaviour:
 * - Click hamburger or focus + Enter to open
 * - Close on: backdrop click, Escape key, link click, route change
 * - Locks body scroll while open
 * - Focus returns to the trigger on close
 * - Respects prefers-reduced-motion (no slide animation)
 */
export function MobileNav() {
  const tNav = useTranslations("Nav");
  const tMenu = useTranslations("MobileNav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();

  // Close on route change — deferred to the next frame to satisfy
  // React 19's `react-hooks/set-state-in-effect` rule (no synchronous
  // setState cascades from effect bodies).
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Close on Escape; lock body scroll while open
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Return focus to the trigger after the drawer closes
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={tMenu("open")}
        aria-expanded={open}
        aria-controls={drawerId}
        className={cn(
          "border-cream-300 text-ink hover:bg-cream-100 inline-flex h-10 w-10 items-center justify-center rounded-full border",
          "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
        >
          <path d="M4 7H20" />
          <path d="M4 12H20" />
          <path d="M4 17H20" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "bg-ink-900/40 fixed inset-0 z-40 transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label={tMenu("title")}
        className={cn(
          "bg-cream-50 border-cream-200 shadow-card fixed top-0 right-0 z-50 flex h-full w-80 max-w-[90vw] flex-col border-l",
          "transform transition-transform duration-300 ease-out motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="border-cream-200 flex items-center justify-between border-b px-6 py-4">
          <span className="font-display text-ink inline-flex items-center gap-1.5 text-lg">
            {tMenu("title")}
            <Star className="text-peach-500 h-3 w-3" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={tMenu("close")}
            className={cn(
              "text-ink-muted hover:bg-cream-100 hover:text-ink inline-flex h-9 w-9 items-center justify-center rounded-full",
              "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
            )}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <path d="M6 6L18 18" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-display text-ink hover:text-peach-500 hover:bg-cream-100 block rounded-2xl px-4 py-3 text-xl",
                    "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                  )}
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer with LangSwitcher */}
        <div className="border-cream-200 border-t px-6 py-4">
          <LangSwitcher />
        </div>
      </aside>
    </div>
  );
}
