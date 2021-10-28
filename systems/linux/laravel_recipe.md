
sudo apt update
ufw allow 80
sudo apt install apache2

sudo apt install wget lsb-release apt-transport-https ca-certificates
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sudo echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php7.3.list

sudo apt install php7.3

php -v

sudo apt install php7.3-cli php7.3-fpm php7.3-json php7.3-pdo php7.3-mysql php7.3-zip php7.3-gd  php7.3-mbstring php7.3-curl php7.3-xml php7.3-bcmath php7.3-json php7.3-zip

sudo apt install mariadb-server mariadb-client

sudo mysql_secure_installation


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



sudo a2enmod rewrite proxy_fcgi setenvif
sudo a2enconf php7.3-fpm


sudo apt install git

cd /var/www/renrek.com



sudo apt install wget php-cli php-zip unzip

cd ~ && wget -O composer-setup.php https://getcomposer.org/installer

sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

sudo composer self-update

source ~/.bashrc
sudo chown -R brad:www-data /var/www
cd /var/www

composer create-project --prefer-dist laravel/laravel blog

find /var/www/renrek.com/ -type f -exec chmod 664 {} \;    
find /var/www/renrek.com/ -type d -exec chmod 775 {} \;
sudo chown -R brad:www-data /var/www/renrek.com/
cd /var/www/renrek.com
chgrp -R www-data storage bootstrap/cache && chmod -R ug+rwx storage bootstrap/cache

composer update

sudo a2ensite renrek.com && sudo a2dissite 000-default

sudo service apache2 restart

sudo apt install npm

npm install
npm run dev??




