from django.shortcuts import render, reverse
from .serializers import ListingSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.views import View
from .models import Listing
from .forms import CreateListingForm
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Q

# Create your views here.

class ListingSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AddListingForm(View):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

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
            owner=self.request.user
            
            listing = Listing(title=title, description=description, price=price, owner=owner.user)
            listing.save()
            return HttpResponseRedirect(reverse("viewlistings"))

        return render(request, 'create_listing_form.html', {'form': form})

class ListListingsApi(GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    authentication_classes = [TokenAuthentication, ]
    pagination_class = ListingSetPagination

    def get_queryset(self):
        return Listing.objects.all()

    def get(self, request):
        
        listing = Listing.objects.all().filter(sold=0).order_by('-created_at')

        page = self.paginate_queryset(listing)
        if page:
            # queryset is not empty
            serializer = ListingSerializer(page, many=True)
            data = serializer.data
        else:
            # queryset is empty
            data = []
        return self.get_paginated_response(data)

class AddListingApi(GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['owner'] = self.request.user
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

class DeleteListingApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def delete(self, request, listing_id):

        listing = Listing.objects.get(id=listing_id)
        
        if request.user == listing.owner:
            listing.delete()
            return HttpResponse("Listing " + str(listing_id) + " deleted.")
        else:
            return HttpResponse("You don't have permission to delete this listing.")

class EditListingApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def put(self, request, listing_id):
        listing = Listing.objects.get(id=listing_id)
        
        if request.user == listing.owner:
            data = request.data 
            serializer = ListingSerializer(listing, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=400)
        else:
            return HttpResponse("You don't have permission to delete this listing.")

class ListOwnItemsApi(GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    pagination_class = ListingSetPagination

    def get_queryset(self):
        return Listing.objects.all()

    def get(self, request):
        
        listings = Listing.objects.all().order_by('-created_at')
        own_listings = []

        for listing in listings:
            if listing.owner == self.request.user:
                own_listings.append(listing)

        page = self.paginate_queryset(own_listings)

        if page:
            # queryset is not empty
            serializer = ListingSerializer(page, many=True)
            data = serializer.data
        else:
            # queryset is empty
            data = []
        return self.get_paginated_response(data)

class SearchListingsApi(GenericAPIView):
    pagination_class = ListingSetPagination

    def get_queryset(self):
        return Listing.objects.all()

    def get(self, request, search_term):

        qset = Q()

        for term in search_term.split():
            qset |= Q(title__contains=term)

        matching_results = Listing.objects.filter(qset).filter(sold=0).order_by('-created_at')

        page = self.paginate_queryset(matching_results)
        
        if page:
            # queryset is not empty
            serializer = ListingSerializer(page, many=True)
            data = serializer.data
        else:
            # queryset is empty
            data = []
        return self.get_paginated_response(data)
