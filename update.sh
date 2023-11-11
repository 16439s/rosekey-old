#!/usr/bin/env bash
set -eu

source neko/update/utils

say "Start upgrading Firefish!"

# Pull changes
## git pull
OLD_COMMIT=$(git rev-parse --short HEAD)

say "Pulling changes from the remote repo..."

running "git checkout -- package.json packages/backend/assets"
git checkout -- package.json packages/backend/assets

running "git pull --ff --no-edit --autostash --strategy-option theirs"
git pull --ff --no-edit --autostash --strategy-option theirs

NEW_COMMIT=$(git rev-parse --short HEAD)
say "Pulled successfully!\n"

## check if the update script itself is updated
say "Checking if the update script itself has been modified by this update..."
if [ $(git diff "${OLD_COMMIT}" "${NEW_COMMIT}" update.sh) != "" ]; then
  say "Oh meow, that seems to be the case."
  say "I'm sorry to bother you, but please run this script again!"
  exit 1
else
  say "This script seems to be up-to-date!\n"
fi

## show messages
for message in neko/messages/*; do
  file=$(basename -- "${message}")
  if [ ! -f "neko/flags/${file}" ]; then
    if [ $# != 1 ] || [ "$1" != "--skip-all-confirmations" ]; then
      say "There is an important notice!"
      cat "${message}"
      say "Continue? (Are you ready for upgrading?)"
      read -r -p "[y/N] > " yn
      case "${yn}" in
        [Yy]|[Yy][Ee][Ss])
          touch "neko/flags/${file}"
          say "Let's go!"
          say "To read the message again, run: \$ cat ${message}"
          ;;
        *)
          say "Okay, please run this script again when you're ready!"
          exit 1
          ;;
      esac
    else
      touch "neko/flags/${file}"
    fi
  fi
done

say "Do you use Docker?"
read -r -p "[y/N] > " yn

case "${yn}" in
  [Yy]|[Yy][Ee][Ss])
    ./neko/update/docker.sh $@
    ;;
  *)
    ./neko/update/native.sh $@
    ;;
esac

# Done
say "Enjoy your sabakan life~"
