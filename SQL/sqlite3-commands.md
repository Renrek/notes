# SQLite3

#### Shell command to access database within a file
```shell
sqlite3 db.sqlite3
```

#### Shows tables
```shell
.tables shows tables
```

#### Describe table
```shell
.schema table_name
```
Alt 1: `pragma table_info('auth_user')`

Alt 2: `select sql from sqlite_schema where name = 'auth_user';`


#### Necessary to view info without going insane

Seriously formats the output to be more readable
```shell
.mode column
.headers on
```