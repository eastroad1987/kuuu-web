#!/bin/bash

IMAGE_NAME="kuuu-db-image-prod"
CONTAINER_NAME="kuuu-db-container-prod"
NETWORK_NAME="kuuu-network-prod"
VOLUME_NAME="kuuu-data"
DB_NAME="kuuu_db"
DB_USER="kuuu"
DB_PASSWORD="kurumi0963"
HOST_PORT=3306
CONTAINER_PORT=3306
SQL_FILE="init.sql"

# Stop and remove existing container
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true
docker rmi $IMAGE_NAME 2>/dev/null || true

if ! docker network ls | grep -q $NETWORK_NAME; then
    log "Docker 네트워크 생성 중: $NETWORK_NAME"
    docker network create $NETWORK_NAME
fi

# Create Volume 
docker volume create $VOLUME_NAME

# Build image
echo "Building Docker image..."
docker build --tag $IMAGE_NAME .

# Run container
echo "Starting container..."
docker run -d \
    --name $CONTAINER_NAME \
    --network $NETWORK_NAME \
    -e MYSQL_DATABASE=$DB_NAME \
    -e MYSQL_USER=$DB_USER \
    -e MYSQL_PASSWORD=$DB_PASSWORD \
    -e MYSQL_ROOT_PASSWORD=$DB_PASSWORD \
    -p $HOST_PORT:$CONTAINER_PORT \
    -v $VOLUME_NAME:/var/lib/mysql \
    -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
    --restart unless-stopped \
    $IMAGE_NAME

# SQL 파일 복사 및 실행
echo "Executing SQL file..."
docker cp $SQL_FILE $CONTAINER_NAME:/tmp/

# 데이터베이스 초기화 대기
echo "Waiting for database to initialize..."
sleep 3

echo "Database is ready!"

# root 사용자로 권한 부여
echo "Granting privileges to user..."
docker exec -it $CONTAINER_NAME mysql -uroot << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME
    CHARACTER SET = 'utf8mb4'
    COLLATE = 'utf8mb4_unicode_ci';
CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

echo "Container started. To access the database, use:"
docker exec -it $CONTAINER_NAME mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME < $SQL_FILE

# 테이블 목록 확인
docker exec -it $CONTAINER_NAME mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME -e "SHOW TABLES;"