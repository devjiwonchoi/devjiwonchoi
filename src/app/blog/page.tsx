import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { parse } from "ezmdx";
import { getBlog, getBlogSlugs, type BlogFrontmatter } from "./get-slugs";

async function BlogList() {
  const slugs = await getBlogSlugs();
  const blogData = (
    await Promise.all(
      slugs.map(async (slug) => {
        const source = await getBlog(slug);
        const { frontmatter } = parse({ source });
        if (frontmatter.status === "draft") {
          return null;
        }
        return { slug, frontmatter };
      })
    )
  ).filter((item): item is { slug: string; frontmatter: BlogFrontmatter } => {
    return item !== null;
  });

  return (
    <div className="py-8">
      <div className="space-y-8">
        {blogData.map(({ slug, frontmatter }) => (
          <article key={slug} className="group">
            <Link href={`/blog/${slug}`} className="block">
              <div className="flex gap-6 rounded-lg p-6 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-900">
                <div className="flex-1">
                  <div className="mb-3">
                    <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                      {frontmatter.title}
                    </h2>
                    <p className="line-clamp-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                      {frontmatter.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Image
                    src={frontmatter.preview_image}
                    alt={frontmatter.title}
                    width={160}
                    height={100}
                    className="h-[100px] w-[160px] rounded-lg object-cover"
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
        <div className="text-gray-600 dark:text-gray-400">Loading Posts...</div>
      }
    >
      <BlogList />
    </Suspense>
  );
}
