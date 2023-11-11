#!/usr/bin/env bash
set -eu

source neko/update/utils

# Confirm that the server is stopped
if [ $# != 1 ] || [ "$1" != "--skip-all-confirmations" ]; then
  say "Did you stop your server?"
  read -r -p "[Y/n] > " yn
  case "${yn}" in
    [Nn]|[Nn][Oo])
      say "You must stop your server first!"
      exit 1
      ;;
    *)
      say "uwu~ erai erai!\n"
      ;;
  esac
fi

# write version info
say "Writing version info to package.json..."

COMMIT_HASH=$(git rev-parse --short HEAD)

running "sed -i -r 's/\"version\": \"([^+]+).*\",$/\"version\": \"\\1+neko:${COMMIT_HASH:0:7}\",/' package.json"
sed -i -r "s/\"version\": \"([^+]+).*\",$/\"version\": \"\\1+neko:${COMMIT_HASH:0:7}\",/" package.json

say "Done!\n"

# install dependencies
say "Upgrading dependencies..."

running "corepack prepare pnpm@latest --activate"
corepack prepare pnpm@latest --activate

running "pnpm install"
pnpm install

say "Done!\n"

# build
say "Start building Firefish."
say "It takes some time! Why not brew a cup of cofe?"

running "NODE_OPTIONS=\"--max_old_space_size=3072\" NODE_ENV=\"production\" pnpm run rebuild"
NODE_OPTIONS="--max_old_space_size=3072" NODE_ENV="production" pnpm run rebuild

say "Done! We're almost there.\n"

# prevent migration errors
if [ ! -f packages/backend/native-utils/built/index.js ]; then
  say "Something went wrong orz... Gonnya try fixing that."
  running "cp neko/index.js packages/backend/native-utils/built/index.js"
  cp neko/index.js packages/backend/native-utils/built/index.js
else
  say "It's going well so far!\n"
fi

# migrate
say "Database migration time!"

running "NODE_OPTIONS=\"--max_old_space_size=3072\" NODE_ENV=\"production\" pnpm run migrate"
NODE_OPTIONS="--max_old_space_size=3072" NODE_ENV="production" pnpm run migrate

say "Done!\n"
