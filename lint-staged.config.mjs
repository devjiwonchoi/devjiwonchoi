const lintStagedConfig = {
  "*.{js,mjs,jsx,ts,tsx}": [
    "next lint --max-warnings=0 --fix --file",
    "prettier --write",
  ],
  "*.{css,json,md,mdx,yml,yaml}": ["prettier --write"],
};

export default lintStagedConfig;
