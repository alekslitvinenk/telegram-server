#!/usr/bin/env bash

rm -R dist

./bump.sh "$@"

version=$(cat VERSION)
ver="v$version"

docker build -t alekslitvinenk/funnybizz:"$ver" -t alekslitvinenk/funnybizz:latest . --no-cache && \
docker push alekslitvinenk/funnybizz:"$ver"
docker push alekslitvinenk/funnybizz:latest