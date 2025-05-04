FROM postgres:latest

# 환경변수 설정
ENV POSTGRES_DB=kuuu_db
ENV POSTGRES_USER=kuuu
ENV POSTGRES_PASSWORD=kurumi0963

# 초기화 스크립트 복사
COPY init.sql /docker-entrypoint-initdb.d/

# 포트 설정
EXPOSE 9696

EXPOSE 5432