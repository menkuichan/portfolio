import { useFormatter, useTranslations } from "next-intl";
import { Badge, Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/blog";

/**
 * PostCard — preview tile for a blog post.
 *
 * Renders title, description, date, reading time, and up to 3 tags.
 * Wraps the whole card in a locale-aware <Link> to /blog/[slug].
 */
export interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations("Blog");
  const format = useFormatter();

  return (
    <Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-none">
      <Card
        tone="elevated"
        padding="lg"
        className="h-full transition-transform duration-300 group-hover:-translate-y-1"
      >
        <CardHeader>
          {/* Meta row */}
          <div className="text-ink-muted flex flex-wrap items-center gap-2 text-xs">
            <time dateTime={post.date}>
              {format.dateTime(new Date(post.date), { dateStyle: "long" })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{t("post.minRead", { minutes: post.readingTimeMin })}</span>
          </div>

          <CardTitle className="group-hover:text-peach-500 mt-3 text-2xl transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="text-ink-muted mt-2 text-base leading-relaxed">
            {post.description}
          </CardDescription>
        </CardHeader>

        <CardBody className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} tone="neutral" size="sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
