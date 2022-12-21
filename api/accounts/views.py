from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .serializers import RegisterUserSerializer, UserSerializer, LoginSerializer


class RegisterApiView(generics.GenericAPIView):
    serializer_class = RegisterUserSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user,context=self.get_serializer_context()).data,
            'token':Token.objects.create(user=user).key
        })

class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": Token.objects.get(user=user).key,
        })

class GetUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
