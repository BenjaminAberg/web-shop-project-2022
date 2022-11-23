from django.shortcuts import render, reverse
from .serializers import ListingSerializer
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from django.views import View
from .models import Listing
from .forms import CreateListingForm
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

# WIP IMPLEMENT PAGINATION!!

class CardSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 10

class AddListingView(View):
    def get(self, request):
        form = CreateListingForm()
        return render(request, 'create_listing_form.html', {"form": form})

    def post(self, request):
        form = CreateListingForm(request.POST)

        if form.is_valid():
            cd = form.cleaned_data
            title = cd['title']
            description = cd['description']
            price = cd['price']

            listing = Listing(title=title, description=description, price=price)
            listing.save()
            return HttpResponseRedirect(reverse("viewlistings"))

        return render(request, 'create_listing_form.html', {'form': form})

def view_listings(request):
    listings = Listing.objects.all()
    return render(request, "view_listings.html", {"listings": listings})

def delete_listing(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    listing.delete()
    return HttpResponse("Listing " + str(listing_id) + " deleted.")