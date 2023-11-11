#!/usr/bin/env bash
set -eu

source neko/update/utils

pull() {
  say "Pulling the image..."
  docker pull docker.io/naskya/firefish
}

if ! pull; then
  say "awawa, the image may not be compatible with your environment..."
  say "Gonnya try building the image locally!"
  COMMIT_HASH=$(git rev-parse --short HEAD)
  docker build --tag docker.io/naskya/firefish --build-arg COMMIT="${COMMIT_HASH:0:7}" .
fi

say "Done!"
