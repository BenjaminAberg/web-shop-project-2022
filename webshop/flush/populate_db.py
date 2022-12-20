import json
import os
from django.contrib.auth.models import User
from api.accounts.serializers import RegisterUserSerializer
from api.listings.serializers import ListingSerializer

path_here = os.path.dirname(os.path.abspath(__file__))

def register_users():

    data = open(os.path.join(path_here, "users.json"))
    datajson = json.load(data)

    for i in datajson['users']:
        serializer = RegisterUserSerializer(data=i)
        if serializer.is_valid():
            serializer.save()

    first_user = User.objects.get(username="testuser1")
    starting_index = first_user.id

    data = open(os.path.join(path_here, "listings.json"))
    datajson = json.load(data)

    iteration = -1

    for i in datajson['listings'][0]:
        iteration = iteration + 1
        for j in datajson['listings'][0][i]:
            serializer = ListingSerializer(data=j)
            if serializer.is_valid():
                serializer.validated_data['owner'] = User.objects.get(id=starting_index + iteration)
                serializer.save()
    
    return "30 listings for testuser1, testuser2 and testuser3 successfully generated!"
            

