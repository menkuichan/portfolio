import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AboutHero,
  BeyondCode,
  CTABanner,
  Journey,
  TechStack,
  Values,
} from "@/components/sections";
import { JsonLd, personSchema } from "@/components/seo";
import type { Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/seo";

/**
 * About page — full story.
 *
 * Composition: AboutHero (portrait + intro + CV) → Journey (timeline)
 * → Values (4 principles) → TechStack (reused from Home) → BeyondCode
 * (personal touch) → CTABanner.
 *
 * Each section is independent — re-ordering is a one-line change.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.page" });
  return {
    title: t("metaTitle"),
    alternates: buildAlternates(locale as Locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={personSchema()} />
      <AboutHero />
      <Journey />
      <Values />
      <TechStack />
      <BeyondCode />
      <CTABanner />
    </>
  );
}
