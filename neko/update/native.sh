#!/bin/sh
set -eu

. neko/update/utils

# Confirm that the server is stopped
if [ "$#" != '1' ] || [ "$1" != '--skip-all-confirmations' ]; then
  say 'Did you stop your server?'
  printf '[Y/n] > '
  read -r yn

  case "${yn}" in
    [Nn]|[Nn][Oo])
      say 'You must stop your server first!'
      exit 1
      ;;
    *)
      say 'uwu~ erai erai!'
      br
      ;;
  esac
fi

# write version info
say 'Writing version info to package.json...'

run "pnpm pkg set version=$(version)"

say 'Done!'
br

# install dependencies
say 'Upgrading dependencies...'

run 'corepack prepare pnpm@latest --activate'
run 'pnpm install --frozen-lockfile'

say 'Done!'
br

# build
say 'Start building Firefish.'
say 'It takes some time! Why not brew a cup of cofe?'

run 'NODE_OPTIONS="--max_old_space_size=3072" NODE_ENV="production" pnpm run rebuild'

say "Done! We're almost there."
br

# prevent migration errors
if [ ! -f packages/backend/native-utils/built/index.js ]; then
  say 'Something went wrong orz... Gonnya try fixing that.'
  run 'cp neko/index.js packages/backend/native-utils/built/index.js'
else
  say "It's going well so far!"
  br
fi

# migrate
say 'Database migration time!'
run 'NODE_OPTIONS="--max_old_space_size=3072" NODE_ENV="production" pnpm run migrate'

say 'Done!'
br
