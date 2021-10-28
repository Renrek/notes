sudo apt update
sudo ufw allow 80
sudo apt install apache2

sudo apt install mariadb-server mariadb-client

sudo mysql_secure_installation

sudo apt install php php-bcmath php-json php-mbstring php-mysql php-tokenizer php-xml php-zip libapache2-mod-php wget unzip

cd ~ && wget -O composer-setup.php https://getcomposer.org/installer

sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

sudo composer self-update

sudo nano /etc/apache2/sites-available/renrek.com.conf

<VirtualHost *:80>

ServerAdmin admin@localhost
ServerName renrek.com
ServerAlias www.renrek.com
DocumentRoot /var/www/renrek.com/public

<Directory /var/www/renrek.com>
    AllowOverride all
    Require all granted
</Directory>

ErrorLog ${APACHE_LOG_DIR}/renrek.com_error.log
CustomLog ${APACHE_LOG_DIR}/renrek.com_access.log combined

</VirtualHost>

sudo chown -R brad:www-data /var/www
cd /var/www

composer create-project --prefer-dist laravel/laravel renrek.com

sudo find /var/www/renrek.com/ -type f -exec chmod 664 {} \;    
sudo find /var/www/renrek.com/ -type d -exec chmod 775 {} \;
sudo chown -R brad:www-data /var/www/renrek.com/
cd /var/www/renrek.com
chgrp -R www-data storage bootstrap/cache && chmod -R ug+rwx storage bootstrap/cache

sudo a2ensite renrek.com && sudo a2dissite 000-default

sudo service apache2 restart

sudo apt install npm git

git init
git add .
git commit -m "Initial Commit"

