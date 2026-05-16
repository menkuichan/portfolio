import { useTranslations } from "next-intl";
import { Badge, Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import type { AccentTone, ServiceConfig } from "@/config/services";
import { cn } from "@/lib/cn";

/**
 * ServiceCard — reusable card for displaying a single service.
 *
 * Two variants:
 * - "compact" — used in Home/ServicesPreview (icon + title + 1-line desc + stack)
 * - "full"    — used in /services page (icon + title + full desc + features list + stack)
 *
 * The translation namespace is "Services.items.<id>" with shape:
 *   { title, description, features: string[] }
 */

const accentClasses: Record<AccentTone, { bg: string; text: string; border: string }> = {
  peach: { bg: "bg-peach-100", text: "text-peach-500", border: "border-peach-300" },
  mint: { bg: "bg-mint-100", text: "text-mint-500", border: "border-mint-300" },
  lavender: {
    bg: "bg-lavender-100",
    text: "text-lavender-500",
    border: "border-lavender-300",
  },
  sun: { bg: "bg-sun-100", text: "text-sun-500", border: "border-sun-300" },
};

const badgeTone: Record<AccentTone, "peach" | "mint" | "lavender" | "sun"> = {
  peach: "peach",
  mint: "mint",
  lavender: "lavender",
  sun: "sun",
};

export interface ServiceCardProps {
  service: ServiceConfig;
  variant?: "compact" | "full";
  className?: string;
}

export function ServiceCard({ service, variant = "compact", className }: ServiceCardProps) {
  const t = useTranslations(`Services.items.${service.id}`);
  const accent = accentClasses[service.accentTone];
  const { Icon } = service;

  // Features are an array — pulled via t.raw() to keep the JSON simple.
  // For the "compact" card we only show the description; "full" shows features.
  const features = variant === "full" ? (t.raw("features") as string[]) : [];

  return (
    <Card
      tone="elevated"
      padding="lg"
      className={cn(
        "group h-full transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <CardHeader>
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border",
            accent.bg,
            accent.border,
            accent.text,
          )}
        >
          <Icon />
        </div>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription className="text-ink-muted mt-2 text-base leading-relaxed">
          {t("description")}
        </CardDescription>
      </CardHeader>

      {variant === "full" && features.length > 0 ? (
        <CardBody>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-ink flex items-start gap-2 text-sm leading-relaxed">
                <span
                  className={cn(
                    "mt-1.5 inline-block h-1.5 w-1.5 rounded-full",
                    accent.bg,
                    accent.border,
                    "border",
                  )}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      ) : null}

      <CardBody className="mt-6">
        <div className="flex flex-wrap gap-1.5">
          {service.stack.map((item) => (
            <Badge key={item} tone={badgeTone[service.accentTone]} size="sm">
              {item}
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
