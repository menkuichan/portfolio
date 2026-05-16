import { useTranslations } from "next-intl";
import { Bracket, Dots, PortraitPlaceholder, Star } from "@/components/illustrations";
import { Container, Eyebrow, Section } from "@/components/ui";
import { Link } from "@/i18n/navigation";

/**
 * AboutSnippet — Home page about block.
 *
 * Two-column layout: visual portrait placeholder on the left, copy on the
 * right. Doodle accents (Dots pattern, Bracket, Star) wrap the photo to
 * keep the playful identity even when a real photo lands.
 *
 * When a real photo is ready, drop it into /public/ilona.jpg and replace
 * the placeholder div with <Image src="/ilona.jpg" ... />.
 */
export function AboutSnippet() {
  const t = useTranslations("AboutSnippet");

  return (
    <Section spacing="lg">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Visual */}
          <div className="relative mx-auto w-full max-w-sm md:mx-0">
            <Dots className="text-peach-300 absolute -top-6 -left-6 h-24 w-24 opacity-60" />
            <Star className="text-mint-300 absolute -top-2 -right-2 h-6 w-6" />

            <div className="border-cream-200 bg-cream-100 shadow-card relative aspect-[4/5] overflow-hidden rounded-(--radius-card) border-2">
              {/* Stylized placeholder — swap for <Image src="/ilona.jpg" /> when photo lands */}
              <PortraitPlaceholder />
            </div>

            <Bracket className="text-lavender-300 absolute top-12 -right-8 h-24" side="right" />
          </div>

          {/* Copy */}
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="font-display text-ink mt-3 text-3xl leading-[1.1] tracking-tight md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-ink-muted mt-6 text-lg leading-relaxed">{t("body")}</p>
            <Link
              href="/about"
              className="text-ink hover:text-peach-500 mt-8 inline-flex items-center gap-1 text-base font-medium underline-offset-4 transition-colors hover:underline"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
