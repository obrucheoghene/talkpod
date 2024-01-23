#!/usr/bin/env bash

set -e

echo "Running talkpod-client:lastest docker image"

docker run -d \
    -p 4173:4173 \
    -e VITE_REACT_APP_SERVER_BASE_URL= \
    talkpod-client:latest
