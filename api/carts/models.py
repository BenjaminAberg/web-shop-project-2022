from django.db import models
from django.contrib.auth.models import User
from ..listings.models import Listing

# Create your models here.

class Cart(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    listings = models.ManyToManyField(Listing)
    created_at = models.DateTimeField(auto_now_add=True)
