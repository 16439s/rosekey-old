#!/usr/bin/env bash
git checkout -- package.json packages/backend/assets
git pull --ff

COMMIT=$(git rev-parse --short HEAD)
sed -i -r "s/\"version\": \"([^+]+).*\",$/\"version\": \"\\1+neko:${COMMIT}\",/" package.json

corepack prepare pnpm@latest --activate
pnpm i
NODE_ENV=production pnpm run rebuild
pnpm run migrate
