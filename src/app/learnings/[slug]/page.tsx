import type { Metadata } from "next";

import { readFile } from "fs/promises";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { Suspense } from "react";
import { compile, parse } from "ezmdx";
import { getSlugs } from "../get-slugs";
import { mdxComponents } from "./components";

type PropsType = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getPost(slug: string) {
  "use cache";
  const filename = `public/md/learnings/${slug}.md`;
  const source = await readFile(filename, "utf-8");

  cacheTag(`learnings-${slug}`);
  cacheLife("hours");

  return source;
}

async function LearningsPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = await getPost(slug);
  const { frontmatter, content } = compile({
    source,
    options: { components: mdxComponents },
  });

  const { title } = frontmatter;

  return (
    <article>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{frontmatter.createdAt}</p>
      {content}
    </article>
  );
}

export default async function LearningsPostPage({ params }: PropsType) {
  return (
    <Suspense fallback={<div>Loading Learnings Post...</div>}>
      <LearningsPost params={params} />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const { slug } = await params;
  const source = await getPost(slug);

  const { frontmatter } = parse({ source });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
  };
}

export async function generateStaticParams() {
  const slugs = await getSlugs();

  const readyPosts = await Promise.all(
    slugs.filter(async (slug) => {
      const source = await getPost(slug);
      const { frontmatter } = parse({ source });
      return !frontmatter.draft;
    })
  );

  return readyPosts.map((slug) => ({ slug }));
}
