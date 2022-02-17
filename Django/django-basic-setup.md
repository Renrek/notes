# Django Basic Setup
*Tested with Django v4 on 2/16/22*

Recipe to create a template for personal projects

### Features
- Bootstrap 5
- JQuery
- .env ready
- Simple email login
- No registration available

### File Creation
1. `mkdir django-template`
1. `cd django-template`
1. `python -m venv venv`
1. `source venv/Scripts/activate`
1. `pip install Django`
1. `django-admin startproject base`
1. `pip install django-environ`
1. Manually move files within the base directory to root directory, the overwrite of base is intentional
1. `python manage.py startapp core`
1. `mkdir templates static`
1. `mkdir static/css static/img static/js`
1. `touch static/css/main.css static/img/.keep static/js/.keep .gitignore`
1. `mkdir core/templates core/templates/core core/templates/registration`
1. `touch core/urls.py core/signals.py core/templates/core/index.html README.md`
1. `touch core/templates/core/profile.html core/templates/registration/login.html .env_template`
1. `touch templates/footer.html templates/main.html templates/messages.html templates/navbar.html`
1. `code .`



### Copy into the appropriate files
.gitignore
```text
venv
__pycache__
*.pyc
*.sqlite3
.env
```

base/settings.py

```python
from django.contrib.messages import constants as messages
import environ

# Initialise environment variables goes after BASE_DIR declaration
env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')

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

INSTALLED_APPS = [
    # Core apps - came with install
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Site apps
    'core.apps.CoreConfig',
]

AUTH_USER_MODEL = 'core.User'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

TIME_ZONE = 'America/Chicago'

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
    {% include 'navbar.html' %}
    {% include 'messages.html' %}
    {% block content %}
    <!-- Things go here -->
    {% endblock content %}
    {% include 'footer.html' %}
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</body>
</html>
```

templates/footer.html
```html
<div class="container">
    <div class="row justify-content-center">
        &copy; Copyright 
        <script>document.write(new Date().getFullYear())</script>
        Stuff goes here
    </div>
</div>
```

templates/messages.html
```html
<div class="container my-2">
  {% if messages %}
  {% for message in messages %}
  <div class="container-fluid p-0">
    <div class="alert {{ message.tags }}" role="alert" >
      {{ message }}
    </div>
  </div>
  {% endfor %}
  {% endif %}
</div>
```

templates/navbar.html
```html
<div class="bg-dark">
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">LOGO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a href="{% url 'home' %}" class="nav-link">Home</a>
            </li>
            {% if not user.is_authenticated%}
            <li class="nav-item">
              <a href="{% url 'login' %}" class="nav-link">Login</a>
            </li>
            {% else %}
            <li class="nav-item">
              <a href="{% url 'logout' %}" class="nav-link">Log Out</a>
            </li>
            {% endif %}
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
```

.env_template
```env
DEBUG=True
SECRET_KEY=replace_me_with_something_long_and_randomized
```

core/views.py
```python
from django.shortcuts import render
from django.contrib import messages

def home(request):
    messages.info(request, "Message example change me in core/views.py")
    context = {}
    return render(request, 'core/index.html', context)

def profile(request):
    context = {}
    return render(request, 'core/profile.html', context)
```


core/templates/core/index.html
```html
{% extends 'main.html' %}
{% load static %}
{% block title %}Home{% endblock %}
{% block content %}
    <div class="container">
        <h1>Home</h1>
        <p>{{ user.email }}</p>
    </div>
{% endblock content %}
```
core/templates/core/profile.html
```html
{% extends 'main.html' %}
{% load static %}
{% block title %}Profile{% endblock %}
{% block content %}
    <p>profile</p>
    <div>
        {% if request.user.is_authenticated %}
        <p>Hello {{ request.user }}</p>
        {% endif %}
    </div>
{% endblock content %}
```

core/templates/registration/login.html
```html
{% extends 'main.html' %}
{% load static %}
{% block title %}Login{% endblock %}
{% block content %}
<div class="container">
    {% if form.errors %}
    <p>Your username and password didn't match. Please try again.</p>
    {% endif %}

    {% if next %}
        {% if user.is_authenticated %}
        <p>Your account doesn't have access to this page. To proceed,
        please login with an account that has access.</p>
        {% else %}
        <p>Please login to see this page.</p>
        {% endif %}
    {% endif %}

    <form method="post" action="{% url 'login' %}">
    {% csrf_token %}
    {{ form.as_p}}

    <input type="submit" value="login">
    <input type="hidden" name="next" value="{{ next }}">
    </form>

    {# Assumes you set up the password_reset view in your URLconf #}
    <p><a href="{% url 'password_reset' %}">Lost password?</a></p>
</div>
{% endblock %}
```
core/urls.py
```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('accounts/profile/', views.profile, name="profile"),
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
    path('accounts/', include('django.contrib.auth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```


core/signals.py
```python
from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.dispatch import receiver
from django.contrib import messages

@receiver(user_logged_in)
def sig_user_logged_in(sender, user, request, **kwargs):
    messages.info(request, "You have successfully logged in")

@receiver(user_logged_out)
def sig_user_logged_out(sender, user, request, **kwargs):
    messages.info(request, "You have logged out")

@receiver(user_login_failed)
def sig_user_login_failed(sender, credentials, request, **kwargs):
    messages.error(request, "Failed to login")
```

core/models.py
```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    fav_beer = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'username', ]
    EMAIL_FIELD = 'email'
```

core/admin.py
```python
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
```

core/apps.py
```python
from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        import core.signals

```

README.md
```text
# Django Setup

[Recommended Tutorial](https://www.djangoproject.com/start/)

### Base Requirements
 - Python 3
 - pip

### Features
- Bootstrap 5
- JQuery
- .env ready
- Simple email login
- No registration available

### Directions

1. Clone repo
1. `cd django-template`
1. `python -m venv venv`
1. `source  venv/Scripts/activate`
1. `cp .env_template .env`
1. `python manage.py makemigrations`
1. `python manage.py migrate`
1. `python manage.py createsuperuser`
1. `python manage.py runserver`
1. `code .`

### File Layout
- core/ - for base pages such as home, login, about etc
- templates/ - base files for constructing other html files, has boiler-plate html, note that app and core have their own template folders
- static/ - place to put css, images and javascript files
```

### Wrap up
1. `pip freeze > requirements.txt`
1. `git init`
1. `git add .`
1. `git commit -m "initial commit"`


### Prepare for Development
1. `cp .env_template .env`
1. `python manage.py makemigrations`
1. `python manage.py migrate`
1. `python manage.py createsuperuser`
1. `python manage.py runserver`
1. `code .`