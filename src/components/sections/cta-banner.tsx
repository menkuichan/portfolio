import { useTranslations } from "next-intl";
import { Star, Underline } from "@/components/illustrations";
import { buttonVariants, Container, Eyebrow, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * CTABanner — final call-to-action shown at the bottom of every page.
 *
 * Visually distinct from regular sections: full-width tone="cream"
 * surface with a soft accent border, large display heading with a
 * doodle underline emphasizing the key noun, and two CTAs side by side.
 */
export function CTABanner() {
  const t = useTranslations("CTABanner");

  return (
    <Section spacing="lg" tone="surface" className="relative overflow-hidden">
      {/* Decorative sparkles */}
      <Star className="text-peach-300 absolute top-12 left-[15%] h-5 w-5" />
      <Star className="text-mint-300 absolute right-[18%] bottom-16 h-4 w-4" />
      <Star className="text-lavender-300 absolute top-1/2 right-[8%] h-3 w-3" />

      <Container size="prose" className="relative">
        <div className="flex flex-col items-center text-center">
          <Eyebrow tone="peach">{t("eyebrow")}</Eyebrow>

          <h2 className="font-display text-ink mt-4 text-4xl leading-[1.1] tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <Underline className="text-peach-300 mt-1 h-2 w-3/4 max-w-sm" />

          <p className="text-ink-muted mt-6 max-w-xl text-lg leading-relaxed">{t("subtitle")}</p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              {t("ctaPrimary")}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
