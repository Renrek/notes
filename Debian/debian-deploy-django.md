# Deploy Django on Debian
*Tested debian 10, 11 and Ubuntu Server 20ish*

Make sure to do the [Debian Base Configuration](https://github.com/renrek/notes/blob/main/Debian/debian-base-configuration.md) first if using debian.

## Install necessary packages
```shell
apt install python3 python3-virtualenv virtualenv python3-venv python3-pip
apt install apache2 libapache2-mod-wsgi-py3 mysql-server
apt install python3-dev default-libmysqlclient-dev build-essential
```

## Create Database and Grant access
```sql
CREATE USER 'django'@localhost IDENTIFIED BY 'my_super_secure_password';
GRANT CREATE, ALTER, INDEX, SELECT, UPDATE, INSERT, DELETE, REFERENCES ON db.* TO django@localhost;
```

## Copy files over
```shell
virtualenv -p python3 venv
source venv/bin/activate
pip list
pip install -r requirements.txt
deactivate
```
## Configure Apache2
```shell
sudo nano /etc/apache2/sites-available/example.com.conf
```

```Apache config
<VirtualHost *:80>
        ServerAdmin webmaster@localhost

        DocumentRoot /var/www/django

        <Directory /var/www/django>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>

        Alias /static/ /var/www/django/static/
        <Directory /var/www/django/static>
                Require all granted
        </Directory>

        WSGIDaemonProcess djangoapache python-home=/var/www/django/venv python-path=/var/www/django
        WSGIProcessGroup djangoapache
        WSGIScriptAlias / /var/www/django/base/wsgi.py

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Enable Site
```shell
a2ensite example.com
a2dissite 000-default
apachectl configtest
systemclt reload apache2
```

edit settings.py 


```python
STATIC_ROOT = "/var/www/django/static/"
STATIC_URL = 'static/'

STATICFILES_DIRS = [
#    BASE_DIR / 'static',
]
```

python3 manage.py collectstatic

a2enmod wsgi

apache2ctl -M