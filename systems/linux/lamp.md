sudo apt install apache2

sudo apt install mariadb-server

sudo mysql_secure_installation

sudo apt install php libapache2-mod-php php-mysql

sudo nano /etc/apache2/mods-enabled/dir.conf

<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>

sudo a2enmod rewrite

sudo systemctl reload apache2

sudo systemctl status apache2

sudo mkdir /var/www/renrek.com

cd /etc/apache2/sites-available/

nano renrek.com.conf

<VirtualHost *:80>
    ServerName renrek.com
    ServerAlias www.renrek.com
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/renrek.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

sudo a2ensite renrek.com

sudo a2dissite 000-default


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

sudo apache2ctl configtest

sudo systemctl reload apache2