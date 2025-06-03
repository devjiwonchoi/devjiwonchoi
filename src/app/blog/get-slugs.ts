"use cache";

import { readdir } from "fs/promises";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

export async function getSlugs() {
  const dir = "public/blog";
  const slugs = await readdir(dir);

  cacheTag("blog");
  cacheLife("hours");

  return slugs;
}
