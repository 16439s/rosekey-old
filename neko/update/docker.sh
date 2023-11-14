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
  docker build --tag docker.io/naskya/firefish --build-arg VERSION="$(version)" .
fi

say "Done!"
