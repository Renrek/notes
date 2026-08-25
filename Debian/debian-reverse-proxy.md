# Apache Reverse Proxy
*Last Version tested on: Debian 13 - Trixie*

Standalone server for remote connections.

Make sure to do the [Debian Base Configuration](https://github.com/Renrek/notes/blob/53442a63853252db4fd410f6985419578d15d8b3/Debian/debian-base-configuration.md#L22) first.

## Install Apache
```shell
sudo apt update
sudo apt install apache2 python3-certbot-apache
```

## Enable required Apache modules
```shell
sudo a2enmod proxy proxy_http proxy_ajp rewrite deflate headers proxy_balancer proxy_connect proxy_html ssl
```

To view enabled modules:
```shell
apache2ctl -M
```

## Basic reverse proxy site example
Create a site config for the app you want to expose:

```shell
sudo nano /etc/apache2/sites-available/subdomain.yourdomain.com.conf
```

```apache
<VirtualHost *:80>
    ServerName subdomain.yourdomain.com
    ServerAlias www.subdomain.yourdomain.com

    ProxyPreserveHost On
    ProxyPass /.well-known !
    ProxyPass / http://10.1.1.11:80/
    ProxyPassReverse / http://10.1.1.11:80/

    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/
    RewriteRule ^ https://subdomain.yourdomain.com%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName subdomain.yourdomain.com
    ServerAlias www.subdomain.yourdomain.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/subdomain.yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/subdomain.yourdomain.com/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://10.1.1.11:80/
    ProxyPassReverse / http://10.1.1.11:80/
</VirtualHost>
```

Then enable the site:
```shell
sudo a2ensite subdomain.yourdomain.com.conf
sudo apachectl configtest
sudo systemctl reload apache2
```

## Set up SSL with Certbot
```shell
sudo certbot --apache -d subdomain.yourdomain.com -d www.subdomain.yourdomain.com
```

If you only need the root domain:
```shell
sudo certbot --apache -d subdomain.yourdomain.com
```

Check the certs and config after issuance:
```shell
sudo certbot certificates
sudo apachectl -S
curl -I http://subdomain.yourdomain.com
curl -Ik https://subdomain.yourdomain.com
```

## Renewal check
```shell
sudo certbot renew --dry-run
```

## How to add another application/site
Use this workflow each time you add a new public app behind the reverse proxy.

### 1) DNS
Create the public DNS records for the new domain before requesting a certificate.

- `A` record for `app.example.com`
- Optional `A` record for `www.app.example.com`

### 2) Create the Apache site file
```shell
sudo nano /etc/apache2/sites-available/app.example.com.conf
```

```apache
<VirtualHost *:80>
    ServerName app.example.com
    ServerAlias www.app.example.com

    ProxyPreserveHost On
    ProxyPass /.well-known !
    ProxyPass / http://172.20.2.111:80/
    ProxyPassReverse / http://172.20.2.111:80/

    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/
    RewriteRule ^ https://app.example.com%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName app.example.com
    ServerAlias www.app.example.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/app.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/app.example.com/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://172.20.2.111:80/
    ProxyPassReverse / http://172.20.2.111:80/
</VirtualHost>
```

### 3) Enable the new site
```shell
sudo a2ensite app.example.com.conf
sudo apachectl configtest
sudo systemctl reload apache2
```

### 4) Request the certificate
For root and WWW names:
```shell
sudo certbot --apache -d app.example.com -d www.app.example.com
```

For root only:
```shell
sudo certbot --apache -d app.example.com
```

### 5) Verify routing and TLS
```shell
curl -I http://app.example.com
curl -Ik https://app.example.com
curl -Ik https://www.app.example.com
```

Expected result:
- HTTP redirects to HTTPS
- HTTPS serves the app from the upstream host
- The certificate matches your requested domain(s)

## Troubleshooting

### Certbot error: NXDOMAIN for a domain
Cause:
- DNS record does not exist yet.

Fix:
- Create the DNS record and wait for propagation, then rerun certbot.
- Or request only names that already resolve.

### Site works but shows wrong content or certificate
Cause:
- Conflicting virtual hosts or wrong `ServerName` / `ServerAlias` values.

Fix:
```shell
sudo apachectl -S
sudo apachectl configtest
sudo systemctl reload apache2
```

### Certbot modified Apache config unexpectedly
Cause:
- Certbot may add SSL blocks or redirects.

Fix:
- Re-check the site file for the correct domain names.
- Keep one site file per app domain.
- Test config before reloading Apache.

## Recommended conventions
- Keep one Apache site file per app domain.
- Prefer a single canonical hostname: either root or `www`.
- Only request certs for DNS names that exist.
- Keep upstream app servers private and expose only proxy ports 80/443 publicly.

#### Wrap up
```shell
sudo systemctl restart apache2
```

<!-- load balancing
```apache
<VirtualHost *:80>
    <Proxy balancer://mycluster>
        BalancerMember http://127.0.0.1:8080
        BalancerMember http://127.0.0.1:8081
    </Proxy>

    ProxyPreserveHost On

    ProxyPass / balancer://mycluster/
    ProxyPassReverse / balancer://mycluster/
</VirtualHost>
```
-->
