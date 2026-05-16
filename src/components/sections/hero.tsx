import { useTranslations } from "next-intl";
import { Squiggle, Star } from "@/components/illustrations";
import { buttonVariants, Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

/**
 * Hero — the first-fold piece of the landing page.
 *
 * Server component. Pulls copy from the "Hero" namespace in messages.
 * Decorative doodles (Star, Squiggle) sit around the copy without
 * interfering with the reading flow (aria-hidden).
 */
export function Hero() {
  const t = useTranslations("Hero");

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      {/* Decorative sparkles — random positioning, ignored by AT */}
      <Star className="text-peach-300 absolute top-20 left-[10%] h-5 w-5" />
      <Star className="text-mint-300 absolute right-[12%] bottom-32 h-4 w-4" />
      <Star className="text-lavender-300 absolute top-1/3 right-[8%] h-3 w-3" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Greeting */}
          <p className="font-hand text-ink-muted text-2xl md:text-3xl">{t("greeting")}</p>

          {/* Headline with underline doodle */}
          <h1 className="font-display text-ink mt-3 text-4xl leading-[1.1] tracking-tight md:text-6xl">
            {t("headline")}
          </h1>
          <Squiggle className="text-peach-500 mx-auto mt-3 h-3 w-48 md:w-72" />

          {/* Subhead */}
          <p className="text-ink-muted mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            {t("subhead")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              {t("ctaPrimary")}
            </a>
            <Link
              href="/blog"
              className="text-ink hover:text-peach-500 inline-flex items-center gap-1 px-4 py-3 text-base font-medium underline-offset-4 transition-colors hover:underline"
            >
              {t("ctaSecondary")} →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
