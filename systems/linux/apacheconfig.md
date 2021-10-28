ServerName web-dev
```sh
<VirtualHost *:80>
    UseCanonicalName Off
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/renrek.com/public
</VirtualHost>

<VirtualHost *:443>
    SSLEngine on
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/renrek.com/public
</VirtualHost>

<Directory /var/www/renrek.com/public>
    RewriteEngine On
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]

    Options +FollowSymlinks
    DirectoryIndex index.php
    AllowOverride none
    Require all granted
</Directory>
```