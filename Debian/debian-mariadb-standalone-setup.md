# MariaDB Server on Debian
*Version: Debian 11 - Bullseye*

Standalone server for remote connections.

Make sure to do the [Debian Base Configuration](https://github.com/Renrek/notes/blob/53442a63853252db4fd410f6985419578d15d8b3/Debian/debian-base-configuration.md#L22) first.

## Install base packages
```shell
sudo apt install mariadb-server
sudo mysql_secure_installation
```
| Prompt | Answer |
| ---- | ---- |
|Enter current root password | enter |
|Switch to unix_socket auth | n |
|Change root password | n |
|Remove Anon users | y |
|Disallow root remote login | y |
|Remove test databases | y |
|Reload privilege tables | y |


## Configure for remote
```shell
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```
Change `bind-address=127.0.0.1` to `bind-address=0.0.0.0`
## Wrap up
Open up ports:
```shell
ufw allow 3306
```

## Commands of note
```shell
sudo systemctl restart mariadb
sudo systemctl stop mariadb.service
sudo systemctl start mariadb.service
sudo systemctl enable mariadb.service
```
















