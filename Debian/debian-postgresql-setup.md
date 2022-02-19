https://wiki.debian.org/PostgreSql

https://www.bigbinary.com/blog/configure-postgresql-to-allow-remote-connection

`apt install postgresql`

`cd /etc/postgresql/13/main`


`nano postgresql.conf`
```text
change listen_addresses = '*'
```


`nano pg_hba.conf`
```text
host    all             all              0.0.0.0/0                       md5
```
`systemctl restart postgresql`

Note: so far it all is works, needs more on security such as proper pg_hba instead of opening it to all. At the very least limiting it to local network.