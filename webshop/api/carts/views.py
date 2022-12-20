from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from ..listings.models import Listing
from ..listings.serializers import ListingSerializer
from .serializers import CartSerializer
from .models import Cart
from django.http import HttpResponse


class CartPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 100


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

                if not listing.owner == cart.owner:
                    cart.listings.add(listing)
                    return HttpResponse("New cart created. Listing " + str(listing_id) + " successfully added to cart owner " + str(cart.owner))
                
                else:
                    return HttpResponse("Listing cannot be bought by its owner.")
            
            else:
                return HttpResponse("Failed to create cart: " + str(serializer.errors))

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

class GetCartApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    pagination_class = CartPagination

    def get(self, request):
        try:
            cart = Cart.objects.get(owner=self.request.user)
            listings = cart.listings.all()

            page = self.paginate_queryset(listings)
            if page:
                serializer = ListingSerializer(page, many=True)
                data = serializer.data
            else:
                data = []
            return self.get_paginated_response(data)
    
        except:
            return HttpResponse("Cart does not exist.")

class DeleteCartApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def delete(self, request):
        try:
            cart = Cart.objects.get(owner=self.request.user)
            cart.delete()
            return HttpResponse("Cart deleted")
        except:
            return HttpResponse("Cart does not exist")

class HandlePaymentApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, listing_id, price):
        
        listing = Listing.objects.get(id=listing_id)
        cart = Cart.objects.get(owner=self.request.user)
        data = {'title': listing.title, 'description': listing.description, 'price': listing.price}
        serializer = ListingSerializer(listing, data=data)
        
        if not listing.sold and serializer.is_valid():
            if listing.price == price:
                serializer.validated_data['buyer'] = self.request.user
                serializer.validated_data['sold'] = 1
                serializer.save()
                cart.listings.remove(listing)

                # Send email: requirement 10 d.
                print("EMAIL to seller: " + str(listing.owner.email) 
                + ", Your listing " + str(listing.title) + " was purchased by " + str(self.request.user))

                print("EMAIL to buyer: " + str(self.request.user.email) 
                + ", You purchased item: " + str(listing.title) + " from seller " + str(listing.owner.username))
            
            else:
                return HttpResponse("Price updated, new price: " + str(listing.price), status=406)
            
            if cart.listings.count() == 0:
                cart.delete()

            return HttpResponse("Listing " + str(listing_id) + " purchased by " + str(self.request.user))
        else:
            return HttpResponse("Listing " + str(listing_id) + " already sold.", status=400)