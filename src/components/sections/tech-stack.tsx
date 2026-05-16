import { useTranslations } from "next-intl";
import { Container, Section, SectionHeading } from "@/components/ui";
import { techStack, type TechLevel } from "@/config/tech-stack";
import { cn } from "@/lib/cn";

/**
 * TechStack — visual grid of technologies grouped by category.
 * Each chip is styled by its level: expert > advanced > intermediate.
 * Subtle visual hierarchy without screaming "I'm bragging".
 */

const levelClasses: Record<TechLevel, string> = {
  expert: "bg-ink-900 text-cream-50 border-ink-900",
  advanced: "bg-cream-100 text-ink border-cream-300",
  intermediate: "bg-transparent text-ink-muted border-cream-300 border-dashed",
};

export function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <Section spacing="lg" tone="surface">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} note={t("note")} />

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {techStack.map((category) => (
            <div key={category.id}>
              <h3 className="font-display text-ink mb-4 text-lg">
                {t(`categories.${category.id}`)}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {category.items.map((tech) => (
                  <li key={tech.name}>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium",
                        "transition-colors",
                        levelClasses[tech.level],
                      )}
                      title={t(`level.${tech.level}`)}
                    >
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="text-ink-muted mt-12 flex flex-wrap items-center justify-center gap-4 text-xs">
          <LegendItem className={levelClasses.expert} label={t("level.expert")} />
          <LegendItem className={levelClasses.advanced} label={t("level.advanced")} />
          <LegendItem className={levelClasses.intermediate} label={t("level.intermediate")} />
        </div>
      </Container>
    </Section>
  );
}

function LegendItem({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("inline-block h-3 w-6 rounded-full border", className)} />
      <span className="capitalize">{label}</span>
    </span>
  );
}
