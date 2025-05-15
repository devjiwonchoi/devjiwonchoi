import Link from "next/link";

import { readdir } from "fs/promises";
import { Suspense } from "react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

async function getPostSlugs() {
  "use cache";
  const dir = "public/md/learnings";
  const postSlugs = (await readdir(dir)).map((file) => file.replace(".md", ""));

  cacheTag("learnings");
  cacheLife("hours");

  return postSlugs;
}

export default async function Learnings() {
  const postSlugs = await getPostSlugs();
  return (
    <Suspense fallback={<div>Loading Learnings...</div>}>
      {postSlugs.map((slug) => (
        <div key={slug}>
          <Link href={`/learnings/${slug}`}>{slug}</Link>
        </div>
      ))}
    </Suspense>
  );
}
