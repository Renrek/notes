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


```python
python manage.py makemigrations nameofapp
python manage.py migrate
```