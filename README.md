# Ilona Hakalo — Portfolio

Personal portfolio site for Ilona Hakalo — Shopify developer (Liquid + Hydrogen).

Built with the same engineering standards I bring to client projects:
strict TypeScript, atomic components, locked-down lint/format pipeline,
data-driven content, and i18n from day one.

---

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **TypeScript** with `strict` and 5 extra safety flags
- **Tailwind CSS v4** (CSS-first `@theme` design tokens — no JS config)
- **next-intl** for 4-locale routing (EN default, RU/ES/PT prefixed)
- **class-variance-authority** for type-safe component variants
- **ESLint 9 flat config** + **Prettier 3** + **simple-git-hooks** + **lint-staged**

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Run production server

npm run typecheck    # tsc --noEmit
npm run lint         # ESLint (fails on any warning)
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
npm run check        # typecheck + lint + format:check
```

## Folder structure

```
src/
├── app/
│   ├── layout.tsx              # Root (pass-through; html/body live under [locale])
│   └── [locale]/
│       ├── layout.tsx          # Real layout: html/body/fonts/IntlProvider/Header/Footer
│       └── page.tsx            # Home (composed from sections/)
│
├── components/
│   ├── ui/                     # Atomic primitives (Button, Card, Badge, Container, Section)
│   ├── layout/                 # Header, Footer, LangSwitcher
│   ├── sections/               # Page-level compositions (Hero, etc.)
│   └── illustrations/          # Hand-drawn SVG doodles
│
├── config/                     # Data-driven content (site, nav)
├── i18n/                       # Locale config, routing, request handler, navigation
├── messages/                   # JSON translations (en, ru, es, pt)
├── lib/                        # Pure utilities (cn, helpers)
├── app/globals.css             # Tailwind import + @theme tokens
├── global.d.ts                 # Type-augments next-intl with message keys
└── middleware.ts               # Locale-detection middleware
```

## Architectural principles

1. **Atomic structure** — `ui/` knows nothing about business. `sections/` composes
   atoms. `app/` only assembles sections. Never the other way around.
2. **Data-driven** — every list (nav, services, tech) lives in `config/` as
   typed `const satisfies`. Components render from data.
3. **`cva` for every variant** — no magic class strings; all states are typed
   options on the component.
4. **Server Components by default** — `"use client"` only where it's necessary
   (LangSwitcher, forms, animations).
5. **Type-safe i18n** — `messages/en.json` is the source of truth; TS errors
   on any unknown key via `global.d.ts` augmentation.
6. **Soft i18n fallback** — `i18n/request.ts` merges English under each locale's
   bundle, so partial translations don't 404 or render blanks.
7. **Strict everything** — `tsc` strict + `noUncheckedIndexedAccess` +
   `verbatimModuleSyntax`. ESLint warnings fail the build.

## Adding content

### A new translation key

1. Add it to `src/messages/en.json` (TS will pick up the new shape).
2. Translate in `ru.json` / `es.json` / `pt.json` (or skip — English fallback
   kicks in automatically).
3. Use via `useTranslations("Namespace")(...)` in Server or Client Components.

### A new page

1. Add a folder under `src/app/[locale]/<slug>/`.
2. Inside, create `page.tsx`:
   ```tsx
   import { setRequestLocale } from "next-intl/server";
   export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
     const { locale } = await params;
     setRequestLocale(locale);
     return <main>...</main>;
   }
   ```
3. Add to `src/config/nav.ts` if it should appear in the header.

### A new UI primitive

1. Create `src/components/ui/<name>.tsx` with `cva` + `forwardRef`.
2. Re-export from `src/components/ui/index.ts`.
3. Document variants in a JSDoc comment.

### A new locale

1. Add the locale code to `src/i18n/config.ts` (`locales`, `localeLabels`,
   `htmlLang`).
2. Create `src/messages/<code>.json` (copy en.json as a starting point).

## Design tokens

All colors, fonts, radii, and shadows are defined as CSS variables in
`src/app/globals.css` under `@theme`. Tailwind v4 auto-generates utilities
from them — e.g. `--color-peach-300` → `bg-peach-300`, `text-peach-300`,
`border-peach-300`.

Semantic aliases (`--color-ink`, `--color-surface`, `--color-accent`) point
to raw palette values. Change the visual identity by re-pointing aliases
without touching component code.

## Deployment

Built for Vercel. The locale-routing middleware works on the Edge runtime.

Required env vars on production: _(none yet — add as needed)_.

## License

All rights reserved. Source code visible for reference; no commercial reuse
without permission.
