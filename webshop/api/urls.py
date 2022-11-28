from django.urls import path
from .views import index
from .listings.views import view_listings, AddListingView, delete_listing, ListingListPageAPI
from .accounts.views import RegisterUser
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', index),
    #path('listings', view_listings, name="viewlistings"),
    path('listings', ListingListPageAPI.as_view(), name="viewlistings"),
    path('addlisting', AddListingView.as_view(), name="addlisting"),
    path('deletelisting/<int:listing_id>', delete_listing, name="deletelisting"),
    path('signup/', RegisterUser.as_view()),
    path('login/', TokenObtainPairView.as_view())
]