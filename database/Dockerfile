FROM --platform=linux/x86_64 mysql:8.0

COPY ./tables/* /docker-entrypoint-initdb.d/
COPY ./sproc/* /docker-entrypoint-initdb.d/