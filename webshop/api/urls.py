from django.urls import path
from .views import index
from .product.views import ViewProductsView

urlpatterns = [
    path('', index),
    path('products', ViewProductsView.as_view())
]