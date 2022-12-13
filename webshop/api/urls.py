from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_view
from .views import index
from .listings.views import ListListingsApi, AddListingApi, DeleteListingApi, EditListingApi, ListOwnItemsApi
from .accounts.views import RegisterApiView, LoginApiView, GetUserView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', TemplateView.as_view(template_name="home.html")),
    path('shop/', TemplateView.as_view(template_name="index.html")),
    path('listings/', ListListingsApi.as_view(), name="viewlistings"),
    path('account/', GetUserView.as_view()),
    path('myitems/', ListOwnItemsApi.as_view()),
    path('myitems/addlisting/', AddListingApi.as_view(), name="addlisting"),
    path('myitems/deletelisting/<int:listing_id>', DeleteListingApi.as_view(), name="deletelisting"),
    path('myitems/editlisting/<int:listing_id>', EditListingApi.as_view(), name="editlisting"),
    path('signup/', RegisterApiView.as_view()),
    path('login/', obtain_auth_token)
]