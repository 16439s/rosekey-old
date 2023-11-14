#!/bin/sh
set -eu

. neko/update/utils

pull() {
  say "Pulling the image..."
  docker pull docker.io/naskya/firefish
}

if ! pull; then
  say "awawa, the image may not be compatible with your environment..."
  say "Gonnya try building the image locally!"

  COMMIT_HASH=$(printf "%s" "$(git rev-parse HEAD)" | cut -c 1-7)
  docker build --tag docker.io/naskya/firefish --build-arg COMMIT="${COMMIT_HASH}" .
fi

say "Done!"
