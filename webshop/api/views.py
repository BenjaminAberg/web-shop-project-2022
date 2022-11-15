from django.shortcuts import render
from .product.models import Product

# Create your views here.
def index(request):
    num_products = Product.objects.all().count()

    context = {'num_products': num_products}

    return render(request, 'index.html', context)
