import { connection } from "next/server";
import { Suspense } from "react";
import { SandBox } from "@/components/sandpack/sandpack";

async function Sandpack() {
  await connection();
  return <SandBox />;
}

export default async function Lab() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sandpack />
    </Suspense>
  );
}
