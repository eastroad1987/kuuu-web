FROM mysql:8.0.38

# 환경 변수 설정
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=kuuu_db
ENV MYSQL_USER=kuuu
ENV MYSQL_PASSWORD=kurumi0963

# SQL 초기화 스크립트를 복사
COPY init.sql /docker-entrypoint-initdb.d/

# 포트 노출
EXPOSE 3306