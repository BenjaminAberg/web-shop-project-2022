from django.shortcuts import render
from .serializers import ProductSerializer
from rest_framework import generics
from .models import Product

# Create your views here.

class ViewProductsView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class AddProductsView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer