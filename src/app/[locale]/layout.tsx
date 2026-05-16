import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Caveat, Fraunces, Geist_Mono, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/layout";
import { htmlLang, locales } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import "../globals.css";

// ---------- Fonts (loaded once at the locale layout) ----------

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

// ---------- Static params for SSG of every locale ----------

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ---------- Locale-aware metadata ----------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
  };
}

// ---------- Layout ----------

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate the locale segment; bail out to 404 otherwise.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale.
  setRequestLocale(locale);

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
