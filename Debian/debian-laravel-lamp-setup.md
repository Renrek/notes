# Laravel LAMP setup on Debian
*Version: Debian 10 - Buster*

Make sure to do the [Debian Base Configuration](https://github.com/example/notes/blob/53442a63853252db4fd410f6985419578d15d8b3/Debian/debian-base-configuration.md#L22) first.

This setup assumes that a new project is being setup on the server, then pushed to github. It is then pulled from github to be worked on, the deployed site is then updated by a git pull of the main branch. This can be automated by a cronjob as an option.


## Open html port
```shell 
sudo ufw allow 80
```
## Install base packages
```shell
sudo apt install apache2
sudo apt install mariadb-server mariadb-client
sudo mysql_secure_installation
sudo apt install php php-bcmath php-json php-mbstring php-mysql php-tokenizer php-xml php-zip libapache2-mod-php wget unzip
sudo apt install nodejs npm git
```
## Install Composer
```shell
cd ~ && wget -O composer-setup.php https://getcomposer.org/installer
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
sudo composer self-update
```

## Configure Apache

```shell
sudo nano /etc/apache2/sites-available/example.com.conf
```
```Apache config
<VirtualHost *:80>

    ServerAdmin admin@localhost
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

## Initiate New Laravel Project
```shell
sudo chown -R <username>:www-data /var/www
cd /var/www
composer create-project --prefer-dist laravel/laravel example.com
```

## Set File permissions
```shell
sudo find /var/www/example.com/ -type f -exec chmod 664 {} \;    
sudo find /var/www/example.com/ -type d -exec chmod 775 {} \;
sudo chown -R <username>:www-data /var/www/example.com/
cd /var/www/example.com
chgrp -R www-data storage bootstrap/cache && chmod -R ug+rwx storage bootstrap/cache
```

## Enable Site
```shell
sudo a2ensite example.com && sudo a2dissite 000-default
sudo service apache2 restart
```

