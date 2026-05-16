/**
 * Server-rendered MDX wrapper.
 *
 * Compiles a raw MDX string into React elements, applies the custom
 * component map, runs `remark-gfm` (tables, task lists, autolinks) and
 * `rehype-pretty-code` for syntax-highlighted code blocks via Shiki.
 *
 * Used by the blog post page.
 */

import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";

export interface MdxRendererProps {
  source: string;
}

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: { dark: "github-dark-dimmed", light: "github-light" },
                keepBackground: false,
                defaultLang: { block: "plaintext", inline: "plaintext" },
              },
            ],
          ],
        },
      }}
    />
  );
}
