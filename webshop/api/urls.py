from django.urls import path
from .views import index
from .listings.views import view_listings, AddListingView, delete_listing, ListingListPageAPI
from .accounts.views import RegisterApiView, LoginApiView, GetUserView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', index),
    #path('listings', view_listings, name="viewlistings"),
    path('shop/', ListingListPageAPI.as_view(), name="viewlistings"),
    path('account/', GetUserView.as_view()),
    #path('myitems/')
    path('myitems/addlisting/', AddListingView.as_view(), name="addlisting"),
    path('myitems/deletelisting/<int:listing_id>', delete_listing, name="deletelisting"),
    path('signup/', RegisterApiView.as_view()),
    path('login/', LoginApiView.as_view())
]