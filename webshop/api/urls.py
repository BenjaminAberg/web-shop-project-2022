from django.urls import path
from .views import index
from .listings.views import view_listings, AddListingView, delete_listing

urlpatterns = [
    path('', index),
    path('listings', view_listings, name="viewlistings"),
    path('addlisting', AddListingView.as_view(), name="addlisting"),
    path('deletelisting/<int:listing_id>', delete_listing, name="deletelisting")
]