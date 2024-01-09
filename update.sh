#!/bin/sh
set -eu

. neko/update/utils

say 'Start upgrading Firefish!'
br

# Apply patches
run './neko/update/patch.sh'
br

# Pull changes
## git pull
OLD_COMMIT=$(git rev-parse --short HEAD)

say 'Pulling changes from the remote repo...'
run 'git checkout -- package.json packages/backend/assets'
run 'git pull --ff --no-edit --autostash --strategy-option theirs'

NEW_COMMIT=$(git rev-parse --short HEAD)

if [ "${OLD_COMMIT}" != "${NEW_COMMIT}" ]; then
  run "git log --no-merges --reverse --format='%s (by %an)' ${OLD_COMMIT}..${NEW_COMMIT} > neko/volume/CHANGELOG"
fi

say 'Pulled successfully!'
br

## check if the update script itself is updated
say 'Checking if the update script itself has been modified by this update...'
if [ "$(git diff "${OLD_COMMIT}" "${NEW_COMMIT}" update.sh neko/update)" != '' ]; then
  say 'Oh meow, that seems to be the case.'
  sadsay "I'm sorry to bother you, but please run this script again!"
  exit 1
else
  say 'This script seems to be up-to-date!'
  br
fi

## show messages
for message in $(find neko/messages -type f ! -name '*.resolved' -print | sort); do
  file=$(basename -- "${message}")

  if [ ! -f "neko/flags/${file}" ]; then
    if contains '--skip-all-confirmations' "$@"; then
      touch "neko/flags/${file}"
    else
      say 'There is an important notice!'
      cat "${message}"

      say 'Continue? (Are you ready for upgrading?)'
      printf '[y/N] > '
      read -r yn

      case "${yn}" in
        [Yy]|[Yy][Ee][Ss])
          touch "neko/flags/${file}"
          say "Let's go!"
          say "To read the message again, run: \$ cat ${message}"
          br
          ;;
        *)
          say "Okay, please run this script again when you're ready!"
          exit 1
          ;;
      esac
    fi
  fi
done

docker_update() {
  ./neko/update/container.sh 'docker' "$@"
}
podman_update() {
  ./neko/update/container.sh 'podman' "$@"
}
native_update() {
  ./neko/update/native.sh "$@"
}

if   contains '--docker' "$@"; then docker_update "$@"
elif contains '--podman' "$@"; then podman_update "$@"
elif contains '--native' "$@"; then native_update "$@"

else
  say 'Do you use Docker or Podman?'
  printf 'd: Docker, p: Podman, n: No [d/p/N] > '
  read -r resp

  case "${resp}" in
    [Yy]|[Yy][Ee][Ss])
      sadsay "Watch out! ${resp} is not a valid answer." >&2
      exit 2
      ;;
    [Dd]) docker_update "$@" ;;
    [Pp]) podman_update "$@" ;;
    *)    native_update "$@" ;;
  esac
fi

# Done
say 'Enjoy your sabakan life~'
