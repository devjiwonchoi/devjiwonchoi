"use cache";

import { readdir, readFile } from "fs/promises";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { parse } from "ezmdx";

export type BlogFrontmatter = {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  read_time: number;
  preview_image: string;
  created_at: string;
  status: "published" | "draft";
};

export async function getBlogSlugs() {
  const dir = "public/blog";
  const slugs = await readdir(dir);

  return slugs;
}

export async function getBlog(slug: string) {
  const filename = `public/blog/${slug}/index.md`;
  const source = await readFile(filename, "utf-8");

  cacheTag(`blog-${slug}`);
  cacheLife("minutes");

  return source;
}

export async function getReadyBlogSlugs() {
  const slugs = await getBlogSlugs();
  const readyBlogSlugs = await Promise.all(
    slugs.filter(async (slug) => {
      const source = await getBlog(slug);
      const { frontmatter } = parse({ source });
      return frontmatter.status === "published";
    })
  );

  cacheTag("get-ready-post-slugs");
  cacheLife("minutes");

  return readyBlogSlugs;
}
