import type { Metadata } from "next";

import { Suspense } from "react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { MDX, parse } from "ezmdx";
import { getBlog, getBlogSlugs } from "../get-slugs";

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
      const { frontmatter } = parse({ source });
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

  return <MDX source={source} />;
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

  const { frontmatter } = parse({ source });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
  };
}

export async function generateStaticParams() {
  const readyBlogSlugs = await getReadyBlogSlugs();

  return readyBlogSlugs.map((slug) => ({ slug }));
}
