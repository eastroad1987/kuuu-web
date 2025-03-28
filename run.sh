#!/bin/bash

# 스크립트 실패 시 즉시 중단
set -e

# 변수 설정
IMAGE_NAME="kuuu-web-image-prod"
CONTAINER_NAME="kuuu-web-container-prod"
NETWORK_NAME="kuuu-network-prod"
PORT=3000  # 필요한 포트로 변경하세요

# 이전 컨테이너 중지 및 삭제
echo "Cleaning up old container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 도커 이미지 빌드
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# 새 컨테이너 실행
echo "Starting container..."
docker run -d \
    --name $CONTAINER_NAME \
    --network $NETWORK_NAME \
    -p $PORT:$PORT \
    $IMAGE_NAME

echo "Container is running!"