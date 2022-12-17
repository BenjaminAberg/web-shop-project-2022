from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from ..listings.models import Listing
from ..listings.serializers import ListingSerializer
from django.http import HttpResponse

class HandlePaymentApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, listing_id):
        
        listing = Listing.objects.get(id=listing_id)
        data = {'title': listing.title, 'description': listing.description, 'price': listing.price}
        serializer = ListingSerializer(listing, data=data)
        
        if not listing.sold and serializer.is_valid():
            serializer.validated_data['buyer'] = self.request.user
            serializer.validated_data['sold'] = 1
            serializer.save()
            return HttpResponse("Listing " + str(listing_id) + " purchased by " + str(self.request.user))
        else:
            return HttpResponse("Listing " + str(listing_id) + " already sold.")