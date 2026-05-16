import { useTranslations } from "next-intl";
import { Container, Section, SectionHeading } from "@/components/ui";
import { journeySteps } from "@/config/journey";
import type { AccentTone } from "@/config/services";
import { cn } from "@/lib/cn";

/**
 * Journey — vertical timeline of career milestones.
 *
 * Each step shows year + title + description. A coloured dot anchors
 * the step to the connecting vertical line. Year sits in handwritten
 * font for personality.
 */

const dotClasses: Record<AccentTone, string> = {
  peach: "bg-peach-300 border-peach-500",
  mint: "bg-mint-300 border-mint-500",
  lavender: "bg-lavender-300 border-lavender-500",
  sun: "bg-sun-300 border-sun-500",
};

export function Journey() {
  const t = useTranslations("About.journey");

  return (
    <Section spacing="lg" tone="surface">
      <Container size="prose">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          withDoodle
          centered={false}
          className="md:items-start md:text-left"
        />

        <ol className="relative mt-14 space-y-12 md:pl-2">
          {/* Vertical connecting line */}
          <span
            aria-hidden="true"
            className="border-cream-300 pointer-events-none absolute top-2 bottom-2 left-[7px] border-l-2 border-dashed"
          />

          {journeySteps.map((step) => (
            <li key={step.id} className="relative pl-10">
              {/* Anchor dot */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1 left-0 inline-block h-4 w-4 rounded-full border-2",
                  dotClasses[step.tone],
                )}
              />

              <div className="font-hand text-ink-muted text-xl">{t(`steps.${step.id}.year`)}</div>
              <h3 className="font-display text-ink mt-1 text-2xl leading-tight">
                {t(`steps.${step.id}.title`)}
              </h3>
              <p className="text-ink-muted mt-2 text-base leading-relaxed">
                {t(`steps.${step.id}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
