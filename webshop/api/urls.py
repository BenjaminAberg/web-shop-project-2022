from django.urls import path
from django.contrib.auth import views as auth_view
from .views import index
from .listings.views import ListListingsApi, AddListingApi, DeleteListingApi
from .accounts.views import RegisterApiView, LoginApiView, GetUserView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', index),
    path('shop/', ListListingsApi.as_view(), name="viewlistings"),
    path('account/', GetUserView.as_view()),
    #path('myitems/')
    path('myitems/addlisting/', AddListingApi.as_view(), name="addlisting"),
    path('myitems/deletelisting/<int:listing_id>', DeleteListingApi.as_view(), name="deletelisting"),
    path('signup/', RegisterApiView.as_view()),
    path('login/', obtain_auth_token)
]