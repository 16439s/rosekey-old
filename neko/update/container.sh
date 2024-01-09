#!/bin/sh
set -eu

. neko/update/utils

pull() {
  say 'Pulling the image...'
  run "$1 pull registry.code.naskya.net/naskya/firefish"
}

if ! pull "$1"; then
  sadsay 'awawa, the image may not be compatible with your environment...'
  say 'Gonnya try building the image locally!'

  say 'It takes some time! Why not brew a cup of cofe?'
  run "$(cat - << EOC
$1 build --tag registry.code.naskya.net/naskya/firefish --build-arg VERSION="$(version)" .
EOC
  )"
fi

say 'Done!'
