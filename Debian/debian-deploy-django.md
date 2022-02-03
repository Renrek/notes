# Deploy Django on Debian
*Tested debian 10, 11 and Ubuntu Server 20ish*

Make sure to do the [Debian Base Configuration](https://github.com/example/notes/blob/53442a63853252db4fd410f6985419578d15d8b3/Debian/debian-base-configuration.md#L22) first if using debian.

## Install necessary packages
```shell
apt install python3 python3-virtualenv virtualenv python3-venv python3-pip
apt install apache2 libapache2-mod-wsgi-py3
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

        DocumentRoot /var/www/html
        <Directory /var/www/html>
                AllowOverride All
                Require all granted
        </Directory>

        <Directory /var/www/django>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>

        Alias /django/static/ /var/www/django/static/
        <Directory /var/www/django/static>
                Require all granted
        </Directory>

        WSGIDaemonProcess djangoapache python-home=/var/www/django/venv python-path=/var/www/django
        WSGIProcessGroup djangoapache
        WSGIScriptAlias /django /var/www/django/wonderkow/wsgi.py

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