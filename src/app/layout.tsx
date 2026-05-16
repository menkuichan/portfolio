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

import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { Caveat, Fraunces, Geist_Mono, Inter } from "next/font/google";
import { Footer, Header } from "@/components/layout";
import { JsonLd, websiteSchema } from "@/components/seo";
import { siteConfig } from "@/config/site";
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

// ---------- Site-wide metadata + viewport ----------

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ilonahakalo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  colorScheme: "light",
};

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
        <JsonLd data={websiteSchema()} />
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
