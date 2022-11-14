from django.urls import path
from .views import index, ViewProductsView, AddProductsView

urlpatterns = [
    path('', index),
    path('addproducts', AddProductsView.as_view()),
    path('viewproducts', ViewProductsView.as_view())
]