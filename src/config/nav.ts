/**
 * Top navigation items.
 *
 * The `labelKey` references a translation key in messages/*.json
 * under the "Nav" namespace.
 */

import type messages from "@/messages/en.json";

type NavKey = keyof (typeof messages)["Nav"];

export interface NavItem {
  readonly href: string;
  readonly labelKey: NavKey;
}

export const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/services", labelKey: "services" },
  { href: "/blog", labelKey: "blog" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const satisfies readonly NavItem[];
