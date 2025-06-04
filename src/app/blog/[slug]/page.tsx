import type { Metadata } from "next";
import Image from "next/image";

import { Suspense } from "react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { parse, compile } from "ezmdx";
import { getBlog, getBlogSlugs, type BlogFrontmatter } from "../get-slugs";

type PropsType = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getReadyBlogSlugs() {
  "use cache";

  const slugs = await getBlogSlugs();
  const readyBlogSlugs = await Promise.all(
    slugs.filter(async (slug) => {
      const source = await getBlog(slug);
      const { frontmatter } = parse({ source }) as unknown as {
        frontmatter: BlogFrontmatter;
      };
      return frontmatter.status === "published";
    })
  );

  cacheTag("get-ready-blog-slugs");
  cacheLife("hours");

  return readyBlogSlugs;
}

async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getBlog(slug);

  const { frontmatter, content } = compile({ source });

  return (
    <article className="prose prose-lg prose-gray dark:prose-invert mx-auto py-12">
      {/* Title */}
      <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl dark:text-white">
        {frontmatter.title}
      </h1>

      {/* Subtitle/Description */}
      <p className="mb-8 text-xl leading-relaxed font-light text-gray-600 dark:text-gray-300">
        {frontmatter.description}
      </p>

      {/* Author and Meta Info */}
      <div className="mb-8 flex items-center space-x-4 border-b border-gray-200 pb-8 dark:border-gray-700">
        <div className="flex-1">
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              {frontmatter.author}
            </span>
            <span>·</span>
            <span>{frontmatter.read_time}</span>
            <span>·</span>
            <span>
              {new Date(frontmatter.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Preview Image */}
      {frontmatter.preview_image && (
        <div className="mb-12">
          <Image
            src={frontmatter.preview_image}
            alt={frontmatter.title}
            width={1024}
            height={384}
            className="h-64 w-full rounded-lg object-cover shadow-sm md:h-80 lg:h-96 dark:shadow-gray-800"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          {content}
        </div>
      </div>

      {/* Tags/Keywords */}
      {frontmatter.keywords && (
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {frontmatter.keywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default async function BlogPage({ params }: PropsType) {
  return (
    <Suspense fallback={<div>Loading Blog...</div>}>
      <Blog params={params} />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const { slug } = await params;
  const source = await getBlog(slug);

  const { frontmatter } = parse({ source }) as unknown as {
    frontmatter: BlogFrontmatter;
  };

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.preview_image,
    },
  };
}

export async function generateStaticParams() {
  const readyBlogSlugs = await getReadyBlogSlugs();

  return readyBlogSlugs.map((slug) => ({ slug }));
}
