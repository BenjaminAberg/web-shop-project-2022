from django.shortcuts import render, reverse
from .serializers import ListingSerializer
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.views import View
from .models import Listing
from .forms import CreateListingForm
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

class ListingSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AddListingView(View):
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

class ListingListPageAPI(GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    authentication_classes = [TokenAuthentication, ]
    pagination_class = ListingSetPagination

    def get_queryset(self):
        return Listing.objects.all()

    def get(self, request):
        
        listing = Listing.objects.all()

        page = self.paginate_queryset(listing)
        if page:
            # queryset is not empty
            serializer = ListingSerializer(page, many=True)
            data = serializer.data
        else:
            # queryset is empty
            data = []
        return self.get_paginated_response(data)

    def post(self, request):

        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

def view_listings(request):
    listings = Listing.objects.all()
    return render(request, "view_listings.html", {"listings": listings})

def delete_listing(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    listing.delete()
    return HttpResponse("Listing " + str(listing_id) + " deleted.")