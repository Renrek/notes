sudo -u postgres psql
create database my_database;
create user my_username with encrypted password 'my_password';
grant all privileges on database my_database to my_username;

\i filename

psql -h localhost -U postgres -d postdata -f D:\Backup\database.sql