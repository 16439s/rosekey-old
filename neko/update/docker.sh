#!/bin/sh
set -eu

. neko/update/utils

pull() {
  say 'Pulling the image...'
  run 'docker pull docker.io/naskya/firefish'
}

if ! pull; then
  say 'awawa, the image may not be compatible with your environment...'
  say 'Gonnya try building the image locally!'

  say 'It takes some time! Why not brew a cup of cofe?'
  run "$(cat - << EOC
docker build --tag docker.io/naskya/firefish --build-arg VERSION="$(version)" .
EOC
  )"
fi

say 'Done!'
