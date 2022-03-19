# MariaDB Server on Debian
*Version: Debian 11 - Bullseye*

Standalone server for remote connections.

Make sure to do the [Debian Base Configuration](https://github.com/Renrek/notes/blob/53442a63853252db4fd410f6985419578d15d8b3/Debian/debian-base-configuration.md#L22) first.

#### Install base packages
```shell
sudo apt install apache2
```
#### Enable Apache Modules
```shell
sudo a2enmod proxy proxy_http proxy_ajp rewrite deflate headers proxy_balancer proxy_connect proxy_html
```

#### Enable Apache Modules
```shell
sudo nano /etc/apache2/sites-available/subdomain.yourdomain.com.conf
```
```
<VirtualHost *:80>
    ServerName subdomain.yourdomain.com
    ProxyPreserveHost On 
    DocumentRoot /var/www/html
    ProxyPass /.well-known !
    ProxyPass / http://10.1.1.11:80/
    ProxyPassReverse / http://10.1.1.11:80/
</VirtualHost>
```
#### Set up SSL
```shell
sudo apt install python3-certbot-apache
```
```shell
sudo letsencrypt --apache
```
#### Wrap up
```
service apache2 restart
```

<!-- load balancing
```
<VirtualHost *:80>
    <Proxy balancer://mycluster>
        BalancerMember http://127.0.0.1:8080
        BalancerMember http://127.0.0.1:8081
    </Proxy>

    ProxyPreserveHost On

    ProxyPass / balancer://mycluster/
    ProxyPassReverse / balancer://mycluster/
</VirtualHost>
``` -->


To view modules: `apache2ctl -M`