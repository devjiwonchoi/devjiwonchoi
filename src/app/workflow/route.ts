import { start } from "workflow/api";
import { handleUserSignup } from "@/lib/workflow";
import { NextResponse } from "next/server";
export async function POST() {
  // Executes asynchronously and doesn't block your app
  await start(handleUserSignup);
  return NextResponse.json({
    message: "User signup workflow started",
  });
}
