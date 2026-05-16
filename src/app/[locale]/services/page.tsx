import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Star, Underline } from "@/components/illustrations";
import { CTABanner, ProcessSteps, ServicesGrid } from "@/components/sections";
import { Container, Eyebrow, Section } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/seo";

/**
 * Services page — full breakdown of what I offer.
 *
 * Composition: page-specific Hero → ServicesGrid (full cards) →
 * ProcessSteps → CTABanner. Each piece is its own component, so this
 * file stays a clean composition layer.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.page" });
  return {
    title: t("metaTitle"),
    alternates: buildAlternates(locale as Locale, "/services"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services.page");

  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <Star className="text-mint-300 absolute top-16 left-[12%] h-5 w-5" />
        <Star className="text-peach-300 absolute right-[10%] bottom-12 h-4 w-4" />

        <Container size="prose" className="relative text-center">
          <Eyebrow tone="peach">{t("eyebrow")}</Eyebrow>
          <h1 className="font-display text-ink mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <Underline className="text-peach-300 mx-auto mt-2 h-2 w-2/3 max-w-xs" />
          <p className="text-ink-muted mt-6 text-lg leading-relaxed">{t("subhead")}</p>
        </Container>
      </Section>

      <ServicesGrid />
      <ProcessSteps />
      <CTABanner />
    </>
  );
}
