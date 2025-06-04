import type { BlogFrontmatter } from "./get-slugs";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { parse } from "ezmdx";
import { getBlog, getBlogSlugs } from "./get-slugs";

async function getBlogData() {
  "use cache";

  const slugs = await getBlogSlugs();
  const blogData = (
    await Promise.all(
      slugs.map(async (slug) => {
        const source = await getBlog(slug);
        const { frontmatter } = parse({ source });
        if (frontmatter.status === "published") {
          return { slug, frontmatter };
        }
        return null;
      })
    )
  ).filter((item): item is { slug: string; frontmatter: BlogFrontmatter } => {
    return item !== null;
  });

  cacheTag("get-blog-data");
  cacheLife("hours");

  return blogData;
}

async function BlogList() {
  const blogData = await getBlogData();

  return (
    <div className="py-4 sm:py-8">
      <div className="space-y-4 sm:space-y-8">
        {blogData.map(({ slug, frontmatter }) => (
          <article key={slug} className="group">
            <Link href={`/blog/${slug}`} className="block">
              <div className="flex flex-col gap-4 rounded-lg p-4 transition-colors duration-200 hover:bg-gray-100 sm:flex-row sm:gap-6 sm:p-6 dark:hover:bg-gray-900">
                <div className="order-2 flex-1 sm:order-1">
                  <div className="mb-3">
                    <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
                      {frontmatter.title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-600 sm:line-clamp-3 sm:text-base dark:text-gray-400">
                      {frontmatter.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:gap-4 sm:text-sm dark:text-gray-400">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <time className="font-medium">
                        {new Date(frontmatter.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </time>
                      <span className="hidden sm:inline">•</span>
                      <span className="font-medium">
                        {frontmatter.read_time} read
                      </span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {frontmatter.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="order-1 flex-shrink-0 sm:order-2">
                  <Image
                    src={frontmatter.preview_image}
                    alt={frontmatter.title}
                    width={160}
                    height={100}
                    className="h-[120px] w-full rounded-lg object-cover sm:h-[100px] sm:w-[160px]"
                  />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function BlogListPage() {
  return (
    <Suspense
      fallback={
        <div className="text-gray-600 dark:text-gray-400">
          Loading Blog List...
        </div>
      }
    >
      <BlogList />
    </Suspense>
  );
}
