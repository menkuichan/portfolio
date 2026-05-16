/**
 * Root layout — owns <html>, <body>, fonts, and the IntlProvider.
 *
 * Next.js 16 strictly requires html/body to live in the ROOT layout
 * so that not-found pages and any non-localized routes still render
 * a valid HTML document.
 *
 * The locale is resolved via `getLocale()` (set by middleware) so we
 * can still set `<html lang>` correctly without putting it in
 * `[locale]/layout.tsx`.
 */

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { Caveat, Fraunces, Geist_Mono, Inter } from "next/font/google";
import { Footer, Header } from "@/components/layout";
import { defaultLocale, htmlLang, locales, type Locale } from "@/i18n/config";
import "./globals.css";

// ---------- Fonts ----------

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ---------- Layout ----------

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requested = await getLocale();
  const locale: Locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return (
    <html
      lang={htmlLang[locale]}
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
