#!/usr/bin/env bash

set -e

echo "Docker Building talkpod-client:latest image"

docker build -t talkpod-client:latest .

echo "talkpod-client:latest image build completed"
