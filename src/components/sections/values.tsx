import { useTranslations } from "next-intl";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import type { AccentTone } from "@/config/services";
import { values } from "@/config/values";
import { cn } from "@/lib/cn";

/**
 * Values — four work principles in a 2x2 grid.
 *
 * Each card has a coloured marker (single character) that doubles
 * as decoration and quick visual anchor. The marker comes from the
 * config — easy to swap for an SVG icon later.
 */

const markerClasses: Record<AccentTone, string> = {
  peach: "bg-peach-100 text-peach-500 border-peach-300",
  mint: "bg-mint-100 text-mint-500 border-mint-300",
  lavender: "bg-lavender-100 text-lavender-500 border-lavender-300",
  sun: "bg-sun-100 text-sun-500 border-sun-300",
};

export function Values() {
  const t = useTranslations("About.values");

  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} withDoodle />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <Card key={value.id} tone="surface" padding="lg">
              <CardHeader>
                <div
                  aria-hidden="true"
                  className={cn(
                    "font-display mb-4 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl",
                    markerClasses[value.tone],
                  )}
                >
                  {value.marker}
                </div>
                <CardTitle className="text-xl">{t(`items.${value.id}.title`)}</CardTitle>
                <CardDescription className="text-ink-muted mt-2 text-base leading-relaxed">
                  {t(`items.${value.id}.description`)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
