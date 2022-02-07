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
### Base Files

1. `mkdir templates`
1. `mkdir static`
1. `mkdir static/css static/img static/js`
1. `touch static/css/main.css static/img/.keep static/js/.keep`
1. `touch templates/footer.html templates/main.html templates/messages.html templates/navbar.html`

base/settings.py

```python
from django.contrib.messages import constants as messages

TEMPLATES = [
    {
        # Add this line to templates
        'DIRS': [ BASE_DIR / 'templates' ],
        
    },
]

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / 'static' # Comment out this line for production then run static command
]

MEDIA_URL = 'media/'

MEDIA_ROOT = BASE_DIR / 'media'

# Configured for bootstrap classes
MESSAGE_TAGS = {
        messages.DEBUG: 'alert-secondary',
        messages.INFO: 'alert-info',
        messages.SUCCESS: 'alert-success',
        messages.WARNING: 'alert-warning',
        messages.ERROR: 'alert-danger',
}
```

templates/main.html
```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{% endblock title%}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="{% static 'css/main.css' %}">
</head>
<body>
    <div class="navigation">
        {% include 'navbar.html' %}
    </div>
    <div class="center">
        {% include 'messages.html' %}
        {% block content %}
        <!-- Things go here -->
        {% endblock content %}
    </div>
    {% include 'footer.html' %}
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</body>
</html>
```

templates/footer.html
```html
<div class="center">
    <hr>
    <div class="container">
        <div class="row justify-content-center">
            &copy; Copyright 
            <script>document.write(new Date().getFullYear())</script>
           Stuff goes here
        </div>
    </div>
</div>
```

templates/messages.html
```html
{% if messages %}
{% for message in messages %}
<div class="container-fluid p-0">
  <div class="alert {{ message.tags }}" role="alert" >
    {{ message }}
  </div>
</div>
{% endfor %}
{% endif %}
```

templates/navbar.html
```html
{% load account %}
<div class="center">
    <div class="container">
        <div class="row justify-content-between">
            <div class="col-4">
                <h2>Logo HERE</h2>
            </div>
            <div class="col-8">
                <nav class="navbar navbar-expand-md">
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <a href="{% url 'home' %}" class="nav-link">Home</a>
                        </li>
                        
                        {% if request.user.is_authenticated %}
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'account_logout' %}">Sign Out</a>
                        </li>
                        {% else %}
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'account_login' %}">Login</a>
                        </li>
                        {% endif %}
                    </ul>
                </nav>   
            </div>
        </div>
    </div>
</div>
```
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
```env
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
from django.urls import path, include

urlpatterns = [
    # Add this path
    path('accounts/', include('allauth.urls')),
]
```
1. `pip freeze > requirements.txt`
1. `python manage.py migrate`


## Create Core pages

Core pages are for basic pages such as about us, home, etc

```shell
python manage.py startapp core
```


core/views.py
```python
from django.shortcuts import render
from django.contrib import messages

def home(request):
    messages.info(request, "Message example")
    context = {}
    return render(request, 'core/index.html', context)

def dashboard(request):
    context = {}
    return render(request, 'core/dashboard.html', context)
```


#### Create File

1. `mdir core/templates core/templates/core core/templates/account core/templates/socialaccount`
1. `touch core/urls.py core/templates/core/index.html core/templates/core/dashboard.html`


##### core/templates/core/index.html
```html
{% extends 'main.html' %}
{% load static %}

{% block title %} - Home{% endblock %}
{% block content %}
    <h1>Home</h1>

    <div style="margin:auto; width: 321px;">
        The following links are just examples of how to access account pieces.
        <a class="nav-link" href="{% url 'account_signup' %}">Sign up</a>
        <a class="nav-link" href="{% url 'socialaccount_connections' %}">connect</a>
    </div>
{% endblock content %}
```
##### core/templates/core/dashboard.html
```html
<!-- TODO Move dashboard to app -->
{% extends 'main.html' %}
{% load static %}
{% block title %} - Dashboard{% endblock %}
{% block content %}
    <p>dashboard</p>
    <div>
        {% if request.user.is_authenticated %}
        <p>Hello {{ request.user }}</p>
        {% endif %}
    </div>
{% endblock content %}
```

core/urls.py
```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('accounts/profile/', views.dashboard, name="dashboard"),
]
```


base/urls.py
```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('accounts/', include('allauth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```


mysite/setting.py
```python
INSTALLED_APPS = [
    # Site apps
    'core.apps.CoreConfig',

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
```

## Running Dev Server
```shell
python manage.py runserver
```