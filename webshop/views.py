from api.listings.models import Listing
from api.carts.models import Cart
from .flush import populate_db
from django.contrib.auth.models import User
from django.template import loader
from django.http import HttpResponse

# Create your views here.
def index(request):

    template = loader.get_template('../static/home.html')

    num_listings = Listing.objects.all().filter(sold=0).count()

    context = {
        'num_listings': num_listings
    }

    return HttpResponse(template.render(context, request))

def flushDatabase(request):
    User.objects.all().delete()
    Listing.objects.all().delete()
    Cart.objects.all().delete()

    response = populate_db.register_users()

    template = loader.get_template('../static/home.html')
    num_listings = Listing.objects.all().filter(sold=0).count()

    context = {
        'num_listings': num_listings,
        'response': response
    }

    return HttpResponse(template.render(context, request))
