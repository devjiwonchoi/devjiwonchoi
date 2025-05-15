const lintStagedConfig = {
  '*.{js,mjs,jsx,ts,tsx}': [
    'next lint --max-warnings=0 --fix --file',
    'biome format --write --no-errors-on-unmatched',
    'biome lint --write --unsafe',
  ],
  '*.{css,json,md,mdx,yml,yaml}': [
    'biome format --write --no-errors-on-unmatched',
  ],
}

export default lintStagedConfig
