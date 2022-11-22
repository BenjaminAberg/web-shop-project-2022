from django.db import models
from django.core.validators import MaxLengthValidator, RegexValidator

# Create your models here.

validate_price = RegexValidator('^[-,0-9]+€', 'Only numbers and commas allowed.')

class Listing(models.Model):
    #slug = models.SlugField(max_length=10, unique=True, editable=False)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def price_float(self):
        return float(self.price)