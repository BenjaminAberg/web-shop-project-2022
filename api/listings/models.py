from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User

# Create your models here.

validate_price = RegexValidator('^[-,0-9]+€', 'Only numbers and commas allowed.')

class Listing(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    sold = models.BooleanField(default=False)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


    def price_float(self):
        return float(self.price)