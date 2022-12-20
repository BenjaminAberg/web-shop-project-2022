from api.listings.models import Listing
from api.carts.models import Cart
from django.contrib.auth.models import User
from django.template import loader
from django.http import HttpResponse

# Create your views here.
def index(request):

    template = loader.get_template('../static/home.html')

    num_listings = Listing.objects.all().filter(sold=0).count()
    print(num_listings)

    def flushDatabase():
        User.objects.all().delete()
        Listing.objects.all().delete()
        Cart.objects.all().delete()

    context = {
        'num_listings': num_listings,
        'flushDatabase': flushDatabase
    }

    return HttpResponse(template.render(context, request))
