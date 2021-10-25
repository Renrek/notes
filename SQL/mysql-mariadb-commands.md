# MariaDB and MySQL Commands

#### Create database
```shell
CREATE DATABASE 'databaseName';
CREATE USER 'username'@localhost IDENTIFIED BY 'password';
GRANT SELECT, DELETE, INSERT, UPDATE ON *.* TO 'username'@localhost IDENTIFIED BY 'password';

```