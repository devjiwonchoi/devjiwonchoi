const lintStagedConfig = {
  "*.{js,mjs,jsx,ts,tsx}": [
    "eslint --max-warnings=0 --fix",
    "prettier --write",
  ],
  "*.{css,json,md,mdx,yml,yaml}": ["prettier --write"],
};

export default lintStagedConfig;
