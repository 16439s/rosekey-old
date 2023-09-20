#!/usr/bin/env bash
set -eu

function say {
  tput setaf 5
  echo -e "( ^-^) < $1"
  tput setaf 7
}

function running {
  tput setaf 3
  echo "[running] \$ $1"
  tput setaf 7
}

say "Start upgrading Firefish!"
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

# Pull changes
## git pull
OLD_COMMIT=$(git rev-parse --short HEAD)
say "Currently we're on \`${OLD_COMMIT}\`"

say "Pulling changes from the remote repo..."

running "git checkout -- package.json packages/backend/assets"
git checkout -- package.json packages/backend/assets

running "git pull --ff --no-edit --autostash --strategy-option theirs"
git pull --ff --no-edit --autostash --strategy-option theirs

NEW_COMMIT=$(git rev-parse --short HEAD)
say "Pulled successfully! Now we're on \`${NEW_COMMIT}\`\n"

## check if the update script itself is updated
say "Checking if the update script itself has been changed by this update..."
if [[ $(git diff ${OLD_COMMIT} ${NEW_COMMIT} update.sh) != "" ]]; then
  say "Oh meow, that seems to be the case."
  say "I'm sorry to bother you, but please run this script again!"
  exit 1
else
  say "This script seems to be up-to-date!\n"
fi

## write version info
say "Writing version info to package.json..."

running "sed -i -r 's/\"version\": \"([^+]+).*\",$/\"version\": \"\\1+neko:${NEW_COMMIT:0:7}\",/' package.json"
sed -i -r "s/\"version\": \"([^+]+).*\",$/\"version\": \"\\1+neko:${NEW_COMMIT:0:7}\",/" package.json

say "Done!\n"

# upgrade
## install dependencies
say "Upgrading dependencies..."

running "corepack prepare pnpm@latest --activate"
corepack prepare pnpm@latest --activate

running "pnpm install --frozen-lockfile"
pnpm install --frozen-lockfile

say "Done!\n"

## build
say "Start building Firefish."
say "It takes some time! Why not brew a cup of cofe?"

running "NODE_OPTIONS=--max_old_space_size=3072 NODE_ENV=production pnpm run rebuild"
NODE_OPTIONS=--max_old_space_size=3072 NODE_ENV=production pnpm run rebuild

say "Done! We're almost there.\n"

## prevent migration errors
if [[ ! -f packages/backend/native-utils/built/index.js ]]; then
  say "Something went wrong orz... Gonnya try fixing that."
  running "pushd packages/backend/native-utils"
  pushd packages/backend/native-utils
  running "NODE_OPTIONS=--max_old_space_size=3072 NODE_ENV=production pnpm build"
  NODE_OPTIONS=--max_old_space_size=3072 NODE_ENV=production pnpm build
  running "popd"
  popd

  if [[ ! -f packages/backend/native-utils/built/index.js ]]; then
    say "Something is still broken... I'll take another measure."
    running "cp neko/index.js packages/backend/native-utils/built/index.js"
    cp neko/index.js packages/backend/native-utils/built/index.js
    say "Let's see if it works...\n"
  else
    say "The issue seems to be fixed!\n"
  fi
else
  say "It's going well so far!\n"
fi

## migrate
say "Database migration time!"

running "NODE_OPTIONS=--max_old_space_size=3072 NODE_ENV=production pnpm run migrate"
NODE_OPTIONS=--max_old_space_size=3072 NODE_ENV=production pnpm run migrate

say "Done!\n"

# Done
say "Enjoy your sabakan life~"
