#!/bin/bash

IMAGE_NAME="kuuu-db-image-prod"
CONTAINER_NAME="kuuu-db-container-prod"
VOLUME_NAME="kuuu-data"
DB_NAME="kuuu_db"
DB_USER="kuuu"
DB_PASSWORD="kurumi0963"
HOST_PORT1=9696
CONTAINER_PORT1=9696
HOST_PORT2=5432
CONTAINER_PORT2=5432
SQL_FILE="init.sql"

# Stop and remove existing container
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Create Volumn 
docker volume create kuuu_db_data

# Build image
echo "Building Docker image..."
docker build --tag $IMAGE_NAME .

# Run container
echo "Starting container..."
docker run -d \
    --name $CONTAINER_NAME \
    -e POSTGRES_DB=$DB_NAME \
    -e POSTGRES_USER=$DB_USER \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -p $HOST_PORT1:$CONTAINER_PORT1 \
    -p $HOST_PORT2:$CONTAINER_PORT2 \
    -v $VOLUME_NAME:/var/lib/postgresql/data \
    -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
    --restart unless-stopped \
    $IMAGE_NAME

echo "Waiting for database to initialize..."
sleep 10

# SQL 파일 복사 및 실행
echo "Executing SQL file..."
docker cp $SQL_FILE $CONTAINER_NAME:/tmp/

echo "Container started. To access the database, use:"
#echo "docker exec -it $CONTAINER_NAME psql -U kuuu -d kuuu_db"
#docker exec -it $CONTAINER_NAME psql -U kuuu -d kuuu_db
#docker exec -i kuuu-db-container-prod psql -U kuuu -d kuuu_db -f /tmp/init.sql
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -f /tmp/$SQL_FILE

docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -c "\dt"
