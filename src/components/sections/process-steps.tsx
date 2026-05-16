import { useTranslations } from "next-intl";
import { Container, Section, SectionHeading } from "@/components/ui";
import { processSteps } from "@/config/process";
import type { AccentTone } from "@/config/services";
import { cn } from "@/lib/cn";

/**
 * ProcessSteps — visualizes the 4-step working process.
 * Each step is a numbered card with its own accent color.
 *
 * Layout: 4 columns desktop, 2 columns tablet, stacked on mobile.
 * On wide layouts the number badges create a horizontal rhythm.
 */

const toneRings: Record<AccentTone, string> = {
  peach: "bg-peach-100 text-peach-500 border-peach-300",
  mint: "bg-mint-100 text-mint-500 border-mint-300",
  lavender: "bg-lavender-100 text-lavender-500 border-lavender-300",
  sun: "bg-sun-100 text-sun-500 border-sun-300",
};

export function ProcessSteps() {
  const t = useTranslations("Process");

  return (
    <Section spacing="lg" tone="surface">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} withDoodle />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li
              key={step.id}
              className="bg-cream-50 border-cream-200 hover:shadow-card rounded-(--radius-card) border p-6 transition-shadow"
            >
              <div
                className={cn(
                  "font-display mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl font-medium",
                  toneRings[step.tone],
                )}
                aria-hidden="true"
              >
                {step.number}
              </div>

              <h3 className="font-display text-ink text-xl leading-tight">
                {t(`steps.${step.id}.title`)}
              </h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {t(`steps.${step.id}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
