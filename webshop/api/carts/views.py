from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from ..listings.models import Listing
from ..listings.serializers import ListingSerializer
from .serializers import CartSerializer
from .models import Cart
from django.http import HttpResponse

class AddToCartApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, listing_id):

        try:
            cart = Cart.objects.get(owner=self.request.user)
            listing = Listing.objects.get(id=listing_id)

            if not listing.owner == cart.owner:
                cart.listings.add(listing)
                return HttpResponse("Listing " + str(listing_id) + " successfully added to cart owner" + str(cart.owner))
            
            else:
                return HttpResponse("Listing cannot be bought by its owner.")
        
        except:
            serializer = CartSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.validated_data['owner'] = self.request.user
                serializer.save()
                cart = Cart.objects.get(owner=self.request.user)
                listing = Listing.objects.get(id=listing_id)
                cart.listings.add(listing)
                return HttpResponse("New cart created. Listing " + str(listing_id) + " successfully added to cart owner " + str(cart.owner))
            
            else:
                return HttpResponse("Failed to create cart: " + str(serializer.errors, status=400))

class RemoveFromCartApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def delete(self, request, listing_id):
        
        try:
            listing = Listing.objects.get(id=listing_id)
            cart = Cart.objects.get(owner=self.request.user)
            cart.listings.remove(listing)

            if cart.listings.count() == 0:
                cart.delete()

            return HttpResponse("Listing " + str(listing_id) + " removed from cart owner " + str(cart.owner))
        
        except:
            return HttpResponse("Something went wrong")


class HandlePaymentApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, listing_id):
        
        listing = Listing.objects.get(id=listing_id)
        cart = Cart.objects.get(owner=self.request.user)
        data = {'title': listing.title, 'description': listing.description, 'price': listing.price}
        serializer = ListingSerializer(listing, data=data)
        
        if not listing.sold and serializer.is_valid():
            serializer.validated_data['buyer'] = self.request.user
            serializer.validated_data['sold'] = 1
            serializer.save()
            cart.listings.remove(listing)
            
            if cart.listings.count() == 0:
                cart.delete()

            return HttpResponse("Listing " + str(listing_id) + " purchased by " + str(self.request.user))
        else:
            return HttpResponse("Listing " + str(listing_id) + " already sold.")