# LAMP setup on Debian
_Note: due for review material may be dated_

Make sure to do the [Debian Base Configuration](https://github.com/Renrek/notes/blob/53442a63853252db4fd410f6985419578d15d8b3/Debian/debian-base-configuration.md#L22) first.

## Install base packages
```shell
sudo apt install apache2
sudo apt install mariadb-server
sudo mysql_secure_installation
sudo apt install php libapache2-mod-php php-mysql
sudo nano /etc/apache2/mods-enabled/dir.conf
```
Match file configuration to as follows:
```vim
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```

```shell
sudo a2enmod rewrite
sudo systemctl reload apache2
sudo systemctl status apache2
sudo mkdir /var/www/website.com
cd /etc/apache2/sites-available/
nano renrek.com.conf
```

### Current Configuration
```Apache config
<VirtualHost *:80>
    ServerName renrek.com
    ServerAlias www.renrek.com
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/renrek.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### Alt configuration for up for review
```Apache config
<VirtualHost *:80>
    ServerAdmin example@me.com
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com/public

    <Directory /var/www/example.com>
        AllowOverride all
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/example.com_error.log
    CustomLog ${APACHE_LOG_DIR}/example.com_access.log combined

</VirtualHost>
```
### Enable new virutal host
```shell
sudo a2ensite renrek.com
sudo a2dissite 000-default
```

## Wrap up
Open up ports:
```shell
ufw allow 80
```

Test configuration and reload apache2 process
```shell
sudo apache2ctl configtest
sudo systemctl reload apache2
```















