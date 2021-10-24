# SSL Installation OpenSSL
*Last tested on Debian 10 - Buster*

#### Install snapd
```shell
sudo apt install snapd
sudo snap install core
sudo snap refresh core
```



#### Install Certbot
```shell
sudo snap install --classic certbot
```
#### Prepare the Certbot command
```shell
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

#### Choose how you'd like to run Certbot
```shell
sudo certbot --apache
```

#### Test automatic renewal
```shell
sudo certbot renew --dry-run
```
#### Open port for SSL
```shell
sudo ufw allow 443
```