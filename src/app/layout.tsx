/**
 * Root layout — intentionally minimal.
 *
 * The actual <html>/<body>/fonts/IntlProvider live in
 * `src/app/[locale]/layout.tsx` so that the lang attribute and
 * loaded messages always match the resolved locale.
 *
 * Next.js requires SOME root layout for the build to succeed,
 * so we render an opaque pass-through here.
 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
