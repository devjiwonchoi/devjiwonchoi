"use cache";

import { readdir, readFile } from "fs/promises";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

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
  const dir = "./public/blog";
  const slugs = await readdir(dir);

  cacheTag("get-blog-slugs");
  cacheLife("hours");

  return slugs;
}

export async function getBlog(slug: string) {
  const filename = `./public/blog/${slug}/index.md`;
  const source = await readFile(filename, "utf-8");

  cacheTag(`get-blog-${slug}`);
  cacheLife("hours");

  return source;
}
