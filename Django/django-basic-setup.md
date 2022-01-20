# Django Basic Setup
Note: based on tutorial from Django's site, condensed personal notes

## Setup Virtual Environment
```shell
python -m venv venv
. venv/Scripts/activate


```
`pip freeze >> requirements.txt` will create a list of installed packages

`pip install -r requirements.txt` will install from the requirements.txt

## Installation
 - This is the recommended way to install Django.
```shell
python -m pip install Django
```

 - Version check
```shell
python -m django --version
```

## Create project
```shell
django-admin startproject nameofproject
cd nameofproject
code .
```

## Running Dev Server
```shell
python manage.py runserver 8080
```
## Edit Settings
nameofproject/settings.py
```python
TIME_ZONE = 'America/Chicago'
```

## Create App
 - Creates a boiler plate directory 

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