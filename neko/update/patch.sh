#!/bin/sh
set -eu

[ ! -f neko/flags/install_pgroonga ]             || mv neko/flags/install_pgroonga             neko/flags/20231128_install_pgroonga
[ ! -f neko/flags/docker_compose_rename ]        || mv neko/flags/docker_compose_rename        neko/flags/20231129_docker_compose_rename
[ ! -f neko/flags/temp_upgrade_node_to_v21 ]     || mv neko/flags/temp_upgrade_node_to_v21     neko/flags/20231229_upgrade_node_to_v21
[ ! -f neko/flags/add_volume_to_docker_compose ] || mv neko/flags/add_volume_to_docker_compose neko/flags/20240102_add_volume_to_docker_compose
