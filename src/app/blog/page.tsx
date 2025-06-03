import Link from "next/link";
import { Suspense } from "react";
import { getSlugs } from "./get-slugs";

async function LearningsList() {
  const postSlugs = await getSlugs();
  return (
    <>
      {postSlugs.map((slug) => (
        <div key={slug}>
          <Link href={`/blog/${slug}`}>{slug}</Link>
        </div>
      ))}
    </>
  );
}

export default async function LearningsListPage() {
  return (
    <Suspense fallback={<div>Loading Learnings...</div>}>
      <LearningsList />
    </Suspense>
  );
}
