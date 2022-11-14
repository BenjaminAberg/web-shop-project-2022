from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductSerializer
from .models import Product

# Create your views here.
def index(request):
    num_products = Product.objects.all().count()

    context = {'num_products': num_products}

    return render(request, 'index.html', context)

class ViewProductsView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class AddProductsView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer