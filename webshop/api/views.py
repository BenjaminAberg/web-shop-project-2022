from django.shortcuts import render
from .listings.models import Listing

# Create your views here.
def index(request):
    num_listings = Listing.objects.all().count()

    context = {'num_listings': num_listings}

    return render(request, 'index.html', context)
