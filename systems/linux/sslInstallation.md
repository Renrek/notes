Install snapd
sudo apt install snapd

Ensure that your version of snapd is up to date
sudo snap install core; sudo snap refresh core

Install Certbot
sudo snap install --classic certbot

Prepare the Certbot command
sudo ln -s /snap/bin/certbot /usr/bin/certbot

Choose how you'd like to run Certbot
sudo certbot --apache

Test automatic renewal
sudo certbot renew --dry-run

sudo ufw allow 443