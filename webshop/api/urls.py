from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_view
from .views import index
from .listings.views import ListListingsApi, AddListingApi, DeleteListingApi, EditListingApi, ListOwnItemsApi, SearchListingsApi
from .carts.views import HandlePaymentApi, AddToCartApi
from .accounts.views import RegisterApiView, LoginApiView, GetUserView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('listings/', ListListingsApi.as_view(), name="viewlistings"),
    path('account/', GetUserView.as_view()),
    path('search/<str:search_term>', SearchListingsApi.as_view()),
    path('myitems/', ListOwnItemsApi.as_view()),
    path('myitems/addlisting/', AddListingApi.as_view(), name="addlisting"),
    path('myitems/deletelisting/<int:listing_id>', DeleteListingApi.as_view(), name="deletelisting"),
    path('myitems/editlisting/<int:listing_id>', EditListingApi.as_view(), name="editlisting"),
    path('signup/', RegisterApiView.as_view()),
    path('login/', obtain_auth_token),
    path('cart/addtocart/<int:listing_id>', AddToCartApi.as_view()),
    path('cart/purchase/<int:listing_id>', HandlePaymentApi.as_view())
]