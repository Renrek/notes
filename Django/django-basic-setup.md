# Django Basic Setup
Note: based on tutorial from Django's site, condensed personal notes

creates a project called "base" used as a template for other works.

#### Create work space
create a temperaary virtual environment to create tidy package this is due to the the venv file not moving nice.

##### Creation
1. `python -m venv venv`
1. `source venv/Scripts/activate`
1. `pip install Django`
1. `django-admin startproject base`
1. `pip freeze > requirements.txt`
1. `mv requirements.txt base`
1. `deacivate`
1. `rmdir -R venv`

##### Development
1. `python -m venv venv`
1. `source venv/Scripts/activate`
1. `pip install -r requirements.txt`
1. `code .`

----
### Add the ability to read environmentals
`pip install django-environ`

##### base > settings.py

```python
import environ

# Initialise environment variables goes after BASE_DIR declaration
env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')
```
pip freeze > requirements.txt

#### .env
```ini
DEBUG=True
SECRET_KEY=

DATABASE_NAME=mysql
DATABASE_USER=alice
DATABASE_PASS=supersecretpassword

GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
GOOGLE_KEY=
```
Note: Create at root of directory

##### Edit settings.py
```python
SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')
```
----
### Change Timezone
```python
TIME_ZONE = 'America/Chicago'
```
----
### Install allauth

`pip install django-allauth`

[Allauth Docs](https://django-allauth.readthedocs.io/en/latest/installation.html)

##### Add to settings.py
```python
EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend' # Non production!

ACCOUNT_AUTHENTICATION_METHOD = 'email' 
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = 'mandatory' 

AUTHENTICATION_BACKENDS = [
    ...
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
    ...
]

INSTALLED_APPS = [
    # Site apps
    
    # Core apps - came with install
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Used for allauth
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

SITE_ID = 1

# Provider specific settings
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        'APP': {
            'client_id': env('GOOGLE_CLIENT_ID'),
            'secret': env('GOOGLE_SECRET'),
            'key': env('GOOGLE_KEY')
        }
    }
}
```
##### base > urls.py
```python
urlpatterns = [
    # Add this path
    path('accounts/', include('allauth.urls')),
]
```
1. `pip freeze > requirements.txt`
1. `python manage.py migrate`



## Running Dev Server
```shell
python manage.py runserver 8080
```

## Create App


```shell
python manage.py startapp nameofapp
```


nameofapp/views.py
```python
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the nameofapp's index.")
```


#### Create File

```shell
touch nameofapp/urls.py
```


nameofapp/urls.py
```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```


nameofproject/urls.py
```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('nameofapp/', include('nameofapp.urls')),
    path('admin/', admin.site.urls),
]
```

## Database ORM

#### Initial migration
If you are using the user feature, it will install a user table.
```shell
python manage.py migrate
```
#### Create admin user
```shell
python manage.py createsuperuser
```

nameofapp/models.py
```python
import datetime

from django.db import models
from django.utils import timezone

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text
```

#### activate models 
mysite/setting.py
```python
INSTALLED_APPS = [
    'nameofapp.apps.nameofappConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```


```python
python manage.py makemigrations nameofapp
python manage.py migrate
```






#### Notes of mention
```python
python -c "import django; print(django.__path__)"
```
```python
python manage.py shell
```
checks for migrate issues

```python
python manage.py check
```
#shows sql code
```shell
python manage.py sqlmigrate polls 0001
```

Show package location:`python -c "import django; print(django.__path__)"`