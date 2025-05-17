import { Sandpack } from "@codesandbox/sandpack-react";

export function SandBox() {
  return (
    <Sandpack
      template="react"
      theme="dark"
      options={{
        showConsoleButton: true,
        showInlineErrors: true,
        showNavigator: true,
        showLineNumbers: true,
        showTabs: true,
      }}
    />
  );
}
