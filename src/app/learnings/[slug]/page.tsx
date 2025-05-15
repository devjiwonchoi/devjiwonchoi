import { readFile } from "fs/promises";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { MDX } from "ezmdx";
import { Suspense } from "react";

async function getPost(slug: string) {
  "use cache";
  const filename = `public/md/learnings/${slug}.md`;
  const source = await readFile(filename, "utf-8");

  cacheTag(`learnings-${slug}`);
  cacheLife("hours");

  return source;
}

async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getPost(slug);
  return <MDX source={source} />;
}

export default async function LearningsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading Learnings Post...</div>}>
      <Post params={params} />
    </Suspense>
  );
}
