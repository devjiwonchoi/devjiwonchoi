import { sleep } from "workflow";

export async function handleUserSignup() {
  "use workflow";
  await sleep("5s"); // Pause for 5s - doesn't consume any resources

  console.log(
    "Workflow is complete! Run 'npx workflow web' to inspect your run"
  );
  return true;
}
