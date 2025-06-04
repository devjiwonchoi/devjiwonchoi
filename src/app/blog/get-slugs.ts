"use cache";

import { readdir, readFile } from "fs/promises";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { join } from "path";

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
  const dir = join(process.cwd(), "public/blog");
  const slugs = await readdir(dir);

  cacheTag("get-blog-slugs");
  cacheLife("hours");

  return slugs;
}

export async function getBlog(slug: string) {
  const filename = join(process.cwd(), `public/blog/${slug}/index.md`);
  const source = await readFile(filename, "utf-8");

  cacheTag(`get-blog-${slug}`);
  cacheLife("hours");

  return source;
}
