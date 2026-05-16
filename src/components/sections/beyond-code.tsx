import { useTranslations } from "next-intl";
import { Star } from "@/components/illustrations";
import { Container, Eyebrow, Section } from "@/components/ui";

/**
 * BeyondCode — small personal section on the About page.
 *
 * Single paragraph, hand-written eyebrow, decorative star.
 * Purpose: humanize the developer profile without overstaying its welcome.
 */
export function BeyondCode() {
  const t = useTranslations("About.beyond");

  return (
    <Section spacing="md" className="relative">
      <Star className="text-mint-300 absolute top-12 right-[20%] h-4 w-4" aria-hidden="true" />
      <Container size="prose">
        <Eyebrow tone="lavender">{t("eyebrow")}</Eyebrow>
        <h2 className="font-display text-ink mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
          {t("title")}
        </h2>
        <p className="text-ink-muted mt-6 text-lg leading-relaxed">{t("body")}</p>
      </Container>
    </Section>
  );
}
