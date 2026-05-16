import { useTranslations } from "next-intl";
import Image from "next/image";
import { Bracket, Dots, Star } from "@/components/illustrations";
import { buttonVariants, Container, Eyebrow, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * AboutHero — opening section of the /about page.
 *
 * Layout: portrait on the left (sticky-feeling visual anchor) and a
 * three-paragraph introduction on the right, followed by CV-download
 * + email CTAs. On mobile everything stacks.
 */
export function AboutHero() {
  const tPage = useTranslations("About.page");
  const tIntro = useTranslations("About.intro");
  const tAbout = useTranslations("About");

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <Container>
        {/* Page-level heading */}
        <div className="max-w-3xl">
          <Eyebrow tone="peach">{tPage("eyebrow")}</Eyebrow>
          <h1 className="font-display text-ink mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {tPage("title")}
          </h1>
          <p className="text-ink-muted mt-6 text-lg leading-relaxed md:text-xl">
            {tPage("subhead")}
          </p>
        </div>

        {/* Portrait + intro */}
        <div className="mt-16 grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          {/* Visual */}
          <div className="relative mx-auto w-full max-w-sm md:mx-0">
            <Dots className="text-mint-300 absolute -top-6 -left-6 h-24 w-24 opacity-60" />
            <Star className="text-peach-300 absolute -top-3 -right-3 h-6 w-6" />

            <div className="border-cream-200 bg-cream-100 shadow-card relative aspect-[4/5] overflow-hidden rounded-(--radius-card) border-2">
              <Image
                src="/ilona.jpg"
                alt="Ilona Hakalo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>

            <Bracket className="text-lavender-300 absolute top-12 -right-8 h-24" side="right" />
          </div>

          {/* Copy */}
          <div className="space-y-5 text-base leading-relaxed md:text-lg">
            <p className="text-ink">{tIntro("p1")}</p>
            <p className="text-ink-muted">{tIntro("p2")}</p>
            <p className="text-ink-muted">{tIntro("p3")}</p>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a
                href="/ilona-hakalo-cv.pdf"
                download
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                ↓ {tAbout("downloadCv")}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className={buttonVariants({ variant: "ghost", size: "md" })}
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
