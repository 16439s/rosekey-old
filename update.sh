#!/usr/bin/env bash
function copy_missing_file {
  [ -f "packages/backend/native-utils/built/index.js" ] || \
  cp packages/index.js packages/backend/native-utils/built/index.js
}

git checkout -- package.json packages/backend/assets && \
git pull --ff && \
COMMIT=$(git rev-parse --short HEAD) && \
sed -i -r "s/\"version\": \"([^+]+).*\",$/\"version\": \"\\1+neko:${COMMIT}\",/" package.json && \
corepack prepare pnpm@latest --activate && \
pnpm i && \
NODE_ENV=production pnpm run rebuild && \
copy_missing_file && \
pnpm run migrate
