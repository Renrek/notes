# Create a mariadb container

#### Create a docker file

```Dockerfile
FROM mariadb
COPY ./calorie_control.sql .
ENV MARIADB_DATABASE=calorie_control
ENV MARIADB_USER=brad
ENV MARIADB_PASSWORD=not4u2no
```

```shell
/docker-entrypoint-initdb.d

docker build -t mariadb-calorie .

docker run -p 3306:3306  --name calorie-control-mariadb -e MARIADB_ROOT_PASSWORD=superSecret -d mariadb-calorie:latest
mysql -u username -p database_name < file.sql
docker run -p 127.0.0.1:3306:3306  --name calorie-control-mariadb -e MARIADB_ROOT_PASSWORD=superSecret -d mariadb-calorie:latest
```