from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notes(models.Model):
    title=  models.CharField(max_length=200)
    description = models.CharField(max_length=100000)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title
